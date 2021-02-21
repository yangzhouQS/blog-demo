var BadJs = function() {
	"use strict";
	Array.prototype.includes || (Array.prototype.includes = function(t, r) {
			if (null == this)
				throw new TypeError('"this" is null or not defined');
			var n = Object(this)
				, e = n.length >>> 0;
			if (0 == e)
				return !1;
			var o, i, a = 0 | r, c = Math.max(0 <= a ? a : e - Math.abs(a), 0);
			for (; c < e; ) {
				if ((o = n[c]) === (i = t) || "number" == typeof o && "number" == typeof i && isNaN(o) && isNaN(i))
					return !0;
				c++
			}
			return !1
		}
	),
	Object.defineProperty || (Object.defineProperty = function(t, r, n) {
			t[r] = n.value
		}
	),
	"function" != typeof Object.assign && (Object.assign = function(t, r) {
			var n = arguments;
			if (null == t)
				throw new TypeError("Cannot convert undefined or null to object");
			for (var e = Object(t), o = 1; o < arguments.length; o++) {
				var i = n[o];
				if (null != i)
					for (var a in i)
						Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a])
			}
			return e
		}
	);
	function f(t) {
		return "function" == typeof t
	}
	function E(t) {
		return void 0 === t
	}
	function n(t, r, n) {
		window.addEventListener ? t.addEventListener(r, n, !0) : window.attachEvent && t.attachEvent("on" + r, n)
	}
	function s(t) {
		if ("string" == typeof t)
			return t;
		var o = [];
		return function t(r) {
			for (var n in r)
				if (r.hasOwnProperty(n)) {
					var e = r[n];
					if ("function" == typeof e || void 0 === e)
						return;
					"[object Object]" === Object.prototype.toString.call(e) ? t(e) : o.push(encodeURIComponent(n) + "=" + encodeURIComponent(e))
				}
		}(t),
			o.join("&")
	}
	function e(t, r) {
		this.reportInstance = r,
			this.errorArr = [],
			this.error(t)
	}
	e.getIntance = function(t, r) {
		return e.instance || (e.instance = new e(t,r)),
			e.instance
	}
		,
		e.prototype.error = function(c) {
			var s = this;
			n(c, "error", function(t) {
				if (t = t || window.event) {
					var r = t.target || t.srcElement
						, n = !1;
					if (6 !== a() && 7 !== a() && (n = r instanceof HTMLScriptElement || r instanceof HTMLLinkElement,
					r instanceof HTMLImageElement || r instanceof HTMLVideoElement || r instanceof HTMLAudioElement))
						return !1;
					var e, o = {}, i = s.reportInstance;
					n ? (e = r.src || r.href,
						o.title = "resource" + r,
						o.msg = e,
						o.from = location.href) : (o.title = t.message,
						o.msg = t.error && t.error.stack || t.source + ":" + t.message,
						o.from = location.href,
						o.lineno = t.lineno,
						o.colno = t.colno),
					c.ERROE_POLL.includes(o.title) || (c.ERROE_POLL.push(o.title),
					i.report && f(i.report) && (n ? i.reportResource(o) : i.report(o)))
				}
				function a() {
					var t = navigator.userAgent
						, r = -1 < t.indexOf("compatible") && -1 < t.indexOf("MSIE")
						, n = -1 < t.indexOf("Edge") && !r
						, e = -1 < t.indexOf("Trident") && -1 < t.indexOf("rv:11.0");
					if (r) {
						new RegExp("MSIE (\\d+\\.\\d+);").test(t);
						var o = parseFloat(RegExp.$1);
						return 7 == +o ? 7 : 8 == +o ? 8 : 9 == +o ? 9 : 10 == +o ? 10 : 6
					}
					return n ? "edge" : e ? 11 : -1
				}
			})
		}
	;
	function o(t, r) {
		this.reject(t, r)
	}
	o.getIntance = function(t, r) {
		return o.instance || (o.instance = new o(t,r)),
			o.instance
	}
		,
		o.prototype.reject = function(e, t) {
			var o = t;
			n(e, "unhandledrejection", function(t) {
				var r, n = {};
				t && (r = "object" == typeof t.reason ? JSON.stringify(t.reason) : t.reason,
					n.title = "unhandledrejection:" + r,
					n.from = location.href,
					n.msg = r,
				e.ERROE_POLL.includes(n.title) || (e.ERROE_POLL.push(n.title),
				o.report && f(o.report) && o.report(n)))
			})
		}
	;
	function i(t, r, n) {
		this.report = r,
			this.globalVariable = t,
			this.error(n)
	}
	i.getIntance = function(t, r, n) {
		return i.instance || (i.instance = new i(t,r,n)),
			i.instance
	}
		,
		i.prototype.error = function(t) {
			var r = this;
			t ? this.errorHandler(t) : n(this.globalVariable, "load", function() {
				var t = r.globalVariable.Vue;
				t && t.config && r.errorHandler(t)
			})
		}
		,
		i.prototype.errorHandler = function(t) {
			var i = this;
			t.config.errorHandler = function(t, r, n) {
				var e, o;
				i.globalVariable.ERROE_POLL.includes(t) || (i.globalVariable.ERROE_POLL.push(t),
					(e = {}).title = t,
					e.msg = n,
					e.from = location.href,
				(o = i.report).report && f(o.report) && o.report(e))
			}
		}
	;
	function a(t) {
		this.conf = t || {}
	}
	a.getIntance = function(t) {
		return a.instance || (a.instance = new a(t)),
			a.instance
	}
		,
		a.prototype.report = function(r) {
			void 0 === r && (r = {});
			var n = "";
			if (this.conf && this.conf.downgrade && this.conf.downgrade.error) {
				var t = this.conf.downgrade.error;
				for (var e in t)
					t[e].forEach(function(t) {
						r.msg.match(t) && (n = "_" + e)
					})
			}
			var o = this.mergeCommonConf("_js_error" + n)
				, i = s(Object.assign(o, r))
				, a = "" + this.conf.host + this.conf.path + "?" + i
				, c = new Image;
			c.onload = c.onerror = function() {
				c = null
			}
				,
				c.src = a
		}
		,
		a.prototype.reportResource = function(r) {
			var n = "";
			if (this.conf && this.conf.downgrade && this.conf.downgrade.resource) {
				var t = this.conf.downgrade.resource;
				for (var e in t)
					t[e].forEach(function(t) {
						r.msg.match(t) && (n = "_" + e)
					})
			}
			var o = this.mergeCommonConf("_js_error_resource" + n)
				, i = s(Object.assign(o, r))
				, a = "" + this.conf.host + this.conf.path + "?" + i
				, c = new Image;
			c.onload = c.onerror = function() {
				c = null
			}
				,
				c.src = a
		}
		,
		a.prototype.reportCustom = function(t, r) {
			if (!t)
				throw new Error("[reportCustom] need a name as the first parameter.");
			var n = this.mergeCommonConf("_custom_report_" + t)
				, e = s(Object.assign(n, {
				title: t + ":自定义上报\b.",
				msg: t,
				from: location.href
			}, r))
				, o = "" + this.conf.host + this.conf.path + "?" + e
				, i = new Image;
			i.onload = i.onerror = function() {
				i = null
			}
				,
				i.src = o
		}
		,
		a.prototype.mergeCommonConf = function(t) {
			void 0 === t && (t = "");
			var r, n, e, o, i, a, c, s, f, p, u, h = this.conf, l = h.namespace, g = h.type, d = h.clienttype, m = h.productId, v = h.rules, y = {};
			return g ? y.type = g + t : (r = "",
				n = v.path,
				e = v.hash,
				o = window.location.pathname,
				"boolean" == typeof n ? ((i = o.split("/")).shift(),
					r = i.join("_")) : "object" == typeof n && n && ((a = o.match(n)[0].split("/")).shift(),
					r += a.join("_")),
				e && 0 < location.hash.length ? "boolean" == typeof e ? (s = ((c = window.location.hash) ? c.substring(1).split("/") : []).join("_"),
					y.type = r + s + t) : "object" == typeof e && (p = (f = window.location.hash.match(e)) && 0 < f.length ? f[0].split("/") : [],
					y.type = r + p.join("_") + t) : y.type = r + t),
			l && (u = l + "_" + y.type,
				y.type = u),
				y.productId = m,
				y.clienttype = d,
				y.navigator = E(navigator) ? null : navigator.userAgent,
				y
		}
		,
		window.ERROE_POLL = [];
	function t(t) {
		this.config = this.mergeConf(t),
			this.report = this.report(this.config),
			this.jsError(),
			this.promiseError()
	}
	return t.getIntance = function() {
		return t.instance || (t.instance = new t({})),
			t.instance
	}
		,
		t.prototype.mergeConf = function(t) {
			t = E(t) ? {} : t;
			var r = {
				host: "http://pan.baidu.com",
				path: "/bpapi/analytics",
				namespace: "",
				productId: "",
				type: "",
				rules: {
					path: !0,
					hash: !0
				},
				clienttype: 0,
				vueError: !0,
				jsError: !0,
				promiseError: !0,
				env: window,
				report: a.getIntance
			};
			if (!t.report || f(t.report))
				return Object.assign(r, t);
			console.error("report must is function")
		}
		,
		t.prototype.jsError = function() {
			this.config.jsError && e.getIntance(this.config.env, this.report)
		}
		,
		t.prototype.promiseError = function() {
			this.config.promiseError && o.getIntance(this.config.env, this.report)
		}
		,
		t.prototype.vueError = function() {
			this.config.vueError && i.getIntance(this.config.env, this.report)
		}
		,
		t.prototype.vueErrorHandler = function(t) {
			this.config.vueError && i.getIntance(this.config.env, this.report, t)
		}
		,
		t.prototype.report = function(t) {
			return this.config.report(t)
		}
		,
		t.prototype.reportCustom = function(t, r) {
			this.config.report().reportCustom(t, r)
		}
		,
		t
}();
