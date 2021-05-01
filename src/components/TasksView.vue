<template>
  <div class="tasks-view" v-if="dataValid">

    <div class="tasks-view__header">

      <div class="tasks-view__title title title_size_s">{{ name }}</div>

      <popup ref="menu">

        <template v-slot:opener>
          <button class="popup__opener button button_type_icon button_icon_menu"
            v-on:click="toggleMenu"
          >menu</button>
        </template>

        <template v-slot:content>
          <ul class="popup__action-list">
            <li class="popup__action">
              <button class="popup__action-button button button_type_popup button_icon_edit"
                v-on:click="openModalRenameList(), closeMenu()"
              >Rename</button>
            </li>
            <li class="popup__action">
              <button class="popup__action-button button button_type_popup button_icon_delete button_color_red"
                v-on:click="openModalDeleteList(), closeMenu()"
              >Delete</button>
            </li>
          </ul>
        </template>

      </popup>

    </div>

    <div class="tasks-view__controls">

      <div class="tasks-view__controls-col">
        <button class="button button_type_text-icon button_icon_add"
          v-on:click="openModalAddTask"
        >Add task</button>
      </div>

      <div class="tasks-view__controls-col">
        <button class="button_color_red button button_type_text-icon button_icon_minus"
          v-bind:class="{ 'button_type_disabled': !haveCompletedTasks }"
          v-bind:disabled="!haveCompletedTasks"
          v-on:click="emitClearList"
        >Clear list</button>
      </div>
      
    </div>

    <div class="tasks-view__body scrollable-wrapper">

      <div class="scroll-trigger scroll-trigger_up"
        ref="scrollUpTrigger"
      ></div>

      <div class="scroll-trigger scroll-trigger_down"
        ref="scrollDownTrigger"
      ></div>

      <ul class="tasks-view__ul scrollable-child" ref="content">
        <task
          class="js-task"
          v-for="task in tasks"
          v-bind:key="task.id"
          v-bind:data-id="task.id"
          v-bind="task"
          v-on:edit="emitEditTask"
          v-on:change-done="emitChangeDone"
          v-on:delete="emitDeleteTask"
          v-on:start-moving="onStartTaskMoving"
        ></task>
      </ul>

      <!-- <div class="tasks-view__scroll-trigger tasks-view__scroll-trigger_down"
        ref="scrollDownTrigger"
      ></div> -->

    </div>

    <div class="tasks-view__outer">

      <modal ref="modalAddTask">
        <form-add-task
          v-on:success="emitAddTask"
          v-on:cancel="closeModalAddTask"
        ></form-add-task>
      </modal>

      <modal ref="modalRenameList">
        <form-rename-list
          v-bind:name="name"
          v-on:success="emitRenameList"
          v-on:cancel="closeModalRenameList"
        ></form-rename-list>
      </modal>

      <modal ref="modalDeleteList">
        <form-delete-list
          v-on:success="emitDeleteList"
          v-on:cancel="closeModalDeleteList"
        ></form-delete-list>
      </modal>

    </div>

  </div>
</template>

<script>
import Task from './Task.vue';
import Modal from './Modal.vue';
import FormAddTask from './FormAddTask.vue';
import FormEditTask from './FormEditTask.vue';
import FormRenameList from './FormRenameList.vue';
import FormDeleteList from './FormDeleteList.vue';
import Popup from './Popup.vue';

