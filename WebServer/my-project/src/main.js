// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from './backend/vue-axios'
import VueAxios from 'vue-axios'
import store from './store'
require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  components: { App },
  template: '<App/>'
})
