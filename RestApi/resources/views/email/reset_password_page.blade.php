<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.10/vue.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vuex/2.1.1/vuex.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>
  <body>
    <div id="app" class="container">
      <h1 class="text-center">Please input your new password</h1><br>
      <form class="navbar-form w-50 mx-auto" role="form" @submit.prevent="register">
        <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input id="password" v-model="password" type="password" class="form-control" name="password" value="" placeholder="password">
        </div>
        <div class="input-group  mt-3">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input id="confirm-password" v-model="confirmPassword"  type="password" class="form-control" name="password" value="" placeholder="password again">
        </div>
        <button type="submit" class="btn btn-primary mt-3">Reset</button>
      </form>
      <h1 class="text-center" style="color:red;"> @{{msg}} </h1>
    </div>
    <script type="text/javascript">
      var token = {!! json_encode($inputs['token']) !!};
      var apiUrl = {!! json_encode(env('APP_URL')) !!};
      console.log(apiUrl);
      new Vue(
        {
          'el': '#app',
          data () {
            return {
              msg: '',
              password: '',
              confirmPassword: ''
            }
          },
          'methods': {
            register () {
              console.log(this.password)
              console.log(this.confirmPassword)
              this.msg = '';
              if (this.password !== this.confirmPassword && (this.password || this.confirmPassword)) {
                this.msg = 'Require the same password inputs';
                return;
              }
              if (!this.password || !this.confirmPassword) {
                this.msg = 'Password required';
                return;
              }

              let self = this
              console.log(token)
              console.log(this.password)
              axios.post(apiUrl + '/resetPasswordViaEmail', {
                token: token,
                password: this.password
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
      )
    </script>
  </body>
</html>