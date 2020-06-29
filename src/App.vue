<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return {}
    },
    methods: {
      _test() {
        console.log(arguments)
      },
    },

  }

</script>
<style lang="scss">

</style>
