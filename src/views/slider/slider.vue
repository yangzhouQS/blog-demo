<script>
import {TouchMixin} from './touch';
import {FieldMixin} from './field';
function deepClone (obj, hash = new WeakMap()) {
  if (Object(obj) !== obj) return obj // primitives
  if (hash.has(obj)) return hash.get(obj) // cyclic reference
  const result = obj instanceof Set ? new Set(obj) // See note about this!
      : obj instanceof Map ? new Map(Array.from(obj, ([ key, val ]) =>
              [ key, deepClone(val, hash) ]))
          : obj instanceof Date ? new Date(obj)
              : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
                  // ... add here any specific treatment for other classes ...
                  // and finally a catch-all:
                  : obj.constructor ? new obj.constructor()
                      : Object.create(null)
  hash.set(obj, result)
  return Object.assign(result, ...Object.keys(obj).map(
      key => ({ [key]: deepClone(obj[key], hash) })))
}
function stopPropagation(event) {
  event.stopPropagation();
}

function preventDefault(event, isStopPropagation) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    stopPropagation(event);
  }
}

function bem(params) {
  return `van-slider__${params}`
}

const isSameValue = (newValue, oldValue) => {
  return JSON.stringify(newValue) === JSON.stringify(oldValue);
}

function isDef(val) {
  return val !== undefined && val !== null;
}

function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}

function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumeric(value) ? `${value}px` : value;
}

export default {
  name: 'Slider',
  mixins: [TouchMixin, FieldMixin],
  props: {
    disabled: Boolean,
    vertical: Boolean,
    range: Boolean,
    barHeight: [Number, String],
    buttonSize: [Number, String],
    activeColor: String,
    inactiveColor: String,
    min: {
      type: [Number, String],
      default: 0,
    },
    max: {
      type: [Number, String],
      default: 100,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    value: {
      type: [Number, Array],
      default: 0,
    },
  },

  data() {
    return {
      dragStatus: '',
    };
  },

  computed: {
    scope() {
      return this.max - this.min;
    },

    buttonStyle() {
      if (this.buttonSize) {
        const size = addUnit(this.buttonSize);
        return {
          width: size,
          height: size,
        };
      }
    },
  },

  created() {
    // format initial value
    this.updateValue(this.value);
  },

  mounted() {
    if (this.range) {
      this.bindTouchEvent(this.$refs.wrapper0);
      this.bindTouchEvent(this.$refs.wrapper1);
    } else {
      this.bindTouchEvent(this.$refs.wrapper);
    }
  },

  methods: {
    onTouchStart(event) {
      if (this.disabled) {
        return;
      }

      this.touchStart(event);
      this.currentValue = this.value;
      if (this.range) {
        this.startValue = this.value.map(this.format);
      } else {
        this.startValue = this.format(this.value);
      }
      this.dragStatus = 'start';
    },

    onTouchMove(event) {
      if (this.disabled) {
        return;
      }

      if (this.dragStatus === 'start') {
        this.$emit('drag-start');
      }

      preventDefault(event, true);
      this.touchMove(event);
      this.dragStatus = 'draging';

      const rect = this.$el.getBoundingClientRect();
      const delta = this.vertical ? this.deltaY : this.deltaX;
      const total = this.vertical ? rect.height : rect.width;
      const diff = (delta / total) * this.scope;

      if (this.range) {
        this.currentValue[this.index] = this.startValue[this.index] + diff;
      } else {
        this.currentValue = this.startValue + diff;
      }
      this.updateValue(this.currentValue);
    },

    onTouchEnd() {
      if (this.disabled) {
        return;
      }

      if (this.dragStatus === 'draging') {
        this.updateValue(this.currentValue, true);
        this.$emit('drag-end');
      }

      this.dragStatus = '';
    },

    onClick(event) {
      event.stopPropagation();

      if (this.disabled) return;

      const rect = this.$el.getBoundingClientRect();
      const delta = this.vertical
          ? event.clientY - rect.top
          : event.clientX - rect.left;
      const total = this.vertical ? rect.height : rect.width;
      let value = +this.min + (delta / total) * this.scope;

      if (this.range) {
        let [left, right] = this.value;
        const middle = (left + right) / 2;
        if (value <= middle) {
          left = value;
        } else {
          right = value;
        }
        value = [left, right];
      }

      this.startValue = this.value;
      this.updateValue(value, true);
    },

    // 处理两个滑块重叠之后的情况
    handleOverlap(value) {
      if (value[0] > value[1]) {
        value = deepClone(value);
        return value.reverse();
      }
      return value;
    },

    updateValue(value, end) {
      if (this.range) {
        value = this.handleOverlap(value).map(this.format);
      } else {
        value = this.format(value);
      }

      if (!isSameValue(value, this.value)) {
        this.$emit('input', value);
      }

      if (end && !isSameValue(value, this.startValue)) {
        this.$emit('change', value);
      }
    },

    format(value) {
      return (
          Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) *
          this.step
      );
    },
  },

  render() {
    const { vertical } = this;
    const mainAxis = vertical ? 'height' : 'width';
    const crossAxis = vertical ? 'width' : 'height';

    const wrapperStyle = {
      background: this.inactiveColor,
      [crossAxis]: addUnit(this.barHeight),
    };

    // 计算选中条的长度百分比
    const calcMainAxis = () => {
      const { value, min, range, scope } = this;
      if (range) {
        return `${((value[1] - value[0]) * 100) / scope}%`;
      }
      return `${((value - min) * 100) / scope}%`;
    };

    // 计算选中条的开始位置的偏移量
    const calcOffset = () => {
      const { value, min, range, scope } = this;
      if (range) {
        return `${((value[0] - min) * 100) / scope}%`;
      }
      return null;
    };

    const barStyle = {
      [mainAxis]: calcMainAxis(),
      left: this.vertical ? null : calcOffset(),
      top: this.vertical ? calcOffset() : null,
      background: this.activeColor,
    };

    if (this.dragStatus) {
      barStyle.transition = 'none';
    }

    const renderButton = (i) => {
      const map = ['left', 'right'];
      const isNumber = typeof i === 'number';
      const getClassName = () => {
        if (isNumber) {
          return `button-wrapper-${map[i]}`;
        }
        return `button-wrapper`;
      };
      const getRefName = () => {
        if (isNumber) {
          return `wrapper${i}`;
        }
        return `wrapper`;
      };

      return (
          <div
              ref={getRefName()}
              role="slider"
              tabindex={this.disabled ? -1 : 0}
              aria-valuemin={this.min}
              aria-valuenow={this.value}
              aria-valuemax={this.max}
              aria-orientation={this.vertical ? 'vertical' : 'horizontal'}
              class={bem(getClassName())}
              onTouchstart={() => {
                if (isNumber) {
                  // 保存当前按钮的索引
                  this.index = i;
                }
              }}
              onClick={(e) => e.stopPropagation()}
          >
            {this.$slots.button || (
                <div class={bem('button')} style={this.buttonStyle}/>
            )}
          </div>
      );
    };
    let className = 'van-slider'
    if (this.disabled) {
      className += ' van-slider--disabled'
    }else if (this.vertical) {
      className += ' van-slider--vertical'
    }
    // bem({ disabled: this.disabled, vertical })
    return (
        <div
            style={wrapperStyle}
            class={className}
            onClick={this.onClick}
        >
          <div class={bem('bar')} style={barStyle}>
            {this.range ? [renderButton(0), renderButton(1)] : renderButton()}
          </div>
        </div>
    );
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
