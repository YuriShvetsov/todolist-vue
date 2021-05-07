<template>
  <div class="popup"
    v-on:mouseleave="close"
  >

    <slot name="opener"></slot>
    
    <transition name="fade-translate"
      v-on:enter="checkContentPosition"
    >
      <div class="popup__content"
        ref="content"

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
    }
  },
  methods: {
    toggle() {
      this.isOpened = !this.isOpened
    },
    close() {
      this.isOpened = false
    },

    checkContentPosition() {
      const rect = this.$refs.content.getBoundingClientRect()
      const toWinLowerBound = window.innerHeight - rect.bottom
      const minDistance = 40
      const maxDistance = rect.height + minDistance

      if (toWinLowerBound < minDistance) {
        this.$refs.content.classList.add('popup__content_pos_bottom')
      }
      else if (toWinLowerBound >= maxDistance) {
        this.$refs.content.classList.remove('popup__content_pos_bottom')
      }
    }
  }
}
</script>
