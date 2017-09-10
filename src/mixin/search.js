import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
      query: '',
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory',
    ]),
  },
  methods: {
    addQuery(val) {
      this.query = val
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
    ]),
  },
}