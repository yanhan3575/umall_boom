<template>
  <div>
    <el-dialog
      @closed="close"
      :title="info.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限">
          <div class="block">
           
            <el-date-picker
              v-model="app"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="changlist">
            <el-option label="请选择" value=""></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value=""></el-option>
            <el-option
              v-for="item in bba"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid" >
            <el-option label="请选择" value=""></el-option>
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { bigbang } from "../../../router/index";
import {
  reqMenuCatelist,
  reqSecklist,
  reqSeckadd,
  reqSeckedit,
  reqSeckinfo,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
     
      bba: [],
      app: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      //商品分类
      reqCateList: "cate/reqListAction",

      //goods list
      reqListAction: "goods/reqListAction",

      reqseckListAction: "seck/reqListAction",
    }),
    //二级分类
    changlist() {
      this.form.second_cateid = "";
      reqMenuCatelist({ pid: this.form.first_cateid }).then((res) => {
        this.bba = res.data.list;
      });
    },
    del() {
      this.info.isshow = false;
    },
    //数据重置
    empty() {
      this.bba= [],
      this.app= [],
      this.form = {
        first_cateid: "",
        second_cateid: "",
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
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
      console.log('22',this.app)
      this.form.begintime = this.app[0].getTime();
      this.form.endtime = this.app[1].getTime();
      reqSeckadd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);
          //数据重置
          this.empty();
          //弹框消失
          this.del();
          this.reqseckListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取菜单详情
    //获取菜单详情 （1条）
    look(id) {
      //发请求
      reqSeckinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //弹窗消失
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //修改
    bbup() {
      console.log(this.form);
      reqSeckedit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.del();
          this.reqseckListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },

  computed: {
    ...mapGetters({
      //商品秒杀
      seckList: "seck/list",
      //商品分类list
      cateList: "cate/list",

      //商品管理
      goodsList: "goods/list",
    }),
  },
  mounted() {
    // 如果商品分类没有请求过,就再请求一次
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
    //商品管理
    if (this.goodsList.length == 0) {
      this.reqListAction();
    }

    //商品秒杀
    if (this.seckList.length == 0) {
      this.reqseckListAction();
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