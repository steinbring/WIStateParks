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
      accessToken: 'pk.eyJ1Ijoic3RlaW5icmluZyIsImEiOiJja2t1YjE3ZXEwZ3R0MnBqdWo2cHRkOW5sIn0.OEPMk0xJ6j2zIq1zZN9yMg',
      emptyArray: false,
      originalParks: []
    }
  },
  mounted() {
    try{  axios.get("https://wisparks-parkslist-test.joe.workers.dev/").then(response=> (this.originalParks = response.data));
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
    },
    originalParks: function () {
      // Should happen after getting the data from the API
      this.parks = this.originalParks;
    },
    showParks: function () {
      // Something has changed with the filter bar.  Filter the data accordingly.
      if(this.showParks && this.showRecAreas && this.showForests){
        // Show All Properties
        this.parks = this.originalParks;
        this.emptyArray = false;
      }else if(this.showParks && this.showRecAreas){
        // Show State Parks and Recreation Areas
        let result2 = this.originalParks.filter(park => park.propertyType === 'Recreation Area');
        this.parks = result2.concat(this.originalParks.filter(park => park.propertyType === 'State Park'));
        this.emptyArray = false;
      }else if(this.showParks && this.showForests){
        // Show State Parks and Forests
        let result2 = this.originalParks.filter(park => park.propertyType === 'State Forest');
        this.parks = result2.concat(this.originalParks.filter(park => park.propertyType === 'State Park'));
        this.emptyArray = false;
      }else if(this.showRecAreas && this.showForests){
        // Show Recreation Areas and Forests
        let result2 = this.originalParks.filter(park => park.propertyType === 'State Forest');
        this.parks = result2.concat(this.originalParks.filter(park => park.propertyType === 'Recreation Area'));
        this.emptyArray = false;
      }else if(this.showParks){
        // Show State Parks
        this.parks = this.originalParks.filter(park => park.propertyType === 'State Park');
        this.emptyArray = false;
      }else if(this.showForests){
        // Show Forests
        this.parks = this.originalParks.filter(park => park.propertyType === 'State Forest');
        this.emptyArray = false;
      }else if(this.showRecAreas){
        // Show Recreation Areas
        this.parks = this.originalParks.filter(park => park.propertyType === 'Recreation Area');
        this.emptyArray = false;
      }else{
        this.parks = [];
        this.emptyArray = true;
      }
    },
    showRecAreas: function () {
      // Something has changed with the filter bar.  Filter the data accordingly.
      if(this.showParks && this.showRecAreas && this.showForests){
        // Show All Properties
        this.parks = this.originalParks;
        this.emptyArray = false;
      }else if(this.showParks && this.showRecAreas){
        // Show State Parks and Recreation Areas
        let result2 = this.originalParks.filter(park => park.propertyType === 'Recreation Area');
        this.parks = result2.concat(this.originalParks.filter(park => park.propertyType === 'State Park'));
        this.emptyArray = false;
      }else if(this.showParks && this.showForests){
        // Show State Parks and Forests
        let result2 = this.originalParks.filter(park => park.propertyType === 'State Forest');
        this.parks = result2.concat(this.originalParks.filter(park => park.propertyType === 'State Park'));
        this.emptyArray = false;
      }else if(this.showRecAreas && this.showForests){
        // Show Recreation Areas and Forests
        let result2 = this.originalParks.filter(park => park.propertyType === 'State Forest');
        this.parks = result2.concat(this.originalParks.filter(park => park.propertyType === 'Recreation Area'));
        this.emptyArray = false;
      }else if(this.showParks){
        // Show State Parks
        this.parks = this.originalParks.filter(park => park.propertyType === 'State Park');
        this.emptyArray = false;
      }else if(this.showForests){
        // Show Forests
        this.parks = this.originalParks.filter(park => park.propertyType === 'State Forest');
        this.emptyArray = false;
      }else if(this.showRecAreas){
        // Show Recreation Areas
        this.parks = this.originalParks.filter(park => park.propertyType === 'Recreation Area');
        this.emptyArray = false;
      }else{
        this.parks = [];
        this.emptyArray = true;
      }
    },
    showForests: function () {
      // Something has changed with the filter bar.  Filter the data accordingly.
      if(this.showParks && this.showRecAreas && this.showForests){
        // Show All Properties
        this.parks = this.originalParks;
        this.emptyArray = false;
      }else if(this.showParks && this.showRecAreas){
        // Show State Parks and Recreation Areas
        let result2 = this.originalParks.filter(park => park.propertyType === 'Recreation Area');
        this.parks = result2.concat(this.originalParks.filter(park => park.propertyType === 'State Park'));
        this.emptyArray = false;
      }else if(this.showParks && this.showForests){
        // Show State Parks and Forests
        let result2 = this.originalParks.filter(park => park.propertyType === 'State Forest');
        this.parks = result2.concat(this.originalParks.filter(park => park.propertyType === 'State Park'));
        this.emptyArray = false;
      }else if(this.showRecAreas && this.showForests){
        // Show Recreation Areas and Forests
        let result2 = this.originalParks.filter(park => park.propertyType === 'State Forest');
        this.parks = result2.concat(this.originalParks.filter(park => park.propertyType === 'Recreation Area'));
        this.emptyArray = false;
      }else if(this.showParks){
        // Show State Parks
        this.parks = this.originalParks.filter(park => park.propertyType === 'State Park');
        this.emptyArray = false;
      }else if(this.showForests){
        // Show Forests
        this.parks = this.originalParks.filter(park => park.propertyType === 'State Forest');
        this.emptyArray = false;
      }else if(this.showRecAreas){
        // Show Recreation Areas
        this.parks = this.originalParks.filter(park => park.propertyType === 'Recreation Area');
        this.emptyArray = false;
      }else{
        this.parks = [];
        this.emptyArray = true;
      }
    }
  },
  computed: {
    showParks: function() {
      return this.$parent.showParks;
    },
    showRecAreas: function() {
      return this.$parent.showRecAreas;
    },
    showForests: function() {
      return this.$parent.showForests;
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
