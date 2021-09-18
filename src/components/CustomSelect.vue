<template>
  <div class="select"
    v-bind:class="{ 'select_open': isOpened }"
  >

    <input class="select__input" 
      readonly
      v-model="value"
      v-bind:placeholder="emptyOption"
      v-on:click="toggle"
      v-on:keydown="onKeydownInput"
      ref="input"
    >
    <div class="select__options">
      <ul class="select__option-list">
        <li class="select__option select__option_empty"
          empty
          tabindex="0"
          v-on:click="onClickEmptyOption"
          v-on:keydown="onKeydownEmptyOption"
          ref="firstOption"
        >{{ emptyOption }}</li>
        <li class="select__option"
          tabindex="0"
          v-for="(option, id) in options"
          v-bind:key="id"
          v-bind:data-value="option"
          v-on:click="onClickOption"
          v-on:keydown="onKeydownOption"
        >{{ option }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    options: Array,
    modelValue: String
  },
  emits: ['update:modelValue'],
  data() {
    return {
      emptyOption: 'Not chosed',
      isOpened: false
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    toggle() {
      this.isOpened = !this.isOpened
    },
    open() {
      this.isOpened = true
    },
    close() {
      this.isOpened = false
    },

    onClickEmptyOption() {
      this.value = ''
    },
    onClickOption(event) {
      this.value = event.target.dataset.value
    },
    onKeydownInput(e) {
      if (e.key === 'Enter') {
        e.preventDefault()
        this.toggle()
        
        if (this.isOpened) {
          this.$refs.firstOption.focus()
        }
      }
    },
    onKeydownEmptyOption(e) {
      if (e.key === 'Enter') {
        e.preventDefault()
        this.value = ''
        this.close()
        this.$refs.input.focus()
      }
    },
    onKeydownOption(e) {
      if (e.key === 'Enter') {
        e.preventDefault()
        this.value = e.target.dataset.value
        this.close()
        this.$refs.input.focus()
      }
    },
    handlerDocumentClick() {
      document.body.addEventListener('click', event => {
        if (!this.$el.contains(event.target) && !event.target.closest('.select')) {
          this.close()
        }
      })
    }
  },
  mounted() {
    this.handlerDocumentClick()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/utils/vars.scss';

.select {
  width: 100%;
  position: relative;
  z-index: $zIndexModal;
}

.select__input {
  width: 100%;
  padding: 6px;
  display: block;
  
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  color: #464646;

  background-color: #f0f2f5;
  border: none;
  border-radius: 3px;
  outline: none;
  user-select: none;
  cursor: pointer;
}

.select__input:focus {
  background-color: #f6f7f9;
  border: none;
  outline: none;
}

.select__options {
  width: 100%;
  height: 100%;
  max-height: 134px;
  margin-top: 3px;
  padding: 6px;
  position: relative;

  display: none;

  background-color: #fff;
  border: 1px solid #f0f2f5;
  border-radius: 3px;

  overflow-y: auto;
  z-index: $zIndexModal;
}

.select__options::before {
  content: '';
  display: block;
  width: 100%;
  height: 3px;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-100%);

  background-color: rgba(255, 255, 255, 0);
}

.select__option-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.select_open .select__options {
  display: block;
}

.select__option {
  padding: 6px 10px;

  font-size: 13px;
  color: #464646;

  background-color: rgba(255, 255, 255, 0);
  border-radius: 3px;
  outline: none;

  user-select: none;
  cursor: pointer;
  transition: background-color .15s ease-out;
}

.select__option:focus {
  background-color: rgba(0,0,0,.02);
}

.select__option:hover {
  background-color: rgba(0,0,0,.02);
}

.select__option_empty {
  color: #aaa;
}
</style>
