<template>
  <form class="form"
    v-on:submit.prevent
  >

    <div class="form__header">
      <div class="form__title title title_size_s title_color_red">Deleting of list</div>
      <div class="form__desc text text_color_gray">Do you really want to delete this list along with all tasks?</div>
    </div>

    <div class="form__body">

      <div class="form__row form__row_controls">
        <button class="form__control-button button button_type_warn"
          v-on:click="emitSuccess"
        >OK</button>
        <button class="form__control-button button button_color_red"
          v-on:click="emitCancel"
        >Cancel</button>
      </div>
      
    </div>
    
  </form>
</template>

<script>
import catchFocus from '../js/catchFocus'

export default {
  name: 'form-delete-list',
  emits: ['success', 'cancel'],
  methods: {
    emitSuccess() {
      this.$emit('success')
    },
    emitCancel() {
      this.$emit('cancel')
    },
    focusOnCancelButton() {
      this.$el.elements[1].focus()
    }
  },
  mounted() {
    this.focusOnCancelButton()
    catchFocus(this.$el)
  }
}
</script>
