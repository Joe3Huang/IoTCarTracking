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
      // markerShape: { type: 'rectangle' },
      // icon: {
      //   url: '@~assets/logo.png',
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(0, 0),
      //   scaledSize: new google.maps.Size(50, 50)
      // }
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
          }
          if (newValue.command == 'CLOSE') {
            this.$store.commit('socket/SET_DEVICE_DATA', {})
            this.deleteMarker(newValue)
          }
        }
      })
    this.$store.watch(
      (state) => {
        return this.$store.getters['socket/isAuthenticated'] // could also put a Getter here
      },
      (newValue, oldValue) => {
        if (!newValue) {
          this.deleteAllMarker()
          this.devicesTemp = []
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
      const marker = new google.maps.Marker({ position, map: this.map, label: coord.name, device_code: coord.device_code })
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
      let element = this.markerCoordinates.find(function (markerCoord) { return markerCoord.device_code == input.device_code })
      let index
      if (element) {
        index = this.markerCoordinates.indexOf(element)
        if (index !== -1) {
          this.markerCoordinates.splice(index, 1)
        }
      }
      console.log('-------deleteMarker------11111', this.markerCoordinates)
      element = this.markers.find(function (maker) { return maker.device_code == input.device_code })
      if (element) {
        this.clearMarker(element)
        index = this.markers.indexOf(element)
        if (index !== -1) {
          this.markers.splice(index, 1)
        }
      }
      console.log('-------deleteMarker------2222', this.markers)
      // re-render
      for (var coord of this.markerCoordinates) {
        this.updateMarkerPosition(coord)
      }
      // clean temp data
      element = this.devicesTemp.find(function (maker) { return maker.device_code == input.device_code })
      index = this.devicesTemp.indexOf(element)
      if (index !== -1) {
        this.devicesTemp.splice(index, 1)
      }
    },
    // Removes the markers from the map, but keeps them in the array.
    clearMarker: function (theMarker) {
      console.log('------------clearMarker--------------', theMarker)
      theMarker.label = null
      theMarker.setMap(null)
    },
    deleteAllMarker: function () {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
      }
      this.markers = []
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

.mapIconLabel {
    font-size: 15px;
    font-weight: bold;
    color: #FFFFFF;
    font-family: 'DINNextRoundedLTProMediumRegular';
}
</style>
