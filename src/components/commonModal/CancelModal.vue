<template>
  <div class="modal" v-show="modalVisible">
    <div class="modal-wrapper">
      <div class="modal-content">
        是否取消订单
      </div>
      <div class="modal-btn">
        <div @click="hideHandle">否</div>
        <div @click="confirmHandle">是</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
      modalVisible: false
    }
  },
  methods: {
    hideHandle () {
      this.modalVisible = false
    },
    confirmHandle () {
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped lang="stylus">
  .modal{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    .modal-wrapper{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 270px;
      height: auto;
      background: #fff;
      border-radius: 8px;
      .modal-content{
        padding: 38px 20px 20px;
        border-bottom: 1px solid #d9d9d9;
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
        text-align: center;
      }
      .modal-btn{
        height: 45px;
        display: flex;
        & > div{
          flex: 1;
          border-right: 1px solid #d9d9d9;
          line-height: 45px;
          color: #007aff;
          font-size: 17px;
          text-align: center;
          &:last-child{
            border-right: none;
          }
        }
      }
    }
  }
</style>
