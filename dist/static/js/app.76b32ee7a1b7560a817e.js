webpackJsonp([9],{EjzY:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("xd7I"),a=s("aA9S"),i=s.n(a),o=s("3cXf"),r=s.n(o),l=s("E4C3"),u=s.n(l),c=(s("ve9D"),{name:"App",data:function(){return{userName:"",passWord:"",confirmPassword:"",userObj:{}}},created:function(){var t=this;u.a.configure({showSpinner:!1}),this.$router.beforeEach(function(t,e,s){u.a.start(),s()}),this.$router.afterEach(function(t){u.a.done()}),u.a.configure({showSpinner:!1}),window.addEventListener("beforeunload",function(){localStorage.setItem("messageStore",r()(t.$store.state))}),localStorage.getItem("messageStore")&&this.$store.replaceState(i()(this.$store.state,JSON.parse(localStorage.getItem("messageStore")))),this.userObj=localStorage.getItem("userObj"),this.$store.dispatch("fillUserObj",JSON.parse(this.userObj))},methods:{checkTime:function(){var t=(new Date).getHours();return t<6?"凌晨好！":t<9?"早上好！":t<12?"上午好！":t<14?"中午好！":t<17?"下午好！":t<19?"傍晚好！":t<22?"晚上好！":"夜里好！"},login:function(){var t=this;this.userName&&this.passWord?this.$post("/manage/user/login",{userName:this.userName,passWord:this.passWord}).then(function(e){"10200"==e.code?(t.$store.dispatch("fillUserObj",e.result),localStorage.setItem("userObj",r()(e.result)),t.$notify({title:"登陆成功",message:t.checkTime()+e.result.userName,position:"top-left",type:"success"})):t.$message({message:e.msg,center:!0,type:"error",showClose:!0,customClass:"message_c"})}):this.$message({message:"输入用户名或密码",center:!0,type:"error",showClose:!0,customClass:"message_c"})},logout:function(){this.userName=null,this.passWord=null,localStorage.removeItem("userObj"),this.$store.dispatch("fillUserObj",null),this.$notify({title:"退出登陆",position:"top-left",type:"success"})},back:function(){this.$store.dispatch("changeIsOpen",!1)},register:function(){this.email?this.passWord?this.passWord==this.confirmPassword?(this.userName=null,this.passWord=null,this.$store.dispatch("changeIsOpen",!1),alert("注册成功")):alert("两次密码不一致"):alert("请输入确认密码"):alert("请填写您的邮箱")},toRegister:function(){this.userName&&this.passWord?"陆军委"!=this.userName?(this.email=null,this.confirmPassword=null,this.$store.dispatch("changeIsOpen",!0)):alert("该用户已经存在"):alert("请输入用户名或密码")},reset:function(){this.userName=null,this.passWord=null}}}),p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"container"},[null==this.$store.state.userObj&&0==this.$store.state.isOpen?s("div",{staticClass:"title_button"},[s("div",{staticClass:"title_input"},[s("form",{staticClass:"bs-example bs-example-form",attrs:{role:"form"}},[s("div",{staticClass:"input-group input-group-sm input_d"},[t._m(0),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"username"},domProps:{value:t.userName},on:{input:function(e){e.target.composing||(t.userName=e.target.value)}}}),t._v(" "),t._m(1),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.passWord,expression:"passWord"}],staticClass:"form-control",attrs:{type:"password",placeholder:"password"},domProps:{value:t.passWord},on:{input:function(e){e.target.composing||(t.passWord=e.target.value)}}}),t._v(" "),s("button",{staticClass:"btn btn-primary btn-sm btn_c",attrs:{type:"button"},on:{click:function(e){return t.login()}}},[t._v("登 陆")]),t._v(" "),s("button",{staticClass:"btn btn-primary btn-sm btn_c_1",attrs:{type:"button"},on:{click:function(e){return t.reset()}}},[t._v("重 置")])])])])]):t._e(),t._v(" "),1==this.$store.state.isOpen?s("div",{staticClass:"title_button"},[s("div",{staticClass:"title_input"},[s("form",{staticClass:"bs-example bs-example-form",attrs:{role:"form"}},[s("div",{staticClass:"input-group input-group-sm input_d"},[t._m(2),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"text",placeholder:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),t._m(3),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.confirmPassword,expression:"confirmPassword"}],staticClass:"form-control",attrs:{type:"password",placeholder:"confirm password"},domProps:{value:t.confirmPassword},on:{input:function(e){e.target.composing||(t.confirmPassword=e.target.value)}}}),t._v(" "),s("button",{staticClass:"btn btn-default btn-sm btn_c",attrs:{type:"button"},on:{click:function(e){return t.back()}}},[t._v("回 退")]),t._v(" "),s("button",{staticClass:"btn btn-default btn-sm btn_c_1",attrs:{type:"button"},on:{click:function(e){return t.register()}}},[t._v("完成")])])])])]):t._e(),t._v(" "),null!=this.$store.state.userObj?s("div",{staticClass:"user_c"},[s("div",{staticClass:"user_d_c"},[s("span",{staticClass:"username"},[t._v("    ")]),t._v(" \n        "),s("span",{staticClass:"user_n_c"},[t._v(t._s(this.$store.state.userObj.userName))]),t._v("  \n        "),s("span",{staticClass:"email"},[t._v("    ")]),t._v(" \n        "),s("span",{staticClass:"user_n_c"},[t._v(t._s(this.$store.state.userObj.email))]),t._v(" "),s("a",{attrs:{href:"javascript: void(0);"},on:{click:function(e){return t.logout()}}},[s("span",{staticClass:"logout"},[t._v("    ")])]),t._v(" "),s("hr")])]):t._e(),t._v(" "),null!=t.$route.meta.title?s("div",{staticClass:"jumbotron"},[null!=t.$route.meta.title?s("h3",{staticClass:"h3_c",domProps:{textContent:t._s(t.$route.meta.title)}}):t._e()]):t._e()]),t._v(" "),s("router-view",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:t.$route.meta.title,expression:"$route.meta.title"}]})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"input-group-addon"},[e("span",{staticClass:"username"},[this._v("    ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"input-group-addon"},[e("span",{staticClass:"password"},[this._v("    ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"input-group-addon"},[e("span",{staticClass:"email"},[this._v("    ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"input-group-addon"},[e("span",{staticClass:"password"},[this._v("    ")])])}]};var m=s("C7Lr")(c,p,!1,function(t){s("m1lm")},null,null).exports,f=s("3XdE"),d=s("VKT6"),h=s.n(d);s("EjzY");n.default.use(f.a),n.default.use(h.a);var v=new f.a({routes:[{path:"/",name:"home",component:function(){return s.e(6).then(s.bind(null,"ZHiF"))},meta:{title:"傻不拉几的二哈"}},{path:"/life",name:"life",component:function(){return s.e(5).then(s.bind(null,"yk59"))},meta:{title:"生  活"}},{path:"/article",name:"article",component:function(){return s.e(3).then(s.bind(null,"/DCA"))},meta:{title:"文  章"}},{path:"/info",name:"info",component:function(){return Promise.all([s.e(0),s.e(4)]).then(s.bind(null,"JKR8"))}},{path:"/helloWorld",name:"helloWorld",component:function(){return s.e(7).then(s.bind(null,"gORT"))},meta:{title:"VUE"}},{path:"/manage/add",name:"add",component:function(){return Promise.all([s.e(0),s.e(1)]).then(s.bind(null,"k2BC"))}},{path:"/manage/edit",name:"edit",component:function(){return Promise.all([s.e(0),s.e(2)]).then(s.bind(null,"Oz2b"))}}],mode:"history"}),_=(s("NKjZ"),s("vWfK"),s("aozt")),g=s.n(_),b=s("rVsN"),C=s.n(b);g.a.defaults.timeout=1e4,g.a.defaults.baseURL="http://188.131.240.160:9000";var $=s("Gir3"),w=(s("hsAa"),s("R4Sj"));n.default.use(w.a);var O=new w.a.Store({state:{articles:[],article:{},userObj:{},isOpen:!1},actions:{fillArticles:function(t,e){t.commit("fillArticles",e)},fillArticle:function(t,e){t.commit("fillArticle",e)},fillUserObj:function(t,e){t.commit("fillUserObj",e)},changeIsOpen:function(t,e){t.commit("changeIsOpen",e)}},mutations:{fillArticles:function(t,e){t.articles=e},fillArticle:function(t,e){t.article=e},fillUserObj:function(t,e){t.userObj=e},changeIsOpen:function(t,e){t.isOpen=e}}});n.default.prototype.$post=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new C.a(function(s,n){g.a.post(t,e).then(function(t){s(t.data)},function(t){n(t)})})},n.default.prototype.$fetch=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new C.a(function(s,n){g.a.get(t,{params:e}).then(function(t){s(t.data)}).catch(function(t){n(t)})})},n.default.prototype.$patch=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new C.a(function(s,n){g.a.patch(t,e).then(function(t){s(t.data)},function(t){n(t)})})},n.default.prototype.$put=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new C.a(function(s,n){g.a.put(t,e).then(function(t){s(t.data)},function(t){n(t)})})},n.default.prototype.$message=$.Message,n.default.prototype.$notify=$.Notification,n.default.component($.Message.name,$.Message),n.default.component($.Notification.name,$.Notification),n.default.config.productionTip=!1,n.default.use(s("/Xo2")),new n.default({el:"#app",router:v,store:O,components:{App:m},template:"<App/>"})},NKjZ:function(t,e){},hsAa:function(t,e){},m1lm:function(t,e){},ve9D:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.76b32ee7a1b7560a817e.js.map