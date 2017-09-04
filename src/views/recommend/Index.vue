<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="descList">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="(item,key) in recommends" :key="key">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, key) in descList" :key="key" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!descList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK } from '@api/config'
import { getRecommend, getDiscList } from '@api/recommend'
import Loading from '@components/loading/Loading.vue'
import Slider from '@components/slider/Slider.vue'
import Scroll from '@components/scroll/Scroll.vue'
import {playlistMixin} from '@mixin'

export default {
  name: 'recommend',
  mixins: [playlistMixin],
  components: {
    Slider,
    Scroll,
    Loading,
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
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '0'
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
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
          this.descList = data.data.list
        }
      })
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~@stylus/variable"

.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0

.recommend-content
  height: 100%
  overflow: hidden

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

.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
</style>
