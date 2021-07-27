<template>
  <li class="task" ref="task">

    <div class="task__container">
      <div class="task__done">
        <input type="checkbox"
          class="task__done-checkbox"
          v-bind:id="id"
          v-bind:checked="done"
          v-on:change="emitChangeDone"
        >
        <label class="task__done-label"
          v-bind:for="id"
        ></label>
      </div>

      <div class="task__content">
        <div class="task__name">{{ name }}</div>
        <div class="task__notes">
          <pre class="task__notes-pre">{{ notes }}</pre>
        </div>
      </div>

      <button class="task__replace-button button button_type_icon button_icon_grabber"
        v-on:mousedown="emitStartMoving"
      >Replace</button>

      <popup ref="menu" class="task__menu">

        <template v-slot:opener>
          <button class="task__menu-button popup__opener button button_type_icon button_icon_menu"
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
              <button class="popup__action-button button button_type_popup button_icon_copy"
                v-on:click="emitDublicate"
              >Dublicate</button>
            </li>
            <li class="popup__action">
              <button class="popup__action-button button button_type_popup button_icon_delete button_color_red"
                v-on:click="emitRemove(), closeMenu()"
              >Delete</button>
            </li>
          </ul>
        </template>

      </popup>

    </div>

    <div class="pointer pointer_pos_top js-top-pointer"></div>
    <div class="pointer pointer_pos_bottom js-bottom-pointer"></div>

    <div class="task__hover-bg"></div>

    <div class="task__outer">
      <modal ref="modalEditTask">
        <form-edit-task
          v-bind="dataForEditing"
          v-on:success="onSuccessFormEditTask"
          v-on:cancel="closeModalEditTask"
        ></form-edit-task>
      </modal>
    </div>

  </li>
</template>

<script>
import Modal from './Modal.vue'
import FormEditTask from './FormEditTask.vue'
import Popup from './Popup.vue'

export default {
  name: 'task',
  components: {
    Modal,
    FormEditTask,
    Popup
  },
  emits: ['change-done', 'update', 'remove', 'start-moving', 'dublicate'],
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
      }
    }
  },
  methods: {
    // Modals
    openModalEditTask() {
      this.$refs.modalEditTask.open()
    },
    closeModalEditTask() {
      this.$refs.modalEditTask.close()
    },

    // Popups
    toggleMenu() {
      this.$refs.menu.toggle()
    },
    closeMenu() {
      this.$refs.menu.close()
    },

    onSuccessFormEditTask(data) {
      this.emitUpdate(data)
      this.closeModalEditTask()
    },

    emitChangeDone() {
      this.$emit('change-done', this.id)
    },
    emitUpdate({ name, notes }) {
      this.$emit('update', {
        id: this.id,
        name,
        notes
      })
    },
    emitDublicate() {
      this.$emit('dublicate', this.id)
    },
    emitRemove() {
      this.$emit('remove', this.id)
    },
    emitStartMoving(e) {
      const leftButton = (e.which === 1) ? true : false

      if (!leftButton) return

      this.$emit('start-moving', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/utils/vars.scss';

.task {
  margin: 2px 0;

  position: relative;

  list-style: none;

  background-color: rgba(255, 255, 255, 0);
  border-radius: 5px;

  user-select: none;
  transition: background-color .15s ease-in-out;
}

.task_selected {
  background-color: lighten($colorViolet, 34%);
}

.task_signal {
  animation-fill-mode: both;
  animation: signal 2s ease-in-out;
}

.task__hover-bg{
  display: block;

  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transform: scaleX(0.5);

  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 5px;
  opacity: 0;

  pointer-events: none;
  transition: opacity .15s ease-in-out, transform .35s ease-in-out;
}

.task:hover .task__hover-bg {
  transform: scaleX(1);
  opacity: 1;
}

.task_selected:hover .task__hover-bg {
  opacity: 0;
}

.task_pointer:hover .task__hover-bg {
  opacity: 0;
}

.task__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 12px;
}

.task__done {
  margin-right: 12px;
}

.task__done-checkbox {
  display: none;
}

.task__done-label {
  display: block;
  width: 18px;
  height: 18px;

  position: relative;

  background-color: #fff;
  border: 2px solid #e4e4ee;
  border-radius: 50%;

  cursor: pointer;
  overflow: hidden;
  z-index: 1;
}

.task__done-label::before {
  content: "";
  display: block;

  width: 8px;
  height: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%) scale(1.5);

  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .2);
  opacity: 0;

  z-index: 2;
}

.task__done-checkbox:checked + .task__done-label {
  background-color: unset;
  background: linear-gradient(#f16377,#ed344e);
  border: none;
  box-shadow: inset 0 2px 3px rgba(0, 0, 0, .2);

  transition: background .15s ease-in-out;
}

.task__done-checkbox:checked + .task__done-label::before {
  transform: translate(-50%,-50%) scale(1);

  opacity: 1;

  transition: transform .15s ease-in-out;
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

.task__replace-button,
.task__menu-button {
  opacity: 0;
  pointer-events: none;
  transition: opacity .15s ease-in-out;
}

.task:hover .task__replace-button,
.task:hover .task__menu-button {
  pointer-events: all;
  opacity: 1;
}

.task_selected:hover .task__replace-button,
.task_selected:hover .task__menu-button,
.task_pointer:hover .task__replace-button,
.task_pointer:hover .task__menu-button {
  opacity: 0;
}

.pointer {
  width: calc(100% - 10px);
  height: 2px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  background-color: lighten($colorViolet, 10%);
  border-radius: 2px;
  opacity: 0;

  pointer-events: none;
}

.pointer_visible {
  opacity: 1;
  transition: opacity .15s ease-in-out;
}

.pointer_pos_top {
  bottom: 100%;
}

.pointer_pos_bottom {
  top: 100%;
}

.task__outer {
  position: absolute;
  right: 0;
  bottom: 100%;
}
</style>
