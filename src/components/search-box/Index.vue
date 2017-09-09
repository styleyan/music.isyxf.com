<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" ref="query" v-model="modeValue" :placeholder="placeholder" />
    <i v-show="modeValue" @click="clear" class="icon-dismiss"></i>
  </div>
</template>

<script>
import modeValue from '@mixin/mode-value'

export default {
  mixins: [modeValue],
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手',
    },
  },
  data() {
    return {
      nodeValueDelay: 300,
    }
  },
  methods: {
    clear() {
      this.modeValue = ''
    },
    blur() {
      this.$refs.query.blur()
    },
  },
}
</script>

<style scoped lang="stylus">
@import "~@stylus/variable"

.search-box
  display: flex
  align-items: center
  box-sizing: border-box
  width: 100%
  padding: 0 6px
  height: 40px
  background: $color-highlight-background
  border-radius: 6px
.icon-search
  font-size: 24px
  color: $color-background
.box
  flex: 1
  margin: 0 5px
  line-height: 18px
  background: $color-highlight-background
  color: $color-text
  font-size: $font-size-medium
  &::placeholder
    color: $color-text-d
.icon-dismiss
  font-size: 16px
  color: $color-background
</style>


