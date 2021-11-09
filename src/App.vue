<template>
  <div id="app">
    <MenuBar />
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar.vue';

export default {
  name: 'App',
  components: {
    MenuBar
  }
}
</script>

<style>

</style>
