import req from '../fetch/index.js'

const config = {
  // 查询商品列表
  listGoodsByPage: {
    url: '/app/customer/shopcart/listGoodsByPage',
    method: 'post'
  },
  // 修改商品数量
  updateGoodsCount: {
    url: '/app/customer/shopcart/updateGoodsCount',
    method: 'post'
  },
  // 移除商品接口
  deleteGoods: {
    url: '/app/customer/shopcart/deleteGoods',
    method: 'post'
  },
  // 查询订单列表接口
  listOrderByPage: {
    url: '/app/customer/order/listOrderByPage',
    method: 'post'
  },
  // 结算
  buyGoods: {
    url: '/app/customer/goodsDetail/buyGoods',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
