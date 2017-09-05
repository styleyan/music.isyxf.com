<template>
  <div class="rank" ref="rank">
    <transition name="slide">
      <music-list
        :title="title"
        :bg-image="bgImage"
      ></music-list>
    </transition>
  </div>
</template>

<script>
import MusicList from '@components/music-list/Index.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'rank-detail',
  components: {
    MusicList,
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      return this.topList.picUrl
    },
    ...mapGetters([
      'topList',
    ]),
  },
}
</script>

<style scoped lang="stylus">
.slide-enter-active, .slide-leave-active
  transition: all 0.3s ease

.slide-enter, .slide-leave-to
  transform : translate3d(100%, 0, 0)
</style>
