<template>
  <div class="div">
    <params-type :value.sync="type"></params-type>
    <params-type v-model="type"></params-type>
    <p>type = {{type}}</p>
  </div>
</template>

<script>
  import paramsType from './params-type'

  export default {
    components: {paramsType},
    name: 'demo',
    data() {
      return {
        type: 'string'
      }
    },
    methods:{
      selectItem(item){
        console.log(item)
      }
    }
  }
</script>

<style scoped>

</style>