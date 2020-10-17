<template>
  <div>
    <el-dialog
      @closed="close"
      :title="info.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
         </el-form-item>
        

        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{children: 'children',label: 'title',}"
          >
          </el-tree>
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
import { reqRoleAdd, reqRolelist,reqRoleedit,reqRoleinfo } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return { 
      form: {
        rolename:"",
        menus: '[]',
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqMenuListAction: "menu/reqListAction",
      //列表
      reqRoleListAction: "role/reqListAction",
    }),
    del() {
      this.info.isshow = false;
    },
    //数据重置
    empty() {
      this.form = {
         rolename:"",
        menus: '[]',
        status: 1,
      };
      
    },
    
    add() {
     console.log(this.form);
      // console.log(this.$refs.tree.getCheckedKeys());
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);
          //数据重置
          this.empty();
          //弹框消失
          this.del();
          this.reqRoleListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取菜单详情
   //获取菜单详情 （1条）
    look(id) {
      //发请求
      reqRoleinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
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
     reqRoleedit(this.form).then((res)=>{
       
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
      menuList: "menu/list",
      //列表
      roleList: "role/list",
    }),
  },
  mounted() {
  if(this.menuList.length==0){
    this.reqMenuListAction()
  }
  },
};
</script>
<style scoped>

</style>