<template>
  <div class="form">

    <input type="text" placeholder="name"
      v-model="name"
    >
    <input type="text" placeholder="name"
      v-model="notes"
    >

    <div class="form__row">
      <button type="submit"
        v-on:click.prevent="emitSuccess"
      >OK</button>
      <button
        v-on:click="emitCancel"
      >Cancel</button>
    </div>

  </div>
</template>

<script>
export default {
  emits: ['success', 'cancel'],
  data() {
    return {
      name: '',
      notes: 'Some notes'
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
