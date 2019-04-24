<template>
  <div id="app">
    <div class="container">
      <div
        v-if="this.$store.state.userObj==null && this.$store.state.isOpen==false"
        class="title_button"
      >
        <div class="title_input">
          <form class="bs-example bs-example-form" role="form">
            <div class="input-group input-group-sm input_d">
              <span class="input-group-addon">
                <span class="username">&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </span>
              <input type="text" v-model="userName" class="form-control" placeholder="username">
              <span class="input-group-addon">
                <span class="password">&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </span>
              <input type="password" v-model="passWord" class="form-control" placeholder="password">
              <button type="button" @click="login()" class="btn btn-primary btn-sm btn_c">登 陆</button>
              <button type="button" @click="reset()" class="btn btn-primary btn-sm btn_c_1">重 置</button>
              <!-- <button type="button" @click="toRegister()" class="btn btn-default btn-sm btn_c_1">注 册</button> -->
            </div>
          </form>
        </div>
      </div>
      <div v-if="this.$store.state.isOpen==true" class="title_button">
        <div class="title_input">
          <form class="bs-example bs-example-form" role="form">
            <div class="input-group input-group-sm input_d">
              <span class="input-group-addon">
                <span class="email">&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </span>
              <input type="text" v-model="email" class="form-control" placeholder="email">
              <span class="input-group-addon">
                <span class="password">&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </span>
              <input
                type="password"
                v-model="confirmPassword"
                class="form-control"
                placeholder="confirm password"
              >
              <button type="button" @click="back()" class="btn btn-default btn-sm btn_c">回 退</button>
              <button type="button" @click="register()" class="btn btn-default btn-sm btn_c_1">完成</button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="this.$store.state.userObj!=null" class="user_c">
        <div class="user_d_c">
          <span class="username">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;
          <span class="user_n_c">{{ this.$store.state.userObj.userName }}</span>&nbsp;&nbsp;
          <span class="email">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;
          <span class="user_n_c">{{ this.$store.state.userObj.email }}</span>
          <a @click="logout()" href="javascript: void(0);">
            <span class="logout">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </a>
          <hr>
        </div>
      </div>
      <div class="jumbotron" v-if="$route.meta.title != null">
        <h3 v-if="$route.meta.title != null" class="h3_c" v-text="$route.meta.title"></h3>
      </div>
    </div>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export default {
  name: "App",
  data() {
    return {
      userName: "",
      passWord: "",
      confirmPassword: "",
      userObj: {}
    };
  },
  created: function() {
    NProgress.configure({ showSpinner: false });
    this.$router.beforeEach((to, from, next) => {
      NProgress.start();
      next();
    });

    this.$router.afterEach(transition => {
      NProgress.done();
    });
    NProgress.configure({ showSpinner: false });

    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("messageStore", JSON.stringify(this.$store.state));
    });

    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("messageStore") &&
      this.$store.replaceState(
        Object.assign(
          this.$store.state,
          JSON.parse(localStorage.getItem("messageStore"))
        )
      );

    //判断用户是否登录
    this.userObj = localStorage.getItem("userObj");
    this.$store.dispatch("fillUserObj", JSON.parse(this.userObj));
  },
  methods: {
    checkTime() {
      var hour = new Date().getHours();
      if (hour < 6) {
        return "凌晨好！";
      } else if (hour < 9) {
        return "早上好！";
      } else if (hour < 12) {
        return "上午好！";
      } else if (hour < 14) {
        return "中午好！";
      } else if (hour < 17) {
        return "下午好！";
      } else if (hour < 19) {
        return "傍晚好！";
      } else if (hour < 22) {
        return "晚上好！";
      } else {
        return "夜里好！";
      }
    },
    login() {
      if (!this.userName || !this.passWord) {
        this.$message({
          message: "输入用户名或密码",
          center: true,
          type: "error",
          showClose: true,
          customClass: "message_c"
        });
        return;
      }

      this.$post("/manage/user/login", {
        userName: this.userName,
        passWord: this.passWord
      }).then(response => {
        // console.log(response);
        if (response.code == "10200") {
          this.$store.dispatch("fillUserObj", response.result);
          localStorage.setItem("userObj", JSON.stringify(response.result));
          this.$notify({
            title: "登陆成功",
            message: this.checkTime() + response.result.userName,
            position: "top-left",
            type: "success"
          });
        } else {
          this.$message({
            message: response.msg,
            center: true,
            type: "error",
            showClose: true,
            customClass: "message_c"
          });
        }
      });
    },
    logout() {
      this.userName = null;
      this.passWord = null;
      localStorage.removeItem("userObj");
      this.$store.dispatch("fillUserObj", null);
       this.$notify({
            title: "退出登陆",
            position: "top-left",
            type: "success"
          });
    },
    back() {
      this.$store.dispatch("changeIsOpen", false);
    },
    register() {
      if (!this.email) {
        alert("请填写您的邮箱");
        return;
      }
      if (!this.passWord) {
        alert("请输入确认密码");
        return;
      }
      if (this.passWord != this.confirmPassword) {
        alert("两次密码不一致");
        return;
      }

      this.userName = null;
      this.passWord = null;
      this.$store.dispatch("changeIsOpen", false);
      alert("注册成功");
    },
    toRegister() {
      if (!this.userName || !this.passWord) {
        alert("请输入用户名或密码");
        return;
      }
      //测试使用
      if (this.userName == "陆军委") {
        alert("该用户已经存在");
        return;
      }
      this.email = null;
      this.confirmPassword = null;
      this.$store.dispatch("changeIsOpen", true);
    },
    reset() {
      this.userName = null;
      this.passWord = null;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.h3_c {
  text-align: center;
}
.title_button {
  padding: 1%;
  width: 100%;
}
.title_input {
  margin: 0 auto;
  width: 50%;
}
.input_d {
  padding: 3.5%;
}
.btn_c {
  margin-left: 2%;
}
.btn_c_1 {
  margin-left: 1px;
}
.user_n_c {
  font-style: italic;
}
.user_d_c {
}
.user_c {
  padding-top: 2%;
  text-align: center;
}
.btn-default {
  color: #fff;
  background-color: #919294;
  border-color: #919294;
}
.btn-default.focus,
.btn-default:focus {
  color: #fff;
  background-color: #737475;
  border-color: #737475;
}

.btn-default:hover {
  color: #fff;
  background-color: #737475;
  border-color: #737475;
}
.btn-default.active,
.btn-default:active,
.open > .dropdown-toggle.btn-default {
  color: #fff;
  background-color: #737475;
  border-color: #737475;
}

.input-group-lg > .form-control,
.input-group-lg > .input-group-addon,
.input-group-lg > .input-group-btn > .btn {
  height: 46px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
.input-group-addon {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-group .form-control:first-child,
.input-group-addon:first-child,
.input-group-btn:first-child > .btn,
.input-group-btn:first-child > .btn-group > .btn,
.input-group-btn:first-child > .dropdown-toggle,
.input-group-btn:last-child > .btn-group:not(:last-child) > .btn,
.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.username {
  background-image: url(../static/images/username.png);
  background-size: cover;
}
.password {
  background-image: url(../static/images/password.png);
  background-size: cover;
}
.email {
  background-image: url(../static/images/email.png);
  background-size: cover;
}
.logout {
  margin-left: 5%;
  background-image: url(../static/images/logout1.png);
  background-size: cover;
}
.logout:hover {
  margin-left: 5%;
  background-image: url(../static/images/logout.png);
  height: 5%;
}
a:link {
  text-decoration: none;
}
.message_c {
  margin-top: 2.4%;
}
</style>
