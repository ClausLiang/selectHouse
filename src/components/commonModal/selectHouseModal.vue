<template>
  <div class="modal" v-show="modalVisible" @click="hideHandle">
    <div class="modal-wrapper" @click.stop="keepModal">
      <div class="modal-content">
        <div class="title">{{house.buildName}}{{house.unitName}}</div>
        <div class="modal-main">
          <dl>
            <dt><img src="./img/homenum@2x.png" width="18" height="16" alt=""></dt>
            <dd>{{house.cellName}}</dd>
          </dl>
          <dl>
            <dt><img src="./img/area@2x.png" width="17" height="14" alt=""></dt>
            <dd>{{house.area}}m²</dd>
          </dl>
          <dl>
            <dt><img src="./img/type@2x.png" width="15" height="16" alt=""></dt>
            <dd>{{house.structure}}</dd>
          </dl>
          <dl>
            <dt><img src="./img/money@2x.png" width="17" height="17" alt=""></dt>
            <dd>{{house.price}}</dd>
          </dl>
        </div>
      </div>
      <footer class="modal-btn" v-show="openType !== 'fromDetail'">
        <div class="collection">
          <dl>
            <dt>
              <img src="./img/collection@2x.png" alt="" width="16" height="15" v-show="collect" @click="collectHoseHandle(2)">
              <img src="./img/nocollect@2x.png" alt="" width="16" height="15" v-show="!collect" @click="collectHoseHandle(1)">
            </dt>
            <dd>收藏</dd>
          </dl>
        </div>
        <div class="footer-btn">
          <div class="foot-btn-item" @click.stop="toDetail"><span>查看房源详情</span></div>
          <div class="foot-btn-item" @click.stop="confirmSelectHandle"><span class="span-right">立即选房</span></div>
        </div>
      </footer>
      <footer class="modal-btn2" v-show="openType === 'fromDetail'" @click.stop="confirmSelectHandle">
        立即选房
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
      modalVisible: false,
      collect: false,
    }
  },
  props: ['house', 'openType'],
  methods: {
    // 收藏及取消收藏
    collectHoseHandle () {
      this.collect = !this.collect
    },
    hideHandle () {
      this.modalVisible = false
    },
    keepModal () {
      this.modalVisible = true
    },
    // 点击立即选房按钮
    confirmSelectHandle () {
      this.modalVisible = false
      this.$emit('confirmSelect')
    },
    toDetail () {
      this.modalVisible = false
      this.$router.push({path: '/detail', query: {id: this.house.houseId, type: this.$route.query.type}})
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
      width: 340px;
      height: auto;
      background: #fff;
      .modal-content{
        padding: 16px 0px 18px;
        background: #f8f8f8;
        .title{
          font-size: 15px;
          line-height: 20px;
          text-align: center;
        }
        .modal-main{
          display: flex;
          flex-wrap: wrap;
          dl{
            width: 170px;
            display: flex;
            margin-top: 28px;
            height: 16px;
            dt{
              width: 47px;
              text-align: right;
              padding-right: 10px;
              box-sizing: border-box;
            }
            dd{
              flex: 1;
              font-size: 14px;
              line-height: 16px;
              color: #666565;
            }
          }
        }
      }
      .modal-btn2{
        height: 46px;
        line-height: 46px;
        text-align: center;
        color: #fff;
        background: #fda90b;
      }
      .modal-btn{
        height: 46px;
        display: flex;
        .collection{
          flex: 0 0 47px;
          width: 47px;
          position: relative;
          background: #fff;
          dl{
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            dt{
              height: 15px;
              text-align: center;
              img{
                vertical-align: top;
              }
            }
            dd{
              padding-top: 4px;
              font-size: 10px;
              line-height: 10px;
              color: #868686;
              text-align: center;
            }
          }
        }
        .footer-btn{
          flex: 1;
          display: flex;
          .foot-btn-item{
            flex: 1;
            position: relative;
            background: #fda90b;
            span{
              display: block;
              width: 100%;
              height: 16px;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              font-size: 14px;
              line-height: 16px;
              color: #fff;
              text-align: center;
              border-right: 1px solid rgba(255, 255, 255, 0.5);
              box-sizing: border-box;
            }
            .span-right{
              border-right: none;
            }
          }
        }
      }
    }
  }
</style>
