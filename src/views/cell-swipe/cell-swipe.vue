<script>
// 接口参考: https://vant-contrib.gitee.io/vant/#/zh-CN/swipe-cell#zi-ding-yi-nei-rong
import {TouchMixin} from "./touch";
import {ClickOutsideMixin} from "./click-outside";
import {preventDefault} from "./event";

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

const THRESHOLD = 0.15;
export default {
  name: "cell-swipe",
  components: {},
  mixins: [
    TouchMixin, // 触摸时间

    // 触摸后点击外部关闭
    ClickOutsideMixin({
      event: 'touchstart',
      method: 'onClick',
    })
  ],
  props: {
    onClose: Function,
    disabled: Boolean,
    leftWidth: [Number, String],
    rightWidth: [Number, String],
    beforeClose: Function,
    stopPropagation: Boolean,
    name: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      offset: 0,
      dragging: false
    }
  },
  computed: {
    computedLeftWidth() {
      return +this.leftWidth || this.getWidthByRef('left');
    },
    computedRightWidth() {
      return +this.rightWidth || this.getWidthByRef('right');
    },
  },
  mounted() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    getWidthByRef(ref) {
      if (this.$refs[ref]) {
        const rect = this.$refs[ref].getBoundingClientRect();
        return rect.width;
      }

      return 0;
    },
    open(position) {
      const offset =
          position === 'left' ? this.computedLeftWidth : -this.computedRightWidth;
      this.opened = true;
      this.offset = offset;

      this.$emit('open', {
        position,
        name: this.name,
        detail: this.name,
      });
    },

    // @exposed-api
    close(position) {
      this.offset = 0;

      if (this.opened) {
        this.opened = false;
        this.$emit('close', {
          position,
          name: this.name,
        });
      }
    },

    onTouchStart(event) {
      if (this.disabled) {
        return;
      }

      this.startOffset = this.offset;
      this.touchStart(event);
    },

    onTouchMove(event) {
      if (this.disabled) {
        return;
      }

      this.touchMove(event);

      if (this.direction === 'horizontal') {
        this.dragging = true;
        this.lockClick = true;

        const isPrevent = !this.opened || this.deltaX * this.startOffset < 0;

        if (isPrevent) {
          preventDefault(event, this.stopPropagation);
        }

        this.offset = range(
            this.deltaX + this.startOffset,
            -this.computedRightWidth,
            this.computedLeftWidth
        );
      }
    },

    onTouchEnd() {
      if (this.disabled) {
        return;
      }

      if (this.dragging) {
        this.toggle(this.offset > 0 ? 'left' : 'right');
        this.dragging = false;

        // compatible with desktop scenario
        setTimeout(() => {
          this.lockClick = false;
        }, 0);
      }
    },

    toggle(direction) {
      const offset = Math.abs(this.offset);
      const threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;
      const { computedLeftWidth, computedRightWidth } = this;

      if (
          computedRightWidth &&
          direction === 'right' &&
          offset > computedRightWidth * threshold
      ) {
        this.open('right');
      } else if (
          computedLeftWidth &&
          direction === 'left' &&
          offset > computedLeftWidth * threshold
      ) {
        this.open('left');
      } else {
        this.close();
      }
    },

    onClick(position = 'outside') {
      this.$emit('click', position);

      if (this.opened && !this.lockClick) {
        if (this.beforeClose) {
          this.beforeClose({
            position,
            name: this.name,
            instance: this,
          });
        } else if (this.onClose) {
          this.onClose(position, this, { name: this.name });
        } else {
          this.close(position);
        }
      }
    },

    getClickHandler(position, stop) {
      return (event) => {
        if (stop) {
          event.stopPropagation();
        }
        this.onClick(position);
      };
    },

    genLeftPart() {
      const content = this.$slots.left;

      if (content) {
        return (
            <div
                ref="left"
                class="swipe-cell-left"
                onClick={this.getClickHandler('left', true)}
            >
              {content}
            </div>
        );
      }
    },

    genRightPart() {
      const content = this.$slots.right;

      if (content) {
        return (
            <div
                ref="right"
                class="swipe-cell-right"
                onClick={this.getClickHandler('right', true)}
            >
              {content}
            </div>
        );
      }
    },
  },
  render(h) {
    const wrapperStyle = {
      transform: "translate3d(" + this.offset + "px, 0, 0)",
      transitionDuration: this.dragging ? '0s' : '.6s'
    };
    return h("div", {
      "class": 'swipe-cell',
      "on": {
        "click": this.getClickHandler('cell')
      }
    }, [h("div", {
      "class": 'swipe-cell-wrapper',
      "style": wrapperStyle
    }, [this.genLeftPart(), this.$slots.default, this.genRightPart()])]);
  }
}
</script>

<style scoped lang="scss">
.swipe-cell {
  position: relative;
  overflow: hidden;
  cursor: grab;
}

.swipe-cell-wrapper {
  transition-timing-function: cubic-bezier(.18, .89, .32, 1);
  transition-property: transform;
}

.swipe-cell-left, .swipe-cell-right {
  position: absolute;
  top: 0;
  height: 100%
}

.swipe-cell-left {
  left: 0;
  transform: translate3d(-100%, 0, 0)
}

.swipe-cell-right {
  right: 0;
  transform: translate3d(100%, 0, 0)
}
</style>
