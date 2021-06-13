<template>
  <div class="lists">
    <el-divider></el-divider>
  </div>
</template>
<script>
// 引入组件
import ListMenu from './ListMenu'

export default {
  components: {
    ListMenu
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      tableData1: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      lists: []
    }
  },
  created() {
    this.getTreeList()
  },
  methods: {
    getTreeList() {
      // 模拟数据
      this.lists.push({
        treeId: 1,
        name: '第一级',
        disabled: 0,
        children: [{
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
              children: [{
                treeId: 4,
                name: '第四级',
                disabled: 0,
                children: [{
                  treeId: 5,
                  name: '第五级',
                  disabled: 0,
                  children: [{
                    treeId: 6,
                    name: '第六级',
                    disabled: 0
                  }]
                }]
              }]
            }
          ]
        }]
      })
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
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

