<template>
  <div class="q-flex-box">
    <div class="fixed-box">
      left top
    </div>
    <div class="flex-box">
      right bottom
    </div>
  </div>
</template>

<script>
  export default {
    name: 'q-flex-box',
    components: {},
    props:{

    },
    data () {
      return {}
    },
    mounted () {
    },
    computed: {},
    methods: {}
  }
</script>
<style>

</style>
<style scoped lang="scss">
  .q-flex-box {
    display: flex;
  }
</style>