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
import resume from '@/page/resume/index'
import webChat from '@/page/webchat/webChat'
import contentArticle from '@/page/webchat/contentArticle'
import contentChat from '@/page/webchat/contentChat'
import contentLinkman from '@/page/webchat/contentLinkman'
import panelArticle from '@/page/webchat/panelArticle'
import panelChat from '@/page/webchat/panelChat'
import panelLinkman from '@/page/webchat/panelLinkman'
import worklog from '@/page/worklog/index'
import manage from '@/page/manage/index'
import login from '@/page/login'
import maze from '@/page/game/maze'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: maze,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/index',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/specialEffects',
      name: 'specialEffects',
      component: specialEffects,
    },
    {
      path: '/webChat',
      name: 'webChat',
      component: webChat,
      children: [
        {
          path: 'chat',
          components: {
            panel: panelChat,
            content: contentChat
          }
        },
        {
          path: 'article',
          components: {
            panel: panelArticle,
            content: contentArticle
          }
        },
        {
          path: 'linkman',
          components: {
            panel: panelLinkman,
            content: contentLinkman
          }
        }
      ]
    },
    {
      path: '/packag',
      name: 'packag',
      component: packagIndex,
      children: [
        {
          path: '',
          component: elementIndex
        },
        {
          path: 'pageB',
          component: pageB
        }
      ]
    },
    {
      path: '/resume',
      name: 'resume',
      component: resume
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
    },
    {
      path: '/workLog',
      name: 'workLog',
      component: worklog
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage
    },
    {
      path:'/maze',
      name:'maze',
      component:maze
    }
  ]
})
