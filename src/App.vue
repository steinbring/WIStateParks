<template>
  <div id="app">
    <ParkListing />
  </div>
</template>

<script>
import ParkListing from './components/ParkListing.vue'

export default {
  name: 'App',
  components: {
    ParkListing
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
