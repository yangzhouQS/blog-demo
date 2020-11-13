<template>
  <div id="app">
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

#xx {
  float: left;
  max-width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
}
</style>
