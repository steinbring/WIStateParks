<template>
  <div id="app">
    <MenuBar />
    <!-- component matched by the route will render here -->
    <router-view></router-view>
    <!-- <FilterBar />
    <ParkListing /> -->
  </div>
</template>

<script>
import MenuBar from './components/MenuBar.vue';
import FilterBar from './components/FilterBar.vue';

export default {
  name: 'App',
  components: {
    MenuBar,
    FilterBar
  }
}
</script>

<style>

</style>
