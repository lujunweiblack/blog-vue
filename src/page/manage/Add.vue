<template>
  <div class="container">
    <div class="title_d_c">
      <div class="title_d_b_c">
        <button type="button" @click="save()" class="btn btn-default btn-sm btn_c">保存</button>
        <button type="button" @click="complete()" class="btn btn-default btn-sm btn_c">完成</button>
        <button type="button" @click="goOnline()" class="btn btn-default btn-sm btn_c">完成&发布</button>
      </div>
      <div class="title_d_d_c">
        <!-- <span class="title_s_c">文章标题：</span> -->
        <input v-model="articleTitleName" class="title_i_c" placeholder="在这里输入文章标题. . .">
      </div>
      <div class="title_d_d_c">
        <!-- <span class="title_s_c">文章简介：</span> -->
        <textarea
          v-model="articleIntroduction"
          placeholder="在这里输入文章简介. . ."
          rows="3"
          class="title_i_2_c"
          cols="20"
        ></textarea>
      </div>
      <hr>
    </div>

    <mavon-editor v-model="editorValue" class="mavon_c"/>
    <div v-wechat-title="title"></div>
  </div>
</template>

<script >
import VueMarkdown from "vue-markdown";
var qs = require("qs");
import { formatDate } from "@/common/date.js"; //在组件中引用date.js

export default {
  name: "Add",
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm"); //年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time);
      return formatDate(date, "hh:mm:ss"); //时间点 例 21点12分12秒的格式
    }
  },
  data() {
    return {
      title: "文章编写",
      articleTitleName: "",
      articleIntroduction: "",
      editorValue: ""
    };
  },
  components: {
    VueMarkdown
  },
  methods: {
    save() {
      this.$post("/manage/add/save", {
        articleTitleName: this.articleTitleName,
        articleIntroduction: this.articleIntroduction,
        articleState: "0"
      }).then(response => {
        console.log(response);
      });
    },
    complete() {
      this.$post("/manage/add/save", {
        articleTitleName: this.articleTitleName,
        articleIntroduction: this.articleIntroduction,
        articleState: "0"
      }).then(response => {
        console.log(response);
      });
    },
    goOnline() {
      this.$post("/manage/add/save", {
        articleTitleName: this.articleTitleName,
        articleIntroduction: this.articleIntroduction,
        articleState: "1"
      }).then(response => {
        console.log(response);
      });
    }
  },
  beforeMount: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn_c {
  margin-left: 0%;
}
.title_d_c {
  margin-top: 2%;
}
.title_s_c {
  font-size: 20px;
  font-weight: bold;
}
.title_d_d_c {
  margin-top: 1%;
}
.title_i_c {
  padding: 0.5%;
  overflow: visible;
  width: 100%;
  font-size: 20px;
  padding-left: 1.5%;
  padding-right: 1.5%;
}
.title_i_2_c {
  padding: 0.5%;
  overflow: visible;
  width: 100%;
  font-size: 16px;
  font-style: italic;
  padding-left: 1.5%;
  padding-right: 1.5%;
}
.mavon_c {
  margin-bottom: 5%;
}
</style>