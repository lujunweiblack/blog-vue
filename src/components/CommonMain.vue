<template>
  <el-main>
    <div class="sousuo">
      <el-input v-model="sousuoContent" placeholder="请输入内容..."></el-input>
      <el-button
        type="primary"
        @click="sousuoButton()"
        icon="el-icon-search"
        :loading="sousuoState"
      >{{ sousuoText }}</el-button>
    </div>
    <el-table :data="tableData.list" v-loading="loading" :row-class-name="tableRowClassName">
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
      @current-change="handleCurrentChange"
      :page-size="10"
      background
      layout="prev, pager, next"
      :total="tableData.total"
    ></el-pagination>
  </el-main>
</template>

<script>
import { formatDate } from "@/common/date.js"; //在组件中引用date.js
import { request } from "https";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      loading: false,
      sousuoState: false,
      sousuoText: "搜索",
      sousuoContent: ""
    };
  },
  props: {
    articleType: {
      type: Number,
      default: 1,
      currentPage: 0
    }
  },
  methods: {
    sousuoButton() {
      this.sousuoState = true;
      this.sousuoText = "搜索中...";
      this.onReadData(this.currentPage ? this.currentPage : 1);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClickQ(row) {
      //查看
      window.location.href = "http://127.0.0.1:8080/portal/info?articleId=16";
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
      this.$post("/manage/article/upAndDown", {
        articleId: row.articleId,
        articleState: 1
      }).then(response => {
        if (response.code == "10200") {
          this.onReadData(this.currentPage ? this.currentPage : 1);
          this.$message({
            message: "成功上线",
            center: true,
            showClose: true,
            type: "success"
          });
        } else {
          this.$message({
            message: "操作失败",
            center: true,
            showClose: true,
            type: "error"
          });
        }
      });
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
      this.$post("/manage/article/upAndDown", {
        articleId: row.articleId,
        articleState: 0
      }).then(response => {
        if (response.code == "10200") {
          this.onReadData(this.currentPage ? this.currentPage : 1);
          this.$message({
            message: "成功下线",
            center: true,
            showClose: true,
            type: "success"
          });
        } else {
          this.$message({
            message: "操作失败",
            center: true,
            showClose: true,
            type: "error"
          });
        }
      });
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

      this.$post("/manage/article/upAndDown", {
        articleId: row.articleId,
        articleState: 2
      }).then(response => {
        if (response.code == "10200") {
          this.onReadData(this.currentPage ? this.currentPage : 1);
          this.$message({
            message: "删除成功（标记）",
            center: true,
            showClose: true,
            type: "success"
          });
        } else {
          this.$message({
            message: "操作失败",
            center: true,
            showClose: true,
            type: "error"
          });
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.onReadData(val);
    },
    onReadData(val) {
      var param =
        "?articleType=" +
        this.articleType +
        "&pageNum=" +
        val +
        "&pageSize=" +
        10;
      this.$fetch("/portal/article/page" + param).then(response => {
        this.tableData = response.result;
        this.sousuoState = false;
        this.sousuoText = "搜索";
      });
    },
    formatterDate(row, column, cellValue) {
      if (!cellValue) {
        return "未上线";
      }
      var date = new Date(cellValue);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    formatterArticleType(row, column, cellValue) {
      if (cellValue == 1) {
        return "技术文章";
      } else if (cellValue == 0) {
        return "生活日常";
      }
    },
    tableRowClassName({ row }) {
      if (row.articleState === 1) {
        return "success-row";
      } else if (row.articleState === 0) {
        //  return "default-row";
      } else if (row.articleState === 2) {
        return "error-row";
      }
      return "";
    }
  },
  mounted: function() {
    // this.loading = true;
    this.onReadData(1);
    // this.loading = false;
  }
};
</script>

<style>
.sousuo {
  display: inline-flex;
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


