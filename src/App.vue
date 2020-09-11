<template>
  <div id="app"><!--
    <navigation>
      <router-view/>
    </navigation>-->
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data () {
      return {}
    },
    mounted () {
      document.querySelector('#app').onclick = function (e) {
        e.stopPropagation()
        e.preventDefault()
      }
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
