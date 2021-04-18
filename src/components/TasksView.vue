<template>
  <div class="tasks-view" v-if="dataIsValid">

    <div class="tasks-view__container">
      <div class="tasks-view__header">

        <div class="tasks-view__title title title_size_s">{{ name }}</div>

        <!-- menu -->
        <popup ref="menu">

          <template v-slot:opener>
            <button class="popup__opener button button_type_icon button_icon_menu"
              v-on:click="toggleMenu"
            >menu</button>
          </template>

          <template v-slot:content>
            <ul class="popup__action-list">
              <li class="popup__action">
                <button class="popup__action-button button button_type_popup"
                  v-on:click="openModalRenameList(), closeMenu()"
                >Rename</button>
              </li>
              <li class="popup__action">
                <button class="popup__action-button button button_type_popup button_color_red"
                  v-on:click="openModalDeleteList(), closeMenu()"
                >Delete</button>
              </li>
            </ul>
          </template>

        </popup>

      </div>
      <div class="tasks-view__controls">
        <div class="tasks-view__controls-col">
          <button class="button"
            v-on:click="openModalAddTask"
          >New task</button>
        </div>
        <div class="tasks-view__controls-col">
          <button class="button button_color_red"
            v-on:click="emitClearList"
          >Clear list</button>
        </div>
      </div>
      <div class="tasks-view__body">
        <ul class="tasks-view__ul">
          <task
            v-for="task in tasks"
            v-bind:key="task.id"
            v-bind="task"
            v-on:edit="emitEditTask"
            v-on:change-done="emitChangeDone"
            v-on:delete="emitDeleteTask"
          ></task>
        </ul>
      </div>
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
          v-on:success="emitRenameList($event), closeModalRenameList()"
          v-on:cancel="closeModalRenameList"
        ></form-rename-list>
      </modal>

      <modal ref="modalDeleteList">
        <form-delete-list
          v-on:success="emitDeleteList(), closeModalDeleteList()"
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
    // 'sort-list',
    'delete-list',
    'add-task',
    'edit-task',
    'delete-task',
    'change-done-task',
    // 'swap-tasks',
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

    };
  },
  computed: {
    dataIsValid() {
      return (
        this.id &&
        this.name &&
        this.tasks
      );
    }
  },
  methods: {
    // Modals
    openModalAddTask() {
      this.$refs.modalAddTask.open();
    },
    closeModalAddTask() {
      this.$refs.modalAddTask.close();
    },
    openModalEditTask() {
      this.$refs.modalEditTask.open();
    },
    closeModalEditTask() {
      this.$refs.modalEditTask.close();
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

    // Popups
    toggleMenu() {
      this.$refs.menu.toggle();
    },
    closeMenu() {
      this.$refs.menu.close();
    },

    // Handlers


    // Events emiting
    emitRenameList(name) {
      this.$emit('rename-list', {
        id: this.id,
        name
      });
    },
    emitDeleteList() {
      this.$emit('delete-list', this.id);
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
    }
  }
}
</script>

<style lang="scss" scoped>
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

.tasks-view__ul {
  padding: 0;
}
</style>
