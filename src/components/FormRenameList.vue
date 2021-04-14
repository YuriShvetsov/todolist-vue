<template>
  <template>
  <form class="form"
    v-on:submit.prevent
  >
    <div class="form__title title title_size_l">List renaming</div>
    <div class="form__row">
      <label class="form__label">
        <span>Name</span>
        <input type="text"
          spellcheck="false"
          autocomplete="off"
          class="form__input form__input_type_text"
        >
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
  </form>
</template>

<script>
export default {
  name: 'form-rename-list'
}
</script>
