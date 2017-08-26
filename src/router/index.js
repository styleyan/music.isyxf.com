import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@views/recommend/Index'
import Rank from '@views/rank/Index'
import Search from '@views/search/Index'
import Singer from '@views/singer/Index'
import SingerDetail from '@views/singer/Detail'

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
      children: [
        {
          path: ':id',
          component: SingerDetail,
        },
      ],
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
