<template>
  <div class="container">
    <div class="title">
      <h3>{{ titleName }}</h3>
      <span class="span_c">： {{auther}}</span>
      <hr>
    </div>
    <mavon-editor v-model="msg" :subfield="false" :toolbarsFlag="false" :defaultOpen="defaultData"/>
    <div v-wechat-title="titleName"></div>
  </div>
</template>

<script >
import VueMarkdown from "vue-markdown";

export default {
  name: "Life",
  data() {
    return {
      auther:'陆军委'
    };
  },
  components: {
    VueMarkdown
  },
  methods: {
    loadInfoData() {}
  },
  beforeMount: function() {
    this.msg = $.ajax({
      url: "http://article.lujunwei.com/md/20000912.md", //注意:这里路径要取全
      async: false
    }).responseText;
    this.defaultData = "preview";
    this.titleName = this.$route.query.titleName;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  text-align: center;
  margin-top: 6%;
  margin-bottom: 2%;
}
.span_c {
  margin-right: -633px;
  font-size: large;
  font-style: italic;
}
</style>