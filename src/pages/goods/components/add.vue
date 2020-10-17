<template>
  <div>
    <el-dialog
      @closed="close"
      :title="info.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类" >
          <el-select v-model="form.first_cateid" @change="changlist">
            <el-option label="请选择" value="" ></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" >
            <el-option label="请选择" value="" ></el-option>
           <el-option v-for="item in bba" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              v-if="info.isshow"
              class="my-input"
              type="file"
              @change="getFile"
            />
          </div>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change="changespecs">
            <el-option label="请选择" value=""></el-option>
            <el-option :label="item.specsname" :value="item.id" v-for="item in specsList" :key="item.id"></el-option>
            
           
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="item in aab" :key="item" :label="item" :value="item"></el-option>
           
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <textarea v-model="form.description" cols="30" rows="10"></textarea>
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
import {reqMenuCatelist,reqSpecslist,reqGoodsAdd,reqGoodsedit,reqGoodsinfo} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //图片
      imgUrl:"",
      //二级分类列表
      aab:[],
      bba:[],
       form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的 '[]',所以 记得在请求前 转换格式
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqListAction",
      //商品规格
      reqSpecslist:"specs/reqListAction",
       //goods list
      reqListAction: "goods/reqListAction",
    }),
    //二级分类
    changlist(){
      this.form.second_cateid=""
       reqMenuCatelist({pid:this.form.first_cateid}).then((res)=>{
         this.bba = res.data.list
    
       })
    },
    //二级分类规格
    changespecs(){
      this.form.specsattr=""
      let obj=this.specsList.find((item)=> item.id== this.form.specsid);
      this.aab=obj.attrs

        
       
    },
    //图片
    getFile(e){
      let imgg=e.target.files[0];
      console.log(imgg)
      //图片大小不超过2M
      if(imgg.size>2*1024*1024){
         warningAlert("图片不能超过2M");
         return;
      }
      
      //2.是图片
      let imgExtArr=['.jpg','.png','.jpeg','.gif'];
      let extname=imgg.name.slice(imgg.name.lastIndexOf("."));//'.jpg'
      if(!imgExtArr.some(item=>item==extname)){
        warningAlert("文件格式不正确")
        return;
      }
      
      this.imgUrl=URL.createObjectURL(imgg);
      //文件保存在form.img上
      this.form.img=imgg
    },
    del() {
      this.info.isshow = false;
    },
    //数据重置
    empty() {
      this.imgUrl="",
      //二级分类列表
      this.aab=[],
      this.bba=[],
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "[]", //后端要的 '[]',所以 记得在请求前 转换格式
        isnew: 1,
        ishot: 1,
        status: 1,
      };
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
      console.log(this.form);
      let data={
        ...this.form,
        specsattr:JSON.stringify(this.form.specsattr)
      }
      reqGoodsAdd(data).then((res) => {
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
      reqGoodsinfo(id).then((res) => {
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
      // console.log(this.form);
     reqGoodsedit(this.form).then((res)=>{
       
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
      //商品分类list
      cateList: "cate/list",
      //商品规格
      specsList:"specs/list"
    }),
  },
  mounted() {
    //如果商品分类没有请求过,就再请求一次
    if(this.cateList.length == 0){
      this.reqCateList()
    }
    //商品规格
     if(this.specsList.length == 0){
      this.reqSpecslist()
    }
  },
};
</script>
<style scoped>
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}
.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}
.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}
.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>