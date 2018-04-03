import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import userModule from './modules/user'
import deviceModule from './modules/device'
Vue.use(Vuex)

let store

const initStore = () => {
  return store || (store = new Vuex.Store({
    modules: {
      user: userModule,
      device: deviceModule
    },
    plugins: [createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
        removeItem: key => Cookies.remove(key)
      }
    })]
  }))
}

export default initStore
