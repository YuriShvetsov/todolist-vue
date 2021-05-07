<template>
  <li class="list-item"
    v-bind:class="{ 'list-item_active': isActive }"
  >
    <button class="list-item__button button"
      v-on:click="openList(id)"
    >
      <div class="list-item__name">{{ name }}</div>
      <div class="list-item__count">{{ todos.length }}</div>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'list-item',
  props: {
    id: String,
    name: String,
    todos: Array,
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions([
      'openList'
    ])
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
