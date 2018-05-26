<template>
  <div class="content-first">
    <div>test</div>
    <el-button @click="test">good</el-button>
  </div>
</template>

<script>
  export default {
    name: "index",
    methods: {
      async timeout(ms) {
        await new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      },
      async asyncPrint(value, ms) {
        await this.timeout(10000);
        console.log(value + 'one');
        await this.timeout(ms);
        console.log(value);
        return
      },
      test() {
        this.asyncPrint('goog', 100);
      }
    }
  }
</script>

<style scoped>

</style>
