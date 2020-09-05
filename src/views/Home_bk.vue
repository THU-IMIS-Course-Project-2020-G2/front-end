<template>
  <el-container style="height:100vh">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>Vue餐厅管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        
        <!--左侧导航菜单-->
        <el-menu
          router
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="$route.path"
        >
         <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            {{ item.navItem }}
         </el-menu-item>
        </el-menu>

      </el-aside>
      <!--右侧主界面-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      navList:[
            {name:'/goods',navItem:'菜单管理'},
            {name:'/cate',navItem:'菜品分类'},
            {name:'/params',navItem:'菜品查询'},
            {name:'/kitchen',navItem:'厨政详情'},
            {name:'/status',navItem:'状态查询'},
            {name:'/station',navItem:'工位查询'},
            {name:'/system', navItem:'系统设置'}
        ]
    };
    
  },
  methods: {
    logout() {
      window.sessionStorage.clear;
      this.$router.push("/login");
    },
    
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  created() {
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    width: 50px;
    height: 50px;
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>