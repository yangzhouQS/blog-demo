<template>
  <div class="parent-demo">
    <el-button type="primary" @click="hide">切换</el-button>
    <child
        v-if="show"
        @hook:mounted='$_childMounted'
        @hook:beforeUpdated="$_childUpdate"
        @hook:beforeDestroy="$_childDestroy"
    ></child>
  </div>
</template>

<script>
  import child from './child'


  export default {
    name: 'parent-demo',
    components: {child},
    data () {
      return {
        show: true
      }
    },

    methods: {
      $_childMounted () {
        console.log('$_childMounted', arguments)
      },
      $_childUpdate () {
        console.log('$_childUpdate', arguments)
      },
      $_childDestroy () {
        console.log('$_childDestroy', arguments)
      },

      hide(){
        this.show = !this.show
      }
    }
  }
</script>

<style scoped>

</style>