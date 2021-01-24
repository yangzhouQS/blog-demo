<template>
  <div class="yl-table-test">
    <yl-table style="height:300px"
              :tableloading="tableloading"
              :configs="tableConfig"
              :input="tableParams"
              :pagination="pagination"
              @reload="gettableData"
    >
      <template
          slot="createdAt"
          slot-scope="scope"
      >{{ formatDate(scope.row.created, 'YYYY-MM-DD hh:mm:ss') }}
      </template>
      <template
          slot="oneHeader"
          slot-scope="scope"
      >
        66888
      </template>
    </yl-table>
  </div>
</template>

<script>
import Data from "@/views/table/data";
import dayjs from 'dayjs'

function averageWeightHeader(h, { column, $index }) {
  return h('span', {}, [
    h('span', {}, ''),
    h('el-popover', {
      props: {
        placement: 'top',
        width: '200',
        trigger: 'hover',
        title: '日平均过磅车数'
        // content: '过磅总数 / 使用总天数'
      }
    }, [
      h('div', {}, [
        h('span', { style: { fontSize: '12px' } }, '过磅总数 / 使用总天数')
      ]),
      h('div', { slot: 'title' }, 'title'),
      h('div', { slot: 'reference', class: '' }, [
        h('span', {
          style: {
            fontSize: '12px'
          }
        }, '日平均过磅车数 (车 / 天)'),
        h('span', {
          class: 'el-icon-info',
          style: {
            marginLeft: '3px',
            color: '#bbb9b9'
          }
        }, '')
      ])
    ])
  ])
}

export default {
  name: "yl-table-test",
  data() {
    return {
      tableloading: false,
      tableData: [],
      tableParams: this.paramsModel(),
      pagination: {
        small: false,
        background: true,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        layout: "sizes,prev, pager, next,  total"
      }
    }
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              highlightCurrent: true
            }
          },
          columns: [
            { attr: { type: "index", label: "序号", width: 55, align: "center", headerAlign: "center" } },
            { attr: { prop: "name", label: "名称", width: 160, slotHeader: "xxxx" } },
            { attr: { prop: "code", label: "编码", width: 120, renderHeader: averageWeightHeader } },
            { attr: { prop: "model", label: "规格", slotHeader: "oneHeader" } },
            { attr: { prop: "unit", label: "单位", width: 70 } },
            { attr: { prop: "quantity", label: "数量", width: 100 } },
            { attr: { prop: "created", label: "添加时间", width: 120, scopedSlot: "createdAt" } }
          ]
        }
      }
    }
  },
  methods: {
    formatDate(value, format) {
      return dayjs(value).format(format);
    },
    paramsModel(limit = 10, draw = 1, order = [], condtionItems = []) {
      return {
        limit: limit,
        draw: draw,
        offset: limit * (draw - 1),
        order: order,
        condtionItems: condtionItems
      }
    },
    gettableData() {
      this.tableloading = true
      setTimeout(() => {
        this.tableloading = false
        let offset = this.tableParams.offset;
        let limit = this.tableParams.limit;
        const DataSource = Data
        const data = { rows: [], count: 45 };
        data.rows = offset >= DataSource.rows.length
            ? DataSource.rows.slice(offset, DataSource.rows.length)
            : DataSource.rows.slice(offset, offset + limit)
        this.tableData = data
      }, 1000)
    }
  },
  mounted() {
    this.gettableData();
  }
}
</script>

<style scoped>

</style>
