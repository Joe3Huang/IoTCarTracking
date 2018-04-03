import axios from './../../../backend/vue-axios'

const defaultState = {
  device: []
}

const getters = {
}

const mutations = {
  addDevices: function (state, deveices) {
    state.device = deveices
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
  }
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
