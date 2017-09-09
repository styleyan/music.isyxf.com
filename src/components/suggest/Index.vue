<template>
  <scroll class="suggest" 
    :pullup="pullup" 
    :data="result"
    :beforeScroll="beforeScroll"
    @beforeScroll="listScroll"
    ref="suggest"
    @scrollToEnd="searchMore">
    <ul class="suggest-list">
      <li class="suggest-item"
        v-for="(item, index) in result"
        :key="index"
        @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
  import {search} from '@api/search'
  import {ERR_OK} from '@api/config'
  import Scroll from '@components/scroll/Scroll.vue'
  import {createSong} from '@utils/song'
  import Loading from '@components/loading/Loading.vue'
  import Singer from '@utils/singer'
  import {mapMutations, mapActions} from 'vuex'
  import NoResult from '@components/no-result/Index.vue'

  const TYPE_SINGER = 'singer'
  const perpage = 20

  export default {
    components: {
      Scroll,
      Loading,
      NoResult,
    },
    props: {
      query: {
        type: String,
        default: '',
      },
      showSinger: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        page: 1,
        result: [],
        pullup: true,
        hasMore: true,
        beforeScroll: true,
      }
    },
    watch: {
      query() {
        this.search()
      },
    },
    methods: {
      getIconCls(item) {
        return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
      },
      getDisplayName(item) {
        return item.type === TYPE_SINGER ? item.singername : (`${item.name}-${item.singer}`)
      },
      search() {
        this.hasMore = true
        this.page = 1
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            this._checkMore(res.data)
          }
        })
      },
      searchMore() {
        if (!this.hasMore) return
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername,
          })
          this.setSinger(singer)
          this.$router.push({
            path: `/search/${singer.id}`,
          })
        } else {
          this.insertSong(item)
        }
        this.$emit('select')
      },
      listScroll() {
        this.$emit('listScroll')
      },
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false
        }
      },
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({
            ...data.zhida,
            ...{type: TYPE_SINGER},
          })
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      ...mapMutations({
        setSinger: 'SET_SINGER',
      }),
      ...mapActions([
        'insertSong',
      ]),
    },
  }
</script>

<style lang="stylus" scoped>
@import "~@stylus/variable"
@import "~@stylus/mixin"

.suggest
  height: 100%
  overflow: hidden

.suggest-list
  padding: 0 30px

.suggest-item
  display: flex
  align-items: center
  padding-bottom: 20px

.icon
  flex: 0 0 30px
  width: 30px
  [class^="icon-"]
    font-size: 14px
    color: $color-text-d

.name
  flex: 1
  font-size: $font-size-medium
  color: $color-text-d
  overflow: hidden

.text
  no-wrap()
  
.no-result-wrapper
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
</style>
