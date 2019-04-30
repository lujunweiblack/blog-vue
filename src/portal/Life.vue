<template>
  <v-category :articleType="2"></v-category>
</template>

<script>
const Category = () => import("@/components/Category");
export default {
  name: "Life",
  data() {
    return {};
  },
  components: {
    "v-category": Category
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>