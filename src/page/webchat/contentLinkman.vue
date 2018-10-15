<template>
  <div style="height: 100%">
    <div style="height: 50px" class="title">公共聊天群</div>

    <div ref="chatContentRef" class="chatContentBox">
      <div class="chatContentList" v-for="item in chatList">
        <template v-if="item.flag==true">
          <div class="active">
            <span class="item-data" v-html="item.data"></span>
            <span class="item-name">{{item.userName}}</span>
            <img>
          </div>
        </template>
        <template v-else>
          <div>
            <span class="item-name">{{item.userName}}</span>
            <span class="item-data" v-html="item.data"></span>
          </div>
        </template>
      </div>
    </div>
    <div class="content-box" style="height: 148px;position: relative;">
      <div id="wangEdit" ref="wangEdit" style="width: 100%;height: 150px;" @keyup.enter="sendCtrlAndEnter"></div>
      <button style="position: absolute;right: 10px;bottom: 10px;z-index: 10001;" class="btn" @click="sendSocket">
        发送(Ctrl+Enter)
      </button>
    </div>
  </div>

</template>

<script>
  var wangEditer = require('wangeditor');
  import {getNewSocket} from "../../common/js/socketAPI";

  export default {
    name: 'contentLinkman',
    beforeRouteLeave(to, from, next) {
      //离开时 移除监听
      this.socket.removeAllListeners('chatCB');
      next();
    },
    data() {
      return {
        wang: '',
        content: '',
        chatList: [],
        ws: null,
        socket: '',
        userName: this.$store.state.conn.user.name,
        canLose: false,
      }
    },
    mounted() {
      this.init();
      this.wang = new wangEditer('#wangEdit');
      this.wang.customConfig.menus = [
        'emoticon',  // 表情
      ];
      this.wang.create();
      $('.w-e-text-container').outerHeight($('#wangEdit').outerHeight() - $('.w-e-toolbar').outerHeight());
    },
    methods: {
      init() {
        this.socket = this.$store.state.conn.socket;
        this.socket.on('chatCB', (data) => {
          console.log('chatCB');
          if (data.userName == this.userName) {
            data.flag = true;
          }
          data.data = data.data.replace(/\n/g, '</br>');
          this.chatList.push(data);
          this.$nextTick(this.scrollToBottom)
        });
      },
      scrollToBottom() {
        if (this.$refs.chatContentRef.scrollHeight) {
          this.$refs.chatContentRef.scrollTop = this.$refs.chatContentRef.scrollHeight
        }
      },
      sendCtrlAndEnter(e) {
        if (!e.ctrlKey) {
          return
        }
        this.sendSocket();
      },
      sendSocket() {
        this.content = this.wang.txt.html();
        this.content = this.content.replace(/(\<p\>\<br\>\<\/p\>)/g, '\<br\>');
        this.content = this.content.replace(/(\<br\>)$/g, '');
        this.content = this.content.replace(/(\<\/p\>\<p\>)/g, '\<br\>');
        this.content = this.content.replace(/(^\<p\>|\<\/p\>$)/g, '');
        if (!this.content) {
          return
        }
        this.socket.emit('chat', {content: this.content});
        this.wang.txt.clear()
      }
    }
  }
</script>

<style lang="less">
  .title {
    height: 50px;
    position: relative;
    padding: 10px 0;
    margin: 0 19px;
    border-bottom: 1px solid #d6d6d6;
    background-color: #eee;
    text-align: center;
    z-index: 1024;
    line-height: 30px;
  }

  .chatContentBox {
    height: calc(100% - 150px - 50px);
    overflow: auto
  }

  .chatContentList {
    margin-bottom: 16px;
  }

  .chatContentList .active {
    text-align: right;
  }

  .item-data {
    max-width: 500px;
    min-height: 1em;
    display: inline-block;
    vertical-align: top;
    position: relative;
    text-align: left;
    font-size: 14px;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    margin: 0 10px;
    background-color: #b2e281;
    padding: 9px 13px;
  }

  .item-data::after {
    position: absolute;
    top: 14px;
    border: 6px solid transparent;
    content: " ";
    right: 100%;
    border-right-color: #b2e281;
    border-right-width: 4px;
  }

  .chatContentList .active .item-data::after {
    left: 100%;
    border: 6px solid transparent;
    border-left-color: #b2e281;
    border-left-width: 4px;
  }

  .item-name {
    max-width: 500px;
    min-height: 1em;
    display: inline-block;
    vertical-align: top;
    position: relative;
    text-align: left;
    font-size: 14px;
    padding: 9px 0px 9px 9px;
  }

  .chatContentList .active .item-name {
    padding: 9px 13px 9px 0;
  }

  .w-e-text-container .w-e-panel-container {
    left: 160px;
    top: auto;
    bottom: calc(100% + 32px);
  }

  .w-e-text p, .w-e-text h1, .w-e-text h2, .w-e-text h3, .w-e-text h4, .w-e-text h5, .w-e-text table, .w-e-text pre {
    margin: 0;
  }
</style>
