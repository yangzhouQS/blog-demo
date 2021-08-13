<template>
  <div class="demo">
    demo quasar
    <div v-touch-hold.mouse="handleHold" style="width: 300px;height: 210px;background:red;">
      xxx
    </div>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {}
  },
  computed: {},
  mounted() {
  },
  methods: {
    handleHold(){
      console.log(arguments)
    }
  }
}
</script>

<style scoped lang="postcss">
.demo {
}
</style>
