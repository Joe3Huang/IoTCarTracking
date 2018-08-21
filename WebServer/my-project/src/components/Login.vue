<template>
  <div class="login w-100">
      <form id="signin" class="form-inline justify-content-end" role="form" @submit.prevent="login" style="flex-flow: row;">
        <div class="input-group">{{msg}}</div>
        <div class="input-group mr-1">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
            <input id="email" v-model="email" type="email" class="form-control" name="email" value="" placeholder="Email Address">
        </div>
        <div class="input-group mr-1">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input id="password" v-model="password"  type="password" class="form-control" name="password" value="" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: '',
      email: '',
      password: ''
    }
  },
  created () {
    this.$store.watch(
      (state) => {
        return {data: this.$store.getters['user/getMessage']}// could also put a Getter here
      },
      (newValue, oldValue) => {
        if (newValue) {
          console.log(newValue)
          this.msg = newValue.data
        }
      }
    )
  },
  methods: {
    login () {
      console.log(this.email)
      console.log(this.password)
      this.$store.dispatch('user/login', {email: this.email, password: this.password})
    },
    test () {
      this.$store.dispatch('rest', {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
/* .login {
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
} */
</style>
