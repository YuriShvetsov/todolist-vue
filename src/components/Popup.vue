<template>
  <div class="popup"
    ref="popup"
    v-on:mouseleave="close"
  >

    <slot name="opener"></slot>
    
    <transition name="fade-translate">
      <div class="popup__content"
        v-show="isOpened"
      >
        <slot name="content"></slot>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'popup',
  data() {
    return {
      isOpened: false
    };
  },
  methods: {
    toggle() {
      this.isOpened = !this.isOpened;
    },
    close() {
      this.isOpened = false;
    },

    onListeners() {
      document.addEventListener('click', this.onDocumentClick);
    },
    removeListeners() {
      document.removeEventListener('click', this.onDocumentClick);
    },
    onDocumentClick(event) {
      const target = event.target;

      if (!this.$refs.popup.contains(target)) this.close();
    }
  },
  mounted() {
    this.onListeners();
  },
  unmounted() {
    this.removeListeners();
  }
}
</script>
