<template>
  <div>
    <div class="bigPic">
      <img class="big-bg-img" src="../assets/tangwei.jpeg"/>
      <img class="sm-bg-img" src="../assets/tangwei2.jpg"/>
    </div>
  </div>
</template>

<script>
  import GfTable from './GfTable'
  import GfPagination from "./gfPagination";

  export default {
    name: 'HelloWorld',
    components: {GfPagination, GfTable},
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        tableData: [
          {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableOption:{
          url:'test',
          page:true,
          columns: [
            {label: '姓名', prop: 'name', type: 'expand', expandName: 'test', minWidth: '180'},
            {label: '地址', prop: 'address', minWidth: '180'},
            {label: '时间1', prop: 'date', minWidth: '180'},
          ]
        }
      }
    },
    methods:{
      pageChange:function () {
        console.log("page change");
      }
    }

  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .bigPic{
    width: 100%;
    height: 1000px;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .big-bg-img,
  .sm-bg-img {
    display: none;
    width: 100%;
  }

  @media all and (max-width: 600px) {
    .sm-bg-img {
      display: initial;
    }
  }

  @media all and (min-width: 600px) {
    .big-bg-img {
      display: initial;
    }
  }

</style>
