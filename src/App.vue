<template>
  <div id="app">
    <MenuBar />
    <FilterBar />
    <ParkListing />
  </div>
</template>

<script>
import ParkListing from './components/ParkListing.vue';
import MenuBar from './components/MenuBar.vue';
import FilterBar from './components/FilterBar.vue';

export default {
  name: 'App',
  components: {
    ParkListing,
    MenuBar,
    FilterBar
  }
}
</script>

<style>

</style>
