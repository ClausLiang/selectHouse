<template>
  <div class="home">
    <div class="banner">
      <img :src="houseInfo.img" alt="" width="100%" height="190">
      <div class="clock">
        <span class="clock-title">距离活动开始还剩</span>
        <div class="count-wrapper">
          <CountDown :startTime="countDown.startTime" :endTime="countDown.endTime" ref="countDwonNode"></CountDown>
        </div>
      </div>
    </div>
    <div class="select-btn">
      <div class="left" @click="toSelectPage(0)">模拟选房</div>
      <div class="right" @click="toSelectPage(1)">
        <p class="title">在线选房</p>
        <p class="time">开始时间：{{startTime}}</p>
        <p class="time">结束时间：{{endTime}}</p>
      </div>
    </div>
    <div class="house-info">
      <h2 class="title">{{houseInfo.devName}}</h2>
      <dl class="info">
        <dt>可售楼栋：</dt>
        <dd class="build-special" style="-webkit-box-orient: vertical;">
          <span v-for="(item,index) in houseInfo.build">{{item}}<em v-show="index !== houseInfo.build.length-1">、</em></span>
        </dd>
      </dl>
      <dl class="info">
        <dt>房源数量：</dt>
        <dd>{{houseInfo.available}}套</dd>
      </dl>
    </div>
    <div class="split"></div>
    <div class="main-house">
      <div class="house-title">主力户型</div>
      <div class="main-house-content">
        <dl class="item" v-for="item in houseInfo.buildHouses">
          <dt @click="showImage(item)">
            <img :src="item.houseImg[0].url" alt="" width="115" height="89">
          </dt>
          <dd>
            <p class="title">
              {{item.structure}}
              <span class="state">{{item.status}}</span>
            </p>
            <p>
              <span class="message">{{item.area}}</span>
              <span class="message">{{item.price}}</span>
            </p>
          </dd>
        </dl>
      </div>
    </div>
    <div class="imgPreviewClass" v-show="imgPreviewShow" @click="hideImage">
      <img :src="imgPreviewUrl" alt="">
    </div>
    <Modal ref="modal" :content="tip"></Modal>
  </div>
</template>

<script>
  import utils from '@/commonJs/utils'
  import CountDown from '../common/CountDown'
  import Modal from '../commonModal/Modal'
  export default {
    name: "home",
    components: {CountDown, Modal},
    data () {
      return {
        tip: '',
        countDown: {
          startTime: null,
          endTime: null
        },
        startTime: '',
        endTime: '',
        houseInfo: {
          id: '',
          beginTime: 0,
          endTime: 0,
          readBeginTime: 0,
          realEndTime: 0,
          img: '',
          devId: '',
          devName: '', // 楼盘名称
          available: 0, // 房源数量
          build: '', // 可售楼栋
          buildHouses: []
        },
        imgPreviewShow: false,
        imgPreviewUrl: ''
      }
    },
    created () {
      document.title = '首页'
      this.axios.get('./static/data/home.json').then(res => {
        const result = res.data
        if (result.code == 200) {
          this.houseInfo = result.data
          const startTime = utils.getTomorrowTime('09:00:00'), endTime = utils.getTomorrowTime('10:00:00')
          this.startTime = utils.getTimeString(startTime)
          this.endTime = utils.getTimeString(endTime)
          this.countDown.startTime = new Date()
          this.countDown.endTime = startTime
          this.$nextTick(() => {
            this.$refs.countDwonNode.engineStart()
          })
        }
      })
    },
    methods: {
      toSelectPage (val) {
        if (val === 0) { // 模拟选房
          this.$router.push({path: '/selectHouse', query: {type: 'moni'}})
        } else { // 在线选房
          this.tip = '活动还未开始，可以先进行模拟选房操作'
          this.$refs.modal.modalVisible = true
        }
      },
      showImage (item) {
        this.imgPreviewShow = true
        this.imgPreviewUrl = item.houseImg[0].url
      },
      hideImage () {
        this.imgPreviewShow = false
      }
    }
  }
</script>

<style lang="stylus">
  .home{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    .banner{
      width: 100%;
      height: 190px;
      position: relative;
      background: lightcyan;
      .clock{
        position: absolute;
        width: 100%;
        height: 51px;
        line-height: 51px;
        background: rgba(255, 255, 255, 0.8)
        bottom: 10px;
        z-index: 0;
        padding-left: 16px;
        .clock-title{
          font-size: 14px;
        }
        .count-wrapper{
          display: inline-block;
          padding-left: 5px;
        }
        @media (max-width: 374px){
          padding-left: 6px;
          .count-wrapper{
            padding-left: 2px;
            .count-down{
              .count-down-item{
                margin-right: 4px;
              }
            }
          }
        }
      }
    }
    .select-btn{
      padding: 18px 12px;
      display: flex;
      .left{
        width: 104px;
        height: 55px;
        line-height: 55px;
        margin-right: 15px;
        text-align: center;
        color: #fff;
        background: #fda90b;
        font-size: 14px;
        border-radius: 5px;
      }
      .right{
        flex: 1;
        height: 55px;
        border-radius: 5px;
        background: #fda90b;
        .title{
          padding: 6px 14px 0;
          font-size: 12px;
          line-height: 17px;
          color: #fff;
        }
        .time{
          padding: 0 14px;
          line-height: 14px;
          font-size: 10px;
          color: #fff;
        }
        @media (max-width: 374px){
          .title{
            padding: 6px 6px 0;
          }
          .time{
            padding: 0 6px;
          }
        }
      }
    }
    .house-info{
      padding: 0 20px 20px;
      .title{
        font-size: 16px;
      }
      .info{
        margin-top: 12px;
        display: flex;
        font-size: 14px;
        dt{
          width: auto;
          font-size: 14px;
          color: #666565;
        }
        dd{
          flex: 1;
          font-size: 14px;
          color: #666565;
          &.build-special{
            max-height: 28px;
            display: -webkit-box;
            /* autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
            overflow: hidden;
            span{
              display: inline-block;
              line-height: 15px;
            }
            em{
              font-style: normal
            }
          }
        }
      }
    }
    .split{
      height: 10px;
      background: #f8f8f8;
    }
    .main-house{
      padding: 18px 20px 0;
      .house-title{
        line-height: 20px;
        font-size: 16px;
        font-weight: bold;
      }
      .main-house-content{
        padding: 15px 4px;
        display: flex;
        flex-wrap: wrap;
        .item{
          margin-right: 20px;
          margin-bottom: 10px;
          dt{
            width: 115px;
            height: 89px;
            border: 1px solid #dcdcdc;
          }
          dd{
            p{
              margin-top: 5px;
            }
            .title{
              margin-top: 10px;
              font-size: 14px;
              position: relative;
              .state{
                position: absolute;
                right: 0;
                color: #fda90b;
                font-size: 12px;
              }
            }
            .message{
              font-size: 12px;
              margin-right: 10px;
            }
          }
        }
      }
    }
    .imgPreviewClass{
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.8)
      img{
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
