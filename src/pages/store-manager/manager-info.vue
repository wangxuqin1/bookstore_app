<template>
  <div>
    <div class="user">
      <img :src="getUser.userImg" >
      <span>{{getUser.userName}}</span>
    </div>
    <div class="store-info">
      <div class="store-name">
        <img src="@/assets/u919.png">
        <span>门店：{{getUser.storeName}}</span>
      </div>
      <div class="invite-code">
        <div><img src="@/assets/u1265.png"></div>
        <div><span>邀请码：{{getUser.invCode}}</span></div>
      </div>
      <div class="store-addrerss">
        <div><img src="@/assets/u295.png"></div>
        <div><span>{{getUser.address}}</span></div>
      </div>
    </div>
    <div class="last">
      <div class="update-psw" @click="toPage('/manager-change-password')">
        <img class="update" src="@/assets/u666.png">
        <span>修改密码</span>
        <img class="right" src="../../assets/右.png">
      </div>
       <div class="login-out" @click="loginOut">
        <img class="out" src="@/assets/u675.png">
        <span>退出登录</span>
        <img class="right2" src="../../assets/右.png">
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/store-manager-order.js'
export default {
  name: 'mine',
  data () {
    return {
      getUser: {}
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    toPage (data) {
      this.$router.push({path: data})
    },
    getUserInfo () {
      req('getPersonalInfo', {}).then(data => {
        this.getUser = data.data
        console.log('显示司机信息',data)
      })
    },
    loginOut () {
      sessionStorage.clear('userInfo')
      sessionStorage.clear('roleInfo')
      sessionStorage.clear('currentComm')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
    position: relative;
    width: 100%;
    height: 150px;
    background: rgb(240, 92, 58);
  
    img {
      position: absolute;
      width: 65px;
      height: 65px;
      border-radius: 50%;
      top: 40%;
      left: 50%;
      transform:translate(-50%,-50%);
    }
    span {
      position: absolute;
      top: 75%;
      left: 50%;
      transform:translate(-50%,-50%);
      color: white;
      font-size: 20px;
    }
  }
  .store-info {
    position: relative;
    //width: 100%;
    height: 140px;
    background-color: rgba(242, 242, 242, 1);
    font-size: 15px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    //padding: 15px 18px;
    .store-name {
      position: relative;
      top: 20px;
      margin-left: 20px;
    }
    .store-name img {
      position: absolute;
    }
    .store-name span {
      position: absolute;
      left: 35px;
      top: 2px;
    } 
     .invite-code img {
      position: absolute;
      top: 53px;
      left: 23px;
    }
    .invite-code span {
      position: absolute;
      left: 50px;
      top: 52px;
    }
     .store-addrerss img {
      position: absolute;
      top: 85px;
      left: 18px;
    }
    .store-addrerss span {
      position: absolute;
      left: 50px;
      top: 87px;
    }
  }
  .last {
    position: relative;
    //width: 100%;
    height: 100px;
    font-size: 15px;
    top: 10px;
    
    .update-psw,.login-out {
      position: relative;
      //width: 100%;
      height: 55px;
      line-height: 35px;
      border-radius: 8px;
      margin-top: 15px;
      background-color: rgba(242, 242, 242, 1);
    }
    .update-psw .update,.login-out .out {
      width: 25px;
      height: 25px;
      left: 20px;
    }
    .update-psw span,.login-out span {
      position: absolute;
      left: 60px;
      top: 11px;
      font-size: 18px;
    } 
    .update-psw .update,.login-out .out {
      position: absolute;
      top: 15px;
    }
    .update-psw .right,.login-out .right2 {
      position: absolute;
      top: 18px;
      left: 360px;
    }
  }
</style>
