<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>厨政管理</el-breadcrumb-item>
      <el-breadcrumb-item>工位查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
          <el-col :span="4">
          <el-button type="primary" @click="getStationDetails(1)">冷菜工位1</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getStationDetails(2)">冷菜工位2</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getStationDetails(3)">冷菜工位3</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
      </el-row>


      <!--第二行-->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="getStationDetails(4)">热菜工位1</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getStationDetails(5)">热菜工位2</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getStationDetails(6)">热菜工位3</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="getStationDetails(7)">热菜工位4</el-button>
        </el-col>

      </el-row>

      <!--第三行开始展示各工位统计信息的表格-->
       <el-table :data="stationlist" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        
        <el-table-column 
          prop="station_id" 
          label="工位号"
          width="70px"
        ></el-table-column>
        
        <el-table-column 
          prop="current_status" 
          label="工位状态"
          width="150px"
        ></el-table-column>

        <el-table-column
          prop="workload"
          label="工作时间占比"
          width="150px"
        >
         <template slot-scope="scope">
          <el-progress
            type="line"
            :text-inside="true"
            :stroke-width="22" 
            :percentage="scope.row.workload"
          ></el-progress>
        </template>
        </el-table-column>
        
        <el-table-column
          prop="waiting_number"
          label="等待数量"
          width="150px"
        ></el-table-column>

        </el-table>
    </el-card>


    <!--查看工位详细信息的对话框-->
    <el-dialog
      title="查看工位详细信息"
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
        ></el-table-column>

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
        ></el-table-column>
        
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
          stationlist:[],
          searchForm:[],
          searchDialogVisible: false
      }
  },

  methods:{
      async getStationDetails(station_id) {
      const { data } = await this.$http.post("kitchen/workstation", {'station_id':station_id});
      this.searchForm = data.dish_station;
      this.searchDialogVisible = true;
    },

      async getStationList(){
          const { data } = await this.$http.get("kitchen/workstation");
          this.stationlist=data.dishes;
          this.stationlist.workload=Math.round(data.dishes.workload*100)
      }

  },
  created() {
      this.getStationList();
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
