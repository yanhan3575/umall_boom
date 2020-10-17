<template>
  <div class="login">
    <div class="box">
      <div class="box1">
        <h1>登陆</h1>
      </div>
      <div class="box2">
        <el-input clearable placeholder="请输入用户名" style="width:300px" v-model="input"></el-input>
      </div>
      <div class="box2">
        <el-input placeholder="请输入密码" show-password style="width:300px" v-model="inputs"></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" style="width:300px;margin-top:20px" @click="login()">登陆</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      input:"",
      inputs:""
    }
  },
  methods:{
    //登陆
    login(){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.login{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right,#553443,#303D60);
  position: relative;
}
.box{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 400px;
  height: 300px;
  background: #fff;
  border-radius: 30px;
}
.box1{
  text-align: center;
  margin-top: 20px;
}
.box2{
  margin-top: 20px;
  text-align: center;
}
.btn{
  text-align: center;
}
</style>