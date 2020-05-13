<template>
  <div>
    <!-- <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div> -->

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <el-form ref="form" :model="formData" :rules="formRules" inline label-width="75px" label-position="left">
      <el-row>
        <el-form-item label="用户名" prop="userAccount">
        <el-input v-model="formData.userAccount" placeholder="请输入用户名"></el-input>
      </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="密 码"  prop="password">
        <el-input class="pwd1" type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      </el-row>
      <el-form-item label="确认密码" label-width="80px" prop="confirmpassword">
        <el-input class="pwd2" type="password" v-model="formData.confirmpassword" placeholder="请输入确认密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="姓 名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item prop="sex" style="width: 100%;text-align: left;padding-left:68px;" label="性别">
        <el-radio-group fill="#deb683" text-color="#deb683" v-model="formData.sex" style="">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item  label="身份证" prop="idCard">
        <el-input v-model="formData.idCard" placeholder="请输入身份证"></el-input>
      </el-form-item>
      <el-form-item label="邮 箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label=" 邀请码" prop="invCode">
        <el-input v-model="formData.invCode" placeholder="请输入邀请码"></el-input>
      </el-form-item>
      <!-- <el-form-item label="上传图片" ref="uploadElement" prop="imageUrl">
              <el-input v-model="this.getDataCode[0].image">{{this.getDataCode[0].image}}</el-input>
        <input id="file" type="file" @change="inputChange($event)"/>
      </el-form-item> -->
      <el-form-item label="上传图片" style="width: 100%;text-align: left; padding-left:65px; margin-top:10px" ref="uploadElement" prop="imageUrl">
        <div class="a-upload">
          <input id="file" type="file" @change="inputChange($event)"/>点击上传
        </div>
        <el-image
          v-show="isDisplay"
          style="width: 40px; height: 40px;border-radius:50%; display: inline-block; margin-left=20px"
          :src="formData.userImg"
          v-model="formData.userImg"
        >
        </el-image>
      </el-form-item>

      <!-- <el-form-item> -->
        <!-- <el-button  @click="register" class="register-btn" type="primary">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button> -->
      <!-- </el-form-item> -->
    </el-form>
    <div @click="register" class="btn">
        <img src="../assets/按钮.png" >
        <span>注&nbsp;&nbsp;&nbsp;&nbsp;册</span>
    </div>
    <div class="toLogin">
      <router-link to="/login" style="color:#666">返回登录</router-link>
    </div>
  </div>
</template>

