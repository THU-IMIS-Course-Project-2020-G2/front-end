<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>厨政管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      
      <el-form :inline="true" :model='queryInfo' label-width="80px">
      <el-form-item label="订单号">
     
          <el-input
            placeholder="请输入订单号"
            clearable
            v-model="queryInfo.order_id"
            @clear="getOrderList"
          >
          </el-input>
   
        </el-form-item>

       <el-form-item label="菜品数量">
    
          <el-input
            placeholder="请输入菜品数量"
            clearable
            v-model="queryInfo.count"
            @clear="getOrderList"
          >
          </el-input>
  
       </el-form-item>

       <el-form-item label="菜品名称">
    
          <el-input
            placeholder="请输入菜品名称"
            clearable
            v-model="queryInfo.dish_name"
            @clear="getOrderList"
          >
          </el-input>
   
       </el-form-item>
      </el-form>

   <el-form :inline="true" :model='queryInfo' label-width="80px">
      <el-form-item label="工位号">

          <el-input
            placeholder="请输入工位号"
            clearable
            v-model="queryInfo.station_id"
            @clear="getOrderList"
          >
          </el-input>

      </el-form-item>

      <el-form-item label="队列号">
 
          <el-input
            placeholder="请输入等待队列号"
            clearable
            v-model="queryInfo.waiting_list"
            @clear="getOrderList"
          >
          </el-input>
  
      </el-form-item>

      <el-form-item label="菜品状态">
          
            <el-select 
            v-model="queryInfo.dish_status" 
            placeholder="请选择菜品状态"
            >
            <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
            </el-option>
            </el-select>

      </el-form-item>
   </el-form>

       <el-row :gutter="20">
        <el-col :span="2">
          <el-button type="primary" @click="getOrderList">查询</el-button>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" @click="refresh">重置</el-button>
        </el-col>
      </el-row>
  

    <el-table :data="orderlist" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        
        <el-table-column 
          prop="order_id" 
          label="订单号"
          width="170px"
        ></el-table-column>

        <el-table-column 
          prop="dish_id" 
          label="菜品编号"
          width="120px"
        ></el-table-column>
        
        <el-table-column 
          prop="dish_name" 
          label="菜品名称"
          width="150px"
        ></el-table-column>

        <el-table-column
          prop="count"
          label="该菜点菜数量"
          width="95px"
        ></el-table-column>
        
        <el-table-column
          prop="create_time"
          label="下单时间"
          width="170px"
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
          label='工位号'
          width="100px"
        ></el-table-column>

        <el-table-column label="操作" width="240px">
          <template v-slot="scope">
            <!--操作中的查询详细信息按钮-->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-search"
              @click="showDetailsDialog(scope.row.order_id,scope.row.dish_id)"
            ></el-button>
          </template>
        </el-table-column>


      </el-table>

    </el-card>

  </div>
</template>

<script>
export default {
  data() {
      return{
        queryInfo: {
        dish_status: '',//dish status
        order_id:0,
        count:1,
        dish_name:'',
        station_id:1,
        waiting_list:1
      },
        orderlist : [],
        options: [
        {
          value: '0',
          label: '未完成'
        }, {
          value: '1',
          label: '已催单'
        },
        {
          value: '2',
          label: '已完成'
        },
        {
          value: '3',
          label: '已废弃'
        },
        {
          value: '4',
          label: '正在做'
        }],
        searchForm:{
          order_id:0,
          order_type:1,
          //dish_id: 0,
          count:0,
          create_time:'',
          dish_status:1,
          start_time:'',
          station_id:1,
          waiting_list:0,
          ingd_cost:0.0
      },
      }
  },
  methods:{
    async getOrderList() {
      const { data } = await this.$http.post("kitchen/search", this.queryInfo);
      this.orderlist = data.dishes;
    },
    async refresh(){
      const {data} = await this.$http.get("kitchen/search",{});
      this.orderlist = data.dishes;
    },
    async showDetailsDialog(order_id,dish_id){
      const {data: res}= await this.$http.post('kitchen/detail',{
        order_id:order_id,
        dish_id:dish_id
      });
      this.searchForm.order_id=res.order_id,
      this.searchForm.order_type=res.order_type,
      this.searchForm.dish_id = res.dish_id,
      this.searchForm.count = res.count,
      this.searchForm.create_time=res.create_time,
      this.searchForm.dish_status=res.dish_status,
      this.searchForm.start_time=res.start_time,
      this.searchForm.station_id=res.station_id,
      this.searchForm.waiting_list=res.waiting_list,
      this.searchForm.ingd_cost=res.ingd_cost
    }

  },
  created() {
    this.getOrderList();
  }
}

</script>
<style lang="less" scoped>
  .el-col {
    border-radius: 4px;
  }
</style>
