<template>
  <div class="container">
    <div class="item" v-for="(val,index) in articles">
      <a href="javascript:void(0)" @click="jumpCategory(val.articleId,index)">
        <h3>{{ val.articleTitleName }}</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;{{ val.articleIntroduction }}</p>
      </a>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: "Life",
  data() {
    return {
      articles: []
    };
  },
  methods: {
    jumpCategory(articleId, index) {
      this.$router.push({
        name: "Info",
        query: {
          articleId: articleId
        }
      });

      var article = this.articles[index];
      this.$route.meta.title=article.articleTitleName;
      this.$route.meta.titleName = article.articleTitleName;
      this.$route.meta.authorName = article.authorName;
      this.$route.meta.publishDate = article.publishDate;
      this.$route.meta.browseNum = article.browseNum;
      this.$route.meta.likeNum = article.likeNum;
    }
  },
  mounted: function() {
    this.articles = [
      {
        articleId: 20000908,
        articleTitleName: "别让这些闹心的套路，毁了你的网页设计!",
        publishDate: "2019-03-31 09:13:56",
        articleIntroduction:
          "如图，要实现上图效果，我采用如下方法：1、首先在数据库模型，增加字段，分别是图片2，图片3。2、增加标签模板，用if，else if 来判断，输出。思路已打开，样式调用就可以多样化啦！",
        authorName: "陆军委",
        browseNum: "1530",
        likeNum: "885"
      },
      {
        articleId: 20000909,
        articleTitleName: "帝国cms 首页或者列表页 实现图文不同样式调用方法!",
        publishDate: "2019-03-31 09:13:56",
        articleIntroduction: "网页中图片属性固定宽度，如何用js改变大小！",
        authorName: "陆军委",
        browseNum: "1530",
        likeNum: "885"
      },
      {
        articleId: 20000912,
        articleTitleName: "git常用指令!",
        publishDate: "2019-03-31 09:13:56",
        articleIntroduction: "git常用指令简介,最流行,最便捷的版本管理工具!",
        authorName: "陆军委",
        browseNum: "1530",
        likeNum: "885"
      }
    ];
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin-top: 6%;
}
p {
  margin-top: 2%;
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
</style>