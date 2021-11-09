<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onclick="document.getElementById('navbarBasicExample').classList.toggle('is-active');">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>

          <router-link to="/listing" class="navbar-item">List Parks</router-link>

          <a class="navbar-item">
            Map of Parks
          </a>

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