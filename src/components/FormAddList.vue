<template>
  <form class="form"
    v-on:submit.prevent
  >
    <div class="form__title title title_size_l">Add list</div>
    <div class="form__row form__row_inputs">
      <label class="form__label">
        <span>Name</span>
        <input type="text"
          class="form__input form__input_type_text"
          v-model="name"
        >
      </label>
    </div>
    <div class="form__row form__row_controls">
      <button>Success</button>
      <button>Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['success', 'cancel'],
  data() {
    return {
      name: ''
    }
  },
  methods: {

  }
}
</script>
