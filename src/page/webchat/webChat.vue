<template>
  <div class="content-first">
    <div class="index-box">
      <div class="chat-box">
        <div class="panel-box">
          <div class="panel-header">
            <div class="user-logo">
              <img src="@/assets/weChat/touxiang.jpg">
            </div>
            <div class="user-name">
              <span>{{userName}}</span>
            </div>
            <div class="user-setting">
              <a class="glyphicon glyphicon-align-left"> </a>
            </div>
          </div>
          <div class="panel-search">
            <i class="panel-search-icon"></i>
            <input placeholder="搜索" v-model="searchData"/>
          </div>
          <div class="panel-tab">
            <span @click="changeMenu('chat')"><i class="chat-icon" :class="{'active':menuCheck==='chat'}"></i></span>
            <span>|</span>
            <span @click="changeMenu('article')"><i class="article-icon"
                                                    :class="{'active':menuCheck==='article'}"></i></span>
            <span>|</span>
            <span @click="changeMenu('linkman')"><i class="linkman-icon"
                                                    :class="{'active':menuCheck==='linkman'}"></i></span>
          </div>
          <div class="panel-content">
            <router-view name="panel"></router-view>
          </div>
        </div>
        <div class="edit-box">
          <router-view name="content"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'webChat',
    data() {
      return {
        searchData: '',
        menuCheck: 'linkman',
        userName: ''
      }
    },
    created: function () {

      if (this.$store.state.conn.user == null) {
        this.$router.push({name: 'login'})
      } else {
        this.changeMenu(this.menuCheck);
      }
    },
    mounted() {
      this.userName = this.$store.state.conn.user.name;
    },
    methods: {
      changeMenu(val) {
        this.menuCheck = val;
        this.$router.push({path: '/webChat/' + val})
      }
    },
  }
</script>

<style scoped lang="less">

  .content-first {
    background: url("../../assets/weChat/bg.jpg") no-repeat;
    background-size: cover;
  }

  .panel-content {
    position: absolute;
    bottom: 0;
    top: 160px;
    right: 0;
    left: 0;
    overflow: auto;
  }

  .panel-tab {
    padding: 0 10px 8px;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .active {
      color: green;
    }
    span:nth-child(odd) {
      width: 30%;
      cursor: pointer;
      text-align: center;
    }
    .chat-icon {
      background: url("../../assets/weChat/weicon.png") no-repeat;
      background-position: -150px -96px;
      -webkit-background-size: 487px 462px;
      background-size: 487px 462px;
      display: inline-block;
      vertical-align: middle;
      width: 35px;
      height: 35px;
      &.active {
        background-position: -185px -96px;
      }
    }
    .article-icon {
      background: url("../../assets/weChat/weicon.png") no-repeat;
      background-position: -376px -322px;
      -webkit-background-size: 487px 462px;
      background-size: 487px 462px;
      display: inline-block;
      vertical-align: middle;
      width: 35px;
      height: 35px;
      &.active {
        background-position: -304px -281px;
      }
    }
    .linkman-icon {
      background: url("../../assets/weChat/weicon.png") no-repeat;
      background-position: -220px -96px;
      -webkit-background-size: 487px 462px;
      background-size: 487px 462px;
      display: inline-block;
      vertical-align: middle;
      width: 35px;
      height: 35px;
      &.active {
        background-position: -304px -246px;
      }
    }
    &::after {
      content: '';
      position: absolute;
      border-bottom: 1px solid #24272c;
      height: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .index-box {
    height: 100%;

  }

  .chat-box {
    border-radius: 3px;
    display: flex;
    max-width: 1000px;
    min-width: 800px;
    padding-top: 100px;
    height: 90%;
    transition: 0.3s;
  }

  @media all and (max-height: 800px) , all and (max-width: 1000px) {
    .chat-box {
      padding-top: 0;
      height: 100%;
    }
  }

  @media all and (min-width: 1000px) {
    .chat-box {
      margin: 0 auto;
    }
  }

  .panel-box {
    position: relative;
    width: 280px;
    border-radius: 5px 0 0 5px;
    flex-shrink: 0;
    height: 100%;
    background-color: #2e3238;
  }

  .edit-box {
    width: 720px;
    height: 100%;
    background-color: #eeeeee;
  }

  .panel-header {
    padding: 18px;
    display: flex;
    align-items: center;
  }

  .user-logo {
    width: 50px;
    height: 40px;
    padding-right: 10px;
    & > img {
      width: 40px;
      height: 40px;
      border-radius: 2px;
    }
  }

  .user-name {
    text-align: left;
    & > span {
      display: inline-block;
      font-weight: 400;
      width: 156px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      color: #fff;
      font-size: 18px;
      vertical-align: top;
      line-height: 31px;
      text-decoration: none;
    }
  }

  .user-setting {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > a {
      text-decoration: none;
      color: #fff;
      opacity: 0.5;
    }
  }

  .panel-search {
    margin: 0px 18px 6px 18px;
    background-color: #26292e;
    display: flex;
    align-items: center;
    border-radius: 2px;
    .panel-search-icon {
      background: url("../../assets/weChat/weicon.png") no-repeat;
      background-position: -60px -432px;
      -webkit-background-size: 487px 462px;
      background-size: 487px 462px;
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      height: 30px;
    }
    i {
      width: 30px;
      color: white;
      opacity: 0.8;
    }
    input {
      flex-grow: 1;
      background-color: transparent;
      color: white;
      border: none;
      height: 32px;
      line-height: 32px;
      &:focus {
        outline: none;
      }
    }

  }

</style>
