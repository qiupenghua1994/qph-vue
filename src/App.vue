<template>
  <div id="app">
    <gf-header></gf-header>
    <router-view/>
  </div>
</template>

<script>
  import GfHeader from "./components/gfHeader";

  export default {
    name: 'App',
    components: {GfHeader}
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
