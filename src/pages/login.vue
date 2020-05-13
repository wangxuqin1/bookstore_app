<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form ref="form" :model="formData" :rules="formRules"  inline label-width="65px" label-position="left">
      <el-form-item label="用户名" prop="username">
        <el-input class="userinput" v-model="formData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <router-link to="/register" style="color:#666">我要注册</router-link>
    </div>
    <div @click="login" class="btn">
        <img src="../assets/按钮.png" >
        <span>登&nbsp;&nbsp;&nbsp;&nbsp;录</span>
    </div>
    <!-- <el-button @click="login" class="login-btn" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button> -->
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import req from '@/api/getRole.js'
export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'change'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    login () {
      console.log('this.formData',this.formData)
      this.$refs.form.validate(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://p2991w6815.oicp.vip/uaa/auth/form',
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            console.log(data)
            if (data.data.code === 0) {
              this.$message.success(data.data.msg)
              console.log('data.data.data', data.data.data)
              sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
              this.getRoleInfo()
            } else {
              this.$message.error(data.data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    getRoleInfo () {
      req('getPersonalInfo', {
      }).then(data => {
        console.log('获取角色信息', data)
        sessionStorage.setItem('roleInfo', JSON.stringify(data.data))
        if(data.data.role === 3) {
          this.$router.push({path: '/home'})
        } else if (data.data.role === 2) {
          this.$router.push({path: '/manager-order-list'})
        } else if (data.data.role === 4) {
          this.$router.push({path: '/store-manager'})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 80%;
  margin: 0 auto;

  img {
    margin-top: 20px;
    width: 100%;
  }
}

.el-form {
  margin-top: 100px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
}
.register-btn {
  font-size: 14px;
  text-align: right;
  margin-right: 50px;
  // color: red;
  text-decoration: none;
}

.login-btn {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 40px;
}
.btn {
      width: 300px;
      height: 65px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      bottom: 250px;
      img {
          width: 100%;
      }
      span {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -14.4px;
          margin-left: -22px;
      }
  }
</style>
