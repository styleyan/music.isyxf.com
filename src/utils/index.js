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
}