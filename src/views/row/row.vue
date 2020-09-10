<script>
  export default {
    name: 'CustomRow',
    props: {
      type: String,
      align: String,
      justify: String,
      tag: {
        type: String,
        default: 'div'
      },
      gutter: {
        type: [ Number, String ],
        default: 0
      }
    },
    computed: {
      classes () {
        const flex = this.type === 'flex';
        const { align, justify } = this
        return [
          'custom-row',
          {
            [`custom-row--flex`]: flex,
            [`align-${ align }`]: flex && align,
            [`justify-${ justify }`]: flex && justify
          }
        ]
      }
    },
    methods: {
      onClick (event) {
        this.$emit('click', event);
      }
    },
    render (h) {
      const { classes, $slots, gutter, onClick, tag } = this


      const rowStyle = {
        marginLeft: `-${ gutter / 2 }px`,
        marginRight: `-${ gutter / 2 }px`
      }
      return (<tag class={ classes } onClick={ onClick } style={ rowStyle }>{ $slots.default }</tag>)
    }
  }
</script>

<style lang="scss">
  @import "./row-style.scss";
</style>