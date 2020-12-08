<template>
    <div class="content-first content-bg" style="display: flex;justify-content: center;">
        <div ref="showBox" style="display: inline-block">

        </div>
        <div style="display: inline-block;width: 200px">
            <el-form ref="form" label-width="50px" size="mini">
                <el-form-item label="速度">
                    <el-input v-model="walkSpeed"></el-input>
                </el-form-item>
                <el-form-item label="大小">
                    <el-input v-model="pointWidth"></el-input>
                </el-form-item>
                <el-form-item label="宽">
                    <el-input v-model="col"></el-input>
                </el-form-item>
                <el-form-item label="高">
                    <el-input v-model="row"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" @click="makeMaze">生成</el-button>
                    <el-button size="mini" @click="findPath">寻路</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
  import {Maze} from "../../assets/js/maze";

  export default {
    name: "maze",
    data() {
      return {
        maze: null,
        col: 21,
        row: 21,
        walkSpeed: 100,
        pointWidth: 10,
      }
    },
    mounted() {
      this.initTableData();
    },
    methods: {
      initTableData() {
        var params = {
          walkSpeed: this.walkSpeed,
          pointWidth: this.pointWidth
        }
        this.maze = new Maze();
        this.maze.createGrid(51, 101);
        this.maze.show(this.$refs.showBox);
      },
      findPath() {
        this.maze.findPathWithAction();
      },
      makeMaze() {
        var params = {
          walkSpeed: this.walkSpeed,
          pointWidth: this.pointWidth
        };
        this.maze = new Maze(params);
        if(this.row&1 != 1){
          this.row++;
        }
        if(this.col&1 != 1){
          this.col++;
        }
        this.maze.createGrid(+this.row, +this.col);
        this.maze.show(this.$refs.showBox);
      }
    }
  }
</script>

<style scoped>
    table {
        width: 500px;
        height: 500px;
        margin: 0 auto;
    }

    td {
        width: 30px;
        height: 30px;
    }
</style>