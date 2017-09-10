<template>
  <transition name="slide">
    <div class="add-song" v-show="showFalg" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox" placeholder="搜索歌曲" v-model="query"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches 
          :switches="switches" 
          v-model="currentIndex"></switches>
      </div>
      <div class="search-result" v-show="query">
        <suggest 
          :query="query" 
          :showSinger="showSinger"
          @select="selectSuggest"
          @listScroll="blurInput"></suggest>
      </div>
    </div>
  </transition>
</template>

<script>
import SearchBox from '@components/search-box/Index.vue'
import Suggest from '@components/suggest/Index.vue'
import searchMixin from '@mixin/search'
import Switches from '@components/switches/Index.vue'

export default {
  name: 'add-song',
  mixins: [searchMixin],
  components: {
    SearchBox,
    Suggest,
    Switches,
  },
  data() {
    return {
      showFalg: false,
      showSinger: false,
      switches: [
        {name: '最近播放'},
        {name: '搜索历史'},
      ],
      currentIndex: 0,
    }
  },
  methods: {
    show() {
      this.showFalg = true
    },
    hide() {
      this.showFalg = false
    },
    selectSuggest() {
      this.saveSearch()
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import "~@stylus/variable"
  @import "~@stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>

