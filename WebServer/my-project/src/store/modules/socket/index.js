
const defaultState = {
  isConnected: false,
  message: '',
  reconnectError: false,
  latitude: '',
  longitude: ''
}

const getters = {
  getPosition: (state) => {
    return { latitude: state.latitude, longitude: state.longitude }
  }
}

const mutations = {
  SOCKET_ONOPEN (state, event) {
    state.socket.isConnected = true
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
    console.log(input)
    state.latitude = input.latitude
    state.longitude = input.longitude
  }
}

const actions = {
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
