<template>
  <div>
    xxx
  </div>
</template>

<script>

export default {
  name: 'test-table',
  components: {

  },
  data() {
    return {
      row: {
        purchaseNum: 0
      }
    }
  },
  mounted() {
  },
  methods: {
    test() {
      console.log(this.$refs['table'])
    }
  }
}
</script>

<style scoped>

</style>
