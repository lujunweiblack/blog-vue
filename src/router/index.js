import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Home from '@/page/Home'
// import Life from '@/page/category/Life'
// import Article from '@/page/category/Article'
// import Info from '@/page/Info'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
const HelloWorld = () => import('@/components/HelloWorld')
const Home = () => import('@/page/Home')
const Life = () => import('@/page/category/Life')
const Article = () => import('@/page/category/Article')
const Info = () => import('@/page/Info')
const Add = () => import('@/page/manage/Add')

Vue.use(Router)
Vue.use(mavonEditor)
export default new Router({
  base: '/dist/',  //添加的地方
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
        title: "生  活"
      }
    },
    {
      path: '/Article',
      name: 'Article',
      component: Article,
      meta: {
        title: "文  章"
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
        title: "VUE"
      }
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: "VUE"
      }
    },
    {
      path: '/manage/Add',
      name: 'Add',
      component: Add,
    },
  ]
})
