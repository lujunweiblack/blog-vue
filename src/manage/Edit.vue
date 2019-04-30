<template>
  <div class="container">
    <div class="jumbotron_2">
      <h3 class="h3_c" v-text="article.articleTitleName"></h3>
    </div>
    <mavon-editor v-model="editorValue" ref="md" @imgAdd="imgAdd" @save="save" class="mavon_c"/>
    <div v-wechat-title="article.articleTitleName"></div>
  </div>
</template>

<script >
import VueMarkdown from "vue-markdown";
import { formatDate } from "@/common/date.js"; //在组件中引用date.js
//七牛上传插件
import * as qiniu from "qiniu-js";
export default {
  name: "Edit",
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
      article: {},
      editorValue: ""
    };
  },
  components: {
    VueMarkdown
  },
  methods: {
    save() {
      this.$post("/manage/add/save", {
        articleId: this.article.articleId,
        backupFieldOne: this.editorValue
      }).then(response => {
        // console.log(response);
        if (response.code == "10200") {
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      });
    },
    uploadImage(image, uptoken, pos) {
      var perfix = "assets/";
      var suffix = image.name.substring(image.name.lastIndexOf("."));
      let config = {
        //useCdnDomain: true,
        region: qiniu.region.z0 //华东
      };

      var putExtra = {
        fname: "",
        params: {},
        mimeType: [] || null
      };
      var observable = qiniu.upload(
        image,
        perfix + uptoken.key + suffix,
        uptoken.token,
        putExtra,
        config
      );
      var thisObj = this;
      observable.subscribe({
        next: result => {
          // 主要用来展示进度
          console.log(result);
        },
        error: errResult => {
          // 失败报错信息
          alert(errResult);
          console.log(errResult);
        },
        complete: result => {
          // 接收成功后返回的信息
          // console.log(result);
          var url =
            "http://image.lujunwei.com/" + perfix + uptoken.key + suffix;
          thisObj.$refs.md.$img2Url(pos, url);
        }
      });
    },
    imgAdd(pos, image) {
      var suffix = image.name.substring(image.name.lastIndexOf("."));
      if (suffix != ".jpg" && suffix != ".png") {
        alert("不支持的图片类型");
        return;
      }
      var thisObj = this;
      thisObj.$post("/manage/add/image/token", {}).then(response => {
        if (response.code == "10200") {
          thisObj.uploadImage(image, response.result, pos);
        } else {
          alert("token获取失败");
        }
      });
    }
  },
  beforeMount: function() {
    this.article = this.$store.state.article;
    console.log(this.article);
    var articleId = this.article.articleId;
    this.editorValue = $.ajax({
      url: "http://article.lujunwei.com/md/" + articleId + ".md?attname=", //注意:这里路径要取全
      async: false
    }).responseText;
    this.defaultData = "preview";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a:link {
  color: #2c3e50;
  text-decoration: none;
}
a:visited {
  color: #2c3e50;
  text-decoration: none;
}
a:hover {
  color: brown;
  text-decoration: none;
}
.h3_c {
  text-align: center;
}
.span_c {
  font-size: large;
  font-style: italic;
  margin-left: 50%;
}
.jumbotron_2 {
  background-color: #e9ecef;
  padding: 2.3rem 1rem;
  height: 160px;
  border-radius: 6px;
  margin-bottom: 2%;
  text-align: center;
}
.bloginfo {
  width: 100%;
  clear: both;
}
.bloginfo {
  margin-top: 12px;
  padding: 20px;
}
.ul_c {
  padding: 0px;
}
.bloginfo ul li {
  font-size: 12px;
  padding: 0 0 0 20px;
  margin: 0 15px 0 0;
  color: #748594;
  line-height: 1.5;
  display: inline-block;
}

.mavon_c {
  margin-bottom: 5%;
}
</style>