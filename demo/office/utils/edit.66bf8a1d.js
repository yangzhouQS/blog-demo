(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["edit", "notfound"], {
	"0a7b": function(t, e, i) {},
	"14f4": function(t, e, i) {
		"use strict";
		i("1950")
	},
	1950: function(t, e, i) {},
	"1bb1": function(t, e, i) {
		"use strict";
		i("e6a3")
	},
	"2e82": function(t, e, i) {},
	3334: function(t, e, i) {
		"use strict";
		var s = "此链接分享内容可能因为涉及侵权、色情、反动、低俗等信息，无法访问！";
		e["a"] = {
			200120060002: "啊哦！链接错误没找到文件，请打开正确的分享链接!",
			200120060003: "啊哦！链接错误没找到文件，请打开正确的分享链接!",
			200120065001: s,
			200120065002: s,
			200120065003: "系统升级，链接暂时无法查看，升级完成后恢复正常",
			200120065004: "啊哦，来晚了，该分享文件已过期",
			200121102114: "",
			200121102135: s,
			200121102136: s,
			200121102015: "",
			200121102016: s,
			200121102017: s,
			200121102018: s,
			200121102019: s,
			200121102020: s,
			200121102021: s,
			200121102116: ""
		}
	},
	3602: function(t, e, i) {
		"use strict";
		i("6436")
	},
	"37e4": function(t, e, i) {
		"use strict";
		i.r(e);
		var s = function() {
			var t = this
				, e = t.$createElement
				, i = t._self._c || e;
			return i("div", {
				ref: "ele",
				staticClass: "wscn-http404",
				style: {
					height: t.height
				}
			}, [i("div", {
				staticClass: "pic-404"
			}, [i("img", {
				staticClass: "pic-404__parent",
				attrs: {
					src: t.img404,
					alt: "404"
				}
			}), i("img", {
				staticClass: "pic-404__child left",
				attrs: {
					src: t.img404Cloud,
					alt: "404"
				}
			}), i("img", {
				staticClass: "pic-404__child mid",
				attrs: {
					src: t.img404Cloud,
					alt: "404"
				}
			}), i("img", {
				staticClass: "pic-404__child right",
				attrs: {
					src: t.img404Cloud,
					alt: "404"
				}
			})]), t._m(0)])
		}
			, a = [function() {
			var t = this
				, e = t.$createElement
				, i = t._self._c || e;
			return i("div", {
				staticClass: "exception"
			}, [i("div", {
				staticClass: "exception__headline"
			}, [t._v("抱歉，你访问的页面不存在")]), i("a", {
				staticClass: "exception__return-home",
				attrs: {
					href: "/"
				}
			}, [t._v("返回首页")])])
		}
		]
			, n = i("c18c")
			, o = i.n(n)
			, r = i("c278")
			, c = i.n(r)
			, l = {
			name: "page404",
			data: function() {
				return {
					img404: o.a,
					img404Cloud: c.a,
					height: "auto"
				}
			},
			mounted: function() {
				var t = this.$refs.ele.parentNode;
				this.height = window.getComputedStyle(t, null).getPropertyValue("height")
			}
		}
			, d = l
			, u = (i("cef9"),
			i("52c5"))
			, p = Object(u["a"])(d, s, a, !1, null, "0c516451", null)
			, h = p.exports;
		e["default"] = h
	},
	"3c0a": function(t, e, i) {
		t.exports = i.p + "doc-static/doc/img/guide-attachment.2ea3930d.gif?2ea3930d"
	},
	6436: function(t, e, i) {},
	"677e": function(t, e, i) {
		t.exports = i.p + "doc-static/doc/img/guide-history.c6a299ab.gif?c6a299ab"
	},
	"68ed": function(t, e, i) {},
	"6e19": function(t, e, i) {
		"use strict";
		i("2e82")
	},
	"919a": function(t, e, i) {
		t.exports = i.p + "doc-static/doc/img/guide-share.54c23ee0.gif?54c23ee0"
	},
	9417: function(t, e, i) {
		"use strict";
		i("e808")
	},
	a74f: function(t, e, i) {
		"use strict";
		var s = i("ef98")
			, a = i("1d76")
			, n = i("7a19")
			, o = "endsWith"
			, r = ""[o];
		s(s.P + s.F * i("c982")(o), "String", {
			endsWith: function(t) {
				var e = n(this, t, o)
					, i = arguments.length > 1 ? arguments[1] : void 0
					, s = a(e.length)
					, c = void 0 === i ? s : Math.min(a(i), s)
					, l = String(t);
				return r ? r.call(e, l, c) : e.slice(c - l.length, c) === l
			}
		})
	},
	c18c: function(t, e, i) {
		t.exports = i.p + "doc-static/doc/img/404.a57b6f31.png?a57b6f31"
	},
	c278: function(t, e, i) {
		t.exports = i.p + "doc-static/doc/img/404_cloud.0f4bc32b.png?0f4bc32b"
	},
	c346: function(t, e, i) {
		"use strict";
		i.r(e);
		var s = function() {
			var t = this
				, e = t.$createElement
				, i = t._self._c || e;
			return i("div", [i("Layout", {
				attrs: {
					"toolbar-height": t.toolbarH,
					"page-status": t.pageStatus,
					title: t.name,
					fileVersion: t.fileVersion
				},
				scopedSlots: t._u([{
					key: "header-left",
					fn: function() {
						return [i("header-left", {
							attrs: {
								"page-status": t.pageStatus,
								title: t.name,
								"save-status": t.saveStatus,
								beforeunloadPage: t.beforeunloadPage
							},
							on: {
								"update:title": function(e) {
									t.name = e
								}
							}
						})]
					},
					proxy: !0
				}])
			}, [i("div", {
				staticClass: "wpdoc-editor-page",
				attrs: {
					id: "wpdoc-editor-page"
				}
			}, ["notFound" === t.pageType ? i("not-found") : "initEditor" !== t.pageStatus || "successed" !== t.pageStatus ? i("page-state", {
				attrs: {
					status: t.pageStatus,
					errMsg: t.errMsg,
					logPageTypeStr: t.logPageTypeStr
				},
				on: {
					"re-create": t.handleCreate,
					"re-getfilemetas": t.getFileMetas,
					"re-convert": t.convertDoc
				}
			}) : t._e(), "successed" === t.pageStatus ? i("directory", {
				attrs: {
					editorId: "wpdoc-editor",
					scrollDomId: "wpdoc-editor-page"
				}
			}) : t._e(), i("div", {
				directives: [{
					name: "show",
					rawName: "v-show",
					value: "initEditor" === t.pageStatus || "successed" === t.pageStatus,
					expression: "pageStatus === 'initEditor' || pageStatus === 'successed'"
				}],
				staticClass: "wpdoc-editor-out"
			}, [i("div", {
				staticClass: "wpdoc-editor-inbox"
			}, [i("div", {
				attrs: {
					id: "wpdoc-editor"
				}
			})])]), i("u-dialog", {
				staticClass: "wpdoc-sameNameWpPopup titlebar",
				attrs: {
					title: "提示",
					width: "450px",
					center: !0,
					"show-close": !1,
					"close-on-click-modal": !1,
					"close-on-press-escape": !1,
					visible: t.hasSameWpDocPopupVisible
				},
				on: {
					"update:visible": function(e) {
						t.hasSameWpDocPopupVisible = e
					}
				}
			}, [i("span", [t._v("已存在同名的在线文档，是打开此同名在线文档还是新建一个在线文档")]), i("div", {
				staticClass: "dialog-footer",
				attrs: {
					slot: "footer"
				},
				slot: "footer"
			}, [i("u-button", {
				staticClass: "btn",
				attrs: {
					size: "medium"
				},
				on: {
					click: t.handleCreate
				}
			}, [t._v("\n                        新建\n                    ")]), i("u-button", {
				staticClass: "btn",
				attrs: {
					size: "medium",
					status: "primary"
				},
				on: {
					click: t.handleOpenWp
				}
			}, [t._v("\n                        打开\n                    ")])], 1)]), i("u-dialog", {
				staticClass: "wpdoc-password titlebar",
				attrs: {
					title: "请输入文档的密码",
					width: "450px",
					center: !0,
					"show-close": !1,
					"close-on-click-modal": !1,
					"close-on-press-escape": !1,
					visible: t.passwordPopupVisiable
				},
				on: {
					"update:visible": function(e) {
						t.passwordPopupVisiable = e
					}
				}
			}, [i("p", {
				staticClass: "text"
			}, [t._v(t._s(t.passwordTipText))]), i("p", [i("u-input", {
				attrs: {
					"show-password": ""
				},
				model: {
					value: t.password,
					callback: function(e) {
						t.password = e
					},
					expression: "password"
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
					disabled: "" === t.password
				},
				on: {
					click: t.handleConvertTakePassword
				}
			}, [t._v("\n                        确定\n                    ")])], 1)]), i("u-dialog", {
				staticClass: "wpdoc-delete",
				attrs: {
					width: "450px",
					"show-close": !1,
					visible: t.deletePopupVisiable
				},
				on: {
					"update:visible": function(e) {
						t.deletePopupVisiable = e
					}
				}
			}, [i("p", {
				staticClass: "text"
			}, [t._v("文档已被删除")]), i("p", {
				staticClass: "text"
			}, [t._v("你无法访问此文档")]), i("div", {
				staticClass: "dialog-footer",
				attrs: {
					slot: "footer"
				},
				slot: "footer"
			}, [i("u-button", {
				staticClass: "btn",
				attrs: {
					size: "medium",
					status: "primary"
				},
				on: {
					click: t.onFileDelete
				}
			}, [t._v("\n                        确定\n                    ")])], 1)]), i("upload-entry-pop", {
				ref: "uploadEntryPop",
				attrs: {
					editor: t.editor,
					wpName: t.name
				}
			})], 1), "successed" === t.pageStatus ? i("editor-footer", {
				attrs: {
					count: t.wordCount
				}
			}) : t._e()], 1), t.isShowHistory ? i("history", {
				attrs: {
					title: t.name,
					"wp-fsid": t.wpFsid,
					"file-version": t.fileVersion,
					"last-contents": t.lastContents,
					"last-contents-modifytime": t.lastContentsModifytime
				},
				on: {
					"update:lastContentsModifytime": function(e) {
						t.lastContentsModifytime = e
					},
					"update:last-contents-modifytime": function(e) {
						t.lastContentsModifytime = e
					},
					"revert-historyversion": t.handleSetSomeHvDocContainer
				}
			}) : t._e(), t.guideVisiable ? i("guide", {
				attrs: {
					visiable: t.guideVisiable
				},
				on: {
					"update:visiable": function(e) {
						t.guideVisiable = e
					}
				}
			}) : t._e()], 1)
		}
			, a = []
			, n = (i("a57e"),
			i("a24c"),
			i("0755"),
			i("35c3"),
			i("7896"),
			i("b693"),
			i("ba4a"),
			i("ec56"),
			i("ebd9"),
			i("626b"),
			i("fd7f"),
			i("1738"))
			, o = (i("a74f"),
			i("44fa"),
			i("ccbb"),
			i("e137"))
			, r = i.n(o)
			, c = (i("7d06"),
			i("5a0a"))
			, l = i("37e4")
			, d = function() {
			var t = this
				, e = t.$createElement
				, i = t._self._c || e;
			return i("section", {
				staticClass: "wpdoc-layout-editpage"
			}, [i("div", {
				staticClass: "frame-header"
			}, [i("Header", {
				attrs: {
					"page-status": t.pageStatus,
					title: t.title,
					fileVersion: t.fileVersion
				}
			}, [t._t("header-left")], 2), t._t("toolbar")], 2), i("div", {
				ref: "frameContent",
				staticClass: "frame-content",
				style: {
					top: 50 + t.toolbarHeight + "px"
				}
			}, [i("div", {
				staticClass: "frame-main"
			}, [t._t("default")], 2)])])
		}
			, u = []
			, p = function() {
			var t = this
				, e = t.$createElement
				, i = t._self._c || e;
			return i("header", {
				staticClass: "wpdoc-editpage-header"
			}, [i("div", {
				staticClass: "header-left"
			}, [t._t("default")], 2), i("div", {
				staticClass: "header-right"
			}, [i("user-info"), i("share-button", {
				attrs: {
					"page-status": t.pageStatus,
					title: t.title
				}
			}), "successed" === t.pageStatus ? i("FileMenu", {
				attrs: {
					title: t.title,
					page: "editPage",
					"page-status": t.pageStatus,
					fileVersion: t.fileVersion
				}
			}) : t._e()], 1)])
		}
			, h = []
			, f = i("d53d")
			, g = i("d892")
			, m = i("a8de")
			, v = {
			name: "EditHeader",
			components: {
				UserInfo: f["default"],
				ShareButton: g["default"],
				FileMenu: m["default"]
			},
			data: function() {
				return {}
			},
			props: {
				pageStatus: "",
				title: "",
				fileVersion: {
					type: Number,
					default: 1
				}
			}
		}
			, b = v
			, w = (i("1bb1"),
			i("52c5"))
			, y = Object(w["a"])(b, p, h, !1, null, null, null)
			, S = y.exports
			, _ = {
			name: "LayoutEdit",
			components: {
				Header: S
			},
			props: {
				toolbarHeight: {
					type: Number,
					default: 100
				},
				pageStatus: {
					type: String,
					default: ""
				},
				title: {
					type: String,
					default: ""
				},
				fileVersion: {
					type: Number,
					default: 1
				}
			}
		}
			, C = _
			, x = (i("d461"),
			Object(w["a"])(C, d, u, !1, null, null, null))
			, P = x.exports
			, T = function() {
			var t = this
				, e = t.$createElement
				, i = t._self._c || e;
			return i("div", {
				staticClass: "wpdoc-editpage-header-left"
			}, [i("div", {
				staticClass: "x-icon x-icon-back",
				on: {
					click: t.backWp
				}
			}), i("div", {
				staticClass: "title-box"
			}, [i("span", {
				staticClass: "title-temp"
			}, [t._v(t._s(t.title))]), i("input", {
				ref: "titleInputRef",
				staticClass: "title-input",
				attrs: {
					type: "text",
					placeholder: "未命名文档",
					disabled: t.renameStatus
				},
				domProps: {
					value: t.title
				},
				on: {
					focus: t.handleTitleInput,
					input: t.handleTitleInput,
					blur: t.handleTitleBlur,
					keyup: function(e) {
						return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.handleTitleBlur(e)
					}
				}
			})]), "successed" === t.pageStatus ? [i("div", {
				staticClass: "save-status-box"
			}, [i("u-tooltip", {
				directives: [{
					name: "show",
					rawName: "v-show",
					value: "ready" === t.saveStatus,
					expression: "saveStatus === 'ready'"
				}],
				attrs: {
					content: "所有更改将自动保存至云端",
					placement: "bottom"
				}
			}, [i("span", {
				staticClass: "x-icon x-icon-save"
			}, [t._v("所有更改将自动保存至云端")])]), i("u-tooltip", {
				directives: [{
					name: "show",
					rawName: "v-show",
					value: "saving" === t.saveStatus,
					expression: "saveStatus === 'saving'"
				}],
				staticClass: "loading-status",
				attrs: {
					content: "所有更改将自动保存至云端",
					placement: "bottom"
				}
			}, [i("span", {
				staticClass: "icon-loading"
			}, [t._v("正在保存...")])]), i("u-tooltip", {
				directives: [{
					name: "show",
					rawName: "v-show",
					value: "success" === t.saveStatus,
					expression: "saveStatus === 'success'"
				}],
				attrs: {
					content: "已保存至云端",
					placement: "bottom"
				}
			}, [i("span", {
				staticClass: "x-icon x-icon-save"
			}, [t._v("已保存")])]), i("u-tooltip", {
				directives: [{
					name: "show",
					rawName: "v-show",
					value: "fail" === t.saveStatus,
					expression: "saveStatus === 'fail'"
				}],
				attrs: {
					content: "网络重连后将自动上传",
					placement: "bottom"
				}
			}, [i("span", {
				staticClass: "x-icon x-icon-offline"
			}, [t._v("保存失败")])]), i("u-tooltip", {
				directives: [{
					name: "show",
					rawName: "v-show",
					value: "offline" === t.saveStatus,
					expression: "saveStatus === 'offline'"
				}],
				attrs: {
					content: "已离线保存，网络重连后将自动上传",
					placement: "bottom"
				}
			}, [i("span", {
				staticClass: "x-icon x-icon-offline"
			}, [t._v("已离线保存")])])], 1)] : t._e(), i("u-dialog", {
				staticClass: "titlebar",
				attrs: {
					title: "提示",
					visible: t.leavePop
				},
				on: {
					"update:visible": function(e) {
						t.leavePop = e
					}
				}
			}, [i("div", {
				staticClass: "dialog-content"
			}, [t._v("离开该页面将丢失当前文档，是否离开?")]), i("template", {
				slot: "footer"
			}, [i("u-button", {
				staticClass: "btn",
				attrs: {
					size: "medium",
					status: "primary"
				},
				on: {
					click: t.leaveDoc
				}
			}, [t._v("\n                    确定\n                ")]), i("u-button", {
				staticClass: "btn",
				attrs: {
					size: "medium"
				},
				on: {
					click: function(e) {
						t.leavePop = !1
					}
				}
			}, [t._v("\n                    关闭\n                ")])], 1)], 2), i("u-dialog", {
				staticClass: "titlebar",
				attrs: {
					title: "提示",
					visible: t.sameNamePop,
					"before-close": t.cancleSameRename
				},
				on: {
					"update:visible": function(e) {
						t.sameNamePop = e
					}
				}
			}, [i("div", {
				staticClass: "dialog-content"
			}, [t._v("此目录下已存在同名文件，是否要保存两个文件")]), i("template", {
				slot: "footer"
			}, [i("u-button", {
				staticClass: "btn",
				attrs: {
					size: "medium",
					status: "primary"
				},
				on: {
					click: t.confirmSameRename
				}
			}, [t._v("\n                    确定\n                ")]), i("u-button", {
				staticClass: "btn",
				attrs: {
					size: "medium"
				},
				on: {
					click: t.cancleSameRename
				}
			}, [t._v("\n                    取消\n                ")])], 1)], 2)], 2)
		}
			, k = []
			, E = (i("a583"),
			i("f865"),
			i("69c1"))
			, I = {
			name: "EditHeaderLeft",
			mixins: [E["a"]],
			data: function() {
				return {
					titleEmptyTipCount: 0,
					titleEmptyTipTimer: null,
					leavePop: !1,
					sameNamePop: !1,
					renameStatus: !1
				}
			},
			props: {
				pageStatus: {
					type: String,
					default: "loading"
				},
				title: {
					type: String,
					default: ""
				},
				saveStatus: {
					type: String,
					default: "saving"
				},
				beforeunloadPage: Function
			},
			mounted: function() {
				this.tempTitle = this.title,
					document.title = "".concat(this.title, " - 百度网盘")
			},
			methods: {
				handleTitleInput: function(t) {
					var e = t.target.value.trim();
					e !== this.tempTitle && this.$emit("update:title", e)
				},
				handleTitleBlur: function(t) {
					var e = t.target.value.trim();
					e !== this.tempTitle && (this.resolveFileName(e) ? this.$emit("update:title", this.tempTitle) : this.rename())
				},
				resolveFileName: function(t) {
					var e = "";
					if (/[\\/:*?'<>|]/i.test(t) || /\.pand/i.test(t))
						e = "文件名不能包含以下字符：<, >, |, *, ?, \\, /, .pand";
					else if (t.length > 0) {
						for (var i = 0, s = 0; i < t.length; i++)
							s = t.charCodeAt(i) < 128 ? s + 1 : s + 2;
						s > 255 && (e = "文件名称长度不能超过255字节")
					} else
						e = "文件名称不能为空，请输入文件名称";
					return e && (this.showMessage("error", e),
						this.$refs.titleInputRef.focus()),
						e
				},
				backWp: function() {
					var t = ["fail", "saving"];
					t.indexOf(this.saveStatus) > -1 ? this.leavePop = !0 : this.leaveDoc()
				},
				leaveDoc: function() {
					window.removeEventListener("beforeunload", this.beforeunloadPage, !1),
						window.location.href = "https://pan.baidu.com/disk/home"
				}
			}
		}
			, $ = I
			, F = (i("3602"),
			Object(w["a"])($, T, k, !1, null, null, null))
			, D = F.exports
			, M = i("54a6")
			, V = function() {
			var t = this
				, e = t.$createElement
				, i = t._self._c || e;
			return i("div", {
				staticClass: "wpdoc-guide-main",
				style: {
					top: t.currentY + "px",
					left: t.currentX + "px"
				}
			}, [i("div", {
				class: ["guide-pointer-box", "guide-pointer-" + t.currentStepInfo.step]
			}, [i("span"), i("span"), i("span")]), i("div", {
				class: ["guide-step-box", "guide-step-" + t.currentStepInfo.step]
			}, [i("div", {
				staticClass: "guide-img"
			}, [i("img", {
				attrs: {
					src: t.currentStepInfo.img,
					alt: ""
				}
			})]), i("h4", {
				staticClass: "title"
			}, [t._v(t._s(t.currentStepInfo.title))]), i("div", {
				staticClass: "desc"
			}, [t._v(t._s(t.currentStepInfo.desc))]), i("div", {
				staticClass: "footer"
			}, [t._v("\n            " + t._s(t.currentStepInfo.stepNo) + "/3\n            "), "third" !== t.currentStepInfo.step ? i("u-button", {
				staticClass: "btn-left",
				attrs: {
					status: "normal",
					size: "small",
					round: ""
				},
				on: {
					click: t.handleClose
				}
			}, [t._v("\n                跳过\n            ")]) : i("u-button", {
				staticClass: "btn-left",
				attrs: {
					status: "normal",
					size: "small",
					round: ""
				},
				on: {
					click: t.handleNext
				}
			}, [t._v("\n                重看\n            ")]), "third" !== t.currentStepInfo.step ? i("u-button", {
				staticClass: "btn-right",
				attrs: {
					status: "primary",
					size: "small",
					round: ""
				},
				on: {
					click: t.handleNext
				}
			}, [t._v("\n                下一步\n            ")]) : i("u-button", {
				staticClass: "btn-right",
				attrs: {
					status: "primary",
					size: "small",
					round: ""
				},
				on: {
					click: t.handleClose
				}
			}, [t._v("\n                完成\n            ")])], 1)]), i("div", {
				directives: [{
					name: "show",
					rawName: "v-show",
					value: "third" === t.currentStepInfo.step,
					expression: "currentStepInfo.step === 'third'"
				}],
				staticClass: "guide-step-other"
			})])
		}
			, O = []
			, H = i("3c0a")
			, R = i.n(H)
			, L = i("919a")
			, N = i.n(L)
			, q = i("677e")
			, j = i.n(q)
			, B = i("ed9b")
			, W = {
			name: "Guide",
			data: function() {
				return {
					stepMap: {
						first: {
							name: "attachment",
							stepNo: 1,
							step: "first",
							nextStep: "second",
							img: R.a,
							title: "自由插入各种附件",
							desc: "支持插入各种格式附件。文档、视频附件支持切换小窗视图直接预览，方便整理工作、学习资料。"
						},
						second: {
							name: "share",
							stepNo: 2,
							step: "second",
							nextStep: "third",
							img: N.a,
							title: "方便分享文档给好友",
							desc: "唯一链接，一键开启或关闭分享，支持设置有效期和转存、下载权限。"
						},
						third: {
							name: "more",
							stepNo: 3,
							step: "third",
							nextStep: "first",
							img: j.a,
							title: "安全可回溯的历史版本",
							desc: "系统自动间接性生成文档版本，也支持手动存储。支持随时还原到任意版本，保障数据安全。"
						}
					},
					currentStepInfo: {},
					attachmentBtnPosX: 0,
					attachmentBtnPosY: 0,
					shareBtnPosX: 0,
					shareBtnPosY: 0,
					moreBtnPosX: 0,
					moreBtnPosY: 0,
					handleResizeMethod: null
				}
			},
			props: {
				visibale: {
					type: Boolean,
					default: !1
				}
			},
			computed: {
				currentX: function() {
					var t = this["".concat(this.stepMap[this.currentStepInfo.step].name, "BtnPosX")];
					return t
				},
				currentY: function() {
					var t = this["".concat(this.stepMap[this.currentStepInfo.step].name, "BtnPosY")];
					return t
				}
			},
			created: function() {
				this.currentStepInfo = this.stepMap.first
			},
			mounted: function() {
				var t = this;
				this.handleCalculateGuidePosition(),
					this.handleResizeMethod = Object(B["d"])(this.handleCalculateGuidePosition, 300),
					window.addEventListener("resize", this.handleResizeMethod, !1),
					this.$once("hook:beforeDestroy", (function() {
							window.removeEventListener("resize", t.handleResizeMethod)
						}
					))
			},
			methods: {
				handleCalculateGuidePosition: function() {
					var t = document.querySelector("#wpdoc-editor")
						, e = document.querySelector(".wpdoc-editpage-header")
						, i = t.querySelector(".ql-attachment")
						, s = e.querySelector(".wpdoc-share")
						, a = e.querySelector(".wpdoc-filemenu")
						, n = i.getBoundingClientRect()
						, o = s.getBoundingClientRect()
						, r = a.getBoundingClientRect()
						, c = i.offsetWidth
						, l = i.offsetHeight
						, d = s.offsetWidth
						, u = s.offsetHeight
						, p = a.offsetWidth
						, h = a.offsetHeight
						, f = 24
						, g = 24
						, m = {
						x: n.left + Math.floor((c - f) / 2),
						y: n.top + Math.floor((l - g) / 2)
					}
						, v = {
						x: o.left + Math.floor((d - f) / 2),
						y: o.top + Math.floor((u - g) / 2)
					}
						, b = {
						x: r.left + Math.floor((p - f) / 2),
						y: r.top + Math.floor((h - g) / 2)
					};
					this.attachmentBtnPosX = m.x,
						this.attachmentBtnPosY = m.y,
						this.shareBtnPosX = v.x,
						this.shareBtnPosY = v.y,
						this.moreBtnPosX = b.x,
						this.moreBtnPosY = b.y
				},
				handleNext: function() {
					switch (this.currentStepInfo = this.stepMap[this.currentStepInfo.nextStep],
						this.currentStepInfo.step) {
						case "third":
							this.$ubc.send("wpdoc_edit_guide_complate");
							break;
						case "first":
							this.$ubc.send("wpdoc_edit_guide_rewatch");
							break;
						default:
							break
					}
				},
				handleClose: function() {
					this.$emit("update:visiable", !1),
					"third" !== this.currentStepInfo.step && this.$ubc.send("wpdoc_edit_guide_skip")
				}
			}
		}
			, z = W
			, U = (i("9417"),
			Object(w["a"])(z, V, O, !1, null, null, null))
			, A = U.exports
			, G = i("729d")
			, X = function() {
			var t = this
				, e = t.$createElement
				, i = t._self._c || e;
			return i("div", {
				staticClass: "wpdoc-editor-settingbar-footermain"
			}, [i("div", {
				staticClass: "wordcount-box"
			}, [i("word-count", {
				attrs: {
					count: t.count
				}
			})], 1)])
		}
			, Y = []
			, J = function() {
			var t = this
				, e = t.$createElement
				, i = t._self._c || e;
			return i("div", {
				staticClass: "wpdoc-editor-wordcount-box"
			}, [t._v("\n    字数：" + t._s(t.count) + "\n")])
		}
			, K = []
			, Q = {
			name: "WordCount",
			props: {
				count: {
					type: Number,
					default: 0
				}
			}
		}
			, Z = Q
			, tt = (i("6e19"),
			Object(w["a"])(Z, J, K, !1, null, null, null))
			, et = tt.exports
			, it = {
			name: "State",
			components: {
				WordCount: et
			},
			props: {
				count: {
					type: Number,
					default: 0
				}
			}
		}
			, st = it
			, at = (i("e940"),
			Object(w["a"])(st, X, Y, !1, null, null, null))
			, nt = at.exports
			, ot = i("259d")
			, rt = i("8005")
			, ct = i("b746")
			, lt = i.n(ct)
			, dt = i("07a4")
			, ut = i("9fd6")
			, pt = i("3fd0")
			, ht = i("19a1")
			, ft = i("3334")
			, gt = i("e6ca")
			, mt = i("5eb9")
			, vt = i.n(mt)
			, bt = {
			name: "EditApp",
			components: {
				NotFound: l["default"],
				UploadEntryPop: G["default"],
				Layout: P,
				HeaderLeft: D,
				PageState: M["a"],
				Guide: A,
				EditorFooter: nt,
				Directory: ot["default"],
				History: rt["default"]
			},
			data: function() {
				return {
					pageType: "create",
					changedPageType: "",
					logPageTypeStr: "",
					logPageTypeTimeStr: "",
					pageStatus: "opening",
					path: "/",
					wpPath: "",
					name: "",
					extension: "",
					fsid: "",
					wpFsid: "",
					templateid: "",
					password: "",
					ctime: 0,
					mtime: 0,
					size: 0,
					convertCount: 0,
					convertMaxCount: 600,
					convertTimer: null,
					hasSameWpDocPopupVisible: !1,
					passwordPopupVisiable: !1,
					passwordTipText: "文档为加密文档，请输入文档密码",
					editorLoadingInstance: null,
					editor: null,
					editorH: 0,
					toolbarH: 0,
					saveStatus: "ready",
					saveTimer: null,
					wordCount: 0,
					logStartTimestamp: 0,
					logShowPopupTimestamp: 0,
					defaultACL: [1, 2],
					errMsg: "",
					deletePopupVisiable: !1,
					fileVersion: 1,
					lastContents: null,
					lastContentsModifytime: 0,
					isRetryClick: !1,
					guideVisiable: !1
				}
			},
			computed: {
				loginInfo: function() {
					return dt["b"].loginInfo
				},
				shareInfo: function() {
					return dt["b"].shareInfo
				},
				saveHisVersionManuallyStatus: function() {
					return dt["b"].saveHisVersionManuallyStatus
				},
				isShowHistory: function() {
					return dt["b"].isShowHistory
				}
			},
			watch: {
				pageStatus: function(t) {
					var e = this;
					"successed" === t && (this.$bus.$on("save-historyversion", this.handleSaveHistoryVersionManually),
						this.$once("hook:beforeDestroy", (function() {
								e.$bus.$off("save-historyversion", e.handleSaveHistoryVersionManually)
							}
						)))
				},
				editor: function(t) {
					var e = this;
					if (!t)
						return null;
					this.editor.on("before-sign", (function() {
							e.$ubc.send("wpdoc_edit_".concat(e.logPageTypeStr, "_before_sign"))
						}
					)),
						this.editor.on("before-sign-fail", (function(t) {
								e.$ubc.send({
									name: "wpdoc_edit_".concat(e.logPageTypeStr, "_before_sign_fail"),
									ext: {
										reason: "".concat(t)
									}
								})
							}
						)),
						this.editor.on("sign-fetch", (function(t, i) {
								if ("fail" !== t)
									return e.$ubc.send("wpdoc_edit_".concat(e.logPageTypeStr, "_signReq")),
										!1;
								e.sendFailLog("signReq", i)
							}
						))
				},
				isShowHistory: function(t) {
					t && (this.lastContents = this.editor.getContents())
				}
			},
			created: function() {
				this.getUserType(),
					this.pageInit()
			},
			mounted: function() {
				"notFound" !== this.pageType && ("create" === this.pageType ? this.handleCreate() : this.getFileMetas(),
					window.addEventListener("beforeunload", this.beforeunloadPage, !1),
					window.addEventListener("unload", this.unloadPage, !1),
					document.addEventListener("paste", this.handlePaste, !0),
					document.addEventListener("drop", this.handleDrop, !1))
			},
			beforeDestroy: function() {
				window.removeEventListener("resize", this.calculateEditorMinHeight),
					window.removeEventListener("beforeunload", this.beforeunloadPage),
					window.removeEventListener("unload", this.unloadPage),
					document.removeEventListener("paste", this.handlePaste),
					document.removeEventListener("drop", this.handleDrop)
			},
			provide: function() {
				return {
					getShareInfo: this.getShareInfo
				}
			},
			methods: {
				getUserType: function() {
					var t = Object(c["a"])(r.a.mark((function t() {
							var e;
							return r.a.wrap((function(t) {
									while (1)
										switch (t.prev = t.next) {
											case 0:
												return t.next = 2,
													Object(pt["g"])({
														fields: JSON.stringify(["docuserchannel"])
													});
											case 2:
												e = t.sent,
												e && 0 === e.errno && dt["a"].setDocUserChannel(e.result.docuserchannel);
											case 4:
											case "end":
												return t.stop()
										}
								}
							), t)
						}
					)));
					function e() {
						return t.apply(this, arguments)
					}
					return e
				}(),
				pageInit: function() {
					this.logStartTimestamp = (new Date).getTime();
					var t = this.$route.query
						, e = t.action
						, i = t.path
						, s = void 0 === i ? "" : i
						, a = t.fsid
						, n = void 0 === a ? "" : a
						, o = t.templateid
						, r = void 0 === o ? "" : o
						, c = t.tplname
						, l = void 0 === c ? "" : c
						, d = "";
					s = decodeURIComponent(decodeURIComponent(s)),
					"create" === e && (s = s || "/");
					var u = ""
						, p = s
						, h = n;
					l = decodeURIComponent(decodeURIComponent(l));
					var f = "create" === e && l ? l : "未命名文档";
					if (s) {
						switch (e) {
							case "fromdoc":
								this.logPageTypeStr = "doc2wp",
									this.logPageTypeTimeStr = "doc2wp_time",
									d = "createFromDoc";
								var g = s.match(/\.+([^\\.\\/\s]+)$/);
								u = g ? g[1] : "",
									p = s.replace(/\.[^.]+$/, "");
								break;
							case "create":
								this.logPageTypeStr = "createwp",
									this.logPageTypeTimeStr = "crt_wp_time",
									d = "create",
									p = s.endsWith("/") ? "".concat(s).concat(f) : "".concat(s, "/").concat(f),
									this.templateid = r;
								break;
							case "edit":
								this.logPageTypeStr = "openwp",
									this.logPageTypeTimeStr = "op_wp_time",
									d = "edit";
								break;
							default:
								d = "notFound",
									this.$router.replace({
										path: "/notfound"
									});
								break
						}
						var m = "fromdoc" === e ? "".concat(this.logPageTypeStr, "_pageinit") : this.logPageTypeStr;
						this.$ubc.send("wpdoc_edit_".concat(m))
					} else
						this.$router.replace({
							path: "/notfound"
						}),
							d = "notFound";
					f = p && "/" !== p ? Object(gt["a"])(p) : f,
						this.pageType = d,
						this.path = s,
						this.wpPath = p,
						this.fsid = n,
						this.wpFsid = h,
						this.name = f,
						this.extension = u
				},
				initEditor: function() {
					var t = this;
					this.$ubc.send("wpdoc_edit_".concat(this.logPageTypeStr, "_initEditor"));
					var e = (new Date).getTime();
					this.pageStatus = "initEditor",
						this.editorLoadingInstance = this.$Loading({
							background: "rgba(255, 255, 255, 0.2)",
							text: "正在打开文档，请耐心等待..."
						}),
						this.editor = new vt.a({
							container: "wpdoc-editor",
							scrollingContainer: ".wpdoc-editor-page",
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
								uk: this.loginInfo.uk,
								surl: this.shareInfo.surl,
								shareId: this.shareInfo.shareId,
								localUpload: ut["a"]
							},
							modules: {
								toolbar: {
									handlers: {
										image: function() {
											t.editor.emit("resource-upload"),
												t.$refs.uploadEntryPop.showUploadEntryPop("image")
										},
										attachment: function() {
											t.editor.emit("resource-upload"),
												t.$refs.uploadEntryPop.showUploadEntryPop("attachment")
										}
									}
								},
								imageEdit: !0,
								uploadFile: !0,
								blotViewerSwitch: !0,
								imagePreview: !0,
								drag: !0,
								specialCopy: !0,
								selectionChange: !0
							},
							callback: function() {
								t.calculateEditorMinHeight(),
									window.addEventListener("resize", lt.a.debounce(t.calculateEditorMinHeight, 250)),
									t.addEditorEvents(),
									t.editor.getFileDelta((function(i) {
											if (t.pageStatus = "successed",
												t.editorLoadingInstance.close(),
											i && 0 === i.errno) {
												var s;
												t.handleGuildShow();
												var a = (new Date).getTime()
													, o = a - t.logStartTimestamp
													, r = a - e
													, c = {}
													, l = t.logPageTypeStr
													, d = t.logPageTypeTimeStr;
												"createwp" === l && t.templateid ? (d = "crt_tmpwp_time",
													c.ext = {
														templateid: t.templateid || ""
													}) : "edit" === t.changedPageType && (l = "openwp",
													d = "op_wp_time"),
													c.name = "wpdoc_edit_".concat(l, "_success"),
													t.$ubc.send(c),
													t.$ubc.send({
														name: "wpdoc_edit_".concat(l, "_time"),
														ext: (s = {},
															Object(n["a"])(s, d, o),
															Object(n["a"])(s, "getdata_render", r),
															s)
													})
											} else
												t.$Message({
													type: "error",
													message: "文档数据获取失败 请稍后再试",
													center: !0
												}),
													t.sendFailLog("dataReq", i)
										}
									))
							}
						}),
						this.getShareInfo(),
						ut["a"].setOptions({
							editor: this.editor,
							$Message: this.$Message,
							wpName: this.name,
							loginInfo: this.loginInfo,
							$ubc: this.$ubc
						})
				},
				addEditorEvents: function() {
					var t = this;
					this.editor.on("file-lastmodifytime", (function(e) {
							e && (t.lastContentsModifytime = e)
						}
					)),
						this.editor.on("file-save", this.onFileSave),
						this.editor.on("get-length", (function(e) {
								var i = e.num || 0;
								t.wordCount = Number(i)
							}
						)),
						this.editor.on("show-toast", (function(e) {
								var i = e.type
									, s = void 0 === i ? "info" : i
									, a = e.msg
									, n = void 0 === a ? "" : a;
								t.$Message({
									type: s,
									message: n
								})
							}
						)),
						this.editor.on("attachment-click", (function(e) {
								t.$ubc.send("edit_insert_attachment_open"),
									window.open("//pan.baidu.com/s/9/".concat(t.shareInfo.surl, "?fid=").concat(e.fsId))
							}
						)),
						this.editor.quill.root.addEventListener("paste", this.handleEditorPaste.bind(this), !0),
						this.editor.on("file-delete", (function() {
								t.deletePopupVisiable = !0
							}
						)),
						this.editor.on("save-version", (function(e) {
								t.fileVersion = e
							}
						)),
						this.editor.on("ubc-log-event", (function(e) {
								"string" === typeof e ? t.$ubc.send(e) : t.$ubc.send({
									name: e["ubcKey"],
									ext: e["ubcExt"]
								})
							}
						)),
						this.editor.on("wss-connection", (function() {
								t.$ubc.send("wpdoc_edit_".concat(t.logPageTypeStr, "_dataReq"))
							}
						))
				},
				handleEditorPaste: function(t) {
					var e = t.clipboardData.getData("text/x-custom-image");
					if (e) {
						t.preventDefault();
						var i = (new DOMParser).parseFromString(e, "text/html")
							, s = i.body
							, a = s.querySelector("img")
							, n = JSON.parse(a.getAttribute("data-delta"))
							, o = this.editor.quill.getSelection();
						if (o) {
							var r = n.image ? "image" : "blockImage";
							this.editor.quill.insertEmbed(o.index, r, n[r], "user")
						}
					}
				},
				onFileSave: function(t) {
					var e = this;
					if (t && "start" === t.type)
						this.$ubc.send("wpdoc_edit_changes");
					else if (t && 0 === t.errno) {
						var i = (new Date).getTime()
							, s = i - (t.startTime || i);
						this.$ubc.send({
							name: "wpdoc_edit_changes_success",
							ext: {
								changes_time: s
							}
						})
					}
					clearTimeout(this.saveTimer),
						this.saveStatus = "saving",
						this.saveTimer = setTimeout((function() {
								t && 0 === t.errno ? e.saveStatus = "success" : (!t || t && "start" !== t.type && 0 !== t.errno) && (e.saveStatus = "fail")
							}
						), 200)
				},
				handleSaveHistoryVersionManually: function() {
					var t = this;
					if ("saving" === this.saveHisVersionManuallyStatus)
						return !1;
					this.$ubc.send("wpdoc_edit_save_hv"),
						dt["a"].setSaveHisVersionStatus("saving"),
						this.editor.saveFile((function(e) {
								dt["a"].setSaveHisVersionStatus("saved"),
									e && 0 === e.errno ? (t.$Message({
										type: "success",
										message: "版本保存成功"
									}),
										t.$ubc.send("wpdoc_edit_save_hv_success")) : (t.$Message({
										type: "error",
										message: e && e.errmsg || "保存版本失败 请稍后重试"
									}),
										t.$ubc.send({
											name: "wpdoc_edit_save_hv_fail",
											ext: {
												reason: e
											}
										}))
							}
						))
				},
				handleOpenWp: function() {
					if (this.hasSameWpDocPopupVisible) {
						this.hasSameWpDocPopupVisible = !1,
							this.changedPageType = "edit";
						var t = (new Date).getTime()
							, e = t - this.logShowPopupTimestamp;
						this.logStartTimestamp += e,
							this.logPageTypeStr = "openwp",
							this.$ubc.send("wpdoc_edit_".concat(this.logPageTypeStr))
					}
					this.initEditor()
				},
				getFileMetas: function() {
					var t = Object(c["a"])(r.a.mark((function t(e) {
							var i, s, a;
							return r.a.wrap((function(t) {
									while (1)
										switch (t.prev = t.next) {
											case 0:
												this.$ubc.send("wpdoc_edit_".concat(this.logPageTypeStr, "_fmetaReq")),
													this.isRetryClick = "retry" === e,
													this.pageStatus = "opening",
													i = [],
													t.t0 = this.pageType,
													t.next = "createFromDoc" === t.t0 ? 7 : "edit" === t.t0 ? 10 : 12;
												break;
											case 7:
												return i.push(this.path),
													i.push(this.wpPath + ".PanD"),
													t.abrupt("break", 12);
											case 10:
												return i.push(this.wpPath),
													t.abrupt("break", 12);
											case 12:
												return s = {
													target: JSON.stringify(i)
												},
													t.next = 15,
													Object(pt["e"])(s);
											case 15:
												a = t.sent,
													this.operateFileMetas(a);
											case 17:
											case "end":
												return t.stop()
										}
								}
							), t, this)
						}
					)));
					function e(e) {
						return t.apply(this, arguments)
					}
					return e
				}(),
				operateFileMetas: function(t) {
					var e = this
						, i = {
						isExist: !1
					}
						, s = {
						isExist: !1
					};
					if (0 !== t.errno && 12 !== t.errno)
						return this.sendFailLog("fmetaReq", t),
							this.pageStatus = "filemetasFail",
							this.$Message({
								message: "获取文档失败，请稍后再试 ".concat(t["request_id"]),
								type: "error",
								center: !0
							}),
							!1;
					var a = t.info;
					switch (a.forEach((function(t, a) {
							0 === t.errno && (1 === t.wpfile ? (s.isExist = !0,
								s.fsid = t["fs_id"],
								e.wpFsid = t["fs_id"]) : (i.isExist = !0,
								i.fsid = t["fs_id"],
								e.fsid = t["fs_id"]))
						}
					)),
						this.pageType) {
						case "createFromDoc":
							if (!i.isExist)
								return this.pageStatus = "notFound",
									this.handleTitleHide(),
									!1;
							s.isExist ? (this.hasSameWpDocPopupVisible = !0,
								this.logShowPopupTimestamp = (new Date).getTime()) : this.handleCreate();
							break;
						case "edit":
							if (!s.isExist)
								return this.pageStatus = "notFound",
									this.handleTitleHide(),
									!1;
							this.handleOpenWp();
							break
					}
				},
				handleCreate: function() {
					var t = Object(c["a"])(r.a.mark((function t(e) {
							var i, s, a;
							return r.a.wrap((function(t) {
									while (1)
										switch (t.prev = t.next) {
											case 0:
												return this.hasSameWpDocPopupVisible && (this.hasSameWpDocPopupVisible = !1,
													i = (new Date).getTime(),
													s = i - this.logShowPopupTimestamp,
													this.logStartTimestamp += s),
													this.isRetryClick = "retry" === e,
												"createFromDoc" === this.pageType && "retry" !== e && this.$ubc.send("wpdoc_edit_".concat(this.logPageTypeStr)),
													t.next = 5,
													this.createWp();
											case 5:
												a = t.sent,
													a && "create" === this.pageType ? this.handleOpenWp() : a && "createFromDoc" === this.pageType ? this.convertDoc() : this.pageStatus = "createFail";
											case 7:
											case "end":
												return t.stop()
										}
								}
							), t, this)
						}
					)));
					function e(e) {
						return t.apply(this, arguments)
					}
					return e
				}(),
				createWp: function() {
					var t = Object(c["a"])(r.a.mark((function t() {
							var e, i, s;
							return r.a.wrap((function(t) {
									while (1)
										switch (t.prev = t.next) {
											case 0:
												return this.pageStatus = "creating",
													e = {
														path: this.wpPath,
														filetype: 1
													},
												this.fsid && Object.assign(e, {
													srcfsid: this.fsid
												}),
												this.templateid && (e["template_id"] = this.templateid),
													this.$ubc.send("wpdoc_edit_".concat(this.logPageTypeStr, "_crtReq")),
													i = null,
													t.prev = 6,
													t.next = 9,
													Object(pt["d"])(e);
											case 9:
												i = t.sent,
													t.next = 16;
												break;
											case 12:
												return t.prev = 12,
													t.t0 = t["catch"](6),
													this.sendFailLog("crtReq", t.t0),
													t.abrupt("return", !1);
											case 16:
												if (!i || 0 !== i.errno) {
													t.next = 29;
													break
												}
												return this.$ubc.send("wpdoc_edit_".concat(this.logPageTypeStr, "_crtReq_success")),
													s = i,
													this.wpPath = s.path,
													this.name = Object(gt["a"])(s.path),
													this.size = s.size,
													this.ctime = s.ctime,
													this.mtime = s.mtime,
													this.wpFsid = s.fsid,
													this.$router.replace({
														query: {
															action: "edit",
															path: this.wpPath
														}
													}),
													t.abrupt("return", !0);
											case 29:
												return this.sendFailLog("crtReq", i),
													t.abrupt("return", !1);
											case 31:
											case "end":
												return t.stop()
										}
								}
							), t, this, [[6, 12]])
						}
					)));
					function e() {
						return t.apply(this, arguments)
					}
					return e
				}(),
				convertDoc: function() {
					var t = Object(c["a"])(r.a.mark((function t(e) {
							var i, s, a, n, o, c = this;
							return r.a.wrap((function(t) {
									while (1)
										switch (t.prev = t.next) {
											case 0:
												return clearTimeout(this.convertTimer),
													this.isRetryClick = "retry" === e,
												0 === this.convertCount && this.$ubc.send("wpdoc_edit_".concat(this.logPageTypeStr, "_convtReq")),
													this.pageStatus = "converting",
													i = {
														fsid: this.fsid,
														wp_fsid: this.wpFsid,
														suffix: this.extension,
														filetype: 1
													},
												this.password && (i.password = this.password),
													t.next = 8,
													Object(pt["c"])(i);
											case 8:
												s = t.sent,
													this.convertCount = this.convertCount + 1,
													t.t0 = s.errno,
													t.next = 0 === t.t0 ? 13 : 21101 === t.t0 ? 25 : 21081 === t.t0 || 21082 === t.t0 ? 28 : 34;
												break;
											case 13:
												if (a = s,
												0 !== +a.status) {
													t.next = 18;
													break
												}
												this.handleOpenWp(),
													t.next = 24;
												break;
											case 18:
												if (1 !== +a.status) {
													t.next = 24;
													break
												}
												if (!(this.convertCount >= this.convertMaxCount)) {
													t.next = 23;
													break
												}
												return this.pageStatus = "convertFail",
													this.convertCount = 0,
													t.abrupt("return", !1);
											case 23:
												this.convertTimer = setTimeout((function() {
														c.convertDoc()
													}
												), 1e3);
											case 24:
												return t.abrupt("break", 37);
											case 25:
												return this.pageStatus = "convertFail",
													this.convertCount = 0,
													t.abrupt("break", 37);
											case 28:
												return this.convertCount = 0,
													n = "文档为加密文档，请输入文档密码",
													o = "密码错误，请输入正确的文档密码",
													this.passwordTipText = 21081 === s.errno ? n : o,
													this.passwordPopupVisiable = !0,
													t.abrupt("break", 37);
											case 34:
												return this.pageStatus = "convertFail",
													this.convertCount = 0,
													t.abrupt("break", 37);
											case 37:
												0 !== s.errno && this.sendFailLog("convtReq", s);
											case 38:
											case "end":
												return t.stop()
										}
								}
							), t, this)
						}
					)));
					function e(e) {
						return t.apply(this, arguments)
					}
					return e
				}(),
				handleConvertTakePassword: function() {
					this.passwordPopupVisiable = !1,
						this.convertDoc()
				},
				handleSetSomeHvDocContainer: function(t) {
					this.editor.revertFileVersion(t)
				},
				beforeunloadPage: function(t) {
					var e = this.pageStatus
						, i = ["loading", "opening", "creating", "converting", "initEditor"]
						, s = document.querySelector(".upload-loading-wrapper")
						, a = document.querySelector(".image-upload-progress-wrapper");
					if (i.includes(e) || "fail" === this.saveStatus || s || a) {
						t = t || window.event;
						var n = "您有未保存的内容，离开该页面将丢失内容";
						return t && (t.returnValue = n),
							n
					}
				},
				unloadPage: function(t) {
					var e = this.pageStatus;
					if ("loading" === e || "opening" === e || "creating" === e || "converting" === e || "initEditor" === e) {
						var i = this.generateUBCLogSrc() || "";
						if (!i)
							return;
						if (navigator.sendBeacon)
							window.navigator.sendBeacon(i);
						else {
							var s = document.createElement("img");
							s.onload = function() {
								s = null
							}
								,
								s.src = i
						}
					}
				},
				calculateEditorMinHeight: function() {
					var t = document.getElementById("wpdoc-editor")
						, e = t.querySelector(".ql-toolbar").offsetHeight;
					this.toolbarH = e
				},
				getShareInfo: function() {
					var t = this
						, e = dt["a"].setShareInfo;
					e({
						docid: this.wpFsid
					}),
						Object(ht["b"])({
							docid: this.wpFsid,
							ignore_valid: 1
						}).then((function(i) {
								var s = i.errno
									, a = i.data
									, n = i.newno;
								if (n)
									return t.pageStatus = "blacklist",
										void (t.errMsg = ft["a"][n] || "啊哦，来晚了，该分享文件已过期");
								if (0 === s) {
									var o = a["shareinfo"]
										, r = {
										docLink: o["doclink"],
										surl: o["surl"],
										shareId: o["share_id"],
										isExpired: o["is_expired"],
										shareStatus: o["share_status"],
										expiredTime: o["expired_time"],
										isAuthor: o["is_author"],
										isDocuser: o["is_docuser"],
										pwd: o["pwd"] ? o["pwd"] : Object(B["b"])(),
										acl: o["acl"] && o["acl"].length ? o["acl"] : o["share_status"] ? [] : t.defaultACL,
										shareError: !1
									};
									o["surl"] && o["doclink"] ? (t.editor.conf.fileParams.surl = o.surl,
										t.editor.conf.fileParams.shareId = o.share_id,
										e(r)) : e({
										shareError: !0
									})
								} else
									e({
										shareError: !0
									})
							}
						)).catch((function(i) {
								console.log(i),
									e({
										shareError: !0
									}),
									t.$Message({
										type: "error",
										message: "分享设置获取失败"
									})
							}
						))
				},
				handlePaste: function(t) {
					var e = t.clipboardData
						, i = e.types;
					if (!e.types.includes("text/rtf")) {
						var s = Array.from(e.files);
						this.handleFileUpload(s),
						2 === i.length && i.includes("text/html") && i.includes("Files") && t.preventDefault()
					}
				},
				handleDrop: function(t) {
					t.preventDefault();
					var e = Array.from(t.dataTransfer.files);
					this.handleFileUpload(e)
				},
				handleFileUpload: function(t) {
					t.length > 0 && (t.length > 500 ? this.$Message({
						type: "error",
						message: "上传文件数量不能超过 500 个！",
						center: !0
					}) : ut["a"].uploadFiles(t, !1, "event"))
				},
				onFileDelete: function() {
					location.reload()
				},
				handleTitleHide: function() {
					document.querySelector(".title-box") && (document.querySelector(".title-box").style.display = "none")
				},
				sendFailLog: function(t, e) {
					this.$ubc.send({
						name: "wpdoc_edit_".concat(this.logPageTypeStr, "_fail"),
						ext: {
							reason: e,
							apiname: t,
							processline: this.logPageTypeStr,
							source: this.isRetryClick ? "retry" : "",
							templateid: this.templateid || ""
						}
					})
				},
				generateUBCLogSrc: function() {
					var t = "https://mbd.baidu.com/ztbox"
						, e = {
						action: "zpblog",
						appname: "wangpan",
						v: "2.0",
						data: {
							cateid: "99",
							actiondata: {
								id: "11004",
								type: "0",
								timestamp: (new Date).getTime(),
								content: {
									page: "word_editor",
									source: "",
									from: "doc",
									type: "display",
									value: "doc_edit_exit",
									ext: {
										processline: "".concat(this.logPageTypeStr, "____").concat(this.pageStatus)
									}
								}
							}
						}
					}
						, i = [];
					for (var s in e)
						if (e.hasOwnProperty(s)) {
							var a = e[s];
							if ("function" === typeof a || void 0 === a)
								return;
							"[object Object]" === Object.prototype.toString.call(a) ? i.push("".concat(encodeURIComponent(s), "=").concat(encodeURIComponent(JSON.stringify(a).replace(" ", "")))) : i.push(encodeURIComponent(s) + "=" + encodeURIComponent(a))
						}
					var n = i.join("&");
					return t + "?" + n
				},
				handleGuildShow: function() {
					var t = this;
					this.$nextTick((function() {
							var e = localStorage.getItem("PANDGUIDE".concat(t.loginInfo.uk));
							e || (t.guideVisiable = !0,
								localStorage.setItem("PANDGUIDE".concat(t.loginInfo.uk), "shown"))
						}
					))
				}
			}
		}
			, wt = bt
			, yt = (i("14f4"),
			Object(w["a"])(wt, s, a, !1, null, null, null))
			, St = yt.exports;
		e["default"] = St
	},
	cef9: function(t, e, i) {
		"use strict";
		i("d86e")
	},
	d461: function(t, e, i) {
		"use strict";
		i("68ed")
	},
	d86e: function(t, e, i) {},
	e6a3: function(t, e, i) {},
	e6ca: function(t, e, i) {
		"use strict";
		i("a583"),
			i("ee39");
		e["a"] = function(t) {
			var e = t.lastIndexOf("/")
				, i = t.toLowerCase()
				, s = i.indexOf(".pand") > -1 ? i.lastIndexOf(".pand") : t.length;
			return t.substring(++e, s)
		}
	},
	e808: function(t, e, i) {},
	e940: function(t, e, i) {
		"use strict";
		i("0a7b")
	},
	ebd9: function(t, e, i) {
		var s = i("ef98");
		s(s.P, "Function", {
			bind: i("28b1")
		})
	},
	f865: function(t, e, i) {
		"use strict";
		i("7aac")("trim", (function(t) {
				return function() {
					return t(this, 3)
				}
			}
		))
	}
}]);
