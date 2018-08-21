<template>
  <div class="device">
    <h1>{{ msg }}</h1>
    <ul id="example-1" class="list-group align-items-center w-100 list-group-flush">
      <li v-for="device in devices" v-bind:key="device.id" class="list-group-item text-left w-50">
        <div class="col-lg-10 list-group">
          <span class="list-group-item">Name: {{ device.name }}</span>
          <span class="list-group-item"> Type: {{ device.device_type }}</span>
          <span class="list-group-item">Code: {{ device.device_code }}</span>
          <span class="list-group-item">Status: {{ device.status }}</span>
        </div>
        <button class="col-lg-2" v-on:click='disconnectDevice(device.uid)'>Reset the device</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Device',
  data () {
    return {
      msg: 'Device List',
      devices: []
    }
  },
  created () {
    let allDevices = this.$store.getters['device/getUserDevices']
    this.devices = allDevices.filter((d) => { return d.device_type != 'BROWSER_ADMIN' })
    console.log(this.devices)
  },
  methods: {
    disconnectDevice (deviceId) {
      console.log(deviceId)
      this.$store.dispatch('device/disconnectTheDevice', deviceId)
    },
    test () {
      this.$store.dispatch('rest', {})
    }
  },
  components: {
  }
}
</script>

<style scoped>

</style>
