<template>
    <div class="run-code">
        run-code -x {{ code }} x-
    </div>
</template>

<script>
  import codeMixins from './run-code'

  export default {
    name: 'RunCode',
    mixins: [codeMixins],
    components: {
    },
    data() {
      return {}
    },
    computed: {},
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="postcss">
    .run-code {
    }
</style>
