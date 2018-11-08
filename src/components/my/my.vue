<template>
  <div class="my-wrapper" ref="myWrapper">
    <div class="my-wrapper-innner">
      <div class="avatar-wrapper">
        <dl class="avatar">
          <dt><img src="./img/avatar@2x.png" alt="avatar"></dt>
          <dd>{{userName}}</dd>
        </dl>
      </div>
      <div class="split"></div>
      <div class="my-item">
        <router-link :to="{path: '/myOrder'}"><div>我的订单<img src="./img/right-arrow@2x.png" alt="" width="6" height="11"></div></router-link>
      </div>
      <div class="split"></div>
      <div class="my-item">
        <router-link :to="{path: '/myCollect'}"><div>我的收藏<img src="./img/right-arrow@2x.png" alt="" width="6" height="11"></div></router-link>
      </div>
      <div class="split"></div>
      <div class="my-item">
        <router-link :to="{path: '/protocol', query: {type: 'my'}}"><div>购房须知<img src="./img/right-arrow@2x.png" alt="" width="6" height="11"></div></router-link>
      </div>
      <div class="split"></div>
      <div class="my-item" @click="showCallModal">
        <div>售楼处电话<img src="./img/right-arrow@2x.png" alt="" width="6" height="11"></div>
      </div>
      <div class="logout-wrapper">
        <div class="logoutClass" @click="logOutHandle">退出登录</div>
      </div>
    </div>
    <CallModal ref="callComp"></CallModal>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import CallModal from '../commonModal/callModal'
  export default {
    name: "my",
    components: {CallModal},
    data () {
      return {
        userName: '梁先生',
      }
    },
    created () {
      document.title = '我的'
    },
    mounted () {
      new BScroll(this.$refs.myWrapper, {click: true})
    },
    methods: {
      showCallModal () {
        this.$refs.callComp.modalVisible = true
      },
      logOutHandle () {
        localStorage.clear()
        this.$router.push({path: 'login'})
      }
    }
  }
</script>

<style scoped lang="stylus">
  .my-wrapper{
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #f8f8f8;
    .avatar-wrapper{
      height: 192px;
      position: relative;
      background: #fff;
      .avatar{
        width: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        dt{
          width: 100px;
          height: 100px;
          border-radius: 50px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        dd{
          margin-top: 13px;
          height: 21px;
          line-height: 21px;
          font-size: 15px;
          font-weight: bold;
          text-align: center;
        }
      }
    }
    .split{
      height: 12px;
      background: #f8f8f8;
    }
    .my-item{
      height: 44px;
      line-height: 44px;
      padding: 0 16px;
      background: #fff;
      position: relative
      a{
        text-decoration: none;
        color: #000;
      }
      img{
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .logout-wrapper{
      height: 130px;
      position: relative;
      .logoutClass{
        position: absolute;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 48px;
        border-radius: 24px;
        text-align: center;
        line-height: 48px;
        border: 1px solid #fda90b;
        background: #fff;
        color: #fda90b;
      }
    }
  }
</style>
