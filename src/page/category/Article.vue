<template>
  <div class="container">
    <div class="item" v-for="(val,index) in articles">
      <a href="javascript:void(0)" @click="jumpCategory(val.articleId,index)">
        <h4>{{ val.articleTitleName }}</h4>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;{{ val.articleIntroduction }}</p>
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
      articles: []
    };
  },
  methods: {
    jumpCategory(articleId, index) {
      var article = this.articles[index];
      this.$store.dispatch("fillArticle", article);
      this.$router.push({ name: "Info" });
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
h4 {
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