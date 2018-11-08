<template>
  <div class="protocol">
    <div class="protocol-wrapper">
    <h2>好生活用户协议</h2>
    <p>为保证购房人顺利通过xxx项目在线开盘系统进行选房，购房人需仔细阅读如下在线开盘须知，在平等自愿的前提下，与卖房人达成以下约定:</p>
    <p>1、购房人已知悉并完全理解国家及xx市相关限购政策，购房人承诺符合xx市限购政策相关文件规定，具备选购本项目房屋的资格(最终购房资格以房管局备案审查为准)。</p>
    <p>2、购房人知悉并同意参与本次在线开盘的条件是已签署xxx项目《服务费缴纳确认书》，并已全款缴纳服务费后方可参加本次活动。</p>
    <p>3、认购时间将由出卖人以电话或短信或微信通知的形式发出。购房人承诺所留联系方式真实有效，出卖人按上述方式发出通知即视为送达，因购房人留存联系信息有误或其他非出卖人原因导致的您未能收到上述通知的，出卖人不承担责任。</p>
    <p>4、购房人本人在选房前自行通过xxx项目在线开盘系统平台或向出卖方销售中心工作人员学习、了解并熟悉选定房源的流程和操作方式，如有任何疑问请及时与出卖方销售中心工作人员联系。</p>
    <p>5、购房人于指定时间内在网络平台进行在线选房操作，当操作成功后，购房人已认购房源不更名、不换房、不退房。若购房人未在前述约定期限内至xxx项目售楼部签订《房屋认购合同》，视为自动放弃线上认购房源，出卖人有权将该房源另行出售并不退还购房人已交服务费。</p>
    <p>6、在线开盘平台所示户型图及周边配套等相关信息仅为展示之用,不得作为交付标准和交付依据。交付标准和交付依据最终以政府审批文件及商品房买卖合同约定为准。</p>
    <p>7、购房人应对其操作行为负责，因操作失误、密码丢失等造成的任何不利后果由购房人自行承担，出卖人不承担任何责任。选房过程中，可能因个人设备或网络故障等原因致使不能成功选房，购房人同意按照出卖人安排参与后续批次选房;非因购房人本人原因造成购房人未认购成功的，购房人可于出卖人通知时间内根据《服务费缴纳确认书》的相关约定前往项目售楼部办理退款，如已成功认购则不可以办理退款。</p>
    <p>8、购房人承诺所提供的资料中所涉及的文件、证件及有关附件均真实有效，相关复印件与原件一致，并对因申请材料虚假所引发的一切后果承担全部法律责任。若购房人不具备购房资格，无论认购行为是否成功，其认购结果均无效，出卖人有权重新处置该认购房源。</p>
    <p>9、购房人对上述条款已仔细阅读，并对上述内容无异议。</p>
    <div class="btn-wrapper">
      <div class="btn" @click="goToH">我已阅读上述须知</div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "protocal",
    data () {
      return {
        fromPage: ''
      }
    },
    created () {
      document.title = '购房须知'
      if (this.$route.query.type == 'my') {
        this.fromPage = 'my'
      }
    },
    methods: {
      goToH () {
        if (this.fromPage == 'my') {
          this.$router.push({path: 'my'})
        } else {
          this.$router.push({path: 'home'})
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .protocol{
    position: absolute;
    top: 0;
    bottom: -56px;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    .protocol-wrapper{
      background: #fff;
      padding: 13px 13px 19px 13px;
    }
    h2{
      text-align: center;
      font-size: 16px;
      margin-bottom: 25px;
      font-weight: bold;
    }
    p{
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 25px;
    }
    .btn-wrapper{
      padding: 15px;
      a{
        text-decoration: none;
      }
      .btn{
        height: 52px;
        line-height: 52px;
        border-radius: 5px;
        background: #fda908;
        text-align: center;
        color: #fff;
        font-size: 16px;
      }
    }
  }
</style>
