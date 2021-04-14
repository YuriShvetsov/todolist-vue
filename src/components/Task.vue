<template>
  <li class="task">

    <div class="task__done">
      <label class="task__done-label">
        <input type="checkbox"
          class="task__done-input"
          v-bind:checked="done"
          v-on:change="emitChangeDone"
        >
      </label>
    </div>

    <div class="task__content">
      <div class="task__name">{{ name }}</div>
      <div class="task__notes">
        <pre class="task__pre-notes">{{ notes }}</pre>
      </div>
    </div>

    <div class="task__menu">
      <div class="task__menu-container">
        <button v-on:click="openModalEditTask">Edit</button>
        <button v-on:click="emitDelete">Delete</button>
      </div>
    </div>

    <modal ref="modalEditTask">
      <form-edit-task
        v-bind="{ name, notes }"
        v-on:success="emitEdit($event), closeModalEditTask()"
        v-on:cancel="closeModalEditTask"
      ></form-edit-task>
    </modal>

  </li>
</template>

<script>
import Modal from './Modal.vue';
import FormEditTask from './FormEditTask.vue';

export default {
  name: 'task',
  components: {
    Modal,
    FormEditTask
  },
  emits: ['change-done', 'edit', 'delete'],
  props: {
    id: String,
    done: Boolean,
    name: String,
    notes: String
  },
  methods: {
    openModalEditTask() {
      this.$refs.modalEditTask.open();
    },
    closeModalEditTask() {
      this.$refs.modalEditTask.close();
    },

    emitChangeDone() {
      
    },
    emitEdit({ name, notes }) {
      this.$emit('edit', {
        taskId: this.id,
        name,
        notes
      });
    },
    emitDelete() {

    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  list-style: none;
  background-color: #fff;
  border-radius: 5px;
}

.task__done {
  margin-right: 8px;
}

.task__content {
  width: 100%;
}
</style>
