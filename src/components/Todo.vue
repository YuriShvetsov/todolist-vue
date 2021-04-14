<template>
  <div class="todo">

    <div class="todo__container">

      <div class="todo__header">
        <div class="todo__logo">Todolist</div>
      </div>

      <div class="todo__body">

        <div class="todo__section todo__section_side">
          <lists-view
            v-bind:lists="lists"
            v-on:open-list="openList"
            v-on:add-list="addList"
          ></lists-view>
        </div>

        <div class="todo__section todo__section_main">
          <tasks-view
            v-bind="openedList"
            v-on:add-task="addTask"
            v-on:edit-task="editTask"
          ></tasks-view>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import ListsView from './ListsView.vue';
import TasksView from './TasksView.vue';

import Modal from './Modal.vue';

export default {
  name: 'todo',
  components: {
    ListsView,
    TasksView,
    Modal
  },
  data() {
    return {
      lists: [],
      openedListId: null
    };
  },
  computed: {
    openedList() {
      return this.lists.find(list => list.id === this.openedListId);
    },
    nextListId() {
      if (this.lists.length === 0) return 'list-' + this.generateId();

      const allListIds = this.lists.map(list => list.id);
      let newId = 'list-' + this.generateId();

      while (allListIds.includes(newId)) {
        newId = 'list-' + this.generateId();
      }

      return newId;
    },
    nextTaskId() {

    }
  },
  methods: {
    readFromLS() {
      const defaultData = {
        lists:  this.lists,
        openedListId: this.openedListId
      };
      const data = JSON.parse(localStorage.getItem('todo'));


      
    },
    writeToLS() {
      const data = {
        lists: this.lists,
        openedListId: this.openedListId
      };
    },

    openList(id) {
      this.openedListId = id;
    },
    addList(name) {
      const newList = {
        id: this.nextListId,
        name,
        tasks: []
      };

      this.lists.push(newList);
    },
    renameList(id, name) {

    },
    deleteList(id) {

    },
    addTask({ listId, name, notes }) {
      const list = this.lists.find(list => list.id === listId);
      const newTask = {
        id: 'task-100',
        done: false,
        name, 
        notes
      };

      list.tasks.push(newTask);
    },
    changeDoneTask(id) {

    },
    editTask({ listId, taskId, name, notes }) {
      const list = this.lists.find(list => list.id === listId);
      const task = list.tasks.find(task => task.id === taskId);

      task.name = name;
      task.notes = notes;
    },
    swapLists(a, b) {

    },
    swapTasks(a, b) {

    },
    deleteTask(id) {

    },

    generateId() {
      return Math.random().toString(36).substr(2, 8);
    },
    checkForLists() {
      if (this.lists.length > 0) return;

      this.addEmptyList();
      this.openFirstList();
      this.writeToLS();
    },
    addEmptyList() {
      const emptyList = {
        id: this.nextListId,
        name: 'Main',
        tasks: []
      };

      this.lists.push(emptyList);
    },
    openFirstList() {
      this.openedListId = this.lists[0].id;
    },
    setPlugToLists() {
      return [
        {
          id: 'list-1',
          name: 'Main',
          tasks: [
            {
              id: 'task-848fjsq',
              done: true,
              name: 'one task',
              notes: 'notes'
            }
          ]
        },
        {
          id: 'list-2',
          name: 'Secondary',
          tasks: [
            {
              id: 'task-xj41i7',
              done: false,
              name: 'some task',
              notes: 'notes'
            }
          ]
        }
      ];
    }
  },
  created() {
    // Required:
    // this.readFromLS();

    // Temporary:
    this.lists = this.setPlugToLists();
    this.openFirstList();
  
    // Required:
    this.checkForLists();
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/utils/vars.scss';

.todo {
  width: 100vw;
  height: 100vh;
  padding: 16px;
}

.todo__container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 990px;
  height: 100%;
  margin: 0 auto;
  padding: 16px 0;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #eee;
}

.todo__header {
  padding: 16px;
}

.todo__logo {
  text-align: center;
}

.todo__body {
  display: flex;
  height: 100%;
}

.todo__section {
  width: 100%;
  padding: 0 16px;
}

.todo__section_side {
  width: 100%;
  max-width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  position: relative;
  border-right: 2px solid #eee;
}
</style>
