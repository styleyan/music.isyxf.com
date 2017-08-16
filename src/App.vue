<template>
  <div id="app">
    <logo></logo>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Tab from '@components/tab/Tab.vue'
import Logo from '@components/logo/Logo.vue'

export default {
  name: 'app',
  components: {
    Tab,
    Logo,
  },
}
</script>

