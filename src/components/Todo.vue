<template>
  <h1>Todo</h1>

  <button
    v-on:click="openModal('add-list')"
  >Add list</button>

  <button
    v-on:click="openModal('rename-list')"
  >Rename list</button>

  <button
    v-on:click="openModal('delete-list')"
  >Delete list</button>

  <button
    v-on:click="openModal('add-task')"
  >Add task</button>

  <button
    v-on:click="openModal('edit-task')"
  >Edit task</button>

  <modal
    v-if="stateIsModal"
    v-on:close="closeModal"
  >

    <form-add-list
      v-if="modalIsAddList"
      v-on:success="addList"
      v-on:cancel="closeModal"
    ></form-add-list>

    <form-rename-list
      v-if="modalIsRenameList"
    ></form-rename-list>

    <form-delete-list
      v-if="modalIsDeleteList"
    ></form-delete-list>

    <form-add-task
      v-if="modalIsAddTask"
    ></form-add-task>

    <form-edit-task
      v-if="modalIsEditTask"
    ></form-edit-task>

  </modal>

</template>

<script>
import Modal from './Modal.vue'
import FormAddList from './FormAddList.vue'
import FormRenameList from './FormRenameList.vue'
import FormDeleteList from './FormDeleteList.vue'
import FormAddTask from './FormAddTask.vue'
import FormEditTask from './FormEditTask.vue'

export default {
  components: {
    'modal': Modal,
    'form-add-list': FormAddList,
    'form-rename-list': FormRenameList,
    'form-delete-list': FormDeleteList,
    'form-add-task': FormAddTask,
    'form-edit-task': FormEditTask
  },
  data() {
    return {
      state: 'default',
      modal: null
    }
  },
  computed: {
    stateIsModal() {
      return this.state === 'modal'
    },
    
    modalIsAddList() {
      return this.modal === 'add-list'
    },
    modalIsRenameList() {
      return this.modal === 'rename-list'
    },
    modalIsDeleteList() {
      return this.modal === 'delete-list'
    },
    modalIsAddTask() {
      return this.modal === 'add-task'
    },
    modalIsEditTask() {
      return this.modal === 'edit-task'
    }
  },
  methods: {
    openModal(name) {
      this.state = 'modal'
      this.modal = name
    },

    addList() {
      console.log('add list')
      this.state = 'default'
    },
    closeModal() {
      console.log('close modal')
      this.state = 'default'
      this.modal = null
    }
  }
}
</script>
