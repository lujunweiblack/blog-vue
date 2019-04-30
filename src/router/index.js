import Vue from 'vue'
import Router from 'vue-router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
const HelloWorld = () => import('@/components/HelloWorld')
const Home = () => import('@/portal/Home')
const Life = () => import('@/portal/Life')
const Article = () => import('@/portal/Article')
const Info = () => import('@/portal/Info')
const Add = () => import('@/manage/Add')
const Manage = () => import('@/manage/Manage')
const Login = () => import('@/manage/Login')
// const Edit = () => import('@/manage/Edit')
Vue.use(Router)
Vue.use(mavonEditor)
export default new Router({
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
      path: '/portal/life',
      name: 'life',
      component: Life,
      meta: {
        title: "生  活"
      }
    },
    {
      path: '/portal/article',
      name: 'article',
      component: Article,
      meta: {
        title: "文  章"
      }
    },
    {
      path: '/portal/info',
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
      path: '/manage',
      name: 'login',
      component: Login,
    },
    {
      path: '/manage/home',
      name: 'manage',
      component: Manage,
    },
    {
      path: '/manage/add',
      name: 'add',
      component: Add,
    },
    // {
    //   path: '/manage/edit',
    //   name: 'edit',
    //   component: Edit,
    // },
    
  ],
  mode:'history'   //去除#号
})
