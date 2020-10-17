<template>
<div>
<el-button type="primary" @click="show">添加</el-button>
<!-- 列表 -->
<v-list @edit="edit"></v-list>
<!-- 表格 -->
<v-add :info="info" ref="add"></v-add>

</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import vAdd from "./components/add"
import vList from "./components/list"
export default {
props:[],
components:{
    vAdd,
    vList
},
data(){
return{
    info:{
        isshow:false,
        isAdd:true
    }
}
},
methods:{
...mapActions,
//编辑
edit(id){
    this.info.isshow=true
     this.info.isAdd=false
     this.$refs.add.look(id)
},
//添加一个按钮
show(){
    this.info.isshow=true
    this.info.isAdd=true
}
},
computed:{
...mapGetters
},
 mounted(){
}
}
</script>
<style scoped>
</style>