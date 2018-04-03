import axios from './../backend/vue-axios'

export default class RestResource {
  constructor (store) {
    this.store = store
  }
  getTheUserInfo () {
    axios.get('/userInfo')
      .then(function (response) {
        console.log(response)
        // console.log(this.store)
        // this.store.dispatch('setUid', response.data.uid)
      })
      .catch(function (error) {
        console.log('rest')
        console.log(error.response)
      })
  }
}
