import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Recommend = (resolve) => {
  import('@views/recommend/Index').then((module) => {
    resolve(module)
  })
}

const RecommendDetail = (resolve) => {
  import('@views/recommend/Detail').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('@views/rank/Index').then((module) => {
    resolve(module)
  })
}

const RankDetail = (resolve) => {
  import('@views/rank/Detail').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('@views/search/Index').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve) => {
  import('@views/singer/Index').then((module) => {
    resolve(module)
  })
}

const SingerDetail = (resolve) => {
  import('@views/singer/Detail').then((module) => {
    resolve(module)
  })
}

const User = (resolve) => {
  import('@views/user/Index').then((module) => {
    resolve(module)
  })
}

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
    {
      path: '/User',
      component: User,
    },
  ],
})
