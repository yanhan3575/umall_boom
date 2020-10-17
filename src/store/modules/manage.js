import {reqUserlist,reqUsercount} from "../../utils/request"
const state={
    //菜单的list
    list:[],
    //一页的数量
    size:2,
    // 总数
    total:0,
    //页码
    page:1
}
const mutations = {
    //修改list
    changeList(state,arr){
        state.list=arr;
    },
    //修改total
    changeTotal(state,num){
        state.total=num
    },
    changePage(state,page){
        state.page=page
    }
}
const actions = {
    //页面请求
    reqListAction(context){
        //发请求
        reqUserlist({page:context.state.page,size:context.state.size}).then(res=>{
            
            let list = res.data.list?res.data.list:[]
            if(list.length>0 && context.state.page>1 ){
                    context.commit('changePage',context.state.page-1)
            }
            context.commit("changeList",list)
        })
    },
    reqTotalAction(context){
        reqUsercount().then(res=>{
        context.commit("changeTotal",res.data.list[0].total)
        })
    },
    //组件修改页面
     reqPageAction(context,page){
       //修改页面
       context.commit("changePage",page)
       //发起list请求
       context.dispatch("reqListAction")
     }
}
const getters = {
    list(state){
        return state.list
    },
    size(state){
        return state.size
    },
    total(state){
        return state.total
    }

}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}