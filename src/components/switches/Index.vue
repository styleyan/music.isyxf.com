<template>
  <ul class="switches">
    <li class="switch-item" 
      v-for="(item, index) in switches"
      :key="index"
      :class="{'active':modeValue === index}"
      @click="switchItem(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
import modeValue from '@mixin/mode-value'

export default {
  name: 'switches',
  mixins: [modeValue],
  props: {
    switches: {
      type: Array,
      default: [],
    },
  },
  methods: {
    switchItem(index) {
      this.modeValue = index
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~@stylus/variable';

.switches
  display: flex
  align-items: center
  width: 240px
  margin: 0 auto
  border: 1px solid $color-highlight-background
  border-radius: 5px

.switch-item
  flex: 1
  padding: 8px
  text-align: center
  font-size: $font-size-medium
  color: $color-text-d
  &.active
    background: $color-highlight-background
    color: $color-text
</style>
