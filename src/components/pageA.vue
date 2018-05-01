<template>
  <div>
    <label>pageA</label>
    <el-input v-model="name"></el-input>
    <el-input v-text="name"></el-input>
  </div>
</template>

<script>
  export default {
    name: "pageA",
    data() {
      return {
        name:'qph'
      }
    }
  }
</script>

<style scoped>

</style>
