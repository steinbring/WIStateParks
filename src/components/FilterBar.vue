<template>
  <div>
    <label class="checkbox filterItem">
      <input type="checkbox">
      Parks
    </label>
    <label class="checkbox filterItem">
      <input type="checkbox">
      Recreation Areas
    </label>
    <label class="checkbox filterItem">
      <input type="checkbox">
      Forests
    </label>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'FilterBar',
    data: function() {
      return {
        
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