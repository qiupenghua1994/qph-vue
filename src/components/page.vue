<template>
  <div>
    <div class="sidebar">
      <ul class="menu-list">
        <li v-for="i in 100">menu1</li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
    export default {
        name: "page"
    }
</script>

<style scoped>

  .sidebar{
    width: 200px;
    position: fixed;
    top: 50px;
    bottom: 0px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .sidebar>.menu-list{

  }
  .sidebar>.menu-list li{
    list-style-type: decimal-leading-zero;
  }
  .content{
    max-width: 600px;
    margin: 0 auto;
    padding: 15px 0 0 15px;
  }
</style>
