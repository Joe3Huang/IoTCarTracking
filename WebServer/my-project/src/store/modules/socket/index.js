
const defaultState = {
  isConnected: false,
  isAuthenticated: false,
  message: '',
  reconnectError: false,
  // latitude: '',
  // longitude: '',
  // device_code: '',
  // devices: [],
  deviceData: {},
  browserUserData: {}
}

const getters = {
  getPosition: (state) => {
    return { latitude: state.latitude, longitude: state.longitude }
  },
  getDeviceData: (state) => {
    // console.log(state.deviceData)
    return state.deviceData
  },
  getBrowserUserData: (state) => {
    return state.browserUserData
  },
  isConnected: (state) => {
    return state.isConnected
  },
  isAuthenticated: (state) => {
    return state.isAuthenticated
  }
}

const mutations = {
  SOCKET_ONOPEN (state) {
    state.isConnected = true
  },
  SOCKET_ONCLOSE (state, event) {
    state.socket.isConnected = false
  },
  SOCKET_ONERROR (state, event) {
    console.error(state, event)
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE (state, message) {
    console.log(message)
    state.message = message
  },
  // mutations for reconnect methods
  SOCKET_RECONNECT (state, count) {
    console.info(state, count)
  },
  SOCKET_RECONNECT_ERROR (state) {
    state.socket.reconnectError = true
  },
  SET_POSITION (state, input) {
    state.latitude = input.latitude
    state.longitude = input.longitude
  },
  SET_DEVICE_DATA (state, input) {
    state.deviceData = input
  },
  SET_BROWSERUSER_DATA (state, input) {
    state.browserUserData = input
  },
  RESET (state) {
    // state.isConnected = false
    state.isAuthenticated = false
    state.message = ''
    state.reconnectError = false
    state.deviceData = {}
    state.browserUserData = {}
  },
  SET_AUTH_TRUE (state) {
    state.isAuthenticated = true
  },
  SET_AUTH_FALSE (state) {
    state.isAuthenticated = false
  }
}

const actions = {
  rest: function (context) {
    context.commit('RESET')
  }
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
