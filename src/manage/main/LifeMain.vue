<template>
  <v-commonMain :articleType="2"></v-commonMain>
</template>

<script>
const CommonMain = () => import("@/components/CommonMain");
export default {
  name: "ArticleMain",
  data() {
    return {};
  },
  components: {
    "v-commonMain": CommonMain
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>