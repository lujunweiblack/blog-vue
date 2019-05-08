<template>
  <el-main class="main_c">
    <div class="button_c">
      <el-input v-model="sousuoContent" placeholder="请输入内容..."></el-input>
      <el-button
        type="primary"
        @click="sousuoButton()"
        icon="el-icon-search"
        :loading="sousuoState"
      >{{ sousuoText }}</el-button>
      <el-button type="primary" @click="openAdd" icon="el-icon-edit">{{ articleType | checkType }}</el-button>
    </div>
    <el-table :data="tableData.list" :row-class-name="tableRowClassName">
      >
      <!-- @selection-change="handleSelectionChange" -->
      <!-- <el-table-column type="selection" width="80"></el-table-column> -->
      <el-table-column prop="xxx" label width="20"></el-table-column>
      <el-table-column prop="articleId" label="ID" width="80"></el-table-column>
      <el-table-column prop="articleTitleName" :show-overflow-tooltip="true" label="标题" width="100"></el-table-column>
      <el-table-column
        prop="articleIntroduction"
        label="描述"
        :show-overflow-tooltip="true"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="articleDetailUrl"
        label="url"
        :show-overflow-tooltip="true"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="articleType"
        label="类型"
        :formatter="formatterArticleType"
        :show-overflow-tooltip="true"
        width="100"
      ></el-table-column>
      <el-table-column prop="authorName" label="作者" :show-overflow-tooltip="true" width="100"></el-table-column>
      <el-table-column prop="categoryName" label="类别" :show-overflow-tooltip="true" width="100"></el-table-column>
      <el-table-column prop="publishDate" label="上线日期" :formatter="formatterDate" width="150"></el-table-column>
      <el-table-column prop="backupFieldOne" label="备字" :show-overflow-tooltip="true" width="100"></el-table-column>
      <el-table-column prop="createDate" label="创建日期" :formatter="formatterDate" width="150"></el-table-column>
      <el-table-column prop="updateDate" label="更新日期" :formatter="formatterDate" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClickQ(scope.row)" size="small">查看</el-button> -->
          <el-button @click="handleClickO(scope.row)" size="small" type="success">上线</el-button>
          <el-button @click="handleClickOffline(scope.row)" size="small" type="warning">下线</el-button>
          <el-button @click="handleClickD(scope.row)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="tableData.total>10"
      @current-change="handleCurrentChange"
      :page-size="10"
      background
      layout="prev, pager, next"
      :total="tableData.total"
    ></el-pagination>
  </el-main>
</template>

<script>
import {
  paramJsonToStr,
  formatterDate,
  formatterArticleType,
  tableRowClassName
} from "@/common/data.js";

import { request } from "https";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      loading: false,
      sousuoState: false,
      sousuoText: "搜索",
      sousuoContent: "",
      userObj: {},
      formatterDate,
      formatterArticleType,
      tableRowClassName
    };
  },
  props: {
    articleType: {
      type: Number,
      default: 1,
      currentPage: 0
    }
  },
  filters: {
    checkType: function(data) {
      switch (data) {
        case 1:
          return "写文章";
        case 2:
          return "写生活";
      }
    }
  },
  methods: {
    sousuoButton() {
      this.sousuoState = true;
      this.sousuoText = "搜索中...";
      this.onReadData(1);
    },
    openAdd() {
      this.$post("/manage/add/articleiNextId", {}).then(response => {
      if (response.code == "10200") {
        this.$store.dispatch("fillArticleId",  response.result);
      } else {
        this.$message({
          message: "获取文章主键ID失败",
          center: true,
          type: "error",
          showClose: true
        });
      }
    });
      this.$store.dispatch("changeIsOpen", true);
    },
    handleClickO(row) {
      //上线
      if (row.articleState == 1) {
        this.$message({
          message: "已上线，不可重复上线",
          center: true,
          showClose: true,
          type: "warning"
        });
        return;
      }
      this.handleClickCommon(
        "操作失败",
        "成功下线",
        "/manage/article/upAndDown",
        {
          articleId: row.articleId,
          articleState: 1
        },
        "on",
        "post"
      );
    },
    handleClickOffline(row) {
      //下线
      if (row.articleState == 0) {
        this.$message({
          message: "已下线，不可重复下线",
          center: true,
          showClose: true,
          type: "warning"
        });
        return;
      }
      this.handleClickCommon(
        "操作失败",
        "成功下线",
        "/manage/article/upAndDown",
        {
          articleId: row.articleId,
          articleState: 0
        },
        "off",
        "post"
      );
    },
    handleClickD(row) {
      //删除
      if (row.articleState == 2) {
        this.$message({
          message: "已删除（标记）",
          center: true,
          showClose: true,
          type: "warning"
        });
        return;
      } else if (row.articleState == 1) {
        this.$message({
          message: "无法删除已上线的记录",
          center: true,
          showClose: true,
          type: "error"
        });
        return;
      }
      this.handleClickCommon(
        "操作失败",
        "删除成功（标记）",
        "/manage/article/upAndDown",
        {
          articleId: row.articleId,
          articleState: 2
        },
        "del",
        "post"
      );
    },
    handleClickCommon(errorMsg, successMsg, url, param, clickType, ajaxType) {
      if (ajaxType == "post") {
        this.$post(url, param ).then(response => {
          if (response.code == "10200") {
            switch (clickType) {
              case "on":
                this.onReadData(this.currentPage ? this.currentPage : 1);
                break;
              case "off":
                this.onReadData(this.currentPage ? this.currentPage : 1);
                break;
              case "del":
                this.onReadData(this.currentPage ? this.currentPage : 1);
                break;
            }
            this.$message({
              message: successMsg,
              center: true,
              showClose: true,
              type: "success"
            });
          } else {
            this.$message({
              message: errorMsg,
              center: true,
              showClose: true,
              type: "error"
            });
          }
        });
      } else {
        this.$fetch(url + param).then(response => {
          if (response.code == "10200") {
            switch (clickType) {
              case "red":
                this.tableData = response.result;
                this.sousuoState = false;
                this.sousuoText = "搜索";
                break;
            }
            if (!successMsg) {
              return;
            }
            this.$message({
              message: successMsg,
              center: true,
              showClose: true,
              type: "success"
            });
          } else {
            this.$message({
              message: errorMsg,
              center: true,
              showClose: true,
              type: "error"
            });
          }
        });
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.onReadData(val);
    },
    onReadData(val) {
      var param = {
        articleType: this.articleType,
        pageNum: val,
        pageSize: 10,
        articleTitleName: this.sousuoContent,
        authorId: JSON.parse(localStorage.getItem("userObj")).id
      };
      this.handleClickCommon(
        "信息拉取失败，请检查网络",
        "",
        "/manage/article/page",
        paramJsonToStr(param),
        "red",
        "fetch"
      );
    }
  },
  mounted: function() {
    // this.loading = true;
    this.onReadData(1);
    // this.loading = false;
    this.$store.dispatch("changeIsOpen", false);
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
  }
};
</script>

<style>
.main_c {
  height: 875px;
}
.button_c {
  display: inline-flex;
}
.add_c {
  text-align: right;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-table .default-row {
  background: #cccccf;
}
.el-table .error-row {
  background: #fcd5d5;
}
</style>


