<template>
  <div class="detail">
    <div class="detail-wrapper" ref="detailWrapper">
      <div>
    <div class="banner">
      <img :src="houseDetail.houseImg ? houseDetail.houseImg[0].url : ''" alt="" width="100%" height="190">
    </div>
    <div class="info-wrapper">
      <div class="info-content">
        <div class="title">
          <span class="type">{{houseDetail.structure}}</span>
          <span class="area">{{houseDetail.fArea}}m²</span>
        </div>
        <div class="price">总价：{{houseDetail.mTotalPrice}}万元</div>
        <div class="price">单价：{{houseDetail.mUnitPrice}}元/m²</div>
        <div class="tip">
          <span v-for="item in houseDetail.lable">{{item}}</span>
        </div>
        <div class="description">
          户型简介：{{houseDetail.introduce}}
        </div>
      </div>
      <div class="building">
        楼盘：{{houseDetail.projectName}}
      </div>
    </div>
    <div class="split"></div>
    <div class="loan">
      <div class="title">
        商贷参考
        <div class="rate">贷款利率{{houseDetail.loanRate}}%</div>
      </div>
      <dl class="loan-content">
        <dt class="loan-left">
          <div class="border"></div>
          <div class="downpaymoney">{{houseDetail.paymentMoney / 10000}}万</div>
          <div class="downpay">首付金额(元)</div>
        </dt>
        <dd class="loan-right">
          <dl class="pay-item">
            <dt>{{houseDetail.repaymentMoney}}</dt>
            <dd>每月还款(元)</dd>
          </dl>
          <dl class="pay-item">
            <dt>{{houseDetail.paymentRate}}成</dt>
            <dd>首付比例</dd>
          </dl>
          <dl class="pay-item">
            <dt>{{houseDetail.loanTotalMoney / 10000}}万</dt>
            <dd>贷款总额(元)</dd>
          </dl>
          <dl class="pay-item">
            <dt>{{houseDetail.loanYears}}年</dt>
            <dd>贷款年限</dd>
          </dl>
        </dd>
      </dl>
    </div>
    <div class="message">信息仅供参考，购买时请以开发商价格为准，请谨慎核查！</div>
      </div>
    </div>
    <footer class="footer-wrapper">
      <div class="collection">
        <dl>
          <dt>
            <img src="./img/collection@2x.png" alt="" width="16" height="15" v-show="collect" @click="collectHoseHandle">
            <img src="./img/nocollect@2x.png" alt="" width="16" height="15" v-show="!collect" @click="collectHoseHandle">
          </dt>
          <dd>收藏</dd>
        </dl>
      </div>
      <div class="footer-btn">
        <div class="foot-btn-item" @click="toSelectHandle"><span>返回列表</span></div>
        <div class="foot-btn-item" @click="selectImmediately"><span class="span-right">立即选房</span></div>
      </div>
    </footer>
    <!--弹窗1-->
    <selectHouseModal ref="modal1" :house="house" openType="fromDetail" @confirmSelect="confirmHandle"></selectHouseModal>
    <!--弹窗2-->
    <confirmSelectModal ref="modal2" :house="house" @trueSelect="trueSelectHandle"></confirmSelectModal>
    <!--弹窗3-->
    <SuccessSelectModal ref="modal3" :house="house" :successMsg="successMsg"></SuccessSelectModal>
    <!--已有订单提示-->
    <hasOrder ref="hasOrder"></hasOrder>
    <Modal ref="modal" :content="tip"></Modal>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import selectHouseModal from '../../commonModal/selectHouseModal'
  import confirmSelectModal from '../../commonModal/confirmSelectModal'
  import SuccessSelectModal from '../../commonModal/SuccessSelectModal'
  import hasOrder from '../../commonModal/hasOrder'
  import Modal from '../../commonModal/Modal'
  export default {
    name: "detail",
    components: {selectHouseModal, confirmSelectModal, SuccessSelectModal, Modal, hasOrder},
    data () {
      return {
        houseId: '',
        tip: '',
        // 弹窗用的对象
        house: {
          // buildName: '125栋',
          // unitName: '1单元',
          // cellName: '101',
          // area: 101,
          // structure: '4室2厅6卫2厨',
          // price: '128万'
        },
        successMsg: '', // 订房成功提示语
        houseDetail: {
          houseImg: [{url: 'xx'}],
          // structure: '3室2厅1卫',
          // fArea: 100,
          // mTotalPrice: 1100.00,
          // mUnitPrice: 20000,
          // lable: ['南北通透', '干湿分离'],
          // introduce: '小洋房，密度低，得房率高达90%，居住舒适度极高，适合自住。',
          // projectName: '珠江帝景1号',
          // loanRate: 4.9,
          // paymentMoney: 0, // 首付
          // repaymentMoney: 0, // 每月还款
          // paymentRate: 3, // 首付比例
          // loanTotalMoney: 0, // 贷款总额
          // loanYears: 30, // 贷款年限
          // keepState: false,
        },
        collect: false
      }
    },
    created () {
      document.title = '房源详情'
      this.houseId = this.$route.query.id
      this.getDetail()
    },
    methods: {
      getDetail () {
        this.axios.get('./static/data/detail.json').then(res => {
          const result = res.data
          if (result.code === 200) {
            result.data.mTotalPrice = (result.data.mTotalPrice / 10000).toFixed(2)
            // 赋值给弹窗需要的对象
            this.house.houseId = result.data.id
            this.house.buildName = result.data.buildName
            this.house.unitName = result.data.unitName
            this.house.cellName = result.data.cellName
            this.house.area = result.data.fArea
            this.house.structure = result.data.structure
            this.house.price = result.data.mTotalPrice + '万元'
            // 详情页的对象
            this.houseDetail = result.data
            this.$nextTick(() => {
              new BScroll(this.$refs.detailWrapper, {click: true})
            })
          }
        })
      },
      // 收藏及取消收藏
      collectHoseHandle () {
        this.collect = !this.collect
      },
      toSelectHandle () {
        this.$router.push({path: '/selectHouse', query: {type: this.$route.query.type}})
      },
      // 点击立即选房
      selectImmediately () {
        this.$refs.modal1.modalVisible = true
      },
      // 点击了立即选房
      confirmHandle () {
        this.$refs.modal2.modalVisible = true
      },
      trueSelectHandle () {
        this.$refs.modal3.modalVisible = true
      }
    }
  }
