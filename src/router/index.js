import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@views/recommend/Index'
import Rank from '@views/Rank/Index'
import Search from '@views/Search/Index'
import Singer from '@views/Singer/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
    },
    {
      path: '/recommend',
      component: Recommend,
    },
    {
      path: '/singer',
      component: Singer,
    },
    {
      path: '/rank',
      component: Rank,
    },
    {
      path: '/search',
      component: Search,
    },
  ],
})
