<template>
  <div class="q-flex-box">
    <yl-table
        ref="table"
        v-loading="loading"
        :configs="tableConfig"
        :input="queryParams"
        @reload="_reload"
    >
      <template slot="name" slot-scope="{row}">
        <p>name = {{ row.name }}</p>
      </template>
    </yl-table>
    <el-divider>分割线</el-divider>
    <el-popover
        placement="top-start"
        title="标题"
        width="200"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-button slot="reference">hover 激活</el-button>
    </el-popover>
    <el-table
        :data="tableData.rows"
        border
        style="width: 100%">
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄"
          width="180">
      </el-table-column>
      <el-table-column
          label="操作">
        <div slot="header" class="xxx" slot-scope="scope">
          <el-input
              v-model="input"
              size="mini"
              placeholder="输入关键字搜索"/>
        </div>
      </el-table-column>
    </el-table>
    <h1>child组件测试</h1>
    <child>
      <div>世界你好</div>
      <!--<div slot="title" v-slot:title>cds</div>-->
      <div slot="title">title =</div>
      <div slot="content">content</div>
      <div slot="name2">csd</div>
    </child>
    <el-popover
        ref="popover"
        placement="bottom"
        title="标题"
        width="200"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    </el-popover>
  </div>
</template>

<script>
  import YlTable from './table/table';
  import Child from './child.jsx';

  export default {
    name: 'q-flex-box',
    components: { Child, YlTable },
    props: {},
    computed: {
      tableConfig: {
        get () {
          return {
            table: {
              attr: {
                data: this.tableData,
                highlightCurrent: true
              }
            },
            columns: [
              { attr: { type: 'index', label: '序号', width: 150, align: 'center', headerAlign: 'center', fixed: true } },
              { attr: { prop: 'name', label: '姓名', width: 340, scopedSlot: 'name' } },
              { attr: { prop: 'age', label: '年龄', scopedSlot: 'age' } },
              { attr: { prop: 'action', label: '操作', headerSlot: 'action', renderHeader: this.renderHeader } }
            ]
          }
        }
      }
    },
    data () {
      return {
        input: '',
        tableData: {},
        loading: false,
        queryParams: this.paramsModel()
      }
    },
    mounted () {
      const data = [
        { id: 1, name: 'Tom', age: 10 },
        { id: 2, name: 'sam', age: 22 },
        { id: 3, name: 'kaiwen', age: 14 }
      ]
      this.tableData = {
        count: 10,
        rows: data
      }
    },
    methods: {
      renderHeader (h, { column, $index }) {
        const _t = this
        return h('span', {}, [
          h('span', {}, ''),
          h('el-popover', {
            props: {
              placement: 'top',
              width: '200',
              trigger: 'hover',
              content: '点击数字折扣，修改折扣，点击空白处，修改完成；修改过程中，右侧出现绿色按钮功能为统一多件商品为该折扣。'
            }
          }, [
            h('span', { slot: 'reference', class: '' }, [
              h('span', {}, '折扣'),
              h('span', { class: 'red-star' }, '*')
            ])
          ])
        ])

        return this.$createElement('el-popover', {
          props: {
            placement: 'top',
            width: '200',
            trigger: 'hover',
            content: '点击数字折扣，修改折扣，点击空白处，修改完成；修改过程中，右侧出现绿色按钮功能为统一多件商品为该折扣。'
          },
          /*scopedSlots: {
            reference: (scope) => {
              return h('button', '按钮点击')
            }
          }*/
        }, [
          h('i', { slot: 'reference', class: '' }, [
            h('span', {}, '折扣'),
            h('span', { class: 'red-star' }, '*')
          ])
        ])
      },
      _reload () {

      },
      paramsModel (limit = 10, draw = 1, order = [], condtionItems = []) {
        return {
          limit: limit,
          draw: draw,
          offset: limit * (draw - 1),
          order: order,
          condtionItems: condtionItems
        }
      }
    }
  }
</script>
<style>

</style>
<style scoped lang="scss">
  .q-flex-box {
    /*display: flex;*/
  }
</style>