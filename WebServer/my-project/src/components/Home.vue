<template>
  <div class="home header">
    <nav class="navbar navbar-light navbar-expand-md bg-faded justify-content-center container-fluid">
        <a href="/" class="brand-title navbar-brand d-flex w-50 mr-auto">IoT-CarTracking</a>
        <!-- <button v-b-toggle.collapsingNavbar3 class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
            <span class="navbar-toggler-icon"></span>
        </button> -->
        <b-btn v-b-toggle.collapse1 class="navbar-toggler" type="button" data-toggle="collapse">
            <span class="navbar-toggler-icon"></span>
        </b-btn>
        <b-collapse id="collapse1" class="navbar-collapse collapse" style="width: 1000px;">
          <b-card style="border:0px; margin:0px; padding:0px;">
            <ul class="nav navbar-nav pull-right">
                <li class="nav-item" v-if="this.$store.getters['user/isLoggedin']">
                    <a class="nav-link" href="#" v-on:click="bShowDevices = !bShowDevices">Devices</a>
                </li>
                <li class="nav-item" v-if="this.$store.getters['user/isLoggedin']">
                    <a class="nav-link" href="#" v-on:click="test()">Logout</a>
                </li>
                <li class="nav-item" v-if="!this.$store.getters['user/isLoggedin']">
                    <login></login>
                    <div class="d-flex justify-content-end">
                      <router-link class="nav-link" style="font-size: 50%; padding: 0px; margin: 2px 0 0 0;" to="/register">Register -</router-link>
                      <router-link class="nav-link" style="font-size: 50%; padding: 0px; margin: 2px 0 0 0;" to="/resetPassword">- Forgot Password</router-link>
                    </div>
                </li>
            </ul>
          </b-card>
        </b-collapse>
        <!-- <div class="navbar-collapse collapse" id="collapsingNavbar3" style="width: 1000px;">
            <ul class="nav navbar-nav pull-right">
                <li class="nav-item" v-if="this.$store.getters['user/isLoggedin']">
                    <a class="nav-link" href="#" v-on:click="bShowDevices = !bShowDevices">Devices</a>
                </li>
                <li class="nav-item" v-if="this.$store.getters['user/isLoggedin']">
                    <a class="nav-link" href="#" v-on:click="test()">Logout</a>
                </li>
                <li class="nav-item" v-if="!this.$store.getters['user/isLoggedin']">
                    <login></login>
                    <div class="d-flex justify-content-end">
                      <router-link class="nav-link" style="font-size: 50%; padding: 0px; margin: 2px 0 0 0;" to="/register">Register -</router-link>
                      <router-link class="nav-link" style="font-size: 50%; padding: 0px; margin: 2px 0 0 0;" to="/resetPassword">- Forgot Password</router-link>
                    </div>
                </li>
            </ul>
        </div> -->
    </nav>
    <device v-if="this.bShowDevices"></device>
    <div class="map">
        <google-map name="example" ref="googleMap"> </google-map>
    </div>
    <div>isLoggedin: {{ this.$store.getters['user/isLoggedin'] }}</div>
    <div>isConnected - socket: {{ this.$store.getters['socket/isConnected'] }}</div>
    <div>Authentication - socket: {{ this.$store.getters['socket/isAuthenticated'] }}</div>
  </div>
</template>

<script>
import Map from '@/components/Map'
import Login from '@/components/Login'
import Device from '@/components/Device'
import axios from './../backend/vue-axios'
import socketMixin from './../mixin/SocketMixin'
import * as Cookies from 'js-cookie'
export default {
  name: 'Home',
  mixins: [ socketMixin ],
  data () {
    return {
      msg: 'Welcome to Home page',
      bShowDevices: false
    }
  },
  beforeCreate () {
    console.log('Nothing gets called before me!')
  },
  created () {
    this.getLocalToken()
    if (this.$store.getters['user/isLoggedin']) {
      this.logininToDO()
    }
    this.$store.watch(
      (state) => {
        return this.$store.getters['user/isLoggedin'] // could also put a Getter here
      },
      (newValue, oldValue) => {
        console.log(oldValue)
        console.log(newValue)
        if (newValue) {
          this.logininToDO()
        }
        console.log(this.$store)
      })
  },
  computed: {
  },
  methods: {
    test () {
      this.$store.dispatch('user/rest', {})
      this.$store.dispatch('device/rest', {})
      this.$store.dispatch('socket/rest', {})
      Cookies.set('access_token', '', { expires: 7 })
    },
    logininToDO () {
      axios.defaults.headers['Authorization'] = 'Bearer ' + this.$store.getters['user/getToken']
      Promise.all([ this.$store.dispatch('user/getTheUserInfo'), this.$store.dispatch('device/getUserDevices') ])
        .then(results => {
          console.log('Hello')
          console.log(results)
          let browserDeviceData = results[1].data.find(function (device) { return device.device_type == 'BROWSER_ADMIN' })
          this.$store.commit('socket/SET_BROWSERUSER_DATA', browserDeviceData)
        })
        .catch(error => {
          console.log(error)
        })
    },
    socketTest: function () {
      this.$socket.sendObj({awesome: 'data'})
    },
    getLocalToken: function () {
      let oldToken = Cookies.get('access_token')
      if (oldToken) {
        this.$store.commit('user/addWebToken', oldToken)
      }
    }
  },
  components: {
    'google-map': Map,
    'login': Login,
    'device': Device
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.navbar {
    font-size: 20px;
}

.navbar .brand-title {
    font-size: 30px;
}

.header {
    margin-top: 10px;
}

.map {
    width:100%;
    margin: 0 auto;
}

.card-body {
    padding: 0px;
}
</style>
