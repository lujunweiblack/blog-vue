 <template>
  <el-container style="height: 60%; border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 14p;background-color: #30353c;color: #fbfbfb">
      <span>{{ userObj?userObj.userName:未登录 }}</span>
      <el-dropdown @command="handleCommand">
        <i class="el-icon-caret-bottom" style="margin-right: 30px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">切换账号</el-dropdown-item>
          <el-dropdown-item command="logout">登出</el-dropdown-item>
          <el-dropdown-item>我的</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: #ededef;">
        <el-menu class="menu_c" >
          <template v-for="(menu,index) in this.menuList">
            <el-submenu v-bind:index="String(menu.id)" >
              <template slot="title">
                <i v-bind:class="menu.icon"></i>
                {{ menu.name }}
              </template>
              <template v-for="(menu_vo,index_vo) in menu.menuVo" >
                <el-menu-item  class="item_c"
                  v-bind:index="String(menu_vo.id)"
                  @click="handleSelect(menu_vo)"
                >{{ menu_vo.name }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <router-view/>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      menuList: [],
      userObj:{}
    };
  },
  methods: {
    handleSelect(vo) {
      this.$router.push(vo.path);
    },
    handleCommand(item) {
      var obj = this;
      if (item == "logout") {
        obj
          .$confirm("确认退出当前登录的用户?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            localStorage.removeItem("userObj");
            localStorage.removeItem("menuList");
            obj.$router.push({ path: "/login" });
            obj.$message({
              type: "success",
              message: "已登出!"
            });
          })
          .catch(() => {});
      }
    }
  },
  mounted: function() {
    this.menuList=JSON.parse(localStorage.getItem("menuList"));
    this.userObj=JSON.parse(localStorage.getItem("userObj"));
    //默认菜单
    this.$router.push("/manage/main/home");
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.menu_c{
  background-color:#ededef;
 
}
.item_c{
  background-color: #dbdbde
}
</style>
