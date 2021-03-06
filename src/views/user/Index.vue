<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches v-model="currentIndex" :switches="switches"></switches>
      </div>
      <div ref="playBtn" @click="random" class="play-btn">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll class="list-scroll"
          ref="favoriteList" 
          v-if="currentIndex===0"
          :data="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll class="list-scroll"
          ref="playList"
          v-if="currentIndex===1"
          :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>

<script>
import Switches from '@components/switches/Index.vue'
import Scroll from '@components/scroll/Scroll.vue'
import SongList from '@components/song-list/Index.vue'
import NoResult from '@components/no-result/Index.vue'
import {mapGetters, mapActions} from 'vuex'
import Song from '@utils/song'
import {playlistMixin} from '@mixin'

export default {
  name: 'user-center',
  mixins: [playlistMixin],
  components: {
    Switches,
    Scroll,
    SongList,
    NoResult,
  },
  data() {
    return {
      currentIndex: 0,
      switches: [
        {name: '我喜欢的'},
        {name: '最近听的'},
      ],
    }
  },
  computed: {
    noResult() {
      return !(this.currentIndex ? this.playHistory.length : this.favoriteList.length)
    },
    noResultDesc() {
      return this.currentIndex ? '你还没有听过歌曲' : '暂无收藏歌曲'
    },
    ...mapGetters([
      'favoriteList',
      'playHistory',
    ]),
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = bottom
      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      this.$refs.playList && this.$refs.playList.refresh()
    },
    selectSong(song) {
      this.insertSong(new Song(song))
    },
    back() {
      this.$router.back()
    },
    random() {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      if (!list.length) return
      list = list.map((song) => {
        return new Song(song)
      })
      this.randomPlay({
        list,
      })
    },
    ...mapActions([
      'insertSong',
      'randomPlay',
    ]),
  },
}
</script>

<style scoped lang="stylus">
  @import "~@stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
