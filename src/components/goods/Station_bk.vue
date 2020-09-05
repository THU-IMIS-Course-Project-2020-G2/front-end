<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>厨政管理</el-breadcrumb-item>
      <el-breadcrumb-item>工位查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          
          <el-input
            placeholder="请输入工位号"
            clearable
            v-model="queryInfo.station_id"
            @clear="getStationList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleCurrentChange(); getStationList;"
            ></el-button>

          </el-input>
        </el-col>
    </el-row>

    <el-table :data="stationlist" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        
        <el-table-column 
          prop="order_id" 
          label="订单号"
          width="170px"
        ></el-table-column>
        
        <el-table-column 
          prop="dish_id" 
          label="菜品编号"
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
        ></el-table-column>
        
        <el-table-column
          prop="waiting_list"
          label='等待队列号'
          width="100px"
        ></el-table-column>
      </el-table>

    </el-card>

  </div>
</template>

<script>
export default {
  data() {
      return{
        queryInfo: {
        station_id: ''//工位号
      },
        stationlist : []
      }
  },
  methods:{
    async getStationList() {
      const { data } = await this.$http.post("kitchen/workstation",this.queryInfo);
      //if (data.meta.status !== 200) {
        //return this.$message.error('获取菜单信息失败！');
      //}
      this.stationlist = data.dish_station;
      //this.total = data.data.total;
    },
    handleCurrentChange() {
      //this.queryInfo.pagenum = newPage;
      this.getStationList();
    },
  },
  created() {
    this.getStationList();
  }
}

</script>
<style lang="less" scoped>
</style>
