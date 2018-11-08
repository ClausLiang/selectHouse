<template>
  <div class="option-wrapper" v-show="showOption" @click="hideHandle" ref="optionWrapper">
    <div class="option-list">
      <div v-for="item in optionList" :class="item.value === selectItem.value ? 'option-item on' : 'option-item'" :key="item.value" @click="selectHandle(item)">{{item.label}}</div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'option-comp',
    data () {
      return {
        showOption: false
      }
    },
    props: ['optionList', 'selectItem'],
    methods: {
      scrollInit () {
        new BScroll(this.$refs.optionWrapper, {click: true})
      },
      showOptionHandle () {
        this.showOption = !this.showOption
      },
      selectHandle (item) {
        this.showOption = false
        this.$emit('getSelect', item) // 将选中的值派发给父组件
      },
      hideHandle () {
        this.showOption = false
      }
    }
  }
</script>

<style scoped lang="stylus">
  .option-wrapper{
    position: fixed;
    top: 34px;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 97;
    .option-list{
      position: absolute;
      z-index: 99;
      top: 0;
      width: 100%;
      left: 0;
      background: #fff;
      .option-item{
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #e7e7e7;
        text-align: center;
        color: #666565;
        font-size: 15px;
        &.on{
          color: #fda90b;
        }
      }
    }
  }
</style>
