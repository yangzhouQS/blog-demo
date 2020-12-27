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
      },
      soltConf: {
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
        const self = this
        const { getColumns, getProps, $scopedSlots, soltConf } = this
        return columns.map(column => {
          const props = {
            attrs: getProps(column),
            on: {
              ...getListeners(this)
            }
          }
          if (column && !column.children) {
            const child = soltConf.map(row => {
              const itemRowProps = {
                attrs: getProps(row.elmentConfig),
                on: {
                  ...getListeners(this)
                }
              }
              console.log(column,row)
              if (row.name === column.prop) {
                // console.log($scopedSlots)
                // console.log(self)
                return (<el-input { ...itemRowProps } />)
              } else {
                return ($scopedSlots[column.prop])
              }
            })
            /*渲染头部*/
            /*if (column['elHeader']) {
              return (<el-table-column { ...props } >{ $scopedSlots[column.prop] }</el-table-column>)
            }*/

            const renderCell = (scope) => {
              console.log(1111111111, scope.row);
              return (<p>{ scope.row }</p>)
            }

            const slotScope = {
              scopedSlots: {
                default (scope) {
                  console.log('900000000000')
                  renderCell(scope)
                }
              }
            };
            let headerContent
            headerContent = <span slot="header" slot-scope="{ column, $index}">
                456564645
            </span>
            return (<el-table-column { ...props } >
              { /*$scopedSlots[column.prop]*/ }
            </el-table-column>)
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
