import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GfTable from '@/components/GfTable'
import page from '@/components/page'
import pageA from '@/components/pageA'
import pageB from '@/components/pageB'
import specialEffects from '@/page/specialEffects'
import packagIndex from '@/page/packag/index'
import elementIndex from '@/page/packag/element/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,

    },
    {
      path: '/specialEffects',
      name: 'specialEffects',
      component: specialEffects,
    },

    {
      path: '/packag',
      name: 'packag',
      component: packagIndex,
      children:[
        {
          path:'',
          component: elementIndex
        },
        {
          path:'pageB',
          component:pageB
        }
      ]
    },
    {
      path: '/page',
      name: 'page',
      component: page,
      children: [
        {
          path: '',
          component: pageA
        },
        {
          path: 'pageB',
          component: pageB
        }
      ]
    }
  ]
})
