import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Pager1 from '@/Pager1'
import Pager2 from '@/Pager2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pager1',
      name: 'Pager1',
      component: Pager1
    },
    {
      path: '/pager2',
      name: 'Pager2',
      component: Pager2
    }
  ]
})
