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
      <div 
        class="explain-title"
        @click="_explain"
        :style="empty? `transform: translateY(-${explainHeight}) scale(0.75)`: null"
      >
        <slot name="icon-slot"></slot>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'Fish',
  data () {
    return {
      empty: false,
      focus: this.autofocus,
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
    value: {
      type: [String, Number],
      default: ''
    }
  },
  watch: {
    height () {
      this._setBoxHeight()
    },
    value (val) {
      if (val || this.focus) {
        this._setFous()
      } else {
        this._setBlur()
      }
    }
  },
  mounted () {
    this._setBoxHeight()
    if (this.value !== '') {
      this._setFous()
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
      if (this.value === '') this.empty = false
    },
    _change (e) {
      this.$emit('change', e, this.value)
    },
    _focus (e) {
      this.focus = true
      if (e) this.$emit('focus', e)
      this._setFous(e)
    },
    _setFous (e) {
      this.empty = true
    },
    _setBoxHeight () {
      if (this.fullWidth) return this.explainHeight = this.$refs.input.offsetHeight * 0.75 + 'px'
      else if (typeof this.height === 'number') this.explainHeight = `${this.height * 0.75}px`
      else this.explainHeight = this.height.match(/\d*/)[0] * 0.75 + 'px'
    },
    _explain () {
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
  flex: 1;
}
.default-underline {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: #D1D1D1;
}
.active-underline {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
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
  padding: 0;
}
.explain-title {
  position: absolute;
  left: 0;
  width: auto;
  top: 0;
  bottom: 0;
  transition: all .5s ease;
  transform-origin: left top;
}
</style>