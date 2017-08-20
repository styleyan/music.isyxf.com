<template>
  <div>
    <div class="slider-wrapper" v-if="recommends.length">
      <slider>
        <div v-for="(item,key) in recommends" :key="key">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" />
          </a>
        </div>
      </slider>
    </div>
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

<style lang="stylus" scoped>
.slider-wrapper
  position: relative
  width: 100%
  overflow: hidden
</style>
