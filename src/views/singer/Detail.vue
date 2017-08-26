<template>
  <transition name="slide">
    <div class="singer-default">{{singer}}</div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from '@api/singer'
import {ERR_OK} from '@api/config'

export default {
  name: 'singer-detail',
  computed: {
    ...mapGetters([
      'singer',
    ]),
  },
  created() {
    this._getDetail()
    console.log(this.singer)
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push({
          path: '/singer',
        })
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
        }
      })
    },
  },
}
</script>

<style scoped lang="stylus">
  @import '~@stylus/variable'

  .singer-default
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background

  .slide-enter-active,.slide-leave-active 
    transition: all 0.3s

  .slide-enter,.slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>