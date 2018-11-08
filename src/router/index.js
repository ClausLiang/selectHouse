import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Index from '@/components/Index'
import Home from '@/components/home/home'
import My from '@/components/my/my'
import Protocol from '@/components/protocol/protocol'
import MyOrder from '@/components/my/myOrder/myOrder'
import MyCollect from '@/components/my/myCollect/myCollect'
import SelectHouse from '@/components/selectHouse/selectHouse'
import Detail from '@/components/selectHouse/component/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        // 我的页面
        {
          path: '/my',
          name: 'My',
          component: My
        },
        // 协议页面
        {
          path: '/protocol',
          name: 'Protocol',
          component: Protocol
        },
        // 我的订单页面
        {
          path: '/myOrder',
          name: 'MyOrder',
          component: MyOrder
        },
        // 我的收藏页面
        {
          path: '/myCollect',
          name: 'MyCollect',
          component: MyCollect
        },
        // 选房页面
        {
          path: '/selectHouse',
          name: 'SelectHouse',
          component: SelectHouse
        },
        // 房源详情
        {
          path: '/detail',
          name: 'Detail',
          component: Detail
        }
      ]
    }
  ]
})
