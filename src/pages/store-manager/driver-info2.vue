<template>
  <div>
    <div class="info" v-for="(item, index) in driverList" :key="index">
      <div class="dirver-name">
        <img src="@/assets/u1210.png">
        <span>{{item.driverName}}</span>
      </div>
      <div class="driver-number">
        <img src="@/assets/u1151.png">
        <span>{{item.phone}}</span>
      </div>
    </div>
    
  </div>
</template>
<script>
import req from '@/api/store-manager-order.js'
export default {
  name: 'driver-info',
  data () {
    return {
      driverList: []
    }
  },
  mounted () {
    this.storeListDriverByPage ()
  },
  methods: {
    storeListDriverByPage () {
      req('storeListDriverByPage', {
      }).then(data => {
        console.log('这里是店长页面的司机信息', data)
        this.driverList = data.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.info {
  position: relative;
  height: 100px;
  // border-top: 1px solid #999;
   border-bottom: 1px solid #999;
  padding-left: 20px;
  font-size: 16px;
}
.info .dirver-name,.info .driver-number {
  position: relative;
  margin-top: 15px;
  height: 30px;
}
.info .dirver-name img,.info .driver-number img {
  position: absolute;
  left: 15px;

}
.info .dirver-name span,.info .driver-number span {
  position: absolute;
  left: 50px;
  top: 2px;
}
</style>