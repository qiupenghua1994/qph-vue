<template>
  <div>
    <div>联系人主体</div>
    <input v-model="content"></input>
    <button @click="send">发送post</button>
    <button class="btn" @click="sendSocket">web-socket发送</button>
    <div>{{a}}</div>
    <div>
      <div v-for="item in chatList">
        {{item.data}}
      </div>
    </div>
  </div>

</template>

<script>

  import socket from 'socket.io-client'
  import $ from 'jquery'

  const home = r => require.ensure([], () => r(require('./test')));

  export default {
    name: 'contentLinkman',
    data() {
      return {
        content: '',
        chatList: [],
        ws: null,
        a: home
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

      },
      sendSocket() {
        debugger
        console.log(socket);
        console.log($);
      }
    }
  }
</script>

<style scoped>

</style>
