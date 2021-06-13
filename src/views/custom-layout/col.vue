<script>
import {ChildrenMixin} from './relation';

export default {
  name: "Acol",
  mixins: [ChildrenMixin('customRow')],
  data() {
    return {}
  },
  props: {
    span: [Number, String],
    offset: [Number, String],
    tag: {
      type: String,
      default: 'div',
    },
  },
  mounted() {
  },
  computed: {
    style() {
      const { index } = this;
      const { spaces } = this.parent || {};
      if (spaces && spaces[index]) {
        const { left, right } = spaces[index];
        return {
          paddingLeft: left ? `${left}px` : null,
          paddingRight: right ? `${right}px` : null,
        };
      }
    },
  },

  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },

  render() {
    const { span, offset } = this;
    const classes = {
      [`col--${span}`]: span,
      [`col--offset-${offset}`]: offset
    }
    return (
        <this.tag
            style={this.style}
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
.col {
  float: left;
  box-sizing: border-box;
  min-height: 1px
}

.col--1 {
  width: 4.16666667%
}

.col--offset-1 {
  margin-left: 4.16666667%
}

.col--2 {
  width: 8.33333333%
}

.col--offset-2 {
  margin-left: 8.33333333%
}

.col--3 {
  width: 12.5%
}

.col--offset-3 {
  margin-left: 12.5%
}

.col--4 {
  width: 16.66666667%
}

.col--offset-4 {
  margin-left: 16.66666667%
}

.col--5 {
  width: 20.83333333%
}

.col--offset-5 {
  margin-left: 20.83333333%
}

.col--6 {
  width: 25%
}

.col--offset-6 {
  margin-left: 25%
}

.col--7 {
  width: 29.16666667%
}

.col--offset-7 {
  margin-left: 29.16666667%
}

.col--8 {
  width: 33.33333333%
}

.col--offset-8 {
  margin-left: 33.33333333%
}

.col--9 {
  width: 37.5%
}

.col--offset-9 {
  margin-left: 37.5%
}

.col--10 {
  width: 41.66666667%
}

.col--offset-10 {
  margin-left: 41.66666667%
}

.col--11 {
  width: 45.83333333%
}

.col--offset-11 {
  margin-left: 45.83333333%
}

.col--12 {
  width: 50%
}

.col--offset-12 {
  margin-left: 50%
}

.col--13 {
  width: 54.16666667%
}

.col--offset-13 {
  margin-left: 54.16666667%
}

.col--14 {
  width: 58.33333333%
}

.col--offset-14 {
  margin-left: 58.33333333%
}

.col--15 {
  width: 62.5%
}

.col--offset-15 {
  margin-left: 62.5%
}

.col--16 {
  width: 66.66666667%
}

.col--offset-16 {
  margin-left: 66.66666667%
}

.col--17 {
  width: 70.83333333%
}

.col--offset-17 {
  margin-left: 70.83333333%
}

.col--18 {
  width: 75%
}

.col--offset-18 {
  margin-left: 75%
}

.col--19 {
  width: 79.16666667%
}

.col--offset-19 {
  margin-left: 79.16666667%
}

.col--20 {
  width: 83.33333333%
}

.col--offset-20 {
  margin-left: 83.33333333%
}

.col--21 {
  width: 87.5%
}

.col--offset-21 {
  margin-left: 87.5%
}

.col--22 {
  width: 91.66666667%
}

.col--offset-22 {
  margin-left: 91.66666667%
}

.col--23 {
  width: 95.83333333%
}

.col--offset-23 {
  margin-left: 95.83333333%
}

.col--24 {
  width: 100%
}

.col--offset-24 {
  margin-left: 100%
}
</style>
