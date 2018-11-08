<template>
  <div class="collect-wrapper">
    <div v-show="noCollect">
      <div class="img-wrapper">
        <img src="../img/noOrder@2x.png" alt="" width="200" height="107">
      </div>
      <div class="tip">您还没有收藏</div>
      <div class="back-btn"><router-link :to="{path: '/my'}"><div>返回</div></router-link></div>
    </div>
    <div v-show="!noCollect" class="order-wrapper-content">
      <div class="order-wrapper-content-wrapper">
        <div class="house-info" v-for="item in collectList">
          <dl>
            <dt>
              <img src="../../../../static/img/huxing.jpeg" alt="" width="100" height="82">
            </dt>
            <dd>
              <p>房号：{{item.cellName}}</p>
              <p>户型：{{item.structure}}</p>
              <div class="btn" @click="toDetail(item)">查看房源</div>
              <div class="cancel" @click="cancelHandle(item)">x</div>
            </dd>
          </dl>
        </div>
        <div style="height: 100px;"></div>
      </div>
      <div class="order-return">
        <router-link :to="{path: '/my'}"><div>返回</div></router-link>
      </div>
    </div>
    <Modal ref="modal" :content="tip"></Modal>
  </div>
</template>

<script>
  import Modal from '../../commonModal/Modal'
  export default {
    name: "my-collect",
    components: {Modal},
    data () {
      return {
        noCollect: false, // 无收藏
        tip: '',
        collectList: [
          {
            houseId: '',
            devImageUrl: '',
            cellName: '1号楼3单元301',
            structure: '3室2厅1卫1厨',
          },
          {
            houseId: '',
            devImageUrl: '',
            cellName: '1号楼3单元302',
            structure: '3室2厅1卫1厨',
          },
          {
            houseId: '',
            devImageUrl: '',
            cellName: '1号楼3单元303',
            structure: '3室2厅1卫1厨',
          },
          {
            houseId: '',
            devImageUrl: '',
            cellName: '1号楼3单元401',
            structure: '3室2厅1卫1厨',
          },
          {
            houseId: '',
            devImageUrl: '',
            cellName: '1号楼3单元402',
            structure: '3室2厅1卫1厨',
          },
          {
            houseId: '',
            devImageUrl: '',
            cellName: '1号楼3单元403',
            structure: '3室2厅1卫1厨',
          }
        ]
      }
    },
    created () {
      document.title = '我的收藏'
    },
    methods: {
      toDetail (item) {
        this.$router.push({path: '/detail', query: {id: item.houseId}})
      },
      cancelHandle (item) {
        const index = this.collectList.indexOf(item)
        if (index != -1) {
          this.collectList.splice(index, 1)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .collect-wrapper{
    position: absolute;
    top: 0;
    bottom: -56px;
    width: 100%;
    background: #fff;
    .img-wrapper{
      margin-top: 115px;
      height: 107px;
      text-align: center;
    }
    .tip{
      margin-top: 25px;
      text-align: center;
      font-size: 15px;
      color: #a4a4a4;
    }
    .back-btn{
      a{
        text-decoration: none;
        color: #fff;
      }
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      width: 105px;
      height: 46px;
      line-height: 46px;
      border-radius: 23px;
      background: #fda90b;
      text-align: center;
      font-size: 14px;
    }
    /* 有搜藏 */
    .order-wrapper-content {
      background: #f8f8f8;
      position: fixed;
      width: 100%;
      top: 0;
      bottom: 0;
      overflow-y: auto;
      .order-wrapper-content-wrapper{
        width: 100%;
        min-height: 100%;
        .house-info{
          padding: 16px;
          background: #fff;
          margin-bottom: 10px;
          dl{
            display: flex;
            dt{
              width: 100px;
              height: 82px;
            }
            dd{
              margin-left: 16px;
              flex: 1;
              font-size: 14px;
              line-height: 1.8;
              position: relative;
              .btn{
                width: 64px;
                height: 24px;
                line-height: 24px;
                border-radius: 12px;
                border: 1px solid #fda90b;
                color: #fda90b;
                font-size: 11px;
                text-align: center;
              }
              .cancel{
                position: absolute;
                top: 0;
                right: 0;
                font-size: 10px;
                padding: 0 5px 15px 15px;
                color: #333;
              }
            }
          }
        }
      }
      .order-return{
        margin: -80px auto 0;
        a{
          text-decoration: none;
          color: #fff;
        }
        width: 105px;
        height: 46px;
        line-height: 46px;
        border-radius: 23px;
        background: #fda90b;
        text-align: center;
        font-size: 14px;
      }
    }
  }
</style>
