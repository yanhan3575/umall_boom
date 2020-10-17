<template>
  <div>
    <el-dialog
      @closed="close"
      :title="info.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
         </el-form-item>
        <el-form-item label="上级分类">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级分类"
           
          >
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="">
            <input class="my-input" type="file" @change="urlimg">
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
import { reqMenuCateadd, reqMenuCatelist,reqMenuCateedit,reqMenuCateinfo } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //图片
      imgUrl:"",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction",
    }),
    //图片
    urlimg(e){
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
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl="";
    },
    
    add() {
      // console.log('add',this.form);
      reqMenuCateadd(this.form).then((res) => {
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
      reqMenuCateinfo(id).then((res) => {
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
     reqMenuCateedit(this.form).then((res)=>{
       
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
      list: "cate/list",
    }),
  },
  mounted() {},
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