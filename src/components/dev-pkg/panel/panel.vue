<template>
  <div class="yl-panel" :style="{'width':width}">
    <div v-if="showHeader" class="header">
      <div class="header-content">
        <div v-if="title" class="title">
          <i v-if="icon" :class="icon" />
          {{ title }}
        </div>
        <div class="tool">
          <slot name="tool" />
        </div>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'YlPanel',
    props: {
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '100%'
      },
      showHeader: {
        type: Boolean,
        default: true
      }
    },
    mounted () {},
    methods: {
    }
  }
</script>
<style lang="scss">
@import  '../styl/var.scss';
.yl-panel {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: $background-color-l;
  font-size: $font-size-13;
    & > .header{
      padding: 0px $layout-gap-l;
      & > .header-content {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 1px solid #E4E7ED;
        padding: $layout-gap-b 0px;
        color:$text-primary;
        font-weight: 600;
        & > .title {
          font-size: 14px;
          height: 25px;
          line-height: 25px;
          border-left: $layout-gap-b solid $primary;
          padding-left: $layout-gap-b;
          flex: 1;
        }
        .tool > i {
        }
    }
  }
  &> .content{
      flex:1;
      overflow: auto;
  }

}
</style>
