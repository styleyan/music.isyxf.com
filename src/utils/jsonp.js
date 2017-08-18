/**
 * jsonp 分装成
 * @see https://github.com/webmodules/jsonp
 */

import orignJSONP from 'jsonp'

/**
 * 拼接url
 * @param {String} url - 请求地址
 * @param {Object} data - 请求数据
 */
function jointUrl(url, data) {
  let jurl = ''
  Object.keys(data).forEach((prop) => {
    const val = encodeURIComponent(data[prop] || '')
    jurl += `&${prop}=${val}`
  })
  return url + (url.endsWith('?') ? '' : '?') + jurl
}

/**
 * jsonp调用方法
 * @param {String} url - url请求地址
 * @param {Oject} data - 请求参数
 * @param {Object} option - 请求配置
 * @returns {Promise} promise对象
 */
function jsonp(url, data, option) {
  return new Promise((resolve, reject) => {
    orignJSONP(jointUrl(url, data), option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export default jsonp