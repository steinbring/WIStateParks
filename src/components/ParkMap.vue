<template>
  <div>
    <FilterBar />
    <div id="map"></div>
  </div>
</template>

<script>
import axios from 'axios';
import FilterBar from './FilterBar.vue';

export default {
  name: 'ParkMap',
  components: {
    FilterBar
  },
  data: function() {
    return {
      location: {'latitude':null,'longitude':null,'city':'','state':'','zip':'','precisionConfidence':''},
      parks: [],
      accessToken: 'pk.eyJ1Ijoic3RlaW5icmluZyIsImEiOiJja2t1YjE3ZXEwZ3R0MnBqdWo2cHRkOW5sIn0.OEPMk0xJ6j2zIq1zZN9yMg'
    }
  },
  mounted() {
    try{  axios.get("https://cors-anywhere.herokuapp.com/wisparks-parkslist-test.joe.workers.dev/").then(response=> (this.parks = response.data));
       }catch{
         this.loadingMessages = 'Error loading parks data';
       }
  },
  watch: {
    parks: function(){
      // Create the map
      // This is where you would put your own accessToken value
      mapboxgl.accessToken = this.accessToken;

      var ParkMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        center: [-90.1480635, 44.4388757],
        zoom: 5
      });
      
      // Loop over the parks and create markers
      for (let i = 0; i < this.parks.length; i++) {
        // Set the marker to black if it's a State Forest
        if(this.parks[i].stateForest == 'TRUE'){
          new mapboxgl.Marker({ color: "#000000" })
            .setLngLat([this.parks[i].LatLongCoordinates.split(',')[1],this.parks[i].LatLongCoordinates.split(',')[0]])
            .setPopup(new mapboxgl.Popup().setHTML("<b><a href='"+this.parks[i].dnrWebsite+"'>"+this.parks[i].name+"</a></b><p>"+this.parks[i].physicalAddress+"</p>"))
            .addTo(ParkMap);
        }
        // Set the marker to red if it's a Recreation Area
        if(this.parks[i].recreationArea == 'TRUE'){
          new mapboxgl.Marker({ color: "#e50000" })
            .setLngLat([this.parks[i].LatLongCoordinates.split(',')[1],this.parks[i].LatLongCoordinates.split(',')[0]])
            .setPopup(new mapboxgl.Popup().setHTML("<b><a href='"+this.parks[i].dnrWebsite+"'>"+this.parks[i].name+"</a></b><p>"+this.parks[i].physicalAddress+"</p>"))
            .addTo(ParkMap);
        }
        // Set the marker to blue if it's a State Park
        if(this.parks[i].statePark == 'TRUE'){
          new mapboxgl.Marker({ color: "#0000ff" })
            .setLngLat([this.parks[i].LatLongCoordinates.split(',')[1],this.parks[i].LatLongCoordinates.split(',')[0]])
            .setPopup(new mapboxgl.Popup().setHTML("<b><a href='"+this.parks[i].dnrWebsite+"'>"+this.parks[i].name+"</a></b><p>"+this.parks[i].physicalAddress+"</p>"))
            .addTo(ParkMap);
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html,
  body,
  #map {
    height: 100vh;
    width: 100vw;
    margin: 0;
  }
</style>
