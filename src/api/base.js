import axios from 'axios'
import orignJSONP from 'jsonp'

/**
 * 拼接jsonp请求url
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
 * ajax类
 */
export default class Base {
  /**
   * 发送ajax请求
   * @param {String}   type       - 请求类型
   * @param {String}   url        - 请求地址
   * @param {Object}   params     - 请求参数
   * @param {Object}   headers    - 添加请求头
   * @returns {Promise} 请求成功/失败promise对象
   */
  send(type, url, params = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      axios[type](url, params, { headers }).then((data) => {
        if (data.code === '0') {
          resolve(data.result)
          return
        }
        reject({ msg: data.description, code: data.code })
      }).catch((e) => {
        reject({ msg: e.message })
      })
    })
  }

  /**
   * jsonp请求方法
   * @param {url}    url       - 请求地址
   * @param {Object} data      - 请求参数
   * @param {Object} option    - 请求配置
   * @returns {Promise} 请求成功/失败promise对象
   */
  jsonp(url, data, option) {
    return new Promise((resolve, reject) => {
      orignJSONP(jointUrl(url, data), option, (err, data) => {
        if (!err) {
          data.code === 0 ? resolve(data) : reject()
        } else {
          reject(err)
        }
      })
    })
  }

  /**
   * ajax get请求
   * @param {String}   url         - 请求地址
   * @param {Object}   params      - 请求参数
   * @param {Object}   headers     - 添加请求头
   * @returns {Promise} 请求成功/失败promise对象
   */
  get(url, params, headers) {
    return this.send('get', url, params, headers)
  }

  /**
   * ajax post请求
   * @param {String}   url           - 请求地址
   * @param {Object}   params        - 请求参数
   * @param {Object}   headers       - 添加请求头
   * @returns {Promise} 请求成功/失败promise对象
   */
  post(url, params, headers) {
    return this.send('post', url, params, headers)
  }

  /**
   * 挂载到vue原型中
   * @param {Object} Vue - vue对象
   */
  install(Vue) {
    Vue.prototype.$axios = this
  }
}
