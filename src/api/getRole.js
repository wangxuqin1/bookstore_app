import req from '../fetch/index.js'

const config = {
  getPersonalInfo: {
    url: '/app/public/getPersonalInfo',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
