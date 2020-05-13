<template>
  <div>
    <div class="leader">
        <ul>
            <li :class="{active: this.orderStatusType ==='allOrder'}" @click="listOrderByPage(-1, 'allOrder')">全部订单</li>
            <li :class="{active: this.orderStatusType ==='paid'}" @click="listOrderByPage(0, 'paid')">已付款</li>
            <li :class="{active: this.orderStatusType ==='forPickup'}" @click="listOrderByPage(1, 'forPickup')">待取货</li>
            <li :class="{active: this.orderStatusType ==='accomplish'}" @click="listOrderByPage(3, 'accomplish')">已完成</li>
        </ul>
    </div>
    <div v-show="this.isDisplay" class="evaluatenone">
      <span>{{this.warnMessage}}</span>
    </div>
    <div class="order-item" v-for="item of orderList" :key="item.id" @click="toPage(item)">
        <div class="item-top">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.orderCode}}</span>
            <span>{{orderType(item)}}</span>
        </div>
        <div class="item-center" v-for="(children, index) in item.goodsList" :key="index">
            <div class="img-con">
                <img :src="children.goodsImg" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{children.goodsName}}
                </div>
                <div class="props-con">
                    {{children.goodsIntro}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{children.sellPrice.toFixed(2)}} &nbsp;</span>
                    <span>x{{children.buyCount}}</span>
                </div>
            </div>
        </div>
         <div class="customer-info" v-show="getUserType === 2">
            <img src="../../assets/u1056.png" alt="">
            {{item.customerName}}
            <img src="../../assets/u1060.png" alt="">
            {{item.phone}}
        </div>
        <div class="item-bottom">
            <span>共{{item.classCount}}件商品，合计￥</span>
            <span>{{item.orderSumPrice.toFixed(2)}}</span>
        </div>
        <!-- 客户端 -->
        <div class="item-more" v-show="getUserType === 3">
            <div class="btn" @click.stop="changeOrderType(item, 5)"
              v-show="item.orderStatus === 0 || item.orderStatus === 1">
              <span>取消订单</span>
            </div>
            <div class="btn" @click.stop="evaluate(item)"
              v-show="item.orderStatus === 3">
                <span>评&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价</span>
            </div>
            <div class="btn" @click.stop="changeOrderType(item, 3)"
              v-show="item.orderStatus === 2">
                <span>确认收货</span>
            </div>
           
        </div>
        <div class="line"></div>
         <!-- 店长端 -->
        <div class="item-more" v-show="getUserType === 2">
            <div class="btn" @click.stop="storeChangeOrderType(item, 5)"
              v-show="item.orderStatus === 0">
                <span>取消订单</span>
            </div>
            <div class="btn" @click.stop="storeChangeOrderType(item, 2)"
              v-show="item.orderStatus === 0">
                <span>确认到货</span>
            </div>
            <div class="btn" @click.stop="storeChangeOrderType(item, 0)"
              v-show="item.orderStatus === 2">
                <span>取消到货</span>
            </div>
            <div class="btn" @click.stop="storeChangeOrderType(item, 2)"
              v-show="item.orderStatus === 1">
                <span>确认取货</span>
            </div>
            <div class="btn" @click.stop="storeChangeOrderType(item, 1)"
              v-show="item.orderStatus === 2">
                <span>取消取货</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/order.js'
