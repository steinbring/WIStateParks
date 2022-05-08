<template>
  <div>
    <label class="checkbox filterItem">
      <input type="checkbox" v-model="showParks">
      Parks ({{numberOfParks}})
    </label>
    <label class="checkbox filterItem">
      <input type="checkbox" v-model="showRecAreas">
      Rec Areas ({{numberOfRecAreas}})
    </label>
    <label class="checkbox filterItem">
      <input type="checkbox" v-model="showForests">
      Forests ({{numberOfForests}})
    </label>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'FilterBar',
    computed: {
      showParks: {
        get: function() {
          return this.$parent.$parent.showParks;
        },
        set: function(newValue) {
          this.$parent.$parent.showParks = newValue;
        }
      },
      showRecAreas: {
        get: function() {
          return this.$parent.$parent.showRecAreas;
        },
        set: function(newValue) {
          this.$parent.$parent.showRecAreas = newValue;
        }
      },
      showForests: {
        get: function() {
          return this.$parent.$parent.showForests;
        },
        set: function(newValue) {
          this.$parent.$parent.showForests = newValue;
        }
      },
      numberOfParks: function() {
        const filteredParks = this.$parent.parks.filter(park => park.statePark == 'TRUE');
        return filteredParks.length;
      },
      numberOfRecAreas: function() {
        const filteredRecAreas = this.$parent.parks.filter(recAreas => recAreas.recreationArea == 'TRUE');
        return filteredRecAreas.length;
      },
      numberOfForests: function() {
        const filteredForests = this.$parent.parks.filter(forests => forests.stateForest == 'TRUE');
        return filteredForests.length;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filterItem {
    margin-left: 12px;
    margin-right: 12px;
  }
</style>