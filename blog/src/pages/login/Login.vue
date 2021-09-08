<template>
  <div class="login">
    <div class="login-box">
      <div class="blog-title">
        <h2>Bibooo博客后台管理系统</h2>
      </div>
      <div class="login-screen">
        <h2>用户登录</h2>
        <div class="input-box">
          <el-input style=" padding-top=20px;" v-model="data.username" type="text" placeholder="請输入用户名"></el-input>
          <el-input placeholder="請输入密码" v-model="data.password" show-password></el-input>
        </div>
        <div class="login-denglu">
          <el-button size="medium" @click="login" round type="primary">登录</el-button>
        </div>
        <el-button v-show="false" :plain="true" @click="open2"></el-button>
        <el-button v-show="false" :plain="true" @click="open4">错误</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index'
  import "../components/common/canvas";
  import store from '../components/common/store'
  import router from '../components/common/router'
  import { Message } from 'element-ui';
  export default {
    name: "Login",
    data() {
      return {
        data: {
          username: "",
          password: "",
        },
        person: "",
        usermessage: ''
      };
    },
    async mounted() {
      let token = localStorage.getItem('token')
      let result = await api.getPersonal(token)
  
      setTimeout(() => {
        if (result == 'token无效') {
        } else {
          this.open2()
          if (result.isUser) {
          this.person = result.isUser
        } else {
          this.person = result
        }
        sessionStorage.setItem('person', JSON.stringify(this.person))
          this.$router.push({ path: '/backstage/essay'})
          // this.$router.push({ name: 'backstage', params: { user: result } })
        }
      }, 3000)

    },
    methods: {
      async login() {
        let result = await api.getLogin(this.data)
        console.log(result)
        if (result.isUser) {
          this.person = result.isUser
        } else {
          this.person = result
        }
        sessionStorage.setItem('person', JSON.stringify(this.person))
      
        this.usermessage = result
        if (result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user_name', result.isUser.username);
          this.$router.push({ path: '/backstage/essay'})
          // this.$router.push({ name: 'backstage', params: { user: result } })
        } else {
          this.open4()
        }
      },
      open2() {
        // console.log(Vue)
        this.$message({
          message: '检测到已登录,为你跳转',
          type: 'success'
        });
      },
      open4() {
        $message.error(this.usermessage);
      }

    }
  };
</script>


<style scoped lang="scss">
  .login {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("../../assets/img/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;

    background-color: black;

    .login-box {
      width: 750px;
      height: 400px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -375px;
      margin-top: -200px;
      // border: 1px solid pink;
      display: flex;
      flex-direction: column;
      align-items: center;

      @media screen and (max-width: 770px) {
        width: 90%;
        position: absolute;
        top: 30%;
        left: 3%;

        margin: 0 auto;
      }

      .el-input {
        margin: 10px;
      }
    }

    .blog-title {
      margin-top: 20px;

      h2 {
        color: #fff;
        text-align: center;
      }
    }

    .input-box {
      padding-top: 20px;
    }

    .login-screen {
      margin-top: 20px;

      h2 {
        color: #3c5891;
        text-align: center;
      }
    }

    .login-denglu {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }

</style>
