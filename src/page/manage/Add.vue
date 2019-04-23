<template>
  <div class="container">
    <div class="title_d_c">
      <div class="title_d_b_c">
        <!-- <button type="button" @click="save()" class="btn btn-default btn-sm btn_c">保存</button> -->
        <button type="button" @click="complete()" class="btn btn-primary btn-sm btn_c">完成</button>
        <button type="button" @click="goOnline()" class="btn btn-primary btn-sm btn_c">完成&发布</button>
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

    <mavon-editor
      v-model="editorValue"
      ref="md"
      @imgAdd="imgAdd"
      :toolbars="markdownOption"
      class="mavon_c"
    />
    <div v-wechat-title="title"></div>
  </div>
</template>

<script >
import VueMarkdown from "vue-markdown";
var qs = require("qs");
import { formatDate } from "@/common/date.js"; //在组件中引用date.js
//七牛上传插件
import * as qiniu from "qiniu-js";

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
      editorValue: "",
      articleId: "",
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  components: {
    VueMarkdown
  },
  methods: {
    complete() {
      if (this.check() == null) {
        return;
      }
      this.$post("/manage/add/complete", {
        articleId: this.articleId,
        articleTitleName: this.articleTitleName,
        articleIntroduction: this.articleIntroduction,
        articleState: "0",
        backupFieldOne: this.editorValue
      }).then(response => {
        // console.log(response);
        if (response.code == "10200") {
          alert("操作成功");
          this.$router.push({ name: "Article" });
        } else {
          alert("操作失败");
        }
      });
    },
    goOnline() {
      if (this.check() == null) {
        return;
      }
      this.$post("/manage/add/complete", {
        articleId: this.articleId,
        articleTitleName: this.articleTitleName,
        articleIntroduction: this.articleIntroduction,
        articleState: "1",
        backupFieldOne: this.editorValue
      }).then(response => {
        // console.log(response);
        if (response.code == "10200") {
          alert("操作成功");
          this.$router.push({ name: "Article" });
        } else {
          alert("操作失败");
        }
      });
    },
    check() {
      if (!this.articleTitleName) {
        alert("标题不能为空");
        return null;
      } else if (!this.articleIntroduction) {
        alert("文章简介不能为空");
        return null;
      } else if (!this.editorValue) {
        alert("文章内容不能为空");
        return null;
      }
      return 1;
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
    this.$post("/manage/add/articleiNextId", {}).then(response => {
      // console.log(response);
      if (response.code == "10200") {
        this.articleId = response.result;
        console.log(response);
      } else {
        alert("获取文章主键ID失败");
      }
    });
  }
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