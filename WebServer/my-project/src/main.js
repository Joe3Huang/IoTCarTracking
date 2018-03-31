// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from './backend/vue-axios'
import VueAxios from 'vue-axios'
import store from './store'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
console.log(store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  components: { App },
  template: '<App/>'
})
