<template>
  <div class="count-down">
    <span class="count-down-item" v-show="countInfo.hour0 !== 0">{{countInfo.hour0}}</span>
    <span class="count-down-item">{{countInfo.hour1}}</span>
    <span class="count-down-item">{{countInfo.hour2}}</span>
    <em>:</em>
    <span class="count-down-item">{{countInfo.min1}}</span>
    <span class="count-down-item">{{countInfo.min2}}</span>
    <em>:</em>
    <span class="count-down-item">{{countInfo.ss1}}</span>
    <span class="count-down-item">{{countInfo.ss2}}</span>
  </div>
</template>

<script>
export default {
  name: 'count-down',
  data () {
    return {
      countInfo: {
        hour0: 0,
        hour1: 0,
        hour2: 0,
        min1: 0,
        min2: 0,
        ss1: 0,
        ss2: 0
      },
      differ: 0
    }
  },
  props: ['startTime', 'endTime'],
  methods: {
    engineStart () {
      this.differ = this.endTime - this.startTime
      this.setCountDown(this.differ)
      setInterval(() => {
        this.differ = this.differ - 1000
        this.setCountDown()
      }, 1000)
    },
    setCountDown () {
      if (this.differ < 0){
        return false
      }
      const hour = parseInt(this.differ / (60 * 60 * 1000)) // 先算有多少小时
      if (hour > 99) {
        this.countInfo.hour0 = parseInt(hour / 100)
      } else if (hour > 9) {
        this.countInfo.hour1 = parseInt(hour / 10)
        this.countInfo.hour2 = hour % 10
      } else {
        this.countInfo.hour1 = 0
        this.countInfo.hour2 = hour
      }
      const minute = parseInt((this.differ % (60 * 60 * 1000)) / (60 * 1000)) // 多少分钟
      if (minute > 9) {
        this.countInfo.min1 = parseInt(minute / 10)
        this.countInfo.min2 = minute % 10
      } else {
        this.countInfo.min1 = 0
        this.countInfo.min2 = minute
      }
      const second = parseInt((this.differ % (60 * 1000)) / 1000) // 多少秒
      if (second > 9) {
        this.countInfo.ss1 = parseInt(second / 10)
        this.countInfo.ss2 = second % 10
      } else {
        this.countInfo.ss1 = 0
        this.countInfo.ss2 = second
      }
    }
  }
}
</script>

<style lang="stylus">
  .count-down{
    display: flex;
    .count-down-item{
      display: inline-block;
      margin-right: 6px;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      background: #fda90b;
      color: #fff;
      border-radius: 5px;
      font-size: 15px;
      &:last-child{
        margin-right: 0;
      }
    }
    em{
      margin-right: 6px;
      line-height: 24px;
      font-size: 15px;
      font-style: normal;
      font-weight: bold;
    }
  }
</style>