import reqs from '@/api/store-manager-order.js'
export default {
  name: 'order-list',
  data () {
    return {
      orderStatusType: '', //订单状态
      orderList: [], //获取订单数组
      getUser: {}, // 获取用户角色
      isDisplay: false,
      warnMessage: ''
    }
  },
  computed: {
     getUserType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    },
  },
  mounted () {
    this.getUser = JSON.parse(sessionStorage.getItem('roleInfo'))
    this.listOrderByPage(-1, 'allOrder')
  },
  methods: {
    // 去到订单详情
	  toPage (data) {
			this.$router.push({path: '/order-detail', query: data})
    },
    // 去到订单评价
		evaluate (data) {
			console.log(data)
			this.$router.push({path: '/order-evaluate', query: data})
    },
    // 显示订单状态
    orderType (item) {
      if (item.orderStatus === 0) {
        return '已下单'
      } else if (item.orderStatus === 1) {
        return '待取货'
      } else if (item.orderStatus === 2) {
        return '已取货'
      } else if (item.orderStatus === 3) {
        return '已完成未评价'
      } else if (item.orderStatus === 4) {
        return '已评价'
      } else if (item.orderStatus === 5) {
        return '取消'
      }
    },
    // 获取角色信息，以便显示按钮
    // getUserType () {
    //   console.log('角色信息1', JSON.parse(sessionStorage.getItem('roleInfo')))
    //    this.getUser = JSON.parse(sessionStorage.getItem('roleInfo'))
    //   return JSON.parse(sessionStorage.getItem('roleInfo')).role
    // },
    listOrderByPage (value1, value2) {
      console.log('角色信息1', this.getUser)
      this.orderStatusType = value2
      if (JSON.parse(sessionStorage.getItem('roleInfo')).role === 3) {
        req('listOrderByPage',{
          orderStatus: value1
        }).then(data => {
          this.orderList = data.data
          if (data.code !== 0) {
            this.$message.error(data.msg)
          } else {
            if (this.orderList.length === 0) {
              console.log('kong', value2)
              if (value2 === 'allOrder') {
                this.warnMessage = '你暂时没有下单，订单列表为空哦！！'
              } else if (value2 === 'paid') {
                this.warnMessage = '已付款订单列表暂时为空哦！！'
              }else if (value2 === 'forPickup') {
                this.warnMessage = '待取货列表暂时为空哦！！'
                console.log(this.warnMessage)
              } else {
                this.warnMessage = '已完成订单列表暂时为空哦！！'
              }
            this.isDisplay = true
            } else {
              console.log('isDisplay==>false', )
              this.isDisplay = false
            }
          }
          console.log('客户订单列表数据', data)
        })
      } else {
        reqs('storeListOrderByPage',{
        // storerCode: this.getUser.storeCode,
        orderStatus: value1,
        pageNum: '1',
        pageSize: '50',
        }).then(data => {
          this.orderList = data.data.list
          if (data.code !== 0) {
            this.$message.error(data.msg)
          }
          console.log('店长订单列表数据', data)
        })
      }
    },
    // 客户端修改订单状态
    changeOrderType (item, updateOrderStatus) {
      if (updateOrderStatus === 5) {
        this.$confirm('是否取消该订单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          //type: 'warning'
        }).then(() => {
          req('updateOrderStatus', {
            orderCode: item.orderCode,
            orderStatus: updateOrderStatus,
            version: item.version
          }).then(data => {
            if (data.code === 0) {
              this.$message.success(data.msg)
              this.listOrderByPage(-1, this.orderStatusType)
              console
              } else {
                this.$message.error(data.msg)
              }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      } else {
        req('updateOrderStatus', {
          orderCode: item.orderCode,
          orderStatus: updateOrderStatus,
          version: item.version
        }).then(data => {
          if (data.code === 0) {
            this.$message.success(data.msg)
            this.listOrderByPage(-1, this.orderStatusType)
            console
            } else {
              this.$message.error(data.msg)
            }
        })
      }
    },
    // 店长端修改订单
    storeChangeOrderType (item, updateOrderStatus) {
      console.log('店长修改状态')
      console.log('item.orderCode', item.orderCode)
      console.log('updateOrderStatus', updateOrderStatus)
      reqs('storeUpdateOrderStatus', {
        orderCode: item.orderCode,
        orderStatus: updateOrderStatus,
        version: item.version
      }).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)
          this.listOrderByPage(-1, this.orderStatusType)
          } else {
            this.$message.error(data.msg)
          }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .leader {
      position: fixed;
      z-index: 9;
      top: 50px;
      height: 64px;
      width: 100%;
      border-bottom: 1px solid #999;
      //opacity: 1;
      background: white;
      ul {
        //margin-top: 64px;
          top: 64px;
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          li {
              line-height: 64px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: rgb(195,152,98);
          }
      }
  }
  .order-item {
      margin-top: 64px;
      width: 95%;
      //margin: 0 auto 5px;
      background-color: white;
      border-radius: 8px;
      padding: 5px 15px;
      box-sizing: border-box;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 0;
              font-size: 13px;
              color: rgb(195,152,98);
          }
      }
      .item-center {
          width: 100%;
          display: flex;
          box-sizing: border-box;
          padding-top: 5px;
          .img-con {
              flex: 1;
              text-align: center;
              img {
                  width: 84px;
              }
          }
          .text {
              flex: 2.2;
              .text-con {
                  font-size: 15px;
                  line-height: 22px;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
              }
              .props-con {
                  font-size: 13.5px;
                  line-height: 26px;
                  color: rgb(168,168,168);
              }
              .price-con {
                  text-align: right;
                  line-height: 26px;
                  span:nth-child(1) {
                      font-size: 11px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(2) {
                      font-size: 16px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(3) {
                      font-size: 11px;
                      color: rgb(168,168,168);
                  }
              }
          }
      }
      .customer-info {
        width: 100%;
        line-height: 30px;
        height: 30px;
        font-size: 16px;
      }
      .item-bottom {
          width: 100%;
          line-height: 40px;
          text-align: right;
          padding-top: 5px;
          span:nth-child(1) {
              font-size: 15px;
          }
          span:nth-child(2) {
              font-size: 20px;
          }
      }
      .item-more {
          width: 100%;
          display: flex;
          .btn {
              width: 92px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              
              span {
                  font-size: 15px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  margin-top: -10.4px;
                  margin-left: -28px;
                  color: rgb(195,152,98);
                  
              }
          }
      }
       .line {
          width: 100%;
          height: 1px;
          background-color: rgb(204,204,204);
          margin: 5px 0;
      }
  }
  .evaluatenone {
    font-size: 18px;
    color: #999;
    text-align: center;
    margin-top: 120px;
  }
</style>
