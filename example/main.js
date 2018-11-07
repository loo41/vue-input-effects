import Vue from 'vue'
import Index from './index.vue'
import iput from '../src'
// import iput from '../dist/vue-input.js'

Vue.config.productionTip = false
Vue.use(iput)

new Vue({
  render: h => h(Index),
}).$mount('#app')
