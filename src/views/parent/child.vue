<template>
  <div class="child">
    <label>
      <el-input type="text" v-model="data" />
    </label>
  </div>
</template>

<script>
  export default {
    name: 'child-demo',
    data(){
      return{
        data:'child-demo'
      }
    },
    mounted () {
    },
    methods:{}
  }
</script>

<style scoped>

</style>