/**
 * 通过minxin实现通用的v-model双向绑定
 *
 * 使用方式:
 * 1. 通过mixin引入该模块
 * 2. 在模块中使用 modeValue 即可
 */
export default {
  props: {
    value: {
      default: '',
    },
  },
  data() {
    return {
      modeValue: this.value,
    }
  },
  watch: {
    modeValue(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal) {
      this.modeValue = newVal
    },
  },
}
