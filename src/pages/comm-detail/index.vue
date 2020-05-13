<template>
  <div class="container">
    <div class="book-banner">
      <img :src="goodsDetailData.goodsImg" alt="">
    </div>

    <div class="book-detail">
      <div class="book-price">
        ￥{{goodsDetailData.sellPrice}}
        <span>销售量：{{goodsDetailData.sumSalesVolume}}</span>
      </div>
      <div class="book-Name">书名：{{goodsDetailData.goodsName}}</div>
      <div class="book-Describe">简介：{{goodsDetailData.goodsIntro}}</div>
      <div class="comm-evaluate">
        <div class="leftDisplay">
          <span>商品评分：</span>
          <el-rate class="starDisplay"
            v-model="goodsDetailData.starClass"
            disabled
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
        <div class="rightDisplay">
          <span class="score">{{goodsDetailData.starClass}}</span>
          <span>分</span>
         </div>
      </div>
      <div class="comm-evaluate2">
        商品浏览量:
        <span>{{goodsDetailData.browseVolume}}</span>
        次
      </div>
      <div class="count-box">
        <span>数量：</span>

        <div class="handler-box">
          <div @click="countDelete">-</div>
          <div>{{bookCount}}</div>
          <div @click="countAdd">+</div>
        </div>
      </div>
      <div class="address">
        <span>送至</span>
        <span class="iconfont iconhtmal5icon14"></span>
        <span>{{goodsDetailData.address}}</span>
      </div>
    </div>
    <div class="footer">
      <div @click="addShopCar">
        <img src="../../assets/shop_car2.png" alt="">
        <span>购物车</span>
      </div>

      <div @click="addGoodsToCart">加入购物车</div>
      <div @click="buyGoods">立即购买</div>
    </div>
  </div>
</template>

<script>
import req from '@/api/comm-detail.js'
import reqs from '@/api/getRole.js'
export default {
  name: 'comm-detail',
  data () {
    return {
      goodsDetailData: {
        goodsName: '',
        goodsIntro: '',
        sellPrice: '',
        goodsImg: '',
        sumSalesVolume: '',
        goodsCode: '',
        stock: '',
        address: '',
        starClass: null
      },
      addGoodsCartData: {},
      bookCount: 1,
      userInvCode: ''
    }
  },
  created () {
    // 获得商品信息
    this.getGoods()
    this.getRoleInfo()
  },
  methods: {
    // 数量减少
    countDelete () {
      if (this.bookCount > 1) {
        this.bookCount--
      }
    },
    // 数量增加
    countAdd () {
      this.bookCount++
    },
    // 购物车
    addShopCar () {
      this.$router.push({path: '/shop-car'})
    },
    // 加入购物车
    addGoodsToCart () {
      req('addGoodsToCart', {
        goodsCode: this.goodsDetailData.goodsCode,
        count: this.bookCount
      }).then(data => {
        console.log('这里是加入购物车返回的信息', data)
        if (data.code === 0) {
          this.$message.success(data.msg)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 立即购买
    buyGoods () {
      console.log('用户信息', this.userInvCode)   
      if (this.userInvCode) {
        this.$confirm('是否立即购买已选择商品？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          //type: 'warning'
        }).then(() => {
          req('buyGoods', {
              goodsCode: this.goodsDetailData.goodsCode,
              count: this.bookCount,
              shopCartCode: ''
            }).then(data => {
              console.log('立即购买返回信息', data)
              if (data.code === 0) {
                this.$message.success(data.msg)
                // this.$router.push({path: '/order-list'})
              } else {
                this.$message.error(data.msg)
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消购买'
          });          
        });
      } else {
        this.$message.error('您还没有绑定门店邀请码，请先绑定门店邀请码，谢谢!')
        this.$router.push({path: '/change-store-code'})
      }   
    },
    
    // 获取商品信息
    getGoods () {
      req('getGoods', {
        goodsCode: JSON.parse(sessionStorage.getItem('currentComm')).goodsCode
      }).then(data => {
        console.log('获取到的商品', data)
        this.goodsDetailData = data.data
      })
    },
    getRoleInfo () {
      reqs('getPersonalInfo', {
      }).then(data => {
        console.log('获取角色信息', data)
        this.userInvCode = data.data.invCode
        // sessionStorage.setItem('roleInfo', JSON.stringify(data.data))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
}

.book-banner {
  width: 100%;
  height: 300px;
  padding: 10px;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;

  img {
    display: block;
    //width: 70%;
    height: 100%;
    margin: 0 auto;
  }
}

.book-detail {
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  margin: 10px auto 0;

  .book-price {
    font-size: 22px;
    color: red;
    span {
      margin-left: 230px;
      font-size: 14px;
      color: #999;
    }
  }

  .comm-evaluate {
    margin-top: 10px;
    font-size: 16px;
    height: 30px;
    line-height: 30px;;
    .leftDisplay {
      display: inline-block;
     }
    .rightDisplay {
       display: inline;
      .score {
        margin-left: 124px;
        color: red;
        font-size: 19px;
     }
    }
    
    
    // .score {
    //   margin-left: 300px;
    //   color: red;
    //   font-size: 20px;
    //   display: inline;
    // }
    .starDisplay {
      display: inline;
    }
  }
  
  .comm-evaluate2 {
    margin-top: 10px;
    font-size: 16px;
    span {
      margin-left: 245px;
      color: red;
      font-size: 19px;
    }
  }
  .book-Describe {
    font-size: 14px;
    
    // font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  .book-Name {
    font-size: 16px;
    // color: #333;
    font-weight: bold;
  }
  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 16px;
    .handler-box {
      display: flex;
      height: 30px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 10px;

      div:first-child {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
    }
  }

  .address {
    margin-top: 10px;
    font-size: 16px;
    .iconhtmal5icon14 {
      color: #ddd;
    }
  }
}
.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: center;

   div:first-child {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;

    img {
      width: 25px;
      height: 25px;
    }
  }

  div:nth-child(2) {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid rgb(197, 156, 104);
    background: #fff;
    border-radius: 10px;
    margin-left: 10px;
    font-size: 18px;
  }

  div:nth-child(3) {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgb(197, 156, 104);
    color: #fff;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 18px;
  }
}
</style>
