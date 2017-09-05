<template>
  <div class="slide">
    <music-list 
      :title="title"
      :songs="songs"
      :bg-image="bgImage"></music-list>
  </div>
</template>

<script>
import MusicList from '@components/music-list/Index.vue'
import {mapGetters} from 'vuex'
import {getSongList} from '@api/recommend'
import {ERR_OK} from '@api/config'
import {createSong} from '@utils/song'

export default {
  name: 'recommend-detail',
  data() {
    return {
      songs: [],
    }
  },
  components: {
    MusicList,
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc',
    ]),
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~@stylus/variable"

</style>
