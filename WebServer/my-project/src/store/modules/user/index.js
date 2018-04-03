import axios from './../../../backend/vue-axios'

const defaultState = {
  userName: '',
  loggedInStatus: false,
  authToken: '',
  uid: ''
}

const getters = {
  getToken: (state) => {
    return state.authToken
  },
  isLoggedin: (state) => {
    return state.loggedInStatus
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
  },
  addUid: function (state, uid) {
    state.uid = uid
  }
}

const actions = {
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
  },
  setUid: function (context, uid) {
    context.commit('addUid', uid)
  },
  getTheUserInfo: function (context) {
    axios.get('/userInfo')
      .then(function (response) {
        console.log(response)
        context.commit('addUid', response.data.uid)
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
