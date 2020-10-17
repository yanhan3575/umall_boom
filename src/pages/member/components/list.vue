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
      prop="nickname"
      label="昵称"
     
      width="180">
    </el-table-column>
      <el-table-column
      prop="phone"
      label="手机号"
      
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
     
      
       </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
// import {reqBannerdelete} from "../../../utils/request"
import {successAlert,warningAlert} from "../../../utils/alert"
export default {
props:[],
components:{},
data(){
return{}
},
methods:{
...mapActions({
    reqListAction:"member/reqListAction",  
}),
//编辑
edit(uid){
  this.$emit("edit",uid)
},
//删除
// del(id){

//       this.$confirm("你确定要删除吗？", "删除提示", {
//         confirmButtonText: "删除",
//         cancelButtonText: "取消",
//         type: "warning",
//       }).then(()=>{
//        reqBannerdelete(id).then(res=>{
//        if(res.data.code==200){
//           successAlert(res.data.msg)
//           this.reqListAction()
//        }else{ 
//           warningAlert(res.data.msg)
//        }
//        })
//       })
//          .catch(() => {
//           this.$message({
//             type: "info",
//             message: "已取消删除",
//           });
//         });
//     },
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
    list:"member/list"
})

},
 mounted(){
     this.reqListAction()
}
}
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>