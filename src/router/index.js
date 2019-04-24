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
const Edit = () => import('@/page/manage/Edit')
Vue.use(Router)
Vue.use(mavonEditor)
export default new Router({
 // base: '/blog/',  //添加的地方
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: "傻不拉几的二哈"
      }
    },
    {
      path: '/life',
      name: 'life',
      component: Life,
      meta: {
        title: "生  活"
      }
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
      meta: {
        title: "文  章"
      }
    },
    {
      path: '/info',
      name: 'info',
      component: Info,

    },
    {
      path: '/helloWorld',
      name: 'helloWorld',
      component: HelloWorld,
      meta: {
        title: "VUE"
      }
    },
    {
      path: '/manage/add',
      name: 'add',
      component: Add,
    },
    {
      path: '/manage/edit',
      name: 'edit',
      component: Edit,
    },
  ],
  mode:'history'   //去除#号
})
