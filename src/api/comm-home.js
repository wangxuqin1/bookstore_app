import req from '../fetch/index.js'

const config = {
  listRotationChart: {
    url: '/app/customer/index/listRotationChart',
    method: 'post'
  },
  listHotGoods: {
    url: '/app/customer/index/listHotGoods',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
