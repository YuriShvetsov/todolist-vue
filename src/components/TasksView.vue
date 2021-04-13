<template>
  <div class="tasks-view">
    <div class="tasks-view__header">
      <div class="tasks-view__title">{{ list.name }}</div>
      <!-- menu -->
    </div>
    <div class="tasks-view__controls">
      <div class="tasks-view__controls-col">
        <button
          v-on:click="openModalAddTask"
        >New task</button>
      </div>
      <div class="tasks-view__controls-col">
        <button>Clear list</button>
      </div>
    </div>
    <div class="tasks-view__body">
      <ul class="tasks-view__ul">
        <task
          v-for="task in list.tasks"
          v-bind:key="task.id"
          v-bind="task"
        ></task>
      </ul>
    </div>
  </div>

  <modal ref="modalAddTask">
    <form-add-task
      v-on:success="emitAddTask"
      v-on:cancel="closeModalAddTask"
    ></form-add-task>
  </modal>
</template>

<script>
import Task from './Task.vue';
import Modal from './Modal.vue';
import FormAddTask from './FormAddTask.vue';

export default {
  name: 'tasks-view',
  emits: ['add-task'],
    components: {
    Task,
    Modal,
    FormAddTask
  },
  props: {
    list: Object
  },
  data() {
    return {

    }
  },
  methods: {
    openModalAddTask() {
      this.$refs.modalAddTask.open();
    },
    closeModalAddTask() {
      this.$refs.modalAddTask.close();
    },

    emitAddTask(data) {
      this.$emit('add-task', {
        listId: this.list.id,
        name: data.name,
        notes: data.notes
      });

      this.closeModalAddTask();
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks-view__header {
  padding: 12px 0;
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
