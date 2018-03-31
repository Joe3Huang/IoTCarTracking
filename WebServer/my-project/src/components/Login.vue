<template>
  <div class="login">
    <router-link v-bind:to="'/'">Home</router-link>
    <h1>{{ msg }}</h1>
    <div>{{ this.$store.state.user }}</div>
    <div class="login-wrapper border border-light">
      <form class="form-signin" @submit.prevent="login">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
      <button class="btn btn-lg btn-primary btn-block" v-on:click='test()'>Test</button>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'This is Login page',
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log(this.email)
      console.log(this.password)
      this.$store.dispatch('login', {email: this.email, password: this.password})
      // this.$http.get('/device/userDevices')
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch((error) => {
      //     console.log(error.response)
      //   })
    },
    test () {
      this.$store.dispatch('rest', {})
    },
    created: function () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #605B56;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
