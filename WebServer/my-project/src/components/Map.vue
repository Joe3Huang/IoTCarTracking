<template>
  <div class="google-map" v-bind:id="mapName"></div>
</template>

<script>
const google = window.google
export default {
  name: 'google-map',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + '-map',
      markerCoordinates: [{
        latitude: 51.501527,
        longitude: -0.1921837,
        title: 'Joe1'
      }, {
        latitude: 51.605874,
        longitude: -0.1838486,
        title: 'Joe2'
      }, {
        latitude: 51.4998973,
        longitude: -0.202432,
        title: 'Joe3'
      }],
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
    this.bounds = new google.maps.LatLngBounds()
    const element = document.getElementById(this.mapName)
    console.log(this.mapName)
    const mapCentre = this.markerCoordinates[1]
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    }
    this.map = new google.maps.Map(element, options)
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude)
      const marker = new google.maps.Marker({position, map: this.map, title: coord.title})
      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
    })
  }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 900px;
  background: gray;
}
</style>
