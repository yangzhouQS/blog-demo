<template>
  <div>
    <div class="parent" :class="{'is-children': a>0}">
      <div class="children">
        /// 事件 / 逻辑触发修改a的值
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xsxs",
  data() {
    return {
      a:0
    }
  }
}
</script>

<style scoped>

</style>