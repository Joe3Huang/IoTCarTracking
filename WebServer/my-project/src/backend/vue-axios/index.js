// import Vue from 'vue'
import axios from 'axios'
// import VueAxios from 'vue-axios'
// import axios from './axios'
// process.env.API_URL
const API_URL = 'http://192.168.99.100:8080/RestApi'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  }
})

// Vue.use(VueAxios, axios)
