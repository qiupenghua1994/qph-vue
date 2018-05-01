<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "gfPagination",
    data(){
      return{
        page:{
          pageSize:10,
          pageIndex:0,
          total:0
        }
      }
    },
    computed:{
      currentPage:function () {
        return this.page.pageIndex+1;
      }
    },
    methods: {
      handleSizeChange: function () {
        this.$emit("change");
      },
      handleCurrentChange: function () {
        this.$emit("change");
      }
    }
  }
</script>

<style scoped>

</style>
