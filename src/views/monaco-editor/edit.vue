<template>
    <div class="edit">
        edit
    </div>
</template>

<script>
  export default {
    name: 'edit',
    data() {
      return {}
    },
    computed: {},
    mounted() {
      this.initSandbox()
    },
    methods: {
      initSandbox() {
        // First set up the VSCode loader in a script tag
        const getLoaderScript = document.createElement('script')
        getLoaderScript.src = 'https://www.typescriptlang.org/js/vs.loader.js'
        getLoaderScript.async = true
        getLoaderScript.onload = () => {
        }
        document.body.appendChild(getLoaderScript)
      }
    }
  }
</script>

<style scoped lang="postcss">
    .edit {
    }
</style>
