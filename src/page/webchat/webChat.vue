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
              <span>天高任鸟飞sdsdffdfdfdfd</span>
            </div>
            <div class="user-setting">
              <a class="glyphicon glyphicon-align-left"> </a>
            </div>
          </div>
          <div class="panel-search">
            <i class="fa fa-search fa-lg"></i>
            <input placeholder="搜索" v-model="searchData"/>
          </div>
          <div class="panel-tab">
            <router-view></router-view>
          </div>
        </div>
        <div class="edit-box">
          <router-view name="test2"></router-view>
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
        searchData: ''
      }
    }
  }
</script>

<style scoped lang="less">
  .index-box {
    height: 100%;
  }

  .chat-box {
    border-radius: 3px;
    display: flex;
    max-width: 1000px;
    min-width: 800px;
    padding-top: 100px;
    height: 80%;
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
    width: 280px;
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
