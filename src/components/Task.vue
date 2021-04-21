<template>
  <li class="task">

    <div class="task__container">
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
          <pre class="task__notes-pre">{{ notes }}</pre>
        </div>
      </div>

      <popup ref="menu" class="task__menu">

        <template v-slot:opener>
          <button class="popup__opener button button_type_icon button_icon_menu"
            v-on:click="toggleMenu"
          >menu</button>
        </template>

        <template v-slot:content>
          <ul class="popup__action-list">
            <li class="popup__action">
              <button class="popup__action-button button button_type_popup button_icon_edit"
                v-on:click="openModalEditTask(), closeMenu()"
              >Edit</button>
            </li>
            <li class="popup__action">
              <button class="popup__action-button button button_type_popup button_icon_delete button_color_red"
                v-on:click="emitDelete(), closeMenu()"
              >Delete</button>
            </li>
          </ul>
        </template>

      </popup>

    </div>

    <div class="task__outer">
      <modal ref="modalEditTask">
        <form-edit-task
          v-bind="dataForEditing"
          v-on:success="emitEdit($event), closeModalEditTask()"
          v-on:cancel="closeModalEditTask"
        ></form-edit-task>
      </modal>
    </div>

  </li>
</template>

<script>
import Modal from './Modal.vue';
import FormEditTask from './FormEditTask.vue';
import Popup from './Popup.vue';

export default {
  name: 'task',
  components: {
    Modal,
    FormEditTask,
    Popup
  },
  emits: ['change-done', 'edit', 'delete'],
  props: {
    id: String,
    done: Boolean,
    name: String,
    notes: String
  },
  computed: {
    dataForEditing() {
      return {
        name: this.name,
        notes: this.notes
      };
    }
  },
  methods: {
    // Modals
    openModalEditTask() {
      this.$refs.modalEditTask.open();
    },
    closeModalEditTask() {
      this.$refs.modalEditTask.close();
    },

    // Popups
    toggleMenu() {
      this.$refs.menu.toggle();
    },
    closeMenu() {
      this.$refs.menu.close();
    },

    emitChangeDone(event) {
      const done = event.target.checked;

      this.$emit('change-done', {
        id: this.id,
        done
      });
    },
    emitEdit({ name, notes }) {
      this.$emit('edit', {
        id: this.id,
        name,
        notes
      });
    },
    emitDelete() {
      this.$emit('delete', this.id);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/utils/vars.scss';

.task {
  position: relative;
  list-style: none;
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 5px;
  transition: border 150ms ease-in-out;
}

.task:not(:last-of-type) {
  margin-bottom: 2px;
}

.task:hover {
  border: 2px solid #efefef;
}

.task__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 12px;
}

.task__outer {
  position: absolute;
  right: 0;
  bottom: 100%;
}

.task__done {
  margin-right: 8px;
}

.task__content {
  width: 100%;
}

.task__name {
  font-size: 14px;
  font-weight: bold;
  color: $colorBlack;
}

.task__notes-pre {
  margin: 0;
  font-family: $font_main;
  font-size: 13px;
  color: $colorGray;
  white-space: pre-wrap;
}
</style>
