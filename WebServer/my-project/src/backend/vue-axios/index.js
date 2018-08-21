// import Vue from 'vue'
// import { API_URL } from '../../config'
import axios from 'axios'
// import VueAxios from 'vue-axios'
// import axios from './axios'
// process.env.API_URL
// const API_URL = 'http://192.168.99.100:8080/RestApi'

export default axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' // + store.getters.getToken
  }
})

// Vue.use(VueAxios, axios)
