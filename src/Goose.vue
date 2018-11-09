<template>
  <div class="input-box" 
    :style="'height:' + boxHeight + ';width:' + boxWidth + ';padding-top:' + explainHeight">
    <slot name="header"></slot>
    <div class="input-swiper">
      <div explain="slot" class="slot-box" ref="slotBox" :style="'height:' + slotHeight + ';width:' + slotWidth">
        <div class="slot-swiper" ref="slotSwiper">
          <div class="slot-one" key="_slot-one" >
            <slot name="icon-slot-one"></slot>
          </div>
          <div class="slot-two" key="_slot-two" >
            <slot name="icon-slot-two"></slot>
          </div>
        </div>
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
  name: 'Goose',
  data () {
    return {
      focus: false,
      empty: false,
      explainHeight: '',
      iconW: '',
      slotWidth: '',
      slotHeight: ''
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
      type: String,
      default: ''
    }
  },
  watch: {
    value (val) {
      if (!val && !this.focus) this._setBlur()
      if (val) this._setFocus()
    }
  },
  mounted () {
    this._setSlotBoxSize()
    if (this.value !== '') {
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
      if (this.value === '') {
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
      this._animaton()
    },
    _setSlotBoxSize () {
      if (this.fullWidth) {
        this.slotHeight = this.$refs.input.offsetHeight + 'px'
      } else if (typeof this.height === 'number') {
        this.slotHeight = `${this.height}px`
      } else {
        this.slotHeight = this.height
      }
      this.slotWidth = this.slotHeight.match(/\d*/)[0] * 2 + 'px'
    },
    _animaton () {
      this.$refs.slotSwiper.style.cssText = `transform: translateY(-100%)`
    },
    _backAnimation () {
      this.$refs.slotSwiper.style.cssText = `transform: translateY(0)`
    }
  }
}
</script>

<style scoped>
.input-box {
  display: flex;
  box-sizing: unset;
}
.input-swiper {
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex: 1;
}
input {
	outline: none;
  display: block;
  height: 35px;
  width: 100%;
  border: none;
  background: #CE02E8;
  color: white;
  font-size: 14px;
  padding: 0 2px;
}
.slot-box {
  overflow: hidden;
}
.slot-box div {
  height: 100%;
  width: 100%
}
.slot-swiper {
  transition: transform .5s ease;
}
</style>