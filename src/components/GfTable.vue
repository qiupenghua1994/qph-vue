<template>
  <div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <template v-for="column in tableColumns">
      <template v-if="column.type==='expand'">
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          type="expand"
          :min-width="column.minWidth">
          <template slot-scope="prop">
            {{prop.row}}
            {{prop.$index}}
            {{prop.column}}
            <slot :name="column.expandName" :row="prop.row" :column="column"></slot>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth">
        </el-table-column>
      </template>
    </template>
  </el-table>
  </div>
</template>

<script>
  export default {
    name: "GfTable",
    data() {
      return {
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
        tableColumns: [],
        tablePage:{
          pageSize:10,
          pageIndex:0,
          total:0
        }
      }
    },
    props: {
      tableOption: {
        type: Object,
        default: function () {
          return {
            columns: [
              {label: '姓名', prop: 'name', type: 'expand', expandName: 'test', minWidth: '180'},
              {label: '地址', prop: 'address', minWidth: '180'},
              {label: '时间1', prop: 'date', minWidth: '180'},
            ],
          }
        },
        required: false
      }
    },
    computed: {
      currentPage:function () {
        return 1;
      }
    },
    methods: {
      init: function () {
        this.getTableColumns();
        this.getTableData();
      },
      getTableColumns: function () {
        this.tableColumns = this.tableOption.columns;
      },
      getTableData:function(){
        if(this.tableOption.page === true){

        }
      },
      handleSizeChange:function () {

      },
      handleCurrentChange:function () {

      },
    },
    mounted: function () {
      this.init();
    }
  }
</script>

<style scoped>

</style>
