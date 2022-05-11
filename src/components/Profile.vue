<template>
  <div>
    <div class="container card">
      <div class="card-content">
        <div class="content">
          <h1>{{park.name}}</h1>
          <p>
            <dt>LatLongCoordinates</dt>
            <dd>{{park.LatLongCoordinates}}</dd>

            <dt>county</dt>
            <dd>{{park.county}}</dd> 

            <dt>description</dt>
            <dd>{{park.description}}</dd> 

            <dt>directions</dt>
            <dd>{{park.directions}}</dd> 

            <dt>distance</dt>
            <dd>{{park.distance}}</dd> 

            <dt>dnrWebsite</dt>
            <dd>{{park.dnrWebsite}}</dd> 

            <dt>hours</dt>
            <dd>{{park.hours}}</dd> 

            <dt>name</dt>
            <dd>{{park.name}}</dd> 

            <dt>phoneNumber</dt>
            <dd>{{park.phoneNumber}}</dd> 

            <dt>physicalAddress</dt>
            <dd>{{park.physicalAddress}}</dd> 

            <dt>recreationArea</dt>
            <dd>{{park.recreationArea}}</dd> 

            <dt>slug</dt>
            <dd>{{park.slug}}</dd> 

            <dt>stateForest</dt>
            <dd>{{park.stateForest}}</dd> 

            <dt>statePark</dt>
            <dd>{{park.statePark}}</dd> 

          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Profile',
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    data: function() {
      return {
        park: null
      }
    },
    mounted() {
      try{  axios.get("https://wisparks-parkdetails.joe.workers.dev/?slug="+this.slug).then(response=> (this.park = response.data));
       }catch{
         this.loadingMessages = 'Error loading park data';
       }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>