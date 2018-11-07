<template>
  <div class="input-box" 
    :style="'height:' + boxHeight + ';width:' + boxWidth">
    <slot name="header"></slot>
    <div class="input-swiper">
      <input
        @blur="_blur"
        ref="input"
        @change="_change"
        @focus="_focus"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        :autofocus="autofocus? 'autofocus': null"
        :placeholder="helpText"
        :disabled="disabled? 'disabled': null"
        :style="inputFieldStyle + ';' + 'height:' + boxHeight"
      />
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'Shy',
  data () {
    return {}
  },
  props: {
    inputStyle: {
      type: String,
      default: ''
    },
    height: {
      type: [String, Number],
      default: 35
    },
    width: {
      type: [String, Number],
      default: 260
    },
    location: {
      type: String,
      default: 'left'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    helpText: String,
    value: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    inputFieldStyle () {
      let styleArray = this.inputStyle.split(';')
      let len = styleArray.length
      for (let i = 0; i < len; i++) {
        if (/height|width/.test(styleArray[i])) {
          styleArray.splice(i, 1)
          i--
        }
      }
      return styleArray.join(';')
    },
    boxHeight () {
      if (this.fullWidth) return `100%`
      else if (typeof this.height === 'number') return `${this.height}px`
      else return this.height
    },
    boxWidth () {
      if (this.fullWidth) return `100%`
      else if (typeof this.width === 'number') return `${this.width}px`
      else return this.width
    }
  },
  methods: {
    _blur (e) {
      this.$emit('blur', e)
    },
    _change (e) {
      this.$emit('change', e, this.value)
    },
    _focus (e) {
      this.$emit('focus', e)
    },
  }
}
</script>

<style scoped>
.input-box {
  display: flex;
}
.input-swiper {
  position: relative;
  box-sizing: border-box;
  flex: 1;
}
input {
	outline: none;
  display: block;
  height: 35px;
  width: 100%;
  border: 1px solid #CE02E8;
  font-size: 14px;
  padding: 0 10px;
  font-size: 14px;
  box-sizing: border-box;
  letter-spacing: 1px;
}
</style>