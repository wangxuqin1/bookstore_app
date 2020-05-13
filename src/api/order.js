import req from '../fetch/index.js'

const config = {
  // 查询订单列表接口
  listOrderByPage: {
    url: '/app/customer/order/listOrderByPage',
    method: 'post'
  },
  // 查询订单详情接口
  getOrder: {
    url: '/app/customer/order/getOrder',
    method: 'post'
  },
  // 修改订单状态接口
  updateOrderStatus: {
    url: '/app/customer/order/updateOrderStatus',
    method: 'post'
  },
  // 商品评价接口 
  goodsEvaluate: {
    url: '/app/customer/order/goodsEvaluate',
    method: 'post'
  },
  listGoodsEvaluateByPage: {
    url: '/app/customer/goodsDetail/listGoodsEvaluateByPage',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
