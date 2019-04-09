<template>
  <div id="app">
    <div class="container">
      <div class="jumbotron">
        <h1 class="h1_c">XXXXXX</h1>
      </div>
    </div>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
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
.h1_c {
  text-align: center
}
</style>
