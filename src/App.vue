<template>
  <div id="app">
    <navigation>
      <router-view/>
    </navigation>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data () {
      return {}
    },
    methods: {}
  }
</script>
<style lang="scss">
  html, body, #app {
    width: 100%;
    height: 100%;
  }
</style>
