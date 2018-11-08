export default {
  /**
   * 获取时间字符串。例如 2018-01-01 10:00:00
   * @param timestamp
   * @returns {string}
   */
  getTimeString (timestamp) {
    if (timestamp) {
      const time = new Date(timestamp)
      let dateStr = ''
      const year = time.getFullYear()
      const month = String(time.getMonth() + 1).length === 1 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
      const date = String(time.getDate()).length === 1 ? '0' + time.getDate() : time.getDate()
      dateStr = year + '-' + month + '-' + date
      let timeStr = ''
      const hours = time.getHours()
      const hh = String(hours).length === 1 ? '0' + hours : hours
      const minutes = time.getMinutes()
      const mm = String(minutes).length === 1 ? '0' + minutes : minutes
      const seconds = time.getSeconds()
      const ss = String(seconds).length === 1 ? '0' + seconds : seconds
      timeStr = `${hh}:${mm}:${ss}`
      return dateStr + ' ' + timeStr
    } else {
      return ''
    }
  },
  /**
   * 获取第二天的一个指定时间
   * @param str
   * @returns {Date}
   */
  getTomorrowTime (str) {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate() + 1
    return new Date(`${year}-${month}-${date} ${str}`)
  }
}
