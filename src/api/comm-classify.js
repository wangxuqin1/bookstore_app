import req from '../fetch/index.js'

const config = {
  // 查询商品一级分类接口
  listGoodsClassOne: {
    url: '/app/customer/goodsClass/listGoodsClassOne',
    method: 'post'
  },
  // 查询商品二级分类跟分类下商品接口
  listGoodsSecondAndGoods: {
    url: '/app/customer/goodsClass/listGoodsSecondAndGoods',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
