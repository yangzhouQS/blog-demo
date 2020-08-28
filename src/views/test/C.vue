<template>
  <div>
    test-b
    ///
    <el-divider>C组件</el-divider>
    <el-input v-model="input" placeholder="C组件"></el-input>
    <el-button type="primary" @click="goTo">去B组件</el-button>
    <el-button type="primary" @click="goTo2">去A组件</el-button>
  </div>
</template>

<script>
  export default {
    name: 'C',
    data () {
      return { input: '' }
    },
    mounted () {
      this.reload()
    },
    computed: {},
    methods: {
      reload () {
        this.getData()
      },
      goTo () {
        this.$router.push({ name: 'b-test' })
      },
      goTo2 () {
        // this.$router.push({ name: 'a-test' })
        this.$router.go(-1)
      },
      getData () {
      }
    }
  }
</script>

<style scoped>

</style>