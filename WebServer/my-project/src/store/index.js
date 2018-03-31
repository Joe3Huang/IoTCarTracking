import Vue from 'vue'
import Vuex from 'vuex'
import axios from './../backend/vue-axios'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
Vue.use(Vuex)

let store

function getDefaultData () {
  return {
    user: {
      userName: '',
      loggedInStatus: true,
      authToken: ''
    }
  }
}

const initStore = () => {
  return store || (store = new Vuex.Store({
    state: {
      user: {
        userName: '',
        loggedInStatus: true,
        authToken: ''
      }
    },
    plugins: [createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
        removeItem: key => Cookies.remove(key)
      }
    })],
    mutations: {
      addWebToken: function (state, webToken) {
        state.user.authToken = webToken
        state.user.userName = 'safasfassad'
      },
      removeWebToken: function (state) {
        state.user.authToken = ''
        state.user.authToken = false
      },
      resetState: function (state) {
        // this.state = getDefaultData()
        store.replaceState(getDefaultData())
      }
    },
    actions: {
      login: function (context, userInput) {
        axios.post('/accessToken', {
          grant_type: 'password',
          client_id: '6',
          client_secret: '3FGAU0peIBuIjdrazcaKpb2LzypqIRwuJfjiPENN',
          scope: '*',
          username: userInput.email,
          password: userInput.password
        })
          .then(function (response) {
            console.log(response)
            context.commit('addWebToken', response.data.access_token) // pass the webtoken as payload to the mutation
          })
          .catch(function (error) {
            console.log(error.response)
          })
      },
      logout: function (context) {
        // your logout functionality
        context.commit('removeWebToken')
      },
      rest: function (context) {
        context.commit('resetState')
      }
    }
  }))
}
export default initStore
