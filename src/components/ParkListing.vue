<template>
  <div>
    <table v-if="!loading">
      <tr>
        <th>Name</th>
        <th>Property Type</th>
        <th>Physical Address</th>
        <th>County</th>
        <th v-if="this.sortedParks[0].distance > -1">Distance From You</th>
      </tr>
      <tr v-for="park in this.sortedParks" :key="park" v-bind:value="park">
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
      loadingMessages: ''
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
      if (a.distance < b.distance)
        return -1;
      if (a.distance > b.distance)
        return 1;
      return 0;
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
      }
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
      // let parksTemp = this.rejiggeredParks.sort(this.compare);
      return this.parks.sort(this.compare);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
