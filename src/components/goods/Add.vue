<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加菜品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert
        title="添加菜品信息"
        :closable="false"
        center
        show-icon
        type="info"
      >
      </el-alert>

      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="菜品图片"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="80px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="菜品名称" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="菜品价格" prop="price">
              <el-input v-model="addForm.price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="菜品用时" prop="time_cost">
              <el-input v-model="addForm.time_cost" type="number"></el-input>
            </el-form-item>
    
            <!--<el-form-item label="菜品分类：" prop="dish_type">
              <template>
                <el-select v-model="addForm.dish_type" placeholder="请选择菜品分类">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-form-item>-->

            <!--可以搜索下拉新增的菜品分类框-->
            <el-form-item label="菜品分类：" prop="dish_type">
            <template>
              <el-select
                v-model="addForm.dish_type"
                filterable
                allow-create
                default-first-option
                placeholder="请选择菜品分类">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </template>
            </el-form-item>

            <!--<el-form-item label="菜品用料" prop="ingredient">
              <el-input v-model="addForm.ingredient"></el-input>
            </el-form-item>-->

            <!--<div class="demo-input-size">
            <el-input
                size="small"
                placeholder="请输入用料名称"
                suffix-icon="el-icon-date"
                v-model="addForm.ingredients[0].ingredient_name"
                prop='ingredient_name'>
            </el-input>
            <el-input
                size="small"
                placeholder="请输入用料数量"
                suffix-icon="el-icon-date"
                v-model="addForm.ingredients[0].ingredient_number"
                type="number"
                prop='ingredient_number'>
            </el-input>    
            </div>-->

            <!--添加菜品用料和对应的数量-->
            <template>
            <div>
               <el-button @click="addline">添加菜品用料</el-button>
               <el-table :data="addForm.ingredients">
               <el-table-column 
               prop="ingredient_name" label="用料名称">
               <template  slot-scope="scope">
               <el-input 
               v-model="addForm.ingredients[scope.$index].ingredient_name"
               placeholder="请填写用料名称"></el-input>
            </template>
            </el-table-column>

             <el-table-column prop="ingredient_number" label="用料数量">
             <template  slot-scope="scope">
             <el-input 
             v-model="addForm.ingredients[scope.$index].ingredient_number"
             placeholder="请填写用料数量"
             type='number'></el-input>
             </template>
             </el-table-column>

             <el-table-column label="操作">
             <template  slot-scope="scope">
             <el-button type='danger' icon='el-icon-delete' circle @click="deleteRow(scope.$index)">删除</el-button>
             </template>
             <!--这里之后要加上第一行的删除按钮禁用 用料和数量均为必填项-->
             </el-table-column>
              </el-table>
             </div>
          </template>

          </el-tab-pane>

          <!--第二页-->

          <el-tab-pane label="菜品图片" name="2">
            <el-upload
              :auto-upload='false'
              list-type='picture'
              :multiple='false'
              :limit='1'
              action=''
              :on-change='handleUpload'
            >
              <el-button type="primary">选择图片<i class='el-icon-upload el-icon--right'></i></el-button>
            </el-upload>
            
            <el-button type="primary" class="btnAdd" @click="add">添加菜品</el-button>
          </el-tab-pane>


          <!--<el-tab-pane label="沽清状态" name="3">
            <quill-editor v-model="addForm.success"></quill-editor>
            <el-button type="primary" class="btnAdd" @click="add">添加菜品</el-button>
          </el-tab-pane>-->

        </el-tabs>
      </el-form>
    </el-card>

  </div>
</template>

<script>
//import _ from 'lodash'

export default {
  data() {
    return {
      activeIndex: "0",
      addForm: {
        name: "",
        price: 0,
        time_cost: 0,
        dish_type: '',
        ingredients:[{ingredient_name:"",ingredient_number:0}],
        dish_pic:'',
        success:''
      },

      //输入框的校验规则
      addFormRules: {
        name: [
          { required: true, message: "请输入菜品名称", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入菜品价格", trigger: "blur" }
        ],
        time_cost: [
          { required: true, message: "请输入菜品用时", trigger: "blur" }
        ],
        dish_type: [
          { required: true, message: "请选择菜品分类", trigger: "blur" }
        ]
        
      },

      options: [{
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
        },{
          value: '主食点心',
          label: '主食点心'
        },{
          value: '酒水',
          label: '酒水'
        }],

    };
  },

  methods: {
    //将图片转化为base64编码
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    //得到的是data:image/jpeg;base64,+一串东西，一起记录在dish_pic里
    handleUpload(file){
      this.getBase64(file.raw).then(res=>{
        console.log(res);
        this.addForm.dish_pic=res;
        this.previewPath=res;
      })
    },

    async add() {
      this.$refs.addFormRef.validate(async valid=>{
        if(!valid) {
          return this.$message.error('请先填写必填项！')
        }

        //const form = _.cloneDeep(this.addForm)
        const form=this.addForm

        const {data} = await this.$http.post('dish',form)
        if (data.add_status !== 1) {
          return this.$message.error('添加菜品失败！');
        }
        this.$message.success('添加菜品成功！')
        this.$router.push('/goods')
      })
    },
    //添加菜品用料时新增一行（原来默认一行）
      addline(){
        this.addForm.ingredients.push({});
      },
      //新增菜品用料时可删去
      deleteRow(index){
        this.addForm.ingredients.splice(index,1);
      }
  },
  
  created() {

  }
};
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}

.previewImg{
  width: 100%;
}

.btnAdd{
  margin-top: 15px;
}
</style>
