<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜品查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form :inline="true" :model='queryInfo' label-width="80px">
      <el-form-item label="菜品名称">

          <el-input
            placeholder="请输入搜索菜品名称关键字"
            clearable
            v-model="queryInfo.name"
            @clear="getTypeList"
          >
          </el-input>
      </el-form-item>
        
      <el-form-item label="菜品类别">
          <el-input
            placeholder="请输入菜品类别关键字"
            clearable
            v-model="queryInfo.dish_type"
            @clear="getTypeList"
          ></el-input>
      </el-form-item>


      <el-form-item label="沽清状态">

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
          </el-form-item>
      </el-form>
    


    <!--第二行-->
    <el-form :inline="true" :model='queryInfo' label-width="80px">
      <el-form-item label="价格下限">
          <el-input
            placeholder="请输入价格下限"
            clearable
            v-model="queryInfo.price_lb"
            @clear="getTypeList"
          >
           </el-input>
      </el-form-item>


      <el-form-item label="价格上限">
           <el-input
            placeholder="请输入价格上限"
            clearable
            v-model="queryInfo.price_ub"
            @clear="getTypeList"
          >
          </el-input>
      </el-form-item>

      <el-form-item label="用时下限">
          <el-input
            placeholder="请输入用时下限"
            clearable
            v-model="queryInfo.time_cost_lb"
            @clear="getTypeList"
          >
           </el-input>
      </el-form-item>


      <el-form-item label="用时上限">
           <el-input
            placeholder="请输入用时上限"
            clearable
            v-model="queryInfo.time_cost_ub"
            @clear="getTypeList"
          ></el-input>
      </el-form-item>
    </el-form>


    <!--第三行-->
   <el-form :inline="true" :model='queryInfo' label-width="80px">
      <el-form-item label="菜品用料">
          <el-input
            placeholder="请输入菜品用料关键字"
            clearable
            v-model="queryInfo.ingredients"
            @clear="getTypeList"
          ></el-input>
      </el-form-item>
        
          <el-button type="primary" @click="getTypeList">查询</el-button>

          <el-button type="primary" @click="refresh">重置</el-button>
  </el-form>
  


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
          width="100px"
        ></el-table-column>
        
        <el-table-column
          prop="success"
          label='沽清状态'
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
              type="primary"
              icon="el-icon-edit"
              @click="showPriceDialog(scope.row.dish_id,scope.row.price)"
            ></el-button>

            <!--操作中的查询详细信息按钮-->
            <el-button
              size="mini"
              type="primary"
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
        :alt="editForm.name">
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
        <!--这里v-model="editForm.dish_type"双向绑定，要用从数据库中返回的字段名称-->
        </el-form-item>

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
      return{
        //记录用料名称和对应数量的动态table标签
      tableLabel:[
          {label: '菜品用料', prop: 'ingredient_name'},
          {label: '用料数量', prop: 'ingredient_number'}],
        queryInfo: {
          name:'',
          time_cost_lb:0,
          time_cost_ub:50,
          ingredients:'',
          dish_type: '',//dish_type
          price_ub:100,
          price_lb:0,
          success:'0'
        },
        typelist : [],
        //goodslist: []//用于获取所有菜品的信息以显示在初始界面上

        options2: [
        {
          value: '1',
          label: '沽清'
        }, {
          value: '0',
          label: '未沽清'
        }],

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
        ingd_cost: 0,
        success:0,
        ingredients:[{ingredient_name:'',ingredient_number:0}]
      },
      editIcon: '',
      detailsIcon:'',
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

  methods:{
    async getTypeList() {
      //当查询条件为空时用于获取所有菜品的信息以显示在初始界面上
        const { data } = await this.$http.post("dish/search", this.queryInfo)
        this.typelist = data.dishes;
    },
    async refresh(){
      const {data} = await this.$http.get("dish");
      this.typelist = data.dishes;
    },
    handleCurrentChange() {
      this.getTypeList();
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
      this.searchDialogVisible=true
      const {data: res}= await this.$http.get(`dish/${id}`)
      this.searchForm.dish_id = res.dish_id,
      this.searchForm.name = res.name,
      this.searchForm.dish_pic = res.dish_pic,
      this.searchForm.time_cost = res.time_cost,
      this.searchForm.dish_type = res.dish_type,
      this.searchForm.price = res.price,
      this.senparchForm.success = res.success,
      this.searchForm.ingd_cost = res.ingd_cost,
      this.detailsIcon= res.dish_pic,
      this.searchDialogVisible = true
    },

    
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
          this.getTypeList();
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
        this.getTypeList()
        //提示修改成功
        this.$message.success('更新菜品信息成功！')
      })
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
        this.getTypeList()
        //提示修改成功
        this.$message.success('更新菜品价格成功！')
      })
    },
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
    },
    editPriceDialogClosed(){
      this.$refs.editPriceFormRef.resetFields()

    },
    searchDialogClosed(){
      this.$refs.searchFormRef.resetFields()
    },
    addline(){
        this.editForm.ingredients.push({});
      },
      //编辑菜品用料和对应数量时可彻底删除某一用料
      deleteRow(index){
        this.editForm.ingredients.splice(index,1);
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

