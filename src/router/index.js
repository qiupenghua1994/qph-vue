import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GfTable from '@/components/GfTable'
import page from '@/components/page'
import pageA from '@/components/pageA'
import pageB from '@/components/pageB'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,

    },
    {
       path:'/page',
      name:'page',
      component:page,
      children:[
        {
          path:'',
          component:pageA
        },
        {
          path:'pageB',
          component:pageB
        }
      ]
    }
  ]
})
