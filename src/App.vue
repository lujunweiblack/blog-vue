<template>
  <div id="app">
    <div class="container">
      <div class="jumbotron" v-if="$route.meta.title != null">
        <h3 v-if="$route.meta.title != null" class="h3_c" v-text="$route.meta.title"></h3>
      </div>
    </div>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.h3_c {
  text-align: center;
}
</style>
