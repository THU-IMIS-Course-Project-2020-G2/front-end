<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
            <el-tag>日志编号</el-tag>  
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="paramForm.choice_id"
            disabled
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showParamDialog">修改</el-button>
        </el-col>
      </el-row>


        <el-row :gutter="20">
        <el-col :span="4">
            <el-tag type="success">下单算法</el-tag>  
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="paramForm.add_order_type"
            disabled
          >
          </el-input>
        </el-col>
      </el-row>

    <el-row :gutter="20">
        <el-col :span="4">
            <el-tag type="info">催单算法</el-tag>  
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="paramForm.nudge_order_type"
            disabled
          >
          </el-input>
        </el-col>
      </el-row>

    <el-row :gutter="20">
        <el-col :span="4">
            <el-tag type="warning">时间换算</el-tag>  
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="paramForm.param"
            disabled
          >
          </el-input>
        </el-col>
      </el-row>

    <el-row :gutter="20">
        <el-col :span="4">
            <el-tag type="danger">设置开始时间</el-tag>  
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="paramForm.create_time"
            disabled
          >
          </el-input>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <!--分割线-->
      <span>这里是关于系统设置参数的一些说明</span>


    </el-card>

    <!--修改系统设置的对话框-->
    <el-dialog
      title="修改系统设置"
      :visible.sync="paramDialogVisible"
      width="50%"
      @close=paramDialogClosed>
      <el-form :model="editParamForm" :rules="paramFormRules" ref="paramFormRef" label-width="70px">
        
        <el-form-item label="下单算法" prop="add_order_type">
        <el-input v-model="editParamForm.add_order_type"></el-input>
        </el-form-item>

        <el-form-item label="催单算法" prop="nudge_order_type">
        <el-input v-model="editParamForm.nudge_order_type"></el-input>
        </el-form-item>

        <el-form-item label="时间换算" prop="param">
        <el-input v-model="editParamForm.param"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="paramDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="paramInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paramDialogVisible: false,
      paramForm:{
          choice_id:0,
          add_order_type:0,
          nudge_order_type:0,
          param:1,
          create_time:''
      },
      editParamForm:{
          add_order_type:0,
          nudge_order_type:0,
          param:1
      },
      paramFormRules:{
          add_order_type:[
              {required: true, message: '请输入下单算法',trigger:'blur'}
        ],
          nudge_order_type:[
              {required: true, message: '请输入催单算法',trigger:'blur'}
        ],
          param:[
              {required: true, message:'请输入模拟系统设置',trigger:'blur'}
        ]
      }
    };
  },
  methods: { 
    //获取全部菜品条目
    async getParamList() {
      const { data } = await this.$http.get("kitchen/order_type");
      this.paramForm = data.all_log;
    },

    async showParamDialog(){
      const {data: res}= await this.$http.get('kitchen/order_type')
      this.editParamForm.add_order_type=res.all_log.add_order_type,
      this.editParamForm.nudge_order_type=res.all_log.nudge_order_type,
      this.editParamForm.param=res.all_log.param,
      this.paramDialogVisible=true
    },

    paramDialogClosed(){
      this.$refs.paramFormRef.resetFields()
    },
    //修改算法及系统设置并提交
    paramInfo(){
      this.$refs.paramFormRef.validate(async valid=>{
        if (!valid) return
        //发起修改菜品信息的数据请求
        const {data: res} =await 
        this.$http.post('kitchen/order_type',{
          add_order_type: this.editParamForm.add_order_type,
          nudge_order_type: this.editParamForm.nudge_order_type,
          param: this.editParamForm.param
        },)
        if(res.edit_status !== 1){
          return this.$message.error('更新系统设置失败！')
        }
        this.paramDialogVisible=false
        //刷新数据列表
        this.getParamList()
        //提示修改成功
        this.$message.success('更新系统设置成功！')
      })
    },
  },
  created() {
    this.getParamList();
  }
};
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
