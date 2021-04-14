<template>
  <div class="modal">

    <transition name="fade-scale">
      <div class="modal__container"
        v-if="isVisible"
      >
        <slot></slot>
      </div>
    </transition>

    <transition name="fade">
      <div class="modal__overlay"
        v-if="isVisible"
        v-on:click="close"
      ></div>
    </transition>
    
  </div>
</template>

<script>
export default {
  name: 'modal',
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    open() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
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
  z-index: 100;
  pointer-events: none;
}
.modal__container {
  width: 100%;
  max-width: 450px;
  padding: 16px 0;
  position: absolute;
  left: 50%;
  top: 0;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  transform: translate(-50%, 65px);
  z-index: 102;
  pointer-events: all;
}
.modal__overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,.25);
  z-index: 101;
  pointer-events: all;
}

.fade-enter-active {
  animation: fade-in 150ms ease-in-out;
  animation-fill-mode: both;
}

.fade-leave-active {
  animation: fade-out 150ms ease-in-out;
  animation-fill-mode: both;
}

.fade-scale-enter-active {
  animation: fade-scale-in 150ms ease-in-out;
  animation-fill-mode: both;
}

.fade-scale-leave-active {
  animation: fade-scale-out 150ms ease-in-out;
  animation-fill-mode: both;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fade-scale-in {
  0% {
    opacity: 0;
    transform: translate(-50%, 65px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 65px) scale(1);
  }
}

@keyframes fade-scale-out {
  0% {
    opacity: 1;
    transform: translate(-50%, 65px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 65px) scale(0.95);
  }
}

</style>
