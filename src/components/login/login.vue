<template>
  <div class="login-wrapper">
    <div class="logo">
      <img src="./img/logo@2x.png" alt="logo" width="52" height="29">
    </div>
    <div class="form-class">
      <div class="form-item">
        <label for="phone">手机号</label>
        <input type="tel" placeholder="请输入楼盘预留的手机号" class="phoneInput"
               id="phone" v-model="loginForm.userName" maxlength="11"
               @keyup="loginForm.userName = loginForm.userName.replace(/\D+/,'')">
      </div>
      <div class="form-item">
        <label for="password">验证码</label>
        <input type="password" placeholder="请输入手机验证码" id="password" v-model="loginForm.password">
        <span class="getPass" @click="getCodeHandle" v-show="showIdentifyBtn">获取验证码</span>
        <span class="getPass" v-show="!showIdentifyBtn" style="margin-right: 10px">{{clockNum}}s</span>
      </div>
      <button :class="ifDisable ? 'submit-btn' : 'submit-btn on'" @click="submitHandle">登录</button>
    </div>
    <Modal ref="modal" :content="tip"></Modal>
  </div>
</template>

<script>
  import Modal from '../commonModal/Modal'
  export default {
    name: "login",
    components: {Modal},
    data () {
      return {
        loginForm: {
          userName: '',
          password: ''
        },
        tip: '', // 提示
        activityId: '', // 活动ID
        showIdentifyBtn: true, // 显示获取验证码按钮
        clockNum: 59, // 验证码倒计时
      }
    },
    created () {
      document.title = '登录'
      const url = location.search
      const param = url.substring(1, url.length).split('=')
      if (param[0] === 'id') {
        this.activityId = param[1]
      }
    },
    methods: {
      getCodeHandle () {
        if (this.loginForm.userName === '') {
          this.tip = '请填写手机号'
          this.$refs.modal.modalVisible = true
          return false
        }
        if (this.loginForm.userName.length !== 11) {
          this.tip = '请填写正确的手机号'
          this.$refs.modal.modalVisible = true
          return false
        }
        this.tip = '已发送，请稍后'
        this.$refs.modal.modalVisible = true

        // 验证码倒计时
        this.showIdentifyBtn = false
        let timer = setInterval(() => {
          this.clockNum --
          if (this.clockNum <= 0) {
            clearInterval(timer)
            this.showIdentifyBtn = true
            this.clockNum = 59
          }
        }, 1000)
      },
      submitHandle () {
        if (this.loginForm.userName === '') {
          this.tip = '请填写手机号'
          this.$refs.modal.modalVisible = true
          return false
        }
        if (this.loginForm.userName.length !== 11) {
          this.tip = '请填写正确的手机号'
          this.$refs.modal.modalVisible = true
          return false
        }
        if (this.loginForm.password === '') {
          this.tip = '请填写验证码'
          this.$refs.modal.modalVisible = true
          return false
        }
        if (this.loginForm.userName.length === 11 && this.loginForm.password !== '') {
          let sysUser = {}
          sysUser.name = '梁先生'
          sysUser.mobile = '176****8891'
          window.localStorage.sysUser = JSON.stringify(sysUser)
          this.$router.push({path: '/protocol'})
        }
      }
    },
    computed: {
      ifDisable () {
        if (this.loginForm.userName.length > 0 && this.loginForm.password.length > 0) {
          return false
        } else {
          return true
        }
      }
    }
  }
</script>

<style lang="stylus">
  .login-wrapper{
    background: #fff;
    height: 100%;
    overflow: hidden;
    .logo{
      margin-top: 104px;
      padding: 21px 0;
      text-align: center;
    }
    .form-class{
      padding: 0 28px;
      .form-item{
        height: 40px;
        line-height: 40px;
        margin-top: 20px;
        position: relative;
        &:after{
          display: block
          position: absolute;
          left: 0
          bottom: 0
          width: 100%;
          border-top 1px solid #b2b2b2;
          content: ' ';
          transform: scaleY(0.5)
        }
        label{
          font-size: 15px;
          color: #333;
        }
        input{
          padding-left: 10px;
          border: none;
          outline: none;
          font-size: 12px;
          &.phoneInput{
            width: 200px;
          }
          @media (max-width: 374px){
            width: 134px;
          }
        }
        input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px white inset;
        }
        .getPass{
          color: #fda90b;
          font-size: 12px;
          float: right;
        }
      }
      .submit-btn{
        margin-top: 20px;
        width: 100%;
        height: 52px;
        line-height: 52px;
        color: #fff;
        font-size: 15px;
        border: none;
        border-radius: 5px;
        background: rgba(253, 169, 8, 0.5);
        &.on{
          background: rgb(253, 169, 8);
        }
      }
    }
  }
</style>
