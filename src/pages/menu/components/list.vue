<template>
<div>
<el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children'}">
    <el-table-column
      prop="id"
      label="菜单编号"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="菜单名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      label="菜单图标">
      <template slot-scope="scope">
        <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column
      prop="url"
      label="地址">
    </el-table-column>
    <el-table-column
      label="状态">
       <template slot-scope="scope">
      <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
      <el-button type="primary" v-else>禁用</el-button>
       </template>
    </el-table-column>
    <el-table-column
      label="操作"> 
      <template slot-scope="scope">
      <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
      <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      <del-btn @confirm="dele(scope.row.id)"></del-btn>
       </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import {reqMenuDel} from "../../../utils/request"
import {successAlert,warningAlert} from "../../../utils/alert"
export default {
props:[],
components:{},
data(){
return{}
},
methods:{
...mapActions({
    reqListAction:"menu/reqListAction",  
}),
//编辑
edit(id){
  this.$emit("edit",id)
},
//删除
del(id){
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
       reqMenuDel(id).then(res=>{
       if(res.data.code==200){
          successAlert(res.data.msg)
          this.reqListAction()
       }else{ 
          warningAlert(res.data.msg)
       }
       })
      })
         .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除2
    dele(id){
        reqMenuDel(id).then(res=>{
       if(res.data.code==200){
          successAlert(res.data.msg)
          this.reqListAction()
       }else{ 
          warningAlert(res.data.msg)
       }
       })
    }
},
computed:{
...mapGetters({
    list:"menu/list"
})

},
 mounted(){
     this.reqListAction()
}
}
</script>
<style scoped>
</style>