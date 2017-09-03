export default {
  /**
   * 时间轴格式化分秒函数
   */
  format(interval) {
    interval = interval | 0
    const minute = interval / 60 | 0
    const second = interval % 60
    return `${minute}:${second}`
  },
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  /**
   * 洗牌算法，打乱歌曲排序 todo：优化写法
   */
  shuffle(arr) {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
      let j = this.getRandomInt(0, i)
      let t = arr[i]
      _arr[i] = arr[j]
      _arr[j] = t
    }
    return _arr
  },
}