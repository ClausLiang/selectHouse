<template>
  <div class="order-wrapper">
    <div v-if="noOrder">
      <div class="img-wrapper">
        <img src="../img/noOrder@2x.png" alt="" width="200" height="107">
      </div>
      <div class="tip">您还未选择房源</div>
      <div class="back-btn"><router-link :to="{path: '/my'}"><div>返回</div></router-link></div>
    </div>
    <div v-if="!noOrder" class="order-wrapper-content">
      <div class="success"><img src="../img/success@2x.png" alt="" width="26" height="26">预定成功</div>
      <div class="split"></div>
      <div class="buyPerson">
        <p>购买人：{{userName}}</p>
        <p>手机号：{{mobile}}</p>
      </div>
      <div class="split"></div>
      <div class="house-info">
        <dl>
          <dt>
            <img src="../../../../static/img/huxing.jpeg" alt="" width="100" height="82">
          </dt>
          <dd>
            <p>房号：{{info.cellName}}</p>
            <p>户型：{{info.structure}}</p>
          </dd>
        </dl>
      </div>
      <div class="split"></div>
      <div class="price">总价：{{info.price}}</div>
      <div class="order-btn">
        <span @click="cancelOrderHandle">取消订单</span>
        <router-link :to="{path: '/my'}"><span>返回</span></router-link>
      </div>
    </div>
    <Modal ref="modal" :content="tip"></Modal>
    <CancelModal ref="cancelModal" @confirm="confirmCancel"></CancelModal>
  </div>
</template>

<script>
  import Modal from '../../commonModal/Modal'
  import CancelModal from '../../commonModal/CancelModal'
  export default {
    name: "my-order",
    components: {Modal, CancelModal},
    data () {
      return {
        noOrder: false, // 没有订单
        userName: '梁先生',
        mobile: '176****8891',
        info: {
          cellName: '201',
          structure: '四室两厅两卫',
          price: '200万'
        },
        tip: ''
      }
    },
    created () {
      document.title = '我的订单'
    },
    methods: {
      // 取消订单
      cancelOrderHandle () {
        this.$refs.cancelModal.modalVisible = true
      },
      // 确认取消订单
      confirmCancel () {
        this.$refs.cancelModal.hideHandle()
        this.noOrder = true
      }
    }
  }
</script>

<style scoped lang="stylus">
  .order-wrapper{
    position: absolute;
    top: 0;
    bottom: -56px;
    width: 100%;
    background: #fff;
    .img-wrapper{
      margin-top: 115px;
      height: 107px;
      text-align: center;
    }
    .tip{
      margin-top: 25px;
      text-align: center;
      font-size: 15px;
      color: #a4a4a4;
    }
    .back-btn{
      a{
        text-decoration: none;
        color: #fff;
      }
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      width: 105px;
      height: 46px;
      line-height: 46px;
      border-radius: 23px;
      background: #fda90b;
      text-align: center;
      font-size: 14px;
    }
    /* 有订单 */
    .order-wrapper-content{
      background: #f8f8f8;
      height: 100%;
      .success{
        height: 83px;
        line-height: 83px;
        text-align: center;
        background: #fff;
        font-size: 16px;
        img{
          margin-right: 15px;
          vertical-align: middle;
          margin-top: -6px;
        }
      }
      .split{
        height: 12px;
        background: #f8f8f8f;
      }
      .buyPerson{
        background: #fff;
        padding: 0 16px;
        p{
          line-height: 43px;
          font-size: 15px;
        }
      }
      .house-info{
        padding: 16px;
        background: #fff;
        dl{
          display: flex;
          dt{
            width: 100px;
            height: 82px;
          }
          dd{
            margin-left: 16px;
            flex: 1;
            font-size: 14px;
            line-height: 2;
          }
        }
      }
      .price{
        padding: 0 16px;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        background: #fff;
      }
      .order-btn{
        position: absolute;
        bottom: 50px;
        left: 50%;
        margin-left: -104px;
        width: 208px;
        height: 46px;
        border-radius: 23px;
        background: #fda90b;
        @media (max-width: 374px){
          bottom: 30px;
        }
        span{
          display: inline-block;
          position: absolute;
          left: 0;
          top: 15px;
          width: 50%;
          height: 16px;
          line-height: 16px;
          border-right: 1px solid rgba(255,255,255,0.5);
          box-sizing: border-box;
          text-align: center;
          font-size: 14px;
          color: #fff;
          &:last-child{
            border-right: none;
            left: 50%;
          }
        }
      }
    }
  }
</style>
