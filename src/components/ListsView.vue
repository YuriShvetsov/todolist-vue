<template>
  <div class="lists-view">

    <div class="lists-view__header">
      <div class="lists-view__title title title_size_s">My lists</div>
      <button class="lists-view__add-button button"
        v-on:click="openModalAddList"
      >New list</button>
    </div>

    <div class="lists-view__body">
      <ul class="lists-view__ul">
        <list-item
          v-for="list in lists"
          v-bind:key="list.id"
          v-bind="list"
          v-bind:isActive="listIsOpened(list.id)"
          v-on:open="emitOpenList"
        />
      </ul>
    </div>

    <modal ref="modalAddList">
      <form-add-list
        v-on:success="emitAddList($event), closeModalAddList()"
        v-on:cancel="closeModalAddList"
      ></form-add-list>
    </modal>

  </div>  
</template>

<script>
import ListItem from './ListItem.vue';
import Modal from './Modal.vue';
import FormAddList from './FormAddList.vue';

export default {
  name: 'lists-view',
  emits: ['open-list', 'add-list'],
  components: {
    ListItem,
    Modal,
    FormAddList
  },
  props: {
    lists: Array,
    openedListId: String
  },
  data() {
    return {};
  },
  computed: {

  },
  methods: {
    openModalAddList() {
      this.$refs.modalAddList.open();
    },
    closeModalAddList() {
      this.$refs.modalAddList.close();
    },

    emitOpenList(id) {
      this.$emit('open-list', id);
    },
    emitAddList(data) {
      this.$emit('add-list', data);
    },

    listIsOpened(id) {
      return id === this.openedListId;
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
  align-items: center;
  padding: 12px 0;
}

.lists-view__ul {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 12px 0;
}
</style>
