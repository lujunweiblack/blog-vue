<template>
  <div class="container">
    <mavon-editor value='12111113' />
    <div class="title">
      <h3>{{ titleName }}</h3>
    </div>
    <vue-markdown >{{ msg }}</vue-markdown>
  </div>
</template>

<script >
import VueMarkdown from "vue-markdown";

export default {
  name: "Life",
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
    this.msg = $.ajax({
      url: "http://article.lujunwei.com/md/20000912.md", //注意:这里路径要取全
      async: false
    }).responseText;

    this.titleName = this.$route.query.titleName;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* @import '/static/css/easydialog.min.css'; */
.title {
  text-align: center;
  margin-top: 4%;
  margin-bottom: 4%
}
</style>