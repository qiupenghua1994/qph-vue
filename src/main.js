// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//配置文件
import '@/config/index'
//公共模块
import '@/common/index'
//粒子特效
import particles from 'particles.js'

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'

import store from '@/store/index'

Vue.use(particles)
Vue.use(ElementUI)

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.conn.user == null) {
      next({name: 'login', params: to})
    } else {
      next();
    }
  } else {
    next();
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
