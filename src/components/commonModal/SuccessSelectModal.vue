<template>
  <div class="modal" v-show="modalVisible" @click="hideHandle">
    <div class="modal-wrapper" @click.stop="keepModal">
      <div class="modal-content">
        <div class="title">选房成功</div>
        <p>房号：{{house.buildName}}{{house.unitName}}{{house.cellName}}</p>
        <p>户型：{{house.structure}}</p>
        <p>总价：{{house.price}}</p>
        <p>{{successMsg}}</p>
      </div>
      <div class="modal-btn" @click="toOrderPage">查看我的订单</div>
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
  props: ['house', 'successMsg'],
  methods: {
    hideHandle () {
      this.modalVisible = false
    },
    keepModal () {
      this.modalVisible = true
    },
    toOrderPage () {
      this.$router.push({path: '/myOrder'})
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
        padding: 25px 20px 10px;
        border-bottom: 1px solid #d9d9d9;
        .title{
          font-size: 17px;
          margin-bottom: 25px;
          font-weight: bold;
          text-align: center;
        }
        p{
          font-size: 14px;
          line-height: 25px;
          color: #666565;
          word-wrap: break-word;
        }
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