<script>
import req from '@/api/register.js'
import axios from 'axios'
import qs from 'qs'
import imgFile from '@/components/common/i-file.vue'
export default {
  name: 'register',
  components: {
    imgFile
  },
  data () {
    return {
      imageUrls: '',
      isDisplay: false,
      formData: {
        userAccount: '',
        password: '',
        phone: '',
        name: '',
        sex: '',
        email: '',
        idCard: '',
        invCode: '',
      },
       formRules: {
        userAccount: [
          {required: true, message: '请输入用户账号', trigger: 'change'}
        ],
        password: [
          {required: true, message: '请输入用户密码', trigger: 'change'}
        ],
        confirmpassword: [
          {required: true, message: '请确认密码', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'change'},
        ],
        name: [
          {required: true, message: '请输入用户名称', trigger: 'change'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ]
        // idCard: [
        //   {required: true, message: '请输入身份证', trigger: 'change'},
        //   // { validator: this.validateIdCard, trigger: 'change' }
        // ],
        // email: [
        //   {required: true, message: '请输入用户邮箱', trigger: 'change'}
        // ]
      }
    }
  },
  methods: {
     inputChange (event) {
      let form = new FormData()
      let file = document.getElementById('file').files[0]
      console.log('files', file)
      form.append('file', file, file.name)
      //form.append('access_token', JSON.parse(sessionStorage.getItem('userInfo')).access_token)
      axios({
        method: 'post',
        url: 'http://p2991w6815.oicp.vip/app/image/upload',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(data => {
        //console.log('data的值', data)
        console.log('图片信息', data)
        if (data.data.code === 0) {
          this.imageUrls = data.data.data
          // this.$message.success(data.msg)
          console.log('图片路径', this.imageUrls)
          if (this.imageUrls) {
            this.formData.userImg = this.imageUrls
            console.log('图片路径', this.formData.userImg)
            this.isDisplay = true
          } else {
            this.isDisplay = false
          }
        } else {
          this.$message.error(data.msg)
        }
      }).catch(data => {
        console.log('上传成功',data)
      })
    },
    register () {
        this.$refs.form.validate(valid => {
        if (valid) {
          console.log('this.formData.passassword === this.formData.confirmpassword', this.formData.passassword === this.formData.confirmpassword)
          console.log('this.formData.passassword', this.formData.passassword)
          console.log(' this.formData.confirmpassword', this.formData.confirmpassword)
          if (this.formData.password !== this.formData.confirmpassword) {
            this.$message.info('两次输入的密码不一致')
            return
          }
          var phone = this.$refs.form.model.phone
          var phone2 = /^1[3|4|5|7|8]\d{9}$/
          var idCard = this.$refs.form.model.idCard
          var idCard2 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          var email = this.$refs.form.model.email
          var email2 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          var p = 1
          var i = 1
          var e = 1
          console.log('phone.length', phone.length)
          console.log('idCard.length', idCard.length)
          console.log('this.$refs.form', this.$refs.form)
          if (phone) {
            if (phone2.test(phone) && phone.length === 11) {
              p = 1
            } else {
              this.$message.error('手机格式错误,请重新输入')
              p = 0
            }
          }
          if (idCard) {
            if (idCard2.test(idCard) && idCard.length === 18) {
              i = 1
            } else {
              i = 0
              this.$message.error('身份证格式错误,请重新输入')
            }
          }
          if (email) {
            if (email2.test(email)) {
              e = 1
            } else {
              this.$message.error('邮箱格式错误,请重新输入')
              e = 0
            }
          }
          if (i && p && e) {
            console.log('this.imageUrls', this.imageUrls)
          console.log('this.formData', this.formData)
          axios({
            method: 'post',
            url: 'http://p2991w6815.oicp.vip/app/customer/index/addCustomer',
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            if (data.data.code === 0) {
              this.$message({
                type: 'success',
                message: data.data.msg
              })

              // this.getHeader(data.data.data.access_token)

              // sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))

              setTimeout(() => {
                this.$router.push({path: '/login'})
              })
            } else {
              this.$message({
                type: 'error',
                message: data.data.msg
              })
            }
          })
          }
          //this.formData.userImg = this.imageUrls
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  background: #ddd;
  line-height: 50px;
  text-align: center;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: #409EFF;
  }
}

.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 20px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
}

.register-btn {
  width: 150px;
  height: 40px;
  margin-top: 20px;
}
.btn {
  width: 300px;
  height: 65px;
  position: absolute;
  left: 50%;
  margin-left: -150px;
  bottom: 90px;
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
.a-upload {
  padding: 4px 10px;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  // color: #888;
  color: white;
  // background: #fafafa;
  background: rgb(222, 182, 131);
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1
}
.a-upload  input {
  position: absolute;
  font-size: 12px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer
}
.el-radio__input /deep/ .is-checked+ .el-radio__label {
    color: #deb683 !important;
}
.el-radio__input.is-checked /deep/ .el-radio__inner {
    border-color: #deb683 !important;
    /* background: #409EFF; */
    background: #deb683  !important;
}
// .radio-item /deep/ .el-radio__inner {
//     background: #999;
//     border-color: #999;
//   }
//   .radio-item /deep/ .el-radio__label {
//     color: #999;
//   }
.toLogin {
  position: absolute;
  bottom: 60px;
  right: 20px;
  font-size: 14px;
}
</style>
