<template>
  <div class="container">
    <div class="form_c">
      <div class="form_form">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" >
          <h2>博客管理系统</h2>
          <el-form-item prop="userName">
            <el-input class="el-input" placeholder="请输入用户名" v-model.number="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              class="el-input"
              placeholder="请输入密码"
              type="password"
              v-model="ruleForm.passWord"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" >登陆</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      }
      callback();
    };
    var validatePassWord = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      }
       callback();
    };
    return {
      ruleForm: {
        passWord: "",
        userName: ""
      },
      rules: {
        passWord: [{ validator: validatePassWord, trigger: "blur" }],
        userName: [{ validator: checkUserName, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
     const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login(this);
        } else {
          return false;
        }
      });
      
      loading.close();
    },
    resetForm(formName) {
      this.ruleForm = { passWord: "", userName: "" };
    },
    login(obj) {
      obj
        .$post("/manage/user/login", {
          userName: obj.ruleForm.userName,
          passWord: obj.ruleForm.passWord
        })
        .then(response => {

          if (response.code == "10200") {
            //obj.$store.dispatch("fillMenuList", response.result.menuVo);
            localStorage.setItem(
              "userObj",
              JSON.stringify(response.result.userObj)
            );

          var menuList = [];
          menuList=response.result.menuVo;
            var defaultMenu = {
              icon: "el-icon-menu",
              id: "defaultMenu",
              menuVo: [
                {
                  componentPath: "/manage/main/HomeMain",
                  icon: "",
                  id: "defaultMain",
                  menuVo: [],
                  name: "欢迎页面",
                  parentId: "defaultMenu",
                  path: "/manage/main/home",
                  type: "menu"
                }
              ],
              name: "默认菜单",
              path: "",
              type: "menu"
            };
            //this.menuList.push(defaultMenu);
            menuList.push(defaultMenu);

            localStorage.setItem(
              "menuList",
              JSON.stringify(menuList)
            );
            obj.$router.push({ path: "/manage" });
          } else {
            obj.$message({
              message: response.msg,
              center: true,
              type: "error",
              showClose: true,
              customClass: "message_c"
            });
          }
        })
    },
  }
};
</script>

<style scoped>
.container {
  margin-top: 8%;
}
.form_c {
  /* border-style: solid; */
  padding: 15%;
  background-color: #8aeaca;
  border-radius: 2%;
}
.form_form {
  width: 38%;
  margin-left: 30%;
  text-align: center;
}
.el-input {
  margin-bottom: 2%;
}
h2 {
  margin-bottom: 15%;
  font-family: Georgia;
}
</style>
