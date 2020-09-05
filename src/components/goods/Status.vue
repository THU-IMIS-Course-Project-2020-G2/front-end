<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>厨政管理</el-breadcrumb-item>
      <el-breadcrumb-item>状态查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
          <el-col :span="4">
          <el-button type="primary" @click="getStatusDetails(0)">未完成</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getStatusDetails(1)">已催单</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getStatusDetails(2)">已完成</el-button>
        </el-col>

         <el-col :span="4">
          <el-button type="primary" @click="getStatusDetails(3)">已废弃</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getStatusDetails(4)">正在做</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
      </el-row>

      <!--第二行开始展示各工位统计信息的表格-->
       <el-table :data="statuslist" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        
        <el-table-column 
          prop="dish_status" 
          label="菜品状态"
          width="70px"
        >
        </el-table-column>

        
        <el-table-column 
          prop="count" 
          label="该状态菜品总数"
          width="200px"
        ></el-table-column>

        <el-table-column
          prop="count_percent"
          label="该状态菜品数占总点餐量比重"
          width="220px"
        >
         <template slot-scope="scope">
          <el-progress
            type="line"
            :text-inside="true"
            :stroke-width="22" 
            :percentage="scope.row.count_percent"
          ></el-progress>
        </template>
        </el-table-column>
        
        <el-table-column
          prop="count_id"
          label="该状态菜数占总订单数比重"
          width="220px"
        >
         <template slot-scope="scope">
          <el-progress
            type="line"
            :text-inside="true"
            :stroke-width="22" 
            :percentage="scope.row.count_id"
          ></el-progress>
        </template>
        </el-table-column>

        </el-table>

    </el-card>


    <!--查看某状态菜品详细信息的对话框-->
    <el-dialog
      title="查看该状态下菜品详细信息"
      :visible.sync="searchDialogVisible"
      width="100%">

      <el-table :data="searchForm" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>        
        <el-table-column 
          prop="order_id" 
          label="订单号"
          width="170px"
        ></el-table-column>

        <el-table-column 
          prop="order_type" 
          label="订单类型"
          width="170px"
        >
        <template slot-scope="scope"> 
        <el-tag v-if="scope.row.order_type==0" style="color:blue">堂食</el-tag> 
        <el-tag v-if="scope.row.order_type==1" style="color:green">外卖</el-tag>
        </template>
        </el-table-column>

        <el-table-column 
          prop="dish_id" 
          label="菜品编号"
          width="150px"
        ></el-table-column>

        <el-table-column 
          prop="dish_name" 
          label="菜品名称"
          width="150px"
        ></el-table-column>

        <el-table-column
          prop="count"
          label="该菜点菜数量"
          width="120px"
        ></el-table-column>
        
        <el-table-column
          prop="create_time"
          label="下单时间"
          width="200px"
        ></el-table-column>
        
        <el-table-column
          prop="dish_status"
          label="菜品状态"
          width="100px"
        >
        <template slot-scope="scope"> 
        <el-tag v-if="scope.row.dish_status==0" style="color:red">未完成</el-tag> 
        <el-tag v-if="scope.row.dish_status==1" style="color:orange">已催单</el-tag>
        <el-tag v-if="scope.row.dish_status==2" style="color:green">已完成</el-tag>
        <el-tag v-if="scope.row.dish_status==3" style="color:black">已废弃</el-tag>
        <el-tag v-if="scope.row.dish_status==4" style="color:blue">正在做</el-tag>
        </template>
        </el-table-column>
        
        <el-table-column
          prop="station_id"
          label="工位号"
          width="100px"
        ></el-table-column>

        <el-table-column
          prop="waiting_list"
          label="等待队列"
          width="100px"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
      return{
          statuslist:{
            dish_status: 0,
            count:1,
            count_percent:0,
            count_id:0
          },
          searchForm:[],
          searchDialogVisible: false
      }
  },
  methods:{
      async getStatusDetails(dish_status) {
      const { data } = await this.$http.post("kitchen/dish", {'dish_status':dish_status});
      this.searchForm = data.dishes;
      this.searchDialogVisible = true;
    },
      async getStatusList(){
          const { data } = await this.$http.get("kitchen/dish");
          this.statuslist.dish_status=data.dishes.dish_status,
          this.statuslist.count=data.dishes.count,
          this.statuslist.count_percent=Math.round(data.dishes.count_percent*100),
          this.statuslist.count_id=Math.round(data.dishes.count_id*100)
      }
  },
  created() {
      this.getStatusList();
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
