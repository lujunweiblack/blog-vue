<template>
  <div class="container">
    <v-head></v-head>
    <div class="text-center">
      <div class="item_c" v-for="(val,key) in categorys">
        <a href="javascript:void(0)" @click="jumpCategory(val.categoryCode)">
          <h3>{{ val.categoryName }}</h3>
          <p>{{ val.categoryDes }}</p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
const Head = () => import("@/components/Head");
export default {
  name: "home",
  data() {
    return {
      categorys: []
    };
  },
  methods: {
    jumpCategory(categoryCode) {
      this.$router.push({
        name: categoryCode
      });
    }
  },
  components: {
    "v-head": Head
  },
  mounted: function() {
    this.categorys = [
      {
        categoryName: "生  活",
        categoryCode: "life",
        categoryDes:
          "生活像一团麻，总有那解不开的小疙瘩呀，生活像一杯酒啊，尝遍了人生酸甜苦辣的苦乐年华。"
      },
      {
        categoryName: "文  章",
        categoryCode: "article",
        categoryDes:
          "自己不会的题目，去看了别人的一会儿就会忘记，但如果是自己思考出来的，就会记得很牢。多学习，多深入，多总结。"
      },
      {
        categoryName: "VUE",
        categoryCode: "helloWorld",
        categoryDes:
          "一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。"
      }
    ];
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item_c {
  padding: 3%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 2%;
}
p {
  margin-top: 1%;
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