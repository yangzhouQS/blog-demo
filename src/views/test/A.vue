<template>
  <div class="test-a">
    test-a
    <el-divider>A组件</el-divider>
    <el-input v-model="input" placeholder="placeholder"></el-input>
    <el-button type="primary" @click="goTo">去B组件</el-button>
  </div>
</template>

<script>
  export default {
    name: 'A',
    data () {
      return {
        input: ''
      }
    },
    mounted () {
      console.log('AAAAAAAAA')
      this.reload()
    },
    computed: {},
    methods: {
      reload () {
      },
      goTo () {
        this.$router.push({ name: 'b-test' })
      }
    }
  }
</script>

<style scoped>

</style>