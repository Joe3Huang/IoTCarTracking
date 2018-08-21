import axios from './../../../backend/vue-axios'
import * as Cookies from 'js-cookie'

const defaultState = {
  userName: '',
  loggedInStatus: false,
  authToken: '',
  uid: '',
  message: ''
}

const getters = {
  getToken: (state) => {
    return state.authToken
  },
  isLoggedin: (state) => {
    return state.loggedInStatus
  },
  getMessage: (state) => {
    return state.message
  }
}

const mutations = {
  addWebToken: function (state, webToken) {
    state.authToken = webToken
    state.loggedInStatus = true
  },
  removeWebToken: function (state) {
    state.authToken = ''
    state.user.authToken = false
  },
  resetState: function (state) {
    // this.state = getDefaultData()
    // store.replaceState(defaultState)
    state.userName = ''
    state.loggedInStatus = false
    state.authToken = ''
    state.uid = ''
    state.message = ''
  },
  addUid: function (state, uid) {
    state.uid = uid
  },
  SET_MESSAGE: function (state, message) {
    state.message = message
  }
}

const actions = {
  login: function (context, userInput) {
    axios.post('/accessToken', {
      grant_type: 'password',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: '*',
      username: userInput.email,
      password: userInput.password
    })
      .then(function (response) {
        context.commit('addWebToken', response.data.access_token) // pass the webtoken as payload to the mutation
        Cookies.set('access_token', response.data.access_token, { expires: 7 })
        context.commit('SET_MESSAGE', '')
      })
      .catch(function (error) {
        console.log(error.response)
        if (error.response) {
          context.commit('SET_MESSAGE', error.response.data.error)
        }
      })
  },
  logout: function (context) {
    // your logout functionality
    context.commit('removeWebToken')
  },
  rest: function (context) {
    context.commit('resetState')
  },
  setUid: function (context, uid) {
    context.commit('addUid', uid)
  },
  getTheUserInfo: function (context) {
    return axios.get('/userInfo')
      .then(function (response) {
        console.log(response)
        context.commit('addUid', response.data.uid)
        return response
      })
      .catch(function (error) {
        console.log('rest')
        console.log(error.response)
      })
  }
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
