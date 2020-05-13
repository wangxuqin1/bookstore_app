<template>
  <div class="container">
    <ul class="book-list">
      <li class="book-list-item" v-for="(item, index) in getGoodsList" :key="index">

        <!-- 选择按钮 -->
        <div class="select-btn-box">
          <div>
            <input type="checkbox" @change="inputChange(item)">
            <div class="action" :style="{display: item.checked ? 'block' : 'none'}"></div>
          </div>
        </div>
        <!-- 书本信息 -->
        <div class="book-count-info">
          <div class="image"><img :src="item.goodsImg" alt=""></div>
          <div>
            <div>{{item.goodsName}}</div>
            <div>简介：{{item.goodsIntro}}</div>
            <div>
              <span>￥{{item.sellPrice.toFixed(2)}}</span>
              <div class="change-count-box">
                <div @click="sub(item)">-</div>
                <div>{{item.goodsCount}}</div>
                <div @click="add(item)">+</div>
              </div>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </li>
      
    </ul>

    <div class="close-count">
      <div>
        <div>
          <input type="checkbox" @change="allInputChange">
          <div class="action" :style="{display: allChecked === true ? 'block' : 'none'}"></div>
        </div>
        <span>全选</span>
      </div>

      <div>
        <div>
          <b>合计:</b>
          <span>￥{{totalPrice.toFixed(2)}}</span>
        </div>

        <button @click="settleGoodsLists">结算</button>
        <button @click="deleteGoods">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop-car.js'
