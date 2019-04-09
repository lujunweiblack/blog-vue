<template>
  <div class="container">
    <div class="item">
      <a href="javascript:void(0)">
        <h3>{{ blogTitleName }}</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;{{ blogDesc }}</p>
      </a>
      <hr>
    </div>
     <div class="item">
      <a href="javascript:void(0)">
        <h3>{{ blogTitleName }}</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;{{ blogDesc }}</p>
      </a>
      <hr>
    </div>
     <div class="item">
      <a href="javascript:void(0)">
        <h3>{{ blogTitleName }}</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;{{ blogDesc }}</p>
      </a>
      <hr>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Life",
  data() {
    return {
      blogTitleName: "第一部分",
      blogDesc:
        "第一部分的相信内容点进去可查看第一部分的详细文章第一部分的相信内容点进去可查看第一部分的详细文章第一部分的相信内容点进去可查看第"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin-top: 6%;
}
p {
  margin-top: 2%;
}
a:link {
  color: #2c3e50;
  text-decoration: none;
}
a:visited {
  color: #2c3e50;
  text-decoration: none;
}
a:hover {
  color: #727880;
  text-decoration: none;
}
</style>