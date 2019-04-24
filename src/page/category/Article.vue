<template>
  <div class="container">
    <!-- 操作按钮 -->
    <div
      v-if="this.$store.state.userObj!=null && this.$store.state.userObj.sysRoles[0].code=='ROLE_SYS_ADMIN'"
      class="operation_c"
    >
      <a @click="line()" class="operation_c" href="JavaScript: void(0);">
        <span class="span_line_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>上下线
      </a>
      <a @click="add()" class="operation_c" href="JavaScript: void(0);">
        <span class="span_add_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>新增
      </a>
      <a @click="edit()" class="operation_c" href="JavaScript: void(0);">
        <span class="span_edit_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>修改
      </a>

      <a @click="del()" class="operation_c" href="JavaScript: void(0);">
        <span class="span_del_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>删除
      </a>
      <span class="span_running_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>已上线
      <span class="span_default_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>已下线
      <span class="span_stop_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>已删除(标记)
      <hr>
    </div>
    <div class="item" v-for="(val,index) in articles">
      <div
        class="item_d_c"
        v-if="store.state.userObj!=null && store.state.userObj.sysRoles[0].code=='ROLE_SYS_ADMIN'"
      >
        <input type="checkbox" v-text="val">
        <span v-if="val.articleState==0" class="span_default_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span v-if="val.articleState==1" class="span_running_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span v-if="val.articleState==2" class="span_stop_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      <a href="javascript:void(0)" @click="jumpCategory(val.articleId,index)">
        <h4>{{ val.articleTitleName }}</h4>
        <p>&nbsp;{{ val.articleIntroduction }}</p>
      </a>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      articles: [],
      store: this.$store
    };
  },
  computed: {
    userObj() {
      return this.$store.state.userObj;
    }
  },
  methods: {
    jumpCategory(articleId, index) {
      var article = this.articles[index];
      this.$store.dispatch("fillArticle", article);
      this.$router.push({ name: "info" });
    },
    //
    add() {
      this.$router.push({ name: "add" });
    },
    edit() {
      var articles = this.buttonCheck();
      if (articles.length == 0 || articles.length > 1) {
        this.$message({
          message: "请勾选一条数据",
          center: true,
          type: "error",
          showClose: true
        });
      } else {
        this.$store.dispatch("fillArticle", articles[0]);
        this.$router.push({ name: "edit" });
      }
    },
    line() {
      var articles = this.buttonCheck();
      if (articles.length == 0) {
        this.$message({
          message: "请勾选一条数据",
          center: true,
          type: "error",
          showClose: true
        });
      } else {
        articles.forEach(article => {
          this.$post("/manage/article/upAndDown", {
            articleId: article.articleId,
            articleState: article.articleState
          }).then(response => {
            // console.log(response);
            if (response.code == "10200") {
              this.onReadData();
              this.$notify({
                title: "操作成功",
                position: "top-left",
                type: "success"
              });
            } else {
               this.$notify({
                title: "操作失败",
                position: "top-left",
                type: "error"
              });
            }
          });
        });
      }
    },
    del() {
      var articles = this.buttonCheck();
      if (articles.length == 0) {
        this.$message({
          message: "请勾选一条数据",
          center: true,
          type: "error",
          showClose: true
        });
      } else {
        articles.forEach(article => {
          this.$post("/manage/article/markDel", {
            articleId: article.articleId
          }).then(response => {
            // console.log(response);
            if (response.code == "10200") {
              this.onReadData();
               this.$notify({
                title: "删除成功",
                position: "top-left",
                type: "success"
              });
            } else {
             this.$notify({
                title: "删除失败",
                position: "top-left",
                type: "error"
              });
            }
          });
        });
      }
    },
    buttonCheck() {
      var checkObj = $("input[type='checkbox']");
      var value = new Array();
      for (var i = 0; i < checkObj.length; i++) {
        if (checkObj[i].checked) {
          value.push(JSON.parse($(checkObj[i]).text()));
        }
      }
      return value;
    },
    onReadData() {
      var userParam = "&articleState=1";
      if (
        this.$store.state.userObj != null &&
        this.$store.state.userObj.sysRoles[0].code == "ROLE_SYS_ADMIN"
      ) {
        userParam = "";
      }
      this.$fetch("/portal/article?articleType=1" + userParam).then(
        response => {
          this.$store.dispatch("fillArticles", response.result);
          this.articles = response.result;
        }
      );
    }
  },
  mounted: function() {
    this.onReadData();
  },
  watch: {
    userObj: function(newStore, oldStore) {
      this.onReadData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operation_c {
  margin-bottom: 4%;
}
.span_add_c {
  margin-right: 1%;
  background-image: url(../../../static/images/add.png);
  background-size: cover;
}
.span_add_c:hover {
  margin-right: 1%;
  background-image: url(../../../static/images/add1.png);
  background-size: cover;
}
.span_edit_c {
  margin-right: 1%;
  background-image: url(../../../static/images/edit.png);
  background-size: cover;
}
.span_edit_c:hover {
  margin-right: 1%;
  background-image: url(../../../static/images/edit1.png);
  background-size: cover;
}

.span_line_c {
  margin-right: 1%;
  background-image: url(../../../static/images/line.png);
  background-size: cover;
}
.span_line_c:hover {
  margin-right: 1%;
  background-image: url(../../../static/images/line1.png);
  background-size: cover;
}
/* .span_offline_c {
  margin-right: 1%;
  background-image: url(../../../static/images/offline.png);
  background-size: cover;
}
.span_offline_c:hover {
  margin-right: 1%;
  background-image: url(../../../static/images/offline1.png);
  background-size: cover;
} */
.span_del_c {
  margin-right: 1%;
  background-image: url(../../../static/images/del.png);
  background-size: cover;
}
.span_del_c:hover {
  margin-right: 1%;
  background-image: url(../../../static/images/del1.png);
  background-size: cover;
}
.span_default_c {
  margin-left: 1%;
  background-image: url(../../../static/images/article_default.png);
  background-size: cover;
}
.span_running_c {
  margin-left: 1%;
  background-image: url(../../../static/images/article_running.png);
  background-size: cover;
}
.span_stop_c {
  margin-left: 1%;
  background-image: url(../../../static/images/article_stop.png);
  background-size: cover;
}
.item_d_c {
}
h4 {
  margin-top: 2%;
}
p {
  margin-top: 1%;
}
.operation_c {
  margin-right: 2%;
}
.operation_c_c {
  margin-right: 1%;
}
a:link {
  color: #2c3e50;
  text-decoration: none;
}
a:visited {
  color: #2c3e50;
  text-decoration: none;
}
a:hover {
  color: #727880;
  text-decoration: none;
}
/* 复选框 */
.check_view_state {
  cursor: pointer;
  font-size: 1em;
}
</style>