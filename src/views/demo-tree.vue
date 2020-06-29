<template>
  <div id="app">
    <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        @getCheckedKeys="_test"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        ref="tree"
        :props="defaultProps">
    </el-tree>
    <el-button type="primary" @click="_test">buttonCont</el-button>
  </div>
</template>
<script>
  export default {
    name: 'demo-tree',
    data() {
      return {
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1',
            }, {
              id: 10,
              label: '三级 1-1-2',
            }],
          }],
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1',
          }, {
            id: 6,
            label: '二级 2-2',
          }],
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1',
          }, {
            id: 8,
            label: '二级 3-2',
          }],
        },
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
      }
    },
    methods: {
      _test() {
        console.log(this.$refs['tree'].getCheckedKeys())
        console.log(arguments)
      },
    },

  }

</script>
<style lang="scss">

</style>
