<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜品分类展示</el-breadcrumb-item>
    </el-breadcrumb>

   <el-card>
    <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="getTypeDetails('开胃冷菜')">开胃冷菜</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getTypeDetails('生猛海鲜')">生猛海鲜</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getTypeDetails('精美热菜')">精美热菜</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getTypeDetails('风味小炒')">风味小炒</el-button>
        </el-col>
    </el-row>

      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="getTypeDetails('营养汤羹')">营养汤羹</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getTypeDetails('主食点心')">主食点心</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getTypeDetails('酒水')">酒水</el-button>
        </el-col>
      </el-row>

      <!--第三行开始展示各工位统计信息的表格-->
       <el-table :data="typelist" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        
        <el-table-column 
          prop="dish_type" 
          label='菜品类型'
          width="70px"
        >
        <template slot-scope="scope"> 
        <el-tag v-if="scope.row.dish_type=='开胃冷菜'" style="color:blue">开胃冷菜</el-tag> 
        <el-tag v-if="scope.row.dish_type=='生猛海鲜'" style="color:red">生猛海鲜</el-tag>
        <el-tag v-if="scope.row.dish_type=='精美热菜'" style="color:orange">精美热菜</el-tag>
        <el-tag v-if="scope.row.dish_type=='风味小炒'" style="color:black">风味小炒</el-tag>
        <el-tag v-if="scope.row.dish_type=='营养汤羹'" style="color:green">营养汤羹</el-tag>
        <el-tag v-if="scope.row.dish_type=='主食点心'" style="color:purple">主食点心</el-tag>
        <el-tag v-if="scope.row.dish_type=='酒水'" style="color:grey">酒水</el-tag> 
        </template> 
        </el-table-column>
        
        <el-table-column 
          prop="count" 
          label="数量"
          width="150px"
        ></el-table-column>
        </el-table>
   </el-card>

    <!--查看某类型菜品详细信息的对话框-->
    <el-dialog
      title="查看该类型菜品详细信息"
      :visible.sync="searchDialogVisible"
      width="100%">

      <el-table :data="searchForm" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>        
        <el-table-column 
          prop="dish_id" 
          label="菜品编号"
          width="170px"
        ></el-table-column>

        <el-table-column 
          prop="name" 
          label="菜品名称"
          width="170px"
        ></el-table-column>

        <el-table-column 
          prop="time_cost" 
          label="菜品用时"
          width="150px"
        ></el-table-column>

        <el-table-column 
          prop="dish_type" 
          label="菜品类型"
          width="150px"
        >
        <template slot-scope="scope"> 
        <el-tag v-if="scope.row.dish_type=='开胃冷菜'" style="color:blue">开胃冷菜</el-tag> 
        <el-tag v-if="scope.row.dish_type=='生猛海鲜'" style="color:red">生猛海鲜</el-tag>
        <el-tag v-if="scope.row.dish_type=='精美热菜'" style="color:orange">精美热菜</el-tag>
        <el-tag v-if="scope.row.dish_type=='风味小炒'" style="color:black">风味小炒</el-tag>
        <el-tag v-if="scope.row.dish_type=='营养汤羹'" style="color:green">营养汤羹</el-tag>
        <el-tag v-if="scope.row.dish_type=='主食点心'" style="color:purple">主食点心</el-tag>
        <el-tag v-if="scope.row.dish_type=='酒水'" style="color:grey">酒水</el-tag> 
        </template> 
        </el-table-column>

        <el-table-column
          prop="price"
          label="菜品价格"
          width="120px"
        ></el-table-column>
        
        <el-table-column
          prop="success"
          label="沽清状态"
          width="100px"
        >
        <template slot-scope="scope"> 
        <el-tag v-if="scope.row.success" style="color:orange">沽清</el-tag> 
        <el-tag v-else style="color:green">未沽清</el-tag> 
        </template> 
        </el-table-column>

      </el-table>

    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
      return{
        typelist : [],
        searchDialogVisible:false,
        searchForm:[]
      }
  },
  methods:{
    async getTypeList() {
      const {data} = await this.$http.get("dish/search_type");
      this.typelist = data.dishes;
    },
    async getTypeDetails(dish_type){
      const {data} = await this.$http.post("dish/search_type",dish_type);
      this.searchForm = data.dishes;
      this.searchDialogVisible=true;
    },
  },
  created() {
    this.getTypeList();
  }
}
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>
