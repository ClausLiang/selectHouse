<template>
  <div class="select-hourse">
    <div class="select-btn">
      <div class="select-item" @click="selectHouseTypeHandle">
        <span v-show="houseTypeSelected.value">{{houseTypeSelected.label}}</span>
        <span v-show="!houseTypeSelected.value">全部户型</span>
      </div>
      <div class="select-item" @click="selectState">
        <span>{{stateSelected.label}}</span>
      </div>
      <div class="select-item" @click="selectBuilding">
        <span v-show="buildingSelected.value">{{buildingSelected.label.length > 4 ? buildingSelected.label.substring(0,4) + '...' : buildingSelected.label}}</span>
        <span v-show="!buildingSelected.value">楼栋</span>
      </div>
    </div>
    <OptionComp :optionList="houseTypeList" :selectItem="houseTypeSelected" ref="selectHouseTypeComp" @getSelect="getHouseType"></OptionComp>
    <OptionComp :optionList="stateList" :selectItem="stateSelected" ref="selectStateComp" @getSelect="getState"></OptionComp>
    <OptionComp :optionList="buildingList" :selectItem="buildingSelected" ref="selectBuildingComp" @getSelect="getBuilding"></OptionComp>
    <!--单元-->
    <div class="unit-wrapper" ref="unitWrapper">
      <div class="unit">
        <span :class="unitSelected.unit === item.unit ? 'unit-item on' : 'unit-item'"
              v-for="item in unitList" @click="unitChange(item)">{{item.unitName}}</span>
      </div>
    </div>
    <!--楼层与每户-->
    <div class="big-wrapper">
      <!--每层-->
      <dl class="floor-wrapper" v-for="floor in houseList">
        <dt class="floor-name">{{floor.floorName}}</dt>
        <dd class="floor-content" :ref="'floorContent' + floor.floor">
          <div class="floor-content-content" :ref="'floorContentContent' + floor.floor">
            <!--每户-->
            <dl :class="house.salesStatus === '5' ? 'house-wrapper on': 'house-wrapper'" v-for="house in floor.estateHouseVO"
                @click="showSelectHouseModalHandle(house)">
              <dt class="house-name">{{house.cellName}}<span style="display: none;">{{house.salesStatus}}</span></dt>
              <dd class="house-area">{{house.area}}m²</dd>
            </dl>
          </div>
        </dd>
      </dl>
    </div>
    <!--弹窗1-->
    <SelectHouseModal ref="bigModal" :house="clickHouse" @confirmSelect="confirmSelectNext"></SelectHouseModal>
    <!--弹窗2-->
    <confirmSelectModal ref="modal2" :house="clickHouse" @trueSelect="trueSelectHandle"></confirmSelectModal>
    <!--弹窗3-->
    <SuccessSelectModal ref="modal3" :house="clickHouse" :successMsg="successMsg"></SuccessSelectModal>
    <!--已有订单提示-->
    <hasOrder ref="hasOrder"></hasOrder>
    <Modal ref="modal" :content="tip"></Modal>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import OptionComp from '../common/OptionComp'
  import SelectHouseModal from '../commonModal/selectHouseModal'
  import confirmSelectModal from '../commonModal/confirmSelectModal'
  import SuccessSelectModal from '../commonModal/SuccessSelectModal'
  import hasOrder from '../commonModal/hasOrder'
  import Modal from '../commonModal/Modal'
  export default {
    name: "select-house",
    components: {OptionComp,SelectHouseModal,confirmSelectModal,SuccessSelectModal, Modal,hasOrder},
    data () {
      return {
        // ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽ 三个自定义下拉框 end
        houseTypeSelected: {},
        houseTypeList: [
          {value: undefined, label: '全部户型'},
          {value: 1, label: '1室1厅'},
          {value: 2, label: '2室1厅'},
          {value: 3, label: '2室2厅'},
        ],
        stateSelected: {value: -1, label: '全部状态'},
        stateList: [
          {value: -1, label: '全部状态'},
          {value: 5, label: '已选'},
          {value: 0, label: '未选'},
        ],
        buildingSelected: {value: 1, label: 'A1栋'},
        buildingList: [
          {value: 1, label: 'A1栋'},
          {value: 2, label: 'A2栋'},
          {value: 3, label: 'A3栋'},
          {value: 4, label: 'A4栋'},
          {value: 5, label: 'A5栋'},
          {value: 6, label: '这个楼栋名字比较长'},
          {value: 7, label: 'A7栋'},
          {value: 8, label: 'A8栋'},
          {value: 9, label: 'A9栋'},
          {value: 10, label: 'A10栋'},
          {value: 11, label: 'A11栋'},
          {value: 12, label: 'A12栋'},
          {value: 13, label: 'A13栋'},
          {value: 14, label: 'A14栋'},
          {value: 15, label: 'A15栋'},
          {value: 16, label: 'A16栋'},
          {value: 17, label: 'A17栋'},
        ], // 楼栋
        // △△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△ 三个自定义下拉框 end
        // 单元
        unitSelected: {unit: "1", unitName: "1单元"},
        unitList: [
          {unit: "1", unitName: "1单元"},
          {unit: "2", unitName: "2单元"},
          {unit: "3", unitName: "3单元"},
          {unit: "4", unitName: "4单元"},
          {unit: "5", unitName: "5单元"},
          {unit: "6", unitName: "6单元"},
          {unit: "7", unitName: "7单元"},
        ],
        // 楼层包括每层的房间
        houseList: [],
        clickHouse: {},
        tip: '', // 错误提示
        successMsg: '' // 订单成功提示语
      }
    },
    created () {
      if (this.$route.query.type === 'formal') {
        document.title = '在线选房'
      } else {
        document.title = '模拟选房'
      }
    },
    mounted () {
      this.unitScrollH()
      this.getCellList()
    },
    methods: {
      // 单元横向滚动效果
      unitScrollH () {
        if (!this.unitScroll) {
          this.unitScroll = new BScroll(this.$refs.unitWrapper, {
            scrollX: true, // 设置横向滚动
            eventPassthrough: 'vertical' // 忽略垂直滚动
          })
        } else {
          this.unitScroll.refresh()
        }
      },
      // 获取楼层及每户
      getCellList () {
        this.axios.get('./static/data/selectHouse.json').then(res => {
          this.houseList = res.data
          this.$nextTick(() => {
            this.houseListScroll()
          })
        })
      },
      // 每户（超过5户）横向滚动效果
      houseListScroll () {
        this.houseList.forEach(floor => {
          if (floor.estateHouseVO) {
            let width = 72 * floor.estateHouseVO.length
            this.$refs['floorContentContent' + floor.floor][0].style.width = width + 'px' // 子元素加宽度
            new BScroll(this.$refs['floorContent' + floor.floor][0], {
              scrollX: true, // 设置横向滚动
              eventPassthrough: 'vertical' // 忽略垂直滚动
            })
          }
        })
      },
      // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼自定义三下拉框 start
      // 选择户型
      selectHouseTypeHandle () {
        this.$refs.selectHouseTypeComp.showOptionHandle()
        this.$refs.selectStateComp.showOption = false
        this.$refs.selectBuildingComp.showOption = false
      },
      // 获取选择的户型
      getHouseType (state) {
        this.houseTypeSelected = state
      },
      // 选择状态
      selectState () {
        this.$refs.selectStateComp.showOptionHandle()
        this.$refs.selectHouseTypeComp.showOption = false
        this.$refs.selectBuildingComp.showOption = false
      },
      // 获取选择的状态
      getState (state) {
        this.stateSelected = state
      },
      // 选楼栋
      selectBuilding () {
        this.$refs.selectBuildingComp.showOptionHandle()
        this.$nextTick(() =>{
          this.$refs.selectBuildingComp.scrollInit()
        })
        this.$refs.selectStateComp.showOption = false
        this.$refs.selectHouseTypeComp.showOption = false
      },
      // 获取选择的楼栋
      getBuilding (state) {
        this.buildingSelected = state
      },
      // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲自定义三下拉框 end
      unitChange (item) {
        this.unitSelected = item
      },
      // 展示选房弹窗
      showSelectHouseModalHandle (house) {
        if (house.salesStatus != 0) {
          return false
        }
        this.$refs.bigModal.collect = false
        this.$nextTick(() => {
          this.$refs.bigModal.modalVisible = true
          this.clickHouse = house
        })
      },
      // 点击立即选房后
      confirmSelectNext () {
        this.$refs.modal2.modalVisible = true
      },
      trueSelectHandle () {
        this.$refs.modal3.modalVisible = true
      }
    }
  }
