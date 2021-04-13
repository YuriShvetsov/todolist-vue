<template>
  <form class="form"
    v-on:submit.prevent
  >
    <div class="form__title title title_size_l">Edit task</div>
    <div class="form__row form__row_inputs">
      <label class="form__label">
        <span>Name</span>
        <input type="text"
          class="form__input form__input_type_text"
          v-model="name"
        >
      </label>
    </div>
    <div class="form__row form__row_inputs">
      <label class="form__label">
        <span>Notes</span>
        <input type="text"
          class="form__input form__input_type_text"
          v-model="notes"
        >
      </label>
    </div>
    <div class="form__row form__row_controls">
      <button v-on:click="emitSuccess">Success</button>
      <button v-on:click="emitCancel">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['success', 'cancel'],
  props: {
    id: String,
    name: String,
    notes: String
  },
  data() {
    return {}
  },
  methods: {
    emitSuccess() {
      
    },
    emitCancel() {

    }
  }
}
</script>
