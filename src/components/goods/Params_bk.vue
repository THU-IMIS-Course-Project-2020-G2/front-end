<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜品查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          
          <el-input
            placeholder="请输入搜索关键字"
            clearable
            v-model="queryInfo.query"
            @clear="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleCurrentChange();getGoodsList;"
            ></el-button>
          </el-input>
        </el-col>
        
        
        <el-col :span="8"> 
            <el-select 
            v-model="queryInfo.dish_type" 
            placeholder="请选择菜品类别"
            >
            <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
            </el-option>
            </el-select>
            <el-col :span="4">
            <el-button
              icon="el-icon-search"
              @click="handleCurrentChange(); getTypeList;"
          ></el-button>
          </el-col>
        </el-col>

        <el-col :span="8">
            <el-select 
            v-model="queryInfo.success" 
            placeholder="请选择沽清状态"
            >
            <el-option
               v-for="item in options2"
               :key="item.value"
               :label="item.label"
               :value="item.value">
            </el-option>
            </el-select>
            <el-col :span="4">
            <el-button
              icon="el-icon-search"
              @click="handleCurrentChange(); getTypeList;"
          ></el-button>
          </el-col>
        </el-col>

    </el-row>

    <!--第二行-->
    <el-row :gutter="20">
        <el-col :span="5">
          <el-input
            placeholder="请输入价格下限"
            clearable
            v-model="queryInfo.dish_price_lowlimit"
            @clear="getGoodsList"
          >
           </el-input>
        </el-col>

        <el-col :span="5">
         
           <el-input
            placeholder="请输入价格上限"
            clearable
            v-model="queryInfo.dish_price_highlimit"
            @clear="getGoodsList"
          >
          </el-input>
        </el-col>

        <el-col :span="5">
          <el-input
            placeholder="请输入用时下限"
            clearable
            v-model="queryInfo.dish_time_lowlimit"
            @clear="getGoodsList"
          >
           </el-input>
        </el-col>

        <el-col :span="5">
         
           <el-input
            placeholder="请输入用时上限"
            clearable
            v-model="queryInfo.dish_time_highlimit"
            @clear="getGoodsList"
          >
          </el-input>
        </el-col>

    </el-row>


    <!--第三行-->
    <el-row :gutter="20">

       <el-col :span="8">
          <el-input
            placeholder="请输入菜品用料关键字"
            clearable
            v-model="queryInfo.dish_ingredient"
            @clear="getGoodsList"
          >
           </el-input>
        </el-col>
        

        <el-col :span="2">
          <el-button type="primary" @click="multi-search">查询</el-button>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" @click="refresh">重置</el-button>
        </el-col>

    </el-row>

    <!--正式的表部分-->
    <el-table :data="typelist" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        
        <el-table-column 
          prop="dish_id" 
          label="菜品编号"
          width="170px"
        ></el-table-column>
        
        <el-table-column 
          prop="name" 
          label="菜品名称"
          width="150px"
        ></el-table-column>

        <el-table-column
          prop="time_cost"
          label="菜品用时(min)"
          width="150px"
        ></el-table-column>
        
        <el-table-column
          prop="dish_type"
          label="菜品类型"
          width="170px"
        ></el-table-column>
        
        <el-table-column
          prop="price"
          label="菜品价格"
          width="100px"
        ></el-table-column>
        
        <el-table-column
          prop="success"
          label='沽清状态'
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
          query:'',
          dish_type: ''//dish_type
        },
        typelist : [],
        //goodslist: []//用于获取所有菜品的信息以显示在初始界面上

        options: [
        {
          value: '',
          label: '全选'
        },
        {
          value: '开胃冷菜',
          label: '开胃冷菜'
        }, {
          value: '生猛海鲜',
          label: '生猛海鲜'
        }, {
          value: '精美热菜',
          label: '精美热菜'
        }, {
          value: '风味小炒',
          label: '风味小炒'
        }, {
          value: '营养汤羹',
          label: '营养汤羹'
        }, {
          value: '主食点心',
          label: '主食点心'
        }, {
          value: '酒水',
          label: '酒水'
        }],

        options2: [
        {
          value: '1',
          label: '沽清'
        }, {
          value: '0',
          label: '未沽清'
        }]
      }; 
  },
  methods:{
    async getTypeList() {
      //当查询条件为空时用于获取所有菜品的信息以显示在初始界面上
      if (this.queryInfo.dish_type ==''){
        const { data:res } = await this.$http.get("dish");
        this.typelist = res.dishes;
        //this.typelist.dish_id=res.dishes.dish_id,
        //this.typelist.name=res.dishes.name,
        //this.typelist.dish_type=res.dishes.dish_type,
        //this.typelist.time_cost=res.dishes.time_cost,
        //this.typelist.price=res.dishes.price,
        //this.typelist.success=res.dishes.success 
      }
      else{
        const { data } = await this.$http.post("dish/search_type", this.queryInfo
      );
        this.typelist = data.dishes;
      }
    },
    async refresh(){
      const {data} = await this.$http.get("dish");
      this.typelist = data.dishes;
    },

    handleCurrentChange() {
      this.getTypeList();
    },
  },

  created() {
    this.getTypeList();
  }
}
</script>
<style lang="less" scoped>
</style>

