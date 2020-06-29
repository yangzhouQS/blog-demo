<template>
<!--      :props=" { children: 'children', label: 'label',isLeaf: 'leaf' }"-->
  <el-tree
      :props="props"
      node-key="label"
      show-checkbox
      lazy
      :load="loadNode"
      :highlight-current="true"
      @node-click="handleNodeClick(data)"
  >
  </el-tree>
</template>

<script>
  export default {
    name: 'yl-tree',
    data () {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        treeData: [
          {
            label: '一级 1',
            children: [ { label: '二级 1-1', children: [ { label: '三级 1-1-1' } ] } ]
          }
        ]
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
      },
      loadNode (node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region' }]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: 'leaf',
            leaf: true
          }, {
            name: 'zone'
          }];

          resolve(data);
        }, 500);
      }
    }
  }
</script>

<style scoped>

</style>