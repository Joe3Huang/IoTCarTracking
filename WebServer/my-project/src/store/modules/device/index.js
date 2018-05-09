import axios from './../../../backend/vue-axios'

const defaultState = {
  devices: []
}

const getters = {
  getUserDevices: (state) => {
    return state.devices
  }
}

const mutations = {
  ADD_DEVICES: function (state, deveices) {
    state.devices = deveices
  },
  resetState: function (state) {
    state.devices = []
  },
  SET_DEVICE_DATA: function (state, layload) {
    let theDevice = state.devices.find(function (d) {
      return d.device_code == layload.device_code
    })
    if (theDevice) {
      Object.assign(theDevice, layload)
    }
  }
  // SET_DEVICE_CLOSE: function (state, layload) {
  //   let theDevice = state.devices.find(function (d) {
  //     return d.device_code == layload.device_code
  //   })
  //   if (theDevice) {
  //     Object.assign(theDevice, layload)
  //   }
  // },
}

const actions = {
  getUserDevices: function (context) {
    return axios.get('/device/userDevices')
      .then(function (response) {
        console.log(response)
        context.commit('ADD_DEVICES', response.data)
        return response
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
