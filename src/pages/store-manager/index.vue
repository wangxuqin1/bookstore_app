<template>
  <div>
    <div class="search">
      <div class="search-box">
        <img src="@/assets/u770.png" alt="">
        <input type="text" placeholder="请输入搜索关键词">
      </div>
    </div>
    <div v-for="(item, index) in getStore" :key="index">
      <div class="address">
      <div class="order">
        <img src="@/assets/u919.png">
        <span>{{item.storeCode}}</span>
      </div>
      <div class="addres-info">
        <span>门店：{{item.storeName}}</span>
        <span>地址：{{item.address}}</span>
      </div>
    </div>
    <div class="info">
      <span>店长：{{item.userName}}</span>
      <span>手机：{{item.phone}}</span>
    </div>
    </div>
    
  </div>
</template>
<script>
import req from '@/api/store-manager-order.js'
export default {
  name: 'store-manager',
  data () {
    return {
      getStore: {}
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      req('listStoreByPage', {}).then(data => {
        this.getStore = data.data
        console.log('这里是门店信息页面', data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  position: relative;
  margin-top: 5px;
  background-color: rgba(242, 242, 242, 1);
  height: 60px;
  line-height: 60px;
}
.search .search-box img {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 10px;
  z-index: 9;
}
.search .search-box {
  position: absolute;
  width: 80%;
  height: 40px;
  line-height: 40px;
  left: 20px;
  top: 10px;
  // border: 1px solid #999;
}
.search .search-box input {
  position: absolute;
  left: 25px;
  top: 5px;
  width: 75%;
  height: 30px;
  outline: none;
  border: none;
  background-color: rgba(242, 242, 242, 1);
} 
.address {
  position: relative;
  height: 150px;
  // background-color: rgba(242, 242, 242, 1);
  border-top: 1px solid #999;
  top: 10px;
  padding-left: 10px;
  font-size: 15px;
}
address .order {
  position: relative;
}
.address .order img {
  position: absolute;
  left: 25px;
  top: 25px;
}
.address .order span {
  position: absolute;
  left: 55px;
  top: 28px;
}
.address .addres-info {
  margin-top: 80px;
  padding-left: 30px;
}
.address .addres-info span:first-child {
  display: block;
  margin-top: 25px;
  margin-bottom: 10px;
}
.info {
  position: relative;
  height: 80px;
  // background-color: rgba(242, 242, 242, 1);
  border-top: 1px solid #999;
  //border-bottom: 1px solid #999;
  font-size: 15px;
  padding-left: 40px;
}
.info span {
  display: block;
}
.info span:first-child {
  padding-top: 15px;
  padding-bottom: 10px;
}
</style>