!function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module ? e(exports) : 'function' == typeof define && define.amd ? define(['exports'], e) : e((t = 'undefined' != typeof globalThis ? globalThis : t || self).spray = {})
}(this, (function (t) {
  'use strict';
  const e = new Map;
  var s = {
    registAdapter(t, s) {
      e.set(t, s)
    }, newComponent(t, s, i) {
      if (!t || !s || !i) return void console.warn('创建组件参数有问题，请检查后再创建');
      if (!e.has(t)) return void console.warn(`名称为${ t }的组件适配器不存在，请检查`);
      let n = null;
      return e.get(t).factory && (n = e.get(t).factory(s, i)), n
    }, getAdapterAll: () => e
  };

  class SceneTransition {
    constructor(t) {
      this._spr = t, this.animateList = new Map, this.animateList.set('fromTop', {
        main: this.fromTop,
        reverse: 'toTop'
      }), this.animateList.set('fromRight', {
        main: this.fromRight,
        reverse: 'toRight'
      }), this.animateList.set('fromBottom', {
        main: this.fromBottom,
        reverse: 'toBottom'
      }), this.animateList.set('fromLeft', {
        main: this.fromLeft,
        reverse: 'toLeft'
      }), this.animateList.set('toTop', {
        main: this.toTop,
        reverse: 'fromTop'
      }), this.animateList.set('toRight', {
        main: this.toRight,
        reverse: 'fromRight'
      }), this.animateList.set('toBottom', {
        main: this.toBottom,
        reverse: 'fromBottom'
      }), this.animateList.set('toLeft', { main: this.toLeft, reverse: 'fromLeft' })
    }

    static factory(t) {
      return new SceneTransition(t)
    }

    enter(t, e = '', s = 500) {
      if (!e) return t.sceneAnimator.enter = null, !0;
      t.sceneAnimator.enter || (t.sceneAnimator.enter = {});
      const i = this.animateList.get(e);
      if (!i) return console.error('没有对应转场动画');
      t.sceneAnimator.enter.name = e, t.sceneAnimator.enter.duration = s, t.sceneAnimator.leave || (t.sceneAnimator.leave = {}, t.sceneAnimator.leave.name = i.reverse, t.sceneAnimator.leave.duration = s), t.initAnimator()
    }

    leave(t, e = '', s = 500) {
      if (!e) return t.sceneAnimator.leave = null, !0;
      t.sceneAnimator.leave || (t.sceneAnimator.leave = {});
      const i = this.animateList.get(e);
      if (!i) return console.error('没有对应转场动画');
      t.sceneAnimator.leave.name = e, t.sceneAnimator.leave.duration = s, t.sceneAnimator.enter || (t.sceneAnimator.enter = {}, t.sceneAnimator.enter.name = i.reverse, t.sceneAnimator.enter.duration = s)
    }

    start(t, e, s, i) {
      if (!this.animateList.has(e)) return console.error('没有对应的组合动画');
      this.animateList.get(e).main(t, s, i)
    }

    _start(t, e, s, i = 500) {
      return t.animator = t.animate(s, i).start(), t.animator.name = e, t.animator
    }

    fromTop(t, e, s) {
      const i = t._getOptsValue('height') + t._getParentsMargin()[0];
      return t.style.translate = [0, -i], t.animator = t.animate({ translate: [0, 0] }, e, s).start(), t.animator
    }

    fromRight(t, e, s) {
      const i = t._getOptsValue('width') + t._getParentsMargin()[1];
      return t.style.translate = [i, 0], t.animator = t.animate({ translate: [0, 0] }, e, s).start(), t.animator
    }

    fromBottom(t, e, s) {
      const i = t._getOptsValue('height') + t._getParentsMargin()[2];
      return t.style.translate = [0, i], t.animator = t.animate({ translate: [0, 0] }, e, s).start(), t.animator
    }

    fromLeft(t, e, s) {
      const i = t._getOptsValue('width') + t._getParentsMargin()[3];
      return t.style.translate = [-i, 0], t.animator = t.animate({ translate: [0, 0] }, e, s).start(), t.animator
    }

    toTop(t, e, s) {
      const i = t._getOptsValue('height') + t._getParentsMargin()[0];
      return t.animator = t.animate({ translate: [0, -i] }, e, s).start(), t.animator
    }

    toRight(t, e, s) {
      const i = t._getOptsValue('width') + t._getParentsMargin()[1];
      return t.animator = t.animate({ translate: [i, 0] }, e, s).start(), t.animator
    }

    toBottom(t, e, s) {
      const i = t._getOptsValue('height'), n = t._getParentsMargin(), r = t.getBoundingRect(),
        a = t.spr.canvas.height - r.bottom, o = t.style.translate, h = i + n[2] + a + (o[1] || 0);
      return t.animator = t.animate({ translate: [0, h] }, e, s).start(), t.animator
    }

    toLeft(t, e, s) {
      const i = t._getOptsValue('width') + t._getParentsMargin()[3];
      return t.animator = t.animate({ translate: [-i, 0] }, e, s).start(), t.animator
    }
  }

  var i = ['click', 'dblclick', 'mousewheel', 'mouseout', 'mouseup', 'mousedown', 'mousemove', 'contextmenu', 'mouseover'],
    n = 'undefined' == typeof Float32Array ? Array : Float32Array;

  function r() {
    var t = new n(6);
    return a(t), t
  }

  function a(t) {
    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
  }

  function o(t, e, s) {
    var i = e[0] * s[0] + e[2] * s[1], n = e[1] * s[0] + e[3] * s[1], r = e[0] * s[2] + e[2] * s[3],
      a = e[1] * s[2] + e[3] * s[3], o = e[0] * s[4] + e[2] * s[5] + e[4], h = e[1] * s[4] + e[3] * s[5] + e[5];
    return t[0] = i, t[1] = n, t[2] = r, t[3] = a, t[4] = o, t[5] = h, t
  }

  class TransitionFilter {
    constructor(t) {
      this.parent = t
    }

    static factory(t) {
      return new TransitionFilter(t)
    }

    runEnterAnimator(t) {
      const e = [];
      this.getAnimatorList(this.parent, 'enter', e);
      const s = e.length;
      let i = 0;
      i === s && t && t(), e.forEach(e => {
        e.spr.sceneTransition.start(e, e.sceneAnimator.enter.name, e.sceneAnimator.enter.duration, () => {
          i += 1, i === s && t && t()
        })
      })
    }

    runLeaveAnimator() {
      return new Promise((t, e) => {
        const s = [];
        this.getAnimatorList(this.parent, 'leave', s);
        const i = s.length;
        let n = 0;
        n === i && t(), s.forEach(e => {
          e.spr.sceneTransition.start(e, e.sceneAnimator.leave.name, e.sceneAnimator.leave.duration, () => {
            n += 1, n === i && t()
          })
        })
      })
    }

    getAnimatorList(t, e, s) {
      t.children.forEach(t => {
        this.getAnimatorList(t, e, s)
      }), t.sceneAnimator[e] && !t.ignoreStatus && s.push(t)
    }
  }

  function h(t) {
    if (l(t, 'HTMLDivElement')) return t;
    if (l(t, 'String')) {
      let e = document.getElementById(t);
      if (e && l(e, 'HTMLDivElement')) return e
    }
    return console.warn('传入的DOM节点参数不符合规范'), !1
  }

  function l(t, e) {
    return Object.prototype.toString.call(t).includes(e)
  }

  function c(t, e) {
    let s = e || {};
    return l(t, 'Object') ? { ...t, ...s } : s
  }

  function d(t, ...e) {
    if (!l(t, 'Object')) return console.error('参数错误: ' + t);
    if (!e.length) return t;
    return e.every(t => l(t, 'Object')) ? (e.forEach(e => {
      !function t(e, s) {
        Object.keys(s).forEach(i => {
          l(s[i], 'Object') ? (e[i] || (e[i] = {}), t(e[i], s[i])) : e[i] = s[i]
        })
      }(t, e)
    }), t) : console.error('source参数错误: ' + e)
  }

  function u(t = 'spray') {
    return `${ t.toLowerCase() }-${ Math.random().toString(36).slice(-8) }`
  }

  function p(t = '') {
    return document.createElement(t || 'div')
  }

  let g = {
    TOPLEFT: 1,
    TOPCENTER: 2,
    TOPRIGHT: 3,
    CENTERLEFT: 4,
    CENTERCENTER: 5,
    CENTERRIGHT: 6,
    BOTTOMLEFT: 7,
    BOTTOMCENTER: 8,
    BOTTOMRIGHT: 9
  };

  function m(t, e) {
    return new Proxy(t, {
      _filters: e || [], get: (t, e, s) => Reflect.get(t, e, s), set(t, e, s, i) {
        return 'Style' === i.constructor.name && (this._filters.includes(e) || i.parent.id && y(i.parent.id)), 'FreeContainer' === i.constructor.name && 'width,height,top,left'.includes(e) && y(i.id), Reflect.set(t, e, s, i)
      }
    })
  }

  function y(t, e, s) {
    new Promise((t, e) => {
      t()
    }).then(() => {
    })
  }

  function f(t, e, s = !1) {
    e && e.forEach(e => {
      s && (e.option.id = u(e.type));
      const i = C(e.type, t, e.option);
      e.children && f(i, e.children, s)
    })
  }

  var A = Object.freeze({
    __proto__: null,
    getDomObject: h,
    isType: l,
    mixinOpts: c,
    deepMixinOpts: d,
    excutionJavascript: function (t, e, s, i = !1) {
      const n = document.body;
      let r = s ? n.querySelector(s) : null;
      r && n.removeChild(r), r && (r = null), r = document.createElement('script'), r.type = 'text/javascript', e && 'function' == typeof e && (r.onload = e), s && (r.id = s), n.appendChild(r), i ? r.appendChild(document.createTextNode(t)) : r.src = t
    },
    createElementName: u,
    normalizeCssArray: function (t) {
      let e = [0, 0, 0, 0];
      'number' == typeof t && (e = [t, t, t, t]);
      const s = t.length;
      return 2 === s && t.every(t => 'number' == typeof t) && (e = [t[0], t[1], t[0], t[1]]), 3 === s && t.every(t => 'number' == typeof t) && (e = [t[0], t[1], t[2], t[1]]), 4 === s && t.every(t => 'number' == typeof t) && (e = [t[0], t[1], t[2], t[3]]), e
    },
    createDom: p,
    containerConstraints: g,
    createProxyObject: m,
    buildChildElements: f
  });

  function v(t, e, s = !0) {
    Object.getOwnPropertyNames(e.prototype).forEach(i => {
      'constructor' !== i && s && (t.prototype[i] = e.prototype[i])
    })
  }

  function w(t, e, s) {
    Array.isArray(e) ? e.forEach(e => {
      v(t, e, s)
    }) : v(t, e, s)
  }

  class Loading {
    constructor(t) {
      this.parent = t, this.radius = 40, this.lineWidth = 8, this.strokeStyle = '#fff', this.degreeStart = -90, this.degreeEnd = 180, this.stepStart = 8, this.stepEnd = 2, this.size = {}, this.dom = null, this.ctx = null
    }

    static factory(t) {
      return new Loading(t)
    }

    _createDom() {
      this.dom = document.createElement('canvas'), this.dom.width = this.size.width, this.dom.height = this.size.height, this.ctx = this.dom.getContext('2d'), this.dom.style.backgroundColor = 'rgba(0,0,0,0.2)', this.dom.style.position = 'absolute'
    }

    _render() {
      this.ctx && (this.degreeStart = this.degreeStart + this.stepStart, this.degreeEnd = this.degreeEnd + this.stepEnd, this.degreeStart - 360 > this.degreeEnd && (this.degreeStart -= 720), this.ctx.clearRect(0, 0, this.size.width, this.size.height), this.ctx.lineWidth = this.lineWidth, this.ctx.beginPath(), this.ctx.strokeStyle = this.strokeStyle, this.ctx.arc(this.size.width / 2, this.size.height / 2, this.radius - this.lineWidth / 2, (this.degreeStart < this.degreeEnd ? this.degreeStart : this.degreeEnd) * Math.PI / 180, (this.degreeStart < this.degreeEnd ? this.degreeEnd : this.degreeStart) * Math.PI / 180, !1), this.ctx.stroke())
    }

    start() {
      this.size = this.parent.getSize(), this._createDom(), this.dom && this.parent.getRoot().appendChild(this.dom), this.renderLoop()
    }

    stop() {
      const t = this.parent.getRoot();
      Array.from(t.children).filter(t => t === this.dom)[0] && this.parent.getRoot().removeChild(this.dom), this.parent = null
    }

    renderLoop() {
      let t = this;
      this._render(), requestAnimationFrame((function () {
        t.renderLoop()
      }))
    }
  }

  var _ = 2020;

  function b(t = 'spray') {
    return t + '-' + _++
  }

  class Tick {
    constructor(t, e) {
      this.parent = t, this.animator = e.animator, this.attribute = e.attribute, this.startTime = 0, this.pauseTime = 0, this.stopped = !1, this.ended = !1, this.startValue = this.getValue(this.attribute), this.nowValue = l(this.startValue, 'Array') ? Object.assign([], this.startValue) : this.startValue, this.endValue = this.getEndValue(e.endValue), this.duration = e.duration
    }

    start() {
      this.stopped && (this.startTime = this.startTime + this.getNowDate() - this.pauseTime, this.stopped = !1), !this.startTime && (this.startTime = this.getNowDate());
      this.parent.spr.addTick(() => {
        if (this.stopped) return !1;
        const t = 1 - (Math.max(0, this.startTime + this.duration - this.getNowDate()) / this.duration || 0);
        return this.run(t), t < 1 || (this.ended = !0, this.parent.spr.addTick(this.animator.finally.bind(this.animator)), !1)
      })
    }

    pause() {
      this.stopped = !0, this.pauseTime = this.getNowDate()
    }

    stop() {
      this.stopped = !0
    }

    getNowDate() {
      return Date.now()
    }

    run(t) {
      'translate' === this.attribute || 'scale' === this.attribute || 'skew' === this.attribute ? (this.nowValue[0] = (this.endValue[0] - this.startValue[0]) * t + this.startValue[0], this.nowValue[1] = (this.endValue[1] - this.startValue[1]) * t + this.startValue[1]) : this.nowValue = (this.endValue - this.startValue) * t + this.startValue, this.parent.style[this.attribute] = this.nowValue
    }

    getValue(t) {
      return 'translate' === t ? this.parent.style.translate && this.parent.style.translate.length ? this.parent.style.translate : [0, 0] : 'scale' === t ? this.parent.style.scale && this.parent.style.scale.length ? this.parent.style.scale : [1, 1] : 'skew' === t ? this.parent.style.skew && this.parent.style.skew.length ? this.parent.style.skew : [0, 0] : this.parent.style[this.attribute]
    }

    getEndValue(t) {
      if ('translate' === this.attribute || 'scale' === this.attribute || 'skew' === this.attribute) {
        if (l(t, 'String') && l(+t, 'Number')) return [+t, +t];
        if (l(t, 'Number')) return [t, t];
        if (l(t, 'Array') && l(t[0], 'Number') && l(t[1], 'Number')) return [t[0], t[1]]
      }
      return l(t, 'String') && l(+t, 'Number') ? +t : t
    }
  }

  class Animator {
    constructor(t, e, s, i) {
      this.parent = t, this.id = b('animator'), this._name = '', this.props = c({}, e), this.duration = s || Animator.defaultDuration, this.callback = i, this.tweens = [], this.paused = !1, this.init()
    }

    static factory(t, e, s, i) {
      return new Animator(t, e, s, i)
    }

    init() {
      if ('none' === this.props.transform) {
        const t = {};
        this.parent.translate.length && (t.translate = 0), this.parent.rotate && (t.rotate = 0), this.parent.scale.length && (t.scale = 1), this.parent.skew.length && (t.skew = 0), this.props = t
      }
      for (const t in this.props) if (Object.prototype.hasOwnProperty.call(this.props, t)) {
        const e = { attribute: t, animator: this, endValue: this.props[t], duration: this.duration },
          s = new Tick(this.parent, e);
        this.tweens.push(s)
      }
    }

    start() {
      for (const t of this.tweens) t.start();
      return this.tweens.length && (this.paused = !1), this
    }

    pause() {
      for (const t of this.tweens) t.pause();
      this.tweens.length && (this.paused = !0)
    }

    stop() {
      for (const t of this.tweens) t.stop();
      return this.finally(), !0
    }

    finally() {
      return this.tweens.every(t => t) && (this.tweens = [], this.parent && this.parent.animator && (this.parent.animator = null), this.parent = null, this.callback && this.callback()), !1
    }

    get name() {
      return this._name
    }

    set name(t) {
      this._name = t
    }

    static get defaultDuration() {
      return 500
    }
  }

  class StyleItem {
    constructor(t, e) {
      this.parent = t, this.name = e, this.value = null, this.dirty = !1, 'transform' === e && (this.translate = null, this.scale = null, this.rotate = null, this.skew = null, this.matrix = null)
    }

    static factory(t, e) {
      return new StyleItem(t, e)
    }

    set(t) {
      l(t, 'Object') ? this[t.name] = t.value : this.value = t, this.dirty = !0, this.parent.dirty = !0
    }

    get(t) {
      return this[t]
    }

    getValue() {
      return 'backgroundImage' === this.name && this.value ? `url(${ this.value })` : 'transform' === this.name ? this._getTransformStyleValue() : 'width' !== this.name && 'height' !== this.name || Number.isNaN(Number(this.value)) ? 'margin' !== this.name && 'padding' !== this.name || !l(this.value, 'Array') ? 'backdropFilter' === this.name ? `blur(${ this.value }px)` : l(this.value, 'Array') ? this.value.join(' ') : 'top' !== this.name && 'left' !== this.name && 'right' !== this.name && 'bottom' !== this.name || !l(this.value, 'Number') ? this.value : this.value + 'px' : this.value.join('px ') + 'px' : this.value + 'px'
    }

    _getTransformStyleValue() {
      let t = '';
      return this.translate && 2 === this.translate.length && (t += `translate(${ this.translate[0] }px, ${ this.translate[1] }px)`), this.scale && 2 === this.scale.length && (t.length && (t += ' '), t += `scale(${ this.scale[0] }, ${ this.scale[1] })`), this.rotate && (t.length && (t += ' '), t += `rotate(${ this.rotate }deg)`), this.skew && 2 === this.skew.length && (t.length && (t += ' '), t += `skew(${ this.skew[0] }deg, ${ this.skew[1] }deg)`), this.matrix && 6 === this.matrix.length && (t.length && (t += ' '), t += `matrix(${ this.matrix.join(',') })`), t
    }
  }

  class Style {
    constructor(t) {
      this.parent = t, this._style = new Map;
      return ['position', 'top', 'left', 'width', 'height', 'transform', 'transformOrigin', 'filter', 'right', 'bottom', 'outline', 'backgroundImage', 'backgroundColor', 'background', 'backgroundPosition', 'flex', 'padding', 'margin', 'display', 'border', 'opacity', 'zIndex', 'pointerEvents', 'cursor', 'flexDirection', 'justifyContent', 'alignItems', 'backgroundRepeat', 'backgroundSize', 'backdropFilter'].forEach(t => {
        this._style.set(t, StyleItem.factory(this, t))
      }), m(this, ['transform', 'transformOrigin', 'translate', 'scale', 'skew', 'matrix', 'rotate'])
    }

    static factory(t) {
      return new Style(t)
    }

    setOption(t) {
      return !!l(t, 'Object') && (Object.keys(t).forEach(e => {
        this[e] = t[e]
      }), !0)
    }

    getDirtyStyleList() {
      const t = [];
      for (const e of this._style.values()) if (e.dirty) {
        e.dirty = !1;
        const s = e.getValue();
        if (null == s) continue;
        t.push({ name: e.name, value: s })
      }
      return t
    }

    hasStyle() {
      for (const t of this._style.values()) if (t.value) return !0;
      return !1
    }

    toJSON() {
      const t = {};
      return this._style.forEach(e => {
        'transform' !== e.name && e.value && (t[e.name] = e.value)
      }), t
    }

    _setStyle(t, e) {
      const s = this._style.get(t);
      return s ? e !== s.get() && (s.set(e), !0) : (console.error('请输入正确的样式名称: ' + t), !1)
    }

    _getStyle(t, e = 'value') {
      return this._style.get(t).get(e)
    }

    set width(t) {
      this._setStyle('width', t)
    }

    get width() {
      return this._getStyle('width')
    }

    set height(t) {
      this._setStyle('height', t)
    }

    get height() {
      return this._getStyle('height')
    }

    set top(t) {
      this._setStyle('top', t)
    }

    get top() {
      return this._getStyle('top')
    }

    set left(t) {
      this._setStyle('left', t)
    }

    get left() {
      return this._getStyle('left')
    }

    set right(t) {
      this._setStyle('right', t)
    }

    get right() {
      return this._getStyle('right')
    }

    set bottom(t) {
      this._setStyle('bottom', t)
    }

    get bottom() {
      return this._getStyle('bottom')
    }

    set outline(t) {
      this._setStyle('outline', t)
    }

    get outline() {
      return this._getStyle('outline')
    }

    set backgroundImage(t) {
      l(t, 'String') && this._setStyle('backgroundImage', t)
    }

    get backgroundImage() {
      return this._getStyle('backgroundImage')
    }

    set filter(t) {
      this._setStyle('filter', t)
    }

    get filter() {
      return this._getStyle('filter')
    }

    set backgroundColor(t) {
      l(t, 'String') && this._setStyle('backgroundColor', t)
    }

    get backgroundColor() {
      return this._getStyle('backgroundColor')
    }

    set background(t) {
      this._setStyle('background', t)
    }

    get background() {
      return this._getStyle('background')
    }

    set backgroundRepeat(t) {
      this._setStyle('backgroundRepeat', t)
    }

    get backgroundRepeat() {
      return this._getStyle('backgroundRepeat')
    }

    set backgroundSize(t) {
      this._setStyle('backgroundSize', t)
    }

    get backgroundSize() {
      return this._getStyle('backgroundSize')
    }

    set backgroundPosition(t) {
      l(t, 'String') && this._setStyle('backgroundPosition', t)
    }

    get backgroundPosition() {
      return this._getStyle('backgroundPosition')
    }

    set flex(t) {
      this._setStyle('flex', t)
    }

    get flex() {
      return this._getStyle('flex')
    }

    set padding(t) {
      (l(t, 'String') || l(t, 'Number')) && (t = [t, t, t, t]), this._setStyle('padding', t)
    }

    get padding() {
      return this._getStyle('padding')
    }

    set paddingTop(t) {
      let e = this.padding;
      l(e, 'Array') ? e[0] = t : e = [t, 0, 0, 0], this.padding = e
    }

    get paddingTop() {
      const t = this.padding;
      return t ? t[0] : 0
    }

    set paddingRight(t) {
      let e = this.padding;
      l(e, 'Array') ? e[1] = t : e = [0, t, 0, 0], this.padding = e
    }

    get paddingRight() {
      const t = this.padding;
      return t ? t[1] : 1
    }

    set paddingBottom(t) {
      let e = this.padding;
      l(e, 'Array') ? e[2] = t : e = [0, 0, t, 0], this.padding = e
    }

    get paddingBottom() {
      const t = this.padding;
      return t ? t[2] : 2
    }

    set paddingLeft(t) {
      let e = this.padding;
      l(e, 'Array') ? e[3] = t : e = [0, 0, 0, t], this.padding = e
    }

    get paddingLeft() {
      const t = this.padding;
      return t ? t[3] : 3
    }

    set margin(t) {
      (l(t, 'String') || l(t, 'Number')) && (t = [t, t, t, t]), this._setStyle('margin', t)
    }

    get margin() {
      return this._getStyle('margin')
    }

    set marginTop(t) {
      let e = this.margin;
      l(e, 'Array') ? e[0] = t : e = [t, 0, 0, 0], this.margin = e
    }

    get marginTop() {
      const t = this.margin;
      return t ? t[0] : 0
    }

    set marginRight(t) {
      let e = this.margin;
      l(e, 'Array') ? e[1] = t : e = [0, t, 0, 0], this.margin = e
    }

    get marginRight() {
      const t = this.margin;
      return t ? t[1] : 1
    }

    set marginBottom(t) {
      let e = this.margin;
      l(e, 'Array') ? e[2] = t : e = [0, 0, t, 0], this.margin = e
    }

    get marginBottom() {
      const t = this.margin;
      return t ? t[2] : 2
    }

    set marginLeft(t) {
      let e = this.margin;
      l(e, 'Array') ? e[3] = t : e = [0, 0, 0, t], this.margin = e
    }

    get marginLeft() {
      const t = this.margin;
      return t ? t[3] : 3
    }

    set display(t) {
      this._setStyle('display', t)
    }

    get display() {
      return this._getStyle('display')
    }

    set position(t) {
      this._setStyle('position', t)
    }

    get position() {
      return this._getStyle('position')
    }

    set border(t) {
      this._setStyle('border', t)
    }

    get border() {
      return this._getStyle('border')
    }

    set opacity(t) {
      this._setStyle('opacity', t)
    }

    get opacity() {
      return this._getStyle('opacity')
    }

    set pointerEvents(t) {
      this._setStyle('pointerEvents', t)
    }

    get pointerEvents() {
      return this._getStyle('pointerEvents')
    }

    set transform(t) {
      this._setStyle('transform', t)
    }

    get transform() {
      return this._getStyle('transform')
    }

    set translate(t) {
      l(t, 'Number') && (t = [t, t]), l(t, 'Array') && l(t[0], 'Number') && l(t[1], 'Number') && (t = [t[0], t[1]]), this.transform = {
        name: 'translate',
        value: t
      }
    }

    get translate() {
      return this._getStyle('transform', 'translate')
    }

    set scale(t) {
      l(t, 'Number') && (t = [t, t]), l(t, 'Array') && l(t[0], 'Number') && l(t[1], 'Number') && (t = [t[0], t[1]]), this.transform = {
        name: 'scale',
        value: t
      }
    }

    get scale() {
      return this._getStyle('transform', 'scale')
    }

    set skew(t) {
      l(t, 'Number') && (t = [t, t]), l(t, 'Array') && l(t[0], 'Number') && l(t[1], 'Number') && (t = [t[0], t[1]]), this.transform = {
        name: 'skew',
        value: t
      }
    }

    get skew() {
      return this._getStyle('transform', 'skew')
    }

    set rotate(t) {
      l(t, 'Number') && (this.transform = { name: 'rotate', value: t })
    }

    get rotate() {
      return this._getStyle('transform', 'rotate')
    }

    set matrix(t) {
      l(t, 'Array') && (this.transform = { name: 'matrix', value: t })
    }

    get matrix() {
      return this._getStyle('transform', 'matrix')
    }

    set transformOrigin(t) {
      l(t, 'Array') ? this._setStyle('transformOrigin', t) : console.warn('transformOrigin值不是数组')
    }

    get transformOrigin() {
      return this._getStyle('transformOrigin')
    }

    set zIndex(t) {
      this._setStyle('zIndex', t)
    }

    get zIndex() {
      return this._getStyle('zIndex')
    }

    set cursor(t) {
      this._setStyle('cursor', t)
    }

    get cursor() {
      return this._getStyle('cursor')
    }

    set flexDirection(t) {
      this._setStyle('flexDirection', t)
    }

    get flexDirection() {
      return this._getStyle('flexDirection')
    }

    set justifyContent(t) {
      this._setStyle('justifyContent', t)
    }

    get justifyContent() {
      return this._getStyle('justifyContent')
    }

    set alignItems(t) {
      this._setStyle('alignItems', t)
    }

    get alignItems() {
      return this._getStyle('alignItems')
    }

    set backdropFilter(t) {
      this._setStyle('backdropFilter', t)
    }

    get backdropFilter() {
      return this._getStyle('backdropFilter')
    }

    set dirty(t) {
      this.parent.dirty = t
    }
  }

  class Displayable {
    constructor(t, e) {
      return this.parent = t, this._options = e || {}, this.opts = null, this.dom = null, this.style = Style.factory(this), this.root = this.parent.getRoot(), this._spr = null, this.isShow = !0, this.ignore = !1, this._isSlected = !1, this._isMouseOver = !1, this._handlers = new Map, this._trigger = null, this.children = [], this._dirty = !1, this.loadingComponent = null, this.adapter = null, this.adapterPromise = null, this.animator = null, this._typeName = '', this.sceneAnimator = {
        enter: null,
        leave: null
      }, this.dataInfo = {
        url: null,
        type: null,
        condition: null,
        level: null,
        data: null
      }, this.bizData = null, this.initEventHandlers(), this.beforeMount = function () {
      }, this.afterMount = function () {
      }, this.beforeUpdate = function () {
      }, this.afterUpdate = function () {
      }, m(this)
    }

    initDom() {
      this.addSelfToStorage(), this.dom = this._createDom(), this.mount()
    }

    initId(t) {
      this.opts.id || (this.id = u(t || this.constructor.name))
    }

    verifyOpts() {
    }

    _createDom(t = '') {
      const e = t && l(t, 'String') ? document.createElement(t) : document.createElement('div');
      return e.dataset.id = this.id, e
    }

    _buildStyle() {
      return []
    }

    _buildBoundingRect() {
      const t = [], e = { name: 'outline', value: '' };
      return this.isSelected && (e.value = '#ff3366 solid thin'), this.isMouseOver && !this.isSelected && (e.value = '#5393FF solid thin'), t.push(e), t
    }

    _updateStyle() {
      if (!this.dom) return;
      [...this._buildStyle(), ...this._buildBoundingRect(), ...this.style.getDirtyStyleList()].forEach(t => {
        this.dom.style[t.name] = t.value
      })
    }

    getRoot() {
      return this.dom
    }

    getBoundingRect() {
      return !!this.dom && this.dom.getBoundingClientRect()
    }

    getBoundingRectFromCanvas() {
      if (!this.dom) return !1;
      const t = this.dom.getBoundingClientRect(), e = this._spr.canvas.dom.getBoundingClientRect(),
        s = this._spr.canvas.ratio;
      let i = t.width / s, n = t.height / s, r = t.x / s - e.x / s, a = t.y / s - e.y / s;
      return { bottom: n + a, height: n, left: r, right: r + i, top: a, width: i, x: r, y: a }
    }

    contain(t, e) {
      const s = this.dom.getBoundingClientRect();
      return t > s.left && t < s.right && e > s.top && e < s.bottom && s
    }

    getSpray() {
      return this.parent instanceof Spray ? this.parent : this.parent.getSpray()
    }

    getRootLayer() {
      return 'Canvas' === this.constructor.name ? null : 'Canvas' === this.parent.constructor.name ? this : this.parent.getRootLayer()
    }

    getIgnoreStatus() {
      return !(this instanceof Spray) && ('Canvas' !== this.constructor.name && ('Layer' === this.constructor.name ? this.ignoreRendering : this.parent.getIgnoreStatus()))
    }

    addSelfToStorage() {
      this._spr = this.getSpray(), this._spr && this._spr.storage.addElToStorage(this)
    }

    mount() {
      this.ignoreStatus || (this.beforeMount.call(), this.root.appendChild(this.dom), this.afterMount.call())
    }

    loadAdapter() {
      if (this.opts.adapter) {
        const t = this.opts.adapter;
        this.createAdapter(t.type, t.name), new Promise((t, e) => {
          t()
        }).then(() => {
          this.initAdapter(t.option)
        })
      }
    }

    async unmount(t = !1) {
      l(t, 'Boolean') && t && await TransitionFilter.factory(this).runLeaveAnimator(), this.root && this.root.removeChild(this.dom)
    }

    update() {
      this.beforeUpdate.call(), this._updateStyle(), this.afterUpdate.call()
    }

    resize() {
    }

    async hidden(t = !0) {
      this.isShow && (t && await TransitionFilter.factory(this).runLeaveAnimator(), this.isShow = !1, this.style.display = 'none', this.dirty = !0)
    }

    show() {
      this.isShow || (TransitionFilter.factory(this).runEnterAnimator(), this.isShow = !0, this.style.display = '', this.dirty = !0)
    }

    toggle() {
      this.isShow ? this.hidden() : this.show()
    }

    select() {
      this.isSelected = !0
    }

    deselect() {
      this.isSelected = !1
    }

    toJSON() {
      const t = (() => {
        let t = {};
        for (let e in this.opts.lock) this.opts.lock[e] && (t[e] = !0);
        return t
      })(), e = {
        option: {
          name: this.name,
          id: this.id,
          width: this.width,
          height: this.height,
          sceneAnimator: { enter: null, leave: null }
        }
      };
      if (Object.keys(t).length > 0 && (e.option.lock = t), this.style.hasStyle() && (e.option.style = this.style.toJSON()), this.adapter) {
        const t = this.adapter.constructor.name, s = this.adapter.name, i = this.adapter.opts;
        e.option.adapter = { type: t, name: s, option: i }
      }
      if (this.sceneAnimator.enter) {
        const t = this.sceneAnimator.enter.name, s = this.sceneAnimator.enter.duration;
        e.option.sceneAnimator.enter = { name: t, duration: s }
      }
      if (this.sceneAnimator.leave) {
        const t = this.sceneAnimator.leave.name, s = this.sceneAnimator.leave.duration;
        e.option.sceneAnimator.leave = { name: t, duration: s }
      }
      return e
    }

    addChildren(t) {
      this.children.push(t)
    }

    removeChildren(t) {
      this.children = this.children.filter(e => e !== t)
    }

    getJSONObject() {
      let t = this.toJSON();
      return this._getChildrenJSON(this.children, t), t
    }

    _getChildrenJSON(t, e) {
      t.forEach(t => {
        !e.children && (e.children = []);
        const s = t.toJSON();
        e.children.push(s), this._getChildrenJSON(t.children, s)
      })
    }

    addChildrenFromJSON(t) {
      if (!t) return;
      let e = t;
      if ('string' == typeof t) try {
        e = JSON.parse(t)
      } catch (t) {
        console.warn('场景定义文件被损坏造成无法正常读取')
      }
      l(e, 'Array') ? f(this, e, !0) : f(this, [e], !0), this.spr.eventbus.emit('addFromTemplate', this.id)
    }

    addEnterTransition(t, e) {
      this.spr.sceneTransition.enter(this, t, e)
    }

    removeEnterTransition() {
      this.spr.sceneTransition.enter(this)
    }

    addLeaveTransition(t, e) {
      this.spr.sceneTransition.leave(this, t, e)
    }

    removeLeaveTransition() {
      this.spr.sceneTransition.leave(this)
    }

    async destroy(t = !0) {
      this.spr.storage.selectedElement && (this.spr.storage.selectedElement = null), this.spr.storage.mouseOverElement && (this.spr.storage.mouseOverElement = null), t && await TransitionFilter.factory(this).runLeaveAnimator(), this.children.forEach(t => {
        t.destroy(!1)
      }), this.children = [], this.destroyAdapter(), !this.ignoreStatus && await this.unmount(), this._spr && this._spr.storage.deleteElFromStorage(this), this.parent !== this.spr && this.parent.removeChildren(this), 'Canvas' === this.constructor.name && (this.parent.canvas = null), this._spr.eventbus.off('canvasResizeOnPlayMode', this.resize), this.parent = null, this.style = null, this._spr = null
    }

    setSize(t, e) {
      this.width = t, this.height = e
    }

    getSize() {
      return { width: this._getWidth(), height: this._getHeight() }
    }

    _getWidth() {
      return 'inherit' === this.width || null === this.width ? this.parent._getWidth() : this.width
    }

    _getHeight() {
      return 'inherit' === this.height || null === this.height ? this.parent._getHeight() : this.height
    }

    setBackgroundImage(t) {
      this.style.backgroundImage = t
    }

    getSelectedChildren(t = []) {
      this.children.forEach(e => {
        e.isSelected ? t.push(e) : e.getSelectedChildren(t)
      })
    }

    set width(t) {
      this.style.width = t, this.opts.width = t
    }

    get width() {
      return this.style.width
    }

    set height(t) {
      this.style.height = t, this.opts.height = t
    }

    get height() {
      return this.style.height
    }

    set order(t) {
      l(t, 'Number') ? t !== this.order && (this.opts.order = t, this.dirty = !0) : console.warn('元素显示顺序必须是一个数字')
    }

    get order() {
      return this.opts.order
    }

    set name(t) {
      l(t, 'String') ? t && this.opts.name !== t && (this.opts.name = t, this._pubPropChange('name', t)) : console.warn('元素名称必须是一个字符串')
    }

    get name() {
      return this.opts.name
    }

    set typeName(t) {
      l(t, 'String') ? t && (this._typeName = t) : console.warn('元素类型名称必须是一个字符串')
    }

    get typeName() {
      return this._typeName
    }

    set isSelected(t) {
      if (!l(t, 'Boolean')) return;
      if (this._isSlected === t) return;
      this._isSlected = t, this._spr && this._spr.storage && (this._spr.storage.selectedElement = t ? this : null);
      const e = this.getRootLayer();
      e && (e.dirty = !0), this.dirty = !0
    }

    get isSelected() {
      return this._isSlected
    }

    set isMouseOver(t) {
      l(t, 'Boolean') && this._isMouseOver !== t && (this._isMouseOver = t, this._spr && this._spr.storage && (this._spr.storage.mouseOverElement = t ? this : null), this.dirty = !0)
    }

    get isMouseOver() {
      return this._isMouseOver
    }

    set dirty(t) {
      if (!0 === t) return this._dirty = t, void (this._spr && this._spr.refresh());
      this._dirty = !1
    }

    get dirty() {
      return this._dirty
    }

    get spr() {
      return this._spr
    }

    get app() {
      let t = null;
      return this.adapter && this.adapter.componentInstance && (t = this.adapter.componentInstance), t
    }

    get ignoreStatus() {
      return this.getIgnoreStatus()
    }

    get id() {
      return this.opts.id
    }

    set id(t) {
      this.opts.id || (this.opts.id = t)
    }

    getLockStatusByPropName(t) {
      return !0 === this.opts.lock[t]
    }

    setLockStatusByPropName(t, e) {
      l(e, 'Boolean') ? this.opts.lock[t] !== e && (this.opts.lock[t] = e) : console.warn('锁定项必须赋布尔类型值')
    }

    _pubPropChange(t, e) {
      this.spr.eventbus.emit('elementPropChange', { key: t, value: e })
    }
  }

  w(Displayable, [class {
    constructor() {
    }

    initEventHandlers() {
      i.forEach(t => {
        this._handlers.set(t, { list: [], isBind: !1 })
      }), this._trigger = this.trigger.bind(this)
    }

    on(t, e, s) {
      if (arguments.length < 2) throw new Error('参数数量不够');
      if (!this.dom || !this._handlers.get(t) || !l(e, 'Function')) return;
      const i = this._handlers.get(t);
      i.list.some(t => t.handler === e) || (i.list.push({
        ctx: s,
        handler: e
      }), i.isBind || (i.isBind = !0, this.dom.addEventListener(t, this._trigger)))
    }

    trigger(t) {
      this._handlers.get(t.type).list.forEach(e => {
        e.handler.call(e.ctx, t)
      })
    }

    triggerByName(t) {
      this._handlers.get(t).list.forEach(t => {
        t.handler.call(t.ctx)
      })
    }

    once(t, e, s) {
      if (this.dom) {
        const i = function () {
          e(), this.off(t, i)
        };
        this.on(t, i.bind(this), s)
      }
    }

    off(t, e = null) {
      let s = this._handlers.get(t);
      s.length <= 1 || !e ? (this.dom.removeEventListener(t, this._trigger), s.list = [], s.isBind = !1) : s.list = s.list.filter(t => t.handler !== e)
    }

    initDevEvent() {
      console.log(this), this.on('mouseover', (function () {
        console.log('触发了鼠标移出事件')
      }))
    }
  }, class {
    constructor() {
    }

    initAnimator() {
      const t = this.sceneAnimator;
      if (t.enter) return l(t.enter, 'Object') && l(t.enter.name, 'String') ? void this.spr.sceneTransition.start(this, t.enter.name, t.enter.duration, () => {
        this.loadAdapter()
      }) : console.error('参数错误');
      this.loadAdapter()
    }

    _getOptsValue(t, e = '') {
      let s, i = t, n = e;
      return 1 === arguments.length && (n = t, i = this), s = i.style[n], s && 'inherit' !== s ? s : this._getOptsValue(i.parent, n)
    }

    _getParentsMargin(t = null) {
      let e = t, s = [0, 0, 0, 0];
      e || (e = this);
      const i = e.style && e.style.margin ? e.style.margin : [0, 0, 0, 0];
      if (l(i, 'Array') && (s[0] += i[0], s[1] += i[1], s[2] += i[2], s[3] += i[3]), e.parent) {
        const t = this._getParentsMargin(e.parent);
        l(t, 'Array') && (s[0] += t[0], s[1] += t[1], s[2] += t[2], s[3] += t[3])
      }
      return s
    }

    animate(t, e = 0, s = null) {
      return l(t, 'String') ? Animator[t] ? (l(e, 'String') && l(+e, 'Number') && (e = +e), l(e, 'Number') || (e = Animator.defaultDuration), this.animator = Animator[t].call(this, e), this.animator) : void 0 : l(t, 'Object') && l(e, 'Number') ? (this.animator && this.animator.stop(), this.animator = Animator.factory(this, t, e, s), this.animator) : void console.error('animator参数错误')
    }
  }, class {
    constructor() {
    }

    createAdapter(t, e) {
      return this.adapter = s.newComponent(t, this, e), this.adapter && this.startLoading(), this.adapter
    }

    initAdapter(t) {
      this.adapter && this.adapter.init(t), this.spr && this.spr.storage.addAdapterToStorage(this.adapter)
    }

    setDataToAdapter(t) {
      this.adapter && this.adapter.setData(t)
    }

    setOptionToAdapter(t) {
      this.adapter && this.adapter.setOption(t)
    }

    resizeAdapter(t) {
      this.adapter && this.adapter.resize(t)
    }

    destroyAdapter() {
      this.adapter && this.adapter.destroy(), this.spr.storage.deleteAdapterFromStorage(this.adapter), this.adapter = null
    }

    startLoading() {
      this.loadingComponent = Loading.factory(this), this.loadingComponent.start()
    }

    stopLoading() {
      this.loadingComponent && this.loadingComponent.stop(), this.loadingComponent = null
    }
  }, class {
    constructor() {
    }

    getData() {
      return this.bizData
    }

    setData(t) {
      let e = this.bizData = t, s = { id: this.id, bizData: e };
      this.spr && this.spr.eventbus.emit('dataChange', s)
    }

    openDataWindow() {
      this.spr.whale && this.spr.whale.showModal(this.id)
    }
  }]);
  const E = new Map;

  function C(t, e, s) {
    if (!E.has(t)) return console.warn(`注册名词为${ t }的对象不存在，请检查对象注册时所使用的名称`), !1;
    let i = E.get(t).factory(e, s);
    return 'Canvas' !== t && i instanceof Displayable && (e.children.some(t => t === i) || e.addChildren(i)), i
  }

  function S(t, e) {
    E.has(t) ? console.warn('对象已经存在，请使用新的名词注册') : E.set(t, e)
  }

  var x = Object.freeze({
    __proto__: null, newFromRegistedClazz: C, registClazz: S, getRegisteClazzList: function () {
      return E
    }
  });

  class Eventbus {
    constructor() {
      this._events = {}
    }

    static factory() {
      return this.instance || (this.instance = new Eventbus), this.instance
    }

    on(t, e, s) {
      t in this._events || (this._events[t] = []), this._events[t].push({ handle: e, ctx: s })
    }

    off(t, e) {
      const s = this._events[t];
      Array.isArray(s) && (this._events[t] = s.filter(t => t.handle !== e))
    }

    emit(t, ...e) {
      this._events[t] && this._events[t].forEach(t => {
        t.ctx ? t.handle.call(t.ctx, ...e) : t.handle(...e)
      })
    }

    once(t, e) {
      const s = this, i = function (...n) {
        e(...n), s.off(t, i)
      };
      this.on(t, i)
    }
  }

  let L = { extendManage: !0, zoomBar: !0, boundingRect: !0, canvasMode: 'matrix', appMode: !1 },
    O = Eventbus.factory();

  function k() {
    return L
  }

  function M(t, e) {
    return !(!l(e, 'Boolean') && !l(e, 'String')) && (L[t] = e, O.emit('configChange', { key: t, value: e }), !0)
  }

  var I = Object.freeze({ __proto__: null, getConfig: k, setConfig: M });

  function T(t, e) {
    if ('matrix' === k().canvasMode) return t.style.translate = [t.opts.left, t.opts.top], t.style.scale = 1, void (t.style.transformOrigin = ['top', 'left']);
    if (t.style.transformOrigin = ['top', 'left'], t.constraints) {
      const s = function (t, e) {
        const s = t.constraints, i = { width: t.spr.width, height: t.spr.height }, n = function (t, e, s) {
            let i = 1;
            const n = g, r = [n.TOPCENTER, n.BOTTOMCENTER];
            if ([n.TOPLEFT, n.CENTERLEFT, n.BOTTOMLEFT, n.TOPRIGHT, n.CENTERRIGHT, n.BOTTOMRIGHT].some(e => e === t)) return i = e.height / s.height, i;
            if (r.some(e => e === t)) return i = e.width / s.width, i;
            if (t === n.CENTERCENTER) return i = (e.width / s.width + e.height / s.height) / 2, i;
            return i
          }(t.constraints, i, e), [r, a] = (c = t.spr.width, d = t.spr.height, u = e.width, p = e.height, [z(u, p), z(c, d)]),
          o = (r[s - 1][1] - t.opts.top) * n, h = (r[s - 1][0] - t.opts.left) * n, l = a[s - 1][1] - o;
        var c, d, u, p;
        return { left: a[s - 1][0] - h, top: l, ratio: n }
      }(t, e);
      !function (t, e, s, i) {
        t.style.translate = [s, e], t.style.scale = i
      }(t, s.top, s.left, s.ratio)
    }
  }

  function z(t, e) {
    return [[0, 0], [t / 2, 0], [t, 0], [0, e / 2], [t / 2, e / 2], [t, e / 2], [0, e], [t / 2, e], [t, e]]
  }

  const B = ['space-between', 'flex-start', 'flex-end', 'center', 'space-around'];

  class Flex extends Displayable {
    constructor(t, e) {
      super(t, e);
      this.typeName = 'Flex布局', this.opts = d({
        id: null,
        name: null,
        width: null,
        height: null,
        lock: { x: !0, y: !0, width: !0, height: !0 },
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }
      }, this._options), this.style.setOption(this.opts.style), this.initId('layout'), this.width = 'inherit', this.height = 'inherit', this.verifyOpts(), this.initDom()
    }

    static factory(t, e) {
      return new Flex(t, e)
    }

    verifyOpts() {
      'row' !== this.opts.direction && 'column' !== this.opts.direction && (this.opts.direction = 'row')
    }

    createContaniner(t) {
      return C('FlexContainer', this, t)
    }

    createContaniners(t) {
      let e = [];
      return l(t, 'Array') && t.forEach(t => {
        e.push(C('FlexContainer', this, t))
      }), e
    }

    getContainerByName(t) {
      return this.children.filter(e => e.name === t)[0]
    }

    getContainerById(t) {
      return this.children.filter(e => e.id === t)[0]
    }

    getContainerByIndex(t) {
      return this.children[t]
    }

    getContainerAll() {
      return this.children
    }

    toJSON() {
      const t = super.toJSON();
      return t.type = 'Flex', t.option.direction = this.direction, t.option.justify = this.justify, t
    }

    set direction(t) {
      'row' !== t && 'column' !== t || (this.opts.direction = t, this.dirty = !0)
    }

    get direction() {
      return this.opts.direction
    }

    set justify(t) {
      B.some(e => e === t) && (this.opts.justify = t, this.dirty = !0)
    }

    get justify() {
      return this.opts.justify
    }
  }

  S('Flex', Flex);

  class ElementQueryAPI {
    constructor() {
    }

    getLayout() {
      let t = null;
      return t = this.children.filter(t => t instanceof Flex), t[0]
    }

    getContainerByIndex(t) {
      const e = this.getLayout();
      let s = null, i = null;
      return e && (s = e.children), s && (i = s[t]), i
    }

    getContainerByName(t) {
      const e = this.getLayout();
      let s = null, i = null;
      return e && (s = e.children), s && (i = s.filter(e => e.name === t)[0]), i
    }
  }

  class FreeContainer extends Displayable {
    constructor(t, e) {
      super(t, e);
      const s = {
        id: null,
        name: null,
        width: 100,
        height: 100,
        constraints: g.LEFTTOP,
        top: 0,
        left: 0,
        lock: { x: !1, y: !1, width: !1, height: !1 },
        style: { position: 'absolute', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }
      };
      this.typeName = 'Free布局容器', this.opts = d(s, this._options), this.style.setOption(this.opts.style), this.width = this.opts.width, this.height = this.opts.height, this.opts.sceneAnimator && (this.sceneAnimator.enter = this.opts.sceneAnimator.enter, this.sceneAnimator.leave = this.opts.sceneAnimator.leave), this.initId('container'), this.verifyOpts(), this.initDom(), this.initAnimator(), this.animate({ translate: [this.opts.left, this.opts.top] }, 400).start(), this.spr.eventbus.on('canvasResizeOnPlayMode', this.resize, this)
    }

    resize() {
      T(this, arguments[0])
    }

    static factory(t, e) {
      return new FreeContainer(t, e)
    }

    verifyOpts() {
    }

    toJSON() {
      const t = super.toJSON();
      return t.type = 'FreeContainer', t.option.constraints = this.opts.constraints, t.option.top = this.opts.top, t.option.left = this.opts.left, t
    }

    get top() {
      return this.opts.top
    }

    set top(t) {
      l(t, 'Number') && t !== this.opts.top && (this.opts.top = t, this.style.translate = [this.opts.left, this.opts.top])
    }

    get left() {
      return this.opts.left
    }

    set left(t) {
      l(t, 'Number') && t !== this.opts.left && (this.opts.left = t, this.style.translate = [this.opts.left, this.opts.top])
    }

    get constraints() {
      return this.opts.constraints
    }

    set constraints(t) {
      this.opts.constraints = t
    }
  }

  w(FreeContainer, [ElementQueryAPI]), S('FreeContainer', FreeContainer);

  class Canvas extends Displayable {
    constructor(t, e) {
      super(t, e);
      this.opts = d({
        id: null,
        name: null,
        width: 1920,
        height: 1080,
        lock: { x: !1, y: !1, width: !1, height: !1 },
        filter: { hueRotate: 0, contrast: 1, opacity: 1, saturate: 1, brightness: 1 },
        style: {
          backgroundColor: 'black',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transformOrigin: [0, 0],
          matrix: [1, 0, 0, 1, 0, 0]
        }
      }, this._options), this.typeName = '画布', this.style.setOption(this.opts.style), this.style.filter = this._buildFilterStyle(), this.opts.sceneAnimator && (this.sceneAnimator.enter = this.opts.sceneAnimator.enter, this.sceneAnimator.leave = this.opts.sceneAnimator.leave), this.style.pointerEvents = 'all', this.initId('canvas'), this._ratio = 1, this._origin = null, this.width = this.opts.width, this.height = this.opts.height, this.rawWidth = this.opts.width, this.rawHeight = this.opts.height, this.initDom(), this._initMatrix(), this.initAnimator(), this.ignoreBoundingActiveReg = /^(Flex|Free)$/, this.ignoreBoundingFocusReg = /^(Canvas|Layer|Flex)$/, this.bindEventList = {}, this.mouseMoveDisplayable = null, this.mouseOffset = {
        clientX: 0,
        clientY: 0
      }, this.canvasMoveFlag = !1, this.resizeHandlerMoveFlag = !1, this.sysEventList = i, this._onSysEventProxy(), this._initBindEventList(), this._onCanvasEvent(), this.spr.eventbus.on('configChange', this._onConfigChange, this)
    }

    static factory(t, e) {
      return new Canvas(t, e)
    }

    _initRatio() {
      const t = window.innerWidth, e = window.innerHeight;
      let s = (t - 400) / this.width;
      return this.width / this.height < t / e && (s = (e - 300) / this.height), s > 1 && (s = 1), s
    }

    _initOrigin() {
      return [this.spr.width / 2, this.spr.height / 2]
    }

    _initMatrix() {
      let t = r();
      a(t), t[4] = (this.spr.width - this.width) / 2, t[5] = (this.spr.height - this.height) / 2, this.matrix = t;
      const e = this._origin = this._initOrigin(), s = this._ratio = this._initRatio();
      this.zoomCanvas(e, s)
    }

    _buildFilterStyle() {
      return `hue-rotate(${ this.opts.filter.hueRotate }deg) contrast(${ 100 * this.opts.filter.contrast }%) \n    opacity(${ 100 * this.opts.filter.opacity }%)  saturate(${ 100 * this.opts.filter.saturate }%)  brightness(${ 100 * this.opts.filter.brightness }%)`
    }

    zoomCanvas(t, e) {
      let s = [e, e], i = [...this.matrix];
      if (i || (i = r(), a(i)), i[0] <= .04 && s[0] < 1) return;
      if (i[0] >= 4 && s[0] > 1) return;
      let n = t;
      n ? this._origin = [...n] : n = [...this._origin];
      let h = r();
      var l, c, d, u, p;
      h[4] -= n[0], h[5] -= n[1], l = h, c = h, u = (d = [s[0], s[1]])[0], p = d[1], l[0] = c[0] * u, l[1] = c[1] * p, l[2] = c[2] * u, l[3] = c[3] * p, l[4] = c[4] * u, l[5] = c[5] * p, h[4] += n[0], h[5] += n[1], o(i, h, i), this.matrix = i, this._ratio = i[0], this.parent.extendManage && this.parent.extendManage.zoomBar && (this.parent.extendManage.zoomBar.ratioText = this._ratio), this.spr.eventbus.emit('zoomCanvas', this)
    }

    zoomCanvasToCenter() {
      this._initMatrix()
    }

    createLayer(t) {
      let e;
      return e = C('Layer', this, t), e
    }

    toJSON() {
      const t = super.toJSON();
      t.type = 'Canvas';
      const e = this._getFilterDef();
      return Object.keys(e).length > 0 && (t.option.filter = e), t
    }

    _getFilterDef() {
      const t = { hueRotate: 0, contrast: 1, opacity: 1, saturate: 1, brightness: 1 }, e = {};
      return Object.keys(this.opts.filter).forEach(s => {
        this.opts.filter[s] !== t[s] && (e[s] = this.opts.filter[s])
      }), e
    }

    setFilter(t, e) {
      void 0 !== this.opts.filter[t] && this.opts.filter[t] !== e && l(e, 'Number') && (this.opts.filter[t] = e, this.style.filter = this._buildFilterStyle())
    }

    async destroy() {
      this._offSysEventProxy(), this._offCanvasEvent(), this.spr.eventbus.off('configChange', this._onConfigChange), await super.destroy()
    }

    get ratio() {
      return this._ratio
    }

    set ratio(t) {
      l(t, 'Number') && this.zoomCanvas(null, t / this._ratio)
    }

    get matrix() {
      return this.style.matrix
    }

    set matrix(t) {
      this.style.matrix = t
    }
  }

  w(Canvas, [class {
    constructor() {
    }

    _initBindEventList() {
      this.bindEventList.documentKeyDown = this._keyDown.bind(this), this.bindEventList.documentKeyUp = this._keyUp.bind(this), this.bindEventList.windowResize = this._windowResize.bind(this), this.bindEventList.rootClick = this._rootClick.bind(this), this.bindEventList.mouseMoveDisplayable = this._moveDisplayable.bind(this), this.bindEventList.stopMove = this._stopMove.bind(this)
    }

    _onSysEventProxy() {
      this.sysEventList.forEach(t => {
        this.on(t, this.eventProxy, this)
      })
    }

    _offSysEventProxy() {
      this.sysEventList.forEach(t => {
        this.off(t, this.eventProxy)
      })
    }

    eventProxy(t) {
      const e = this._getContainDisplayable(t.clientX, t.clientY).reverse()[0];
      e && e instanceof Displayable && e.trigger(t)
    }

    _onCanvasEvent() {
      this._onCanvasBaseEvent(), document.addEventListener('keydown', this.bindEventList.documentKeyDown), document.addEventListener('keyup', this.bindEventList.documentKeyUp), window.addEventListener('resize', this.bindEventList.windowResize), this.spr.root.addEventListener('click', this.bindEventList.rootClick)
    }

    _onCanvasBaseEvent() {
      this.on('mousedown', this._mouseDown, this), this.on('mousemove', this._mouseMove, this), this.on('mousewheel', this._zoomCanvas, this)
    }

    _offCanvasEvent() {
      this._offCanvasBaseEvent(), document.removeEventListener('keydown', this.bindEventList.documentKeyDown), document.removeEventListener('keyup', this.bindEventList.documentKeyUp), window.removeEventListener('resize', this.bindEventList.windowResize), this.spr.root.removeEventListener('click', this.bindEventList.rootClick)
    }

    _offCanvasBaseEvent() {
      this.off('mousedown', this._mouseDown, this), this.off('mousemove', this._mouseMove, this), this.off('mousewheel', this._zoomCanvas, this)
    }

    _mouseMove(t) {
      const e = this._getContainDisplayable(t.clientX, t.clientY).reverse().filter(t => !this.ignoreBoundingFocusReg.test(t.constructor.name))[0];
      e ? e.isMouseOver = !0 : this.spr.storage.mouseOverElement = null
    }

    _mouseDown(t) {
      this.mouseOffset.clientX = t.clientX, this.mouseOffset.clientY = t.clientY;
      const e = this.spr.functionLayer.contain(t.clientX, t.clientY);
      if (e && !this.canvasMoveFlag && (this.resizeHandlerMoveFlag = !0, this.mouseMoveDisplayable = e), !this.canvasMoveFlag && !this.resizeHandlerMoveFlag) {
        const e = this._selectDisplayable(t.clientX, t.clientY);
        this.mouseMoveDisplayable = e instanceof FreeContainer ? e : null
      }
      document.addEventListener('mousemove', this.bindEventList.mouseMoveDisplayable), document.addEventListener('mouseup', this.bindEventList.stopMove)
    }

    _stopMove(t) {
      this.resizeHandlerMoveFlag && (this.resizeHandlerMoveFlag = !1, this.spr.eventbus.emit('resizeHandlerMoveEnd', { displayable: this.spr.storage.selectedElement })), document.removeEventListener('mousemove', this.bindEventList.mouseMoveDisplayable), document.removeEventListener('mouseup', this.bindEventList.stopMove), this.mouseMoveDisplayable && this.mouseMoveDisplayable instanceof FreeContainer && this.spr.eventbus.emit('containerMoveEnd', { displayable: this.mouseMoveDisplayable }), this.mouseMoveDisplayable = null
    }

    _moveDisplayable(t) {
      return this.canvasMoveFlag ? void this._moveCanvas(t) : this.resizeHandlerMoveFlag ? void this._moveResizeHandler(t) : void this._moveContainer(t)
    }

    _moveCanvas(t) {
      let e = t.movementX, s = t.movementY;
      const i = r();
      a(i), i[4] = e, i[5] = s;
      const n = (h = this.matrix, d = r(), c = h, (l = d)[0] = c[0], l[1] = c[1], l[2] = c[2], l[3] = c[3], l[4] = c[4], l[5] = c[5], d);
      var h, l, c, d;
      this.matrix = o(n, i, n)
    }

    _moveContainer(t) {
      let e = t.movementX, s = t.movementY;
      this.mouseMoveDisplayable && (this.mouseMoveDisplayable.getLockStatusByPropName('y') || (this.mouseMoveDisplayable.top += s / this.ratio), this.mouseMoveDisplayable.getLockStatusByPropName('x') || (this.mouseMoveDisplayable.left += e / this.ratio), this.spr.eventbus.emit('containerMove', { displayable: this.mouseMoveDisplayable }))
    }

    _moveResizeHandler(t) {
      'ResizeHandler' === this.mouseMoveDisplayable.constructor.name && this.mouseMoveDisplayable.moveHandler(t)
    }

    _zoomCanvas(t) {
      let e, s;
      if (e = window.navigator.userAgent.indexOf('Mac OS X') > -1 ? 1 - .01 * t.deltaY : t.deltaY < 0 ? 1.1 : .9, k().appMode) {
        const e = this.spr.root.getBoundingClientRect();
        s = [t.clientX - e.left, t.clientY - e.top]
      } else s = [t.clientX, t.clientY];
      this.zoomCanvas(s, e)
    }

    _keyDown(t) {
      if ('Escape' === t.key) if ('matrix' === k().canvasMode) {
        const t = this.spr.storage, e = t.mouseOverElement, s = t.selectedElement;
        if (e && (t.mouseOverElement = null, e !== s)) return;
        t.selectedElement && (t.selectedElement = null)
      } else M('canvasMode', 'matrix'), this.setSize(this.rawWidth, this.rawHeight), this.spr.eventbus.emit('canvasResizeOnPlayMode', {
        width: this.rawWidth,
        height: this.rawHeight
      }), this.zoomCanvasToCenter(), this._resizeWindowManul();
      ' ' === t.key && (this.canvasMoveFlag = !0)
    }

    _keyUp(t) {
      this.canvasMoveFlag = !1
    }

    _windowResize() {
      this.spr.resize(), 'matrix' !== k().canvasMode && this._resizeCanvas()
    }

    _resizeWindowManul() {
      const t = new Event('resize');
      window.dispatchEvent(t)
    }

    _resizeCanvas() {
      this.matrix = [1, 0, 0, 1, 0, 0], this.setSize(this.spr.width, this.spr.height), this.spr.eventbus.emit('canvasResizeOnPlayMode', {
        width: this.rawWidth,
        height: this.rawHeight
      })
    }

    _rootClick(t) {
      t.target === this.spr.root && (this.spr.storage.selectedElement = null, this.spr.storage.mouseOverElement = null)
    }

    _onConfigChange(t) {
      'canvasMode' === t.key && ('matrix' === t.value && this._onCanvasBaseEvent(), 'play' === t.value && (this._offCanvasBaseEvent(), function () {
        this.spr.storage.mouseOverElement && (this.spr.storage.mouseOverElement = null);
        this.spr.storage.selectedElement && (this.spr.storage.selectedElement = null)
      }.call(this), this.zoomCanvasToCenter(), this.ratio = 1, this._resizeCanvas(), this._resizeWindowManul()))
    }

    _getContainDisplayable(t, e) {
      let s = [];
      return this.spr.storage._displayables.forEach(i => {
        'Canvas' !== i.constructor.name && i.isShow && !i.ignoreStatus && i.contain(t, e) && s.push(i)
      }), s
    }

    _selectDisplayable(t, e) {
      if ('matrix' === k().canvasMode && Math.abs(this.mouseOffset.clientX - t) > 5 && Math.abs(this.mouseOffset.clientY - e) > 5) return;
      const s = this._getContainDisplayable(t, e).reverse().filter(t => !this.ignoreBoundingActiveReg.test(t.constructor.name))[0];
      if (s) return s.select(), s;
      this.spr.storage.selectedElement = null
    }
  }]), S('Canvas', Canvas);

  class Layer extends Displayable {
    constructor(t, e) {
      super(t, e);
      this.typeName = '图层', this.opts = d({
        id: null,
        name: null,
        width: 'inherit',
        height: 'inherit',
        order: 0,
        ignoreRendering: !1,
        lock: { x: !0, y: !0, width: !1, height: !1 },
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none'
        }
      }, this._options), this.style.setOption(this.opts.style), this.opts.sceneAnimator && (this.sceneAnimator.enter = this.opts.sceneAnimator.enter, this.sceneAnimator.leave = this.opts.sceneAnimator.leave), this.opts.width && (this.width = this.opts.width), this.opts.height && (this.height = this.opts.height), this.initId('layer'), this._initOrder(), this.layoutManager = null, this.initDom(), this.initAnimator()
    }

    _initOrder() {
      0 === this.order && this.parent && (this.order = this.parent.children.length + 1)
    }

    _buildStyle() {
      const t = [];
      return this.getSelectedChildren(t), this.isSelected || t.length > 0 ? [{
        name: 'zIndex',
        value: 101
      }] : [{ name: 'zIndex', value: this.order }]
    }

    reSizeToCanvas() {
      this.width = this.parent.width, this.height = this.parent.height
    }

    static factory(t, e) {
      return new Layer(t, e)
    }

    setInheritAll(t) {
      this.setInheritWidth(t), this.setInheritHeight(t)
    }

    setInheritWidth(t) {
      this.inheritWidth = t
    }

    setInheritHeight(t) {
      this.inheritHeight = t
    }

    setIgnore(t) {
      this.ignoreRendering = t
    }

    setLayerOrderTo(t) {
      if (t === this.order) return;
      if (t <= 0) return;
      this.parent.children.forEach(e => {
        t < this.order && e.order >= t && e.order < this.order && (e.order += 1), t > this.order && e.order <= t && e.order > this.order && (e.order -= 1)
      }), this.order = t
    }

    setLayerOrderToTop() {
      let t = this.order;
      const e = this.parent.children.map(t => t.order);
      e.length > 0 && (t = Math.max(...e)), this.setLayerOrderTo(t)
    }

    setLayerOrderToBottom() {
      this.setLayerOrderTo(1)
    }

    createLayout(t, e) {
      return this.layoutManager && console.warn('该图层已经创建了一个布局对象，如果需要创建新布局，请将原来的布局destroy'), this.layoutManager = C(t, this, e), this.layoutManager
    }

    createLandscape(t) {
      return this.createLayout('Landscape', t), this.layoutManager
    }

    createPortrait(t) {
      return this.createLayout('Portrait', t), this.layoutManager
    }

    toJSON() {
      const t = super.toJSON();
      return t.type = 'Layer', t.option.order = this.order, t.option.ignoreRendering = this.opts.ignoreRendering, t
    }

    async destroy(t = !0) {
      t && !this.ignoreRendering && await TransitionFilter.factory(this).runLeaveAnimator(), this.layoutManager ? (this.layoutManager.destroy(!1), this.layoutManager = null) : this.children.forEach(t => {
        t.destroy(!1)
      }), this.children = [], !this.ignoreRendering && await this.unmount(), this._spr && this._spr.storage.deleteElFromStorage(this), this.parent && this.parent.removeChildren(this), this.parent = null, this._spr = null
    }

    set inheritWidth(t) {
      l(t, 'Boolean') && (this.opts.inheritWidth = t, this.dirty = !0)
    }

    get inheritWidth() {
      return this.opts.inheritWidth
    }

    set inheritHeight(t) {
      l(t, 'Boolean') && (this.opts.inheritHeight = t, this.dirty = !0)
    }

    get inheritHeight() {
      return this.opts.inheritHeight
    }

    set ignoreRendering(t) {
      l(t, 'Boolean') && this.opts.ignoreRendering !== t && (t ? this._doUnmount(t) : (this.opts.ignoreRendering = t, this.spr.painter.mountFromDisplayable(this)))
    }

    async _doUnmount(t) {
      await this.unmount(!0), this.opts.ignoreRendering = t
    }

    get ignoreRendering() {
      return this.opts.ignoreRendering
    }
  }

  w(Layer, [ElementQueryAPI]), S('Layer', Layer);

  class Painter {
    constructor(t, e) {
      this.parent = t, this.storage = e, this._reDrawId = null, this.isRunning = !1
    }

    static factory(t, e) {
      return new Painter(t, e)
    }

    refresh() {
      if (this.isRunning) return;
      this.isRunning = !0;
      const t = this.storage.getDisplayable(), e = this.storage.getAdapters();
      this._reDrawId = Math.random(), this._paintList(t, this._reDrawId), this._paintList(e, this._reDrawId), this.isRunning = !1
    }

    _paintList(t, e) {
      this._reDrawId === e && this._doPaintList(t)
    }

    _doPaintList(t) {
      t.forEach(t => {
        t.dirty = !1, t.update()
      })
    }

    mountFromDisplayable(t) {
      if (t.getRoot().children.length > 0) return t.hidden(!1), t.mount(), t.show(), void this.parent.eventbus.emit('layerReload', t.id);
      this._doChildrenMount(t)
    }

    _doChildrenMount(t) {
      l(t.children, 'Array') && t.children.length > 0 && t.children.forEach(t => {
        this.mountFromDisplayable(t)
      }), t.mount(), t.dirty = !0
    }

    paintFromDisplayable(t) {
      t.dirty = !0, t.adapter && t.adapter.repaint(), t.children && t.children.forEach(t => {
        this.paintFromDisplayable(t)
      })
    }
  }

  class Storage {
    constructor(t) {
      this.spr = t, this._displayables = [], this._adapters = [], this._selectedElement = null, this._selectedFlag = !1, this._mouseOverElement = null, this._mouseOverFlag = !1
    }

    static factory(t) {
      return new Storage(t)
    }

    addElToStorage(t) {
      t.dirty = !0, this._displayables.push(t)
    }

    addAdapterToStorage(t) {
      t.dirty = !0, this._adapters.push(t)
    }

    deleteElFromStorage(t) {
      this._displayables = this._displayables.filter(e => e !== t)
    }

    deleteAdapterFromStorage(t) {
      this._adapters = this._adapters.filter(e => e !== t)
    }

    getDisplayable() {
      return this._displayables.filter(t => !0 === t.dirty && !t.ignoreStatus)
    }

    getAdapters() {
      return this._adapters.filter(t => !0 === t.dirty)
    }

    getElementById(t) {
      return this._displayables.filter(e => e.id === t)
    }

    getElementByName(t) {
      return this._displayables.filter(e => e.name === t)
    }

    getDisplayableListByClassName(t) {
      return t ? l(t, 'String') ? this._displayables.filter(e => new RegExp(`^(${t})$`).test(e.constructor.name)) : console.error('参数不是字符串：' + t) : this._displayables
    }

    toJSON() {
      let t = {};
      const e = this._displayables[0];
      e instanceof Canvas && (t = e.toJSON()), this._findChildren(e, t);
      let s = null;
      return this.spr.whale && (s = this.spr.whale.getDef()), s && l(s, 'Array') && s.length > 0 && (t.dataIntergrationInfos = s), t
    }

    _findChildren(t, e) {
      this._displayables.forEach(s => {
        if (s.parent === t) {
          let t = s.toJSON();
          e.children || (e.children = []), e.children.push(t), this._findChildren(s, t)
        }
      })
    }

    async fromJSON(t) {
      let e = t;
      if ('string' == typeof t) try {
        e = JSON.parse(t)
      } catch (t) {
        console.warn('场景定义文件被损坏造成无法正常读取')
      }
      l(e, 'Object') && 'Canvas' === e.type && (await this.spr.createCanvas(e.option), e.children && f(this.spr.canvas, e.children, !1));
      const s = e.dataIntergrationInfos;
      s && this.spr.whale && this.spr.whale.setDef(s)
    }

    _pubElementChange(t, e) {
      this.spr.eventbus.emit(t, { displayable: e })
    }

    set selectedElement(t) {
      this._selectedElement !== t && (this._selectedFlag || (this._selectedElement && this._selectedElement.isSelected && (this._selectedFlag = !0, this._selectedElement.deselect()), this._selectedElement = t, this._selectedFlag = !1, this._pubElementChange('selectChange', t)))
    }

    get selectedElement() {
      return this._selectedElement
    }

    set mouseOverElement(t) {
      this._mouseOverElement !== t && (this._mouseOverFlag || (this._mouseOverElement && (this._mouseOverFlag = !0, this._mouseOverElement.isMouseOver = !1), this._mouseOverElement = t, this._mouseOverFlag = !1, this._pubElementChange('mouseOverChange', t)))
    }

    get mouseOverElement() {
      return this._mouseOverElement
    }
  }

  const R = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAAhElEQVRYCe2WQQ7AIAgES9O38ig+257ogaQuxDR7WS/GiLgMopq738eiRYQtpuEU8n9CDz8bWCrcjXSqM/elE5AAEYA1nqd1esrTHlUXPQVXKkU9iqSu75KjE5AAERABERCB9lvQvdvrm4DG9BToV0xPgQTQCbxV8FWv079g9YPuDzqBB5fnIzU9m9lWAAAAAElFTkSuQmCC',
    D = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAAiUlEQVRYCe2VQQ7AIAgES9O3+ig+28Ym23AhUUncHtYLHFDWQcFaa/dBXCcx95v6ggB3N/g7LMjTCUhAiUCvI2q5+m5KAlaTxn0SIAIiQCfwDaP4N7s/02BGYrNh918CmeJICjcfiY37ok8nIAEiIAJ0Amkrjs0i8ysNCGfSCUiAYaCgJrstvQQPuNYa2g9vFhwAAAAASUVORK5CYII=',
    N = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAAaklEQVRYCe3VMQrAIBBE0WzIWfdQe9kEAmshTCOSSfFt1AVxeM1EZt6HcZ3Gv9+vrw5QVdHnL/aWtwsQAAEEEEDALjDKaC6gLot5vnpXZfdfAZV4VUC9swsQAAEEEEDALhC7a1eVjprbBR73VA52QhaevQAAAABJRU5ErkJggg==',
    F = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAABY0lEQVRYCWNMT0//yDCAgOX///98A2g/AwvM8lmzZjHC2PSg09LS/oPsYaKHZfjsGHXAaAgMeAjAsyG+lIpPrrCwUOjbt2866GqA5ctFYNYmWMhRHAKWlpYgS7KAFh5ExoyMjProjsLGp9gBYWFhfyUlJWOAhq/FZgEhMYodALLg7du3gkBKjZBl2OQpdkBubq7or1+/9gEN1wXi68CgX4PNIlxiFDkAZjkw7nWAFl/j5OR0dHZ2jgBatgKXhejiZDsA3XIODg6niRMnvgSlCRcXlxguLq4r6JZh45OVDdEtB/reEWj5K5gFIEcA2e9gfHw0WSEAjPO5oGAHGnwVZPmMGTPgluOzDJscCzntAKDlOUCLGYA4hRLLQQ6iayMEOQRGGySw0GCBBQVMABdNTlrBZRayOFm5ANkAStnwcgCXD4kNIXIdMuAhMOqA0RCA5wJSUztQfScw5ZeRm/ph+gY8CgDI6n5CGMkLsQAAAABJRU5ErkJggg==';

  class ZoomBar {
    constructor(t) {
      this.parent = t, this._spr = t._spr, this.root = this.parent.dom, this.dom = null, this.textDom = null, this._barList = [], this.init()
    }

    static factory(t) {
      return new ZoomBar(t)
    }

    init() {
      this.dom = p(), this.dom.style.cssText = 'display: flex; flex-direction: row-reverse; align-items: center; padding-right: 20px; margin-bottom: 20px; pointer-events: all; flex: 1; height: 40px; order: -1;transition: margin-bottom 0.25s linear 0s;', this.root.appendChild(this.dom), this.createBarItem({
        width: 20,
        height: 20,
        backgroundImage: F,
        backgroundSize: [16, 16]
      }, '播放', this._playEvent), this.createBarItem({
        width: 20,
        height: 20,
        backgroundImage: D,
        backgroundSize: [16, 16]
      }, '放大', this._zoomIn), this.textDom = this.createBarItem({
        width: 40,
        height: 20,
        lineHeight: 20
      }, null, this._refreshEvent), this.createBarItem({
        width: 20,
        height: 20,
        backgroundImage: N,
        backgroundSize: [16, 16]
      }, '缩小', this._zoomOut), this.createBarItem({
        width: 20,
        height: 20,
        backgroundImage: R,
        backgroundSize: [16, 16]
      }, '画布居中', this._focusing), this.ratioText = this._spr.canvas.ratio
    }

    createBarItem(t, e, s = null) {
      const i = t.backgroundSize, n = t.lineHeight, r = p();
      let a = null,
        o = `width: ${ t.width || 20 }px; height: ${ t.height || 20 }px; ${ n ? `line-height: ${ n }px;` : '' } text-align: center; margin: 0 5px; font-size: 12px; color: #707070; cursor: pointer;`;
      return e && r.setAttribute('title', e), t.backgroundImage && (o += `background: url(${ t.backgroundImage }) no-repeat center center/${ i ? `${ i[0] }px ${ i[1] }px` : '100% 100%' }`), r.style.cssText = o, l(s, 'Function') && (a = s.bind(this), r.addEventListener('click', a)), this._barList.push({
        dom: r,
        clickEvent: a
      }), this.dom.appendChild(r), r
    }

    _zoomIn() {
      'play' !== k().canvasMode && (this._spr.canvas.ratio = this._spr.canvas.ratio + .1 > 4 ? 4 : this._spr.canvas.ratio + .1)
    }

    _zoomOut() {
      'play' !== k().canvasMode && (this._spr.canvas.ratio = this._spr.canvas.ratio - .1 < .04 ? .04 : this._spr.canvas.ratio - .1)
    }

    _focusing() {
      'play' !== k().canvasMode && this._spr.canvas.zoomCanvasToCenter()
    }

    _refreshEvent() {
      'play' !== k().canvasMode && (this._spr.canvas.ratio = 1)
    }

    _playEvent() {
      M('canvasMode', 'play')
    }

    show() {
      this.dom.style.marginBottom = '20px'
    }

    hidden() {
      this.dom.style.marginBottom = '-30px'
    }

    destroy() {
      return this._barList.forEach(t => {
        t.clickEvent && t.dom.removeEventListener('click', t.clickEvent), t.dom && this.dom.removeChild(t.dom)
      }), this._barList = null, this.root.removeChild(this.dom), this.parent = null, this._spr = null, this.root = null, this.dom = null, !0
    }

    set ratioText(t) {
      this.textDom.innerText = (100 * t).toFixed(0) + '%'
    }

    get ratioText() {
      return this._spr.canvas.ratio
    }
  }

  class ExtendManage {
    constructor(t) {
      this._spr = t, this.root = this._spr.root, this.dom = null, this.zoomBar = null, this.inited = !1, this._spr.eventbus.on('configChange', this.changeExtend, this)
    }

    static factory(t) {
      return new ExtendManage(t)
    }

    init() {
      this.dom = p('div'), this.dom.setAttribute('data-name', 'extend'), this.dom.style.cssText = 'position: absolute; display: flex; align-items: flex-end; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;', this.root.appendChild(this.dom), 'matrix' === k().canvasMode && k().zoomBar && (this.zoomBar = ZoomBar.factory(this)), this.inited = !0
    }

    destroy() {
      return this.zoomBar && this.zoomBar.destroy(), this.root.removeChild(this.dom), this._spr.eventbus.off('configChange', this.changeExtend), this._spr = null, this.root = null, this.dom = null, this.zoomBar = null, !0
    }

    changeExtend(t) {
      'zoomBar' === t.key && (t.value ? !this.zoomBar && (this.zoomBar = this.zoomBar = ZoomBar.factory(this)) : (this.zoomBar && this.zoomBar.destroy(), this.zoomBar = null)), 'canvasMode' === t.key && ('matrix' === t.value && this.zoomBar && this.zoomBar.show(), 'play' === t.value && this.zoomBar && this.zoomBar.hidden())
    }
  }

  class FunctionLayer {
    constructor(t) {
      this.spr = t, this.oprLayer = null, this.resizeHandler = [], this.isInit = !1, this.selectedDisplayable = null, this.spr.eventbus.on('selectChange', this.resetResizeHandlerListener, this), this.spr.eventbus.on('containerMove', this.hiddenResizeHandler, this), this.spr.eventbus.on('containerMoveEnd', this.resetResizeHandlerListener, this)
    }

    static factory(t) {
      return this.instance || (this.instance = new FunctionLayer(t)), this.instance
    }

    init() {
      if (!this.isInit) {
        this.oprLayer = this.spr.createLayer({
          id: 'FunctionLayer',
          name: 'FunctionLayer',
          order: 900
        }), this.resizeHandler = [];
        for (let t = 0; t < 8; t++) this.resizeHandler.push(new ResizeHandler(this, t));
        this.isInit = !0
      }
    }

    contain(t, e) {
      return this.resizeHandler.filter(s => s.contain(t, e))[0] || null
    }

    resetResizeHandlerListener() {
      const t = arguments[0].displayable;
      t ? (this.selectedDisplayable = t, this.resetResizeHandler()) : (this.selectedDisplayable = null, this.resizeHandler.forEach(t => {
        t.hidden()
      }))
    }

    resetResizeHandler() {
      if (!this.selectedDisplayable) return;
      const t = this.selectedDisplayable.getBoundingRectFromCanvas();
      this.resizeHandler.forEach((e, s) => {
        let i = 0, n = 0;
        switch (s) {
          case 0:
            n = t.top, i = t.left + t.width / 2;
            break;
          case 1:
            n = t.bottom, i = t.left + t.width / 2;
            break;
          case 2:
            n = t.top + t.height / 2, i = t.left;
            break;
          case 3:
            n = t.top + t.height / 2, i = t.right;
            break;
          case 4:
            n = t.top, i = t.left;
            break;
          case 5:
            n = t.top, i = t.right;
            break;
          case 6:
            n = t.bottom, i = t.left;
            break;
          case 7:
            n = t.bottom, i = t.right
        }
        e.show(i, n)
      })
    }

    hiddenResizeHandler() {
      this.resizeHandler.forEach(t => {
        this.selectedDisplayable = null, t.hidden()
      })
    }
  }

  class ResizeHandler {
    constructor(t, e) {
      this.parent = t, this.spr = t.spr, this.oprLayer = t.oprLayer, this.index = e, this.isShow = !1, this.dom = null, this.realWidth = 12, this.handlerFnArr = [[0], [1], [2], [3], [0, 2], [0, 3], [1, 2], [1, 3]], this.fnMaps = this._fnMaps(), this.initStyle = `width:${ this.realWidth }px;height:${ this.realWidth }px;background-color:#ff3366;\n    transform:scale(${ 1 / this.spr.canvas.ratio });position:absolute;display:none;top:0px;left:0px;pointer-events:all`, this.init()
    }

    init() {
      this.dom = p(), this.dom.style = this.initStyle, this.oprLayer.dom.appendChild(this.dom), this.initCursor(), this.spr.eventbus.on('zoomCanvas', this.resizeHandler, this)
    }

    initCursor() {
      this.dom.style.cursor = ['n-resize', 's-resize', 'w-resize', 'e-resize', 'nw-resize', 'ne-resize', 'sw-resize', 'se-resize'][this.index]
    }

    resizeHandler(t) {
      this.isShow && (this.dom.style.transform = `scale(${ 1 / t.ratio })`)
    }

    contain(t, e) {
      const s = this.dom.getBoundingClientRect();
      return t > s.left && t < s.right && e > s.top && e < s.bottom && this
    }

    show(t, e) {
      this.dom.style.display = 'block', this.dom.style.left = t - this.realWidth / 2 + 'px', this.dom.style.top = e - this.realWidth / 2 + 'px', this.isShow = !0
    }

    hidden() {
      this.isShow && (this.dom.style.display = 'none', this.dom.style.left = '0px', this.dom.style.top = '0px', this.isShow = !1)
    }

    moveHandler(t) {
      const e = t.movementX / this.spr.canvas.ratio, s = t.movementY / this.spr.canvas.ratio,
        i = this.parent.selectedDisplayable, n = this.handlerFnArr, r = this.fnMaps;
      n[this.index].forEach(t => {
        r.get(t)(i, e, s)
      }), this.parent.resetResizeHandler(), i.adapter && i.adapter.resize(), this.spr.eventbus.emit('resizeHandlerMove', { displayable: i })
    }

    _fnMaps() {
      const t = new Map;
      return t.set(0, (function (t, e, s) {
        t.height -= s, t.top += s
      })), t.set(1, (function (t, e, s) {
        t.height += s
      })), t.set(2, (function (t, e, s) {
        t.width -= e, t.left += e
      })), t.set(3, (function (t, e, s) {
        t.width += e
      })), t
    }
  }

  let P = null;

  class Spray {
    constructor(t) {
      var e;
      this._running = !1, this.appRoot = h(t), this.root = p(), this.storage = Storage.factory(this), this.painter = Painter.factory(this, this.storage), this.eventbus = Eventbus.factory(), this.adapter = s, this.sceneTransition = SceneTransition.factory(this), this.mode = 'dev', this.extendManage = null, this._needRefresh = !1, this.ticks = [], this.canvas = null, this.width = 0, this.height = 0, this._theme = '', this.conch = (window.Vue || console.warn('Vue不存在，使用spray-conch前，请先加载Vue2.X'), window.conch ? window.conch : (console.log('未检测到spray-conch，请先加载spray-conch组件库文件，否则后续用到的组件将全部无法使用'), null)), this.whale = (e = this, window.SprayWhale ? new window.SprayWhale(e) : (console.log('未检测到spray-Whale，请先加载spray-Whale相关的js文件，否则Spray后续无法使用界面化接数方式，但可以调用Spray的API接数'), null)), this.appRoot.appendChild(this.root), this._initOptions(), this.resize(), this.extendManage = ExtendManage.factory(this), this.functionLayer = FunctionLayer.factory(this), this.eventbus.on('configChange', t => {
        'extendManage' === t.key && (t.value ? this.extendManage || (this.extendManage = ExtendManage.factory(this), this.canvas && this.extendManage.init()) : (this.extendManage && this.extendManage.destroy(), this.extendManage = null)), 'appMode' === t.key && (this.resize(), this.canvas && this.canvas.zoomCanvasToCenter())
      })
    }

    resize() {
      k().appMode ? (this.width = this.appRoot.clientWidth, this.height = this.appRoot.clientHeight) : (document.body.style.overflow = 'hidden', this.width = document.documentElement.clientWidth, this.height = document.documentElement.clientHeight), this.root.style.cssText = `position: relative; width: ${ this.width }px; height: ${ this.height }px; background-color: #f0f2f5; overflow: hidden;`
    }

    setTheme(t) {
      if (!t) throw new Error('参数不是为空：' + t);
      if (!l(t, 'String')) throw new Error('参数不是字符串：' + t);
      const e = { canvas: null, layer: null, layout: null, layoutContainer: null, cell: null };

      function s() {
        const t = Object.values(e);
        t.filter(t => !t).length || (t.filter(t => 'success' === t).length ? console.log('主题更换成功') : console.error('没有主题更改'))
      }

      function i(t) {
        return new Promise((function (e, s) {
          const i = new XMLHttpRequest;
          i.open('GET', t), i.send(), i.onreadystatechange = () => {
            4 === i.readyState && (200 === i.status ? e(i) : s(i))
          }
        }))
      }

      i(`./${ t }/index.json`).then(n => {
        const r = JSON.parse(n.response);
        if (!l(r, 'Object')) return console.error('数据不是对象格式');
        if (r.canvas) {
          const n = `./${ t }/` + r.canvas;
          i(n).then(() => {
            this.canvas.setBackgroundImage(n), e.canvas = 'success'
          }).catch(() => {
            e.canvas = 'fail', console.error('图片加载失败：' + n)
          }).then(() => {
            s()
          })
        } else e.canvas = 'fail';
        if (r.layer) {
          const n = `./${ t }/` + r.layer;
          i(n).then(() => {
            this.getLayers().forEach(t => t.setBackgroundImage(n)), e.layer = 'success'
          }).catch(() => {
            e.layer = 'fail', console.error('图片加载失败：' + n)
          }).then(() => {
            s()
          })
        } else e.layer = 'fail';
        if (r.layout) {
          const n = `./${ t }/` + r.layout;
          i(n).then(() => {
            this.getLayouts().forEach(t => t.setBackgroundImage(n)), e.layout = 'success'
          }).catch(() => {
            e.layout = 'fail', console.error('图片加载失败：' + n)
          }).then(() => {
            s()
          })
        } else e.layout = 'fail';
        if (r.layoutContainer) {
          const n = `./${ t }/` + r.layoutContainer;
          i(n).then(() => {
            this.getLayoutContainers().forEach(t => t.setBackgroundImage(n)), e.layoutContainer = 'success'
          }).catch(() => {
            e.layoutContainer = 'fail', console.error('图片加载失败：' + n)
          }).then(() => {
            s()
          })
        } else e.layoutContainer = 'fail';
        if (r.cell) {
          const n = `./${ t }/` + r.cell;
          i(n).then(() => {
            this.getCells().forEach(t => t.setBackgroundImage(n)), e.cell = 'success'
          }).catch(() => {
            e.cell = 'fail', console.error('图片加载失败：' + n)
          }).then(() => {
            s()
          })
        } else e.cell = 'fail'
      }).catch(() => {
        console.error('主题更换失败 - 接口获取失败')
      })
    }

    _initOptions() {
    }

    setMode(t) {
      t && (this.mode = t)
    }

    setFilter(t, e) {
      this.canvas.setFilter(t, e)
    }

    getMode() {
      return this.mode
    }

    async setOption(t) {
      await this.canvas.destroy(), this.loadFromJSON(t)
    }

    setData(t) {
      if (!t) return void console.log(new Date + ' 接收到的数据格式错误，本次放弃刷新');
      if (!l(t, 'Object')) return void console.log(new Date + ' 接收到的数据格式错误，本次放弃刷新');
      Object.keys(t).forEach(e => {
        const s = this.getElementById(e);
        console.log(e), s && s instanceof Displayable && s.setData(t[e])
      })
    }

    getSize() {
      return this.canvas && this.canvas.getSize()
    }

    getRoot() {
      return this.root
    }

    getJSONObject() {
      if ('play' !== k().canvasMode) return this.storage.toJSON();
      console.log('如果需要获取spray定义文件，请先退出播放模式')
    }

    getJSONString() {
      if ('play' !== k().canvasMode) return JSON.stringify(this.storage.toJSON());
      console.log('如果需要获取spray定义文件，请先退出播放模式')
    }

    play() {
      M('canvasMode', 'play')
    }

    async loadFromJSON(t) {
      await this.storage.fromJSON(t)
    }

    async createCanvas(t) {
      this.canvas && await this.canvas.destroy(), this.canvas = null;
      let e = Canvas.factory(this, t);
      this.canvas = e, this.extendManage && !this.extendManage.inited && this.extendManage.init(), this.functionLayer.init()
    }

    createLayer(t) {
      if (this.canvas && this.canvas instanceof Canvas) return this.canvas.createLayer(t);
      console.warn('创建图层必须在创建画布之后')
    }

    createContainer(t) {
      let e = !1;
      const s = this.storage.selectedElement;
      return s ? s instanceof Layer ? (s.children[0] instanceof Displayable && (e = s.children[0].createContainer(t)), e) : (s && new RegExp('^(FreeContainer|FlexContainer|GridContainer)$').test(s.constructor.name) && s.parent && (e = s.parent.createContainer(t)), e) : (console.warn('请先选中图层才能在图层中创建容器'), e)
    }

    setBackgroundImage(t) {
      this.canvas && this.canvas.setBackgroundImage(t)
    }

    refreshImmediately() {
      this.painter && this.painter.refresh()
    }

    refresh() {
      this.start()
    }

    flush() {
      const t = this.ticks;
      for (const e of t) !e() && t.splice(t.indexOf(e), 1);
      this.refreshImmediately(), this.eventbus.emit('nextTick'), this.ticks.length || this.painter && this.painter.isRuning || this.pause()
    }

    addTick(t) {
      this.ticks.push(t), this.start()
    }

    show() {
      this.canvas && this.canvas.show()
    }

    hidden() {
      this.canvas && this.canvas.hidden()
    }

    async destroy(t = !0) {
      t && (await this.canvas.destroy(), this.destroy(!1)), this.pause(), this.canvas = null, this.storage = null, this.painter = null, this.adapter = null, this.eventbus = null, P = null
    }

    _startLoop() {
      if (this._running) return;
      const t = this;
      t._running = !0, window.requestAnimationFrame((function e() {
        t._running && (window.requestAnimationFrame(e), t.flush())
      }))
    }

    start() {
      this._startLoop()
    }

    pause() {
      this._running = !1
    }
  }

  w(Spray, [class {
    constructor() {
    }

    getElementById(t) {
      return this.storage.getElementById(t)[0]
    }

    getElementByName(t) {
      return this.storage.getElementByName(t)
    }

    getAllElementList() {
      return this.storage.getDisplayableListByClassName()
    }

    getCanvas() {
      return this.canvas
    }

    getLayers() {
      return this.storage.getDisplayableListByClassName('Layer')
    }

    getLayouts() {
      return this.storage.getDisplayableListByClassName('Flex|Free|Grid')
    }

    getLayoutContainers() {
      return this.storage.getDisplayableListByClassName('FlexContainer|FreeContainer|GridContainer')
    }

    getContainers() {
      return this.storage.getDisplayableListByClassName('FlexContainer|FreeContainer|GridContainer')
    }

    getCells() {
      return this.storage.getDisplayableListByClassName('Cell')
    }

    getMouseOverElement() {
      return this.storage.mouseOverElement
    }

    getSelectedElement() {
      return this.storage.selectedElement
    }

    _filteElById(t, e) {
      let s = null;
      return t && l(e, 'Array') && (s = e.filter(e => e.id === t)[0]), s
    }

    _filteByName(t, e) {
      let s = null;
      return t && l(e, 'Array') && (s = e.filter(e => e.name === t)[0]), s
    }
  }]);

  class BaseAdapter {
    constructor(t, e) {
      this.parent = t, this.name = e, this.componentInstance = null, this.opts = null, this.dom = null, this.bizData = null, this._subsParentData = !1, this._dirty = !1, this.initDom(), this.parent.spr.eventbus.on('canvasResizeOnPlayMode', this.resize, this)
    }

    initDom() {
      const t = this.parent.getSize();
      let e = document.createElement('div');
      e.style.width = t.width + 'px', e.style.height = t.height + 'px', this.dom = e
    }

    init(t) {
    }

    setOption(t) {
      this.opts = d(this.opts, t || {})
    }

    update() {
    }

    resize() {
    }

    setData(t) {
    }

    getComponentInstance() {
      return this.componentInstance
    }

    destroy() {
      this.parent.spr.eventbus.off('canvasResizeOnPlayMode', this.resize)
    }

    _componentComplete() {
      this.parent.spr.eventbus.emit('componentComplete', this.parent.id)
    }

    _subsBizData(t) {
      t && t.id === this.parent.id && (this.bizData = t.bizData), this.setData(this.bizData)
    }

    get dirty() {
      return this._dirty
    }

    set dirty(t) {
      l(t, 'Boolean') && (this._dirty = t, t && this.parent.spr && this.parent.spr.refresh())
    }

    get subsParentData() {
      return this._subsParentData
    }

    set subsParentData(t) {
      l(t, 'Boolean') && t !== this.isSubsParentData && (this._subsParentData = t, this.parent.spr.eventbus.off('dataChange', this._subsBizData), t && this.parent.spr.eventbus.on('dataChange', this._subsBizData, this))
    }
  }

  s.registAdapter('BaseAdapter', BaseAdapter);

  class ConchAdapter extends BaseAdapter {
    constructor(t, e) {
      super(t, e)
    }

    static factory(t, e) {
      return new ConchAdapter(t, e)
    }

    init(t) {
      this.opts = d({ prefix: '.' }, t);
      let e = null;
      this.parent && this.parent.spr && (e = this.parent.spr.conch), e[this.name] ? this.parent && !this.componentInstance && this.dom && (this.componentInstance = new e[this.name](this.parent.getRoot(), this.opts)) : console.warn(`组件${ this.name }未检测到，请先到spray-conch中下载对应的组件包`)
    }

    update() {
      this.componentInstance && this.componentInstance.render(), this.parent && this.parent.stopLoading(), this._componentComplete()
    }

    setOption(t) {
      super.setOption(t), this.componentInstance && this.componentInstance.setOption(this.opts), this.dirty = !0
    }

    setData(t) {
      this.componentInstance && this.componentInstance.setData(t)
    }

    resize() {
      this.componentInstance && this.componentInstance.resize()
    }

    destroy() {
      super.destroy(), this.componentInstance && this.componentInstance.destroy(), this.parent = null
    }
  }

  s.registAdapter('ConchAdapter', ConchAdapter);

  class EchartsAdapter extends BaseAdapter {
    constructor(t, e) {
      super(t, e)
    }

    static factory(t, e) {
      return new EchartsAdapter(t, e)
    }

    init(t) {
      this.opts = t;
      let e = window.echarts;
      e ? (this.parent && !this.componentInstance && this.dom && (this.componentInstance = e.init(this.dom)), this.parent.getRoot().appendChild(this.dom)) : console.warn('echarts不存在，请先加载echarts')
    }

    update() {
      this.componentInstance.setOption(this.opts), this.parent && this.parent.stopLoading(), this._componentComplete()
    }

    setOption(t) {
      super.setOption(t), this.dirty = !0
    }

    resize() {
      let t = arguments[0], e = this.parent.spr.height / t.height;
      const s = this.parent.getSize(), i = s.width, n = s.height * e;
      this.dom.style.width = i + 'px', this.dom.style.height = n + 'px', this.componentInstance && this.componentInstance.resize({
        width: i,
        height: n
      })
    }

    destroy() {
      super.destroy(), this.componentInstance && this.componentInstance.dispose(), this.parent = null
    }
  }

  s.registAdapter('EchartsAdapter', EchartsAdapter);

  class ThingJSAdapter extends BaseAdapter {
    constructor(t, e) {
      super(t, e), this.parent.spr.eventbus.on('configChange', this._configChange, this)
    }

    static factory(t, e) {
      return new ThingJSAdapter(t, e)
    }

    init(t) {
      let e = { url: '', el: this.dom };
      this.opts = d(e, t || {});
      const s = window.THING;
      s ? (this.parent && !this.componentInstance && (this.componentInstance = new s.App(this.opts)), this.parent.getRoot().appendChild(this.dom)) : console.warn('ThingJS不存在，请先加载ThingJS的发布包')
    }

    update() {
      this.parent && this.parent.stopLoading(), this._componentComplete()
    }

    resize() {
      if ('matrix' === k().canvasMode) {
        const t = this.parent.getSize();
        this.dom.style.width = t.width + 'px', this.dom.style.height = t.height + 'px'
      }
      'play' === k().canvasMode && (this.dom.style.width = this.parent.spr.width + 'px', this.dom.style.height = this.parent.spr.height + 'px')
    }

    _configChange(t) {
      'canvasMode' === t.key && ('matrix' === t.value && (this.parent.style.pointerEvents = 'none'), 'play' === t.value && (this.parent.style.pointerEvents = 'all'))
    }

    destroy() {
      super.destroy(), this.componentInstance && this.componentInstance.query('*').destroyAll(), this.parent && this.componentInstance && this.parent.getRoot().removeChild(this.componentInstance), this.parent = null
    }
  }

  s.registAdapter('ThingJSAdapter', ThingJSAdapter);
  const H = [];

  function j(t = 1920, e = 1080, s = 2, i = 2) {
    const n = [], r = (e - (100 + 15 * i)) / i, a = (t - 15 * (s + 1)) / s;
    for (let t = 0; t < s; t++) for (let e = 0; e < i; e++) {
      const s = {};
      s.top = 100 + e * r + 15 * e, s.left = 15 * (t + 1) + t * a, s.width = a, s.height = r, s.constraints = g.TOPCENTER, n.push(s)
    }
    return n.push(V(t)), n
  }

  function V(t) {
    return { top: 0, left: 0, width: t, height: 110, constraints: g.TOPCENTER }
  }

  H.push((function (t = 1920, e = 1080) {
    const s = [], i = (e - 180) / 3, n = 380 * i / 300;
    for (let t = 0; t < 3; t++) {
      const e = { style: { backgroundImage: 'static/images/container.png' } };
      e.top = t * i + 15 * t + 100, e.left = 15, e.width = n, e.height = i, e.constraints = g.CENTERLEFT, s.push(e)
    }
    for (let e = 0; e < 3; e++) {
      const r = { style: { backgroundImage: 'static/images/container.png' } };
      r.top = e * i + 15 * e + 100, r.left = t - 15 - n, r.width = n, r.height = i, r.constraints = g.CENTERRIGHT, s.push(r)
    }
    return s.push(V(t)), s
  }), (function (t = 1920, e = 1080) {
    const s = [], i = (e - 145) / 3, n = 380 * i / 300;
    for (let t = 0; t < 3; t++) {
      const e = {};
      e.top = t * i + 15 * t + 100, e.left = 15, e.width = n, e.height = i, e.constraints = g.CENTERLEFT, s.push(e)
    }
    for (let e = 0; e < 3; e++) {
      const r = {};
      r.top = e * i + 15 * e + 100, r.left = t - 15 - n, r.width = n, r.height = i, r.constraints = g.CENTERRIGHT, s.push(r)
    }
    const r = 200 * i / 300,
      a = { top: e - 15 - r, left: 30 + n, width: t - 2 * n - 60, height: r, constraints: g.BOTTOMCENTER };
    return s.push(a), s.push(V(t)), s
  }), (function (t = 1920, e = 1080) {
    const s = [], i = (e - 165) / 2, n = (e - 180) / 3, r = 380 * i / 458;
    for (let t = 0; t < 2; t++) {
      const e = {};
      e.top = t * i + 15 * t + 100, e.left = 15, e.width = r, e.height = i, e.constraints = g.CENTERLEFT, s.push(e)
    }
    for (let e = 0; e < 3; e++) {
      const i = {};
      i.top = e * n + 15 * e + 100, i.left = t - 15 - r, i.width = r, i.height = n, i.constraints = g.CENTERRIGHT, s.push(i)
    }
    return s.push(V(t)), s
  }), (function (t = 1920, e = 1080) {
    const s = [], i = (e - 165) / 2, n = (e - 180) / 3, r = 380 * i / 458;
    for (let e = 0; e < 2; e++) {
      const n = {};
      n.top = e * i + 15 * e + 100, n.left = t - 15 - r, n.width = r, n.height = i, n.constraints = g.CENTERLEFT, s.push(n)
    }
    for (let t = 0; t < 3; t++) {
      const e = {};
      e.top = t * n + 15 * t + 100, e.left = 15, e.width = r, e.height = n, e.constraints = g.CENTERRIGHT, s.push(e)
    }
    return s.push(V(t)), s
  }), (function (t = 3840, e = 1080) {
    const s = [], i = (e - 165) / 2, n = 763 * i / 458;
    for (let t = 0; t < 2; t++) {
      const e = {};
      e.top = t * i + 15 * t + 100, e.left = 15, e.width = n, e.height = i, e.constraints = g.CENTERLEFT, s.push(e)
    }
    for (let e = 0; e < 2; e++) {
      const r = {};
      r.top = e * i + 15 * e + 100, r.left = t - 15 - n, r.width = n, r.height = i, r.constraints = g.CENTERRIGHT, s.push(r)
    }
    return s.push(V(t)), s
  }), (function (t = 1920, e = 1080) {
    const s = [], i = (e - 180) / 3, n = (e - 165) / 2, r = 380 * i / 300, a = 2 * i + 15,
      o = { top: 100, left: 15, width: r, height: a, constraints: g.CENTERLEFT },
      h = { top: 100 + a + 15, left: 15, width: r, height: i, constraints: g.CENTERLEFT };
    for (let e = 0; e < 2; e++) {
      const i = {};
      i.top = e * n + 15 * e + 100, i.left = t - 15 - r, i.width = r, i.height = n, i.constraints = g.CENTERRIGHT, s.push(i)
    }
    return s.push(o), s.push(h), s.push(V(t)), s
  }), (function (t = 1920, e = 1080) {
    const s = [], i = (e - 180) / 3, n = 380 * i / 300, r = 2 * i + 15,
      a = { top: 100, left: 15, width: n, height: r, constraints: g.CENTERLEFT },
      o = { top: 100 + r + 15, left: 15, width: n, height: i, constraints: g.CENTERLEFT },
      h = { top: 100, left: t - 15 - n, width: n, height: e - 100 - 50, constraints: g.CENTERRIGHT };
    return s.push(a), s.push(o), s.push(h), s.push(V(t)), s
  }), (function (t = 1920, e = 1080) {
    const s = [], i = (e - 165) / 2, n = 380 * i / 458;
    for (let e = 0; e < 2; e++) {
      const r = {};
      r.top = e * i + 15 * e + 100, r.left = t - 15 - n, r.width = n, r.height = i, r.constraints = g.CENTERRIGHT, s.push(r)
    }
    const r = { top: 100, left: 15, width: n, height: e - 100 - 50, constraints: g.CENTERLEFT };
    return s.push(r), s.push(V(t)), s
  }), (function (t = 1920, e = 1080) {
    const s = [], i = e - 150, n = 380 * i / 930,
      r = { top: 100, left: 15, width: n, height: i, constraints: g.CENTERLEFT },
      a = { top: 100, left: t - 15 - n, width: n, height: i, constraints: g.CENTERRIGHT };
    return s.push(r), s.push(a), s.push(V(t)), s
  }), (function (t = 1920, e = 1080) {
    return j(t, e, 2, 2)
  }), (function (t = 1920, e = 1080) {
    return j(t, e, 3, 2)
  }), (function (t = 1920, e = 1080) {
    return j(t, e, 3, 3)
  }));

  class FlexContainer extends Displayable {
    constructor(t, e) {
      super(t, e);
      let s = {
        id: null,
        name: null,
        width: null,
        height: null,
        lock: { x: !0, y: !0, width: !1, height: !1 },
        style: { backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }
      };
      'row' === t.style.flexDirection ? s.lock.width = !1 : s.lock.width = !0, 'row' === t.style.flexDirection ? s.lock.height = !0 : s.lock.width = !1, this.typeName = 'Flex布局容器', this.opts = d(s, this._options), this.style.setOption(this.opts.style), this.width = this.opts.width, this.height = this.opts.height, this.opts.sceneAnimator && (this.sceneAnimator.enter = this.opts.sceneAnimator.enter, this.sceneAnimator.leave = this.opts.sceneAnimator.leave), this.initId('container'), this.verifyOpts(), this.dom = null, this.initDom(), this.initAnimator()
    }

    static factory(t, e) {
      return new FlexContainer(t, e)
    }

    verifyOpts() {
      this.opts.width || this.opts.height || this.opts.flex || console.warn('创建容器对象时需要提供width || height || flex作为参数')
    }

    createLayout(t, e) {
      if (!this.children[0] && !this.adapter) return C(t, this, e);
      console.warn('该容器中已经存在布局对象或者组件实例，请先destroy后再创建布局')
    }

    createLandscape(t) {
      return this.createLayout('Landscape', t)
    }

    createPortrait(t) {
      return this.createLayout('Portrait', t)
    }

    toJSON() {
      const t = super.toJSON();
      return t.type = 'FlexContainer', t.option.flex = this.flex, t
    }

    get flex() {
      return this.opts.flex
    }

    set flex(t) {
      this.opts.flex = t, this.dirty = !0
    }
  }

  w(FlexContainer, [ElementQueryAPI]), S('FlexContainer', FlexContainer);

  class Free extends Displayable {
    constructor(t, e) {
      super(t, e);
      this.typeName = 'Free布局', this.opts = d({
        id: null,
        name: null,
        width: 'inherit',
        height: 'inherit',
        lock: { x: !0, y: !0, width: !0, height: !0 },
        style: { position: 'relative' },
        containerList: []
      }, this._options), this.style.setOption(this.opts.style), this.initId('layout'), this.width = this.opts.width, this.height = this.opts.height, this.verifyOpts(), this.initDom(), this.opts.containerList.forEach(t => {
        this.createContainer(t)
      })
    }

    static factory(t, e) {
      return new Free(t, e)
    }

    verifyOpts() {
    }

    createContainer(t) {
      return C('FreeContainer', this, t)
    }

    getContainerByName(t) {
      return this.children.filter(e => e.name === t)[0]
    }

    getContainerById(t) {
      return this.children.filter(e => e.id === t)[0]
    }

    getContainerByIndex(t) {
      return this.children[t]
    }

    getContainerAll() {
      return this.children
    }

    toJSON() {
      const t = super.toJSON();
      return t.type = 'Free', t
    }
  }

  S('Free', Free);

  class Grid extends Displayable {
    constructor(t, e) {
      super(t, e);
      this.typeName = 'Grid布局', this.opts = d({
        id: null,
        name: null,
        width: 'inherit',
        height: 'inherit',
        lock: { x: !0, y: !0, width: !0, height: !0 },
        style: { display: 'grid' },
        gridOpts: { row: 2, column: 3, size: { width: 200, height: 100 } },
        gap: 10
      }, this._options), this.style.setOption(this.opts.style), this.width = this.opts.width, this.height = this.opts.height, this.initId('layout'), this.initDom(), this.createContainers(e, this.row * this.column)
    }

    static factory(t, e) {
      return new Grid(t, e)
    }

    _buildStyle() {
      const t = [];
      return l(this.opts.gridOpts, 'Object') && (t.push({
        name: 'grid-template-rows',
        value: `repeat(${ this.row },${ this.size.height }px)`
      }), t.push({
        name: 'grid-template-columns',
        value: `repeat(${ this.column },${ this.size.width }px)`
      })), l(this.opts.gap, 'Number') && t.push({ name: 'gap', value: this.gap + 'px' }), t
    }

    createContainers(t, e) {
      let s = '';
      if (l(t, 'Object')) for (let i = 0; i < e; i++) s += C('GridContainer', this, t);
      return s
    }

    set row(t) {
      l(t, 'Number') ? (this.opts.gridOpts.row = t, this.children.forEach(t => {
        t.destroy()
      }), this.createContainers(this, this.row * this.column), this.dirty = !0) : console.warn('元素行数必须是数值型')
    }

    get row() {
      return this.opts.gridOpts.row
    }

    set column(t) {
      l(t, 'Number') ? (this.opts.gridOpts.column = t, this.children.forEach(t => {
        t.destroy()
      }), this.createContainers(this, this.row * this.column), this.dirty = !0) : console.warn('元素列数必须是数值型')
    }

    get column() {
      return this.opts.gridOpts.column
    }

    set size(t) {
      l(t, 'Object') ? l(t.width, 'Number') && l(t.height, 'Number') ? (this.opts.gridOpts.size.width = t.width, this.opts.gridOpts.size.height = t.height, this.dirty = !0) : console.warn('请填写正确的数值') : console.warn('元素行高列宽必须是数组型')
    }

    get size() {
      return this.opts.gridOpts.size
    }

    set gap(t) {
      l(t, 'Number') || console.warn('元素间距必须是数值型'), this.opts.gap = t, this.dirty = !0
    }

    get gap() {
      return this.opts.gap
    }
  }

  S('Grid', Grid);

  class GridContainer extends Displayable {
    constructor(t, e) {
      super(t, e);
      this.typeName = 'Grid布局容器', this.opts = d({
        id: null,
        name: null,
        lock: { x: !0, y: !0, width: !0, height: !0 },
        gridOpts: { row: 3, column: 3, size: [{ width: 200, height: 100 }] },
        style: { background: '#f68f26' }
      }, this._options), this.style.setOption(this.opts.style), this.initId('gridContainer'), this.dom = null, this.initDom()
    }

    static factory(t, e) {
      return new GridContainer(t, e)
    }

    _buildStyle() {
      return []
    }
  }

  S('GridContainer', GridContainer);

  class Landscape {
    constructor(t, e) {
      this.parent = t;
      this.opts = c({
        name: null,
        column: 3,
        justify: 'space-between',
        width: [400, null, 400],
        height: ['inherit', 'inherit', 'inherit'],
        bgImage: [null, null, null],
        flex: ['0 0 auto', '1 1 auto', '0 0 auto']
      }, e), this.verifyOpts(), this.layoutInstance = null, this.containers = [], this.init()
    }

    static factory(t, e) {
      return new Landscape(t, e)
    }

    init() {
      if (!(this.parent instanceof Layer || this.parent instanceof FlexContainer)) return;
      const t = this.opts.name || u('flex'), e = u('flex'),
        s = { id: e, name: t, style: { justifyContent: this.opts.justify || 'space-between', flexDirection: 'row' } };
      this.layoutInstance = C('Flex', this.parent, s);
      for (let s = 0; s < this.opts.column; s++) {
        const i = {
          id: `${ e }-${ s }`,
          name: `${ t }-${ s }`,
          width: this.opts.width[s],
          height: this.opts.height[s],
          style: { backgroundImage: this.opts.backgroundImage[s], flex: this.opts.flex[s] }
        };
        this.layoutInstance.createContaniner(i)
      }
      this.containers = this.layoutInstance.children
    }

    verifyOpts() {
      this.opts.column || (this.opts.column = 1), l(this.opts.width, 'Array') || (this.opts.width = []), l(this.opts.height, 'Array') || (this.opts.height = []);
      for (let t = 0; t < this.opts.column; t++) this.opts.width[t] ? this.opts.flex[t] = '0 0 auto' : (this.opts.width[t] = null, l(this.opts.flex[t], 'Number') || (this.opts.flex[t] = '1 1 auto')), l(this.opts.height[t], 'Number') || (this.opts.height[t] = 'inherit');
      l(this.opts.backgroundImage, 'Array') || (this.opts.backgroundImage = [])
    }

    setWidthByIndex(t, e) {
      const s = this.containers[t];
      s && (e ? (this.opts.width[t] = e, this.opts.flex[t] = null) : (this.opts.width[t] = null, this.opts.flex[t] = 1), s.width = e, s.style.flex = this.opts.flex[t])
    }

    setHeightByIndex(t, e) {
      const s = this.containers[t];
      s && (l(e, 'Number') || 'inherit' === e) && (this.opts.height[t] = e, s.height = e)
    }

    setBgImageByIndex(t, e) {
      const s = this.containers[t];
      s && (l(e, 'String') ? this.opts.bgImage[t] = e : this.opts.bgImage[t] = null, s.style.backgroundImage = e)
    }

    destroy() {
      this.parent = null, this.layoutInstance.destroy(!1), this.layoutInstance = null, this.containers = null
    }
  }

  S('Landscape', Landscape);

  class Portrait {
    constructor(t, e) {
      this.parent = t;
      this.opts = c({
        name: null,
        row: 3,
        justify: 'center',
        width: [null, null, null],
        height: [400, null, 400],
        backgroundImage: [null, null, null],
        flex: ['0 0 auto', '1 1 auto', '0 0 auto']
      }, e), this.verifyOpts(), this.layoutInstance = null, this.containers = [], this.init()
    }

    static factory(t, e) {
      return new Portrait(t, e)
    }

    init() {
      if (!(this.parent instanceof Layer || this.parent instanceof FlexContainer)) return;
      const t = this.opts.name || u('flex'), e = u('flex'),
        s = { id: e, name: t, style: { justifyContent: this.opts.justify || 'center', flexDirection: 'column' } };
      this.layoutInstance = C('Flex', this.parent, s);
      for (let s = 0; s < this.opts.row; s++) {
        const i = {
          id: `${ e }-${ s }`,
          name: `${ t }-${ s }`,
          width: this.opts.width[s],
          height: this.opts.height[s],
          style: { backgroundImage: this.opts.backgroundImage[s], flex: this.opts.flex[s] }
        };
        this.layoutInstance.createContaniner(i)
      }
      this.containers = this.layoutInstance.children
    }

    verifyOpts() {
      this.opts.row || (this.opts.row = 1), l(this.opts.width, 'Array') || (this.opts.width = []), l(this.opts.height, 'Array') || (this.opts.height = []);
      for (let t = 0; t < this.opts.row; t++) this.opts.width[t] || (this.opts.width[t] = null), this.opts.height[t] ? this.opts.flex[t] = '0 1 auto' : (this.opts.height[t] = null, this.opts.flex[t] = '1 1 auto');
      l(this.opts.backgroundImage, 'Array') || (this.opts.backgroundImage = [])
    }

    setWidthByIndex(t, e) {
      const s = this.containers[t];
      s && (this.opts.width[t] = e || null, s.width = e)
    }

    setHeightByIndex(t, e) {
      const s = this.containers[t];
      s && (e ? (this.opts.height[t] = e, this.opts.flex[t] = !1) : (this.opts.height[t] = null, this.opts.flex[t] = 1), s.height = e, s.style.flex = this.opts.flex[t])
    }

    setBgImageByIndex(t, e) {
      const s = this.containers[t];
      s && (l(e, 'String') ? this.opts.backgroundImage[t] = e : this.opts.backgroundImage[t] = null, s.style.backgroundImage = e)
    }

    destroy() {
      this.parent = null, this.layoutInstance.destroy(!1), this.layoutInstance = null, this.containers = null
    }
  }

  S('Portrait', Portrait);

  class Node {
    constructor(t, e, s) {
      if (this._uid = b('node'), this.dom = null, this.list = [], this.nodeList = [], this.refs = {}, this._eventMap = {
        click: [],
        dblclick: [],
        mouseEnter: [],
        mouseLeave: [],
        mousewheel: [],
        mouseout: [],
        mouseup: [],
        mousedown: [],
        mousemove: [],
        contextmenu: [],
        mouseover: []
      }, this.dom = document.createElement(t), s.length) for (const t of s) l(t, 'Object') && t.dom instanceof HTMLElement ? (this.dom.appendChild(t.dom), this.list = [...this.list, ...t.list || []], this.nodeList = [...this.nodeList, ...t.nodeList || []], this.refs = { ...this.refs, ...t.refs || {} }, this._eventMap.click = [...this._eventMap.click, ...t._eventMap.click || []], this._eventMap.mouseEnter = [...this._eventMap.mouseEnter, ...t._eventMap.mouseEnter || []], this._eventMap.mouseLeave = [...this._eventMap.mouseLeave, ...t._eventMap.mouseLeave || []]) : l(t, 'Array') ? t.forEach(t => {
        this.dom.appendChild(t.dom), this.list = [...this.list, ...t.list || []], this.nodeList = [...this.nodeList, ...t.nodeList || []], this.refs = { ...this.refs, ...t.refs || {} }, this._eventMap.click = [...this._eventMap.click, ...t._eventMap.click || []], this._eventMap.mouseEnter = [...this._eventMap.mouseEnter, ...t._eventMap.mouseEnter || []], this._eventMap.mouseLeave = [...this._eventMap.mouseLeave, ...t._eventMap.mouseLeave || []]
      }) : this.dom.innerText = t;
      if (e) {
        if (e.style && (this.dom.style.cssText = e.style), e.ref && (this.refs[e.ref] = this.dom), e.click) {
          const t = e.click, s = e => {
            t(e)
          };
          this._eventMap.click.push({ dom: this.dom, event: s }), this.dom.addEventListener('click', s), delete e.click
        }
        if (e.mouseEnter) {
          const t = e.mouseEnter, s = e => {
            t(e)
          };
          this._eventMap.mouseEnter.push({
            dom: this.dom,
            event: s
          }), this.dom.addEventListener('mouseenter', s), delete e.mouseEnter
        }
        if (e.mouseLeave) {
          const t = e.mouseLeave, s = e => {
            t(e)
          };
          this._eventMap.mouseLeave.push({
            dom: this.dom,
            event: s
          }), this.dom.addEventListener('mouseleave', s), delete e.mouseLeave
        }
        delete e.style, delete e.ref, Object.keys(e).forEach(t => {
          this.dom.setAttribute(t, e[t])
        })
      }
      this.list.push(this.dom), this.nodeList.push(this)
    }

    static factory(t, e, s) {
      return new Node(t, e, s)
    }

    destroy() {
      return Object.keys(this._eventMap).forEach(t => {
        this._eventMap[t].forEach(e => {
          e.dom.removeEventListener(t.toLowerCase(), e.event)
        })
      }), this.dom = null, this.list = null, this.nodeList = null, this.refs = null, this._eventMap = null, !0
    }
  }

  let G = Eventbus.factory(), J = {
    Canvas: Canvas,
    Layer: Layer,
    Flex: Flex,
    FlexContainer: FlexContainer,
    Free: Free,
    FreeContainer: FreeContainer,
    Grid: Grid,
    GridContainer: GridContainer
  }, W = { Landscape: Landscape, Portrait: Portrait };
  t.BaseAdapter = BaseAdapter, t.ConchAdapter = ConchAdapter, t.EchartsAdapter = EchartsAdapter, t.Element = J, t.Layout = W, t.Spray = Spray, t.ThingJSAdapter = ThingJSAdapter, t.adapter = s, t.config = I, t.createElement = (...t) => {
    const [e, s, ...i] = t;
    return Node.factory(e, s, i)
  }, t.destroy = function (t) {
    t && t.destroy && t.destroy()
  }, t.eventbus = G, t.getInstance = function () {
    return P
  }, t.init = function (t, e) {
    if (arguments.length < 1) return void console.warn('初始化spray至少需要传入一个DOM节点作为参数');
    const s = new Spray(t);
    return P = s, s.createCanvas(e || {}), s
  }, t.initFromJSON = function (t, e) {
    if (arguments.length < 2) return void console.warn('从定义文件创建画布至少有根DOM和definition两个参数');
    const s = new Spray(t);
    return P = s, s.loadFromJSON(e), s
  }, t.register = x, t.tool = A, t.useTemplate = function (t, e) {
    if (!e || 'Spray' !== e.constructor.name) return;
    if (!H[t]) return;
    const s = e.canvas.width, i = e.canvas.height, n = H[t](s, i), r = e.createLayer().createLayout('Free');
    return n.forEach(t => {
      r.createContainer(t)
    }), !0
  }, t.version = '0.1', Object.defineProperty(t, '__esModule', { value: !0 })
}));
