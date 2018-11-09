<template>
  <div class="input-box" 
    :style="'height:' + boxHeight + ';width:' + boxWidth + ';padding-top:' + explainHeight">
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
      <div explain="underline" v-show="underlineShow">
        <div class="bottom-underline" :style="'background:' + underlineColor"></div>
        <div class="right-underline" ref="rightUnderline"></div>
        <div class="top-underline" ref="topUnderline"></div>
        <div class="left-underline" ref="leftUnderline"></div>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'pig',
  data () {
    return {
      focus: this.autofocus,
      empty: false,
      explainHeight: ''
    }
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
    underlineColor: String,
    underlineShow: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  watch: {
    value (val) {
      if (val || this.focus) {
        this._setFocus()
      } else {
        this._setBlur()
      }
    }
  },
  mounted () {
    if (this.value) {
      this._setFocus()
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
    },
  },
  methods: {
    _blur (e) {
      this.focus = false
      this.$emit('blur', e)
      this._setBlur()
    },
    _setBlur () {
      if (!this.value) {
        this.empty = false
        this._backAnimation()
      }
    },
    _change (e) {
      this.$emit('change', e, this.value)
    },
    _focus (e) {
      this.focus = true
      this.$emit('focus', e)
      this._setFocus()
    },
    _setFocus () {
      this.empty = true
      this._animation()
    },
    _animation () {
      const {underlineColor} = this
      this.$refs.rightUnderline.style.cssText = `transform: scale(1); background: ${underlineColor}`
      setTimeout(() => {
        if (this.empty) {
          this.$refs.leftUnderline.style.cssText = `transform: scale(1); background: ${underlineColor}`
        }
      }, 200)
      this.$refs.topUnderline.style.cssText = `transform: scale(1); background: ${underlineColor}`
    },
    _backAnimation () {
      const {underlineColor} = this
      setTimeout(() => {
        if (!this.empty) {
          this.$refs.topUnderline.style.cssText = `transform: scale(0); background: ${underlineColor}`
        }
      }, 200)
      setTimeout(() => {
        if (!this.empty) {
          this.$refs.rightUnderline.style.cssText = `transform: scale(0); background: ${underlineColor}`
        }
      }, 500)
      this.$refs.leftUnderline.style.cssText = `transform: scale(0); background: ${underlineColor}`
    }
  }
}
</script>

<style scoped>
.input-box {
  display: flex;
}
.input-swiper {
  position: relative;
  flex: 1;
}
.bottom-underline {
  position: absolute;
  bottom: 1px;
  left: 1px;
  right: 1px;
  height: 2px;
  background: #CE02E8;
  transition: transform 1s;
}
.right-underline {
  position: absolute;
  right: 1px;
  top: 1px;
  bottom: 1px;
  width: 2px;
  transform: scale(0);
  transform-origin: bottom right;
  background: #CE02E8;
  transition: transform .1s ease-in;
}
.top-underline {
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  height: 2px;
  background: #CE02E8;
  transform: scale(0);
  transform-origin: right top;
  transition: transform .2s ease-in;
}
.left-underline {
  position: absolute;
  left: 1px;
  top: 1px;
  bottom: 1px;
  width: 2px;
  transform-origin: left top;
  background: #CE02E8;
  transform: scale(0);
  transition: transform .1s ease-in;
}
input {
	outline: none;
  display: block;
  height: 35px;
  width: 100%;
  border: none;
  padding: 0 10px;
  font-size: 14px;
  box-sizing: border-box;
  letter-spacing: 1px;
}
</style>