<template>
  <div class="lists-view">

    <div class="lists-view__header">
      <div class="lists-view__title">My lists</div>
      <button class="lists-view__add-button"
        v-on:click="emitAddList"
      >New list</button>
    </div>

    <div class="lists-view__body">
      <ul class="lists-view__ul">
        <list-item
          v-for="list in lists"
          v-bind:key="list.id"
          v-bind="list"
          v-on:open="emitOpenList"
        />
      </ul>
    </div>

  </div>  
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  name: 'lists-view',
  emits: ['open-list'],
  components: {
    'list-item': ListItem
  },
  props: {
    lists: Array
  },
  data() {
    return {}
  },
  methods: {
    emitAddList() {

    },
    emitOpenList(id) {
      this.$emit('open-list', id);
    },
    doSomething() {
      console.log('I am component <lists-view />');
    }
  }
}
</script>

<style scoped>
.lists-view {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
}

.lists-view__header {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
}

.lists-view__ul {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 12px 0;
}

.lists-view__add-button {
  display: block;
}
</style>
