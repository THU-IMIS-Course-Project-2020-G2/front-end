<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加菜品</el-button>
        </el-col>

        <!--<el-col :span="4">
          <el-button type="warning" round @click="getPriceList">按价格排序</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="warning" round @click="getTimeList">按时长排序</el-button>
        </el-col>-->

        <el-col :span="2">
          <el-button type="success" @click="refresh">刷新</el-button>
        </el-col>

      </el-row>

      <el-table 
          :data="goodslist" 
          stripe 
          border  
          height="450" 
          style="width: 100%"
          :default-sort = "{prop: 'price', order: 'descending'}">
        <el-table-column type="index"> </el-table-column>
        
        <el-table-column 
          prop="dish_id" 
          label="菜品编号"
          width="100px"
          sortable
        ></el-table-column>

        <el-table-column 
          prop="name" 
          label="菜品名称"
          width="150px"
        ></el-table-column>

        <el-table-column
          prop="price"
          label="菜品价格（元）"
          width="150px"
          sortable
        >
        </el-table-column>
        
        <el-table-column
          prop="time_cost"
          label="菜品用时（分钟）"
          width="150px"
          sortable
        >
        </el-table-column>
        
        <el-table-column
          prop="dish_type"
          label="菜品类别"
          width="120px"
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
          prop="success"
          label="沽清状态"
          width="100px"
        >
        <template slot-scope="scope"> 
        <el-tag v-if="scope.row.success==1" style="color:orange">沽清</el-tag> 
        <el-tag v-else style="color:green">未沽清</el-tag> 
        </template> 
        </el-table-column>
        
        <el-table-column label="操作" width="240px">
          <template v-slot="scope">
            <!--操作中的编辑按钮-->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.dish_id,
              scope.row.name,
              scope.row.time_cost,
              scope.row.dish_type,
              scope.row.price)"
            ></el-button>

            <!--专门修改菜品价格-->
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit-outline"
              @click="showPriceDialog(scope.row.dish_id,scope.row.price)"
            ></el-button>

            <!--操作中的查询详细信息按钮-->
            <el-button
              size="mini"
              type="info"
              icon="el-icon-search"
              @click="showDetailsDialog(scope.row.dish_id)"
            ></el-button>

            <!--操作中的删除按钮-->
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-delete"
              @click="removeById(scope.row.dish_id)"
            ></el-button>

          </template>
        </el-table-column>
      </el-table>

      <!--页面下方选择页数的组件,用户根据选择page-sizes中每页显示的条数-->
      <!--<el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 30]" 
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>-->


    </el-card>

    <!--修改菜品信息的对话框-->
    <el-dialog
      title="修改菜品信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close=editDialogClosed>
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        
        <el-form-item label="菜品编号" prop="dish_id">
        <el-input v-model="editForm.dish_id" disabled></el-input>
        </el-form-item>

        <el-form-item label="菜品名称" prop="name">
        <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <!--这里用于显示菜品图片-->
        <el-form-item label='菜品图片'>
        <div class='content'>
        <img 
        :src="'data:image/jpg;base64,'+editIcon" 
        :alt="editForm.name"
        style='width:80%'>
        </div>
        </el-form-item>

        <el-form-item label="菜品价格" prop="price">
        <el-input v-model="editForm.price"></el-input>
        </el-form-item>

        <el-form-item label="菜品用时" prop="time_cost">
        <el-input v-model="editForm.time_cost"></el-input>
        </el-form-item>

        <el-form-item label="菜品类别" prop="dish_type">
        <el-input v-model="editForm.dish_type"></el-input>
        </el-form-item>

        <!--<el-form-item label="菜品用料" prop="ingredient_name">
        <el-input v-model="editForm.ingredients[0].ingredient_name"></el-input>
        </el-form-item>

        <el-form-item label="用料数量" prop="ingredient_number">
        <el-input v-model="editForm.ingredients[0].ingredient_number"></el-input>
        </el-form-item>-->
        
        <!--可供修改的菜品用料和对应数量框-->
        <!--用于动态添加菜品用料和对应数量，点击添加新建一行，每行后有一个删除按钮-->
    <template>
     <div>
       <el-button @click="addline">添加</el-button>
       <el-table :data="editForm.ingredients">
       <el-table-column prop="ingredient_name" label="用料名称">
       <template  slot-scope="scope">
          <el-input v-model="editForm.ingredients[scope.$index].ingredient_name"></el-input>
       </template>
       </el-table-column>
       <el-table-column prop="ingredient_number" label="用料数量">
       <template  slot-scope="scope">
         <el-input v-model="editForm.ingredients[scope.$index].ingredient_number"></el-input>
       </template>
       </el-table-column>
       <el-table-column label="操作">
       <template  slot-scope="scope">
          <el-button @click="deleteRow(scope.$index)">删除</el-button>
       </template>
       </el-table-column>
       </el-table>
    </div>
    </template>
    
        <el-form-item label="其他成本" prop="ingd_cost">
        <el-input v-model="editForm.ingd_cost"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="editGoodsInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!--专门修改菜品价格的对话框-->
    <el-dialog
      title="修改菜品价格"
      :visible.sync="editPriceDialogVisible"
      width="50%"
      @close=editPriceDialogClosed>
      <el-form :model="editPriceForm" :rules="editPriceFormRules" ref="editPriceFormRef" label-width="70px">
        
        <el-form-item label="菜品编号" prop="dish_id">
        <el-input v-model="editPriceForm.dish_id" disabled></el-input>
        </el-form-item>

        <el-form-item label="菜品价格" prop="price">
        <el-input v-model="editPriceForm.price"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPriceDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="editPriceInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!--查看菜品详细信息的对话框-->
    <el-dialog
      title="查看菜品详细信息"
      :visible.sync="searchDialogVisible"
      width="50%"
      @close=searchDialogClosed>
      <el-form :model="searchForm"  label-width="70px">

        <el-form-item label="菜品名称" prop="name">
        <el-input v-model="searchForm.name" disabled></el-input>
        </el-form-item>
        
        <!--这里用于显示菜品图片-->
        <el-form-item label='菜品图片' prop='dish_pic'>
        <div class='content'>
        <img :src="'data:image/jpg;base64,'+searchForm.dish_pic" :alt="searchForm.name">
        </div>
        </el-form-item>

        <el-form-item label="菜品价格" prop="price">
        <el-input v-model="searchForm.price" disabled></el-input>
        </el-form-item>

        <el-form-item label="菜品用时" prop="time_cost">
        <el-input v-model="searchForm.time_cost" disabled></el-input>
        </el-form-item>

        <el-form-item label="菜品类别" prop="dish_type">
        <el-input v-model="searchForm.dish_type" disabled></el-input>
        </el-form-item>

        <!--<el-form-item 
        label="菜品用料" 
        prop="ingredient_name">
        <el-input v-model="searchForm.ingredients[0].ingredient_name" disabled></el-input>
        </el-form-item>

        <el-form-item label="用料数量" prop="ingredient_number">
        <el-input v-model="searchForm.ingredients[0].ingredient_number" disabled></el-input>
        </el-form-item>-->
         
         <!--菜品用料-->
        <el-table
        :data="searchForm.ingredients"
        border
        id="el-table"
        style="width: 100%">
        
        
        <template  v-for="(item, index) in tableLabel">
          <el-table-column
            :key="index"
            :prop="item.prop"
            :label="item.label"
            width="">
          </el-table-column>
        </template>
        </el-table>

        <el-form-item label='沽清状态' prop="success">
        <el-input v-model="searchForm.success" disabled></el-input>
        </el-form-item>

      </el-form>
    
    </el-dialog>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      //记录用料名称和对应数量的动态table标签
      tableLabel:[
          {label: '菜品用料', prop: 'ingredient_name'},
          {label: '用料数量', prop: 'ingredient_number'}],
      
      queryInfo: {
        query: ""
      },
      editIcon: '',
      detailsIcon:'',
      goodslist: [],
     
      //控制修改菜品信息的对话框
      editDialogVisible: false,
      searchDialogVisible: false,
      editPriceDialogVisible: false,
      //查询到的菜品信息
      editForm:{
        dish_id:0,
        name:'',
        price: 0,
        time_cost: 0,
        dish_type: '',
        ingredients:[{ingredient_name:'',ingredient_number:0}],
        dish_pic:'',
        ingd_cost:0.0
      },
      editPriceForm:{
        dish_id:0,
        price:0
      },
      searchForm:{
        dish_id: 0,
        name:'',
        dish_pic:'',
        price:0,
        time_cost:0,
        dish_type:'',
        ingd_cost: 0.0,
        success:0,
        ingredients:[{ingredient_name:'',ingredient_number:0}]
      },
      //编辑菜品信息对话框的校验规则
      editFormRules:{
        name:[
          {required: true, message: '请输入菜品名称',trigger:'blur'}
        ],
        price:[
          {required: true, message: '请输入菜品价格',trigger:'blur'}
        ],
        time_cost:[
          {required: true, message: '请输入菜品用时',trigger:'blur'}
        ],
        dish_type:[
          {required: true, message: '请选择菜品类别',trigger:'blur'}
        ]
      },
      editPriceFormRules:{
        price:[
          {required: true, message: '请输入菜品价格',trigger:'blur'}
        ]
      }
    };
  },
  methods: { 
    //获取全部菜品条目
    async getGoodsList() {
      //const { data } = await this.$http.get("dish", {
        //params: this.queryInfo
      //});
      const {data} = await this.$http.get("dish");
      this.goodslist = data.dishes;
    },
    async refresh(){
      this.getGoodsList();
    },
    //按价格高低排序的列表
    //async getPriceList(){
      //const { data } = await this.$http.get("dish/search_price");
      //this.goodslist=data.dishes;
    //},
    //按用时长短排序的列表
    //async getTimeList(){
      //const { data } = await this.$http.get("dish/search_time");
      //this.goodslist=data.dishes;
    //},

  
    //根据每页显示的条目数重新获得菜单列表
    /*handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },*/

    //根据选定页数重新获得菜单列表
    /*handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },*/

    handleCurrentChange() {
      this.getGoodsList();
    },
    
    //根据菜品id修改菜品各项信息
    async showEditDialog(id,name,time_cost,dish_type,price){
      const {data: res}= await this.$http.get('dish/'+id)
      this.editForm.dish_id=id,
      this.editForm.name=name,
      this.editForm.dish_pic=res.dish_pic,
      this.editForm.time_cost=time_cost,
      this.editForm.ingredients=res.ingredients,
      this.editForm.dish_type=dish_type,
      this.editForm.price=price,
      this.editIcon = res.dish_pic,
      this.editForm.ingd_cost=res.ingd_cost,
      this.editDialogVisible=true
    },
    //获取目前的菜品价格信息
    showPriceDialog(id,price){
      this.editPriceForm.dish_id=id,
      this.editPriceForm.price=price,
      this.editPriceDialogVisible=true
    },


    //查询菜品详细信息请求
    async showDetailsDialog(id){
  
      const {data: res}= await this.$http.get(`dish/${id}`)
      //if (res.meta.status !== 200){
        //return this.message.error('查询菜品详细信息失败！')
      //}
      this.searchForm.dish_id = res.dish_id,
      this.searchForm.name = res.name,
      this.searchForm.dish_pic = res.dish_pic,
      this.searchForm.time_cost = res.time_cost,
      this.searchForm.dish_type = res.dish_type,
      this.searchForm.price = res.price,
      this.searchForm.success = res.success,
      this.searchForm.ingd_cost = res.ingd_cost,
      this.detailsIcon= res.dish_pic,
      this.searchForm.ingredients=res.ingredients,
      this.searchDialogVisible = true
    },

    //根据菜品id删除菜品
    removeById(id) {
      this.$confirm("此操作将永久删除该菜品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data } = await this.$http.delete(`dish/${id}`);
          if (data.delete_status !== 1) {
            return this.$message.error('删除失败！');
          }
          this.getGoodsList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //转向添加菜品的界面
    goAddPage() {
      this.$router.push("goods/add");
    },
    //监听用户关闭修改菜品对话框的按钮
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
    },
    editPriceDialogClosed(){
      this.$refs.editPriceFormRef.resetFields()

    },
    searchDialogClosed(){
      this.$refs.searchFormRef.resetFields()
    },
    //修改菜品信息并提交
    editGoodsInfo(){
      this.$refs.editFormRef.validate(async valid=>{
        if (!valid) return
        //发起修改菜品信息的数据请求
        const {data: res} =await this.$http.put('dish/'+this.editForm.dish_id,{
          dish_id:this.editForm.dish_id,
          name: this.editForm.name,
          price: this.editForm.price,
          dish_pic: this.editForm.dish_pic,
          time_cost: this.editForm.time_cost,
          dish_type: this.editForm.dish_type,
          ingredients:this.editForm.ingredients
        },)
        if(res.edit_status !== 1){
          return this.$message.error('修改菜品信息失败！')
        }
        //关闭对话框
        this.editDialogVisible=false
        //刷新数据列表
        this.getGoodsList()
        //提示修改成功
        this.$message.success('更新菜品信息成功！')
      })
    },
      //编辑菜品用料和对应数量时可以新建一行，增加用料名称和对应数量
      addline(){
        this.editForm.ingredients.push({});
      },
      //编辑菜品用料和对应数量时可彻底删除某一用料
      deleteRow(index){
        this.editForm.ingredients.splice(index,1);
      },

    editPriceInfo(){
      this.$refs.editPriceFormRef.validate(async valid=>{
        if (!valid) return
        //发起修改菜品信息的数据请求
        const {data: res} =await this.$http.put('dish/price/'+this.editPriceForm.dish_id,{
          dish_id: this.editPriceForm.dish_id,
          price: this.editPriceForm.price
        },)
        if(res.special_success !== 1){
          return this.$message.error('更新菜品价格信息失败！')
        }
        //关闭对话框
        this.editPriceDialogVisible=false
        //刷新数据列表
        this.getGoodsList()
        //提示修改成功
        this.$message.success('更新菜品价格成功！')
      })

    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style lang="less" scoped></style>
