<template>
  <div>
    <div class="container card">
      <div class="card-content">
        <div class="content">
          <h1>Welcome to the Wisconsin State Parks Explorer</h1>
          <p>I created this website to help track Wisconsin's state parks, forests, and recreation areas.</p>
        </div>
      </div>
    </div>

    <div class="container card">
      <div class="card-content">
        <div class="content">
          <h1>State Park of the Day</h1>
          <p>The state park of the day goes here</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Home',
    data: function() {
      return {
        
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