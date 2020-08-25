<template>
  <div class="test-b">
    test-b
    <el-divider>B组件</el-divider>
    <el-input v-model="input" placeholder="B组件"></el-input>
    <el-button type="primary" @click="goTo">去A组件</el-button>
    <el-button type="primary" @click="goTo2">去C组件</el-button>
  </div>
</template>

<script>
  export default {
    name: 'B',
    data () {
      return {
        input: ''
      }
    },
    mounted () {
      console.log('BBBBBBBBB')
      this.reload()
    },
    computed: {},
    methods: {
      reload () {
        this.getData()
      },
      goTo () {
        this.$router.push({ name: 'a-test' })
      },
      goTo2 () {
        this.$router.push({ name: 'c-test' })
      },
      getData () {
      }
    }
  }
</script>

<style scoped>

</style>