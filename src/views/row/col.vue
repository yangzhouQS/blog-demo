<script>
  export default {
    name: 'CustomCol',
    props: {
      span: [ Number, String ],
      offset: [ Number, String ],
      tag: {
        type: String,
        default: 'div'
      }
    },
    computed: {
      classes () {
        const { span, offset } = this
        return [
          'custom-col',
          {
            [`custom-col--${ span }`]: !!span,
            [`custom-col--offset-${ offset }`]: !!offset
          }
        ]
      },
      gutter () {
        let parent = this.$parent;
        while (parent && parent.$options.name !== 'CustomRow') {
          parent = parent.$parent;
        }
        return parent ? parent.gutter : 0;
      }
    },
    methods: {
      onClick (event) {
        this.$emit('click', event);
      }
    },
    render () {
      const { classes, $slots, onClick, gutter } = this
      let colStyle = {}
      if (this.gutter) {
        colStyle = {
          paddingLeft: `${ gutter / 2 }px`,
          paddingRight: `${ gutter / 2 }px`
        }
      }
      return (
        <this.tag
          style={ colStyle }
          class={ classes }
          onClick={ onClick }
        >
          { $slots.default }
        </this.tag>
      );
    }
  }
</script>

<style scoped>
  [class*=custom-col-] {
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }

  .custom-col {
    float: left;
    box-sizing: border-box;
    min-height: 1px;
  }

  @import "./col-style.scss";

  /*
  scss循环生成代码
  @for $i from 1 through 24
  {
      .custom-col--#{$i}
      {
          width:($i * 100% / 24);
      }
      .custom-col--offset-#{$i} {
          margin-left: $i * 100% / 24;
       }
  }
  */
</style>