<script>
  function getListeners (context) {
    return (context.$vnode ? context.$vnode.componentOptions.listeners : context.$listeners) || {};
  }

  export default {
    name: 'render-column-item',
    components: {},
    inheritAttrs: false,
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {}
    },
    computed: {},
    mounted () {
    },
    methods: {
      getProps (column) {
        const props = {}
        Object.keys(column).map(row => {
          props[row] = column[row]
        })
        return props
      },
      getColumns (h, columns = []) {
        const { getColumns, getProps, $scopedSlots } = this
        return columns.map(column => {
          const props = {
            attrs: getProps(column),
            on: {
              ...getListeners(this)
            }
          }
          if (column && !column.children) {
            return (<el-table-column { ...props } >{ $scopedSlots[column.prop] }</el-table-column>)
          } else if (column && column.children.length > 0) {
            return (<el-table-column label={ column.label }>{ getColumns(h, column.children) }</el-table-column>)
          }
        })
      }
    },
    render (h) {
      const { getColumns, columns, $attrs, data } = this
      const props = {
        attrs: $attrs,
        on: {
          ...getListeners(this)
        }
      }
      return (<el-table { ...props } data={ data }>{ getColumns(h, columns) }</el-table>)
    }
  }
</script>
