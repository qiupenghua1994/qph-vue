<template>
  <div style="height: 100%">
    <div style="height: 50px">联系人主体</div>


    <div style="height: calc(100% - 150px - 50px)">
      <div v-for="item in chatList">
        {{item.data}}
      </div>
    </div>
    <div class="content-box" style="height: 148px;position: relative;">
      <textarea rows="5" style="width: 100%;height: 155px;border-left: none;border-right: none;margin: -5px 0"
                v-model="content"></textarea>
      <button style="position: absolute;right: 10px;bottom: 10px" class="btn" @click="sendSocket">发送(S)</button>
    </div>
  </div>

</template>

<script>

  import io from 'socket.io-client'
  import $ from 'jquery'

  export default {
    name: 'contentLinkman',
    data() {
      return {
        content: '',
        chatList: [],
        ws: null,
        socket: ''
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        var _this = this;
        this.socket = io('http://localhost:8080');
        this.socket.on('connection', function (sk) {

        });
        this.socket.on('chatCB', function (data) {
          _this.chatList.push(data);
        })
      },
      sendSocket() {
        this.chatList.push({data: this.content});
        this.content = '';
        this.socket.emit('chat', {content: this.content})
      }
    }
  }
</script>

<style scoped lang="less">

</style>
