<template>
  <div class="yl-page-header">
    <div class="title">
      <slot/>
    </div>
    <div class="tool">
      <slot name="tool"/>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'YlPageHeader',
  props: {
    separator: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {}
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import '../styl/var.scss';

.yl-page-header {
  padding: $layout-gap-b $layout-gap-l;
  height: 33px !important;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: $background-color-l;
  font-size: $font-size-13;
  color: $text-regular;

  & > .title {
    font-weight: 500;
    flex: 1;
    display: flex;
  }

  & > .tool {
  }
}
</style>
