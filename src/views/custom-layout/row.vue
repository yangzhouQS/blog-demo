<script>
import {ParentMixin} from './relation';

export default {
  name: "row",
  mixins: [ParentMixin('customRow')],
  data() {
    return {
    }
  },
  props: {
    type: String,
    align: String,
    justify: String,
    tag: {
      type: String,
      default: 'div',
    },
    gutter: {
      type: [Number, String],
      default: 0,
    },
  },

  computed: {
    spaces() {
      const gutter = Number(this.gutter);

      if (!gutter) {
        return;
      }

      const spaces = [];
      const groups = [[]];

      let totalSpan = 0;
      const children = this.children;
      children.forEach((item, index) => {
        totalSpan += Number(item.span);

        if (totalSpan > 24) {
          groups.push([index]);
          totalSpan -= 24;
        } else {
          groups[groups.length - 1].push(index);
        }
      });

      groups.forEach((group) => {
        const averagePadding = (gutter * (group.length - 1)) / group.length;

        group.forEach((item, index) => {
          if (index === 0) {
            spaces.push({ right: averagePadding });
          } else {
            const left = gutter - spaces[item - 1].right;
            const right = averagePadding - left;
            spaces.push({ left, right });
          }
        });
      });

      return spaces;
    },
  },

  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },

  render() {
    const { align, justify } = this;
    const flex = this.type === 'flex';
    const classes = {
      'row--flex': flex,
      [`row--align-${align}`]: flex && align,
      [`row--justify-${justify}`]: flex && justify,
    }
    return (
        <this.tag
            class={classes}
            onClick={this.onClick}
        >
          {this.$slots.default}
        </this.tag>
    );
  },
}
</script>

<style scoped lang="postcss">
.row::after {
  display: table;
  clear: both;
  content: ''
}

.row--flex {
  display: flex;
  flex-wrap: wrap
}

.row--flex::after {
  display: none
}

.row--justify-center {
  justify-content: center
}

.row--justify-end {
  justify-content: flex-end
}

.row--justify-space-between {
  justify-content: space-between
}

.row--justify-space-around {
  justify-content: space-around
}

.row--align-center {
  align-items: center
}

.row--align-bottom {
  align-items: flex-end
}
</style>
