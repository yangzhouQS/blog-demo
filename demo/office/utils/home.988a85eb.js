(function(e) {
		function t(t) {
			for (var n, o, s = t[0], c = t[1], l = t[2], d = 0, u = []; d < s.length; d++)
				o = s[d],
				Object.prototype.hasOwnProperty.call(a, o) && a[o] && u.push(a[o][0]),
					a[o] = 0;
			for (n in c)
				Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
			p && p(t);
			while (u.length)
				u.shift()();
			return r.push.apply(r, l || []),
				i()
		}
		function i() {
			for (var e, t = 0; t < r.length; t++) {
				for (var i = r[t], n = !0, o = 1; o < i.length; o++) {
					var s = i[o];
					0 !== a[s] && (n = !1)
				}
				n && (r.splice(t--, 1),
					e = c(c.s = i[0]))
			}
			return e
		}
		var n = {}
			, o = {
			home: 0
		}
			, a = {
			home: 0
		}
			, r = [];
		function s(e) {
			return c.p + "doc-static/doc/js/" + ({
				edit: "edit",
				notfound: "notfound",
				share: "share",
				template: "template"
			}[e] || e) + "." + {
				edit: "66bf8a1d",
				notfound: "6cadee9e",
				share: "1b607648",
				template: "3b967838"
			}[e] + ".js"
		}
		function c(t) {
			if (n[t])
				return n[t].exports;
			var i = n[t] = {
				i: t,
				l: !1,
				exports: {}
			};
			return e[t].call(i.exports, i, i.exports, c),
				i.l = !0,
				i.exports
		}
		c.e = function(e) {
			var t = []
				, i = {
				edit: 1,
				notfound: 1,
				share: 1,
				template: 1
			};
			o[e] ? t.push(o[e]) : 0 !== o[e] && i[e] && t.push(o[e] = new Promise((function(t, i) {
					for (var n = "doc-static/doc/css/" + ({
						edit: "edit",
						notfound: "notfound",
						share: "share",
						template: "template"
					}[e] || e) + "." + {
						edit: "2fa711ad",
						notfound: "34f9539b",
						share: "afdc2081",
						template: "3a8da4ca"
					}[e] + ".css", a = c.p + n, r = document.getElementsByTagName("link"), s = 0; s < r.length; s++) {
						var l = r[s]
							, d = l.getAttribute("data-href") || l.getAttribute("href");
						if ("stylesheet" === l.rel && (d === n || d === a))
							return t()
					}
					var u = document.getElementsByTagName("style");
					for (s = 0; s < u.length; s++) {
						l = u[s],
							d = l.getAttribute("data-href");
						if (d === n || d === a)
							return t()
					}
					var p = document.createElement("link");
					p.rel = "stylesheet",
						p.type = "text/css",
						p.onload = t,
						p.onerror = function(t) {
							var n = t && t.target && t.target.src || a
								, r = new Error("Loading CSS chunk " + e + " failed.\n(" + n + ")");
							r.code = "CSS_CHUNK_LOAD_FAILED",
								r.request = n,
								delete o[e],
								p.parentNode.removeChild(p),
								i(r)
						}
						,
						p.href = a;
					var h = document.getElementsByTagName("head")[0];
					h.appendChild(p)
				}
			)).then((function() {
					o[e] = 0
				}
			)));
			var n = a[e];
			if (0 !== n)
				if (n)
					t.push(n[2]);
				else {
					var r = new Promise((function(t, i) {
							n = a[e] = [t, i]
						}
					));
					t.push(n[2] = r);
					var l, d = document.createElement("script");
					d.charset = "utf-8",
						d.timeout = 120,
					c.nc && d.setAttribute("nonce", c.nc),
						d.src = s(e);
					var u = new Error;
					l = function(t) {
						d.onerror = d.onload = null,
							clearTimeout(p);
						var i = a[e];
						if (0 !== i) {
							if (i) {
								var n = t && ("load" === t.type ? "missing" : t.type)
									, o = t && t.target && t.target.src;
								u.message = "Loading chunk " + e + " failed.\n(" + n + ": " + o + ")",
									u.name = "ChunkLoadError",
									u.type = n,
									u.request = o,
									i[1](u)
							}
							a[e] = void 0
						}
					}
					;
					var p = setTimeout((function() {
							l({
								type: "timeout",
								target: d
							})
						}
					), 12e4);
					d.onerror = d.onload = l,
						document.head.appendChild(d)
				}
			return Promise.all(t)
		}
			,
			c.m = e,
			c.c = n,
			c.d = function(e, t, i) {
				c.o(e, t) || Object.defineProperty(e, t, {
					enumerable: !0,
					get: i
				})
			}
			,
			c.r = function(e) {
				"undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
					value: "Module"
				}),
					Object.defineProperty(e, "__esModule", {
						value: !0
					})
			}
			,
			c.t = function(e, t) {
				if (1 & t && (e = c(e)),
				8 & t)
					return e;
				if (4 & t && "object" === typeof e && e && e.__esModule)
					return e;
				var i = Object.create(null);
				if (c.r(i),
					Object.defineProperty(i, "default", {
						enumerable: !0,
						value: e
					}),
				2 & t && "string" != typeof e)
					for (var n in e)
						c.d(i, n, function(t) {
							return e[t]
						}
							.bind(null, n));
				return i
			}
			,
			c.n = function(e) {
				var t = e && e.__esModule ? function() {
						return e["default"]
					}
					: function() {
						return e
					}
				;
				return c.d(t, "a", t),
					t
			}
			,
			c.o = function(e, t) {
				return Object.prototype.hasOwnProperty.call(e, t)
			}
			,
			c.p = "https://nd-static.bdstatic.com/",
			c.oe = function(e) {
				throw console.error(e),
					e
			}
		;
		var l = window["webpackJsonp"] = window["webpackJsonp"] || []
			, d = l.push.bind(l);
		l.push = t,
			l = l.slice();
		for (var u = 0; u < l.length; u++)
			t(l[u]);
		var p = d;
		r.push([0, "chunk-vendors"]),
			i()
	}
)({
	0: function(e, t, i) {
		e.exports = i("e04b")
	},
	"0132": function(e, t, i) {},
	"019c": function(e, t, i) {},
	"04b5": function(e, t, i) {
		"use strict";
		i("78f4")
	},
	"0571": function(e, t, i) {},
	"0766": function(e, t, i) {
		"use strict";
		i("7caf")
	},
	"07a4": function(e, t, i) {
		"use strict";
		i.d(t, "b", (function() {
				return s
			}
		)),
			i.d(t, "a", (function() {
					return c
				}
			));
		i("73a9"),
			i("7cfa"),
			i("8fbb"),
			i("ec56"),
			i("bf49"),
			i("ba4a"),
			i("061a");
		var n = i("1738")
			, o = i("f272");
		function a(e, t) {
			var i = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var n = Object.getOwnPropertySymbols(e);
				t && (n = n.filter((function(t) {
						return Object.getOwnPropertyDescriptor(e, t).enumerable
					}
				))),
					i.push.apply(i, n)
			}
			return i
		}
		function r(e) {
			for (var t = 1; t < arguments.length; t++) {
				var i = null != arguments[t] ? arguments[t] : {};
				t % 2 ? a(Object(i), !0).forEach((function(t) {
						Object(n["a"])(e, t, i[t])
					}
				)) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : a(Object(i)).forEach((function(t) {
						Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
					}
				))
			}
			return e
		}
		var s = o["default"].observable({
			loginLoading: !0,
			loginInfo: {
				bdstoken: "",
				photo_url: "",
				uk: null,
				uk_str: "",
				username: "",
				vip_identity: ""
			},
			shareInfo: {
				isAuthor: !1,
				pwd: "",
				docLink: "",
				surl: "",
				isExpired: !1,
				shareStatus: 0,
				expiredTime: 0,
				expiredDays: 0,
				shareError: !1,
				docid: "",
				shareType: 2,
				acl: [1, 2],
				authorUk: "",
				shareId: 0,
				isDocuser: 0
			},
			saveHisVersionManuallyStatus: "",
			isShowHistory: !1,
			docuserchannel: null,
			userGuideSURL: "xyMA2DoHxOHwMkbIKkibIQ-205034708239545",
			isUserGuidePage: !1
		})
			, c = {
			setLoginLoading: function(e) {
				s.loginLoading = e
			},
			setLoginInfo: function(e) {
				s.loginInfo = r(r({}, s.loginInfo), e)
			},
			setShareInfo: function(e) {
				s.shareInfo = r(r({}, s.shareInfo), e)
			},
			setSaveHisVersionStatus: function(e) {
				s.saveHisVersionManuallyStatus = e
			},
			setShowHistory: function(e) {
				s.isShowHistory = e
			},
			setDocUserChannel: function(e) {
				s.docuserchannel = e
			},
			setIsUserGuidePage: function(e) {
				s.isUserGuidePage = e
			}
		}
	},
	"095d": function(e, t, i) {
		"use strict";
		i("9063")
	},
	"0b42": function(e, t, i) {},
	1047: function(e, t, i) {
		"use strict";
		i("6156")
	},
	"15b3": function(e, t, i) {},
	1851: function(e, t, i) {},
	"19a1": function(e, t, i) {
		"use strict";
		i.d(t, "b", (function() {
				return c
			}
		)),
			i.d(t, "c", (function() {
					return l
				}
			)),
			i.d(t, "d", (function() {
					return d
				}
			)),
			i.d(t, "a", (function() {
					return u
				}
			));
		var n = i("e487")
			, o = "/api/docol/shareInfo"
			, a = "/api/docol/sharedoc"
			, r = "/api/docol/verify"
			, s = "/api/docol/getdocinfo";
		function c(e) {
			return e = e || {},
				n["a"].instance.get(o, {
					params: e
				})
		}
		function l(e) {
			return e = e || {},
				n["a"].instance.get(a, {
					params: e
				})
		}
		function d(e) {
			return e = e || {},
				n["a"].instance.post(r, {
					params: e
				})
		}
		function u(e) {
			return e = e || {},
				n["a"].instance.get(s, {
					params: e
				})
		}
	},
	"19f1": function(e, t, i) {},
	"1b34": function(e, t, i) {},
	"1d97": function(e, t, i) {
		"use strict";
		i("2f9d")
	},
	"1f92": function(e, t, i) {
		"use strict";
		i("0571")
	},
	2108: function(e, t, i) {
		"use strict";
		i("9f1a")
	},
	2599: function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "second-share-pop"
			}, [i("u-dialog", {
				staticClass: "titlebar",
				attrs: {
					title: e.sharePopTitle,
					width: e.sharePopWidth,
					visible: e.popShow,
					modal: e.shareModal,
					top: e.sharePopTop
				},
				on: {
					"update:visible": function(t) {
						e.popShow = t
					}
				}
			}, [e.shareError ? i("div", {
				staticClass: "share-error"
			}, [i("div", {
				staticClass: "share-error-content"
			}, [i("img", {
				staticClass: "error-icon",
				attrs: {
					src: e.errorIcon,
					alt: ""
				}
			}), i("span", [e._v("加载失败，")]), i("span", {
				staticClass: "try-again",
				on: {
					click: e.getDocInfo
				}
			}, [e._v("点击重试")])])]) : [i("div", {
				staticClass: "share-url"
			}, [i("input", {
				staticClass: "share-url-text",
				attrs: {
					type: "text",
					oncopy: "return false",
					readonly: ""
				},
				domProps: {
					value: e.docLink
				}
			}), i("div", {
				staticClass: "share-button-group"
			}, [i("div", {
				staticClass: "clipboard-box"
			}, [i("u-button", {
				staticClass: "clipboard-btn",
				attrs: {
					status: "primary",
					"data-clipboard-text": e.clipBoardText
				},
				domProps: {
					textContent: e._s(e.shareText)
				}
			}), e.showCopySuccess ? i("span", {
				staticClass: "copy-tips"
			}, [e._v("复制链接成功")]) : e._e()], 1)])]), 2 === e.shareType ? i("div", {
				staticClass: "share-verify-code"
			}, [i("span", [e._v("提取码")]), i("input", {
				staticClass: "verify-code-text",
				attrs: {
					type: "text",
					readonly: ""
				},
				domProps: {
					value: e.pwd
				}
			})]) : e._e(), i("ul", {
				staticClass: "share-tips"
			}, [i("li", [i("i", {
				staticClass: "point"
			}), i("span", {
				staticClass: "tip-text"
			}, [e._v(e._s(e.validityTime))])]), i("li", [i("i", {
				class: ["point", e.acl.length ? "" : "point-danger"]
			}), i("span", {
				staticClass: "tip-text"
			}, [e._v(e._s(e.shareLimit))])])])]], 2)], 1)
		}
			, o = []
			, a = (i("2d7b"),
			i("109e"))
			, r = i.n(a)
			, s = i("07a4")
			, c = s["a"].setShareInfo
			, l = {
			name: "SecondSharePop",
			data: function() {
				return {
					sharePopTitle: "分享文档",
					sharePopWidth: "fit-content",
					sharePopTop: "0",
					shareModal: !1,
					showCopySuccess: !1,
					errorIcon: i("af7e"),
					timer: null
				}
			},
			props: {
				popShow: !1,
				title: ""
			},
			watch: {
				popShow: function(e) {
					!e && (this.showCopySuccess = !1)
				}
			},
			computed: {
				shareText: function() {
					return 2 === this.shareType ? "复制链接及提取码" : "复制链接"
				},
				validityTime: function() {
					var e = this.expiredDays ? this.expiredDays + "天" : "永久";
					return "".concat(e, "有效")
				},
				shareLimit: function() {
					return "".concat(this.acl.length ? "" : "不", "允许转存和导出文档、保存和下载文档中的附件")
				},
				clipBoardText: function() {
					return 2 === this.shareType ? "".concat(this.title ? this.title + " " : "", "链接：").concat(this.docLink, " 提取码：").concat(this.pwd) : this.docLink
				},
				isAuthor: function() {
					return s["b"].shareInfo.isAuthor
				},
				pwd: function() {
					return s["b"].shareInfo.pwd
				},
				docLink: function() {
					return s["b"].shareInfo.docLink
				},
				surl: function() {
					return s["b"].shareInfo.surl
				},
				isExpired: function() {
					return s["b"].shareInfo.isExpired
				},
				shareStatus: function() {
					return s["b"].shareInfo.shareStatus
				},
				expiredTime: function() {
					return s["b"].shareInfo.expiredTime
				},
				shareError: function() {
					return s["b"].shareInfo.shareError
				},
				docid: function() {
					return s["b"].shareInfo.docid
				},
				shareType: function() {
					return s["b"].shareInfo.shareType
				},
				expiredDays: function() {
					return s["b"].shareInfo.expiredDays
				},
				acl: function() {
					return s["b"].shareInfo.acl
				}
			},
			created: function() {
				var e = window.location.pathname.split("/")
					, t = e[e.length - 1];
				c({
					surl: t
				})
			},
			mounted: function() {
				this.initClipboard()
			},
			inject: ["getDocInfo"],
			methods: {
				initClipboard: function() {
					var e = this
						, t = new r.a(".second-share-pop .clipboard-btn");
					t.on("success", (function(t) {
							e.$ubc.send("wpdoc_share_share_copy"),
								e.handleShowCopySuccess(),
								e.$Message({
									type: "success",
									message: "复制成功"
								}),
								t.clearSelection()
						}
					)),
						t.on("error", (function(e) {
								this.$Message({
									type: "error",
									message: "复制失败，请重试或手动复制"
								})
							}
						))
				},
				handleShowCopySuccess: function() {
					var e = this;
					this.timer && (clearTimeout(this.timer),
						this.timer = null),
						this.showCopySuccess = !0,
						this.timer = setTimeout((function() {
								e.showCopySuccess = !1
							}
						), 3e3)
				}
			}
		}
			, d = l
			, u = (i("c88f"),
			i("52c5"))
			, p = Object(u["a"])(d, n, o, !1, null, null, null)
			, h = p.exports;
		t["default"] = h
	},
	"259d": function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("section", {
				class: ["wpdoc-directory-section", "collapse" === e.state ? "dir-is-collapse" : "dir-is-expand"],
				style: {
					width: e.size.w + "px",
					height: e.size.h + "px",
					"padding-left": e.size.paddingL + "px"
				},
				attrs: {
					id: e.editorId + "-directory"
				}
			}, [i("div", {
				staticClass: "btn-directory-handle",
				on: {
					click: e.handleChageDirPanel
				}
			}, [i("i", {
				staticClass: "x-icon x-icon-collapse"
			})]), i("transition", {
				attrs: {
					name: "wpdoc-directory-panel-move"
				}
			}, ["expand" === e.state ? i("div", {
				staticClass: "wpdoc-directory-panel"
			}, [i("div", {
				staticClass: "directory-header"
			}, [e._v("目录")]), e.isEmptyDirector ? i("div", {
				staticClass: "directory-empty",
				style: {
					height: e.size.h - 60 - e.size.paddingB + "px"
				}
			}, [i("p", {
				staticClass: "dir-empty-tiptext"
			}, [e._v("\n                    对文档内容应用“标题”样式\n                    "), i("br"), e._v("\n                    即可自动生成“目录”\n                ")])]) : i("div", {
				staticClass: "directory-list-box",
				style: {
					height: e.size.h - 60 - e.size.paddingB + "px"
				}
			}, [i("ul", {
				staticClass: "directory-list"
			}, [e._l(e.listMap, (function(t, n) {
					return [t.text ? i("li", {
						key: n,
						ref: "dirItemRef" + n,
						refInFor: !0,
						class: ["item", "is-" + t.level, n === e.activeDirectoryId ? "active" : ""],
						attrs: {
							"data-id": n
						},
						on: {
							click: function(t) {
								return e.handleClickDirectoryItem(n)
							}
						}
					}, [i("u-tooltip", {
						attrs: {
							content: t.text,
							placement: "right",
							disabled: !e.isShowTooltip,
							delay: 250
						}
					}, [i("em", {
						staticClass: "c-text",
						attrs: {
							"slot:content": ""
						},
						on: {
							mouseover: function(t) {
								return e.handleMouseoverDirectoryItem(n)
							},
							mouseout: e.handleMouseleaveDirectoryItem
						}
					}, [i("span", {
						staticClass: "text"
					}, [e._v(e._s(t.text))])])])], 1) : e._e()]
				}
			))], 2)])]) : e._e()])], 1)
		}
			, o = []
			, a = (i("1554"),
			i("f907"),
			i("d3d0"),
			i("0755"),
			i("35c3"),
			i("fd7f"),
			i("a57e"),
			i("a24c"),
			i("061a"),
			i("ba4a"),
			i("ec56"),
			i("a6f9"),
			i("b746"))
			, r = i.n(a);
		function s(e) {
			return "[object Object]" !== Object.prototype.toString.call(e) ? new Error("参数必须是一个json对象") : Object.keys(e).length <= 0
		}
		var c = i("ed9b")
			, l = (i("2d7b"),
			i("44fa"),
			{
				Linear: function(e, t, i, n) {
					return i * e / n + t
				},
				Quad: {
					easeIn: function(e, t, i, n) {
						return i * (e /= n) * e + t
					},
					easeOut: function(e, t, i, n) {
						return -i * (e /= n) * (e - 2) + t
					},
					easeInOut: function(e, t, i, n) {
						return (e /= n / 2) < 1 ? i / 2 * e * e + t : -i / 2 * (--e * (e - 2) - 1) + t
					}
				},
				Cubic: {
					easeIn: function(e, t, i, n) {
						return i * (e /= n) * e * e + t
					},
					easeOut: function(e, t, i, n) {
						return i * ((e = e / n - 1) * e * e + 1) + t
					},
					easeInOut: function(e, t, i, n) {
						return (e /= n / 2) < 1 ? i / 2 * e * e * e + t : i / 2 * ((e -= 2) * e * e + 2) + t
					}
				},
				Quart: {
					easeIn: function(e, t, i, n) {
						return i * (e /= n) * e * e * e + t
					},
					easeOut: function(e, t, i, n) {
						return -i * ((e = e / n - 1) * e * e * e - 1) + t
					},
					easeInOut: function(e, t, i, n) {
						return (e /= n / 2) < 1 ? i / 2 * e * e * e * e + t : -i / 2 * ((e -= 2) * e * e * e - 2) + t
					}
				},
				Quint: {
					easeIn: function(e, t, i, n) {
						return i * (e /= n) * e * e * e * e + t
					},
					easeOut: function(e, t, i, n) {
						return i * ((e = e / n - 1) * e * e * e * e + 1) + t
					},
					easeInOut: function(e, t, i, n) {
						return (e /= n / 2) < 1 ? i / 2 * e * e * e * e * e + t : i / 2 * ((e -= 2) * e * e * e * e + 2) + t
					}
				},
				Sine: {
					easeIn: function(e, t, i, n) {
						return -i * Math.cos(e / n * (Math.PI / 2)) + i + t
					},
					easeOut: function(e, t, i, n) {
						return i * Math.sin(e / n * (Math.PI / 2)) + t
					},
					easeInOut: function(e, t, i, n) {
						return -i / 2 * (Math.cos(Math.PI * e / n) - 1) + t
					}
				},
				Expo: {
					easeIn: function(e, t, i, n) {
						return 0 === e ? t : i * Math.pow(2, 10 * (e / n - 1)) + t
					},
					easeOut: function(e, t, i, n) {
						return e === n ? t + i : i * (1 - Math.pow(2, -10 * e / n)) + t
					},
					easeInOut: function(e, t, i, n) {
						return 0 === e ? t : e === n ? t + i : (e /= n / 2) < 1 ? i / 2 * Math.pow(2, 10 * (e - 1)) + t : i / 2 * (2 - Math.pow(2, -10 * --e)) + t
					}
				},
				Circ: {
					easeIn: function(e, t, i, n) {
						return -i * (Math.sqrt(1 - (e /= n) * e) - 1) + t
					},
					easeOut: function(e, t, i, n) {
						return i * Math.sqrt(1 - (e = e / n - 1) * e) + t
					},
					easeInOut: function(e, t, i, n) {
						return (e /= n / 2) < 1 ? -i / 2 * (Math.sqrt(1 - e * e) - 1) + t : i / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + t
					}
				},
				Elastic: {
					easeIn: function(e, t, i, n, o, a) {
						var r;
						return 0 === e ? t : 1 === (e /= n) ? t + i : ("undefined" === typeof a && (a = .3 * n),
							!o || o < Math.abs(i) ? (r = a / 4,
								o = i) : r = a / (2 * Math.PI) * Math.asin(i / o),
						-o * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * n - r) * (2 * Math.PI) / a) + t)
					},
					easeOut: function(e, t, i, n, o, a) {
						var r;
						return 0 === e ? t : 1 === (e /= n) ? t + i : ("undefined" === typeof a && (a = .3 * n),
							!o || o < Math.abs(i) ? (o = i,
								r = a / 4) : r = a / (2 * Math.PI) * Math.asin(i / o),
						o * Math.pow(2, -10 * e) * Math.sin((e * n - r) * (2 * Math.PI) / a) + i + t)
					},
					easeInOut: function(e, t, i, n, o, a) {
						var r;
						return 0 === e ? t : 2 === (e /= n / 2) ? t + i : ("undefined" === typeof a && (a = n * (.3 * 1.5)),
							!o || o < Math.abs(i) ? (o = i,
								r = a / 4) : r = a / (2 * Math.PI) * Math.asin(i / o),
							e < 1 ? o * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * n - r) * (2 * Math.PI) / a) * -.5 + t : o * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * n - r) * (2 * Math.PI) / a) * .5 + i + t)
					}
				},
				Back: {
					easeIn: function(e, t, i, n, o) {
						return "undefined" === typeof o && (o = 1.70158),
						i * (e /= n) * e * ((o + 1) * e - o) + t
					},
					easeOut: function(e, t, i, n, o) {
						return "undefined" === typeof o && (o = 1.70158),
						i * ((e = e / n - 1) * e * ((o + 1) * e + o) + 1) + t
					},
					easeInOut: function(e, t, i, n, o) {
						return "undefined" === typeof o && (o = 1.70158),
							(e /= n / 2) < 1 ? i / 2 * (e * e * ((1 + (o *= 1.525)) * e - o)) + t : i / 2 * ((e -= 2) * e * ((1 + (o *= 1.525)) * e + o) + 2) + t
					}
				},
				Bounce: {
					easeIn: function(e, t, i, n) {
						return i - l.Bounce.easeOut(n - e, 0, i, n) + t
					},
					easeOut: function(e, t, i, n) {
						return (e /= n) < 1 / 2.75 ? i * (7.5625 * e * e) + t : e < 2 / 2.75 ? i * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : e < 2.5 / 2.75 ? i * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : i * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
					},
					easeInOut: function(e, t, i, n) {
						return e < n / 2 ? .5 * l.Bounce.easeIn(2 * e, 0, i, n) + t : .5 * l.Bounce.easeOut(2 * e - n, 0, i, n) + .5 * i + t
					}
				}
			})
			, d = function(e, t, i, n, o) {
			var a = function(e) {
				return "function" === typeof e
			}
				, r = function(e) {
				return "number" === typeof e
			}
				, s = function(e) {
				return "string" === typeof e
			}
				, c = function(e) {
				if (r(e))
					return e;
				if (s(e)) {
					if (/\d+m?s$/.test(e))
						return /ms/.test(e) ? 1 * e.replace("ms", "") : 1e3 * e.replace("s", "");
					if (/^\d+$/.test(e))
						return +e
				}
				return -1
			};
			if (!r(e) || !r(t))
				return window.console && console.error("from和to两个参数必须且为数值"),
					0;
			var d = l || window.Tween;
			if (!d)
				return window.console && console.error("缓动算法函数缺失"),
					0;
			var u = {
				duration: 300,
				easing: "Linear",
				callback: function() {}
			}
				, p = function(e) {
				a(e) ? u.callback = e : -1 !== c(e) ? u.duration = c(e) : s(e) && (u.easing = e)
			};
			p(i),
				p(n),
				p(o),
			window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
					return setTimeout(e, 17)
				}
			),
			window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
					clearTimeout(e)
				}
			);
			var h = 0
				, f = Math.ceil(u.duration / 17)
				, g = null;
			u.easing = u.easing.slice(0, 1).toUpperCase() + u.easing.slice(1);
			var m, v = u.easing.split(".");
			if (1 === v.length ? m = d[v[0]] : 2 === v.length && (m = d[v[0]] && d[v[0]][v[1]]),
			!1 !== a(m)) {
				var _ = function i() {
					var n = m(h, e, t - e, f);
					h++,
						h <= f ? (u.callback(n),
							g = requestAnimationFrame(i)) : u.callback(t, !0)
				};
				return _(),
					function() {
						return g
					}
			}
			console.error('没有找到名为 "'.concat(u.easing, '" 的动画算法'))
		};
		function u(e, t) {
			var i;
			if ("undefined" === typeof Symbol || null == e[Symbol.iterator]) {
				if (Array.isArray(e) || (i = p(e)) || t && e && "number" === typeof e.length) {
					i && (e = i);
					var n = 0
						, o = function() {};
					return {
						s: o,
						n: function() {
							return n >= e.length ? {
								done: !0
							} : {
								done: !1,
								value: e[n++]
							}
						},
						e: function(e) {
							throw e
						},
						f: o
					}
				}
				throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			var a, r = !0, s = !1;
			return {
				s: function() {
					i = e[Symbol.iterator]()
				},
				n: function() {
					var e = i.next();
					return r = e.done,
						e
				},
				e: function(e) {
					s = !0,
						a = e
				},
				f: function() {
					try {
						r || null == i.return || i.return()
					} finally {
						if (s)
							throw a
					}
				}
			}
		}
		function p(e, t) {
			if (e) {
				if ("string" === typeof e)
					return h(e, t);
				var i = Object.prototype.toString.call(e).slice(8, -1);
				return "Object" === i && e.constructor && (i = e.constructor.name),
					"Map" === i || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? h(e, t) : void 0
			}
		}
		function h(e, t) {
			(null == t || t > e.length) && (t = e.length);
			for (var i = 0, n = new Array(t); i < t; i++)
				n[i] = e[i];
			return n
		}
		var f = {
			name: "DirectoryNav",
			data: function() {
				return {
					HEADERREGEXP: new RegExp("^h[1-6]{1}$","gi"),
					state: "collapse",
					isStateChanging: !1,
					stateChangeTimer: null,
					size: {
						minW: 210,
						maxW: 310,
						w: 0,
						h: 0,
						paddingL: 20,
						paddingB: 70,
						left: 0
					},
					activeDirectoryId: "xxx",
					listMap: {},
					addedHeaderList: [],
					removedHeaderList: [],
					modifiedHeaderMap: {},
					changeDirectorTimer: null,
					editorDomScrollFn: null,
					isShowTooltip: !1
				}
			},
			props: {
				editorId: {
					type: String,
					required: !0,
					default: ""
				},
				scrollDomId: {
					type: String,
					required: !0,
					default: ""
				}
			},
			computed: {
				isEmptyDirector: function() {
					return s(this.listMap)
				}
			},
			watch: {
				isEmptyDirector: function(e) {
					!e && (this.state = "expand")
				}
			},
			mounted: function() {
				this.calculateSize(),
					window.addEventListener("resize", r.a.debounce(this.calculateSize, 250)),
					this.getDirectory(),
					this.observerHeader(this.editorId),
					this.scrollHandle()
			},
			methods: {
				getDirectory: function() {
					var e = document.getElementById("doc-editor-container-".concat(this.editorId))
						, t = e.querySelectorAll(".wpeditor-header-line")
						, i = {};
					t && Array.prototype.slice.call(t).forEach((function(e) {
							if (e.dataset.id) {
								var t = e.dataset.id
									, n = e.textContent || ""
									, o = e.dataset.headerlevel.toLowerCase();
								i[t] = {
									text: n,
									level: o
								}
							}
						}
					)),
						this.listMap = i
				},
				observerHeader: function(e) {
					var t = this
						, i = new MutationObserver((function(e) {
							clearTimeout(t.changeDirectorTimer),
								t.observerHeaderChange(e),
								t.updataDirectory()
						}
					))
						, n = {
						childList: !0,
						subtree: !0,
						characterData: !0
					}
						, o = document.querySelector("#".concat(e));
					i.observe(o, n)
				},
				observerHeaderChange: function(e) {
					var t, i = u(e);
					try {
						for (i.s(); !(t = i.n()).done; ) {
							var n = t.value;
							if ("childList" === n.type) {
								if (n.removedNodes.length > 0) {
									var o, a = u(n.removedNodes);
									try {
										for (a.s(); !(o = a.n()).done; ) {
											var r = o.value;
											if (/^h[1-6]{1}$/gi.test(r.nodeName))
												this.removedHeaderList.push(r.dataset.id);
											else if (n.target && /^h[1-6]{1}$/gi.test(n.target.nodeName)) {
												var s = n.target.dataset.id;
												this.modifiedHeaderMap[s] = {
													textContent: n.target.textContent
												}
											}
										}
									} catch (y) {
										a.e(y)
									} finally {
										a.f()
									}
								}
								if (n.addedNodes.length > 0) {
									var c, l = u(n.addedNodes);
									try {
										for (l.s(); !(c = l.n()).done; ) {
											var d = c.value;
											if (/^h[1-6]{1}$/gi.test(d.nodeName))
												this.addedHeaderList.push(d.dataset.id);
											else if (n.target && /^h[1-6]{1}$/gi.test(n.target.nodeName)) {
												var p = n.target.dataset.id;
												this.modifiedHeaderMap[p] = {
													textContent: n.target.textContent
												}
											}
										}
									} catch (y) {
										l.e(y)
									} finally {
										l.f()
									}
								}
							} else if ("characterData" === n.type && n.target && n.target.parentNode) {
								var h = this.findHeaderInfo(n.target.parentNode, 1, 3)
									, f = h.isHeader
									, g = h.id
									, m = void 0 === g ? "" : g
									, v = h.textContent
									, _ = void 0 === v ? "" : v;
								f && (this.modifiedHeaderMap[m] = {
									textContent: _
								})
							}
						}
					} catch (y) {
						i.e(y)
					} finally {
						i.f()
					}
				},
				updataDirectory: function() {
					var e = this;
					this.changeDirectorTimer = setTimeout((function() {
							if (e.addedHeaderList.length > 0)
								return e.getDirectory(),
									e.addedHeaderList = [],
									e.removedHeaderList = [],
									e.modifiedHeaderMap = {},
									!0;
							if (e.removedHeaderList.length > 0 && (e.removedHeaderList.forEach((function(t) {
									e.listMap[t] && e.$delete(e.listMap, t)
								}
							)),
								e.removedHeaderList = []),
								!s(e.modifiedHeaderMap)) {
								var t = Object.keys(e.modifiedHeaderMap);
								t.forEach((function(t) {
										e.listMap[t] && e.$set(e.listMap[t], "text", e.modifiedHeaderMap[t].textContent)
									}
								)),
									e.modifiedHeaderMap = {}
							}
						}
					), 200)
				},
				handleChageDirPanel: function() {
					var e = this;
					if (this.isStateChanging)
						return !1;
					this.isStateChanging = !0,
						this.state = "collapse" === this.state ? "expand" : "collapse",
						this.stateChangeTimer = setTimeout((function() {
								e.isStateChanging = !1,
									clearTimeout(e.stateChangeTimer)
							}
						), 300)
				},
				calculateSize: function() {
					var e = document.getElementById("doc-editor-container-".concat(this.editorId))
						, t = e.getBoundingClientRect()
						, i = t.left
						, n = t.right
						, o = n - i
						, a = document.documentElement.clientWidth || document.body.clientWidth
						, r = document.documentElement.clientHeight || document.body.clientHeight
						, s = Math.floor(parseInt(a - o, 10) / 2) - 10
						, c = document.querySelector("#".concat(this.editorId, "-directory"))
						, l = c.getBoundingClientRect()
						, d = l.top;
					s < this.size.minW ? (this.size.w = this.size.minW,
						this.size.paddingL = 20) : s < this.size.maxW ? (this.size.w = s,
						this.size.paddingL = 20) : (this.size.w = s,
						this.size.paddingL = s - this.size.maxW + 20),
						this.size.h = r - d,
						this.size.paddingB = 70;
					var u = document.querySelector("#".concat(this.scrollDomId))
						, p = 2 * (this.size.w + 10) + o;
					u.querySelector(".wpdoc-editor-out").style.marginLeft = p > a ? "".concat(this.size.w + 10, "px") : "auto"
				},
				findHeaderInfo: function(e, t, i) {
					if (!e)
						return {
							isHeader: !1
						};
					var n = /^h[1-6]{1}$/gi.test(e.nodeName);
					return n || t >= i ? {
						isHeader: n,
						id: n ? e.dataset.id : "",
						textContent: n ? e.textContent : ""
					} : this.findHeaderInfo(e.parentNode, ++t, i)
				},
				scrollHandle: function() {
					var e = this
						, t = document.querySelector("#".concat(this.scrollDomId))
						, i = function() {
						var i = t.scrollTop
							, n = t.querySelectorAll(".wpeditor-header-line")
							, o = n.length;
						if (o <= 0)
							return !1;
						for (var a = 0; a < o; a++)
							if (i > n[a].offsetTop - 10 ? e.activeDirectoryId = n[a].dataset.id : i < n[0].offsetTop && (e.activeDirectoryId = n[0].dataset.id),
							i < n[a].offsetTop - 10)
								break
					};
					i(),
						t.addEventListener("scroll", Object(c["d"])(i, 300))
				},
				handleClickDirectoryItem: function(e) {
					this.editorDomScrollFn && cancelAnimationFrame(this.editorDomScrollFn);
					var t = document.querySelector("#".concat(this.scrollDomId))
						, i = document.querySelector("#".concat(this.editorId))
						, n = i.querySelector('[data-id="'.concat(e, '"]'))
						, o = n.offsetTop
						, a = t.scrollTop;
					this.editorDomScrollFn = d(a, o, 300, "Quad.easeOut", (function(e) {
							t.scrollTo(0, e)
						}
					)),
						n.classList.add("wpeditor-header-hover"),
						setTimeout((function() {
								n.classList.remove("wpeditor-header-hover")
							}
						), 1300)
				},
				handleMouseoverDirectoryItem: function(e) {
					var t = this.$refs["dirItemRef".concat(e)]
						, i = t[0].querySelector(".u-tooltip-rel").offsetWidth
						, n = t[0].querySelector(".c-text .text").offsetWidth;
					n > i && (this.isShowTooltip = !0)
				},
				handleMouseleaveDirectoryItem: function() {
					this.isShowTooltip = !1
				}
			}
		}
			, g = f
			, m = (i("dfad"),
			i("52c5"))
			, v = Object(m["a"])(g, n, o, !1, null, null, null)
			, _ = v.exports;
		t["default"] = _
	},
	"26b4": function(e, t, i) {
		"use strict";
		i("5bb0")
	},
	2704: function(e, t, i) {
		"use strict";
		i("345e")
	},
	"27ae": function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-file-selector"
			}, [i("header-comp", {
				on: {
					cancel: e.handleCancel
				}
			}), i("body-comp", {
				attrs: {
					selectDir: e.selectDir,
					maxSelect: e.maxSelect,
					selectCate: e.selectCate,
					selectFileExt: e.selectFileExt
				},
				on: {
					confirm: e.handleConfirm
				}
			}), i("footer-comp", {
				on: {
					cancel: e.handleCancel
				}
			})], 1)
		}
			, o = []
			, a = (i("626b"),
				function() {
					var e = this
						, t = e.$createElement
						, i = e._self._c || t;
					return i("div", {
						staticClass: "wpdoc-file-selector__header"
					}, [i("div", {
						staticClass: "wpdoc-file-selector__header-title"
					}, [i("h3", {
						staticClass: "wpdoc-file-selector__header-text"
					}, [e._v(e._s(e.title))])]), i("div", {
						staticClass: "wpdoc-file-selector__header-close cursor-p",
						on: {
							click: e.handleClose
						}
					}, [i("i", {
						staticClass: "iconfont icon-close"
					})])])
				}
		)
			, r = []
			, s = {
			props: {
				title: {
					type: String,
					default: "文件列表"
				}
			},
			methods: {
				handleClose: function() {
					this.$emit("cancel")
				}
			}
		}
			, c = s
			, l = (i("d7c7"),
			i("52c5"))
			, d = Object(l["a"])(c, a, r, !1, null, null, null)
			, u = d.exports
			, p = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-file-selector__body"
			}, [i("nav-comp", {
				attrs: {
					currentPath: e.dir,
					showSearch: e.showSearch,
					currentSearchText: e.searchText
				},
				on: {
					search: e.handleSearch,
					nav: e.handleNavChange
				}
			}), i("list-comp", {
				attrs: {
					dir: e.dir,
					searchText: e.searchText,
					showSearch: e.showSearch,
					selectDir: e.selectDir,
					selectCate: e.selectCate,
					selectFileExt: e.selectFileExt,
					maxSelect: e.maxSelect
				},
				on: {
					"update:dir": function(t) {
						e.dir = t
					},
					"update:showSearch": function(t) {
						e.showSearch = t
					},
					"update:show-search": function(t) {
						e.showSearch = t
					},
					confirm: e.handleConfirm,
					"dir-change": e.handleDirChange
				}
			})], 1)
		}
			, h = []
			, f = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-file-selector__nav"
			}, [i("div", {
				staticClass: "wpdoc-file-selector__nav-left"
			}, [e.navs.length ? i("div", [i("nav-item", {
				attrs: {
					item: e.backNavItem,
					sep: "|"
				},
				on: {
					nav: e.handleBackNav
				}
			}), e._l(e.navs, (function(t, n) {
					return i("nav-item", {
						key: n,
						attrs: {
							item: t,
							canNav: !t.isEllip && n < e.navs.length - 1
						},
						on: {
							nav: e.handleNav
						}
					})
				}
			))], 2) : i("div", [i("span", {
				staticClass: "wpdoc-file-selector__nav-item"
			}, [e._v("全部文件")])])]), i("div", {
				staticClass: "wpdoc-file-selector__nav-right"
			}, [i("u-input", {
				staticClass: "wpdoc-file-selector__nav-search",
				attrs: {
					placeholder: "搜索我的网盘文件",
					size: "small"
				},
				nativeOn: {
					keyup: function(t) {
						return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : e.handleSearch(t)
					}
				},
				model: {
					value: e.searchText,
					callback: function(t) {
						e.searchText = "string" === typeof t ? t.trim() : t
					},
					expression: "searchText"
				}
			}, [i("i", {
				staticClass: "iconfont icon-search cursor-p wpdoc-file-selector__nav-search-icon",
				attrs: {
					slot: "suffix"
				},
				on: {
					click: e.handleSearch
				},
				slot: "suffix"
			})])], 1)])
		}
			, g = []
			, m = (i("7200"),
				i("2d7b"),
				function() {
					var e = this
						, t = e.$createElement
						, i = e._self._c || t;
					return i("span", {
						staticClass: "wpdoc-file-selector__nav-item",
						class: e.canNav ? "" : "is-disable-nav"
					}, [i("span", {
						staticClass: "wpdoc-file-selector__nav-item-title text-ellip",
						on: {
							click: e.handleNav
						}
					}, [e._v(e._s(e.item.name))]), i("span", {
						staticClass: "wpdoc-file-selector__nav-item-sep"
					}, [e._v(e._s(e.sep))])])
				}
		)
			, v = []
			, _ = {
			props: {
				item: {
					type: Object
				},
				sep: {
					type: String,
					default: ">"
				},
				canNav: {
					type: Boolean,
					default: !0
				}
			},
			methods: {
				handleNav: function() {
					this.canNav && this.$emit("nav", this.item.path)
				}
			}
		}
			, y = _
			, w = (i("5481"),
			Object(l["a"])(y, m, v, !1, null, null, null))
			, b = w.exports
			, C = {
			components: {
				navItem: b
			},
			props: {
				currentPath: {
					type: String,
					default: "/"
				},
				showSearch: {
					type: Boolean,
					default: !1
				},
				currentSearchText: {
					type: String,
					default: ""
				}
			},
			data: function() {
				return {
					searchText: "",
					backNavItem: {
						name: "返回上一级",
						path: ""
					},
					ellipNavItem: {
						name: "...",
						path: "",
						isEllip: !0
					}
				}
			},
			computed: {
				searchNavs: function() {
					var e = [{
						path: "/",
						name: "全部文件"
					}, {
						path: "",
						name: "搜索：".concat(this.currentSearchText)
					}];
					return e
				},
				dirNavs: function() {
					var e = this.currentPath;
					if ("/" === e)
						return {
							path: "/",
							name: "全部文件"
						};
					var t = e.split("/")
						, i = "";
					t = t.map((function(e, t) {
							var n = "".concat(i).concat("/" === i ? "" : "/").concat(e);
							return i = n,
							"/" === n && (e = "全部文件"),
								{
									path: n,
									name: e
								}
						}
					));
					var n = t.length;
					if (n > 4) {
						var o = [t[0]]
							, a = t.slice(n - 3);
						t = o.concat(this.ellipNavItem).concat(a)
					}
					return t
				},
				navs: function() {
					var e = this.showSearch
						, t = this.searchNavs
						, i = this.dirNavs;
					return e ? t : i
				}
			},
			methods: {
				handleSearch: function() {
					var e = this.searchText;
					e ? this.$emit("search", e) : this.$Message({
						type: "error",
						message: "请输入搜索关键词"
					})
				},
				handleNav: function(e) {
					this.$emit("nav", e)
				},
				handleBackNav: function() {
					var e = this.navs
						, t = e[e.length - 2];
					this.handleNav(t.path)
				}
			}
		}
			, S = C
			, x = (i("fecf"),
			Object(l["a"])(S, f, g, !1, null, null, null))
			, k = x.exports
			, T = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-file-selector__list"
			}, [i("list-header", {
				attrs: {
					order: e.order,
					desc: e.desc,
					selection: e.selection,
					selectAll: e.selectAll,
					selectLength: e.selectLength,
					showSearch: e.showSearch
				},
				on: {
					"change-sort": e.handleChangeSort,
					"select-all": e.handleSelectAll
				}
			}), e.list.length || e.loading ? i("list-body", {
				ref: "listBody",
				attrs: {
					list: e.list,
					selectMap: e.selectMap,
					canSelectListMap: e.canSelectListMap,
					selection: e.selection
				},
				on: {
					"dir-click": e.handleDirClick,
					select: e.handleSelect,
					"scroll-end": e.handleScrollEnd
				}
			}) : i("list-empty", {
				attrs: {
					desc: e.emptyText
				}
			})], 1)
		}
			, I = []
			, O = (i("ccbb"),
				i("44fa"),
				i("ec56"),
				i("a6f9"),
				i("a583"),
				i("bf49"),
				i("ba4a"),
				i("061a"),
				function() {
					var e = this
						, t = e.$createElement
						, i = e._self._c || t;
					return i("div", {
						staticClass: "wpdoc-file-selector__list-header"
					}, [i("table", {
						staticClass: "wpdoc-file-selector__list-header-table"
					}, [i("list-col-group"), i("thead", [i("tr", {
						staticClass: "wpdoc-file-selector__list-header-row"
					}, [e.selection ? i("th", {
						staticClass: "text-center wpdoc-file-selector__list-header-select"
					}, [i("u-checkbox", {
						attrs: {
							value: e.selectAll
						},
						on: {
							change: e.handleSelectAll
						}
					})], 1) : e._e(), e._l(e.headers, (function(t, n) {
							return i("th", {
								key: t.order,
								staticClass: "wpdoc-file-selector__list-th",
								class: e.showSearch ? "" : "cursor-p",
								on: {
									click: function(i) {
										return e.handleSort(t.order)
									}
								}
							}, [i("div", {
								staticClass: "text-ellip"
							}, [0 === n && e.selectLength ? i("span", [e._v("已选中" + e._s(e.selectLength) + "个文件/文件夹")]) : i("span", [e._v(e._s(t.title))]), e.showSearch || e.order !== t.order ? e._e() : [i("i", {
								staticClass: "iconfont wpdoc-file-selector__sort-icon",
								class: e.desc ? "icon-desc" : "icon-asc"
							})]], 2)])
						}
					))], 2)])], 1)])
				}
		)
			, P = []
			, L = function() {
			var e = this
				, t = e.$createElement;
			e._self._c;
			return e._m(0)
		}
			, A = [function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("colgroup", [i("col", {
				attrs: {
					width: "5%"
				}
			}), i("col", {
				attrs: {
					width: "55%"
				}
			}), i("col", {
				attrs: {
					width: "16%"
				}
			}), i("col", {
				attrs: {
					width: "24%"
				}
			})])
		}
		]
			, j = {}
			, E = j
			, F = Object(l["a"])(E, L, A, !1, null, null, null)
			, D = F.exports
			, M = {
			components: {
				listColGroup: D
			},
			props: {
				order: {
					type: String,
					default: ""
				},
				desc: {
					type: Number
				},
				selection: {
					type: Boolean,
					default: !1
				},
				selectAll: {
					type: Boolean
				},
				selectLength: {
					type: Number,
					default: 0
				},
				showSearch: {
					type: Boolean,
					default: !1
				}
			},
			data: function() {
				return {
					headers: [{
						title: "文件名",
						order: "name"
					}, {
						title: "大小",
						order: "size"
					}, {
						title: "修改日期",
						order: "time"
					}],
					defaultTargetDescMap: {
						name: 0,
						size: 1,
						time: 1
					}
				}
			},
			methods: {
				handleSort: function(e) {
					if (!this.showSearch) {
						var t = this.desc ? 0 : 1;
						this.order !== e && (t = this.defaultTargetDescMap[e]),
							this.$emit("change-sort", {
								targetOrder: e,
								targetDesc: t
							})
					}
				},
				handleSelectAll: function() {
					this.$emit("select-all")
				}
			}
		}
			, H = M
			, $ = (i("2704"),
			Object(l["a"])(H, O, P, !1, null, null, null))
			, N = $.exports
			, R = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-file-selector__list-body",
				on: {
					scroll: e.handleScroll
				}
			}, [i("table", {
				staticClass: "wpdoc-file-selector__list-body-table"
			}, [i("list-col-group"), i("virtualList", {
				attrs: {
					size: 46,
					clientHeight: e.clientHeight,
					scrollTop: e.scrollTop,
					totalLength: e.list.length
				},
				on: {
					"scroll-end": e.handleScrollEnd
				}
			}, e._l(e.list, (function(t, n) {
					return i("list-item", {
						key: t.fs_id,
						attrs: {
							fileMeta: t,
							index: n,
							selection: e.selection,
							selectMap: e.selectMap,
							disabled: !e.canSelectListMap[t.fs_id]
						},
						on: {
							"dir-click": e.handleDirClick,
							select: e.handleSelect
						}
					})
				}
			)), 1)], 1)])
		}
			, U = []
			, q = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("tr", {
				staticClass: "wpdoc-file-selector__list-row"
			}, [e.selection ? i("td", {
				staticClass: "text-center"
			}, [i("u-checkbox", {
				attrs: {
					value: e.checked,
					disabled: e.disabled
				},
				on: {
					change: e.handleSelect
				}
			})], 1) : e._e(), i("td", {
				staticClass: "text-ellip wpdoc-file-selector__list-td is-filename"
			}, [i("img", {
				staticClass: "wpdoc-file-selector__list-file-icon iconfont icon-pure-color",
				class: e.fileMeta.thumbnail ? "is-thumb" : "",
				attrs: {
					src: e.fileMeta.thumbnail || e.fileMeta.categoryImage,
					alt: ""
				}
			}), i("span", {
				staticClass: "wpdoc-file-selector__list-row-name",
				class: e.isdir ? "cursor-p" : "",
				on: {
					click: e.handleFileClick
				}
			}, [e._v(e._s(e.fileMeta.formatName))])]), i("td", {
				staticClass: "text-ellip wpdoc-file-selector__list-td"
			}, [e._v(e._s(e.fileMeta.formatSize))]), i("td", {
				staticClass: "text-ellip wpdoc-file-selector__list-td"
			}, [e._v(e._s(e.fileMeta.formatTime))])])
		}
			, B = []
			, z = {
			props: {
				fileMeta: {
					type: Object,
					default: function() {
						return {}
					}
				},
				selection: {
					type: Boolean,
					default: !1
				},
				selectMap: {
					type: Object,
					default: function() {
						return {}
					}
				},
				index: {},
				disabled: {
					type: Boolean,
					default: !0
				}
			},
			computed: {
				isdir: function() {
					return !!this.fileMeta.isdir
				},
				checked: function() {
					var e = this.fileMeta.fs_id;
					return !!this.selectMap[e]
				}
			},
			methods: {
				handleFileClick: function() {
					this.isdir && this.$emit("dir-click", this.fileMeta)
				},
				handleSelect: function() {
					this.$emit("select", this.fileMeta)
				}
			}
		}
			, V = z
			, G = (i("3905"),
			Object(l["a"])(V, q, B, !1, null, null, null))
			, Q = G.exports
			, J = i("f272")
			, W = J["default"].component("virtual-list", {
			props: {
				size: {
					type: Number,
					required: !0
				},
				clientHeight: {
					type: Number
				},
				scrollTop: {
					type: Number
				},
				totalLength: {
					type: Number
				},
				extraCount: {
					type: Number,
					default: 10
				}
			},
			data: function() {
				return {
					lastScrollTop: this.realScrollTop || 0
				}
			},
			computed: {
				realScrollTop: function() {
					var e = this.scrollTop
						, t = this.clientHeight
						, i = this.totalHeight
						, n = this.lastScrollTop
						, o = this.size
						, a = this.extraCount;
					return e + t >= this.totalHeight && (e = i - t),
						Math.abs(e - n) < o * a ? n : (this.lastScrollTop = e,
							e)
				},
				totalHeight: function() {
					return this.size * this.totalLength
				},
				extraHeight: function() {
					return this.extraCount * this.size
				},
				topHeight: function() {
					var e = this.realScrollTop
						, t = this.extraHeight;
					return e > t ? e - t : 0
				},
				startIndex: function() {
					return Math.floor(this.topHeight / this.size)
				},
				visibleLength: function() {
					return Math.floor(this.clientHeight / this.size)
				},
				showLength: function() {
					return 2 * this.extraCount + this.visibleLength
				},
				bottomHeight: function() {
					var e = this.totalHeight
						, t = this.topHeight
						, i = this.showLength
						, n = this.size
						, o = this.extraCount
						, a = e - t - i * n;
					return a < n * o && this.totalLength > this.showLength && this.$emit("scroll-end"),
						a < 0 ? 0 : a
				}
			},
			methods: {},
			render: function() {
				var e = arguments[0]
					, t = this.topHeight
					, i = this.bottomHeight
					, n = this.startIndex
					, o = this.showLength
					, a = "".concat(t, "px")
					, r = "".concat(i, "px")
					, s = this.$slots.default || []
					, c = s.slice(n, n + o);
				return e("tbody", [t ? e("tr", {
					style: {
						height: a
					}
				}) : "", c, i ? e("tr", {
					style: {
						height: r
					}
				}) : ""])
			}
		})
			, Y = W
			, K = J["default"].component("vue-virtual-scroll-list", {
			props: {
				size: {
					type: Number,
					required: !0
				},
				remain: {
					type: Number,
					required: !0
				},
				onScroll: Function
			},
			delta: {
				start: 0,
				end: 0,
				total: 0,
				keeps: 0,
				viewHeight: 0,
				allPadding: 0,
				paddingTop: 0
			},
			methods: {
				handleScroll: function(e) {
					var t = this.$refs.container.scrollTop;
					this.updateZone(t),
					this.onScroll && this.onScroll(e, t)
				},
				updateZone: function(e) {
					var t = this.$options.delta
						, i = Math.floor(e / this.size);
					e || this.$emit("toTop");
					var n = i || 0
						, o = i ? i + t.keeps : t.keeps;
					i + this.remain >= t.total && (o = t.total,
						n = t.total - t.keeps,
						this.$emit("toBottom")),
						t.end = o,
						t.start = n,
						this.$forceUpdate()
				},
				filter: function(e) {
					var t = this.$options.delta;
					return t.total = e.length,
						t.paddingTop = this.size * t.start,
						t.allPadding = this.size * (e.length - t.keeps),
						e.filter((function(e, i) {
								return i >= t.start && i <= t.end
							}
						))
				}
			},
			beforeMount: function() {
				var e = this.remain
					, t = this.$options.delta
					, i = Math.ceil(e / 2);
				t.end = e + i,
					t.keeps = e + i,
					t.viewHeight = this.size * e
			},
			render: function(e) {
				var t = this.filter(this.$slots.default)
					, i = this.$options.delta
					, n = i.viewHeight
					, o = i.paddingTop
					, a = i.allPadding;
				return e("div", {
					ref: "container",
					class: "virtual-list",
					style: {
						"overflow-y": "auto",
						height: n + "px"
					},
					on: {
						scroll: this.handleScroll
					}
				}, [e("div", {
					ref: "listbox",
					class: "virtual-list-box"
				}, [e("div", {
					class: "virtual-list-box-padding",
					style: {
						"padding-top": o + "px",
						"padding-bottom": a - o + "px"
					}
				}, t)])])
			}
		})
			, X = K
			, Z = i("b746")
			, ee = i.n(Z)
			, te = {
			components: {
				listItem: Q,
				listColGroup: D,
				virtualList: Y,
				v1: X
			},
			props: {
				list: {
					type: Array,
					default: function() {
						return []
					}
				},
				selection: {
					type: Boolean,
					default: !1
				},
				selectMap: {
					type: Object,
					default: function() {
						return {}
					}
				},
				canSelectListMap: {
					type: Object,
					default: function() {
						return {}
					}
				}
			},
			data: function() {
				return {
					itemComponent: Q,
					getClientHeight: function() {},
					handleScroll: function() {},
					clientHeight: 0,
					scrollTop: 0
				}
			},
			methods: {
				handleDirClick: function(e) {
					this.$emit("dir-click", e)
				},
				handleSelect: function(e) {
					this.$emit("select", e)
				},
				_handleScroll: function(e) {
					var t = e.target;
					t && (this.scrollTop = t.scrollTop)
				},
				_getClientHeight: function() {
					var e = this.$el.clientHeight;
					this.clientHeight = e
				},
				handleScrollEnd: function() {
					this.$emit("scroll-end")
				}
			},
			created: function() {
				this.getClientHeight = ee.a.debounce(this._getClientHeight, 500),
					this.handleScroll = ee.a.debounce(this._handleScroll, 10)
			},
			mounted: function() {
				window.addEventListener("resize", this.getClientHeight),
					this._getClientHeight()
			},
			beforeDestroy: function() {
				window.removeEventListener("resize", this.getClientHeight)
			}
		}
			, ie = te
			, ne = (i("d913"),
			Object(l["a"])(ie, R, U, !1, null, null, null))
			, oe = ne.exports
			, ae = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-file-selector__list-body-empty"
			}, [i("p", {
				staticClass: "wpdoc-file-selector__list-body-empty-text"
			}, [e._v(e._s(e.desc))])])
		}
			, re = []
			, se = {
			props: {
				desc: {
					type: String,
					default: "加载出错，请稍后重试"
				}
			}
		}
			, ce = se
			, le = (i("3547"),
			Object(l["a"])(ce, ae, re, !1, null, null, null))
			, de = le.exports
			, ue = i("7a02")
			, pe = i.n(ue)
			, he = "https://pan.baidu.com";
		he = "";
		var fe = "/api/list"
			, ge = "/api/search"
			, me = {
			order: "time",
			desc: 1,
			dir: "/",
			num: 100,
			page: 1
		}
			, ve = function() {
			var e = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
				, t = String.fromCharCode
				, i = function(e) {
				if (e.length < 2) {
					var i = e.charCodeAt(0);
					return i < 128 ? e : i < 2048 ? t(192 | i >>> 6) + t(128 | 63 & i) : t(224 | i >>> 12 & 15) + t(128 | i >>> 6 & 63) + t(128 | 63 & i)
				}
				var n = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
				return t(240 | n >>> 18 & 7) + t(128 | n >>> 12 & 63) + t(128 | n >>> 6 & 63) + t(128 | 63 & n)
			}
				, n = function(t) {
				return (t + "" + Math.random()).replace(e, i)
			}
				, o = function(e) {
				return btoa(n((new Date).getTime()))
			}
				, a = function(e, t) {
				return t ? o(String(e)).replace(/[+\/]/g, (function(e) {
						return "+" === e ? "-" : "_"
					}
				)).replace(/=/g, "") : o(String(e))
			};
			return a("baiduid")
		}
			, _e = {
			channel: "chunlei",
			clienttype: 0,
			web: 1,
			app_id: 250528,
			showempty: 0
		}
			, ye = function(e) {
			_e.logId = ve();
			var t = Object.assign({}, _e, me, e);
			t.desc || delete t.desc;
			var i = "".concat(he).concat(fe);
			return pe.a.get(i, {
				params: t
			}).then((function(e) {
					return e && e.data ? e.data : e
				}
			))
		}
			, we = function(e) {
			_e.logId = ve();
			var t = Object.assign({
				recursion: 1
			}, _e, me, e);
			t.desc || delete t.desc,
				delete t.dir;
			var i = "".concat(he).concat(ge);
			return pe.a.get(i, {
				params: t
			}).then((function(e) {
					return e && e.data ? e.data : e
				}
			))
		}
			, be = (i("f241"),
				function(e) {
					return e < 1024 ? Math.round(e) + "B" : e < 1048576 && e >= 1024 ? Math.round(e / 1024) + "KB" : e < 1073741824 && e >= 1048576 ? 10 * (e / 1024 / 1024).toFixed(1) / 10 + "M" : 100 * (e / 1024 / 1024 / 1024).toFixed(2) / 100 + "G"
				}
		)
			, Ce = function(e) {
			var t = new Date(1e3 * e)
				, i = [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), t.getHours(), t.getMinutes(), t.getSeconds()];
			return i.forEach((function(e, t) {
					e <= 9 && (i[t] = "0" + e)
				}
			)),
				i = "".concat(i.slice(0, 3).join("-"), " ").concat(i.slice(3, 5).join(":")),
				i
		}
			, Se = new RegExp("size=\\S*?&")
			, xe = new RegExp("http://pcsdata.baidu.com/")
			, ke = function(e) {
			return e.replace(Se, "size=c1999_u1999&").replace(xe, "https://pcsdata.baidu.com/")
		}
			, Te = function(e) {
			var t = /(.*)\.(doc|docx|dot|dotx|rtf|ots|odm|odt)$/i
				, i = /(.*)\.(xls|xlsx|xlt|xltx|ots|ods|csv)$/i
				, n = /(.*)\.(txt|pdf|apk|exe|psd|torrent|mmap|mm|xmind|numbers|pages|link|vsd)$/i
				, o = /(.*)\.(ppt|pptx|ppst|potx|pps|pot)$/i
				, a = /(.*)\.(html|htm|xhtml|xml)$/i
				, r = /(.*)\.(css|less|sass)$/i
				, s = /(.*)\.(js|ts|jsx|tsx)$/i
				, c = /(.*)\.(eot|otf|fon|font|ttf|ttc|woff|woff2)$/i
				, l = /(.*)\.(zip|rar|7z|gz|tgz|tar)$/i
				, d = /(.*)\.(mp3|aac|wav|wma|amr|asf|asx|aac\+|eaac\+|mp2|ogg|aif|mpega|m4a|3gpp|ac3|ape|flac|m2a|ram)$/i
				, u = /(.*)\.(dwg|dxf|dwt|dwl|dwl2)$/i
				, p = /(.*)\.(jpg|jpeg|png|png8|png24|gif|svg|bmp)$/i
				, h = /(.*)\.(mp4|flv|swf|fla|avi|flv|mpg|rm|mov|mkv|rmvb)$/i
				, f = {
				audio: d,
				word: t,
				excel: i,
				single: n,
				ppt: o,
				html: a,
				css: r,
				js: s,
				font: c,
				compress: l,
				cad: u,
				image: p,
				video: h
			}
				, g = "other";
			return Object.keys(f).some((function(t) {
					var i = f[t];
					if (i.test(e)) {
						if ("single" === t) {
							var n = e.split(".");
							g = n[n.length - 1]
						} else
							g = t;
						return !0
					}
				}
			)),
				g
		}
			, Ie = function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
				, t = e.category
				, n = e.thumbs
				, o = e.path
				, a = e.isdir
				, r = e.wpfile
				, s = ""
				, c = ""
				, l = "https://staticwx.cdn.bcebos.com/mini-program/images/"
				, d = {
				1: !0,
				3: !0
			};
			if (a)
				s = "".concat(l, "ic_file2.png");
			else if (d[t])
				c = ke(n.url1 || n.url2 || n.url3);
			else if (r)
				s = i("a02b");
			else {
				var u = "";
				u = 2 === t ? "audio" : Te(o),
					s = "".concat(l, "ic_").concat(u, "_v2.png?v=1.0")
			}
			return {
				categoryImage: s,
				thumbnail: c
			}
		}
			, Oe = function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
				, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "id"
				, i = {};
			return e.forEach((function(e, n) {
					i[e[t]] = {
						item: e,
						index: n
					}
				}
			)),
				i
		}
			, Pe = new J["default"]
			, Le = {
			components: {
				listHeader: N,
				listBody: oe,
				listEmpty: de
			},
			props: {
				dir: {
					type: String,
					default: "/"
				},
				showSearch: {
					type: Boolean,
					default: !1
				},
				searchText: {
					type: String,
					default: ""
				},
				selectDir: {
					type: [Number, Boolean],
					default: !0
				},
				selectCate: {
					type: String,
					default: ""
				},
				selectFileExt: {
					type: String,
					default: ""
				},
				maxSelect: {
					type: Number,
					default: 100
				}
			},
			data: function() {
				return {
					list: [],
					order: "time",
					desc: 1,
					page: 1,
					selection: !0,
					selectMap: {},
					loading: !1,
					scrolling: !1,
					hasMore: !0,
					emptyText: "",
					loadingIns: null
				}
			},
			watch: {
				dir: function(e, t) {
					this.getListData()
				},
				searchText: function(e) {
					this.getListData()
				}
			},
			created: function() {
				Pe.$on("confirm", this.handleConfirm)
			},
			mounted: function() {
				this.initData()
			},
			beforeDestroy: function() {
				Pe.$off("confirm", this.handleConfirm)
			},
			computed: {
				selectLength: function() {
					return Object.keys(this.selectMap).length
				},
				selectAll: function() {
					var e = this.canSelectList.length;
					return !!e && (this.selectLength === e || this.maxSelect && this.selectLength >= this.maxSelect)
				},
				listMap: function() {
					return Oe(this.list, "fs_id")
				},
				canSelectList: function() {
					var e = this.list
						, t = this.selectDir
						, i = this.selectCate
						, n = this.selectFileExt;
					if (t || (e = e.filter((function(e) {
							return !e.isdir
						}
					))),
						i) {
						var o = i.split(",").map((function(e) {
								return +e
							}
						));
						o.length && (e = e.filter((function(e) {
								return -1 !== o.indexOf(e.category)
							}
						)))
					}
					if (n) {
						var a = n.split(",");
						if (a.length) {
							var r = "\\.(".concat(a.join("|"), ")$");
							r = new RegExp(r,"i"),
								e = e.filter((function(e) {
										return r.test(e.path)
									}
								))
						}
					}
					return e
				},
				canSelectListMap: function() {
					return Oe(this.canSelectList, "fs_id")
				}
			},
			methods: {
				initData: function() {
					var e = this.order
						, t = this.desc;
					this.getListData({
						targetOrder: e,
						targetDesc: t
					})
				},
				getListData: function() {
					var e = this
						, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
						, i = t.targetOrder
						, n = t.targetDesc
						, o = t.targetDir
						, a = t.targetPage
						, r = void 0 === a ? 1 : a;
					if (!this.loading) {
						this.loading = !0;
						var s = this.desc
							, c = this.order
							, l = this.dir
							, d = this.page
							, u = this.showSearch
							, p = this.searchText
							, h = {
							order: i || c,
							desc: void 0 === n ? s : n,
							dir: o || l,
							page: r || d,
							num: 100
						};
						this.loadingIns = this.$Loading({
							text: "加载中",
							background: "rgba(255,255,255,0.9)",
							fullscreen: !1,
							customClass: "wpdoc-file-selector__loading",
							target: this.$el
						});
						var f = u ? we : ye;
						u && (h.key = p),
							f(h).then((function(t) {
									if (t && 0 === t.errno) {
										var i = t.list;
										e.hasMore = !!i.length && i.length === h.num,
										i.length || 1 !== h.page || (e.emptyText = u ? "没有数据" : "网盘文件为空，可切换账号或添加文件后再试");
										var n = e.formatData(t.list)
											, o = e.selectAll;
										if (h.page > d)
											e.list = e.list.concat(n),
											o && e.list.forEach((function(t) {
													var i = t.fs_id;
													e.setSelect(i, !0)
												}
											));
										else {
											e.list = n,
												e.selectMap = {},
												e.scrolling = !0,
												setTimeout((function() {
														e.scrolling = !1
													}
												), 500);
											try {
												e.$refs.listBody.$el.scrollTop = 0
											} catch (a) {
												console.error(a)
											}
										}
										e.order = h.order,
											e.desc = h.desc,
											e.page = h.page
									} else
										e.emptyText = "加载失败，请刷新后重试"
								}
							)).catch((function(t) {
									console.error(t),
										e.list = [],
										e.emptyText = "加载失败，请刷新后重试",
										e.hasMore = !1
								}
							)).finally((function() {
									e.loading = !1,
										e.loadingIns.close()
								}
							))
					}
				},
				formatData: function(e) {
					return e.map((function(e) {
							var t = e.isdir
								, i = e.size
								, n = e.server_mtime
								, o = e.category
								, a = e.path
								, r = e.server_filename
								, s = e.fs_id
								, c = e.wpfile
								, l = t || c ? "-" : be(i)
								, d = c ? r.replace(/\.(PanD)$/i, "") : r
								, u = Ce(n);
							a.match(/^\/apps$/) && (d = "我的应用数据");
							var p = Ie(e)
								, h = p.categoryImage
								, f = p.thumbnail;
							return Object.assign({}, e, {
								formatSize: l,
								formatName: d,
								isdir: t,
								size: i,
								server_mtime: n,
								category: o,
								path: a,
								server_filename: r,
								formatTime: u,
								fs_id: s,
								thumbnail: f,
								categoryImage: h
							})
						}
					))
				},
				handleChangeSort: function(e) {
					this.getListData(e)
				},
				handleDirClick: function(e) {
					var t = e.path;
					this.$emit("update:showSearch", !1),
						this.$emit("update:dir", t)
				},
				toggleSelect: function(e) {
					var t = this
						, i = this.selectMap
						, n = this.maxSelect
						, o = function() {
						t.$Message({
							type: "error",
							message: "最多选择".concat(n, "项")
						})
					};
					this.setSelect(e, !i[e], o)
				},
				setSelect: function(e, t, i) {
					var n = this.selectMap
						, o = this.canSelectListMap;
					o[e] && (t && this.selectLength >= this.maxSelect ? "function" === typeof i && i() : t ? this.$set(n, e, t) : this.$delete(n, e))
				},
				handleSelectAll: function() {
					var e = this
						, t = !this.selectAll
						, i = !1
						, n = function() {
						i || (e.$Message({
							type: "error",
							message: "最多选择".concat(e.maxSelect, "项")
						}),
							i = !0)
					};
					this.list.forEach((function(i) {
							var o = i.fs_id;
							e.setSelect(o, t, n)
						}
					))
				},
				handleSelect: function(e) {
					var t = e.fs_id;
					this.toggleSelect(t)
				},
				handleScrollEnd: function() {
					var e = this.scrolling
						, t = this.loading
						, i = this.hasMore;
					e || t || !i || this.getListData({
						targetPage: this.page + 1
					})
				},
				getSelectList: function() {
					var e = []
						, t = this.selectMap
						, i = this.listMap;
					return Object.keys(t).forEach((function(n) {
							var o = i[n].item;
							t[n] && e.push(o)
						}
					)),
						e
				},
				handleConfirm: function() {
					var e = this.getSelectList();
					e.length ? this.$emit("confirm", e) : this.$Message({
						type: "error",
						message: "请选择文件"
					})
				}
			}
		}
			, Ae = Le
			, je = (i("7624"),
			Object(l["a"])(Ae, T, I, !1, null, null, null))
			, Ee = je.exports
			, Fe = {
			components: {
				navComp: k,
				listComp: Ee
			},
			props: {
				selectDir: {
					type: [Number, Boolean],
					default: !0
				},
				selectCate: {
					type: String,
					default: ""
				},
				selectFileExt: {
					type: String,
					default: ""
				},
				maxSelect: {
					type: Number,
					default: 100
				}
			},
			data: function() {
				return {
					dir: "/",
					searchText: "",
					showSearch: !1
				}
			},
			methods: {
				handleSearch: function(e) {
					this.searchText = e,
						this.showSearch = !0,
						this.dir = ""
				},
				handleConfirm: function(e) {
					this.$emit("confirm", e)
				},
				handleDirChange: function(e) {
					this.showSearch = !1,
						this.dir = e
				},
				handleNavChange: function(e) {
					this.showSearch = !1,
						this.dir = e
				}
			}
		}
			, De = Fe
			, Me = (i("d66b"),
			Object(l["a"])(De, p, h, !1, null, null, null))
			, He = Me.exports
			, $e = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-file-selector__footer"
			}, [e._m(0), i("div", {
				staticClass: "wpdoc-file-selector__footer-right"
			}, [i("u-button", {
				staticClass: "wpdoc-file-selector__footer-cancel",
				on: {
					click: e.handleCancel
				}
			}, [e._v("取消")]), i("u-button", {
				attrs: {
					status: "primary"
				},
				on: {
					click: e.handleConfirm
				}
			}, [e._v("确定")])], 1)])
		}
			, Ne = [function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-file-selector__footer-left"
			}, [i("p", {
				staticClass: "description"
			}, [e._v("您插入的附件如果有更新，将同步更新至该文档")])])
		}
		]
			, Re = {
			props: {
				selectLength: {
					type: Number,
					default: 0
				}
			},
			methods: {
				handleConfirm: function() {
					Pe.$emit("confirm")
				},
				handleCancel: function() {
					this.$emit("cancel")
				}
			}
		}
			, Ue = Re
			, qe = (i("095d"),
			Object(l["a"])(Ue, $e, Ne, !1, null, null, null))
			, Be = qe.exports
			, ze = (i("65bd"),
			{
				components: {
					headerComp: u,
					bodyComp: He,
					footerComp: Be
				},
				props: {
					selectDir: {
						type: [Number, Boolean],
						default: !0
					},
					selectCate: {
						type: String,
						default: ""
					},
					maxSelect: {
						type: Number,
						default: 100
					},
					selectFileExt: {
						type: String,
						default: ""
					}
				},
				name: "FileSelector",
				methods: {
					handleConfirm: function(e) {
						this.$emit("confirm", e)
					},
					handleCancel: function() {
						this.$emit("close")
					}
				}
			})
			, Ve = ze
			, Ge = (i("a4f9"),
			Object(l["a"])(Ve, n, o, !1, null, null, null))
			, Qe = Ge.exports;
		t["default"] = Qe
	},
	"295e": function(e, t, i) {},
	2978: function(e, t, i) {
		"use strict";
		i("2cac")
	},
	"2cac": function(e, t, i) {},
	"2e61": function(e, t, i) {},
	"2f9d": function(e, t, i) {},
	3367: function(e, t, i) {
		"use strict";
		i("19f1")
	},
	"345e": function(e, t, i) {},
	3547: function(e, t, i) {
		"use strict";
		i("1b34")
	},
	"38a8c": function(e, t, i) {
		"use strict";
		i("15b3")
	},
	3905: function(e, t, i) {
		"use strict";
		i("aaa8")
	},
	"3fd0": function(e, t, i) {
		"use strict";
		i.d(t, "g", (function() {
				return g
			}
		)),
			i.d(t, "e", (function() {
					return m
				}
			)),
			i.d(t, "d", (function() {
					return v
				}
			)),
			i.d(t, "c", (function() {
					return _
				}
			)),
			i.d(t, "h", (function() {
					return y
				}
			)),
			i.d(t, "j", (function() {
					return w
				}
			)),
			i.d(t, "k", (function() {
					return b
				}
			)),
			i.d(t, "f", (function() {
					return C
				}
			)),
			i.d(t, "a", (function() {
					return S
				}
			)),
			i.d(t, "i", (function() {
					return x
				}
			)),
			i.d(t, "b", (function() {
					return k
				}
			));
		i("2d7b");
		var n = i("e487")
			, o = !1
			, a = o ? "/mock/create" : "/rest/2.0/doc/file"
			, r = o ? "/mock/convert" : "/rest/2.0/doc/file"
			, s = "/api/filemanager"
			, c = "/share/taskquery"
			, l = "/api/docol/transfer"
			, d = "/api/list"
			, u = "/api/create"
			, p = "/api/report/bad"
			, h = "/api/docol/exportstatus"
			, f = "/api/gettemplatevariable";
		function g(e) {
			return e = e || {},
				n["a"].instance.post(f, e)
		}
		function m(e) {
			return e = e || {},
				e["app_id"] = 250528,
				n["a"].instance.get("/api/filemetas", {
					params: e,
					silent: !0
				})
		}
		function v(e) {
			return e = e || {},
				n["a"].instance.post("".concat(a, "?method=create&appid=250528"), e)
		}
		function _(e) {
			return e = e || {},
				e.method = "convert",
				e.appid = 250528,
				n["a"].instance.get(r, {
					params: e,
					silent: !0
				})
		}
		function y() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
				, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
				, i = e.bdstoken
				, o = void 0 === i ? "" : i
				, a = e.ondup
				, r = e.async
				, c = void 0 === r ? 1 : r
				, l = "bdstoken=".concat(o, "&opera=rename&async=").concat(c, "&onnest=fail");
			return a && (l = "".concat(l, "&ondup=").concat(a)),
				n["a"].instance.post("".concat(s, "?").concat(l), t)
		}
		function w() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
				, t = arguments.length > 1 ? arguments[1] : void 0
				, i = e.bdstoken
				, o = void 0 === i ? "" : i
				, a = e.taskid
				, r = void 0 === a ? 0 : a
				, s = "taskid=".concat(r, "&bdstoken=").concat(o);
			return n["a"].instance.post("".concat(c, "?").concat(s), t)
		}
		function b() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
				, t = window.location.pathname.split("/")
				, i = t[t.length - 1]
				, o = e.bdstoken
				, a = void 0 === o ? "" : o
				, r = e.path
				, s = void 0 === r ? "/" : r
				, c = e.ondup
				, d = void 0 === c ? "newcopy" : c
				, u = e.async
				, p = void 0 === u ? 1 : u
				, h = e.kissAppid
				, f = void 0 === h ? 11 : h
				, g = e.docid
				, m = void 0 === g ? 0 : g
				, v = e.list
				, _ = void 0 === v ? [] : v
				, y = e.docfilename
				, w = void 0 === y ? "" : y
				, b = "bdstoken=".concat(a, "&async=").concat(p, "&ondup=").concat(d, "&kiss_app_id=").concat(f)
				, C = {
				path: s,
				docid: m,
				surl: i
			};
			return _.length > 0 && Object.assign(C, {
				taskquerylist: JSON.stringify(_),
				docfilename: w
			}),
				n["a"].instance.post("".concat(l, "?").concat(b), C)
		}
		function C(e) {
			var t = e.dir
				, i = void 0 === t ? "/" : t
				, o = e.order
				, a = void 0 === o ? "name" : o
				, r = e.desc
				, s = void 0 === r ? 0 : r
				, c = e.start
				, l = void 0 === c ? 0 : c
				, u = e.limit
				, p = void 0 === u ? 500 : u
				, h = e.bdstoken
				, f = void 0 === h ? "" : h;
			return n["a"].instance.get(d, {
				params: {
					dir: i,
					order: a,
					desc: s,
					start: l,
					limit: p,
					bdstoken: f
				}
			})
		}
		function S() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
				, t = e.bdstoken
				, i = void 0 === t ? "" : t
				, o = e.isdir
				, a = void 0 === o ? 1 : o
				, r = e.method
				, s = void 0 === r ? "post" : r
				, c = e.dataType
				, l = void 0 === c ? "json" : c
				, d = e.path
				, p = void 0 === d ? "/" : d
				, h = "a=commit&bdstoken=".concat(i)
				, f = {
				path: p,
				isdir: a,
				method: s,
				dataType: l
			};
			return n["a"].instance.post("".concat(u, "?").concat(h), f)
		}
		function x() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
				, t = e.bdstoken
				, i = void 0 === t ? "" : t
				, o = e.id
				, a = void 0 === o ? [] : o
				, r = e.uk
				, s = void 0 === r ? 0 : r
				, c = e.feture
				, l = void 0 === c ? "onlinedoc" : c
				, d = e.url
				, u = void 0 === d ? "" : d
				, h = e.tpl
				, f = void 0 === h ? "report" : h
				, g = e.type
				, m = void 0 === g ? "" : g
				, v = "bdstoken=".concat(i, "&kiss_app_id=11")
				, _ = {
				tpl: f,
				feture: l,
				item_url: u,
				item_id: a,
				item_uk: s,
				report_type: m
			};
			return n["a"].instance.post("".concat(p, "?").concat(v), _, {
				silent: !0
			})
		}
		function k(e) {
			var t = e.method
				, i = void 0 === t ? "exportstatus" : t
				, o = e.fsid
				, a = void 0 === o ? "" : o
				, r = e.surl
				, s = void 0 === r ? "" : r
				, c = e.type
				, l = void 0 === c ? "" : c
				, d = e.author
				, u = e.docversion
				, p = void 0 === u ? 1 : u
				, f = {
				method: i,
				type: l,
				docversion: p
			};
			return d ? Object.assign(f, {
				fsid: a
			}) : Object.assign(f, {
				surl: s
			}),
				n["a"].instance.get(h, {
					params: f
				})
		}
	},
	4220: function(e, t, i) {},
	"45fd": function(e, t, i) {},
	4688: function(e, t, i) {
		"use strict";
		i("cc26")
	},
	"4a22": function(e, t, i) {
		"use strict";
		i.d(t, "a", (function() {
				return r
			}
		)),
			i.d(t, "b", (function() {
					return s
				}
			)),
			i.d(t, "c", (function() {
					return c
				}
			));
		var n = i("e487")
			, o = !1
			, a = o ? "/mock/templateList.json" : "/api/doc/templates/globallist";
		function r(e) {
			return e = e || {},
			!e.appid && (e.appid = 250528),
				n["a"].instance.get(a, {
					params: e
				})
		}
		function s(e) {
			return e = e || {},
			!e.appid && (e.appid = 250528),
				n["a"].instance.get("/api/doc/templates/querycontentbyid", {
					params: e
				})
		}
		function c(e) {
			return e = e || {},
			!e.appid && (e.appid = 250528),
				n["a"].instance.get("/api/doc/templates/usagecount", {
					params: e,
					silent: !0
				})
		}
	},
	"52be": function(e, t, i) {
		"use strict";
		i("019c")
	},
	5481: function(e, t, i) {
		"use strict";
		i("5533")
	},
	"54a6": function(e, t, i) {
		"use strict";
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-pageState-main"
			}, ["creating" === e.status ? i("div", {
				staticClass: "state-box"
			}, [e._v("正在创建文档，请耐心等待...")]) : e._e(), "opening" === e.status ? i("div", {
				staticClass: "state-box"
			}, [e._v("正在打开文档，请耐心等待...")]) : e._e(), "converting" === e.status ? i("div", {
				staticClass: "state-box"
			}, [e._v("文档正在转码中，请耐心等待...")]) : e._e(), "blacklist" === e.status ? i("div", {
				staticClass: "state-box state-fail"
			}, [i("p", [e._v(e._s(e.errMsg))])]) : e._e(), "loginInfoFail" === e.status ? i("div", {
				staticClass: "state-box state-fail"
			}, [i("p", [e._v("用户信息获取失败，请刷新页面重试")])]) : e._e(), "createFail" === e.status ? i("div", {
				staticClass: "state-box state-fail"
			}, [i("p", [e._v("文档创建失败，请点击重试")]), i("u-button", {
				staticClass: "btn",
				attrs: {
					status: "primary",
					size: "small"
				},
				on: {
					click: e.handleReCreate
				}
			}, [e._v("重试")])], 1) : e._e(), "filemetasFail" === e.status ? i("div", {
				staticClass: "state-box state-fail"
			}, [i("p", [e._v("文档查找失败，请刷新页面或点击重试")]), i("u-button", {
				staticClass: "btn",
				attrs: {
					status: "primary",
					size: "small"
				},
				on: {
					click: e.handleReGetFilemetas
				}
			}, [e._v("重试")])], 1) : e._e(), "convertFail" === e.status ? i("div", {
				staticClass: "state-box state-fail"
			}, [i("p", [e._v("文档转码失败 请稍后再试")]), i("u-button", {
				staticClass: "btn",
				attrs: {
					status: "primary",
					size: "small"
				},
				on: {
					click: e.handleReConvert
				}
			}, [e._v("重试")])], 1) : e._e(), "notFound" === e.status ? i("div", {
				staticClass: "state-box state-fail"
			}, [i("p", [e._v("哎呀出错了")]), i("p", [e._v("文件不存在或已删除")])]) : e._e()])
		}
			, o = []
			, a = {
			name: "State",
			props: {
				status: {
					type: String,
					default: ""
				},
				errMsg: {
					type: String,
					default: ""
				},
				logPageTypeStr: {
					type: String,
					default: ""
				}
			},
			methods: {
				handleReCreate: function() {
					this.$emit("re-create", "retry"),
						this.$ubc.send("wpdoc_edit_".concat(this.logPageTypeStr, "_retry_crtReq"))
				},
				handleReGetFilemetas: function() {
					this.$emit("re-getfilemetas", "retry"),
						this.$ubc.send("wpdoc_edit_".concat(this.logPageTypeStr, "_retry_fmetaReq"))
				},
				handleReConvert: function() {
					this.$emit("re-convert", "retry"),
						this.$ubc.send("wpdoc_edit_".concat(this.logPageTypeStr, "_retry_convtReq"))
				}
			}
		}
			, r = a
			, s = (i("26b4"),
			i("52c5"))
			, c = Object(s["a"])(r, n, o, !1, null, null, null);
		t["a"] = c.exports
	},
	5533: function(e, t, i) {},
	"570b": function(e, t, i) {},
	"5a42": function(e, t, i) {},
	"5bb0": function(e, t, i) {},
	"5d11": function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-historyVersion"
			}, [i("u-button", {
				staticClass: "history-btn u-icon-time",
				on: {
					click: e.handleClick
				}
			})], 1)
		}
			, o = []
			, a = {
			name: "HistoryVersion",
			props: {},
			data: function() {
				return {}
			},
			methods: {
				handleClick: function(e) {
					console.log(e)
				}
			}
		}
			, r = a
			, s = (i("2108"),
			i("52c5"))
			, c = Object(s["a"])(r, n, o, !1, null, null, null)
			, l = c.exports;
		t["default"] = l
	},
	"600d": function(e, t, i) {
		"use strict";
		i("570b")
	},
	6156: function(e, t, i) {},
	"65bd": function(e, t, i) {},
	"69c1": function(e, t, i) {
		"use strict";
		i("73a9"),
			i("7cfa"),
			i("8fbb"),
			i("ec56"),
			i("bf49"),
			i("ba4a"),
			i("061a"),
			i("1554"),
			i("a583"),
			i("44fa");
		var n = i("1738")
			, o = (i("ee39"),
			i("e137"))
			, a = i.n(o)
			, r = (i("7d06"),
			i("5a0a"))
			, s = i("3fd0")
			, c = i("07a4");
		function l(e, t) {
			var i = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var n = Object.getOwnPropertySymbols(e);
				t && (n = n.filter((function(t) {
						return Object.getOwnPropertyDescriptor(e, t).enumerable
					}
				))),
					i.push.apply(i, n)
			}
			return i
		}
		function d(e) {
			for (var t = 1; t < arguments.length; t++) {
				var i = null != arguments[t] ? arguments[t] : {};
				t % 2 ? l(Object(i), !0).forEach((function(t) {
						Object(n["a"])(e, t, i[t])
					}
				)) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : l(Object(i)).forEach((function(t) {
						Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
					}
				))
			}
			return e
		}
		t["a"] = {
			computed: {
				bdstoken: function() {
					return c["b"].loginInfo.bdstoken
				},
				surl: function() {
					return c["b"].shareInfo.surl
				},
				docid: function() {
					return c["b"].shareInfo.docid
				}
			},
			methods: {
				rename: function() {
					var e = Object(r["a"])(a.a.mark((function e(t) {
							var i, n, o;
							return a.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												if (!this.renameStatus) {
													e.next = 2;
													break
												}
												return e.abrupt("return");
											case 2:
												return i = {
													filelist: JSON.stringify([{
														path: this.$route.query.path,
														newname: this.title + ".PanD"
													}])
												},
													this.renameStatus = !0,
													n = {
														ondup: t,
														bdstoken: this.bdstoken
													},
												t && Object.assign(n, {
													async: 2
												}),
													e.next = 8,
													Object(s["h"])(n, i);
											case 8:
												o = e.sent,
													this.handleRenameRes(o || {}, i);
											case 10:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t(t) {
						return e.apply(this, arguments)
					}
					return t
				}(),
				handleRenameRes: function(e, t) {
					if (0 === e.errno)
						if (document.title = "".concat(this.title, " - 百度网盘"),
							e.taskid) {
							var i = {
								taskid: e.taskid,
								bdstoken: this.bdstoken
							};
							this.queryTask({
								params: i,
								datas: t,
								taskFailCall: this.renameFailCall,
								taskSuccCall: this.renameTaskSuccCall
							})
						} else {
							var n = this.$route.query.path
								, o = n.lastIndexOf("/");
							n = n.substring(0, ++o),
								this.reNameSuccess(n + this.title + ".PanD"),
								this.tempTitle = this.title
						}
					else if (12 === e.errno) {
						var a = e.info || [];
						a = a[0] || {},
							this.showRenameAsynView(a.errno)
					} else
						this.renameFailCall("failed")
				},
				reNameSuccess: function(e) {
					var t = d(d({}, this.$route.query), {}, {
						path: e
					});
					this.$router.replace({
						query: t
					}),
						this.showMessage("success", "重命名成功"),
						this.renameStatus = !1
				},
				showRenameAsynView: function(e) {
					var t = [12, -8, -30];
					t.indexOf(e) > -1 ? (this.sameNamePop = !0,
						this.$Message.closeAll(),
						this.renameStatus = !1) : this.renameFailCall("failed")
				},
				confirmSameRename: function() {
					this.rename("newcopy"),
						this.sameNamePop = !1
				},
				cancleSameRename: function() {
					this.sameNamePop = !1,
						this.renameFailCall()
				},
				renameTaskSuccCall: function(e) {
					if (0 === e.task_errno)
						switch (e.status) {
							case "pending":
							case "running":
								if (this.renameProcess)
									return;
								this.renameProcess = !0,
									this.showMessage("info", "正在重命名", 1e5);
								break;
							case "success":
								this.renameProcess = !1;
								var t = Array.isArray(e.list) && e.list[0] || {}
									, i = t.to.lastIndexOf("/")
									, n = t.to.substring(++i);
								this.tempTitle = n,
									this.$emit("update:title", n),
									this.reNameSuccess(t.to);
								break;
							case "failed":
								this.renameProcess = !1,
									this.renameFailCall("failed");
								break
						}
					else
						this.showRenameAsynView(e.task_errno)
				},
				renameFailCall: function(e) {
					this.renameStatus = !1,
						this.$emit("update:title", this.tempTitle),
					e && this.showMessage("error", "重命名出错，请稍后再试")
				},
				transferFile: function() {
					var e = Object(r["a"])(a.a.mark((function e(t) {
							var i, n, o, r, c;
							return a.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												if (i = t.path,
													n = void 0 === i ? "/" : i,
													this.transferStartTime = (new Date).getTime(),
													!this.transfering) {
													e.next = 4;
													break
												}
												return e.abrupt("return");
											case 4:
												return this.transfering = !0,
													o = localStorage.getItem("DOC_USER_NAME") + "share_save_path",
													localStorage.setItem(o, n + "?" + (new Date).getTime()),
													this.transferParams = {
														docid: this.docid,
														path: n,
														surl: this.surl,
														bdstoken: this.bdstoken
													},
													e.next = 10,
													Object(s["k"])(this.transferParams);
											case 10:
												if (r = e.sent,
												r && 0 === r.errno) {
													e.next = 14;
													break
												}
												return this.transferTaskFailCall(),
													e.abrupt("return");
											case 14:
												r.taskid ? (this.transFileName = r.docfilename,
													c = {
														taskid: r.taskid,
														bdstoken: this.bdstoken
													},
													this.queryTask({
														params: c,
														taskFailCall: this.transferTaskFailCall,
														taskSuccCall: this.transferTaskSuccCall
													})) : (this.showMessage("success", "转存成功"),
													this.closeTransferSelector(),
													this.transfering = !1,
													this.$ubc.send("wpdoc_share_transfersave_success"),
													this.$ubc.send({
														name: "wpdoc_share_transfersave_time",
														ext: {
															doc_save_time: (new Date).getTime() - this.transferStartTime
														}
													}));
											case 15:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t(t) {
						return e.apply(this, arguments)
					}
					return t
				}(),
				transferTaskSuccCall: function() {
					var e = Object(r["a"])(a.a.mark((function e() {
							var t, i, n = arguments;
							return a.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												if (t = n.length > 0 && void 0 !== n[0] ? n[0] : {},
												0 === t.task_errno) {
													e.next = 4;
													break
												}
												return this.transferTaskFailCall(),
													e.abrupt("return");
											case 4:
												e.t0 = t.status,
													e.next = "pending" === e.t0 || "running" === e.t0 ? 7 : "success" === e.t0 ? 12 : "failed" === e.t0 ? 18 : 20;
												break;
											case 7:
												if (!this.transferProcess) {
													e.next = 9;
													break
												}
												return e.abrupt("return");
											case 9:
												return this.transferProcess = !0,
													this.showMessage("info", "正在转存中", 1e5),
													e.abrupt("break", 20);
											case 12:
												return this.closeTransferSelector(),
													e.next = 15,
													Object(s["k"])(d(d({}, this.transferParams), {}, {
														list: t.list,
														docfilename: this.transFileName
													}));
											case 15:
												return i = e.sent,
													i && 0 === i.errno ? (this.showMessage("success", "转存成功"),
														this.transfering = !1,
														this.$ubc.send("wpdoc_share_transfersave_success"),
														this.$ubc.send({
															name: "wpdoc_share_transfersave_time",
															ext: {
																doc_save_time: (new Date).getTime() - this.transferStartTime
															}
														})) : this.transferTaskFailCall(),
													e.abrupt("break", 20);
											case 18:
												return this.transferTaskFailCall(),
													e.abrupt("break", 20);
											case 20:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t() {
						return e.apply(this, arguments)
					}
					return t
				}(),
				transferTaskFailCall: function() {
					this.transferProcess = !1,
						this.transfering = !1,
						this.showMessage("error", "转存失败, 请稍后再试"),
						this.$ubc.send({
							name: "wpdoc_share_transfersave_fail"
						})
				},
				queryTask: function() {
					var e = Object(r["a"])(a.a.mark((function e(t) {
							var i, n, o, r, c, l, d, u, p, h;
							return a.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												return i = t.params,
													n = void 0 === i ? {} : i,
													o = t.datas,
													r = void 0 === o ? {} : o,
													c = t.taskSuccCall,
													l = void 0 === c ? function() {}
														: c,
													d = t.taskFailCall,
													u = void 0 === d ? function() {}
														: d,
													e.next = 3,
													Object(s["j"])(n, r);
											case 3:
												if (e.t0 = e.sent,
													e.t0) {
													e.next = 6;
													break
												}
												e.t0 = {};
											case 6:
												if (p = e.t0,
												0 === p.errno) {
													e.next = 10;
													break
												}
												return u(),
													e.abrupt("return");
											case 10:
												l(p),
													h = ["success", "failed"];
											case 12:
												if (!(h.indexOf(p.status) < 0)) {
													e.next = 17;
													break
												}
												return this.queryTask({
													params: n,
													datas: r,
													taskSuccCall: l,
													taskFailCall: u
												}),
													e.abrupt("return");
											case 17:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t(t) {
						return e.apply(this, arguments)
					}
					return t
				}(),
				showMessage: function(e, t) {
					var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3e3;
					this.$Message.closeAll(),
						this.$Message({
							type: e,
							message: t,
							duration: i
						})
				}
			}
		}
	},
	"69de": function(e, t, i) {},
	"6cdb": function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				ref: "scrollContainer",
				staticClass: "wpdoc-scroll-container",
				style: {
					height: "calc(100% - " + e.topGap + "px)"
				},
				on: {
					wheel: function(t) {
						return t.preventDefault(),
							e.handleScroll(t)
					}
				}
			}, [i("div", {
				ref: "scrollWrapper",
				staticClass: "wpdoc-scroll-container__wrapper",
				style: {
					top: e.top + "px"
				}
			}, [e._t("default")], 2)])
		}
			, o = []
			, a = 0
			, r = {
			name: "ScrollBar",
			props: {
				topGap: 0
			},
			data: function() {
				return {
					top: 0
				}
			},
			methods: {
				handleScroll: function(e) {
					var t = e.wheelDelta || 3 * -e.deltaY
						, i = this.$refs.scrollContainer
						, n = i.offsetHeight
						, o = this.$refs.scrollWrapper
						, r = o.offsetHeight;
					t > 0 ? this.top = Math.min(0, this.top + t) : n - a < r ? this.top < -(r - n + a) ? this.top = this.top : this.top = Math.max(this.top + t, n - r - a) : this.top = 0
				}
			}
		}
			, s = r
			, c = (i("52be"),
			i("52c5"))
			, l = Object(c["a"])(s, n, o, !1, null, "913b056c", null)
			, d = l.exports;
		t["default"] = d
	},
	"6f4b": function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				directives: [{
					name: "show",
					rawName: "v-show",
					value: e.templateList.length,
					expression: "templateList.length"
				}],
				staticClass: "wpdoc-template-list-layer"
			}, e._l(e.templateList, (function(t) {
					return i("div", {
						key: t.name,
						staticClass: "list-block"
					}, [i("h3", {
						staticClass: "group-name"
					}, [e._v(e._s(t.name))]), i("ul", {
						staticClass: "group-list"
					}, [e._l(t.templates, (function(e) {
							return [i("template-item", {
								key: e.template_id,
								attrs: {
									"template-info": e
								}
							})]
						}
					))], 2)])
				}
			)), 0)
		}
			, o = []
			, a = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("li", {
				staticClass: "wpdoc-template-list-item"
			}, [e.templateInfo.isCreateEmpty ? [i("div", {
				staticClass: "con empty",
				on: {
					click: function(t) {
						return e.handleToCreate(e.templateInfo)
					}
				}
			}), i("h4", {
				staticClass: "name"
			}, [e._v(e._s(e.templateInfo.name))])] : [i("div", {
				staticClass: "con"
			}, [i("img", {
				attrs: {
					src: e.templateInfo.cover_url,
					title: e.templateInfo.name
				}
			}), i("div", {
				staticClass: "template-model"
			}, [i("div", {
				staticClass: "template-btn-group"
			}, [i("div", {
				staticClass: "template-btn preview",
				on: {
					click: function(t) {
						return e.handlePreview(e.templateInfo)
					}
				}
			}, [e._v("预览")]), i("div", {
				staticClass: "template-btn now-use",
				on: {
					click: function(t) {
						return e.handleToCreate(e.templateInfo)
					}
				}
			}, [e._v("使用")])])])]), i("h4", {
				staticClass: "name",
				on: {
					click: function(t) {
						return e.handleToCreate(e.templateInfo)
					}
				}
			}, [e._v(e._s(e.templateInfo.name))])]], 2)
		}
			, r = []
			, s = (i("fd7f"),
			i("4a22"))
			, c = {
			name: "TemplateItem",
			data: function() {
				return {}
			},
			props: {
				templateInfo: {
					type: Object,
					default: function() {
						return {}
					}
				}
			},
			inject: ["templatePreviewParams"],
			methods: {
				handleToCreate: function(e) {
					var t = e.isCreateEmpty
						, i = e["template_id"]
						, n = e.name
						, o = this.$route.query.path || encodeURIComponent("/");
					t ? this.$ubc.send("wpdoc_tpl_crt_clk") : (Object(s["c"])({
						template_id: i
					}),
					e.recUseTemplate && this.$ubc.send({
						name: "wpdoc_tpl_pre_use",
						ext: {
							tpl_card_clk: i,
							tag: e.tag,
							number: e.recUseTemplate
						}
					}),
						this.$ubc.send({
							name: "wpdoc_tpl_crt_tp_clk",
							ext: {
								tag: e.tag
							}
						}),
						this.$ubc.send({
							name: "wpdoc_tpl_hov_use_clk",
							ext: {
								tpl_card_clk: i,
								tag: e.tag
							}
						})),
						setTimeout((function() {
								var e = "action=create&path=".concat(o);
								!t && (e += "&templateid=".concat(i, "&tplname=").concat(encodeURIComponent(n))),
									window.location.href = "".concat(location.origin, "/doc/edit?").concat(e)
							}
						), 100)
				},
				handlePreview: function(e) {
					this.templatePreviewParams.show = !0,
						this.templatePreviewParams.templateId = e["template_id"],
						this.templatePreviewParams.templateInfo = e,
						this.$ubc.send({
							name: "wpdoc_tpl_hov_pre_clk",
							ext: {
								tpl_card_clk: this.templatePreviewParams.templateId,
								tag: e.tag
							}
						})
				}
			}
		}
			, l = c
			, d = (i("8be1"),
			i("52c5"))
			, u = Object(d["a"])(l, a, r, !1, null, null, null)
			, p = u.exports
			, h = {
			name: "TemplateList",
			components: {
				TemplateItem: p
			},
			props: {
				templateList: {
					defalut: function() {
						return []
					},
					type: Array,
					required: !0
				}
			},
			data: function() {
				return {}
			},
			methods: {}
		}
			, f = h
			, g = (i("1f92"),
			Object(d["a"])(f, n, o, !1, null, null, null))
			, m = g.exports;
		t["default"] = m
	},
	"729d": function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-upload-entryPop"
			}, [i("u-dialog", {
				attrs: {
					title: "请选择插入方式",
					width: "attachment" === e.uploadSourceType ? "500px" : "350px",
					visible: e.dialogVisible
				},
				on: {
					"update:visible": function(t) {
						e.dialogVisible = t
					},
					close: e.closeUploadEntryPop
				}
			}, [i("div", {
				staticClass: "wpdoc-upload-categories"
			}, ["attachment" === e.uploadSourceType ? i("div", {
				staticClass: "btn-filetype-box"
			}, [i("u-button", {
				staticClass: "local"
			}, [e._v("\n                    插入本地文件\n                ")]), i("input", {
				staticClass: "file-input",
				attrs: {
					type: "file",
					accept: "*/*",
					multiple: ""
				},
				on: {
					click: e.handleInputClick,
					change: e.handleLocalUpload
				}
			})], 1) : e._e(), "attachment" === e.uploadSourceType ? i("div", {
				staticClass: "btn-filetype-box"
			}, [i("u-button", {
				staticClass: "local"
			}, [e._v("\n                    插入本地文件夹\n                ")]), i("input", {
				staticClass: "file-input",
				attrs: {
					type: "file",
					webkitdirectory: ""
				},
				on: {
					click: e.handleInputClick,
					change: e.handleLocalUpload
				}
			})], 1) : e._e(), "image" === e.uploadSourceType ? i("div", {
				staticClass: "btn-filetype-box"
			}, [i("u-button", {
				staticClass: "local"
			}, [e._v("\n                    插入本地图片\n                ")]), i("input", {
				staticClass: "file-input",
				attrs: {
					type: "file",
					accept: "image/png,image/gif,image/jpeg,image/jpg,image/bmp,image/webp",
					multiple: ""
				},
				on: {
					click: e.handleInputClick,
					change: function(t) {
						return e.handleLocalUpload(t, "image")
					}
				}
			})], 1) : e._e(), i("u-button", {
				staticClass: "wp",
				on: {
					click: e.handleWPUpload
				}
			}, [e._v(e._s("attachment" === e.uploadSourceType ? "插入网盘文件" : "插入网盘图片"))])], 1)]), i("file-selector-pop", {
				attrs: {
					show: e.fileSelectorPopShow,
					selectDir: e.selectDir,
					maxSelect: e.maxSelect,
					selectCate: e.selectCate
				},
				on: {
					cancel: e.handleCloseFileSelectorPop,
					confirm: e.handleConfirmFileSelectorPop
				}
			})], 1)
		}
			, o = []
			, a = (i("a57e"),
			i("a24c"),
			i("e137"))
			, r = i.n(a)
			, s = (i("c321"),
			i("7200"),
			i("7d06"),
			i("5a0a"))
			, c = (i("ba4a"),
			i("fd7f"),
			i("ec56"),
			i("1738"))
			, l = (i("b693"),
			i("7896"),
			i("2d7b"),
			i("f241"),
			i("0755"),
			i("35c3"),
			i("07a4"))
			, d = i("3fd0")
			, u = i("8af8")
			, p = i("9fd6")
			, h = i("ed9b")
			, f = 4294967296
			, g = {
			name: "UploadEntryPop",
			props: {
				editor: null,
				wpName: ""
			},
			data: function() {
				return {
					uploadFileLength: 0,
					uploadCount: 0,
					dialogVisible: !1,
					fileListShow: !1,
					itemList: [],
					uploadSourceType: "image",
					uploadType: "wp",
					fileSelectorPopShow: !1,
					selectDir: !1,
					maxSelect: 1e3,
					selectCate: "1,2,3,4,5,6,7",
					insetNetdiskImgStartTime: (new Date).getTime()
				}
			},
			components: {
				FileSelectorPop: u["default"]
			},
			computed: {
				isWPUpload: function() {
					return "wp" === this.uploadType
				},
				loginInfo: function() {
					return l["b"].loginInfo
				}
			},
			methods: {
				showUploadEntryPop: function(e) {
					this.uploadSourceType = e,
						"attachment" === e ? (this.selectDir = !0,
							this.selectCate = "1,2,3,4,5,6,7") : "image" === e && (this.selectCate = "3"),
						this.dialogVisible = !0
				},
				closeUploadEntryPop: function() {
					this.dialogVisible = !1
				},
				handleInputClick: function(e) {
					var t = "";
					t = e.target.webkitdirectory ? "edit_insert_local_folder" : "*/*" === e.target.accept ? "edit_insert_local_attachment" : "edit_insert_local_pic",
						this.$ubc.send(t)
				},
				handleLocalUpload: function(e, t) {
					var i = this
						, n = Array.from(e.target.files)
						, o = !!e.target.files[0].webkitRelativePath;
					if (o && 0 === n.length)
						this.$Message({
							type: "error",
							center: !0,
							message: "您选择的文件夹为空！"
						});
					else {
						var a = []
							, r = !1
							, s = n.some((function(n) {
								if ("image" === t) {
									var o = e.target.accept.split(",")
										, s = o.includes(n.type);
									if (r = r || !s,
										!s)
										return !1
								}
								return n.size > f ? (i.$Message({
									type: "error",
									center: !0,
									message: "文件过大，请重新选择，支持4G以内大小"
								}),
									!0) : 0 === n.size ? (i.$Message({
									type: "error",
									center: !0,
									message: "您选择的文件夹中有失效文件，已为您过滤"
								}),
									!1) : void a.push(n)
							}
						));
						if (s)
							e.target.value = "";
						else {
							if (this.closeUploadEntryPop(),
							"image" === t && r) {
								var l = "上传失败，仅支持 gif/png/jpg/jpeg/bmp/webp 格式"
									, d = "文件中有非图片文件或不支持的图片格式，已为您过滤"
									, u = 0 === a.length ? l : d;
								this.$Message({
									type: "error",
									center: !0,
									message: u
								})
							}
							if (0 !== a.length)
								if (a.length > 500)
									this.$Message({
										type: "error",
										center: !0,
										message: "上传文件数量不能超过 500 个！"
									});
								else {
									p["a"].uploadFiles(a, o, this.uploadSourceType),
										e.target.value = "";
									var g = o ? 1 : a.length
										, m = ""
										, v = "";
									if (o ? (m = "edit_insert_local_folder_count",
										v = "lc_folder_num") : "*/*" === e.target.accept ? (m = "edit_insert_local_attachment_count",
										v = "lc_FJ_num") : (m = "edit_insert_local_pic_count",
										v = "local_pic_num"),
										this.$ubc.send({
											name: m,
											ext: Object(c["a"])({}, v, g)
										}),
									"attachment" === this.uploadSourceType && !o) {
										var _ = {
											audioCount: 0,
											videoCount: 0,
											picCount: 0,
											officeCount: 0,
											otherCount: 0
										};
										a.forEach((function(e) {
												h["a"].audioReg.test(e.name) ? _.audioCount++ : h["a"].videoReg.test(e.name) ? _.videoCount++ : h["a"].imageReg.test(e.name) ? _.picCount++ : h["a"].office.test(e.name) ? _.officeCount++ : _.otherCount++
											}
										)),
											["audio", "video", "pic", "office", "other"].forEach((function(e) {
													i.$ubc.send({
														name: "edit_insert_".concat(e, "_count"),
														ext: Object(c["a"])({}, "".concat(e, "_num"), _["".concat(e, "Count")])
													})
												}
											))
									}
								}
						}
					}
				},
				handleWPUpload: function() {
					this.uploadType = "wp",
						this.handleShowFileSelectorPop(),
						this.closeUploadEntryPop(),
					"attachment" === this.uploadSourceType && this.$ubc.send("edit_insert_cloud_attachment")
				},
				fetchFileMetas: function() {
					var e = Object(s["a"])(r.a.mark((function e(t) {
							var i, n, o, a, s;
							return r.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												return i = !1,
													n = t.map((function(e) {
															return e.path
														}
													)),
													e.next = 4,
													Object(d["e"])({
														target: JSON.stringify(n),
														dlink: 1
													});
											case 4:
												if (o = e.sent,
													a = o.info,
													s = o.errno,
												0 === s) {
													e.next = 13;
													break
												}
												return this.$Message({
													type: "error",
													message: "图片插入失败，请重试"
												}),
													i = !0,
													e.abrupt("return");
											case 13:
												a.forEach((function(e) {
														var i = t.find((function(t) {
																return e["fs_id"] === t.fsId
															}
														));
														i.orientation = e.orientation,
															i.resolution = e.resolution,
															i.dlink = e.dlink,
															i.thumbs = e.thumbs.url3
													}
												));
											case 14:
												return e.abrupt("return", i ? "" : t);
											case 15:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t(t) {
						return e.apply(this, arguments)
					}
					return t
				}(),
				handleShowFileSelectorPop: function() {
					this.fileSelectorPopShow = !0
				},
				handleCloseFileSelectorPop: function() {
					this.fileSelectorPopShow = !1
				},
				handleConfirmFileSelectorPop: function() {
					var e = Object(s["a"])(r.a.mark((function e(t) {
							var i, n, o, a, s = this;
							return r.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												if (t.length && (i = "image" === this.uploadSourceType,
													this.$ubc.send({
														name: i ? "edit_insert_cld_pic_count" : "edit_insert_cloud_attachment_count",
														ext: Object(c["a"])({}, "".concat(i ? "cld_pic_num" : "cld_FJ_num"), t.length)
													})),
													n = {
														audioCount: 0,
														videoCount: 0,
														picCount: 0,
														officeCount: 0,
														otherCount: 0,
														folderCount: 0
													},
													t.forEach((function(e) {
															if (1 === e.isdir)
																n.folderCount++;
															else
																switch (e.category) {
																	case 1:
																		n.videoCount++;
																		break;
																	case 2:
																		n.audioCount++;
																		break;
																	case 3:
																		n.picCount++;
																		break;
																	case 4:
																		n.officeCount++;
																		break;
																	default:
																		n.otherCount++
																}
														}
													)),
													["audio", "video", "pic", "office", "other", "folder"].forEach((function(e) {
															s.$ubc.send({
																name: "edit_insert_".concat(e, "_count"),
																ext: Object(c["a"])({}, "".concat(e, "_num"), n["".concat(e, "Count")])
															})
														}
													)),
													this.handleCloseFileSelectorPop(),
													o = this.initFileListInfo(t),
													o) {
													e.next = 8;
													break
												}
												return e.abrupt("return");
											case 8:
												if (a = o,
												"image" !== this.uploadSourceType) {
													e.next = 15;
													break
												}
												return e.next = 12,
													this.fetchFileMetas(o);
											case 12:
												a = e.sent,
													this.insetNetdiskImgStartTime = (new Date).getTime(),
													this.$ubc.send("edit_insert_cloud_pic");
											case 15:
												a && this.editor && this.editor.emit("resource-upload", {
													fileMetas: a
												}),
													"attachment" === this.uploadSourceType ? this.$ubc.send("edit_insert_attachment_success") : this.$ubc.send({
														name: "edit_insert_cloud_pic_success",
														ext: {
															cloudpic_time: (new Date).getTime() - this.insetNetdiskImgStartTime
														}
													});
											case 17:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t(t) {
						return e.apply(this, arguments)
					}
					return t
				}(),
				initFileListInfo: function(e) {
					var t = this;
					if (e.length) {
						var i = e.map((function(e, i) {
								var n = {};
								return t.isWPUpload && (n["fsId"] = e.fs_id,
									n["path"] = e.path,
									n["isDir"] = e.isdir,
									n["size"] = e.size,
									n["category"] = e.category,
									n["wpFile"] = e.wpfile,
									n["title"] = e.server_filename),
									n["type"] = t.uploadSourceType,
									n["process"] = 0,
									n["fileId"] = (new Date).getTime().toString() + i,
									n
							}
						));
						return i
					}
					this.$Message({
						type: "error",
						message: "请选择文件"
					})
				}
			}
		}
			, m = g
			, v = (i("d40a"),
			i("52c5"))
			, _ = Object(v["a"])(m, n, o, !1, null, null, null)
			, y = _.exports;
		t["default"] = y
	},
	7624: function(e, t, i) {
		"use strict";
		i("0132")
	},
	"78f4": function(e, t, i) {},
	7954: function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("section", {
				class: ["wpdoc-layout-general", e.layoutClass]
			}, [i("div", {
				staticClass: "frame-header"
			}, [i("Header", {
				attrs: {
					title: e.title,
					"is-show-back": e.isShowBack,
					onback: e.onback,
					isShowUserInfo: e.isShowUserInfo
				}
			}, [e._t("header-left")], 2)], 1), i("div", {
				ref: "frameContent",
				staticClass: "frame-content",
				style: {
					top: e.frameTop + "px"
				}
			}, [i("div", {
				staticClass: "frame-main"
			}, [e._t("default")], 2)])])
		}
			, o = []
			, a = (i("626b"),
				function() {
					var e = this
						, t = e.$createElement
						, i = e._self._c || t;
					return i("header", {
						staticClass: "layout-general-header"
					}, [i("div", {
						staticClass: "header-left"
					}, [e.isShowBack ? i("div", {
						staticClass: "x-icon x-icon-back",
						on: {
							click: e.onback
						}
					}) : e._e(), e.isShowUserInfo ? e._e() : i("div", {
						staticClass: "template-icon"
					}), i("div", {
						staticClass: "title-box"
					}, [e._v(e._s(e.title))]), e._t("default")], 2), i("div", {
						staticClass: "header-right"
					}, [e.isShowUserInfo ? [e.uk ? i("user-info") : i("u-button", {
						staticClass: "u-doc login-btn",
						attrs: {
							status: "plain",
							size: "small",
							round: ""
						},
						on: {
							click: e.toLogin
						}
					}, [e._v("去登录\n            ")])] : e._e()], 2)])
				}
		)
			, r = []
			, s = i("d53d")
			, c = i("07a4")
			, l = i("a3da")
			, d = {
			name: "GeneralHeader",
			components: {
				UserInfo: s["default"]
			},
			props: {
				title: {
					type: String,
					default: ""
				},
				isShowBack: {
					type: Boolean,
					default: !1
				},
				onback: {
					type: Function,
					default: function() {
						window.globalVue.$router.back()
					}
				},
				isShowUserInfo: {
					type: Boolean,
					default: !0
				}
			},
			computed: {
				uk: function() {
					return c["b"].loginInfo.uk
				}
			},
			methods: {
				toLogin: function() {
					Object(l["a"])()
				}
			}
		}
			, u = d
			, p = (i("600d"),
			i("52c5"))
			, h = Object(p["a"])(u, a, r, !1, null, null, null)
			, f = h.exports
			, g = {
			name: "LayoutGeneral",
			components: {
				Header: f
			},
			props: {
				layoutClass: {
					type: String,
					default: ""
				},
				title: {
					type: String,
					default: ""
				},
				isShowBack: {
					type: Boolean,
					default: !1
				},
				onback: {
					type: Function,
					default: function() {
						window.globalVue.$router.back()
					}
				},
				frameTop: {
					type: [Number, String],
					default: 50
				},
				isShowUserInfo: {
					type: Boolean,
					default: !1
				}
			}
		}
			, m = g
			, v = (i("8fe2"),
			Object(p["a"])(m, n, o, !1, null, null, null))
			, _ = v.exports;
		t["default"] = _
	},
	"7c01": function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wp-frame-all"
			}, [i("Header", {
				attrs: {
					isShowUserInfo: e.isShowUserInfo
				}
			}), i("div", {
				ref: "frameContent",
				staticClass: "frame-content",
				style: {
					height: e.clientHeight + "px"
				}
			}, [i("div", {
				staticClass: "frame-main"
			}, [e._t("container")], 2)])], 1)
		}
			, o = []
			, a = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("header", {
				staticClass: "wpdoc-header"
			}, [i("h1", {
				staticClass: "doc-netdisk-logo",
				attrs: {
					title: "网盘logo"
				}
			}), i("div", {
				staticClass: "header-right"
			}, [e.isShowUserInfo ? i("user-info", {
				staticClass: "user-info"
			}) : i("u-button", {
				staticClass: "u-doc login-btn",
				attrs: {
					size: "small",
					round: "",
					status: "plain"
				},
				on: {
					click: e.toLogin
				}
			}, [e._v("登录")])], 1)])
		}
			, r = []
			, s = i("d53d")
			, c = i("a3da")
			, l = {
			name: "Header",
			components: {
				UserInfo: s["default"]
			},
			props: {
				isShowUserInfo: {
					type: Boolean,
					default: !0
				}
			},
			methods: {
				goMain: function() {
					this.$router.push("/")
				},
				toLogin: function() {
					Object(c["a"])()
				}
			}
		}
			, d = l
			, u = (i("eb6b"),
			i("52c5"))
			, p = Object(u["a"])(d, a, r, !1, null, "58b66c44", null)
			, h = p.exports
			, f = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("aside", {
				staticClass: "wpdoc-aside-right"
			}, [e._v("\n    right\n")])
		}
			, g = []
			, m = {
			name: "AsideRight",
			data: function() {
				return {}
			},
			components: {},
			methods: {}
		}
			, v = m
			, _ = Object(u["a"])(v, f, g, !1, null, null, null)
			, y = _.exports
			, w = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("aside", {
				staticClass: "wpdoc-sidebar-left"
			}, [e._v("\n    left\n")])
		}
			, b = []
			, C = {
			name: "SidebarLeft",
			data: function() {
				return {}
			},
			components: {},
			methods: {}
		}
			, S = C
			, x = Object(u["a"])(S, w, b, !1, null, null, null)
			, k = x.exports
			, T = i("b746")
			, I = i.n(T)
			, O = {
			name: "LayoutSimple",
			components: {
				Header: h,
				AsideRight: y,
				AsideLeft: k
			},
			data: function() {
				return {
					clientHeight: null,
					headerHeight: 60
				}
			},
			props: {
				isShowUserInfo: {
					type: Boolean,
					default: !0
				}
			},
			mounted: function() {
				window.addEventListener("resize", I.a.debounce(this.getFrameHeight, 100))
			},
			methods: {
				getFrameHeight: function() {
					this.clientHeight = document.body.clientHeight - this.headerHeight
				}
			}
		}
			, P = O
			, L = (i("4688"),
			Object(u["a"])(P, n, o, !1, null, null, null))
			, A = L.exports;
		t["default"] = A
	},
	"7caf": function(e, t, i) {},
	"7d53": function(e, t, i) {
		"use strict";
		i.r(t);
		i("fd7f");
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("u-dialog", {
				staticClass: "wpdoc-messageBox",
				attrs: {
					title: e.title,
					width: e.width,
					visible: e.dialogVisible,
					top: e.top,
					modal: e.modal,
					center: e.center
				},
				on: {
					"update:visible": function(t) {
						e.dialogVisible = t
					}
				}
			}, [i("span", [e._v(e._s(e.content))]), i("div", {
				staticClass: "dialog-footer",
				attrs: {
					slot: "footer"
				},
				slot: "footer"
			}, [i("u-button", {
				staticClass: "btn",
				attrs: {
					size: e.button.cancel.size,
					status: e.button.cancel.status,
					round: e.button.cancel.round,
					icon: e.button.cancel.icon
				},
				on: {
					click: e.handleCancel
				}
			}, [e._v("\n            " + e._s(e.button.cancel.text) + "\n        ")]), i("u-button", {
				staticClass: "confirm-btn",
				attrs: {
					size: e.button.confirm.size,
					status: e.button.confirm.status,
					round: e.button.confirm.round,
					icon: e.button.confirm.icon
				},
				on: {
					click: e.handleConfirm
				}
			}, [e._v("\n            " + e._s(e.button.confirm.text) + "\n        ")])], 1)])
		}
			, o = []
			, a = {
			name: "MessageBox",
			data: function() {
				return {
					title: "提示",
					width: "450px",
					content: "",
					dialogVisible: !1,
					top: "40vh",
					modal: !0,
					center: !1,
					button: {
						cancel: {
							cb: function() {},
							text: "取消",
							size: "small",
							status: "normal",
							round: !0,
							icon: ""
						},
						confirm: {
							cb: function() {},
							text: "确定",
							size: "small",
							status: "primary",
							round: !0,
							icon: ""
						}
					}
				}
			},
			methods: {
				close: function() {
					this.dialogVisible = !1
				},
				show: function(e) {
					var t = e.title
						, i = e.content
						, n = e.width
						, o = e.top
						, a = e.modal
						, r = e.center
						, s = e.button;
					s = s || {},
						this.title = t || this.title,
						this.content = i,
						this.width = n || this.width,
						this.top = o || this.top,
						this.modal = a || this.modal,
						this.center = r || this.center,
						this.button.cancel = Object.assign({}, this.button.cancel, s.cancel),
						this.button.confirm = Object.assign({}, this.button.confirm, s.confirm),
						this.dialogVisible = !0
				},
				handleCancel: function() {
					this.dialogVisible = !1,
						this.button.cancel.cb()
				},
				handleConfirm: function() {
					this.dialogVisible = !1,
						this.button.confirm.cb()
				}
			}
		}
			, r = a
			, s = (i("38a8c"),
			i("52c5"))
			, c = Object(s["a"])(r, n, o, !1, null, null, null)
			, l = c.exports
			, d = null;
		function u(e) {
			e.component(l.name, l),
				e.prototype.$MessageBox = function(t) {
					if (d)
						d.show(t);
					else {
						var i = e.extend(l);
						d = new i;
						var n = d.$mount().$el;
						document.body.appendChild(n),
							d.show(t),
							e.prototype.$MessageBox.close = function() {
								d.close()
							}
					}
				}
		}
		t["default"] = {
			install: function(e) {
				u(e)
			}
		}
	},
	8005: function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("general-layout", {
				attrs: {
					"layout-class": "wpdoc-version-layout",
					title: e.title,
					"is-show-back": !0,
					onback: e.handleExitHistory
				},
				scopedSlots: e._u([{
					key: "header-left",
					fn: function() {
						return [e.currentHvInfo ? [i("span", {
							staticClass: "header-currVersion-text"
						}, [e._v("\n                正在查看：" + e._s(e.currentHvName) + " 版本\n            ")]), i("u-button", {
							staticClass: "header-btn-resetVersion",
							attrs: {
								status: "primary",
								size: "small",
								round: ""
							},
							on: {
								click: e.handleRevertThisHv
							}
						}, [e._v("\n                还原到此版本\n            ")])] : e.lastContents ? [i("span", {
							staticClass: "header-currVersion-text"
						}, [e._v("\n                正在查看：" + e._s(e.lastContentsHvName) + " 版本\n            ")])] : e._e()]
					},
					proxy: !0
				}])
			}, [i("section", {
				staticClass: "wpdoc-history-section"
			}, [i("div", {
				staticClass: "wpdoc-editor-out"
			}, [i("div", {
				staticClass: "wpdoc-editor-inbox"
			}, [i("div", {
				attrs: {
					id: "wpdoc-editor-history"
				}
			})])])]), i("aside", {
				staticClass: "wpdoc-hvlist-main"
			}, [i("h3", {
				staticClass: "wpdoc-hvlist-title"
			}, [e._v("历史版本")]), i("div", {
				ref: "hvlistscrollwrap",
				staticClass: "wpdoc-hvlist-conwrap",
				on: {
					"&scroll": function(t) {
						return e.handleHvlistConWrapScroll(t)
					}
				}
			}, [i("div", {
				staticClass: "hv-list"
			}, [i("div", {
				staticClass: "item"
			}, [e.lastContents ? i("div", {
				class: ["hv-lev-item hv-lev1-item", e.lastContents && !e.currentHvInfo ? "is-current" : ""]
			}, [i("div", {
				staticClass: "lev-item-inner",
				on: {
					click: function(t) {
						return t.stopPropagation(),
							e.handleLastContents(t)
					}
				}
			}, [i("h4", {
				staticClass: "lev-name"
			}, [e._v(e._s(e.lastContentsHvName))]), i("div", {
				staticClass: "lev-info"
			}, [i("p", {
				staticClass: "currV-flag"
			}, [e._v("(当前版本)")]), i("p", {
				staticClass: "save-user"
			}, [i("span", {
				staticClass: "username"
			}, [e._v("系统")]), e._v(" 保存")])])])]) : e._e()]), e._l(e.hvList, (function(t, n) {
					return [i("div", {
						key: t["_id"] ? t["_id"] : "emptyLevel1-" + n,
						staticClass: "item"
					}, [t["_id"] ? i("div", {
						class: ["hv-lev-item hv-lev1-item", e.currentHvInfo && e.currentHvInfo["_id"] === t["_id"] ? "is-current" : ""]
					}, [t.childs && t.childs.length > 0 ? i("p", {
						class: ["btn-lev-showicon x-icon x-icon-arrow-b", t.isShowChilds ? "is-show" : "is-hidden"],
						on: {
							click: function(t) {
								return t.target !== t.currentTarget ? null : (t.preventDefault(),
									e.handleChangeLev2HvVisible(n))
							}
						}
					}) : e._e(), i("div", {
						staticClass: "lev-item-inner",
						on: {
							click: function(i) {
								return i.stopPropagation(),
									e.handleChangeCurrentHVInfo(t)
							}
						}
					}, [t.name ? [i("h4", {
						staticClass: "lev-name"
					}, [e._v(e._s(t.name))]), i("div", {
						staticClass: "lev-time"
					}, [e._v(e._s(e._f("filterFormatTime")(t.m.ts)))])] : i("h4", {
						staticClass: "lev-name"
					}, [e._v(e._s(e._f("filterFormatTime")(t.m.ts)))]), i("div", {
						staticClass: "lev-info"
					}, [i("p", {
						staticClass: "save-user"
					}, [i("span", {
						staticClass: "username"
					}, [e._v(e._s("user" === t.source ? t.mUname : "系统"))]), e._v(" 保存")])])], 2), e.currentHvInfo && e.currentHvInfo["_id"] === t["_id"] ? i("p", {
						staticClass: "btn-revert-hv",
						on: {
							click: e.handleRevertThisHv
						}
					}, [i("i", {
						staticClass: "x-icon x-icon-revert"
					}), e._v("\n                                还原\n                            ")]) : e._e()]) : e._e(), t.childs && t.childs.length > 0 ? [i("div", {
						directives: [{
							name: "show",
							rawName: "v-show",
							value: t.isShowChilds,
							expression: "hvLev1Item.isShowChilds"
						}],
						staticClass: "hv-lev2-list"
					}, e._l(t.childs, (function(t) {
							return i("div", {
								key: t["_id"],
								class: ["hv-lev-item hv-lev2-item", e.currentHvInfo && e.currentHvInfo["_id"] === t["_id"] ? "is-current" : ""],
								on: {
									click: function(i) {
										return i.stopPropagation(),
											e.handleChangeCurrentHVInfo(t)
									}
								}
							}, [i("div", {
								staticClass: "lev-item-inner"
							}, [t.name ? [i("h4", {
								staticClass: "lev-name"
							}, [e._v(e._s(t.name))]), i("div", {
								staticClass: "lev-time"
							}, [e._v(e._s(e._f("filterFormatTime")(t.m.ts)))])] : i("h4", {
								staticClass: "lev-name"
							}, [e._v(e._s(e._f("filterFormatTime")(t.m.ts)))]), i("div", {
								staticClass: "lev-info"
							}, [i("p", {
								staticClass: "save-user"
							}, [i("span", {
								staticClass: "username"
							}, [e._v(e._s("user" === t.source ? t.mUname : "系统"))]), e._v(" 保存")])])], 2), e.currentHvInfo && e.currentHvInfo["_id"] === t["_id"] ? i("p", {
								staticClass: "btn-revert-hv",
								on: {
									click: e.handleRevertThisHv
								}
							}, [i("i", {
								staticClass: "x-icon x-icon-revert"
							}), e._v("\n                                        还原\n                                    ")]) : e._e()])
						}
					)), 0)] : e._e()], 2)]
				}
			))], 2), e.hvList.length > 0 && e.isShowHvlistEndText ? i("div", {
				staticClass: "btn-more-hv"
			}, [e._v("\n                " + e._s(e.hvListHasNext ? "正在加载..." : e.isShowHvlistEndText ? "没有更多历史版本啦~" : "") + "\n            ")]) : e._e()])])])
		}
			, o = []
			, a = (i("ba4a"),
			i("ec56"),
			i("2d7b"),
			i("fd7f"),
			i("626b"),
			i("7954"))
			, r = i("98a3")
			, s = i("07a4")
			, c = i("5eb9")
			, l = i.n(c)
			, d = {
			name: "History",
			components: {
				GeneralLayout: a["default"]
			},
			data: function() {
				return {
					hvEditor: null,
					hvLoadingInstance: null,
					currentHvDocData: null,
					currentHvInfo: null,
					currentHvInfoTemp: null,
					hvList: [],
					hvListPage: 0,
					hvListPageCount: 50,
					hvListHasNext: !0,
					isHvListMoreLoading: !1,
					hideLev2Timer: null,
					isShowHvlistEndText: !1
				}
			},
			props: {
				wpFsid: {
					type: [String, Number],
					required: !0,
					default: ""
				},
				title: {
					type: String,
					default: ""
				},
				fileVersion: {
					type: Number,
					default: 1
				},
				lastContents: {
					type: Object,
					default: null
				},
				lastContentsModifytime: {
					type: [Number, String],
					default: 0
				}
			},
			computed: {
				loginInfo: function() {
					return s["b"].loginInfo
				},
				surl: function() {
					return s["b"].shareInfo.surl
				},
				uk: function() {
					return s["b"].loginInfo.uk
				},
				shareId: function() {
					return s["b"].shareInfo.shareId
				},
				currentHvName: function() {
					var e = "未知版本"
						, t = this.currentHvInfo;
					return t && (e = t.name ? t.name : this.formatTime(t.m.ts)),
						e
				},
				lastContentsHvName: function() {
					var e = "未知版本"
						, t = this.lastContents
						, i = this.lastContentsModifytime;
					return t && (e = i ? this.formatTime(i) : "未知版本"),
						e
				}
			},
			watch: {
				hvEditor: function(e) {
					if (!e)
						return null;
					this.hvEditor.setContents(this.lastContents),
						this.getHvList(),
						this.listenerAttachmentClick(),
						this.disableCopy()
				},
				currentHvInfo: function(e) {
					if (!e)
						return null;
					this.getHvData()
				}
			},
			filters: {
				filterFormatTime: function(e) {
					if (!e)
						return "";
					var t = Object(r["formatTime"])(e)
						, i = t.split(" ")[0]
						, n = t.split(" ")[1]
						, o = i.split("-")
						, a = (new Date).getFullYear()
						, s = a !== parseInt(o[0], 10) ? "".concat(o[0], "年") : "";
					return "".concat(s).concat(o[1], "月").concat(o[2], "日 ").concat(n)
				}
			},
			mounted: function() {
				this.initEditor()
			},
			methods: {
				initEditor: function() {
					this.pageStatus = "initEditor",
						this.hvEditor = new l.a({
							container: "wpdoc-editor-history",
							pagePadding: {
								top: "96px",
								bottom: "96px",
								left: "100px",
								right: "100px"
							},
							loginInfo: this.loginInfo,
							fileParams: {
								docid: "".concat(this.wpFsid),
								appid: "250528",
								clienttype: 0,
								bdstoken: "".concat(this.loginInfo.bdstoken),
								uk: this.uk,
								surl: this.surl,
								shareId: this.shareId
							},
							readOnly: !0,
							notWebsocket: !0,
							modules: {
								blotViewerSwitch: !0,
								imagePreview: {
									registClick: !0
								}
							},
							callback: function() {}
						})
				},
				handleExitHistory: function() {
					s["a"].setShowHistory(!1)
				},
				getHvList: function() {
					var e = this;
					this.isHvListMoreLoading = !0,
						this.hvEditor.getFileVersionList({
							page: this.hvListPage,
							pageCount: this.hvListPageCount
						}, (function(t) {
								if (e.isHvListMoreLoading = !1,
								t && 0 === t.errno) {
									var i = t.data;
									if (i && i.length > 0 && i[0].v >= e.fileVersion) {
										var n = i.splice(0, 1)[0]
											, o = n.m.ts;
										e.$emit("update:lastContentsModifytime", o)
									}
									i.forEach((function(t, i) {
											if ("level2" === t.type && 0 === e.hvList.length) {
												var n = {
													isShowChilds: !0,
													childs: []
												};
												e.hvList.push(n)
											}
											if ("level2" === t.type) {
												var o = e.hvList.length;
												e.hvList[o - 1].childs.push(t)
											}
											if ("level1" === t.type) {
												e.hvList.push(t);
												var a = e.hvList.length;
												e.$set(e.hvList[a - 1], "childs", []),
													e.$set(e.hvList[a - 1], "isShowChilds", !0)
											}
										}
									)),
										e.isShowHvlistEndText = 0 !== e.hvListPage || i && i.length > 8,
										e.hvListHasNext = i && i.length >= e.hvListPageCount,
									e.hvListHasNext && (e.hvListPage += 1)
								} else
									e.$Message({
										type: "error",
										message: t.errmsg || "获取历史版本列表失败",
										center: !0
									})
							}
						))
				},
				handleHvlistConWrapScroll: function(e) {
					var t = e.target || e
						, i = t.clientHeight
						, n = t.scrollHeight
						, o = t.scrollTop;
					if (n <= i && !this.hvListHasNext || this.isHvListMoreLoading || !this.hvListHasNext)
						return !1;
					var a = n - (o + i);
					a < .2 * i && this.getHvList()
				},
				getHvData: function() {
					var e = this;
					this.hvLoadingInstance = this.$Loading({
						background: "rgba(255, 255, 255, 0.2)",
						text: "正在获取数据，请耐心等待..."
					}),
						this.hvEditor.getFileDelta((function(t) {
								e.hvLoadingInstance.close(),
									t && 0 === t.errno ? e.currentHvDocData = t.data : (e.currentHvInfo = e.currentHvInfoTemp,
										e.$Message({
											type: "error",
											message: "此版本数据获取失败 请稍后再试",
											center: !0
										}))
							}
						), this.currentHvInfo["_id"])
				},
				handleChangeCurrentHVInfo: function(e) {
					this.currentHvInfoTemp = JSON.parse(JSON.stringify(this.currentHvInfo)),
						this.currentHvInfo = e
				},
				handleLastContents: function() {
					this.hvEditor.setContents(this.lastContents),
						this.currentHvInfo = null,
						this.currentHvDocData = null
				},
				handleRevertThisHv: function() {
					var e = this
						, t = this.currentHvInfo
						, i = t.name ? t.name : this.formatTime(t.m.ts);
					this.$MessageBox({
						title: "确认将文档还原到该版本吗？",
						content: "将还原到“".concat(i, "”的版本，该操作不会覆盖或删除已有的版本"),
						button: {
							confirm: {
								text: "还原",
								cb: function() {
									s["a"].setShowHistory(!1),
										e.$emit("revert-historyversion", e.currentHvDocData.data),
										e.$ubc.send("wpdoc_edit_restore_hv")
								}
							}
						}
					})
				},
				handleChangeLev2HvVisible: function(e) {
					var t = this
						, i = this.hvList[e].isShowChilds;
					if (this.$set(this.hvList[e], "isShowChilds", !i),
						!i)
						return clearTimeout(this.hideLev2Timer),
							!1;
					this.hideLev2Timer = setTimeout((function() {
							t.handleHvlistConWrapScroll(t.$refs.hvlistscrollwrap),
								clearTimeout(t.hideLev2Timer)
						}
					), 200)
				},
				disableCopy: function() {
					var e = this;
					document.querySelector(".ql-editor").oncopy = function() {
						return !1
					}
						,
						this.hvEditor.on("show-toast", (function(t) {
								var i = t.type
									, n = void 0 === i ? "info" : i
									, o = t.msg
									, a = void 0 === o ? "" : o;
								e.$Message({
									type: n,
									message: a
								})
							}
						))
				},
				listenerAttachmentClick: function() {
					var e = this;
					this.hvEditor.on("attachment-click", (function(t) {
							e.$ubc.send("edit_insert_attachment_open"),
								window.open("//pan.baidu.com/s/9/".concat(e.surl, "?fid=").concat(t.fsId))
						}
					))
				},
				formatTime: function(e) {
					if (!e)
						return "";
					var t = Object(r["formatTime"])(e)
						, i = t.split(" ")[0]
						, n = t.split(" ")[1]
						, o = i.split("-")
						, a = (new Date).getFullYear()
						, s = a !== parseInt(o[0], 10) ? "".concat(o[0], "年") : "";
					return "".concat(s).concat(o[1], "月").concat(o[2], "日 ").concat(n)
				}
			}
		}
			, u = d
			, p = (i("1047"),
			i("52c5"))
			, h = Object(p["a"])(u, n, o, !1, null, null, null)
			, f = h.exports;
		t["default"] = f
	},
	8074: function(e, t, i) {},
	8807: function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", [e.popShow ? i("div", {
				staticClass: "v-modal"
			}) : e._e(), i("u-dialog", {
				staticClass: "titlebar report-dialog",
				attrs: {
					title: "举报",
					width: "480px",
					visible: e.popShow,
					modal: !1
				},
				on: {
					"update:visible": function(t) {
						e.popShow = t
					},
					close: function(t) {
						return e.$emit("close")
					}
				}
			}, [i("div", {
				staticClass: "report-msg"
			}, [i("ol", [i("li", [e._v("影视、音乐、软件、文学等版权类和其他侵权投诉"), i("a", {
				attrs: {
					target: "_blank",
					href: "http://copyright.baidu.com/index.php/index/complaint"
				}
			}, [e._v("侵权投诉")])]), i("li", {
				staticClass: "report-mt20"
			}, [e._v("违法有害信息，请在下方选择原因提交举报。")])]), i("div", {
				staticClass: "report-reason",
				attrs: {
					"node-type": "report-reason"
				}
			}, [i("p", {
				staticClass: "report-reason-title"
			}, [e._v("举报原因：")]), i("u-radio", {
				attrs: {
					label: "2"
				},
				model: {
					value: e.reportType,
					callback: function(t) {
						e.reportType = t
					},
					expression: "reportType"
				}
			}, [e._v("淫秽色情")]), i("u-radio", {
				attrs: {
					label: "3"
				},
				model: {
					value: e.reportType,
					callback: function(t) {
						e.reportType = t
					},
					expression: "reportType"
				}
			}, [e._v("血腥暴力")]), i("u-radio", {
				attrs: {
					label: "4"
				},
				model: {
					value: e.reportType,
					callback: function(t) {
						e.reportType = t
					},
					expression: "reportType"
				}
			}, [e._v("政治有害")]), i("u-radio", {
				attrs: {
					label: "5"
				},
				model: {
					value: e.reportType,
					callback: function(t) {
						e.reportType = t
					},
					expression: "reportType"
				}
			}, [e._v("其他违反法律法规")])], 1), i("u-button", {
				staticClass: "report-submit",
				attrs: {
					size: "medium",
					status: "primary"
				},
				on: {
					click: e.submit
				}
			}, [e._v("提交")])], 1)])], 1)
		}
			, o = []
			, a = i("e137")
			, r = i.n(a)
			, s = (i("7d06"),
			i("5a0a"))
			, c = i("07a4")
			, l = i("3fd0")
			, d = {
			name: "Report",
			props: {
				reportPopShow: !1
			},
			data: function() {
				return {
					reportType: "2",
					popShow: !1
				}
			},
			watch: {
				reportPopShow: function(e) {
					this.popShow = e
				}
			},
			computed: {
				authorUk: function() {
					return c["b"].shareInfo.authorUk
				},
				docid: function() {
					return c["b"].shareInfo.docid
				},
				bdstoken: function() {
					return c["b"].loginInfo.bdstoken
				}
			},
			methods: {
				submit: function() {
					var e = Object(s["a"])(r.a.mark((function e() {
							var t, i;
							return r.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												return t = {
													type: this.reportType,
													uk: this.authorUk,
													url: location.href,
													id: JSON.stringify([this.docid]),
													bdstoken: this.bdstoken
												},
													e.next = 3,
													Object(l["i"])(t);
											case 3:
												i = e.sent,
													this.$emit("close"),
													!i || 0 !== i.errno && -8 !== i.errno ? this.$Message({
														type: "error",
														message: "举报失败,请稍后再试"
													}) : this.$Message({
														type: "success",
														message: "举报成功,谢谢您的举报我们会尽快处理"
													});
											case 6:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t() {
						return e.apply(this, arguments)
					}
					return t
				}()
			}
		}
			, u = d
			, p = (i("3367"),
			i("52c5"))
			, h = Object(p["a"])(u, n, o, !1, null, null, null)
			, f = h.exports;
		t["default"] = f
	},
	"888b": function(e, t, i) {},
	"89b2": function(e, t, i) {
		"use strict";
		i("de6f")
	},
	"8af8": function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("transition", {
				attrs: {
					name: "dialog-fade"
				}
			}, [e.show ? i("div", {
				staticClass: "wpdoc-fileSelectorPop",
				on: {
					click: function(t) {
						return t.target !== t.currentTarget ? null : e.close(t)
					}
				}
			}, [i("div", {
				staticClass: "wpdoc-fileSelectorPop-content"
			}, [i("file-selector", {
				attrs: {
					selectDir: e.selectDir,
					maxSelect: e.maxSelect,
					selectCate: e.selectCate
				},
				on: {
					confirm: e.confirm,
					close: e.close
				}
			})], 1)]) : e._e()])
		}
			, o = []
			, a = (i("626b"),
			i("27ae"))
			, r = {
			name: "FileSelectorPop",
			props: {
				show: {
					type: Boolean,
					default: !1
				},
				selectDir: {
					type: [Number, Boolean],
					default: !0
				},
				selectCate: {
					type: String,
					default: ""
				},
				maxSelect: {
					type: Number,
					default: 100
				}
			},
			data: function() {
				return {}
			},
			components: {
				FileSelector: a["default"]
			},
			methods: {
				close: function() {
					this.$emit("cancel")
				},
				confirm: function(e) {
					this.$emit("confirm", e)
				}
			}
		}
			, s = r
			, c = (i("b31f"),
			i("52c5"))
			, l = Object(c["a"])(s, n, o, !1, null, null, null)
			, d = l.exports;
		t["default"] = d
	},
	"8be1": function(e, t, i) {
		"use strict";
		i("8074")
	},
	"8bea": function(e, t, i) {
		"use strict";
		i.d(t, "a", (function() {
				return o
			}
		));
		i("626b");
		var n = i("a3da")
			, o = {
			"-1234567890": "网络异常 请稍后再试",
			"-1": "内部错误",
			"-6": "对不起，登录信息无效，请重新登录",
			1: "对不起，服务器出错了，请稍后再试",
			2: "请求参数错误",
			"-10": "空间不足",
			"-90": "文件名不合法",
			"-100": "文件大小为空",
			"-110": "文件最大限制为20G",
			"-111": "超出4G限制",
			"-112": "超出4G限制",
			"-113": "超出4G限制",
			"-114": "超出4G限制",
			"-130": "超出个数限制",
			"-1009": "任务已存在",
			9100: "功能被封禁",
			9200: "功能被封禁",
			9300: "功能被封禁",
			9400: "功能被封禁",
			9500: "功能被封禁",
			18e3: "服务器异常",
			18902: "无权限访问该文档",
			18903: "文档已删除",
			31047: "页面过期，请刷新",
			"010": "任务超时",
			"020": "服务器错误",
			"030": "链接超时",
			121: "文件数过多，请删至500万个以内再上传",
			"050": "文件读取异常"
		};
		t["b"] = function(e) {
			var t = e.headers && e.headers["http-x-isis-logid"] || 0
				, i = e.headers && e.headers["logid"] || 0;
			if (e.status >= 400) {
				window.globalVue.$bus.$emit("error");
				var a = "网络或请求异常";
				switch (e.status) {
					case 400:
						a = "请求错误";
						break;
					case 401:
						a = "未授权 请登录";
						break;
					case 403:
						a = "拒绝访问";
						break;
					case 404:
						a = "请求地址出错";
						break;
					case 408:
						a = "请求超时";
						break;
					case 500:
						a = "网络或服务异常";
						break;
					case 501:
						a = "服务未实现";
						break;
					case 502:
						a = "网关错误";
						break;
					case 503:
						a = "服务不可用";
						break;
					case 504:
						a = "网关超时";
						break;
					case 505:
						a = "HTTP版本不受支持";
						break;
					default:
						a = "网络或请求异常";
						break
				}
				return e.config.silent || window.globalVue.$Message({
					type: "error",
					message: a
				}),
					{
						hasError: !0,
						errStatus: e.status,
						"HTTP-X-ISIS-LOGID": t,
						logid: i
					}
			}
			var r = e.data || {}
				, s = Number(r.errno);
			if (isNaN(s) && (s = -1),
				r["HTTP-X-ISIS-LOGID"] = t,
				r.logid = i,
			0 !== s && 18901 !== s) {
				r.hasError = !0;
				var c = r.errorMsg = o[s] || "未知错误(".concat(s, ", ").concat(r.request_id, ")")
					, l = /\/share\//.test(window.location.pathname);
				if (-6 === +s && !l)
					return window.globalVue.$MessageBox({
						title: "登录失效",
						content: c,
						button: {
							confirm: {
								cb: function() {
									Object(n["a"])()
								}
							}
						}
					}),
						r;
				e.config.silent || l && -6 === +s || window.globalVue.$Message({
					type: "error",
					message: c
				})
			}
			return r
		}
	},
	"8fe2": function(e, t, i) {
		"use strict";
		i("cbc9")
	},
	9063: function(e, t, i) {},
	"98a3": function(e, t, i) {
		"use strict";
		i.r(t),
			i.d(t, "formatTime", (function() {
					return n
				}
			)),
			i.d(t, "getDuration", (function() {
					return o
				}
			));
		i("a57e"),
			i("a24c"),
			i("8ec3");
		function n(e, t) {
			var i = 0;
			if (!e)
				return "";
			var n = 13 - String(e).length;
			while (n--)
				e *= 10;
			i = new Date(e);
			var o = t && "mm" === t ? "" : ":".concat(i.getSeconds().toString().padStart(2, "0"));
			return i.getFullYear() + "-" + (i.getMonth() + 1).toString().padStart(2, "0") + "-" + i.getDate().toString().padStart(2, "0") + " " + i.getHours().toString().padStart(2, "0") + ":" + i.getMinutes().toString().padStart(2, "0") + o
		}
		function o(e) {
			var t = 60
				, i = 6e3;
			return e < t ? "00:" + Math.floor(e % t / 1e3).toString().padStart(2, 0) : e >= t && e < i ? Math.floor(e % i / t).toString().padStart(2, 0) + ":" + Math.floor((e - t) % t).toString().padStart(2, 0) : Math.floor(e / i).toString().padStart(2, 0) + ":" + Math.floor((e - i) % i / t).toString().padStart(2, 0) + ":" + Math.floor((e - i - t) % t).toString().padStart(2, 0)
		}
	},
	"9f1a": function(e, t, i) {},
	"9fd6": function(e, t, i) {
		"use strict";
		i.d(t, "a", (function() {
				return z
			}
		));
		i("fd7f"),
			i("a57e"),
			i("a24c");
		var n = i("e137")
			, o = i.n(n)
			, a = (i("44fa"),
			i("626b"),
			i("2d7b"),
			i("abfb"),
			i("7d06"),
			i("5a0a"))
			, r = (i("061a"),
			i("ba4a"),
			i("ec56"),
			i("c8ce"))
			, s = i("ce61")
			, c = i("1738")
			, l = i("3fd0")
			, d = i("8bea")
			, u = i("e487")
			, p = (i("cdea"),
			i("a583"),
			i("a6f9"),
			i("ccbb"),
			i("57df"),
			i("ed20"))
			, h = i("1ab6")
			, f = i("9188")
			, g = i("6e77")
			, m = i.n(g);
		function v(e) {
			var t = document.cookie.match("(^|;) ?" + e + "=([^;]*)(;|$)");
			return t ? t[2] : null
		}
		function _() {
			var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~！@#￥%……&"
				, t = String.fromCharCode
				, i = function(e) {
				var i = "";
				return e.length < 2 ? (i = e.charCodeAt(0),
					i < 128 ? e : i < 2048 ? t(192 | i >>> 6) + t(128 | 63 & i) : t(224 | i >>> 12 & 15) + t(128 | i >>> 6 & 63) + t(128 | 63 & i)) : (i = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320),
				t(240 | i >>> 18 & 7) + t(128 | i >>> 12 & 63) + t(128 | i >>> 6 & 63) + t(128 | 63 & i))
			}
				, n = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
				, o = function(e) {
				return (e + "" + Math.random()).replace(n, i)
			}
				, a = function(t) {
				var i = [0, 2, 1][t.length % 3]
					, n = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0)
					, o = [e.charAt(n >>> 18), e.charAt(n >>> 12 & 63), i >= 2 ? "=" : e.charAt(n >>> 6 & 63), i >= 1 ? "=" : e.charAt(63 & n)];
				return o.join("")
			}
				, r = function(e) {
				return e.replace(/[\s\S]{1,3}/g, a)
			}
				, s = function(e) {
				return r(o((new Date).getTime()))
			}
				, c = function(e, t) {
				return t ? s(String(e)).replace(/[+\/]/g, (function(e) {
						return "+" === e ? "-" : "_"
					}
				)).replace(/=/g, "") : s(String(e))
			};
			return c(v("BAIDUID"))
		}
		function y(e, t, i) {
			var n = arguments
				, o = new XMLHttpRequest
				, a = new FormData;
			return a.append("file", t),
				o.upload.onabort = function() {}
				,
				o.onreadystatechange = function() {
					if (4 === o.readyState) {
						var e = o.responseText;
						if ("string" === typeof e)
							try {
								e = JSON.parse(e)
							} catch (t) {}
						200 === o.status ? i.onsuccess(e.md5) : e ? i.onerror(e.error_code, e, o) : i.onerror(void 0, e, o)
					}
				}
				,
				o.upload.onprogress = function(e) {
					i.onprogress(e)
				}
				,
				o.open("POST", e, !0),
				o.timeout = 72e4,
				o.ontimeout = function(e) {
					i.onerror("030")
				}
				,
				o.withCredentials = !0,
				o.send(a),
				o.onerror = function() {
					console.log("[xhr onerrro]:", n)
				}
				,
				o
		}
		var w = {
			getLogId: _,
			callXHR: y
		}
			, b = (i("5413"),
			{
				locateUpload: "//pcs.baidu.com/rest/2.0/pcs/file?method=locateupload",
				precreate: "/youai/file/v1/precreate",
				createFile: "/youai/file/v1/create"
			});
		function C(e, t) {
			(window.TS_DATA || {}).XDUSS;
			var i = "//" + e + "/rest/2.0/pcs/superfile2?method=upload&logid=" + w.getLogId();
			return t ? i + "&" + t : i
		}
		function S(e) {
			return new Promise((function(t, i) {
					var n = new XMLHttpRequest;
					n.onreadystatechange = function() {
						4 === n.readyState && (0 === n.status ? i(e) : (n.abort(),
							t(e)))
					}
					;
					try {
						var o = C(e);
						n.open("POST", o, !0),
							n.withCredentials = !0,
							n.send(new FormData)
					} catch (a) {
						i(e)
					}
				}
			))
		}
		function x(e) {
			return new Promise((function(t, i) {
					var n = new XMLHttpRequest;
					n.withCredentials = !0,
						n.open("get", e, !0),
						n.onreadystatechange = function() {
							if (4 === this.readyState) {
								var e = /^2\d{2}$/.test(this.status);
								e ? t(JSON.parse(n.responseText)) : t()
							}
						}
						,
						n.onerror = t,
						n.send()
				}
			))
		}
		var k = sessionStorage.getItem("upload_endpoint") || ""
			, T = !1
			, I = []
			, O = null
			, P = {
			init: function(e, t, i) {
				O = e,
				t && (b.precreate = t),
				i && (b.createFile = i)
			},
			preCreate: function(e, t) {
				return O ? O.post(b.precreate, e, {
					params: t
				}) : new Promise((function(e, t) {
						throw console.error("not set XMLHttpRequest"),
							new Error("not set XMLHttpRequest")
					}
				))
			},
			create: function(e, t) {
				return O ? O.post(b.createFile, e, {
					params: t
				}) : new Promise((function(e, t) {
						throw console.error("not set XMLHttpRequest"),
							new Error("not set XMLHttpRequest")
					}
				))
			},
			getPCSLink: C,
			initEndpoint: function() {
				return k ? Promise.resolve(k) : T ? new Promise((function(e) {
						I.push(e)
					}
				)) : (T = !0,
					x(b.locateUpload).then((function(e) {
							var t = ["c4.pcs.baidu.com"];
							return e && null != e.server ? [].concat(e.server, t) : t
						}
					)).then((function(e) {
							return e.reduce((function(e, t) {
									return e.then((function(e) {
											return e || t
										}
									)).catch((function() {
											return S(t)
										}
									))
								}
							), Promise.reject())
						}
					)).then((function(e) {
							return T = !1,
								sessionStorage.setItem("upload_endpoint", k = e),
								I.forEach((function(e) {
										e(k)
									}
								)),
								k
						}
					)))
			}
		};
		function L(e) {
			var t = A();
			return function() {
				var i, n = Object(f["a"])(e);
				if (t) {
					var o = Object(f["a"])(this).constructor;
					i = Reflect.construct(n, arguments, o)
				} else
					i = n.apply(this, arguments);
				return Object(h["a"])(this, i)
			}
		}
		function A() {
			if ("undefined" === typeof Reflect || !Reflect.construct)
				return !1;
			if (Reflect.construct.sham)
				return !1;
			if ("function" === typeof Proxy)
				return !0;
			try {
				return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
				))),
					!0
			} catch (e) {
				return !1
			}
		}
		var j = 4194304
			, E = -1
			, F = -2
			, D = -3
			, M = -4
			, H = -5
			, $ = File && (File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice);
		var N = function(e) {
			Object(p["a"])(i, e);
			var t = L(i);
			function i(e) {
				var n;
				Object(r["a"])(this, i),
					n = t.call(this);
				var o = e || {}
					, a = o.useChunks
					, s = void 0 === a || a
					, c = o.threadCount
					, l = void 0 === c ? 5 : c
					, d = o.chunkRetryLimit
					, u = void 0 === d ? 2 : d
					, p = o.autoUpload
					, h = void 0 === p || p
					, f = o.specialReg
					, g = void 0 === f ? "" : f
					, m = o.preCreateUrl
					, v = o.createFileUrl
					, _ = o.forbidden
					, y = void 0 === _ || _
					, w = o.preParamsCallback
					, b = o.commitParamsCallback
					, C = e && e.xhr || i._options && i._options.xhr;
				if (!C)
					throw new Error("缺少 axios 参数，可通过 setOptions或new Uploader 传递");
				return C && P.init(C, m, v),
				C && n.getEndPoint(),
					n.autoUpload = h,
					n.uploadLimit = 3,
					n.fileQueue = [],
					n.uploadIndex = 0,
					n.chunkRetryLimit = u,
					n.forbidden = y,
					n.preParamsCallback = w,
					n.commitParamsCallback = b,
					n.threadCount = l,
					n.useChunks = s,
					n.pcsEndpoint = "",
					n.params = e.params || {},
					n.uploadErrorChunksIndex = {},
					n.uploadingCount = 0,
					n.isClosed = !1,
					n.isSpecial = !1,
					g,
					n
			}
			return Object(s["a"])(i, [{
				key: "getEndPoint",
				value: function() {
					var e = this;
					P.initEndpoint().then((function(t) {
							if (!t)
								throw new Error;
							e.pcsEndpoint = t,
								e.emit("load")
						}
					)).catch((function(t) {
							console.log("获取pcs可用域名失败", t),
								e.emit("exception")
						}
					))
				}
			}, {
				key: "append",
				value: function(e) {
					if (e && !this.isClosed) {
						e && "undefined" === typeof e.length && (e = [e]);
						for (var t, i = e.length + this.fileQueue.length, n = [], o = 0, a = e.length; o < a; o++)
							t = e[o],
							t.status !== D && (t.status = E),
								t.index = this.fileQueue.length,
								t.path = "/" + t.name,
								this.fileQueue.push(t);
						this.fileQueue.length !== i && (this.emit("forbidden", n),
							this.forbidden) || (this.emit("ready"),
						this.autoUpload && this.upload())
					}
				}
			}, {
				key: "upload",
				value: function(e) {
					if (this.pcsEndpoint) {
						e = Number(e);
						var t = null
							, i = e > -1;
						if (this.uploadingCount > this.uploadLimit)
							i && (t = this.fileQueue[e],
								t.status = E);
						else if (i) {
							if (t = this.fileQueue[e],
								!t)
								return;
							t.status !== E && t.status !== D || (t.status = F,
								clearInterval(t.progressInterval),
								this.isSpecial = !0,
								this.handleFileData(t))
						} else if (t = this.fileQueue[this.uploadIndex],
							t)
							t.status === E || t.status === D ? (t.status = F,
								this.isSpecial = !1,
								this.handleFileData(t),
								this.uploadIndex++) : (this.uploadIndex++,
								this.upload());
						else
							for (var n, o = 0, a = this.fileQueue.length; o < a; o++)
								if (n = this.fileQueue[o],
								n.status === E) {
									this.uploadIndex = o,
										this.upload();
									break
								}
					}
				}
			}, {
				key: "handleFileData",
				value: function(e) {
					var t = this
						, i = this;
					this.uploadingCount++,
						this.preCreate(e).then((function(n) {
								var o = n.return_type
									, a = n.errno;
								o && 1 === +o ? t.createFile(e).then((function() {
										i.uploadingCount > 0 && i.uploadingCount--,
										!t.isSpecial && i.upload()
									}
								)) : (a ? t.emit("error", e, n) : t.emit("success", e, n),
								i.uploadingCount > 0 && i.uploadingCount--,
								!t.isSpecial && i.upload())
							}
						)).catch((function(n) {
								console.log("error:", n),
									e.status = D,
									t.emit("error", e, n),
								i.uploadingCount > 0 && i.uploadingCount--,
								!t.isSpecial && i.upload()
							}
						))
				}
			}, {
				key: "preCreate",
				value: function(e) {
					var t = this
						, i = ["5910a591dd8fc18c32a8f3df4fdc1761"];
					e.size > j && (i = ["5910a591dd8fc18c32a8f3df4fdc1761", "a5fc157d78e6ad1c7e114b056c92821e"]);
					var n = this.uploadErrorChunksIndex[e.index];
					if (n && n.length && e.uploadId)
						return new Promise((function(e, t) {
								return e()
							}
						));
					var o = {
						autoinit: 1,
						block_list: JSON.stringify(i)
					};
					if ("function" === typeof this.preParamsCallback) {
						var a = this.preParamsCallback(e);
						return a instanceof Promise ? a.then((function(i) {
								return o = Object.assign(o, i.data),
									t.precreateRequest(e, o, i.query)
							}
						)) : (o = Object.assign(o, a.data),
							this.precreateRequest(e, o, a.query))
					}
					return this.precreateRequest(e, o)
				}
			}, {
				key: "precreateRequest",
				value: function(e, t) {
					return P.preCreate(t).then((function(t) {
							return t.hasError ? e.status = D : e.uploadId = t.uploadid,
								t
						}
					)).catch((function(e) {
							throw new Error(e)
						}
					))
				}
			}, {
				key: "pause",
				value: function(e) {
					var t = this.fileQueue[e];
					t.status = H,
						clearInterval(t.progressInterval),
						t.terminate = !0,
					this.uploadingCount > 0 && this.uploadingCount--
				}
			}, {
				key: "start",
				value: function(e) {
					var t = this
						, i = this.fileQueue[e]
						, n = this.uploadErrorChunksIndex[i.index];
					i.status !== D || n ? (i.status = F,
						this.uploadingCount++,
						this.uploadingCount > this.uploadLimit ? i.status = E : this.createFile(i).then((function() {
								t.uploadingCount > 0 && t.uploadingCount--,
								!t.isSpecial && t.upload()
							}
						))) : this.upload(e)
				}
			}, {
				key: "delete",
				value: function(e) {
					var t = this.fileQueue[e];
					t.status = H,
						clearInterval(t.progressInterval),
					this.uploadErrorChunksIndex[t.index] && (this.uploadErrorChunksIndex[t.index] = null),
					this.uploadingCount > 0 && this.uploadingCount--
				}
			}, {
				key: "deleteAll",
				value: function() {
					var e = this;
					this.fileQueue.forEach((function(t) {
							e.pause(t.index)
						}
					)),
						this.fileQueue = []
				}
			}, {
				key: "createFile",
				value: function(e) {
					var t = this
						, i = this.uploadErrorChunksIndex
						, n = i[e.index];
					return n && n.sort(),
						new Promise((function(i) {
								t.invoke(e, n, i)
							}
						)).then((function() {
								return e.status !== H ? t.commit(e) : {}
							}
						)).then((function(i) {
								if (i.hasError)
									return e.status = D,
										void t.emit("error", e, i);
								e.status !== H && t.emit("success", e, i || {})
							}
						)).catch((function(i) {
								console.log("error:", i),
									e.status = D,
									t.emit("error", e, i)
							}
						))
				}
			}, {
				key: "invoke",
				value: function(e, t, i) {
					var n = this;
					!e.completeChunks && (e.blockList = []);
					var o = this
						, a = this.useChunks
						, r = a ? Math.ceil(e.size / j) : 1
						, s = -1
						, c = []
						, l = 0
						, d = ""
						, u = ""
						, p = !1
						, h = Date.now()
						, f = 0;
					if (e.terminate && (f = e.completeChunks || 0),
						l = f * j,
					e.status !== H) {
						e.progressInterval = setInterval((function() {
								n.emit("progress", e, l / e.size, Date.now() - h)
							}
						), 800);
						var g = function n(a, c, l) {
							if (!c && (a || (f++,
								e.completeChunks = (e.completeChunks || 0) + 1),
							f >= r || !e.terminate && t && f >= t.length))
								return clearInterval(e.progressInterval),
									o.emit("progress", e, e.size / e.size),
									void (e.status !== M && i());
							if (e.status !== M) {
								var d;
								if (void 0 !== l)
									return d = b(l),
										void C(d, l, n);
								if (!t && e.status !== H && (d = b()),
								e.terminate && t && (d = b()),
									d)
									C(d, s, n);
								else if (e.status !== H) {
									var u = y();
									null !== u && (u > -1 ? C(b(u), u, n) : e.status !== D && (o.emit("error", e, a),
										clearInterval(e.progressInterval),
										e.status = D,
									o.uploadingCount > 0 && o.uploadingCount--,
									!o.isSpecial && o.upload()))
								} else
									p || (i(),
										p = !0)
							}
						};
						if (t)
							t.forEach((function(e) {
									g(!1, !0, e)
								}
							));
						else
							for (var m = 0, v = Math.min(this.threadCount, r); m < v; m++)
								setTimeout((function() {
										g(!1, !0)
									}
								), 0)
					} else
						i();
					function _(t, i) {
						l -= c[t] || 0,
							c[t] = i,
							l += i,
						l >= e.size && (clearInterval(e.progressInterval),
							o.emit("progress", e, e.size / e.size))
					}
					function y() {
						if (!d)
							return null;
						var e = parseInt((d.match(/\d+/) || [])[0], 10);
						if (isNaN(e))
							return null;
						var t = new RegExp("\\|" + e + "\\|","g");
						return d = d.replace(t, ""),
							u.match(t).length > o.chunkRetryLimit ? -1 : e
					}
					function b(t) {
						if ("number" !== typeof t) {
							if (++s >= r)
								return null;
							t = s
						}
						if (!a)
							return e;
						var i = t * j
							, n = i + j >= e.size ? e.size : i + j;
						return i >= n ? null : $.call(e, i, n)
					}
					function C(t, i, n) {
						if (e.status !== M && e.status !== D)
							var a = o.params
								, r = a.app_id
								, s = void 0 === r ? "250528" : r
								, c = a.channel
								, l = void 0 === c ? "chunlei" : c
								, p = a.clienetype
								, h = void 0 === p ? "" : p
								, f = a.web
								, g = void 0 === f ? 1 : f
								, m = "app_id=" + s + "&channel=" + l + "&clienttype=" + h + "&web=" + g + "&path=" + encodeURIComponent(e.path) + "&uploadid=" + (e.uploadId || 0) + "&partseq=" + (i || 0)
								, v = P.getPCSLink(o.pcsEndpoint, m)
								, y = w.callXHR(v, t, {
								onsuccess: function(o) {
									_(i, t.size),
										e.blockList[i] = o,
										n()
								},
								onerror: function(t) {
									d += "|" + i + "|",
										u += "|" + i + "|";
									var a = o.uploadErrorChunksIndex[e.index];
									a || (a = o.uploadErrorChunksIndex[e.index] = []),
									-1 === a.indexOf(i) && a.push(i),
										o.uploadErrorChunksIndex[e.index] = a,
										_(i, 0),
										n({
											errorCode: t
										})
								},
								onprogress: function(t) {
									e.status !== H ? _(i, t.loaded) : y.abort()
								}
							});
						else
							clearInterval(e.progressInterval)
					}
				}
			}, {
				key: "commit",
				value: function(e) {
					var t = this;
					if (this.fileQueue.length && e.status !== M && !e.creating) {
						e.creating = !0;
						var i = {
							path: e.path,
							size: e.size,
							uploadid: e.uploadId,
							block_list: JSON.stringify(e.blockList)
						};
						if ("function" === typeof this.commitParamsCallback) {
							var n = this.commitParamsCallback(e);
							return n instanceof Promise ? n.then((function(n) {
									return i = Object.assign(i, n.data),
										t.createRequest(e, i, n.query)
								}
							)) : (i = Object.assign(i, n.data),
								this.createRequest(e, i, n.query))
						}
						return this.createRequest(e, i)
					}
				}
			}, {
				key: "createRequest",
				value: function(e, t) {
					var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
					return P.create(t, i).then((function(t) {
							return e.creating = !1,
							t.hasError || (e.status = M,
								e.fs_id = t.fs_id,
								e.md5 = t.md5),
								t
						}
					))
				}
			}, {
				key: "dispose",
				value: function() {
					this.isClosed = !0,
						this.fileQueue = []
				}
			}, {
				key: "stopUpload",
				value: function() {
					this.fileQueue = []
				}
			}], [{
				key: "setOptions",
				value: function(e) {
					i._options = e
				}
			}]),
				i
		}(m.a)
			, R = N
			, U = 4294967296
			, q = /(.*)\.(jpg|jpeg|png|webp|png8|png24|gif|bmp)$/i
			, B = function() {
			function e() {
				var t = this;
				Object(r["a"])(this, e),
					Object(c["a"])(this, "setOptions", (function(e) {
							Object.keys(e).forEach((function(i) {
									t[i] = e[i]
								}
							)),
							t.hasEditor || (t.hasEditor = !0,
								t.editor.on("stop-upload", (function() {
										t.$uploader.stopUpload()
									}
								)))
						}
					)),
					Object(c["a"])(this, "handleProgress", (function(e, i) {
							var n = (100 * i).toFixed(0);
							e.currentUploadFolderId || t.editor.emit("resource-upload", {
								fileMetas: [{
									type: "uploadProgress",
									uploadSourceType: e.fileType,
									fileId: e.fileId,
									progress: "".concat(n > 99 ? 99 : n, "%")
								}]
							})
						}
					)),
					Object(c["a"])(this, "handleSuccess", function() {
						var e = Object(a["a"])(o.a.mark((function e(i, n) {
								var a, r, s, c, d, u, p, h, f, g, m, v, _, y, w, b;
								return o.a.wrap((function(e) {
										while (1)
											switch (e.prev = e.next) {
												case 0:
													if ("attachment" === i.fileType ? (t.$ubc.send("edit_insert_attachment_success"),
														t.$ubc.send({
															name: "edit_insert_local_attachment_time",
															ext: {
																lc_FJ_time: Date.now() - t.logInsertFileStartTime[i.fileId],
																fileSize: i.size
															}
														})) : (t.$ubc.send("edit_insert_local_pic_suc"),
														t.$ubc.send({
															name: "edit_insert_local_pic_time",
															ext: {
																localpic_time: Date.now() - t.logInsertFileStartTime[i.fileId],
																fileSize: i.size
															}
														})),
														a = {},
														!i.currentUploadFolderId) {
														e.next = 19;
														break
													}
													if (r = t.folderUpload[i.currentUploadFolderId],
														r.uploadCount++,
														r.uploadSuccessCount++,
														s = r.uploadSuccessCount / r.uploadFileLength * 100,
														c = s.toFixed(0),
														t.editor.emit("resource-upload", {
															fileMetas: [{
																type: "uploadProgress",
																attachmentType: "folder",
																uploadSourceType: "attachment",
																fileId: i.currentUploadFolderId,
																progress: "".concat(Math.min(c, 99), "%")
															}]
														}),
													r.uploadSuccessCount !== r.uploadFileLength) {
														e.next = 17;
														break
													}
													return d = i.webkitRelativePath.split("/")[0],
														e.next = 13,
														Object(l["e"])({
															target: JSON.stringify(["/文档附件/".concat(t.wpName, "/").concat(d)]),
															dlink: 1
														});
												case 13:
													u = e.sent,
														p = u.info,
														h = u.errno,
													0 === h && (f = p[0],
														a = {
															type: "uploadSuccess",
															uploadSourceType: i.fileType,
															fileId: i.currentUploadFolderId,
															fsId: f.fs_id,
															category: f.category
														});
												case 17:
													e.next = 32;
													break;
												case 19:
													if (a = {
														type: "uploadSuccess",
														uploadSourceType: i.fileType,
														fileId: i.fileId,
														fsId: n.fs_id,
														category: n.category
													},
													"attachment" === i.fileType && (a.path = n && n.path || i.filePath,
													n["server_filename"] && (a.title = n["server_filename"])),
													"image" !== i.fileType) {
														e.next = 32;
														break
													}
													return g = "",
														m = "",
														e.next = 26,
														Object(l["e"])({
															fsids: JSON.stringify([String(n.fs_id)]),
															dlink: 1
														});
												case 26:
													v = e.sent,
														_ = v.info,
														y = v.errno,
													0 === y && _.length > 0 && (w = _[0],
													0 === w.errno && (g = w.thumbs.url3,
														m = _[0].dlink,
													i.resolution && (b = {},
														i.resolution.split(",").forEach((function(e, t) {
																var i = e.split(":");
																b[i[0]] = i[1]
															}
														)),
													Number(b.width) > 0 && (g = g.replace(/size=c[0-9]+_u[0-9]+&/, "size=c".concat(b.width, "_u").concat(b.height, "&")))))),
														a.fileUrl = g,
														a.uploadUrl = m;
												case 32:
													t.editor.emit("resource-upload", {
														fileMetas: [a]
													});
												case 33:
												case "end":
													return e.stop()
											}
									}
								), e)
							}
						)));
						return function(t, i) {
							return e.apply(this, arguments)
						}
					}()),
					Object(c["a"])(this, "handleError", (function(e, i) {
							if (e.currentUploadFolderId) {
								var n = t.folderUpload[e.currentUploadFolderId];
								n.uploadCount++
							}
							var o = {
								type: "uploadFailed",
								uploadSourceType: e.fileType,
								fileId: e.currentUploadFolderId ? e.currentUploadFolderId : e.fileId,
								error: i
							};
							t.editor.emit("resource-upload", {
								fileMetas: [o]
							}),
								t.$Message({
									type: "error",
									message: d["a"][i.errno]
								})
						}
					)),
					Object(c["a"])(this, "uploadFiles", (function(e, i, n) {
							var o = [];
							if (i) {
								var a = n + (new Date).getTime().toString();
								t.folderUpload[a] = {
									uploadSuccessCount: 0,
									uploadCount: 0,
									uploadFileLength: e.length
								},
									e.forEach((function(e) {
											e.currentUploadFolderId = a,
												e.fileType = n;
											var i = "/文档附件/".concat(t.wpName, "/").concat(e.webkitRelativePath);
											e.filePath = i
										}
									));
								var r = e[0].webkitRelativePath.split("/")[0]
									, s = {
									uploadType: "local",
									title: r,
									isDir: 1,
									type: n,
									fileId: a
								};
								o.push(s)
							} else
								e.forEach((function(e, i) {
										var a = n;
										"event" === n && (a = q.test(e.name) ? "image" : "attachment");
										var r = a + (new Date).getTime().toString() + i;
										e.fileId = r,
											e.fileType = a,
											e.filePath = "/文档附件/".concat(t.wpName, "/").concat(e.name);
										var s = {
											uploadType: "local",
											title: e.name,
											size: e.size,
											fileId: r,
											type: a,
											file: "image" === a ? e : null,
											copyImageFileId: e.copyImageFileId
										};
										e.size >= U ? (s.errorMessage = "暂不支持添加大于4G的本地文件!",
											t.$Message({
												type: "error",
												message: "暂不支持添加大于4G的本地文件!"
											})) : "" !== e.name && "." !== e.name || (s.errorMessage = "文件名错误！",
											t.$Message({
												type: "error",
												message: "文件名错误！"
											})),
											o.push(s)
									}
								));
							t.editor.emit("resource-upload", {
								fileMetas: o
							}),
								t.$uploader.append(e)
						}
					)),
					this.editor = null,
					this.$Message = null,
					this.wpName = "",
					this.$ubc = null,
					this.hasEditor = !1,
					this.logInsertFileStartTime = {},
					this.folderUpload = {},
					this.$uploader = new R({
						params: {
							clienetype: 0
						},
						xhr: u["a"].instance,
						preCreateUrl: "/api/precreate?channel=chunlei&web=1&app_id=250528&clienttype=0",
						createFileUrl: "/api/create?rtype=1&channel=chunlei&web=1&app_id=250528&clienttype=0",
						preParamsCallback: function(e) {
							return t.logInsertFileStartTime[e.fileId] = Date.now(),
								{
									data: {
										path: e.filePath,
										target_path: "/文档附件/".concat(t.wpName, "/"),
										local_mtime: parseInt(e.lastModified / 1e3, 10)
									},
									query: {
										bdstoken: t.loginInfo.bdstoken
									}
								}
						},
						commitParamsCallback: function(e) {
							return {
								data: {
									path: e.filePath,
									target_path: "/文档附件/".concat(t.wpName, "/"),
									local_mtime: parseInt(e.lastModified / 1e3, 10)
								},
								query: {
									bdstoken: t.loginInfo.bdstoken,
									isdir: 0
								}
							}
						}
					}),
					this.addListener()
			}
			return Object(s["a"])(e, [{
				key: "addListener",
				value: function() {
					this.$uploader.on("error", this.handleError),
						this.$uploader.on("progress", this.handleProgress),
						this.$uploader.on("success", this.handleSuccess)
				}
			}, {
				key: "removeListener",
				value: function() {
					this.$uploader.removeListener("error", this.handleError),
						this.$uploader.removeListener("progress", this.handleProgress),
						this.$uploader.removeListener("success", this.handleSuccess)
				}
			}]),
				e
		}()
			, z = new B
	},
	a02b: function(e, t) {
		e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAYAAADHLIObAAAAAXNSR0IArs4c6QAABSZJREFUeAHtm19oHEUYwL/Z3cvlLiakihVtI1pLqzZoEYoVNf9KQStYkKT2xYe+tA9CQWkFffLFJ7Eo2mB88UEQtQ+iYKVW0QcplGoCbSqpbYNGKj2qTWOT+7u343xX73K7N3uX2+zsnOk3cLmdP983M7+db+abLwkAJSJABIgAESACRIAIEAEiQASIABEgAkSACBABIkAEiAARIAI3IwGmatKPvpjdHmP2IYvx9YzxdlX9VOu9cLnzqT8+Y8eqy6J6NlR0hBCTZuFozHB6o4KI83AAHl8zwodUzKmRTiUgcSUCcKtR5yrqOYc+HTCVgERzVgFpqTpLMHfxwaW2D6OdEpBRmrMfBO5A/9phPuBXH3a5EpBhDzKoPrFnDqwd4f1B5ZuRW9EgEYTDYbBnF+9rBkqQtisKpGWAKYNQdGCoZ5g/KasLq2xFgexO5h/wA1ME2KYSphKHfHD/P9xvQmrLGc/Z7LzjGPOiHy5Ob0wcxCzFI2ccxBlkHjo1Fv+0VBPiDy2+Xojj96jiLG7xDSXX3FNTzmZs5rtqy22CfK8o0w4CICwZAhkSSQIZEkhte+Tm9SY81x+DZLz2vEvNcvjwaA7+mnOfWc8PxeCRDRaYntdfFM3OXCzCx8fz6DdqSVpAtrcBvLE3AQkJxDKFW7sYvDqWKWeh72EL9u30j8Ztud+Cv+cc+PqkXZGJ8sHzbqPpGgHWg4ijWNXpXqndnrxspN2dWqZTGoqWnmev3zDdbF5uh7iyPvgy52J1/FQBxs/Z4EhsFx3GyWkbvjqRd8lEmdFi2jjBj47lSx9D8iodEW3wpozgemA0A0wsVPxUJ3S8/3O+q4sjfdYGsjxLGbRyney7FaDJxiVZD7JmVNaIgNYVGRO94wleLxVFtCHt3i4rzQ1h4h0JcSEUW8FCtlKs5UEbyL3PxmFkMCZ8Qs+GJ8FwbqYIB0fTML/oDcHWTSa89kICbknckJ/+E9tkAA8yHUmLaaNrs3tb25IgIpSNd5uwfUvMxWfPjngFIlasu8uEHVvdbVwCijNaQKazHObTza2c1FV3+9TV2qM9NVtbpphfRb0W084VAF55Pw07n2gTV8TKWKQPIroN478W4cSk+8by1ic5QLirV7HStfC0uCJ++5O7jVShokItIHEuU7874hP8hJhb4HD4c59TSBGsemq1mHa9Af1f6whkSG9Om2l3JQH6NmMYbXEm14V78/14AbKeK/MdYh98rNeCNp/R4vV7croIUzM32WGD9+t3X+qAntW1BvG0cGH2v52u0O3qYDB2sAPwu17CwMWBwxmYOC88eA2pdiYRDOI2EWuUQcSuN91jgFX12+l1dxoNIaIcE5GMh+6rEsTCCJMWkFeucbFy5K7KDxM22FWLakrcamZSjU02k+Pw42m5zih4+uw66rvG61zvvaYI8C72hU762d/c0HC/3PfmAjwo2vrukULkwiVH2/UQZ6ANJAYa0IleSkIHfkI45a2ctJh2KwMJOjYCGZScR45AeoAEzRLIoOQ8cgTSAyRolkAGJeeRUwKScxY8PuYZYNhZxvm1sHWiPiUgbYddVDHY5etkPG+a3y1fT60GJSAL3HpZ/H1sy3nQOdv44uf34mdqMSy/RAnIk6Pt3ywUYs/YjvGLMHOtYWwRzHCKjnE5m7feWXMlObx8ZHIN9WNTcpmmSwde1/PvdDjQ288CP3Kk9ayjaYgkQASIABEgAkSACBABIkAEiAARIAJEgAgQASJABIgAESACRKAlCfwLfitl0g75bWMAAAAASUVORK5CYII="
	},
	a3da: function(e, t, i) {
		"use strict";
		i.d(t, "a", (function() {
				return n
			}
		)),
			i.d(t, "b", (function() {
					return o
				}
			));
		var n = function() {
			var e = encodeURIComponent(location.href);
			window.location.href = "https://pan.baidu.com/?redirecturl=".concat(e)
		}
			, o = function() {
			var e = "https://pan.baidu.com/disk/home?redirecturl=".concat(location.href);
			window.location.href = "https://passport.baidu.com/?logout?u=".concat(encodeURIComponent(e))
		}
	},
	a4f9: function(e, t, i) {
		"use strict";
		i("1851")
	},
	a8de: function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-filemenu"
			}, [i("u-dropdown", {
				on: {
					command: e.handleCommand
				}
			}, [i("span", {
				staticClass: "u-dropdown-link"
			}, [i("i", {
				staticClass: "x-icon-more"
			})]), i("u-dropdown-menu", {
				attrs: {
					slot: "dropdown"
				},
				slot: "dropdown"
			}, ["editPage" === e.page ? i("u-dropdown-item", {
				attrs: {
					command: "saveHistoryVersion",
					disabled: "saving" === e.saveHisVersionManuallyStatus
				}
			}, [i("i", {
				staticClass: "x-icon x-icon-save-history"
			}), e._v("保存版本\n            ")]) : e._e(), "editPage" === e.page ? i("u-dropdown-item", {
				staticClass: "no-topborder",
				attrs: {
					command: "historyVersion"
				}
			}, [i("i", {
				staticClass: "x-icon x-icon-history"
			}), e._v("历史版本\n            ")]) : e._e(), "sharePage" === e.page ? i("u-dropdown-item", {
				attrs: {
					command: "save",
					disabled: Boolean(!e.acl || e.acl && !e.acl.length)
				}
			}, [i("i", {
				staticClass: "x-icon x-icon-transfer"
			}), e._v("转存"), i("i", {
				staticClass: "x-icon-arrow"
			})]) : e._e(), i("u-dropdown-item", {
				attrs: {
					command: "export",
					disabled: !e.isAuthor && (!e.acl || e.acl && !e.acl.length) || e.exportFlag
				}
			}, [i("i", {
				staticClass: "x-icon x-icon-export"
			}), e._v("导出为Word\n            ")]), e.isUserGuidePage ? e._e() : i("u-dropdown-item", {
				attrs: {
					command: "userguide"
				}
			}, [i("i", {
				staticClass: "x-icon x-icon-userguide"
			}), e._v("帮助文档")]), i("u-dropdown-item", {
				attrs: {
					command: "opinion"
				}
			}, [i("i", {
				staticClass: "x-icon x-icon-opinion"
			}), e._v("意见及建议")]), "sharePage" !== e.page || e.isUserGuidePage ? e._e() : i("u-dropdown-item", {
				attrs: {
					command: "report"
				}
			}, [i("i", {
				staticClass: "x-icon x-icon-report"
			}), e._v("举报"), i("i", {
				staticClass: "x-icon-arrow"
			})])], 1)], 1), e.transferSelectorPopShow ? i("TransferSelector", {
				on: {
					close: e.closeTransferSelector,
					transferFile: e.transferFile
				}
			}) : e._e(), i("Report", {
				attrs: {
					reportPopShow: e.reportPopShow
				},
				on: {
					close: e.closeReport
				}
			})], 1)
		}
			, o = []
			, a = i("e137")
			, r = i.n(a)
			, s = (i("7d06"),
			i("5a0a"))
			, c = (i("626b"),
			i("07a4"))
			, l = i("c3d1")
			, d = i("8807")
			, u = i("a3da")
			, p = i("69c1");
		function h(e) {
			return new Promise((function(t) {
					var i = new XMLHttpRequest;
					i.open("GET", e, !0),
						i.responseType = "blob",
						i.onload = function() {
							200 === i.status && t(i.response)
						}
						,
						i.onerror = function() {
							location.href = e
						}
						,
						i.send()
				}
			))
		}
		function f(e, t) {
			if (window.navigator.msSaveOrOpenBlob)
				navigator.msSaveBlob(e, t);
			else {
				var i = document.createElement("a")
					, n = document.querySelector("body");
				i.href = window.URL.createObjectURL(e),
					i.download = t,
					i.style.display = "none",
					n.appendChild(i),
					i.click(),
					n.removeChild(i),
					window.URL.revokeObjectURL(i.href)
			}
		}
		function g(e, t) {
			h(e).then((function(e) {
					f(e, t)
				}
			))
		}
		var m = i("3fd0")
			, v = {
			name: "FileMenu",
			mixins: [p["a"]],
			components: {
				TransferSelector: l["default"],
				Report: d["default"]
			},
			props: {
				page: "",
				title: "",
				fileVersion: {
					type: Number,
					default: 1
				}
			},
			data: function() {
				return {
					transferSelectorPopShow: !1,
					reportPopShow: !1,
					exportFlag: !1,
					exportStartTime: 0
				}
			},
			computed: {
				uk: function() {
					return c["b"].loginInfo.uk
				},
				acl: function() {
					return c["b"].shareInfo.acl
				},
				isAuthor: function() {
					return c["b"].shareInfo.isAuthor
				},
				fsid: function() {
					return c["b"].shareInfo.docid
				},
				surl: function() {
					return c["b"].shareInfo.surl
				},
				saveHisVersionManuallyStatus: function() {
					return c["b"].saveHisVersionManuallyStatus
				},
				isShowHistory: function() {
					return c["b"].isShowHistory
				},
				userGuideSURL: function() {
					return c["b"].userGuideSURL
				},
				isUserGuidePage: function() {
					return c["b"].isUserGuidePage
				}
			},
			methods: {
				handleCommand: function(e) {
					switch (e) {
						case "save":
							this.transSelector();
							break;
						case "report":
							this.report();
							break;
						case "export":
							this.exportFile();
							break;
						case "opinion":
							this.opinionClick();
							break;
						case "saveHistoryVersion":
							this.$bus.$emit("save-historyversion");
							break;
						case "historyVersion":
							this.showHistoryVersion();
							break;
						case "userguide":
							this.$ubc.send("wpdoc_edit_Help_button_clk"),
								window.open("".concat(location.origin, "/doc/share/").concat(this.userGuideSURL, "?isHelpDoc=true"));
							break
					}
				},
				closeTransferSelector: function() {
					this.transferSelectorPopShow = !1
				},
				transSelector: function() {
					this.uk ? this.transferSelectorPopShow = !0 : Object(u["a"])(),
						this.$ubc.send("wpdoc_share_transfersave")
				},
				report: function() {
					this.uk ? this.reportPopShow = !0 : Object(u["a"])()
				},
				closeReport: function() {
					this.reportPopShow = !1
				},
				opinionClick: function() {
					this.$ubc.send("wpdoc_edit_user_feedback"),
						window.open("https://help.baidu.com/newadd?prod_id=29&category=2&ptype=215", "_blank")
				},
				exportFile: function() {
					var e = Object(s["a"])(r.a.mark((function e(t) {
							var i, n, o, a, s, c, l = this;
							return r.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												if (!this.exportFlag) {
													e.next = 2;
													break
												}
												return e.abrupt("return");
											case 2:
												return "transcoding" !== t && (this.exportStartTime = (new Date).getTime(),
													this.$ubc.send("wpdoc_edit_exp_word_clk")),
													this.exportFlag = !0,
													i = {
														fsid: this.fsid,
														surl: this.surl,
														type: 1,
														author: this.isAuthor,
														docversion: this.fileVersion
													},
													e.next = 8,
													Object(m["b"])(i);
											case 8:
												n = e.sent,
													this.exportFlag = !1,
													n && 0 === n.errno ? (o = n.data || {},
													1 === +o.status && setTimeout((function() {
															l.exportFile("transcoding")
														}
													), 1e3),
													0 === +o.status && (g(o.ndb_key, "".concat(this.title, ".docx")),
														a = this.exportStartTime,
														s = (new Date).getTime(),
														c = a && s - a || 0,
														this.$ubc.send("wpdoc_edit_exp_word_suc"),
														this.$ubc.send({
															name: "wpdoc_edit_exp_word_time",
															ext: {
																exp_word_time: c
															}
														})),
													2 === +o.status && this.exportFail(n)) : this.exportFail(n);
											case 11:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t(t) {
						return e.apply(this, arguments)
					}
					return t
				}(),
				exportFail: function(e) {
					this.exportFlag = !1,
						this.$Message({
							type: "error",
							message: "导出失败，请稍后再试"
						}),
						this.$ubc.send({
							name: "wpdoc_edit_exp_word_fail",
							ext: {
								reason: e
							}
						})
				},
				showHistoryVersion: function() {
					c["a"].setShowHistory(!0),
						this.$ubc.send("wpdoc_edit_preview_hv")
				}
			}
		}
			, _ = v
			, y = (i("04b5"),
			i("52c5"))
			, w = Object(y["a"])(_, n, o, !1, null, null, null)
			, b = w.exports;
		t["default"] = b
	},
	aaa8: function(e, t, i) {},
	af7e: function(e, t) {
		e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAD1FJREFUeAHtXQuMXFUZ/s/M7M7OTJeyfdnHbttAyQqCtKZCA8WUTSRa28QHgWgFCgESNbTUgEibqKANglIiGBAwafqQZ2IMRC0xQGsbY6qAT2BFbfdRQEpF292ZbZmd4/cvvTK793XuY+7ce/bezebOvfec//yP7/7n/V+i9Eg1kGog1UCqgVQDqQYmowaEjkK/LuUMWaHuUUndUlC3kLRISjpVCGrHub3uXIL8I5LoGNIcQ9qxMwk6insHoZxemaXeXI165xZoUAik0uxIPACklPnBEVpWq1EPzLMC9jkbVpoWtp0AmmHQ7c1I2gugPNdepF93CPGfsMuJml4iATBwXJ4jq7Qab/PFMMyFOBciV5ygUZT5EoMhK2jXvDbaAw9Ri5qPoOUlBgBvDcnZIxn6Aox9BUlaHFTwsPMDiKgiaGcuSzvm5MXLYdNvFL1YAwDuPdtfoc/Bta+FAi6B8bONUkSodAW9kBG0va1AW2cKcSxU2iETiyUAYPjWwTJdiTr36zD66SHLHCW5d9CgvC9TpB90CfHvKAtWLStWABiQskAVug5Gvxn/napCxD0dqoYhtBUeKNRoy6wp4s048RsLAOCNFwPDtBZv/B1QzgfipKBQeRE0AoVvEUX6DjxCJVTaPok1HQBo0X+4VqX70bC70KcMycsmxsYY1s8viaeazXzTAHBYyvbKMN2GOvIGuPtcsxXRjPJRNTzdkqF1cwriYDPK5zKbAoD+ivwY1egRGH5eswSPS7kAQQVV34YFJfFgM3iKFACo6zMDZboVgt4G4yejSxeRVWCIxwslui7qbmNkAHhTylknhmkn0P7xiHSauGLgDf6Ot+KyeSXxUlTMRwKAvopcDpf/BBp6c6ISLLHlCDqeIbqhqyQejkIGlNXYo39YfhrG/1VqfEU9S8rXJD0Evd2umCNQsoZ6gIFheS1c/o/S+t6njQQ9NL9IX8YkE088NeRomAcAgjcByQ+nxg9gN0nXo9H8JBrPbQGoOGZtiAfoH5J3483/qmPJ6UNlDcBIu0WJVjZi9DB0D8Bvfmp8ZdsqJYQ+V8gyPQ5PEHrXOVQPwHU+u30lqdJEnjWAbuJWDB9f4zmjQ4bQPAC39rnB51BW+iigBtCeurqvLL8bkMy47KF4gJP9fO7qNayxMo7rSX6RydD6rqK4Nww1BAYAj/AdL9Mf0n5+GOZQo4GqoCozdPGCgtinlsM+VaAqgMf2eXg3Nb69ghvxBFVBDstPHx2UcnpQ+oEAgD7qRtT76dh+UCv4yA8QdI6WaTtewkBe3Hfmk1O6z6UDPT6sF2IWvMG3dE0Rd/kl6QsAY4s5yvQKjD/p5/P9Kj6sfNwewODAeX5nEH1VAbySJzV+WCYMRgd2yGGi4H6/VYFnAPAaPl7GFYztNHeYGgAIlmEZ/bV+aHqqAhhl/WXai1b/hX4KS/M0TgMw5JFMibo7hTjipRRPHoCXbqfG96Le6NKiNza9VqY7vZao7AF400ZtmA6gAH3X7XvVXszSo0EosXt5SecU8UdV1tQ9AHbspMZXVWtz0qEtwNuTN3opXckDoO5vxaDPP1CANtu1vCgpSWnhBWrZLJ01r030qvCttCEDLcyrdDJ+/zDRLuzQe+0oYUyVaFE70SfmEs2LPMqAiom8pYGdMqOjY0vv16rkdPUAePuzePt7Qfh0FYJxToOGEv0Q78W9fzNzmcdoyk0fJLrqtCbtljGz5PsODw5hx9EZKjuOXNsAvD9fB+OzNr+039r4/Ow4RlM2/5Vok3LziXPF84C9cidGaYMKd64AOBmcQYVWrNP8bJDo2X+5s/hkP9Hzb7mni3sKuPY18N4tbnw6AoDDsoDAJW5E4v68Ct//PQ9BW7ykjavsPC6AqnulG3+OADgZkwe1Y7KPvyCW11vH1WV4DUFdvKRXpxx5yivdSnQEAOqSK9wIJOG5H2MeHkmCZM48wgus6pOywymVLQA4FBuGfWMXjctJGLtnCOPm+WhLvN+DyJJaRZkudxLeFgAch88pY5KeTVUa7Rgv0YzW8ddJvYIXcLSjPQAk9SRV6Il8T3VtC4/PgRBvNFUTAMALXITegO0rYAkAZMhjMOGC8WpJ7tUpHo05zWP6mGum/VCFltrxaAkAjr2LBqAGA6Pvie3VA0zL26krmfexW8vWm1sCgAMvJ1NUa665QYehUeVjul4egPAy29rTUi0no24rKywJCU/10A7o0MwDcHVuNypoCQAY9OwkGNULj14adbr0AAz9cHX+xgnryTwTAMY+ttCAePsGM806n+LFA2hWBbDOq1XqttK9CQD8pQ2rhEm/52UsYLpmVQDbDtW6pV1NAODPrCTd2Fb8e6kCNOsGjqkDG8gs7WoCgF1CK6Um6Z6XrqBuvQC2E0YE1QAAV7EoSYZV5dULAHTrBYzpyMauZg8gyXH2SFXhcUvnpRGoWy9gzBbC2q4mAKDPiCWS+h2qbQCt5gHqzYiZQauxABMA0GecUp9Pl9+qHkDHBqBhQ6yKM73cJgBo6wEUxwF0mwcwjM/n7IgCAOABTCipJ5LU36oeQMcegGGzasZsWysPwJ9T1e5QbQNo2QM4aU1EHDbZ1gQApNVgNZwZv6rdQJ09ADYOmmxrAgAGDGL9oUOzadXu5CEp/7sdOjcCR3Nm25pUgoEgLQHAhlfxAjrOAxigb82bbWsCAIaCtQWAytKwDg1nAg0AYJePybYmAEx2D6DlKCAQgO59FR+ecG8DIAAUNk3reeDrG67HAi2HwSC2tLaryQOgEXjQVUsJTbB8pjPjH5pKNDPvnCapT1G1H7Ti3QQALIlXiixhRSzu91YhrOV506255EAR3zrH+pkOd1G1W9rVBAB8k8IyoQ5K4ImeBz5K9Nmu8dIsxPDI1mVEi7WcB31PVrQBLO0KlYw/DpVlV7VG/ePv6nd19F2EiEGbmF3+fNP4mH7yigx9fn5RPDZRMhMAMGUosK/8GOYEJoFaJqpD32tUcR+xiidsqgLQVYDtrd2FvurRWzK4/1q2SBaRkYhMAGBVINjgXr1VMumke3G2EIiNZj4sd42iy/Ac+o3rzcmTfwf75GjnQaKfv050YOi9MHFnnEJ0KSIgrtY0CuKYPW1MZ2oDcLp3pDz1WJneRl2gQ5iE/4vOBr8J3+X+E0LGWB09CIK7+VyiGZqNBcDNfxIfldhlJbMlADghPgP3OwDAdluxFbE43ytXES9lDxEauI7HUowTPIKN8baKccwdw4eC3s0XqcOuCrBsA7AYTm4jhmK6snTXK+7GZyK/P0K07Z+u5JKUYL+d8VkIWwAgro6ly0iS5Aavw3j7n+g3rtzPWzUCADyZox1tATCvjfag+4CFpMk/XsX01rsIo616vF4hevu4aur4poP9ZGuGfuLEoS0AMB5QA4GdTpmT8mwIHsDrwW2GxB+S9s0uiANOctgCgDPlsrTDKXNSnnmNAs5h5WZp8BFcvMCu9nMEwJy8eBnN4ReSYmg7PjkcfJfCWgAj/7IZRImPEyhopFSkJwyZ7M6OAOBMmEHbbpc5Sfe/oTjVy7GENp2VJMmsecX071PThPiv9dP377oCoK1AW5H8nfezJPPXillEX1zozvvXziTikcGkH5kM3aMigysAZgpxDNXAfSrE4p7mm/ACdy+xXh08F0HxtmFNwNrT4i6FEn/PdhbFb1VSKg144Yth02SZEHdYj42j3CvYexhr3zA0nMUrcAbaCBeg3lfZN6Ci1GanwTeDejoL4nkVPpQAwIT6yvIuqtHNKkTTNE3UgKDfLCgJ5Q97ulYBhiiFGm1BVTBiXKfneGoABt3shTNlAMyaIt6Eu9jihXiaNloNwD67u0riF15KVa4CmOjY10PL9DLWCiz0UkiaNgINYNavNUeLx8ZuPBSn7AGYZpcQFSBmvQf6adKoNCDoHq/GZ9Y8eQBDFqwVeAo9gtXGdXpurgYw5DvQWqQznaZ97Tj05AEMIhgtW4dCMWeWHnHQAGxxox/jM+++AMBfpMTSug1xEH7S85ChHV1F8VO/evBVBRiF9Q/JxwCEy43r9By5Bl7Nl2ip37efuQ0EgMNStlfK9CLaA4siF32SF8hVsMjR+V158ecgqvBVBRgF8jwBlg1fBhhpsH7GkCoZZ7y564IanyUNBAAmwNuNQOQG/p0e0WgAb/82DPj8OIzSAgOAmQAzD4Opb4fBUErDWQPQ8zNY3HKdcyr1p4HaABOL6RuWD2KU8PqJ99PrcDQA4+9Hf78nSKNvIiehAgA7i7PYePEkGoWfmVhQeh1YA70tJVo+V4i3A1OqIxAqAJguQNA2MEy/RPdwRV056c8AGsCbP5jLwPgF0ReAjGXWUNoA9ZQ5EpUo0Uow/XT9/fS3bw30Nsr4zFHoHsAQE54gh+rgIVQHVxv30rM3DXCdnyvSp8J2+/VchO4BDOLwBNX5JXENOpp3GvfSs7oGYPxnuMHXSOMzNw3zAPWiYjnZeixT/j68gWU8gvq06W8Yhfv56OrhJUIko8YekQCAReiryOWIVv0oQNDZWJGSSx2G5/UW68Ia5FHRRGQAYGYGpZw+WsZGE0krVZibZGlezbTQZWEM73rRW8PaAFZMdApxBOFaV6HQW4B2HbZfWonp/R6mdHlWL2rjM6OReoB6zRwalktGEbcRVcL59fcn02+8BAP4vzHIfH5QfTUNAMw4xyQcLNO1AMEdGDhCcJZJcmABJ169e/IFuj3MYV0/2msqAAyGuW1QK491F68BGGLBk8Fb2GcIt7ulhb7iZwFn2LwwvVgpe3BInotAHhvB1aUAQqTtk0YodxxN7NiBQJu9rtsfR6MBF7ECgCHfoRHZPTpKt+J6DYCQ9LGDZ7FXb7PqXj1DB1GdYwkAQ/g3KnLhiVHaACbXJKqNgC10vD+ft2ir7tI1ZI76HGsAGMpAY7EF8wo8dnAlgLAK4wix+7IPWvMSf/tw3sGROVSCMxjyNfOcCADUKwh71DtEmS4HEFZD4RfhGTZ3N+ng1jzRfihxF0fjcgvI1CQuHYtNHADqpeEZx0MVWor4vz1oK/Tg7bsAZ4R6aMwB+hxs7kUOopmp0fNYoLG32d24oJImGgATheeq4o0TdHq1St2og7thqG54im54ikXoWXTg7Fp1wMhVgIijohwAjV5c94JObxa/OeR60g0+UWdaAWCicBOvAZDWQ6gyMiM0hT+kzN/S5c+p8hc1+aOKGJse4g2wE/Ol16kGUg2kGkg1kGog1UCqAd008D9fGuwtGC33wAAAAABJRU5ErkJggg=="
	},
	b31f: function(e, t, i) {
		"use strict";
		i("deda")
	},
	b95b: function(e, t, i) {},
	ba86: function(e, t, i) {
		var n = {
			"./FileMenu/index.js": "a8de",
			"./FileSelector/index.js": "27ae",
			"./FileSelectorPop/index.js": "8af8",
			"./HistoryVersion/index.js": "5d11",
			"./MessageBox/index.js": "7d53",
			"./Report/index.js": "8807",
			"./ScrollBar/index.js": "6cdb",
			"./SecondSharePop/index.js": "2599",
			"./ShareButton/index.js": "d892",
			"./SharePop/index.js": "e565",
			"./TemplateList/index.js": "6f4b",
			"./UploadEntryPop/index.js": "729d",
			"./UserInfo/index.js": "d53d",
			"./directory/index.js": "259d",
			"./history/index.js": "8005",
			"./templatePreview/index.js": "f5de",
			"./transferSelector/index.js": "c3d1"
		};
		function o(e) {
			var t = a(e);
			return i(t)
		}
		function a(e) {
			if (!i.o(n, e)) {
				var t = new Error("Cannot find module '" + e + "'");
				throw t.code = "MODULE_NOT_FOUND",
					t
			}
			return n[e]
		}
		o.keys = function() {
			return Object.keys(n)
		}
			,
			o.resolve = a,
			e.exports = o,
			o.id = "ba86"
	},
	be85: function(e, t, i) {},
	c1cb: function(e, t, i) {
		"use strict";
		i("e82d")
	},
	c3d1: function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "share-save"
			}, [i("Dialog", {
				attrs: {
					title: "保存到网盘",
					visible: "true"
				},
				on: {
					close: e.close
				}
			}, [i("div", {
				attrs: {
					slot: "body"
				},
				slot: "body"
			}, [i("div", {
				staticClass: "share-save-body"
			}, [e.isShowLoading ? i("i", {
				staticClass: "loading"
			}) : e._e(), e.list.length ? i("CommonFolderList", {
				attrs: {
					"folder-list": e.list,
					"selected-folder-index": e.selectedFolderIndex,
					unlogin: e.unlogin
				},
				on: {
					"folder-click": e.folderClick,
					"input-cancel": e.folderCreateCancel,
					"input-commit": e.folderCreateCommit
				}
			}) : e._e()], 1)]), i("div", {
				attrs: {
					slot: "footer"
				},
				slot: "footer"
			}, [i("u-button", {
				staticClass: "u-doc create-dir",
				attrs: {
					type: "plain",
					size: "medium",
					iconClass: "newfolder"
				},
				on: {
					click: e.createDir
				}
			}, [e._v("新建文件夹")]), i("u-button", {
				staticClass: "u-doc create-cancel",
				attrs: {
					type: "plain",
					size: "medium"
				},
				on: {
					click: e.close
				}
			}, [e._v("取消")]), i("u-button", {
				staticClass: "create-confirm",
				attrs: {
					size: "medium",
					status: "primary"
				},
				on: {
					click: e.createConfirm
				}
			}, [e._v("确认")])], 1)])], 1)
		}
			, o = []
			, a = (i("fd7f"),
			i("ee39"),
			i("2d7b"),
			i("bf49"),
			i("7200"),
			i("e137"))
			, r = i.n(a)
			, s = (i("7d06"),
			i("5a0a"))
			, c = i("3fd0")
			, l = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "common-folder-list"
			}, [i("div", {
				class: "folder-list " + (e.defaultSavePath ? "small" : "")
			}, [e.unlogin ? i("div", {
				staticClass: "unlogin-content"
			}, [e._v("登录信息出错")]) : e._e(), e._l(e.folderList, (function(t, n) {
					return i("CommonFolderItem", {
						key: n,
						attrs: {
							folder: t,
							index: n
						},
						on: {
							"folder-click": e.folderClick,
							"input-cancel": e.inputCancel,
							"input-commit": e.inputCommit
						}
					})
				}
			))], 2), e.defaultSavePath ? i("div", {
				staticClass: "folder-default",
				on: {
					click: function(t) {
						return e.folderClick({
							indexPath: "-1"
						})
					}
				}
			}, [i("span", {
				class: {
					"folder-checkbox": !0,
					selected: "-1" === e.selectedFolderIndex
				}
			}), e._v("\n        最近保存路径: " + e._s(e.defaultSavePath) + "\n    ")]) : e._e()])
		}
			, d = []
			, u = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "common-folder-item"
			}, [i("div", {
				class: "folder-item " + (e.folder.selected ? "selected" : ""),
				style: "padding-left: " + 15 * e.folder.pathLevel + "px",
				on: {
					click: function(t) {
						return e.folderClick(!1)
					}
				}
			}, [i("i", {
				class: {
					icon0: !0,
					"icon-plus": !e.folder.isOpen,
					"icon-minus": e.folder.isOpen,
					"icon-loading": e.folder.isLoading,
					"is-none": e.folder.dir_empty
				}
			}), i("i", {
				class: "icon1 icon-folder" + (e.folder.isOpen ? "-open" : "")
			}), e.folder.isCreate ? e._e() : i("span", {
				staticClass: "folder-name"
			}, [e._v(e._s(e.folder.server_filename))]), e.folder.isCreate ? i("div", {
				staticClass: "folder-name"
			}, [i("input", {
				directives: [{
					name: "model",
					rawName: "v-model",
					value: e.folderName,
					expression: "folderName"
				}],
				staticClass: "folder-name-text",
				attrs: {
					type: "text",
					autofocus: "autofocus"
				},
				domProps: {
					value: e.folderName
				},
				on: {
					input: function(t) {
						t.target.composing || (e.folderName = t.target.value)
					}
				}
			}), i("i", {
				staticClass: "folder-name-commit",
				on: {
					click: function(t) {
						return t.stopPropagation(),
							e.inputCommit(!1)
					}
				}
			}), i("i", {
				staticClass: "folder-name-cancel",
				on: {
					click: function(t) {
						return t.stopPropagation(),
							e.inputCancel(t)
					}
				}
			})]) : e._e()]), e.folder.isOpen && e.folder.list && e.folder.list.length ? i("div", {
				staticClass: "sub-list"
			}, e._l(e.folder.list, (function(t, n) {
					return i("common-folder-item", {
						key: n,
						attrs: {
							folder: t,
							index: n
						},
						on: {
							"folder-click": e.folderClick,
							"input-cancel": e.inputCancel,
							"input-commit": e.inputCommit
						}
					})
				}
			)), 1) : e._e()])
		}
			, p = []
			, h = {
			name: "CommonFolderItem",
			props: {
				folder: {},
				selectedFolderIndex: ""
			},
			data: function() {
				return {
					folderName: ""
				}
			},
			mounted: function() {
				this.folderName = "新建文件夹"
			},
			methods: {
				folderClick: function(e) {
					e ? this.$emit("folder-click", e) : this.folder.isCreate || this.$emit("folder-click", this.folder)
				},
				inputCancel: function() {
					this.$emit("input-cancel"),
						this.folderName = "新建文件夹"
				},
				inputCommit: function(e) {
					e || (e = this.folderName),
						this.$emit("input-commit", e)
				}
			}
		}
			, f = h
			, g = (i("2978"),
			i("52c5"))
			, m = Object(g["a"])(f, u, p, !1, null, null, null)
			, v = m.exports
			, _ = {
			name: "CommonFolderList",
			components: {
				CommonFolderItem: v
			},
			props: {
				folderList: {},
				selectedFolderIndex: "",
				unlogin: !1
			},
			data: function() {
				return {
					defaultSavePath: ""
				}
			},
			mounted: function() {
				var e = this.getDefaultSavePath();
				e && (this.defaultSavePath = e)
			},
			methods: {
				folderClick: function(e) {
					this.$emit("folder-click", e.indexPath)
				},
				inputCancel: function() {
					this.$emit("input-cancel")
				},
				inputCommit: function(e) {
					this.$emit("input-commit", e)
				},
				getDefaultSavePath: function() {
					var e = localStorage.getItem("DOC_USER_NAME") + "share_save_path"
						, t = localStorage.getItem(e);
					return !!(t && (t = t.split("?"),
					t.length > 1 && (new Date).getTime() - t[1] < 2592e5)) && t[0]
				}
			}
		}
			, y = _
			, w = (i("c4a7"),
			Object(g["a"])(y, l, d, !1, null, null, null))
			, b = w.exports
			, C = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "transfer-dialog"
			}, [i("div", {
				staticClass: "dialog-mask"
			}), i("div", {
				staticClass: "dialog-box"
			}, [i("div", {
				staticClass: "dialog-header"
			}, [e._t("header"), i("span", {
				staticClass: "dialog-header-title"
			}, [e._v(e._s(e.title))]), i("i", {
				staticClass: "u-icon u-icon-close",
				on: {
					click: e.close
				}
			})], 2), i("div", {
				staticClass: "dialog-body"
			}, [e._t("body")], 2), e.$slots.footer ? i("div", {
				staticClass: "dialog-footer"
			}, [e._t("footer")], 2) : e._e()])])
		}
			, S = []
			, x = {
			name: "Dialog",
			props: {
				title: ""
			},
			data: function() {
				return {}
			},
			methods: {
				close: function() {
					this.$emit("close")
				}
			}
		}
			, k = x
			, T = (i("f4a0"),
			Object(g["a"])(k, C, S, !1, null, null, null))
			, I = T.exports
			, O = i("07a4")
			, P = {
			name: "TransferSelector",
			components: {
				CommonFolderList: b,
				Dialog: I
			},
			data: function() {
				return {
					list: [],
					selectedFolderIndex: "0",
					isShowLoading: !0,
					hasCreateDir: !1,
					unlogin: !1
				}
			},
			computed: {
				loginInfo: function() {
					return O["b"].loginInfo
				}
			},
			mounted: function() {
				var e = Object(s["a"])(r.a.mark((function e() {
						var t, i;
						return r.a.wrap((function(e) {
								while (1)
									switch (e.prev = e.next) {
										case 0:
											return e.next = 2,
												this.getFileList("/", "0");
										case 2:
											t = e.sent,
												i = [{
													isdir: 1,
													fs_id: 0,
													path: "/",
													server_filename: "全部文件",
													isOpen: !0,
													selected: !0,
													indexPath: "0",
													pathLevel: 0
												}],
												this.selectedFolderCount = "0",
												t.length > 0 ? (i[0].list = t,
													i[0].dir_empty = 0) : i[0].dir_empty = 1,
												this.list = i,
												this.isShowLoading = !1;
										case 8:
										case "end":
											return e.stop()
									}
							}
						), e, this)
					}
				)));
				function t() {
					return e.apply(this, arguments)
				}
				return t
			}(),
			methods: {
				close: function() {
					this.$emit("close")
				},
				getFileList: function() {
					var e = Object(s["a"])(r.a.mark((function e(t, i) {
							var n, o;
							return r.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												return e.next = 2,
													Object(c["f"])({
														dir: t
													});
											case 2:
												if (e.t0 = e.sent,
													e.t0) {
													e.next = 5;
													break
												}
												e.t0 = {};
											case 5:
												if (n = e.t0,
													o = n.list || [],
													!(0 !== n.errno || o.length < 1)) {
													e.next = 10;
													break
												}
												return -6 === n.errno && (this.unlogin = !0),
													e.abrupt("return", []);
											case 10:
												return o = o.filter((function(e) {
														return 1 === +e.isdir
													}
												)).map((function(e, t) {
														return e.indexPath = i + "." + t,
															e.pathLevel = e.indexPath.split(".").length,
															e
													}
												)),
													e.abrupt("return", o);
											case 12:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t(t, i) {
						return e.apply(this, arguments)
					}
					return t
				}(),
				getFolderFromIndex: function(e) {
					if ("-1" === e)
						return !1;
					for (var t = e.split("."), i = this.list[+t[0]], n = 1; n < t.length; n++)
						i = i.list && i.list[+t[n]] || {};
					return i
				},
				folderClick: function() {
					var e = Object(s["a"])(r.a.mark((function e(t) {
							var i, n;
							return r.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												if ("-1" !== t) {
													e.next = 3;
													break
												}
												return this.selectedFolderIndex = this.selectedFolderIndex === t ? "0" : t,
													e.abrupt("return");
											case 3:
												if (this.hasCreateDir && this.folderCreateCancel(),
													i = this.changeFolderSelect(t) || {},
												0 === +i.dir_empty) {
													e.next = 7;
													break
												}
												return e.abrupt("return");
											case 7:
												if (i.list) {
													e.next = 19;
													break
												}
												return this.$set(i, "isLoading", !0),
													e.next = 11,
													this.getFileList(i.path, i.indexPath);
											case 11:
												if (e.t0 = e.sent,
													e.t0) {
													e.next = 14;
													break
												}
												e.t0 = [];
											case 14:
												if (n = e.t0,
													!(n.length < 1)) {
													e.next = 17;
													break
												}
												return e.abrupt("return");
											case 17:
												this.$set(i, "isLoading", !1),
													this.$set(i, "list", n);
											case 19:
												!i.isOpen && this.$set(i, "isOpen", !0);
											case 20:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t(t) {
						return e.apply(this, arguments)
					}
					return t
				}(),
				changeFolderSelect: function(e) {
					var t = this.getFolderFromIndex(e) || {};
					if (this.selectedFolderIndex !== e) {
						var i = this.getFolderFromIndex(this.selectedFolderIndex);
						i && this.$set(i, "selected", !1),
							this.$set(t, "selected", !0),
							this.selectedFolderIndex = e
					}
					if (!t.isOpen)
						return t;
					this.selectedFolderCount === e ? (this.$set(t, "isOpen", !1),
						this.selectedFolderCount = "") : this.selectedFolderCount = e
				},
				createDir: function() {
					if (!this.hasCreateDir) {
						this.hasCreateDir = !0;
						var e = this.selectedFolderIndex
							, t = this.getFolderFromIndex(this.selectedFolderIndex);
						if (!t)
							return !1;
						if (!t.isLoading) {
							var i = e + ".0"
								, n = {
								isCreate: !0,
								dir_empty: 1,
								isdir: 1,
								indexPath: i,
								isOpen: !1,
								pathLevel: i.split(".").length
							};
							if (t.list && 0 !== t.list.length) {
								n.indexPath = e + ".0";
								var o = t.list;
								o.unshift(n),
									this.$set(t, "list", o)
							} else
								this.$set(t, "list", [n]),
									this.$set(t, "isOpen", !0),
									this.$set(t, "dir_empty", 0)
						}
					}
				},
				folderCreateCancel: function() {
					this.hasCreateDir = !1;
					var e = this.getFolderFromIndex(this.selectedFolderIndex);
					if (!e)
						return !1;
					if (e.list && 1 === e.list.length)
						this.$set(e, "isOpen", !1),
							this.$set(e, "dir_empty", 1),
							this.$set(e, "list", []);
					else if (e.list && e.list.length > 1) {
						var t = e.list.slice(1, -1);
						this.$set(e, "list", t)
					}
				},
				folderCreateCommit: function() {
					var e = Object(s["a"])(r.a.mark((function e(t) {
							var i, n, o, a, s, l;
							return r.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												if (i = this.getFolderFromIndex(this.selectedFolderIndex),
													i) {
													e.next = 4;
													break
												}
												return this.hasCreateDir = !1,
													e.abrupt("return", !1);
											case 4:
												if (n = i.list && i.list[0],
												!n || !n.isCreate) {
													e.next = 15;
													break
												}
												return this.$set(n, "isLoading", !0),
													o = i.path + "/" + t,
													a = {
														bdstoken: "".concat(this.loginInfo.bdstoken),
														path: o
													},
													e.next = 11,
													Object(c["a"])(a);
											case 11:
												s = e.sent,
													this.hasCreateDir = !1,
													l = s.name.lastIndexOf("/"),
												s && s.fs_id && (this.$set(n, "isLoading", !1),
													this.$set(n, "server_filename", s.name.substring(++l)),
													this.$set(n, "fs_id", s.fs_id),
													this.$set(n, "path", s.path),
													this.$set(n, "isCreate", !1),
													this.changeFolderSelect(n.indexPath));
											case 15:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t(t) {
						return e.apply(this, arguments)
					}
					return t
				}(),
				createConfirm: function() {
					var e;
					e = "-1" === this.selectedFolderIndex ? {
						path: this.getDefaultSavePaht()
					} : this.getFolderFromIndex(this.selectedFolderIndex),
						this.$emit("transferFile", {
							path: e.path
						})
				},
				getDefaultSavePaht: function() {
					var e = localStorage.getItem("DOC_USER_NAME") + "share_save_path"
						, t = localStorage.getItem(e);
					return !!(t && (t = t.split("?"),
					t.length > 1 && (new Date).getTime() - t[1] < 2592e5)) && t[0]
				}
			}
		}
			, L = P
			, A = (i("cd623"),
			Object(g["a"])(L, n, o, !1, null, null, null))
			, j = A.exports;
		t["default"] = j
	},
	c4a7: function(e, t, i) {
		"use strict";
		i("be85")
	},
	c855: function(e, t, i) {},
	c88f: function(e, t, i) {
		"use strict";
		i("69de")
	},
	cbc9: function(e, t, i) {},
	cc26: function(e, t, i) {},
	cd623: function(e, t, i) {
		"use strict";
		i("f148")
	},
	d40a: function(e, t, i) {
		"use strict";
		i("45fd")
	},
	d53d: function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-userInfo"
			}, [i("u-dropdown", {
				on: {
					command: e.handleCommand
				}
			}, [i("span", {
				staticClass: "u-dropdown-link"
			}, [i("img", {
				staticClass: "user-photo",
				attrs: {
					src: e.loginInfo["photo_url"],
					alt: ""
				}
			})]), i("u-dropdown-menu", {
				attrs: {
					slot: "dropdown"
				},
				slot: "dropdown"
			}, [i("div", {
				staticClass: "user-info"
			}, [i("img", {
				staticClass: "user-photo dropdown-user-photo",
				attrs: {
					src: e.loginInfo["photo_url"],
					alt: ""
				}
			}), i("span", {
				staticClass: "user-name"
			}, [e._v(e._s(e.loginInfo.username))])]), i("u-dropdown-item", {
				attrs: {
					command: "logout"
				}
			}, [e._v("\n                退出账号\n            ")])], 1)], 1)], 1)
		}
			, o = []
			, a = i("07a4")
			, r = i("a3da")
			, s = {
			name: "UserInfo",
			computed: {
				loginInfo: function() {
					return a["b"].loginInfo
				}
			},
			data: function() {
				return {}
			},
			methods: {
				logout: function() {
					Object(r["b"])()
				},
				handleCommand: function(e) {
					switch (e) {
						case "logout":
							this.logout();
							break
					}
				}
			}
		}
			, c = s
			, l = (i("e4f7"),
			i("52c5"))
			, d = Object(l["a"])(c, n, o, !1, null, null, null)
			, u = d.exports;
		t["default"] = u
	},
	d66b: function(e, t, i) {
		"use strict";
		i("888b")
	},
	d7c7: function(e, t, i) {
		"use strict";
		i("2e61")
	},
	d892: function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				directives: [{
					name: "show",
					rawName: "v-show",
					value: e.showShareBtn,
					expression: "showShareBtn"
				}],
				staticClass: "wpdoc-share"
			}, [i("u-button", {
				staticClass: "share-btn",
				attrs: {
					status: "primary",
					size: "small",
					round: ""
				},
				on: {
					click: e.handleShareClick
				}
			}, [e._v("\n    分享\n    ")]), e.isSharePage ? i("second-share-pop", {
				attrs: {
					popShow: e.secondSharePopShow,
					title: e.title
				}
			}) : i("share-pop", {
				attrs: {
					popShow: e.sharePopShow,
					title: e.title
				},
				on: {
					handleClosePop: e.handleCloseSharePop
				}
			})], 1)
		}
			, o = []
			, a = i("07a4")
			, r = i("e565")
			, s = i("2599")
			, c = {
			name: "ShareButton",
			props: {
				pageStatus: "",
				title: ""
			},
			data: function() {
				return {
					sharePopShow: !1,
					secondSharePopShow: !1,
					isSharePage: !1
				}
			},
			components: {
				SharePop: r["default"],
				SecondSharePop: s["default"]
			},
			computed: {
				showShareBtn: function() {
					return "successed" === this.pageStatus
				},
				isDocuser: function() {
					return a["b"].shareInfo.isDocuser
				}
			},
			created: function() {
				/\/share\//.test(this.$route.path) && (this.isSharePage = !0)
			},
			mounted: function() {
				this.isSharePage && this.initMouseEvent()
			},
			methods: {
				handleShareClick: function(e) {
					this.isSharePage || this.$ubc.send("wpdoc_edit_share"),
						this.handleShowSharePop()
				},
				handleShareHover: function() {
					this.handleShowSecondSharePop()
				},
				handleShareHoverLeave: function() {
					this.handleCloseSecondSharePop()
				},
				handleShowSharePop: function() {
					this.sharePopShow = !0
				},
				handleCloseSharePop: function() {
					this.sharePopShow = !1
				},
				handleShowSecondSharePop: function() {
					this.secondSharePopShow = !0
				},
				handleCloseSecondSharePop: function() {
					this.secondSharePopShow = !1
				},
				initMouseEvent: function() {
					var e = document.querySelector("div.wpdoc-share");
					e.addEventListener("mouseenter", this.handleShareHover),
						e.addEventListener("mouseleave", this.handleShareHoverLeave)
				}
			}
		}
			, l = c
			, d = (i("89b2"),
			i("52c5"))
			, u = Object(d["a"])(l, n, o, !1, null, null, null)
			, p = u.exports;
		t["default"] = p
	},
	d913: function(e, t, i) {
		"use strict";
		i("c855")
	},
	de6f: function(e, t, i) {},
	deda: function(e, t, i) {},
	dfad: function(e, t, i) {
		"use strict";
		i("fd81")
	},
	e04b: function(e, t, i) {
		"use strict";
		i.r(t);
		i("ec75"),
			i("9ca4"),
			i("fa3f"),
			i("26f6"),
			i("7cfa"),
			i("061a"),
			i("ba4a"),
			i("d838");
		Object.entries || (Object.entries = function(e) {
				var t = Object.keys(e)
					, i = t.length
					, n = new Array(i);
				while (i--)
					n[i] = [t[i], e[t[i]]];
				return n
			}
		);
		i("a583"),
			i("b693"),
			i("7896"),
			i("e695"),
			i("8ec3");
		String.prototype.padStart || (String.prototype.padStart = function(e, t) {
				return e >>= 0,
					t = String("undefined" !== typeof t ? t : " "),
					this.length >= e ? String(this) : (e -= this.length,
					e > t.length && (t += t.repeat(e / t.length)),
					t.slice(0, e) + String(this))
			}
		),
		String.prototype.includes || (String.prototype.includes = function(e, t) {
				return "number" !== typeof t && (t = 0),
				!(t + e.length > this.length) && -1 !== this.indexOf(e, t)
			}
		);
		var n = i("f272")
			, o = (i("b95b"),
			i("a6f9"),
			i("44fa"),
			i("bf49"),
			{
				install: function(e) {
					e.filter("dataFormat", (function(e, t) {
							var i = 13 - String(e).length
								, n = 1;
							while (i--)
								n *= 10;
							e *= n;
							var o = new Date(e)
								, a = {
								"M+": o.getMonth() + 1,
								"d+": o.getDate(),
								"h+": o.getHours(),
								"m+": o.getMinutes(),
								"s+": o.getSeconds(),
								"q+": Math.floor((o.getMonth() + 3) / 3),
								S: o.getMilliseconds()
							};
							for (var r in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (o.getFullYear() + "").substr(4 - RegExp.$1.length))),
								a)
								new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? a[r] : ("00" + a[r]).substr(("" + a[r]).length)));
							return t
						}
					)),
						e.filter("currency", (function(e) {
								var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
								return t + parseFloat(e).toFixed(2)
							}
						))
				}
			})
			, a = (i("1554"),
			i("ec56"),
			i("7da1"));
		n["default"].use(a["a"]);
		var r = function(e) {
			return "function" === typeof e
		};
		function s(e, t) {
			Object.keys(t).forEach((function(i) {
					r(t[i]) && r(e[i]) && e[i](t[i])
				}
			))
		}
		var c, l = function(e) {
			var t = []
				, i = function e() {
				var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
					, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
					, o = n.path || ""
					, a = n.isShell;
				i.forEach((function(i) {
						var n = o + i.path;
						i.isDefault && t.push({
							path: o || "/",
							redirect: n
						});
						var r = {
							path: n,
							component: i.component,
							meta: Object.assign({}, i.meta, {
								isShell: i.isShell || a
							})
						};
						Array.isArray(i.children) && e(i.children, i),
							t.push(r)
					}
				))
			};
			i(e.routes);
			var n = new a["a"]({
				mode: "history",
				routes: t,
				base: e.base
			});
			return s(n, e.events),
				n
		}, d = i("7fc8"), u = i.n(d), p = (i("f92a"),
			i("1738")), h = (c = {
			editorLog_link_open: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "hylink_open"
				}
			},
			editorLog_link_confirm: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "hylink_add_suc"
				}
			},
			editorLog_link_copy: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "hylink_copy"
				}
			},
			editorLog_link_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "hylink_edit"
				}
			},
			editorLog_link_unlink: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "hylink_unlink"
				}
			},
			editorLog_pic_menu_cut: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "pic_menu_cut"
				}
			},
			editorLog_pic_menu_copy: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "pic_menu_copy"
				}
			},
			editorLog_pic_menu_clip: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "pic_menu_clip"
				}
			},
			editorLog_pic_embed: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "pic_embed"
				}
			},
			editorLog_pic_divit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "pic_divit"
				}
			},
			editorLog_pic_return: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "pic_return"
				}
			},
			editorLog_format_pointer_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "paint_fmt"
				}
			},
			editorLog_clean_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "clear_fmt"
				}
			},
			editorLog_font_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "font"
				}
			},
			editorLog_size_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "font_sz"
				}
			},
			editorLog_bold_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "bold"
				}
			},
			editorLog_italic_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "italic"
				}
			},
			editorLog_underline_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "underline"
				}
			},
			editorLog_strike_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "strike"
				}
			},
			editorLog_color_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "text_clr"
				}
			},
			editorLog_background_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "hlt_color"
				}
			},
			editorLog_header_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "heading"
				}
			},
			editorLog_left_align_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "lft_align"
				}
			},
			editorLog_center_align_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "ctr_align"
				}
			},
			editorLog_right_align_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "rt_align"
				}
			},
			editorLog_both_align_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "justify"
				}
			},
			editorLog_check_list_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: ""
				}
			},
			editorLog_ordered_list_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "number"
				}
			},
			editorLog_bullet_list_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "bullet"
				}
			},
			editorLog_left_indent_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "dec_indent"
				}
			},
			editorLog_right_indent_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "inc_indent"
				}
			},
			editorLog_blockquote_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "quote"
				}
			},
			editorLog_code_block_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "code"
				}
			},
			editorLog_super_script_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "sups"
				}
			},
			editorLog_sub_script_edit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "subs"
				}
			}
		},
			Object(p["a"])(c, "editorLog_link_edit", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "hylink_add"
				}
			}),
			Object(p["a"])(c, "editorLog_move_para", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "move_para"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_doc_preview_clk", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "FJ_preview_clk"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_doc_card_clk", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "FJ_card_clk"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_video_card_clk", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "FJ_VCard_clk"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_video_preview_clk", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "FJ_VPre_clk"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_video_preview_show", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "FJ_VPre_show"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_video_preview_load_suc", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "FJ_Vload_suc"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_video_preview_play_suc", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "FJ_VPlay_suc"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_video_preview_load_time", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "FJ_Vload_time"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_video_preview_pip_clk", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "FJ_InPic_clk"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_video_preview_pip_suc", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "FJ_InPic_suc"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_video_preview_pip_close", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "FJ_InPic_cls"
				}
			}),
			Object(p["a"])(c, "editorLog_FJ_video_preview_ua", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "FJ_VPLay_ua"
				}
			}),
			Object(p["a"])(c, "editorLog_see_pic_click", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "see_pic_click"
				}
			}),
			Object(p["a"])(c, "editorLog_dl_pic", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "dl_pic"
				}
			}),
			Object(p["a"])(c, "editorLog_zoomin_pic", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "zoomin_pic"
				}
			}),
			Object(p["a"])(c, "editorLog_zoomout_pic", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "zoomout_pic"
				}
			}),
			Object(p["a"])(c, "editorLog_view_original", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "view_original"
				}
			}),
			Object(p["a"])(c, "editorLog_adapt_screen", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "adapt_screen"
				}
			}),
			Object(p["a"])(c, "editorLog_urderline", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "urderline"
				}
			}),
			Object(p["a"])(c, "editorLog_straight_line", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "straight_line"
				}
			}),
			Object(p["a"])(c, "editorLog_dotted_line", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "dotted_line"
				}
			}),
			Object(p["a"])(c, "editorLog_lineheight_edit", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "line_spacing"
				}
			}),
			Object(p["a"])(c, "editorLog_undo_edit", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "undo"
				}
			}),
			Object(p["a"])(c, "editorLog_redo_edit", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "redo"
				}
			}),
			Object(p["a"])(c, "editorLog_image_edit", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "insert_pic"
				}
			}),
			Object(p["a"])(c, "editorLog_insert_table_edit", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "insert_table"
				}
			}),
			Object(p["a"])(c, "editorLog_attachment_edit", {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "insert_fj"
				}
			}),
			c), f = h, g = {
			wpdoc_tpl_back_clk: {
				logType: "event",
				options: {
					page: "word_template",
					type: "clk",
					value: "tpl_back_clk"
				}
			},
			wpdoc_tpl_fai_re_clk: {
				logType: "event",
				options: {
					page: "word_template",
					type: "clk",
					value: "tpl_fai_re_clk"
				}
			},
			wpdoc_tpl_fai_crt_clk: {
				logType: "event",
				options: {
					page: "word_template",
					type: "clk",
					value: "tpl_fai_crt_clk"
				}
			},
			wpdoc_tpl_open_fail: {
				logType: "event",
				options: {
					page: "word_template",
					type: "display",
					value: "tpl_open_fail"
				}
			},
			wpdoc_tpl_crt_clk: {
				logType: "event",
				options: {
					page: "word_template",
					type: "clk",
					value: "tpl_crt_clk"
				}
			},
			wpdoc_tpl_crt_tp_clk: {
				logType: "event",
				options: {
					page: "word_template",
					type: "clk",
					value: "tpl_crt_tp_clk"
				}
			},
			wpdoc_tpl_show: {
				logType: "event",
				options: {
					page: "word_template",
					type: "display",
					value: "tpl_open_suc"
				}
			},
			wpdoc_tpl_open_time: {
				logType: "event",
				options: {
					page: "word_template",
					type: "display"
				}
			},
			wpdoc_tpl_hov_use_clk: {
				logType: "event",
				options: {
					page: "word_template",
					type: "clk",
					value: "tpl_hov_use_clk"
				}
			},
			wpdoc_tpl_hov_pre_clk: {
				logType: "event",
				options: {
					page: "word_template",
					type: "clk",
					value: "tpl_hov_pre_clk"
				}
			},
			wpdoc_tpl_pre_time: {
				logType: "event",
				options: {
					page: "word_template",
					type: "display",
					value: "tpl_pre_time"
				}
			},
			wpdoc_tpl_pre_suc: {
				logType: "event",
				options: {
					page: "word_template",
					type: "display",
					value: "tpl_pre_suc"
				}
			},
			wpdoc_tpl_pre_fail: {
				logType: "event",
				options: {
					page: "word_template",
					type: "display",
					value: "tpl_pre_fail"
				}
			},
			wpdoc_tpl_pre_close: {
				logType: "event",
				options: {
					page: "word_template",
					type: "display",
					value: "tpl_pre_close"
				}
			},
			wpdoc_tpl_pre_use: {
				logType: "event",
				options: {
					page: "word_template",
					type: "clk",
					value: "tpl_pre_use"
				}
			},
			wpdoc_tpl_rec_use: {
				logType: "event",
				options: {
					page: "word_template",
					type: "clk",
					value: "tpl_rec_use"
				}
			}
		}, m = g, v = {
			wpdoc_edit_doc2wp_pageinit: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "doc2wp_pageinit"
				}
			},
			wpdoc_edit_doc2wp_fmetaReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "d2_fmetaReq"
				}
			},
			wpdoc_edit_doc2wp_retry_fmetaReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "d2_fmetaReq_re"
				}
			},
			wpdoc_edit_doc2wp: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "doc2wp"
				}
			},
			wpdoc_edit_doc2wp_crtReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "d2_crtReq"
				}
			},
			wpdoc_edit_doc2wp_crtReq_success: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "d2_crtReq_suc"
				}
			},
			wpdoc_edit_doc2wp_retry_crtReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "d2_crtReq_re"
				}
			},
			wpdoc_edit_doc2wp_convtReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "d2_convtReq"
				}
			},
			wpdoc_edit_doc2wp_retry_convtReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "d2_convtReq_re"
				}
			},
			wpdoc_edit_doc2wp_initEditor: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "d2_initEditor"
				}
			},
			wpdoc_edit_doc2wp_before_sign: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "d2_bf_sign"
				}
			},
			wpdoc_edit_doc2wp_before_sign_fail: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "d2_bf_signFail"
				}
			},
			wpdoc_edit_doc2wp_signReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "d2_signReq"
				}
			},
			wpdoc_edit_doc2wp_dataReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "d2_dataReq"
				}
			},
			wpdoc_edit_doc2wp_success: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "doc2wp_suc"
				}
			},
			wpdoc_edit_doc2wp_fail: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "doc2wp_fail"
				}
			},
			wpdoc_edit_openwp: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "op_wp"
				}
			},
			wpdoc_edit_openwp_fmetaReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "op_fmetaReq"
				}
			},
			wpdoc_edit_openwp_retry_fmetaReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "op_fmetaReq_re"
				}
			},
			wpdoc_edit_openwp_initEditor: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "op_initEditor"
				}
			},
			wpdoc_edit_openwp_before_sign: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "op_bf_sign"
				}
			},
			wpdoc_edit_openwp_before_sign_fail: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "op_bf_signFail"
				}
			},
			wpdoc_edit_openwp_signReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "op_signReq"
				}
			},
			wpdoc_edit_openwp_dataReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "op_dataReq"
				}
			},
			wpdoc_edit_openwp_success: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "op_wp_suc"
				}
			},
			wpdoc_edit_openwp_fail: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "op_wp_fail"
				}
			},
			wpdoc_edit_createwp: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "crt_wp"
				}
			},
			wpdoc_edit_createwp_crtReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "crt_crtReq"
				}
			},
			wpdoc_edit_createwp_crtReq_success: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "crt_crtReq_suc"
				}
			},
			wpdoc_edit_createwp_retry_crtReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "crt_crtReq_re"
				}
			},
			wpdoc_edit_createwp_initEditor: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "crt_initEditor"
				}
			},
			wpdoc_edit_createwp_before_sign: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "crt_bf_sign"
				}
			},
			wpdoc_edit_createwp_before_sign_fail: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "crt_bf_signFail"
				}
			},
			wpdoc_edit_createwp_signReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "crt_signReq"
				}
			},
			wpdoc_edit_createwp_dataReq: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "crt_dataReq"
				}
			},
			wpdoc_edit_createwp_success: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "crt_wp_suc"
				}
			},
			wpdoc_edit_createwp_fail: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "crt_wp_fail"
				}
			},
			wpdoc_edit_save_hv: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "manu_save"
				}
			},
			wpdoc_edit_save_hv_success: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "manu_save_suc"
				}
			},
			wpdoc_edit_save_hv_fail: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "manu_save_fail"
				}
			},
			wpdoc_edit_preview_hv: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "ver_list"
				}
			},
			wpdoc_edit_restore_hv: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "restore"
				}
			},
			wpdoc_edit_user_feedback: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "feedback"
				}
			},
			wpdoc_edit_changes: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "changes"
				}
			},
			wpdoc_edit_changes_success: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "changes_suc"
				}
			},
			edit_insert_cloud_pic: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "cloud_pic"
				}
			},
			edit_insert_cloud_pic_success: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "cloud_pic_suc"
				}
			},
			edit_insert_cld_pic_count: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "cld_pic_num"
				}
			},
			wpdoc_edit_doc2wp_time: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display"
				}
			},
			wpdoc_edit_openwp_time: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display"
				}
			},
			wpdoc_edit_createwp_time: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display"
				}
			},
			edit_insert_local_pic_time: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display"
				}
			},
			edit_insert_local_attachment_time: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display"
				}
			},
			edit_insert_local_pic: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "local_pic"
				}
			},
			edit_insert_local_pic_suc: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "local_pic_suc"
				}
			},
			edit_insert_local_pic_count: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "local_pic_num"
				}
			},
			edit_insert_local_attachment: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "lc_FJ_show"
				}
			},
			edit_insert_local_attachment_count: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "lc_FJ_num"
				}
			},
			edit_insert_local_folder: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "lc_folder_show"
				}
			},
			edit_insert_local_folder_count: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "lc_folder_num"
				}
			},
			edit_insert_cloud_attachment: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "cld_FJ_show"
				}
			},
			edit_insert_cloud_attachment_count: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "cld_FJ_num"
				}
			},
			edit_insert_attachment_success: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "FJ_suc"
				}
			},
			edit_insert_attachment_open: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "FJ_open_clk"
				}
			},
			edit_insert_audio_count: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "audio_num"
				}
			},
			edit_insert_video_count: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "vedio_num"
				}
			},
			edit_insert_folder_count: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "folder_num"
				}
			},
			edit_insert_office_count: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "file_num"
				}
			},
			edit_insert_pic_count: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "pic_num"
				}
			},
			edit_insert_other_count: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "other_num"
				}
			},
			wpdoc_edit_share: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "share_clk"
				}
			},
			wpdoc_edit_share_open: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "share_op_clk"
				}
			},
			wpdoc_edit_share_copy: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "copyshare_clk"
				}
			},
			wpdoc_edit_share_cancel: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "cancleShare_clk"
				}
			},
			wpdoc_edit_share_change: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "share_set_chg"
				}
			},
			wpdoc_edit_share_open_success: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "share_open_doc"
				}
			},
			wpdoc_edit_share_open_fail: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "share_cls_doc"
				}
			},
			wpdoc_edit_share_0: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "share_awys_doc"
				}
			},
			wpdoc_edit_share_7: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "share_7d_doc"
				}
			},
			wpdoc_edit_share_1: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "share_1d_doc"
				}
			},
			wpdoc_share_page: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "doc_sharepage"
				}
			},
			wpdoc_share_share_copy: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "sharepage_copy"
				}
			},
			wpdoc_share_openwp_time: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display"
				}
			},
			wpdoc_share_transfersave: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "doc_save_clk"
				}
			},
			wpdoc_share_transfersave_success: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "doc_save_suc"
				}
			},
			wpdoc_share_transfersave_fail: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "doc_save_fail"
				}
			},
			wpdoc_share_transfersave_time: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display"
				}
			},
			wpdoc_edit_guide_complate: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "cmp_guide"
				}
			},
			wpdoc_edit_guide_skip: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "skip_guide"
				}
			},
			wpdoc_edit_guide_rewatch: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "rewatch_clk"
				}
			},
			wpdoc_edit_exp_word_clk: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "exp_word_clk"
				}
			},
			wpdoc_edit_exp_word_suc: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "exp_word_suc"
				}
			},
			wpdoc_edit_exp_word_fail: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "exp_word_fail"
				}
			},
			wpdoc_edit_exp_word_time: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display"
				}
			},
			wpdoc_edit_log_key_not_found: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "key_not_found"
				}
			},
			wpdoc_edit_Help_button_clk: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "clk",
					value: "Help_button_clk"
				}
			},
			wpdoc_edit_Help_doc_show: {
				logType: "event",
				options: {
					page: "word_editor",
					type: "display",
					value: "Help_doc_show"
				}
			}
		}, _ = Object.assign({}, v, f, m), y = _, w = (i("fd7f"),
			i("a57e"),
			i("a24c"),
			i("73a9"),
			i("f89c")), b = i.n(w), C = i("07a4"), S = ["edit_insert_cloud_pic", "edit_insert_local_pic", "edit_insert_cloud_attachment", "edit_insert_local_folder", "edit_insert_local_attachment", "edit_insert_local_attachment_count", "edit_insert_local_folder_count", "edit_insert_cloud_attachment_count", "edit_insert_video_count", "edit_insert_office_count", "edit_insert_audio_count", "edit_insert_folder_count", "edit_insert_other_count", "edit_insert_pic_count", "wpdoc_edit_share", "wpdoc_edit_share_open", "wpdoc_share_page", "wpdoc_share_transfersave", "wpdoc_share_share_copy", "edit_insert_attachment_open"], x = S, k = {
			logOptions: {},
			install: function(e) {
				var t = this
					, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
				this.logOptions = i,
					Object.defineProperty(e.prototype, "$ubc", {
						get: function() {
							return t
						}
					})
			},
			init: function(e, t, i) {
				var n = {
					version: "2.0",
					testMode: !1,
					queryParams: {
						appname: "wangpan"
					},
					timingId: t,
					from: "doc",
					autoPvTrack: !0
				};
				i = Object.assign({}, n, i),
					b()(e, t, i)
			},
			send: function(e, t) {
				var i = C["b"].docuserchannel
					, n = {}
					, o = "event"
					, a = {};
				if ("string" === typeof e) {
					if (!this.logOptions[e])
						return void b()("event", {
							name: "wpdoc_edit_log_key_not_found",
							page: "word_editor",
							type: "display",
							value: "key_not_found",
							ext: {
								key_not_found: e
							}
						});
					n = this.logOptions[e],
						o = n.logType || "event",
						a = n.options,
					x.includes(e) && (a.ext = {
						docuserchannel: i
					})
				} else
					"[object Object]" === Object.prototype.toString.call(e) && (e.name && (n = this.logOptions[e.name],
						o = n.logType || "event",
						a = n.options,
					x.includes(e.name) && (e.ext ? e.ext.docuserchannel = i : e.ext = {
						docuserchannel: i
					})),
					e.ext && (a.ext = e.ext));
				b()(o, a, t)
			},
			ubc: function() {
				b.a.apply(void 0, arguments)
			}
		}, T = k, I = i("ed9b");
		function O(e, t) {
			var i = {
				render: function(t) {
					return t(e)
				}
			};
			t && (i.router = l(t));
			var o = new n["default"](i);
			window.globalVue = o,
				o.$mount("#app");
			var a = !1
				, r = Object(I["c"])("from")
				, s = "guanjia" === r ? "pc_crt" : r || "web_crt";
			o.$ubc.init("init", "11004", {
				testMode: a,
				from: "doc",
				baiduTongJiId: "bc5920843408306f8b6fc088319384ce",
				source: s
			});
			var c = new n["default"];
			Object.defineProperties(n["default"].prototype, {
				$bus: {
					get: function() {
						return c
					}
				}
			})
		}
		n["default"].use(u.a),
			n["default"].use(o),
			n["default"].use(T, y),
			n["default"].config.productionTip = !1,
		window.BadSDK && window.BadSDK.vueErrorHandler(n["default"]),
			O.install = function(e, t) {
				n["default"].use(e, t)
			}
		;
		var P = O
			, L = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", [e.showLoginInfoFail ? [i("layout-simple", {
				attrs: {
					isShowUserInfo: !1
				}
			}, [i("page-state", {
				attrs: {
					slot: "container",
					status: "loginInfoFail"
				},
				slot: "container"
			})], 1)] : e.isLoginLoading ? e._e() : ["notLayout" === e.layout ? [i("router-view")] : e._e(), "simple" === e.layout ? i("layout-simple", [i("router-view", {
				attrs: {
					slot: "container"
				},
				slot: "container"
			})], 1) : e._e()]], 2)
		}
			, A = []
			, j = i("54a6")
			, E = {
			name: "Home",
			components: {
				PageState: j["a"]
			},
			data: function() {
				return {
					layout: "notLayout",
					isLoginLoading: !0
				}
			},
			computed: {
				loginLoading: function() {
					return C["b"].loginLoading
				},
				loginInfo: function() {
					return C["b"].loginInfo
				},
				showLoginInfoFail: function() {
					return !this.loginInfo.username && !this.isLoginLoading && !/\/share\//.test(this.$route.path)
				},
				userGuideSURL: function() {
					return C["b"].userGuideSURL
				}
			},
			watch: {
				$route: function(e, t) {
					this.layout = e.meta.layout;
					var i = new RegExp(this.userGuideSURL,"g")
						, n = i.test(e.path);
					C["a"].setIsUserGuidePage(n)
				},
				loginLoading: {
					handler: function(e) {
						!1 === e && (this.isLoginLoading = !1)
					},
					immediate: !0
				}
			}
		}
			, F = E
			, D = i("52c5")
			, M = Object(D["a"])(F, L, A, !1, null, null, null)
			, H = M.exports
			, $ = {
			install: function(e) {
				var t = i("ba86")
					, n = t.keys();
				n.forEach((function(i) {
						var n = t(i).default;
						"function" === typeof n.install ? n.install(e) : e.component(n.name, n)
					}
				))
			}
		}
			, N = i("e137")
			, R = i.n(N)
			, U = (i("7d06"),
			i("5a0a"))
			, q = i("e487");
		function B(e) {
			return e = e || {},
				e["app_id"] = 250528,
				q["a"].instance.get("/api/loginStatus", {
					params: e
				})
		}
		var z = function() {
			return i.e("notfound").then(i.bind(null, "37e4"))
		}
			, V = function() {
			return i.e("edit").then(i.bind(null, "c346"))
		}
			, G = function() {
			return i.e("share").then(i.bind(null, "b8d7"))
		}
			, Q = function() {
			return i.e("template").then(i.bind(null, "b6c1"))
		}
			, J = {
			routes: [{
				path: "/edit",
				isDefault: !0,
				name: "EditApp",
				component: V,
				meta: {
					layout: "notLayout"
				}
			}, {
				path: "/share",
				name: "Share",
				component: G,
				meta: {
					layout: "notLayout"
				},
				children: [{
					path: "*",
					component: G,
					meta: {
						layout: "notLayout"
					}
				}]
			}, {
				path: "/template",
				name: "Template",
				component: Q,
				meta: {
					layout: "notLayout"
				}
			}, {
				path: "*",
				component: z,
				meta: {
					layout: "simple"
				}
			}],
			events: {
				beforeEach: function(e, t, i) {
					if (C["b"].loginInfo.username)
						i();
					else {
						var n = C["a"].setLoginInfo
							, o = C["a"].setLoginLoading;
						o(!0);
						var a = function() {
							var e = Object(U["a"])(R.a.mark((function e() {
									var t, a;
									return R.a.wrap((function(e) {
											while (1)
												switch (e.prev = e.next) {
													case 0:
														return e.next = 2,
															B();
													case 2:
														t = e.sent,
														t.hasError || (a = t["login_info"] || {},
															localStorage.setItem("DOC_USER_NAME", a.uk),
															n(a)),
															o(!1),
															i();
													case 6:
													case "end":
														return e.stop()
												}
										}
									), e)
								}
							)));
							return function() {
								return e.apply(this, arguments)
							}
						}();
						a()
					}
				}
			},
			base: "/doc/"
		}
			, W = "{{ type }}"
			, Y = {
			router: J,
			install: function(e) {
				"{{ type }}" === W && (W = "simple");
				var t = "simple" !== W ? "admin" : "simple"
					, n = i("f2d6")("./".concat(t, "/index.js")).default;
				e.component(n.name || "layout", n)
			}
		};
		P.install($),
			P.install(Y),
			P.install(q["a"], {
				clienttype: 0,
				app_id: 250528,
				web: 1,
				channel: "chunlei"
			}),
			P(H, Y.router)
	},
	e487: function(e, t, i) {
		"use strict";
		i("a57e"),
			i("a24c");
		function n(e) {
			if ("string" === typeof e)
				return e;
			var t = [];
			function i(e) {
				for (var n in e)
					if (e.hasOwnProperty(n)) {
						var o = e[n];
						if ("function" === typeof o || void 0 === o)
							return;
						"[object Object]" === Object.prototype.toString.call(o) ? i(o) : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(o))
					}
			}
			return i(e),
				t.join("&")
		}
		var o = {
			timeout: 12e3,
			baseURL: "",
			headers: {
				post: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				common: {
					"X-Requested-With": "XMLHttpRequest"
				}
			},
			responseType: "json",
			transformRequest: [function(e, t) {
				if ("string" === typeof e)
					return e;
				var i = t["Content-Type"] || t.headers && t.headers["Content-Type"];
				return /\bapplication\/json\b/i.test(i) ? JSON.stringify(e) : /\bmultipart\/form-data\b/.test(i) ? e : n(e)
			}
			],
			validateStatus: function() {
				return !0
			}
		}
			, a = o
			, r = i("7a02")
			, s = i.n(r)
			, c = i("8bea")
			, l = i("f596")
			, d = i.n(l)
			, u = {
			a: ["target", "href", "title"],
			abbr: ["title"],
			address: [],
			area: ["shape", "coords", "href", "alt"],
			article: [],
			aside: [],
			audio: ["autoplay", "controls", "loop", "preload", "src"],
			b: [],
			bdi: ["dir"],
			bdo: ["dir"],
			big: [],
			blockquote: ["cite"],
			br: [],
			caption: [],
			center: [],
			cite: [],
			code: [],
			col: ["align", "valign", "span", "width"],
			colgroup: ["align", "valign", "span", "width"],
			dd: [],
			del: ["datetime"],
			details: ["open"],
			div: [],
			dl: [],
			dt: [],
			em: [],
			font: ["color", "size", "face"],
			footer: [],
			h1: [],
			h2: [],
			h3: [],
			h4: [],
			h5: [],
			h6: [],
			header: [],
			hr: [],
			i: [],
			img: ["src"],
			ins: ["datetime"],
			li: [],
			mark: [],
			nav: [],
			ol: [],
			p: [],
			pre: [],
			s: [],
			section: [],
			small: [],
			span: [],
			sub: [],
			sup: [],
			strong: [],
			table: ["width", "border", "align", "valign"],
			tbody: ["align", "valign"],
			td: ["width", "rowspan", "colspan", "align", "valign"],
			tfoot: ["align", "valign"],
			th: ["width", "rowspan", "colspan", "align", "valign"],
			thead: ["align", "valign"],
			tr: ["rowspan", "align", "valign"],
			tt: [],
			u: [],
			ul: [],
			video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]
		};
		i("44fa"),
			i("ccbb");
		function p(e) {
			var t = document.cookie.match("(^|;) ?" + e + "=([^;]*)(;|$)");
			return t ? t[2] : null
		}
		function h() {
			var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~！@#￥%……&"
				, t = String.fromCharCode
				, i = function(e) {
				var i = "";
				return e.length < 2 ? (i = e.charCodeAt(0),
					i < 128 ? e : i < 2048 ? t(192 | i >>> 6) + t(128 | 63 & i) : t(224 | i >>> 12 & 15) + t(128 | i >>> 6 & 63) + t(128 | 63 & i)) : (i = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320),
				t(240 | i >>> 18 & 7) + t(128 | i >>> 12 & 63) + t(128 | i >>> 6 & 63) + t(128 | 63 & i))
			}
				, n = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
				, o = function(e) {
				return (e + "" + Math.random()).replace(n, i)
			}
				, a = function(t) {
				var i = [0, 2, 1][t.length % 3]
					, n = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0)
					, o = [e.charAt(n >>> 18), e.charAt(n >>> 12 & 63), i >= 2 ? "=" : e.charAt(n >>> 6 & 63), i >= 1 ? "=" : e.charAt(63 & n)];
				return o.join("")
			}
				, r = function(e) {
				return e.replace(/[\s\S]{1,3}/g, a)
			}
				, s = function(e) {
				return r(o((new Date).getTime()))
			}
				, c = function(e, t) {
				return t ? s(String(e)).replace(/[+\/]/g, (function(e) {
						return "+" === e ? "-" : "_"
					}
				)).replace(/=/g, "") : s(String(e))
			};
			return c(p("BAIDUID"))
		}
		var f = function(e) {
			var t = new Date
				, i = 0;
			return e ? t.getTime() / 1e3 : (i = t.getFullYear(),
				{
					sec: parseInt(t / 1e3),
					usec: t.getMilliseconds(),
					minuteswest: t.getTimezoneOffset(),
					dsttime: 0 + (new Date(i,0) - Date.UTC(i, 0) !== new Date(i,6) - Date.UTC(i, 6))
				})
		}
			, g = function() {
			var e = 0
				, t = f();
			return e = 1e5 * t["sec"] + t["usec"] / 10 + Math.floor(100 * Math.random()) & 2147483647,
				e
		}
			, m = new d.a.FilterXSS({
			whiteList: u,
			onTagAttr: function(e, t, i) {
				if (/^img|div$/i.test(e) && /^style|src|class$/i.test(t))
					return t + "=" + i
			}
		});
		function v(e) {
			for (var t in e)
				if (e.hasOwnProperty(t)) {
					var i = e[t];
					"string" === typeof i && (e[t] = m.process(i))
				}
			return e
		}
		var _ = s.a.create(a);
		t["a"] = {
			install: function(e, t) {
				_.interceptors.request.use((function(e) {
						e.headers["HTTP-X-ISIS-LOGID"] = g();
						var i = h()
							, n = {
							logid: i
						};
						for (var o in t)
							if (t.hasOwnProperty(o)) {
								var a = t[o];
								"function" === typeof a && (a = a(e)),
								(a || 0 === a) && (n[o] = a)
							}
						return e.params = v(Object.assign({}, e.params, n)),
						e.data && (e.data = v(e.data)),
							e
					}
				), (function(e) {
						return Promise.reject(e)
					}
				)),
					_.interceptors.response.use((function(e) {
							return Object(c["b"])(e)
						}
					), (function(e) {
							var t = e.message ? e.message : "网络异常，请稍后重试"
								, i = {
								errno: -1234567890,
								hasError: !0,
								errmsg: t
							};
							return Promise.resolve(i)
						}
					))
			},
			instance: _
		}
	},
	e4f7: function(e, t, i) {
		"use strict";
		i("295e")
	},
	e565: function(e, t, i) {
		"use strict";
		i.r(t);
		var n = {};
		i.r(n),
			i.d(n, "getScript", (function() {
					return l
				}
			));
		var o = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "share-pop"
			}, [i("u-dialog", {
				staticClass: "titlebar share-pop-dialog",
				attrs: {
					title: e.sharePopTitle,
					width: e.sharePopWidth,
					visible: e.sharePopShow,
					modal: e.shareModal,
					top: e.sharePopTop
				},
				on: {
					"update:visible": function(t) {
						e.sharePopShow = t
					}
				}
			}, [e.shareError ? i("div", {
				staticClass: "share-error"
			}, [i("div", {
				staticClass: "share-error-content"
			}, [i("img", {
				staticClass: "error-icon",
				attrs: {
					src: e.errorIcon,
					alt: ""
				}
			}), i("span", [e._v("加载失败，")]), i("span", {
				staticClass: "try-again",
				on: {
					click: e.getShareInfo
				}
			}, [e._v("点击重试")])])]) : i("div", [e.shareStatus && !e.isExpired ? i("div", {
				staticClass: "share-success"
			}, [i("i", {
				staticClass: "u-icon-success-tips share-success-icon"
			}), e._v("文档已开启分享\n            ")]) : e._e(), i("div", {
				class: ["share-url", e.shareStatus && !e.isExpired ? "share-url-success" : ""]
			}, [i("input", {
				class: ["share-url-text", !e.shareStatus || e.isExpired ? "unshared" : ""],
				attrs: {
					type: "text",
					oncopy: !e.shareStatus || e.isExpired ? "return false" : "",
					readonly: "true"
				},
				domProps: {
					value: e.docLink
				}
			}), i("div", {
				staticClass: "share-button-group"
			}, [i("div", {
				staticClass: "clipboard-box"
			}, [i("u-button", {
				staticClass: "clipboard-btn",
				attrs: {
					status: "primary",
					"data-clipboard-text": e.clipBoardText
				},
				domProps: {
					textContent: e._s(e.shareText)
				},
				on: {
					click: e.handleMainBtnClick
				}
			}), e.showCopySuccess ? i("span", {
				staticClass: "copy-tips"
			}, [e._v("复制链接成功")]) : e._e()], 1), e.shareStatus && !e.isExpired ? i("u-button", {
				staticClass: "u-doc share-cancle",
				attrs: {
					type: "plain",
					status: "primary"
				},
				on: {
					click: e.cancelShare
				}
			}, [e._v("关闭分享")]) : e._e()], 1)]), 2 === e.shareType && e.shareStatus ? i("div", {
				staticClass: "share-verify-code"
			}, [i("span", {
				staticClass: "share-verify-text"
			}, [e._v("提取码")]), i("input", {
				class: ["verify-code-text", !e.shareStatus || e.isExpired ? "unshared" : ""],
				attrs: {
					type: "text",
					readonly: "true"
				},
				domProps: {
					value: e.pwd
				}
			})]) : e._e(), i("div", {
				staticClass: "share-set"
			}, [i("p", {
				staticClass: "share-set-btn",
				on: {
					click: e.toggleShareSetDetail
				}
			}, [i("span", {
				staticClass: "share-set-text"
			}, [e._v("分享设置")]), i("i", {
				class: ["u-icon-arrow-up", e.showShareSetDetail ? "icon-down" : "icon-up"]
			})]), i("span", {
				staticClass: "share-set-tips"
			}, [e._v(e._s(e.shareSetTips))])]), e.showShareSetDetail ? i("table", [i("tr", [i("td", [e._v("有效期")]), i("td", {
				staticClass: "share-period"
			}, [i("u-select", {
				staticClass: "share-period-select",
				attrs: {
					size: "small",
					disabled: e.isLoading
				},
				on: {
					change: e.handleShareTypeChange
				},
				model: {
					value: e.expiredDays,
					callback: function(t) {
						e.expiredDays = t
					},
					expression: "expiredDays"
				}
			}, [i("u-option", {
				attrs: {
					label: "1天",
					value: 1
				}
			}), i("u-option", {
				attrs: {
					label: "7天",
					value: 7
				}
			}), i("u-option", {
				attrs: {
					label: "永久",
					value: 0
				}
			})], 1), e.shareStatus ? i("span", {
				staticClass: "expired-time"
			}, [e._v(e._s(e.expiredTimeText) + "有效")]) : e._e()], 1)]), i("tr", [i("td", [e._v("高级操作")]), i("td", [i("u-checkbox", {
				staticClass: "share-empower",
				attrs: {
					disabled: e.isLoading
				},
				on: {
					change: e.handleShareTypeChange
				},
				model: {
					value: e.empower,
					callback: function(t) {
						e.empower = t
					},
					expression: "empower"
				}
			}), i("span", {
				staticClass: "empower-text"
			}, [e._v("允许转存和导出文档、保存和下载文档中的附件")])], 1)])]) : e._e()])])], 1)
		}
			, a = []
			, r = i("109e")
			, s = i.n(r)
			, c = (i("73a9"),
			i("7cfa"),
			i("8fbb"),
			i("ec56"),
			i("bf49"),
			i("ba4a"),
			i("061a"),
			i("1738"));
		function l(e) {
			return new Promise((function(t, i) {
					var n = document.getElementsByTagName("head")[0]
						, o = document.createElement("script");
					o.src = e,
						o.onload = o.onreadystatechange = function() {
							this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (o.onload = o.onreadystatechange = null,
								t())
						}
						,
						o.onerror = i,
						n.appendChild(o)
				}
			))
		}
		var d = i("98a3");
		function u(e, t) {
			var i = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var n = Object.getOwnPropertySymbols(e);
				t && (n = n.filter((function(t) {
						return Object.getOwnPropertyDescriptor(e, t).enumerable
					}
				))),
					i.push.apply(i, n)
			}
			return i
		}
		function p(e) {
			for (var t = 1; t < arguments.length; t++) {
				var i = null != arguments[t] ? arguments[t] : {};
				t % 2 ? u(Object(i), !0).forEach((function(t) {
						Object(c["a"])(e, t, i[t])
					}
				)) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : u(Object(i)).forEach((function(t) {
						Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
					}
				))
			}
			return e
		}
		var h = {
			moment: p({}, d),
			curl: p({}, n)
		}
			, f = i("ed9b")
			, g = i("19a1")
			, m = i("07a4")
			, v = m["a"].setShareInfo
			, _ = {
			name: "SharePop",
			data: function() {
				return {
					sharePopTitle: "分享文档",
					sharePopWidth: "fit-content",
					sharePopTop: "15vh",
					shareModal: !0,
					showCopySuccess: !1,
					showShareSetDetail: !1,
					empower: !0,
					errorIcon: i("af7e"),
					isLoading: !1,
					sharePopShow: !1,
					loadingInstance: null,
					defaultACL: [1, 2],
					timer: null
				}
			},
			props: {
				popShow: !1,
				title: ""
			},
			watch: {
				popShow: function(e) {
					this.sharePopShow = e,
					e && this.getShareInfo(),
					!e && (this.showCopySuccess = !1),
					this.showShareSetDetail && (this.showShareSetDetail = !1)
				},
				sharePopShow: function(e) {
					!e && this.handleClosePop()
				},
				isLoading: function(e) {},
				acl: function(e, t) {
					e.length === t.length || e.length ? e.length && e.length !== t.length && (this.empower = !0) : this.empower = !1
				}
			},
			computed: {
				shareText: function() {
					return !this.shareStatus || this.isExpired ? "开启分享" : 1 === this.shareType ? "复制链接" : "复制链接及提取码"
				},
				clipBoardText: function() {
					return 2 === this.shareType ? "".concat(this.title ? this.title + " " : "", "链接：").concat(this.docLink, " 提取码：").concat(this.pwd) : this.docLink
				},
				shareSetTips: function() {
					var e = this.expiredDays ? this.expiredDays + "天" : "永久";
					return "文档".concat(e, "有效").concat(2 === this.shareType ? "，需要提取码" : "")
				},
				isAuthor: function() {
					return m["b"].shareInfo.isAuthor
				},
				pwd: function() {
					return m["b"].shareInfo.pwd
				},
				docLink: function() {
					return m["b"].shareInfo.docLink
				},
				surl: function() {
					return m["b"].shareInfo.surl
				},
				isExpired: function() {
					return m["b"].shareInfo.isExpired
				},
				shareStatus: function() {
					return m["b"].shareInfo.shareStatus
				},
				expiredTime: function() {
					return m["b"].shareInfo.expiredTime
				},
				shareError: function() {
					return m["b"].shareInfo.shareError
				},
				docid: function() {
					return m["b"].shareInfo.docid
				},
				expiredDays: {
					get: function() {
						return m["b"].shareInfo.expiredDays
					},
					set: function(e) {
						v({
							expiredDays: e
						})
					}
				},
				expiredTimeText: function() {
					return this.expiredDays ? this.formatTime(this.expiredTime) + "前" : "永久"
				},
				acl: function() {
					return m["b"].shareInfo.acl
				},
				shareType: function() {
					return m["b"].shareInfo.shareType
				}
			},
			mounted: function() {
				this.initClipboard()
			},
			inject: ["getShareInfo"],
			methods: {
				handleClosePop: function() {
					this.$emit("handleClosePop")
				},
				handleMainBtnClick: function() {
					!this.shareStatus || this.isExpired ? (this.$ubc.send("wpdoc_edit_share_open"),
						this.updateShareInfo()) : this.$ubc.send("wpdoc_edit_share_copy")
				},
				initClipboard: function() {
					var e = this
						, t = new s.a(".share-pop .clipboard-btn");
					t.on("success", (function(t) {
							e.handleShowCopySuccess(),
								e.$Message({
									type: "success",
									message: "复制成功"
								}),
								t.clearSelection()
						}
					)),
						t.on("error", (function(e) {
								this.$Message({
									type: "error",
									message: "复制失败，请重试或手动复制"
								})
							}
						))
				},
				toggleShareSetDetail: function() {
					this.showShareSetDetail = !this.showShareSetDetail
				},
				cancelShare: function() {
					var e = this;
					this.$ubc.send("wpdoc_edit_share_cancel");
					var t = {
						docid: this.docid,
						type: 0,
						surl: this.surl
					};
					Object(g["c"])(t).then((function(t) {
							if (0 === t.errno) {
								e.$Message({
									type: "success",
									message: "分享取消成功"
								});
								var i = t.data["shareinfo"];
								v({
									docLink: i["doclink"],
									surl: i["surl"],
									isExpired: i["is_expired"],
									pwd: i["pwd"] || Object(f["b"])(),
									shareStatus: i["share_status"],
									expiredTime: i["expired_time"],
									isAuthor: i["is_author"],
									acl: e.defaultACL,
									shareError: !1
								}),
								i["surl"] || v({
									shareError: !0
								}),
									e.showCopySuccess = !1
							} else
								v({
									shareError: !0
								})
						}
					)).catch((function() {
							e.$Message({
								type: "error",
								message: "分享取消失败，请重试"
							}),
								v({
									shareError: !0
								})
						}
					))
				},
				formatTime: function(e) {
					return h.moment.formatTime(e)
				},
				updateShareInfo: function() {
					var e = this;
					this.isLoading = !0;
					var t = {
						docid: this.docid,
						expired_days: this.expiredDays,
						type: this.shareType,
						surl: this.surl
					};
					2 === this.shareType && (t["pwd"] = this.pwd || Object(f["b"])()),
						this.empower ? t["acl"] = JSON.stringify(this.defaultACL) : t["acl"] = JSON.stringify([]),
						Object(g["c"])(t).then((function(t) {
								var i = t.data
									, n = t.errno;
								if (0 === n) {
									var o = i["shareinfo"];
									o["surl"] ? (e.shareStatus || e.$ubc.send("wpdoc_edit_share_open_success"),
										v({
											docLink: o["doclink"],
											surl: o["surl"],
											isExpired: o["is_expired"],
											pwd: o["pwd"],
											shareStatus: o["share_status"],
											expiredTime: o["expired_time"],
											isAuthor: o["is_author"],
											acl: o["acl"],
											shareError: !1
										}),
										e.$ubc.send("wpdoc_edit_share_" + e.expiredDays)) : (v({
										shareError: !0
									}),
										e.$ubc.send("wpdoc_edit_share_open_fail"))
								} else
									e.shareStatus && e.$ubc.send("wpdoc_edit_share_open_fail"),
										v({
											shareError: !0
										});
								e.isLoading = !1
							}
						)).catch((function(t) {
								console.log(t),
									v({
										shareError: !0
									}),
									e.isLoading = !1
							}
						))
				},
				handleShareTypeChange: function() {
					this.shareStatus && !this.isExpired && (this.$ubc.send("wpdoc_edit_share_change"),
						this.updateShareInfo())
				},
				handleShowCopySuccess: function() {
					var e = this;
					this.timer && (clearTimeout(this.timer),
						this.timer = null),
						this.showCopySuccess = !0,
						this.timer = setTimeout((function() {
								e.showCopySuccess = !1
							}
						), 3e3)
				}
			}
		}
			, y = _
			, w = (i("0766"),
			i("52c5"))
			, b = Object(w["a"])(y, o, a, !1, null, null, null)
			, C = b.exports;
		t["default"] = C
	},
	e82d: function(e, t, i) {},
	eb6b: function(e, t, i) {
		"use strict";
		i("4220")
	},
	ed9b: function(e, t, i) {
		"use strict";
		i.d(t, "b", (function() {
				return n
			}
		)),
			i.d(t, "a", (function() {
					return w
				}
			)),
			i.d(t, "d", (function() {
					return b
				}
			)),
			i.d(t, "c", (function() {
					return C
				}
			));
		i("203a"),
			i("ccbb"),
			i("a6f9");
		function n() {
			for (var e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], t = "", i = 0; i < 4; i++) {
				var n = Math.floor(Math.random() * e.length);
				t += e[n]
			}
			return t
		}
		var o = /(.*)\.(doc|docx|dot|dotx|rtf|ots|odm|odt)$/i
			, a = /(.*)\.(xls|xlsx|xlt|xltx|ots|ods|csv)$/i
			, r = /(.*)\.(txt|pdf|apk|exe|psd|torrent|mmap|mm|xmind|numbers|pages|link|vsd)$/i
			, s = /(.*)\.(ppt|pptx|ppst|potx|pps|pot)$/i
			, c = /(.*)\.(html|htm|xhtml|xml)$/i
			, l = /(.*)\.(css|less|sass)$/i
			, d = /(.*)\.(js|ts|jsx|tsx)$/i
			, u = /(.*)\.(eot|otf|fon|font|ttf|ttc|woff|woff2)$/i
			, p = /(.*)\.(zip|rar|7z|gz|tgz|tar)$/i
			, h = /(.*)\.(dwg|dxf|dwt|dwl|dwl2)$/i
			, f = /(.*)\.(apk|exe|msi|ipa)$/i
			, g = /(.*)\.(torrent)$/i
			, m = /(.*)\.(wma|ra|ram|mp2|ogg|aif|mpega|amr|mid|midi|wav|mp3|aac|ac3|m4a|m2a|3gpp|flac)$/i
			, v = /(.*)\.(jpe|cur|svg|svgz|tif|tiff|ico|jpg|jpeg|gif|bmp|png|webp|heic|heif|avci|livp)$/i
			, _ = /(.*)\.(3gp|mpga|qt|rm|wmz|wmd|wvx|wmx|wm|mpeg|swf|mpg|wmv|rmvb|mpeg4|mp4|mpeg2|flv|avi|mkv|f4v|mov|vob|m4v|dat|mts|m2ts|m3u8|m3u|asf|3g2|mj2|ts|webm|pmp|mtv|amv)$/i
			, y = /(.*)\.(ods|ots|odt|rtf|dot|dotx|odm|pps|pot|xlt|xltx|csv|ppsx|potx|doc|docx|xls|xlsx|ppt|pptx|vsd|txt|pdf|key|pages|numbers|chm|epub)$/i
			, w = {
			word: o,
			excel: a,
			single: r,
			ppt: s,
			html: c,
			css: l,
			js: d,
			font: u,
			compress: p,
			cad: h,
			audioReg: m,
			imageReg: v,
			videoReg: _,
			appReg: f,
			office: y,
			btReg: g
		};
		function b(e, t, i) {
			var n = null
				, o = null
				, a = null
				, r = 0
				, s = {
				leading: !0,
				trailing: !0
			};
			i = Object.assign({}, s, i);
			var c = function() {
				r = !1 === i.leading ? 0 : (new Date).getTime(),
					n = null,
					e.apply(o, a),
				n || (o = a = null)
			}
				, l = function() {
				var s = (new Date).getTime();
				r || !1 !== i.leading || (r = s);
				var l = t - (s - r);
				o = this,
					a = arguments,
					l <= 0 || l > t ? (n && (clearTimeout(n),
						n = null),
						r = s,
						e.apply(o, a),
					n || (o = a = null)) : n || !1 === i.trailing || (n = setTimeout(c, l))
			};
			return l
		}
		function C(e) {
			var t = new RegExp("(^|&)".concat(e, "=([^&]*)(&|$)"),"i")
				, i = window.location.search.substr(1).match(t);
			return null != i ? unescape(i[2]) : null
		}
	},
	f148: function(e, t, i) {},
	f2d6: function(e, t, i) {
		var n = {
			"./general/index.js": "7954",
			"./simple/index.js": "7c01"
		};
		function o(e) {
			var t = a(e);
			return i(t)
		}
		function a(e) {
			if (!i.o(n, e)) {
				var t = new Error("Cannot find module '" + e + "'");
				throw t.code = "MODULE_NOT_FOUND",
					t
			}
			return n[e]
		}
		o.keys = function() {
			return Object.keys(n)
		}
			,
			o.resolve = a,
			e.exports = o,
			o.id = "f2d6"
	},
	f4a0: function(e, t, i) {
		"use strict";
		i("5a42")
	},
	f5de: function(e, t, i) {
		"use strict";
		i.r(t);
		var n = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("u-dialog", {
				staticClass: "template-preview-dialog",
				attrs: {
					width: "1000px",
					top: "0px",
					title: e.templatePreviewParams.templateInfo.name,
					visible: e.dialogVisible
				},
				on: {
					"update:visible": function(t) {
						e.dialogVisible = t
					},
					close: e.closeTemplatePop
				}
			}, [i("div", [i("page-state", {
				directives: [{
					name: "show",
					rawName: "v-show",
					value: "success" !== e.pageStatus,
					expression: "pageStatus !== 'success'"
				}],
				staticClass: "template-preview-status",
				attrs: {
					status: e.pageStatus
				},
				on: {
					"refresh-template": e.refreshTemplate
				}
			}), i("div", {
				directives: [{
					name: "show",
					rawName: "v-show",
					value: "success" === e.pageStatus,
					expression: "pageStatus === 'success'"
				}],
				attrs: {
					id: "wpdoc-editor-preview"
				}
			})], 1), i("div", {
				staticClass: "dialog-footer",
				attrs: {
					slot: "footer"
				},
				slot: "footer"
			}, [i("u-button", {
				staticClass: "btn",
				attrs: {
					size: "medium",
					status: "primary",
					disabled: !e.lastContents
				},
				on: {
					click: e.useTemplate
				}
			}, [e._v("\n            立即使用\n        ")])], 1)])
		}
			, o = []
			, a = (i("fd7f"),
			i("e137"))
			, r = i.n(a)
			, s = (i("7d06"),
			i("5a0a"))
			, c = i("5eb9")
			, l = i.n(c)
			, d = function() {
			var e = this
				, t = e.$createElement
				, i = e._self._c || t;
			return i("div", {
				staticClass: "wpdoc-pageState-main"
			}, ["loading" === e.status ? i("div", {
				staticClass: "state-box state-load"
			}, [e._v("\n        内容正在加载中，请耐心等候\n    ")]) : e._e(), "loadFail" === e.status ? i("div", {
				staticClass: "state-box state-fail"
			}, [i("p", [e._v("加载失败,重新尝试")]), i("u-button", {
				staticClass: "btn",
				attrs: {
					size: "small"
				},
				on: {
					click: e.handleRefresh
				}
			}, [e._v("尝试刷新")])], 1) : e._e()])
		}
			, u = []
			, p = {
			name: "State",
			props: {
				status: {
					type: String,
					default: ""
				}
			},
			methods: {
				handleRefresh: function() {
					this.$emit("refresh-template")
				}
			}
		}
			, h = p
			, f = (i("c1cb"),
			i("52c5"))
			, g = Object(f["a"])(h, d, u, !1, null, null, null)
			, m = g.exports
			, v = i("4a22")
			, _ = {
			name: "templatePreview",
			props: {
				reportPopShow: !1
			},
			components: {
				PageState: m
			},
			data: function() {
				return {
					dialogVisible: !1,
					preEditor: null,
					preDocInfo: [],
					pageStatus: "loading",
					lastContents: {}
				}
			},
			computed: {
				templateId: function() {
					return this.templatePreviewParams.templateId
				}
			},
			watch: {
				templateId: function(e) {
					this.getTemplateContent(e)
				},
				reportPopShow: function(e) {
					this.dialogVisible = e,
					e && !this.preEditor && this.getTemplateword()
				}
			},
			inject: ["templatePreviewParams"],
			methods: {
				getTemplateword: function() {
					var e = this;
					this.$nextTick((function() {
							e.preEditor = new l.a({
								container: "wpdoc-editor-preview",
								pagePadding: {
									top: "96px",
									bottom: "96px",
									left: "100px",
									right: "100px"
								},
								readOnly: !0,
								modules: {
									blotViewerSwitch: !0
								}
							})
						}
					))
				},
				closeTemplatePop: function() {
					this.templatePreviewParams.show = !1,
						this.$ubc.send({
							name: "wpdoc_tpl_pre_close",
							ext: {
								tpl_card_clk: this.templatePreviewParams.templateId,
								tag: this.templatePreviewParams.templateInfo.tag
							}
						})
				},
				getTemplateContent: function() {
					var e = Object(s["a"])(r.a.mark((function e(t) {
							var i, n, o, a, s, c;
							return r.a.wrap((function(e) {
									while (1)
										switch (e.prev = e.next) {
											case 0:
												return i = (new Date).getTime(),
													this.pageStatus = "loading",
													e.next = 4,
													Object(v["b"])({
														template_id: t
													});
											case 4:
												n = e.sent,
													o = n.errno,
													a = n.data,
													s = (new Date).getTime(),
													c = s - i,
													0 === o && a && a.content ? (this.pageStatus = "success",
														this.lastContents = JSON.parse(a.content) || {},
														this.preEditor.setContents(this.lastContents),
														this.$ubc.send({
															name: "wpdoc_tpl_pre_time",
															ext: {
																pre_tpl_time: c
															}
														}),
														this.$ubc.send("wpdoc_tpl_pre_suc")) : (this.pageStatus = "loadFail",
														this.lastContents = null,
														this.$ubc.send({
															name: "wpdoc_tpl_pre_time",
															ext: {
																pre_tpl_time: c
															}
														}),
														this.$ubc.send("wpdoc_tpl_pre_fail"));
											case 10:
											case "end":
												return e.stop()
										}
								}
							), e, this)
						}
					)));
					function t(t) {
						return e.apply(this, arguments)
					}
					return t
				}(),
				useTemplate: function() {
					var e = this.templatePreviewParams.templateInfo
						, t = e["template_id"]
						, i = e.name
						, n = this.$route.query.path || encodeURIComponent("/");
					Object(v["c"])({
						template_id: t
					}),
						this.$ubc.send({
							name: "wpdoc_tpl_crt_tp_clk",
							ext: {
								tag: e.tag
							}
						}),
						this.$ubc.send({
							name: "wpdoc_tpl_pre_use",
							ext: {
								tpl_card_clk: this.templatePreviewParams.templateId,
								tag: this.templatePreviewParams.templateInfo.tag
							}
						}),
						setTimeout((function() {
								var e = "action=create&path=".concat(n);
								e += "&templateid=".concat(t, "&tplname=").concat(encodeURIComponent(i)),
									window.location.href = "".concat(location.origin, "/doc/edit?").concat(e)
							}
						), 100)
				},
				refreshTemplate: function() {
					this.pageStatus = "loading",
						this.getTemplateContent(this.templateId)
				}
			}
		}
			, y = _
			, w = (i("1d97"),
			Object(f["a"])(y, n, o, !1, null, null, null))
			, b = w.exports;
		t["default"] = b
	},
	fd81: function(e, t, i) {},
	fecf: function(e, t, i) {
		"use strict";
		i("0b42")
	}
});
