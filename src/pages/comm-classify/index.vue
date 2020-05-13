<template>
  <div class="container">
    <ul class="book-classify">
      <li v-for="(item, index) in classOne" :key="index" @click="getSecondClassify(item)"
      :class="{active: item.classOneCode === currentClassifyData.classOneCode}">
        <b></b>
        <span>{{item.classOneName}}</span>
      </li>
    </ul>
     
    <ul class="book-classify-conteiner">
      <li class="book-classify-item" v-for="(item, index) in classTwo" :key="index">
        <div class="book-classify-item-title">{{item.classSecondName}}</div>
        
        <ul class="book-list">
          <div v-show="item.isDisplays" class="evaluatenone">
            <span>{{item.warnMessage}}</span>
          </div>
          <li v-for="(childItem, childIndex) in item.goodsList" :key="childIndex" @click="getCommDetail(childItem)">
            <img :src="childItem.goodsImg" alt="">
            <div>{{childItem.goodsName}}</div>
            <div>
              ￥{{childItem.sellPrice.toFixed(2)}}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-classify.js'
export default {
  name: 'comm-classify',
  data () {
    return {
      classOne: [],
      classTwo: [],
      isDisplays: false,
      warnMessage: '',
      currentClassifyData: {},
      commList: [
        {
          classifyId: '',
          classifyName: '小说',
          goodsList: [
            {
              goodsId: '',
              goodsImagePath: './image/book1.jpg',
              goodsName: '迪士尼爱与梦想绘本',
              goodsPrice: '131.30'
            },
            {
              goodsId: '',
              goodsImagePath: './image/book1.jpg',
              goodsName: '迪士尼爱与梦想绘本',
              goodsPrice: '131.30'
            },
            {
              goodsId: '',
              goodsImagePath: './image/book1.jpg',
              goodsName: '迪士尼爱与梦想绘本',
              goodsPrice: '131.30'
            },
            {
              goodsId: '',
              goodsImagePath: './image/book1.jpg',
              goodsName: '迪士尼爱与梦想绘本',
              goodsPrice: '131.30'
            },
            {
              goodsId: '',
              goodsImagePath: './image/book1.jpg',
              goodsName: '迪士尼爱与梦想绘本',
              goodsPrice: '131.30'
            }
          ]
        },
        {
          classifyId: '',
          classifyName: '散文',
          goodsList: [
            {
              goodsId: '',
              goodsImagePath: './image/book1.jpg',
              goodsName: '迪士尼爱与梦想绘本',
              goodsPrice: '131.30'
            },
            {
              goodsId: '',
              goodsImagePath: './image/book1.jpg',
              goodsName: '迪士尼爱与梦想绘本',
              goodsPrice: '131.30'
            },
            {
              goodsId: '',
              goodsImagePath: './image/book1.jpg',
              goodsName: '迪士尼爱与梦想绘本',
              goodsPrice: '131.30'
            },
            {
              goodsId: '',
              goodsImagePath: './image/book1.jpg',
              goodsName: '迪士尼爱与梦想绘本',
              goodsPrice: '131.30'
            },
            {
              goodsId: '',
              goodsImagePath: './image/book1.jpg',
              goodsName: '迪士尼爱与梦想绘本',
              goodsPrice: '131.30'
            }
          ]
        }
      ]
    }
  },
  created () {
    // 一级分类
    this.listGoodsClassOne()
  },
  methods: {
    getCommDetail (data) {
      // 将item数据保存到sessionStorage中
      sessionStorage.setItem('currentComm', JSON.stringify(data))
      this.$router.push({path: '/comm-detail'})
      console.log(data)
    },
    // 获取一级分类的数据
    listGoodsClassOne () {
      req('listGoodsClassOne', {
      }).then(data => {
        console.log('这里是一级分类查询数据', data)
        this.classOne = data.data
        this.currentClassifyData = this.classOne[0]
        this.getSecondClassify(this.currentClassifyData)
      })
    },
    // 获取二级分类的数据value
    getSecondClassify (value) {
      this.currentClassifyData = value
      req('listGoodsSecondAndGoods', {
        classOneCode: value.classOneCode
      }).then(data => {
        console.log('这里是二级分类查询数据', data)
        this.classTwo = data.data
        console.log('长度', data.data.length)
        console.log('长度2', data.data[0].goodsList)
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].goodsList.length === 0) {
            console.log('这个列别没有商品!!')
            this.classTwo[i].warnMessage = '该类别暂时没有商品上架!!!'
            this.classTwo[i].isDisplays = true
          }else {
            this.classTwo[i].isDisplays = false
          }
        }
        // if (data.data === 0) {
        //   this.warnMessage = '该类别暂时没有商品上架'
        //   this.isDisplays = true
        // } else {
        //   this.isDisplays = false
        // }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #ddd;

  .book-classify {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20%;
    background: #fff;
    

    li {
      position: relative;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;

      >span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

    }
    li.active {
      color: rgb(197, 156, 104);
      background: #ddd;

      b {
        position: absolute;
        left: 0;
        top: 50%;
        width: 3px;
        height: 20px;
        background: rgb(197, 156, 104);
        margin-top: -10px;
      }
    }
  }

  .book-classify-conteiner {
    position: absolute;
    top: 0;
    left: 22%;
    bottom: 0;
    overflow: auto;
    width: 78%;

    .book-classify-item {
      .book-classify-item-title {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
        font-size: 16px;
        font-weight: 600;
      }

      .book-list {
        width: 98%;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        box-sizing: border-box;
        border-radius: 5px;
        .evaluatenone {
          font-size: 16px;
          color: #999;
          text-align: center;
          padding-left: 20px;
        }
        li {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 50%;
          margin-bottom: 10px;

          img {
            //width: 100%;
            height: 130px;
          }

          div:nth-child(2) {
            font-size: 12px;
            margin-top: 3px;
          }

          div:nth-child(3) {
            color: red;
            font-size: 14px;
            font-weight: bold;

            span {
              color: #ddd;
              font-weight: normal;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
