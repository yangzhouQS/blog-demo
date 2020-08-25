<template>
  <div style="width: 600px;height: 200px;background: #0086b3;display:flex;align-items: center;flex-direction: column">
    <div class="top">
      <slot name="top"></slot>
    </div>
    <div class="bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my-hello',
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