<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" v-model="query"></search-box>
    </div>
    <shortcut v-show="!query" v-model="query" :list="hotKey"></shortcut>
    <div v-show="query" class="search-result">
      <suggest @listScroll="blurInput" :query="query"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from '@components/search-box/Index.vue'
import {getHotKey} from '@api/search'
import {ERR_OK} from '@api/config'
import Shortcut from '@components/shortcut/Index.vue'
import Suggest from '@components/suggest/Index.vue'

export default {
  components: {
    SearchBox,
    Shortcut,
    Suggest,
  },
  data() {
    return {
      hotKey: [],
      query: '',
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    blurInput() {
      this.$refs.searchBox.blur()
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.hotkey)
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~@stylus/variable"
@import "~@stylus/mixin"

.search
.search-box-wrapper
  margin: 20px

.search-history
  position: relative
  margin: 0 20px

  .title
    display: flex
    align-items: center
    height: 40px
    font-size: $font-size-medium
    color: $color-text-l

  .text
    flex: 1

  .clear
    extend-click()

  .icon-clear
    font-size: $font-size-medium
    color: $color-text-d

.search-result
  position: fixed
  width: 100%
  top: 178px
  bottom: 0
</style>