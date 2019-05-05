<template>
  <div id="app">
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
</style>
