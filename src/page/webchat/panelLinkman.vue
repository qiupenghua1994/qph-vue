<template>
  <div class="linkList">
    <div v-for="item in linkList" class="linkItem">
      <img src="../../assets/weChat/touxiang01.jpg"/>
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'panelLinkman',
    data() {
      return {
        linkList: [
          {name: '哥哥', url: '../../assets/weChat/touxiang01.jpg'},
        ]
      }
    },
    mounted() {
      var socket = this.$store.state.conn.socket;
      var _this = this;
      socket.on('updateLinkMan', function (data) {
        _this.linkList = data.data.map(function (item) {
          return {name: item, url: '../../assets/weChat/touxiang01.jpg'}
        })
      })
    }
  }
</script>

<style scoped lang="less">

  .linkList {

    .linkItem {
      height: 45px;
      display: flex;
      align-items: center;
      background-color: #2e3238;
      border-bottom: 1px solid #26292e;
      padding: 0px 8px;
      img {
        width: 35px;
        height: 35px;
        margin: 5px 10px;
        border-radius: 3px;
      }
      span {
        color: white;
      }
    }
  }
</style>