</script>

<style scoped lang="stylus">
  .select-hourse{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    background: #f4f4f4;
    padding-top: 34px;
    .select-btn{
      position: fixed;
      z-index: 99;
      top: 0;
      width: 100%
      height: 34px;
      background: #fff;
      display: flex;
      .select-item{
        flex: 1;
        text-align: center;
        height: 34px;
        line-height: 34px;
        span{
          padding: 0 15px;
          font-size: 13px;
          background: url("./img/arrow-down@2x.png") no-repeat;
          background-size: 6px 4px;
          background-position: right center
          white-space: nowrap;
        }
      }
    }
    .unit-wrapper{
      height: 26px;
      margin: 16px;
      .unit{
        display: inline-flex;
        .unit-item{
          width: 50px;
          height: 26px;
          line-height: 26px;
          margin-right: 16px;
          border-radius: 5px;
          background: #e0e0e0;
          color: #969696;
          font-size: 13px;
          text-align: center;
          &.on{
            background: #fda90b;
            color: #fff;
          }
        }
      }
    }
    .big-wrapper{
      /*楼层*/
      .floor-wrapper{
        .floor-name{
          height: 32px;
          line-height: 32px;
          padding: 0 16px;
          font-size: 15px;
          font-weight: bold;
        }
        .floor-content{
          margin-bottom: 20px;
          .floor-content-content{
            display: flex;
            /*每户*/
            .house-wrapper{
              margin-left: 20px;
              flex: 0 0 52px;
              width: 52px;
              height: 47px;
              background: url("./img/canselect@2x.png") no-repeat;
              background-size: 52px 47px;
              padding-top: 14px;
              box-sizing: border-box;
              .house-name{
                font-size: 10px;
                line-height: 14px;
                color: #676767;
                text-align: center;
              }
              .house-area{
                font-size: 12px;
                line-height: 17px;
                color: #0b212d;
                text-align: center;
              }
              &.on{
                background: url("./img/unselect@2x.png") no-repeat;
                background-size: 52px 47px;
                .house-name, .house-area{
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
