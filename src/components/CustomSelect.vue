<template>
  <div class="select">

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
          v-on:click="clear"
        >{{ emptyOption }}</li>
        <li class="select__option"
          tabindex="0"
          v-for="(option, id) in options"
          v-bind:key="id"
          v-bind:data-value="option"
          v-on:click="choose"
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
      this.$el.classList.toggle('select_open')

      if (!this.$el.classList.contains('select_open')) {
        setTimeout(() => this.$refs.input.blur())  
      }
    },
    close() {
      this.$el.classList.remove('select_open')
    },

    clear() {
      this.value = ''
      this.$refs.input.blur()
      setTimeout(() => this.$refs.input.blur())
    },
    choose(event) {
      const optionValue = event.target.dataset.value

      this.value = optionValue
      setTimeout(() => this.$refs.input.blur())
    },

    onKeydownInput(e) {
      if (e.key === 'Enter') {
        e.preventDefault()
        this.toggle()
      }
    },
    onKeydownOption(e) {
      if (e.key === 'Enter') {
        this.value = e.target.dataset.value
        this.close()
      }
    },
    handlerDocumentClick() {
      document.body.addEventListener('click', event => {
        if (!event.target.closest('.select')) {
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
