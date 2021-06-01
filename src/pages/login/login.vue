<template>
  <div class="login">
    <div class="con">
      <h3 class="center">登录</h3>
      {{user}}
      <div class="input">
        <el-input v-model="user.username"></el-input>
      </div>
      <div class="input">
        <el-input v-model="user.password"></el-input>
      </div>
      <div class="center">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { requserlogin } from '../../request/api';
import {successAlert} from "../../untils/alert"
export default {
  data () {
    return {
     user:{
       username:"admin",
       password:"123456"
     } 
    }
  },
  methods: {
    ...mapActions({
      changeuser:"changeuser"
    }),
    //跳转页面
    login() {
      //验空
      if(this.user.username==""||this.user.password==""){
        errorAlert('输入账号或密码不能为空')
        return
      }
      requserlogin(this.user).then(res=>{
        console.log("1")
        
        if(res.data.code==200){
          //成功
          successAlert(res.data.msg)
          //存储信息
          this.changeuser(res.data.list)
          //跳转页面
          
          this.$router.push("/home");
        }
        
      })
      
    },
  },
};
</script>

<style lang="less" scoped>


@import "../../less/index.less";
.login {
width: 100vw;
height: 100vh;
background: linear-gradient(@primary, @primary2);
position: relative;
}
.con {
width: 300px;
padding: 30px;
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
background: #fff;
border-radius: 10px;
}
.center{
text-align: center;
margin-bottom: 20px;
}
.input{
margin-bottom: 20px;
}
</style>