<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img src="/favicon-32x32.png" width="32" height="32"> &nbsp;&nbsp; <strong>State Parks Explorer</strong>
        </router-link>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onclick="document.getElementById('navbarBasicExample').classList.toggle('is-active');">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">

          <router-link to="/listing" class="navbar-item">List Parks</router-link>

          <router-link to="/map" class="navbar-item">Park Map</router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Show me ...
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                Parks
              </a>
              <a class="navbar-item">
                Recreation Areas
              </a>
              <a class="navbar-item">
                Forests
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Less Than An Hour Away
              </a>
              <a class="navbar-item">
                Less Than Two Hours Away
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'MenuBar',
    data: function() {
      return {
        
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>