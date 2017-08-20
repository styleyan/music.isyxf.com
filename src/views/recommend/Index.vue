<template>
  <div>
    <slider v-if="recommends.length">
      <div v-for="(item,key) in recommends" :key="key">
        <a :href="item.linkUrl">
          <img :src="item.picUrl" />
        </a>
      </div>
    </slider>
  </div>
</template>

<script>
import { getRecommend } from '@api/recommend'
import { ERR_OK } from '@api/config'
import Slider from '@components/slider/Slider.vue'

export default {
  name: 'recommend',
  components: {
    Slider,
  },
  data() {
    return {
      recommends: [],
    }
  },
  created() {
    this.getRecommendData()
  },
  methods: {
    getRecommendData() {
      getRecommend().then((data) => {
        if (data.code === ERR_OK) {
          this.recommends = data.data.slider
        }
      })
    },
  },
}
</script>
