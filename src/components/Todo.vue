<template>
  <div class="todo">

    <div class="todo__container">

      <div class="todo__header">
        <div class="todo__current-date">{{ currentDateString }}</div>
        <div class="todo__logo">
          <div class="todo__logo-text">Todolist</div>
          <div class="todo__logo-icon"></div>
        </div>
      </div>

      <div class="todo__body">

        <div class="todo__section todo__section_side">
          <lists-view
            v-bind:lists="lists"
            v-bind:openedListId="openedListId"
            v-on:open-list="onOpenList"
            v-on:add-list="onAddList"
          ></lists-view>
        </div>

        <div class="todo__section todo__section_main">
          <tasks-view
            v-bind="openedList"
            v-on:rename-list="onRenameList"
            v-on:delete-list="onDeleteList"
            v-on:clear-list="onClearList"
            v-on:add-task="onAddTask"
            v-on:edit-task="onEditTask"
            v-on:change-done-task="onChangeDoneTask"
            v-on:delete-task="onDeleteTask"
          ></tasks-view>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

/*
  1. Фокус в формах
  2. Обязательные поля в формах
  3. Сортировка задач
  ...
*/

import ListsView from './ListsView.vue';
import TasksView from './TasksView.vue';

export default {
  name: 'todo',
  components: {
    ListsView,
    TasksView
  },
  data() {
    return {
      lists: [],
      openedListId: null,
      nextListId: null,
      nextTaskId: null,
      currentDate: new Date()
    };
  },
  computed: {
    openedList() {
      return this.lists.find(list => list.id === this.openedListId);
    },
    totalOfLists() {
      return this.lists.length;
    },
    totalOfTasks() {
      return this.lists.reduce((sum, list) => sum + list.tasks.length, 0);
    },
    currentDateString() {
      const weekdayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

      const day = this.currentDate.getDate();
      const dayEnding = getDayEnding(day);
      const weekday = weekdayNames[this.currentDate.getDay()];
      const month = monthNames[this.currentDate.getMonth()];

      function getDayEnding(num) {
        if (num >= 11 && num <= 19) return 'th';
        if (+num.toString().slice(-1) === 1) return 'st';
        if (+num.toString().slice(-1) === 2) return 'nd';
        if (+num.toString().slice(-1) === 3) return 'rd';

        return 'th';
      }

      return `${ weekday }, ${ day }${ dayEnding } ${ month }`;
    }
  },
  watch: {
    totalOfLists(newValue, oldValue) {
      if (newValue < oldValue) return;

      this.genNextListId();
    },
    totalOfTasks(newValue, oldValue) {
      if (newValue < oldValue) return;

      this.genNextTaskId();
    }
  },
  methods: {
    init() {
      // this.clearLS();

      this.readFromLS();

      if (this.lists.length === 0) {
        this.addEmptyList('list-' + this.generateId());
        this.openFirstList();
        this.writeToLS();
      }
      
      this.genNextListId();
      this.genNextTaskId();
    },

    readFromLS() {
      const data = JSON.parse(localStorage.getItem('todo'));

      if (!data) return;

      this.lists = data.lists;
      this.openedListId = data.openedListId;
    },
    writeToLS() {
      const data = {
        lists: this.lists,
        openedListId: this.openedListId
      };

      localStorage.setItem('todo', JSON.stringify(data));
    },

    genNextListId() {
      if (this.lists.length === 0) {
        this.nextListId = 'list-' + this.generateId();
        return;
      }

      const allListIds = this.lists.map(list => list.id);
      let newId = 'list-' + this.generateId();

      while (allListIds.includes(newId)) {
        newId = 'list-' + this.generateId();
      }

      this.nextListId = newId;
    },
    genNextTaskId() {
      if (this.totalOfTasks === 0) {
        this.nextTaskId = 'task-' + this.generateId();
        return;
      }

      const allTaskIds = [];

      this.lists.forEach(list => {
        list.tasks.forEach(task => allTaskIds.push(task.id));
      });

      let newId = 'task-' + this.generateId();

      while (allTaskIds.includes(newId)) {
        newId = 'task-' + this.generateId();
      }

      this.nextTaskId = newId;
    },
    getList(id) {
      return this.lists.find(list => list.id === id);
    },
    getTask(listId, taskId) {
      const list = this.getList(listId);
      const task = list.tasks.find(task => task.id === taskId);

      return task;
    },
    addEmptyList(id) {
      const emptyList = {
        id,
        name: 'Main',
        tasks: []
      };

      this.lists.push(emptyList);
    },
    openFirstList() {
      this.openedListId = this.lists[0].id;
    },
    openClosestList(index) {
      if (this.lists.length === 1) {
        this.addEmptyList(this.nextListId);
        this.genNextListId();
        this.openLastList();
        return;
      }

      const lastIndex = this.lists.length - 1;

      if (index < lastIndex) {
        this.openedListId = this.lists[index + 1].id;
      }
      else if (index === lastIndex) {
        this.openedListId = this.lists[index - 1].id;
      }
    },
    openLastList() {
      this.openedListId = this.lists[this.lists.length - 1].id;
    },

    onOpenList(id) {
      this.openedListId = id;

      this.writeToLS();
    },
    onAddList(name) {
      const newList = {
        id: this.nextListId,
        name,
        tasks: []
      };

      this.lists.push(newList);

      this.openLastList();

      this.writeToLS();
    },
    onRenameList({ id, name }) {
      const list = this.getList(id);

      list.name = name;

      this.writeToLS();
    },
    onDeleteList(id) {
      const index = this.lists.findIndex(list => list.id === id);

      this.openClosestList(index);

      this.lists.splice(index, 1);

      this.writeToLS();
    },
    onSwapLists(a, b) {


      // this.writeToLS();
    },
    onClearList(id) {
      const list = this.getList(id);
      const unCompletedTasks = list.tasks.filter(task => !task.done);

      list.tasks = unCompletedTasks;

      this.writeToLS();
    },
    onAddTask({ listId, name, notes }) {
      const list = this.lists.find(list => list.id === listId);
      const newTask = {
        id: this.nextTaskId,
        done: false,
        name, 
        notes
      };

      list.tasks.push(newTask);

      this.writeToLS();
    },
    onChangeDoneTask({ listId, taskId, done }) {
      const task = this.getTask(listId, taskId);

      task.done = done;

      this.writeToLS();
    },
    onEditTask({ listId, taskId, name, notes }) {
      const task = this.getTask(listId, taskId);

      task.name = name;
      task.notes = notes;

      this.writeToLS();
    },
    onSwapTasks(a, b) {


      // this.writeToLS();
    },
    onDeleteTask({ listId, taskId }) {
      const list = this.getList(listId);
      const taskIndex = list.tasks.findIndex(task => task.id === taskId);

      list.tasks.splice(taskIndex, 1);

      this.writeToLS();
    },

    generateId() {
      return Math.random().toString(36).substr(2, 8);
    },

    setPlugToLists() {
      this.lists = [
        {
          id: 'list-1',
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
    },
    clearLS() {
      localStorage.removeItem('todo');
    }
  },
  created() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/utils/vars.scss';

.todo * {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
}

.todo {
  width: 100vw;
  height: 100vh;
  padding: 16px;

  background-image: $mainBg;
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
  border: 1px solid #eee;
}

.todo__header {
  display: flex;

  height: 56px;
  padding: 0 16px;
  position: relative;
}

.todo__current-date {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  font-weight: bold;
  color: $colorGray;
  white-space: nowrap;
}

.todo__logo {
  display: block;
  margin: 0 auto;
  padding: 15px 38px 5px 5px;
  position: relative;
  text-align: center;
  user-select: none;
}

.todo__logo-text {
  font-family: 'Galada', sans-serif;
  font-size: 36px;
  line-height: 1;
  color: $colorViolet;
  text-transform: capitalize;
  text-shadow: 0 3px 3px rgba(0, 0, 0, .1);
}

.todo__logo-icon {
  display: block;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 5px;
  bottom: 16px;
  background-image: url(../assets/images/quill.svg);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 30px 30px;
  filter: drop-shadow(0 3px 3px rgba(0,0,0,.15));
}

.todo__body {
  display: flex;
  height: calc(100% - 56px);
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
