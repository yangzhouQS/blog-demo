<template>
  <div>
    <row :gutter="10">
      世界你好
    </row>
  </div>
</template>

<script>
  import Row from './row';
  export default {
    name: 'yl-flex',
    components: { Row },
    data () {
      return {}
    },
    mounted () {
      this.reload()
    },
    computed: {},
    methods: {
      reload () {
        this.getData()
      },
      getData () {
      }
    }
  }
</script>

<style scoped>

</style>