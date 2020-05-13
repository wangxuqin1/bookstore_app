<template>
  <div>
    <div class="content">
        <div class="con-left">新邀请码</div>
        <input v-model="code" type="" placeholder="请输入6位的邀请码">
    </div>
    <div class="btn" @click="updateInvCode">
        <img src="../../assets/按钮.png" >
        <span>确认</span>
    </div>
  </div>
</template>

<script>
import req from '@/api/change-store-code.js'
export default {
  name: 'change-store-code',
  data () {
    return {
      code: ''
    }
  },
  mounted () {
    
  },
  methods: {
    
    updateInvCode () {
      if (this.code.length === 6) {
        console.log(' this.code', this.code)
        req('updateInvCode',{
          invCode: this.code
        }).then(data => {
          if (data.code === 0) {
            this.$message.success(data.msg)
          } else {
            this.$message.error(data.msg)
          }
          console.log('邀请码返回数据', data)
        })
      } else {
        this.$message.error('验证码格式错误，请重新输入')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
      width: 95%;
      margin: 12px auto;
      background-color: white;
      display: flex;
      border-radius: 8px;
      font-size: 17px;
      .con-left {
          flex: 1;
          line-height: 90px;
          text-align: center;
      }
      input {
          flex: 2;
          line-height: 90px;
          border: none;
          outline: none;
          padding-left: 20px;
          box-sizing: border-box;
          font-size: 17px;
          color: rgb(168,168,168);
          &::placeholder {
              color: rgb(168,168,168)
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
