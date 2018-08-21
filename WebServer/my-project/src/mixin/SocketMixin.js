const socketMixin = {
  data () {
    return {
      heartBeatCount: 4,
      browserData: {}
    }
  },
  created () {
    this.$store.watch(
      (state) => {
        return {data: this.$store.getters['socket/getBrowserUserData'], isConnected: this.$store.getters['socket/isConnected'], isAuthenticated: this.$store.getters['socket/isAuthenticated']}// could also put a Getter here
      },
      (newValue, oldValue) => {
        if (newValue) {
          console.log(newValue)
          if (newValue.isConnected && newValue.isAuthenticated == false) {
            this.browserData = newValue.data
            this.sendObj({ command: 'AUTH', send_to: 'ALL', device_type: this.browserData.device_type, device_code: this.browserData.device_code, random_link_code: this.browserData.random_link_code, message: '' })
            console.log(this.browserData)
          }
        }
      })
    this.$options.sockets.onopen = (data) => {
      console.log(data)
      // this.$store.getters['socket/getBrowserUserData']
      this.$store.commit('socket/SOCKET_ONOPEN')
      this.ready()
    }
    this.$options.sockets.onmessage = (data) => {
      this.heartBeatCount = 5
      let resp = JSON.parse(data.data)
      console.log('--------------onmessage---------------', resp)
      if (this.$store.getters['socket/isAuthenticated']) {
        if (resp.message.position) {
          let payload = Object.assign(resp.message.position, {device_code: resp.device_code, name: resp.message.name})
          this.$store.commit('socket/SET_DEVICE_DATA', payload)
          this.$store.commit('device/SET_DEVICE_DATA', payload)
        }
      }
      if (resp.command == 'AUTH') {
        if (resp.message === 'OK') {
          // this.ready()
          this.$store.commit('socket/SET_AUTH_TRUE')
          // this.$store.commit('device/SET_DEVICE_DATA', resp.data)
          console.log('--------------resp.command == AUTH---------------', resp.data)
        } else if (resp.message === 'DEVICE-OK') {
          if (resp.data) {
            this.$store.commit('device/SET_DEVICE_DATA', resp.data)
          }
        }
      }
      if (resp.command == 'CLOSE') {
        let payload = {device_code: resp.message.data.deviceCode, command: resp.command}
        // let payload = Object.assign(resp.message.data, { command: resp.command })
        // console.log(payload)
        this.$store.commit('socket/SET_DEVICE_DATA', payload)
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
      this.heartBeatCount = 5
      this.$socket.sendObj(obj)
    },
    heartBeat: function () {
      console.log('-----------------------------heartBeat----------------')
      // this.sendObj({ command: 'HEARTBEAT', send_to: '', device_type: '', device_code: '', random_link_code: '', message: '' })
      this.sendObj({
        command: 'HEARTBEAT',
        send_to: 'ALL',
        device_type: this.browserData.device_type,
        device_code: this.browserData.device_code,
        random_link_code: this.browserData.random_link_code,
        message: ''
      })
    }
  }
}

export default socketMixin
