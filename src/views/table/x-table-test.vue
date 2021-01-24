<template>
  <div class="x-table-test">
    <vxe-table
        show-overflow
        highlight-hover-row
        row-key
        resizable
        ref="xTree3"
        border="inner"
        :data="tableData"
        :checkbox-config="{labelField: 'name'}"
        :tree-config="{loadMethod: loadChildrenMethod,children: 'children', accordion: true, line: true, iconOpen: 'el-icon-remove-outline', iconClose: 'el-icon-circle-plus-outline'}">
      <vxe-table-column  tree-node>
        <template v-slot="{ row }">
              <span>
                <template v-if="row.children && row.children.length">
                  <i class=""></i>
                </template>
                <template v-else>
                  <i class=""></i>
                </template>
                <span>{{ row.name }}</span>
              </span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="id" title="id"></vxe-table-column>
      <vxe-table-column field="type" title="type"></vxe-table-column>
      <vxe-table-column field="size" title="size"></vxe-table-column>
      <vxe-table-column field="date" title="date"></vxe-table-column>
      <vxe-table-column title="操作" width="140">
        <template v-slot="{ row }">
          <vxe-button type="text" icon="fa fa-eye"></vxe-button>
          <vxe-button type="text" icon="fa fa-edit"></vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" @click="removeRowEvent(row)"></vxe-button>
          <vxe-button type="text" icon="fa fa-id-card-o"></vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: "x-table-test",
  data () {
    return {
      tableData: [
        { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          children: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'vxe-table 从入门到放弃96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          ]
        },
        { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
      ],
      tableData3: [
        { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          children: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'vxe-table 从入门到放弃96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          ]
        },
        { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
      ]
    }
  },
  methods: {
    loadChildrenMethod ({ row }) {
      console.log(row)
      debugger
      // 异步加载子节点
      return this.tableData3
    },
    removeRowEvent (row) {
      this.$XModal.confirm('您确定要删除吗？').then(type => {
        if (type === 'confirm') {
          const matchObj = XEUtils.findTree(this.tableData3, item => item === row, this.treeConfig)
          if (matchObj) {
            // 从树节点中移除
            matchObj.items.splice(matchObj.index, 1)
          }
        }
      })
    }
  },
  mounted() {
  },
  computed: {},
}
</script>

<style scoped lang="postcss">

</style>
