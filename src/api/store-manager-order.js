import req from '../fetch/index.js'

const config = {
  storeListOrderByPage: {
    url: '/app/storer/order/storeListOrderByPage',
    method: 'post'
  },
  storeGetOrder: {
    url: '/app/storer/order/storeGetOrder',
    method: 'post'
  },
  storeUpdateOrderStatus: {
    url: '/app/storer/order/storeUpdateOrderStatus',
    method: 'post'
  },
  storeListDriverByPage: {
    url: '/app/storer/driver/storeListDriverByPage',
    method: 'post'
  },
  getPersonalInfo: {
    url: '/app/public/getPersonalInfo',
    method: 'post'
  },
  updatePassword: {
    url: '/app/public/updatePassword',
    method: 'post'
  },
  listStoreByPage: {
    url: '/app/driver/index/listStoreByPage',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
