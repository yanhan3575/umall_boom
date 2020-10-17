import axios  from "axios"
import qs from "qs"
import Vue from "vue"
//后台开发环境下使用
Vue.prototype.$imgPre="http://localhost:3000"
//变量
let boom="/api";
//响应拦截
axios.interceptors.response.use(res=>{
   console.group("=====本次请求的路径是:"+res.config.url)
   console.log(res);
   console.groupEnd();
   return res;
})
//添加
export const reqMenuAdd=(params)=>{
   return axios({
       url:boom+"/api/menuadd",
       method:"post",  
       data:qs.stringify(params)
   })
}
//列表
export const reqMenuList=()=>{
   return axios({
       url:boom+"/api/menulist",
       method:"get",
       params:{
          istree:true  
       }
   })
}
//删除
export const reqMenuDel=(id)=>{
   return axios({
       url:boom+"/api/menudelete",
       method:"post",
       data:qs.stringify({id:id})
   })
}
//第一条菜单
export const reqMenuDetail=(id)=>{
   return axios({
       url:boom+"/api/menuinfo",
       method:"get",
       params:{
          id:id
       }
   })
}
//修改
export const reqMenuBbup=(params)=>{
   return axios({
       url:boom+"/api/menuedit",
       method:"post",
       data:qs.stringify(params)
   })
}
/////////////////商品分类列表///////////////
//添加
export const reqMenuCateadd=(params)=>{
   let data=new FormData()
   for(let i in params){
      data.append(i,params[i])
   }
   return axios({
       url:boom+"/api/cateadd",
       method:"post",  
       data:data
   })
}
//列表
export const reqMenuCatelist=(params)=>{
   return axios({
       url:boom+"/api/catelist",
       method:"get",
       params:params
   })
}
//第一条菜单
export const reqMenuCateinfo=(id)=>{
   return axios({
       url:boom+"/api/cateinfo",
       method:"get",
       params:{
          id:id
       }
   })
}
//修改
export const reqMenuCateedit=(params)=>{
   let data=new FormData()
   for(let i in params){
      data.append(i,params[i])
   }
   return axios({
       url:boom+"/api/cateedit",
       method:"post",
       data:data
   })
}
//删除
export const reqMenuCatedelete=(id)=>{
   return axios({
       url:boom+"/api/catedelete",
       method:"post",
       data:qs.stringify({id:id})
   })
}
//////////////////商品规格//////////
//添加
export const reqSpecsAdd=(params)=>{
   return axios({
       url:boom+"/api/specsadd",
       method:"post",  
       data:qs.stringify(params)
   })
}
//商品规格总数
export const reqSpecscount=()=>{
   return axios({
       url:boom+"/api/specscount",
      
   })
}
//商品规格列表
export const reqSpecslist=(params)=>{
   return axios({
       url:boom+"/api/specslist",
       method:"get",
       params:params
   })
}
//商品规格获取
export const reqSpecsinfo=(id)=>{
   return axios({
       url:boom+"/api/specsinfo",
       method:"get",
       params:{
          id:id
       }
   })
}
//修改
export const reqSpecsedit=(params)=>{
   return axios({
       url:boom+"/api/specsedit",
       method:"post",
       data:qs.stringify(params)
   })
}
//删除
export const reqSpecsdelete=(id)=>{
   return axios({
       url:boom+"/api/specsdelete",
       method:"post",
       data:qs.stringify({id:id})
   })
}
//////////////////商品管理//////////
//添加
export const reqGoodsAdd=(params)=>{
   let data=new FormData()
   for(let i in params){
      data.append(i,params[i])
   }
   return axios({
       url:boom+"/api/goodsadd",
       method:"post",  
       data:data
   })
}
// //商品总数
export const reqGoodscount=()=>{
   return axios({
       url:boom+"/api/goodslist",
      
   })
}
// //商品列表
export const reqGoodslist=(params)=>{
   return axios({
       url:boom+"/api/goodslist",
       method:"get",
       params:params
   })
}
// //商品获取详情
export const reqGoodsinfo=(id)=>{
   return axios({
       url:boom+"/api/goodsinfo",
       method:"get",
       params:{
          id:id
       }
   })
}
// //修改
export const reqGoodsedit=(params)=>{
   let data=new FormData()
   for(let i in params){
      data.append(i,params[i])
   }
   return axios({
       url:boom+"/api/goodsedit",
       method:"post",
       data:data
   })
}
// //删除
export const reqGoodsdelete=(id)=>{
   return axios({
       url:boom+"/api/goodsdelete",
       method:"post",
       data:qs.stringify({id:id})
   })
}
/////////轮播图管理////////////////
//添加
export const reqBannerAdd=(params)=>{
   let data=new FormData()
   for(let i in params){
      data.append(i,params[i])
   }
   return axios({
       url:boom+"/api/banneradd",
       method:"post",  
       data:data
   })
}
// //列表
export const reqBannerlist=(params)=>{
   return axios({
       url:boom+"/api/bannerlist",
       method:"get",
       params:params
   })
}
// //获取详情
export const reqBannerinfo=(id)=>{
   return axios({
       url:boom+"/api/bannerinfo",
       method:"get",
       params:{
          id:id
       }
   })
}
// //修改
export const reqBanneredit=(params)=>{
   let data=new FormData()
   for(let i in params){
      data.append(i,params[i])
   }
   return axios({
       url:boom+"/api/banneredit",
       method:"post",
       data:data
   })
}
// //删除
export const reqBannerdelete=(id)=>{
   return axios({
       url:boom+"/api/bannerdelete",
       method:"post",
       data:qs.stringify({id:id})
   })
}
//////////角色管理//////////////
//添加
export const reqRoleAdd=(params)=>{
   return axios({
       url:boom+"/api/roleadd",
       method:"post",  
       data:qs.stringify(params)
   })
}
// //列表
export const reqRolelist=(params)=>{
   return axios({
       url:boom+"/api/rolelist",
       method:"get",
       params:params
   })
}
// //获取详情
export const reqRoleinfo=(id)=>{
   return axios({
       url:boom+"/api/roleinfo",
       method:"get",
       params:{
          id:id
       }
   })
}
// //修改
export const reqRoleedit=(params)=>{
   return axios({
       url:boom+"/api/roleedit",
       method:"post",
       data:qs.stringify(params)
   })
}
// //删除
export const reqRoledelete=(id)=>{
   return axios({
       url:boom+"/api/roledelete",
       method:"post",
       data:qs.stringify({id:id})
   })
}
/////////管理员//////////////
//添加
export const reqUseradd=(params)=>{
   return axios({
       url:boom+"/api/useradd",
       method:"post",  
       data:qs.stringify(params)
   })
}
//总数
export const reqUsercount=()=>{
   return axios({
       url:boom+"/api/usercount",
   })
}
// //列表
export const reqUserlist=(params)=>{
   return axios({
       url:boom+"/api/userlist",
       method:"get",
       params:params
   })
}
// //获取详情
export const reqUserinfo=(uid)=>{
   return axios({
       url:boom+"/api/userinfo",
       method:"get",
       params:{
          uid:uid
       }
   })
}
// //修改
export const reqUseredit=(params)=>{
   return axios({
       url:boom+"/api/useredit",
       method:"post",
       data:qs.stringify(params)
   })
}
// //删除
export const reqUserdelete=(uid)=>{
   return axios({
       url:boom+"/api/userdelete",
       method:"post",
       data:qs.stringify({uid:uid})
   })
}
///////会员 ///////////////
// //列表
export const reqMemberlist=()=>{
   return axios({
       url:boom+"/api/memberlist",
      
   })
}
// //获取详情
export const reqMemberinfo=(uid)=>{
   return axios({
       url:boom+"/api/memberinfo",
       method:"get",
       params:{
          uid:uid
       }
   })
}
// //修改
export const reqMemberedit=(params)=>{
   return axios({
       url:boom+"/api/memberedit",
       method:"post",
       data:qs.stringify(params)
   })
}
////////////////秒杀//////////////////
//添加
export const reqSeckadd=(params)=>{
   return axios({
       url:boom+"/api/seckadd",
       method:"post",  
       data:qs.stringify(params)
   })
}
// //列表
export const reqSecklist=()=>{
   return axios({
       url:boom+"/api/secklist",
       
      
   })
}
// //获取详情
export const reqSeckinfo=(id)=>{
   return axios({
       url:boom+"/api/seckinfo",
       method:"get",
       params:{
          id:id
       }
   })
}
// //修改
export const reqSeckedit=(id)=>{
   return axios({
       url:boom+"/api/seckedit",
       method:"post",
       data:qs.stringify(id)
   })
}
// //删除
export const reqSeckdelete=(id)=>{
   return axios({
       url:boom+"/api/seckdelete",
       method:"post",
       data:qs.stringify({id})
   })
}