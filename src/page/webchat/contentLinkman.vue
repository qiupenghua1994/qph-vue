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
      <textarea rows="5" ref="textarea"
                style="width: 100%;height: 155px;border-left: none;border-right: none;margin: -5px 0"
                v-model="content" @keyup.enter="sendSocket"></textarea>
      <button style="position: absolute;right: 10px;bottom: 10px" class="btn" @click="sendSocket">发送(S)</button>
    </div>
  </div>

</template>

<script>

  import {needLogin} from '@/common/js/mixins'

  export default {
    name: 'contentLinkman',
    data() {
      return {
        content: '',
        chatList: [],
        ws: null,
        socket: '',
        userName: this.$store.state.conn.user.name
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        var _this = this;
        this.socket = this.$store.state.conn.socket;
        this.socket.on('connection', function (data) {
          console.log('connection', data.a);
        });
        var user = this.$store.state.conn.user;
        this.socket.emit('login', {name: user.name});
        this.socket.on('chatCB', function (data) {
          if (data.userName == _this.userName) {
            data.flag = true;
          }
          data.data = data.data.replace(/\n/g, '</br>');
          _this.chatList.push(data);
          _this.$nextTick(function () {
            if (_this.$refs.chatContentRef.scrollHeight) {
              _this.$refs.chatContentRef.scrollTop = _this.$refs.chatContentRef.scrollHeight

            }
          })

        });

        this.socket.on('disconnect', function () {
          console.log('disconnect');
        });
        this.socket.on('user disconnected', function () {
          console.log('user disconnected');
        });

      },
      sendSocket(e) {
        if (e.ctrlKey) {
          this.$refs.textarea.value += '\n';
        } else {
          this.content = this.content.replace(/\n$/, '');
          this.socket.emit('chat', {content: this.content});
          this.content = '';
        }

      }
    }
  }
</script>

<style scoped lang="less">
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
</style>
