<template>
  <div class="modal" v-show="modalVisible">
    <div class="modal-wrapper">
      <div class="modal-content">{{content}}</div>
      <div class="modal-btn" @click="confirm">确定</div>
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
  props: ['content'],
  methods: {
    confirm () {
      this.modalVisible = false
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
    z-index: 19;
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
      }
      .modal-btn{
        height: 45px;
        line-height: 45px;
        color: #007aff;
        font-size: 17px;
        text-align: center;
      }
    }
  }
</style>
