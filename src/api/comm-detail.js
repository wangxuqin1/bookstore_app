import req from '../fetch/index.js'

const config = {
  // 查询商品详情接口
  getGoods: {
    url: '/app/customer/goodsDetail/getGoods',
    method: 'post'
  },
  // 加入购物车接口
  addGoodsToCart: {
    url: '/app/customer/goodsDetail/addGoodsToCart',
    method: 'post'
  },
  // 购买商品接口
  buyGoods: {
    url: '/app/customer/goodsDetail/buyGoods',
    method: 'post'
  },
  // 查询商品评价接口
  listGoodsEvaluateByPage: {
    url: '/app/customer/goodsDetail/listGoodsEvaluateByPage',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
