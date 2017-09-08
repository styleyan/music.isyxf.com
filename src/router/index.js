import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@views/recommend/Index'
import RecommendDetail from '@views/recommend/Detail'
import Rank from '@views/rank/Index'
import RankDetail from '@views/rank/Detail'
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
      children: [
        {
          path: ':id',
          component: RecommendDetail,
        },
      ],
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
      children: [
        {
          path: ':id',
          component: RankDetail,
        },
      ],
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail,
        },
      ],
    },
  ],
})
