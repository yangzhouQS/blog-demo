<template>
  <div class="lists">
    <div class='demo'>
      <span class="iconfont iconjianhao1"></span>
      <span class="iconfont iconjiahao1"></span>
    </div>
    <cube-button :outline="true">Outline Button</cube-button>
    <!--<hr>
    <list-menu
        :data='lists'
        v-model="selectVal"
        value-key='treeId'
        label-key='name'
        disabled-key='disabled'
        toastText='该选项不可选择'
    />
    <article>
      <p>选中的选项名：<span>{{selectVal.name || '未选择'}}</span></p>
      <p>选中的选项值：<span>{{selectVal.treeId || '未选择'}}</span></p>
    </article>-->
  </div>
</template>
<script>
  // 引入组件
  import ListMenu from './ListMenu'

  export default {
    components: {
      ListMenu
    },
    data () {
      return {
        selectVal: {},
        lists: []
      }
    },
    created () {
      this.getTreeList()
    },
    methods: {
      getTreeList () {
        // 模拟数据
        this.lists.push({
          treeId: 1,
          name: '第一级',
          disabled: 0,
          children: [ {
            treeId: 2,
            name: '第二级（disadbed为true不可选）',
            disabled: 1,
            children: [
              {
                treeId: '3_1',
                name: '第三级（1）',
                disabled: 0
              },
              {
                treeId: '3_2',
                name: '第三级（2）',
                disabled: 0,
                children: [ {
                  treeId: 4,
                  name: '第四级',
                  disabled: 0,
                  children: [ {
                    treeId: 5,
                    name: '第五级',
                    disabled: 0,
                    children: [ {
                      treeId: 6,
                      name: '第六级',
                      disabled: 0
                    } ]
                  } ]
                } ]
              }
            ]
          } ]
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .lists {
    article {
      margin: 30/75rem;
      line-height: 1.5;
      font-size: 30/75rem;

      span {
        color: #ff6633;
      }
    }
  }
</style>

