<template>
  <div class="singer" ref="singer">
    <list-view
      @select="selectSinger"
      ref="list"
      :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from '@api/singer'
import ListView from '@components/listview/Index.vue'
import { ERR_OK } from '@api/config'
import {mapMutations} from 'vuex'
import {playlistMixin} from '@mixin'

export default {
  name: 'singer',
  mixins: [playlistMixin],
  components: {
    ListView,
  },
  data() {
    return {
      singers: [],
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '0'
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`,
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      // 热门
      let hot = {
        title: '热门',
        items: [],
      }
      list.splice(0, 10).forEach((item) => {
        hot.items.push({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg`,
        })
      })

      // 分组歌手
      let map = {}
      list.forEach((item) => {
        const key = item.Findex
        if (!key.match(/[a-zA-Z]/g)) return
        if (!map[key]) {
          map[key] = {
            title: key,
            items: [],
          }
        }
        map[key].items.push({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg`,
        })
      })

      // 把数据排序成 [{title: '热门', items: []}, {title: 'A', iteems: []}, {title: 'B', iteems: []}]这种格式
      const results = Object.keys(map)
        .sort((a, b) => {
          return a.charCodeAt(0) - b.charCodeAt(0)
        })
        .map((val) => map[val])
      results.unshift(hot)

      return results
    },
    ...mapMutations({
      setSinger: 'SET_SINGER',
    }),
  },
}
</script>

<style lang="stylus" scoped>
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>


