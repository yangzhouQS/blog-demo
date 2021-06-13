<script>
// 文档参考: https://vant-contrib.gitee.io/vant/#/zh-CN/cell
export default {
  methods: {
    $_onClick(event) {
      this.$emit('onClick', event)
      // this.$router.push({ path: '/' })
    },
    leftIcon(h, slots) {
      if (slots.icon) {
        return slots.icon();
      }

      if (this.icon) {
        return h('i', {
          class: [this.icon, 'cell__left-icon']
        })
      }
    },
    rightIcon(h, slots) {
      const rightIconSlot = slots['right-icon'];

      if (rightIconSlot) {
        return rightIconSlot();
      }
      return h('i', {
        "class": ['icon icon-arrow cell__right-icon'],
      });
      if (this.isLink) {
        const arrowDirection = this.arrowDirection;
        return h('i', {
          "class": ['icon icon-arrow cell__right-icon'],
          /*"attrs": {
            "name": arrowDirection ? "arrow-" + arrowDirection : 'arrow'
          }*/
        });
      }
    },
    showValue(h, slots) {
      const showValue = slots.default || this.value;
      const showTitle = slots.title || this.title;
      if (showValue) {
        return h("div", {
          "class": ['cell__value', this.valueClass]
        }, [slots.default ? slots.default : h("span", [value])]);
      }
    },
    showLabel(h, slots) {
      const showLabel = slots.label || this.label;

      if (showLabel) {
        return h("div", {
          "class": ['cell__label', this.labelClass]
        }, [slots.label ? slots.label : this.label]);
      }
    },
    showTitle(h, slots) {
      const showTitle = slots.title || this.title;
      if (showTitle) {
        return h("div", {
          "class": ['cell__title', this.titleClass],
          "style": this.titleStyle
        }, [slots.title ? slots.title : h("span", [this.title]), this.showLabel(h, slots)]);
      }
    }
  },
  render(h) {
    const { $props, $attrs, $listeners, $slots } = this
    const clickable = !!($props.clickable && $props.isLink);
    const classes = {
      'cell--clickable': clickable,
      'cell--center': $props.center,
      'cell--required': $props.required,
      'cell--borderless': !$props.border
    };
    return h('div', {
      class: [classes, 'cell'],
      attrs: {
        "role": clickable ? 'button' : null,
        "tabindex": clickable ? 0 : null,
        ...$attrs
      },
      on: {
        click: this.$_onClick,
        ...$listeners
      }
    }, [this.leftIcon(h, $slots), this.showTitle(h, $slots), this.showValue(h, $slots), this.rightIcon(h, $slots), $slots.extra ? $slots.extra : null])
  },
  name: "cell",
  data() {
    return {}
  },
  props: {
    icon: String,
    size: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    iconPrefix: String,
    titleStyle: null,
    titleClass: null,
    valueClass: null,
    labelClass: null,
    title: [Number, String],
    value: [Number, String],
    label: [Number, String],
    arrowDirection: String,
    border: {
      type: Boolean,
      default: true
    },
    clickable: {
      type: Boolean,
      default: null
    }
  },
  mounted() {
  },
  computed: {},


}
</script>

<style scoped lang="postcss">
.cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff
}

.cell::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  transform: scaleY(.5)
}

.cell--borderless::after, .cell:last-child::after {
  display: none
}

.cell__label {
  margin-top: 4px;
  color: #969799;
  font-size: 12px;
  line-height: 18px
}

.cell__title, .cell__value {
  flex: 1
}

.cell__value {
  position: relative;
  overflow: hidden;
  color: #969799;
  text-align: right;
  vertical-align: middle;
  word-wrap: break-word
}

.cell__value--alone {
  color: #323233;
  text-align: left
}

.cell__left-icon, .cell__right-icon {
  height: 24px;
  font-size: 16px;
  line-height: 24px
}

.cell__left-icon {
  margin-right: 4px
}

.cell__right-icon {
  margin-left: 4px;
  color: #969799
}

.cell--clickable {
  cursor: pointer
}

.cell--clickable:active {
  background-color: #f2f3f5
}

.cell--required {
  overflow: visible
}

.cell--required::before {
  position: absolute;
  left: 8px;
  color: #ee0a24;
  font-size: 14px;
  content: '*'
}

.cell--center {
  align-items: center
}

.cell--large {
  padding-top: 12px;
  padding-bottom: 12px
}

.cell--large .cell__title {
  font-size: 16px
}

.cell--large .cell__label {
  font-size: 14px
}
</style>
