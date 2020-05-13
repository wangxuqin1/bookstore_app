<template>
  <div class="container">
    <div class="comm" v-for="(item, index) in getDetailOrders.goodsList" :key="index">
      <div class="classOne">
        <div class="image">
           <img :src="item.goodsImg" alt="">
        </div>
        <!-- <div class="star" :style="{backgroundPosition: `${180 - 4 * 36}px 0`}"></div> -->
        <div class="Introduction">
          
          <div class="nameDisplay">
          书名：{{item.goodsName}}
        </div>
        <div class="block">
          <span>等级评价：</span>
          <el-rate class="star"
            v-model="item.starNum"
            :colors="colors">
          </el-rate>
        </div>
        </div>
        
      </div>
      <div class="classTwo">
        <div class="title">分享你的使用体验吧</div>
        <el-input v-model="item.evaluateContent" style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="6"></el-input>
      </div>
    </div>
    <el-button @click="addEvaluate" class="submit-btn" type="primary">提交</el-button>
  </div>
</template>

<script>
import req from '@/api/order.js'
import axios from 'axios'
export default {
  name: 'order-evaluate',
  data () {
    return {
      getDetailOrders: {},
      orderEvaluate:  '',
      starNum: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  mounted (){
    this.goodsEvaluate()
  },
  methods: {
     // 获取角色信息
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    },
    goodsEvaluate () {
      console.log('this.$route.query', this.$route.query)
      this.getDetailOrders = this.$route.query
      console.log('this.getDetailOrders', this.getDetailOrders)
    },
    addEvaluate () {
      this.orderEvaluate = JSON.stringify({
          orderCode: this.getDetailOrders.orderCode,
          evaluateList: this.getDetailOrders.goodsList.map(item => {
            return Object.assign({}, {
              goodsCode: item.goodsCode,
              evaluateClass: item.starNum,
              content: item.evaluateContent
            })
          })
        }).toString(),
      console.log('传递的数据', this.orderEvaluate)
      console.log('传递的数据类型',typeof this.orderEvaluate)
      console.log('this.getDetailOrders.orderCode,',this.getDetailOrders.orderCode,)
      this.flag = true
      for (let i = 0; i < this.getDetailOrders.goodsList.length; i++) {
        console.log('content',this.getDetailOrders.goodsList[i].content)
        if (this.getDetailOrders.goodsList[i].content === undefined) {
          this.getDetailOrders.goodsList[i].content = ''
          //this.$message.success('请对第'+(i+1)+'件商品进行评价')
          console.log('上传中')
        }
        console.log('等级',this.getDetailOrders.goodsList[i].starNum)
        if (this.getDetailOrders.goodsList[i].starNum === 0) {
           this.$message.success('请对第'+(i+1)+'件商品进行等级评价')
           this.flag = false
        }
      }
      if (this.flag) {
        req('goodsEvaluate', {
          jsonStr: JSON.stringify({
            orderCode: this.getDetailOrders.orderCode,
            evaluateList: this.getDetailOrders.goodsList.map(item => {
              return Object.assign({}, {
                goodsCode: item.goodsCode,
                evaluateClass: item.starNum,
                content: item.evaluateContent
              })
            })
          }),
        }).then(data => {
          if (data.code === 0) {
            this.$message.success(data.msg)
            this.$router.push({path: '/order-list'})
          } else {
            this.$message.error(data.msg)
          }
          console.log('数据', data)
        })
      } 
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background: #fff;

  .comm {
    width: 100%;
    padding: 10px 10px 0;
    box-sizing: border-box;
    background: #fff;

    .classOne {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .image {
        width: 150px;
        img {
        //width: 100%;
        height: 150px;
      }
      }
      
      .Introduction {
        width: 300px;
        height: 100px;
        .nameDisplay {
          font-size: 18px;
          width: 100%;
          margin-bottom: 20px;
        }
        .block {
          
          span {
            font-size: 18px;
          }
          .star {
            display: inline;
          }
        }
        // .star {
        //   width: 180px;
        //   height: 36px;
        //   background: url('../../assets/stars.png');
        //   background-repeat: no-repeat;
        //   background-size: 100% 100%;
        // }
      }
     
    }

    .classTwo {
      width: 100%;
      .title {
        padding-left: 10px;
        line-height: 40px;
      }
    }
  }

  .submit-btn {
    display: block;
    width: 95%;
    margin: 10px auto 0;
    height: 40px;
    line-height: 40px;
  }
}
</style>
