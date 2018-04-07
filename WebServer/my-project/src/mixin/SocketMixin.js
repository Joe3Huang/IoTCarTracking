const socketMixin = {
  data () {
    return {
      heartBeatCount: 4
    }
  },
  created () {
    this.$options.sockets.onopen = (data) => {
      console.log(data)
      this.sendObj({ command: 'AUTH', send_to: 'ALL', device_type: 'BROWSER_ADMIN', device_code: '100013', random_link_code: 'ed9f87fe4b804d098db258f3e6f79574', message: '' })
    }
    this.$options.sockets.onmessage = (data) => {
      this.heartBeatCount = 5
      console.log(data.data)
      let resp = JSON.parse(data.data)
      console.log(resp)
      if (resp.message.position) {
        this.$store.commit('socket/SET_POSITION', resp.message.position)
      }
      if (resp.command == 'AUTH') {
        if (resp.message === 'OK') {
          this.ready()
          console.log('--------------ready---------------')
        }
      }
    }
  },
  methods: {
    ready: function () {
      window.setInterval(() => {
        if (this.heartBeatCount) {
          this.heartBeatCount -= 1
        } else {
          this.heartBeat()
        }
      }, 1000)
    },
    sendObj: function (obj) {
      this.heartBeatCount = 4
      this.$socket.sendObj(obj)
    },
    heartBeat: function () {
      this.sendObj({ command: 'HEARTBEAT', send_to: '', device_type: 'BROWSER_ADMIN', device_code: '100013', random_link_code: 'ed9f87fe4b804d098db258f3e6f79574', message: '' })
    }
  }
}

export default socketMixin
