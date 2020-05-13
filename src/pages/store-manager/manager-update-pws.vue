<template>
  <div>
    <div class="pwd-con">
      <el-form ref="form" :model="password" :rules="formRules" inline label-width="100px" label-position="left">
      <el-form-item label="原密码" class="pwd-item" prop="pws1">
        <input v-model="password.pws1" type="password" placeholder="请输入原密码">
      </el-form-item>
      <el-form-item label="新密码" class="pwd-item" prop="pws2">
        <input v-model="password.pws2" type="password" placeholder="请输入新密码">
      </el-form-item>
      <el-form-item label="确认新密码" class="pwd-item" prop="pws3">
        <input v-model="password.pws3" type="password" placeholder="请再次输入新密码">
      </el-form-item>
       <!-- <div class="pwd-item" prop="pws2">
        <div class="item-left">确认密码</div>
        <input v-model="password.pws2" type="text" placeholder="请输入新密码">
      </div>
      <div class="pwd-item" prop="pws3">
        <div class="item-left">新密码</div>
        <input v-model="password.pws3" type="text" placeholder="请再次输入新密码">
      </div> -->
       </el-form>
    </div>
    
    <div @click="changepsw" class="btn">
        <img src="../../assets/按钮.png" >
        <span>确认</span>
    </div>
  </div>
</template>

<script>
import req from '@/api/change-password.js'
export default {
  name: 'change-password',
  data () {
    return {
       conList: [
        {
          label: '原密码',
          placeholder: '请输入原密码'
        }, {
          label: '新密码',
          placeholder: '请输入新密码'
        }, {
          label: '确认新密码',
          placeholder: '请再次输入新密码'
        }
      ],
      password: {
        pws1: '',
        pws2: '',
        pws3: ''
      },
      formRules: {
        pws1: [
          {required: true, message: '请输入原密码', trigger: 'change'}
        ],
        pws2: [
          {required: true, message: '请输入新密码', trigger: 'change'}
        ],
        pws3: [
          {required: true, message: '请再次输入新密码', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    changepsw () {
      console.log('password', this.password)
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.password.pws3 === this.password.pws2) {
            req('updatePassword', {
              password: this.password.pws1,
              newPassword: this.password.pws3
            }).then(data => {
              console.log('修改密码返回数据', data)
              if (data.code === 0) {
                this.$message.success(data.msg)
                sessionStorage.clear('userInfo')
                sessionStorage.clear('roleInfo')
                sessionStorage.clear('currentComm')
                this.$router.push('/login')
              } else {
                this.$message.error(data.msg)
              }
            })
          } else {
            this.$message.error('密码与原密码不一致')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .pwd-con {
      width: 95%;
      height: 160px;
      margin: 12px auto;
      background-color: white;
      padding: 12px 24px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border-radius: 8px;
      .pwd-item {
          flex: 1;
          width: 100%;
          display: flex;
          line-height: 45.34px;
          .item-left {
              flex: 1;
              font-size: 17px;
          }
          input {
              flex: 2;
              border: none;
              outline: none;
              font-size: 17px;
              color: rgb(168,168,168);
              &::placeholder {
                  color: rgb(168,168,168);
              }
          }
      }
  }
  .btn {
      width: 300px;
      height: 65px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      bottom: 80px;
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
