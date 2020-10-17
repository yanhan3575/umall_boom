<template>
  <div>
    <el-dialog
      @closed="close"
      :title="info.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" v-for="(item,index) in arr" :key="index">
          <div class="box">
              <div class="box2">
                  <el-input v-model="item.value"></el-input>
              </div>
              <el-button type="primary" v-if="index==0" @click="arrs">新增规格属性</el-button>
              <el-button type="danger" v-else @click="dels(index)">删除</el-button>
          </div>
        </el-form-item>
        
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="del">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="bbup" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { bigbang } from "../../../router/index";
import { reqSpecsAdd, reqSpecsinfo,reqSpecsedit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      arr:[
          {value:""},
          {value:""}
      ],
      form: {
        specsname:"",
        attrs:"",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqListAction: "specs/reqListAction",
    }),
    //新增表单属性
    arrs(){
       this.arr.push({value:""})
    },
    //点击删除
    dels(index){
       this.arr.splice(index,1)
    },
    del() {
      this.info.isshow = false;
    },
    //数据重置
    empty() {
        this.arr=[
          {value:""},
          {value:""}
      ],
      this.form = {
        specsname:"",
        attrs:"",
        status: 1,
      }
      
    },
    //修改了pid
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    add() {
    //   console.log(this.form);
    //   console.log(this.arr);
    
      this.form.attrs=JSON.stringify(this.arr.map(item=>item.value))
    //   console.log(JSON.stringify(this.arr.map(item=>item.value)))
      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);
          //数据重置
          this.empty();
          //弹框消失
          this.del();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取菜单详情
   //获取菜单详情 （1条）
    look(id) {
      //发请求
      reqSpecsinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.arr=JSON.parse(this.form.attrs).map(item=>({value:item}))
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //弹窗消失
    close(){
      if(!this.info.isAdd){
        this.empty();
      }
    },
    //修改
    bbup(){
        
      console.log('1',this.form);
     this.form.attrs = JSON.stringify(this.arr.map((item) => item.value));
     console.log('2',this.form)
     reqSpecsedit(this.form).then((res)=>{
       
        if(res.data.code==200){
          successAlert(res.data.msg);
          this.empty();
           this.del();
          this.reqListAction();  
        }else{
           warningAlert(res.data.msg);
        }
     })
    }
   
  },
  
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  mounted() {},
};
</script>
<style scoped>
.box{
    display: flex;
}
.box2{
    flex: 1;
}
</style>