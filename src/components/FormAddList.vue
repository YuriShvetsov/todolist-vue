<template>
  <h3>Modal add list</h3>
  <button
    v-on:click="emitSuccess"
  >Success</button>
  <button
    v-on:click="emitCancel"
  >Cancel</button>
</template>

<script>
export default {
  emits: ['success', 'cancel'],
  methods: {
    emitSuccess() {
      this.$emit('success')
    },
    emitCancel() {
      this.$emit('cancel')
    }
  }
}
</script>
