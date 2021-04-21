<template>
  <form class="form"
    v-on:submit.prevent
  >

    <div class="form__header">
      <div class="form__title title title_size_s title_color_violet">Task editing</div>
    </div>

    <div class="form__body">

      <div class="form__row">
        <label class="form__label">
          <span class="form__label-name">Name</span>
          <input type="text"
            spellcheck="false"
            autocomplete="off"
            class="form__input form__input_type_text"
            v-model.trim="_name"
          >
        </label>
      </div>

      <div class="form__row">
        <label class="form__label">
          <span class="form__label-name">Notes</span>
          <textarea
            rows="5"
            spellcheck="false"
            autocomplete="off"
            class="form__input form__textarea"
            v-model.trim="_notes"
          >
          </textarea>
        </label>
      </div>

      <div class="form__row form__row_controls">
        <button
          class="form__control-button button button_type_submit"
          v-on:click="emitSuccess"
        >OK</button>
        <button
          class="form__control-button button"
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
    id: String,
    done: Boolean,
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
    },
    emitCancel() {
      this.$emit('cancel');
    }
  },
  created() {
    this._name = this.name;
    this._notes = this.notes;
  }
}
</script>
