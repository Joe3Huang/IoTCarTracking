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
                    <a class="nav-link" href="#">Devices</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Logout</a>
                </li>
                <li class="nav-item" v-if="!this.$store.getters['user/isLoggedin']">
                    <login></login>
                </li>
                <li class="nav-item" >
                    <button v-on:click="test()">xxxxxxxxxxxxx</button>
                </li>
            </ul>
        </div>
    </nav>
    <div class="map">
        <google-map name="example"> </google-map>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map'
import Login from '@/components/Login'
import axios from './../backend/vue-axios'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Home page'
    }
  },
  beforeCreate () {
    console.log('Nothing gets called before me!')
  },
  created () {
    this.$store.watch(
      (state) => {
        return this.$store.getters['user/isLoggedin'] // could also put a Getter here
      },
      (oldValue, newValue) => {
        axios.defaults.headers['Authorization'] = 'Bearer ' + this.$store.getters['user/getToken']
        this.$store.dispatch('user/getTheUserInfo')
        this.$store.dispatch('device/getUserDevices')
        console.log(oldValue)
        console.log(newValue)
      })
  },
  computed: {
  },
  methods: {
    test () {
      this.$store.dispatch('user/rest', {})
    }
  },
  components: {
    'google-map': Map,
    'login': Login
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
