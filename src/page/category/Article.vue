<template>
  <div class="container">
    <!-- 操作按钮 -->
    <div v-if="this.$store.state.userObj!=null" class="operation_c">
      <a @click="add()" class="operation_c" href="JavaScript: void(0);">
        <span class="span_add_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>新增
      </a>
      <a @click="edit()" class="operation_c" href="JavaScript: void(0);">
        <span class="span_edit_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>修改
      </a>
      <a @click="offLine()" class="operation_c" href="JavaScript: void(0);">
        <span class="span_offline_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>下线
      </a>
      <a @click="del()" class="operation_c" href="JavaScript: void(0);">
        <span class="span_del_c">&nbsp;&nbsp;&nbsp;&nbsp;</span>删除
      </a>
      <hr>
    </div>
    <div class="item" v-for="(val,index) in articles">
      <input v-if="store.state.userObj" type="checkbox" v-text="val.articleId">
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
  methods: {
    jumpCategory(articleId, index) {
      var article = this.articles[index];
      this.$store.dispatch("fillArticle", article);
      this.$router.push({ name: "Info" });
    },
    //
    add() {
       this.$router.push({ name: "Add" });
    },
    edit() {
     var articleIds = this.buttonCheck();
     if(articleIds.length==0 || articleIds.length>1){
       alert("请勾选一条数据");
     }else{
        console.log(articleIds)
     }
     
    },
    offLine() {
     var articleIds = this.buttonCheck();
     if(articleIds.length==0 ){
       alert("请勾选一条数据");
     }else{
        console.log(articleIds)
     }
    },
    del() {
     var articleIds = this.buttonCheck();
     if(articleIds.length==0 ){
       alert("请勾选一条数据");
     }else{
        console.log(articleIds)
     }
    },
    buttonCheck() {
      var checkObj = $("input[type='checkbox']");
      var value = new Array();
      for (var i = 0; i < checkObj.length; i++) {
        if (checkObj[i].checked) {
          value.push($(checkObj[i]).text());
        }
      }
      return value;
    }
  },
  mounted: function() {
    this.$fetch("/portal/article?articleType=1").then(response => {
      this.$store.dispatch("fillArticles", response.result);
      this.articles = response.result;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operation_c {
  margin-bottom: 4%；;
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
.span_offline_c {
  margin-right: 1%;
  background-image: url(../../../static/images/offline.png);
  background-size: cover;
}
.span_offline_c:hover {
  margin-right: 1%;
  background-image: url(../../../static/images/offline1.png);
  background-size: cover;
}
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
h4 {
  margin-top: 2%;
}
p {
  margin-top: 1%;
}
.operation_c {
  margin-right: 2%;
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