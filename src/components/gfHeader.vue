<template>
  <nav id="navbar" :class="{'shrink':isNavBarShrink}">
    <div class="header">
      <a class="header_logo"><img src="../assets/logo_header.svg"></a>
      <button class="header_btn" v-show="isSmallScreen">打开目录</button>
      <div class="header_menu">
        <a class="header_menu_item" v-for="menu in menus" @click="changeRouter(menu)">{{menu.name}}</a>
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
          {name: '特效页面',router:'specialEffects'},
          {name: '敬请等待'},
          {name: '敬请等待'},
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

  #navbar{
    padding: 27px 16px;
    background-color: transparent;
    position: fixed;
    width: 100%;
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
  .header_menu{
    float: right;
    display: inline-block;
  }
  .header_menu_item{
    font-size: 16px;
    line-height: 40px;
    padding: 8px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.5);
  }
  .header_menu_item:hover{
    color: rgba(255, 255, 255, 0.75);
  }
</style>
