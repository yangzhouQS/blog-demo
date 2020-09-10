<script>
  export default {
    name: 'row',
    data () {
      return {}
    },
    mounted () {
      this.reload()
    },
    props: {
      gutter: Number
    },
    computed: {
      classes () {
        return [ 'kanban-row', 'clearfix' ]
      }
    },
    methods: {
      reload () {
        this.getData()
      },
      getData () {
      }
    },
    render (h) {
      const { classes, $slots, gutter } = this
      const rowStyle = {
        marginLeft: `-${ gutter / 2 }px`,
        marginRight: `-${ gutter / 2 }px`,
      }
      return (<div class={ classes } style={ rowStyle }>{ $slots.default }</div>)
    }
  }
</script>

<style scoped>
  @import "./style.scss";
</style>