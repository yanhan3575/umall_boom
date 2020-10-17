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
      label="用户编号"
      
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
     
      width="180">
    </el-table-column>
    <el-table-column
      prop="rolename"
      label="所属角色"
      
      width="180">
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
      <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
      <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
      
       </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination background layout="prev,pager,next" :total="total" :page-size="size" @current-change="changePage"></el-pagination>
</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import {reqUserdelete} from "../../../utils/request"
import {successAlert,warningAlert} from "../../../utils/alert"
export default {
props:[],
components:{},
data(){
return{}
},
methods:{
...mapActions({
  //仓库list
    reqListAction:"manage/reqListAction",
    //仓库总数  
    reqTotalAction:"manage/reqTotalAction",
    //获取仓库页码
    reqPageAction:"manage/reqPageAction"
}),
//编辑
edit(id){
  this.$emit("edit",id)
},
//删除
del(uid){

      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
       reqUserdelete(uid).then(res=>{
       if(res.data.code==200){
          successAlert(res.data.msg)
          this.reqListAction()
          //重新获取总数
          this.reqTotalAction()
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
    //页码
    changePage(e){
      // console.log(e)
      this.reqPageAction(e)
    }
    // 删除2
    // dele(id){
    //     reqMenuDel(id).then(res=>{
    //    if(res.data.code==200){
    //       successAlert(res.data.msg)
    //       this.reqListAction()
    //    }else{ 
    //       warningAlert(res.data.msg)
    //    }
    //    })
    // }
},
computed:{
...mapGetters({
    list:"manage/list",
    //仓库取size
    size:"manage/size",
    //仓库取总数
    total:"manage/total"
})

},
 mounted(){
   //获取列表
     this.reqListAction()
     //获取总数
     this.reqTotalAction()
}
}
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>