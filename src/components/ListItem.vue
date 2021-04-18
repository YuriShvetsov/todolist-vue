<template>
  <li class="list-item"
    v-bind:class="{ 'list-item_active': isActive }"
  >
    <button class="list-item__button button"
      v-on:click="emitOpen"
    >
      <div class="list-item__name">{{ name }}</div>
      <div class="list-item__count">{{ tasks.length }}</div>
    </button>
  </li>
</template>

<script>
export default {
  name: 'list-item',
  emits: ['open'],
  props: {
    id: String,
    name: String,
    tasks: Array,
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitOpen() {
      this.$emit('open', this.id);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/utils/vars.scss';

.list-item {
  width: 100%;
  list-style: none;
}

.list-item__button {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 9px 12px;
  color: $colorBlack;
}

.list-item__name {
  text-transform: lowercase;
}

.list-item__name::first-letter {
  text-transform: uppercase;
}

.list-item__count {
  color: $colorGray;
}

.list-item_active .list-item__button {
  background-color: $colorVioletLightest;
}

.list-item__name {
  margin-right: 10px;
}
</style>
