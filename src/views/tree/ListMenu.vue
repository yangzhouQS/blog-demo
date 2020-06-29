<template>
  <ul v-if="data.length">
    <li v-for="(item, i) in data" :key="i" @click.stop="selectItem(item)" v-show="expandFlag">
      <div class="item">
        <!-- 展开的图标 -->
        <i class='iconfont'
           @click.stop="expandItem(item, i)"
           :class="[
        		expandArr.includes(i) ? 'iconjianhao1' : 'iconjiahao1',
        		item.children && item.children.length ? '' : 'disabled'
        	]">
        </i>
        <!-- 选项名 -->
        <span class="title">{{item[labelKey]}}</span>
      </div>
      <list-menu
          v-if='item.children'
          @input='input'
          :data='item.children'
          :valueKey='valueKey'
          :labelKey='labelKey'
          :disabledKey='disabledKey'
          :value="value"
          :toastText='toastText'
          :expandFlag='expandArr.includes(i)'
      />
    </li>
  </ul>
</template>
<script>
  export default {
    // 组件名必写
    name: 'ListMenu',
    props: {
      // 选中的值的属性名，必传
      valueKey: String,
      // 在页面要展示的选项属性名，必传
      labelKey: String,
      // 不可选的唯一标识，如item[disabledKey]未true则不可选择，非必传
      disabledKey: String,
      // 选中的值，必传
      value: Object,
      // 控制展开，不需要传
      expandFlag: {
        type: Boolean,
        default: true
      },
      // 总数据，必传
      data: Array,
      // 不可选提示文字，非必传
      toastText: String
    },
    data () {
      return {
        // 当前级组件已展开的项
        expandArr: []
      }
    },
    methods: {
      // 子组件逐级传递选中项
      input (item) {
        this.$emit('input', item)
      },
      // 选择
      selectItem (item) {
        // industryDeptType为1表示时不可选择该工会
        if (this.disabledKey && item[this.disabledKey]) {
          if (this.toastText) {
            alert(this.toastText)
          }
          return
        }
        this.$emit('input', item)
      },
      // 展开
      expandItem (item, i) {
        if (item.children && item.children.length) {
          let index = this.expandArr.indexOf(i)
          if (index > -1) {
            this.expandArr.splice(index, 1)
          } else {
            this.expandArr.push(i)
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  ul {
    width: 100%;
    color: #2a2a2a;
    font-size: 14px;
    overflow: hidden;
    background: #fff;
    border-bottom: .8px solid #e1e1e1;

    li {
      list-style: none;
      .item {
        height: 30px;
        display: flex;
        align-items: center;
        width: 100%;
        .title {
          margin-right: 6px;
          padding: 6px 5px;
          font-size: 14px;
          flex: 1;
          white-space: nowrap;
          color: #2a2a2a;
        }
      }

      &:not(:first-child) {
        border-top: .8px solid #e1e1e1;
      }

      > ul {
        border-bottom: 0;
        padding-left: 16px;

        li {
          .item {
            padding-left: 16px;
          }

          border-top: .8px solid #e1e1e1;
        }
      }
    }
  }
</style>