export default {
  name: 'tasks-view',
  emits: [
    'rename-list',
    'clear-list',
    'delete-list',
    'add-task',
    'edit-task',
    'delete-task',
    'change-done-task',
    'move-task'
  ],
  components: {
    Task,
    Modal,
    FormAddTask,
    FormEditTask,
    FormRenameList,
    FormDeleteList,
    Popup
  },
  props: {
    id: String,
    name: String,
    tasks: Array
  },
  data() {
    return {
      taskMoving: {
        isStarted: false,
        movingTaskId: null,
        hoverTaskId: null
      },
      scrolling: {
        isActive: false,
        dir: 'down'
      }
    };
  },
  computed: {
    dataValid() {
      return (
        this.id &&
        this.name &&
        this.tasks
      );
    },
    haveCompletedTasks() {
      return this.tasks.find(list => list.done);
    }
  },
  methods: {
    openModalAddTask() {
      this.$refs.modalAddTask.open();
    },
    closeModalAddTask() {
      this.$refs.modalAddTask.close();
    },
    openModalRenameList() {
      this.$refs.modalRenameList.open();
    },
    closeModalRenameList() {
      this.$refs.modalRenameList.close();
    },
    openModalDeleteList() {
      this.$refs.modalDeleteList.open();
    },
    closeModalDeleteList() {
      this.$refs.modalDeleteList.close();
    },

    toggleMenu() {
      this.$refs.menu.toggle();
    },
    closeMenu() {
      this.$refs.menu.close();
    },

    getTaskElements() {
      return Array.from(this.$refs.content.querySelectorAll('.js-task'));
    },
    getTaskElement(id) {
      const taskElements = this.getTaskElements();

      return taskElements.find(t => t.dataset.id === id);
    },
    scrollToLastTask() {
      const taskElements = this.getTaskElements();
      const lastTaskElement = taskElements[taskElements.length - 1];

      // Scrolling to last task
      lastTaskElement.scrollIntoView({
        behavior: 'smooth'
      });

      // Display of task animation
      lastTaskElement.classList.add('anim-colorfull-violet');
      lastTaskElement.addEventListener('animationend', e => {
        e.target.classList.remove('anim-colorfull-violet');
      });
    },
    selectMovingTask() {
      const movingTask = this.getTaskElement(this.taskMoving.movingTaskId);

      movingTask.classList.add('task_selected');
      document.body.classList.add('grabbing');
    },
    unSelectMovingTask() {
      const movingTask = this.getTaskElement(this.taskMoving.movingTaskId);

      movingTask.classList.remove('task_selected');
      document.body.classList.remove('grabbing');
    },
    showPointerOnHoverTask() {
      const hoverTask = this.getTaskElement(this.taskMoving.hoverTaskId);

      hoverTask.classList.add('task_pointer');

      const pointerClassName = hoverTaskIsAbove.call(this) ? '.js-top-pointer' : '.js-bottom-pointer';
      const pointer = hoverTask.querySelector(pointerClassName);

      pointer.classList.add('pointer_visible');

      function hoverTaskIsAbove() {
        const hoverTaskIndex = this.tasks.findIndex(t => t.id === this.taskMoving.hoverTaskId);
        const movingTaskIndex = this.tasks.findIndex(t => t.id === this.taskMoving.movingTaskId);

        return movingTaskIndex > hoverTaskIndex;
      }
    },
    hidePointerOnHoverTask() {
      const hoverTask = this.getTaskElement(this.taskMoving.hoverTaskId);
      const topPointer = hoverTask.querySelector('.js-top-pointer');
      const bottomPointer = hoverTask.querySelector('.js-bottom-pointer');

      topPointer.classList.remove('pointer_visible');
      bottomPointer.classList.remove('pointer_visible');

      hoverTask.classList.remove('task_pointer');
    },
    activateScrollTriggers() {
      this.$refs.scrollUpTrigger.classList.add('scroll-trigger_active');
      this.$refs.scrollDownTrigger.classList.add('scroll-trigger_active');
    },
    unActivateScrollTriggers() {
      this.$refs.scrollUpTrigger.classList.remove('scroll-trigger_active');
      this.$refs.scrollDownTrigger.classList.remove('scroll-trigger_active');
    },

    emitRenameList(name) {
      this.$emit('rename-list', {
        id: this.id,
        name
      });

      this.closeModalRenameList();
    },
    emitDeleteList() {
      this.$emit('delete-list', this.id);

      this.closeModalDeleteList();
    },
    emitClearList() {
      this.$emit('clear-list', this.id);
    },
    emitAddTask(data) {
      this.$emit('add-task', {
        listId: this.id,
        name: data.name,
        notes: data.notes
      });

      this.closeModalAddTask();
      this.$nextTick(this.scrollToLastTask);
    },
    emitEditTask({ id, name, notes }) {
      this.$emit('edit-task', {
        listId: this.id,
        taskId: id,
        name,
        notes
      });
    },
    emitChangeDone({ id, done }) {
      this.$emit('change-done-task', {
        listId: this.id,
        taskId: id,
        done
      });
    },
    emitDeleteTask(id) {
      this.$emit('delete-task', {
        listId: this.id,
        taskId: id
      });
    },
    emitMoveTask() {
      const data = {
        listId: this.id,
        taskId: this.taskMoving.movingTaskId,
        toIndex: this.tasks.findIndex(t => t.id === this.taskMoving.hoverTaskId)
      };

      this.$emit('move-task', data);
    },

    onStartTaskMoving(id) {
      this.taskMoving.isStarted = true;
      this.taskMoving.movingTaskId = id;

      this.selectMovingTask();
      this.activateScrollTriggers();
    },
    continueTaskMoving(e) {
      if (!this.taskMoving.isStarted) return;

      const task = e.target.closest('.js-task');
      const movingTaskId = this.taskMoving.movingTaskId;
      const hoverTaskId = this.taskMoving.hoverTaskId;

      if (!task && hoverTaskId) {
        this.hidePointerOnHoverTask();
        this.taskMoving.hoverTaskId = null;

        return;
      }

      if (!task && !hoverTaskId) {
        return;
      }

      const newTaskId = task.dataset.id;

      if (newTaskId === movingTaskId && hoverTaskId) {
        this.hidePointerOnHoverTask();
        this.taskMoving.hoverTaskId = null;

        return;
      }

      if (newTaskId === movingTaskId && !hoverTaskId) {
        return;
      }

      if (hoverTaskId && newTaskId !== hoverTaskId) {
        this.hidePointerOnHoverTask();
        this.taskMoving.hoverTaskId = newTaskId;
        this.showPointerOnHoverTask();

        return;
      }

      if (hoverTaskId && newTaskId === hoverTaskId) {
        return;
      }

      if (!hoverTaskId) {
        this.taskMoving.hoverTaskId = newTaskId;
        this.showPointerOnHoverTask();
        
        return;
      }
    },
    finishTaskMoving() {
      if (!this.taskMoving.isStarted) return;

      if (this.taskMoving.hoverTaskId) {
        this.emitMoveTask();
        this.hidePointerOnHoverTask();
      }

      this.unSelectMovingTask();
      this.unActivateScrollTriggers();
      this.cancelTaskMoving();
    },
    cancelTaskMoving() {
      this.taskMoving.isStarted = false;
      this.taskMoving.movingTaskId = null;
      this.taskMoving.hoverTaskId = null;
    },

    startScrollUp() {
      this.scrolling.isActive = true;

      let curScrollPos = this.$refs.content.scrollTop;

      let timer = setInterval(() => {
        if (!this.scrolling.isActive || curScrollPos === 0) clearInterval(timer);

        curScrollPos -= 1;

        this.$refs.content.scrollTo(0, curScrollPos);
      }, 5);
    },
    endScrollUp() {
      this.scrolling.isActive = false;
    },
    startScrollDown() {
      this.scrolling.isActive = true;

      const maxScrollPos = this.$refs.content.scrollHeight - this.$refs.content.clientHeight;
      let curScrollPos = this.$refs.content.scrollTop;

      let timer = setInterval(() => {
        if (!this.scrolling.isActive || curScrollPos === maxScrollPos) clearInterval(timer);

        curScrollPos += 1;

        this.$refs.content.scrollTo(0, curScrollPos);
      }, 5);
    },
    endScrollDown() {
      this.scrolling.isActive = false;
    },

    initListeners() {
      document.addEventListener('mouseover', this.continueTaskMoving);
      document.addEventListener('mouseup', this.finishTaskMoving);

      this.$refs.scrollUpTrigger.addEventListener('mouseover', this.startScrollUp);
      this.$refs.scrollUpTrigger.addEventListener('mouseout', this.endScrollUp);

      this.$refs.scrollDownTrigger.addEventListener('mouseover', this.startScrollDown);
      this.$refs.scrollDownTrigger.addEventListener('mouseout', this.endScrollDown);
    }
  },
  mounted() {
    this.initListeners();
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/utils/vars.scss';

.tasks-view {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
}

.tasks-view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.tasks-view__title {
  text-transform: lowercase;
}

.tasks-view__title::first-letter {
  text-transform: uppercase;
}

.tasks-view__controls {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
}

.tasks-view__body {
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  height: 100%;

  position: relative;
}

.scroll-trigger {
  display: none;

  width: 100%;
  height: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  // background-color: $colorGray;
  background-color: rgba(255, 255, 255, 0);

  z-index: 10;
}

.scroll-trigger_active {
  display: block;
}

.scroll-trigger_up {
  top: 0;
}

.scroll-trigger_down {
  bottom: 0;
}

.tasks-view__ul {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
