<template>
  <div id="app">
    <logo></logo>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Tab from '@components/tab/Tab.vue'
import Logo from '@components/logo/Logo.vue'
import Player from '@components/player/Index.vue'

export default {
  name: 'app',
  components: {
    Tab,
    Logo,
    Player,
  },
}
</script>

