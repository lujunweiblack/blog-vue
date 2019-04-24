// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import axios from 'axios'
import {post,fetch,patch,put} from './common/http'
import { Message,Notification} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入store
import store from './store'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;`  `   
Vue.component(Message.name, Message)
Vue.component(Notification.name, Notification)
Vue.config.productionTip = false
Vue.use(require('vue-wechat-title'))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //引入store(Vuex框架进行传值)
  store,
  components: { App },
  template: '<App/>',
})
