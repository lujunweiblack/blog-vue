<template>
  <div class="container">
    <div class="text-center">
      <div>
        <a href="javascript:void(0)" @click="jumpCategory('Life')">
          <h3>第一部分</h3>
          <p>第一部分的相信内容点进去可查看第一部分的详细文章</p>
        </a>
      </div>
      <hr>
      <div>
        <a href="javascript:void(0)" @click="jumpCategory('Blog')">
          <h3>第二部分</h3>
          <p>第二部分的相信内容点进去可查看第一部分的详细文章</p>
        </a>
      </div>
      <hr>
      <div>
        <a href="javascript:void(0)" @click="jumpCategory('HelloWorld')">
          <h3>第三部分</h3>
          <p>第三部分的相信内容点进去可查看第一部分的详细文章</p>
        </a>
      </div>
      <hr>
    </div>
  </div>
</template>
<script>
// $(function() {
//   $("#h1_id").click(function() {
//     alert(1);
//   });
// });
export default {
  name: "Home",
  data() {
    return {
      blogName: "XXXXXX"
    };
  },
   methods:{
    jumpCategory(category) {
      this.$router.push({
        name: category,
        params: {
          category: category
        }
      })
    }
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