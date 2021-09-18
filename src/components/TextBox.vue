<template>
  <div class="text-box">

    <div class="text-box__input form__input form__textarea"
      contenteditable="true"
      role="textbox"
      tabindex="0"
      v-bind:spellcheck="spellcheck"
      v-on:input="onInput"
      v-on:keydown="onKeydown"
      ref="input"
    >{{ _value }}</div>

  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    spellcheck: {
      type: Boolean,
      default: true
    },
    rows: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      _value: ''
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
    onInput(event) {
      this.value = this.getStrFromContentEditable(event.target)
    },
    onKeydown(event) {
      if (event.key === 'Enter' && !event.ctrlKey) {
        event.preventDefault()
        return
      }
      
      if (event.key === 'Enter' && event.ctrlKey) {
        const div = document.createElement('div')
        const br = document.createElement('br')

        div.append(br)

        const range = window.getSelection().getRangeAt(0)
        range.deleteContents()
        range.insertNode(div)
        range.collapse()
      }
    },

    getStrFromContentEditable(el) {
      const html = el.innerHTML
      const firstLine = html.match(/.*(<div>)?/i)[0].replace(/<div>.*/gi, '')

      const divList = html.match(/<div>.*?<\/div>/gi) || []
      const divListWithoutBr = divList.map(div => div.replace(/<div><br><\/div>/gi, ''))
      const restLines = divListWithoutBr.map(div => div.replace(/(<\/?[^>]+>)/gi, ''))
      const allLines = firstLine === '' ? restLines : [firstLine].concat(restLines)

      return allLines.map(line => line.replace(/&nbsp;/gi, ' ')).join('\r\n')
    },
    setHeight() {
      const lineHeight = 20
      const padding = 6
      const minHeight = this.rows * lineHeight + padding * 2

      this.$refs.input.style.minHeight = minHeight + 'px'
    }
  },
  created() {
    this._value = this.value
  },
  mounted() {
    this.setHeight()
  }
}
</script>

<style scoped>
.text-box__input {
  max-height: 212px;

  width: inherit;
  height: inherit;

  white-space: pre-line;
  word-break: break-word;

  outline: none;
  overflow-y: auto;
}
</style>
