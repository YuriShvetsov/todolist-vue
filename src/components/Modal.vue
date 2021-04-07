<template>
  <div class="modal">

    <div class="modal__container">
      <slot></slot>
    </div>

    <div class="modal__overlay"
      v-on:click="emitClose"
    ></div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    emitClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}
.modal__container {
  width: 100%;
  max-width: 450px;
  padding: 16px;
  position: absolute;
  left: 50%;
  top: 65px;
  border: 2px solid #aaa;
  transform: translateX(-50%);
  z-index: 1002;
}
.modal__overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1001;
}
</style>
