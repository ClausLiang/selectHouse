<template>
  <div class="main">
    <div class="main-wrapper">
      <router-view/>
    </div>
    <footer class="index-footer">
      <div><router-link :to="{path: '/home'}" active-class="on"><span>首页</span></router-link></div>
      <div class="select-middle">
        <img src="./img/menu_middle@2x.png" alt="select" width="50" height="44" @click="toSelectPage">
      </div>
      <div><router-link :to="{path: '/my'}" active-class="on"><span>我的</span></router-link></div>
    </footer>
    <Modal ref="modal" :content="tip"></Modal>
  </div>
</template>

<script>
  import Modal from './commonModal/Modal'
  export default {
    name: "index",
    components: {Modal},
    data () {
      return {
        tip: ''
      }
    },
    methods: {
      toSelectPage () {
        if(this.$route.path == '/selectHouse') {
          return false
        }
        this.tip = '活动还未开始，可以先进行模拟选房操作'
        this.$refs.modal.modalVisible = true
      }
    },
    created () {
      if (localStorage.getItem('sysUser')) { // 每次刷新页面判断判断状态已登录不做处理

      } else { // 未登录重新登录
        this.$router.push({path: '/login'})
      }
    }

  }
</script>

<style lang="stylus">
  .main{
    height: 100%;
    display: flex;
    flex-direction: column;
    .main-wrapper{
      flex: 1;
      background: #fff;
      position: relative;
    }
    .index-footer{
      height: 56px;
      line-height: 56px;
      border-top: 1px solid #efefef;
      display: flex;
      box-sizing: border-box;
      background: #fff;
      &>div{
        flex: 1;
        text-align: center;
        span{
          display: inline-block;
          height: 55px;
          width: 100%;
          color: #AEAEAE;
          font-size: 13px;
          font-weight: normal;
        }
        .on{
          span{
            color: #1F1E1F;
            font-size: 15px;
            font-weight: bold;
          }
        }
      }
      .select-middle{
        img{
          vertical-align: top;
          margin-top: 6px;
        }
      }
    }
  }
</style>
