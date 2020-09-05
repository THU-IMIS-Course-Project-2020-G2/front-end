<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>厨政管理</el-breadcrumb-item>
      <el-breadcrumb-item>状态查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--开始展示各工位统计信息的表格-->
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
            :stroke-width="42" 
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

  </div>
</template>

<script>
export default {
  data() {
      return{
          statuslist:[{
              dish_status: 1,
              count:10,
              count_percent:Math.round(20.6666666),
              count_id: 30
          }]
      }
  },
  methods:{
      
  },
  created() {

  }
}
</script>

<style lang="less" scoped>

</style>
