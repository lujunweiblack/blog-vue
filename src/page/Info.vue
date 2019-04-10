<template>
  <div class="container">
    <mavon-editor v-model="msg" :subfield="false" :toolbarsFlag="false" :defaultOpen="defaultData"/>
  </div>
</template>

<script >
import VueMarkdown from "vue-markdown";

export default {
  name: "Info",
  data() {
    return {};
  },
  components: {
    VueMarkdown
  },
  methods: {
    loadInfoData() {}
  },
  beforeMount: function() {
    var articleId = this.$route.query.articleId;
    this.msg = $.ajax({
      url: "http://article.lujunwei.com/md/" + articleId + ".md", //注意:这里路径要取全
      async: false
    }).responseText;
    this.defaultData = "preview";
  },
   
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>