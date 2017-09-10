<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" v-model="query"></search-box>
    </div>
    <shortcut 
      :shortcut="shortcut" 
      v-show="!query" 
      v-model="query"
      @refresh="refreshSuggest"
      :list="hotKey">
      <div class="search-history" v-show="searchHistory.length">
        <h1 class="title">
          <span class="text">搜索历史</span>
          <span class="clear" @click="showConfirm">
            <i class="icon-clear"></i>
          </span>
        </h1>
        <search-list 
          :searches="searchHistory"
          @delete="deleteSearchHistory"
          @select="addQuery"></search-list>
      </div>
    </shortcut>
    <div v-show="query" id="searchResult" class="search-result">
      <suggest ref="suggest" @listScroll="blurInput" @select="saveSearch" :query="query"></suggest>
    </div>
    <confirm 
      ref="confirm" 
      text="是否清空所有搜索历史" 
      confirmBtnText="清空"
      @confirm="clearSearchHistory"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
// todo 这里的confirm组件需要做优化
import SearchBox from '@components/search-box/Index.vue'
import {getHotKey} from '@api/search'
import {ERR_OK} from '@api/config'
import Shortcut from '@components/shortcut/Index.vue'
import Suggest from '@components/suggest/Index.vue'
import SearchList from '@components/search-list/Index.vue'
import Confirm from '@components/confirm/Index.vue'
import {mapActions} from 'vuex'
import searchMixin from '@mixin/search'

export default {
  mixins: [searchMixin],
  components: {
    SearchBox,
    Shortcut,
    Suggest,
    SearchList,
    Confirm,
  },
  data() {
    return {
      hotKey: [],
    }
  },
  created() {
    this._getHotKey()
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory)
    },
  },
  methods: {
    showConfirm() {
      this.$refs.confirm.show()
    },
    refreshSuggest() {
      this.$refs.suggest.refresh()
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.hotkey)
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions([
      'clearSearchHistory',
    ]),
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