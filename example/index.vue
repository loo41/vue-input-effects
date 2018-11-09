<template>
  <div class="swpier-box">
    <div class="swpier">
      <div class="box">
        <!-- :disabled="true" -->
        <Input
          :autofocus="true"
          v-model="input0"
          @focus="_focus"
          @blur="_blur"
          @change="_change"
        />
      </div>
      <div class="box">
        <Shy 
          v-model="input1"
          :full-width="true"
          :height="50"
        >
          <div slot="icon-slot" class="input1"></div>
        </Shy>
      </div>
      <div class="box">
        <Dird v-model="input2" :full-width="true"/>
      </div>
      <div class="box">
        <Duck v-model="input3">
          <div slot="icon-slot" class="input3"></div>
        </Duck>
      </div>
      <div class="box">
        <Fish v-model="input4">
          <div slot="icon-slot" class="input4">阳光网站</div>
        </Fish>
      </div>
      <div class="box">
        <Goose v-model="input5">
          <div slot="icon-slot-one" class="input5-one"></div>
          <div slot="icon-slot-two" class="input5-two"></div>
        </Goose>
      </div>
      <div class="box">
        <Panda v-model="input6">
          <div slot="icon-slot-two" class="input6">阳光网站</div>
        </Panda>
      </div>
      <div class="box">
        <Pig v-model="input7"/>
      </div>
    </div>
  </div>
</template>

<script>
// import {Input, Shy, Dird, Duck, Fish, Goose, Panda, Pig} from '../src'
export default {
  data () {
    return {
      input0: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: ''
    }
  },
  // components: {Input, Shy, Dird, Duck, Fish, Goose, Panda, Pig}
  watch: {
    input0 (val) {
      console.log('input0_______' + val)
    },
    input1 (val) {
      console.log('input1_______' + val)
    },
    input2 (val) {
      console.log('input2_______' + val)
    },
    input3 (val) {
      console.log('input3_______' + val)
    },
    input4 (val) {
      console.log('input4_______' + val)
    },
    input5 (val) {
      console.log('input5_______' + val)
    },
    input6 (val) {
      console.log('input6_______' + val)
    },
    input7 (val) {
      console.log('input7_______' + val)
    }
  },
  methods: {
    _focus (e) {
      console.log(e)
    },
    _blur (e) {
      console.log(e)
    },
    _change (e, val) {
      console.log(e)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.swpier-box {
  height: 100%;
  width: 100%;
}
.swpier {
  width: 1024px;
  margin: 0 auto;
}
.box {
  height: 60px;
  width: 100%;
  margin-top: 50px;
}

/*shy*/
.input1 {
  height: 100%;
  width: 100%;
  background: #CE02E8
}

/*Duck*/
.input3 {
  height: 100%;
  width: 100%;
  background: #8D6BFF
}

/*Fish*/
.input4 {
  height: 100%;
  width: 100%;
  background: #8D6BFF;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  padding: 0 10px;
}

/*Goose*/
.input5-one {
  height: 100%;
  width: 100%;
  background: black;
}
.input5-two {
  height: 100%;
  width: 100%;
  background: #8D6BFF;
}

/*Panda*/
.input6 {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: white;
  padding-left: 10px;
  background: #8D6BFF;
}
</style>
