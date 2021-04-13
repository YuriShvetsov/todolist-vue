<template>
  <li class="task">

    <div class="task__done">
      <label class="task__done-label">
        <input type="checkbox"
          class="task__done-input"
          v-bind:checked="done"
          v-on:change="emitChangeDone"
        >
      </label>
    </div>

    <div class="task__content">
      <div class="task__name">{{ name }}</div>
      <div class="task__notes">
        <pre class="task__pre-notes">{{ notes }}</pre>
      </div>
    </div>

    <div class="task__menu">
      <div class="task__menu-container">
        <button v-on:click="emitEdit">Edit</button>
        <button v-on:click="emitDelete">Delete</button>
      </div>
    </div>

  </li>
</template>

<script>
export default {
  props: {
    id: String,
    done: Boolean,
    name: String,
    notes: String
  },
  methods: {
    emitChangeDone() {
      
    },
    emitEdit() {

    },
    emitDelete() {

    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  list-style: none;
  background-color: #fff;
  border-radius: 5px;
}

.task__done {
  margin-right: 8px;
}

.task__content {
  width: 100%;
}
</style>
