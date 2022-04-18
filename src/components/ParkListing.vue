<template>
  <div>
    <FilterBar />
    <table class="table" v-if="!loading">
      <thead>
      <tr>
        <th v-if="showNumbers"></th>
        <th><a v-on:click="changeSortOrder('name')">Name</a> <span v-show="this.sortBy=='name'&&this.sortOrder=='asc'"><i class="fas fa-sort-amount-up"></i></span><span v-show="this.sortBy=='name'&&this.sortOrder=='desc'"><i class="fas fa-sort-amount-down"></i></span></th>
        <th><a v-on:click="changeSortOrder('propertyType')">Property Type</a> <span v-show="this.sortBy=='propertyType'&&this.sortOrder=='asc'"><i class="fas fa-sort-amount-up"></i></span><span v-show="this.sortBy=='propertyType'&&this.sortOrder=='desc'"><i class="fas fa-sort-amount-down"></i></span></th>
        <th>Physical Address</th>
        <th><a v-on:click="changeSortOrder('county')">County</a> <span v-show="this.sortBy=='county'&&this.sortOrder=='asc'"><i class="fas fa-sort-amount-up"></i></span><span v-show="this.sortBy=='county'&&this.sortOrder=='desc'"><i class="fas fa-sort-amount-down"></i></span></th>
        <th v-if="this.sortedParks[0].distance > -1"><a v-on:click="changeSortOrder('distance')">Distance From You</a> <span v-show="this.sortBy=='distance'&&this.sortOrder=='asc'"><i class="fas fa-sort-amount-up"></i></span><span v-show="this.sortBy=='distance'&&this.sortOrder=='desc'"><i class="fas fa-sort-amount-down"></i></span></th>
      </tr>
      </thead>
      <tr v-for="(park, index) in this.sortedParks" :key="park.name">
        <td v-if="showNumbers">{{index+1}}.</td>
        <td>{{park.name}}</td>
        <td>{{park.propertyType}}</td>
        <td>{{park.physicalAddress}}</td>
        <td>{{park.county}}</td>
        <td>{{park.distance.toFixed(2)}} km</td>
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
import FilterBar from './FilterBar.vue';

export default {
  name: 'ParkListing',
  components: {
    FilterBar
  },
  data: function() {
    return {
      location: {'latitude':null,'longitude':null,'city':'','state':'','zip':'','precisionConfidence':''},
      parks: [],
      loading: true,
      loadingMessages: '',
      sortBy: 'name',
      sortOrder: 'asc',
      showNumbers: false
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
      // ** propertyType **
      if (this.sortBy=='propertyType'){
        if (this.sortOrder=='asc'){
          if (a.propertyType < b.propertyType)
            return -1;
          if (a.propertyType > b.propertyType)
            return 1;
          return 0;
        }else{
          if (a.propertyType > b.propertyType)
            return -1;
          if (a.propertyType < b.propertyType)
            return 1;
          return 0;
        }
      }
      // ** propertyType **
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
    try{  axios.get("https://wisparks-parkslist-test.joe.workers.dev/").then(response=> (this.parks = response.data));
       }catch{
         this.loadingMessages = 'Error loading parks data';
       }
  },
  watch: {
    parks: function () {
      // Check to see if we have distances to the parks, yet
      if(this.parks.length > 0){
        this.loading = false;
      }
      // 
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
