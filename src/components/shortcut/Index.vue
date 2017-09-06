<template>
  <div class="shortcut-wrapper">
    <div class="shortcut">
      <div class="hot-key">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li class="item" 
            v-for="(item, index) in list"
            @click="clickHandle(index)" 
            :key="index">
            <span>{{item.k}}</span>
          </li>
          <li class="item">{{active}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      value: {
        default: '',
      },
    },
    data() {
      return {
        active: this.value,
      }
    },
    watch: {
      active(newVal) {
        this.$emit('input', newVal)
      },
      value(newVal) {
        this.active = newVal
      },
    },
    methods: {
      clickHandle(index) {
        this.active = this.list[index].k
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

