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
      <div explain="seat" class="seat">
        <slot name="icon-slot-one"></slot>
      </div>
      <div explain="shading" class="shading" ref="shading" @click="_shading">
        <slot name="icon-slot-two"></slot>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'Panda',
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
      this.$refs.shading.style.cssText = `left: 70%`
    },
    _backAnimation () {
      this.$refs.shading.style.cssText = `left: 0%`
    },
    _shading () {
      this.$refs.input.focus()
    }
  }
}
</script>

<style scoped>
.input-box {
  display: flex;
  box-sizing: unset!important;
}
.input-swiper {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex: 1;
}
input {
	outline: none;
  display: block;
  height: 35px;
  width: 100%;
  border: none;
  padding: 0;
  background: #CE02E8;
  color: white;
  font-size: 14px;
  padding: 0 2px;
}
.seat {
  width: 40%;
}
.shading {
  top: 0;
  left: 0%;
  right: 0;
  bottom: 0;
  position: absolute;
  transition: all .5s ease;
}
</style>