<template>
  <div class="container">
    <div class="evaluate-title">
        <span :class="{active: this.evaStatusType ==='allEva'}" @click="listGoodsEvaluateByPage(0, 'allEva')">全部评价</span>
        <span :class="{active: this.evaStatusType ==='praise'}" @click="listGoodsEvaluateByPage(1, 'praise')">好评</span>
        <span :class="{active: this.evaStatusType ==='mediumEva'}" @click="listGoodsEvaluateByPage(2, 'mediumEva')">中评</span>
        <span :class="{active: this.evaStatusType ==='negativeEva'}" @click="listGoodsEvaluateByPage(3, 'negativeEva')">差评</span>
    </div>
    <div v-show="this.isDisplay" class="evaluatenone">
      <span>{{this.warnMessage}}</span>
    </div>
    <ul class="evaluate-list">
      <li v-for="(item, index) in evaList" :key="index">
        <div class="content">
          <div class="title">
            <div class="user-info">
              <!-- <div class="name">用户：{{item.customerName}}</div> -->
              <div class="name">用户：{{customerNameDisplay(item)}}</div>
              <div class="date">{{item.time}}</div>
            </div>
            <!-- <div
              class="star"
              :style="{backgroundPosition: `${90 - item.evaluateClass*18}px 0`}">
            </div> -->
            <div class="starDisplay">
              <el-rate
                v-model="item.evaluateClass"
                disabled
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
            
          </div>
          <div class="msg">{{item.content}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/order.js'
export default {
  name: 'comm-evaluate',
  data () {
    return {
      evaList: [],
      evaStatusType: '',
      isDisplay: false,
      warnMessage: ''
    }
  },
  mounted () {
    this.listGoodsEvaluateByPage(0, 'allEva')
  },
  methods: {
    listGoodsEvaluateByPage (value1, value2) {
      this.evaStatusType = value2
      let goodsData = JSON.parse(sessionStorage.getItem('currentComm'))
      console.log('goodsData', goodsData)
      req('listGoodsEvaluateByPage', {
        goodsCode: goodsData.goodsCode,
        evaluateClass: value1,
        pageNum: '1',
        pageSize: '50',
      }).then(data => {
        console.log('评价列表展示信息返回', data)
        this.evaList = data.data.list
        if (this.evaList.length === 0) {
          if (value2 === 'allEva') {
            this.warnMessage = '该商品评价列表品暂时为空哦，快来抢占沙发吧！！'
          } else if (value2 === 'praise') {
            this.warnMessage = '该商品好评列表暂时为空哦，快来抢占沙发吧！！'
          }else if (value2 === 'mediumEva') {
            this.warnMessage = '该商品中评列表暂时为空哦，快来抢占沙发吧！！'
          } else {
             this.warnMessage = '该商品暂时没有差评价哦！！'
          }
          this.isDisplay = true
        } else {
          this.isDisplay = false
        }
      })
    },
    customerNameDisplay (item) {
      
      let str = item.customerName
      if (!str){
        str = '*'
      }
      let frontLen = 1
      let endLen = 1
      var len = str.length-frontLen-endLen;
      console.log('item.name', item.customerName)
      if (str.length === 1 || str.length === 0) {
        return '*'
      }else if (str.length === 2) {
        return str.substring(0,frontLen)+'*';
      } else if (str.length <= 5) {
        var xing = ''
        for (var i=0;i<len;i++) {
          xing+='*';
        }
        return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
      } else {
        let frontLen = 3
        let endLen = 2
        var len = str.length-frontLen-endLen;
        var xing = '';
        for (var i=0;i<len;i++) {
          xing+='*';
        }
        return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
      }
    }
      
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
  height: 100%;
  .evaluate-title {
    // position: fixed;
    // z-index: 9;
    // top: 50px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 15px;
    span {
      padding: 0 10px;
    }

    .active {
      color: #C39862;
      font-size: 18px;
    }
  }

  .evaluate-list {
    // margin-top: 100px;
    width: 95%;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;
    li {
      display: flex;

      // .head-pic {
      //   width: 50px;
      //   height: 50px;
      //   padding: 10px;

      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .content {
        flex: 1;
        padding: 10px;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 60px;
          .user-info {
            .name {
              font-size: 15px;
            }
            .date {
              color: #ddd;
              font-size: 14px;
            }
          }
          .starDisplay {
            width: 140px;
            height: 18px;
          }
          .star {
            width: 120px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
        }
        .msg {
          font-size: 14px;
        }
      }
    }
  }
  .evaluatenone {
    text-align: center;
    margin-top: 50px;
    font-size: 16px;
    color: white;
  }
}
</style>
