<template>
  <div class="input-box" 
    :style="'height:' + boxHeight + ';width:' + boxWidth + ';padding-top:' + explainHeight">
    <slot name="header"></slot>
    <div class="input-swiper">
      <div explain="slot" class="_icon-box" :style="'height:' + iconH + ';width:' + iconW">
        <slot name="icon-slot"></slot>
      </div>
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
  name: 'Duck',
  data () {
    return {
      focus: this.autofocus,
      empty: false,
      explainHeight: '',
      iconH: '',
      iconW: ''
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
      this.value = val
      if (val && !this.empty) {
        this._setFocus()
      }
      if ((!val || this.empty) && !this.focus) {
        this._setBlur()
      } 
    }
  },
  created () {
    this._setIconBoxSize()
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
  mounted () {
    if (this.value !== '') {
      this._setFocus()
    }
  },
  methods: {
    _blur (e) {
      this.$emit('blur', e)
      this.focus = false
      this._setBlur()
    },
    _setBlur () {
      if (this.value === '') {
        this.empty = false
        this._backAnmation()
      }
    },
    _change (e) {
      this.$emit('change', e, this.value)
    },
    _focus (e) {
      this.$emit('focus', e)
      this.focus = true
      this._setFocus()
    },
    _setFocus () {
      if (this.empty) return
      this.empty = true
      this._anmation()
    },
    _setIconBoxSize () {
      if (this.fullWidth) {
        this.iconH = this.$refs.input.offsetHeight + 'px'
        this.iconW = this.$refs.input.offsetHeight * 2 + 'px'
      } else if (typeof this.height === 'number') {
        this.iconH =  `${this.height}px`
        this.iconW = this.height * 2 + 'px'
      } else {
        this.iconH = this.height
        this.iconW = this.height.match(/\d*/)[0] * 2 + 'px'
      }
    },
    _anmation () {
      this.iconW = parseInt(this.iconW.match(/\d*/)[0] * (1 / 2)) + 'px'
    },
    _backAnmation () {
      this.iconW = parseInt(this.iconW.match(/\d*/)[0] *  2) + 'px'
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
  display: flex;
  box-sizing: border-box;
  flex: 1;
}
._icon-box {
  transition: width 1s ease;
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
  padding: 0 2px;
  font-size: 14px;
}
</style>