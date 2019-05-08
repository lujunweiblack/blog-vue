<template>
  <div style="width:100%">
    <v-addMain :articleType="2" @parentFn="refreshData"></v-addMain>
    <v-commonMain :articleType="2" ref="commonMain"></v-commonMain>
  </div>
</template>

<script>
const CommonMain = () => import("@/components/CommonMain");
const AddMain = () => import("@/manage/main/AddMain");
export default {
  name: "ArticleMain",
  data() {
    return {};
  },
  methods:{
    refreshData(){
      this.$refs.commonMain.onReadData(1);
    }
  },
  components: {
    "v-commonMain": CommonMain,
    "v-addMain": AddMain
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>