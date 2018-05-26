<template>
  <nav id="navbar" :class="{'shrink':isNavBarShrink}">
    <div class="header">
      <a class="header_logo"><img src="../assets/logo_header.svg"></a>
      <button class="header_btn" v-show="isSmallScreen">打开目录</button>
      <div class="header-menu">
        <a class="header-menu-item" v-for="menu in menus" @click="changeRouter(menu)">{{menu.name}}</a>
        <a class="header-menu-shrink">
          <button>test</button>
        </a>
      </div>
    </div>
  </nav>

</template>

<script>
  import scroll from '../utils/scroll'
  export default {
    name: "gfHeader",
    data() {
      return {
        isNavBarShrink:false,
        isSmallScreen: false,
        menus: [
          {name: '首页', router: '/'},
          {name: '特效页面',router:'specialEffects'},
          // {name: '组件封装', router: 'packag'},
          {name: '我的简历', router: 'resume'},
          {name: '敬请等待'},
          {name: '敬请等待'}
        ]
      }
    },
    methods:{
      changeRouter:function (menu) {
        this.$router.push(menu.router);
      }
    },
    mounted:function () {

      scroll.onScrollTopChange(function (e) {
        if(e <3){
          this.isNavBarShrink = false;
        }else {
          this.isNavBarShrink = true;
        }
      }.bind(this));
    }
  }
</script>

<style scoped>

  * {
    trastion: all 1s;
  }

  #navbar{
    padding: 27px 16px;
    box-sizing: border-box;
    background-color: transparent;
    position: fixed;
    width: 100%;
    z-index: 1024;
    transition: padding 0.3s,background-color 0.3s;
  }
  #navbar.shrink{
    padding:8px 16px;
    background-color: rgba(0, 0, 0, 0.9);
  }
  .header {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
  }
  .header_logo{
    display: inline-block;
    padding: 5px;
  }
  .header_logo>img{
    height: 30px;
  }

  .header_btn{

  }

  .header-menu-shrink {
    display: none;
  }

  .header-menu {
    float: right;
    display: inline-block;
  }

  .header-menu-item {
    font-size: 16px;
    line-height: 40px;
    padding: 8px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.5);
  }

  .header-menu-item:hover {
    color: rgba(255, 255, 255, 0.75);
  }

  @media all and (max-width: 600px) {
    .header-menu-item {
      display: none;
    }

    .header-menu-shrink {
      display: block;
    }
  }
</style>
