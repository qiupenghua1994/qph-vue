<template>
  <div>
    <div>联系人主体</div>
    <input v-model="content"></input>
    <button @click="send">发送</button>
    <button @click="sendSocket">web-socket发送</button>
    <div>
      <div v-for="item in chatList">
        {{item.data}}
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'contentLinkman',
    data() {
      return {
        content: '',
        chatList: [],
        ws: null,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      send() {
        this.$http.post('upgrade', {content: this.content});
      },
      init() {
        let ws = new WebSocket('ws://127.0.0.1:8181');
        this.ws = ws;
        ws.onopen = function () {
          ws.send('发起连接');
        };
        ws.onmessage = function (evt) {
          this.chatList.push({data: evt.data});
          console.log(evt);
        }.bind(this)
      },
      sendSocket() {
        if (this.content) {
          this.ws.send(this.content);
          this.chatList.push({data: this.content})
        }

      }
    }
  }
</script>

<style scoped>

</style>
