<template>
  <div class="reset-password container">
    <h1>Reset Your Password</h1><br>
    <form  class="navbar-form w-50 mx-auto" role="form" @submit.prevent="reset">
      <div class="input-group">
          <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
          <input id="email" v-model="email" type="email" class="form-control" name="email" value="" placeholder="Email Address">
      </div>
      <button type="submit" class="btn btn-primary mt-3">Reset</button>
    </form>
    {{ msg }}
  </div>
</template>

<script>
import axios from './../backend/vue-axios'
export default {
  name: 'ForgetPassword',
  data () {
    return {
      msg: 'This is ForgetPassword page',
      email: ''
    }
  },
  methods: {
    reset () {
      console.log(this.email)
      let self = this
      axios.post('/resetPassword', {
        email: this.email
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
 .reset-password {
  margin-top:100px;
}
</style>
