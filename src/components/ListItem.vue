<template>
  <li class="list-item">
    <button class="list-item__container"
      v-on:click="emitOpen"
    >
      <div class="list-item__name">{{ name }}</div>
      <div class="list-item__count">{{ tasks.length }}</div>
    </button>
  </li>
</template>

<script>
export default {
  emits: ['open'],
  props: {
    id: String,
    name: String,
    tasks: Array
  },
  methods: {
    emitOpen() {
      this.$emit('open', this.id);
    }
  }
}
</script>

<style scoped>
.list-item {
  width: 100%;
  list-style: none;
}

.list-item__container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.list-item__name {
  margin-right: 10px;
}
</style>
