<template>
  <div class="home header">
    <nav class="navbar navbar-light navbar-expand-md bg-faded justify-content-center  container-fluid">
        <a href="/" class="brand-title navbar-brand d-flex w-50 mr-auto">IoT-CarTracking</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse w-200" id="collapsingNavbar3">
            <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                <li class="nav-item">
                    <a class="nav-link" href="#" v-on:click="bShowDevices = !bShowDevices">Devices</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Logout</a>
                </li>
                <li class="nav-item" v-if="!this.$store.getters['user/isLoggedin']">
                    <login></login>
                </li>
                <li class="nav-item" >
                    <button v-on:click="test()">Clean Cache data</button>
                </li>
            </ul>
        </div>
    </nav>
    <device v-if="this.bShowDevices"></device>
    <div class="map">
        <google-map name="example" ref="googleMap"> </google-map>
    </div>
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
    },
    logininToDO () {
      axios.defaults.headers['Authorization'] = 'Bearer ' + this.$store.getters['user/getToken']
      this.$store.dispatch('user/getTheUserInfo')
      this.$store.dispatch('device/getUserDevices')
    },
    socketTest: function () {
      // $socket is [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) instance
      // this.$socket.send({awesome: 'data'})
      // or with {format: 'json'} enabled
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

</style>