import reqs from '@/api/getRole.js'
export default {
  name: 'shop-car',
  data () {
    return {
      list: [],
      getGoodsList: [], //获取商品查询列表
      allChecked: false, //全选按钮设置为false
      totalPrice: 0, //初始化总价格
      userInvCode: '' //获取门店邀请码
    }
  },
  mounted () {
    this.getlistGoodsByPage()
    this.getRoleInfo()
  },
  methods: {
    // 全选
    allInputChange () {
      this.allChecked = !this.allChecked
      this.getGoodsList.forEach(item => {
        item.checked = this.allChecked
      })
      this.totalPrice = this.getTotal()
    },
    // 单选
    inputChange (item) {
      item.checked = !item.checked
      for (let i = 0; i < this.list.length; i++) {
        if (this.getGoodsList[i].checked === false) {
          this.allChecked = false
          break
        } else {
          this.allChecked = true
        }
      }
      this.totalPrice = this.getTotal()
    },
    // 加按钮
    add (data) {
      console.log('data', data)
      data.goodsCount = parseFloat(data.goodsCount) + 1
      this.totalPrice = this.getTotal()
      console.log('加一本')
      console.log(data.goodsCode)
      console.log(data.goodsCount)
      console.log(data.shopCartCode)
      req('updateGoodsCount', {
        goodsCode: data.goodsCode,
        goodsCount: data.goodsCount,
        shopCartCode: data.shopCartCode
      }).then(data => {
        console.log('data', data)
        if (data.code === 0) {
          console.log('商品数量提交完成')
        } else {
          console.log('商品数量提交失败')
        }
      })
    },
    //减按钮
    sub (data) {

      if (data.goodsCount > 1) {
        data.goodsCount = parseFloat(data.goodsCount) - 1
        console.log(data.goodsCode)
        console.log(data.goodsCount)
        console.log(data.shopCartCode)
        req('updateGoodsCount', {
          goodsCode: data.goodsCode,
          count: data.goodsCount,
          shopCartCode: data.shopCartCode
        }).then(data => {
          console.log('data', data)
          if (data.code === 0) {
            console.log('商品数量提交完成',data)
          } else {
            console.log('商品数量提交失败',data)
          }
        })
      }
      this.totalPrice = this.getTotal()
      console.log('减一本')
      
    },
    // 总价格
    getTotal() {
      let total = 0
      this.getGoodsList.forEach(item => {
        if (item.checked) {
          total = total+ parseFloat(item.goodsCount * item.sellPrice)
        }
      });
      return parseFloat(total.toFixed(2))
    },

    // 查询商品列表数据
    getlistGoodsByPage () {
      req('listGoodsByPage', {
      }).then(data => {
        this.getGoodsList = data.data.map(item => {
          return Object.assign({}, item, {checked: false})
        })
        console.log('查询商品列表数据', this.getGoodsList)
        this.allChecked = false
        this.totalPrice = this.getTotal()
      })
    },
    // 商品结算
    settleGoodsLists () {
      // 将勾选的商品筛选出来
      let selectGoodsList = this.getGoodsList.filter(item => {
        return item.checked === true
      })

      // 获取选择的商品的编号
      let goodsCodes = selectGoodsList.map(item => {
        return item.goodsCode
      }).toString()

      //获取商品的数量
      let goodsCounts = selectGoodsList.map(item => {
        return item.goodsCount
      }).toString()

      // 获取购物车编号
      let shopCartCodes = selectGoodsList.map(item => {
        return item.shopCartCode
      }).toString()
      console.log('selectGoodsList.length', selectGoodsList.length !== 0)
      if (selectGoodsList.length) {
        if (this.userInvCode) {
          this.$confirm('是否购买已选择商品？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            //type: 'warning'
          }).then(() => {
            req('buyGoods', {
              goodsCode: goodsCodes,
              count: goodsCounts,
              shopCartCode: shopCartCodes
            }).then(data => {
              if (data.code === 0) {
                this.$message.success(data.msg)
                this.getlistGoodsByPage()
                // this.$router.push({path: '/order-list'})
              } else {
                this.$message.error(data.msg)
              }
              console.log('购买商品返回的信息', data)
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
      } else {
        this.$message.error('请先选择你要购买的商品')
      }
      
    },
    deleteGoods () {
       // 将勾选的商品筛选出来
      let selectGoodsList = this.getGoodsList.filter(item => {
        return item.checked === true
      })

       // 判断是否有选择商品
      // if (selectGoodsList.length === 0) {
      //   this.$message.error('请选择你要购买的商品')
      // }

      // 获取购物车编号
      let shopCartCodes = selectGoodsList.map(item => {
        return item.shopCartCode
      }).toString()

      // 调用移除商品接口
       if (selectGoodsList.length) {
        this.$confirm('是否删除已选择商品？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          //type: 'warning'
        }).then(() => {
          req('deleteGoods', {
            shopCartCode: shopCartCodes
          }).then(data => {
            if (data.code === 0) {
              this.$message.success(data.msg)
              this.getlistGoodsByPage()
            } else {
              this.$message.error(data.msg)
            }
            // console.log('移除商品返回的信息', data)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      } else {
        this.$message.error('请先选择你要删除的商品')
      }
    },
    // 获取用户信息
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
  padding-bottom: 110px;
}
  .book-list {
    width: 90%;
    // position: absolute;
    // left: 50%;
    // bottom: 55px;
    overflow: auto;
    padding: 5px 20px;
    // transform: translate(-50%, 0);
    
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 150px;
      background: #fff;
      // border-radius: 10px;
      padding: 10px 10px;
      box-sizing: border-box;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      .select-btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;

        >div {
          position: relative;
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 50%;

          input {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 0;
            margin: 0;
            width: 15px;
            height: 15px;
            z-index: 1;
            opacity: 0;
          }

          .action {
            display: none;
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: rgb(197, 156, 104);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
        }
      }

      .book-count-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        height: 100%;

        .image{
          width: 110px;
          height: 130px;
          text-align: center;
          margin-top: 10px;
          >img {
          height: 80%;
          vertical-align: middle;
          align-self: center;
        }
        }
        >div {
          > div:first-child {
            font-size: 14px;
            width: 100%;
            height: 40px;
            padding-left: 10px;
            box-sizing: border-box;
          }

          > div:nth-child(2) {
            font-size: 14px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            color: #999;
          }

          > div:nth-child(3) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            width: 200px;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            span {
              color: red;
            }
            .change-count-box {
              display: flex;
              height: 20px;
              //margin-left: 20px;
              div:first-child {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }

              div:nth-child(2) {
                width: 50px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-left: none;
                border-right: none;
              }

              div:nth-child(3) {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }
            }
          }
        }
      }
    }
   
  }
//  .line {
//         width: 85%;
//         height: 1px;
//         background-color: #ccc;
//         margin: 5px 0;
//         margin-left: 30px;
//       }
.close-count {
  position: fixed;
  bottom: 60px;
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;

  div:first-child {
    display: flex;
    height: 50px;
    align-items: center;

    div {
      position: relative;
      width: 20px;
      height: 20px;
      border: 2px solid #ddd;
      border-radius: 50%;
      margin-right: 10px;

      input {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        margin: 0;
        width: 15px;
        height: 15px;
        z-index: 1;
        opacity: 0;
      }

      .action {
        display: none;
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: rgb(197, 156, 104);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
    }
  }
  div:first-child {
    font-size: 18px;
  }
  div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;

    div:first-child {
      height: 50px;
      line-height: 50px;
      font-size: 14px;

      span {
        width: 60px;
        font-size: 18px;
        color: red;
      }
    }

    button {
      width: 90px;
      height: 40px;
      background: rgb(197, 156, 104);
      color: #fff;
      outline: none;
      line-height: 40px;
      text-align: center;
      border: none;
      border-radius: 10px;
      margin-left: 20px;
    }

    button:nth-child(3) {
      background: red;
    }
  }
}

</style>
