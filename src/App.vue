<template>
  <div id="app">
    <div class="container">
      <div class="jumbotron" v-if="$route.meta.titleName == null">
        <h1 v-if="$route.meta.title != null" class="h1_c" v-text="$route.meta.title"></h1>
      </div>

      <div class="jumbotron_2" v-if="$route.meta.titleName != null">
        <h3 v-if="$route.meta.titleName != null" class="h3_c" v-text="$route.meta.titleName"></h3>
        <div v-if="$route.meta.titleName != null" class="bloginfo">
          <ul>
            <li class="author">
              {{ $route.meta.authorName }}
              <a href="/"></a>
            </li>
            <li class="timer">{{ $route.meta.publishDate }}</li>
            <li class="view">{{ $route.meta.articleBrowseCount }}已阅读</li>
            <li class="like">{{ $route.meta.articleLikeCount }}</li>
          </ul>
        </div>
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
  text-align: center;
}
.h3_c {
  text-align: center;
}
.span_c {
  font-size: large;
  font-style: italic;
  margin-left: 900px;
}
.jumbotron_2 {
  background-color: #e9ecef;
  padding: 4rem 2rem;
  height: 200px;
  border-radius: 6px;
  margin-bottom: 2%;
}
.bloginfo {
  width: 100%;
  clear: both;
}
.bloginfo {
  overflow: hidden;
  margin-top: 20px;
  padding: 20px;
  /* padding-left: 572px; */
}
.bloginfo ul li {
  float: left;
  font-size: 12px;
  padding: 0 0 0 20px;
  margin: 0 15px 0 0;
  color: #748594;
  line-height: 1.5;
  display: inline-block;
}
.bloginfo ul li a {
  color: #748594;
}
.bloginfo ul li a:hover {
  color: #000;
}
.bloginfo .author {
  background: url(../static/images/auicon.jpg) no-repeat 0 0;
}
.bloginfo .lmname {
  background: url(../static/images/auicon.jpg) no-repeat top -23px left;
}
.bloginfo .timer {
  background: url(../static/images/auicon.jpg) no-repeat top -44px left;
}
.bloginfo .view {
  background: url(../static/images/auicon.jpg) no-repeat top -64px left;
}
.bloginfo .like {
  background: url(../static/images/auicon.jpg) no-repeat top -85px left;
}
</style>
