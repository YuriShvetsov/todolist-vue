<template>
  <form class="form"
    v-on:submit.prevent
  >

    <div class="form__header">
      <div class="form__title title title_size_l">Task editing</div>
    </div>

    <div class="form__body">

      <div class="form__row">
        <label class="form__label">
          <span>Name</span>
          <input type="text"
            spellcheck="false"
            autocomplete="off"
            class="form__input form__input_type_text"
            v-model="_name"
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
            v-model="_notes"
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
  name: 'form-edit-task',
  emits: ['success', 'cancel'],
  props: {
    name: String,
    notes: String
  },
  data() {
    return {
      _name: '',
      _notes: ''
    };
  },
  methods: {
    emitSuccess() {
      this.$emit('success', {
        name: this._name,
        notes: this._notes
      });
      this.clear();
    },
    emitCancel() {
      this.$emit('cancel');
      this.clear();
    },
    clear() {
      this._name = '';
      this._notes = '';
    }
  },
  created() {
    this._name = this.name;
    this._notes = this.notes;
  }
}
</script>
