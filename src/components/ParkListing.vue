<template>
  <div>
    <table class="table" v-if="!loading">
      <thead>
      <tr>
        <th><a v-on:click="changeSortOrder('name')">Name</a> <i v-if="this.sortBy=='name'&&this.sortOrder=='asc'" class="fas fa-sort-amount-up"></i><i v-if="this.sortBy=='name'&&this.sortOrder=='desc'" class="fas fa-sort-amount-down"></i></th>
        <th>Property Type</th>
        <th>Physical Address</th>
        <th><a v-on:click="changeSortOrder('county')">County</a> <i v-if="this.sortBy=='county'&&this.sortOrder=='asc'" class="fas fa-sort-amount-up"></i><i v-if="this.sortBy=='county'&&this.sortOrder=='desc'" class="fas fa-sort-amount-down"></i></th>
        <th v-if="this.sortedParks[0].distance > -1"><a v-on:click="changeSortOrder('distance')">Distance From You</a> <i v-if="this.sortBy=='distance'&&this.sortOrder=='asc'" class="fas fa-sort-amount-up"></i><i v-if="this.sortBy=='distance'&&this.sortOrder=='desc'" class="fas fa-sort-amount-down"></i></th>
      </tr>
      </thead>
      <tr v-for="park in this.sortedParks">
        <td>{{park.name}}</td>
        <td v-if="park.statePark == 'TRUE'">State Park</td>
        <td v-if="park.recreationArea == 'TRUE'">Recreation Area</td>
        <td v-if="park.stateForest == 'TRUE'">State Forest</td>
        <td>{{park.physicalAddress}}</td>
        <td>{{park.county}}</td>
        <td v-if="park.distance > -1">{{park.distance.toFixed(2)}} km</td>
      </tr>
    </table>

    <div v-if="loading">
      Loading ... 
      <div v-if="loadingMessages !=''">
        Error: {{loadingMessages}}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ParkListing',
  data: function() {
    return {
      location: {'street':'','adminArea5':'','adminArea3':'','postalCode':''},
      parks: [],
      loading: true,
      loadingMessages: '',
      sortBy: 'name',
      sortOrder: 'asc'
    }
  },
  methods: {
    getDistanceFromLatLonInKm: function(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
      var dLon = this.deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    },
    deg2rad: function(deg) {
      return deg * (Math.PI/180);
    },
    geolocation: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    showPosition: function(position) {
      // Use Axios to make a MapQuest API Call
        axios
        .get("https://www.mapquestapi.com/geocoding/v1/reverse?key=TPWvRrsfpgGWBACqqXd94fbDcfVpy2WJ&location="+position.coords.latitude+"%2C"+position.coords.longitude+"&outFormat=json&thumbMaps=false")
          .then(response=> (this.location = response.data.results[0].locations[0]));
    },
    compare: function (a, b) {
      // This uses sortOrder and sortBy for the comparison
      // ** distance **
      if (this.sortBy=='distance'){
        if (this.sortOrder=='asc'){
          if (a.distance < b.distance)
            return -1;
          if (a.distance > b.distance)
            return 1;
          return 0;
        }else{
          if (a.distance > b.distance)
            return -1;
          if (a.distance < b.distance)
            return 1;
          return 0;
        }
      }
      // ** distance **
      // ** county **
      if (this.sortBy=='county'){
        if (this.sortOrder=='asc'){
          if (a.county < b.county)
            return -1;
          if (a.county > b.county)
            return 1;
          return 0;
        }else{
          if (a.county > b.county)
            return -1;
          if (a.county < b.county)
            return 1;
          return 0;
        }
      }
      // ** county **
      // ** name **
      if (this.sortBy=='name'){
        if (this.sortOrder=='asc'){
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        }else{
          if (a.name > b.name)
            return -1;
          if (a.name < b.name)
            return 1;
          return 0;
        }
      }
      // ** name **
    },
    changeSortOrder: function(newSortBy) {
      // This method makes things a little cleaner than if you put a bunch of conditions in the template
      if(newSortBy==this.sortBy){
        if(this.sortOrder=='asc'){
          this.sortOrder='desc';
        }else{
          this.sortOrder='asc';
        }
      }else{
        this.sortBy = newSortBy;
        this.sortOrder = 'asc';
      }
    }
  },
  mounted() {
    this.geolocation();
    try{  axios.get("https://api.wisparks.jws.app/v1/wisconsinParks.json").then(response=> (this.parks = response.data));
       }catch{
         this.loadingMessages = 'Error loading parks data';
       }
  },
  watch: {
    location: function(){
      // Loop over the parks
      for (let i in this.parks) {
        // Set the distance value in km
        this.parks[i].distance = this.getDistanceFromLatLonInKm(this.parks[i].LatLongCoordinates.split(',')[0],this.parks[i].LatLongCoordinates.split(',')[1],this.location.latLng.lat,this.location.latLng.lng);
      };
      // Set the sort order to distance, asc by default if you know the user's location
      this.sortBy = 'distance';
      this.sortOrder = 'asc';
    },
    parks: function () {
      // Check to see if we have distances to the parks, yet
      if(this.parks.length > 0){
        this.loading = false;
      }
    }
  },
  computed: {
    // This new computed value is how we are going to sort the parks by how far they are from the user
    sortedParks: function() {
      return this.parks.sort(this.compare);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
