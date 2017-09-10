<template>
  <div ref="shortcutWrapper" class="shortcut-wrapper">
    <scroll :data="shortcut" ref="shortcut" class="shortcut">
      <div>
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item"
              v-for="(item, index) in list"
              @click="clickHandle(item.k)"
              :key="index">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
        <slot></slot>
      </div>
    </scroll>
  </div>
</template>

<script>
import modeValue from '@mixin/mode-value'
import Scroll from '@components/scroll/Scroll.vue'
import {playlistMixin} from '@mixin'

export default {
  mixins: [modeValue, playlistMixin],
  components: {
    Scroll,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    shortcut: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()

      const searchResult = document.getElementById('searchResult')
      if (searchResult) {
        searchResult.style.bottom = bottom
      }
      this.$emit('refresh')
    },
    clickHandle(val) {
      this.modeValue = val
    },
  },
  watch: {
    modeValue(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~@stylus/variable"
@import "~@stylus/mixin"

.shortcut-wrapper
  position: fixed
  top: 178px
  bottom: 0
  width: 100%

.shortcut
  height: 100%
  overflow: hidden

.hot-key
  margin: 0 20px 20px 20px

.title
  margin-bottom: 20px
  font-size: $font-size-medium
  color: $color-text-l

.item
  display: inline-block
  padding: 5px 10px
  margin: 0 20px 10px 0
  border-radius: 6px
  background: $color-highlight-background
  font-size: $font-size-medium
  color: $color-text-d
</style>

