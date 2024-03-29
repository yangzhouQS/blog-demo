!(function() {
  var e = window.baidu || { version: '1-1-0' };
  (e.object = e.object || {}),
    (e.object.extend = function(e, t) {
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
    }),
    (e.extend = e.object.extend),
    (e.dom = e.dom || {}),
    (e.dom.g = function(e) {
      return 'string' == typeof e || e instanceof String ? document.getElementById(e) : e && e.nodeName && (1 == e.nodeType || 9 == e.nodeType) ? e : null;
    }),
    (e.g = e.G = e.dom.g),
    (e.dom.getDocument = function(t) {
      return (t = e.dom.g(t)), 9 == t.nodeType ? t : t.ownerDocument || t.document;
    }),
    (e.dom._styleFixer = e.dom._styleFixer || {}),
    (e.dom._styleFilter = e.dom._styleFilter || []),
    (e.dom._styleFilter.filter = function(t, n, o) {
      for (var i, r = 0, a = e.dom._styleFilter; (i = a[r]); r++) (i = i[o]) && (n = i(t, n));
      return n;
    }),
    (e.string = e.string || {}),
    (e.string.toCamelCase = function(e) {
      return String(e).replace(/[-_]\D/g, function(e) {
        return e.charAt(1).toUpperCase();
      });
    }),
    (e.dom.getStyle = function(t, n) {
      var o = e.dom;
      (t = o.g(t)), (n = e.string.toCamelCase(n));
      var i = t.style[n];
      if (i) return i;
      var r = o._styleFixer[n],
        a = t.currentStyle || (e.browser.ie ? t.style : getComputedStyle(t, null));
      return (i = 'object' == typeof r && r.get ? r.get(t, a) : a[r || n]), (r = o._styleFilter) && (i = r.filter(n, i, 'get')), i;
    }),
    (e.getStyle = e.dom.getStyle),
    (e.browser = e.browser || {}),
    /msie (\d+\.\d)/i.test(navigator.userAgent) && (e.ie = e.browser.ie = parseFloat(RegExp.$1)),
    /opera\/(\d+\.\d)/i.test(navigator.userAgent) && (e.browser.opera = parseFloat(RegExp.$1)),
    (e.browser.isWebkit = /webkit/i.test(navigator.userAgent)),
    (e.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent)),
    (e.browser.isStrict = 'CSS1Compat' == document.compatMode),
    (e.dom.getPosition = function(t) {
      var n = e.dom.getDocument(t),
        o = e.browser;
      t = e.dom.g(t);
      var i = o.isGecko > 0 && n.getBoxObjectFor && 'absolute' == e.dom.getStyle(t, 'position') && ('' === t.style.top || '' === t.style.left),
        r = { left: 0, top: 0 },
        a = o.ie && !o.isStrict ? n.body : n.documentElement;
      if (t == a) return r;
      var l,
        s = null;
      if (t.getBoundingClientRect)
        (l = t.getBoundingClientRect()),
          (r.left = Math.floor(l.left) + Math.max(n.documentElement.scrollLeft, n.body.scrollLeft)),
          (r.top = Math.floor(l.top) + Math.max(n.documentElement.scrollTop, n.body.scrollTop)),
          (r.left -= n.documentElement.clientLeft),
          (r.top -= n.documentElement.clientTop),
          o.ie && !o.isStrict && ((r.left -= 2), (r.top -= 2));
      else if (n.getBoxObjectFor && !i) {
        l = n.getBoxObjectFor(t);
        var u = n.getBoxObjectFor(a);
        (r.left = l.screenX - u.screenX), (r.top = l.screenY - u.screenY);
      } else {
        s = t;
        do {
          if (((r.left += s.offsetLeft), (r.top += s.offsetTop), o.isWebkit > 0 && 'fixed' == e.dom.getStyle(s, 'position'))) {
            (r.left += n.body.scrollLeft), (r.top += n.body.scrollTop);
            break;
          }
          s = s.offsetParent;
        } while (s && s != t);
        for ((o.opera > 0 || (o.isWebkit > 0 && 'absolute' == e.dom.getStyle(t, 'position'))) && (r.top -= n.body.offsetTop), s = t.offsetParent; s && s != n.body; )
          (r.left -= s.scrollLeft), (b.opera && 'TR' == s.tagName) || (r.top -= s.scrollTop), (s = s.offsetParent);
      }
      return r;
    }),
    (e.event = e.event || {}),
    (e.event._unload = function() {
      for (var t, n, o = e.event._listeners, i = o.length, r = !!window.removeEventListener; i--; )
        (t = o[i]), (n = t[0]), n.removeEventListener ? n.removeEventListener(t[1], t[3], !1) : n.detachEvent && n.detachEvent('on' + t[1], t[3]);
      r ? window.removeEventListener('unload', e.event._unload, !1) : window.detachEvent('onunload', e.event._unload);
    }),
    window.attachEvent ? window.attachEvent('onunload', e.event._unload) : window.addEventListener('unload', e.event._unload, !1),
    (e.event._listeners = e.event._listeners || []),
    (e.event.on = function(t, n, o) {
      (n = n.replace(/^on/i, '')), 'string' == typeof t && (t = e.dom.g(t));
      var i = function(e) {
          o.call(t, e);
        },
        r = e.event._listeners;
      return (r[r.length] = [t, n, o, i]), t.attachEvent ? t.attachEvent('on' + n, i) : t.addEventListener && t.addEventListener(n, i, !1), t;
    }),
    (e.on = e.event.on),
    (e.event.preventDefault = function(e) {
      e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
    }),
    (e.ui = e.ui || {}),
    (e.suggestion = e.ui.suggestion = e.ui.suggestion || {}),
    (function() {
      var t = {},
        n = function(e) {
          var t = {};
          (e.listen = function(n, o) {
            t[n] = t[n] || [];
            for (var i = 0; i < t[n].length && t[n][i] != o; ) i++;
            return i == t[n].length && t[n].push(o), e;
          }),
            (e.call = function(n) {
              if (t[n]) for (var o = 0; o < t[n].length; o++) t[n][o].apply(this, Array.prototype.slice.call(arguments, 1));
              return e;
            });
        };
      (t.extend = function(e) {
        return new n(e), e;
      }),
        t.extend(t),
        (e.suggestion._Central = t);
    })(),
    (e.ui.suggestion._Div = function(t, n, o, i, r) {
      function a(e, n) {
        if ('none' == _.style.display) return void t.call('need_data', o.getValue());
        var i = s()[0];
        if ((l(), e)) {
          if (0 == i) return c(n), void i--;
          i == -1 && (i = p.length), i--;
        } else {
          if (i == p.length - 1) return c(n), void (i = -1);
          i++;
        }
        d(i), u();
        var a = o.getValue();
        c(i);
        var f = s();
        r.onpick(a, f[0], f[1], f[2]);
      }
      function l() {
        for (var e = 0; e < y.length; e++) y[e].className = h + 'ml';
      }
      function s() {
        if (y && 'none' != _.style.display) for (var e = 0; e < y.length; e++) if (y[e].className == h + 'mo') return [e, p[e], m[e]];
        return [-1, ''];
      }
      function u() {
        var e = s();
        r.onhighlight(o.getValue(), e[0], e[1], e[2]);
      }
      function d(e) {
        l(), (y[e].className = h + 'mo');
      }
      function c(e) {
        var n = p && 'number' == typeof e && 'undefined' != typeof p[e] ? p[e] : e;
        t.call('pick_word', n);
      }
      function f() {
        return 'none' == _.style.display ? null : ((w.style.display = _.style.display = 'none'), void r.onhide());
      }
      function g(e) {
        var n = e;
        return function() {
          t.call('confirm_item', o.getValue(), p[n], n, m[n]);
          var e = o.getValue();
          c(p[n]), r.onpick(e, n, p[n], m[n]), r.onconfirm(o.getValue(), n, p[n], m[n]), f();
        };
      }
      var p,
        m,
        v,
        y,
        b = this,
        h = r.class_prefix,
        _ = document.createElement('DIV');
      (_.id = h + new Date().getTime()), (_.className = h + 'wpr'), (_.style.display = 'none');
      var w = document.createElement('IFRAME');
      return (
        (w.className = h + 'sd'),
        (w.style.display = 'none'),
        (w.style.position = 'absolute'),
        (w.style.borderWidth = '0px'),
        r.apd_body ? document.body.appendChild(_) : n.parentNode.appendChild(_),
        _.parentNode.insertBefore(w, _),
        t.listen('start', function() {
          e.on(document, 'mousedown', function(e) {
            e = e || window.event;
            var t = e.target || e.srcElement;
            if (t != n) {
              for (; (t = t.parentNode); ) if (t == _) return;
              f();
            }
          }),
            e.on(window, 'blur', f);
        }),
        t.listen('key_enter', function() {
          var e = s(),
            t = e[0] == -1 ? v : e[1];
          r.onconfirm(o.getValue(), e[0], t, e[2], !0), f();
        }),
        t.listen('key_up', function(e) {
          a(1, e);
        }),
        t.listen('key_down', function(e) {
          a(0, e);
        }),
        t.listen('key_tab', f),
        t.listen('key_esfc', f),
        t.listen('all_clear', f),
        t.listen('data_ready', function(n, o) {
          (v = o), (p = []), (m = []);
          for (var r = 0, a = o.length; r < a; r++) 'undefined' != typeof o[r].input ? ((p[r] = o[r].input), (m[r] = o[r].selection)) : (m[r] = p[r] = o[r]);
          if (0 != p.length) {
            y = i(_, m, b);
            for (var r = 0, a = y.length; r < a; r++)
              e.on(y[r], 'mouseover', function() {
                l(), (this.className = h + 'mo'), u();
              }),
                e.on(y[r], 'mouseout', l),
                e.on(y[r], 'mousedown', function(n) {
                  if ((t.call('mousedown_item'), !e.ie)) return n.stopPropagation(), n.preventDefault(), !1;
                }),
                e.on(y[r], 'click', g(r));
          } else f();
        }),
        {
          element: _,
          shade: w,
          pick: c,
          highlight: d,
          hide: f,
          dispose: function() {
            _.parentNode.removeChild(_);
          },
        }
      );
    }),
    (e.ui.suggestion._Data = function(e, t) {
      var n = {};
      return (
        e.listen('response_data', function(t, o) {
          (n[t] = o), e.call('data_ready', t, o);
        }),
        e.listen('need_data', function(o) {
          'undefined' == typeof n[o] ? t(o) : e.call('data_ready', o, n[o]);
        }),
        {}
      );
    }),
    (e.ui.suggestion._InputWatcher = function(t, n, o) {
      var i,
        r,
        a = 0,
        l = '',
        s = '',
        u = '',
        d = !1,
        c = !1,
        f = !1;
      return (
        n.setAttribute('autocomplete', 'off'),
        e.on(n, 'keydown', function(n) {
          f || (t.call('start'), (f = !0)), (n = n || window.event);
          var o;
          switch (n.keyCode) {
            case 9:
              o = 'tab';
              break;
            case 27:
              o = 'esc';
              break;
            case 13:
              o = 'enter';
              break;
            case 38:
              (o = 'up'), e.event.preventDefault(n);
              break;
            case 40:
              o = 'down';
          }
          o && t.call('key_' + o, s);
        }),
        e.on(n, 'beforedeactivate', function() {
          d && ((window.event.cancelBubble = !0), (window.event.returnValue = !1));
        }),
        t.listen('start', function() {
          (u = n.value),
            (a = setInterval(function() {
              if (!c) {
                null == e.G(n) && suggestion.dispose();
                var o = n.value;
                o == l && '' != o && o != u && o != r
                  ? 0 == i &&
                    (i = setTimeout(function() {
                      t.call('need_data', o);
                    }, 100))
                  : (clearTimeout(i), (i = 0), '' == o && '' != l && ((r = ''), t.call('all_clear')), (l = o), o != r && (s = o), u != n.value && (u = ''));
              }
            }, 10));
        }),
        t.listen('pick_word', function(e) {
          if (d)
            try {
              n.blur();
            } catch (t) {
              setTimeout(function() {
                n.blur();
              }, 600);
            }
          (n.value = r = e), d && n.focus();
        }),
        t.listen('mousedown_item', function(e) {
          (d = !0),
            (c = !0),
            setTimeout(function() {
              (c = !1), (d = !1);
            }, 500);
        }),
        t.listen('confirm_item', function(e, t, n, o) {
          (c = !1), (s = l = n);
        }),
        {
          getValue: function() {
            return n.value;
          },
          dispose: function() {
            clearInterval(a);
          },
        }
      );
    }),
    (e.ui.suggestion._Suggestion = function(t, n) {
      var o = this;
      e.ui.suggestion._MessageDispatcher;
      if (
        ((o.options = {
          onpick: function() {},
          onconfirm: function() {},
          onhighlight: function() {},
          onhide: function() {},
          view: null,
          getData: !1,
          prepend_html: '',
          append_html: '',
          class_prefix: 'tangram_sug_',
          apd_body: !1,
        }),
        e.extend(o.options, n),
        !(t = e.G(t)))
      )
        return null;
      (o.inputElement = t),
        t.id ? (o.options._inputId = t.id) : (t.id = o.options._inputId = o.options.class_prefix + 'ipt' + new Date().getTime()),
        (o._adjustPos = function(n) {
          var i = a.element,
            r = a.shade,
            l = document,
            s = 'BackCompat' == l.compatMode ? l.body : l.documentElement,
            u = s.clientHeight,
            d = s.clientWidth;
          if ('none' != i.style.display || !n) {
            var c = e.dom.getPosition(t),
              f = [c.top + t.offsetHeight - 1, c.left, t.parentNode ? t.parentNode.offsetWidth : t.offsetWidth];
            (f = 'function' == typeof o.options.view ? o.options.view(f) : f),
              (i.style.display = r.style.display = 'block'),
              (r.style.top = f[0] + 'px'),
              (r.style.left = f[1] + 'px'),
              (r.style.width = f[2] + 'px');
            var g = parseFloat(e.getStyle(i, 'marginTop')) || 0,
              p = parseFloat(e.getStyle(i, 'marginLeft')) || 0;
            if (((i.style.top = f[0] - g + 'px'), (i.style.left = f[1] - p + 'px'), e.ie && 'BackCompat' == document.compatMode)) i.style.width = f[2] + 'px';
            else {
              var m = parseFloat(e.getStyle(i, 'borderLeftWidth')) || 0,
                v = parseFloat(e.getStyle(i, 'borderRightWidth')) || 0,
                y = parseFloat(e.getStyle(i, 'marginRight')) || 0;
              i.style.width = f[2] - m - v - p - y + 'px';
            }
            (r.style.height = i.offsetHeight + 'px'), (u == s.clientHeight && d == s.clientWidth) || o._adjustPos();
          }
        }),
        (o._draw = function(e, t) {
          var n = [],
            i = document.createElement('TABLE');
          (i.cellPadding = 2), (i.cellSpacing = 0);
          var r = document.createElement('TBODY');
          i.appendChild(r);
          for (var a = 0, l = t.length; a < l; a++) {
            var s = r.insertRow(-1);
            n.push(s);
            var u = s.insertCell(-1);
            u.innerHTML = t[a];
          }
          var d = document.createElement('DIV');
          (d.className = o.options.class_prefix + 'pre'), (d.innerHTML = o.options.prepend_html);
          var c = document.createElement('DIV');
          return (
            (c.className = o.options.class_prefix + 'app'),
            (c.innerHTML = o.options.append_html),
            (e.innerHTML = ''),
            e.appendChild(d),
            e.appendChild(i),
            e.appendChild(c),
            o._adjustPos(),
            n
          );
        });
      var i = e.suggestion._Central.extend(o),
        r = (new e.ui.suggestion._Data(i, o.options.getData), new e.ui.suggestion._InputWatcher(i, t, a)),
        a = new e.ui.suggestion._Div(i, t, r, o._draw, o.options);
      return (
        i.listen('start', function() {
          setInterval(function() {
            var e = a.element;
            0 != e.offsetWidth && t.offsetWidth != e.offsetWidth && o._adjustPos();
          }, 100),
            e.on(window, 'resize', function() {
              o._adjustPos(!0);
            });
        }),
        {
          pick: a.pick,
          hide: a.hide,
          highlight: a.highlight,
          getElement: function() {
            return a.element;
          },
          getData: o.options.getData,
          giveData: function(e, t) {
            i.call('response_data', e, t);
          },
          dispose: function() {
            a.dispose(), r.dispose();
          },
        }
      );
    }),
    (e.ui.suggestion.create = function(t, n) {
      return new e.ui.suggestion._Suggestion(t, n);
    }),
    (window.baidu = e);
})();
var BaiduSuggestion = (function() {
  function e(e) {
    return document.createElement(e);
  }
  function t(e, t, a, d) {
    if (e) {
      if ((('string' == typeof e || e instanceof String) && (e = baidu.G(e)), e.sugId || (e.sugId = new Date().getTime()), s['sug' + e.sugId])) return !1;
      if (null == t) var t = [];
      else {
        d = t.sugSubmit;
        var c = t.fontColor ? t.fontColor : '#000',
          f = t.fontSize ? t.fontSize : '14px',
          g = t.fontFamily ? t.fontFamily : 'verdana',
          p = t.bgcolorHI ? t.bgcolorHI : '#36c',
          m = t.fontColorHI ? t.fontColorHI : '#FFF',
          v = t.borderColor ? t.borderColor : '#817f82';
        i('.bdSug_wpr', 'border:1px solid ' + v + ';position:absolute;z-index:99999;top:28px;left:0;color:' + c),
          i('.bdSug_wpr td', 'font-size:' + f + ';font-family:' + g),
          i('.bdSug_mo', 'background-color:' + p + ';color:' + m);
      }
      if ('relative' == r(document.body, 'position') || 'absolute' == r(document.body, 'position')) {
        var y = o(document.body);
        (t.XOffset = (t.XOffset ? parseInt(t.XOffset) : 0) + y.x), (t.YOffset = (t.YOffset ? parseInt(t.YOffset) : 0) + y.y);
      }
      (s['sug' + e.sugId] = baidu.suggestion.create(e, u.createSugOptions(e.sugId, t, a, d ? n(e) : null))), (l['give' + e.sugId] = u.createSugCallback(e.sugId));
    }
  }
  function n(e) {
    for (var t = e; t != document.body && 'FORM' != t.tagName; ) t = t.parentNode;
    return 'FORM' == t.tagName ? t : null;
  }
  function o(e) {
    var t = document,
      n = 0,
      o = 0;
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      (n = i.left + Math.max(t.documentElement.scrollLeft, t.body.scrollLeft)),
        (o = i.top + Math.max(t.documentElement.scrollTop, t.body.scrollTop)),
        (n -= t.documentElement.clientLeft),
        (o -= t.documentElement.clientTop);
    } else for (; (e = e.offsetParent); ) (n += e.offsetLeft), (o += e.offsetTop);
    return { x: n, y: o };
  }
  function i(e, t) {
    var n = document.styleSheets,
      o = document.createElement('STYLE');
    o.type = 'text/css';
    var i = document.getElementsByTagName('HEAD')[0];
    i.appendChild(o), (n = document.styleSheets);
    for (var r = 0; r < n.length; r++)
      if (!n[r].href) {
        n = n[r];
        break;
      }
    baidu.ie ? n.addRule(e, t) : n.insertRule(e + ' { ' + t + ' }', n.cssRules.length);
  }
  function r(e, t, n) {
    if (e)
      if (void 0 != n) e.style[t] = n;
      else {
        if (e.style[t]) return e.style[t];
        if (e.currentStyle) return e.currentStyle[t];
        if (document.defaultView && document.defaultView.getComputedStyle) {
          t = t.replace(/([A-Z])/g, '-$1').toLowerCase();
          var o = document.defaultView.getComputedStyle(e, '');
          return (o && o.getPropertyValue(t)) || '';
        }
      }
  }
  function a() {
    i('.bdSug_wpr', 'line-height:normal;background:#FFF;padding:0;margin:0;border:1px solid #817F82;position:absolute;z-index:99999;'),
      i('.bdSug_wpr table', 'padding:0;width:100%;background:#fff;cursor:default;'),
      i('.bdSug_wpr tr', 'padding:0;margin:0;height:30px;line-height:30px'),
      i('.bdSug_wpr td', 'padding:2px;margin:0;text-align:left;vertical-align:middle;font:14px ;font-weight:normal;text-decoration:none;text-indent:0'),
      i('.bdSug_mo', 'background:#36c;color:#fff'),
      i('.bdSug_app', 'padding:0;margin:0;background:#fff'),
      i('.bdSug_pre', 'padding:0;margin:0'),
      i('.bdsug_copy', 'margin:0;background:transparent url(https://www.baidu.com/img/bd.gif) no-repeat;font-size:13px;color:#77c;text-decoration:none;padding:0 2px 0 16px;');
  }
  var l = {},
    s = {},
    u = {
      createSugOptions: function(t, n, o, i) {
        return {
          class_prefix: 'bdSug_',
          onconfirm: function(e, t, n, r, a) {
            if (o && t > -1)
              try {
                o.apply(window, [n]);
              } catch (l) {}
            i && !a && i.submit();
          },
          view: function(e) {
            return n && n.XOffset && n.YOffset ? [e[0] - n.YOffset, e[1] - n.XOffset, e[2]] : [e[0], e[1], e[2]];
          },
          getData: function(n) {
            var o = new Date().getTime(),
              i = baidu.G('bdSug_script');
            i && document.body.removeChild(i);
            var r = e('script');
            r.setAttribute('charset', 'gbk'),
              (r.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + encodeURIComponent(n) + '&p=3&cb=BaiduSuggestion.callbacks.give' + t + '&t=' + o),
              (r.id = 'bdSug_script'),
              document.body.appendChild(r);
          },
          append_html:
            "<div style='background:#FFF;line-height:normal;border:0;text-align:right;margin:0;padding:0;'><a class='bdsug_copy' href='https://help.baidu.com/' ltarget='_blank' >百度搜索框提示</a></div>",
          apd_body: !0,
        };
      },
      createSugCallback: function(e) {
        return function(t) {
          if (t) {
            for (var n = [], o = 0; o < t.s.length; o++) {
              var i = {};
              (i.input = t.s[o]), (i.selection = t.s[o]), n.push(i);
            }
            s['sug' + e].giveData(t.q, n);
          }
        };
      },
    };
  a();
  for (var d = document.body.getElementsByTagName('INPUT'), c = 0, f = d.length; c < f; c++) {
    var g = d[c];
    if (g && ('text' == g.type || 'search' == g.type) && (1 == g.getAttribute('baiduSug') || 2 == g.getAttribute('baiduSug'))) {
      g.sugId = c;
      var p = 1 == g.getAttribute('baiduSug');
      t(g, null, null, p);
    }
  }
  return { bind: t, callbacks: l };
})();
