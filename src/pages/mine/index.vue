<template>
  <div>
    <div class="user">
        <div class="img-con">
            <img :src="this.getUser.userImg" >
        </div>
        <div class="text-con">{{this.getUser.userName}}</div>
    </div>
    <div class="content">
        <div
          class="con-item"
          v-for="(item,index) in conList"
          :key="index"
          @click="toPage(item)">
            <div>
                <img :src="item.img1" alt="">
            </div>
            <div><span>{{item.label}}</span></div>
            <div>
                <img :src="item.img2" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {
      conList: [
        {
          img1: require('../../assets/订单.png'),
          label: '我的订单',
          img2: require('../../assets/右.png'),
          toPath: '/order-list'
        }, {
          img1: require('../../assets/修改密码.png'),
          label: '修改密码',
          img2: require('../../assets/右.png'),
          toPath: '/change-password'
        }, {
          img1: require('../../assets/邀请码.png'),
          label: '修改店铺邀请码',
          img2: require('../../assets/右.png'),
          toPath: '/change-store-code'
        }, {
          img1: require('../../assets/退出.png'),
          label: '退出登录',
          img2: require('../../assets/右.png'),
          toPath: '/login'
        }
      ],
      getUser: {}
    }
  },
  mounted () {
    this.userType() 
  },
  methods: {
    toPage (data) {
      this.$router.push({path: data.toPath})
    },
    userType () {
      this.getUser =  JSON.parse(sessionStorage.getItem('roleInfo'))
      console.log('用户信息', this.getUser)
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
      position: relative;
      width: 100%;
      display: flex;
      //margin-bottom: 50px;
      height: 150px;
      background: rgb(240, 92, 58);
      .img-con {
          flex: 1;
          display: flex;
          align-items: center;
          img {
              position: absolute;
              width: 65px;
              height: 65px;
              // position: relative;
              left: 38%;
              border-radius: 50%;
              top: 40%;
              left: 50%;
              transform:translate(-50%,-50%);
          }
      }
      .text-con {
          position: absolute;
          //flex: 2;
          line-height: 105px;
          font-size: 20px;
          color: white;
          top: 75%;
          left: 50%;
          transform:translate(-50%,-50%);
      }
  }
  .content {
      width: 100%;
      height: 240px;
      // padding: 18px 16px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 5px;
      .con-item {
          width: 100%;
          flex: 1;
          display: flex;
          background: #ddd;
          margin-bottom: 10px;
          border-radius: 5px;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 20px;
              img {
                  width: 14px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
                  top: 3px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              margin-right: 20px;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .img-spc {
      width: 15px;
      height: 15px;
  }
</style>
