<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>厨政管理</el-breadcrumb-item>
      <el-breadcrumb-item>下单信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="orderlist" stripe border style="width: 100%">
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
          prop="create_time"
          label="下单时间"
          width="200px"
        ></el-table-column>
        
        <el-table-column
          prop="count"
          label='下单总数'
          width="100px"
        ></el-table-column>
        
        <el-table-column
          prop="finish_percent"
          label="完成比例"
          width="100px"
        ></el-table-column>

        <el-table-column label="操作" width="180px">
          <template v-slot="scope">

            <!--操作中的查询某订单详细信息按钮-->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-search"
              @click="showDetailsDialog(scope.row.order_id)"
            ></el-button>

          </template>
        </el-table-column>
      </el-table>

    <!--查看某订单详细信息的对话框-->
    <el-dialog
      title="查看订单详细信息"
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
        orderlist : [],
        searchForm:{
          order_id:0,
          order_type:0,
          dish_id:101,
          dish_name:'',
          count:0,
          create_time:'',
          dish_status:0,
          //start_time:'',
          station_id:1,
          waiting_list:0
          //ingd_cost:0.0
      },
      searchDialogVisible:false
      }
  },
  methods:{
    async getOrderList() {
      const { data } = await this.$http.get("kitchen/order");
      this.orderlist = data.dishes;
    },
    async showDetailsDialog(order_id){
      const { data } = await this.$http.post("kitchen/order", {'order_id':order_id});
      this.searchForm=data.dishes;
      this.searchDialogVisible = true
    }
  },
  created() {
    this.getOrderList();
  }
}
</script>

<style lang="less" scoped>

</style>
