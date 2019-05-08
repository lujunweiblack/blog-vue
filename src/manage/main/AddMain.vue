<template>
  <div>
    <el-dialog
      :title="articleType | checkType"
      :fullscreen="false"
      :visible.sync="dialogFormVisible.isOpen"
      :close-on-click-modal=false
      :close-on-press-escape=false
    >
      <div class="container">
        <div class="title_d_b_c">
          <el-button type="primary" @click="completeOrOnline(0)" size="small">完成</el-button>
          <el-button type="primary" @click="completeOrOnline(1)" size="small">完成&发布</el-button>
        </div>
        <div class="title_d_d_c">
          <input v-model="articleTitleName" class="title_i_c" placeholder="在这里输入文章标题. . .">
        </div>
        <div class="title_d_d_c">
          <textarea
            v-model="articleIntroduction"
            placeholder="在这里输入文章简介. . ."
            rows="3"
            class="title_i_2_c"
            cols="20"
          ></textarea>
        </div>
        <hr>
        <mavon-editor
          v-model="editorValue"
          ref="md"
          @imgAdd="imgAdd"
          :toolbars="markdownOption"
          class="mavon_c"
        />
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="notOpen">取 消</el-button>
        <el-button size="small" type="primary" >确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script >
var qs = require("qs");
import * as qiniu from "qiniu-js";
import VueMarkdown from "vue-markdown";
import { formatDate } from "@/common/data.js";

export default {
  name: "Add",
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    formatDateTwo(time) {
      var date = new Date(time);
      return formatDate(date, "hh:mm:ss");
    },
    checkType: function(data) {
      switch (data) {
        case 1:
          return "写文章";
        case 2:
          return "写生活";
      }
    }
  },
  props: {
    articleType: {
      type: Number,
      default: 1,
      currentPage: 0
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: this.$store.state,
      formLabelWidth: "200px",
      articleTitleName: "",
      articleIntroduction: "",
      editorValue: "",
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
    notOpen() {
      this.$store.dispatch("changeIsOpen", false);
    },
    completeOrOnline(type) {
      if (this.check() == null) {
        return;
      }
      this.$post("/manage/add/complete", {
        articleId:this.$store.state.articleId,
        articleTitleName: this.articleTitleName,
        articleIntroduction: this.articleIntroduction,
        articleState: type,
        backupFieldOne: this.editorValue,
        articleType:this.articleType
      }).then(response => {
        if (response.code == "10200") {
          this.$message({
            message: "资源添加成功",
            center: true,
            showClose: true,
            type: "success"
          });
          this.$store.dispatch("changeIsOpen", false);
          this.$emit('parentFn',{});
        } else {
          this.$notify({
            title: "操作失败",
            position: "top-left",
            type: "error"
          });
        }
      });
    },
    check() {
      var flag = 1;
      var msg = "";
      if (!this.articleTitleName) {
        msg = "标题不能为空";
        flag = null;
      } else if (!this.articleIntroduction) {
        msg = "文章简介不能为空";
        flag = null;
      } else if (!this.editorValue) {
        msg = "文章内容不能为空";
        flag = null;
      }
      if (flag == null) {
        this.$message({
          message: msg,
          center: true,
          type: "error",
          showClose: true
        });
      }
      return flag;
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
        },
        error: errResult => {
          // 失败报错信息
          alert(errResult);
        },
        complete: result => {
          // 接收成功后返回的信息
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
          this.$message({
            message: "token获取失败",
            center: true,
            type: "error",
            showClose: true
          });
        }
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}
.title_d_b_c {
  margin-bottom: 2%;
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
  margin-bottom: 2%;
}
</style>