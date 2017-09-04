<template>
  <div class="slide">
    <music-list 
      :title="title"
      :songs="[]"
      :bg-image="bgImage"></music-list>
  </div>
</template>

<script>
import MusicList from '@components/music-list/Index.vue'
import {mapGetters} from 'vuex'
import {getSongList} from '@api/recommend'
import {ERR_OK} from '@api/config'

export default {
  name: 'recommend-detail',
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
      getSongList(this.disc.dissid).then((res) => {
        console.log(res)
        if (res.code === ERR_OK) {
          console.log(res)
        }
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~@stylus/variable"

</style>
