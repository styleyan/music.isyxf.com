<template>
  <div>
    <slider><div slot="twoSlot">v-text="aaaaa"</div>sdf</slider>
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
