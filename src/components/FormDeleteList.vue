<template>
  <form class="form"
    v-on:submit.prevent
  >

    <div class="form__header">
      <div class="form__title title title_size_l">Deleting list</div>
      <div class="form__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    </div>

    <div class="form__body">
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
  name: 'form-delete-list'
}
</script>
