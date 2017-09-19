import Base from './base'
import {commonParams} from './config'

class Apis extends Base {
  /**
   * 热门歌单推荐
   * @url http://rap.ops.xxxx.so/xxxx/yyyy?projectId=65#4263
   * @param {Object} params - 请求参数
   * @returns {Promise} 请求结果
   */
  getDiscList() {
    const data = Object.assign({}, commonParams, {
      platform: 'yqq',
      hostUin: 0,
      sin: 0,
      ein: 29,
      sortId: 5,
      needNewCode: 0,
      categoryId: 10000000,
      rnd: Math.random(),
      format: 'json',
    })
    return super.get('/api/getDiscList', data)
  }
}

export default new Apis()