</script>

<style scoped lang="stylus">
  .detail{
    background: #f8f8f8;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: -13px;
    .detail-wrapper{
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
    }
    .banner{
      height: 190px;
    }
    .info-wrapper{
      background: #fff;
      padding: 20px 0 0 20px;
      .info-content{
        border-bottom: 1px solid #e7e7e7;
        .title{
          span{
            font-size: 16px;
            font-weight: bold;
            margin-right: 12px;
            line-height: 1.5;
          }
        }
        .price{
          font-size: 16px;
          color: #fda90b;
          font-weight: bold;
          line-height: 2;
        }
        .tip{
          span{
            padding: 3px 6px;
            font-size: 10px;
            color: #fff;
            margin-right: 10px;
            background: #fda90b;
            border-radius: 4px;
          }
        }
        .description{
          padding: 19px 20px 10px 0;
          font-size: 14px;
          color: #666565;
          line-height: 1.2;
        }
      }
      .building{
        font-size: 14px;
        line-height: 40px;
      }
    }
    .split{
      height: 10px;
      background: #f8f8f8;
    }
    .loan{
      background: #fff;
      padding-left: 20px;
      .title{
        position: relative;
        height: 44px;
        line-height: 44px;
        border-bottom: 1px solid #e7e7e7;
        font-size: 15px;
        font-weight: bold;
        .rate{
          position: absolute;
          top: 0;
          right: 20px;
          line-height: 44px;
          color: #868686;
          font-size: 12px;
        }
      }
      .loan-content{
        height: 100px;
        display: flex;
        .loan-left{
          position: relative;
          width: 108px
          .border{
            position: absolute;
            width: 100%;
            height: 37px;
            top: 27px;
            border-right: 1px solid #a5a5a5;
          }
          .downpaymoney{
            margin-top: 30px;
            font-size: 18px;
            color: #fda90b;
            text-align: center;
            font-weight: bold;
          }
          .downpay{
            margin-top: 17px;
            font-size: 14px;
            color: #fda90b;
            text-align: center;
          }
        }
        .loan-right{
          flex: 1;
          padding-left: 20px;
          .pay-item{
            width: 50%;
            height: 50px;
            float: left;
            box-sizing: border-box;
            padding: 10px;
            dt{
              font-size: 14px;
              color: #666565;
              line-height: 1.2;
            }
            dd{
              padding-left: 0;
              font-size: 12px;
              color: #868686;
              line-height: 1.2;
            }
          }
        }
      }
    }
    .message{
      padding: 20px 20px 20px;
      font-size: 12px;
      color: #a5a5a5;
    }
    .footer-wrapper{
      height: 46px;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      .collection{
        flex: 0 0 47px;
        width: 47px;
        position: relative;
        background: #fff;
        dl{
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          dt{
            height: 15px;
            text-align: center;
            img{
              vertical-align: top;
            }
          }
          dd{
            padding-top: 4px;
            font-size: 10px;
            line-height: 10px;
            color: #868686;
            text-align: center;
          }
        }
      }
      .footer-btn{
        flex: 1;
        display: flex;
        .foot-btn-item{
          flex: 1;
          position: relative;
          background: #fda90b;
          span{
            display: block;
            width: 100%;
            height: 16px;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
            line-height: 16px;
            color: #fff;
            text-align: center;
            border-right: 1px solid #fff;
            box-sizing: border-box;
          }
          .span-right{
            border-right: none;
          }
        }
      }
    }
  }
</style>
