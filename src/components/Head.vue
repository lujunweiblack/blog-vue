<template>
    <div class="jumbotron" v-if="$route.meta.title != null">
      <h3 v-if="$route.meta.title != null" class="h3_c" v-text="$route.meta.title"></h3>
    </div>
</template>
<script>
export default {
  name: "Head",
  data() {
    return {
    };
  }
};
</script>

<style scoped>
.jumbotron {
  margin-top: 4%;
  margin-bottom: 4%;
}
.h3_c {
  text-align: center;
}
</style>
