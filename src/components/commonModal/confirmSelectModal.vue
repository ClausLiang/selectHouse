<template>
  <div class="modal" v-show="modalVisible">
    <div class="modal-wrapper">
      <div class="modal-content">
        <p>房号：{{house.buildName}}{{house.unitName}}{{house.cellName}}</p>
        <p>户型：{{house.structure}}</p>
        <p>总价：{{house.price}}</p>
        <p>购买人：{{userName}}</p>
        <p>手机号：{{mobile}}</p>
        <div class="checked"><img src="./img/check@2x.png" width="16" height="16">我已阅读并同意《在线选房须知》</div>
      </div>
      <div class="modal-btn">
        <div @click="hideHandle">取消</div>
        <div @click="confirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
      modalVisible: false,
      userName: '梁先生',
      mobile: '176****8891'
    }
  },
  props: ['house'],
  methods: {
    hideHandle () {
      this.modalVisible = false
    },
    confirm () {
      this.modalVisible = false
      this.$emit('trueSelect')
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
        p{
          font-size: 14px;
          line-height: 25px;
          color: #666565;
        }
        .checked{
          font-size: 14px;
          line-height: 25px;
          margin-top: 5px;
          color: #9a9a9a;
          white-space: nowrap;
          img{
            margin-right: 8px;
            vertical-align: top;
            margin-top: 4px;
          }
        }
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
