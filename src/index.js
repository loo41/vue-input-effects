import Input from './Input.vue'
import Shy from './Shy.vue'
import Dird from './Dird.vue'
import Duck from './Duck.vue'
import Fish from './Fish.vue'
import Goose from './Goose.vue'
import Panda from './Panda.vue'
import Pig from './Pig.vue'

function install (Vue) {
  Vue.component('Input', Input);
  Vue.component('Shy', Shy);
  Vue.component('Dird', Dird);
  Vue.component('Duck', Duck);
  Vue.component('Fish', Fish);
  Vue.component('Goose', Goose);
  Vue.component('Panda', Panda);
  Vue.component('Pig', Pig);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export {
  Input,
  Shy,
  Dird,
  Duck,
  Fish,
  Goose,
  Panda,
  Pig,
  install
}

export default install
