<template>
  <div class="container">
    <div class="jumbotron_2">
      <h3 class="h3_c" v-text="article.articleTitleName"></h3>
      <div class="bloginfo">
        <ul class="ul_c">
          <li class="author">
            {{ article.authorName }}
            <a href="/"></a>
          </li>
          <li v-if="article.publishDate!=null" class="timer">{{ article.publishDate | formatDate }}</li>
          <li v-if="article.publishDate==null" class="timer">未上线</li>
          <li class="view">{{ article.articleBrowseCount }} 已阅读</li>
        </ul>
      </div>
    </div>
    <mavon-editor
      v-if="this.$store.state.openEdit == null ||this.$store.state.openEdit == false"
      class="mavon_c"
      v-model="msg"
      :subfield="false"
      :toolbarsFlag="false"
      :defaultOpen="defaultData"
    />
    <mavon-editor v-if="this.$store.state.openEdit == true" class="mavon_c" v-model="msg"/>
    <div v-wechat-title="article.articleTitleName"></div>
  </div>
</template>

<script >
import VueMarkdown from "vue-markdown";
import { formatDate } from "@/common/data.js"; //在组件中引用date.js

export default {
  name: "info",
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm"); //年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time);
      return formatDate(date, "hh:mm:ss"); //时间点 例 21点12分12秒的格式
    }
  },
  data() {
    return {
      article: {}
    };
  },
  components: {
    VueMarkdown
  },
  methods: {},
  beforeMount: function() {
    var thisObj = this;
    thisObj.articleId = thisObj.$route.query.articleId;
    thisObj.msg = $.ajax({
      url:
        "http://article.lujunwei.com/md/" + thisObj.articleId + ".md?attname=", //注意:这里路径要取全
      async: false
    }).responseText;
    thisObj.defaultData = "preview";

    //后台
    thisObj
      .$fetch("/portal/article?articleId=" + thisObj.articleId)
      .then(response => {
        if (response.code == 10200) {
          thisObj.article = response.result[0];
        } else {
          thisObj.$message({
            message: "网络出错，请稍后再戳...",
            center: true,
            type: "error",
            onClose: function() {
              thisObj.$router.push({ name: "article" });
            }
          });
        }
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a:link {
  color: #2c3e50;
  text-decoration: none;
}
a:visited {
  color: #2c3e50;
  text-decoration: none;
}
a:hover {
  color: brown;
  text-decoration: none;
}
.h3_c {
  text-align: center;
}
.span_c {
  font-size: large;
  font-style: italic;
  margin-left: 50%;
}
.jumbotron_2 {
  background-color: #e9ecef;
  padding: 2.3rem 1rem;
  height: 160px;
  border-radius: 6px;
  margin-bottom: 2%;
  text-align: center;
  margin-top: 2%;
}
.bloginfo {
  width: 100%;
  clear: both;
}
.bloginfo {
  margin-top: 12px;
  padding: 20px;
}
.ul_c {
  padding: 0px;
}
.bloginfo ul li {
  font-size: 12px;
  padding: 0 0 0 20px;
  margin: 0 15px 0 0;
  color: #748594;
  line-height: 1.5;
  display: inline-block;
}
.bloginfo ul li a {
  color: #748594;
}
.bloginfo ul li a:hover {
  color: #000;
}
.bloginfo .author {
  background: url(../../static/images/auicon.jpg) no-repeat 0 0;
}
.bloginfo .lmname {
  background: url(../../static/images/auicon.jpg) no-repeat top -23px left;
}
.bloginfo .timer {
  background: url(../../static/images/auicon.jpg) no-repeat top -45px left;
}
.bloginfo .view {
  background: url(../../static/images/auicon.jpg) no-repeat top -65px left;
}
.bloginfo .like {
  background: url(../../static/images/auicon.jpg) no-repeat top -86.3px left;
}
.mavon_c {
  margin-bottom: 5%;
}
</style>