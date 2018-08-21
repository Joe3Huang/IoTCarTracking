<template>
  <div class="register container">
    <h1>Register Your Account</h1><br>
    <form id="signin" class="navbar-form w-50 mx-auto" role="form" @submit.prevent="register">
      <div class="input-group">
          <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
          <input id="email" v-model="email" type="email" class="form-control" name="email" value="" placeholder="Email Address">
      </div>
      <div class="input-group  mt-3">
          <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
          <input id="password" v-model="password"  type="password" class="form-control" name="password" value="" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary mt-3">Register</button>
    </form>
    <p class="msg" style="color:red">{{ msg }}</p>
  </div>
</template>

<script>
import axios from './../backend/vue-axios'
export default {
  name: 'Register',
  data () {
    return {
      msg: 'This is Register page',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      city: ''
    }
  },
  methods: {
    register () {
      console.log(this.email)
      console.log(this.password)
      let self = this
      axios.post('/registerUser', {
        email: this.email,
        password: this.password,
        first_name: this.firstName,
        last_name: this.lastName,
        city: this.city
      })
        .then(function (response) {
          console.log(response)
          self.msg = response.data
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response)
            self.msg = error.response.data.message
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
 .register {
  margin-top:100px;
}
/* @keyframes example {
    from {background-color: red;}
    to {background-color: yellow;}
}
.msg {
    width: 100px;
    height: 100px;
    background-color: black;
    animation-name: example;
    animation-duration: 4s;
} */
</style>
