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
      rejiggeredParks: [],
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
    try{  axios.get("https://spreadsheets.google.com/feeds/cells/1xFKuguz_frWTfkhDg0MbEXHaDtVn7qHigcpUl7zADFA/1/public/full?alt=json").then(response=> (this.parks = response.data.feed));
       }catch{
         this.loadingMessages = 'Error loading parks data';
       }
  },
  watch: {
    location: function(){
      // Loop over the parks
      for (let i in this.rejiggeredParks) {
        // Set the distance value in km
        this.rejiggeredParks[i].distance = this.getDistanceFromLatLonInKm(this.rejiggeredParks[i].LatLongCoordinates.split(',')[0],this.rejiggeredParks[i].LatLongCoordinates.split(',')[1],this.location.latLng.lat,this.location.latLng.lng);
      }
    },
    parks: function () {
      // Loop over the array and rearrange it into a more usable form
      // Spreadsheet columns (there are 13): "The name of the property", "Is it a state park?", "Is it a recreation area?", "Is it a state forest?", "Description", "Physical Address", "County", "Phone number", "DNR Website URL", "Directions for getting to the property", "Hours", "The Latitude / Longitude coordinates", "Slug"
      for (var i = 0; i < this.parks.entry.length; i+=13) {
        this.rejiggeredParks.push({name:this.parks.entry[i].content.$t, statePark:this.parks.entry[i+1].content.$t, recreationArea:this.parks.entry[i+2].content.$t, stateForest:this.parks.entry[i+3].content.$t, description:this.parks.entry[i+4].content.$t, physicalAddress:this.parks.entry[i+5].content.$t, county:this.parks.entry[i+6].content.$t, phoneNumber:this.parks.entry[i+7].content.$t, dnrWebsite:this.parks.entry[i+8].content.$t, directions:this.parks.entry[i+9].content.$t, hours:this.parks.entry[i+10].content.$t, LatLongCoordinates:this.parks.entry[i+11].content.$t, slug:this.parks.entry[i+12].content.$t, distance: -1});
      }
      // Remove the first array element (because it's just a header)
      this.rejiggeredParks.shift();
    },
    rejiggeredParks: function () {
      // Check to see if we have distances to the parks, yet
      if(this.rejiggeredParks.length > 0){
        this.loading = false;
      }
    }
  },
  computed: {
    // This new computed value is how we are going to sort the parks by how far they are from the user
    sortedParks: function() {
      // let parksTemp = this.rejiggeredParks.sort(this.compare);
      return this.rejiggeredParks.sort(this.compare);
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
