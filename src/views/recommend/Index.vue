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
    <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul>
        <li v-for="(item, key) in descList" :key="key" class="item">
          <div class="icon">
            <img width="60" height="60" :src="item.imgurl" />
          </div>
          <div class="text">
            <h2 class="name" v-html="item.creator.name"></h2>
            <p class="desc" v-html="item.dissname"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from '@api/recommend'
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
      descList: [],
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((data) => {
        if (data.code === ERR_OK) {
          this.recommends = data.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((data) => {
        if (data.code === ERR_OK) {
          console.log(data)
          this.descList = data.data.list
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
.recommend-list
  .list-title
    height: 65px
    line-height: 65px
    text-align: center
    font-size: $font-size-medium
    color: $color-theme
  .item
    display: flex
    box-sizing: border-box
    align-items: center
    padding: 0 20px 20px 20px
  .icon
    flex: 0 0 60px
    width: 60px
    padding-right: 20px
  .text
    display: flex
    flex-direction: column
    justify-content: center
    flex: 1
    line-height: 20px
    overflow: hidden
    font-size: $font-size-medium
  .name
    margin-bottom: 10px
    color: $color-text
  .desc
    color: $color-text-d
</style>
