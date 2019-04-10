import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/page/Home'
import Life from '@/page/category/Life'
import Article from '@/page/category/Article'
import Info from '@/page/Info'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(Router)
Vue.use(mavonEditor)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "傻不拉几的二哈"
    }
    },
    {
      path: '/Life',
      name: 'Life',
      component: Life,
      meta: {
        title: "生活 - 傻不拉几的二哈"
      }
    },
    {
      path: '/Article',
      name: 'Article',
      component: Article,
      meta: {
        title: "文章 - 傻不拉几的二哈"
      }
    },
    {
      path: '/Info',
      name: 'Info',
      component: Info,

    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: "VUE - 傻不拉几的二哈"
      }
    }
  ]
})
