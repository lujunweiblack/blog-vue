<template>
  <div class="container">
    <div class="item" v-for="(val,index) in articles">
      <a href="javascript:void(0)" @click="jumpCategory(val.articleId,index)">
        <h4>{{ val.articleTitleName }}</h4>
        <p>&nbsp;{{ val.articleIntroduction }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      articles: []
    };
  },
  props: {
    articleType: {
      type: Number,
      default: 1
    }
  },
  methods: {
    jumpCategory(articleId, index) {
      var article = this.articles[index];
      console.log(article)
      //this.$store.dispatch("fillArticle", article);
      this.$router.push({
        name: "info",
        query: {
          articleId:article.articleId
        }
      });
    },
    onReadData() {
      this.$fetch(
        "/portal/article?articleState=1&articleType=" + this.articleType
      ).then(response => {
        this.$store.dispatch("fillArticles", response.result);
        this.articles = response.result;
      });
    }
  },
  mounted: function() {
    this.onReadData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
  padding: 1%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 2%;
}
h4 {
  margin-top: 2%;
}
p {
  margin-top: 1%;
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