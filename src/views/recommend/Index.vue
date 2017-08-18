<template>
  <div>
    这是首页
  </div>
</template>

<script>
import {getRecommend} from '@api/recommend'
import {ERR_OK} from '@api/config'

export default {
  name: 'recommend',
  created() {
    this.getRecommendData()
  },
  methods: {
    getRecommendData() {
      getRecommend().then((data) => {
        if (data.code === ERR_OK) {
          console.log(data.data.slider)
        }
      })
    },
  },
}
</script>
