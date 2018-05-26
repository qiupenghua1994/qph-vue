<template>
  <nav id="navbar" :class="{'shrink':isNavBarShrink,'active':isOpenMenu}">
    <div class="header">
      <a class="header_logo"><img src="../assets/logo_header.svg"></a>
      <a class="header-menu-shrink fa fa-list fa-2x" @click="openMenu">
      </a>
      <div class="header-menu" :class="{'active':isOpenMenu}">
        <a class="header-menu-item" v-for="menu in menus" @click="changeRouter(menu)">{{menu.name}}</a>
      </div>
    </div>

  </nav>
</template>

<script>
  import {onScrollTopChange, fireEvent} from '../utils/scroll'

  export default {
    name: "gfHeader",
    data() {
      return {
        isOpenMenu: false,
        isNavBarShrink: false,
        isSmallScreen: false,
        menus: [
          {name: '首页', router: '/'},
          {name: '特效页面', router: 'specialEffects'},
          // {name: '组件封装', router: 'packag'},
          {name: '我的简历', router: 'resume'},
          {name: '敬请等待'},
          {name: '敬请等待'}
        ]
      }
    },
    methods: {
      changeRouter(menu) {
        this.$router.push(menu.router);
        this.isNavBarShrink && this.openMenu();
      },
      openMenu() {
        this.isOpenMenu = !this.isOpenMenu;
        this.isNavBarShrink = this.isOpenMenu;
        if (this.isOpenMenu) {
          window.addEventListener('click', this.clickListen);
        } else {
          fireEvent('scroll');
          window.removeEventListener('click', this.clickListen);
        }
      },
      clickListen(e) {
        var c = e.target.classList[0];
        if (c && c.indexOf('header') >= 0) {
        } else {
          this.openMenu();
        }
      }

    },
    mounted: function () {

      onScrollTopChange(function (e) {
        if (e < 3) {
          this.isNavBarShrink = false;
        } else {
          this.isNavBarShrink = true;
        }
      }.bind(this));
      onScrollTopChange(function () {
        this.isOpenMenu = false;
      }.bind(this));
    }
  }
</script>

<style scoped>

  * {
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  #navbar {
    padding: 27px 16px;
    box-sizing: border-box;
    background-color: transparent;
    position: fixed;
    width: 100%;
    z-index: 1024;
    transition: padding 0.3s, background-color 0.3s;
  }

  #navbar.shrink {
    padding: 8px 16px;
    background-color: rgba(0, 0, 0, 0.9);
  }

  #navbar.active {
    padding-bottom: 300px;
    overflow: hidden;
  }

  .header {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;

  }

  .header_logo {
    display: inline-block;
    padding: 5px;
  }

  .header_logo > img {
    height: 30px;
  }

  .header-menu-shrink {
    float: right;
    display: none;
  }

  .header-menu {
    float: right;
    display: inline-block;
  }

  .header-menu.active {
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    text-align: center;
  }

  .header-menu.active .header-menu-item {
    display: block;
    opacity: 1;
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
      opacity: 0;
    }

    .header-menu-shrink {
      display: inline-block;
      padding: 5px;
    }
  }
</style>
