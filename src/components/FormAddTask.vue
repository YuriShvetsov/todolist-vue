<template>
  <form class="form"
    v-on:submit.prevent
  >
    <div class="form__header">
      <div class="form__title title title_size_l">Task adding</div>
    </div>
    <div class="form__body">
      <div class="form__row">
        <label class="form__label">
          <span>Name</span>
          <input type="text"
            spellcheck="false"
            autocomplete="off"
            class="form__input form__input_type_text"
            v-model="name"
          >
        </label>
      </div>
      <div class="form__row">
        <label class="form__label">
          <span>Notes</span>
          <textarea
            rows="5"
            spellcheck="false"
            autocomplete="off"
            class="form__input form__textarea"
            v-model="notes"
          >
          </textarea>
        </label>
      </div>
      <div class="form__row">
        <button
          v-on:click="emitSuccess"
        >Success</button>
        <button
          v-on:click="emitCancel"
        >Cancel</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'form-add-task',
  emits: ['success', 'cancel'],
  data() {
    return {
      name: '',
      notes: ''
    };
  },
  methods: {
    emitSuccess() {
      this.$emit('success', {
        name: this.name,
        notes: this.notes
      });

      this.clear();
    },
    emitCancel() {
      this.$emit('cancel');
      this.clear();
    },
    clear() {
      this.name = '';
      this.notes = '';
    }
  }
}
</script>
