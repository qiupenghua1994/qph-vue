<template>
  <div class="content-first content-bg">
    <div style="text-align: center">
      <button class="btn btn-default" @click="restartNode">更新重启Node</button>
      <button class="btn btn-default" @click="restartVue">更新重启Vue</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    methods: {
      restartNode: function () {
        this.$http.post('/manage/restartNode');
      },
      restartVue: function () {
        this.$http.post('/manage/restartVue');
      }
    }
  }
</script>

<style scoped>

</style>
