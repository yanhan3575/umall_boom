<template>
  <div>
    <el-dialog
      @closed="close"
      :title="info.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
         
        

        <el-form-item label="所属角色" >
          <el-select v-model="form.roleid" >
            <el-option label="请选择" value=""  disabled></el-option>
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
import { reqUseradd, reqUserlist,reqUseredit,reqUserinfo } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return { 
      form: {
        roleid:"",
        username: "",
        password:"",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqUserListAction: "manage/reqListAction",
      //列表
      reqRoleListAction: "role/reqListAction",
       reqTotalAction:"manage/reqTotalAction"
    }),
    del() {
      this.info.isshow = false;
    },
    //数据重置
    empty() {
      this.form = {
        roleid:"",
        username: "",
        password:"",
        status: 1,
      };
      
    },
    
    add() {
     console.log(this.form);
      // console.log(this.$refs.tree.getCheckedKeys());
      // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      
      reqUseradd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);
          //数据重置
          this.empty();
          //弹框消失
          this.del();
          this.reqUserListAction();
          this.reqTotalAction() 
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取菜单详情
   //获取菜单详情 （1条）
    look(uid) {
      //发请求
      reqUserinfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password=""
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
      console.log(this.form);
     reqUseredit(this.form).then((res)=>{
       
        if(res.data.code==200){
          successAlert(res.data.msg);
          this.empty();
           this.del();
          this.reqRoleListAction();  
        }else{
           warningAlert(res.data.msg);
        }
     })
    }
   
  },
  
  computed: {
    ...mapGetters({
      // menuList: "menu/list",
      //列表
      roleList: "role/list",
    }),
  },
  mounted() {
  if(this.roleList.length==0){
    this.reqRoleListAction()
  }
  },
};
</script>
<style scoped>

</style>