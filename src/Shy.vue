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
      <div explain="underline" v-show="underlineShow">
        <div 
          class="default-underline"
          :style="'background:' + defaultUnderlineColor"
        >
        </div>
        <div 
          :class="empty? 'active-underline active': 'active-underline'" 
          :style="'transform-origin:' + location + ';' + 'background:' + underlineColor"
        >
        </div>
      </div>
      <div explain="......" v-show="iconShow">
        <div 
          class="slot-box"
          ref="slotBox"
          :style="'height: 100%' + ';width:' + iconHeight + ';' + position + ';'">
          <slot name="icon-slot"></slot>
        </div>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'Shy',
  data () {
    return {
      empty: false,
      focus: this.autofocus,
      iconHeight: ''
    }
  },
  props: {
    inputStyle: {
      type: String,
      default: ''
    },
    height: {
      type: [String, Number],
      default: 60
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
    underlineColor: String,
    defaultUnderlineColor: String,
    underlineShow: {
      type: Boolean,
      default: true
    },
    iconShow: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  watch: {
    height () {
      this._setIconBoxHeight()
    },
    value (val) {
      if (val || this.focus) {
        this._setFocus()
      } else {
        this._setBlur()
      }
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
      if (typeof this.height === 'number') return `${this.height}px`
      else return this.height
    },
    boxWidth () {
      if (this.fullWidth) return `100%`
      else if (typeof this.width === 'number') return `${this.width}px`
      else return this.width
    },
    position () {
      if (this.location === 'left') {
        return `left: 0`
      } else if (this.location === 'right') {
        return `right: 0`
      } else {
        return `display: none`
      }
    }
  },
  mounted () {
    this._setIconBoxHeight()
    if (this.value !== '') {
      this._setFocus()
    }
  },
  methods: {
    _setIconBoxHeight () {
      if (this.fullWidth) return this.iconHeight = this.$refs.input.offsetHeight + 'px'
      else if (typeof this.height === 'number') this.iconHeight = `${this.height}px`
      else this.iconHeight = this.height
    },
    _blur (e) {
      this.focus = false
      if (e) this.$emit('blur', e)
      this._setBlur(e)
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
      if (e) this.$emit('focus', e)
      this._setFocus(e)
    },
    _setFocus () {
      this.empty = true
      this._animaton()
    },
    _animaton () {
      let height = this.fullWidth? this.iconHeight.match(/\d*/)[0] : this.height
      let width = this.$refs.input.offsetWidth - height
      this.$refs.slotBox.style.transform = `translateX(${this.location === 'right'? `-${width}`: width}px)`
      this.control = setTimeout(() => {
        if (this.empty) this.$refs.slotBox.style.zIndex = `-10`
      }, 1000)
    },
    _backAnimation () {
      clearTimeout(this.control)
      this.$refs.slotBox.style.zIndex = `1`
      this.$refs.slotBox.style.transform = `translateX(0)`
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
.default-underline {
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  height: 1px;
  z-index: 1;
  background: #D1D1D1;
}
.active-underline {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  bottom: 0;
  z-index: 2;
  background: #CE02E8;
  transform: scaleX(0);
  transition: transform 1s;
}
.active {
  transform: scaleX(1);
}
input {
	outline: none;
  display: block;
  height: 35px;
  width: 100%;
  border: none;
  font-size: 14px;
  padding: 0;
}
.slot-box {
  position: absolute;
  top: 0;
  bottom: 0;
  transition: transform 1s;
  transform: translateX(0)
}
</style>