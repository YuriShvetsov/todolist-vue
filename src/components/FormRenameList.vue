<template>
  <form class="form"
    v-on:submit.prevent
  >
    
    <div class="form__header">
      <div class="form__title title title_size_s title_color_violet">List renaming</div>
    </div>

    <div class="form__body">

      <div class="form__row">
        <label class="form__label">
          <span class="form__label-name">Name</span>
          <input type="text"
            spellcheck="false"
            autocomplete="off"
            class="form__input form__input_type_text"
            v-model="_name"
          >
        </label>
      </div>

      <div class="form__row form__row_controls">
        <button class="form__control-button button button_type_submit"
          v-on:click="emitSuccess"
        >OK</button>
        <button class="form__control-button button"
          v-on:click="emitCancel"
        >Cancel</button>
      </div>

    </div>

  </form>
</template>

<script>
export default {
  name: 'form-rename-list',
  emits: ['success', 'cancel'],
  props: {
    name: String
  },
  data() {
    return {
      _name: ''
    }
  },
  methods: {
    init() {
      this._name = this.name;
    },

    // Event emiting
    emitSuccess() {
      this.$emit('success', this._name);
    },
    emitCancel() {
      this.$emit('cancel');
    }
  },
  created() {
    this.init();
  }
}
</script>
