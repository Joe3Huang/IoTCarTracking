import axios from './../../../backend/vue-axios'

const defaultState = {
  device: []
}

const getters = {
  getUserDevices: (state) => {
    return state.device
  }
}

const mutations = {
  addDevices: function (state, deveices) {
    state.device = deveices
  },
  resetState: function (state) {
    state.device = []
  }
}

const actions = {
  getUserDevices: function (context) {
    axios.get('/device/userDevices')
      .then(function (response) {
        console.log(response)
        context.commit('addDevices', response.data)
      })
      .catch(function (error) {
        console.log('getUserDevices')
        console.log(error.response)
      })
  },
  disconnectTheDevice: function (context, deviceId) {
    axios.post('/device/resetDevice', {
      device_uid: deviceId
    })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log('disconnectTheDevice')
        console.log(error.response)
      })
  },
  rest: function (context) {
    context.commit('resetState')
  }
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
