// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//配置文件
import config from './config/index'
//粒子特效
import particles from 'particles.js'
//公共模块
import common from './common/index'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(particles)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
