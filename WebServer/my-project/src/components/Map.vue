<template>
  <div class="google-map">
    <!-- <button v-on:click="findTheMarker(markers[100006])">FindTheMarker</button> -->
    <div class="google-map-view" v-bind:id="mapName"></div>
  </div>
</template>

<script>
const google = window.google
export default {
  name: 'google-map',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + '-map',
      markerCoordinates: [],
      map: null,
      bounds: null,
      markers: [],
      devicesTemp: []
    }
  },
  mounted: function () {
    this.bounds = new google.maps.LatLngBounds()
    const element = document.getElementById(this.mapName)
    var latlng = new google.maps.LatLng(-40.9006, 174.8860)
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(element, myOptions)
  },
  created () {
    this.$store.watch(
      (state) => {
        return this.$store.getters['socket/getDeviceData'] // could also put a Getter here
      },
      (newValue, oldValue) => {
        if (newValue) {
          if (newValue.device_code) {
            let theObj = this.devicesTemp.find(function (obj) { return obj.device_code == newValue.device_code })
            if (theObj) {
              theObj = newValue
              this.updateMarkerPosition(newValue)
            } else {
              this.devicesTemp.push(newValue)
              this.setNewCoordinate(newValue)
            }
          } else if (newValue.command == 'CLOSE') {
            this.$store.commit('socket/SET_DEVICE_DATA', {})
            this.deleteMarker(newValue.device_code)
          }
        }
      })
  },
  methods: {
    findTheMarker: function (theMarker) {
      let latLng = theMarker.getPosition() // returns LatLng object
      this.map.zoom = 9
      this.map.setCenter(latLng)
    },
    updateMarkerPosition: function (input) {
      let theMarkerCoordinates = this.markerCoordinates.find(function (m) { return m.device_code == input.device_code })
      if (theMarkerCoordinates) {
        theMarkerCoordinates.latitude = input.latitude
        theMarkerCoordinates.longitude = input.longitude
        let theMarker = this.markers.find(function (m) { return m.device_code == input.device_code })
        theMarker.setPosition(new google.maps.LatLng(input.latitude, input.longitude))
      }
    },
    updateMap: function (coord) {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude)
      const marker = new google.maps.Marker({position, map: this.map, title: coord.name, device_code: coord.device_code})
      this.markers.push(marker)
      console.log('updateMarkers', this.markers)
      this.map.fitBounds(this.bounds.extend(position))
      this.findTheMarker(marker)
    },
    setNewCoordinate: function (input) {
      console.log(input)
      if (input.device_code && input.latitude && input.longitude) {
        this.markerCoordinates.push(input)
        console.log('setNewMarker', this.markerCoordinates)
        this.updateMap(input)
      }
    },
    deleteMarker: function (input) {
      let element = this.markerCoordinates.find(function (maker) { return maker.device_code != input.device_code })
      let index = this.markerCoordinates.indexOf(element)
      if (index !== -1) {
        this.markerCoordinates.splice(index, 1)
      }
      // this.markerCoordinates = this.markerCoordinates.filter(function (maker) { return maker.device_code != input.device_code })
      // console.log('-------deleteMarker------', this.markerCoordinates)
      element = this.markers.find(function (maker) { return maker.device_code != input.device_code })
      this.clearMarker(element)
      index = this.markers.indexOf(element)
      if (index !== -1) {
        this.markers.splice(index, 1)
      }
      console.log('-------deleteMarker------2222', this.markers)
      this.updateMap()
    },
    // Removes the markers from the map, but keeps them in the array.
    clearMarker: function (theMarker) {
      theMarker.setMap(null)
    }
  }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 900px;
}

.google-map-view {
  width: 100%;
  height: 100%;
  background: gray;
}
</style>
