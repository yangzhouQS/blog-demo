/*!
* @mctech/kaka-grid v2.3.1
* Copyright 2021 ChenGang <10147817@qq.com>
* Licensed under MIT
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.kakaGrid = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    }

    var isNode = typeof window === 'undefined' || typeof window.window === 'undefined';
    var arrayFind;
    var arrayFindIndex;
    var array = {
        get find() {
            if (arrayFind) {
                return arrayFind;
            }
            if (Array.prototype.find) {
                arrayFind = function (arr, predicate) { return Array.prototype.find.call(arr, predicate); };
            }
            else {
                arrayFind = function (arr, predicate) {
                    var index = array.findIndex(arr, predicate);
                    return index >= 0 ? arr[index] : undefined;
                };
            }
            return arrayFind;
        },
        get findIndex() {
            if (arrayFindIndex) {
                return arrayFindIndex;
            }
            if (Array.prototype.findIndex) {
                arrayFindIndex = function (arr, predicate) { return Array.prototype.findIndex.call(arr, predicate); };
            }
            else {
                arrayFindIndex = function (arr, predicate) {
                    var length = arr.length;
                    for (var i = 0; i < length; i++) {
                        var value = arr[i];
                        if (predicate(value, i, arr)) {
                            return i;
                        }
                    }
                    return -1;
                };
            }
            return arrayFindIndex;
        },
    };
    var isDef = function (data) {
        return data !== null && typeof data !== 'undefined';
    };
    var isDefString = function (data) {
        return isDef(data) && (typeof data !== 'string' || data !== '');
    };
    function analyzeUserAgent() {
        if (isNode) {
            return {
                Chrome: false,
                Edge: false,
                Firefox: false,
                IE: false,
                Safari: false,
            };
        }
        else {
            var ua = window.navigator.userAgent.toLowerCase();
            return {
                IE: !!/(msie|trident)/.exec(ua),
                Edge: ua.indexOf('edge') > -1,
                Chrome: ua.indexOf('chrome') > -1 && ua.indexOf('edge') === -1,
                Firefox: ua.indexOf('firefox') > -1,
                Safari: ua.indexOf('safari') > -1 && ua.indexOf('edge') === -1,
            };
        }
    }
    var _a = analyzeUserAgent(), IE = _a.IE, Chrome = _a.Chrome, Firefox = _a.Firefox, Edge = _a.Edge, Safari = _a.Safari;
    function setReadonly(obj, name, value) {
        Object.defineProperty(obj, name, {
            enumerable: false,
            configurable: true,
            value: value,
        });
    }
    function each(obj, fn) {
        for (var key in obj) {
            fn(obj[key], key, obj);
        }
    }
    function isObject(obj) {
        return obj === Object(obj);
    }
    function omit(source, omits) {
        var result = {};
        var _loop_1 = function (key) {
            if (omits.indexOf(key) >= 0) {
                return "continue";
            }
            Object.defineProperty(result, key, {
                get: function () {
                    return source[key];
                },
                set: function (val) {
                    source[key] = val;
                },
                configurable: true,
                enumerable: true,
            });
        };
        for (var key in source) {
            _loop_1(key);
        }
        return result;
    }
    function defaults(source, defs) {
        var keys = [];
        var result = {};
        var _loop_2 = function (key) {
            keys.push(key);
            Object.defineProperty(result, key, {
                get: function () {
                    var val = source[key];
                    return val === undefined ? defs[key] : val;
                },
                set: function (val) {
                    source[key] = val;
                },
                configurable: true,
                enumerable: true,
            });
        };
        for (var key in source) {
            _loop_2(key);
        }
        var _loop_3 = function (key) {
            if (keys.indexOf(key) >= 0) {
                return "continue";
            }
            Object.defineProperty(result, key, {
                get: function () {
                    var val = source[key];
                    return val === undefined ? defs[key] : val;
                },
                set: function (val) {
                    source[key] = val;
                },
                configurable: true,
                enumerable: true,
            });
        };
        for (var key in defs) {
            _loop_3(key);
        }
        return result;
    }
    function extend() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = {};
        args.forEach(function (source) {
            var _loop_4 = function (key) {
                Object.defineProperty(result, key, {
                    get: function () {
                        return source[key];
                    },
                    set: function (val) {
                        source[key] = val;
                    },
                    configurable: true,
                    enumerable: true,
                });
            };
            for (var key in source) {
                _loop_4(key);
            }
        });
        return result;
    }
    function isDescendantElement(root, target) {
        while (target && target.parentElement) {
            var p = target.parentElement;
            if (root === p) {
                return true;
            }
            target = p;
        }
        return false;
    }
    function applyChainSafe(obj, fn) {
        var names = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            names[_i - 2] = arguments[_i];
        }
        var value = obj;
        for (var i = 0; i < names.length && isDef(value); i++) {
            value = fn(value, names[i]);
        }
        return value;
    }
    function getChainSafe(obj) {
        var names = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            names[_i - 1] = arguments[_i];
        }
        return applyChainSafe.apply(void 0, __spreadArrays([obj, function (val, name) { return val[name]; }], names));
    }
    function getOrApply(value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof value === 'function') {
            return value.apply(void 0, args);
        }
        else {
            return value;
        }
    }
    function endsWith(str, searchString, position) {
        var subjectString = str.toString();
        if (typeof position !== 'number' ||
            !isFinite(position) ||
            Math.floor(position) !== position ||
            position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.lastIndexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    }
    function genChars(s) {
        // Surrogate Code Point
        // [\uD800-\uDBFF]
        // Variation Selectors
        // FVS [\u180B-\u180D]
        // VS1～VS16 [\uFE00-\uFE0F]
        // VS17～VS256 \uDB40[\uDD00-\uDDEF]
        var re = /([\uD800-\uDBFF][\uDC00-\uDFFF]|\r\n|[^\uD800-\uDFFF])([\u180B-\u180D]|[\uFE00-\uFE0F]|\uDB40[\uDD00-\uDDEF])?/g;
        return {
            next: function () {
                var res = re.exec(s);
                return res !== null ? res[0] : null;
            },
        };
    }
    function genWords(s) {
        var re = /[!-~]+|[^!-~\s]+|\s+/g;
        return {
            next: function () {
                var res = re.exec(s);
                return res !== null ? res[0] : null;
            },
        };
    }
    var template = function (strings) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            var dict = values[values.length - 1] || {};
            var result = [strings[0]];
            keys.forEach(function (key, i) {
                var isInteger = Number.isInteger
                    ? Number.isInteger(key)
                    : typeof key === 'number' && key !== Infinity && Math.floor(key) === key;
                var value = isInteger ? values[key] : dict[key];
                result.push(value, strings[i + 1]);
            });
            return result.join('');
        };
    };
    var escape = function (html) {
        return String(html)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };
    function isPromise(data) {
        return Boolean(data && typeof data.then === 'function');
    }
    function then(result, callback) {
        return isPromise(result) ? result.then(function (r) { return callback(r); }) : callback(result);
    }
    function getMouseButtons(e) {
        if (isDef(e.buttons)) {
            return e.buttons;
        }
        /* for legacy */
        if (isDef(e.which)) {
            if (e.which === 3) {
                // right?
                return 4;
            }
            if (e.which === 2) {
                // middle?
                return 4;
            }
            return e.which; // left or no
        }
        if (e.button === 0 || e.button === 1) {
            return 1; // candidate left
        }
        if (e.button === 2) {
            return 2; // right
        }
        return 0; // no or middle?
    }
    function getKeyCode(e) {
        return e.keyCode || e.which;
    }
    function isTouchEvent(e) {
        return !!e.changedTouches;
    }
    function getIgnoreCase(obj, name) {
        if (obj[name]) {
            return obj[name];
        }
        var l = name.toLowerCase();
        if (obj[l]) {
            return obj[l];
        }
        var u = name.toLowerCase();
        if (obj[u]) {
            return obj[u];
        }
        for (var k in obj) {
            if (k.toLowerCase() === l) {
                return obj[k];
            }
        }
        return undefined;
    }
    function cancel(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
    function toBoxArray(obj) {
        if (!Array.isArray(obj)) {
            return [obj /*top*/, obj /*right*/, obj /*bottom*/, obj /*left*/];
        }
        if (obj.length === 3) {
            return [
                obj[0] /*top*/,
                obj[1] /*right*/,
                obj[2] /*bottom*/,
                obj[1] /*left*/,
            ];
        }
        if (obj.length === 2) {
            return [
                obj[0] /*top*/,
                obj[1] /*right*/,
                obj[0] /*bottom*/,
                obj[1] /*left*/,
            ];
        }
        if (obj.length === 1) {
            return [
                obj[0] /*top*/,
                obj[0] /*right*/,
                obj[0] /*bottom*/,
                obj[0] /*left*/,
            ];
        }
        return obj;
    }
    function cellEquals(a, b) {
        return a.col === b.col && a.row === b.row;
    }
    function cellInRange(range, col, row) {
        return (range.start.col <= col &&
            col <= range.end.col &&
            range.start.row <= row &&
            row <= range.end.row);
    }
    function cellMerge(a, b) {
        var startCol = Math.min(a.start.col, a.end.col, b.start.col, b.end.col);
        var startRow = Math.min(a.start.row, a.end.row, b.start.row, b.end.row);
        var endCol = Math.max(a.start.col, a.end.col, b.start.col, b.end.col);
        var endRow = Math.max(a.start.row, a.end.row, b.start.row, b.end.row);
        return {
            start: {
                col: startCol,
                row: startRow,
            },
            end: {
                col: endCol,
                row: endRow,
            },
        };
    }
    var browser = {
        IE: IE,
        Edge: Edge,
        Chrome: Chrome,
        Firefox: Firefox,
        Safari: Safari,
        // Chrome 33554431
        // FireFox 17895588
        // IE 10737433
        heightLimit: Chrome ? 33554431 : Firefox ? 17895588 : 10737433,
    };
    var obj = {
        setReadonly: setReadonly,
        isObject: isObject,
    };
    var str = {
        endsWith: endsWith,
        genChars: genChars,
        genWords: genWords,
        escape: escape,
        template: template,
    };
    var event = {
        getMouseButtons: getMouseButtons,
        getKeyCode: getKeyCode,
        isTouchEvent: isTouchEvent,
        cancel: cancel,
    };
    var style = {
        toBoxArray: toBoxArray,
    };
    var emptyFn = function () { };

    function toggleValue(val) {
        if (typeof val === 'number') {
            if (val === 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
        else if (typeof val === 'string') {
            if (val === 'false') {
                return 'true';
            }
            else if (val === 'off') {
                return 'on';
            }
            else if (/^0+$/.exec(val)) {
                return val.replace(/^(0*)0$/, '$11');
            }
            else if (val === 'true') {
                return 'false';
            }
            else if (val === 'on') {
                return 'off';
            }
            else if (/^0*1$/.exec(val)) {
                return val.replace(/^(0*)1$/, '$10');
            }
        }
        return !val;
    }
    var getBooleanOptionOfRecord = function (option, grid, row) {
        if (typeof option === 'function') {
            var record = grid.getRowRecord(row);
            if (isPromise(record)) {
                return true;
            }
            return !!option(record);
        }
        return !!option;
    };
    var isDisabledRecord = function (option, grid, row) {
        return (getBooleanOptionOfRecord(grid.disabled, grid, row) ||
            getBooleanOptionOfRecord(option, grid, row));
    };
    var isReadOnlyRecord = function (option, grid, row) {
        return (getBooleanOptionOfRecord(grid.readOnly, grid, row) ||
            getBooleanOptionOfRecord(option, grid, row));
    };

    var DG_EVENT_TYPE = {
        CLICK_CELL: 'click_cell',
        DBLCLICK_CELL: 'dblclick_cell',
        DBLTAP_CELL: 'dbltap_cell',
        MOUSEDOWN_CELL: 'mousedown_cell',
        MOUSEUP_CELL: 'mouseup_cell',
        SELECTED_CELL: 'selected_cell',
        MOUSE_SELECTED_START: 'mouse_selected_start',
        MOUSE_SELECTED_END: 'mouse_selected_end',
        KEYDOWN: 'keydown',
        MOUSEMOVE_CELL: 'mousemove_cell',
        MOUSEENTER_CELL: 'mouseenter_cell',
        MOUSELEAVE_CELL: 'mouseleave_cell',
        MOUSEOVER_CELL: 'mouseover_cell',
        MOUSEOUT_CELL: 'mouseout_cell',
        CONTEXTMENU_CELL: 'contextmenu_cell',
        INPUT_CELL: 'input_cell',
        PASTE_CELL: 'paste_cell',
        DELETE_CELL: 'delete_cell',
        EDITABLEINPUT_CELL: 'editableinput_cell',
        MODIFY_STATUS_EDITABLEINPUT_CELL: 'modify_status_editableinput_cell',
        RESIZE_COLUMN: 'resize_column',
        SCROLL: 'scroll',
        FOCUS_GRID: 'focus_grid',
        BLUR_GRID: 'blur_grid',
        CAN_DRAG_SELECTION: 'can_drag_selection',
        DRAG_SELECTION: 'drag_selection',
        CLICK_UNDERLAY: 'click_underlay',
        DBLCLICK_UNDERLAY: 'dblclick_underlay',
        DBLTAP_UNDERLAY: 'dbltap_underlay',
        COPY: 'copydata',
        CUT: 'cutdata',
        PASTE: 'pastedata',
    };

    var KEY_BS = 8;
    var KEY_TAB = 9;
    var KEY_ENTER = 13;
    var KEY_ESC = 27;
    var KEY_SPACE = 32;
    var KEY_END = 35;
    var KEY_HOME = 36;
    var KEY_LEFT = 37;
    var KEY_UP = 38;
    var KEY_RIGHT = 39;
    var KEY_DOWN = 40;
    var KEY_DEL = 46;
    var KEY_ALPHA_A = 65;
    var KEY_ALPHA_C = 67;
    var KEY_ALPHA_V = 86;
    var KEY_F2 = 113;

    // import utils from "./utils";
    // type SymbolType = (description?: string | number) => symbol;
    // const Symbol: SymbolType = utils.isNode
    //   ? (global.Symbol as SymbolType)
    //   : (window.Symbol as SymbolType)
    //   ? (window.Symbol as SymbolType)
    //   : ((): SymbolType => {
    //       function random(): string {
    //         const c = "abcdefghijklmnopqrstuvwxyz0123456789";
    //         const cl = c.length;
    //         let r = "";
    //         for (let i = 0; i < 10; i++) {
    //           r += c[Math.floor(Math.random() * cl)];
    //         }
    //         return r;
    //       }
    //       return (name?: string | number): symbol => {
    //         if (name) {
    //           return `#${name}_${random()}` as any;
    //         } else {
    //           return `#_${random()}` as any;
    //         }
    //       };
    //     })();
    // const mem: { [key: string]: symbol } = {};
    function get(name) {
        // if (name) {
        //   return (mem[name] ? mem[name] : (mem[name] = Symbol(name))) as any;
        // } else {
        //   return Symbol() as any;
        // }
        return (name || '_');
    }
    function getEventTargetSymbol() {
        return get('protected.event_target');
    }
    function getThemeSymbol() {
        return get('protected.theme');
    }
    function getDrawGridSymbol() {
        return get('protected.draw_grid');
    }
    function getListGridSymbol() {
        return get('protected.list_grid');
    }
    function getCheckColumnStateId() {
        return get('chkcol.stateID');
    }
    function getRadioColumnStateId() {
        return get('rdcol.stateID');
    }
    function getSwitchColumnStateId() {
        return get('swtcol.stateID');
    }
    function getButtonColumnStateId() {
        return get('btncol.stateID');
    }
    function getColumnActionStateId() {
        return get('col.action.stateID');
    }
    function getColumnFadeinStateId() {
        return get('col.fadein_stateID');
    }
    function getInlineEditingStateId() {
        return get('col.inline_editing_stateID');
    }
    function getBranchGraphColumnStateId() {
        return get('branch_graph_col.stateID');
    }
    function getSmallDialogInputEditorStateId() {
        return get('small_dialog_input_editor.stateID');
    }
    function getInlineInputEditorStateId() {
        return get('inline_input_editor.stateID');
    }
    function getInlineTextareaEditorStateId() {
        return get('inline_textarea_editor.stateID');
    }
    function getInlineLookupEditorStateId() {
        return get('inline_lookup_editor.stateID');
    }
    function getInlineMenuEditorStateId() {
        return get('inline_menu_editor.stateID');
    }
    function getCheckHeaderStateId() {
        return get('check_header.stateID');
    }
    function getSwitchHeaderStateId() {
        return get('switch_header.stateID');
    }

    var COLUMN_ACTION_STATE_ID = getColumnActionStateId();
    function bindCellClickAction(grid, cellId, _a) {
        var action = _a.action, mouseOver = _a.mouseOver, mouseMove = _a.mouseMove, mouseOut = _a.mouseOut;
        function isTarget(col, row) {
            return grid.getLayoutCellId(col, row) === cellId;
        }
        if (!grid[COLUMN_ACTION_STATE_ID]) {
            obj.setReadonly(grid, COLUMN_ACTION_STATE_ID, {});
        }
        var actionState = grid[COLUMN_ACTION_STATE_ID];
        return [
            // click
            grid.listen(DG_EVENT_TYPE.CLICK_CELL, function (e) {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                if (isPromise(grid.getRowRecord(e.row))) {
                    return;
                }
                action({
                    col: e.col,
                    row: e.row,
                });
            }),
            // mouse move
            grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, function (e) {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                if (isPromise(grid.getRowRecord(e.row))) {
                    return;
                }
                if (mouseMove) {
                    if (!mouseMove({
                        col: e.col,
                        row: e.row,
                    }, e.event)) {
                        grid.getElement().style.cursor = '';
                        actionState.mouseActive = false;
                        return;
                    }
                }
                grid.getElement().style.cursor = 'pointer';
                actionState.mouseActive = true;
            }),
            grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, function (e) {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                if (isPromise(grid.getRowRecord(e.row))) {
                    return;
                }
                if (mouseOver) {
                    if (!mouseOver({
                        col: e.col,
                        row: e.row,
                    }, e.event)) {
                        grid.getElement().style.cursor = '';
                        actionState.mouseActive = false;
                        return;
                    }
                }
                grid.getElement().style.cursor = 'pointer';
                actionState.mouseActive = true;
            }),
            grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, function (e) {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                if (mouseOut) {
                    mouseOut({
                        col: e.col,
                        row: e.row,
                    });
                }
                grid.getElement().style.cursor = '';
                actionState.mouseActive = false;
            }),
        ];
    }
    function bindCellKeyAction(grid, cellId, _a) {
        var action = _a.action, _b = _a.acceptKeys, acceptKeys = _b === void 0 ? [] : _b;
        function isTarget(col, row) {
            return grid.getLayoutCellId(col, row) === cellId;
        }
        acceptKeys = __spreadArrays(acceptKeys, [KEY_ENTER, KEY_SPACE]);
        return [
            // enter key down
            grid.listen(DG_EVENT_TYPE.KEYDOWN, function (e) {
                var _a;
                if (acceptKeys.indexOf(e.keyCode) === -1) {
                    return;
                }
                if (((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) && e.keyCode === KEY_ENTER) {
                    // When moving with the enter key, no action is taken with the enter key.
                    return;
                }
                var sel = grid.selection.select;
                if (!isTarget(sel.col, sel.row)) {
                    return;
                }
                if (isPromise(grid.getRowRecord(sel.row))) {
                    return;
                }
                action({
                    col: sel.col,
                    row: sel.row,
                });
                event.cancel(e.event);
            }),
        ];
    }

    var BaseAction = /** @class */ (function () {
        function BaseAction(options) {
            if (options === void 0) { options = {}; }
            this._disabled = options.disabled || false;
        }
        Object.defineProperty(BaseAction.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                if (this._disabled !== disabled) {
                    this._disabled = disabled;
                    this.onChangeDisabledInternal();
                }
            },
            enumerable: false,
            configurable: true
        });
        BaseAction.prototype.onChangeDisabledInternal = function () {
            // nothing
        };
        return BaseAction;
    }());

    var Action = /** @class */ (function (_super) {
        __extends(Action, _super);
        function Action(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._action = options.action || emptyFn;
            return _this;
        }
        Object.defineProperty(Action.prototype, "editable", {
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Action.prototype, "action", {
            get: function () {
                return this._action;
            },
            set: function (action) {
                this._action = action;
            },
            enumerable: false,
            configurable: true
        });
        Action.prototype.clone = function () {
            return new Action(this);
        };
        Action.prototype.getState = function (_grid) {
            return {};
        };
        Action.prototype.bindGridEvent = function (grid, cellId) {
            var _this = this;
            var state = this.getState(grid);
            var action = function (cell) {
                if (isDisabledRecord(_this.disabled, grid, cell.row)) {
                    return;
                }
                var record = grid.getRowRecord(cell.row);
                _this._action.apply(_this, [
                    record,
                    {
                        cell: cell,
                        grid: grid,
                    },
                ]);
            };
            var actionMouse = function (cell) {
                if (state.mouseActive) {
                    action(cell);
                }
            };
            var mouseOut = function (cell) {
                delete state.mouseRelativePos;
                delete state.mouseActiveCell;
                delete state.mouseActive;
                var range = grid.getCellRange(cell.col, cell.row);
                grid.invalidateCellRange(range);
            };
            var mouseMove = function (cell, event) {
                if (isDisabledRecord(_this.disabled, grid, cell.row)) {
                    return false;
                }
                state.mouseRelativePos = grid._getMouseRelativePoint(event);
                state.mouseActiveCell = {
                    col: cell.col,
                    row: cell.row,
                };
                var range = grid.getCellRange(cell.col, cell.row);
                grid.invalidateCellRange(range);
                return isDef(state.mouseActive) ? state.mouseActive : true;
            };
            return __spreadArrays(bindCellClickAction(grid, cellId, {
                action: actionMouse,
                mouseMove: mouseMove,
                mouseOut: mouseOut,
                mouseOver: mouseMove,
            }), bindCellKeyAction(grid, cellId, {
                action: action,
            }));
        };
        Action.prototype.onPasteCellRangeBox = function () {
            // noop
        };
        Action.prototype.onDeleteCellRangeBox = function () {
            // noop
        };
        return Action;
    }(BaseAction));

    var Editor = /** @class */ (function (_super) {
        __extends(Editor, _super);
        function Editor(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._readOnly = options.readOnly || options.readonly || false;
            return _this;
        }
        Object.defineProperty(Editor.prototype, "editable", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Editor.prototype, "readOnly", {
            get: function () {
                return this._readOnly;
            },
            set: function (readOnly) {
                if (this._readOnly !== readOnly) {
                    this._readOnly = readOnly;
                    this.onChangeReadOnlyInternal();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Editor.prototype, "readonly", {
            get: function () {
                window.console.warn("'readonly' is deprecated, please use 'readOnly' instead");
                return this.readOnly;
            },
            set: function (readOnly) {
                window.console.warn("'readonly' is deprecated, please use 'readOnly' instead");
                this.readOnly = readOnly;
            },
            enumerable: false,
            configurable: true
        });
        Editor.prototype.onChangeReadOnlyInternal = function () {
            // nothing
        };
        return Editor;
    }(BaseAction));

    function _inAttachCellArea(grid, col, row, event) {
        var bool = false;
        var relativePos = grid._getMouseRelativePoint(event);
        var rect = grid.getAttachCellsArea(grid.getCellRange(col, row)).rect;
        if (relativePos) {
            if (rect.inPoint(relativePos.x, relativePos.y)) {
                bool = true;
            }
        }
        return bool;
    }
    var BaseInputEditor = /** @class */ (function (_super) {
        __extends(BaseInputEditor, _super);
        function BaseInputEditor(options) {
            if (options === void 0) { options = {}; }
            return _super.call(this, options) || this;
        }
        BaseInputEditor.prototype.open = function (grid, cell) {
            var allowOpen = !isReadOnlyRecord(this.readOnly, grid, cell.row) &&
                !isDisabledRecord(this.disabled, grid, cell.row);
            if (allowOpen) {
                this.onOpenCellInternal(grid, cell);
            }
            return allowOpen;
        };
        BaseInputEditor.prototype.onBeforeKeydownInternal = function (_grid, _keyCode, _e, _cellId) {
            return true;
        };
        BaseInputEditor.prototype.bindGridEvent = function (grid, cellId) {
            var _this = this;
            var open = function (cell) {
                return _this.open(grid, cell);
            };
            var input = function (cell, value) {
                if (isReadOnlyRecord(_this.readOnly, grid, cell.row) ||
                    isDisabledRecord(_this.disabled, grid, cell.row)) {
                    return;
                }
                _this.onInputCellInternal(grid, cell, value);
            };
            function isTarget(col, row) {
                return grid.getLayoutCellId(col, row) === cellId;
            }
            return [
                grid.listen(DG_EVENT_TYPE.INPUT_CELL, function (e) {
                    if (!isTarget(e.col, e.row)) {
                        return;
                    }
                    input({
                        col: e.col,
                        row: e.row,
                    }, e.value);
                }),
                grid.listen(DG_EVENT_TYPE.PASTE_CELL, function (e) {
                    if (e.multi) {
                        // ignore multi cell values
                        return;
                    }
                    var selectionRange = grid.selection.range;
                    if (!cellEquals(selectionRange.start, selectionRange.end)) {
                        // ignore multi paste values
                        return;
                    }
                    if (!isTarget(e.col, e.row)) {
                        return;
                    }
                    event.cancel(e.event);
                    input({
                        col: e.col,
                        row: e.row,
                    }, e.normalizeValue);
                }),
                grid.listen(DG_EVENT_TYPE.DBLCLICK_CELL, function (e) {
                    if (!isTarget(e.col, e.row)) {
                        return;
                    }
                    if (!_inAttachCellArea(grid, e.col, e.row, e.event)) {
                        return;
                    }
                    open({
                        col: e.col,
                        row: e.row,
                    });
                    event.cancel(e.event);
                }),
                grid.listen(DG_EVENT_TYPE.DBLTAP_CELL, function (e) {
                    if (!isTarget(e.col, e.row)) {
                        return;
                    }
                    if (!_inAttachCellArea(grid, e.col, e.row, e.event)) {
                        return;
                    }
                    open({
                        col: e.col,
                        row: e.row,
                    });
                    event.cancel(e.event);
                }),
                grid.listen(DG_EVENT_TYPE.KEYDOWN, function (e) {
                    if ((e.keyCode !== KEY_F2 && e.keyCode !== KEY_ENTER) ||
                        (e.keyCode === KEY_ENTER && e.event.shiftKey)) {
                        return;
                    }
                    var sel = grid.selection.select;
                    if (!isTarget(sel.col, sel.row)) {
                        return;
                    }
                    if (_this.onBeforeKeydownInternal(grid, e.keyCode, e.event, cellId) ===
                        false) {
                        return false;
                    }
                    if (e.event.ctrlKey || e.event.metaKey) {
                        return;
                    }
                    if (open({
                        col: sel.col,
                        row: sel.row,
                    })) {
                        event.cancel(e.event);
                        e.stopCellMoving();
                    }
                }),
                grid.listen(DG_EVENT_TYPE.SELECTED_CELL, function (e) {
                    _this.onChangeSelectCellInternal(grid, { col: e.col, row: e.row }, e.selected);
                }),
                grid.listen(DG_EVENT_TYPE.SCROLL, function () {
                    _this.onGridScrollInternal(grid);
                }),
                grid.listen(DG_EVENT_TYPE.EDITABLEINPUT_CELL, function (cell) {
                    if (!isTarget(cell.col, cell.row)) {
                        return false;
                    }
                    if (isReadOnlyRecord(_this.readOnly, grid, cell.row) ||
                        isDisabledRecord(_this.disabled, grid, cell.row)) {
                        return false;
                    }
                    return true;
                }),
                grid.listen(DG_EVENT_TYPE.MODIFY_STATUS_EDITABLEINPUT_CELL, function (cell) {
                    if (!isTarget(cell.col, cell.row)) {
                        return;
                    }
                    if (isReadOnlyRecord(_this.readOnly, grid, cell.row) ||
                        isDisabledRecord(_this.disabled, grid, cell.row)) {
                        return;
                    }
                    var range = grid.getCellRange(cell.col, cell.row);
                    if (range.start.col !== range.end.col ||
                        range.start.row !== range.end.row) {
                        var input_1 = cell.input;
                        var baseRect = grid.getCellRect(cell.col, cell.row);
                        var rangeRect = grid.getCellRangeRect(range);
                        input_1.style.top = (parseFloat(input_1.style.top) +
                            (rangeRect.top - baseRect.top)).toFixed() + "px";
                        input_1.style.left = (parseFloat(input_1.style.left) +
                            (rangeRect.left - baseRect.left)).toFixed() + "px";
                        input_1.style.width = rangeRect.width.toFixed() + "px";
                        input_1.style.height = rangeRect.height.toFixed() + "px";
                    }
                    _this.onSetInputAttrsInternal(grid, {
                        col: cell.col,
                        row: cell.row,
                    }, cell.input);
                }),
            ];
        };
        BaseInputEditor.prototype.onPasteCellRangeBox = function (grid, cell, value) {
            if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
                isDisabledRecord(this.disabled, grid, cell.row)) {
                return;
            }
            grid.doChangeValue(cell.col, cell.row, function () { return value; });
        };
        BaseInputEditor.prototype.onDeleteCellRangeBox = function (grid, cell) {
            if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
                isDisabledRecord(this.disabled, grid, cell.row)) {
                return;
            }
            grid.doChangeValue(cell.col, cell.row, function () { return ''; });
        };
        return BaseInputEditor;
    }(Editor));

    var BaseActionInput = /** @class */ (function (_super) {
        __extends(BaseActionInput, _super);
        function BaseActionInput(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._disableInput = options.disableInput || false;
            _this._disableAction = options.disableAction || false;
            _this._action = options.action;
            return _this;
        }
        Object.defineProperty(BaseActionInput.prototype, "disableInput", {
            get: function () {
                return this._disableInput;
            },
            set: function (disableInput) {
                this._disableInput = disableInput;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseActionInput.prototype, "disableAction", {
            get: function () {
                return this._disableAction;
            },
            set: function (disableAction) {
                this._disableAction = disableAction;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseActionInput.prototype, "action", {
            get: function () {
                return this._action;
            },
            set: function (action) {
                this._action = action;
            },
            enumerable: false,
            configurable: true
        });
        BaseActionInput.prototype.onBeforeKeydownInternal = function (grid, keyCode, e, cellId) {
            function isTarget(col, row) {
                return grid.getLayoutCellId(col, row) === cellId;
            }
            var sel = grid.selection.select;
            if (isReadOnlyRecord(this.readOnly, grid, sel.row) ||
                isDisabledRecord(this.disabled, grid, sel.row) ||
                !isTarget(sel.col, sel.row) ||
                !this._action ||
                this.isDisabledAction(grid, sel)) {
                return true;
            }
            if ((this.isDisabledInput(grid, sel) &&
                keyCode === KEY_ENTER &&
                !e.ctrlKey &&
                !e.metaKey) ||
                (keyCode === KEY_ENTER && (e.ctrlKey || e.metaKey))) {
                var record = grid.getRowRecord(sel.row);
                if (this._action) {
                    this._action.apply(this, [
                        record,
                        {
                            cell: {
                                col: sel.col,
                                row: sel.row,
                            },
                            grid: grid,
                        },
                    ]);
                    event.cancel(e);
                    return false;
                }
            }
            return true;
        };
        BaseActionInput.prototype.bindGridEvent = function (grid, cellId) {
            var _this = this;
            var state = this.getState(grid);
            var action = function (cell) {
                if (isReadOnlyRecord(_this.readOnly, grid, cell.row) ||
                    isDisabledRecord(_this.disabled, grid, cell.row) ||
                    !_this._action ||
                    _this.isDisabledAction(grid, cell)) {
                    return;
                }
                if (state.mouseActive) {
                    var record = grid.getRowRecord(cell.row);
                    if (_this._action) {
                        _this._action.apply(_this, [
                            record,
                            {
                                cell: cell,
                                grid: grid,
                            },
                        ]);
                    }
                }
            };
            var mouseOut = function (cell) {
                delete state.mouseRelativePos;
                delete state.mouseActiveCell;
                delete state.mouseActive;
                var range = grid.getCellRange(cell.col, cell.row);
                grid.invalidateCellRange(range);
            };
            var mouseMove = function (cell, event) {
                if (isReadOnlyRecord(_this.readOnly, grid, cell.row) ||
                    isDisabledRecord(_this.disabled, grid, cell.row) ||
                    !_this._action ||
                    _this.isDisabledAction(grid, cell)) {
                    return false;
                }
                state.mouseRelativePos = grid._getMouseRelativePoint(event);
                state.mouseActiveCell = {
                    col: cell.col,
                    row: cell.row,
                };
                var range = grid.getCellRange(cell.col, cell.row);
                grid.invalidateCellRange(range);
                return isDef(state.mouseActive) ? state.mouseActive : true;
            };
            var ids = _super.prototype.bindGridEvent.call(this, grid, cellId);
            ids = ids.concat(bindCellClickAction(grid, cellId, {
                action: action,
                mouseMove: mouseMove,
                mouseOut: mouseOut,
                mouseOver: mouseMove,
            }));
            return ids;
        };
        BaseActionInput.prototype.onInputCellInternal = function (grid, cell, inputValue) {
            if (this.isDisabledInput(grid, cell)) {
                return;
            }
            this.onActionInputCellInternal(grid, cell, inputValue);
        };
        BaseActionInput.prototype.onOpenCellInternal = function (grid, cell) {
            if (this.isDisabledInput(grid, cell)) {
                return;
            }
            this.onActionOpenCellInternal(grid, cell);
        };
        BaseActionInput.prototype.onActionInputCellInternal = function (grid, cell, inputValue) {
            throw new Error();
        };
        BaseActionInput.prototype.onActionOpenCellInternal = function (grid, cell) {
            throw new Error();
        };
        BaseActionInput.prototype.isDisabledInput = function (grid, cell) {
            return this.isDisabled(this._disableInput, grid, cell);
        };
        BaseActionInput.prototype.isDisabledAction = function (grid, cell) {
            return this.isDisabled(this._disableAction, grid, cell);
        };
        BaseActionInput.prototype.isDisabled = function (p, grid, cell) {
            var isDisabled = false;
            if (p) {
                if (typeof p === 'function') {
                    var record = grid.getRowRecord(cell.row);
                    if (p.apply(this, [
                        record,
                        {
                            cell: cell,
                            grid: grid,
                        },
                    ])) {
                        isDisabled = true;
                    }
                }
                else {
                    isDisabled = true;
                }
            }
            return isDisabled;
        };
        return BaseActionInput;
    }(BaseInputEditor));

    function cubicBezier(x2, y2, x3, y3) {
        var step;
        var err = 0.0001;
        x2 *= 3;
        y2 *= 3;
        x3 *= 3;
        y3 *= 3;
        return function (t) {
            var p, a, b, c, d, x, s;
            if (t < 0 || 1 < t) {
                throw new Error("" + t);
            }
            p = step || t;
            do {
                a = 1 - p;
                b = a * a;
                c = p * p;
                d = c * p;
                x = x2 * b * p + x3 * a * c + d;
                s = t - x;
                p += s * 0.5;
            } while (err < Math.abs(s));
            step = p;
            return y2 * b * p + y3 * a * c + d;
        };
    }
    var EASINGS = {
        linear: function (p) {
            return p;
        },
        easeIn: cubicBezier(0.42, 0.0, 1.0, 1.0),
        easeOut: cubicBezier(0.0, 0.0, 0.58, 1.0),
        easeInOut: cubicBezier(0.42, 0.0, 0.58, 1.0),
    };
    var raf = (isNode
        ? function () { }
        : window.requestAnimationFrame ||
            (function (fn) {
                return setTimeout(fn, 1);
            }));
    function now() {
        return Date.now();
    }
    /**
     * <pre>
     * Animates.
     * </pre>
     * @param duration - animation time.
     * @param step - step
     * @param easing - easing
     * @returns Deferred object.
     */
    function animate(duration, step, easing) {
        var startedAt = now();
        var easingFn = easing == null
            ? EASINGS.easeInOut
            : typeof easing === 'string'
                ? EASINGS[easing]
                : easing;
        var canceledFlg = false;
        var createAnim = function (resolve, reject) {
            var anim = function () {
                var point = now() - startedAt;
                if (canceledFlg) {
                    //cancel
                    if (reject) {
                        reject();
                    }
                }
                else if (point >= duration) {
                    //end
                    step(1);
                    if (resolve) {
                        resolve(undefined);
                    }
                }
                else {
                    step(easingFn(point / duration));
                    raf(anim);
                }
            };
            return anim;
        };
        var cancel = function () {
            canceledFlg = true;
        };
        if (typeof Promise !== 'undefined') {
            var result = new Promise(function (resolve, reject) {
                var anim = createAnim(resolve, reject);
                step(0);
                anim();
            });
            result.cancel = cancel;
            return result;
        }
        else {
            var anim = createAnim(function () { }, function () { });
            step(0);
            anim();
            return {
                cancel: cancel,
            };
        }
    }

    var BaseCheckEditor = /** @class */ (function (_super) {
        __extends(BaseCheckEditor, _super);
        function BaseCheckEditor(options) {
            if (options === void 0) { options = {}; }
            return _super.call(this, options) || this;
        }
        BaseCheckEditor.prototype.bindGridEvent = function (grid, cellId) {
            var _this = this;
            var state = this.getState(grid);
            var action = function (cell) {
                var range = grid.getCellRange(cell.col, cell.row);
                var cellKey = range.start.col + ":" + range.start.row;
                if (isReadOnlyRecord(_this.readOnly, grid, cell.row) ||
                    isDisabledRecord(_this.disabled, grid, cell.row) ||
                    state.block[cellKey]) {
                    return;
                }
                var ret = grid.doChangeValue(cell.col, cell.row, toggleValue);
                if (ret) {
                    var onChange_1 = function () {
                        // checkbox animation
                        animate(200, function (point) {
                            if (point === 1) {
                                delete state.elapsed[cellKey];
                            }
                            else {
                                state.elapsed[cellKey] = point;
                            }
                            grid.invalidateCellRange(range);
                        });
                    };
                    if (isPromise(ret)) {
                        state.block[cellKey] = true;
                        ret.then(function () {
                            delete state.block[cellKey];
                            onChange_1();
                        });
                    }
                    else {
                        onChange_1();
                    }
                }
            };
            function isTarget(col, row) {
                return grid.getLayoutCellId(col, row) === cellId;
            }
            return __spreadArrays(bindCellClickAction(grid, cellId, {
                action: action,
                mouseOver: function (e) {
                    if (isDisabledRecord(_this.disabled, grid, e.row)) {
                        return false;
                    }
                    state.mouseActiveCell = {
                        col: e.col,
                        row: e.row,
                    };
                    var range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                    return true;
                },
                mouseOut: function (e) {
                    delete state.mouseActiveCell;
                    var range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                },
            }), bindCellKeyAction(grid, cellId, {
                action: function (e) {
                    var selRange = grid.selection.range;
                    var col = grid.selection.select.col;
                    for (var row = selRange.start.row; row <= selRange.end.row; row++) {
                        if (!isTarget(col, row)) {
                            continue;
                        }
                        action({
                            col: col,
                            row: row,
                        });
                    }
                },
                acceptKeys: [KEY_ENTER, KEY_SPACE],
            }), [
                // paste value
                grid.listen(DG_EVENT_TYPE.PASTE_CELL, function (e) {
                    if (e.multi) {
                        // ignore multi cell values
                        return;
                    }
                    var selectionRange = grid.selection.range;
                    if (!cellEquals(selectionRange.start, selectionRange.end)) {
                        // ignore multi paste values
                        return;
                    }
                    if (!isTarget(e.col, e.row)) {
                        return;
                    }
                    var pasteValue = e.normalizeValue.trim();
                    grid.doGetCellValue(e.col, e.row, function (value) {
                        var newValue = toggleValue(value);
                        if (("" + newValue).trim() === pasteValue) {
                            event.cancel(e.event);
                            action({
                                col: e.col,
                                row: e.row,
                            });
                        }
                    });
                }),
            ]);
        };
        BaseCheckEditor.prototype.onPasteCellRangeBox = function (grid, cell, value) {
            if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
                isDisabledRecord(this.disabled, grid, cell.row)) {
                return;
            }
            var pasteValue = value.trim();
            grid.doGetCellValue(cell.col, cell.row, function (value) {
                var newValue = toggleValue(value);
                if (("" + newValue).trim() === pasteValue) {
                    grid.doChangeValue(cell.col, cell.row, toggleValue);
                }
            });
        };
        BaseCheckEditor.prototype.onDeleteCellRangeBox = function () {
            // noop
        };
        return BaseCheckEditor;
    }(Editor));

    var BUTTON_COLUMN_STATE_ID = getButtonColumnStateId();
    var ButtonAction = /** @class */ (function (_super) {
        __extends(ButtonAction, _super);
        function ButtonAction(options) {
            if (options === void 0) { options = {}; }
            return _super.call(this, options) || this;
        }
        ButtonAction.prototype.getState = function (grid) {
            if (!grid[BUTTON_COLUMN_STATE_ID]) {
                obj.setReadonly(grid, BUTTON_COLUMN_STATE_ID, {});
            }
            return grid[BUTTON_COLUMN_STATE_ID];
        };
        return ButtonAction;
    }(Action));

    var CHECK_COLUMN_STATE_ID = getCheckColumnStateId();
    var CheckEditor = /** @class */ (function (_super) {
        __extends(CheckEditor, _super);
        function CheckEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CheckEditor.prototype.clone = function () {
            return new CheckEditor(this);
        };
        CheckEditor.prototype.getState = function (grid) {
            var state = grid[CHECK_COLUMN_STATE_ID];
            if (!state) {
                state = { block: {}, elapsed: {} };
                obj.setReadonly(grid, CHECK_COLUMN_STATE_ID, state);
            }
            return state;
        };
        return CheckEditor;
    }(BaseCheckEditor));

    var SWITCH_COLUMN_STATE_ID = getSwitchColumnStateId();
    var SwitchEditor = /** @class */ (function (_super) {
        __extends(SwitchEditor, _super);
        function SwitchEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SwitchEditor.prototype.clone = function () {
            return new SwitchEditor(this);
        };
        SwitchEditor.prototype.getState = function (grid) {
            var state = grid[SWITCH_COLUMN_STATE_ID];
            if (!state) {
                state = { block: {}, elapsed: {} };
                obj.setReadonly(grid, SWITCH_COLUMN_STATE_ID, state);
            }
            return state;
        };
        return SwitchEditor;
    }(BaseCheckEditor));

    function createElement(tagName, _a) {
        var _b;
        var _c = _a === void 0 ? {} : _a, classList = _c.classList, text = _c.text, html = _c.html;
        var element = document.createElement(tagName);
        if (classList) {
            if (Array.isArray(classList)) {
                (_b = element.classList).add.apply(_b, classList);
            }
            else {
                element.classList.add(classList);
            }
        }
        if (text) {
            element.textContent = text;
        }
        else if (html) {
            element.innerHTML = html;
        }
        return element;
    }
    function empty(dom) {
        var c;
        while ((c = dom.firstChild)) {
            dom.removeChild(c);
        }
    }
    function isNode$1(arg) {
        return !!(arg.nodeType && arg.nodeName);
    }
    function toNode(arg) {
        if (isNode$1(arg)) {
            return arg;
        }
        var dom = createElement('div', { html: arg });
        return Array.prototype.slice.call(dom.childNodes);
    }
    function toNodeList(arg) {
        if (Array.isArray(arg)) {
            var result_1 = [];
            arg.forEach(function (e) {
                result_1.push.apply(result_1, toNodeList(e));
            });
            return result_1;
        }
        var node = toNode(arg);
        return Array.isArray(node) ? node : [node];
    }
    function appendHtml(dom, inner) {
        toNodeList(inner).forEach(function (node) {
            dom.appendChild(node);
        });
    }
    function disableFocus(el) {
        el.dataset.disableBeforeTabIndex = "" + el.tabIndex;
        el.tabIndex = -1;
        Array.prototype.slice
            .call(el.children || el.childNodes, 0)
            .forEach(disableFocus);
    }
    function isFocusable(el) {
        return (isDef(el.tabIndex) && el.tabIndex > -1);
    }
    function findPrevSiblingFocusable(el) {
        var n = el.previousSibling;
        while (n && !isFocusable(n)) {
            n = n.previousSibling;
        }
        return n;
    }
    function findNextSiblingFocusable(el) {
        var n = el.nextSibling;
        while (n && !isFocusable(n)) {
            n = n.nextSibling;
        }
        return n;
    }

    var eventHandlerNextId = 1;
    var EventHandler = /** @class */ (function () {
        function EventHandler() {
            this._listeners = {};
        }
        EventHandler.prototype.on = function (target, type, listener) {
            var options = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                options[_i - 3] = arguments[_i];
            }
            if (target.addEventListener) {
                target.addEventListener.apply(target, __spreadArrays([type, listener], options));
            }
            var obj = {
                target: target,
                type: type,
                listener: listener,
                options: options,
            };
            var id = eventHandlerNextId++;
            this._listeners[id] = obj;
            return id;
        };
        EventHandler.prototype.once = function (target, type, listener) {
            var _this = this;
            var options = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                options[_i - 3] = arguments[_i];
            }
            var id = this.on.apply(this, __spreadArrays([target,
                type, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    _this.off(id);
                    listener.apply(void 0, args);
                }], options));
            return id;
        };
        EventHandler.prototype.tryWithOffEvents = function (target, type, call) {
            var list = [];
            try {
                each(this._listeners, function (obj) {
                    var _a;
                    if (obj.target === target && obj.type === type) {
                        if (obj.target.removeEventListener) {
                            (_a = obj.target).removeEventListener.apply(_a, __spreadArrays([obj.type,
                                obj.listener], obj.options));
                        }
                        list.push(obj);
                    }
                });
                call();
            }
            finally {
                list.forEach(function (obj) {
                    var _a;
                    if (obj.target.addEventListener) {
                        (_a = obj.target).addEventListener.apply(_a, __spreadArrays([obj.type,
                            obj.listener], obj.options));
                    }
                });
            }
        };
        EventHandler.prototype.off = function (id) {
            var _a;
            if (id == null) {
                return;
            }
            var obj = this._listeners[id];
            if (!obj) {
                return;
            }
            delete this._listeners[id];
            if (obj.target.removeEventListener) {
                (_a = obj.target).removeEventListener.apply(_a, __spreadArrays([obj.type,
                    obj.listener], obj.options));
            }
        };
        EventHandler.prototype.fire = function (target, type) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            each(this._listeners, function (obj) {
                var _a;
                if (obj.target === target && obj.type === type) {
                    (_a = obj.listener).call.apply(_a, __spreadArrays([obj.target], args));
                }
            });
        };
        EventHandler.prototype.hasListener = function (target, type) {
            var result = false;
            each(this._listeners, function (obj) {
                if (obj.target === target && obj.type === type) {
                    result = true;
                }
            });
            return result;
        };
        EventHandler.prototype.clear = function () {
            each(this._listeners, function (obj) {
                var _a;
                if (obj.target.removeEventListener) {
                    (_a = obj.target).removeEventListener.apply(_a, __spreadArrays([obj.type,
                        obj.listener], obj.options));
                }
            });
            this._listeners = {};
        };
        EventHandler.prototype.dispose = function () {
            this.clear();
        };
        return EventHandler;
    }());

    var styleCss = "/**\n * core styles \n */\n.kaka-grid .grid-scrollable {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.kaka-grid .grid-scroll-end-point {\n  position: relative;\n  opacity: 0;\n}\n.kaka-grid {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.kaka-grid > canvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 0;\n}\n.kaka-grid .grid-focus-control {\n  position: relative !important;\n  width: 1px;\n  height: 1px;\n  opacity: 0;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  box-sizing: border-box;\n  pointer-events: none;\n  max-width: 0;\n  max-height: 0;\n  float: none !important;\n}\n.kaka-grid input.grid-focus-control::-ms-clear {\n  visibility: hidden;\n}\n.kaka-grid input.grid-focus-control.composition {\n  opacity: 1;\n  max-width: none;\n  max-height: none;\n}\n";

    function styleInject(id, css) {
        if (css && typeof document !== 'undefined') {
            var styleElement = void 0;
            if (id) {
                var el = document.getElementById(id);
                if (el instanceof HTMLStyleElement) {
                    styleElement = el;
                }
            }
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.type = 'text/css';
                styleElement.id = id;
                var headElement = document.head || document.getElementsByTagName('head')[0];
                headElement.appendChild(styleElement);
            }
            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = css;
            }
            else {
                styleElement.innerHTML = '';
                styleElement.appendChild(document.createTextNode(css));
            }
        }
    }
    function getScrollBarWidth() {
        // https://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
        var inner = document.createElement('p');
        inner.style.width = '100%';
        inner.style.height = '200px';
        var outer = document.createElement('div');
        outer.style.position = 'absolute';
        outer.style.top = '0px';
        outer.style.left = '0px';
        outer.style.visibility = 'hidden';
        outer.style.width = '200px';
        outer.style.height = '150px';
        outer.style.overflow = 'hidden';
        outer.appendChild(inner);
        document.body.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 === w2) {
            w2 = outer.clientWidth;
        }
        document.body.removeChild(outer);
        return w1 - w2;
    }
    var SCROLLBAR_SIZE = 0;
    var isPerfectScrollbar = function () { return !!window.PerfectScrollbar; };
    var initDocument = function () {
        var css = styleCss;
        if (isPerfectScrollbar()) {
            css += "\n      .kaka-grid .grid-scroll-end-point {\n        width: 1px;\n        height: 1px;\n      }";
        }
        else {
            SCROLLBAR_SIZE = getScrollBarWidth() || 10;
            css += "\n      .kaka-grid .grid-scrollable {\n        overflow: scroll;\n      }\n      .kaka-grid .grid-scroll-end-point {\n        width: " + SCROLLBAR_SIZE + "px;\n        height: " + SCROLLBAR_SIZE + "px;\n      }\n      .kaka-grid > canvas {\n        width: -webkit-calc(100% - " + SCROLLBAR_SIZE + "px);\n        width: calc(100% - " + SCROLLBAR_SIZE + "px);\n        height: -webkit-calc(100% - " + SCROLLBAR_SIZE + "px);\n        height: calc(100% - " + SCROLLBAR_SIZE + "px);\n      }";
        }
        styleInject('style', css);
    };
    var style$1 = {
        initDocument: function () {
            style$1.initDocument = function () {
                // nothing
            };
            initDocument();
        },
        getScrollBarSize: function () {
            return SCROLLBAR_SIZE;
        },
        inject: styleInject,
        isPerfectScrollbar: isPerfectScrollbar,
    };

    var inlineInputElementCss = ".kaka-grid__inline-input::-ms-clear {\n  visibility: hidden;\n}\n\n.kaka-grid__inline-input {\n  position: absolute;\n  box-sizing: border-box;\n  background-color: transparent;\n  padding: 0;\n  border: none;\n}\n";

    function setInputValue(input, value) {
        var sign = input.type === 'number' && value === '-';
        if (sign) {
            // When `type="number"`, the minus sign is not accepted, so change it to `type="text"` once.
            input.type = '';
            var handler_1 = new EventHandler();
            var dispose_1 = function () {
                if (handler_1) {
                    handler_1.dispose();
                    handler_1 = null;
                }
            };
            handler_1.once(input, 'input', function (_e) {
                input.type = 'number';
                dispose_1();
            });
            handler_1.once(input, 'blur', function (_e) {
                dispose_1();
            });
        }
        input.value = value !== null && value !== void 0 ? value : '';
    }

    var INLINE_EDITING_STATE_ID = getInlineEditingStateId();
    function getInlineEditingState(grid) {
        var state = grid[INLINE_EDITING_STATE_ID];
        if (!state) {
            state = {};
            obj.setReadonly(grid, INLINE_EDITING_STATE_ID, state);
        }
        return state;
    }
    function toBoolean(val) {
        if (typeof val === 'string') {
            if (val === 'false') {
                return false;
            }
            else if (val === 'off') {
                return false;
            }
            else if (/^0+$/.exec(val)) {
                return false;
            }
        }
        return Boolean(val);
    }

    var CLASSNAME_IIE = 'kaka-grid__inline-input';
    function createInputElement() {
        style$1.inject('inlineInputElement', inlineInputElementCss);
        return createElement('input', { classList: CLASSNAME_IIE });
    }
    var INPUT_EDITOR_TYPE = 'editor_type';
    var BEFORE_INPUT_VALUE = 'before_value';
    function setInlineInputValue(type, input, value, inputValue) {
        if (type === void 0) { type = ''; }
        input.dataset[INPUT_EDITOR_TYPE] = type;
        if (type === 'date') {
            if (value instanceof Date) {
                if (input.type === 'text') {
                    input.value = value.toJSON().slice(0, 10);
                }
                else {
                    input.valueAsDate = value;
                }
            }
            else {
                input.value = '';
            }
        }
        else if (type === 'number') {
            if (typeof value === 'number' || typeof value === 'string') {
                input.value = String(value);
            }
            else {
                input.value = '';
            }
        }
        else if (isDef(value)) {
            input.value = value;
        }
        else {
            input.value = '';
        }
        input.dataset[BEFORE_INPUT_VALUE] = input.value;
        if (inputValue) {
            setInputValue(input, inputValue);
        }
    }
    function getInlineInputValue(input) {
        var value;
        switch (input.dataset[INPUT_EDITOR_TYPE]) {
            case 'date':
                if (/(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/.test(input.value)) {
                    value = new Date(input.value);
                }
                else {
                    value = null;
                }
                break;
            case 'number':
                value = input.value ? Number(input.value) : null;
                if (isNaN(value)) {
                    value = null;
                }
                break;
            default:
                value = input.value;
                break;
        }
        return value;
    }
    function isInputValueChanged(input) {
        return input.value !== input.dataset[BEFORE_INPUT_VALUE];
    }
    function setInputAttrs(editor, _grid, input, fixedType) {
        var _a;
        var classList = editor.classList, type = editor.type;
        if (classList) {
            (_a = input.classList).add.apply(_a, classList);
        }
        try {
            input.type = fixedType || type || '';
        }
        catch (e) {
            input.type = '';
        }
    }
    var InlineInputElement = /** @class */ (function () {
        function InlineInputElement() {
            this._enabledMouseWheel = false;
            this._handler = new EventHandler();
            this._input = createInputElement();
            this._bindInputEvents();
        }
        InlineInputElement.setInputAttrs = function (editor, grid, input, fixedType) {
            setInputAttrs(editor, grid, input, fixedType);
        };
        InlineInputElement.prototype.dispose = function () {
            var _a;
            var input = this._input;
            this.detach();
            this._handler.dispose();
            this._beforePropEditor = null;
            (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(input);
        };
        InlineInputElement.prototype.attach = function (grid, editor, col, row, value, inputValue) {
            var _a;
            var _this = this;
            var input = this._input;
            this._enabledMouseWheel = editor.enabledMouseWheel;
            if (input.parentElement) {
                // 解决 chrome 下 Failed to execute 'appendChild' on 'Node': The node to be removed is no longer a child of this node. Perhaps it was moved in a 'blur' event handler? 问题
                // 问题原因：
                //  正在输入的时候，双击其他单元格，正常情况要先触发 blur 再执行此方法，但 chrome 有时会延后执行 blur
                //  element.appendChild(input) 执行此行代码的过程中会执行 blur 事件内容，导致此错误
                // 解决办法：
                //  如果发现 blur 还没有执行，则不执行此方法
                return;
            }
            var handler = this._handler;
            if (this._beforePropEditor) {
                var classList = this._beforePropEditor.classList;
                if (classList) {
                    (_a = input.classList).remove.apply(_a, classList);
                }
            }
            input.style.font = grid.font || '16px sans-serif';
            var _b = grid.getAttachCellsArea(grid.getCellRange(col, row)), element = _b.element, rect = _b.rect, padding = _b.padding;
            input.style.top = rect.top.toFixed() + "px";
            input.style.left = rect.left.toFixed() + "px";
            input.style.width = rect.width.toFixed() + "px";
            input.style.height = rect.height.toFixed() + "px";
            input.style.paddingTop = padding[0] + "px";
            input.style.paddingRight = padding[1] + "px";
            input.style.paddingBottom = padding[2] + "px";
            input.style.paddingLeft = padding[3] + "px";
            element.appendChild(input);
            setInputAttrs(editor, grid, input);
            setInlineInputValue(editor.type, input, value, inputValue);
            this._activeData = { grid: grid, col: col, row: row, editor: editor };
            this._beforePropEditor = editor;
            var focus = function () {
                input.focus();
                var end = input.value.length;
                try {
                    if (typeof input.selectionStart !== 'undefined') {
                        input.selectionStart = end;
                        input.selectionEnd = end;
                        return;
                    }
                }
                catch (e) {
                    // ignore
                }
                if (document.selection) {
                    var range = input.createTextRange();
                    range.collapse();
                    range.moveEnd('character', end);
                    range.moveStart('character', end);
                    range.select();
                }
            };
            var safeInputFocus = function () {
                handler.tryWithOffEvents(input, 'blur', function () {
                    focus();
                });
                var state = getInlineEditingState(grid);
                state.cellRange = grid.getCellRange(col, row);
                grid.invalidateCellRange(state.cellRange);
            };
            this._attaching = true;
            setTimeout(function () {
                safeInputFocus();
                _this._attaching = false;
            });
        };
        InlineInputElement.prototype.detach = function (gridFocus) {
            if (this._isActive()) {
                var activeData = this._activeData;
                var grid = activeData.grid;
                var col = activeData.col;
                var row = activeData.row;
                var input_1 = this._input;
                this._handler.tryWithOffEvents(input_1, 'blur', function () {
                    if (input_1.parentElement) {
                        input_1.parentElement.removeChild(input_1);
                    }
                });
                var state = getInlineEditingState(grid);
                delete state.cellRange;
                var range = grid.getCellRange(col, row);
                grid.invalidateCellRange(range);
                if (gridFocus) {
                    grid.focus();
                }
            }
            delete this._activeData;
            this._enabledMouseWheel = false;
        };
        InlineInputElement.prototype.doChangeValue = function () {
            if (!this._isActive()) {
                return;
            }
            if (isInputValueChanged(this._input)) {
                var value_1 = getInlineInputValue(this._input);
                var activeData = this._activeData;
                var grid = activeData.grid;
                var col = activeData.col;
                var row = activeData.row;
                grid.doChangeValue(col, row, function () { return value_1; });
            }
        };
        InlineInputElement.prototype._isActive = function () {
            var input = this._input;
            if (!input || !input.parentElement) {
                return false;
            }
            if (!this._activeData) {
                return false;
            }
            return true;
        };
        InlineInputElement.prototype._bindInputEvents = function () {
            var _this = this;
            var handler = this._handler;
            var input = this._input;
            var stopPropagationOnly = function (e) { return e.stopPropagation(); }; // 终止事件传播
            handler.on(input, 'click', stopPropagationOnly);
            handler.on(input, 'mousedown', stopPropagationOnly);
            handler.on(input, 'touchstart', stopPropagationOnly);
            handler.on(input, 'dblclick', stopPropagationOnly);
            handler.on(input, 'mousewheel', function (e) {
                if (!_this._enabledMouseWheel) {
                    e.preventDefault();
                }
            });
            handler.on(input, 'compositionstart', function (e) {
                input.classList.add('composition');
            });
            handler.on(input, 'compositionend', function (e) {
                input.classList.remove('composition');
            });
            handler.on(input, 'keydown', function (e) {
                if (input.classList.contains('composition')) {
                    return;
                }
                var keyCode = event.getKeyCode(e);
                if (keyCode === KEY_ESC) {
                    _this.detach(true);
                    event.cancel(e);
                }
                else if (keyCode === KEY_ENTER) {
                    _this._onKeydownEnter(e);
                }
                else if (keyCode === KEY_TAB) {
                    _this._onKeydownTab(e);
                }
            });
            handler.on(input, 'blur', function (e) {
                _this.doChangeValue();
                _this.detach();
            });
        };
        InlineInputElement.prototype._onKeydownEnter = function (e) {
            var _a;
            if (!this._isActive() || this._attaching) {
                return;
            }
            var grid = this._activeData.grid;
            this.doChangeValue();
            this.detach(true);
            event.cancel(e);
            if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) {
                grid.onKeyDownMove(e);
            }
        };
        InlineInputElement.prototype._onKeydownTab = function (e) {
            var _a;
            if (!this._isActive() || this._attaching) {
                return;
            }
            var grid = this._activeData.grid;
            if (!((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab)) {
                return;
            }
            this.doChangeValue();
            this.detach(true);
            grid.onKeyDownMove(e);
        };
        return InlineInputElement;
    }());

    var INLINE_INPUT_EDITOR_STATE_ID = getInlineInputEditorStateId();
    var globalInlineInputElement = null;
    var globalInlineInputBindGridCount = 0;
    function attachInput(grid, cell, editor, value, inputValue) {
        if (!globalInlineInputElement) {
            globalInlineInputElement = new InlineInputElement();
        }
        var state = editor.getState(grid);
        if (!state.element) {
            state.element = globalInlineInputElement;
            globalInlineInputBindGridCount++;
            grid.addDisposable({
                dispose: function () {
                    globalInlineInputBindGridCount--;
                    if (!globalInlineInputBindGridCount && globalInlineInputElement) {
                        globalInlineInputElement.dispose();
                        globalInlineInputElement = null;
                    }
                },
            });
        }
        globalInlineInputElement.attach(grid, editor, cell.col, cell.row, value, inputValue);
    }
    function detachInput(gridFocus) {
        if (globalInlineInputElement) {
            globalInlineInputElement.detach(gridFocus);
        }
    }
    function doChangeValue(_grid) {
        if (globalInlineInputElement) {
            globalInlineInputElement.doChangeValue();
        }
    }
    var InlineInputEditor = /** @class */ (function (_super) {
        __extends(InlineInputEditor, _super);
        function InlineInputEditor(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._classList = options.classList;
            _this._type = options.type;
            _this._enabledMouseWheel = !!options.enabledMouseWheel;
            return _this;
        }
        Object.defineProperty(InlineInputEditor.prototype, "classList", {
            get: function () {
                if (!this._classList) {
                    return undefined;
                }
                return Array.isArray(this._classList) ? this._classList : [this._classList];
            },
            set: function (classList) {
                this._classList = classList;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineInputEditor.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (type) {
                this._type = type;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineInputEditor.prototype, "enabledMouseWheel", {
            get: function () {
                return this._enabledMouseWheel;
            },
            set: function (enabled) {
                this._enabledMouseWheel = enabled;
            },
            enumerable: false,
            configurable: true
        });
        InlineInputEditor.prototype.clone = function () {
            return new InlineInputEditor(this);
        };
        InlineInputEditor.prototype.onActionInputCellInternal = function (grid, cell, inputValue) {
            var _this = this;
            grid.doGetCellValue(cell.col, cell.row, function (value) {
                attachInput(grid, cell, _this, value, inputValue);
            });
        };
        InlineInputEditor.prototype.onActionOpenCellInternal = function (grid, cell) {
            var _this = this;
            grid.doGetCellValue(cell.col, cell.row, function (value) {
                attachInput(grid, cell, _this, value);
            });
        };
        InlineInputEditor.prototype.onChangeSelectCellInternal = function (grid, _cell, _selected) {
            doChangeValue();
            detachInput();
        };
        InlineInputEditor.prototype.onGridScrollInternal = function (grid) {
            doChangeValue();
            detachInput(true);
        };
        InlineInputEditor.prototype.onChangeDisabledInternal = function () {
            // cancel input
            detachInput(true);
        };
        InlineInputEditor.prototype.onChangeReadOnlyInternal = function () {
            // cancel input
            detachInput(true);
        };
        InlineInputEditor.prototype.onSetInputAttrsInternal = function (grid, _cell, input) {
            InlineInputElement.setInputAttrs(this, grid, input, 'text');
        };
        InlineInputEditor.prototype.getState = function (grid) {
            if (!grid[INLINE_INPUT_EDITOR_STATE_ID]) {
                obj.setReadonly(grid, INLINE_INPUT_EDITOR_STATE_ID, {});
            }
            return grid[INLINE_INPUT_EDITOR_STATE_ID];
        };
        return InlineInputEditor;
    }(BaseActionInput));

    var InlineLookupElementCss = ".kaka-grid__inline-lookup__input::-ms-clear {\n  visibility: hidden;\n}\n\n.kaka-grid__inline-lookup__input {\n  box-sizing: border-box;\n  background-color: transparent;\n  padding: 0;\n  border: none;\n}\n\n.kaka-grid__inline-lookup__dropdown {\n  position: absolute;\n  color: rgba(0, 0, 0, 0.87);\n  box-sizing: content-box;\n  margin: 0;\n  padding: 8px 0;\n  background-color: #fafafa;\n  list-style-type: none;\n  border-radius: 2px;\n  /* max-height: calc(50vh - 40px); */\n  overflow-y: auto;\n  min-width: 100%;\n}\n\n.kaka-grid__inline-lookup__dropdown--hidden {\n  transform: scale(0.9);\n  box-shadow: none;\n  opacity: 0;\n  pointer-events: none;\n  transition: all 50ms ease-out;\n}\n\n.kaka-grid__inline-lookup__dropdown--hidden * {\n  pointer-events: none;\n}\n\n.kaka-grid__inline-lookup__dropdown--shown {\n  transform: translateY(2px);\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12);\n  opacity: 1;\n  /* transition: all 150ms ease-out; */\n}\n.kaka-grid__inline-lookup__dropdown--shown.kaka-grid__inline-lookup__dropdown--right {\n  right: 0px;\n}\n.kaka-grid__inline-lookup__dropdown--shown.kaka-grid__inline-lookup__dropdown--bottom {\n  bottom: 100%;\n  transform: translateY(-2px);\n  box-shadow: 0 -3px 1px -2px rgba(0, 0, 0, 0.2),\n    0 -2px 2px 0px rgba(0, 0, 0, 0.14), 0 -1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n.kaka-grid__inline-lookup__dropdown-item {\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  outline: none;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  padding: 0 16px;\n}\n\n.kaka-grid__inline-lookup__dropdown-item--empty {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.kaka-grid__inline-lookup__dropdown-item::before {\n  content: '';\n  position: absolute;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background-color: #000;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 15ms linear;\n}\n\n.kaka-grid__inline-lookup__dropdown-item:hover::before {\n  opacity: 0.04;\n}\n\n.kaka-grid__inline-lookup__dropdown-item[data-select]::before {\n  opacity: 0.12;\n}\n\n.kaka-grid__inline-lookup {\n  position: absolute;\n}\n";

    var CLASSNAME_ILE = 'kaka-grid__inline-lookup';
    var INPUT_CLASSNAME_ILE = CLASSNAME_ILE + "__input";
    var DROPDOWN_CLASSNAME_ILE = CLASSNAME_ILE + "__dropdown";
    var DROPDOWN_HIDDEN_CLASSNAME_ILE = DROPDOWN_CLASSNAME_ILE + "--hidden";
    var DROPDOWN_SHOWN_CLASSNAME_ILE = DROPDOWN_CLASSNAME_ILE + "--shown";
    var DROPDOWN_RIGHT_CLASSNAME_ILE = DROPDOWN_CLASSNAME_ILE + "--right";
    var DROPDOWN_BOTTOM_CLASSNAME_ILE = DROPDOWN_CLASSNAME_ILE + "--bottom";
    var DROPDOWN_ITEM_CLASSNAME_ILE = DROPDOWN_CLASSNAME_ILE + "-item";
    var DROPDOWN_ITEM_EMPTY_CLASSNAME_ILE = DROPDOWN_ITEM_CLASSNAME_ILE + "--empty";
    var DROPDOWN_ITEM_OTHER_CLASSNAME_ILE = DROPDOWN_ITEM_CLASSNAME_ILE + "--other";
    var DROPDOWN_ITEM_FIRST_CLASSNAME_ILE = DROPDOWN_ITEM_CLASSNAME_ILE + "--first";
    var DEFAULT_DROPDOWN_VALUE_FIELD = 'id';
    function highlight(data, search) {
        // http://kevin.vanzonneveld.net
        // +   original by: booeyOH
        // +   improved by: Ates Goral (http://magnetiq.com)
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   bugfixed by: Onno Marsman
        // *     example 1: preg_quote("$40");
        // *     returns 1: '\$40'
        // *     example 2: preg_quote("*RRRING* Hello?");
        // *     returns 2: '\*RRRING\* Hello\?'
        // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
        // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
        var s = (search + '').replace(/([\\.+*?[^\]$(){}=!<>|:])/g, '\\$1');
        return s ? data.replace(new RegExp('(' + s + ')', 'gi'), '<b>$1</b>') : data;
    }
    function createLookupElement() {
        style$1.inject('InlineLookupElement', InlineLookupElementCss);
        var element = createElement('div', { classList: CLASSNAME_ILE });
        var input = createElement('input', { classList: INPUT_CLASSNAME_ILE });
        var ul = createElement('ul', { classList: DROPDOWN_CLASSNAME_ILE });
        ul.tabIndex = -1;
        element.appendChild(input);
        element.appendChild(ul);
        return element;
    }
    var LOOKUP_BEFORE_VALUE = 'before_value';
    var LOOKUP_SELECT_VALUE = 'select_value';
    var LOOKUP_VALUE_TYPE = 'value_type';
    function setLookupInputValue(type, input, value, captionValue, inputValue) {
        input.value = captionValue;
        input.dataset[LOOKUP_VALUE_TYPE] = type;
        input.dataset[LOOKUP_BEFORE_VALUE] = JSON.stringify(value);
        input.dataset[LOOKUP_SELECT_VALUE] = JSON.stringify(value);
        if (inputValue) {
            input.value = inputValue;
        }
    }
    function getLookupInputValue(input) {
        var value = JSON.parse(input.dataset[LOOKUP_SELECT_VALUE] || 'null');
        if (input.dataset[LOOKUP_VALUE_TYPE] === 'number' && isDef(value)) {
            value = value - 0;
            if (isNaN(value)) {
                value = null;
            }
        }
        return value;
    }
    function isLookupInputValueChanged(input) {
        return (input.dataset[LOOKUP_BEFORE_VALUE] !== input.dataset[LOOKUP_SELECT_VALUE]);
    }
    function findDropdownItemParents(target) {
        var el = target;
        while (!el.classList.contains(DROPDOWN_ITEM_CLASSNAME_ILE)) {
            el = el.parentElement;
            if (!el || el.classList.contains(DROPDOWN_CLASSNAME_ILE)) {
                return undefined;
            }
        }
        return el;
    }
    var InlineLookupElement = /** @class */ (function () {
        function InlineLookupElement() {
            this._attaching = false;
            this._handler = new EventHandler();
            this._lookup = createLookupElement();
            this._input = this._lookup.querySelector("." + INPUT_CLASSNAME_ILE);
            this._dropdown = this._lookup.querySelector("." + DROPDOWN_CLASSNAME_ILE);
            this._bindInputEvents();
        }
        InlineLookupElement.setInputAttrs = function (_editor, _grid, input) {
            input.type = 'text';
        };
        InlineLookupElement.prototype.dispose = function () {
            var _a;
            var lookup = this._lookup;
            this.detach();
            this._handler.dispose();
            this._beforePropEditor = null;
            (_a = lookup.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(lookup);
        };
        InlineLookupElement.prototype.attach = function (grid, editor, col, row, value, lookupRecords, inputValue) {
            var _this = this;
            var handler = this._handler;
            var lookup = this._lookup;
            var input = this._input;
            if (this._beforePropEditor) {
                this._unbindLookupProps(grid, lookup, input, this._beforePropEditor);
            }
            var _a = grid.getAttachCellsArea(grid.getCellRange(col, row)), element = _a.element, rect = _a.rect, padding = _a.padding;
            lookup.style.top = rect.top.toFixed() + "px";
            lookup.style.left = rect.left.toFixed() + "px";
            lookup.style.width = rect.width.toFixed() + "px";
            lookup.style.height = rect.height.toFixed() + "px";
            input.style.width = lookup.style.width;
            input.style.height = lookup.style.height;
            input.style.paddingTop = padding[0] + "px";
            input.style.paddingRight = padding[1] + "px";
            input.style.paddingBottom = padding[2] + "px";
            input.style.paddingLeft = padding[3] + "px";
            element.appendChild(lookup);
            input.style.font = grid.font || '16px sans-serif';
            var valueField = editor.valueField || DEFAULT_DROPDOWN_VALUE_FIELD;
            var captionField = editor.captionField || valueField;
            // 让 valueField 和 captionField 默认在 filterFields 中
            var filterFields = !isDefString(editor.filterFields) ||
                (Array.isArray(editor.filterFields) && editor.filterFields.length === 0)
                ? [valueField, captionField]
                : [];
            if (Array.isArray(editor.filterFields)) {
                editor.filterFields.forEach(function (field) {
                    if (filterFields.indexOf(field) < 0 && field) {
                        filterFields.push(field);
                    }
                });
            }
            else if (isDef(editor.filterFields) &&
                filterFields.indexOf(editor.filterFields) < 0 &&
                editor.filterFields) {
                filterFields.push(editor.filterFields);
            }
            var gridRecord = grid.getRowRecord(row);
            var records = [];
            var emptyRecord; // 找到表示空的记录
            var beforeRecord; // 找到上一个值对应的记录
            var filter = typeof editor.filter === 'function' ? editor.filter : function () { return true; };
            for (var _i = 0, lookupRecords_1 = lookupRecords; _i < lookupRecords_1.length; _i++) {
                var record = lookupRecords_1[_i];
                if (filter(record, gridRecord)) {
                    records.push(record);
                    if (!isDefString(record[valueField])) {
                        emptyRecord = record;
                        if (!isDefString(value)) {
                            beforeRecord = record;
                        }
                    }
                    else if (record[valueField] === value) {
                        beforeRecord = record;
                    }
                }
            }
            // 进入编辑状态时，输入框中显示 captionField 的值
            // 如果 captionField 没有值则显示 valueField 的值
            // 如果 valueField 为空，显示空格
            var captionValue = isDef(value) ? value + '' : '';
            if (beforeRecord) {
                if (beforeRecord !== emptyRecord) {
                    captionValue = beforeRecord[captionField] + '' || captionValue;
                }
                else {
                    captionValue = '';
                }
            }
            var allowOtherInput = getOrApply(editor.allowOtherInput, gridRecord);
            var activeData = {
                col: col,
                dropdownInfo: {
                    allowOtherInput: allowOtherInput,
                    beforeRecord: isDef(inputValue) ? undefined : beforeRecord,
                    captionField: captionField,
                    disableFilterRecords: editor.disableFilterRecords,
                    disableFilterSort: editor.disableFilterSort,
                    dropdownEmptyTemplate: editor.dropdownEmptyTemplate
                        ? editor.dropdownEmptyTemplate
                        : str.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), captionField),
                    dropdownTemplate: editor.dropdownTemplate
                        ? editor.dropdownTemplate
                        : str.template(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", ""], ["", ""])), captionField),
                    emptyRecord: emptyRecord,
                    filterFields: filterFields,
                    records: records,
                    valueField: valueField,
                    valueType: editor.valueType,
                },
                editor: editor,
                grid: grid,
                row: row,
            };
            setLookupInputValue(editor.valueType, input, value, captionValue, inputValue);
            this._onInputValue(input, activeData);
            this._bindLookupProps(grid, lookup, input, editor);
            this._activeData = activeData;
            this._beforePropEditor = editor;
            var focus = function () {
                input.focus();
                var end = input.value.length;
                try {
                    if (typeof input.selectionStart !== 'undefined') {
                        input.selectionStart = end;
                        input.selectionEnd = end;
                        return;
                    }
                }
                catch (e) {
                    // ignore
                }
                if (document.selection) {
                    var range = input.createTextRange();
                    range.collapse();
                    range.moveEnd('character', end);
                    range.moveStart('character', end);
                    range.select();
                }
            };
            var safeInputFocus = function () {
                handler.tryWithOffEvents(input, 'blur', function () {
                    focus();
                });
                var state = getInlineEditingState(grid);
                state.cellRange = grid.getCellRange(col, row);
                grid.invalidateCellRange(state.cellRange);
            };
            this._attaching = true;
            setTimeout(function () {
                safeInputFocus();
                _this._attaching = false;
            });
        };
        InlineLookupElement.prototype.detach = function (gridFocus) {
            var _this = this;
            if (this._isActive()) {
                var lookup_1 = this._lookup;
                var input_1 = this._input;
                this._handler.tryWithOffEvents(input_1, 'blur', function () {
                    if (lookup_1.parentElement) {
                        _this._onInputValue(input_1);
                        lookup_1.parentElement.removeChild(lookup_1);
                    }
                });
                var _a = this._activeData, grid = _a.grid, col = _a.col, row = _a.row;
                var state = getInlineEditingState(grid);
                delete state.cellRange;
                var range = grid.getCellRange(col, row);
                grid.invalidateCellRange(range);
                if (gridFocus) {
                    grid.focus();
                }
            }
            delete this._beforeValue;
            delete this._activeData;
        };
        InlineLookupElement.prototype.doChangeValue = function (changeOnlyWhenAllowOtherInput) {
            if (!this._isActive()) {
                return;
            }
            if (changeOnlyWhenAllowOtherInput &&
                this._activeData &&
                !this._activeData.dropdownInfo.allowOtherInput) {
                return;
            }
            if (isLookupInputValueChanged(this._input)) {
                var value_1 = getLookupInputValue(this._input);
                var _a = this._activeData, grid = _a.grid, col = _a.col, row = _a.row;
                grid.doChangeValue(col, row, function () { return value_1; });
            }
        };
        InlineLookupElement.prototype._isActive = function () {
            var lookup = this._lookup;
            if (!lookup || !lookup.parentElement) {
                return false;
            }
            if (!this._activeData) {
                return false;
            }
            return true;
        };
        InlineLookupElement.prototype._bindInputEvents = function () {
            var _this = this;
            var handler = this._handler;
            var dropdown = this._dropdown;
            var input = this._input;
            var stopPropagationOnly = function (e) { return e.stopPropagation(); }; // 终止事件传播
            handler.on(input, 'click', stopPropagationOnly);
            handler.on(input, 'mousedown', stopPropagationOnly);
            handler.on(input, 'touchstart', stopPropagationOnly);
            handler.on(input, 'dblclick', stopPropagationOnly);
            handler.on(dropdown, 'mousedown', stopPropagationOnly);
            handler.on(dropdown, 'touchstart', stopPropagationOnly);
            handler.on(dropdown, 'dblclick', stopPropagationOnly);
            handler.on(dropdown, 'click', function (e) {
                e.stopPropagation();
                var item = findDropdownItemParents(e.target);
                if (item) {
                    _this._selectNode(item);
                    _this.doChangeValue();
                    _this.detach(true);
                }
                else {
                    _this._input.focus();
                }
            });
            handler.on(input, 'compositionstart', function (e) {
                input.classList.add('composition');
            });
            handler.on(input, 'compositionend', function (e) {
                input.classList.remove('composition');
                _this._onInputValue(input);
            });
            var onKeyupAndPress = function (e) {
                if (input.classList.contains('composition')) {
                    return;
                }
                _this._onInputValue(input);
            };
            handler.on(input, 'keyup', onKeyupAndPress);
            handler.on(input, 'keypress', onKeyupAndPress);
            handler.on(input, 'keydown', function (e) {
                if (input.classList.contains('composition')) {
                    return;
                }
                var keyCode = event.getKeyCode(e);
                if (keyCode === KEY_ESC) {
                    _this.detach(true);
                    event.cancel(e);
                }
                else if (keyCode === KEY_ENTER) {
                    _this._onKeydownEnter(e);
                }
                else if (keyCode === KEY_TAB) {
                    _this._onKeydownTab(e);
                }
                else if (keyCode === KEY_UP) {
                    var n = _this._dropdown.querySelector('[data-select=true]');
                    if (n) {
                        _this._selectNode(n, false);
                        var next = findPrevSiblingFocusable(n);
                        if (!next) {
                            var items = _this._dropdown.querySelectorAll("." + DROPDOWN_ITEM_CLASSNAME_ILE);
                            next = items[items.length - 1];
                            if (!isFocusable(next)) {
                                next = findPrevSiblingFocusable(next);
                            }
                        }
                        if (next) {
                            _this._selectNode(next);
                            event.cancel(e);
                        }
                    }
                }
                else if (keyCode === KEY_DOWN) {
                    var n = _this._dropdown.querySelector('[data-select=true]');
                    if (n) {
                        _this._selectNode(n, false);
                        var next = findNextSiblingFocusable(n);
                        if (!next) {
                            next = _this._dropdown.querySelector("." + DROPDOWN_ITEM_CLASSNAME_ILE);
                            if (!isFocusable(next)) {
                                next = findNextSiblingFocusable(next);
                            }
                        }
                        if (next) {
                            _this._selectNode(next);
                            event.cancel(e);
                        }
                    }
                }
                else {
                    _this._onInputValue(input);
                }
            });
            handler.on(input, 'blur', function () { return setTimeout(function () { return _this.detach(); }, 300); });
        };
        InlineLookupElement.prototype._onKeydownEnter = function (e) {
            var _a;
            if (!this._isActive() || this._attaching) {
                return;
            }
            var grid = this._activeData.grid;
            this.doChangeValue();
            this.detach(true);
            if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) {
                grid.onKeyDownMove(e);
            }
            else {
                event.cancel(e);
            }
        };
        InlineLookupElement.prototype._onKeydownTab = function (e) {
            var _a;
            if (!this._isActive() || this._attaching) {
                return;
            }
            var grid = this._activeData.grid;
            if (!((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab)) {
                return;
            }
            this.doChangeValue();
            this.detach(true);
            grid.onKeyDownMove(e);
        };
        InlineLookupElement.prototype._onInputValue = function (input, activeData) {
            var before = this._beforeValue;
            var value = input.value;
            if (before !== value) {
                this._onInputValueChange(value, before, activeData);
            }
            this._beforeValue = value;
        };
        InlineLookupElement.prototype._onInputValueChange = function (after, before, activeData) {
            activeData = activeData || this._activeData;
            var grid = activeData.grid;
            var dropdownInfo = activeData.dropdownInfo;
            var isFirstChange = !isDef(before);
            // 过滤下拉数据
            var filterInfo = this._filterRecords(dropdownInfo.records, dropdownInfo.filterFields, after, dropdownInfo.valueField, dropdownInfo.disableFilterRecords, dropdownInfo.disableFilterSort, dropdownInfo.emptyRecord, isFirstChange ? dropdownInfo.beforeRecord : undefined);
            var isAll = filterInfo.isAll;
            var filterRecords = filterInfo.filterRecords;
            var itemNodes = [];
            var beforeNode;
            var firstMatchedNode;
            // 只在有输入内容时显示输入内容选项
            var isEmptyValue = false;
            if (dropdownInfo.allowOtherInput) {
                var saveValue = after;
                var displayValue = str.escape(after);
                if (dropdownInfo.valueType === 'number') {
                    if (saveValue.trim()) {
                        saveValue = Number(after);
                        if (isNaN(saveValue)) {
                            saveValue = null;
                        }
                    }
                    else {
                        saveValue = null;
                    }
                    if (saveValue === null) {
                        displayValue = str.escape('<null>');
                        isEmptyValue = true;
                    }
                }
                else {
                    if (!saveValue) {
                        displayValue = str.escape('<Empty>');
                        isEmptyValue = true;
                    }
                }
                if ((dropdownInfo.valueType === 'number' &&
                    (saveValue !== null ||
                        (isAll && isEmptyValue && !dropdownInfo.emptyRecord))) ||
                    (dropdownInfo.valueType !== 'number' &&
                        (saveValue || (isEmptyValue && !dropdownInfo.emptyRecord)))) {
                    var otherLi = createElement('li', {
                        classList: [
                            DROPDOWN_ITEM_CLASSNAME_ILE,
                            isEmptyValue
                                ? DROPDOWN_ITEM_EMPTY_CLASSNAME_ILE
                                : DROPDOWN_ITEM_OTHER_CLASSNAME_ILE,
                        ],
                    });
                    otherLi.tabIndex = 0;
                    otherLi.dataset.value = JSON.stringify(saveValue);
                    appendHtml(otherLi, displayValue);
                    itemNodes.push(otherLi);
                }
            }
            if (itemNodes.length === 0 || isEmptyValue || !isAll) {
                // 当 allowOtherInput === true 并"有非空输入内容"且"无匹配"时，不显示参照列表、只显示其他值
                // 显示过滤后的选项
                filterRecords.forEach(function (record) {
                    var classList = [DROPDOWN_ITEM_CLASSNAME_ILE];
                    var html;
                    if (record.__isEmpty) {
                        classList.push(DROPDOWN_ITEM_EMPTY_CLASSNAME_ILE);
                        html = dropdownInfo.dropdownEmptyTemplate(record);
                    }
                    else {
                        html = dropdownInfo.dropdownTemplate(record);
                    }
                    var li = createElement('li', {
                        classList: classList,
                    });
                    if (record.__isBefore) {
                        beforeNode = li;
                    }
                    if (!isDef(firstMatchedNode) && record.__isMatched) {
                        firstMatchedNode = li;
                    }
                    li.tabIndex = 0;
                    li.dataset.value = JSON.stringify(record.__value);
                    appendHtml(li, html);
                    itemNodes.push(li);
                });
            }
            empty(this._dropdown);
            var offset = this._dropdown.scrollHeight + 2;
            if (itemNodes.length > 0) {
                itemNodes[0].classList.add(DROPDOWN_ITEM_FIRST_CLASSNAME_ILE);
                var selectedNode = void 0;
                if (isFirstChange && dropdownInfo.beforeRecord && beforeNode) {
                    selectedNode = beforeNode;
                }
                else if (firstMatchedNode) {
                    selectedNode = firstMatchedNode;
                }
                else {
                    selectedNode = itemNodes[0];
                }
                this._selectNode(selectedNode);
                this._dropdown.style.maxHeight = '';
                appendHtml(this._dropdown, itemNodes);
                // 确定下拉框显示位置
                if (this._lookup.offsetTop +
                    this._lookup.offsetHeight +
                    this._dropdown.offsetHeight >
                    grid.getElement().clientHeight &&
                    this._lookup.offsetTop >
                        grid.getElement().clientHeight -
                            this._lookup.offsetTop -
                            this._lookup.offsetHeight) {
                    // 上方显示
                    this._dropdown.classList.add(DROPDOWN_BOTTOM_CLASSNAME_ILE);
                    this._dropdown.style.maxHeight = this._lookup.offsetTop - offset + 'px';
                }
                else {
                    // 下方显示
                    this._dropdown.style.maxHeight =
                        grid.getElement().clientHeight -
                            this._lookup.offsetTop -
                            this._lookup.offsetHeight -
                            offset +
                            'px';
                    this._dropdown.classList.remove(DROPDOWN_BOTTOM_CLASSNAME_ILE);
                }
                if (this._lookup.offsetLeft +
                    this._lookup.offsetWidth +
                    this._dropdown.offsetWidth >
                    grid.getElement().clientWidth &&
                    this._lookup.offsetLeft >
                        grid.getElement().clientWidth -
                            this._lookup.offsetLeft -
                            this._lookup.offsetWidth) {
                    this._dropdown.classList.add(DROPDOWN_RIGHT_CLASSNAME_ILE);
                }
                else {
                    this._dropdown.classList.remove(DROPDOWN_RIGHT_CLASSNAME_ILE);
                }
                this._dropdown.classList.remove(DROPDOWN_HIDDEN_CLASSNAME_ILE);
                this._dropdown.classList.add(DROPDOWN_SHOWN_CLASSNAME_ILE);
            }
            else {
                this._selectNode();
                this._dropdown.classList.remove(DROPDOWN_SHOWN_CLASSNAME_ILE);
                this._dropdown.classList.add(DROPDOWN_HIDDEN_CLASSNAME_ILE);
            }
        };
        InlineLookupElement.prototype._selectNode = function (node, isSelected) {
            if (node) {
                if (isSelected !== false) {
                    node.dataset.select = 'true';
                    this._input.dataset[LOOKUP_SELECT_VALUE] = node.dataset.value;
                    // 滚动到可视位置
                    if (node.parentElement) {
                        if (node.offsetTop < node.parentElement.scrollTop) {
                            node.parentElement.scrollTop = node.offsetTop;
                        }
                        else if (node.offsetTop + node.offsetHeight >
                            node.parentElement.scrollTop + node.parentElement.clientHeight) {
                            node.parentElement.scrollTop =
                                node.offsetTop +
                                    node.offsetHeight -
                                    node.parentElement.clientHeight;
                        }
                    }
                }
                else {
                    delete node.dataset.select;
                    this._input.dataset[LOOKUP_SELECT_VALUE] = this._input.dataset[LOOKUP_BEFORE_VALUE];
                }
            }
            else {
                this._input.dataset[LOOKUP_SELECT_VALUE] = this._input.dataset[LOOKUP_BEFORE_VALUE];
            }
        };
        InlineLookupElement.prototype._filterRecords = function (records, filterFields, inputValue, valueField, disableFilterRecords, disableFilterSort, emptyRecord, beforeRecord) {
            var filterRecords = [];
            var allRecords = [];
            var otherRecords = [];
            records.forEach(function (record) {
                var filterRecord = {};
                var matched = false;
                for (var key in record) {
                    var value = isDef(record[key]) ? record[key] + '' : '';
                    if (filterFields.indexOf(key) >= 0) {
                        var matchValue = highlight(value, inputValue);
                        filterRecord[key] = matchValue;
                        matched = matched || matchValue !== value || !inputValue;
                    }
                    else {
                        filterRecord[key] = value;
                    }
                }
                filterRecord.__isMatched = matched;
                filterRecord.__value = record[valueField];
                filterRecord.__isBefore = beforeRecord === record;
                filterRecord.__isEmpty = emptyRecord === record;
                if (matched || filterRecord.__isBefore || disableFilterSort) {
                    filterRecords.push(filterRecord);
                }
                else if (disableFilterRecords) {
                    otherRecords.push(filterRecord);
                }
                allRecords.push(filterRecord);
            });
            var isAll = filterFields.length === 0 ||
                (!inputValue && !beforeRecord) ||
                filterRecords.length === 0;
            if (!isAll && disableFilterRecords) {
                for (var _i = 0, otherRecords_1 = otherRecords; _i < otherRecords_1.length; _i++) {
                    var record = otherRecords_1[_i];
                    filterRecords.push(record);
                }
            }
            return {
                filterRecords: isAll ? allRecords : filterRecords,
                isAll: isAll,
            };
        };
        InlineLookupElement.prototype._bindLookupProps = function (grid, lookup, input, editor) {
            var _a;
            var classList = editor.classList;
            if (classList) {
                (_a = lookup.classList).add.apply(_a, classList);
            }
            InlineLookupElement.setInputAttrs(editor, grid, input);
        };
        InlineLookupElement.prototype._unbindLookupProps = function (_grid, lookup, _input, editor) {
            var _a;
            var classList = editor.classList;
            if (classList) {
                (_a = lookup.classList).remove.apply(_a, classList);
            }
        };
        return InlineLookupElement;
    }());
    var templateObject_1, templateObject_2;

    var INLINE_LOOKUP_EDITOR_STATE_ID = getInlineLookupEditorStateId();
    var globalInlineLookupElement = null;
    var globalInlineLookupBindGridCount = 0;
    function attachLookupInput(grid, cell, editor, value, inputValue) {
        if (!globalInlineLookupElement) {
            globalInlineLookupElement = new InlineLookupElement();
        }
        var state = editor.getState(grid);
        if (!state.element) {
            state.element = globalInlineLookupElement;
            globalInlineLookupBindGridCount++;
            grid.addDisposable({
                dispose: function () {
                    globalInlineLookupBindGridCount--;
                    if (!globalInlineLookupBindGridCount && globalInlineLookupElement) {
                        globalInlineLookupElement.dispose();
                        globalInlineLookupElement = null;
                    }
                },
            });
        }
        var records = getOrApply(editor.records || [], grid.getRowRecord(cell.row));
        if (isPromise(records)) {
            records.then(function (rs) {
                if (globalInlineLookupElement) {
                    globalInlineLookupElement.attach(grid, editor, cell.col, cell.row, value, rs, inputValue);
                }
            });
        }
        else {
            globalInlineLookupElement.attach(grid, editor, cell.col, cell.row, value, records, inputValue);
        }
    }
    function detachLookupInput(gridFocus) {
        if (globalInlineLookupElement) {
            globalInlineLookupElement.detach(gridFocus);
        }
    }
    function doChangeLookupValue() {
        if (globalInlineLookupElement) {
            globalInlineLookupElement.doChangeValue(true);
        }
    }
    var InlineLookupEditor = /** @class */ (function (_super) {
        __extends(InlineLookupEditor, _super);
        function InlineLookupEditor(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this.action =
                _this.action ||
                    (function (me) { return function (_record, data) {
                        if (isReadOnlyRecord(me.readOnly, data.grid, data.cell.row) ||
                            isDisabledRecord(me.disabled, data.grid, data.cell.row)) {
                            return;
                        }
                        me.onOpenCellInternal(data.grid, data.cell);
                    }; })(_this);
            _this._classList = options.classList;
            _this._records = options.records || [];
            _this._valueField = options.valueField || '';
            _this._valueType = options.valueType || 'string';
            _this._captionField = options.captionField || '';
            _this._filterFields = options.filterFields || '';
            _this._allowOtherInput = options.allowOtherInput || false;
            _this._disableFilterRecords = !!options.disableFilterRecords;
            _this._disableFilterSort = !!options.disableFilterSort;
            if (isDef(options.disableDropdown)) {
                _this.disableDropdown = !!options.disableDropdown;
            }
            _this._filter = options.filter;
            _this._dropdownTemplate = options.dropdownTemplate;
            _this._dropdownEmptyTemplate = options.dropdownEmptyTemplate;
            return _this;
        }
        Object.defineProperty(InlineLookupEditor.prototype, "classList", {
            get: function () {
                if (!this._classList) {
                    return undefined;
                }
                return Array.isArray(this._classList) ? this._classList : [this._classList];
            },
            set: function (classList) {
                this._classList = classList;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "records", {
            get: function () {
                return this._records;
            },
            set: function (records) {
                this._records = records;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "valueField", {
            get: function () {
                return this._valueField;
            },
            set: function (valueField) {
                this._valueField = valueField;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "valueType", {
            get: function () {
                return this._valueType;
            },
            set: function (valueType) {
                this._valueType = valueType;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "captionField", {
            get: function () {
                return this._captionField;
            },
            set: function (captionField) {
                this._captionField = captionField;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "filterFields", {
            get: function () {
                return this._filterFields;
            },
            set: function (filterFields) {
                this._filterFields = filterFields;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "allowOtherInput", {
            get: function () {
                return this._allowOtherInput;
            },
            set: function (allowOtherInput) {
                this._allowOtherInput = allowOtherInput || false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "disableFilterRecords", {
            get: function () {
                return this._disableFilterRecords;
            },
            set: function (disableFilterRecords) {
                this._disableFilterRecords = !!disableFilterRecords;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "disableFilterSort", {
            get: function () {
                return this._disableFilterSort;
            },
            set: function (disableFilterSort) {
                this._disableFilterSort = !!disableFilterSort;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "disableDropdown", {
            get: function () {
                window.console.warn("'disableDropdown' is deprecated, please use 'disableInput' instead");
                return !!this.disableInput;
            },
            set: function (disableDropdown) {
                window.console.warn("'disableDropdown' is deprecated, please use 'disableInput' instead");
                this.disableInput = !!disableDropdown;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "filter", {
            get: function () {
                return this._filter;
            },
            set: function (filter) {
                this._filter = filter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "dropdownTemplate", {
            get: function () {
                return this._dropdownTemplate;
            },
            set: function (dropdownTemplate) {
                this._dropdownTemplate = dropdownTemplate;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineLookupEditor.prototype, "dropdownEmptyTemplate", {
            get: function () {
                return this._dropdownEmptyTemplate;
            },
            set: function (dropdownEmptyTemplate) {
                this._dropdownEmptyTemplate = dropdownEmptyTemplate;
            },
            enumerable: false,
            configurable: true
        });
        InlineLookupEditor.prototype.clone = function () {
            return new InlineLookupEditor(this);
        };
        InlineLookupEditor.prototype.onActionInputCellInternal = function (grid, cell, inputValue) {
            var _this = this;
            grid.doGetCellValue(cell.col, cell.row, function (value) {
                attachLookupInput(grid, cell, _this, value, inputValue);
            });
        };
        InlineLookupEditor.prototype.onActionOpenCellInternal = function (grid, cell) {
            var _this = this;
            grid.doGetCellValue(cell.col, cell.row, function (value) {
                attachLookupInput(grid, cell, _this, value);
            });
        };
        InlineLookupEditor.prototype.onChangeSelectCellInternal = function (_grid, _cell, _selected) {
            // cancel input
            doChangeLookupValue();
            detachLookupInput();
        };
        InlineLookupEditor.prototype.onGridScrollInternal = function (grid) {
            // cancel input
            doChangeLookupValue();
            detachLookupInput(true);
        };
        InlineLookupEditor.prototype.onChangeDisabledInternal = function () {
            // cancel input
            detachLookupInput(true);
        };
        InlineLookupEditor.prototype.onChangeReadOnlyInternal = function () {
            // cancel input
            detachLookupInput(true);
        };
        InlineLookupEditor.prototype.onSetInputAttrsInternal = function (grid, _cell, input) {
            InlineLookupElement.setInputAttrs(this, grid, input);
        };
        InlineLookupEditor.prototype.bindGridEvent = function (grid, cellId) {
            var ids = _super.prototype.bindGridEvent.call(this, grid, cellId);
            var detach = function () {
                doChangeLookupValue();
                detachLookupInput(true);
            };
            ids.push(grid.listen(DG_EVENT_TYPE.CLICK_UNDERLAY, detach));
            ids.push(grid.listen(DG_EVENT_TYPE.DBLCLICK_UNDERLAY, detach));
            ids.push(grid.listen(DG_EVENT_TYPE.DBLTAP_UNDERLAY, detach));
            return ids;
        };
        InlineLookupEditor.prototype.getState = function (grid) {
            if (!grid[INLINE_LOOKUP_EDITOR_STATE_ID]) {
                obj.setReadonly(grid, INLINE_LOOKUP_EDITOR_STATE_ID, {});
            }
            return grid[INLINE_LOOKUP_EDITOR_STATE_ID];
        };
        return InlineLookupEditor;
    }(BaseActionInput));

    function extend$1(a, b) {
        var o = {};
        for (var k in a) {
            o[k] = a[k];
        }
        for (var k in b) {
            o[k] = b[k];
        }
        return o;
    }
    /**
     * Normalize the given menu options.
     * @param options - menu options to given
     * @returns Normalized options
     */
    function normalize(options) {
        if (!options) {
            return [];
        }
        if (Array.isArray(options)) {
            return options.map(function (e) {
                return extend$1(e, { label: e.caption || e.label });
            });
        }
        if (typeof options === 'string') {
            return normalize(JSON.parse(options));
        }
        var result = [];
        for (var k in options) {
            if (options.hasOwnProperty(k)) {
                result.push({
                    label: options[k],
                    value: k,
                });
            }
        }
        return result;
    }
    /**
     * Normalize the given menu options.
     * @param options - menu options to given
     * @returns Normalized options
     */
    function normalizeToFn(options) {
        if (typeof options === 'function') {
            return function (record) {
                return normalize(options(record));
            };
        }
        return function () { return normalize(options); };
    }
    var menuItems = {
        normalize: normalize,
        normalizeToFn: normalizeToFn,
    };

    var inlineMenuElementCss = ".kaka-grid__inline-menu {\n  position: absolute;\n  color: rgba(0, 0, 0, 0.87);\n  box-sizing: content-box;\n  margin: -1px auto auto -1px;\n  padding: 8px 0;\n  background-color: #fafafa;\n  list-style-type: none;\n  border-radius: 2px;\n  max-height: calc(100vh - 40px);\n  overflow-y: auto;\n  white-space: nowrap;\n}\n\n.kaka-grid__inline-menu--hidden {\n  transform: scale(0.9);\n  box-shadow: none;\n  opacity: 0;\n  pointer-events: none;\n  transition: all 50ms ease-out;\n}\n\n.kaka-grid__inline-menu--hidden * {\n  pointer-events: none;\n}\n\n.kaka-grid__inline-menu--shown {\n  transform: translateY(-7px);\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12);\n  opacity: 1;\n  transition: all 150ms ease-out;\n}\n\n.kaka-grid__inline-menu__menu-item {\n  height: 100%;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  outline: none;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  padding: 0 16px;\n}\n\n.kaka-grid__inline-menu__menu-item--empty {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.kaka-grid__inline-menu__menu-item::before {\n  content: '';\n  position: absolute;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background-color: #000;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 15ms linear;\n}\n\n.kaka-grid__inline-menu__menu-item:hover::before {\n  opacity: 0.04;\n}\n\n.kaka-grid__inline-menu__menu-item[data-select]::before {\n  opacity: 0.04;\n}\n\n.kaka-grid__inline-menu__menu-item:focus::before {\n  opacity: 0.12;\n}\n";

    var CLASSNAME_IME = 'kaka-grid__inline-menu';
    var ITEM_CLASSNAME_IME = CLASSNAME_IME + "__menu-item";
    var HIDDEN_CLASSNAME_IME = CLASSNAME_IME + "--hidden";
    var SHOWN_CLASSNAME_IME = CLASSNAME_IME + "--shown";
    var EMPTY_ITEM_CLASSNAME_IME = ITEM_CLASSNAME_IME + "--empty";
    function findItemParents(target) {
        var el = target;
        while (!el.classList.contains(ITEM_CLASSNAME_IME)) {
            el = el.parentElement;
            if (!el || el.classList.contains(CLASSNAME_IME)) {
                return undefined;
            }
        }
        return el;
    }
    function createMenuElement() {
        style$1.inject('inlineMenuElement', inlineMenuElementCss);
        return createElement('ul', { classList: CLASSNAME_IME });
    }
    function attachElement(element, rect, menu, autoWidth) {
        menu.style.top = rect.top.toFixed() + "px";
        menu.style.left = rect.left.toFixed() + "px";
        menu.style.width = autoWidth ? '' : rect.width.toFixed() + "px";
        menu.style.lineHeight = rect.height.toFixed() + "px";
        element.appendChild(menu);
    }
    function optionToLi(_a, index) {
        var _b;
        var classList = _a.classList, label = _a.label, value = _a.value, html = _a.html;
        var item = createElement('li', { classList: ITEM_CLASSNAME_IME });
        item.tabIndex = 0;
        item.setAttribute('data-value-index', index + '');
        if (classList) {
            (_b = item.classList).add.apply(_b, (Array.isArray(classList) ? classList : [classList]));
        }
        if (label) {
            var span = createElement('span', { text: label });
            item.appendChild(span);
        }
        else if (html) {
            appendHtml(item, html);
        }
        if (value === '' || !isDef(value)) {
            item.classList.add(EMPTY_ITEM_CLASSNAME_IME);
        }
        return item;
    }
    function openMenu(grid, editor, col, row, value, options, menu) {
        var _a;
        var classList = editor.classList;
        menu.classList.remove(SHOWN_CLASSNAME_IME);
        menu.classList.add(HIDDEN_CLASSNAME_IME);
        empty(menu);
        menu.style.font = grid.font || '16px sans-serif';
        var emptyItemEl = null;
        var valueItemEl = null;
        options.forEach(function (option, i) {
            var item = optionToLi(option, i);
            menu.appendChild(item);
            if (option.value === value) {
                valueItemEl = item;
                item.dataset.select = 'select';
            }
            if (item.classList.contains(EMPTY_ITEM_CLASSNAME_IME)) {
                emptyItemEl = item;
            }
        });
        var focusEl = valueItemEl ||
            emptyItemEl ||
            (menu.children || menu.childNodes)[0];
        if (classList) {
            (_a = menu.classList).add.apply(_a, classList);
        }
        var children = Array.prototype.slice.call(menu.children || menu.childNodes, 0);
        var focusIndex = children.indexOf(focusEl);
        var _b = grid.getAttachCellsArea(grid.getCellRange(col, row)), element = _b.element, rect = _b.rect;
        // Cover the right line
        rect.width++;
        // append for calculation
        attachElement(element, rect, menu, editor.autoWidth);
        // Make the selection item at the middle
        var offset = 0;
        var allHeight = 0;
        for (var i = 0; i < children.length; i++) {
            var offsetHeight = children[i].offsetHeight;
            if (i < focusIndex) {
                offset += offsetHeight;
            }
            allHeight += offsetHeight;
        }
        rect.offsetTop(-offset);
        menu.style.transformOrigin = "center " + (offset + Math.ceil(children[focusIndex].offsetHeight / 2)) + "px 0px";
        attachElement(element, rect, menu, editor.autoWidth);
        // Control not to overflow the screen range
        var menuClientRect = menu.getBoundingClientRect();
        var scaleDiff = (allHeight - menuClientRect.height) / 2;
        var orgMenuTop = menuClientRect.top - scaleDiff;
        var menuTop = orgMenuTop;
        var menuBottom = menuTop + allHeight;
        var winBottom = window.innerHeight;
        var winMargin = 20;
        if (menuBottom > winBottom - winMargin) {
            var diff = menuBottom - winBottom + winMargin;
            menuTop -= diff;
        }
        if (menuTop < 0 /*winTop*/ + winMargin) {
            menuTop = winMargin;
        }
        if (menuTop !== orgMenuTop) {
            rect.offsetTop(-(orgMenuTop - menuTop));
            // re update
            attachElement(element, rect, menu, editor.autoWidth);
        }
        if (focusEl) {
            focusEl.focus();
        }
        menu.classList.remove(HIDDEN_CLASSNAME_IME);
        menu.classList.add(SHOWN_CLASSNAME_IME);
    }
    function closeMenu(_grid, _col, _row, menu) {
        menu.classList.remove(SHOWN_CLASSNAME_IME);
        menu.classList.add(HIDDEN_CLASSNAME_IME);
        disableFocus(menu);
    }
    var InlineMenuElement = /** @class */ (function () {
        function InlineMenuElement() {
            this._handler = new EventHandler();
            this._menu = createMenuElement();
            this._bindMenuEvents();
        }
        InlineMenuElement.prototype.dispose = function () {
            var _a;
            var menu = this._menu;
            this.detach();
            this._handler.dispose();
            this._beforePropEditor = null;
            (_a = menu.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(menu);
        };
        InlineMenuElement.prototype.attach = function (grid, editor, col, row, value, record) {
            var _a;
            var _this = this;
            var menu = this._menu;
            if (this._beforePropEditor) {
                var classList = this._beforePropEditor.classList;
                if (classList) {
                    (_a = menu.classList).remove.apply(_a, classList);
                }
            }
            var options = editor.options(record);
            openMenu(grid, editor, col, row, value, options, menu);
            // 当焦点离开菜单时，关闭菜单
            var owner = menu;
            for (var i = 0; i < menu.childNodes.length; i++) {
                var el = menu.childNodes[i];
                this._handler.on(el, 'focus', function () {
                    owner._focus = true;
                });
                this._handler.on(el, 'blur', function () {
                    owner._focus = false;
                    setTimeout(function () {
                        if (!owner._focus) {
                            _this.detach();
                        }
                    }, 0);
                });
            }
            this._activeData = { grid: grid, col: col, row: row, editor: editor, options: options };
            this._beforePropEditor = editor;
        };
        InlineMenuElement.prototype.detach = function (gridFocus) {
            if (this._isActive()) {
                var _a = this._activeData, grid = _a.grid, col = _a.col, row = _a.row;
                var menu = this._menu;
                closeMenu(grid, col, row, menu);
                var range = grid.getCellRange(col, row);
                grid.invalidateCellRange(range);
                if (gridFocus) {
                    grid.focus();
                }
            }
            this._activeData = null;
        };
        InlineMenuElement.prototype._doChangeValue = function (valueIndex) {
            if (this._isActive() && valueIndex) {
                var _a = this._activeData, grid = _a.grid, col = _a.col, row = _a.row, options = _a.options;
                var option = options[parseInt(valueIndex, 10)];
                if (option) {
                    var value_1 = option.value;
                    grid.doChangeValue(col, row, function () { return value_1; });
                }
            }
        };
        InlineMenuElement.prototype._isActive = function () {
            var menu = this._menu;
            if (!menu || !menu.parentElement) {
                return false;
            }
            if (!this._activeData) {
                return false;
            }
            return true;
        };
        InlineMenuElement.prototype._bindMenuEvents = function () {
            var _this = this;
            var handler = this._handler;
            var menu = this._menu;
            var stopPropagationOnly = function (e) { return e.stopPropagation(); }; // 为了不在grid中传播
            handler.on(menu, 'mousedown', stopPropagationOnly);
            handler.on(menu, 'touchstart', stopPropagationOnly);
            handler.on(menu, 'dblclick', stopPropagationOnly);
            handler.on(menu, 'click', function (e) {
                e.stopPropagation();
                var item = findItemParents(e.target);
                if (!item) {
                    return;
                }
                var valueIndex = item.getAttribute('data-value-index');
                _this._doChangeValue(valueIndex);
                _this.detach(true);
            });
            handler.on(menu, 'keydown', function (e) {
                var item = findItemParents(e.target);
                if (!item || !_this._isActive()) {
                    return;
                }
                var keyCode = event.getKeyCode(e);
                if (keyCode === KEY_ENTER) {
                    _this._onKeydownEnter(menu, item, e);
                }
                else if (keyCode === KEY_ESC) {
                    _this.detach(true);
                    event.cancel(e);
                }
                else if (keyCode === KEY_UP) {
                    var n = findPrevSiblingFocusable(item);
                    if (n) {
                        n.focus();
                        event.cancel(e);
                    }
                }
                else if (keyCode === KEY_DOWN) {
                    var n = findNextSiblingFocusable(item);
                    if (n) {
                        n.focus();
                        event.cancel(e);
                    }
                }
                else if (keyCode === KEY_TAB) {
                    _this._onKeydownTab(menu, item, e);
                }
            });
        };
        InlineMenuElement.prototype._onKeydownEnter = function (_menu, item, e) {
            var _a;
            var grid = this._isActive() ? this._activeData.grid : null;
            var valueIndex = item.getAttribute('data-value-index');
            this._doChangeValue(valueIndex);
            this.detach(true);
            event.cancel(e);
            if (grid) {
                if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) {
                    grid.onKeyDownMove(e);
                }
            }
        };
        InlineMenuElement.prototype._onKeydownTab = function (menu, item, e) {
            var _a;
            if (this._isActive()) {
                var grid = this._activeData.grid;
                if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab) {
                    var valueIndex = item.getAttribute('data-value-index');
                    this._doChangeValue(valueIndex || '');
                    this.detach(true);
                    grid.onKeyDownMove(e);
                    return;
                }
            }
            if (!e.shiftKey) {
                if (!findNextSiblingFocusable(item)) {
                    var n = menu.querySelector("." + ITEM_CLASSNAME_IME);
                    if (!isFocusable(n)) {
                        n = findNextSiblingFocusable(n);
                    }
                    if (n) {
                        n.focus();
                        event.cancel(e);
                    }
                }
            }
            else {
                if (!findPrevSiblingFocusable(item)) {
                    var items = menu.querySelectorAll("." + ITEM_CLASSNAME_IME);
                    var n = items[items.length - 1];
                    if (!isFocusable(n)) {
                        n = findPrevSiblingFocusable(n);
                    }
                    if (n) {
                        n.focus();
                        event.cancel(e);
                    }
                }
            }
        };
        return InlineMenuElement;
    }());

    var ICON_PROP_KEYS = [
        'content',
        'font',
        'color',
        'className',
        'tagName',
        'isLiga',
        'width',
        'src',
        'svg',
        'name',
        'path',
    ];
    function quote(name) {
        var quoted = [];
        var split = name.split(/,\s*/);
        for (var i = 0; i < split.length; i++) {
            var part = split[i].replace(/['"]/g, '');
            if (part.indexOf(' ') === -1 && !/^\d/.test(part)) {
                quoted.push(part);
            }
            else {
                quoted.push("'" + part + "'");
            }
        }
        return quoted.join(',');
    }
    var doms = {};
    var props = {};
    function getIconProps(tagName, className) {
        var tagProps = props[tagName] || (props[tagName] = {});
        if (tagProps[className]) {
            return tagProps[className];
        }
        var dom = doms[tagName] || (doms[tagName] = document.createElement(tagName));
        dom.className = className;
        document.body.appendChild(dom);
        try {
            var beforeStyle = (document.defaultView || window).getComputedStyle(dom, '::before');
            var content = beforeStyle.getPropertyValue('content');
            if (content === 'none') {
                content = ''; // 解决部分IE11浏览器显示"none"的问题，并不是所有的IE11都有此问题，原因未知、暂无法解决
            }
            if (content.length >= 3 && (content[0] === '"' || content[0] === "'")) {
                if (content[0] === content[content.length - 1]) {
                    content = content.substr(1, content.length - 2);
                }
            }
            var font = beforeStyle.getPropertyValue('font');
            if (!font) {
                font = beforeStyle.getPropertyValue('font-style') + " " + beforeStyle.getPropertyValue('font-variant') + " " + beforeStyle.getPropertyValue('font-weight') + " " + beforeStyle.getPropertyValue('font-size') + "/" + beforeStyle.getPropertyValue('line-height') + " " + quote(beforeStyle.getPropertyValue('font-family'));
            }
            var color = beforeStyle.getPropertyValue('color');
            var width = dom.clientWidth;
            var isLiga = (beforeStyle.getPropertyValue('font-feature-settings') || '').indexOf('liga') > -1;
            return (tagProps[className] = {
                color: color,
                content: content,
                font: font,
                isLiga: isLiga,
                width: width,
            });
        }
        finally {
            document.body.removeChild(dom);
        }
    }
    function toPropArray(prop, count) {
        var result = [];
        if (Array.isArray(prop)) {
            result.push.apply(result, prop);
            for (var i = prop.length; i < count; i++) {
                result.push(null);
            }
        }
        else {
            for (var i = 0; i < count; i++) {
                result.push(prop);
            }
        }
        return result;
    }
    function toSimpleArray(iconProps) {
        if (!iconProps) {
            return iconProps;
        }
        else if (Array.isArray(iconProps)) {
            return iconProps;
        }
        var workData = {};
        var count = 0;
        ICON_PROP_KEYS.forEach(function (k) {
            var prop = iconProps[k];
            if (prop) {
                if (Array.isArray(prop)) {
                    count = Math.max(count, prop.length);
                }
                else {
                    count = Math.max(count, 1);
                }
            }
        });
        ICON_PROP_KEYS.forEach(function (k) {
            var arr = toPropArray(iconProps[k], count);
            workData[k] = arr;
        });
        var result = [];
        var _loop_1 = function (i) {
            var data = {};
            ICON_PROP_KEYS.forEach(function (k) {
                var val = workData[k][i];
                data[k] = val;
            });
            result.push(data);
        };
        for (var i = 0; i < count; i++) {
            _loop_1(i);
        }
        return result;
    }
    function normarize(iconProps) {
        var data = {};
        for (var k in iconProps) {
            if (k === 'className') {
                continue;
            }
            if (isIconKey(k)) {
                data[k] = iconProps[k];
            }
        }
        if (iconProps.className) {
            var prop = getIconProps(iconProps.tagName || 'i', iconProps.className);
            for (var k in prop) {
                if (isIconKey(k)) {
                    if (!isDef(iconProps[k])) {
                        data[k] = prop[k];
                    }
                }
            }
        }
        return data;
    }
    function toNormarizeArray(iconProps) {
        var icons = toSimpleArray(iconProps);
        if (!icons) {
            return icons;
        }
        return icons.map(function (icon) { return normarize(icon); });
    }
    var iconPropKeys = ICON_PROP_KEYS;
    function isIconKey(k) {
        return ICON_PROP_KEYS.indexOf(k) >= 0;
    }
    var icons = {
        toNormarizeArray: toNormarizeArray,
        iconPropKeys: iconPropKeys,
    };

    var Rect = /** @class */ (function () {
        function Rect(left, top, width, height) {
            this._left = left;
            this._top = top;
            this._width = width;
            this._height = height;
            this._right = undefined;
        }
        Rect.bounds = function (left, top, right, bottom) {
            return new Rect(left, top, right - left, bottom - top);
        };
        Rect.max = function (rect1, rect2) {
            return Rect.bounds(Math.min(rect1.left, rect2.left), Math.min(rect1.top, rect2.top), Math.max(rect1.right, rect2.right), Math.max(rect1.bottom, rect2.bottom));
        };
        Object.defineProperty(Rect.prototype, "left", {
            get: function () {
                return this._left;
            },
            set: function (left) {
                var right = this.right;
                this._left = left;
                this.right = right;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "top", {
            get: function () {
                return this._top;
            },
            set: function (top) {
                var bottom = this.bottom;
                this._top = top;
                this.bottom = bottom;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
                this._right = undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
                this._bottom = undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "right", {
            get: function () {
                return this._right !== undefined
                    ? this._right
                    : (this._right = this.left + this.width);
            },
            set: function (right) {
                this._right = right;
                this.width = right - this.left;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "bottom", {
            get: function () {
                return this._bottom !== undefined
                    ? this._bottom
                    : (this._bottom = this.top + this.height);
            },
            set: function (bottom) {
                this._bottom = bottom;
                this.height = bottom - this.top;
            },
            enumerable: false,
            configurable: true
        });
        Rect.prototype.offsetLeft = function (offset) {
            this._left += offset;
            this._right = undefined;
        };
        Rect.prototype.offsetTop = function (offset) {
            this._top += offset;
            this._bottom = undefined;
        };
        Rect.prototype.copy = function () {
            return new Rect(this.left, this.top, this.width, this.height);
        };
        Rect.prototype.intersection = function (rect) {
            var x0 = Math.max(this.left, rect.left);
            var x1 = Math.min(this.left + this.width, rect.left + rect.width);
            if (x0 <= x1) {
                var y0 = Math.max(this.top, rect.top);
                var y1 = Math.min(this.top + this.height, rect.top + rect.height);
                if (y0 <= y1) {
                    return Rect.bounds(x0, y0, x1, y1);
                }
            }
            return null;
        };
        Rect.prototype.contains = function (another) {
            return (this.left <= another.left &&
                this.left + this.width >= another.left + another.width &&
                this.top <= another.top &&
                this.top + this.height >= another.top + another.height);
        };
        Rect.prototype.inPoint = function (x, y) {
            return (this.left <= x &&
                this.left + this.width >= x &&
                this.top <= y &&
                this.top + this.height >= y);
        };
        return Rect;
    }());

    function loadIcons(icon, context, helper, callback) {
        var argIcon = undefined;
        if (icon) {
            if (isPromise(icon)) {
                icon.then(function (i) {
                    loadIcons(i, context.toCurrentContext(), helper, callback);
                });
            }
            else {
                var iconList = icons.toNormarizeArray(icon);
                iconList.forEach(function (i) {
                    if (i.font && i.content) {
                        helper.testFontLoad(i.font, i.content, context);
                    }
                });
                argIcon = iconList;
            }
        }
        callback(argIcon, context);
    }
    function getActionTextPadding(context, helper, style) {
        var font = style.font;
        var padding = style.padding;
        var appearance = style.appearance;
        var basePadding = helper.toBoxPixelArray(padding || 0, context, font);
        var textPadding = basePadding.slice(0);
        if (appearance !== 'none' && isDefString(appearance)) {
            textPadding[1] += 26; // 文字距离有边框位置，右侧图标
        }
        return textPadding;
    }
    function drawActionButton(grid, context, stateId, helper, style) {
        var textBaseline = style.textBaseline;
        var font = style.font;
        var padding = style.padding;
        var appearance = style.appearance;
        var color = style.color;
        var active = false;
        var state = grid[stateId];
        if (state) {
            if (state.mouseActiveCell &&
                cellInRange(context.range, state.mouseActiveCell.col, state.mouseActiveCell.row)) {
                if (state.mouseRelativePos) {
                    var rect = context.getRect();
                    var btnWidth = 32;
                    rect = new Rect(rect.left + rect.width - btnWidth, rect.top, btnWidth, rect.height);
                    active =
                        rect.left <= state.mouseRelativePos.x &&
                            rect.right >= state.mouseRelativePos.x &&
                            rect.top <= state.mouseRelativePos.y &&
                            rect.bottom >= state.mouseRelativePos.y;
                    state.mouseActive = active;
                }
            }
        }
        if (appearance !== 'none' && isDefString(appearance)) {
            var basePadding = helper.toBoxPixelArray(padding || 0, context, font);
            var iconPadding = basePadding.slice(0);
            iconPadding[1] += 8; // 图标距离右边框位置
            var icon = void 0;
            if (appearance === 'menulist-button') {
                // draw dropdown arrow icon
                icon = {
                    color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
                    path: 'M0 2 5 7 10 2z',
                    width: 10,
                };
            }
            else if (appearance === 'lookup-button') {
                // draw lookup icon
                icon = {
                    color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
                    // tslint:disable-next-line:max-line-length
                    path: 'M4.7997924,9.6 C2.15326327,9.6 0,7.44655046 0,4.79937714 C0,2.15261906 2.15326327,0 4.7997924,0 C7.44673673,0 9.6,2.15261906 9.6,4.79937714 C9.6,7.44655046 7.44673673,9.6 4.7997924,9.6 Z M4.79959481,0.9 C2.64922597,0.9 0.9,2.64900249 0.9,4.79918953 C0.9,6.95018703 2.64922597,8.7 4.79959481,8.7 C6.95036883,8.7 8.7,6.95018703 8.7,4.79918953 C8.7,2.64940773 6.95036883,0.9 4.79959481,0.9 Z M11.579002,12 C11.4749824,12 11.3709629,11.9593028 11.289322,11.8774707 L7.93168591,8.56830498 C7.76260228,8.39851441 7.75555713,8.11713467 7.91510908,7.93902961 C8.07631871,7.76136216 8.34237677,7.75261007 8.51104597,7.92065022 L11.8686821,11.2315664 C12.0373513,11.4004817 12.0443964,11.6822991 11.8848445,11.8608417 C11.8019603,11.9527387 11.6904812,12 11.579002,12 Z',
                    width: 12,
                };
            }
            else if (appearance === 'clear-button') {
                // draw clear icon
                icon = {
                    color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
                    // tslint:disable-next-line:max-line-length
                    path: 'M5.26896659,6.00000686 L0.152356675,11.1166168 C-0.048420546,11.317394 -0.0501211184,11.6463861 0.151753253,11.8482467 C0.355026465,12.05152 0.681179729,12.0498468 0.883383238,11.8476433 L5.99999314,6.73103342 L11.1166168,11.8476433 C11.317394,12.0484205 11.6463861,12.0501211 11.8482467,11.8482467 C12.05152,11.6449735 12.0498468,11.3188203 11.8476433,11.1166168 L6.73103341,6.00000686 L11.8476433,0.883383238 C12.0484205,0.682606017 12.0501074,0.3536139 11.8482467,0.151753253 C11.6449598,-0.0515199596 11.3188065,-0.0498468209 11.1166168,0.152356675 L6.00000686,5.2689803 L0.883383238,0.152356688 C0.682606017,-0.0484205326 0.3536139,-0.0501073814 0.151753253,0.151753266 C-0.0515199596,0.355040202 -0.0498468209,0.681193466 0.152356675,0.883383252 L5.26896659,6.00000686 Z',
                    width: 12,
                };
            }
            else if (appearance === 'date-button') {
                // draw date icon
                icon = {
                    color: active ? 'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .54)',
                    // tslint:disable-next-line:max-line-length
                    path: 'M5.6,6.8h0.9c0.2,0,0.4-0.2,0.4-0.4C6.8,6.2,6.7,6,6.4,6c0,0,0,0,0,0H5.6C5.3,6,5.1,6.2,5.1,6.4c0,0,0,0,0,0C5.1,6.7,5.3,6.8,5.6,6.8L5.6,6.8z M5.6,8.6h0.9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H5.6c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C5.1,8.4,5.3,8.6,5.6,8.6L5.6,8.6z M10.3,0.9H8.6V0.4C8.6,0.2,8.4,0,8.1,0c0,0,0,0,0,0C7.9,0,7.7,0.2,7.7,0.4c0,0,0,0,0,0v0.4H4.3V0.4C4.3,0.2,4.1,0,3.9,0c0,0,0,0,0,0C3.6,0,3.4,0.2,3.4,0.4c0,0,0,0,0,0v0.4H1.7C0.8,0.9,0,1.6,0,2.6v6.8c0,0.9,0.8,1.7,1.7,1.7h8.6c0.9,0,1.7-0.8,1.7-1.7V2.6C12,1.6,11.2,0.9,10.3,0.9L10.3,0.9z M11.1,9.4c0,0.5-0.4,0.9-0.9,0.9H1.7c-0.5,0-0.9-0.4-0.9-0.9V4.3h10.3V9.4z M11.1,3.4H0.9V2.6c0-0.5,0.4-0.9,0.9-0.9h1.7v0.4c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4V1.7h3.4v0.4c0,0.2,0.2,0.4,0.4,0.4c0.2,0,0.4-0.2,0.4-0.4V1.7h1.7c0.5,0,0.9,0.4,0.9,0.9L11.1,3.4L11.1,3.4z M3,8.6h0.9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H3c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C2.6,8.4,2.8,8.6,3,8.6z M8.1,6.8H9c0.2,0,0.4-0.2,0.4-0.4C9.4,6.2,9.2,6,9,6c0,0,0,0,0,0H8.1C7.9,6,7.7,6.2,7.7,6.4c0,0,0,0,0,0C7.7,6.7,7.9,6.8,8.1,6.8L8.1,6.8z M3,6.8h0.9c0.2,0,0.4-0.2,0.4-0.4C4.3,6.2,4.1,6,3.9,6c0,0,0,0,0,0H3C2.8,6,2.6,6.2,2.6,6.4c0,0,0,0,0,0C2.6,6.7,2.8,6.8,3,6.8z M8.1,8.6H9c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H8.1c-0.2,0-0.4,0.2-0.4,0.4c0,0,0,0,0,0C7.7,8.4,7.9,8.6,8.1,8.6z',
                    width: 12,
                };
            }
            else if (typeof appearance === 'function') {
                icon = appearance(active);
            }
            else if (obj.isObject(appearance)) {
                icon = appearance;
            }
            else {
                window.console.warn("unsupported appearance:" + appearance);
            }
            if (icon) {
                // 绘制按钮图标时，不应影响到 overflowText
                var cellOverflowText = grid.getCellOverflowText(context.col, context.row) || '';
                helper.text('', context, {
                    color: color,
                    font: font,
                    icons: [icon],
                    padding: iconPadding,
                    textAlign: 'right',
                    textBaseline: textBaseline,
                });
                grid.setCellOverflowText(context.col, context.row, cellOverflowText);
            }
        }
    }
    function customDraw(helper, draw, value, context, grid, record) {
        var b = false;
        if (draw) {
            var rect = context.getRect();
            var row = context.row;
            var col = context.col;
            var selection = context.getSelection();
            var opt_1 = {
                grid: grid,
                record: record,
                rect: rect,
                row: row,
                col: col,
                selection: selection,
            };
            helper.drawWithClip(context, function (ctx) {
                b = draw(value, ctx, opt_1) === false;
            });
        }
        return b;
    }
    function isAttachArea(record, cellStyle) {
        var s;
        if (typeof cellStyle === 'function') {
            s = cellStyle(record);
        }
        else {
            s = cellStyle;
        }
        var b = false;
        if (s && s.innerBox === 'dashed') {
            b = true;
        }
        return b;
    }
    function reviseAttachCellsArea(rect, row, grid, cellStyle) {
        var record = grid.getRowRecord(row);
        if (isAttachArea(record, cellStyle)) {
            rect.left += 4;
            rect.top += 4;
            rect.right -= 4;
            rect.bottom -= 4;
        }
    }
    function reviseAttachCellsPadding(padding, row, grid, cellStyle) {
        var record = grid.getRowRecord(row);
        if (isAttachArea(record, cellStyle)) {
            padding[3] -= 4;
            if (padding[3] < 0) {
                padding[3] = 0;
            }
            padding[1] -= 4;
            if (padding[1] < 0) {
                padding[1] = 0;
            }
        }
    }
    function drawAttachArea(grid, record, context, helper, cellStyle) {
        if (isAttachArea(record, cellStyle)) {
            var rect = context.getRect();
            rect.top += 4;
            rect.right -= 4;
            rect.bottom -= 4;
            rect.left += 4;
            helper.attachArea(rect, context);
        }
    }

    var _a$1;
    var _ = getEventTargetSymbol();
    var eventTargetNextId = 1;
    /**
     * event target.
     */
    var EventTarget = /** @class */ (function () {
        function EventTarget() {
            this[_a$1] = {
                listeners: {},
                listenerData: {},
            };
        }
        /**
         * Adds an event listener.
         * @param type - The event type id.
         * @param listener - Callback method.
         * @returns unique id for the listener.
         */
        EventTarget.prototype.listen = function (type, listener) {
            var _this = this;
            var list = this[_].listeners[type] || (this[_].listeners[type] = []);
            list.push(listener);
            var id = eventTargetNextId++;
            this[_].listenerData[id] = {
                listener: listener,
                remove: function () {
                    delete _this[_].listenerData[id];
                    var index = list.indexOf(listener);
                    list.splice(index, 1);
                    if (!_this[_].listeners[type].length) {
                        delete _this[_].listeners[type];
                    }
                },
                type: type,
            };
            return id;
        };
        /**
         * Removes an event listener which was added with listen() by the id returned by listen().
         * @param id - the id returned by listen().
         * @returns
         */
        EventTarget.prototype.unlisten = function (id) {
            if (!this[_]) {
                return;
            }
            this[_].listenerData[id].remove();
        };
        /**
         * Adds an event listener.
         * @param type - The event type id.
         * @param listener - Callback method.
         * @returns
         */
        EventTarget.prototype.addEventListener = function (type, listener) {
            this.listen(type, listener);
        };
        /**
         * Removes an event listener.
         * @param type - The event type id.
         * @param listener - Callback method.
         * @returns
         */
        EventTarget.prototype.removeEventListener = function (type, listener) {
            var _this = this;
            if (!this[_]) {
                return;
            }
            each(this[_].listenerData, function (obj, id) {
                if (obj.type === type && obj.listener === listener) {
                    _this.unlisten(id);
                }
            });
        };
        /**
         * @param type - The event type id.
         * @returns
         */
        EventTarget.prototype.hasListeners = function (type) {
            return !!this[_].listeners[type];
        };
        /**
         * Fires all registered listeners
         * @param type - The type of the listeners to fire.
         * @param args - fire arguments
         * @returns the result of the last listener
         */
        EventTarget.prototype.fireListeners = function (type) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var list = this[_].listeners[type];
            if (!list) {
                return [];
            }
            return list.map(function (listener) { return listener.call.apply(listener, __spreadArrays([_this], args)); }).filter(isDef);
        };
        /**
         * @returns
         */
        EventTarget.prototype.dispose = function () { };
        return EventTarget;
    }());
    _a$1 = _;

    var BASE_STYLE_EVENT_TYPE = {
        CHANGE_STYLE: 'change_style',
    };
    var defaultBaseStyle;
    var BaseStyle = /** @class */ (function (_super) {
        __extends(BaseStyle, _super);
        function BaseStyle(_a) {
            var _b = _a === void 0 ? {} : _a, bgColor = _b.bgColor;
            var _this = _super.call(this) || this;
            _this._bgColor = bgColor;
            return _this;
        }
        Object.defineProperty(BaseStyle, "EVENT_TYPE", {
            get: function () {
                return BASE_STYLE_EVENT_TYPE;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseStyle, "DEFAULT", {
            get: function () {
                return defaultBaseStyle
                    ? defaultBaseStyle
                    : (defaultBaseStyle = new BaseStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseStyle.prototype, "bgColor", {
            get: function () {
                return this._bgColor;
            },
            set: function (bgColor) {
                this._bgColor = bgColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        BaseStyle.prototype.doChangeStyle = function () {
            this.fireListeners(BASE_STYLE_EVENT_TYPE.CHANGE_STYLE);
        };
        BaseStyle.prototype.clone = function () {
            return new BaseStyle(this);
        };
        return BaseStyle;
    }(EventTarget));

    var defaultBaseStdStyle;
    var BaseStdStyle = /** @class */ (function (_super) {
        __extends(BaseStdStyle, _super);
        function BaseStdStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, style) || this;
            _this._textAlign = style.textAlign || 'left';
            _this._textBaseline = style.textBaseline || 'middle';
            return _this;
        }
        Object.defineProperty(BaseStdStyle, "DEFAULT", {
            get: function () {
                return defaultBaseStdStyle
                    ? defaultBaseStdStyle
                    : (defaultBaseStdStyle = new BaseStdStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseStdStyle.prototype, "textAlign", {
            get: function () {
                return this._textAlign;
            },
            set: function (textAlign) {
                this._textAlign = textAlign;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseStdStyle.prototype, "textBaseline", {
            get: function () {
                return this._textBaseline;
            },
            set: function (textBaseline) {
                this._textBaseline = textBaseline;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        BaseStdStyle.prototype.clone = function () {
            return new BaseStdStyle(this);
        };
        return BaseStdStyle;
    }(BaseStyle));

    var defaultBaseCheckStyle;
    var BaseCheckStyle = /** @class */ (function (_super) {
        __extends(BaseCheckStyle, _super);
        function BaseCheckStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, defaults(style, { textAlign: 'center' })) || this;
            var uncheckBgColor = style.uncheckBgColor, checkBgColor = style.checkBgColor, borderColor = style.borderColor;
            _this._uncheckBgColor = uncheckBgColor;
            _this._checkBgColor = checkBgColor;
            _this._borderColor = borderColor;
            return _this;
        }
        Object.defineProperty(BaseCheckStyle, "DEFAULT", {
            get: function () {
                return defaultBaseCheckStyle
                    ? defaultBaseCheckStyle
                    : (defaultBaseCheckStyle = new BaseCheckStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseCheckStyle.prototype, "uncheckBgColor", {
            get: function () {
                return this._uncheckBgColor;
            },
            set: function (uncheckBgColor) {
                this._uncheckBgColor = uncheckBgColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseCheckStyle.prototype, "checkBgColor", {
            get: function () {
                return this._checkBgColor;
            },
            set: function (checkBgColor) {
                this._checkBgColor = checkBgColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseCheckStyle.prototype, "borderColor", {
            get: function () {
                return this._borderColor;
            },
            set: function (borderColor) {
                this._borderColor = borderColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        BaseCheckStyle.prototype.clone = function () {
            return new BaseCheckStyle(this);
        };
        return BaseCheckStyle;
    }(BaseStdStyle));

    var defaultStyle;
    var Style = /** @class */ (function (_super) {
        __extends(Style, _super);
        function Style(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, style) || this;
            _this._color = style.color;
            _this._font = style.font;
            _this._padding = style.padding;
            _this._inputPadding = style.inputPadding;
            _this._textOverflow = style.textOverflow || 'clip';
            _this._appearance = style.appearance || 'none';
            return _this;
        }
        Object.defineProperty(Style, "DEFAULT", {
            get: function () {
                return defaultStyle ? defaultStyle : (defaultStyle = new Style());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (color) {
                this._color = color;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "font", {
            get: function () {
                return this._font;
            },
            set: function (font) {
                this._font = font;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "padding", {
            get: function () {
                return this._padding;
            },
            set: function (padding) {
                this._padding = padding;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "inputPadding", {
            get: function () {
                return this._inputPadding;
            },
            set: function (inputPadding) {
                this._inputPadding = inputPadding;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "textOverflow", {
            get: function () {
                return this._textOverflow;
            },
            set: function (textOverflow) {
                this._textOverflow = textOverflow;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "appearance", {
            get: function () {
                return this._appearance;
            },
            set: function (appearance) {
                this._appearance = appearance;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Style.prototype.clone = function () {
            return new Style(this);
        };
        return Style;
    }(BaseStdStyle));

    var defaultButtonStyle;
    var ButtonStyle = /** @class */ (function (_super) {
        __extends(ButtonStyle, _super);
        function ButtonStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, defaults(style, { textAlign: 'center' })) || this;
            _this._buttonBgColor = style.buttonBgColor;
            return _this;
        }
        Object.defineProperty(ButtonStyle, "DEFAULT", {
            get: function () {
                return defaultButtonStyle
                    ? defaultButtonStyle
                    : (defaultButtonStyle = new ButtonStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ButtonStyle.prototype, "buttonBgColor", {
            get: function () {
                return this._buttonBgColor;
            },
            set: function (buttonBgColor) {
                this._buttonBgColor = buttonBgColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        ButtonStyle.prototype.clone = function () {
            return new ButtonStyle(this);
        };
        return ButtonStyle;
    }(Style));

    var defaultCheckStyle;
    var CheckStyle = /** @class */ (function (_super) {
        __extends(CheckStyle, _super);
        function CheckStyle(style) {
            if (style === void 0) { style = {}; }
            return _super.call(this, style) || this;
        }
        Object.defineProperty(CheckStyle, "DEFAULT", {
            get: function () {
                return defaultCheckStyle
                    ? defaultCheckStyle
                    : (defaultCheckStyle = new CheckStyle());
            },
            enumerable: false,
            configurable: true
        });
        CheckStyle.prototype.clone = function () {
            return new CheckStyle(this);
        };
        return CheckStyle;
    }(BaseCheckStyle));

    var defaultSwitchStyle;
    var SwitchStyle = /** @class */ (function (_super) {
        __extends(SwitchStyle, _super);
        function SwitchStyle(style) {
            if (style === void 0) { style = {}; }
            return _super.call(this, style) || this;
        }
        Object.defineProperty(SwitchStyle, "DEFAULT", {
            get: function () {
                return defaultSwitchStyle
                    ? defaultSwitchStyle
                    : (defaultSwitchStyle = new SwitchStyle());
            },
            enumerable: false,
            configurable: true
        });
        SwitchStyle.prototype.clone = function () {
            return new SwitchStyle(this);
        };
        return SwitchStyle;
    }(BaseCheckStyle));

    function adjustDateTimeStyleOption(style) {
        style.textAlign = style.textAlign || 'right';
        return style;
    }
    var defaultDateStyle;
    var DateStyle = /** @class */ (function (_super) {
        __extends(DateStyle, _super);
        function DateStyle(style) {
            if (style === void 0) { style = {}; }
            return _super.call(this, adjustDateTimeStyleOption(style)) || this;
        }
        Object.defineProperty(DateStyle, "DEFAULT", {
            get: function () {
                return defaultDateStyle
                    ? defaultDateStyle
                    : (defaultDateStyle = new DateStyle());
            },
            enumerable: false,
            configurable: true
        });
        DateStyle.prototype.clone = function () {
            return new DateStyle(this);
        };
        return DateStyle;
    }(Style));

    var defaultDrawStyle;
    var DrawStyle = /** @class */ (function (_super) {
        __extends(DrawStyle, _super);
        function DrawStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, style) || this;
            _this._appearance = style.appearance || 'none';
            return _this;
        }
        Object.defineProperty(DrawStyle, "DEFAULT", {
            get: function () {
                return defaultDrawStyle
                    ? defaultDrawStyle
                    : (defaultDrawStyle = new DrawStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawStyle.prototype, "appearance", {
            get: function () {
                return this._appearance;
            },
            set: function (appearance) {
                this._appearance = appearance;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        DrawStyle.prototype.clone = function () {
            return new DrawStyle(this);
        };
        return DrawStyle;
    }(BaseStyle));

    var defaultIconStyle;
    var IconStyle = /** @class */ (function (_super) {
        __extends(IconStyle, _super);
        function IconStyle(style) {
            if (style === void 0) { style = {}; }
            return _super.call(this, defaults(style, { textAlign: 'center' })) || this;
        }
        Object.defineProperty(IconStyle, "DEFAULT", {
            get: function () {
                return defaultIconStyle
                    ? defaultIconStyle
                    : (defaultIconStyle = new IconStyle());
            },
            enumerable: false,
            configurable: true
        });
        IconStyle.prototype.clone = function () {
            return new IconStyle(this);
        };
        return IconStyle;
    }(Style));

    var defaultImageStyle;
    var ImageStyle = /** @class */ (function (_super) {
        __extends(ImageStyle, _super);
        function ImageStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, defaults(style, { textAlign: 'center' })) || this;
            _this._imageSizing = style.imageSizing;
            _this._margin = style.margin || 4;
            _this._appearance = style.appearance || 'none';
            return _this;
        }
        Object.defineProperty(ImageStyle, "DEFAULT", {
            get: function () {
                return defaultImageStyle
                    ? defaultImageStyle
                    : (defaultImageStyle = new ImageStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImageStyle.prototype, "imageSizing", {
            get: function () {
                return this._imageSizing;
            },
            set: function (imageSizing) {
                this._imageSizing = imageSizing;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImageStyle.prototype, "margin", {
            get: function () {
                return this._margin;
            },
            set: function (margin) {
                this._margin = margin;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImageStyle.prototype, "appearance", {
            get: function () {
                return this._appearance;
            },
            set: function (appearance) {
                this._appearance = appearance;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        ImageStyle.prototype.clone = function () {
            return new ImageStyle(this);
        };
        return ImageStyle;
    }(BaseStdStyle));

    var defaultLookupStyle;
    var LookupStyle = /** @class */ (function (_super) {
        __extends(LookupStyle, _super);
        function LookupStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, defaults(style, { textAlign: 'left' })) || this;
            _this.appearance = style.appearance || 'menulist-button';
            return _this;
        }
        Object.defineProperty(LookupStyle, "DEFAULT", {
            get: function () {
                return defaultLookupStyle
                    ? defaultLookupStyle
                    : (defaultLookupStyle = new LookupStyle());
            },
            enumerable: false,
            configurable: true
        });
        LookupStyle.prototype.clone = function () {
            return new LookupStyle(this);
        };
        return LookupStyle;
    }(Style));

    var defaultMenuStyle;
    var MenuStyle = /** @class */ (function (_super) {
        __extends(MenuStyle, _super);
        function MenuStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, style) || this;
            _this.appearance = style.appearance || 'menulist-button';
            return _this;
        }
        Object.defineProperty(MenuStyle, "DEFAULT", {
            get: function () {
                return defaultMenuStyle
                    ? defaultMenuStyle
                    : (defaultMenuStyle = new MenuStyle());
            },
            enumerable: false,
            configurable: true
        });
        MenuStyle.prototype.clone = function () {
            return new MenuStyle(this);
        };
        return MenuStyle;
    }(Style));

    var defaultMultilineTextStyle;
    var MultilineTextStyle = /** @class */ (function (_super) {
        __extends(MultilineTextStyle, _super);
        function MultilineTextStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, defaults(style, { textBaseline: 'middle', textOverflow: 'ellipsis' })) || this;
            _this._lineHeight = style.lineHeight || '1em';
            _this._autoWrapText = style.autoWrapText || false;
            _this._lineClamp = style.lineClamp || 'auto';
            return _this;
        }
        Object.defineProperty(MultilineTextStyle, "DEFAULT", {
            get: function () {
                return defaultMultilineTextStyle
                    ? defaultMultilineTextStyle
                    : (defaultMultilineTextStyle = new MultilineTextStyle());
            },
            enumerable: false,
            configurable: true
        });
        MultilineTextStyle.prototype.clone = function () {
            return new MultilineTextStyle(this);
        };
        Object.defineProperty(MultilineTextStyle.prototype, "lineHeight", {
            get: function () {
                return this._lineHeight;
            },
            set: function (lineHeight) {
                this._lineHeight = lineHeight;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MultilineTextStyle.prototype, "lineClamp", {
            get: function () {
                return this._lineClamp;
            },
            set: function (lineClamp) {
                this._lineClamp = lineClamp;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MultilineTextStyle.prototype, "autoWrapText", {
            get: function () {
                return this._autoWrapText;
            },
            set: function (autoWrapText) {
                this._autoWrapText = autoWrapText;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        return MultilineTextStyle;
    }(Style));

    var defaultNumberStyle;
    var NumberStyle = /** @class */ (function (_super) {
        __extends(NumberStyle, _super);
        function NumberStyle(style) {
            if (style === void 0) { style = {}; }
            return _super.call(this, defaults(style, { textAlign: 'right' })) || this;
        }
        Object.defineProperty(NumberStyle, "DEFAULT", {
            get: function () {
                return defaultNumberStyle
                    ? defaultNumberStyle
                    : (defaultNumberStyle = new NumberStyle());
            },
            enumerable: false,
            configurable: true
        });
        NumberStyle.prototype.clone = function () {
            return new NumberStyle(this);
        };
        return NumberStyle;
    }(Style));

    var defaultPercentCompleteBarStyle;
    var DEFAULT_BAR_COLOR = function (num) {
        if (num > 80) {
            return '#20a8d8';
        }
        if (num > 50) {
            return '#4dbd74';
        }
        if (num > 20) {
            return '#ffc107';
        }
        return '#f86c6b';
    };
    var PercentCompleteBarStyle = /** @class */ (function (_super) {
        __extends(PercentCompleteBarStyle, _super);
        function PercentCompleteBarStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, style) || this;
            _this._barColor = style.barColor || DEFAULT_BAR_COLOR;
            _this._barBgColor = style.barBgColor || '#f0f3f5';
            _this._barHeight = style.barHeight || 3;
            return _this;
        }
        Object.defineProperty(PercentCompleteBarStyle, "DEFAULT", {
            get: function () {
                return defaultPercentCompleteBarStyle
                    ? defaultPercentCompleteBarStyle
                    : (defaultPercentCompleteBarStyle = new PercentCompleteBarStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PercentCompleteBarStyle.prototype, "barColor", {
            get: function () {
                return this._barColor;
            },
            set: function (barColor) {
                this._barColor = barColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PercentCompleteBarStyle.prototype, "barBgColor", {
            get: function () {
                return this._barBgColor;
            },
            set: function (barBgColor) {
                this._barBgColor = barBgColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PercentCompleteBarStyle.prototype, "barHeight", {
            get: function () {
                return this._barHeight;
            },
            set: function (barHeight) {
                this._barHeight = barHeight;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        PercentCompleteBarStyle.prototype.clone = function () {
            return new PercentCompleteBarStyle(this);
        };
        return PercentCompleteBarStyle;
    }(Style));

    var defaultRadioStyle;
    var RadioStyle = /** @class */ (function (_super) {
        __extends(RadioStyle, _super);
        function RadioStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, defaults(style, { textAlign: 'center' })) || this;
            var checkColor = style.checkColor, uncheckBorderColor = style.uncheckBorderColor, checkBorderColor = style.checkBorderColor, uncheckBgColor = style.uncheckBgColor, checkBgColor = style.checkBgColor;
            _this._checkColor = checkColor;
            _this._uncheckBorderColor = uncheckBorderColor;
            _this._checkBorderColor = checkBorderColor;
            _this._uncheckBgColor = uncheckBgColor;
            _this._checkBgColor = checkBgColor;
            return _this;
        }
        Object.defineProperty(RadioStyle, "DEFAULT", {
            get: function () {
                return defaultRadioStyle
                    ? defaultRadioStyle
                    : (defaultRadioStyle = new RadioStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RadioStyle.prototype, "checkColor", {
            get: function () {
                return this._checkColor;
            },
            set: function (checkColor) {
                this._checkColor = checkColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RadioStyle.prototype, "uncheckBorderColor", {
            get: function () {
                return this._uncheckBorderColor;
            },
            set: function (uncheckBorderColor) {
                this._uncheckBorderColor = uncheckBorderColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RadioStyle.prototype, "checkBorderColor", {
            get: function () {
                return this._checkBorderColor;
            },
            set: function (checkBorderColor) {
                this._checkBorderColor = checkBorderColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RadioStyle.prototype, "uncheckBgColor", {
            get: function () {
                return this._uncheckBgColor;
            },
            set: function (uncheckBgColor) {
                this._uncheckBgColor = uncheckBgColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RadioStyle.prototype, "checkBgColor", {
            get: function () {
                return this._checkBgColor;
            },
            set: function (checkBgColor) {
                this._checkBgColor = checkBgColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        RadioStyle.prototype.clone = function () {
            return new RadioStyle(this);
        };
        return RadioStyle;
    }(BaseStdStyle));

    function adjustTreeStyleOption(style) {
        style.textAlign = style.textAlign || 'left';
        return style;
    }
    var defaultTreeStyle;
    var TreeStyle = /** @class */ (function (_super) {
        __extends(TreeStyle, _super);
        function TreeStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, adjustTreeStyleOption(style)) || this;
            _this._lineColor = style.lineColor;
            _this._buttonColor = style.buttonColor;
            _this._buttonBgColor = style.buttonBgColor;
            _this._buttonBorderColor = style.buttonBorderColor;
            _this._linkColor = style.linkColor;
            _this._lineHeight = style.lineHeight || '1em';
            _this._autoWrapText = style.autoWrapText || false;
            _this._lineClamp = style.lineClamp || 'auto';
            return _this;
        }
        Object.defineProperty(TreeStyle, "DEFAULT", {
            get: function () {
                return defaultTreeStyle
                    ? defaultTreeStyle
                    : (defaultTreeStyle = new TreeStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeStyle.prototype, "lineColor", {
            get: function () {
                return this._lineColor;
            },
            set: function (lineColor) {
                this._lineColor = lineColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeStyle.prototype, "buttonColor", {
            get: function () {
                return this._buttonColor;
            },
            set: function (buttonColor) {
                this._buttonColor = buttonColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeStyle.prototype, "buttonBgColor", {
            get: function () {
                return this._buttonBgColor;
            },
            set: function (buttonBgColor) {
                this._buttonBgColor = buttonBgColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeStyle.prototype, "buttonBorderColor", {
            get: function () {
                return this._buttonBorderColor;
            },
            set: function (buttonBorderColor) {
                this._buttonBorderColor = buttonBorderColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeStyle.prototype, "linkColor", {
            get: function () {
                return this._linkColor;
            },
            set: function (linkColor) {
                this._linkColor = linkColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeStyle.prototype, "lineHeight", {
            get: function () {
                return this._lineHeight;
            },
            set: function (lineHeight) {
                this._lineHeight = lineHeight;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeStyle.prototype, "lineClamp", {
            get: function () {
                return this._lineClamp;
            },
            set: function (lineClamp) {
                this._lineClamp = lineClamp;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeStyle.prototype, "autoWrapText", {
            get: function () {
                return this._autoWrapText;
            },
            set: function (autoWrapText) {
                this._autoWrapText = autoWrapText;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        TreeStyle.prototype.clone = function () {
            return new TreeStyle(this);
        };
        return TreeStyle;
    }(Style));

    var EVENT_TYPE = BaseStyle.EVENT_TYPE;
    function of(columnStyle, record, StyleClassDef) {
        if (StyleClassDef === void 0) { StyleClassDef = Style; }
        if (columnStyle) {
            if (columnStyle instanceof BaseStyle) {
                return columnStyle;
            }
            else if (typeof columnStyle === 'function') {
                return of(columnStyle(record), record, StyleClassDef);
            }
            else if (typeof columnStyle === 'string' &&
                record &&
                columnStyle in record) {
                return of(record[columnStyle], record, StyleClassDef);
            }
            return new StyleClassDef(columnStyle);
        }
        else {
            return StyleClassDef.DEFAULT;
        }
    }

    var COLUMN_FADEIN_STATE_ID = getColumnFadeinStateId();
    function getFadinState(grid) {
        var state = grid[COLUMN_FADEIN_STATE_ID];
        if (!state) {
            state = { cells: {} };
            obj.setReadonly(grid, COLUMN_FADEIN_STATE_ID, state);
        }
        return state;
    }
    function _generateFadinPointAction(grid, col, row, context, drawInternal, drawCellBase) {
        return function (point) {
            var state = getFadinState(grid);
            var stateKey = col + ":" + row;
            if (point === 1) {
                delete state.cells[stateKey];
            }
            else {
                state.cells[stateKey] = {
                    opacity: point,
                };
            }
            drawCellBase();
            drawInternal();
            var cellState = state.cells[stateKey];
            if (cellState) {
                // 透明背景覆盖透明度
                var ctx = context.getContext();
                ctx.globalAlpha = 1 - cellState.opacity;
                try {
                    drawCellBase();
                }
                finally {
                    ctx.globalAlpha = 1;
                }
            }
        };
    }
    var fadinMgr = {
        animate: function (grid, col, row, context, drawInternal, drawCellBase) {
            // fadein animation
            var state = getFadinState(grid);
            var activeFadeins = [
                _generateFadinPointAction(grid, col, row, context, drawInternal, drawCellBase),
            ];
            state.activeFadeins = activeFadeins;
            animate(500, function (point) {
                activeFadeins.forEach(function (f) { return f(point); });
                if (point === 1) {
                    delete state.activeFadeins;
                }
            });
        },
        margeAnimate: function (grid, col, row, context, drawInternal, drawCellBase) {
            var state = getFadinState(grid);
            if (state.activeFadeins) {
                state.activeFadeins.push(_generateFadinPointAction(grid, col, row, context, drawInternal, drawCellBase));
            }
            else {
                drawInternal();
            }
        },
    };
    var BaseColumn = /** @class */ (function () {
        function BaseColumn(options) {
            if (options === void 0) { options = {}; }
            this.onDrawCell = this.onDrawCell.bind(this); // 修复范围
            this._convert = options.convert;
            this._convertCopy = options.convertCopy;
            this._hidden = options.hidden;
            // 使用Promise的回调显示淡入
            this._fadeinWhenCallbackInPromise =
                options.fadeinWhenCallbackInPromise || false;
        }
        Object.defineProperty(BaseColumn.prototype, "StyleClass", {
            get: function () {
                return BaseStyle;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseColumn.prototype, "fadeinWhenCallbackInPromise", {
            get: function () {
                return this._fadeinWhenCallbackInPromise;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseColumn.prototype, "convert", {
            get: function () {
                return this._convert;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseColumn.prototype, "convertCopy", {
            get: function () {
                return this._convertCopy;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseColumn.prototype, "hidden", {
            get: function () {
                return this._hidden;
            },
            set: function (hidden) {
                this._hidden = hidden;
            },
            enumerable: false,
            configurable: true
        });
        BaseColumn.prototype.reviseAttachCellsArea = function (_rect, _row, _grid) {
            // nothing
        };
        BaseColumn.prototype.reviseAttachCellsPadding = function (padding, row, grid) {
            var state = getInlineEditingState(grid);
            if (state.inputPadding) {
                padding[0] += state.inputPadding[0];
                padding[1] += state.inputPadding[1];
                padding[2] += state.inputPadding[2];
                padding[3] += state.inputPadding[3];
            }
        };
        BaseColumn.prototype.reviseFocusRect = function (_rect, _row, _grid) {
            // nothing
        };
        BaseColumn.prototype.onDrawCell = function (cellValue, info, context, grid) {
            var _this = this;
            var style = info.style, getRecord = info.getRecord, clearCellBase = info.clearCellBase, drawCellBase = info.drawCellBase, getCell = info.getCell, getContentHidden = info.getContentHidden;
            var record = getRecord();
            var helper = grid.getGridCanvasHelper();
            var state = getInlineEditingState(grid);
            if (state.cellRange &&
                cellInRange(state.cellRange, context.col, context.row)) {
                // 被编辑单元格
                drawCellBase({ bgColor: '#FFF' });
                var actStyle = of(style, record, this.StyleClass);
                this.drawEditingInternal(context, actStyle, helper, grid, info);
                return;
            }
            if (!state.cellRange) {
                // 在绘制单元格时，在编辑前，顺便保存当前焦点单元格的 inputPadding
                var sel = context.getSelection();
                var col = context.col, row = context.row;
                if (!sel.dragged &&
                    cellInRange(context.range, sel.select.col, sel.select.row) &&
                    cellInRange(sel.range, col, row)) {
                    // 焦点单元格
                    var actStyle = of(style, record, this.StyleClass);
                    if (actStyle instanceof Style && actStyle.inputPadding) {
                        state.inputPadding = helper.toBoxPixelArray(actStyle.inputPadding, context, actStyle.font);
                    }
                    else {
                        delete state.inputPadding;
                    }
                }
            }
            clearCellBase();
            var promise;
            if (!record) {
                return; // 过滤过程中 record 可能没有值
            }
            else if (isPromise(record)) {
                promise = record.then(function () { return cellValue; });
            }
            else if (isPromise(cellValue)) {
                promise = cellValue;
            }
            // 文字
            if (promise) {
                var start_1 = Date.now();
                return promise.then(function (val) {
                    var currentContext = context.toCurrentContext();
                    var drawRect = currentContext.getDrawRect();
                    if (!drawRect) {
                        return;
                    }
                    var time = Date.now() - start_1;
                    var drawInternal = function () {
                        var _currentContext = context.toCurrentContext();
                        var _drawRect = _currentContext.getDrawRect();
                        if (!_drawRect) {
                            return;
                        }
                        var _record = getRecord();
                        if (isPromise(_record)) {
                            return;
                        }
                        var actStyle = of(style, _record, _this.StyleClass);
                        if (actStyle.bgColor) {
                            drawCellBase({ bgColor: actStyle.bgColor });
                        }
                        else {
                            drawCellBase();
                        }
                        if (_this.isContentHidden(_record, getContentHidden)) {
                            return;
                        }
                        _this.drawInternal(_this.doConvertInternal(val, getCell(), grid), _currentContext, actStyle, helper, grid, info);
                        _this.drawMessageInternal(info.getMessage(), context, actStyle, helper, grid, info);
                    };
                    var isFadeinWhenCallbackInPromise = _this._fadeinWhenCallbackInPromise;
                    if (!isDef(isFadeinWhenCallbackInPromise)) {
                        isFadeinWhenCallbackInPromise = !!grid.configure('fadeinWhenCallbackInPromise');
                    }
                    if (!isFadeinWhenCallbackInPromise) {
                        drawInternal(); // 简单的绘图
                    }
                    else {
                        var col = context.col;
                        var row = context.row;
                        if (time < 80) {
                            // 80 ms内的PromiseCallback被集成到之前的动画中
                            fadinMgr.margeAnimate(grid, col, row, context, drawInternal, drawCellBase);
                        }
                        else {
                            // 动画
                            fadinMgr.animate(grid, col, row, context, drawInternal, drawCellBase);
                        }
                    }
                });
            }
            else {
                var actStyle = of(style, record, this.StyleClass);
                if (actStyle.bgColor) {
                    drawCellBase({ bgColor: actStyle.bgColor });
                }
                else {
                    drawCellBase();
                }
                if (this.isContentHidden(record, getContentHidden)) {
                    return;
                }
                this.drawInternal(this.doConvertInternal(cellValue, getCell(), grid), context, actStyle, helper, grid, info);
                this.drawMessageInternal(info.getMessage(), context, actStyle, helper, grid, info);
                // 在淡入的情况下透明背景覆盖透明度
                var col = context.col;
                var row = context.row;
                var stateKey = col + ":" + row;
                var cellState = grid[COLUMN_FADEIN_STATE_ID] &&
                    grid[COLUMN_FADEIN_STATE_ID][stateKey];
                if (cellState) {
                    var ctx = context.getContext();
                    ctx.globalAlpha = 1 - cellState.opacity;
                    try {
                        drawCellBase();
                    }
                    finally {
                        ctx.globalAlpha = 1;
                    }
                }
                return;
            }
        };
        BaseColumn.prototype.drawMessageInternal = function (message, context, style, helper, grid, info) {
            info.messageHandler.drawCellMessage(message, context, style, helper, grid, info);
        };
        BaseColumn.prototype.bindGridEvent = function (_grid, _cellId) {
            return [];
        };
        BaseColumn.prototype.getCopyCellValue = function (value, _grid, _cell) {
            return value;
        };
        BaseColumn.prototype.convertCopyValue = function (value, cell, grid) {
            var displayValue = this.convertCopyInternal(value);
            if (this.convertCopy) {
                displayValue = this.convertCopy(value, displayValue, cell, grid);
            }
            return displayValue;
        };
        BaseColumn.prototype.doConvertInternal = function (value, cell, grid) {
            var displayValue = this.convertInternal(value);
            if (this.convert) {
                displayValue = this.convert(value, displayValue, cell, grid);
            }
            return displayValue;
        };
        BaseColumn.prototype.convertInternal = function (value) {
            return (isDef(value) ? value : '');
        };
        BaseColumn.prototype.convertCopyInternal = function (value) {
            return this.convertInternal(value);
        };
        BaseColumn.prototype.drawEditingInternal = function (_context, _style, _helper, _grid, _info) {
            // nothing
        };
        BaseColumn.prototype.isContentHidden = function (record, getContentHidden) {
            var contentHidden = getOrApply(this.hidden, record);
            if (!isDef(contentHidden)) {
                contentHidden = getContentHidden();
            }
            return contentHidden;
        };
        return BaseColumn;
    }());

    var MenuColumn = /** @class */ (function (_super) {
        __extends(MenuColumn, _super);
        function MenuColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._options = menuItems.normalize(options.options);
            return _this;
        }
        Object.defineProperty(MenuColumn.prototype, "StyleClass", {
            get: function () {
                return MenuStyle;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MenuColumn.prototype, "options", {
            get: function () {
                return this._options;
            },
            enumerable: false,
            configurable: true
        });
        MenuColumn.prototype.clone = function () {
            return new MenuColumn(this);
        };
        MenuColumn.prototype.withOptions = function (options) {
            var c = this.clone();
            c._options = menuItems.normalize(options);
            return c;
        };
        MenuColumn.prototype.drawInternal = function (value, context, style, helper, grid, _a) {
            var getCell = _a.getCell, getIcon = _a.getIcon;
            var textAlign = style.textAlign, textBaseline = style.textBaseline, font = style.font, padding = style.padding, textOverflow = style.textOverflow, appearance = style.appearance;
            var color = style.color;
            var text = this._convertInternal(value, getCell(), grid);
            helper.testFontLoad(font, text, context);
            loadIcons(getIcon(), context, helper, function (icons, ctx) {
                var basePadding = helper.toBoxPixelArray(padding || 0, context, font);
                var textPadding = basePadding.slice(0);
                textPadding[1] += 26; // icon padding
                var iconPadding = basePadding.slice(0);
                iconPadding[1] += 8;
                if (!isDef(color) && (!isDef(value) || value === '')) {
                    color = 'rgba(0, 0, 0, .38)';
                }
                helper.text(text, ctx, {
                    color: color,
                    font: font,
                    icons: icons,
                    padding: textPadding,
                    textAlign: textAlign,
                    textBaseline: textBaseline,
                    textOverflow: textOverflow,
                });
                if (appearance === 'menulist-button') {
                    // draw dropdown arrow icon
                    helper.text('', context, {
                        color: color,
                        font: font,
                        icons: [
                            {
                                color: 'rgba(0, 0, 0, .54)',
                                path: 'M0 2 5 7 10 2z',
                                width: 10,
                            },
                        ],
                        padding: iconPadding,
                        textAlign: 'right',
                        textBaseline: textBaseline,
                    });
                }
                else if (appearance !== 'none') {
                    window.console.warn("unsupported appearance:" + appearance);
                }
            });
        };
        MenuColumn.prototype.convertInternal = function (value) {
            return value;
        };
        MenuColumn.prototype._convertInternal = function (value, cell, grid) {
            var options = this._options;
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var option = options_1[_i];
                if (option.value === value) {
                    value = option.label;
                    break;
                }
            }
            return _super.prototype.doConvertInternal.call(this, value, cell, grid);
        };
        MenuColumn.prototype.getCopyCellValue = function (value, grid, cell) {
            return this._convertInternal(value, cell, grid);
        };
        return MenuColumn;
    }(BaseColumn));

    var INLINE_MENU_EDITOR_STATE_ID = getInlineMenuEditorStateId();
    var globalInlineMenuElement = null;
    var globalInlineMenuBindGridCount = 0;
    function getState(grid) {
        var state = grid[INLINE_MENU_EDITOR_STATE_ID];
        if (!state) {
            state = {};
            obj.setReadonly(grid, INLINE_MENU_EDITOR_STATE_ID, state);
        }
        return state;
    }
    function attachMenu(grid, cell, editor, value, record) {
        var state = getState(grid);
        if (!globalInlineMenuElement) {
            globalInlineMenuElement = new InlineMenuElement();
        }
        if (!state.element) {
            state.element = globalInlineMenuElement;
            globalInlineMenuBindGridCount++;
            grid.addDisposable({
                dispose: function () {
                    globalInlineMenuBindGridCount--;
                    if (!globalInlineMenuBindGridCount && globalInlineMenuElement) {
                        globalInlineMenuElement.dispose();
                        globalInlineMenuElement = null;
                    }
                },
            });
        }
        globalInlineMenuElement.attach(grid, editor, cell.col, cell.row, value, record);
    }
    function detachMenu(gridFocus) {
        if (globalInlineMenuElement) {
            globalInlineMenuElement.detach(gridFocus);
        }
    }
    var InlineMenuEditor = /** @class */ (function (_super) {
        __extends(InlineMenuEditor, _super);
        function InlineMenuEditor(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._classList = options.classList || '';
            _this._options = menuItems.normalizeToFn(options.options);
            _this._autoWidth = options.autoWidth || false;
            return _this;
        }
        InlineMenuEditor.prototype.dispose = function () {
            // nothing
        };
        Object.defineProperty(InlineMenuEditor.prototype, "classList", {
            get: function () {
                if (!this._classList) {
                    return undefined;
                }
                return Array.isArray(this._classList) ? this._classList : [this._classList];
            },
            set: function (classList) {
                this._classList = classList;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineMenuEditor.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (options) {
                this._options = menuItems.normalizeToFn(options);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineMenuEditor.prototype, "autoWidth", {
            get: function () {
                return this._autoWidth;
            },
            set: function (autoWidth) {
                this._autoWidth = autoWidth;
            },
            enumerable: false,
            configurable: true
        });
        InlineMenuEditor.prototype.clone = function () {
            return new InlineMenuEditor(this);
        };
        InlineMenuEditor.prototype.onChangeDisabledInternal = function () {
            // cancel input
            detachMenu(true);
        };
        InlineMenuEditor.prototype.onChangeReadOnlyInternal = function () {
            // cancel input
            detachMenu(true);
        };
        InlineMenuEditor.prototype.bindGridEvent = function (grid, cellId) {
            var _this = this;
            var open = function (cell) {
                var allowOpen = !isReadOnlyRecord(_this.readOnly, grid, cell.row) &&
                    !isDisabledRecord(_this.disabled, grid, cell.row);
                if (allowOpen) {
                    grid.doGetCellValue(cell.col, cell.row, function (value) {
                        var record = grid.getRowRecord(cell.row);
                        if (isPromise(record)) {
                            return;
                        }
                        attachMenu(grid, cell, _this, value, record);
                    });
                }
                return allowOpen;
            };
            function isTarget(col, row) {
                return grid.getLayoutCellId(col, row) === cellId;
            }
            return [
                grid.listen(DG_EVENT_TYPE.CLICK_CELL, function (cell) {
                    if (!isTarget(cell.col, cell.row)) {
                        return;
                    }
                    open({
                        col: cell.col,
                        row: cell.row,
                    });
                }),
                grid.listen(DG_EVENT_TYPE.KEYDOWN, function (e) {
                    if ((e.keyCode !== KEY_F2 && e.keyCode !== KEY_ENTER) ||
                        (e.keyCode === KEY_ENTER && e.event.shiftKey)) {
                        return;
                    }
                    var sel = grid.selection.select;
                    if (!isTarget(sel.col, sel.row)) {
                        return;
                    }
                    if (open({
                        col: sel.col,
                        row: sel.row,
                    })) {
                        event.cancel(e.event);
                        e.stopCellMoving();
                    }
                }),
                grid.listen(DG_EVENT_TYPE.SELECTED_CELL, function (e) {
                    detachMenu();
                }),
                grid.listen(DG_EVENT_TYPE.SCROLL, function () {
                    detachMenu(true);
                }),
                // mouse move
                grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, function (e) {
                    if (!isTarget(e.col, e.row)) {
                        return;
                    }
                    if (isReadOnlyRecord(_this.readOnly, grid, e.row) ||
                        isDisabledRecord(_this.disabled, grid, e.row)) {
                        return;
                    }
                    grid.getElement().style.cursor = 'pointer';
                }),
                grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, function (e) {
                    if (!isTarget(e.col, e.row)) {
                        return;
                    }
                    if (isReadOnlyRecord(_this.readOnly, grid, e.row) ||
                        isDisabledRecord(_this.disabled, grid, e.row)) {
                        return;
                    }
                    if (!grid.getElement().style.cursor) {
                        grid.getElement().style.cursor = 'pointer';
                    }
                }),
                grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, function (e) {
                    if (!isTarget(e.col, e.row)) {
                        return;
                    }
                    grid.getElement().style.cursor = '';
                }),
                // paste value
                grid.listen(DG_EVENT_TYPE.PASTE_CELL, function (e) {
                    if (e.multi) {
                        // ignore multi cell values
                        return;
                    }
                    var selectionRange = grid.selection.range;
                    if (!cellEquals(selectionRange.start, selectionRange.end)) {
                        // ignore multi paste values
                        return;
                    }
                    if (!isTarget(e.col, e.row)) {
                        return;
                    }
                    if (isReadOnlyRecord(_this.readOnly, grid, e.row) ||
                        isDisabledRecord(_this.disabled, grid, e.row)) {
                        return;
                    }
                    var record = grid.getRowRecord(e.row);
                    if (isPromise(record)) {
                        return;
                    }
                    var pasteOpt = _this._pasteDataToOptionValue(e.normalizeValue, grid, e, record);
                    if (pasteOpt) {
                        event.cancel(e.event);
                        then(grid.doChangeValue(e.col, e.row, function () { return pasteOpt.value; }), function () {
                            var range = grid.getCellRange(e.col, e.row);
                            grid.invalidateCellRange(range);
                        });
                    }
                }),
            ];
        };
        InlineMenuEditor.prototype.onPasteCellRangeBox = function (grid, cell, value) {
            if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
                isDisabledRecord(this.disabled, grid, cell.row)) {
                return;
            }
            var record = grid.getRowRecord(cell.row);
            if (isPromise(record)) {
                return;
            }
            var pasteOpt = this._pasteDataToOptionValue(value, grid, cell, record);
            if (pasteOpt) {
                grid.doChangeValue(cell.col, cell.row, function () { return pasteOpt.value; });
            }
        };
        InlineMenuEditor.prototype.onDeleteCellRangeBox = function (grid, cell) {
            if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
                isDisabledRecord(this.disabled, grid, cell.row)) {
                return;
            }
            var record = grid.getRowRecord(cell.row);
            if (isPromise(record)) {
                return;
            }
            var pasteOpt = this._pasteDataToOptionValue('', grid, cell, record);
            if (pasteOpt) {
                grid.doChangeValue(cell.col, cell.row, function () { return pasteOpt.value; });
            }
        };
        InlineMenuEditor.prototype._pasteDataToOptionValue = function (value, grid, cell, record) {
            var options = this._options(record);
            var pasteOpt = _textToOptionValue(value, options);
            if (pasteOpt) {
                return pasteOpt;
            }
            var columnType = grid.getColumnType(cell.col, cell.row);
            if (hasOptions(columnType)) {
                // Find with caption.
                var pasteValue_1 = normalizePasteValueStr(value);
                var captionOpt = array.find(columnType.options, function (opt) { return normalizePasteValueStr(opt.label) === pasteValue_1; });
                if (captionOpt) {
                    return _textToOptionValue(captionOpt.value, options);
                }
            }
            return undefined;
        };
        return InlineMenuEditor;
    }(Editor));
    function _textToOptionValue(value, options) {
        var pasteValue = normalizePasteValueStr(value);
        var pasteOpt = array.find(options, function (opt) { return normalizePasteValueStr(opt.value) === pasteValue; });
        if (pasteOpt) {
            return pasteOpt;
        }
        return undefined;
    }
    function normalizePasteValueStr(value) {
        if (value == null) {
            return '';
        }
        return ("" + value).trim();
    }
    function hasOptions(columnType) {
        if (columnType instanceof MenuColumn) {
            return true;
        }
        if (Array.isArray(columnType.options)) {
            return true;
        }
        return false;
    }

    var InlineTextAreaElementCss = ".kaka-grid__inline-textarea::-ms-clear {\n  visibility: hidden;\n}\n\n.kaka-grid__inline-textarea {\n  position: absolute;\n  box-sizing: border-box;\n  overflow: hidden;\n  padding: 0;\n  border: none;\n}\n";

    var CLASSNAME_ITAE = 'kaka-grid__inline-textarea';
    function createInputElement$1() {
        style$1.inject('InlineTextAreaElement', InlineTextAreaElementCss);
        return createElement('textarea', { classList: CLASSNAME_ITAE });
    }
    var BEFORE_TEXTAREA_VALUE = 'before_value';
    function inputAutoHeight(input) {
        var h = input.style.minHeight;
        input.style.minHeight = '0px';
        input.style.height = '0px';
        input.style.height = input.scrollHeight + 'px';
        input.style.minHeight = h;
    }
    function setTextInputValue(input, value, inputValue) {
        if (isDef(value)) {
            input.value = value;
        }
        else {
            input.value = '';
        }
        input.dataset[BEFORE_TEXTAREA_VALUE] = input.value;
        if (inputValue) {
            input.value = inputValue;
        }
        inputAutoHeight(input);
    }
    function getTextInputValue(input) {
        return input.value;
    }
    function isTextInputValueChanged(input) {
        return input.value !== input.dataset[BEFORE_TEXTAREA_VALUE];
    }
    var InlineTextAreaElement = /** @class */ (function () {
        function InlineTextAreaElement() {
            this._attaching = false;
            this._handler = new EventHandler();
            this._input = createInputElement$1();
            this._bindInputEvents();
        }
        InlineTextAreaElement.setInputAttrs = function (editor, _grid, input) {
            var _a;
            var classList = editor.classList;
            if (classList) {
                (_a = input.classList).add.apply(_a, classList);
            }
        };
        InlineTextAreaElement.prototype.dispose = function () {
            this.detach();
            this._handler.dispose();
            delete this._beforePropEditor;
        };
        InlineTextAreaElement.prototype.attach = function (grid, editor, col, row, value, inputValue) {
            var _a;
            var _this = this;
            var input = this._input;
            if (input.parentElement) {
                // 参见 InlineInputElement.ts
                return;
            }
            var handler = this._handler;
            if (this._beforePropEditor) {
                var classList = this._beforePropEditor.classList;
                if (classList) {
                    (_a = input.classList).remove.apply(_a, classList);
                }
            }
            input.style.font = grid.font || '16px sans-serif';
            var _b = grid.getAttachCellsArea(grid.getCellRange(col, row)), element = _b.element, rect = _b.rect, padding = _b.padding;
            input.style.top = rect.top.toFixed() + "px";
            input.style.left = rect.left.toFixed() + "px";
            input.style.minWidth = rect.width.toFixed() + "px";
            input.style.width = input.style.minWidth;
            input.style.minHeight = rect.height.toFixed() + "px";
            input.style.height = input.style.minHeight;
            input.style.paddingTop = padding[0] + "px";
            input.style.paddingRight = padding[1] + "px";
            input.style.paddingBottom = padding[2] + "px";
            input.style.paddingLeft = padding[3] + "px";
            element.appendChild(input);
            InlineTextAreaElement.setInputAttrs(editor, grid, input);
            setTextInputValue(input, value, inputValue);
            this._activeData = { grid: grid, col: col, row: row, editor: editor };
            this._beforePropEditor = editor;
            var focus = function () {
                input.focus();
                var end = input.value.length;
                try {
                    if (typeof input.selectionStart !== 'undefined') {
                        input.selectionStart = end;
                        input.selectionEnd = end;
                        return;
                    }
                }
                catch (e) {
                    // ignore
                }
                if (document.selection) {
                    var range = input.createTextRange();
                    range.collapse();
                    range.moveEnd('character', end);
                    range.moveStart('character', end);
                    range.select();
                }
            };
            var safeInputFocus = function () {
                handler.tryWithOffEvents(input, 'blur', function () {
                    focus();
                });
                var state = getInlineEditingState(grid);
                state.cellRange = grid.getCellRange(col, row);
                grid.invalidateCellRange(state.cellRange);
            };
            this._attaching = true;
            setTimeout(function () {
                safeInputFocus();
                _this._attaching = false;
            });
        };
        InlineTextAreaElement.prototype.detach = function (gridFocus) {
            if (this._isActive()) {
                var activeData = this._activeData;
                var grid = activeData.grid;
                var col = activeData.col;
                var row = activeData.row;
                var input_1 = this._input;
                this._handler.tryWithOffEvents(input_1, 'blur', function () {
                    if (input_1.parentElement) {
                        input_1.parentElement.removeChild(input_1);
                    }
                });
                var state = getInlineEditingState(grid);
                delete state.cellRange;
                var range = grid.getCellRange(col, row);
                grid.invalidateCellRange(range);
                if (gridFocus) {
                    grid.focus();
                }
            }
            delete this._activeData;
        };
        InlineTextAreaElement.prototype.doChangeValue = function () {
            if (!this._isActive()) {
                return;
            }
            if (isTextInputValueChanged(this._input)) {
                var value_1 = getTextInputValue(this._input);
                var activeData = this._activeData;
                var grid = activeData.grid;
                var col = activeData.col;
                var row = activeData.row;
                grid.doChangeValue(col, row, function () { return value_1; });
            }
        };
        InlineTextAreaElement.prototype._isActive = function () {
            var input = this._input;
            if (!input || !input.parentElement) {
                return false;
            }
            if (!this._activeData) {
                return false;
            }
            return true;
        };
        InlineTextAreaElement.prototype._bindInputEvents = function () {
            var _this = this;
            var handler = this._handler;
            var input = this._input;
            var stopPropagationOnly = function (e) { return e.stopPropagation(); }; // grid为了不在活动中传播
            handler.on(input, 'click', stopPropagationOnly);
            handler.on(input, 'mousedown', stopPropagationOnly);
            handler.on(input, 'touchstart', stopPropagationOnly);
            handler.on(input, 'dblclick', stopPropagationOnly);
            handler.on(input, 'compositionstart', function (e) {
                input.classList.add('composition');
            });
            handler.on(input, 'compositionend', function (e) {
                input.classList.remove('composition');
            });
            handler.on(input, 'keydown', function (e) {
                if (input.classList.contains('composition')) {
                    return;
                }
                var keyCode = event.getKeyCode(e);
                if (keyCode === KEY_ESC) {
                    _this.detach(true);
                    event.cancel(e);
                }
                else if (keyCode === KEY_ENTER) {
                    _this._onKeydownEnter(e, input);
                }
                else if (keyCode === KEY_TAB) {
                    _this._onKeydownTab(e);
                }
            });
            handler.on(input, 'blur', function (e) {
                _this.doChangeValue();
                _this.detach();
            });
            handler.on(input, 'input', function (e) {
                inputAutoHeight(input);
            });
        };
        InlineTextAreaElement.prototype._onKeydownEnter = function (e, input) {
            var _a;
            if (!this._isActive() || this._attaching) {
                return;
            }
            if (e.altKey || e.ctrlKey) {
                input.setRangeText('\n');
                input.selectionStart++;
                setTimeout(function () {
                    inputAutoHeight(input);
                }, 0);
                event.cancel(e);
            }
            else {
                var grid = this._activeData.grid;
                this.doChangeValue();
                this.detach(true);
                if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) {
                    grid.onKeyDownMove(e);
                }
                event.cancel(e);
            }
        };
        InlineTextAreaElement.prototype._onKeydownTab = function (e) {
            var _a;
            if (!this._isActive() || this._attaching) {
                return;
            }
            var grid = this._activeData.grid;
            if ((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab) {
                return;
            }
            this.doChangeValue();
            this.detach(true);
            grid.onKeyDownMove(e);
        };
        return InlineTextAreaElement;
    }());

    var INLINE_TEXTAREA_EDITOR_STATE_ID = getInlineTextareaEditorStateId();
    var globalInlineTextAreaElement = null;
    var globalInlineInputBindGridCount$1 = 0;
    function attachInput$1(grid, cell, editor, value, inputValue) {
        if (!globalInlineTextAreaElement) {
            globalInlineTextAreaElement = new InlineTextAreaElement();
        }
        var state = editor.getState(grid);
        if (!state.element) {
            state.element = globalInlineTextAreaElement;
            globalInlineInputBindGridCount$1++;
            grid.addDisposable({
                dispose: function () {
                    globalInlineInputBindGridCount$1--;
                    if (!globalInlineInputBindGridCount$1 && globalInlineTextAreaElement) {
                        globalInlineTextAreaElement.dispose();
                        globalInlineTextAreaElement = null;
                    }
                },
            });
        }
        globalInlineTextAreaElement.attach(grid, editor, cell.col, cell.row, value, inputValue);
    }
    function detachInput$1(gridFocus) {
        if (globalInlineTextAreaElement) {
            globalInlineTextAreaElement.detach(gridFocus);
        }
    }
    function doChangeValue$1(grid) {
        if (globalInlineTextAreaElement) {
            globalInlineTextAreaElement.doChangeValue();
        }
    }
    var InlineTextAreaEditor = /** @class */ (function (_super) {
        __extends(InlineTextAreaEditor, _super);
        function InlineTextAreaEditor(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._classList = options.classList || '';
            return _this;
        }
        Object.defineProperty(InlineTextAreaEditor.prototype, "classList", {
            get: function () {
                return (this._classList &&
                    (Array.isArray(this._classList) ? this._classList : [this._classList]));
            },
            set: function (classList) {
                this._classList = classList;
            },
            enumerable: false,
            configurable: true
        });
        InlineTextAreaEditor.prototype.clone = function () {
            return new InlineTextAreaEditor(this);
        };
        InlineTextAreaEditor.prototype.onActionInputCellInternal = function (grid, cell, inputValue) {
            var _this = this;
            grid.doGetCellValue(cell.col, cell.row, function (value) {
                attachInput$1(grid, cell, _this, value, inputValue);
            });
        };
        InlineTextAreaEditor.prototype.onActionOpenCellInternal = function (grid, cell) {
            var _this = this;
            grid.doGetCellValue(cell.col, cell.row, function (value) {
                attachInput$1(grid, cell, _this, value);
            });
        };
        InlineTextAreaEditor.prototype.onChangeSelectCellInternal = function (grid, cell, selected) {
            doChangeValue$1();
            detachInput$1();
        };
        InlineTextAreaEditor.prototype.onGridScrollInternal = function (grid) {
            doChangeValue$1();
            detachInput$1(true);
        };
        InlineTextAreaEditor.prototype.onChangeDisabledInternal = function () {
            // cancel input
            detachInput$1(true);
        };
        InlineTextAreaEditor.prototype.onChangeReadOnlyInternal = function () {
            // cancel input
            detachInput$1(true);
        };
        InlineTextAreaEditor.prototype.onSetInputAttrsInternal = function (grid, _cell, input) {
            InlineTextAreaElement.setInputAttrs(this, grid, input);
        };
        InlineTextAreaEditor.prototype.getState = function (grid) {
            if (!grid[INLINE_TEXTAREA_EDITOR_STATE_ID]) {
                obj.setReadonly(grid, INLINE_TEXTAREA_EDITOR_STATE_ID, {});
            }
            return grid[INLINE_TEXTAREA_EDITOR_STATE_ID];
        };
        return InlineTextAreaEditor;
    }(BaseActionInput));

    var RADIO_COLUMN_STATE_ID = getRadioColumnStateId();
    var defaultGroupResolver = function (_a) {
        var grid = _a.grid, col = _a.col, row = _a.row;
        var cellId = grid.getLayoutCellId(col, row);
        var recordStartRow = grid.getRecordStartRowByRecordIndex(grid.getRecordIndexByRow(row));
        var offsetRow = row - recordStartRow;
        var result = [];
        var rowCount = grid.rowCount, recordRowCount = grid.recordRowCount;
        for (var targetRow = grid.frozenRowCount + offsetRow; targetRow < rowCount; targetRow += recordRowCount) {
            if (grid.getLayoutCellId(col, targetRow) === cellId) {
                result.push({ col: col, row: targetRow });
            }
        }
        return result;
    };
    var RadioEditor = /** @class */ (function (_super) {
        __extends(RadioEditor, _super);
        function RadioEditor(option) {
            if (option === void 0) { option = {}; }
            var _this = _super.call(this, option) || this;
            _this._group = option.group || defaultGroupResolver;
            return _this;
        }
        RadioEditor.prototype.clone = function () {
            return new RadioEditor(this);
        };
        Object.defineProperty(RadioEditor.prototype, "group", {
            get: function () {
                return this._group;
            },
            set: function (group) {
                this._group = group;
            },
            enumerable: false,
            configurable: true
        });
        RadioEditor.prototype.bindGridEvent = function (grid, cellId) {
            var _this = this;
            var _state = grid[RADIO_COLUMN_STATE_ID];
            if (!_state) {
                _state = { block: {}, elapsed: {} };
                obj.setReadonly(grid, RADIO_COLUMN_STATE_ID, _state);
            }
            var state = _state;
            var action = function (cell) {
                _this._action(grid, cell);
            };
            function isTarget(col, row) {
                return grid.getLayoutCellId(col, row) === cellId;
            }
            return __spreadArrays(bindCellClickAction(grid, cellId, {
                action: action,
                mouseOver: function (e) {
                    if (isDisabledRecord(_this.disabled, grid, e.row)) {
                        return false;
                    }
                    state.mouseActiveCell = {
                        col: e.col,
                        row: e.row,
                    };
                    var range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                    return true;
                },
                mouseOut: function (e) {
                    delete state.mouseActiveCell;
                    var range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                },
            }), bindCellKeyAction(grid, cellId, {
                action: action,
            }), [
                // paste value
                grid.listen(DG_EVENT_TYPE.PASTE_CELL, function (e) {
                    if (e.multi) {
                        // ignore multi cell values
                        return;
                    }
                    var selectionRange = grid.selection.range;
                    if (!cellEquals(selectionRange.start, selectionRange.end)) {
                        // ignore multi paste values
                        return;
                    }
                    if (!isTarget(e.col, e.row)) {
                        return;
                    }
                    var pasteValue = e.normalizeValue.trim();
                    if (!toBoolean(pasteValue)) {
                        return;
                    }
                    event.cancel(e.event);
                    action({
                        col: e.col,
                        row: e.row,
                    });
                }),
            ]);
        };
        RadioEditor.prototype.onPasteCellRangeBox = function (grid, cell, value) {
            if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
                isDisabledRecord(this.disabled, grid, cell.row)) {
                return;
            }
            var pasteValue = value.trim();
            if (!toBoolean(pasteValue)) {
                return;
            }
            this._action(grid, {
                col: cell.col,
                row: cell.row,
            });
        };
        RadioEditor.prototype.onDeleteCellRangeBox = function () {
            // noop
        };
        RadioEditor.prototype._action = function (grid, cell) {
            var _this = this;
            var state = grid[RADIO_COLUMN_STATE_ID];
            var range = grid.getCellRange(cell.col, cell.row);
            var cellKey = range.start.col + ":" + range.start.row;
            if (isReadOnlyRecord(this.readOnly, grid, cell.row) ||
                isDisabledRecord(this.disabled, grid, cell.row) ||
                state.block[cellKey]) {
                return;
            }
            grid.doGetCellValue(cell.col, cell.row, function (value) {
                if (toBoolean(value)) {
                    return;
                }
                var targets = _this._group({ grid: grid, col: cell.col, row: cell.row });
                targets.forEach(function (_a) {
                    var col = _a.col, row = _a.row;
                    var range = grid.getCellRange(col, row);
                    var cellKey = range.start.col + ":" + range.start.row;
                    if (isReadOnlyRecord(_this.readOnly, grid, cell.row) ||
                        isDisabledRecord(_this.disabled, grid, cell.row) ||
                        state.block[cellKey]) {
                        return;
                    }
                    actionCell(grid, col, row, col === cell.col && row === cell.row);
                });
            });
        };
        return RadioEditor;
    }(Editor));
    function actionCell(grid, col, row, flag) {
        grid.doGetCellValue(col, row, function (value) {
            if (toBoolean(value) === flag) {
                return;
            }
            var state = grid[RADIO_COLUMN_STATE_ID];
            var range = grid.getCellRange(col, row);
            var cellKey = range.start.col + ":" + range.start.row;
            var ret = grid.doChangeValue(col, row, toggleValue);
            if (ret) {
                var onChange_1 = function () {
                    // checkbox animation
                    animate(200, function (point) {
                        if (point === 1) {
                            delete state.elapsed[cellKey];
                        }
                        else {
                            state.elapsed[cellKey] = point;
                        }
                        grid.invalidateCellRange(range);
                    });
                };
                if (isPromise(ret)) {
                    state.block[cellKey] = true;
                    ret.then(function () {
                        delete state.block[cellKey];
                        onChange_1();
                    });
                }
                else {
                    onChange_1();
                }
            }
        });
    }

    var smallDialogInputElementCss = ".kaka-grid__small-dialog-input__input::-ms-clear {\n  visibility: hidden;\n}\n\n@keyframes kaka-grid__small-dialog-input--hidden-animation {\n  0% {\n    opacity: 1;\n  }\n  99% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n.kaka-grid__small-dialog-input {\n  position: absolute;\n  box-sizing: content-box;\n  margin: -1px auto auto -1px;\n  border-radius: 3px;\n  background-color: #fafafa;\n  transition: padding 150ms ease-out, box-shadow 150ms ease-out;\n}\n\n.kaka-grid__small-dialog-input--hidden {\n  box-shadow: none;\n  padding: 0;\n  pointer-events: none;\n  animation: kaka-grid__small-dialog-input--hidden-animation 150ms ease-out;\n  opacity: 0;\n}\n\n.kaka-grid__small-dialog-input--shown {\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12);\n  padding: 8px 24px;\n}\n\n.kaka-grid__small-dialog-input__input {\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  padding: 3px 2px 0 4px;\n  border: none;\n  border-bottom: solid 1px rgba(0, 0, 0, 0.87);\n  outline: none;\n  background-color: transparent;\n  transition: all 300ms ease-out;\n}\n\n.kaka-grid__small-dialog-input__input:focus {\n  border-bottom: solid 1px #2196f3;\n  box-shadow: 0 1px 0 0 #2196f3;\n}\n\n.kaka-grid__small-dialog-input::after {\n  content: '';\n  font-family: Roboto;\n  font-size: 12px;\n  font-size: 0.75rem;\n  min-height: 1em;\n  line-height: 1;\n  display: block;\n  width: 100%;\n  padding-top: 8px;\n}\n\n.kaka-grid__small-dialog-input.helper-text--right-justified::after {\n  text-align: right;\n}\n\n.kaka-grid__small-dialog-input[data-helper-text]::after {\n  content: attr(data-helper-text);\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.kaka-grid__small-dialog-input[data-error-message] input {\n  border-bottom: solid 1px #ff1744;\n  box-shadow: 0 1px 0 0 #ff1744;\n}\n\n.kaka-grid__small-dialog-input[data-error-message]::after {\n  content: attr(data-error-message);\n  color: #ff1744;\n  text-align: left;\n}\n";

    var CLASSNAME_SDE = 'kaka-grid__small-dialog-input';
    var INPUT_CLASSNAME_SDE = CLASSNAME_SDE + "__input";
    var HIDDEN_CLASSNAME_SDE = CLASSNAME_SDE + "--hidden";
    var SHOWN_CLASSNAME_SDE = CLASSNAME_SDE + "--shown";
    function _focus(input, handler) {
        var focus = function () {
            input.focus();
            var end = input.value.length;
            try {
                if (typeof input.selectionStart !== 'undefined') {
                    input.selectionStart = end;
                    input.selectionEnd = end;
                    return;
                }
            }
            catch (e) {
                // ignore
            }
            if (document.selection) {
                var range = input.createTextRange();
                range.collapse();
                range.moveEnd('character', end);
                range.moveStart('character', end);
                range.select();
            }
        };
        handler.tryWithOffEvents(input, 'blur', function () {
            focus();
        });
    }
    function createDialogElement() {
        style$1.inject('smallDialogInputElement', smallDialogInputElementCss);
        var element = createElement('div', {
            classList: [CLASSNAME_SDE, HIDDEN_CLASSNAME_SDE],
        });
        var input = createElement('input', { classList: INPUT_CLASSNAME_SDE });
        // input.readOnly = true;
        input.tabIndex = -1;
        element.appendChild(input);
        return element;
    }
    function bindProps(grid, dialog, input, editor) {
        var _a;
        var classList = editor.classList, helperText = editor.helperText;
        if (classList) {
            (_a = dialog.classList).add.apply(_a, classList);
        }
        if (helperText && typeof helperText !== 'function') {
            dialog.dataset.helperText = helperText;
        }
        setInputAttrs$1(editor, grid, input);
    }
    function unbindProps(_grid, dialog, input, editor) {
        var _a;
        var classList = editor.classList;
        if (classList) {
            (_a = dialog.classList).remove.apply(_a, classList);
        }
        delete dialog.dataset.helperText;
        input.type = '';
    }
    function setInputAttrs$1(editor, _grid, input) {
        var type = editor.type;
        input.type = type || '';
    }
    var SmallDialogInputElement = /** @class */ (function () {
        function SmallDialogInputElement() {
            this._handler = new EventHandler();
            this._dialog = createDialogElement();
            this._input = this._dialog.querySelector("." + INPUT_CLASSNAME_SDE);
            this._bindDialogEvents();
        }
        SmallDialogInputElement.setInputAttrs = function (editor, grid, input) {
            setInputAttrs$1(editor, grid, input);
        };
        SmallDialogInputElement.prototype.dispose = function () {
            var dialog = this._dialog;
            this.detach();
            this._handler.dispose();
            this._beforePropEditor = null;
            if (dialog.parentElement) {
                dialog.parentElement.removeChild(dialog);
            }
        };
        SmallDialogInputElement.prototype.attach = function (grid, editor, col, row, value) {
            var _this = this;
            var handler = this._handler;
            var dialog = this._dialog;
            var input = this._input;
            if (this._beforePropEditor) {
                unbindProps(grid, dialog, input, this._beforePropEditor);
            }
            delete dialog.dataset.errorMessage;
            dialog.classList.remove(SHOWN_CLASSNAME_SDE);
            dialog.classList.add(HIDDEN_CLASSNAME_SDE);
            // input.readOnly = false;
            input.tabIndex = 0;
            var _a = grid.getAttachCellsArea(grid.getCellRange(col, row)), element = _a.element, rect = _a.rect;
            dialog.style.top = rect.top.toFixed() + "px";
            dialog.style.left = rect.left.toFixed() + "px";
            dialog.style.width = rect.width.toFixed() + "px";
            input.style.height = rect.height.toFixed() + "px";
            element.appendChild(dialog);
            setInputValue(input, value);
            input.style.font = grid.font || '16px sans-serif';
            var activeData = { grid: grid, col: col, row: row, editor: editor };
            this._onInputValue(input, activeData);
            if (!browser.IE) {
                _focus(input, handler);
            }
            else {
                // On the paste-event on IE, since it may not be focused, it will be delayed and focused.
                setTimeout(function () { return _focus(input, handler); });
            }
            dialog.classList.add(SHOWN_CLASSNAME_SDE);
            dialog.classList.remove(HIDDEN_CLASSNAME_SDE);
            // input.readOnly = true;
            bindProps(grid, dialog, input, editor);
            this._activeData = activeData;
            this._beforePropEditor = editor;
            this._attaching = true;
            setTimeout(function () {
                delete _this._attaching;
            });
        };
        SmallDialogInputElement.prototype.detach = function (gridFocus) {
            if (this._isActive()) {
                var dialog = this._dialog;
                var input = this._input;
                dialog.classList.remove(SHOWN_CLASSNAME_SDE);
                dialog.classList.add(HIDDEN_CLASSNAME_SDE);
                // input.readOnly = false;
                input.tabIndex = -1;
                var _a = this._activeData, grid = _a.grid, col = _a.col, row = _a.row;
                var range = grid.getCellRange(col, row);
                grid.invalidateCellRange(range);
                if (gridFocus) {
                    grid.focus();
                }
            }
            this._activeData = null;
            this._beforeValue = null;
        };
        SmallDialogInputElement.prototype._doChangeValue = function () {
            var _this = this;
            if (!this._isActive()) {
                return false;
            }
            var input = this._input;
            var value = input.value;
            return then(this._validate(value), function (res) {
                if (res && value === input.value) {
                    var _a = _this._activeData, grid = _a.grid, col = _a.col, row = _a.row;
                    grid.doChangeValue(col, row, function () { return value; });
                    return true;
                }
                return false;
            });
        };
        SmallDialogInputElement.prototype._isActive = function () {
            var dialog = this._dialog;
            if (!dialog || !dialog.parentElement) {
                return false;
            }
            if (!this._activeData) {
                return false;
            }
            return true;
        };
        SmallDialogInputElement.prototype._bindDialogEvents = function () {
            var _this = this;
            var handler = this._handler;
            var dialog = this._dialog;
            var input = this._input;
            var stopPropagationOnly = function (e) { return e.stopPropagation(); }; // 终止事件传播
            handler.on(dialog, 'click', stopPropagationOnly);
            handler.on(dialog, 'dblclick', stopPropagationOnly);
            handler.on(dialog, 'mousedown', stopPropagationOnly);
            handler.on(dialog, 'touchstart', stopPropagationOnly);
            handler.on(input, 'compositionstart', function (e) {
                input.classList.add('composition');
            });
            handler.on(input, 'compositionend', function (e) {
                input.classList.remove('composition');
                _this._onInputValue(input);
            });
            var onKeyupAndPress = function (_e) {
                if (input.classList.contains('composition')) {
                    return;
                }
                _this._onInputValue(input);
            };
            handler.on(input, 'keyup', onKeyupAndPress);
            handler.on(input, 'keypress', onKeyupAndPress);
            handler.on(input, 'keydown', function (e) {
                if (input.classList.contains('composition')) {
                    return;
                }
                var keyCode = event.getKeyCode(e);
                if (keyCode === KEY_ESC) {
                    _this.detach(true);
                    event.cancel(e);
                }
                else if (keyCode === KEY_ENTER) {
                    _this._onKeydownEnter(e);
                }
                else if (keyCode === KEY_TAB) {
                    _this._onKeydownTab(e);
                }
                else {
                    _this._onInputValue(input);
                }
            });
        };
        SmallDialogInputElement.prototype._onKeydownEnter = function (e) {
            var _this = this;
            if (this._attaching) {
                return;
            }
            var input = this._input;
            var value = input.value;
            then(this._doChangeValue(), function (r) {
                var _a;
                if (r && value === input.value) {
                    var grid = _this._isActive() ? _this._activeData.grid : null;
                    _this.detach(true);
                    if ((_a = grid === null || grid === void 0 ? void 0 : grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) {
                        grid.onKeyDownMove(e);
                    }
                }
            });
            event.cancel(e);
        };
        SmallDialogInputElement.prototype._onKeydownTab = function (e) {
            var _this = this;
            var _a;
            if (!this._isActive() || this._attaching) {
                return;
            }
            var grid = this._activeData.grid;
            if (!((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab)) {
                return;
            }
            var input = this._input;
            var value = input.value;
            then(this._doChangeValue(), function (r) {
                if (r && value === input.value) {
                    _this.detach(true);
                    grid.onKeyDownMove(e);
                }
            });
            event.cancel(e);
        };
        SmallDialogInputElement.prototype._onInputValue = function (input, activeData) {
            var before = this._beforeValue;
            var value = input.value;
            if (before !== value) {
                this._onInputValueChange(value, activeData);
            }
            this._beforeValue = value;
        };
        SmallDialogInputElement.prototype._onInputValueChange = function (after, activeData) {
            activeData = (activeData || this._activeData);
            var dialog = this._dialog;
            var grid = activeData.grid, col = activeData.col, row = activeData.row, editor = activeData.editor;
            if (typeof editor.helperText === 'function') {
                var helperText = editor.helperText(after, { grid: grid, col: col, row: row });
                if (helperText) {
                    dialog.dataset.helperText = helperText;
                }
                else {
                    delete dialog.dataset.helperText;
                }
            }
            if ('errorMessage' in dialog.dataset) {
                this._validate(after, true);
            }
        };
        SmallDialogInputElement.prototype._validate = function (value, inputOnly) {
            var dialog = this._dialog;
            var input = this._input;
            var _a = this._activeData, grid = _a.grid, col = _a.col, row = _a.row, editor = _a.editor;
            var message = '';
            if (editor.inputValidator) {
                message = editor.inputValidator(value, { grid: grid, col: col, row: row });
            }
            return then(message, function (msg) {
                if (!msg && editor.validator && !inputOnly) {
                    msg = editor.validator(value, { grid: grid, col: col, row: row });
                }
                return then(msg, function (mess) {
                    if (mess && value === input.value) {
                        dialog.dataset.errorMessage = mess;
                    }
                    else {
                        delete dialog.dataset.errorMessage;
                    }
                    return !mess;
                });
            });
        };
        return SmallDialogInputElement;
    }());

    var SMALL_DIALOG_INPUT_EDITOR_STATE_ID = getSmallDialogInputEditorStateId();
    var globalSmallDialogInputElement = null;
    var globalSmallDialogInputBindGridCount = 0;
    function getState$1(grid) {
        var state = grid[SMALL_DIALOG_INPUT_EDITOR_STATE_ID];
        if (!state) {
            state = {};
            obj.setReadonly(grid, SMALL_DIALOG_INPUT_EDITOR_STATE_ID, state);
        }
        return state;
    }
    function attachDialogInput(grid, cell, editor, value) {
        var state = getState$1(grid);
        if (!globalSmallDialogInputElement) {
            globalSmallDialogInputElement = new SmallDialogInputElement();
        }
        if (!state.element) {
            state.element = globalSmallDialogInputElement;
            globalSmallDialogInputBindGridCount++;
            grid.addDisposable({
                dispose: function () {
                    globalSmallDialogInputBindGridCount--;
                    if (!globalSmallDialogInputBindGridCount &&
                        globalSmallDialogInputElement) {
                        globalSmallDialogInputElement.dispose();
                        globalSmallDialogInputElement = null;
                    }
                },
            });
        }
        globalSmallDialogInputElement.attach(grid, editor, cell.col, cell.row, value);
    }
    function detachDialogInput(gridFocus) {
        if (globalSmallDialogInputElement) {
            globalSmallDialogInputElement.detach(gridFocus);
        }
    }
    var SmallDialogInputEditor = /** @class */ (function (_super) {
        __extends(SmallDialogInputEditor, _super);
        function SmallDialogInputEditor(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._helperText = options.helperText;
            _this._inputValidator = options.inputValidator;
            _this._validator = options.validator;
            _this._classList = options.classList || '';
            _this._type = options.type || '';
            return _this;
        }
        SmallDialogInputEditor.prototype.dispose = function () {
            // noop
        };
        Object.defineProperty(SmallDialogInputEditor.prototype, "classList", {
            get: function () {
                if (!this._classList) {
                    return undefined;
                }
                return Array.isArray(this._classList) ? this._classList : [this._classList];
            },
            set: function (classList) {
                this._classList = classList;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SmallDialogInputEditor.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (type) {
                this._type = type;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SmallDialogInputEditor.prototype, "helperText", {
            get: function () {
                return this._helperText;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SmallDialogInputEditor.prototype, "inputValidator", {
            get: function () {
                return this._inputValidator;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SmallDialogInputEditor.prototype, "validator", {
            get: function () {
                return this._validator;
            },
            enumerable: false,
            configurable: true
        });
        SmallDialogInputEditor.prototype.clone = function () {
            return new SmallDialogInputEditor(this);
        };
        SmallDialogInputEditor.prototype.onInputCellInternal = function (grid, cell, inputValue) {
            attachDialogInput(grid, cell, this, inputValue);
        };
        SmallDialogInputEditor.prototype.onOpenCellInternal = function (grid, cell) {
            var _this = this;
            grid.doGetCellValue(cell.col, cell.row, function (value) {
                attachDialogInput(grid, cell, _this, value);
            });
        };
        SmallDialogInputEditor.prototype.onChangeSelectCellInternal = function (grid, cell, selected) {
            // cancel input
            detachDialogInput();
        };
        SmallDialogInputEditor.prototype.onGridScrollInternal = function (grid) {
            // cancel input
            detachDialogInput(true);
        };
        SmallDialogInputEditor.prototype.onChangeDisabledInternal = function () {
            // cancel input
            detachDialogInput(true);
        };
        SmallDialogInputEditor.prototype.onChangeReadOnlyInternal = function () {
            // cancel input
            detachDialogInput(true);
        };
        SmallDialogInputEditor.prototype.onSetInputAttrsInternal = function (grid, cell, input) {
            SmallDialogInputElement.setInputAttrs(this, grid, input);
        };
        return SmallDialogInputEditor;
    }(BaseInputEditor));

    var ImmutableCheckEditor = /** @class */ (function (_super) {
        __extends(ImmutableCheckEditor, _super);
        function ImmutableCheckEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ImmutableCheckEditor.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImmutableCheckEditor.prototype, "readOnly", {
            get: function () {
                return this._readOnly;
            },
            enumerable: false,
            configurable: true
        });
        return ImmutableCheckEditor;
    }(CheckEditor));

    var ImmutableRadioEditor = /** @class */ (function (_super) {
        __extends(ImmutableRadioEditor, _super);
        function ImmutableRadioEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ImmutableRadioEditor.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImmutableRadioEditor.prototype, "readOnly", {
            get: function () {
                return this._readOnly;
            },
            enumerable: false,
            configurable: true
        });
        return ImmutableRadioEditor;
    }(RadioEditor));

    var ImmutableInputEditor = /** @class */ (function (_super) {
        __extends(ImmutableInputEditor, _super);
        function ImmutableInputEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ImmutableInputEditor.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImmutableInputEditor.prototype, "readOnly", {
            get: function () {
                return this._readOnly;
            },
            enumerable: false,
            configurable: true
        });
        return ImmutableInputEditor;
    }(SmallDialogInputEditor));

    var ImmutableSwitchEditor = /** @class */ (function (_super) {
        __extends(ImmutableSwitchEditor, _super);
        function ImmutableSwitchEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ImmutableSwitchEditor.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImmutableSwitchEditor.prototype, "readOnly", {
            get: function () {
                return this._readOnly;
            },
            enumerable: false,
            configurable: true
        });
        return ImmutableSwitchEditor;
    }(SwitchEditor));

    var ACTIONS = {
        CHECK: new ImmutableCheckEditor(),
        RADIO: new ImmutableRadioEditor(),
        INPUT: new ImmutableInputEditor(),
        SWITCH: new ImmutableSwitchEditor(),
    };
    function of$1(columnAction) {
        if (!columnAction) {
            return undefined;
        }
        else if (typeof columnAction === 'string') {
            var key = columnAction.toUpperCase();
            return ACTIONS[key] || of$1(null);
        }
        else {
            return columnAction;
        }
    }

    var BaseCheckColumn = /** @class */ (function (_super) {
        __extends(BaseCheckColumn, _super);
        function BaseCheckColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._draw = options.draw;
            return _this;
        }
        Object.defineProperty(BaseCheckColumn.prototype, "draw", {
            get: function () {
                return this._draw;
            },
            enumerable: false,
            configurable: true
        });
        BaseCheckColumn.prototype.drawInternal = function (value, context, style, helper, grid, _a) {
            var getRecord = _a.getRecord;
            var textAlign = style.textAlign, textBaseline = style.textBaseline, borderColor = style.borderColor, checkBgColor = style.checkBgColor, uncheckBgColor = style.uncheckBgColor;
            var isCustomDraw = customDraw(helper, this.draw, value, context, grid, getRecord());
            if (!isCustomDraw) {
                var col = context.col, row = context.row;
                var range = grid.getCellRange(col, row);
                var cellKey = range.start.col + ":" + range.start.row;
                var state = this.getState(grid);
                var elapsed = state === null || state === void 0 ? void 0 : state.elapsed[cellKey];
                var opt = {
                    borderColor: borderColor,
                    checkBgColor: checkBgColor,
                    textAlign: textAlign,
                    textBaseline: textBaseline,
                    uncheckBgColor: uncheckBgColor,
                };
                if (isDef(elapsed)) {
                    opt.animElapsedTime = elapsed;
                }
                this.doDrawInternal(helper, value, context, opt);
            }
        };
        BaseCheckColumn.prototype.convertInternal = function (value) {
            return toBoolean(value);
        };
        return BaseCheckColumn;
    }(BaseColumn));

    var defaultBranchGraphStyle;
    var DEFAULT_BRANCH_COLORS = function (_name, index) {
        switch (index % 3) {
            case 0:
                return '#979797';
            case 1:
                return '#008fb5';
            case 2:
                return '#f1c109';
        }
        return '#979797';
    };
    var BranchGraphStyle = /** @class */ (function (_super) {
        __extends(BranchGraphStyle, _super);
        function BranchGraphStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, style) || this;
            _this._branchColors = style.branchColors || DEFAULT_BRANCH_COLORS;
            _this._margin = style.margin || 4;
            _this._circleSize = style.circleSize || 16;
            _this._branchLineWidth = style.branchLineWidth || 4;
            _this._mergeStyle = style.mergeStyle === 'straight' ? 'straight' : 'bezier';
            return _this;
        }
        Object.defineProperty(BranchGraphStyle, "DEFAULT", {
            get: function () {
                return defaultBranchGraphStyle
                    ? defaultBranchGraphStyle
                    : (defaultBranchGraphStyle = new BranchGraphStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BranchGraphStyle.prototype, "branchColors", {
            get: function () {
                return this._branchColors;
            },
            set: function (branchColors) {
                this._branchColors = branchColors;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BranchGraphStyle.prototype, "margin", {
            get: function () {
                return this._margin;
            },
            set: function (margin) {
                this._margin = margin;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BranchGraphStyle.prototype, "circleSize", {
            get: function () {
                return this._circleSize;
            },
            set: function (circleSize) {
                this._circleSize = circleSize;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BranchGraphStyle.prototype, "branchLineWidth", {
            get: function () {
                return this._branchLineWidth;
            },
            set: function (branchLineWidth) {
                this._branchLineWidth = branchLineWidth;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BranchGraphStyle.prototype, "mergeStyle", {
            get: function () {
                return this._mergeStyle;
            },
            set: function (mergeStyle) {
                this._mergeStyle = mergeStyle;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        BranchGraphStyle.prototype.clone = function () {
            return new BranchGraphStyle(this);
        };
        return BranchGraphStyle;
    }(BaseStyle));

    var BranchLine = /** @class */ (function () {
        function BranchLine(_a) {
            var fromIndex = _a.fromIndex, toIndex = _a.toIndex, colorIndex = _a.colorIndex, point = _a.point;
            this.fromIndex = fromIndex;
            this.toIndex = toIndex;
            this.colorIndex = colorIndex;
            this.point = point;
        }
        return BranchLine;
    }());

    var BranchPoint = /** @class */ (function () {
        function BranchPoint(_a) {
            var index = _a.index, _b = _a.commit, commit = _b === void 0 ? false : _b, _c = _a.lines, lines = _c === void 0 ? [] : _c, tag = _a.tag;
            this.index = index;
            this.commit = commit;
            this.lines = lines;
            this.tag = tag;
        }
        BranchPoint.mergeLines = function (lines) {
            var result = lines.filter(function (l) { return isDef(l.fromIndex) && isDef(l.toIndex); });
            var fromLines = lines.filter(function (l) { return isDef(l.fromIndex) && !isDef(l.toIndex); });
            var toLines = lines.filter(function (l) { return !isDef(l.fromIndex) && isDef(l.toIndex); });
            fromLines.forEach(function (f) {
                for (var i = 0; i < toLines.length; i++) {
                    var t = toLines[i];
                    if (t.point) {
                        continue;
                    }
                    if (f.colorIndex === t.colorIndex) {
                        f.toIndex = t.toIndex;
                        toLines.splice(i, 1);
                        break;
                    }
                }
                result.push(f);
            });
            return result.concat(toLines);
        };
        BranchPoint.merge = function (a, b) {
            if (!a) {
                return b;
            }
            return new BranchPoint({
                commit: a.commit || b.commit,
                index: a.index,
                lines: BranchPoint.mergeLines(a.lines.concat(b.lines)),
                tag: a.tag || b.tag,
            });
        };
        return BranchPoint;
    }());

    var BRANCH_GRAPH_COLUMN_STATE_ID = getBranchGraphColumnStateId();
    function getAllColumnData(grid, field, callback) {
        var dataSource = grid.dataSource;
        var allData = [];
        var promise;
        var _loop_1 = function (index) {
            var data = dataSource.getField(index, field);
            if (isPromise(data)) {
                var dataIndex_1 = allData.length;
                allData.push(undefined);
                if (!promise) {
                    promise = data.then(function (d) {
                        allData[dataIndex_1] = d;
                    });
                }
                else {
                    promise = promise
                        .then(function () { return data; })
                        .then(function (d) {
                        allData[dataIndex_1] = d;
                    });
                }
            }
            else {
                allData.push(data);
            }
        };
        for (var index = 0; index < dataSource.length; index++) {
            _loop_1(index);
        }
        if (promise) {
            promise.then(function () { return callback(allData); });
        }
        else {
            callback(allData);
        }
    }
    function joinLine(timeline, branchIndex) {
        var reverse = __spreadArrays(timeline).reverse();
        for (var i = 0; i < reverse.length; i++) {
            var f = reverse[i][branchIndex];
            if (f) {
                f.lines = BranchPoint.mergeLines(f.lines.concat([
                    new BranchLine({
                        colorIndex: branchIndex,
                        toIndex: branchIndex,
                    }),
                ]));
                for (var j = 0; j < i; j++) {
                    var tl = reverse[j];
                    tl[branchIndex] = new BranchPoint({
                        index: branchIndex,
                        lines: [
                            new BranchLine({
                                colorIndex: branchIndex,
                                fromIndex: branchIndex,
                                toIndex: branchIndex,
                            }),
                        ],
                    });
                }
                return true;
            }
        }
        return false;
    }
    function branch(_a, from, to) {
        var timeline = _a.timeline, branches = _a.branches;
        var fromIndex = from != null ? branches.indexOf(from) : -1;
        var toIndex = branches.indexOf(to);
        if (toIndex < 0) {
            toIndex = branches.length;
            branches.push(to);
        }
        function findBranchRootIndex() {
            for (var index = timeline.length - 1; index >= 0; index--) {
                var tl = timeline[index];
                var fromTL = tl[fromIndex];
                if (fromTL && fromTL.commit) {
                    return index;
                }
            }
            return -1;
        }
        if (fromIndex < 0) {
            return new BranchPoint({
                index: toIndex,
            });
        }
        else {
            var fromTargetIndex = findBranchRootIndex();
            if (fromTargetIndex === -1) {
                return null;
            }
            var branchTargetFromIndex = fromTargetIndex + 1;
            var branchPoint = new BranchPoint({
                index: toIndex,
                lines: [
                    new BranchLine({
                        colorIndex: toIndex,
                        fromIndex: fromIndex,
                    }),
                ],
            });
            var point = void 0;
            var result = null;
            if (branchTargetFromIndex < timeline.length) {
                var targetLine = timeline[branchTargetFromIndex];
                point = targetLine[toIndex] = BranchPoint.merge(targetLine[toIndex], branchPoint);
            }
            else {
                point = branchPoint;
                result = branchPoint;
            }
            var fromTL = timeline[fromTargetIndex][fromIndex];
            fromTL.lines = BranchPoint.mergeLines(fromTL.lines.concat([
                new BranchLine({
                    colorIndex: toIndex,
                    point: point,
                    toIndex: toIndex,
                }),
            ]));
            return result;
        }
    }
    function commit(_a, name) {
        var timeline = _a.timeline, branches = _a.branches;
        var index = branches.indexOf(name);
        if (index < 0) {
            return null;
        }
        var result = new BranchPoint({
            commit: true,
            index: index,
        });
        if (joinLine(timeline, index)) {
            result.lines = BranchPoint.mergeLines(result.lines.concat([
                new BranchLine({
                    colorIndex: index,
                    fromIndex: index,
                }),
            ]));
        }
        return result;
    }
    function commitTag(_a, name, tag) {
        var branches = _a.branches;
        var index = branches.indexOf(name);
        if (index < 0) {
            index = branches.length;
            branches.push(name);
        }
        return new BranchPoint({
            index: index,
            tag: tag,
        });
    }
    function commitMerge(_a, from, to) {
        var timeline = _a.timeline, branches = _a.branches;
        var fromIndex = branches.indexOf(from);
        var toIndex = branches.indexOf(to);
        if (toIndex < 0 || fromIndex < 0) {
            return new BranchPoint({
                index: toIndex,
                commit: true,
            });
        }
        var result = new BranchPoint({
            index: toIndex,
            commit: true,
            lines: [
                new BranchLine({
                    colorIndex: fromIndex,
                    fromIndex: fromIndex,
                }),
                new BranchLine({
                    colorIndex: toIndex,
                    fromIndex: toIndex,
                }),
            ],
        });
        var froms = __spreadArrays(timeline);
        var fromTargetLine = froms.pop();
        if (fromTargetLine) {
            fromTargetLine[fromIndex] = BranchPoint.merge(fromTargetLine[fromIndex], new BranchPoint({
                index: toIndex,
                lines: [
                    new BranchLine({
                        colorIndex: fromIndex,
                        toIndex: toIndex,
                    }),
                ],
            }));
        }
        if (joinLine(froms, fromIndex) && fromTargetLine) {
            fromTargetLine[fromIndex].lines = BranchPoint.mergeLines(fromTargetLine[fromIndex].lines.concat([
                new BranchLine({
                    colorIndex: fromIndex,
                    fromIndex: fromIndex,
                }),
            ]));
        }
        joinLine(timeline, toIndex);
        return result;
    }
    function calcCommand(info, command) {
        var timeline = info.timeline;
        var timelineData = [];
        // const last = timeline.length > 0 ? timeline[timeline.length - 1] : null;
        var commands = Array.isArray(command) ? command : [command];
        commands.forEach(function (cmd) {
            if (!cmd) {
                return;
            }
            var point;
            if (cmd.command === 'branch') {
                var from = obj.isObject(cmd.branch) ? cmd.branch.from : null;
                var to = obj.isObject(cmd.branch) ? cmd.branch.to : cmd.branch;
                point = branch(info, from, to);
            }
            else if (cmd.command === 'commit') {
                point = commit(info, cmd.branch);
            }
            else if (cmd.command === 'merge') {
                var from = cmd.branch.from;
                var to = cmd.branch.to;
                point = commitMerge(info, from, to);
            }
            else if (cmd.command === 'tag') {
                point = commitTag(info, cmd.branch, cmd.tag);
            }
            if (point && point.index > -1) {
                timelineData[point.index] = BranchPoint.merge(timelineData[point.index], point);
            }
        });
        timeline.push(timelineData);
    }
    function calcBranchesInfo(start, grid, field) {
        var result = {
            branches: [],
            timeline: [],
        };
        getAllColumnData(grid, field, function (data) {
            if (start !== 'top') {
                data = __spreadArrays(data).reverse();
            }
            data.forEach(function (command) {
                calcCommand(result, command);
            });
        });
        return result;
    }
    function calcBranchXPoints(ctx, left, width, radius, branches, timeline) {
        var w = Math.max(width / branches.length + 1, 5);
        timeline.forEach(function (tl) {
            tl.forEach(function (p, index) {
                if (index <= 0) {
                    // 没有计算的意义
                    return;
                }
                if (p.tag) {
                    var textWidth = ctx.measureText(p.tag).width;
                    if (w * index + radius * 2 + 4 + textWidth > width) {
                        w = Math.max((width - radius * 2 - 4 - textWidth) / index, 5);
                    }
                }
            });
        });
        var result = [];
        var x = left;
        branches.forEach(function () {
            result.push(Math.ceil(x + radius));
            x += w;
        });
        return result;
    }
    function renderMerge(grid, ctx, x, y, upLineIndex, downLineIndex, colorIndex, _a, _b) {
        var branchXPoints = _a.branchXPoints, 
        // margin,
        branchColors = _a.branchColors, branchLineWidth = _a.branchLineWidth, mergeStyle = _a.mergeStyle;
        var 
        // width,
        col = _b.col, row = _b.row, branches = _b.branches;
        if (isDef(upLineIndex) || isDef(downLineIndex)) {
            ctx.strokeStyle = getOrApply(branchColors, branches[colorIndex], colorIndex);
            ctx.lineWidth = branchLineWidth;
            ctx.lineCap = 'round';
            ctx.beginPath();
            if (isDef(upLineIndex)) {
                var upX = branchXPoints[upLineIndex];
                var upRect = grid.getCellRelativeRect(col, row - 1);
                var upY = upRect.top + upRect.height / 2;
                ctx.moveTo(upX, upY);
                if (mergeStyle === 'bezier') {
                    ctx.bezierCurveTo(upX, (y + upY) / 2, x, (y + upY) / 2, x, y);
                }
                else {
                    ctx.lineTo(x, y);
                }
            }
            else {
                ctx.moveTo(x, y);
            }
            if (isDef(downLineIndex)) {
                var downX = branchXPoints[downLineIndex];
                var downRect = grid.getCellRelativeRect(col, row + 1);
                var downY = downRect.top + downRect.height / 2;
                if (mergeStyle === 'bezier') {
                    ctx.bezierCurveTo(x, (y + downY) / 2, downX, (y + downY) / 2, downX, downY);
                }
                else {
                    ctx.lineTo(downX, downY);
                }
            }
            ctx.stroke();
        }
    }
    /**
     * BranchGraphColumn
     */
    var BranchGraphColumn = /** @class */ (function (_super) {
        __extends(BranchGraphColumn, _super);
        function BranchGraphColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._start = options.start || 'bottom';
            _this._cache = isDef(options.cache) ? options.cache : false;
            return _this;
        }
        Object.defineProperty(BranchGraphColumn.prototype, "StyleClass", {
            get: function () {
                return BranchGraphStyle;
            },
            enumerable: false,
            configurable: true
        });
        BranchGraphColumn.prototype.clearCache = function (grid) {
            delete grid[BRANCH_GRAPH_COLUMN_STATE_ID];
        };
        BranchGraphColumn.prototype.onDrawCell = function (cellValue, info, context, grid) {
            if (this._cache) {
                var state = grid[BRANCH_GRAPH_COLUMN_STATE_ID] ||
                    (grid[BRANCH_GRAPH_COLUMN_STATE_ID] = new Map());
                var col = context.col, row = context.row;
                var field = grid.getField(col, row);
                if (!state.has(field)) {
                    state.set(field, calcBranchesInfo(this._start, grid, field));
                }
            }
            return _super.prototype.onDrawCell.call(this, cellValue, info, context, grid);
        };
        BranchGraphColumn.prototype.clone = function () {
            return new BranchGraphColumn(this);
        };
        BranchGraphColumn.prototype.drawInternal = function (_value, context, style, helper, grid, _info) {
            var _a, _b;
            var col = context.col, row = context.row;
            var field = grid.getField(col, row);
            var _c = (_b = (this._cache ? (_a = grid[BRANCH_GRAPH_COLUMN_STATE_ID]) === null || _a === void 0 ? void 0 : _a.get(field) : null)) !== null && _b !== void 0 ? _b : calcBranchesInfo(this._start, grid, field), timeline = _c.timeline, branches = _c.branches;
            var _d = this._start !== 'top'
                ? { upLineIndexKey: 'toIndex', downLineIndexKey: 'fromIndex' }
                : { upLineIndexKey: 'fromIndex', downLineIndexKey: 'toIndex' }, upLineIndexKey = _d.upLineIndexKey, downLineIndexKey = _d.downLineIndexKey;
            var data = this._start !== 'top'
                ? timeline[timeline.length - (row - grid.frozenRowCount) - 1]
                : timeline[row - grid.frozenRowCount];
            var branchColors = style.branchColors, branchLineWidth = style.branchLineWidth, circleSize = style.circleSize, mergeStyle = style.mergeStyle, margin = style.margin;
            var rect = context.getRect();
            var radius = circleSize / 2;
            var width = rect.width - margin * 2;
            helper.drawWithClip(context, function (ctx) {
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                var branchXPoints = calcBranchXPoints(ctx, rect.left + margin, width, radius, branches, timeline);
                var y = rect.top + rect.height / 2;
                // draw join lines
                data
                    .map(function (point, index) {
                    return point
                        ? point.lines.map(function (line) { return ({
                            colorIndex: line.colorIndex,
                            downLineIndex: line[downLineIndexKey],
                            pointIndex: index,
                            upLineIndex: line[upLineIndexKey],
                        }); })
                        : [];
                })
                    .reduce(function (p, c) { return p.concat(c); }, []) // flatMap
                    // order of overlap
                    .sort(function (a, b) { return b.colorIndex - a.colorIndex; })
                    .forEach(function (line) {
                    var x = branchXPoints[line.pointIndex];
                    renderMerge(grid, ctx, x, y, line.upLineIndex, line.downLineIndex, line.colorIndex, {
                        branchColors: branchColors,
                        branchLineWidth: branchLineWidth,
                        branchXPoints: branchXPoints,
                        margin: margin,
                        mergeStyle: mergeStyle,
                    }, {
                        branches: branches,
                        col: col,
                        row: row,
                        width: width,
                    });
                });
                // draw commit points
                data.forEach(function (p, index) {
                    if (p && p.commit) {
                        var x = branchXPoints[index];
                        ctx.fillStyle = getOrApply(branchColors, branches[index], index);
                        ctx.beginPath();
                        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
                        ctx.fill();
                        ctx.closePath();
                    }
                });
                // draw tags
                data.forEach(function (p, index) {
                    if (p && p.tag) {
                        ctx.fillStyle = getOrApply(branchColors, branches[index], index);
                        ctx.fillText(p.tag, branchXPoints[index] + radius + 4, y);
                    }
                });
            });
        };
        return BranchGraphColumn;
    }(BaseColumn));

    var INLINE_INPUT_EDITOR_STATE_ID$1 = getInlineInputEditorStateId();
    var Column = /** @class */ (function (_super) {
        __extends(Column, _super);
        function Column(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._draw = options.draw;
            _this._cellStyle = options.cellStyle;
            return _this;
        }
        Object.defineProperty(Column.prototype, "StyleClass", {
            get: function () {
                return Style;
            },
            enumerable: false,
            configurable: true
        });
        Column.prototype.clone = function () {
            return new Column(this);
        };
        Object.defineProperty(Column.prototype, "draw", {
            get: function () {
                return this._draw;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Column.prototype, "cellStyle", {
            get: function () {
                return this._cellStyle;
            },
            enumerable: false,
            configurable: true
        });
        Column.prototype.reviseAttachCellsArea = function (rect, row, grid) {
            reviseAttachCellsArea(rect, row, grid, this._cellStyle);
        };
        Column.prototype.reviseAttachCellsPadding = function (padding, row, grid) {
            _super.prototype.reviseAttachCellsPadding.call(this, padding, row, grid);
            reviseAttachCellsPadding(padding, row, grid, this._cellStyle);
        };
        Column.prototype.drawInternal = function (value, context, style, helper, grid, _a) {
            var _this = this;
            var getIcon = _a.getIcon, getRecord = _a.getRecord;
            var textAlign = style.textAlign, textBaseline = style.textBaseline, color = style.color, font = style.font, textOverflow = style.textOverflow;
            helper.testFontLoad(font, value, context);
            loadIcons(getIcon(), context, helper, function (icons, ctx) {
                var isCustomDraw = customDraw(helper, _this.draw, value, context, grid, getRecord());
                if (!isCustomDraw) {
                    helper.text(value, ctx, {
                        color: color,
                        font: font,
                        icons: icons,
                        padding: getActionTextPadding(context, helper, style),
                        textAlign: textAlign,
                        textBaseline: textBaseline,
                        textOverflow: textOverflow,
                    });
                }
                drawActionButton(grid, context, INLINE_INPUT_EDITOR_STATE_ID$1, helper, style);
                drawAttachArea(grid, getRecord(), context, helper, _this._cellStyle);
            });
        };
        return Column;
    }(BaseColumn));

    var BUTTON_COLUMN_STATE_ID$1 = getButtonColumnStateId();
    var ButtonColumn = /** @class */ (function (_super) {
        __extends(ButtonColumn, _super);
        function ButtonColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._caption = options.caption;
            _this._linkButton = !!options.linkButton;
            return _this;
        }
        Object.defineProperty(ButtonColumn.prototype, "StyleClass", {
            get: function () {
                return ButtonStyle;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ButtonColumn.prototype, "caption", {
            get: function () {
                return this._caption;
            },
            enumerable: false,
            configurable: true
        });
        ButtonColumn.prototype.withCaption = function (caption) {
            var c = this.clone();
            c._caption = caption;
            return c;
        };
        ButtonColumn.prototype.clone = function () {
            return new ButtonColumn(this);
        };
        ButtonColumn.prototype.drawInternal = function (value, context, style, helper, grid, _a) {
            var _this = this;
            var getIcon = _a.getIcon;
            var textAlign = style.textAlign, textBaseline = style.textBaseline, color = style.color, buttonBgColor = style.buttonBgColor, font = style.font, padding = style.padding, textOverflow = style.textOverflow;
            helper.testFontLoad(font, value, context);
            var col = context.col, row = context.row;
            var range = grid.getCellRange(col, row);
            var active = false;
            var selected = false;
            var state = grid[BUTTON_COLUMN_STATE_ID$1];
            if (state) {
                if (state.mouseActiveCell &&
                    cellInRange(range, state.mouseActiveCell.col, state.mouseActiveCell.row)) {
                    active = true;
                }
                var select = context.getSelection().select;
                if (cellInRange(range, select.col, select.row)) {
                    selected = true;
                }
            }
            loadIcons(getIcon(), context, helper, function (icons, ctx) {
                if (_this._linkButton) {
                    if (active && state && state.mouseRelativePos) {
                        var rect = helper.getTextRect(value, ctx, {
                            font: font,
                            icons: icons,
                            padding: padding,
                            textAlign: textAlign,
                            textBaseline: textBaseline,
                            textOverflow: textOverflow,
                        });
                        active =
                            rect.left <= state.mouseRelativePos.x &&
                                rect.right >= state.mouseRelativePos.x &&
                                rect.top <= state.mouseRelativePos.y &&
                                rect.bottom >= state.mouseRelativePos.y;
                        state.mouseActive = active;
                    }
                    helper.text(value, ctx, {
                        color: active ? buttonBgColor || helper.theme.button.bgColor : color,
                        font: font,
                        icons: icons,
                        padding: padding,
                        textAlign: textAlign,
                        textBaseline: textBaseline,
                        textOverflow: textOverflow,
                    });
                }
                else {
                    if (active) {
                        state.mouseActive = active;
                    }
                    helper.button(value, ctx, {
                        bgColor: buttonBgColor,
                        color: color,
                        font: font,
                        icons: icons,
                        padding: padding,
                        shadow: active || selected
                            ? {
                                blur: 6,
                                color: 'rgba(0, 0, 0, 0.48)',
                                offsetY: 3,
                            }
                            : {},
                        textAlign: textAlign,
                        textBaseline: textBaseline,
                        textOverflow: textOverflow,
                    });
                }
            });
        };
        ButtonColumn.prototype.convertInternal = function (value) {
            return this._caption || _super.prototype.convertInternal.call(this, value);
        };
        return ButtonColumn;
    }(Column));

    var CHECK_COLUMN_STATE_ID$1 = getCheckColumnStateId();
    var CheckColumn = /** @class */ (function (_super) {
        __extends(CheckColumn, _super);
        function CheckColumn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(CheckColumn.prototype, "StyleClass", {
            get: function () {
                return CheckStyle;
            },
            enumerable: false,
            configurable: true
        });
        CheckColumn.prototype.clone = function () {
            return new CheckColumn(this);
        };
        CheckColumn.prototype.getState = function (grid) {
            var state = grid[CHECK_COLUMN_STATE_ID$1];
            if (!state) {
                state = { block: {}, elapsed: {} };
                obj.setReadonly(grid, CHECK_COLUMN_STATE_ID$1, state);
            }
            return state;
        };
        CheckColumn.prototype.doDrawInternal = function (helper, value, context, opt) {
            helper.checkbox(value, context, opt);
        };
        return CheckColumn;
    }(BaseCheckColumn));

    var SWITCH_COLUMN_STATE_ID$1 = getSwitchColumnStateId();
    var SwitchColumn = /** @class */ (function (_super) {
        __extends(SwitchColumn, _super);
        function SwitchColumn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SwitchColumn.prototype, "StyleClass", {
            get: function () {
                return SwitchStyle;
            },
            enumerable: false,
            configurable: true
        });
        SwitchColumn.prototype.clone = function () {
            return new SwitchColumn(this);
        };
        SwitchColumn.prototype.getState = function (grid) {
            var state = grid[SWITCH_COLUMN_STATE_ID$1];
            if (!state) {
                state = { block: {}, elapsed: {} };
                obj.setReadonly(grid, SWITCH_COLUMN_STATE_ID$1, state);
            }
            return state;
        };
        SwitchColumn.prototype.doDrawInternal = function (helper, value, context, opt) {
            helper.switch(value, context, opt);
        };
        return SwitchColumn;
    }(BaseCheckColumn));

    var defaultDateTimeFormat;
    var DateColumn = /** @class */ (function (_super) {
        __extends(DateColumn, _super);
        function DateColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._format = options.format;
            return _this;
        }
        Object.defineProperty(DateColumn, "defaultFormat", {
            get: function () {
                return (defaultDateTimeFormat ||
                    (defaultDateTimeFormat = new Intl.DateTimeFormat()));
            },
            set: function (fmt) {
                defaultDateTimeFormat = fmt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DateColumn.prototype, "StyleClass", {
            get: function () {
                return DateStyle;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DateColumn.prototype, "format", {
            get: function () {
                return this._format;
            },
            enumerable: false,
            configurable: true
        });
        DateColumn.prototype.clone = function () {
            return new DateColumn(this);
        };
        DateColumn.prototype.withFormat = function (format) {
            var c = this.clone();
            c._format = format;
            return c;
        };
        DateColumn.prototype.convertInternal = function (value) {
            if (value instanceof Date) {
                var format = this._format || DateColumn.defaultFormat;
                return format.format(value);
            }
            else {
                return '';
            }
        };
        return DateColumn;
    }(Column));

    var INLINE_INPUT_EDITOR_STATE_ID$2 = getInlineInputEditorStateId();
    var DrawColumn = /** @class */ (function (_super) {
        __extends(DrawColumn, _super);
        function DrawColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._draw = options.draw;
            return _this;
        }
        Object.defineProperty(DrawColumn.prototype, "StyleClass", {
            get: function () {
                return DrawStyle;
            },
            enumerable: false,
            configurable: true
        });
        DrawColumn.prototype.clone = function () {
            return new DrawColumn(this);
        };
        Object.defineProperty(DrawColumn.prototype, "draw", {
            get: function () {
                return this._draw;
            },
            enumerable: false,
            configurable: true
        });
        DrawColumn.prototype.drawInternal = function (value, context, style, helper, grid, _a) {
            var getRecord = _a.getRecord;
            customDraw(helper, this.draw, value, context, grid, getRecord());
            drawActionButton(grid, context, INLINE_INPUT_EDITOR_STATE_ID$2, helper, style);
        };
        return DrawColumn;
    }(BaseColumn));

    function repeatArray(val, count) {
        if (count === Infinity) {
            count = 0;
        }
        var a = [];
        for (var i = 0; i < count; i++) {
            a.push(val);
        }
        return a;
    }
    var IconColumn = /** @class */ (function (_super) {
        __extends(IconColumn, _super);
        function IconColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._tagName = options.tagName || 'i';
            _this._className = options.className;
            _this._content = options.content;
            _this._name = options.name;
            _this._iconWidth = options.iconWidth;
            return _this;
        }
        Object.defineProperty(IconColumn.prototype, "StyleClass", {
            get: function () {
                return IconStyle;
            },
            enumerable: false,
            configurable: true
        });
        IconColumn.prototype.clone = function () {
            return new IconColumn(this);
        };
        IconColumn.prototype.drawInternal = function (value, context, style, helper, grid, info) {
            var num = Number(value);
            if (!isNaN(num)) {
                var icon_1 = {};
                icons.iconPropKeys.forEach(function (k) {
                    icon_1[k] = style[k];
                });
                icon_1.className = this._className;
                icon_1.tagName = this._tagName;
                icon_1.content = this._content;
                icon_1.name = this._name;
                if (this._iconWidth) {
                    icon_1.width = this._iconWidth;
                }
                info.getIcon = function () {
                    return repeatArray(icon_1, num);
                };
            }
            else {
                info.getIcon = function () { return null; };
            }
            _super.prototype.drawInternal.call(this, '', context, style, helper, grid, info);
        };
        return IconColumn;
    }(Column));

    var fontSizeCache = {};
    function getFontSize(ctx, font) {
        var fontName = font || ctx.font;
        if (fontSizeCache[fontName]) {
            return fontSizeCache[fontName];
        }
        var bk = ctx.font;
        try {
            ctx.font = fontName;
            var em = ctx.measureText('哦').width;
            return (fontSizeCache[fontName] = {
                height: em,
                width: em,
            });
        }
        finally {
            ctx.font = bk;
        }
    }
    function calcBasePosition(ctx, rect, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, _d = _b.padding, _e = _d === void 0 ? {} : _d, _f = _e.left, paddingLeft = _f === void 0 ? 0 : _f, _g = _e.right, paddingRight = _g === void 0 ? 0 : _g, _h = _e.top, paddingTop = _h === void 0 ? 0 : _h, _j = _e.bottom, paddingBottom = _j === void 0 ? 0 : _j;
        return calcStartPosition(ctx, rect, 0, 0, {
            offset: offset,
            padding: {
                bottom: paddingBottom,
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
            },
        });
    }
    function calcStartPosition(ctx, rect, width, height, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, _d = _b.padding, _e = _d === void 0 ? {} : _d, _f = _e.left, paddingLeft = _f === void 0 ? 0 : _f, _g = _e.right, paddingRight = _g === void 0 ? 0 : _g, _h = _e.top, paddingTop = _h === void 0 ? 0 : _h, _j = _e.bottom, paddingBottom = _j === void 0 ? 0 : _j;
        var textAlign = ctx.textAlign || 'left';
        var textBaseline = ctx.textBaseline || 'middle';
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        var x = rect.left + offset + paddingLeft;
        if (textAlign === 'right' || textAlign === 'end') {
            x = rect.right - width - offset - paddingRight;
        }
        else if (textAlign === 'center') {
            x = rect.left + (rect.width - width + paddingLeft - paddingRight) / 2;
        }
        var y = rect.top + offset + paddingTop;
        if (textBaseline === 'bottom' ||
            textBaseline === 'alphabetic' ||
            textBaseline === 'ideographic') {
            y = rect.bottom - height - offset - paddingBottom;
        }
        else if (textBaseline === 'middle') {
            y = rect.top + (rect.height - height + paddingTop - paddingBottom) / 2;
        }
        return { x: x, y: y };
    }

    var LRUCache = /** @class */ (function () {
        function LRUCache(cacheSize) {
            this._list = [];
            this._map = {};
            this._cacheSize = cacheSize || 50;
        }
        LRUCache.prototype.get = function (key) {
            var val = this._map[key];
            if (val) {
                var list = this._list;
                var idx = list.indexOf(key);
                list.splice(idx, 1);
                list.push(key);
            }
            return val;
        };
        LRUCache.prototype.put = function (key, value) {
            var list = this._list;
            var map = this._map;
            if (map[key]) {
                var idx = list.indexOf(key);
                list.splice(idx, 1);
            }
            map[key] = value;
            list.push(key);
            if (list.length > this._cacheSize) {
                var remKey = list.shift() || '';
                delete map[remKey];
            }
        };
        return LRUCache;
    }());

    var allCache = {};
    // function isDataUrl(url: string): boolean {
    //   return url ? url.search(/^(data:)/) !== -1 : false
    // }
    function loadImage(src) {
        if (typeof Promise === 'undefined') {
            window.console.error('Promise is not loaded. load Promise before this process.');
            return {
                then: function () {
                    return this;
                },
            };
        }
        var img = new Image();
        var result = new Promise(function (resolve) {
            img.onload = function () {
                resolve(img);
            };
        });
        img.onerror = function () {
            var url = src.length > 200 ? src.substr(0, 200) + "..." : src;
            console.warn("cannot load: " + url);
            throw new Error("IMAGE LOAD ERROR: " + url);
        };
        // img.src = isDataUrl(src) ? src : `${src}?${Date.now()}`
        img.src = src;
        return result;
    }
    function getCacheOrLoad0(cache, src) {
        return then(src, function (src) {
            var c = cache.get(src);
            if (c) {
                return c;
            }
            var result = loadImage(src).then(function (img) {
                cache.put(src, img);
                return img;
            });
            cache.put(src, result);
            return result;
        });
    }
    function getCacheOrLoad(cacheName, cacheSize, src) {
        var cache = allCache[cacheName] ||
            (allCache[cacheName] = new LRUCache(cacheSize));
        return getCacheOrLoad0(cache, src);
    }

    var INLINE_INPUT_EDITOR_STATE_ID$3 = getInlineInputEditorStateId();
    var MAX_LRU_CACHE_SIZE = 50;
    function getImage(url) {
        return getCacheOrLoad('ImageColumn', MAX_LRU_CACHE_SIZE, url);
    }
    function calcKeepAspectRatioSize(width, height, maxWidth, maxHeight) {
        var newWidth = width;
        var newHeight = height;
        if (newWidth > maxWidth) {
            newWidth = maxWidth;
            newHeight = (newWidth * height) / width;
        }
        if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = (newHeight * width) / height;
        }
        return {
            height: newHeight,
            width: newWidth,
        };
    }
    var ImageColumn = /** @class */ (function (_super) {
        __extends(ImageColumn, _super);
        function ImageColumn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ImageColumn.prototype, "StyleClass", {
            get: function () {
                return ImageStyle;
            },
            enumerable: false,
            configurable: true
        });
        ImageColumn.prototype.onDrawCell = function (cellValue, info, context, grid) {
            var img = cellValue ? getImage(cellValue) : '';
            return _super.prototype.onDrawCell.call(this, img, info, context, grid);
        };
        ImageColumn.prototype.clone = function () {
            return new ImageColumn(this);
        };
        ImageColumn.prototype.drawInternal = function (value, context, style, helper, grid, _info) {
            var textAlign = style.textAlign, textBaseline = style.textBaseline, margin = style.margin;
            if (value) {
                helper.drawWithClip(context, function (ctx) {
                    ctx.textAlign = textAlign;
                    ctx.textBaseline = textBaseline;
                    var rect = context.getRect().copy();
                    var padding = getActionTextPadding(context, helper, style);
                    rect.width -= padding[1];
                    if (rect.width < 0) {
                        rect.width = 0;
                    }
                    if (style.imageSizing === 'keep-aspect-ratio') {
                        var size = calcKeepAspectRatioSize(value.width, value.height, rect.width - margin * 2, rect.height - margin * 2);
                        var width = size.width;
                        var height = size.height;
                        var pos = calcStartPosition(ctx, rect, width, height, {
                            offset: margin,
                        });
                        ctx.drawImage(value, 0, 0, value.width, value.height, pos.x, pos.y, width, height);
                    }
                    else {
                        ctx.drawImage(value, 0, 0, value.width, value.height, rect.left + margin, rect.top + margin, rect.width - margin * 2, rect.height - margin * 2);
                    }
                });
            }
            drawActionButton(grid, context, INLINE_INPUT_EDITOR_STATE_ID$3, helper, style);
        };
        return ImageColumn;
    }(BaseColumn));

    var INLINE_LOOKUP_EDITOR_STATE_ID$1 = getInlineLookupEditorStateId();
    var lookupColumnPromiseDrawingCol = '';
    var LookupColumn = /** @class */ (function (_super) {
        __extends(LookupColumn, _super);
        function LookupColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._lookupMap = {};
            _this._records = options.records;
            _this._valueField = options.valueField;
            _this._captionField = options.captionField;
            _this._draw = options.draw;
            _this._cellStyle = options.cellStyle;
            return _this;
        }
        Object.defineProperty(LookupColumn.prototype, "StyleClass", {
            get: function () {
                return LookupStyle;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LookupColumn.prototype, "records", {
            get: function () {
                return this._records;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LookupColumn.prototype, "valueField", {
            get: function () {
                return this._valueField;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LookupColumn.prototype, "captionField", {
            get: function () {
                return this._captionField;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LookupColumn.prototype, "draw", {
            get: function () {
                return this._draw;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LookupColumn.prototype, "cellStyle", {
            get: function () {
                return this._cellStyle;
            },
            enumerable: false,
            configurable: true
        });
        LookupColumn.prototype.reviseAttachCellsArea = function (rect, row, grid) {
            reviseAttachCellsArea(rect, row, grid, this._cellStyle);
        };
        LookupColumn.prototype.reviseAttachCellsPadding = function (padding, row, grid) {
            _super.prototype.reviseAttachCellsPadding.call(this, padding, row, grid);
            reviseAttachCellsPadding(padding, row, grid, this._cellStyle);
        };
        LookupColumn.prototype.clone = function () {
            return new LookupColumn(this);
        };
        LookupColumn.prototype.drawInternal = function (value, context, style, helper, grid, info) {
            var _this = this;
            var getIcon = info.getIcon;
            var getCell = info.getCell;
            var getRecord = info.getRecord;
            var records = getOrApply(this.records || [], getRecord());
            if (isPromise(records)) {
                var cell = getCell();
                var col = cell.col;
                var row = cell.row;
                if (!lookupColumnPromiseDrawingCol) {
                    records.then((function (me, col, row) { return function (rs) {
                        lookupColumnPromiseDrawingCol = String(col);
                        try {
                            me._mergeRecords(rs);
                            var range = grid.getCellRange(col, row);
                            grid.invalidateCellRange(range);
                        }
                        finally {
                            lookupColumnPromiseDrawingCol = '';
                        }
                    }; })(this, col, row));
                    return;
                }
            }
            else {
                this._mergeRecords(records);
            }
            var textAlign = style.textAlign;
            var textBaseline = style.textBaseline;
            var font = style.font;
            var textOverflow = style.textOverflow;
            var color = style.color;
            var text = this._convertInternal(value, getCell(), grid);
            helper.testFontLoad(font, text, context);
            loadIcons(getIcon(), context, helper, function (icons, ctx) {
                var isCustomDraw = customDraw(helper, _this.draw, text, context, grid, getRecord());
                if (!isCustomDraw) {
                    if (!isDef(color) && (!isDef(value) || value === '')) {
                        color = 'rgba(0, 0, 0, .38)';
                    }
                    helper.text(text, ctx, {
                        color: color,
                        font: font,
                        icons: icons,
                        padding: getActionTextPadding(ctx, helper, style),
                        textAlign: textAlign,
                        textBaseline: textBaseline,
                        textOverflow: textOverflow,
                    });
                }
                drawActionButton(grid, ctx, INLINE_LOOKUP_EDITOR_STATE_ID$1, helper, style);
                drawAttachArea(grid, getRecord(), context, helper, _this._cellStyle);
            });
        };
        LookupColumn.prototype.convertCopyInternal = function (value) {
            return isDef(value) ? this._convertInternalValue(value) : '';
        };
        LookupColumn.prototype.convertInternal = function (value) {
            return value;
        };
        LookupColumn.prototype.doConvertInternal = function (value, _cell, _grid) {
            return this.convertInternal(value);
        };
        LookupColumn.prototype._convertInternalValue = function (value) {
            var key = isDef(value) ? value + '' : '';
            var v = this._lookupMap[key];
            if (!isDef(v)) {
                v = key;
            }
            return v;
        };
        LookupColumn.prototype._convertInternal = function (value, cell, grid) {
            var v = this._convertInternalValue(value);
            if (this.convert) {
                v = this.convert(value, v, cell, grid);
            }
            return this.doConvertInternal(v, cell, grid);
        };
        LookupColumn.prototype._mergeRecords = function (recs) {
            if (recs === void 0) { recs = []; }
            var valueField = this.valueField || 'id';
            var captionField = this.captionField || valueField;
            for (var _i = 0, recs_1 = recs; _i < recs_1.length; _i++) {
                var record = recs_1[_i];
                var key = record[valueField];
                key = isDef(key) ? key + '' : '';
                var value = record[captionField];
                value = isDef(value) ? value + '' : '';
                this._lookupMap[key] = value;
            }
        };
        return LookupColumn;
    }(BaseColumn));

    var INLINE_TEXTAREA_EDITOR_STATE_ID$1 = getInlineTextareaEditorStateId();
    var MultilineTextColumn = /** @class */ (function (_super) {
        __extends(MultilineTextColumn, _super);
        function MultilineTextColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._draw = options.draw;
            _this._cellStyle = options.cellStyle;
            return _this;
        }
        Object.defineProperty(MultilineTextColumn.prototype, "StyleClass", {
            get: function () {
                return MultilineTextStyle;
            },
            enumerable: false,
            configurable: true
        });
        MultilineTextColumn.prototype.clone = function () {
            return new MultilineTextColumn(this);
        };
        Object.defineProperty(MultilineTextColumn.prototype, "draw", {
            get: function () {
                return this._draw;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MultilineTextColumn.prototype, "cellStyle", {
            get: function () {
                return this._cellStyle;
            },
            enumerable: false,
            configurable: true
        });
        MultilineTextColumn.prototype.reviseAttachCellsArea = function (rect, row, grid) {
            reviseAttachCellsArea(rect, row, grid, this._cellStyle);
        };
        MultilineTextColumn.prototype.reviseAttachCellsPadding = function (padding, row, grid) {
            _super.prototype.reviseAttachCellsPadding.call(this, padding, row, grid);
            reviseAttachCellsPadding(padding, row, grid, this._cellStyle);
        };
        MultilineTextColumn.prototype.drawInternal = function (value, context, style, helper, grid, _a) {
            var _this = this;
            var getIcon = _a.getIcon, getRecord = _a.getRecord;
            var textAlign = style.textAlign, textBaseline = style.textBaseline, color = style.color, font = style.font, lineHeight = style.lineHeight, autoWrapText = style.autoWrapText, lineClamp = style.lineClamp, textOverflow = style.textOverflow;
            var v = isDef(value) ? value + '' : '';
            var multiline = v.replace(/\r?\n/g, '\n').replace(/\r/g, '\n').split('\n');
            helper.testFontLoad(font, v, context);
            loadIcons(getIcon(), context, helper, function (icons, ctx) {
                var isCustomDraw = customDraw(helper, _this.draw, multiline, context, grid, getRecord());
                if (!isCustomDraw) {
                    helper.multilineText(multiline, ctx, {
                        autoWrapText: autoWrapText,
                        color: color,
                        font: font,
                        icons: icons,
                        lineClamp: lineClamp,
                        lineHeight: lineHeight,
                        padding: getActionTextPadding(context, helper, style),
                        textAlign: textAlign,
                        textBaseline: textBaseline,
                        textOverflow: textOverflow,
                    });
                }
                drawActionButton(grid, context, INLINE_TEXTAREA_EDITOR_STATE_ID$1, helper, style);
                drawAttachArea(grid, getRecord(), context, helper, _this._cellStyle);
            });
        };
        return MultilineTextColumn;
    }(BaseColumn));

    var defaultFormat;
    var NumberColumn = /** @class */ (function (_super) {
        __extends(NumberColumn, _super);
        function NumberColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._format = options.format;
            return _this;
        }
        Object.defineProperty(NumberColumn, "defaultFormat", {
            get: function () {
                return defaultFormat || (defaultFormat = new Intl.NumberFormat());
            },
            set: function (fmt) {
                defaultFormat = fmt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NumberColumn.prototype, "StyleClass", {
            get: function () {
                return NumberStyle;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NumberColumn.prototype, "format", {
            get: function () {
                return this._format;
            },
            enumerable: false,
            configurable: true
        });
        NumberColumn.prototype.clone = function () {
            return new NumberColumn(this);
        };
        NumberColumn.prototype.withFormat = function (format) {
            var c = this.clone();
            c._format = format;
            return c;
        };
        NumberColumn.prototype.convertInternal = function (value) {
            var s = (value + '').trim();
            if (s) {
                s = s - 0;
                if (isNaN(s)) {
                    s = '';
                }
                else {
                    s = (this._format || NumberColumn.defaultFormat).format(s);
                }
            }
            return s;
        };
        return NumberColumn;
    }(Column));

    var MARGIN = 2;
    var PercentCompleteBarColumn = /** @class */ (function (_super) {
        __extends(PercentCompleteBarColumn, _super);
        function PercentCompleteBarColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._min = options.min || 0;
            _this._max = options.max || _this._min + 100;
            _this._formatter = options.formatter || (function (v) { return v; });
            return _this;
        }
        Object.defineProperty(PercentCompleteBarColumn.prototype, "StyleClass", {
            get: function () {
                return PercentCompleteBarStyle;
            },
            enumerable: false,
            configurable: true
        });
        PercentCompleteBarColumn.prototype.clone = function () {
            return new PercentCompleteBarColumn(this);
        };
        PercentCompleteBarColumn.prototype.drawInternal = function (value, context, style, helper, grid, info) {
            _super.prototype.drawInternal.call(this, this._formatter(value), context, style, helper, grid, info);
            var barColor = style.barColor;
            var barBgColor = style.barBgColor;
            var barHeight = style.barHeight;
            var sValue = "" + value;
            if (str.endsWith(sValue, '%')) {
                sValue = sValue.substr(0, sValue.length - 1);
            }
            var num = Number(sValue);
            var rate = num < this._min
                ? 0
                : num > this._max
                    ? 1
                    : (num - this._min) / (this._max - this._min);
            helper.drawWithClip(context, function (ctx) {
                var rect = context.getRect();
                var barMaxWidth = rect.width - MARGIN * 2 - 1; /*边线*/
                var barTop = rect.bottom - MARGIN - barHeight - 1; /*边线*/
                var barLeft = rect.left + MARGIN;
                ctx.fillStyle = getOrApply(barBgColor, rate * 100) || '#f0f3f5';
                ctx.beginPath();
                ctx.rect(barLeft, barTop, barMaxWidth, barHeight);
                ctx.fill();
                var barSize = Math.min(barMaxWidth * rate, barMaxWidth);
                ctx.fillStyle = getOrApply(barColor, rate * 100) || '#20a8d8';
                ctx.beginPath();
                ctx.rect(barLeft, barTop, barSize, barHeight);
                ctx.fill();
            });
        };
        return PercentCompleteBarColumn;
    }(Column));

    function createArray(get, length) {
        var array = new Array(length);
        for (var i = 0; i < length; i++) {
            array[i] = get(i);
        }
        return array;
    }
    function createArrayPromise(get, getField, length) {
        return new Promise(function (resolve) {
            var plist = [];
            var array = new Array(length);
            var _loop_1 = function (i) {
                var data = get(i);
                var record = {
                    v: data,
                    f: data,
                };
                array[i] = record;
                if (isPromise(data)) {
                    plist.push(data.then(function (v) {
                        record.v = v;
                        record.f = v;
                    }));
                }
            };
            for (var i = 0; i < length; i++) {
                _loop_1(i);
            }
            Promise.all(plist)
                .then(function () {
                return getField == null
                    ? array
                    : setArrayField(array, getField);
            })
                .then(resolve);
        });
    }
    function setArrayField(array, getField) {
        return new Promise(function (resolve) {
            var length = array.length;
            var plist = [];
            var _loop_2 = function (i) {
                var record = array[i];
                var f = getField(record.v);
                if (isPromise(f)) {
                    plist.push(f.then(function (v) {
                        record.f = v;
                    }));
                }
                else {
                    record.f = f;
                }
            };
            for (var i = 0; i < length; i++) {
                _loop_2(i);
            }
            Promise.all(plist).then(function () { return resolve(array); });
        });
    }
    function sort(get, set, length, compare, getField) {
        var old = createArray(get, length);
        if (getField != null) {
            old.sort(function (r1, r2) {
                return compare(getField(r1), getField(r2));
            });
        }
        else {
            old.sort(compare);
        }
        for (var i = 0; i < length; i++) {
            set(i, old[i]);
        }
    }
    function sortPromise(get, set, length, compare, getField) {
        if (typeof Promise !== 'undefined') {
            return createArrayPromise(get, getField, length).then(function (array) {
                array.sort(function (r1, r2) { return compare(r1.f, r2.f); });
                for (var i = 0; i < length; i++) {
                    set(i, array[i].v);
                }
            });
        }
        else {
            sort(get, set, length, compare, getField);
            var dummyPromise_1 = {
                then: function (fn) {
                    fn();
                    return dummyPromise_1;
                },
                catch: function () {
                    return dummyPromise_1;
                },
            };
            return dummyPromise_1;
        }
    }

    function isFieldAssessor(field) {
        if (obj.isObject(field)) {
            var a = field;
            if (a.get && a.set) {
                return true;
            }
        }
        return false;
    }
    var DATA_SOURCE_EVENT_TYPE = {
        REFRESH_DATA: 'refresh_data',
        UPDATED_LENGTH: 'updated_length',
        UPDATED_ORDER: 'updated_order',
        UPDATE_LENGTH: 'update_length',
    };
    function getValue(value, setPromiseBack) {
        var maybePromiseValue = getOrApply(value);
        if (isPromise(maybePromiseValue)) {
            var promiseValue = maybePromiseValue.then(function (r) {
                setPromiseBack(r);
                return r;
            });
            // 临时缓存
            setPromiseBack(promiseValue);
            return promiseValue;
        }
        else {
            return maybePromiseValue;
        }
    }
    function getField(record, field, setPromiseBack) {
        if (!isDef(record)) {
            return undefined;
        }
        if (isPromise(record)) {
            return record.then(function (r) { return getField(r, field, setPromiseBack); });
        }
        var fieldGet = isFieldAssessor(field) ? field.get : field;
        if (typeof fieldGet === 'string' && fieldGet in record) {
            var fieldResult_1 = record[fieldGet];
            return getValue(fieldResult_1, setPromiseBack);
        }
        if (typeof fieldGet === 'function') {
            var fieldResult_2 = fieldGet(record);
            return getValue(fieldResult_2, setPromiseBack);
        }
        var ss = ("" + fieldGet).split('.');
        if (ss.length <= 1) {
            var fieldResult_3 = record[fieldGet];
            return getValue(fieldResult_3, setPromiseBack);
        }
        var fieldResult = applyChainSafe.apply(void 0, __spreadArrays([record, function (val, name) { return getField(val, name, emptyFn); }], ss));
        return getValue(fieldResult, setPromiseBack);
    }
    function setField(record, field, value) {
        if (record == null) {
            return false;
        }
        var fieldSet = isFieldAssessor(field) ? field.set : field;
        if (typeof fieldSet === 'string' && fieldSet in record) {
            record[fieldSet] = value;
        }
        else if (typeof fieldSet === 'function') {
            return fieldSet(record, value);
        }
        else if (typeof fieldSet === 'string') {
            var ss = ("" + fieldSet).split('.');
            var obj_1 = record;
            var length_1 = ss.length;
            for (var i = 0; i < length_1; i++) {
                var f = ss[i];
                if (i === length_1 - 1) {
                    obj_1[f] = value;
                }
                else {
                    obj_1 = obj_1[f] || (obj_1[f] = {});
                }
            }
        }
        else {
            record[fieldSet] = value;
        }
        return true;
    }
    function _getIndex(sortedIndexMap, index) {
        if (!sortedIndexMap) {
            return index;
        }
        var mapIndex = sortedIndexMap[index];
        return isDef(mapIndex) ? mapIndex : index;
    }
    /**
     * grid data source
     */
    var DataSource = /** @class */ (function (_super) {
        __extends(DataSource, _super);
        function DataSource(obj) {
            var _a;
            var _this = _super.call(this) || this;
            _this._sortedIndexMap = null;
            _this._get = (obj === null || obj === void 0 ? void 0 : obj.get.bind(obj)) || undefined;
            _this._length = (obj === null || obj === void 0 ? void 0 : obj.length) || 0;
            _this._source = (_a = obj === null || obj === void 0 ? void 0 : obj.source) !== null && _a !== void 0 ? _a : obj;
            return _this;
        }
        Object.defineProperty(DataSource, "EVENT_TYPE", {
            get: function () {
                return DATA_SOURCE_EVENT_TYPE;
            },
            enumerable: false,
            configurable: true
        });
        DataSource.ofArray = function (array) {
            return new DataSource({
                get: function (index) { return array[index]; },
                length: array.length,
                source: array,
            });
        };
        Object.defineProperty(DataSource.prototype, "source", {
            get: function () {
                return this._source;
            },
            enumerable: false,
            configurable: true
        });
        DataSource.prototype.get = function (index) {
            return this.getOriginal(_getIndex(this._sortedIndexMap, index));
        };
        DataSource.prototype.getField = function (index, field) {
            return this.getOriginalField(_getIndex(this._sortedIndexMap, index), field);
        };
        DataSource.prototype.hasField = function (index, field) {
            return this.hasOriginalField(_getIndex(this._sortedIndexMap, index), field);
        };
        DataSource.prototype.setField = function (index, field, value) {
            return this.setOriginalField(_getIndex(this._sortedIndexMap, index), field, value);
        };
        DataSource.prototype.sort = function (field, order) {
            var _this = this;
            var sortedIndexMap = new Array(this._length);
            var orderFn = order !== 'desc'
                ? function (v1, v2) { return (v1 === v2 ? 0 : v1 > v2 ? 1 : -1); }
                : function (v1, v2) { return (v1 === v2 ? 0 : v1 < v2 ? 1 : -1); };
            return sortPromise(function (index) {
                return isDef(sortedIndexMap[index])
                    ? sortedIndexMap[index]
                    : (sortedIndexMap[index] = index);
            }, function (index, rel) {
                sortedIndexMap[index] = rel;
            }, this._length, orderFn, function (index) { return _this.getOriginalField(index, field); })
                .then(function () {
                _this._sortedIndexMap = sortedIndexMap;
                _this.fireListeners(DATA_SOURCE_EVENT_TYPE.UPDATED_ORDER);
            });
        };
        Object.defineProperty(DataSource.prototype, "length", {
            get: function () {
                return this._length;
            },
            set: function (length) {
                if (this._length !== length) {
                    this.setLength(length);
                }
            },
            enumerable: false,
            configurable: true
        });
        DataSource.prototype.refresh = function () {
            this.refreshInternal();
            this.fireListeners(DATA_SOURCE_EVENT_TYPE.REFRESH_DATA);
        };
        Object.defineProperty(DataSource.prototype, "dataSource", {
            get: function () {
                return this;
            },
            enumerable: false,
            configurable: true
        });
        DataSource.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        DataSource.prototype.getOriginal = function (index) {
            var _this = this;
            return getValue(this._get(index), function (val) {
                _this.recordPromiseCallBackInternal(index, val);
            });
        };
        DataSource.prototype.getOriginalField = function (index, field) {
            var _this = this;
            if (!isDef(field)) {
                return undefined;
            }
            var record = this.getOriginal(index);
            return getField(record, field, function (val) {
                _this.fieldPromiseCallBackInternal(index, field, val);
            });
        };
        DataSource.prototype.hasOriginalField = function (index, field) {
            if (!isDef(field)) {
                return false;
            }
            if (typeof field === 'function') {
                return true;
            }
            var record = this.getOriginal(index);
            return Boolean(record && typeof field === 'string' && field in record);
        };
        DataSource.prototype.setOriginalField = function (index, field, value) {
            if (!isDef(field)) {
                return false;
            }
            var record = this.getOriginal(index);
            if (isPromise(record)) {
                return record.then(function (r) { return setField(r, field, value); });
            }
            return setField(record, field, value);
        };
        DataSource.prototype.fieldPromiseCallBackInternal = function (_index, _field, _value) {
            // nothing
        };
        DataSource.prototype.recordPromiseCallBackInternal = function (_index, _record) {
            // nothing
        };
        DataSource.prototype.refreshInternal = function () {
            // nothing
        };
        DataSource.prototype.setLength = function (length) {
            var results = this.fireListeners(DATA_SOURCE_EVENT_TYPE.UPDATE_LENGTH, length);
            if (array.findIndex(results, function (v) { return !v; }) >= 0) {
                return;
            }
            this._length = length;
            this.fireListeners(DATA_SOURCE_EVENT_TYPE.UPDATED_LENGTH, this._length);
        };
        DataSource.EMPTY = new DataSource({
            get: function () { },
            length: 0,
        });
        return DataSource;
    }(EventTarget));

    function _initLevel(ds, record, level) {
        var key = record[ds.options.keyField];
        ds._levelMap[key] = level;
        var children = ds._pIdMap[key] || [];
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            _initLevel(ds, child, level + 1);
        }
    }
    function _initLast(ds, records) {
        if (records && records.length > 0) {
            var key = records[records.length - 1][ds.options.keyField];
            ds._lastMap[key] = true;
        }
    }
    function _expandAll(ds, record) {
        var key = record[ds.options.keyField];
        var children = ds._pIdMap[key] || [];
        if (children.length > 0) {
            ds._expandMap[key] = true;
            for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
                var r = children_2[_i];
                _expandAll(ds, r);
            }
        }
    }
    function _getExpandRecords(ds, record) {
        var records = [];
        var key = record[ds.options.keyField];
        if (ds._expandMap[key]) {
            var children = ds._pIdMap[key] || [];
            for (var _i = 0, children_3 = children; _i < children_3.length; _i++) {
                var r = children_3[_i];
                records.push(r);
                records = records.concat(_getExpandRecords(ds, r));
            }
        }
        return records;
    }
    function _getCollapseRecordCount(ds, index) {
        var record = ds._records[index];
        var key = record[ds.options.keyField];
        var level = ds._levelMap[key];
        var count = 0;
        for (var i = index + 1; i < ds._records.length; i++) {
            var r = ds._records[i];
            var k = r[ds.options.keyField];
            if (level < ds._levelMap[k]) {
                count++;
            }
            else {
                break;
            }
        }
        return count;
    }
    function _expand(ds, record, all, silent, callback) {
        var _a, _b;
        if (record) {
            var index = ds._records.indexOf(record);
            var key = record[ds._options.keyField];
            if (ds._pIdMap[key]) {
                if (!ds._expandMap[key]) {
                    if (all) {
                        _expandAll(ds, record);
                    }
                    else {
                        ds._expandMap[key] = true;
                    }
                    (_a = ds._records).splice.apply(_a, __spreadArrays([index + 1, 0], _getExpandRecords(ds, record)));
                }
                else if (all) {
                    _expandAll(ds, record);
                    (_b = ds._records).splice.apply(_b, __spreadArrays([index + 1,
                        _getCollapseRecordCount(ds, index)], _getExpandRecords(ds, record)));
                }
                if (silent === 0) {
                    ds.length = ds._records.length;
                }
            }
            else if (callback) {
                callback(ds, record, all, silent);
            }
        }
    }
    function _collapseAll(ds, record) {
        var key = record[ds.options.keyField];
        delete ds._expandMap[key];
        var children = ds._pIdMap[key] || [];
        for (var _i = 0, children_4 = children; _i < children_4.length; _i++) {
            var r = children_4[_i];
            _collapseAll(ds, r);
        }
    }
    function _parentKey(ds, key) {
        var record = ds._idMap[key];
        var parentKey = record[ds.options.parentKeyField];
        return parentKey;
    }
    function _rebuildTree(ds, silent) {
        var _a;
        // 构建显示记录列表
        ds._levelMap = {}; // 级别索引列表
        ds._lastMap = {}; // 是否末节点列表
        ds._rootRecords = []; // 根记录对象列表
        ds._records = []; // 显示记录列表
        for (var parentKey in ds._pIdMap) {
            if (ds._pIdMap.hasOwnProperty(parentKey)) {
                var records = ds._pIdMap[parentKey];
                if (ds._idMap[parentKey]) {
                    _initLast(ds, records);
                }
                else {
                    for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
                        var item = records_1[_i];
                        _initLevel(ds, item, 0);
                        ds._rootRecords.push(item);
                        ds._records.push(item);
                        (_a = ds._records).push.apply(_a, _getExpandRecords(ds, item));
                    }
                }
            }
        }
        _initLast(ds, ds._rootRecords);
        // 清理展开信息
        for (var key in ds._expandMap) {
            if (!ds._pIdMap[key]) {
                delete ds._expandMap[key];
            }
        }
        if (silent === 0) {
            ds.length = ds._records.length;
        }
    }
    function _lazyLoadRecords(ds, records, expandedKeys, silent) {
        var hasNewRecords = false;
        for (var _i = 0, records_2 = records; _i < records_2.length; _i++) {
            var record = records_2[_i];
            var key = record[ds._options.keyField];
            if (!ds._idMap[key]) {
                hasNewRecords = true;
                var pKey = record[ds._options.parentKeyField];
                ds._idMap[key] = record;
                ds._pIdMap[pKey] = ds._pIdMap[pKey] || [];
                ds._pIdMap[pKey].push(record);
                if (expandedKeys &&
                    Array.isArray(expandedKeys) &&
                    expandedKeys.indexOf(key) >= 0) {
                    ds._expandMap[key] = true;
                }
            }
        }
        if (hasNewRecords) {
            _rebuildTree(ds, silent);
        }
    }
    function _lazyLoadChildren(ds, record, all, silent, callback) {
        if (ds._options.hasChildren &&
            ds._options.getChildren &&
            ds._options.hasChildren(record)) {
            var records = ds._options.getChildren(record, all);
            if (isPromise(records)) {
                records.then(function (recs) {
                    var rs = Array.isArray(recs) ? recs : recs.records;
                    var expandedKeys = Array.isArray(recs) ? undefined : recs.expandedKeys;
                    _lazyLoadRecords(ds, rs, expandedKeys, silent);
                    if (callback) {
                        callback(ds, record, all, silent);
                    }
                });
            }
            else {
                _lazyLoadRecords(ds, records, null, silent);
                if (callback) {
                    callback(ds, record, all, silent);
                }
            }
        }
    }
    /**
     * grid data source for tree
     */
    var TreeDataSource = /** @class */ (function (_super) {
        __extends(TreeDataSource, _super);
        function TreeDataSource(dataSource, options) {
            var _this = _super.call(this, dataSource) || this;
            _this._idMap = {};
            _this._pIdMap = {};
            _this._levelMap = {};
            _this._lastMap = {};
            _this._rootRecords = [];
            _this._records = [];
            _this._updateLengthSilentCounter = 0;
            _this._dataSource = dataSource;
            _this._options = options;
            _this._expandMap = {};
            for (var _i = 0, _a = options.expandedKeys || []; _i < _a.length; _i++) {
                var key = _a[_i];
                _this._expandMap[key] = true;
            }
            _this.refreshInternal();
            return _this;
        }
        Object.defineProperty(TreeDataSource, "EVENT_TYPE", {
            get: function () {
                return DataSource.EVENT_TYPE;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeDataSource.prototype, "options", {
            get: function () {
                return this._options;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeDataSource.prototype, "expandedKeys", {
            get: function () {
                return Object.keys(this._expandMap);
            },
            enumerable: false,
            configurable: true
        });
        TreeDataSource.prototype.getOriginal = function (index) {
            return this._records[index];
        };
        TreeDataSource.prototype.getTreeInfo = function (index) {
            var record = this.getOriginal(index);
            if (record) {
                var key = record[this._options.keyField];
                var parentKey = _parentKey(this, key);
                var expanded = !!this._expandMap[key];
                var isLeaf = !this._pIdMap[key];
                var isLast = !!this._lastMap[key];
                var level = this._levelMap[key];
                var levelLast = [];
                var k = key;
                for (var i = 0; i < level; i++) {
                    levelLast.unshift(!!this._lastMap[k]);
                    k = _parentKey(this, k);
                }
                if (isLeaf && this._options.hasChildren) {
                    isLeaf = !this._options.hasChildren(record);
                }
                return {
                    expanded: expanded,
                    isLast: isLast,
                    isLeaf: isLeaf,
                    key: key,
                    level: level,
                    levelLast: levelLast,
                    parentKey: parentKey,
                };
            }
            else {
                return undefined;
            }
        };
        TreeDataSource.prototype.getIndexByKey = function (key) {
            return this._records.indexOf(this._idMap[key]);
        };
        TreeDataSource.prototype.expandAll = function () {
            var _a;
            this._records.length = 0;
            for (var _i = 0, _b = this._rootRecords; _i < _b.length; _i++) {
                var record = _b[_i];
                _expandAll(this, record);
                this._records.push(record);
                (_a = this._records).push.apply(_a, _getExpandRecords(this, record));
            }
            this.length = this._records.length;
        };
        TreeDataSource.prototype.expand = function (index, all) {
            if (all === void 0) { all = false; }
            var record = this.getOriginal(index);
            _expand(this, record, all, this._updateLengthSilentCounter, function (ds1, record1, all1, silent1) {
                _lazyLoadChildren(ds1, record1, all1, silent1, function (ds2, record2, all2, silent2) {
                    _expand(ds2, record2, all2, silent2);
                });
            });
        };
        TreeDataSource.prototype.expandToKey = function (key) {
            // 根据指定的主键，展开到该记录，并返回索引值
            var parentKeys = [];
            var value = key;
            var record = this._idMap[value];
            while (record) {
                value = record[this._options.parentKeyField];
                record = this._idMap[value];
                if (record) {
                    parentKeys.unshift(value);
                }
            }
            this._updateLengthSilentCounter++;
            try {
                for (var _i = 0, parentKeys_1 = parentKeys; _i < parentKeys_1.length; _i++) {
                    var parentKey = parentKeys_1[_i];
                    this.expand(this._records.indexOf(this._idMap[parentKey]));
                }
            }
            finally {
                this._updateLengthSilentCounter--;
                if (this._updateLengthSilentCounter === 0) {
                    this.length = this._records.length;
                }
            }
            return this.getIndexByKey(key);
        };
        TreeDataSource.prototype.expandToLevel = function (level) {
            // 展开到指定级别
            var targets = [];
            if (level > 0) {
                this._updateLengthSilentCounter++;
                try {
                    for (var key in this._levelMap) {
                        if (this._levelMap.hasOwnProperty(key)) {
                            if (level === this._levelMap[key] ||
                                (level > this._levelMap[key] && this._lastMap[key])) {
                                targets.push(this.expandToKey(key));
                            }
                        }
                    }
                }
                finally {
                    this._updateLengthSilentCounter--;
                    if (this._updateLengthSilentCounter === 0) {
                        this.length = this._records.length;
                    }
                }
            }
            return targets;
        };
        TreeDataSource.prototype.collapseAll = function () {
            var _a;
            this._records.length = 0;
            (_a = this._records).push.apply(_a, this._rootRecords);
            this._expandMap = {};
            this.length = this._records.length;
        };
        TreeDataSource.prototype.collapse = function (index, all) {
            var record = this.getOriginal(index);
            if (record) {
                var key = record[this._options.keyField];
                if (this._pIdMap[key]) {
                    if (this._expandMap[key]) {
                        if (all) {
                            _collapseAll(this, record);
                        }
                        else {
                            delete this._expandMap[key];
                        }
                        this._records.splice(index + 1, _getCollapseRecordCount(this, index));
                        this.length = this._records.length;
                    }
                    else if (all) {
                        _collapseAll(this, record);
                    }
                }
            }
        };
        TreeDataSource.prototype.toggle = function (index, all) {
            var record = this.getOriginal(index);
            if (record) {
                var key = record[this._options.keyField];
                if (this._expandMap[key]) {
                    this.collapse(index, all);
                }
                else {
                    this.expand(index, all);
                }
            }
        };
        Object.defineProperty(TreeDataSource.prototype, "source", {
            get: function () {
                return this._dataSource.source;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeDataSource.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            enumerable: false,
            configurable: true
        });
        TreeDataSource.prototype.refreshInternal = function () {
            // 构建 id 和 pId 与记录的对应关系
            this._idMap = {};
            this._pIdMap = {};
            for (var i = 0; i < this._dataSource.length; i++) {
                var key = this._dataSource.getField(i, this._options.keyField);
                var parentKey = this._dataSource.getField(i, this._options.parentKeyField);
                var record = this._dataSource.get(i);
                this._idMap[key] = record;
                this._pIdMap[parentKey] = this._pIdMap[parentKey] || [];
                this._pIdMap[parentKey].push(record);
            }
            // 构建显示记录列表
            _rebuildTree(this, this._updateLengthSilentCounter);
            if (this.length === 0) {
                _lazyLoadChildren(this, null, false, this._updateLengthSilentCounter);
            }
        };
        return TreeDataSource;
    }(DataSource));

    var INLINE_INPUT_EDITOR_STATE_ID$4 = getInlineInputEditorStateId();
    var BUTTON_COLUMN_STATE_ID$2 = getButtonColumnStateId();
    var COLUMN_ACTION_STATE_ID$1 = getColumnActionStateId();
    var TREE_NODE_SPACE = 16;
    function _getTreeInfo(grid, row) {
        var treeInfo = undefined;
        if (grid.dataSource instanceof TreeDataSource) {
            var recordIndex = grid.getRecordIndexByRow(row);
            if (recordIndex >= 0) {
                treeInfo = grid.dataSource.getTreeInfo(recordIndex);
            }
        }
        return treeInfo;
    }
    function _getTreeNodeSpaceWidth(treeInfo) {
        var width = 0;
        if (treeInfo) {
            width += treeInfo.level * TREE_NODE_SPACE + TREE_NODE_SPACE * 2;
        }
        return width;
    }
    function _isTreeNodeSpace(grid, col, row, event) {
        var bool = false;
        var relativePos = grid._getMouseRelativePoint(event);
        if (relativePos) {
            var rect = grid.getCellRelativeRect(col, row);
            var treeInfo = _getTreeInfo(grid, row);
            if (treeInfo && !treeInfo.isLeaf) {
                var treeNodeSpaceWidth = _getTreeNodeSpaceWidth(treeInfo);
                if (treeNodeSpaceWidth &&
                    relativePos.x - rect.left < treeNodeSpaceWidth) {
                    bool = true;
                }
            }
        }
        return bool;
    }
    var TreeColumn = /** @class */ (function (_super) {
        __extends(TreeColumn, _super);
        function TreeColumn(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this._canToggle = options.canToggle;
            _this._toggled = options.toggled;
            _this._draw = options.draw;
            _this._cellStyle = options.cellStyle;
            _this._multilineText = options.multilineText;
            return _this;
        }
        Object.defineProperty(TreeColumn.prototype, "StyleClass", {
            get: function () {
                return TreeStyle;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeColumn.prototype, "canToggle", {
            get: function () {
                return this._canToggle;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeColumn.prototype, "toggled", {
            get: function () {
                return this._toggled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeColumn.prototype, "draw", {
            get: function () {
                return this._draw;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeColumn.prototype, "cellStyle", {
            get: function () {
                return this._cellStyle;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeColumn.prototype, "multilineText", {
            get: function () {
                return this._multilineText;
            },
            enumerable: false,
            configurable: true
        });
        TreeColumn.prototype.reviseAttachCellsArea = function (rect, row, grid) {
            reviseAttachCellsArea(rect, row, grid, this._cellStyle);
        };
        TreeColumn.prototype.reviseAttachCellsPadding = function (padding, row, grid) {
            _super.prototype.reviseAttachCellsPadding.call(this, padding, row, grid);
            var treeInfo = _getTreeInfo(grid, row);
            padding[3] += _getTreeNodeSpaceWidth(treeInfo);
            reviseAttachCellsPadding(padding, row, grid, this._cellStyle);
        };
        TreeColumn.prototype.reviseFocusRect = function (rect, row, grid) {
            var treeInfo = _getTreeInfo(grid, row);
            rect.left += _getTreeNodeSpaceWidth(treeInfo);
        };
        TreeColumn.prototype.clone = function () {
            return new TreeColumn(this);
        };
        TreeColumn.prototype.drawInternal = function (value, context, style, helper, grid, info) {
            var _this = this;
            var getIcon = info.getIcon;
            var getRecord = info.getRecord;
            var textAlign = style.textAlign, textBaseline = style.textBaseline, color = style.color, font = style.font, textOverflow = style.textOverflow, lineColor = style.lineColor, buttonColor = style.buttonColor, buttonBgColor = style.buttonBgColor, buttonBorderColor = style.buttonBorderColor, linkColor = style.linkColor, autoWrapText = style.autoWrapText, lineHeight = style.lineHeight, lineClamp = style.lineClamp;
            helper.testFontLoad(font, value, context);
            var treeInfo = _getTreeInfo(grid, context.row);
            var active = false;
            var state = grid[BUTTON_COLUMN_STATE_ID$2];
            if (state) {
                var range = grid.getCellRange(context.col, context.row);
                if (state.mouseActiveCell &&
                    cellInRange(range, state.mouseActiveCell.col, state.mouseActiveCell.row)) {
                    active = true;
                }
            }
            loadIcons(getIcon(), context, helper, function (icons, ctx) {
                var isCustomDraw = customDraw(helper, _this.draw, value, context, grid, getRecord());
                if (!isCustomDraw) {
                    var padding = getActionTextPadding(context, helper, style);
                    if (active && state && state.mouseRelativePos) {
                        var rect = helper.getTextRect(value, ctx, {
                            font: font,
                            icons: icons,
                            padding: padding,
                            textAlign: textAlign,
                            textBaseline: textBaseline,
                            textOverflow: textOverflow,
                        });
                        var offset = _getTreeNodeSpaceWidth(treeInfo);
                        rect.left = Math.max(context.getRect().left + offset, rect.left + offset);
                        rect.right += offset;
                        active =
                            rect.left <= state.mouseRelativePos.x &&
                                rect.right >= state.mouseRelativePos.x &&
                                rect.top <= state.mouseRelativePos.y &&
                                rect.bottom >= state.mouseRelativePos.y;
                        state.mouseActive = active;
                    }
                    var record = info.getRecord();
                    var isMultilineText = getOrApply(_this.multilineText, record);
                    helper.tree(value, ctx, {
                        color: active ? linkColor || helper.theme.tree.linkColor : color,
                        lineColor: lineColor,
                        buttonColor: buttonColor,
                        buttonBgColor: buttonBgColor,
                        buttonBorderColor: buttonBorderColor,
                        icons: icons,
                        padding: padding,
                        textAlign: textAlign,
                        textBaseline: textBaseline,
                        textOverflow: textOverflow,
                        treeInfo: treeInfo,
                        treeNodeSpace: TREE_NODE_SPACE,
                        isMultilineText: isMultilineText,
                        autoWrapText: autoWrapText,
                        lineHeight: lineHeight,
                        lineClamp: lineClamp,
                    });
                }
                drawActionButton(grid, context, INLINE_INPUT_EDITOR_STATE_ID$4, helper, style);
                drawAttachArea(grid, getRecord(), context, helper, _this._cellStyle);
            });
        };
        TreeColumn.prototype.bindGridEvent = function (grid, cellId) {
            var _this = this;
            var expand = function (cell, all) {
                if (grid.dataSource instanceof TreeDataSource) {
                    var recordIndex = grid.getRecordIndexByRow(cell.row);
                    grid.dataSource.expand(recordIndex, all);
                }
            };
            var collapse = function (cell, all) {
                if (grid.dataSource instanceof TreeDataSource) {
                    var recordIndex = grid.getRecordIndexByRow(cell.row);
                    grid.dataSource.collapse(recordIndex, all);
                }
            };
            var toggle = function (cell, all) {
                if (grid.dataSource instanceof TreeDataSource) {
                    var recordIndex = grid.getRecordIndexByRow(cell.row);
                    grid.dataSource.toggle(recordIndex, all);
                }
            };
            function isTarget(col, row) {
                return grid.getLayoutCellId(col, row) === cellId;
            }
            var doMouseMove = function (e) {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                if (isPromise(grid.getRowRecord(e.row))) {
                    return;
                }
                if (_this._canToggle) {
                    var treeInfo = _getTreeInfo(grid, e.row);
                    if (treeInfo &&
                        _this._canToggle({
                            col: e.col,
                            event: e.event,
                            row: e.row,
                            treeInfo: treeInfo,
                            type: 'over',
                        }) === false) {
                        return;
                    }
                }
                var state = grid[BUTTON_COLUMN_STATE_ID$2];
                var actionState = grid[COLUMN_ACTION_STATE_ID$1];
                grid.getElement().style.cursor =
                    _isTreeNodeSpace(grid, e.col, e.row, e.event) ||
                        (state && state.mouseActive) ||
                        (actionState && actionState.mouseActive)
                        ? 'pointer'
                        : '';
            };
            var doMouseLeave = function (e) {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                grid.getElement().style.cursor = '';
            };
            return [
                // click
                grid.listen(DG_EVENT_TYPE.CLICK_CELL, function (e) {
                    if (!isTarget(e.col, e.row)) {
                        return;
                    }
                    if (isPromise(grid.getRowRecord(e.row))) {
                        return;
                    }
                    if (!_isTreeNodeSpace(grid, e.col, e.row, e.event)) {
                        return;
                    }
                    var treeInfo = _getTreeInfo(grid, e.row);
                    if (!treeInfo) {
                        return;
                    }
                    var isAll = e.event.shiftKey;
                    var type = treeInfo.expanded
                        ? isAll
                            ? 'collapseAll'
                            : 'collapse'
                        : isAll
                            ? 'expandAll'
                            : 'expand';
                    var params = {
                        col: e.col,
                        event: e.event,
                        row: e.row,
                        treeInfo: treeInfo,
                        type: type,
                    };
                    if (_this._canToggle && _this._canToggle(params) === false) {
                        return;
                    }
                    grid.selectCellRange(e.col, e.row, e.col, e.row);
                    toggle({
                        col: e.col,
                        row: e.row,
                    }, isAll);
                    if (_this._toggled) {
                        _this._toggled(params);
                    }
                    event.cancel(e.event);
                    return false;
                }),
                // mouse move
                grid.listen(DG_EVENT_TYPE.MOUSEENTER_CELL, doMouseMove),
                grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, doMouseMove),
                grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, doMouseMove),
                grid.listen(DG_EVENT_TYPE.MOUSELEAVE_CELL, doMouseLeave),
                grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, doMouseLeave),
                // key down
                grid.listen(DG_EVENT_TYPE.KEYDOWN, function (e) {
                    var keys = [KEY_DOWN, KEY_ENTER, KEY_LEFT, KEY_RIGHT, KEY_UP];
                    if (keys.indexOf(e.keyCode) === -1 ||
                        (!e.event.ctrlKey && !e.event.metaKey)) {
                        return;
                    }
                    var sel = grid.selection.select;
                    var cell = {
                        col: sel.col,
                        row: sel.row,
                    };
                    if (!isTarget(cell.col, cell.row)) {
                        return;
                    }
                    if (isPromise(grid.getRowRecord(cell.row))) {
                        return;
                    }
                    var treeInfo = _getTreeInfo(grid, cell.row);
                    if (!treeInfo) {
                        return;
                    }
                    var type;
                    if (e.keyCode === KEY_DOWN || e.keyCode === KEY_RIGHT) {
                        type = e.keyCode === KEY_DOWN ? 'expandAll' : 'expand';
                    }
                    else if (e.keyCode === KEY_UP || e.keyCode === KEY_LEFT) {
                        type = e.keyCode === KEY_UP ? 'collapseAll' : 'collapse';
                    }
                    else {
                        type = treeInfo.expanded
                            ? e.event.shiftKey
                                ? 'collapseAll'
                                : 'collapse'
                            : e.event.shiftKey
                                ? 'expandAll'
                                : 'expand';
                    }
                    var params = {
                        col: cell.col,
                        event: e.event,
                        row: cell.row,
                        treeInfo: treeInfo,
                        type: type,
                    };
                    if (_this._canToggle && _this._canToggle(params) === false) {
                        return;
                    }
                    if (e.keyCode === KEY_DOWN || e.keyCode === KEY_RIGHT) {
                        expand(cell, e.keyCode === KEY_DOWN);
                    }
                    else if (e.keyCode === KEY_UP || e.keyCode === KEY_LEFT) {
                        collapse(cell, e.keyCode === KEY_UP);
                    }
                    else {
                        toggle(cell, e.event.shiftKey);
                    }
                    if (_this._toggled) {
                        _this._toggled(params);
                    }
                    event.cancel(e.event);
                    return treeInfo.isLeaf; // 只有叶子节点允许不阻止后续事件执行
                }),
            ];
        };
        TreeColumn.prototype.drawEditingInternal = function (context, style, helper, grid, info) {
            _super.prototype.drawEditingInternal.call(this, context, style, helper, grid, info);
            var textAlign = style.textAlign;
            var textBaseline = style.textBaseline;
            var color = style.color;
            var treeInfo = _getTreeInfo(grid, context.row);
            var textOverflow = style.textOverflow;
            var autoWrapText = style.autoWrapText;
            var lineHeight = style.lineHeight;
            var lineClamp = style.lineClamp;
            var record = info.getRecord();
            var isMultilineText = getOrApply(this.multilineText, record);
            helper.tree('', context, {
                color: color,
                padding: getActionTextPadding(context, helper, style),
                textAlign: textAlign,
                textBaseline: textBaseline,
                textOverflow: textOverflow,
                treeInfo: treeInfo,
                treeNodeSpace: TREE_NODE_SPACE,
                isMultilineText: isMultilineText,
                autoWrapText: autoWrapText,
                lineHeight: lineHeight,
                lineClamp: lineClamp,
            });
        };
        return TreeColumn;
    }(BaseColumn));

    var RADIO_COLUMN_STATE_ID$1 = getRadioColumnStateId();
    var RadioColumn = /** @class */ (function (_super) {
        __extends(RadioColumn, _super);
        function RadioColumn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(RadioColumn.prototype, "StyleClass", {
            get: function () {
                return RadioStyle;
            },
            enumerable: false,
            configurable: true
        });
        RadioColumn.prototype.clone = function () {
            return new RadioColumn(this);
        };
        RadioColumn.prototype.convertInternal = function (value) {
            return toBoolean(value);
        };
        RadioColumn.prototype.drawInternal = function (value, context, style, helper, grid, _info) {
            var _a;
            var textAlign = style.textAlign, textBaseline = style.textBaseline, checkColor = style.checkColor, uncheckBorderColor = style.uncheckBorderColor, checkBorderColor = style.checkBorderColor, uncheckBgColor = style.uncheckBgColor, checkBgColor = style.checkBgColor;
            var col = context.col, row = context.row;
            var range = grid.getCellRange(col, row);
            var cellKey = range.start.col + ":" + range.start.row;
            var elapsed = (_a = grid[RADIO_COLUMN_STATE_ID$1]) === null || _a === void 0 ? void 0 : _a.elapsed[cellKey];
            var opt = {
                textAlign: textAlign,
                textBaseline: textBaseline,
                checkColor: checkColor,
                uncheckBorderColor: uncheckBorderColor,
                checkBorderColor: checkBorderColor,
                uncheckBgColor: uncheckBgColor,
                checkBgColor: checkBgColor,
            };
            if (isDef(elapsed)) {
                opt.animElapsedTime = elapsed;
            }
            helper.radioButton(value, context, opt);
        };
        return RadioColumn;
    }(BaseColumn));

    var TYPES = {
        DEFAULT: new Column(),
        NUMBER: new NumberColumn(),
        CHECK: new CheckColumn(),
        RADIO: new RadioColumn(),
        BUTTON: new ButtonColumn(),
        IMAGE: new ImageColumn(),
        MULTILINETEXT: new MultilineTextColumn(),
        DATE: new DateColumn(),
        LOOKUP: new LookupColumn(),
        SWITCH: new SwitchColumn(),
        TREE: new TreeColumn(),
        DRAW: new DrawColumn(),
    };
    function of$2(columnType) {
        if (!columnType) {
            return TYPES.DEFAULT;
        }
        else if (typeof columnType === 'string') {
            var key = columnType.toUpperCase();
            return TYPES[key] || of$2(null);
        }
        else {
            return columnType;
        }
    }

    var action = {
        ACTIONS: ACTIONS,
        BaseAction: BaseAction,
        Editor: Editor,
        BaseCheckEditor: BaseCheckEditor,
        BaseInputEditor: BaseInputEditor,
        BaseActionInput: BaseActionInput,
        Action: Action,
        CheckEditor: CheckEditor,
        RadioEditor: RadioEditor,
        SwitchEditor: SwitchEditor,
        ButtonAction: ButtonAction,
        SmallDialogInputEditor: SmallDialogInputEditor,
        InlineInputEditor: InlineInputEditor,
        InlineTextAreaEditor: InlineTextAreaEditor,
        InlineLookupEditor: InlineLookupEditor,
        InlineMenuEditor: InlineMenuEditor,
        of: of$1,
    };
    var style$2 = {
        EVENT_TYPE: EVENT_TYPE,
        BaseStyle: BaseStyle,
        BaseStdStyle: BaseStdStyle,
        BaseCheckStyle: BaseCheckStyle,
        Style: Style,
        NumberStyle: NumberStyle,
        CheckStyle: CheckStyle,
        RadioStyle: RadioStyle,
        SwitchStyle: SwitchStyle,
        ButtonStyle: ButtonStyle,
        ImageStyle: ImageStyle,
        IconStyle: IconStyle,
        PercentCompleteBarStyle: PercentCompleteBarStyle,
        MultilineTextStyle: MultilineTextStyle,
        MenuStyle: MenuStyle,
        DateStyle: DateStyle,
        LookupStyle: LookupStyle,
        TreeStyle: TreeStyle,
        DrawStyle: DrawStyle,
        of: of,
    };
    var type = {
        TYPES: TYPES,
        BaseColumn: BaseColumn,
        BaseCheckColumn: BaseCheckColumn,
        Column: Column,
        NumberColumn: NumberColumn,
        CheckColumn: CheckColumn,
        RadioColumn: RadioColumn,
        SwitchColumn: SwitchColumn,
        ButtonColumn: ButtonColumn,
        ImageColumn: ImageColumn,
        PercentCompleteBarColumn: PercentCompleteBarColumn,
        IconColumn: IconColumn,
        BranchGraphColumn: BranchGraphColumn,
        MenuColumn: MenuColumn,
        MultilineTextColumn: MultilineTextColumn,
        DateColumn: DateColumn,
        LookupColumn: LookupColumn,
        TreeColumn: TreeColumn,
        DrawColumn: DrawColumn,
        of: of$2,
    };
    /**
     * columns
     */
    var columns = { action: action, type: type, style: style$2 };

    var TYPE_PUNCTURE = 'p';
    var TYPE_UNIT = 'u';
    var TYPE_OPERATOR = 'o';
    var TYPE_NUMBER = 'n';
    var NODE_TYPE_UNIT = 'u';
    var NODE_TYPE_BINARY_EXPRESSION = 'b';
    var NODE_TYPE_NUMBER = 'n';
    function createError(calc) {
        return new Error("calc parse error: " + calc);
    }
    /**
     * tokenize
     * @param calc - calc expression
     * @returns tokens
     */
    function tokenize(calc) {
        var exp = calc.replace(/calc\(/g, '(');
        var reUnit = /^[-+]?(\d*\.\d+|\d+)[a-z%]+/i;
        var reNum = /^[-+]?(\d*\.\d+|\d+)/i;
        var reOp = /^[-+*/]/;
        var tokens = [];
        var re;
        while ((exp = exp.trim())) {
            if (exp[0] === '(' || exp[0] === ')') {
                tokens.push({ value: exp[0], type: TYPE_PUNCTURE });
                exp = exp.slice(1);
            }
            else if ((re = reUnit.exec(exp))) {
                tokens.push({ value: re[0], type: TYPE_UNIT });
                exp = exp.slice(re[0].length);
            }
            else if ((re = reNum.exec(exp))) {
                tokens.push({ value: re[0], type: TYPE_NUMBER });
                exp = exp.slice(re[0].length);
            }
            else if ((re = reOp.exec(exp))) {
                tokens.push({
                    value: re[0],
                    type: TYPE_OPERATOR,
                });
                exp = exp.slice(re[0].length);
            }
            else {
                throw createError(calc);
            }
        }
        return tokens;
    }
    var PRECEDENCE = {
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2,
    };
    function lex(tokens, calc) {
        var _a;
        function buildBinaryExpNode(stack) {
            var right = stack.pop();
            var op = stack.pop();
            var left = stack.pop();
            if (!left ||
                !left.nodeType ||
                !op ||
                op.type !== TYPE_OPERATOR ||
                !right ||
                !right.nodeType) {
                throw createError(calc);
            }
            return {
                nodeType: NODE_TYPE_BINARY_EXPRESSION,
                left: left,
                op: op,
                right: right,
            };
        }
        var stack = [];
        var _loop_1 = function () {
            var token = tokens.shift();
            if (token.type === TYPE_PUNCTURE && token.value === '(') {
                var deep_1 = 0;
                var closeIndex = array.findIndex(tokens, function (t) {
                    if (t.type === TYPE_PUNCTURE && t.value === '(') {
                        deep_1++;
                    }
                    else if (t.type === TYPE_PUNCTURE && t.value === ')') {
                        if (!deep_1) {
                            return true;
                        }
                        deep_1--;
                    }
                    return false;
                });
                if (closeIndex === -1) {
                    throw createError(calc);
                }
                stack.push(lex(tokens.slice(0, closeIndex), calc));
                tokens.splice(0, closeIndex + 1);
            }
            else if (token.type === TYPE_OPERATOR) {
                if (stack.length >= 3) {
                    var beforeOp = stack[stack.length - 2].value;
                    if (PRECEDENCE[token.value] <= PRECEDENCE[beforeOp]) {
                        stack.push(buildBinaryExpNode(stack));
                    }
                }
                stack.push(token);
            }
            else if (token.type === TYPE_UNIT) {
                var value = token.value;
                var num = parseFloat(value);
                var unit = ((_a = /[a-z%]+/i.exec(value)) === null || _a === void 0 ? void 0 : _a[0]) || '';
                stack.push({
                    nodeType: NODE_TYPE_UNIT,
                    value: num,
                    unit: unit,
                });
            }
            else if (token.type === TYPE_NUMBER) {
                stack.push({
                    nodeType: NODE_TYPE_NUMBER,
                    value: parseFloat(token.value),
                });
            }
        };
        while (tokens.length) {
            _loop_1();
        }
        while (stack.length > 1) {
            stack.push(buildBinaryExpNode(stack));
        }
        return stack[0];
    }
    function parse(calcStr) {
        var tokens = tokenize(calcStr);
        return lex(tokens, calcStr);
    }
    function calcNode(node, context) {
        if (node.nodeType === NODE_TYPE_BINARY_EXPRESSION) {
            var left = calcNode(node.left, context);
            var right = calcNode(node.right, context);
            switch (node.op.value) {
                case '+':
                    return left + right;
                case '-':
                    return left - right;
                case '*':
                    return left * right;
                case '/':
                    return left / right;
                default:
                    throw new Error("calc error. unknown operator: " + node.op.value);
            }
        }
        else if (node.nodeType === NODE_TYPE_UNIT) {
            switch (node.unit) {
                case '%':
                    return (node.value * context.full) / 100;
                case 'em':
                    return node.value * context.em;
                case 'px':
                    return node.value;
                default:
                    throw new Error("calc error. unknown unit: " + node.unit);
            }
        }
        else if (node.nodeType === NODE_TYPE_NUMBER) {
            return node.value;
        }
        throw new Error('calc error.');
    }
    function toPxInternal(value, context) {
        var ast = parse(value);
        return calcNode(ast, context);
    }
    function toPx(value, context) {
        if (typeof value === 'string') {
            return toPxInternal(value.trim(), context);
        }
        return value - 0;
    }

    var handler = new EventHandler();
    var ratio;
    function setRatio() {
        if (isNode) {
            ratio = 1;
        }
        else {
            ratio = Math.ceil(window.devicePixelRatio || 1);
            if (ratio > 1 && ratio % 2 !== 0) {
                ratio += 1;
            }
        }
    }
    setRatio();
    if (!isNode) {
        handler.on(window, 'resize', setRatio);
    }
    var hiDPI = {
        transform: function (canvas) {
            var ctx = canvas.getContext('2d');
            var getAttribute = canvas.getAttribute;
            var setAttribute = canvas.setAttribute;
            canvas.getAttribute = (function (me) { return function (name) {
                var result = getAttribute.apply(me, [name]);
                if (name === 'width' || name === 'height') {
                    result /= ratio;
                }
                return result;
            }; })(canvas);
            canvas.setAttribute = (function (me) { return function (name, val) {
                var wh = name === 'width' || name === 'height';
                if (wh) {
                    val = ratio * Number(val) + '';
                }
                var result = setAttribute.apply(me, [name, val]);
                if (wh && ctx) {
                    ctx.scale(ratio, ratio);
                }
                return result;
            }; })(canvas);
            Object.defineProperty(canvas, 'width', {
                configurable: true,
                enumerable: true,
                get: function () {
                    return canvas.getAttribute('width');
                },
                set: function (val) {
                    canvas.setAttribute('width', Math.floor(val) + '');
                },
            });
            Object.defineProperty(canvas, 'height', {
                configurable: true,
                enumerable: true,
                get: function () {
                    return canvas.getAttribute('height');
                },
                set: function (val) {
                    canvas.setAttribute('height', Math.floor(val) + '');
                },
            });
            if (ctx) {
                var drawImage_1 = ctx.drawImage;
                ctx.drawImage = (function (me) { return function (img) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    if (img !== canvas || ratio === 1) {
                        return drawImage_1.apply(me, [img].concat(args));
                    }
                    me.save();
                    try {
                        me.scale(1 / ratio, 1 / ratio);
                        if (args.length > 4) {
                            args[4] *= ratio;
                            args[5] *= ratio;
                        }
                        else {
                            args[0] *= ratio;
                            args[1] *= ratio;
                        }
                        return drawImage_1.apply(me, [img].concat(args));
                    }
                    finally {
                        me.restore();
                    }
                }; })(ctx);
            }
            return canvas;
        },
    };

    var indexFirst = function (ary, elm) {
        var low = 0;
        var high = ary.length - 1;
        while (low <= high) {
            var i = Math.floor((low + high) / 2);
            if (ary[i] === elm) {
                return i;
            }
            else if (ary[i] > elm) {
                high = i - 1;
            }
            else {
                low = i + 1;
            }
        }
        return high < 0 ? 0 : high;
    };
    var NumberMap = /** @class */ (function () {
        function NumberMap() {
            this._keys = [];
            this._vals = {};
            this._sorted = false;
        }
        NumberMap.prototype.put = function (key, value) {
            if (!(key in this._vals)) {
                this._keys.push(key);
                this._sorted = false;
            }
            this._vals[key] = value;
        };
        NumberMap.prototype.get = function (key) {
            return this._vals[key];
        };
        NumberMap.prototype.has = function (key) {
            return this._vals[key] !== null;
        };
        NumberMap.prototype.each = function (keyFrom, keyTo, fn) {
            var keys = this._keys;
            var length = keys.length;
            if (!this._sorted) {
                keys.sort(function (a, b) {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    return 0;
                });
                this._sorted = true;
            }
            for (var i = indexFirst(keys, keyFrom); i < length; i++) {
                var key = keys[i];
                if (keyFrom <= key && key <= keyTo) {
                    fn(this.get(key), key);
                }
                else if (keyTo < key) {
                    return;
                }
            }
        };
        return NumberMap;
    }());

    var MAX_SCROLL = browser.heightLimit - 1000;
    var Scrollbar = /** @class */ (function () {
        function Scrollbar() {
            var _this = this;
            this._handler = new EventHandler();
            this._scrollable = document.createElement('div');
            this._scrollable.classList.add('grid-scrollable');
            this._height = 0;
            this._width = 0;
            this._perfectScrollbar = new window.PerfectScrollbar(this._scrollable, {
                minScrollbarLength: 24,
            });
            this._handler.on(this._scrollable, 'click', function (e) {
                if (e.target !== _this._scrollable) {
                    event.cancel(e);
                }
            });
            this._p = 1;
            this._endPointElement = document.createElement('div');
            this._endPointElement.classList.add('grid-scroll-end-point');
            this._update();
            this._scrollable.appendChild(this._endPointElement);
        }
        Scrollbar.prototype.calcTop = function (top) {
            var relativeTop = top - this.scrollTop;
            return this._scrollable.scrollTop + relativeTop;
        };
        Scrollbar.prototype.getElement = function () {
            return this._scrollable;
        };
        Scrollbar.prototype.setScrollSize = function (width, height) {
            this._width = width;
            this._height = height;
            this._update();
        };
        Object.defineProperty(Scrollbar.prototype, "scrollWidth", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
                this._update();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Scrollbar.prototype, "scrollHeight", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
                this._update();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Scrollbar.prototype, "scrollLeft", {
            get: function () {
                return Math.max(Math.ceil(this._scrollable.scrollLeft), 0);
            },
            set: function (scrollLeft) {
                this._scrollable.scrollLeft = scrollLeft;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Scrollbar.prototype, "scrollTop", {
            get: function () {
                return Math.max(Math.ceil(this._scrollable.scrollTop / this._p), 0);
            },
            set: function (scrollTop) {
                this._scrollable.scrollTop = scrollTop * this._p;
            },
            enumerable: false,
            configurable: true
        });
        Scrollbar.prototype.onScroll = function (fn) {
            this._handler.on(this._scrollable, 'scroll', fn);
        };
        Scrollbar.prototype.dispose = function () {
            this._handler.dispose();
        };
        Scrollbar.prototype.update = function () {
            this._update();
        };
        Scrollbar.prototype._update = function () {
            var domHeight;
            if (this._height > MAX_SCROLL) {
                var sbSize = style$1.getScrollBarSize();
                var offsetHeight = this._scrollable.offsetHeight;
                var vScrollRange = MAX_SCROLL - offsetHeight + sbSize;
                var rScrollRange = this._height - offsetHeight + sbSize;
                this._p = vScrollRange / rScrollRange;
                domHeight = MAX_SCROLL;
            }
            else {
                this._p = 1;
                domHeight = this._height;
            }
            domHeight -= 1;
            var domWidth = this._width - 1;
            this._endPointElement.style.top = domHeight.toFixed() + "px";
            this._endPointElement.style.left = domWidth.toFixed() + "px";
            this._perfectScrollbar.update();
        };
        return Scrollbar;
    }());

    var MAX_SCROLL$1 = browser.heightLimit - 1000;
    var Scrollable = /** @class */ (function () {
        function Scrollable(canvas) {
            this._canvas = canvas;
            this._handler = new EventHandler();
            this._scrollable = document.createElement('div');
            this._scrollable.classList.add('grid-scrollable');
            this._height = 0;
            this._width = 0;
            this._p = 1;
            this._endPointElement = document.createElement('div');
            this._endPointElement.classList.add('grid-scroll-end-point');
            this._update();
            this._scrollable.appendChild(this._endPointElement);
            // const mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ?
            //     "DOMMouseScroll" : "mousewheel"; // FF doesn"t recognize mousewheel as of FF3.x
            // this._handler.on(this._scrollable, mousewheelevt, (evt) => {
            //     const delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta;
            //     const point = Math.min(Math.abs(delta) / 12, this.scrollHeight / 5);
            //     this.scrollTop += delta < 0 ? point : -point;
            // });
        }
        Scrollable.prototype.calcTop = function (top) {
            var relativeTop = top - this.scrollTop;
            return this._scrollable.scrollTop + relativeTop;
        };
        Scrollable.prototype.getElement = function () {
            return this._scrollable;
        };
        Scrollable.prototype.setScrollSize = function (width, height) {
            this._width = width;
            this._height = height;
            this._update();
        };
        Object.defineProperty(Scrollable.prototype, "scrollWidth", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
                this._update();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Scrollable.prototype, "scrollHeight", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
                this._update();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Scrollable.prototype, "scrollLeft", {
            get: function () {
                return Math.max(Math.ceil(this._scrollable.scrollLeft), 0);
            },
            set: function (scrollLeft) {
                this._scrollable.scrollLeft = scrollLeft;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Scrollable.prototype, "scrollTop", {
            get: function () {
                return Math.max(Math.ceil(this._scrollable.scrollTop / this._p), 0);
            },
            set: function (scrollTop) {
                this._scrollable.scrollTop = scrollTop * this._p;
            },
            enumerable: false,
            configurable: true
        });
        Scrollable.prototype.onScroll = function (fn) {
            this._handler.on(this._scrollable, 'scroll', fn);
        };
        Scrollable.prototype.dispose = function () {
            this._handler.dispose();
        };
        Scrollable.prototype.update = function () {
            this._update();
        };
        Scrollable.prototype._update = function () {
            var domHeight;
            var sbSize = style$1.getScrollBarSize();
            if (this._height > MAX_SCROLL$1) {
                var offsetHeight = this._scrollable.offsetHeight;
                var vScrollRange = MAX_SCROLL$1 - offsetHeight + sbSize;
                var rScrollRange = this._height - offsetHeight + sbSize;
                this._p = vScrollRange / rScrollRange;
                domHeight = MAX_SCROLL$1;
            }
            else {
                this._p = 1;
                domHeight = this._height;
            }
            var domWidth = this._width;
            // TODO: windows 下横纵滚动条都存在时，显示多余空白问题
            // const isWindows = /windows|win32/i.test(window.navigator.userAgent);
            var top = domHeight > this._canvas.height ? domHeight : domHeight - sbSize;
            var left = domWidth > this._canvas.width ? domWidth : domWidth - sbSize;
            this._endPointElement.style.top = top.toFixed() + "px";
            this._endPointElement.style.left = left.toFixed() + "px";
            // 不让滚动条位置超出范围
            var maxScrollTop = Math.max(0, top - this._canvas.height);
            if (this._scrollable.scrollTop > maxScrollTop) {
                this._scrollable.scrollTop = maxScrollTop;
            }
            var maxScrollLeft = Math.max(0, left - this._canvas.width);
            if (this._scrollable.scrollLeft > maxScrollLeft) {
                this._scrollable.scrollLeft = maxScrollLeft;
            }
        };
        return Scrollable;
    }());

    /**
     * managing mouse down moving
     */
    var BaseMouseDownMover = /** @class */ (function () {
        function BaseMouseDownMover(grid) {
            this._grid = grid;
            this._handler = new EventHandler();
            this._events = {};
            this._started = false;
            this._moved = false;
            this._mouseEndPoint = null;
        }
        Object.defineProperty(BaseMouseDownMover.prototype, "grid", {
            get: function () {
                return this._grid;
            },
            enumerable: false,
            configurable: true
        });
        BaseMouseDownMover.prototype.moving = function (e) {
            return !!this._started;
        };
        BaseMouseDownMover.prototype.lastMoving = function (e) {
            // 必要的控制以防止点击事件在mouseup后立即作出反应
            if (this.moving(e)) {
                return true;
            }
            var last = this._mouseEndPoint;
            if (!last) {
                return false;
            }
            var pt = this._grid._getMouseAbstractPoint(e);
            return !!pt && pt.x === last.x && pt.y === last.y;
        };
        BaseMouseDownMover.prototype.dispose = function () {
            this._handler.dispose();
        };
        BaseMouseDownMover.prototype._bindMoveAndUp = function (e) {
            var _this = this;
            var events = this._events;
            var handler = this._handler;
            if (!event.isTouchEvent(e)) {
                events.mousemove = handler.on(document.body, 'mousemove', function (event) {
                    return _this._mouseMove(event);
                });
                events.mouseup = handler.on(document.body, 'mouseup', function (event) {
                    return _this._mouseUp(event);
                });
            }
            else {
                events.touchmove = handler.on(document.body, 'touchmove', function (event) { return _this._mouseMove(event); }, {
                    passive: false,
                });
                events.touchend = handler.on(document.body, 'touchend', function (event) {
                    return _this._mouseUp(event);
                });
                events.touchcancel = handler.on(document.body, 'touchcancel', function (event) {
                    return _this._mouseUp(event);
                });
            }
            this._started = true;
            this._moved = false;
        };
        BaseMouseDownMover.prototype._mouseMove = function (e) {
            if (!event.isTouchEvent(e)) {
                if (event.getMouseButtons(e) !== 1) {
                    this._mouseUp(e);
                    return;
                }
            }
            this._moved =
                this._moveInternal(e) || this._moved; /* calculation on after */
            event.cancel(e);
        };
        BaseMouseDownMover.prototype._mouseUp = function (e) {
            var _this = this;
            var events = this._events;
            var handler = this._handler;
            handler.off(events.mousemove);
            handler.off(events.touchmove);
            handler.off(events.mouseup);
            handler.off(events.touchend);
            // handler.off(events.mouseleave);
            handler.off(events.touchcancel);
            this._upInternal(e);
            // 必要的控制以防止点击事件在mouseup后立即作出反应
            if (this._moved) {
                // 如果发生了移动
                this._mouseEndPoint = this._grid._getMouseAbstractPoint(e);
                setTimeout(function () {
                    _this._mouseEndPoint = null;
                    _this._started = false;
                }, 10);
            }
            else {
                this._started = false;
            }
            event.cancel(e);
        };
        BaseMouseDownMover.prototype._upInternal = function (e) {
            // nothing
        };
        BaseMouseDownMover.prototype._vibrate = function (e) {
            if (navigator.vibrate && event.isTouchEvent(e)) {
                navigator.vibrate(50);
            }
        };
        return BaseMouseDownMover;
    }());

    /**
     * managing cell selection operation with mouse
     */
    var CellSelector = /** @class */ (function (_super) {
        __extends(CellSelector, _super);
        function CellSelector() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._cell = { col: -1, row: -1 };
            return _this;
        }
        CellSelector.prototype.start = function (e) {
            var cell = this._getTargetCell(e);
            if (!cell) {
                this.grid._forceFocusCell();
                event.cancel(e);
                return;
            }
            this.grid.fireListeners(DG_EVENT_TYPE.MOUSE_SELECTED_START, e);
            this.grid._moveFocusCell(cell.col, cell.row, e.shiftKey);
            this._bindMoveAndUp(e);
            this._cell = cell;
            event.cancel(e);
            this._vibrate(e);
        };
        CellSelector.prototype.select = function (e) {
            var cell = this._getTargetCell(e);
            if (!cell) {
                return;
            }
            this.grid._moveFocusCell(cell.col, cell.row, e.shiftKey);
            this._cell = cell;
        };
        CellSelector.prototype._upInternal = function (e) {
            this.grid.fireListeners(DG_EVENT_TYPE.MOUSE_SELECTED_END, e);
        };
        CellSelector.prototype._moveInternal = function (e) {
            var cell = this._getTargetCell(e);
            if (!cell) {
                return false;
            }
            var oldCol = this._cell.col;
            var oldRow = this._cell.row;
            var newCol = cell.col;
            var newRow = cell.row;
            if (oldCol === newCol && oldRow === newRow) {
                return false;
            }
            var grid = this.grid;
            grid._moveFocusCell(newCol, newRow, true, true);
            // make visible
            var makeVisibleCol = (function () {
                if (newCol < oldCol && 0 < newCol) {
                    // move left
                    return newCol - 1;
                }
                else if (oldCol < newCol && newCol + 1 < grid.colCount) {
                    // move right
                    return newCol + 1;
                }
                return newCol;
            })();
            var makeVisibleRow = (function () {
                if (newRow < oldRow && 0 < newRow) {
                    // move up
                    return newRow - 1;
                }
                else if (oldRow < newRow && newRow + 1 < grid.rowCount) {
                    // move down
                    return newRow + 1;
                }
                return newRow;
            })();
            if (makeVisibleCol !== newCol || makeVisibleRow !== newRow) {
                grid.makeVisibleCell(makeVisibleCol, makeVisibleRow);
            }
            this._cell = cell;
            return true;
        };
        CellSelector.prototype._getTargetCell = function (e) {
            var grid = this.grid;
            var abstractPos = grid._getMouseAbstractPoint(e);
            if (!abstractPos) {
                return null;
            }
            var cell = grid.getCellAt(abstractPos.x, abstractPos.y);
            if (cell.col < 0 || cell.row < 0) {
                return null;
            }
            return cell;
        };
        return CellSelector;
    }(BaseMouseDownMover));

    /**
     * managing row width changing operation with mouse
     */
    var ColumnResizer = /** @class */ (function (_super) {
        __extends(ColumnResizer, _super);
        function ColumnResizer(grid) {
            var _this = _super.call(this, grid) || this;
            _this._targetCol = -1;
            _this._x = 0;
            _this._preX = 0;
            _this._invalidateAbsoluteLeft = 0;
            return _this;
        }
        ColumnResizer.prototype.start = function (col, e) {
            var pageX;
            if (!event.isTouchEvent(e)) {
                (pageX = e.pageX);
            }
            else {
                (pageX = e.changedTouches[0].pageX);
            }
            this._x = pageX;
            this._preX = 0;
            this.grid._resetColWidthOffset(col);
            this._bindMoveAndUp(e);
            this._targetCol = col;
            // 由于有合并单元格，所以起始刷新列始终从 0 开始计算
            // this._invalidateAbsoluteLeft = this.grid._getColsWidth(0, col - 1)
            event.cancel(e);
            this._vibrate(e);
        };
        ColumnResizer.prototype._moveInternal = function (e) {
            var pageX = event.isTouchEvent(e)
                ? e.changedTouches[0].pageX
                : e.pageX;
            var x = pageX - this._x;
            var moveX = x - this._preX;
            this._preX = x;
            var pre = this.grid.getColWidth(this._targetCol);
            var afterSize = this.grid._adjustColWidth(this._targetCol, pre + moveX);
            if (afterSize < 10 && moveX < 0) {
                afterSize = 10;
            }
            this.grid._storeAutoColWidthExprs();
            this.grid.setColWidth(this._targetCol, afterSize);
            var rect = this.grid._getVisibleRect();
            rect.left = this._invalidateAbsoluteLeft;
            this.grid._invalidateRect(rect);
            this.grid.fireListeners(DG_EVENT_TYPE.RESIZE_COLUMN, {
                col: this._targetCol,
            });
            return true;
        };
        ColumnResizer.prototype._upInternal = function (e) {
            if (this.grid.updateScroll()) {
                this.grid.invalidate();
            }
        };
        return ColumnResizer;
    }(BaseMouseDownMover));

    function createCellRange(startCol, startRow, endCol, endRow) {
        return {
            start: { col: startCol, row: startRow },
            end: { col: endCol, row: endRow },
        };
    }
    /**
     * Context of cell drawing
     */
    var DrawCellContext = /** @class */ (function () {
        /**
         * constructor
         */
        function DrawCellContext(col, row, ctx, rect, drawRect, drawing, selection, drawLayers) {
            this._rectFilter = null;
            this._col = col;
            this._row = row;
            this._mode = 0;
            this._range = createCellRange(col, row, col, row);
            this._ctx = ctx;
            this._rect = rect;
            this._drawRect = drawRect;
            this._drawing = drawing;
            this._selection = selection;
            this._drawLayers = drawLayers;
            this._childContexts = [];
        }
        Object.defineProperty(DrawCellContext.prototype, "drawing", {
            get: function () {
                if (this._mode === 0) {
                    return this._drawing;
                }
                else {
                    return true;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawCellContext.prototype, "row", {
            get: function () {
                return this._row;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawCellContext.prototype, "col", {
            get: function () {
                return this._col;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawCellContext.prototype, "range", {
            get: function () {
                return this._range;
            },
            set: function (range) {
                this._range = range;
            },
            enumerable: false,
            configurable: true
        });
        DrawCellContext.prototype.cancel = function () {
            this._cancel = true;
            this._childContexts.forEach(function (ctx) {
                ctx.cancel();
            });
        };
        /**
         * select status.
         */
        DrawCellContext.prototype.getSelection = function () {
            return {
                border: this._selection.border(this._col, this._row),
                dragged: this._selection.drag.inDrag(this._col, this._row),
                select: this._selection.drag.select,
                range: this._selection.range,
            };
        };
        /**
         * Canvas context.
         */
        DrawCellContext.prototype.getContext = function () {
            if (this._mode === 0) {
                return this._ctx;
            }
            else {
                return this._grid._getInitContext();
            }
        };
        /**
         * Rectangle of cell.
         */
        DrawCellContext.prototype.getRect = function () {
            var rectFilter = this._rectFilter;
            return rectFilter
                ? rectFilter(this._getRectInternal())
                : this._getRectInternal();
        };
        DrawCellContext.prototype.setRectFilter = function (rectFilter) {
            this._rectFilter = rectFilter;
        };
        /**
         * Rectangle of Drawing range.
         */
        DrawCellContext.prototype.getDrawRect = function () {
            if (this._cancel) {
                return null;
            }
            if (this._mode === 0) {
                return this._drawRect;
            }
            else {
                if (this._isOutOfRange()) {
                    return null;
                }
                var absoluteRect = this._grid.getCellRect(this._col, this._row);
                return this._toRelativeDrawRect(absoluteRect);
            }
        };
        /**
         * get Context of current state
         */
        DrawCellContext.prototype.toCurrentContext = function () {
            if (this._mode === 0) {
                return this;
            }
            else {
                var absoluteRect = this._grid.getCellRect(this._col, this._row);
                var rect = this._grid._toRelativeRect(absoluteRect);
                var drawRect = this._isOutOfRange()
                    ? null
                    : this._toRelativeDrawRect(absoluteRect);
                var context = new DrawCellContext(this._col, this._row, this.getContext(), rect, drawRect, this.drawing, this._selection, this._drawLayers);
                // toCurrentContext 调用 this.toCurrentContext
                context.toCurrentContext = this.toCurrentContext.bind(this);
                this._childContexts.push(context);
                if (this._cancel) {
                    context.cancel();
                }
                context._rectFilter = this._rectFilter;
                return context;
            }
        };
        DrawCellContext.prototype.addLayerDraw = function (level, fn) {
            this._drawLayers.addDraw(level, fn);
        };
        DrawCellContext.prototype._delayMode = function (grid, onTerminate) {
            this._mode = 1;
            this._ctx = null;
            this._rect = null;
            this._drawRect = null;
            this._grid = grid;
            this._onTerminate = onTerminate;
        };
        /**
         * terminate
         */
        DrawCellContext.prototype.terminate = function () {
            var _a;
            if (this._mode !== 0) {
                (_a = this._onTerminate) === null || _a === void 0 ? void 0 : _a.call(this);
            }
        };
        DrawCellContext.prototype._getRectInternal = function () {
            if (this._mode === 0) {
                return this._rect;
            }
            else {
                if (this._rect) {
                    return this._rect;
                }
                return this._grid.getCellRelativeRect(this._col, this._row);
            }
        };
        DrawCellContext.prototype._isOutOfRange = function () {
            var _a = this._grid, colCount = _a.colCount, rowCount = _a.rowCount;
            return colCount <= this._col || rowCount <= this._row;
        };
        DrawCellContext.prototype._toRelativeDrawRect = function (absoluteRect) {
            var grid = this._grid;
            var visibleRect = grid._getVisibleRect();
            var rect = absoluteRect.copy();
            if (!rect.intersection(visibleRect)) {
                return null;
            }
            var isFrozenCell = grid.isFrozenCell(this._col, this._row);
            if (grid.frozenColCount >= 0 && (!isFrozenCell || !isFrozenCell.col)) {
                var fRect = grid.getCellRect(grid.frozenColCount - 1, this._row);
                rect = Rect.bounds(Math.max(rect.left, fRect.right), rect.top, rect.right, rect.bottom);
            }
            if (grid.frozenRowCount >= 0 && (!isFrozenCell || !isFrozenCell.row)) {
                var fRect = grid.getCellRect(this._col, grid.frozenRowCount - 1);
                rect = Rect.bounds(rect.left, Math.max(rect.top, fRect.bottom), rect.right, rect.bottom);
            }
            if (!rect.intersection(visibleRect)) {
                return null;
            }
            rect.offsetLeft(-visibleRect.left);
            rect.offsetTop(-visibleRect.top);
            return rect;
        };
        return DrawCellContext;
    }());

    var DrawLayer = /** @class */ (function () {
        function DrawLayer(level) {
            this._level = level;
            this._list = [];
        }
        Object.defineProperty(DrawLayer.prototype, "level", {
            get: function () {
                return this._level;
            },
            enumerable: false,
            configurable: true
        });
        DrawLayer.prototype.addDraw = function (fn) {
            this._list.push(fn);
        };
        DrawLayer.prototype.draw = function (ctx) {
            this._list.forEach(function (fn) {
                ctx.save();
                try {
                    fn(ctx);
                }
                finally {
                    ctx.restore();
                }
            });
        };
        return DrawLayer;
    }());

    /**
     * This class manages the drawing process for each layer
     */
    var DrawLayers = /** @class */ (function () {
        function DrawLayers() {
            this._layers = {};
        }
        DrawLayers.prototype.addDraw = function (level, fn) {
            var l = this._layers[level] || (this._layers[level] = new DrawLayer(level));
            l.addDraw(fn);
        };
        DrawLayers.prototype.draw = function (ctx) {
            var list = [];
            for (var k in this._layers) {
                if (this._layers.hasOwnProperty(k)) {
                    list.push(this._layers[k]);
                }
            }
            list.sort(function (a, b) { return a.level - b.level; });
            list.forEach(function (l) { return l.draw(ctx); });
        };
        return DrawLayers;
    }());

    function _setSafeInputValue(input, value) {
        var type = input.type;
        input.type = '';
        input.value = value;
        if (type) {
            input.type = type;
        }
    }
    /**
     * Manage focus
     */
    var FocusControl = /** @class */ (function (_super) {
        __extends(FocusControl, _super);
        function FocusControl(grid, parentElement, scrollable) {
            var _this = _super.call(this) || this;
            _this._isComposition = false;
            _this._grid = grid;
            _this._scrollable = scrollable;
            var handler = (_this._handler = new EventHandler());
            var input = (_this._input = document.createElement('input'));
            input.classList.add('grid-focus-control');
            input.readOnly = true;
            parentElement.appendChild(input);
            handler.on(input, 'compositionstart', function (e) {
                input.classList.add('composition');
                input.style.font = grid.font || '16px sans-serif';
                _this._isComposition = true;
                if (_this._compositionEnd) {
                    clearTimeout(_this._compositionEnd);
                    delete _this._compositionEnd;
                }
                grid.focus();
            });
            var lastInputValue;
            var inputClear = function () {
                lastInputValue = input.value;
                if (_this._isComposition) {
                    return;
                }
                if (lastInputValue !== '') {
                    _setSafeInputValue(input, '');
                }
            };
            var handleCompositionEnd = function () {
                _this._isComposition = false;
                input.classList.remove('composition');
                input.style.font = '';
                var value = input.value;
                inputClear();
                if (!input.readOnly) {
                    _this.fireListeners('input', value);
                }
                if (_this._compositionEnd) {
                    clearTimeout(_this._compositionEnd);
                    delete _this._compositionEnd;
                }
            };
            handler.on(input, 'compositionend', function (e) {
                _this._compositionEnd = setTimeout(handleCompositionEnd, 0);
            });
            handler.on(input, 'keypress', function (e) {
                if (_this._isComposition) {
                    return;
                }
                if (!input.readOnly && e.key && e.key.length === 1) {
                    if (e.ctrlKey || e.metaKey) {
                        if (e.key === 'c') ;
                        else if (e.key === 'v') ;
                        else if (e.key === 'x') ;
                    }
                    else {
                        if (e.key === ' ') {
                            // Since the full-width space cannot be determined, it is processed by "input".
                            return;
                        }
                        _this.fireListeners('input', e.key);
                        event.cancel(e);
                    }
                }
                inputClear();
            });
            handler.on(input, 'keydown', function (e) {
                var _a;
                if (_this._isComposition) {
                    if (_this._compositionEnd) {
                        handleCompositionEnd();
                        event.cancel(e);
                    }
                    return;
                }
                var keyCode = event.getKeyCode(e);
                var stopCellMove = false;
                var evt = {
                    keyCode: keyCode,
                    event: e,
                    stopCellMoving: function () {
                        stopCellMove = true;
                    },
                };
                var results = _this.fireListeners('keydown', evt);
                if (array.findIndex(results, function (v) { return v === false; }) >= 0) {
                    return;
                }
                if (!input.readOnly && lastInputValue && browser.Safari) {
                    // for Safari
                    _this.fireListeners('input', lastInputValue);
                }
                if (!stopCellMove)
                    _this.fireKeyDownMove(keyCode, e);
                if (((_a = _this._grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.deleteCellValueOnDel) &&
                    (keyCode === KEY_DEL || keyCode === KEY_BS)) {
                    _this.fireListeners('delete', e);
                }
                inputClear();
            });
            handler.on(input, 'keyup', function (e) {
                if (_this._isComposition) {
                    if (_this._compositionEnd) {
                        handleCompositionEnd();
                    }
                }
                inputClear();
            });
            handler.on(input, 'input', function (e) {
                if (e.data === ' ' || e.data === '　') {
                    // Since the full-width space cannot be determined on "keypress", it is processed by "input".
                    _this.fireListeners('input', e.data);
                }
                inputClear();
            });
            if (browser.IE) {
                handler.on(document, 'keydown', function (e) {
                    if (e.target !== input) {
                        return;
                    }
                    var keyCode = event.getKeyCode(e);
                    if (keyCode === KEY_ALPHA_C && e.ctrlKey) {
                        // When text is not selected copy-event is not emit, on IE.
                        _setSafeInputValue(input, 'dummy');
                        input.select();
                        setTimeout(function () {
                            _setSafeInputValue(input, '');
                        }, 100);
                    }
                    else if (keyCode === KEY_ALPHA_V && e.ctrlKey) {
                        // When input is read-only paste-event is not emit, on IE.
                        if (input.readOnly) {
                            input.readOnly = false;
                            setTimeout(function () {
                                input.readOnly = true;
                                _setSafeInputValue(input, '');
                            }, 10);
                        }
                    }
                });
            }
            if (browser.Edge) {
                handler.once(document, 'keydown', function (e) {
                    if (!isDescendantElement(parentElement, e.target)) {
                        return;
                    }
                    // When the input has focus on the first page opening,
                    // the paste-event and copy-event is not emit, on Edge.
                    var dummyInput = document.createElement('input');
                    grid.getElement().appendChild(dummyInput);
                    dummyInput.focus();
                    input.focus();
                    if (dummyInput.parentElement) {
                        dummyInput.parentElement.removeChild(dummyInput);
                    }
                });
            }
            handler.on(document, 'paste', function (e) {
                if (_this._isComposition) {
                    return;
                }
                if (!isDescendantElement(parentElement, e.target)) {
                    return;
                }
                setTimeout(function () {
                    inputClear();
                }, 100);
                var pasteText;
                if (browser.IE) {
                    // IE
                    pasteText = window.clipboardData.getData('Text');
                }
                else {
                    var clipboardData = e.clipboardData;
                    if (clipboardData) {
                        if (clipboardData.items) {
                            // Chrome & Firefox & Edge
                            pasteText = clipboardData.getData('text/plain');
                        }
                        else {
                            // Safari
                            if (-1 !==
                                Array.prototype.indexOf.call(clipboardData.types, 'text/plain')) {
                                pasteText = clipboardData.getData('Text');
                            }
                        }
                    }
                }
                if (isDef(pasteText) && pasteText.length) {
                    _this.fireListeners('paste', { value: pasteText, event: e });
                }
            });
            var copy = function (data, e) {
                if (isDef(data)) {
                    event.cancel(e);
                    if (browser.IE) {
                        var cData = window.clipboardData;
                        if (cData) {
                            cData.setData('Text', data); // IE
                        }
                    }
                    else {
                        var cData = e.clipboardData;
                        if (cData) {
                            cData.setData('text/plain', data); // Chrome, Firefox
                        }
                    }
                }
            };
            handler.on(document, 'copy', function (e) {
                if (_this._isComposition) {
                    return;
                }
                if (!isDescendantElement(parentElement, e.target)) {
                    return;
                }
                _setSafeInputValue(input, '');
                var data = array.find(_this.fireListeners('copy', e), isDef);
                copy(data, e);
            });
            handler.on(document, 'cut', function (e) {
                if (_this._isComposition) {
                    return;
                }
                if (!isDescendantElement(parentElement, e.target)) {
                    return;
                }
                _setSafeInputValue(input, '');
                var data = array.find(_this.fireListeners('cut', e), isDef);
                copy(data, e);
            });
            handler.on(input, 'focus', function (e) {
                _this.fireListeners('focus', e);
            });
            handler.on(input, 'blur', function (e) {
                _this.fireListeners('blur', e);
            });
            return _this;
        }
        FocusControl.prototype.fireKeyDownMove = function (keyCode, e) {
            var _a, _b, _c;
            var fn = this._keyDownMoveCallback;
            if (!fn) {
                return;
            }
            if (this._isComposition) {
                return;
            }
            if (keyCode === KEY_LEFT ||
                keyCode === KEY_UP ||
                keyCode === KEY_RIGHT ||
                keyCode === KEY_DOWN ||
                keyCode === KEY_HOME ||
                keyCode === KEY_END) {
                fn(e);
            }
            else if (((_a = this._grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab) &&
                keyCode === KEY_TAB) {
                fn(e);
            }
            else if (((_b = this._grid.keyboardOptions) === null || _b === void 0 ? void 0 : _b.moveCellOnEnter) &&
                keyCode === KEY_ENTER) {
                fn(e);
            }
            else if (((_c = this._grid.keyboardOptions) === null || _c === void 0 ? void 0 : _c.selectAllOnCtrlA) &&
                keyCode === KEY_ALPHA_A &&
                (e.ctrlKey || e.metaKey)) {
                fn(e);
            }
        };
        FocusControl.prototype.onKeyDownMove = function (fn) {
            this._keyDownMoveCallback = fn;
        };
        FocusControl.prototype.onKeyDown = function (fn) {
            return this.listen('keydown', fn);
        };
        FocusControl.prototype.onInput = function (fn) {
            return this.listen('input', fn);
        };
        FocusControl.prototype.onDelete = function (fn) {
            return this.listen('delete', fn);
        };
        FocusControl.prototype.onCopy = function (fn) {
            return this.listen('copy', fn);
        };
        FocusControl.prototype.onPaste = function (fn) {
            return this.listen('paste', fn);
        };
        FocusControl.prototype.onCut = function (fn) {
            return this.listen('cut', fn);
        };
        FocusControl.prototype.onFocus = function (fn) {
            return this.listen('focus', fn);
        };
        FocusControl.prototype.onBlur = function (fn) {
            return this.listen('blur', fn);
        };
        FocusControl.prototype.focus = function () {
            // this._input.value = "";
            this._input.focus();
        };
        FocusControl.prototype.setFocusRect = function (rect) {
            var input = this._input;
            var top = this._scrollable.calcTop(rect.top);
            // 位置：相对 但是，如果IE不是position：relative，则不能使用最大值
            input.style.top = (top - style$1.getScrollBarSize()).toFixed() + "px";
            input.style.left = rect.left.toFixed() + "px";
            input.style.width = rect.width.toFixed() + "px";
            input.style.height = rect.height.toFixed() + "px";
        };
        Object.defineProperty(FocusControl.prototype, "editMode", {
            get: function () {
                return !this._input.readOnly;
            },
            set: function (editMode) {
                this._input.readOnly = !editMode;
            },
            enumerable: false,
            configurable: true
        });
        FocusControl.prototype.resetInputStatus = function () {
            var _a;
            var el = this._input;
            if (!el.classList.contains('grid-focus-control--stored-status')) {
                return;
            }
            var composition = el.classList.contains('composition');
            var attrs = el.attributes;
            var removeNames = [];
            for (var i = 0, n = attrs.length; i < n; i++) {
                var att = attrs[i];
                if (!((_a = this._inputStatus) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(att.nodeName))) {
                    removeNames.push(att.name);
                }
            }
            removeNames.forEach(function (removeName) {
                el.removeAttribute(removeName);
            });
            for (var name_1 in this._inputStatus) {
                if (this._inputStatus.hasOwnProperty(name_1)) {
                    el.setAttribute(name_1, this._inputStatus[name_1]);
                }
            }
            if (composition) {
                el.classList.add('composition');
                el.style.font = this._grid.font || '16px sans-serif';
            }
            else {
                el.classList.remove('composition');
            }
            el.classList.remove('grid-focus-control--stored-status');
        };
        FocusControl.prototype.storeInputStatus = function () {
            var el = this._input;
            if (el.classList.contains('grid-focus-control--stored-status')) {
                return;
            }
            var inputStatus = (this._inputStatus = {});
            var atts = el.attributes;
            for (var i = 0, n = atts.length; i < n; i++) {
                var att = atts[i];
                inputStatus[att.name] = att.value;
            }
            el.classList.add('grid-focus-control--stored-status');
        };
        FocusControl.prototype.setDefaultInputStatus = function () {
            // 有一种情况，滚动逐渐逐渐变化，所以不要在这里设置。
            // this._input.style.font = this._grid.font || "16px sans-serif";
        };
        Object.defineProperty(FocusControl.prototype, "input", {
            get: function () {
                return this._input;
            },
            enumerable: false,
            configurable: true
        });
        FocusControl.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._handler.dispose();
        };
        return FocusControl;
    }(EventTarget));

    /**
     * Selected area management
     */
    var Selection = /** @class */ (function (_super) {
        __extends(Selection, _super);
        function Selection(grid, updateRange) {
            var _this = _super.call(this) || this;
            _this._isWraped = false;
            _this._grid = grid;
            _this._sel = { col: 0, row: 0 };
            _this._focus = { col: 0, row: 0 };
            _this._start = { col: 0, row: 0 };
            _this._end = { col: 0, row: 0 };
            _this._updateRange = updateRange;
            return _this;
        }
        Object.defineProperty(Selection.prototype, "range", {
            get: function () {
                var start = this._start;
                var end = this._end;
                var startCol = Math.min(start.col, end.col);
                var startRow = Math.min(start.row, end.row);
                var endCol = Math.max(start.col, end.col);
                var endRow = Math.max(start.row, end.row);
                return {
                    end: {
                        col: endCol,
                        row: endRow,
                    },
                    start: {
                        col: startCol,
                        row: startRow,
                    },
                };
            },
            set: function (range) {
                var _this = this;
                var startCol = Math.min(range.start.col, range.end.col);
                var startRow = Math.min(range.start.row, range.end.row);
                var endCol = Math.max(range.start.col, range.end.col);
                var endRow = Math.max(range.start.row, range.end.row);
                this._wrapFireSelectedEvent(function () {
                    _this._setSelectCell(startCol, startRow);
                    _this._setFocusCell(endCol, endRow, true);
                    _this._grid._updatedSelection();
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "focus", {
            get: function () {
                var col = this._focus.col;
                var row = this._focus.row;
                return { col: col, row: row };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "select", {
            get: function () {
                var col = this._sel.col;
                var row = this._sel.row;
                return { col: col, row: row };
            },
            set: function (cell) {
                var _this = this;
                this._wrapFireSelectedEvent(function () {
                    var _a = cell || {}, _b = _a.col, col = _b === void 0 ? 0 : _b, _c = _a.row, row = _c === void 0 ? 0 : _c;
                    _this._setSelectCell(col, row);
                    _this._setFocusCell(col, row, true);
                    _this._grid._updatedSelection();
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "dragging", {
            get: function () {
                return !!this._drag;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "drag", {
            get: function () {
                var me = this;
                return {
                    get select() {
                        var sel = me._drag ? me._drag.sel : me._sel;
                        return {
                            col: sel.col,
                            row: sel.row,
                        };
                    },
                    get range() {
                        var start = me._drag ? me._drag.start : me._start;
                        var end = me._drag ? me._drag.end : me._end;
                        var startCol = Math.min(start.col, end.col);
                        var startRow = Math.min(start.row, end.row);
                        var endCol = Math.max(start.col, end.col);
                        var endRow = Math.max(start.row, end.row);
                        return {
                            end: {
                                col: endCol,
                                row: endRow,
                            },
                            start: {
                                col: startCol,
                                row: startRow,
                            },
                        };
                    },
                    inRange: function (col, row) {
                        var startCol = this.range.start.col;
                        var startRow = this.range.start.row;
                        var endCol = this.range.end.col;
                        var endRow = this.range.end.row;
                        return (startCol <= col && col <= endCol && startRow <= row && row <= endRow);
                    },
                    inDrag: function (col, row) {
                        var inOldRange = this.inRange(col, row);
                        var inNewRange = me.inRange(col, row);
                        return (inOldRange && !inNewRange) || (!inOldRange && inNewRange);
                    },
                };
            },
            enumerable: false,
            configurable: true
        });
        Selection.prototype.inRange = function (col, row) {
            var startCol = Math.min(this._start.col, this._end.col);
            var startRow = Math.min(this._start.row, this._end.row);
            var endCol = Math.max(this._start.col, this._end.col);
            var endRow = Math.max(this._start.row, this._end.row);
            return startCol <= col && col <= endCol && startRow <= row && row <= endRow;
        };
        Selection.prototype.border = function (col, row) {
            var range = this.range;
            var inRange = range.start.col <= col &&
                col <= range.end.col &&
                range.start.row <= row &&
                row <= range.end.row;
            return {
                bottom: inRange ? range.end.row === row : false,
                left: inRange ? range.start.col === col : false,
                right: inRange ? range.end.col === col : false,
                top: inRange ? range.start.row === row : false,
            };
        };
        Selection.prototype.fireSelectedEvent = function () {
            this._wrapFireSelectedEvent(function () {
                // nothing
            });
        };
        Selection.prototype.startDrag = function () {
            this._drag = {
                end: this._end,
                focus: this._focus,
                sel: this._sel,
                start: this._start,
            };
        };
        Selection.prototype.stopDrag = function () {
            if (this._drag) {
                this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, {
                    after: {
                        col: this._sel.col,
                        row: this._sel.row,
                    },
                    col: this._drag.sel.col,
                    row: this._drag.sel.row,
                    selected: false,
                });
                this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, {
                    before: {
                        col: this._drag.sel.col,
                        row: this._drag.sel.row,
                    },
                    col: this._sel.col,
                    row: this._sel.row,
                    selected: true,
                });
                var oldStartCol = this.drag.range.start.col;
                var oldStartRow = this.drag.range.start.row;
                var oldEndCol = this.drag.range.end.col;
                var oldEndRow = this.drag.range.end.row;
                var newStartCol = this.range.start.col;
                var newStartRow = this.range.start.row;
                var newEndCol = this.range.end.col;
                var newEndRow = this.range.end.row;
                delete this._drag;
                this._grid.invalidateGridRect(oldStartCol, oldStartRow, oldEndCol, oldEndRow);
                this._grid.invalidateGridRect(newStartCol, newStartRow, newEndCol, newEndRow);
            }
        };
        Selection.prototype._updateGridRange = function () {
            var _a = this._grid, rowCount = _a.rowCount, colCount = _a.colCount;
            var points = [this._sel, this._focus, this._start, this._end];
            var needChange = false;
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var point = points_1[_i];
                if (colCount <= point.col || rowCount <= point.row) {
                    needChange = true;
                    break;
                }
            }
            if (!needChange || !rowCount || !colCount) {
                // rowCount 或 colCount 为 0 时，暂不触发事件
                return false;
            }
            this._wrapFireSelectedEvent(function () {
                points.forEach(function (p) {
                    p.col = Math.min(colCount - 1, p.col);
                    p.row = Math.min(rowCount - 1, p.row);
                });
            });
            return true;
        };
        Selection.prototype._setFocusCell = function (col, row, keepSelect) {
            var _this = this;
            this._wrapFireSelectedEvent(function () {
                if (!keepSelect || _this._grid.singleSelection) {
                    _this._setSelectCell(col, row);
                }
                else {
                    _this._setSelectCell(_this._sel.col, _this._sel.row);
                }
                _this._focus = { col: col, row: row };
                _this._end = { col: col, row: row };
            });
        };
        Selection.prototype._forceUpdateRange = function () {
            var range = this._updateRange(this.range);
            if (range) {
                this._start = range.start;
                this._end = range.end;
            }
        };
        Selection.prototype._setSelectCell = function (col, row) {
            var _this = this;
            this._wrapFireSelectedEvent(function () {
                _this._sel = { col: col, row: row };
                _this._start = { col: col, row: row };
            });
        };
        Selection.prototype._wrapFireSelectedEvent = function (callback) {
            if (this._isWraped) {
                callback();
            }
            else {
                this._isWraped = true;
                try {
                    var backup = {
                        end: {
                            col: this._end.col,
                            row: this._end.row,
                        },
                        focus: {
                            col: this._focus.col,
                            row: this._focus.row,
                        },
                        sel: {
                            col: this._sel.col,
                            row: this._sel.row,
                        },
                        start: {
                            col: this._start.col,
                            row: this._start.row,
                        },
                    };
                    var before = {
                        col: this._sel.col,
                        row: this._sel.row,
                        selected: false,
                    };
                    callback();
                    this._forceUpdateRange();
                    var after = {
                        before: {
                            col: before.col,
                            row: before.row,
                        },
                        col: this._sel.col,
                        row: this._sel.row,
                        selected: true,
                    };
                    before.after = {
                        col: after.col,
                        row: after.row,
                    };
                    if (!this.dragging) {
                        var results = this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, before);
                        if (array.findIndex(results, function (v) { return v === false; }) >= 0) {
                            this._end = backup.end;
                            this._focus = backup.focus;
                            this._sel = backup.sel;
                            this._start = backup.start;
                        }
                        else {
                            this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, after);
                        }
                    }
                }
                finally {
                    this._isWraped = false;
                }
            }
        };
        return Selection;
    }(EventTarget));

    /**
     * managing selection size changing operation with mouse
     */
    var SelectionResizer = /** @class */ (function (_super) {
        __extends(SelectionResizer, _super);
        function SelectionResizer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._oldRange = createCellRange(-1, -1, -1, -1);
            _this._newRange = createCellRange(-1, -1, -1, -1);
            _this._cell = { col: -1, row: -1 };
            return _this;
        }
        SelectionResizer.prototype.start = function (e) {
            var cellAndRange = this._getTargetCellAndRange(e);
            if (!cellAndRange) {
                return false;
            }
            this._oldRange = this.grid.selection.range;
            this.grid.selection.startDrag();
            this._bindMoveAndUp(e);
            this._newRange = cellAndRange.range;
            this._cell = cellAndRange.cell;
            event.cancel(e);
            this._vibrate(e);
        };
        SelectionResizer.prototype.canStart = function () {
            return array.find(this.grid.fireListeners(DG_EVENT_TYPE.CAN_DRAG_SELECTION, this.grid.selection.range), function (v) { return v === true; });
        };
        SelectionResizer.prototype._moveInternal = function (e) {
            var cellAndRange = this._getTargetCellAndRange(e);
            if (!cellAndRange || !this._oldRange) {
                return false;
            }
            var newRange = cellAndRange.range;
            var newCell = cellAndRange.cell;
            if (newRange.start.col === this._newRange.start.col &&
                newRange.start.row === this._newRange.start.row &&
                newRange.end.col === this._newRange.end.col &&
                newRange.end.row === this._newRange.end.row) {
                return false;
            }
            if (array.find(this.grid.fireListeners(DG_EVENT_TYPE.DRAG_SELECTION, {
                dragDone: false,
                newRange: newRange,
                oldRange: this._oldRange,
            }), function (v) { return v === false; }) === false) {
                return false;
            }
            var oldCol = this._cell.col;
            var oldRow = this._cell.row;
            var newCol = newCell.col;
            var newRow = newCell.row;
            if (oldCol === newCol && oldRow === newRow) {
                return false;
            }
            var grid = this.grid;
            grid._moveFocusCell(newRange.start.col, newRange.start.row, false, true);
            grid._moveFocusCell(newRange.end.col, newRange.end.row, true, true);
            // make visible
            var makeVisibleCol = (function () {
                if (newCol < oldCol && 0 < newCol) {
                    // move left
                    return newCol - 1;
                }
                else if (oldCol < newCol && newCol + 1 < grid.colCount) {
                    // move right
                    return newCol + 1;
                }
                return newCol;
            })();
            var makeVisibleRow = (function () {
                if (newRow < oldRow && 0 < newRow) {
                    // move up
                    return newRow - 1;
                }
                else if (oldRow < newRow && newRow + 1 < grid.rowCount) {
                    // move down
                    return newRow + 1;
                }
                return newRow;
            })();
            if (makeVisibleCol !== newCol || makeVisibleRow !== newRow) {
                grid.makeVisibleCell(makeVisibleCol, makeVisibleRow);
            }
            this._newRange = newRange;
            this._cell = newCell;
            return true;
        };
        SelectionResizer.prototype._upInternal = function (e) {
            this.grid.fireListeners(DG_EVENT_TYPE.DRAG_SELECTION, {
                dragDone: true,
                newRange: this._newRange,
                oldRange: this._oldRange,
            });
            this.grid.selection.stopDrag();
        };
        SelectionResizer.prototype._getTargetCellAndRange = function (e) {
            var grid = this.grid;
            var abstractPos = grid._getMouseAbstractPoint(e);
            if (!abstractPos) {
                return null;
            }
            if (!this._oldRange) {
                return null;
            }
            // \    A    /
            //   ---t---
            //   |\   E|
            // D l  X  r B
            //   |F   \|
            //   ---b---
            // /    C    \
            var startCol = this._oldRange.start.col;
            var startRow = this._oldRange.start.row;
            var endCol = this._oldRange.end.col;
            var endRow = this._oldRange.end.row;
            var x = abstractPos.x;
            var y = abstractPos.y;
            var cell = grid.getCellAt(x, y);
            if (cell.col < 0 || cell.row < 0) {
                return null;
            }
            var startRect = grid.getCellRect(this._oldRange.start.col, this._oldRange.start.row);
            var endRect = grid.getCellRect(this._oldRange.end.col, this._oldRange.end.row);
            var top = startRect.top;
            var left = startRect.left;
            var right = endRect.right;
            var bottom = endRect.bottom;
            var x1 = left;
            var y1 = top;
            var x2 = right;
            var y2 = bottom;
            var ab = (y1 - y2) * x + (x2 - x1) * y + x1 * y2 - x2 * y1 <= 0; // A 或 B
            x1 = right;
            y1 = top;
            x2 = left;
            y2 = bottom;
            var ad = (y1 - y2) * x + (x2 - x1) * y + x1 * y2 - x2 * y1 > 0; // A 或 D
            if (cell.row >= startRow &&
                cell.row <= endRow &&
                cell.col >= startCol &&
                cell.col <= endCol) {
                if (ab) {
                    // E
                    endRow = cell.row;
                }
                else {
                    // F
                    endCol = cell.col;
                }
            }
            else {
                if (ab && ad) {
                    // A
                    startRow = cell.row;
                }
                else if (ab && !ad) {
                    // B
                    endCol = cell.col;
                }
                else if (!ab && ad) {
                    // D
                    startCol = cell.col;
                }
                else {
                    // C
                    endRow = cell.row;
                }
            }
            var range = createCellRange(startCol, startRow, endCol, endRow);
            return {
                cell: cell,
                range: range,
            };
        };
        return SelectionResizer;
    }(BaseMouseDownMover));

    function parsePasteRangeBoxValues(value) {
        var normalizeValue = value.replace(/\r?\n$/, '');
        var lines = normalizeValue.split(/(?:\r?\n)|[\u2028\u2029]/g);
        var values = lines.map(function (line) { return line.split(/\t/g); });
        var colCount = values.reduce(function (n, cells) { return Math.max(n, cells.length); }, 0);
        return {
            colCount: colCount,
            rowCount: values.length,
            getCellValue: function (offsetCol, offsetRow) {
                var _a;
                return ((_a = values[offsetRow]) === null || _a === void 0 ? void 0 : _a[offsetCol]) || '';
            },
        };
    }

    var _$1 = getDrawGridSymbol();
    function _getTargetRowAt(absoluteY) {
        var _this = this;
        var internal = this.getTargetRowAtInternal(absoluteY);
        if (isDef(internal)) {
            return internal;
        }
        var findBefore = function (startRow, startBottom) {
            var bottom = startBottom;
            for (var row = startRow; row >= 0; row--) {
                var height = _getRowHeight.call(_this, row);
                var top_1 = bottom - height;
                if (top_1 <= absoluteY && absoluteY < bottom) {
                    return {
                        row: row,
                        top: top_1,
                    };
                }
                bottom = top_1;
            }
            return null;
        };
        var findAfter = function (startRow, startBottom) {
            var top = startBottom - _getRowHeight.call(_this, startRow);
            var rowCount = _this[_$1].rowCount;
            for (var row = startRow; row < rowCount; row++) {
                var height = _getRowHeight.call(_this, row);
                var bottom = top + height;
                if (top <= absoluteY && absoluteY < bottom) {
                    return {
                        row: row,
                        top: top,
                    };
                }
                top = bottom;
            }
            return null;
        };
        var candRow = Math.min(Math.ceil(absoluteY / this.defaultRowHeight), this.rowCount - 1);
        var candBottom = _getRowsHeight.call(this, 0, candRow);
        if (absoluteY >= candBottom) {
            return findAfter(candRow, candBottom);
        }
        else {
            return findBefore(candRow, candBottom);
        }
    }
    function _getTargetColAt(absoluteX) {
        var left = 0;
        var colCount = this[_$1].colCount;
        for (var col = 0; col < colCount; col++) {
            var width = _getColWidth.call(this, col);
            var right = left + width;
            if (right > absoluteX) {
                return {
                    col: col,
                    left: left,
                };
            }
            left = right;
        }
        return null;
    }
    function _getTargetFrozenRowAt(absoluteY) {
        if (!this[_$1].frozenRowCount) {
            return null;
        }
        var top = this[_$1].scroll.top;
        var rowCount = this[_$1].frozenRowCount;
        for (var row = 0; row < rowCount; row++) {
            var height = _getRowHeight.call(this, row);
            var bottom = top + height;
            if (bottom > absoluteY) {
                return {
                    row: row,
                    top: top,
                };
            }
            top = bottom;
        }
        return null;
    }
    function _getTargetFrozenColAt(absoluteX) {
        if (!this[_$1].frozenColCount) {
            return null;
        }
        var left = this[_$1].scroll.left;
        var colCount = this[_$1].frozenColCount;
        for (var col = 0; col < colCount; col++) {
            var width = _getColWidth.call(this, col);
            var right = left + width;
            if (right > absoluteX) {
                return {
                    col: col,
                    left: left,
                };
            }
            left = right;
        }
        return null;
    }
    function _getFrozenRowsRect() {
        if (!this[_$1].frozenRowCount) {
            return null;
        }
        var top = this[_$1].scroll.top;
        var height = 0;
        var rowCount = this[_$1].frozenRowCount;
        for (var row = 0; row < rowCount; row++) {
            height += _getRowHeight.call(this, row);
        }
        return new Rect(this[_$1].scroll.left, top, this[_$1].canvas.width, height);
    }
    function _getFrozenColsRect() {
        if (!this[_$1].frozenColCount) {
            return null;
        }
        var left = this[_$1].scroll.left;
        var width = 0;
        var colCount = this[_$1].frozenColCount;
        for (var col = 0; col < colCount; col++) {
            width += _getColWidth.call(this, col);
        }
        return new Rect(left, this[_$1].scroll.top, width, this[_$1].canvas.height);
    }
    function _getCellDrawing(col, row) {
        if (!this[_$1].drawCells[row]) {
            return null;
        }
        return this[_$1].drawCells[row][col];
    }
    function _putCellDrawing(col, row, context) {
        if (!this[_$1].drawCells[row]) {
            this[_$1].drawCells[row] = {};
        }
        this[_$1].drawCells[row][col] = context;
    }
    function _removeCellDrawing(col, row) {
        if (!this[_$1].drawCells[row]) {
            return;
        }
        delete this[_$1].drawCells[row][col];
        if (Object.keys(this[_$1].drawCells[row]).length === 0) {
            delete this[_$1].drawCells[row];
        }
    }
    function _drawCell(ctx, col, absoluteLeft, width, row, absoluteTop, height, visibleRect, skipAbsoluteTop, skipAbsoluteLeft, drawLayers) {
        var _this = this;
        var rect = new Rect(absoluteLeft - visibleRect.left, absoluteTop - visibleRect.top, width, height);
        var drawRect = Rect.bounds(Math.max(absoluteLeft, skipAbsoluteLeft) - visibleRect.left, Math.max(absoluteTop, skipAbsoluteTop) - visibleRect.top, rect.right, rect.bottom);
        if (drawRect.height > 0 && drawRect.width > 0) {
            ctx.save();
            try {
                var cellDrawing = _getCellDrawing.call(this, col, row);
                if (cellDrawing) {
                    cellDrawing.cancel();
                }
                var dcContext_1 = new DrawCellContext(col, row, ctx, rect, drawRect, !!cellDrawing, this[_$1].selection, drawLayers);
                var p = this.onDrawCell(col, row, dcContext_1);
                if (isPromise(p)) {
                    // 延迟绘图
                    _putCellDrawing.call(this, col, row, dcContext_1);
                    var pCol_1 = col;
                    dcContext_1._delayMode(this, function () {
                        _removeCellDrawing.call(_this, pCol_1, row);
                    });
                    p.then(function () {
                        dcContext_1.terminate();
                    });
                }
            }
            finally {
                ctx.restore();
            }
        }
    }
    function _drawRow(ctx, initFrozenCol, initCol, drawRight, row, absoluteTop, height, visibleRect, skipAbsoluteTop, drawLayers) {
        var _this = this;
        var colCount = this[_$1].colCount;
        var drawOuter = function (col, absoluteLeft) {
            // 在数据范围之外绘制
            if (col >= colCount - 1 &&
                _this[_$1].canvas.width > absoluteLeft - visibleRect.left) {
                var outerLeft = absoluteLeft - visibleRect.left;
                if (_this.underlayBackgroundColor === 'transparent') {
                    ctx.clearRect(outerLeft, absoluteTop - visibleRect.top, _this[_$1].canvas.width - outerLeft, height);
                }
                else {
                    ctx.save();
                    ctx.beginPath();
                    ctx.fillStyle = _this.underlayBackgroundColor || '#F6F6F6';
                    ctx.rect(outerLeft, absoluteTop - visibleRect.top, _this[_$1].canvas.width - outerLeft, height);
                    ctx.fill();
                    ctx.restore();
                }
            }
        };
        var skipAbsoluteLeft = 0;
        if (initFrozenCol) {
            var absoluteLeft = initFrozenCol.left;
            var count = this[_$1].frozenColCount;
            for (var col = initFrozenCol.col; col < count; col++) {
                var width = _getColWidth.call(this, col);
                _drawCell.call(this, ctx, col, absoluteLeft, width, row, absoluteTop, height, visibleRect, skipAbsoluteTop, 0, drawLayers);
                absoluteLeft += width;
                if (drawRight <= absoluteLeft) {
                    // 在绘图范围之外（结束）
                    drawOuter(col, absoluteLeft);
                    return;
                }
            }
            skipAbsoluteLeft = absoluteLeft;
        }
        if (initCol) {
            var colAbsoluteLeft = initCol.left;
            for (var col = initCol.col; col < colCount; col++) {
                var width = _getColWidth.call(this, col);
                _drawCell.call(this, ctx, col, colAbsoluteLeft, width, row, absoluteTop, height, visibleRect, skipAbsoluteTop, skipAbsoluteLeft, drawLayers);
                colAbsoluteLeft += width;
                if (drawRight <= colAbsoluteLeft) {
                    // 在绘图范围之外（结束）
                    drawOuter(col, colAbsoluteLeft);
                    return;
                }
            }
            drawOuter(colCount - 1, colAbsoluteLeft);
        }
    }
    var _isPreciseColWidth = false;
    function _toPxWidth(grid, width) {
        // 解决100%出现滚动条问题，此办法会导致右侧有空白，空白部分由_initColWidthsOffset负责填充
        // return Math.round(toPx(width, grid[_].calcWidthContext));
        var w = toPx(width, grid[_$1].calcWidthContext);
        return _isPreciseColWidth ? w : Math.floor(w);
    }
    function _getColPreciseWidth(grid, col) {
        try {
            _isPreciseColWidth = true;
            return grid.getColWidth(col);
        }
        finally {
            _isPreciseColWidth = false;
        }
    }
    function _initColWidthsOffset(grid) {
        var colWidthsOffset = {};
        var total = 0;
        for (var col = 0; col < grid.colCount; col++) {
            var w1 = grid.getColWidth(col);
            var w2 = _getColPreciseWidth(grid, col);
            if (w1 !== w2) {
                total += w2 - w1;
                colWidthsOffset[col] = 0;
            }
        }
        total = Math.round(total);
        if (total > 0) {
            for (var col in colWidthsOffset) {
                if (colWidthsOffset.hasOwnProperty(col)) {
                    colWidthsOffset[col] += 1;
                    total--;
                    if (!total) {
                        break;
                    }
                }
            }
        }
        grid[_$1].colWidthsOffset = colWidthsOffset;
    }
    function _adjustColWidth(col, orgWidth) {
        return this._adjustColWidth(col, orgWidth);
    }
    function _applyColWidthLimits(limits, orgWidth) {
        if (!limits) {
            return orgWidth;
        }
        if (limits.min) {
            if (limits.min > orgWidth) {
                return limits.min;
            }
        }
        if (limits.max) {
            if (limits.max < orgWidth) {
                return limits.max;
            }
        }
        return orgWidth;
    }
    /**
     * Gets the definition of the column width.
     * @param col - number of column
     * @returns width definition
     */
    function _getColWidthDefine(col) {
        var width = this[_$1].colWidthsMap.get(col);
        if (width) {
            return width;
        }
        return this.defaultColWidth;
    }
    /**
     * Gets the column width limits.
     * @param col - number of column
     * @returns the column width limits
     */
    function _getColWidthLimits(col) {
        var limit = this[_$1].colWidthsLimit[col];
        if (!limit) {
            return null;
        }
        var result = {};
        if (limit.min) {
            result.min = _toPxWidth(this, limit.min);
            result.minDef = limit.min;
        }
        if (limit.max) {
            result.max = _toPxWidth(this, limit.max);
            result.maxDef = limit.max;
        }
        return result;
    }
    /**
     * Checks if the given width definition is `auto`.
     * @param width - width definition to check
     * @returns `true ` if the given width definition is `auto`
     */
    function isAutoDefine(width) {
        return !!(width &&
            typeof width === 'string' &&
            width.toLowerCase() === 'auto');
    }
    /**
     * Creates a formula to calculate the auto width.
     * @returns formula
     */
    function _calcAutoColWidthExpr() {
        var others = [];
        var autoCount = 0;
        var hasLimitsOnAuto = [];
        for (var col = 0; col < this[_$1].colCount; col++) {
            var def = _getColWidthDefine.call(this, col);
            var limits = _getColWidthLimits.call(this, col);
            if (isAutoDefine(def)) {
                if (limits) {
                    hasLimitsOnAuto.push(limits);
                }
                autoCount++;
            }
            else {
                var expr = typeof def === 'number' ? def + "px" : def;
                if (limits) {
                    var orgWidth = _toPxWidth(this, expr);
                    var newWidth = _applyColWidthLimits(limits, orgWidth);
                    if (orgWidth !== newWidth) {
                        expr = newWidth + "px";
                    }
                }
                others.push(expr);
            }
        }
        if (hasLimitsOnAuto.length && others.length) {
            var autoPx = _toPxWidth(this, "calc(100% - (" + others.join(' + ') + "))") / autoCount;
            for (var index = 0; index < hasLimitsOnAuto.length; index++) {
                var limits = hasLimitsOnAuto[index];
                if (limits.min && autoPx < limits.min) {
                    others.push(typeof limits.minDef === 'number'
                        ? limits.minDef + "px"
                        : limits.minDef);
                    autoCount--;
                }
                else if (limits.max && limits.max < autoPx) {
                    others.push(typeof limits.maxDef === 'number'
                        ? limits.maxDef + "px"
                        : limits.maxDef);
                    autoCount--;
                }
            }
            if (autoCount <= 0) {
                return autoPx + "px";
            }
        }
        if (others.length) {
            return "calc((100% - (" + others.join(' + ') + ")) / " + autoCount + ")";
        }
        else {
            return 100 / autoCount + "%";
        }
    }
    /**
     * Calculate the pixels of width from the definition of width.
     * @param width - width definition
     * @returns the pixels of width
     */
    function _colWidthDefineToPxWidth(width) {
        if (isAutoDefine(width)) {
            return _toPxWidth(this, _calcAutoColWidthExpr.call(this));
        }
        return _toPxWidth(this, width);
    }
    function _getColWidth(col) {
        var width = _getColWidthDefine.call(this, col);
        return _adjustColWidth.call(this, col, _colWidthDefineToPxWidth.call(this, width));
    }
    function _setColWidth(col, width) {
        this[_$1].colWidthsMap.put(col, width);
    }
    function _getRowHeight(row) {
        var internal = this.getRowHeightInternal(row);
        if (typeof internal === 'number') {
            return Number(internal);
        }
        var height = this[_$1].rowHeightsMap.get(row);
        if (height) {
            return height;
        }
        return this.defaultRowHeight;
    }
    function _getRowsHeight(startRow, endRow) {
        var _this = this;
        var internal = this.getRowsHeightInternal(startRow, endRow);
        if (typeof internal === 'number') {
            return Number(internal);
        }
        var rowCount = endRow - startRow + 1;
        var h = this.defaultRowHeight * rowCount;
        this[_$1].rowHeightsMap.each(startRow, endRow, function (height) {
            h += height - _this.defaultRowHeight;
        });
        return h;
    }
    function _setRowHeight(row, height) {
        this[_$1].rowHeightsMap.put(row, height);
    }
    function _getUnderlayWidth() {
        var bodyWidth = this.getElement().clientWidth;
        for (var col = 0; col < this.frozenColCount; col++) {
            bodyWidth -= this.getColWidth(col);
        }
        if (bodyWidth < 0) {
            bodyWidth = 0;
        }
        var w = 0;
        if (this.underlayColCount >= 0) {
            if (this.underlayColWidth === 'auto') {
                w = this.underlayColCount * _toPxWidth(this, this.defaultColWidth);
            }
            else {
                w = this.underlayColCount * this.underlayColWidth;
            }
        }
        else {
            w = bodyWidth;
            if (this.underlayColWidth === 'auto') {
                var startCol = Math.max(this.colCount + this.underlayColCount, this.frozenColCount, 0);
                for (var col = startCol; col < this.colCount; col++) {
                    w -= this.getColWidth(col);
                }
            }
            else {
                w += this.underlayColCount * this.underlayColWidth;
            }
        }
        if (w < 0) {
            w = 0;
        }
        else if (w > bodyWidth) {
            w = bodyWidth;
        }
        return w;
    }
    function _getScrollWidth() {
        var w = this._getColsWidth(0, this[_$1].colCount - 1);
        var underlayWidth = _getUnderlayWidth.call(this);
        return w + underlayWidth;
    }
    function _getUnderlayHeight() {
        var bodyHeight = this.getElement().clientHeight;
        for (var row = 0; row < this.frozenRowCount; row++) {
            bodyHeight -= this.getRowHeight(row);
        }
        if (bodyHeight < 0) {
            bodyHeight = 0;
        }
        var h = 0;
        if (this.underlayRowCount >= 0) {
            if (this.underlayRowHeight === 'auto') {
                h = this.underlayRowCount * this.defaultRowHeight;
            }
            else {
                h = this.underlayRowCount * this.underlayRowHeight;
            }
        }
        else {
            h = bodyHeight;
            if (this.underlayRowHeight === 'auto') {
                var startRow = Math.max(this.rowCount + this.underlayRowCount, this.frozenRowCount, 0);
                for (var row = startRow; row < this.rowCount; row++) {
                    h -= this.getRowHeight(row);
                }
            }
            else {
                h += this.underlayRowCount * this.underlayRowHeight;
            }
        }
        if (h < 0) {
            h = 0;
        }
        else if (h > bodyHeight) {
            h = bodyHeight;
        }
        return h;
    }
    function _getScrollHeight() {
        var _this = this;
        var internal = this.getScrollHeightInternal(this[_$1].rowCount);
        if (typeof internal === 'number') {
            return Number(internal);
        }
        var h = this.defaultRowHeight * this[_$1].rowCount;
        this[_$1].rowHeightsMap.each(0, this[_$1].rowCount - 1, function (height) {
            h += height - _this.defaultRowHeight;
        });
        var underlayHeight = _getUnderlayHeight.call(this);
        return h + underlayHeight;
    }
    function _onScroll(_e) {
        var lastLeft = this[_$1].scroll.left;
        var lastTop = this[_$1].scroll.top;
        var moveX = this[_$1].scrollable.scrollLeft - lastLeft;
        var moveY = this[_$1].scrollable.scrollTop - lastTop;
        // 保留下一个计算信息
        this[_$1].scroll = {
            left: this[_$1].scrollable.scrollLeft,
            top: this[_$1].scrollable.scrollTop,
        };
        var visibleRect = this._getVisibleRect();
        if (Math.abs(moveX) >= visibleRect.width ||
            Math.abs(moveY) >= visibleRect.height) {
            // 完全重绘
            this._invalidateRect(visibleRect);
        }
        else {
            // 不同的重绘
            var context = this[_$1].context;
            if (context) {
                context.drawImage(this[_$1].canvas, -moveX, -moveY);
            }
            if (moveX !== 0) {
                // 计算水平移动的重绘范围
                var redrawRect = visibleRect.copy();
                if (moveX < 0) {
                    redrawRect.width = -moveX;
                    if (this[_$1].frozenColCount > 0) {
                        // 当有固定列时绘制固定数量的列
                        var frozenRect = _getFrozenColsRect.call(this);
                        if (frozenRect) {
                            redrawRect.width += frozenRect.width;
                        }
                    }
                }
                else if (moveX > 0) {
                    redrawRect.left = redrawRect.right - moveX;
                }
                // 重绘
                this._invalidateRect(redrawRect);
                if (moveX > 0) {
                    if (this[_$1].frozenColCount > 0) {
                        // 当有固定列固定列图时
                        var frozenRect = _getFrozenColsRect.call(this);
                        if (frozenRect) {
                            this._invalidateRect(frozenRect);
                        }
                    }
                }
            }
            if (moveY !== 0) {
                // 计算纵向移动的重绘范围
                var redrawRect = visibleRect.copy();
                if (moveY < 0) {
                    redrawRect.height = -moveY;
                    if (this[_$1].frozenRowCount > 0) {
                        // 有固定线时固定线图
                        var frozenRect = _getFrozenRowsRect.call(this);
                        if (frozenRect) {
                            redrawRect.height += frozenRect.height;
                        }
                    }
                }
                else if (moveY > 0) {
                    redrawRect.top = redrawRect.bottom - moveY;
                }
                // 重绘
                this._invalidateRect(redrawRect);
                if (moveY > 0) {
                    if (this[_$1].frozenRowCount > 0) {
                        // 有固定线时固定线图
                        var frozenRect = _getFrozenRowsRect.call(this);
                        if (frozenRect) {
                            this._invalidateRect(frozenRect);
                        }
                    }
                }
            }
        }
    }
    function _onTabKeyDown(shiftKey) {
        var grid = this;
        var focusCell = grid.selection.focus;
        var col = shiftKey
            ? grid.getMoveLeftColByKeyDownInternal(focusCell)
            : grid.getMoveRightColByKeyDownInternal(focusCell);
        if (0 <= col && col < grid.colCount) {
            grid._moveFocusCell(col, focusCell.row, false);
        }
        else if (0 > col) {
            grid._moveFocusCell(grid.colCount - 1, focusCell.row, false);
        }
        else {
            grid._moveFocusCell(0, focusCell.row, false);
        }
    }
    function _onEnterKeyDown(shiftKey) {
        var grid = this;
        var focusCell = grid.selection.focus;
        var row = shiftKey
            ? grid.getMoveUpRowByKeyDownInternal(focusCell)
            : grid.getMoveDownRowByKeyDownInternal(focusCell);
        if (0 <= row && row < grid.rowCount) {
            grid._moveFocusCell(focusCell.col, row, false);
            // } else if (0 > row) {
            //   grid._moveFocusCell(focusCell.col, grid.rowCount - 1, false)
            // } else {
            //   grid._moveFocusCell(focusCell.col, 0, false)
        }
    }
    function _onKeyDownMove(e) {
        var _a, _b, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        var shiftKey = e.shiftKey, ctrlKey = e.ctrlKey, metaKey = e.metaKey, altKey = e.altKey;
        var keyCode = event.getKeyCode(e);
        if (altKey) {
            return;
        }
        var focusCell = shiftKey ? this.selection.focus : this.selection.select;
        if (keyCode === KEY_LEFT) {
            if (ctrlKey || metaKey) {
                move(this, null, 'W');
            }
            else {
                if (!hmove.call(this, 'W')) {
                    return;
                }
            }
            event.cancel(e);
        }
        else if (keyCode === KEY_UP) {
            if (e.ctrlKey || e.metaKey) {
                move(this, 'N', null);
            }
            else {
                if (!vmove.call(this, 'N')) {
                    return;
                }
            }
            event.cancel(e);
        }
        else if (keyCode === KEY_RIGHT) {
            if (e.ctrlKey || e.metaKey) {
                move(this, null, 'E');
            }
            else {
                if (!hmove.call(this, 'E')) {
                    return;
                }
            }
            event.cancel(e);
        }
        else if (keyCode === KEY_DOWN) {
            if (e.ctrlKey || e.metaKey) {
                move(this, 'S', null);
            }
            else {
                if (!vmove.call(this, 'S')) {
                    return;
                }
            }
            event.cancel(e);
        }
        else if (keyCode === KEY_HOME) {
            if (e.ctrlKey || e.metaKey) {
                move(this, 'N', 'W');
            }
            else {
                move(this, null, 'W');
            }
            event.cancel(e);
        }
        else if (keyCode === KEY_END) {
            if (e.ctrlKey || e.metaKey) {
                move(this, 'S', 'E');
            }
            else {
                move(this, null, 'E');
            }
            event.cancel(e);
        }
        else if (keyCode === KEY_TAB && ((_a = this.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnTab)) {
            _onTabKeyDown.call(this, shiftKey);
            event.cancel(e);
        }
        else if (keyCode === KEY_ENTER && ((_b = this.keyboardOptions) === null || _b === void 0 ? void 0 : _b.moveCellOnEnter)) {
            _onEnterKeyDown.call(this, shiftKey);
            event.cancel(e);
        }
        else if (keyCode === KEY_ALPHA_A && ((_c = this.keyboardOptions) === null || _c === void 0 ? void 0 : _c.selectAllOnCtrlA) &&
            (ctrlKey || metaKey)) {
            var startCol = 0;
            var startRow = 0;
            if (shiftKey) {
                if ((_g = (_f = (_d = this.keyboardOptions) === null || _d === void 0 ? void 0 : _d.selectAllOptions) === null || _f === void 0 ? void 0 : _f.shiftCtrlA) === null || _g === void 0 ? void 0 : _g.excludeFrozenCol) {
                    startCol = this.frozenRowCount;
                }
                if ((_k = (_j = (_h = this.keyboardOptions) === null || _h === void 0 ? void 0 : _h.selectAllOptions) === null || _j === void 0 ? void 0 : _j.shiftCtrlA) === null || _k === void 0 ? void 0 : _k.excludeFrozenRow) {
                    startRow = this.frozenRowCount;
                }
            }
            else {
                if ((_o = (_m = (_l = this.keyboardOptions) === null || _l === void 0 ? void 0 : _l.selectAllOptions) === null || _m === void 0 ? void 0 : _m.ctrlA) === null || _o === void 0 ? void 0 : _o.excludeFrozenCol) {
                    startCol = this.frozenRowCount;
                }
                if ((_r = (_q = (_p = this.keyboardOptions) === null || _p === void 0 ? void 0 : _p.selectAllOptions) === null || _q === void 0 ? void 0 : _q.ctrlA) === null || _r === void 0 ? void 0 : _r.excludeFrozenRow) {
                    startRow = this.frozenRowCount;
                }
            }
            this.selection.range = {
                start: { col: startCol, row: startRow },
                end: { col: this.colCount - 1, row: this.rowCount - 1 },
            };
            this.invalidate();
            event.cancel(e);
        }
        function move(grid, vDir, hDir) {
            var row = vDir === 'S' ? grid.rowCount - 1 : vDir === 'N' ? 0 : focusCell.row;
            var col = hDir === 'E' ? grid.colCount - 1 : hDir === 'W' ? 0 : focusCell.col;
            grid._moveFocusCell(col, row, shiftKey);
        }
        function vmove(vDir) {
            var row;
            if (vDir === 'S') {
                row = this.getMoveDownRowByKeyDownInternal(focusCell);
                if (this.rowCount <= row) {
                    return false;
                }
            }
            else {
                row = this.getMoveUpRowByKeyDownInternal(focusCell);
                if (row < 0) {
                    return false;
                }
            }
            var col = focusCell.col;
            this._moveFocusCell(col, row, shiftKey);
            return true;
        }
        function hmove(hDir, shiftKeyFlg) {
            if (shiftKeyFlg === void 0) { shiftKeyFlg = shiftKey; }
            var col;
            if (hDir === 'E') {
                col = this.getMoveRightColByKeyDownInternal(focusCell);
                if (this.colCount <= col) {
                    return false;
                }
            }
            else {
                col = this.getMoveLeftColByKeyDownInternal(focusCell);
                if (col < 0) {
                    return false;
                }
            }
            var row = focusCell.row;
            this._moveFocusCell(col, row, shiftKeyFlg);
            return true;
        }
    }
    function _bindEvents() {
        var _this = this;
        var _a = this[_$1], handler = _a.handler, element = _a.element, scrollable = _a.scrollable;
        var getCellEventArgsSet = function (e) {
            var abstractPos = _this._getMouseAbstractPoint(e);
            if (!abstractPos) {
                return {};
            }
            var cell = _this.getCellAt(abstractPos.x, abstractPos.y);
            if (cell.col < 0 || cell.row < 0) {
                return {
                    abstractPos: abstractPos,
                    cell: cell,
                };
            }
            var eventArgs = {
                col: cell.col,
                event: e,
                row: cell.row,
            };
            return {
                abstractPos: abstractPos,
                cell: cell,
                eventArgs: eventArgs,
            };
        };
        var canResizeColumn = function (col) {
            var limit = _this[_$1].colWidthsLimit[col];
            var canResize = _this.disableColumnResize !== true;
            if (limit && canResize) {
                canResize = limit.disableResize !== true;
                if (canResize && limit.min && limit.max) {
                    canResize = limit.max !== limit.min;
                }
            }
            return canResize;
            // if (!limit || !limit.min || !limit.max) {
            //     return true;
            // }
            // return limit.max !== limit.min;
        };
        handler.on(element, 'mousedown', function (e) {
            var eventArgsSet = getCellEventArgsSet(e);
            var abstractPos = eventArgsSet.abstractPos;
            var eventArgs = eventArgsSet.eventArgs;
            if (!abstractPos) {
                return;
            }
            if (eventArgs) {
                var results = _this.fireListeners(DG_EVENT_TYPE.MOUSEDOWN_CELL, eventArgs);
                if (array.findIndex(results, function (v) { return !v; }) >= 0) {
                    return;
                }
            }
            if (event.getMouseButtons(e) !== 1) {
                return;
            }
            if (_getResizeSelectionAt.call(_this, abstractPos.x, abstractPos.y)) {
                _this[_$1].selectionResizer.start(e);
            }
            else {
                var resizeCol = _getResizeColAt.call(_this, abstractPos.x, abstractPos.y);
                if (resizeCol >= 0 && canResizeColumn(resizeCol)) {
                    // 改变宽度
                    _this[_$1].columnResizer.start(resizeCol, e);
                }
                else {
                    // 选择
                    _this[_$1].cellSelector.start(e);
                }
            }
        });
        handler.on(element, 'mouseup', function (e) {
            if (!_this.hasListeners(DG_EVENT_TYPE.MOUSEUP_CELL)) {
                return;
            }
            var eventArgs = getCellEventArgsSet(e).eventArgs;
            if (eventArgs) {
                _this.fireListeners(DG_EVENT_TYPE.MOUSEUP_CELL, eventArgs);
            }
        });
        var doubleTapBefore = null;
        var longTouchId = null;
        handler.on(element, 'touchstart', function (e) {
            if (!doubleTapBefore) {
                doubleTapBefore = getCellEventArgsSet(e).eventArgs;
                setTimeout(function () {
                    doubleTapBefore = null;
                }, 350);
            }
            else {
                var eventArgs = getCellEventArgsSet(e).eventArgs;
                if (eventArgs &&
                    eventArgs.col === doubleTapBefore.col &&
                    eventArgs.row === doubleTapBefore.row) {
                    _this.fireListeners(DG_EVENT_TYPE.DBLTAP_CELL, eventArgs);
                }
                else if (!eventArgs) {
                    _this.fireListeners(DG_EVENT_TYPE.DBLTAP_UNDERLAY);
                }
                doubleTapBefore = null;
                if (e.defaultPrevented) {
                    return;
                }
            }
            longTouchId = setTimeout(function () {
                // 长按选择模式时
                longTouchId = null;
                var abstractPos = _this._getMouseAbstractPoint(e);
                if (!abstractPos) {
                    return;
                }
                if (_getResizeSelectionAt.call(_this, abstractPos.x, abstractPos.y)) {
                    _this[_$1].selectionResizer.start(e);
                }
                else {
                    var resizeCol = _getResizeColAt.call(_this, abstractPos.x, abstractPos.y, 15);
                    if (resizeCol >= 0 && canResizeColumn(resizeCol)) {
                        // 改变宽度
                        _this[_$1].columnResizer.start(resizeCol, e);
                    }
                    else {
                        // 选择
                        _this[_$1].cellSelector.start(e);
                    }
                }
            }, 500);
        });
        function cancel(e) {
            if (longTouchId) {
                clearTimeout(longTouchId);
                longTouchId = null;
            }
        }
        handler.on(element, 'touchcancel', cancel);
        handler.on(element, 'touchmove', cancel);
        handler.on(element, 'touchend', function (e) {
            if (longTouchId) {
                clearTimeout(longTouchId);
                _this[_$1].cellSelector.select(e);
                longTouchId = null;
            }
        });
        var isMouseover = false;
        var mouseEnterCell = null;
        var mouseOverCell = null;
        var onMouseenterCell = function (cell, related) {
            _this.fireListeners(DG_EVENT_TYPE.MOUSEENTER_CELL, {
                col: cell.col,
                row: cell.row,
                event: cell.event,
                related: related,
            });
            mouseEnterCell = cell;
        };
        var onMouseleaveCell = function (related) {
            var beforeMouseCell = mouseEnterCell;
            mouseEnterCell = null;
            if (beforeMouseCell) {
                _this.fireListeners(DG_EVENT_TYPE.MOUSELEAVE_CELL, {
                    col: beforeMouseCell.col,
                    row: beforeMouseCell.row,
                    related: related,
                });
            }
            return beforeMouseCell || undefined;
        };
        var onMouseoverCell = function (cell, related) {
            _this.fireListeners(DG_EVENT_TYPE.MOUSEOVER_CELL, {
                col: cell.col,
                row: cell.row,
                event: cell.event,
                related: related,
            });
            mouseOverCell = cell;
        };
        var onMouseoutCell = function (related) {
            var beforeMouseCell = mouseOverCell;
            mouseOverCell = null;
            if (beforeMouseCell) {
                _this.fireListeners(DG_EVENT_TYPE.MOUSEOUT_CELL, {
                    col: beforeMouseCell.col,
                    row: beforeMouseCell.row,
                    related: related,
                });
            }
            return beforeMouseCell || undefined;
        };
        var scrollElement = scrollable.getElement();
        handler.on(scrollElement, 'mouseover', function (e) {
            isMouseover = true;
        });
        handler.on(scrollElement, 'mouseout', function (e) {
            isMouseover = false;
            onMouseoutCell();
        });
        handler.on(element, 'mouseleave', function (e) {
            onMouseleaveCell();
        });
        handler.on(element, 'mousemove', function (e) {
            var eventArgsSet = getCellEventArgsSet(e);
            var abstractPos = eventArgsSet.abstractPos;
            var eventArgs = eventArgsSet.eventArgs;
            if (eventArgs) {
                var beforeMouseCell = mouseEnterCell;
                if (beforeMouseCell) {
                    _this.fireListeners(DG_EVENT_TYPE.MOUSEMOVE_CELL, eventArgs);
                    if (beforeMouseCell.col !== eventArgs.col ||
                        beforeMouseCell.row !== eventArgs.row) {
                        var enterCell = {
                            col: eventArgs.col,
                            row: eventArgs.row,
                        };
                        var outCell = onMouseoutCell(enterCell);
                        var leaveCell = onMouseleaveCell(enterCell);
                        onMouseenterCell(eventArgs, leaveCell);
                        if (isMouseover) {
                            onMouseoverCell(eventArgs, outCell);
                        }
                    }
                    else if (isMouseover && !mouseOverCell) {
                        onMouseoverCell(eventArgs);
                    }
                }
                else {
                    onMouseenterCell(eventArgs);
                    if (isMouseover) {
                        onMouseoverCell(eventArgs);
                    }
                    _this.fireListeners(DG_EVENT_TYPE.MOUSEMOVE_CELL, eventArgs);
                }
            }
            else {
                onMouseoutCell();
                onMouseleaveCell();
            }
            if (_this[_$1].columnResizer.moving(e) ||
                _this[_$1].selectionResizer.moving(e) ||
                _this[_$1].cellSelector.moving(e)) {
                return;
            }
            var elementStyle = element.style;
            if (!abstractPos) {
                if (elementStyle.cursor === 'col-resize' ||
                    elementStyle.cursor === 'crosshair') {
                    elementStyle.cursor = '';
                }
                return;
            }
            if (_getResizeSelectionAt.call(_this, abstractPos.x, abstractPos.y)) {
                elementStyle.cursor = 'crosshair';
            }
            else {
                var resizeCol = _getResizeColAt.call(_this, abstractPos.x, abstractPos.y);
                if (resizeCol >= 0 && canResizeColumn(resizeCol)) {
                    elementStyle.cursor = 'col-resize';
                }
                else {
                    if (elementStyle.cursor === 'col-resize' ||
                        elementStyle.cursor === 'crosshair') {
                        elementStyle.cursor = '';
                    }
                }
            }
        });
        handler.on(element, 'click', function (e) {
            if (_this[_$1].columnResizer.lastMoving(e) ||
                _this[_$1].selectionResizer.moving(e) ||
                _this[_$1].cellSelector.lastMoving(e)) {
                return;
            }
            if (!_this.hasListeners(DG_EVENT_TYPE.CLICK_CELL) &&
                !_this.hasListeners(DG_EVENT_TYPE.CLICK_UNDERLAY)) {
                return;
            }
            if (browser.Chrome && e.eventPhase === Event.AT_TARGET) {
                // 解决 Chrome 下，单元格输入状态使用鼠标选择，当鼠标在输入框action按钮处抬起时触发动作问题
                return;
            }
            var eventArgs = getCellEventArgsSet(e).eventArgs;
            if (!eventArgs) {
                _this.fireListeners(DG_EVENT_TYPE.CLICK_UNDERLAY);
            }
            else {
                _this.fireListeners(DG_EVENT_TYPE.CLICK_CELL, eventArgs);
            }
        });
        handler.on(element, 'contextmenu', function (e) {
            if (!_this.hasListeners(DG_EVENT_TYPE.CONTEXTMENU_CELL)) {
                return;
            }
            var eventArgs = getCellEventArgsSet(e).eventArgs;
            if (!eventArgs) {
                return;
            }
            _this.fireListeners(DG_EVENT_TYPE.CONTEXTMENU_CELL, eventArgs);
        });
        handler.on(element, 'dblclick', function (e) {
            if (!_this.hasListeners(DG_EVENT_TYPE.DBLCLICK_CELL) &&
                !_this.hasListeners(DG_EVENT_TYPE.DBLCLICK_UNDERLAY)) {
                return;
            }
            var eventArgs = getCellEventArgsSet(e).eventArgs;
            if (!eventArgs) {
                _this.fireListeners(DG_EVENT_TYPE.DBLCLICK_UNDERLAY);
            }
            else {
                _this.fireListeners(DG_EVENT_TYPE.DBLCLICK_CELL, eventArgs);
            }
        });
        this[_$1].focusControl.onKeyDown(function (evt) {
            var results = _this.fireListeners(DG_EVENT_TYPE.KEYDOWN, evt);
            if (array.findIndex(results, function (v) { return v === false; }) >= 0) {
                return false;
            }
        });
        this[_$1].selection.listen(DG_EVENT_TYPE.SELECTED_CELL, function (data) {
            var results = _this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, data, data.selected);
            if (array.findIndex(results, function (v) { return v === false; }) >= 0) {
                return false;
            }
        });
        scrollable.onScroll(function (e) {
            _onScroll.call(_this, e);
            _this.fireListeners(DG_EVENT_TYPE.SCROLL, { event: e });
        });
        this[_$1].focusControl.onKeyDownMove(function (e) {
            _onKeyDownMove.call(_this, e);
        });
        var getCopyValue = function () {
            var copyValue = '';
            var range = _this[_$1].selection.range;
            var copyRange = _this.getCopyRangeInternal(range);
            for (var row = copyRange.start.row; row <= copyRange.end.row; row++) {
                for (var col = copyRange.start.col; col <= copyRange.end.col; col++) {
                    var copyCellValue = _this.getCopyCellValue(col, row, copyRange);
                    if (isPromise(copyCellValue)) ;
                    else {
                        var strCellValue = "" + copyCellValue;
                        if (/^\[object .*\]$/.exec(strCellValue)) ;
                        else {
                            copyValue += strCellValue;
                        }
                    }
                    if (col < copyRange.end.col) {
                        copyValue += '\t';
                    }
                }
                if (row < copyRange.end.row) {
                    copyValue += '\n';
                }
            }
            return copyValue;
        };
        this[_$1].focusControl.onCopy(function (e) {
            var copyValue = getCopyValue();
            var value = array.find(_this.fireListeners(DG_EVENT_TYPE.COPY, e), isDef);
            if (isDef(value)) {
                copyValue = value;
            }
            return copyValue;
        });
        this[_$1].focusControl.onCut(function (e) {
            var copyValue = getCopyValue();
            var value = array.find(_this.fireListeners(DG_EVENT_TYPE.CUT, e), isDef);
            if (isDef(value)) {
                copyValue = value;
            }
            return copyValue;
        });
        this[_$1].focusControl.onPaste(function (e) {
            var value = e.value;
            var event = e.event;
            var pasteValue = _this.hasListeners(DG_EVENT_TYPE.PASTE)
                ? array.find(_this.fireListeners(DG_EVENT_TYPE.PASTE, value, event), isDef)
                : value;
            if (isDef(pasteValue)) {
                var normalizeValue_1 = pasteValue.replace(/\r?\n$/, '');
                var _a = _this[_$1].selection.select, col = _a.col, row = _a.row;
                var multi = /[\r\n\u2028\u2029\t]/.test(normalizeValue_1); // is multi cell values
                var rangeBoxValues_1 = null;
                var pasteCellEvent = {
                    col: col,
                    row: row,
                    value: pasteValue,
                    normalizeValue: normalizeValue_1,
                    multi: multi,
                    get rangeBoxValues() {
                        return (rangeBoxValues_1 !== null && rangeBoxValues_1 !== void 0 ? rangeBoxValues_1 : (rangeBoxValues_1 = parsePasteRangeBoxValues(normalizeValue_1)));
                    },
                    event: event,
                };
                _this.fireListeners(DG_EVENT_TYPE.PASTE_CELL, pasteCellEvent);
            }
        });
        this[_$1].focusControl.onInput(function (value) {
            var col = _this[_$1].selection.select.col;
            var row = _this[_$1].selection.select.row;
            _this.fireListeners(DG_EVENT_TYPE.INPUT_CELL, { col: col, row: row, value: value });
        });
        this[_$1].focusControl.onDelete(function (event) {
            var _a = _this[_$1].selection.select, col = _a.col, row = _a.row;
            _this.fireListeners(DG_EVENT_TYPE.DELETE_CELL, { col: col, row: row, event: event });
        });
        this[_$1].focusControl.onFocus(function (e) {
            _this.fireListeners(DG_EVENT_TYPE.FOCUS_GRID, e);
            _this[_$1].focusedGrid = true;
            var col = _this[_$1].selection.select.col;
            var row = _this[_$1].selection.select.row;
            _this.invalidateCell(col, row);
        });
        this[_$1].focusControl.onBlur(function (e) {
            _this.fireListeners(DG_EVENT_TYPE.BLUR_GRID, e);
            _this[_$1].focusedGrid = false;
            var col = _this[_$1].selection.select.col;
            var row = _this[_$1].selection.select.row;
            _this.invalidateCell(col, row);
        });
    }
    function _getResizeSelectionAt(abstractX, abstractY, offset) {
        if (offset === void 0) { offset = 7; }
        var range = this.selection.range;
        var cellRect = this.getCellRect(range.end.col, range.end.row);
        return !!(cellRect.bottom - offset <= abstractY &&
            abstractY <= cellRect.bottom &&
            cellRect.right - offset <= abstractX &&
            abstractX <= cellRect.right &&
            this.canDragSelection);
    }
    function _getResizeColAt(abstractX, abstractY, offset) {
        if (offset === void 0) { offset = 5; }
        var grid = this;
        if (grid[_$1].frozenRowCount <= 0) {
            return -1;
        }
        var frozenRect = _getFrozenRowsRect.call(this);
        if (frozenRect && !frozenRect.inPoint(abstractX, abstractY)) {
            return -1;
        }
        var cell = grid.getCellAt(abstractX, abstractY);
        var cellRect = grid.getCellRect(cell.col, cell.row);
        if (abstractX < cellRect.left + offset) {
            return cell.col - 1;
        }
        if (cellRect.right - offset < abstractX) {
            return cell.col;
        }
        return -1;
    }
    function _getScrollableVisibleRect() {
        var frozenColsWidth = 0;
        if (this[_$1].frozenColCount > 0) {
            // 当有固定列时绘制固定数量的列
            var frozenRect = _getFrozenColsRect.call(this);
            if (frozenRect) {
                frozenColsWidth = frozenRect.width;
            }
        }
        var frozenRowsHeight = 0;
        if (this[_$1].frozenRowCount > 0) {
            // 当有固定列时绘制固定数量的列
            var frozenRect = _getFrozenRowsRect.call(this);
            if (frozenRect) {
                frozenRowsHeight = frozenRect.height;
            }
        }
        return new Rect(this[_$1].scrollable.scrollLeft + frozenColsWidth, this[_$1].scrollable.scrollTop + frozenRowsHeight, this[_$1].canvas.width - frozenColsWidth, this[_$1].canvas.height - frozenRowsHeight);
    }
    function createRootElement() {
        var element = document.createElement('div');
        element.classList.add('kaka-grid');
        return element;
    }
    /**
     * DrawGrid
     */
    var DrawGrid = /** @class */ (function (_super) {
        __extends(DrawGrid, _super);
        /**
         * constructor
         *
         * <pre>
         * Constructor options
         * -----
         * rowCount: grid row count.default 10
         * colCount: grid col count.default 10
         * frozenColCount: default 0
         * frozenRowCount: default 0
         * defaultRowHeight: default grid row height. default 40
         * defaultColWidth: default grid col width. default 80
         * highlightBorderWidth: default grid highlight border width. default 2
         * parentElement: canvas parentElement
         * font: default font
         * underlayRowCount: default 0
         * underlayColCount: default 0
         * underlayRowHeight: default 'auto'
         * underlayColWidth: default 'auto'
         * underlayBackgroundColor: underlay background color
         * singleSelection: default false
         * disableColumnResize: default false
         * -----
         * </pre>
         */
        function DrawGrid(options) {
            if (options === void 0) { options = {}; }
            var _a, _b;
            var _this = _super.call(this) || this;
            var _c = options.rowCount, rowCount = _c === void 0 ? 10 : _c, _d = options.colCount, colCount = _d === void 0 ? 10 : _d, _f = options.frozenColCount, frozenColCount = _f === void 0 ? 0 : _f, _g = options.frozenRowCount, frozenRowCount = _g === void 0 ? 0 : _g, defaultRowHeight = options.defaultRowHeight, defaultColWidth = options.defaultColWidth, highlightBorderWidth = options.highlightBorderWidth, font = options.font, _h = options.underlayRowCount, underlayRowCount = _h === void 0 ? 0 : _h, _j = options.underlayColCount, underlayColCount = _j === void 0 ? 0 : _j, _k = options.underlayRowHeight, underlayRowHeight = _k === void 0 ? 'auto' : _k, _l = options.underlayColWidth, underlayColWidth = _l === void 0 ? 'auto' : _l, underlayBackgroundColor = options.underlayBackgroundColor, _m = options.borderMode, borderMode = _m === void 0 ? 'none' : _m, _o = options.borderColor, borderColor = _o === void 0 ? '' : _o, _p = options.borderWidth, borderWidth = _p === void 0 ? 0 : _p, keyboardOptions = options.keyboardOptions, parentElement = options.parentElement, singleSelection = options.singleSelection, disableColumnResize = options.disableColumnResize;
            var protectedSpace = (_this[_$1] = {});
            style$1.initDocument();
            protectedSpace.element = createRootElement();
            protectedSpace.canvas = hiDPI.transform(document.createElement('canvas'));
            protectedSpace.context = protectedSpace.canvas.getContext('2d', {
                alpha: false,
            });
            protectedSpace.scrollable = style$1.isPerfectScrollbar()
                ? new Scrollbar()
                : new Scrollable(protectedSpace.canvas);
            protectedSpace.handler = new EventHandler();
            protectedSpace.selection = new Selection(_this, function (range) {
                return _this.updateSelectionRange(range);
            });
            protectedSpace.focusControl = new FocusControl(_this, protectedSpace.scrollable.getElement(), protectedSpace.scrollable);
            protectedSpace.rowCount = rowCount;
            protectedSpace.colCount = colCount;
            protectedSpace.frozenColCount = frozenColCount;
            protectedSpace.frozenRowCount = frozenRowCount;
            protectedSpace.underlayRowCount = underlayRowCount;
            protectedSpace.underlayColCount = underlayColCount;
            protectedSpace.underlayRowHeight = underlayRowHeight;
            protectedSpace.underlayColWidth = underlayColWidth;
            protectedSpace.borderMode = borderMode;
            protectedSpace.borderColor = borderColor;
            protectedSpace.borderWidth = borderWidth;
            protectedSpace.defaultRowHeight = defaultRowHeight;
            protectedSpace.defaultColWidth = defaultColWidth;
            protectedSpace.highlightBorderWidth = highlightBorderWidth;
            protectedSpace.font = font;
            protectedSpace.underlayBackgroundColor = underlayBackgroundColor;
            protectedSpace.keyboardOptions = keyboardOptions || {};
            protectedSpace.keyboardOptions.moveCellOnEnter = (_a = protectedSpace.keyboardOptions.moveCellOnEnter) !== null && _a !== void 0 ? _a : true;
            protectedSpace.keyboardOptions.moveCellOnTab = (_b = protectedSpace.keyboardOptions.moveCellOnTab) !== null && _b !== void 0 ? _b : true;
            protectedSpace.singleSelection = !!singleSelection;
            protectedSpace.disableColumnResize =
                !!disableColumnResize || !!options.disableColResize;
            /////
            protectedSpace.rowHeightsMap = new NumberMap();
            protectedSpace.colWidthsMap = new NumberMap();
            protectedSpace.colWidthsLimit = {};
            protectedSpace.colWidthsOffset = {};
            protectedSpace.calcWidthContext = {
                _: protectedSpace,
                get full() {
                    return this._.canvas.width;
                },
                get em() {
                    return getFontSize(this._.context, this._.font).width;
                },
            };
            protectedSpace.columnResizer = new ColumnResizer(_this);
            protectedSpace.selectionResizer = new SelectionResizer(_this);
            protectedSpace.cellSelector = new CellSelector(_this);
            protectedSpace.drawCells = {};
            protectedSpace.cellTextOverflows = {};
            protectedSpace.cellTypeOverflows = {};
            protectedSpace.focusedGrid = false;
            protectedSpace.element.appendChild(protectedSpace.canvas);
            protectedSpace.element.appendChild(protectedSpace.scrollable.getElement());
            protectedSpace.scroll = {
                left: 0,
                top: 0,
            };
            _this.updateScroll();
            if (parentElement) {
                parentElement.appendChild(protectedSpace.element);
                _this.updateSize();
            }
            else {
                _this.updateSize();
            }
            _bindEvents.call(_this);
            _this.bindEventsInternal();
            return _this;
        }
        Object.defineProperty(DrawGrid, "EVENT_TYPE", {
            get: function () {
                return DG_EVENT_TYPE;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Get root element.
         * @returns root element
         */
        DrawGrid.prototype.getElement = function () {
            return this[_$1].element;
        };
        Object.defineProperty(DrawGrid.prototype, "canvas", {
            /**
             * Get canvas element.
             */
            get: function () {
                return this[_$1].canvas;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Focus the grid.
         * @returns
         */
        DrawGrid.prototype.focus = function () {
            var _a = this[_$1].selection.select, col = _a.col, row = _a.row;
            this.focusCell(col, row);
        };
        DrawGrid.prototype.hasFocusGrid = function () {
            return this[_$1].focusedGrid;
        };
        Object.defineProperty(DrawGrid.prototype, "selection", {
            /**
             * Selection instance.
             */
            get: function () {
                return this[_$1].selection;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "rowCount", {
            /**
             * Number of rows.
             */
            get: function () {
                return this[_$1].rowCount;
            },
            set: function (rowCount) {
                this[_$1].rowCount = rowCount;
                this.updateScroll();
                if (this[_$1].selection._updateGridRange()) {
                    var _a = this[_$1].selection.focus, col = _a.col, row = _a.row;
                    this.makeVisibleCell(col, row);
                    this.setFocusCursor(col, row);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "colCount", {
            /**
             * Number of columns.
             */
            get: function () {
                return this[_$1].colCount;
            },
            set: function (colCount) {
                this[_$1].colCount = colCount;
                this.updateScroll();
                if (this[_$1].selection._updateGridRange()) {
                    var _a = this[_$1].selection.focus, col = _a.col, row = _a.row;
                    this.makeVisibleCell(col, row);
                    this.setFocusCursor(col, row);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "frozenColCount", {
            /**
             * Number of frozen columns.
             */
            get: function () {
                return this[_$1].frozenColCount;
            },
            set: function (frozenColCount) {
                this[_$1].frozenColCount = frozenColCount;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "frozenRowCount", {
            /**
             * Number of frozen rows.
             */
            get: function () {
                return this[_$1].frozenRowCount;
            },
            set: function (frozenRowCount) {
                this[_$1].frozenRowCount = frozenRowCount;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "defaultRowHeight", {
            /**
             * Default row height.
             *
             */
            get: function () {
                return this[_$1].defaultRowHeight || this.getDefaultRowHeight();
            },
            set: function (defaultRowHeight) {
                this[_$1].defaultRowHeight = defaultRowHeight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "defaultColWidth", {
            /**
             * Default column width.
             */
            get: function () {
                return this[_$1].defaultColWidth || this.getDefaultColWidth();
            },
            set: function (defaultColWidth) {
                this[_$1].defaultColWidth = defaultColWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "highlightBorderWidth", {
            /**
             * Highlight Border Width.
             */
            get: function () {
                return this[_$1].highlightBorderWidth || this.getHighlightBorderWidth();
            },
            set: function (highlightBorderWidth) {
                this[_$1].highlightBorderWidth = highlightBorderWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "font", {
            /**
             * Font definition as a string.
             */
            get: function () {
                return this[_$1].font || this.getDefaultFont();
            },
            set: function (font) {
                this[_$1].font = font;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "underlayRowCount", {
            /**
             * Number of underlay rows.
             */
            get: function () {
                return this[_$1].underlayRowCount;
            },
            set: function (underlayRowCount) {
                this[_$1].underlayRowCount = underlayRowCount;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "underlayColCount", {
            /**
             * Number of underlay cols.
             */
            get: function () {
                return this[_$1].underlayColCount;
            },
            set: function (underlayColCount) {
                this[_$1].underlayColCount = underlayColCount;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "underlayRowHeight", {
            /**
             * Height of underlay row.
             */
            get: function () {
                return this[_$1].underlayRowHeight;
            },
            set: function (underlayRowHeight) {
                this[_$1].underlayRowHeight = underlayRowHeight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "underlayColWidth", {
            /**
             * Width of underlay col.
             */
            get: function () {
                return this[_$1].underlayColWidth;
            },
            set: function (underlayColWidth) {
                this[_$1].underlayColWidth = underlayColWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "underlayBackgroundColor", {
            /**
             * Background color of the underlay.
             */
            get: function () {
                return (this[_$1].underlayBackgroundColor ||
                    this.getDefaultUnderlayBackgroundColor());
            },
            set: function (underlayBackgroundColor) {
                this[_$1].underlayBackgroundColor = underlayBackgroundColor;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "borderColor", {
            /**
             * Border color of the grid.
             */
            get: function () {
                return this[_$1].borderColor || this.getDefaultBorderColor();
            },
            set: function (borderColor) {
                this[_$1].borderColor = borderColor;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "borderWidth", {
            /**
             * Border width of the grid.
             */
            get: function () {
                return this[_$1].borderWidth || this.getDefaultBorderWidth();
            },
            set: function (borderWidth) {
                this[_$1].borderWidth = borderWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "borderMode", {
            /**
             * Border mode of the grid.
             */
            get: function () {
                return this[_$1].borderMode || this.getDefaultBorderMode();
            },
            set: function (borderMode) {
                this[_$1].borderMode = borderMode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "keyboardOptions", {
            get: function () {
                var _a;
                return (_a = this[_$1].keyboardOptions) !== null && _a !== void 0 ? _a : null;
            },
            set: function (keyboardOptions) {
                this[_$1].keyboardOptions = keyboardOptions !== null && keyboardOptions !== void 0 ? keyboardOptions : undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "singleSelection", {
            /**
             * Single selection.
             */
            get: function () {
                return this[_$1].singleSelection;
            },
            set: function (singleSelection) {
                this[_$1].singleSelection = singleSelection;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "disableColumnResize", {
            /**
             * Disable column resize.
             */
            get: function () {
                return this[_$1].disableColumnResize;
            },
            set: function (disableColumnResize) {
                this[_$1].disableColumnResize = disableColumnResize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "disableColResize", {
            get: function () {
                window.console.warn("'disableColResize' is deprecated, please use 'disableColumnResize' instead");
                return this.disableColumnResize;
            },
            set: function (disableColumnResize) {
                window.console.warn("'disableColResize' is deprecated, please use 'disableColumnResize' instead");
                this.disableColumnResize = disableColumnResize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "canDragSelection", {
            get: function () {
                return this[_$1].selectionResizer.canStart();
            },
            enumerable: false,
            configurable: true
        });
        DrawGrid.prototype.configure = function (name, value) {
            var cfg = this[_$1].config || (this[_$1].config = {});
            if (isDef(value)) {
                cfg[name] = value;
            }
            return cfg[name];
        };
        /**
         * Apply the changed size.
         * @returns
         */
        DrawGrid.prototype.updateSize = function () {
            // Update size of canvas
            var canvas = this[_$1].canvas;
            canvas.style.width = '';
            canvas.style.height = '';
            var width = canvas.offsetWidth;
            if (!width) {
                // for legacy
                var parent_1 = canvas.parentElement;
                if (parent_1 !== null) {
                    width = parent_1.offsetWidth - style$1.getScrollBarSize();
                }
            }
            width = Math.floor(width);
            var height = canvas.offsetHeight;
            if (!height) {
                // for legacy
                var parent_2 = canvas.parentElement;
                if (parent_2 !== null) {
                    height = parent_2.offsetHeight - style$1.getScrollBarSize();
                }
            }
            height = Math.floor(height);
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            var sel = this[_$1].selection.select;
            this[_$1].focusControl.setFocusRect(this.getFocusRectInternal(sel.col, sel.row));
        };
        /**
         * Apply the changed scroll size.
         * @returns `true` if there was a change in the scroll size
         */
        DrawGrid.prototype.updateScroll = function () {
            _initColWidthsOffset(this);
            var scrollable = this[_$1].scrollable;
            var newHeight = _getScrollHeight.call(this);
            var newWidth = _getScrollWidth.call(this);
            if (newHeight === scrollable.scrollHeight &&
                newWidth === scrollable.scrollWidth) {
                scrollable.update();
                return false;
            }
            else {
                scrollable.setScrollSize(newWidth, newHeight);
                this[_$1].scroll = {
                    left: scrollable.scrollLeft,
                    top: scrollable.scrollTop,
                };
                return true;
            }
        };
        /**
         * Get the row height of the given the row index.
         * @param row - The row index
         * @returns The row height
         */
        DrawGrid.prototype.getRowHeight = function (row) {
            return _getRowHeight.call(this, row);
        };
        /**
         * Set the row height of the given the row index.
         * @param row - The row index
         * @param height - The row height
         * @returns
         */
        DrawGrid.prototype.setRowHeight = function (row, height) {
            _setRowHeight.call(this, row, height);
        };
        /**
         * Get the column width of the given the column index.
         * @param col - The column index
         * @returns The column width
         */
        DrawGrid.prototype.getColWidth = function (col) {
            return _getColWidth.call(this, col);
        };
        /**
         * Set the column widtht of the given the column index.
         * @param col - The column index
         * @param width - The column width
         * @returns
         */
        DrawGrid.prototype.setColWidth = function (col, width) {
            _setColWidth.call(this, col, width);
        };
        /**
         * Get the column max width of the given the column index.
         * @param col - The column index
         * @returns The column max width
         */
        DrawGrid.prototype.getMaxColWidth = function (col) {
            var obj = this[_$1].colWidthsLimit[col];
            return (obj && obj.max) || undefined;
        };
        /**
         * Set the column max width of the given the column index.
         * @param col - The column index
         * @param maxWidth - The column max width
         * @returns
         */
        DrawGrid.prototype.setMaxColWidth = function (col, maxWidth) {
            var obj = this[_$1].colWidthsLimit[col] || (this[_$1].colWidthsLimit[col] = {});
            obj.max = maxWidth;
        };
        /**
         * Get the column min width of the given the column index.
         * @param col - The column index
         * @returns The column min width
         */
        DrawGrid.prototype.getMinColWidth = function (col) {
            var obj = this[_$1].colWidthsLimit[col];
            return (obj && obj.min) || undefined;
        };
        /**
         * Set the column min width of the given the column index.
         * @param col - The column index
         * @param minWidth - The column min width
         * @returns
         */
        DrawGrid.prototype.setMinColWidth = function (col, minWidth) {
            var obj = this[_$1].colWidthsLimit[col] || (this[_$1].colWidthsLimit[col] = {});
            obj.min = minWidth;
        };
        /**
         * Get the column disable resize of the given the column index.
         * @param col - The column index
         * @returns The column disable resize
         */
        DrawGrid.prototype.getColDisableResize = function (col) {
            var obj = this[_$1].colWidthsLimit[col];
            return (obj && obj.disableResize) || undefined;
        };
        /**
         * Set the column disable resize of the given the column index.
         * @param col - The column index
         * @param disableResize - The column disable resize
         * @returns
         */
        DrawGrid.prototype.setColDisableResize = function (col, disableResize) {
            var obj = this[_$1].colWidthsLimit[col] || (this[_$1].colWidthsLimit[col] = {});
            obj.disableResize = disableResize;
        };
        /**
         * Get the rect of the cell.
         * @param col - index of column, of the cell
         * @param row - index of row, of the cell
         * @returns the rect of the cell.
         */
        DrawGrid.prototype.getCellRect = function (col, row) {
            var isFrozenCell = this.isFrozenCell(col, row);
            var absoluteLeft = this._getColsWidth(0, col - 1);
            var width = _getColWidth.call(this, col);
            if (isFrozenCell && isFrozenCell.col) {
                absoluteLeft += this[_$1].scroll.left;
            }
            var absoluteTop = _getRowsHeight.call(this, 0, row - 1);
            var height = _getRowHeight.call(this, row);
            if (isFrozenCell && isFrozenCell.row) {
                absoluteTop += this[_$1].scroll.top;
            }
            return new Rect(absoluteLeft, absoluteTop, width, height);
        };
        /**
         * Get the relative rectangle of the cell.
         * @param col - index of column, of the cell
         * @param row - index of row, of the cell
         * @returns the rect of the cell.
         */
        DrawGrid.prototype.getCellRelativeRect = function (col, row) {
            return this._toRelativeRect(this.getCellRect(col, row));
        };
        /**
         * Get the rectangle of the cells area.
         * @param startCol - index of the starting column, of the cell
         * @param startRow - index of the starting row, of the cell
         * @param endCol - index of the ending column, of the cell
         * @param endRow - index of the ending row, of the cell
         * @returns the rect of the cells.
         */
        DrawGrid.prototype.getCellsRect = function (startCol, startRow, endCol, endRow) {
            var isFrozenStartCell = this.isFrozenCell(startCol, startRow);
            var isFrozenEndCell = this.isFrozenCell(endCol, endRow);
            var absoluteLeft = this._getColsWidth(0, startCol - 1);
            var width = this._getColsWidth(startCol, endCol);
            if (isFrozenStartCell && isFrozenStartCell.col) {
                var scrollLeft = this[_$1].scroll.left;
                absoluteLeft += scrollLeft;
                if (!isFrozenEndCell || !isFrozenEndCell.col) {
                    width -= scrollLeft;
                    width = Math.max(width, this._getColsWidth(startCol, this.frozenColCount - 1));
                }
            }
            var absoluteTop = _getRowsHeight.call(this, 0, startRow - 1);
            var height = _getRowsHeight.call(this, startRow, endRow);
            if (isFrozenStartCell && isFrozenStartCell.row) {
                var scrollTop = this[_$1].scroll.top;
                absoluteTop += scrollTop;
                if (!isFrozenEndCell || !isFrozenEndCell.row) {
                    height -= scrollTop;
                    height = Math.max(height, this._getColsWidth(startRow, this.frozenRowCount - 1));
                }
            }
            return new Rect(absoluteLeft, absoluteTop, width, height);
        };
        DrawGrid.prototype.getCellRangeRect = function (range) {
            return this.getCellsRect(range.start.col, range.start.row, range.end.col, range.end.row);
        };
        DrawGrid.prototype.isFrozenCell = function (col, row) {
            var _a = this[_$1], frozenRowCount = _a.frozenRowCount, frozenColCount = _a.frozenColCount;
            var isFrozenRow = frozenRowCount > 0 && row < frozenRowCount;
            var isFrozenCol = frozenColCount > 0 && col < frozenColCount;
            if (isFrozenRow || isFrozenCol) {
                return {
                    col: isFrozenCol,
                    row: isFrozenRow,
                };
            }
            else {
                return null;
            }
        };
        DrawGrid.prototype.getRowAt = function (absoluteY) {
            var frozen = _getTargetFrozenRowAt.call(this, absoluteY);
            if (frozen) {
                return frozen.row;
            }
            var row = _getTargetRowAt.call(this, absoluteY);
            return row ? row.row : -1;
        };
        DrawGrid.prototype.getColAt = function (absoluteX) {
            var frozen = _getTargetFrozenColAt.call(this, absoluteX);
            if (frozen) {
                return frozen.col;
            }
            var col = _getTargetColAt.call(this, absoluteX);
            return col ? col.col : -1;
        };
        DrawGrid.prototype.getCellAt = function (absoluteX, absoluteY) {
            return {
                col: this.getColAt(absoluteX),
                row: this.getRowAt(absoluteY),
            };
        };
        /**
         * Scroll to where cell is visible.
         * @param col - The column index.
         * @param row - The row index
         * @returns
         */
        DrawGrid.prototype.makeVisibleCell = function (col, row) {
            var isFrozenCell = this.isFrozenCell(col, row);
            if (isFrozenCell && isFrozenCell.col && isFrozenCell.row) {
                return;
            }
            var rect = this.getCellRect(col, row);
            var visibleRect = _getScrollableVisibleRect.call(this);
            if (visibleRect.contains(rect)) {
                return;
            }
            var scrollable = this[_$1].scrollable;
            if (!isFrozenCell || !isFrozenCell.col) {
                if (rect.left < visibleRect.left) {
                    scrollable.scrollLeft -= visibleRect.left - rect.left;
                }
                else if (visibleRect.right < rect.right) {
                    scrollable.scrollLeft -= visibleRect.right - rect.right;
                }
            }
            if (!isFrozenCell || !isFrozenCell.row) {
                if (rect.top < visibleRect.top) {
                    scrollable.scrollTop -= visibleRect.top - rect.top;
                }
                else if (visibleRect.bottom < rect.bottom) {
                    scrollable.scrollTop -= visibleRect.bottom - rect.bottom;
                }
            }
        };
        /**
         * Moves the focus cursor to the given cell.
         * @param col - The column index.
         * @param row - The row index
         * @returns
         */
        DrawGrid.prototype.setFocusCursor = function (col, row) {
            var focusControl = this[_$1].focusControl;
            var oldEditMode = focusControl.editMode;
            focusControl.setFocusRect(this.getFocusRectInternal(col, row));
            this._updatedSelection();
            if (oldEditMode && !focusControl.editMode) {
                focusControl.resetInputStatus();
            }
        };
        DrawGrid.prototype._updatedSelection = function () {
            var focusControl = this[_$1].focusControl;
            var _a = this[_$1].selection.select, selCol = _a.col, selRow = _a.row;
            var results = this.fireListeners(DG_EVENT_TYPE.EDITABLEINPUT_CELL, {
                col: selCol,
                row: selRow,
            });
            var editMode = array.findIndex(results, function (v) { return !!v; }) >= 0;
            focusControl.editMode = editMode;
            if (editMode) {
                focusControl.storeInputStatus();
                focusControl.setDefaultInputStatus();
                this.fireListeners(DG_EVENT_TYPE.MODIFY_STATUS_EDITABLEINPUT_CELL, {
                    col: selCol,
                    row: selRow,
                    input: focusControl.input,
                });
            }
        };
        /**
         * Focus the cell.
         * @param col - The column index.
         * @param row - The row index
         * @returns
         */
        DrawGrid.prototype.focusCell = function (col, row) {
            var startCol = this.selection.range.start.col;
            var startRow = this.selection.range.start.row;
            var endCol = this.selection.range.end.col;
            var endRow = this.selection.range.end.row;
            this.setFocusCursor(col, row);
            // Failure occurs in IE if focus is not last
            this._forceFocusCell();
            // Invalidate Grid
            this.selection.select = {
                col: col,
                row: row,
            };
            this.invalidateGridRect(startCol, startRow, endCol, endRow);
            this.invalidateCell(col, row);
        };
        /**
         * Redraws the range of the given cell.
         * @param col - The column index of cell.
         * @param row - The row index of cell.
         * @returns
         */
        DrawGrid.prototype.invalidateCell = function (col, row) {
            this.invalidateGridRect(col, row);
        };
        /**
         * Redraws the range of the given cells.
         * @param startCol - index of the starting column, of the cell
         * @param startRow - index of the starting row, of the cell
         * @param endCol - index of the ending column, of the cell
         * @param endRow - index of the ending row, of the cell
         * @returns
         */
        DrawGrid.prototype.invalidateGridRect = function (startCol, startRow, endCol, endRow) {
            if (endCol === void 0) { endCol = startCol; }
            if (endRow === void 0) { endRow = startRow; }
            var offset = this.getOffsetInvalidateCells();
            if (offset > 0) {
                startCol -= offset;
                startRow -= offset;
                endCol += offset;
                endRow += offset;
            }
            var visibleRect = this._getVisibleRect();
            var cellsRect = this.getCellsRect(startCol, startRow, endCol, endRow);
            var invalidateTarget = visibleRect.intersection(cellsRect);
            if (invalidateTarget) {
                var _a = this[_$1], frozenColCount = _a.frozenColCount, frozenRowCount = _a.frozenRowCount;
                if (frozenColCount > 0 && endCol >= frozenColCount) {
                    var frozenRect = _getFrozenColsRect.call(this);
                    if (frozenRect && frozenRect.intersection(invalidateTarget)) {
                        invalidateTarget.left = Math.min(frozenRect.right - 1, frozenRect.left);
                    }
                }
                if (frozenRowCount > 0 && endRow >= frozenRowCount) {
                    var frozenRect = _getFrozenRowsRect.call(this);
                    if (frozenRect && frozenRect.intersection(invalidateTarget)) {
                        invalidateTarget.top = Math.min(frozenRect.bottom - 1, invalidateTarget.top);
                    }
                }
                this._invalidateRect(invalidateTarget);
            }
        };
        DrawGrid.prototype.invalidateCellRange = function (range) {
            this.invalidateGridRect(range.start.col, range.start.row, range.end.col, range.end.row);
        };
        /**
         * Redraws the whole grid.
         * @returns
         */
        DrawGrid.prototype.invalidate = function () {
            var visibleRect = this._getVisibleRect();
            this._invalidateRect(visibleRect);
        };
        Object.defineProperty(DrawGrid.prototype, "visibleRowCount", {
            /**
             * Get the number of scrollable rows fully visible in the grid. visibleRowCount does not include the frozen rows counted by the frozenRowCount property. It does not include any partially visible rows on the bottom of the grid.
             * @returns
             */
            get: function () {
                var frozenRowCount = this.frozenRowCount;
                var visibleRect = this._getVisibleRect();
                var visibleTop = frozenRowCount > 0
                    ? visibleRect.top + _getRowsHeight.call(this, 0, frozenRowCount - 1)
                    : visibleRect.top;
                var initRow = _getTargetRowAt.call(this, visibleTop);
                if (!initRow) {
                    return 0;
                }
                var startRow = Math.max(initRow.top >= visibleTop ? initRow.row : initRow.row + 1, frozenRowCount);
                var absoluteTop = _getRowsHeight.call(this, 0, startRow - 1);
                var count = 0;
                var rowCount = this.rowCount;
                for (var row = startRow; row < rowCount; row++) {
                    var height = _getRowHeight.call(this, row);
                    var bottom = absoluteTop + height;
                    if (visibleRect.bottom < bottom) {
                        break;
                    }
                    count++;
                    absoluteTop = bottom;
                }
                return count;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "visibleColCount", {
            /**
             * Get the number of scrollable columns fully visible in the grid. visibleColCount does not include the frozen columns counted by the frozenColCount property. It does not include any partially visible columns on the right of the grid.
             * @returns
             */
            get: function () {
                var frozenColCount = this.frozenColCount;
                var visibleRect = this._getVisibleRect();
                var visibleLeft = frozenColCount > 0
                    ? visibleRect.left + this._getColsWidth(0, frozenColCount - 1)
                    : visibleRect.left;
                var initCol = _getTargetColAt.call(this, visibleLeft);
                if (!initCol) {
                    return 0;
                }
                var startCol = Math.max(initCol.left >= visibleLeft ? initCol.col : initCol.col + 1, frozenColCount);
                var absoluteLeft = this._getColsWidth(0, startCol - 1);
                var count = 0;
                var colCount = this.colCount;
                for (var col = startCol; col < colCount; col++) {
                    var width = _getColWidth.call(this, col);
                    var right = absoluteLeft + width;
                    if (visibleRect.right < right) {
                        break;
                    }
                    count++;
                    absoluteLeft = right;
                }
                return count;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "topRow", {
            /**
             * Get the index of the first row in the scrollable region that is visible.
             * @returns
             */
            get: function () {
                var frozenRowCount = this.frozenRowCount;
                var visibleRect = this._getVisibleRect();
                var visibleTop = frozenRowCount > 0
                    ? visibleRect.top + _getRowsHeight.call(this, 0, frozenRowCount - 1)
                    : visibleRect.top;
                var initRow = _getTargetRowAt.call(this, visibleTop);
                if (!initRow) {
                    return 0;
                }
                return Math.max(initRow.top >= visibleTop ? initRow.row : initRow.row + 1, frozenRowCount);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "leftCol", {
            /**
             * Get the index of the first column in the scrollable region that is visible.
             * @returns
             */
            get: function () {
                var frozenColCount = this.frozenColCount;
                var visibleRect = this._getVisibleRect();
                var visibleLeft = frozenColCount > 0
                    ? visibleRect.left + this._getColsWidth(0, frozenColCount - 1)
                    : visibleRect.left;
                var initCol = _getTargetColAt.call(this, visibleLeft);
                if (!initCol) {
                    return 0;
                }
                return Math.max(initCol.left >= visibleLeft ? initCol.col : initCol.col + 1, frozenColCount);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "scrollTop", {
            /**
             * gets or sets the number of pixels that an element's content is scrolled vertically
             */
            get: function () {
                return this[_$1].scrollable.scrollTop;
            },
            set: function (scrollTop) {
                this[_$1].scrollable.scrollTop = scrollTop;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawGrid.prototype, "scrollLeft", {
            /**
             * gets or sets the number of pixels that an element's content is scrolled from its left edge
             */
            get: function () {
                return this[_$1].scrollable.scrollLeft;
            },
            set: function (scrollLeft) {
                this[_$1].scrollable.scrollLeft = scrollLeft;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Get the overflowed text in the cell rectangle, from the given cell.
         * @param col - The column index.
         * @param row - The row index
         * @returns The text overflowing the cell rect.
         */
        DrawGrid.prototype.getCellOverflowText = function (col, row) {
            var overflowText = this.getCellOverflowTextInternal({ col: col, row: row }) || null;
            if (!overflowText) {
                var key = col + ":" + row;
                overflowText = this[_$1].cellTextOverflows[key] || null;
            }
            return overflowText;
        };
        /**
         * Set the overflowed text in the cell rectangle, to the given cell.
         * @param col - The column index.
         * @param row - The row index
         * @param overflowText - The overflowed text in the cell rectangle.
         * @returns
         */
        DrawGrid.prototype.setCellOverflowText = function (col, row, overflowText) {
            var key = col + ":" + row;
            if (overflowText) {
                this[_$1].cellTextOverflows[key] =
                    typeof overflowText === 'string' ? overflowText.trim() : '';
            }
            else {
                delete this[_$1].cellTextOverflows[key];
            }
        };
        /**
         * Get the overflowed type in the cell rectangle, from the given cell.
         * @param col - The column index.
         * @param row - The row index
         * @returns The type overflowing the cell rect.
         */
        DrawGrid.prototype.getCellOverflowType = function (col, row) {
            var overflowType = this.getCellOverflowTypeInternal({ col: col, row: row }) || null;
            if (!overflowType) {
                var key = col + ":" + row;
                overflowType = this[_$1].cellTypeOverflows[key] || null;
            }
            return overflowType;
        };
        /**
         * Set the overflowed type in the cell rectangle, to the given cell.
         * @param col - The column index.
         * @param row - The row index
         * @param overflowType - The overflowed type in the cell rectangle.
         * @returns
         */
        DrawGrid.prototype.setCellOverflowType = function (col, row, overflowType) {
            var key = col + ":" + row;
            if (overflowType) {
                this[_$1].cellTypeOverflows[key] =
                    typeof overflowType === 'string' ? overflowType.trim() : '';
            }
            else {
                delete this[_$1].cellTypeOverflows[key];
            }
        };
        DrawGrid.prototype.addDisposable = function (disposable) {
            if (!disposable ||
                !disposable.dispose ||
                typeof disposable.dispose !== 'function') {
                throw new Error('not disposable!');
            }
            var disposables = (this[_$1].disposables = this[_$1].disposables || []);
            disposables.push(disposable);
        };
        /**
         * Dispose the grid instance.
         * @returns
         */
        DrawGrid.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            var protectedSpace = this[_$1];
            protectedSpace.handler.dispose();
            protectedSpace.scrollable.dispose();
            protectedSpace.focusControl.dispose();
            protectedSpace.columnResizer.dispose();
            protectedSpace.selectionResizer.dispose();
            protectedSpace.cellSelector.dispose();
            if (protectedSpace.disposables) {
                protectedSpace.disposables.forEach(function (disposable) {
                    return disposable.dispose();
                });
                protectedSpace.disposables = null;
            }
            var parentElement = protectedSpace.element.parentElement;
            if (parentElement) {
                parentElement.removeChild(protectedSpace.element);
            }
        };
        DrawGrid.prototype.getAttachCellsArea = function (range) {
            return {
                element: this.getElement(),
                rect: this.getAttachCellsAreaInternal(range),
                padding: this.getAttachCellsPaddingInternal(range),
            };
        };
        DrawGrid.prototype.onKeyDownMove = function (evt) {
            _onKeyDownMove.call(this, evt);
        };
        DrawGrid.prototype._getMouseAbstractPoint = function (evt) {
            var e;
            if (event.isTouchEvent(evt)) {
                e = evt.changedTouches[0];
            }
            else {
                e = evt;
            }
            var clientX = e.clientX || e.pageX + window.scrollX;
            var clientY = e.clientY || e.pageY + window.scrollY;
            var rect = this[_$1].canvas.getBoundingClientRect();
            if (rect.right <= clientX) {
                return null;
            }
            if (rect.bottom <= clientY) {
                return null;
            }
            var x = clientX - rect.left + this[_$1].scroll.left;
            var y = clientY - rect.top + this[_$1].scroll.top;
            return { x: x, y: y };
        };
        DrawGrid.prototype._getMouseRelativePoint = function (e) {
            var abstractPos = this._getMouseAbstractPoint(e);
            if (abstractPos) {
                return {
                    x: abstractPos.x - this[_$1].scroll.left,
                    y: abstractPos.y - this[_$1].scroll.top,
                };
            }
            else {
                return null;
            }
        };
        DrawGrid.prototype._getColsWidth = function (startCol, endCol) {
            var _this = this;
            var defaultColPxWidth = _colWidthDefineToPxWidth.call(this, this.defaultColWidth);
            var colCount = endCol - startCol + 1;
            var w = defaultColPxWidth * colCount;
            this[_$1].colWidthsMap.each(startCol, endCol, function (width, col) {
                w +=
                    _adjustColWidth.call(_this, col, _colWidthDefineToPxWidth.call(_this, width)) - defaultColPxWidth;
            });
            for (var col = startCol; col <= endCol; col++) {
                if (this[_$1].colWidthsMap.has(col)) {
                    continue;
                }
                var adj = _adjustColWidth.call(this, col, defaultColPxWidth);
                if (adj !== defaultColPxWidth) {
                    w += adj - defaultColPxWidth;
                }
            }
            return w;
        };
        DrawGrid.prototype._moveFocusCell = function (col, row, shiftKey, silence) {
            var offset = this.getOffsetInvalidateCells();
            function extendRange(range) {
                if (offset > 0) {
                    range.start.col -= offset;
                    range.start.row -= offset;
                    range.end.col += offset;
                    range.end.row += offset;
                }
                return range;
            }
            var beforeRange = extendRange(this.selection.range);
            var beforeRect = this.getCellRangeRect(beforeRange);
            this.selection._setFocusCell(col, row, shiftKey);
            if (!silence) {
                this.makeVisibleCell(col, row);
            }
            this.setFocusCursor(col, row);
            this._forceFocusCell();
            var afterRange = extendRange(this.selection.range);
            var afterRect = this.getCellRangeRect(afterRange);
            if (afterRect.intersection(beforeRect)) {
                var invalidateRect = Rect.max(afterRect, beforeRect);
                this._invalidateRect(invalidateRect);
            }
            else {
                this._invalidateRect(beforeRect);
                this._invalidateRect(afterRect);
            }
        };
        DrawGrid.prototype._forceFocusCell = function () {
            this[_$1].focusControl.focus();
        };
        DrawGrid.prototype._resetColWidthOffset = function (col) {
            delete this[_$1].colWidthsOffset[col];
        };
        DrawGrid.prototype._adjustColWidth = function (col, orgWidth) {
            var offset = this[_$1].colWidthsOffset[col] || 0;
            var limits = _getColWidthLimits.call(this, col);
            return Math.max(_applyColWidthLimits(limits, orgWidth), 0) + offset;
        };
        DrawGrid.prototype._getVisibleRect = function () {
            var left = this[_$1].scroll.left;
            var top = this[_$1].scroll.top;
            var width = this[_$1].canvas.width;
            var height = this[_$1].canvas.height;
            return new Rect(left, top, width, height);
        };
        DrawGrid.prototype._invalidateRect = function (drawRect) {
            var _this = this;
            var ctx = this._getInitContext();
            if (ctx) {
                var visibleRect_1 = this._getVisibleRect();
                var rowCount_1 = this[_$1].rowCount;
                var initRow = _getTargetRowAt.call(this, Math.max(visibleRect_1.top, drawRect.top)) || {
                    row: rowCount_1,
                    top: _getRowsHeight.call(this, 0, rowCount_1 - 1),
                };
                var initCol = _getTargetColAt.call(this, Math.max(visibleRect_1.left, drawRect.left)) || {
                    col: this[_$1].colCount,
                    left: this._getColsWidth(0, this[_$1].colCount - 1),
                };
                var drawBottom = Math.min(visibleRect_1.bottom, drawRect.bottom);
                var drawRight = Math.min(visibleRect_1.right, drawRect.right);
                var initFrozenRow = _getTargetFrozenRowAt.call(this, Math.max(visibleRect_1.top, drawRect.top));
                var initFrozenCol = _getTargetFrozenColAt.call(this, Math.max(visibleRect_1.left, drawRect.left));
                var drawLayers = new DrawLayers();
                var drawGridBorder = function () {
                    var isContent = _this.borderMode === 'content-border';
                    var isGrid = _this.borderMode === 'grid-border';
                    if (isGrid || isContent) {
                        var width = _this[_$1].canvas.width;
                        var height = _this[_$1].canvas.height;
                        if (isContent) {
                            var w = _this._getColsWidth(0, _this[_$1].colCount - 1) - visibleRect_1.left;
                            var h = _getRowsHeight.call(_this, 0, rowCount_1 - 1) - visibleRect_1.top;
                            width = Math.min(_this[_$1].canvas.width, w);
                            height = Math.min(_this[_$1].canvas.height, h);
                        }
                        ctx.save();
                        try {
                            ctx.beginPath();
                            ctx.lineWidth = _this.borderWidth || 0;
                            ctx.strokeStyle = _this.borderColor || 'transparent';
                            ctx.rect(0 + ctx.lineWidth / 2, 0 + ctx.lineWidth / 2, width - ctx.lineWidth, height - ctx.lineWidth);
                            ctx.stroke();
                        }
                        finally {
                            ctx.restore();
                        }
                    }
                };
                var drawOuter = function (row, absoluteTop) {
                    // 在数据范围之外绘制
                    if (row >= rowCount_1 - 1 &&
                        _this[_$1].canvas.height > absoluteTop - visibleRect_1.top) {
                        var outerTop = absoluteTop - visibleRect_1.top;
                        if (_this.underlayBackgroundColor === 'transparent') {
                            ctx.clearRect(0, outerTop, _this[_$1].canvas.width, _this[_$1].canvas.height - outerTop);
                        }
                        else {
                            ctx.save();
                            ctx.beginPath();
                            ctx.fillStyle = _this.underlayBackgroundColor || '#F6F6F6';
                            ctx.rect(0, outerTop, _this[_$1].canvas.width, _this[_$1].canvas.height - outerTop);
                            ctx.fill();
                            ctx.restore();
                        }
                    }
                };
                var skipAbsoluteTop = 0;
                if (initFrozenRow) {
                    var absoluteTop = initFrozenRow.top;
                    var count = this[_$1].frozenRowCount;
                    for (var row = initFrozenRow.row; row < count; row++) {
                        var height = _getRowHeight.call(this, row);
                        _drawRow.call(this, ctx, initFrozenCol, initCol, drawRight, row, absoluteTop, height, visibleRect_1, 0, drawLayers);
                        absoluteTop += height;
                        if (drawBottom <= absoluteTop) {
                            // 在绘制范围之外（结束）
                            drawOuter(row, absoluteTop);
                            drawGridBorder();
                            drawLayers.draw(ctx);
                            return;
                        }
                    }
                    skipAbsoluteTop = absoluteTop;
                }
                var rowAbsoluteTop = initRow.top;
                for (var row = initRow.row; row < rowCount_1; row++) {
                    var height = _getRowHeight.call(this, row);
                    // 绘制行
                    _drawRow.call(this, ctx, initFrozenCol, initCol, drawRight, row, rowAbsoluteTop, height, visibleRect_1, skipAbsoluteTop, drawLayers);
                    rowAbsoluteTop += height;
                    if (drawBottom <= rowAbsoluteTop) {
                        // 在绘制范围之外（结束）
                        drawOuter(row, rowAbsoluteTop);
                        drawGridBorder();
                        drawLayers.draw(ctx);
                        return;
                    }
                }
                drawOuter(rowCount_1 - 1, rowAbsoluteTop);
                drawGridBorder();
                drawLayers.draw(ctx);
            }
        };
        DrawGrid.prototype._getInitContext = function () {
            var ctx = this[_$1].context;
            if (ctx) {
                // 初始化
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.lineWidth = 1;
                ctx.font = this.font || '16px sans-serif';
            }
            return ctx;
        };
        DrawGrid.prototype._toRelativeRect = function (absoluteRect) {
            var rect = absoluteRect.copy();
            var visibleRect = this._getVisibleRect();
            rect.offsetLeft(-visibleRect.left);
            rect.offsetTop(-visibleRect.top);
            return rect;
        };
        /**
         * Overwrites the definition of a column whose width is set to `auto` with the current auto width formula.
         * @param grid - grid instance
         * @returns
         */
        DrawGrid.prototype._storeAutoColWidthExprs = function () {
            var expr = null;
            for (var col = 0; col < this[_$1].colCount; col++) {
                var def = _getColWidthDefine.call(this, col);
                if (isAutoDefine(def)) {
                    _setColWidth.call(this, col, expr || (expr = _calcAutoColWidthExpr.call(this)));
                }
            }
        };
        DrawGrid.prototype.resize = function () {
            if (this.getElement().offsetParent) {
                // 只在元素可见时刷新
                this.updateSize();
                this.updateScroll();
                this.invalidate();
            }
        };
        /**
         * Get the value of cell with the copy action.
         * <p>
         * Please implement
         * </p>
         *
         * @param col - Column index of cell.
         * @param row - Row index of cell.
         * @returns the value of cell
         */
        DrawGrid.prototype.getCopyCellValue = function (_col, _row, _range) {
            // Please implement get cell value!!
        };
        DrawGrid.prototype.bindEventsInternal = function () {
            // nothing
        };
        DrawGrid.prototype.getTargetRowAtInternal = function (_absoluteY) {
            // 忽略继承的设置继承和实现的计算
        };
        DrawGrid.prototype.getRowsHeightInternal = function (_startRow, _endRow) {
            // 忽略继承的设置继承和实现的计算
        };
        DrawGrid.prototype.getRowHeightInternal = function (_row) {
            // 忽略继承的设置继承和实现的计算
        };
        DrawGrid.prototype.getScrollHeightInternal = function (_row) {
            // 忽略继承的设置继承和实现的计算
        };
        DrawGrid.prototype.getMoveLeftColByKeyDownInternal = function (_a) {
            var col = _a.col;
            return col - 1;
        };
        DrawGrid.prototype.getMoveRightColByKeyDownInternal = function (_a) {
            var col = _a.col;
            return col + 1;
        };
        DrawGrid.prototype.getMoveUpRowByKeyDownInternal = function (_a) {
            var row = _a.row;
            return row - 1;
        };
        DrawGrid.prototype.getMoveDownRowByKeyDownInternal = function (_a) {
            var row = _a.row;
            return row + 1;
        };
        DrawGrid.prototype.getOffsetInvalidateCells = function () {
            return 0;
        };
        DrawGrid.prototype.getCopyRangeInternal = function (range) {
            return range;
        };
        DrawGrid.prototype.getAttachCellsAreaInternal = function (range) {
            return this._toRelativeRect(this.getCellRangeRect(range));
        };
        DrawGrid.prototype.getAttachCellsPaddingInternal = function (_range) {
            return [0, 3, 0, 3];
        };
        DrawGrid.prototype.getFocusRectInternal = function (col, row) {
            return this.getCellRect(col, row);
        };
        DrawGrid.prototype.getDefaultRowHeight = function () {
            return 40;
        };
        DrawGrid.prototype.getDefaultColWidth = function () {
            return 80;
        };
        DrawGrid.prototype.getHighlightBorderWidth = function () {
            return 2;
        };
        DrawGrid.prototype.updateSelectionRange = function (range) {
            return range;
        };
        DrawGrid.prototype.getCellOverflowTextInternal = function (_cell) {
            return '';
        };
        DrawGrid.prototype.getCellOverflowTypeInternal = function (_cell) {
            return '';
        };
        DrawGrid.prototype.getDefaultBorderMode = function () {
            return 'none';
        };
        DrawGrid.prototype.fireListeners = function (type) {
            var event = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                event[_i - 1] = arguments[_i];
            }
            return _super.prototype.fireListeners.apply(this, __spreadArrays([type], event));
        };
        return DrawGrid;
    }(EventTarget));

    /**
     * core modules
     */
    var core = { DrawGrid: DrawGrid, EVENT_TYPE: DG_EVENT_TYPE };

    function _setFieldCache(fCache, index, field, value) {
        var recCache = fCache[index] || (fCache[index] = new Map());
        recCache.set(field, value);
    }
    /**
     * grid data source for caching Promise data
     */
    var CachedDataSource = /** @class */ (function (_super) {
        __extends(CachedDataSource, _super);
        function CachedDataSource(opt) {
            var _this = _super.call(this, opt) || this;
            _this._rCache = {};
            _this._fCache = {};
            return _this;
        }
        Object.defineProperty(CachedDataSource, "EVENT_TYPE", {
            get: function () {
                return DataSource.EVENT_TYPE;
            },
            enumerable: false,
            configurable: true
        });
        CachedDataSource.ofArray = function (array) {
            return new CachedDataSource({
                get: function (index) { return array[index]; },
                length: array.length,
                source: array,
            });
        };
        CachedDataSource.prototype.getOriginal = function (index) {
            if (this._rCache && this._rCache[index]) {
                return this._rCache[index];
            }
            return _super.prototype.getOriginal.call(this, index);
        };
        CachedDataSource.prototype.getOriginalField = function (index, field) {
            var rowCache = this._fCache && this._fCache[index];
            if (rowCache) {
                var cache = rowCache.get(field);
                if (cache) {
                    return cache;
                }
            }
            return _super.prototype.getOriginalField.call(this, index, field);
        };
        CachedDataSource.prototype.setOriginalField = function (index, field, value) {
            var fCache = this._fCache;
            if (fCache && fCache[index]) {
                delete fCache[index]; // clear row cache
            }
            return _super.prototype.setOriginalField.call(this, index, field, value);
        };
        CachedDataSource.prototype.clearCache = function () {
            if (this._rCache) {
                this._rCache = {};
            }
            if (this._fCache) {
                this._fCache = {};
            }
        };
        CachedDataSource.prototype.fieldPromiseCallBackInternal = function (index, field, value) {
            _setFieldCache(this._fCache, index, field, value);
        };
        CachedDataSource.prototype.recordPromiseCallBackInternal = function (index, record) {
            this._rCache[index] = record;
        };
        CachedDataSource.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return CachedDataSource;
    }(DataSource));

    var DataSourceIterator = /** @class */ (function () {
        function DataSourceIterator(dataSource) {
            this._dataSource = dataSource;
            this._curIndex = -1;
            this._data = [];
        }
        DataSourceIterator.prototype.hasNext = function () {
            var next = this._curIndex + 1;
            return this._dataSource.length > next;
        };
        DataSourceIterator.prototype.next = function () {
            var next = this._curIndex + 1;
            var data = this._getIndexData(next);
            this._curIndex = next;
            return data;
        };
        DataSourceIterator.prototype.movePrev = function () {
            this._curIndex--;
        };
        DataSourceIterator.prototype._getIndexData = function (index, nest) {
            var dataSource = this._dataSource;
            var data = this._data;
            if (index < data.length) {
                return data[index];
            }
            if (dataSource.length <= index) {
                return undefined;
            }
            var record = this._dataSource.get(index);
            data[index] = record;
            if (isPromise(record)) {
                record.then(function (val) {
                    data[index] = val;
                });
                if (!nest) {
                    for (var i = 1; i <= 100; i++) {
                        this._getIndexData(index + i, true);
                    }
                }
            }
            return record;
        };
        return DataSourceIterator;
    }());

    var FilterData = /** @class */ (function () {
        function FilterData(dc, original, filter) {
            this._cancel = false;
            this._owner = dc;
            this._dataSourceItr = new DataSourceIterator(original);
            this._filter = filter;
            this._filteredList = [];
            this._queues = [];
        }
        Object.defineProperty(FilterData.prototype, "filter", {
            get: function () {
                return this._filter;
            },
            enumerable: false,
            configurable: true
        });
        FilterData.prototype.get = function (index) {
            if (this._cancel) {
                return undefined;
            }
            var filteredList = this._filteredList;
            if (index < filteredList.length) {
                return filteredList[index];
            }
            var queues = this._queues;
            var indexQueue = queues[index];
            if (indexQueue) {
                return indexQueue;
            }
            return queues[index] || this._findIndex(index);
        };
        FilterData.prototype.cancel = function () {
            this._cancel = true;
        };
        FilterData.prototype._findIndex = function (index) {
            if (window.Promise) {
                var timeout_1 = Date.now() + 100;
                var count_1 = 0;
                return this._findIndexWithTimeout(index, function () {
                    count_1++;
                    if (count_1 >= 100) {
                        count_1 = 0;
                        return timeout_1 < Date.now();
                    }
                    return false;
                });
            }
            return this._findIndexWithTimeout(index, function () { return false; });
        };
        FilterData.prototype._findIndexWithTimeout = function (index, testTimeout) {
            var _this = this;
            var filteredList = this._filteredList;
            var filter = this._filter;
            var dataSourceItr = this._dataSourceItr;
            var queues = this._queues;
            while (dataSourceItr.hasNext()) {
                if (this._cancel) {
                    return undefined;
                }
                var record = dataSourceItr.next();
                if (isPromise(record)) {
                    dataSourceItr.movePrev();
                    return (queues[index] = record.then(function (value) {
                        queues[index] = null;
                        return _this.get(index);
                    }));
                }
                if (filter(record)) {
                    filteredList.push(record);
                    if (index < filteredList.length) {
                        return filteredList[index];
                    }
                }
                if (testTimeout()) {
                    var promise = new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve(undefined);
                        }, 300);
                    });
                    var queue = promise.then(function () {
                        queues[index] = null;
                        return _this.get(index);
                    });
                    queues[index] = queue;
                    return queue;
                }
            }
            var dc = this._owner;
            dc.length = filteredList.length;
            return undefined;
        };
        return FilterData;
    }());

    /**
     * grid data source for filter
     */
    var FilterDataSource = /** @class */ (function (_super) {
        __extends(FilterDataSource, _super);
        function FilterDataSource(dataSource, filter) {
            var _this = _super.call(this, dataSource) || this;
            _this._filterData = null;
            _this._dataSource = dataSource;
            _this.filter = filter;
            var handler = (_this._handler = new EventHandler());
            handler.on(dataSource, FilterDataSource.EVENT_TYPE.UPDATED_ORDER, function () {
                // reset
                _this.filter = _this.filter;
            });
            var _loop_1 = function (k) {
                if (FilterDataSource.EVENT_TYPE.hasOwnProperty(k)) {
                    var type_1 = FilterDataSource.EVENT_TYPE[k];
                    handler.on(dataSource, type_1, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return _this.fireListeners.apply(_this, __spreadArrays([type_1], args));
                    });
                }
            };
            for (var k in FilterDataSource.EVENT_TYPE) {
                _loop_1(k);
            }
            return _this;
        }
        Object.defineProperty(FilterDataSource, "EVENT_TYPE", {
            get: function () {
                return DataSource.EVENT_TYPE;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FilterDataSource.prototype, "filter", {
            get: function () {
                var _a;
                return ((_a = this._filterData) === null || _a === void 0 ? void 0 : _a.filter) || null;
            },
            set: function (filter) {
                if (this._filterData) {
                    this._filterData.cancel();
                }
                this._filterData = filter
                    ? new FilterData(this, this._dataSource, filter)
                    : null;
                this.setLength(this._dataSource.length);
            },
            enumerable: false,
            configurable: true
        });
        FilterDataSource.prototype.getOriginal = function (index) {
            if (!this._filterData) {
                return _super.prototype.getOriginal.call(this, index);
            }
            return this._filterData.get(index);
        };
        FilterDataSource.prototype.sort = function (field, order) {
            return this._dataSource.sort(field, order);
        };
        Object.defineProperty(FilterDataSource.prototype, "source", {
            get: function () {
                return this._dataSource.source;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FilterDataSource.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            enumerable: false,
            configurable: true
        });
        FilterDataSource.prototype.dispose = function () {
            this._handler.dispose();
            _super.prototype.dispose.call(this);
        };
        FilterDataSource.prototype.refreshInternal = function () {
            this.filter = this.filter;
        };
        return FilterDataSource;
    }(DataSource));

    var aggregateType;
    (function (aggregateType) {
        aggregateType[aggregateType["count"] = 0] = "count";
        aggregateType[aggregateType["sum"] = 1] = "sum";
        aggregateType[aggregateType["avg"] = 2] = "avg";
        aggregateType[aggregateType["max"] = 3] = "max";
        aggregateType[aggregateType["min"] = 4] = "min";
    })(aggregateType || (aggregateType = {}));
    function _getPivotRecordKey(record, pivots, distinctKeys) {
        var keys = [];
        for (var _i = 0, pivots_1 = pivots; _i < pivots_1.length; _i++) {
            var i = pivots_1[_i];
            var field = i.field;
            var value = JSON.stringify(record[i.field]) || '';
            distinctKeys[field] = distinctKeys[field] || {};
            distinctKeys[field][value] = true;
            keys.push(value);
        }
        return keys.join('_');
    }
    /**
     * grid data source for pivot
     */
    var PivotDataSource = /** @class */ (function (_super) {
        __extends(PivotDataSource, _super);
        function PivotDataSource(dataSource, options) {
            var _this = _super.call(this, dataSource) || this;
            _this._records = [];
            _this._keysMap = {};
            _this._distinctMap = {};
            _this._dataSource = dataSource;
            _this._options = options;
            _this.refresh();
            return _this;
        }
        Object.defineProperty(PivotDataSource, "EVENT_TYPE", {
            get: function () {
                return DataSource.EVENT_TYPE;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PivotDataSource.prototype, "options", {
            get: function () {
                return this._options;
            },
            enumerable: false,
            configurable: true
        });
        PivotDataSource.prototype.getOriginal = function (index) {
            return this._records[index];
        };
        PivotDataSource.prototype.refresh = function () {
            this._keysMap = {};
            var distinctKeys = {};
            var rowPivots = this._options.rowPivots || [];
            var colPivots = this._options.colPivots || [];
            var begin = new Date();
            for (var i = 0; i < this._dataSource.length; i++) {
                var record = this._dataSource.get(i);
                var rowKey = _getPivotRecordKey(record, rowPivots, distinctKeys);
                var colKey = _getPivotRecordKey(record, colPivots, distinctKeys);
                this._keysMap[rowKey] = this._keysMap[rowKey] || {};
                this._keysMap[rowKey][colKey] = this._keysMap[rowKey][colKey] || [];
                this._keysMap[rowKey][colKey].push(record);
            }
            this._distinctMap = {};
            for (var field in distinctKeys) {
                if (distinctKeys.hasOwnProperty(field)) {
                    this._distinctMap[field] = [];
                    var keys = distinctKeys[field];
                    for (var key in keys) {
                        if (keys.hasOwnProperty(key)) {
                            this._distinctMap[field].push(key);
                        }
                    }
                }
            }
            var end = new Date();
            var s = Number(end) - Number(begin);
            // TODO: data.ts PivotDataSource.ts
            window.console.log(s);
            this._records = []; // 显示记录列表
            this.length = this._records.length;
        };
        return PivotDataSource;
    }(DataSource));

    /**
     * data modules
     */
    var data = {
        CachedDataSource: CachedDataSource,
        DataSource: DataSource,
        FilterDataSource: FilterDataSource,
        PivotDataSource: PivotDataSource,
        TreeDataSource: TreeDataSource,
    };

    var BaseAction$1 = /** @class */ (function () {
        function BaseAction(option) {
            if (option === void 0) { option = {}; }
            this._disabled = option.disabled || false;
        }
        Object.defineProperty(BaseAction.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                if (this._disabled !== disabled) {
                    this._disabled = disabled;
                    this.onChangeDisabledInternal();
                }
            },
            enumerable: false,
            configurable: true
        });
        BaseAction.prototype.clone = function () {
            return new BaseAction(this);
        };
        BaseAction.prototype.bindGridEvent = function (_grid, _cellId) {
            return [];
        };
        BaseAction.prototype.onChangeDisabledInternal = function () {
            // nothing
        };
        return BaseAction;
    }());

    function bindCellClickAction$1(grid, cellId, _a) {
        var action = _a.action, mouseOver = _a.mouseOver, mouseOut = _a.mouseOut;
        function isTarget(col, row) {
            return grid.getLayoutCellId(col, row) === cellId;
        }
        var inMouse;
        return [
            // click
            grid.listen(DG_EVENT_TYPE.CLICK_CELL, function (e) {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                action({
                    col: e.col,
                    row: e.row,
                });
            }),
            // mouse move
            grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, function (e) {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                if (mouseOver) {
                    if (!mouseOver({
                        col: e.col,
                        row: e.row,
                    })) {
                        return;
                    }
                }
                grid.getElement().style.cursor = 'pointer';
                inMouse = true;
            }),
            // 当MOUSEENTER从侧面看，因为它与'col-resize'的处理冲突，移动被监视和处理
            grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, function (e) {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                if (inMouse && !grid.getElement().style.cursor) {
                    grid.getElement().style.cursor = 'pointer';
                }
            }),
            grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, function (e) {
                if (!isTarget(e.col, e.row)) {
                    return;
                }
                if (mouseOut) {
                    mouseOut({
                        col: e.col,
                        row: e.row,
                    });
                }
                grid.getElement().style.cursor = '';
                inMouse = false;
            }),
        ];
    }
    function bindCellKeyAction$1(grid, cellId, _a) {
        var action = _a.action, _b = _a.acceptKeys, acceptKeys = _b === void 0 ? [] : _b;
        acceptKeys = __spreadArrays(acceptKeys, [KEY_ENTER, KEY_SPACE]);
        function isTarget(col, row) {
            return grid.getLayoutCellId(col, row) === cellId;
        }
        return [
            // enter key down
            grid.listen(DG_EVENT_TYPE.KEYDOWN, function (e) {
                var _a;
                if (acceptKeys.indexOf(e.keyCode) === -1) {
                    return;
                }
                if (((_a = grid.keyboardOptions) === null || _a === void 0 ? void 0 : _a.moveCellOnEnter) && e.keyCode === KEY_ENTER) {
                    // When moving with the enter key, no action is taken with the enter key.
                    return;
                }
                var sel = grid.selection.select;
                if (!isTarget(sel.col, sel.row)) {
                    return;
                }
                action({
                    col: sel.col,
                    row: sel.row,
                });
                event.cancel(e.event);
            }),
        ];
    }

    var isHeaderDisabledCell = function (option, grid, cell) {
        if (typeof option === 'function') {
            return !!option(grid, cell);
        }
        return !!option;
    };

    var BaseCheckAction = /** @class */ (function (_super) {
        __extends(BaseCheckAction, _super);
        function BaseCheckAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseCheckAction.prototype.bindGridEvent = function (grid, cellId) {
            var _this = this;
            var state = this.getState(grid);
            var action = function (_a) {
                var col = _a.col, row = _a.row;
                var range = grid.getCellRange(col, row);
                var cellKey = range.start.col + ":" + range.start.row;
                if (isHeaderDisabledCell(_this.disabled, grid, {
                    col: range.start.col,
                    row: range.start.row,
                }) ||
                    state.block[cellKey]) {
                    return;
                }
                var checked = grid.getHeaderValue(range.start.col, range.start.row);
                grid.setHeaderValue(range.start.col, range.start.row, !checked);
                var onChange = function () {
                    // checkbox animation
                    animate(200, function (point) {
                        if (point === 1) {
                            delete state.elapsed[cellKey];
                        }
                        else {
                            state.elapsed[cellKey] = point;
                        }
                        grid.invalidateCellRange(range);
                    });
                };
                onChange();
            };
            return __spreadArrays(bindCellClickAction$1(grid, cellId, {
                action: action,
                mouseOver: function (e) {
                    var range = grid.getCellRange(e.col, e.row);
                    if (isHeaderDisabledCell(_this.disabled, grid, {
                        col: range.start.col,
                        row: range.start.row,
                    })) {
                        return false;
                    }
                    state.mouseActiveCell = {
                        col: e.col,
                        row: e.row,
                    };
                    grid.invalidateCellRange(range);
                    return true;
                },
                mouseOut: function (e) {
                    delete state.mouseActiveCell;
                    var range = grid.getCellRange(e.col, e.row);
                    grid.invalidateCellRange(range);
                },
            }), bindCellKeyAction$1(grid, cellId, {
                action: action,
                acceptKeys: [KEY_ENTER, KEY_SPACE],
            }));
        };
        return BaseCheckAction;
    }(BaseAction$1));

    var CHECK_HEADER_STATE_ID = getCheckHeaderStateId();
    var CheckHeaderAction = /** @class */ (function (_super) {
        __extends(CheckHeaderAction, _super);
        function CheckHeaderAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CheckHeaderAction.prototype.clone = function () {
            return new CheckHeaderAction(this);
        };
        CheckHeaderAction.prototype.getState = function (grid) {
            var state = grid[CHECK_HEADER_STATE_ID];
            if (!state) {
                state = { elapsed: {}, block: {} };
                obj.setReadonly(grid, CHECK_HEADER_STATE_ID, state);
            }
            return state;
        };
        return CheckHeaderAction;
    }(BaseCheckAction));

    var SWITCH_HEADER_STATE_ID = getSwitchHeaderStateId();
    var SwitchHeaderAction = /** @class */ (function (_super) {
        __extends(SwitchHeaderAction, _super);
        function SwitchHeaderAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SwitchHeaderAction.prototype.clone = function () {
            return new SwitchHeaderAction(this);
        };
        SwitchHeaderAction.prototype.getState = function (grid) {
            var state = grid[SWITCH_HEADER_STATE_ID];
            if (!state) {
                state = { elapsed: {}, block: {} };
                obj.setReadonly(grid, SWITCH_HEADER_STATE_ID, state);
            }
            return state;
        };
        return SwitchHeaderAction;
    }(BaseCheckAction));

    var SortHeaderAction = /** @class */ (function (_super) {
        __extends(SortHeaderAction, _super);
        function SortHeaderAction(option) {
            if (option === void 0) { option = {}; }
            var _a;
            var _this = _super.call(this, option) || this;
            _this._sort = (_a = option.sort) !== null && _a !== void 0 ? _a : true;
            return _this;
        }
        Object.defineProperty(SortHeaderAction.prototype, "sort", {
            get: function () {
                return this._sort;
            },
            set: function (sort) {
                this._sort = sort;
                this.onChangeDisabledInternal();
            },
            enumerable: false,
            configurable: true
        });
        SortHeaderAction.prototype.clone = function () {
            return new SortHeaderAction(this);
        };
        SortHeaderAction.prototype._executeSort = function (newState, grid) {
            if (typeof this._sort === 'function') {
                this._sort({
                    order: newState.order || 'asc',
                    col: newState.col,
                    row: newState.row,
                    grid: grid,
                });
            }
            else {
                var fieldRow = Math.min(grid.recordRowCount - 1, newState.row) + grid.frozenRowCount;
                var field = grid.getField(newState.col, fieldRow);
                if (field == null) {
                    return;
                }
                grid.dataSource.sort(field, newState.order || 'asc');
            }
        };
        SortHeaderAction.prototype.bindGridEvent = function (grid, cellId) {
            var _this = this;
            function isTarget(col, row) {
                return grid.getLayoutCellId(col, row) === cellId;
            }
            var action = function (cell) {
                if (isHeaderDisabledCell(_this.disabled, grid, cell)) {
                    return;
                }
                var state = grid.sortState;
                var newState;
                var range = grid.getCellRange(cell.col, cell.row);
                if (isTarget(state.col, cell.row)) {
                    newState = {
                        col: range.start.col,
                        order: state.order === 'asc' ? 'desc' : 'asc',
                        row: range.start.row,
                    };
                }
                else {
                    newState = {
                        col: range.start.col,
                        order: 'asc',
                        row: range.start.row,
                    };
                }
                grid.sortState = newState;
                _this._executeSort(newState, grid);
                grid.invalidateGridRect(0, 0, grid.colCount - 1, grid.rowCount - 1);
            };
            return __spreadArrays(bindCellClickAction$1(grid, cellId, {
                action: action,
                mouseOver: function (e) {
                    if (isHeaderDisabledCell(_this.disabled, grid, e)) {
                        return false;
                    }
                    return true;
                },
            }));
        };
        return SortHeaderAction;
    }(BaseAction$1));

    var ImmutableCheckHeaderAction = /** @class */ (function (_super) {
        __extends(ImmutableCheckHeaderAction, _super);
        function ImmutableCheckHeaderAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ImmutableCheckHeaderAction.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            enumerable: false,
            configurable: true
        });
        return ImmutableCheckHeaderAction;
    }(CheckHeaderAction));

    var ImmutableSortHeaderAction = /** @class */ (function (_super) {
        __extends(ImmutableSortHeaderAction, _super);
        function ImmutableSortHeaderAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ImmutableSortHeaderAction.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            enumerable: false,
            configurable: true
        });
        return ImmutableSortHeaderAction;
    }(SortHeaderAction));

    var ImmutableSwitchHeaderAction = /** @class */ (function (_super) {
        __extends(ImmutableSwitchHeaderAction, _super);
        function ImmutableSwitchHeaderAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ImmutableSwitchHeaderAction.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            enumerable: false,
            configurable: true
        });
        return ImmutableSwitchHeaderAction;
    }(SwitchHeaderAction));

    var ACTIONS$1 = {
        SORT: new ImmutableSortHeaderAction(),
        CHECK: new ImmutableCheckHeaderAction(),
        SWITCH: new ImmutableSwitchHeaderAction(),
    };
    function of$3(headerAction) {
        if (!headerAction) {
            return undefined;
        }
        else if (typeof headerAction === 'string') {
            var key = headerAction.toUpperCase();
            return ACTIONS$1[key] || of$3(null);
        }
        else {
            return headerAction;
        }
    }
    function ofCell(headerCell) {
        if (headerCell.sort) {
            if (typeof headerCell.sort === 'function') {
                var sortMethod_1 = headerCell.sort;
                // 0.9.0 Backward compatibility
                var sort = function (_a) {
                    var order = _a.order, col = _a.col, grid = _a.grid;
                    return sortMethod_1.call(headerCell, order, col, grid);
                };
                return new ImmutableSortHeaderAction({ sort: sort });
            }
            return ACTIONS$1.SORT;
        }
        return of$3(headerCell.headerAction);
    }

    var HEADER_BASE_STYLE_EVENT_TYPE = {
        CHANGE_STYLE: 'change_style',
    };
    var defaultHeaderBaseStyle;
    var BaseStyle$1 = /** @class */ (function (_super) {
        __extends(BaseStyle, _super);
        function BaseStyle(_a) {
            var _b = _a === void 0 ? {} : _a, bgColor = _b.bgColor;
            var _this = _super.call(this) || this;
            _this._bgColor = bgColor;
            return _this;
        }
        Object.defineProperty(BaseStyle, "EVENT_TYPE", {
            get: function () {
                return HEADER_BASE_STYLE_EVENT_TYPE;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseStyle, "DEFAULT", {
            get: function () {
                return defaultHeaderBaseStyle
                    ? defaultHeaderBaseStyle
                    : (defaultHeaderBaseStyle = new BaseStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseStyle.prototype, "bgColor", {
            get: function () {
                return this._bgColor;
            },
            set: function (bgColor) {
                this._bgColor = bgColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        BaseStyle.prototype.doChangeStyle = function () {
            this.fireListeners(HEADER_BASE_STYLE_EVENT_TYPE.CHANGE_STYLE);
        };
        BaseStyle.prototype.clone = function () {
            return new BaseStyle(this);
        };
        return BaseStyle;
    }(EventTarget));

    var defaultHeaderBaseStdStyle;
    var BaseStdStyle$1 = /** @class */ (function (_super) {
        __extends(BaseStdStyle, _super);
        function BaseStdStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, style) || this;
            _this._textAlign = style.textAlign || 'left';
            _this._textBaseline = style.textBaseline || 'middle';
            return _this;
        }
        Object.defineProperty(BaseStdStyle, "DEFAULT", {
            get: function () {
                return defaultHeaderBaseStdStyle
                    ? defaultHeaderBaseStdStyle
                    : (defaultHeaderBaseStdStyle = new BaseStdStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseStdStyle.prototype, "textAlign", {
            get: function () {
                return this._textAlign;
            },
            set: function (textAlign) {
                this._textAlign = textAlign;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseStdStyle.prototype, "textBaseline", {
            get: function () {
                return this._textBaseline;
            },
            set: function (textBaseline) {
                this._textBaseline = textBaseline;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        BaseStdStyle.prototype.clone = function () {
            return new BaseStdStyle(this);
        };
        return BaseStdStyle;
    }(BaseStyle$1));

    var defaultHeaderStyle;
    var Style$1 = /** @class */ (function (_super) {
        __extends(Style, _super);
        function Style(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, style) || this;
            _this._color = style.color;
            _this._font = style.font;
            _this._padding = style.padding;
            _this._textOverflow = style.textOverflow || 'ellipsis';
            _this._lineHeight = style.lineHeight || '1em';
            _this._autoWrapText = style.autoWrapText || false;
            _this._lineClamp = style.lineClamp || 'auto';
            return _this;
        }
        Object.defineProperty(Style, "DEFAULT", {
            get: function () {
                return defaultHeaderStyle
                    ? defaultHeaderStyle
                    : (defaultHeaderStyle = new Style());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (color) {
                this._color = color;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "font", {
            get: function () {
                return this._font;
            },
            set: function (font) {
                this._font = font;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "padding", {
            get: function () {
                return this._padding;
            },
            set: function (padding) {
                this._padding = padding;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "textOverflow", {
            get: function () {
                return this._textOverflow;
            },
            set: function (textOverflow) {
                this._textOverflow = textOverflow;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "lineHeight", {
            get: function () {
                return this._lineHeight;
            },
            set: function (lineHeight) {
                this._lineHeight = lineHeight;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "lineClamp", {
            get: function () {
                return this._lineClamp;
            },
            set: function (lineClamp) {
                this._lineClamp = lineClamp;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Style.prototype, "autoWrapText", {
            get: function () {
                return this._autoWrapText;
            },
            set: function (autoWrapText) {
                this._autoWrapText = autoWrapText;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Style.prototype.clone = function () {
            return new Style(this);
        };
        return Style;
    }(BaseStdStyle$1));

    var defaultHeaderBaseCheckStyle;
    var BaseCheckStyle$1 = /** @class */ (function (_super) {
        __extends(BaseCheckStyle, _super);
        function BaseCheckStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, defaults(style, { textAlign: 'center' })) || this;
            _this._uncheckBgColor = style.uncheckBgColor;
            _this._checkBgColor = style.checkBgColor;
            _this._borderColor = style.borderColor;
            return _this;
        }
        Object.defineProperty(BaseCheckStyle, "DEFAULT", {
            get: function () {
                return defaultHeaderBaseCheckStyle
                    ? defaultHeaderBaseCheckStyle
                    : (defaultHeaderBaseCheckStyle = new BaseCheckStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseCheckStyle.prototype, "uncheckBgColor", {
            get: function () {
                return this._uncheckBgColor;
            },
            set: function (uncheckBgColor) {
                this._uncheckBgColor = uncheckBgColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseCheckStyle.prototype, "checkBgColor", {
            get: function () {
                return this._checkBgColor;
            },
            set: function (checkBgColor) {
                this._checkBgColor = checkBgColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseCheckStyle.prototype, "borderColor", {
            get: function () {
                return this._borderColor;
            },
            set: function (borderColor) {
                this._borderColor = borderColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        BaseCheckStyle.prototype.clone = function () {
            return new BaseCheckStyle(this);
        };
        return BaseCheckStyle;
    }(Style$1));

    var defaultCheckHeaderStyle;
    var CheckHeaderStyle = /** @class */ (function (_super) {
        __extends(CheckHeaderStyle, _super);
        function CheckHeaderStyle(style) {
            if (style === void 0) { style = {}; }
            return _super.call(this, style) || this;
        }
        Object.defineProperty(CheckHeaderStyle, "DEFAULT", {
            get: function () {
                return defaultCheckHeaderStyle
                    ? defaultCheckHeaderStyle
                    : (defaultCheckHeaderStyle = new CheckHeaderStyle());
            },
            enumerable: false,
            configurable: true
        });
        CheckHeaderStyle.prototype.clone = function () {
            return new CheckHeaderStyle(this);
        };
        return CheckHeaderStyle;
    }(BaseCheckStyle$1));

    var defaultSortHeaderStyle;
    var SortHeaderStyle = /** @class */ (function (_super) {
        __extends(SortHeaderStyle, _super);
        function SortHeaderStyle(style) {
            if (style === void 0) { style = {}; }
            var _this = _super.call(this, style) || this;
            _this._sortArrowColor = style.sortArrowColor;
            return _this;
        }
        Object.defineProperty(SortHeaderStyle, "DEFAULT", {
            get: function () {
                return defaultSortHeaderStyle
                    ? defaultSortHeaderStyle
                    : (defaultSortHeaderStyle = new SortHeaderStyle());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SortHeaderStyle.prototype, "sortArrowColor", {
            get: function () {
                return this._sortArrowColor;
            },
            set: function (sortArrowColor) {
                this._sortArrowColor = sortArrowColor;
                this.doChangeStyle();
            },
            enumerable: false,
            configurable: true
        });
        SortHeaderStyle.prototype.clone = function () {
            return new SortHeaderStyle(this);
        };
        return SortHeaderStyle;
    }(Style$1));

    var defaultSwitchHeaderStyle;
    var SwitchHeaderStyle = /** @class */ (function (_super) {
        __extends(SwitchHeaderStyle, _super);
        function SwitchHeaderStyle(style) {
            if (style === void 0) { style = {}; }
            return _super.call(this, style) || this;
        }
        Object.defineProperty(SwitchHeaderStyle, "DEFAULT", {
            get: function () {
                return defaultSwitchHeaderStyle
                    ? defaultSwitchHeaderStyle
                    : (defaultSwitchHeaderStyle = new SwitchHeaderStyle());
            },
            enumerable: false,
            configurable: true
        });
        SwitchHeaderStyle.prototype.clone = function () {
            return new SwitchHeaderStyle(this);
        };
        return SwitchHeaderStyle;
    }(BaseCheckStyle$1));

    var defaultMultilineTextStyle$1;
    var MultilineTextHeaderStyle = /** @class */ (function (_super) {
        __extends(MultilineTextHeaderStyle, _super);
        function MultilineTextHeaderStyle(style) {
            if (style === void 0) { style = {}; }
            return _super.call(this, style) || this;
        }
        Object.defineProperty(MultilineTextHeaderStyle, "DEFAULT", {
            get: function () {
                return defaultMultilineTextStyle$1
                    ? defaultMultilineTextStyle$1
                    : (defaultMultilineTextStyle$1 = new MultilineTextHeaderStyle());
            },
            enumerable: false,
            configurable: true
        });
        MultilineTextHeaderStyle.prototype.clone = function () {
            return new MultilineTextHeaderStyle(this);
        };
        return MultilineTextHeaderStyle;
    }(Style$1));

    function of$4(headerStyle, headerValues, StyleClass) {
        if (headerStyle) {
            if (headerStyle instanceof BaseStyle$1) {
                return headerStyle;
            }
            else if (typeof headerStyle === 'function') {
                return of$4(headerStyle(headerValues), headerValues, StyleClass);
            }
            else if (typeof headerStyle === 'string') {
                if (headerValues && headerStyle in headerValues) {
                    return of$4(headerValues[headerStyle], headerValues, StyleClass);
                }
                else {
                    return new StyleClass({});
                }
            }
            else {
                return new StyleClass(headerStyle);
            }
        }
        else {
            return StyleClass.DEFAULT;
        }
    }

    var BaseHeader = /** @class */ (function () {
        function BaseHeader(_options) {
            this.onDrawCell = this.onDrawCell.bind(this); // 修复范围
        }
        Object.defineProperty(BaseHeader.prototype, "StyleClass", {
            get: function () {
                return BaseStyle$1;
            },
            enumerable: false,
            configurable: true
        });
        BaseHeader.prototype.onDrawCell = function (cellValue, info, context, grid) {
            var style = info.style, drawCellBase = info.drawCellBase;
            var helper = grid.getGridCanvasHelper();
            drawCellBase();
            // 文字
            this.drawInternal(this.convertInternal(cellValue), context, of$4(style, grid.headerValues, this.StyleClass), helper, grid, info);
        };
        BaseHeader.prototype.convertInternal = function (value) {
            if (typeof value === 'function') {
                value = value();
            }
            return isDef(value) ? "" + value : '';
        };
        BaseHeader.prototype.bindGridEvent = function (_grid, _cellId) {
            return [];
        };
        return BaseHeader;
    }());

    var BaseCheckHeader = /** @class */ (function (_super) {
        __extends(BaseCheckHeader, _super);
        function BaseCheckHeader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseCheckHeader.prototype.drawInternal = function (value, context, style, helper, grid, _a) {
            var drawCellBase = _a.drawCellBase;
            var textAlign = style.textAlign, textBaseline = style.textBaseline, borderColor = style.borderColor, checkBgColor = style.checkBgColor, uncheckBgColor = style.uncheckBgColor, bgColor = style.bgColor, color = style.color, font = style.font, textOverflow = style.textOverflow;
            if (bgColor) {
                drawCellBase({
                    bgColor: bgColor,
                });
            }
            var col = context.col, row = context.row;
            var range = grid.getCellRange(col, row);
            var cellKey = range.start.col + ":" + range.start.row;
            var state = this.getState(grid);
            var elapsed = state === null || state === void 0 ? void 0 : state.elapsed[cellKey];
            var checked = grid.getHeaderValue(range.start.col, range.start.row);
            var opt = {
                textAlign: textAlign,
                textBaseline: textBaseline,
                borderColor: borderColor,
                checkBgColor: checkBgColor,
                uncheckBgColor: uncheckBgColor,
            };
            if (isDef(elapsed)) {
                opt.animElapsedTime = elapsed;
            }
            var inlineCheck = this.getInlineCheck(helper, !!checked, context, opt);
            helper.text([inlineCheck, value], context, {
                color: color,
                font: font,
                textAlign: textAlign,
                textBaseline: textBaseline,
                textOverflow: textOverflow,
            });
        };
        return BaseCheckHeader;
    }(BaseHeader));

    var CHECK_HEADER_STATE_ID$1 = getCheckHeaderStateId();
    var CheckHeader = /** @class */ (function (_super) {
        __extends(CheckHeader, _super);
        function CheckHeader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(CheckHeader.prototype, "StyleClass", {
            get: function () {
                return CheckHeaderStyle;
            },
            enumerable: false,
            configurable: true
        });
        CheckHeader.prototype.clone = function () {
            return new CheckHeader(this);
        };
        CheckHeader.prototype.getState = function (grid) {
            var state = grid[CHECK_HEADER_STATE_ID$1];
            if (!state) {
                state = { elapsed: {}, block: {} };
                obj.setReadonly(grid, CHECK_HEADER_STATE_ID$1, state);
            }
            return state;
        };
        CheckHeader.prototype.getInlineCheck = function (helper, checked, context, opt) {
            return helper.buildCheckBoxInline(checked, context, opt);
        };
        return CheckHeader;
    }(BaseCheckHeader));

    var headerUtils = {
        loadIcons: function (icon, context, helper, callback) {
            if (icon) {
                var iconList = icons.toNormarizeArray(icon);
                iconList.forEach(function (i) {
                    helper.testFontLoad(i.font, i.content, context);
                });
                icon = iconList;
            }
            callback(icon, context);
        },
    };

    var Header = /** @class */ (function (_super) {
        __extends(Header, _super);
        function Header() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Header.prototype, "StyleClass", {
            get: function () {
                return Style$1;
            },
            enumerable: false,
            configurable: true
        });
        Header.prototype.drawInternal = function (value, context, style, helper, _grid, _a) {
            var drawCellBase = _a.drawCellBase, getHeaderIcon = _a.getHeaderIcon;
            var textAlign = style.textAlign, textBaseline = style.textBaseline, color = style.color, font = style.font, bgColor = style.bgColor, textOverflow = style.textOverflow, padding = style.padding, lineHeight = style.lineHeight, autoWrapText = style.autoWrapText, lineClamp = style.lineClamp;
            if (bgColor) {
                drawCellBase({
                    bgColor: bgColor,
                });
            }
            var v = isDef(value) ? value + '' : '';
            var multiLines = v
                .replace(/\r?\n/g, '\n')
                .replace(/\r/g, '\n')
                .split('\n');
            helper.testFontLoad(font, value, context);
            headerUtils.loadIcons(getHeaderIcon(), context, helper, function (icons, ctx) {
                if (multiLines.length > 1) {
                    helper.multilineText(multiLines, ctx, {
                        color: color,
                        font: font,
                        icons: icons,
                        textAlign: textAlign,
                        textBaseline: textBaseline,
                        textOverflow: textOverflow,
                        padding: padding,
                        lineHeight: lineHeight,
                        autoWrapText: autoWrapText,
                        lineClamp: lineClamp,
                    });
                }
                else {
                    helper.text(value, ctx, {
                        color: color,
                        font: font,
                        icons: icons,
                        padding: padding,
                        textAlign: textAlign,
                        textBaseline: textBaseline,
                        textOverflow: textOverflow,
                    });
                }
            });
        };
        return Header;
    }(BaseHeader));

    var SortHeader = /** @class */ (function (_super) {
        __extends(SortHeader, _super);
        function SortHeader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SortHeader.prototype, "StyleClass", {
            get: function () {
                return SortHeaderStyle;
            },
            enumerable: false,
            configurable: true
        });
        SortHeader.prototype.drawInternal = function (value, context, style, helper, grid, _a) {
            var drawCellBase = _a.drawCellBase;
            var textAlign = style.textAlign;
            var textBaseline = style.textBaseline || 'middle';
            var color = style.color;
            var bgColor = style.bgColor;
            var padding = style.padding;
            var lineHeight = style.lineHeight;
            var autoWrapText = style.autoWrapText;
            var lineClamp = style.lineClamp;
            var font = style.font;
            var textOverflow = style.textOverflow;
            var sortArrowColor = style.sortArrowColor;
            if (bgColor) {
                drawCellBase({
                    bgColor: bgColor,
                });
            }
            var state = grid.sortState;
            var order = undefined;
            var col = context.col;
            var row = context.row;
            var range = grid.getCellRange(col, row);
            if (cellInRange(range, state.col, state.row)) {
                (order = state.order);
            }
            var ctx = context.getContext();
            var arrowSize = getFontSize(ctx, font).width * 1.2;
            var v = isDef(value) ? value + '' : '';
            var multilines = v
                .replace(/\r?\n/g, '\n')
                .replace(/\r/g, '\n')
                .split('\n');
            var icons = [
                {
                    color: helper.getColor(sortArrowColor || helper.theme.header.sortArrowColor, col, row, ctx) || 'rgba(0, 0, 0, 0.38)',
                    name: isDef(order)
                        ? order === 'asc'
                            ? 'arrowDownward'
                            : 'arrowUpward'
                        : undefined,
                    width: arrowSize,
                },
            ];
            if (multilines.length > 1) {
                helper.multilineText(multilines, context, {
                    autoWrapText: autoWrapText,
                    color: color,
                    font: font,
                    icons: icons,
                    lineClamp: lineClamp,
                    lineHeight: lineHeight,
                    padding: padding,
                    textAlign: textAlign,
                    textBaseline: textBaseline,
                    textOverflow: textOverflow,
                });
            }
            else {
                helper.text(multilines, context, {
                    color: color,
                    font: font,
                    icons: icons,
                    padding: padding,
                    textAlign: textAlign,
                    textBaseline: textBaseline,
                    textOverflow: textOverflow,
                });
            }
        };
        return SortHeader;
    }(BaseHeader));

    var SWITCH_HEADER_STATE_ID$1 = getSwitchHeaderStateId();
    var SwitchHeader = /** @class */ (function (_super) {
        __extends(SwitchHeader, _super);
        function SwitchHeader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SwitchHeader.prototype, "StyleClass", {
            get: function () {
                return SwitchHeaderStyle;
            },
            enumerable: false,
            configurable: true
        });
        SwitchHeader.prototype.clone = function () {
            return new SwitchHeader(this);
        };
        SwitchHeader.prototype.getState = function (grid) {
            var state = grid[SWITCH_HEADER_STATE_ID$1];
            if (!state) {
                state = { elapsed: {}, block: {} };
                obj.setReadonly(grid, SWITCH_HEADER_STATE_ID$1, state);
            }
            return state;
        };
        SwitchHeader.prototype.getInlineCheck = function (helper, checked, context, opt) {
            return helper.buildSwitchBtnInline(checked, context, opt);
        };
        return SwitchHeader;
    }(BaseCheckHeader));

    var MultilineTextHeader = /** @class */ (function (_super) {
        __extends(MultilineTextHeader, _super);
        function MultilineTextHeader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MultilineTextHeader.prototype, "StyleClass", {
            get: function () {
                return MultilineTextHeaderStyle;
            },
            enumerable: false,
            configurable: true
        });
        MultilineTextHeader.prototype.clone = function () {
            return new MultilineTextHeader(this);
        };
        MultilineTextHeader.prototype.drawInternal = function (value, context, style, helper, _grid, _a) {
            var drawCellBase = _a.drawCellBase;
            var textAlign = style.textAlign, textBaseline = style.textBaseline, color = style.color, font = style.font, bgColor = style.bgColor, lineHeight = style.lineHeight, autoWrapText = style.autoWrapText, lineClamp = style.lineClamp, textOverflow = style.textOverflow;
            if (bgColor) {
                drawCellBase({
                    bgColor: bgColor,
                });
            }
            var multilines = value
                .replace(/\r?\n/g, '\n')
                .replace(/\r/g, '\n')
                .split('\n');
            helper.testFontLoad(font, value, context);
            helper.multilineText(multilines, context, {
                textAlign: textAlign,
                textBaseline: textBaseline,
                color: color,
                font: font,
                lineHeight: lineHeight,
                autoWrapText: autoWrapText,
                lineClamp: lineClamp,
                textOverflow: textOverflow,
            });
        };
        return MultilineTextHeader;
    }(BaseHeader));

    var TYPES$1 = {
        DEFAULT: new Header(),
        SORT: new SortHeader(),
        CHECK: new CheckHeader(),
        SWITCH: new SwitchHeader(),
        MULTILINETEXT: new MultilineTextHeader(),
    };
    function of$5(headerType) {
        if (!headerType) {
            return TYPES$1.DEFAULT;
        }
        else if (typeof headerType === 'string') {
            var key = headerType.toUpperCase();
            return TYPES$1[key] || of$5(null);
        }
        else {
            return headerType;
        }
    }
    function ofCell$1(headerCell) {
        if (headerCell.sort) {
            return TYPES$1.SORT;
        }
        return of$5(headerCell.headerType);
    }

    var action$1 = {
        ACTIONS: ACTIONS$1,
        BaseAction: BaseAction$1,
        BaseCheckAction: BaseCheckAction,
        SortHeaderAction: SortHeaderAction,
        CheckHeaderAction: CheckHeaderAction,
        SwitchHeaderAction: SwitchHeaderAction,
        of: of$3,
        ofCell: ofCell,
    };
    var style$3 = {
        BaseStyle: BaseStyle$1,
        BaseStdStyle: BaseStdStyle$1,
        BaseCheckStyle: BaseCheckStyle$1,
        Style: Style$1,
        SortHeaderStyle: SortHeaderStyle,
        CheckHeaderStyle: CheckHeaderStyle,
        SwitchHeaderStyle: SwitchHeaderStyle,
        MultilineTextHeaderStyle: MultilineTextHeaderStyle,
        of: of$4,
    };
    var type$1 = {
        TYPES: TYPES$1,
        BaseHeader: BaseHeader,
        BaseCheckHeader: BaseCheckHeader,
        Header: Header,
        SortHeader: SortHeader,
        CheckHeader: CheckHeader,
        SwitchHeader: SwitchHeader,
        MultilineTextHeader: MultilineTextHeader,
        of: of$5,
        ofCell: ofCell$1,
    };
    /**
     * headers
     */
    var headers = { action: action$1, style: style$3, type: type$1 };

    var themes = {};

    function DEFAULT_BG_COLOR(args) {
        var row = args.row, grid = args.grid;
        if (row < grid.frozenRowCount) {
            return '#FFF';
        }
        var index = grid.getRecordIndexByRow(row);
        if (!(index & 1)) {
            return '#FFF';
        }
        else {
            return '#F6F6F6';
        }
    }
    var cacheLinearGradient = {};
    function getLinearGradient(context, left, top, right, bottom, colorStops) {
        var stopsKey = [];
        for (var stop_1 in colorStops) {
            if (colorStops.hasOwnProperty(stop_1)) {
                stopsKey.push(stop_1 + "@" + colorStops[stop_1]);
            }
        }
        var key = left + "/" + top + "/" + right + "/" + bottom + "/" + stopsKey.join(',');
        var ret = cacheLinearGradient[key];
        if (ret) {
            return ret;
        }
        var grad = context.createLinearGradient(left, top, left, bottom);
        for (var stop_2 in colorStops) {
            if (colorStops.hasOwnProperty(stop_2)) {
                grad.addColorStop(Number(stop_2), colorStops[stop_2]);
            }
        }
        return (cacheLinearGradient[key] = grad);
    }
    function FROZEN_ROWS_BG_COLOR(args) {
        var col = args.col;
        var grid = args.grid;
        var frozenRowCount = args.grid.frozenRowCount;
        var context = args.context;
        var rect = grid.getCellRelativeRect(col, 0);
        var left = rect.left;
        var top = rect.top;
        var bottom = grid.getCellRelativeRect(col, frozenRowCount - 1).bottom;
        return getLinearGradient(context, left, top, left, bottom, {
            0: '#FFF',
            1: '#D3D3D3',
        });
    }
    /**
     * basic theme
     * @name BASIC
     * @type {Object}
     * @memberof kakaGrid.themes.choices
     */
    var basicTheme = {
        borderColor: '#000',
        button: {
            bgColor: '#2196F3',
            color: '#FFF',
        },
        checkbox: {
            borderColor: '#000',
            checkBgColor: 'rgb(76, 73, 72)',
            uncheckBgColor: '#FFF',
        },
        radioButton: {
            checkColor: 'rgb(76, 73, 72)',
            checkBorderColor: '#000',
            uncheckBorderColor: '#000',
            uncheckBgColor: '#FFF',
            checkBgColor: '#FFF',
        },
        color: '#000',
        defaultBgColor: DEFAULT_BG_COLOR,
        frozenRowsBgColor: FROZEN_ROWS_BG_COLOR,
        // frozenRowsBorderColor: "#000",
        // frozenRowsColor: "#000",
        header: {
            sortArrowColor: 'rgba(0, 0, 0, 0.38)',
        },
        highlightBorderColor: '#5E9ED6',
        selectionBgColor: '#CCE0FF',
        selectionDragBgColor: '#EAF2FF',
        switch: {
            borderColor: '#000',
            checkBgColor: '#008CD6',
            uncheckBgColor: '#FFF',
        },
        tree: {
            lineColor: 'rgb(76, 73, 72)',
            buttonColor: 'rgb(76, 73, 72)',
            buttonBgColor: 'transparent',
            buttonBorderColor: 'rgb(76, 73, 72)',
            linkColor: 'rgb(76, 73, 72)',
        },
        underlayBackgroundColor: '#F6F6F6',
    };

    function FROZEN_ROWS_BORDER_COLOR(args) {
        var row = args.row;
        var frozenRowCount = args.grid.frozenRowCount;
        if (frozenRowCount - 1 === row) {
            return ['#f2f2f2', '#f2f2f2', '#ccc7c7', '#f2f2f2'];
        }
        else {
            return ['#f2f2f2'];
        }
    }
    function BORDER_COLOR(args) {
        var col = args.col, row = args.row, grid = args.grid;
        var colCount = grid.colCount, frozenColCount = grid.frozenColCount, recordRowCount = grid.recordRowCount;
        var top = '#ccc7c7';
        var bottom = '#ccc7c7';
        if (recordRowCount > 1) {
            var startRow = grid.getRecordStartRowByRecordIndex(grid.getRecordIndexByRow(row));
            var endRow = startRow + recordRowCount - 1;
            if (startRow !== row) {
                top = null;
            }
            if (endRow !== row) {
                bottom = null;
            }
        }
        if (frozenColCount - 1 === col) {
            return [top, '#f2f2f2', bottom, null];
        }
        if (colCount - 1 === col) {
            return [top, '#f2f2f2', bottom, null];
        }
        return [top, null, bottom, null];
    }
    /**
     * material design theme
     * @name MATERIAL_DESIGN
     * @type {Object}
     * @memberof kakaGrid.themes.choices
     */
    var materialDesignTheme = {
        borderColor: BORDER_COLOR,
        button: {
            bgColor: '#2196F3',
            color: '#FFF',
        },
        checkbox: {
            borderColor: 'rgba(0, 0, 0, 0.26)',
            checkBgColor: 'rgb(76, 73, 72)',
        },
        radioButton: {
            checkColor: 'rgb(76, 73, 72)',
            checkBorderColor: 'rgb(76, 73, 72)',
            uncheckBorderColor: 'rgb(189, 189, 189)',
        },
        color: 'rgba(0, 0, 0, 0.87)',
        defaultBgColor: '#FFF',
        // frozenRowsBgColor: "#FFF",
        frozenRowsBorderColor: FROZEN_ROWS_BORDER_COLOR,
        frozenRowsColor: 'rgba(0, 0, 0, 0.54)',
        header: {
            sortArrowColor: 'rgba(0, 0, 0, 0.38)',
        },
        highlightBorderColor: '#5E9ED6',
        selectionBgColor: '#CCE0FF',
        selectionDragBgColor: '#EAF2FF',
        switch: {
            borderColor: '#BFBFBF',
            checkBgColor: '#008CD6',
        },
        tree: {
            lineColor: 'rgba(0, 0, 0, 0.3)',
            buttonColor: 'rgba(0, 0, 0, 0.45)',
            buttonBgColor: 'transparent',
            buttonBorderColor: 'rgba(0, 0, 0, 0.3)',
            linkColor: 'rgba(0, 0, 0, 0.3)',
        },
        underlayBackgroundColor: '#FFF',
    };

    //private symbol
    var _$2 = getThemeSymbol();
    function getProp(obj, superObj, names, defNames) {
        return (getChainSafe.apply(void 0, __spreadArrays([obj], names)) || getChainSafe.apply(void 0, __spreadArrays([superObj], names)) ||
            (defNames && getChainSafe.apply(void 0, __spreadArrays([obj], defNames))) ||
            (defNames && getChainSafe.apply(void 0, __spreadArrays([superObj], defNames))));
    }
    var Theme = /** @class */ (function () {
        function Theme(obj, superTheme) {
            this._checkbox = null;
            this._radioButton = null;
            this._button = null;
            this._header = null;
            this._switch = null;
            this._tree = null;
            this[_$2] = {
                obj: obj,
                superTheme: superTheme,
            };
        }
        Object.defineProperty(Theme.prototype, "underlayBackgroundColor", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['underlayBackgroundColor']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "font", {
            // font
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['font']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "frozenRowsFont", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['frozenRowsFont']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "color", {
            // color
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['color']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "frozenRowsColor", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['frozenRowsColor'], ['color']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "defaultBgColor", {
            // background
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['defaultBgColor']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "frozenRowsBgColor", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['frozenRowsBgColor'], ['defaultBgColor']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "focusBgColor", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['focusBgColor']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "selectionBgColor", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['selectionBgColor'], ['defaultBgColor']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "selectionDragBgColor", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['selectionDragBgColor'], ['selectionBgColor']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "highlightBgColor", {
            get: function () {
                var _this = this;
                if (this.hasProperty(['highlightBgColor'])) {
                    var _a = this[_$2], obj = _a.obj, superTheme = _a.superTheme;
                    return getProp(obj, superTheme, ['highlightBgColor']);
                }
                return function (args) {
                    var color = args.row < args.grid.frozenRowCount
                        ? _this.frozenRowsBgColor
                        : _this.defaultBgColor;
                    if (typeof color === 'function') {
                        return color(args);
                    }
                    return color;
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "borderColor", {
            // border
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['borderColor']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "frozenRowsBorderColor", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['frozenRowsBorderColor'], ['borderColor']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "highlightBorderColor", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['highlightBorderColor'], ['borderColor']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "gridBorderColor", {
            // grid border
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['gridBorderColor']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "gridBorderWidth", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['gridBorderWidth']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "defaultRowHeight", {
            // size
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['defaultRowHeight']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "defaultColWidth", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['defaultColWidth']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "highlightBorderWidth", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return getProp(obj, superTheme, ['highlightBorderWidth']);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "checkbox", {
            // other
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return (this._checkbox ||
                    (this._checkbox = {
                        get uncheckBgColor() {
                            return getProp(obj, superTheme, ['checkbox', 'uncheckBgColor'], ['defaultBgColor']);
                        },
                        get checkBgColor() {
                            return getProp(obj, superTheme, ['checkbox', 'checkBgColor'], ['color']);
                        },
                        get borderColor() {
                            return getProp(obj, superTheme, ['checkbox', 'borderColor']);
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "radioButton", {
            get: function () {
                var _a = this[_$2], obj = _a.obj, superTheme = _a.superTheme;
                return (this._radioButton ||
                    (this._radioButton = {
                        get checkColor() {
                            return getProp(obj, superTheme, ['radioButton', 'checkColor'], ['color']);
                        },
                        get uncheckBorderColor() {
                            return getProp(obj, superTheme, ['radioButton', 'uncheckBorderColor'], ['borderColor']);
                        },
                        get checkBorderColor() {
                            return getProp(obj, superTheme, ['radioButton', 'checkBorderColor'], ['borderColor']);
                        },
                        get uncheckBgColor() {
                            return getProp(obj, superTheme, ['radioButton', 'uncheckBgColor'], ['defaultBgColor']);
                        },
                        get checkBgColor() {
                            return getProp(obj, superTheme, ['radioButton', 'checkBgColor'], ['defaultBgColor']);
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "button", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return (this._button ||
                    (this._button = {
                        get color() {
                            return getProp(obj, superTheme, ['button', 'color'], ['color']);
                        },
                        get bgColor() {
                            return getProp(obj, superTheme, ['button', 'bgColor'], ['defaultBgColor']);
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "header", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return (this._header ||
                    (this._header = {
                        get sortArrowColor() {
                            return getProp(obj, superTheme, ['header', 'sortArrowColor']);
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "switch", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return (this._switch ||
                    (this._switch = {
                        get uncheckBgColor() {
                            return getProp(obj, superTheme, ['switch', 'uncheckBgColor'], ['defaultBgColor']);
                        },
                        get checkBgColor() {
                            return getProp(obj, superTheme, ['switch', 'checkBgColor'], ['color']);
                        },
                        get borderColor() {
                            return getProp(obj, superTheme, ['switch', 'borderColor']);
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "tree", {
            get: function () {
                var obj = this[_$2].obj;
                var superTheme = this[_$2].superTheme;
                return (this._tree ||
                    (this._tree = {
                        get lineColor() {
                            return getProp(obj, superTheme, ['tree', 'lineColor']);
                        },
                        get buttonColor() {
                            return getProp(obj, superTheme, ['tree', 'buttonColor'], ['color']);
                        },
                        get buttonBgColor() {
                            return getProp(obj, superTheme, ['tree', 'buttonBgColor'], ['defaultBgColor']);
                        },
                        get buttonBorderColor() {
                            return getProp(obj, superTheme, ['tree', 'buttonBorderColor']);
                        },
                        get linkColor() {
                            return getProp(obj, superTheme, ['tree', 'linkColor']);
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        Theme.prototype.hasProperty = function (names) {
            var _a = this[_$2], obj = _a.obj, superTheme = _a.superTheme;
            return hasThemeProperty(obj, names) || hasThemeProperty(superTheme, names);
        };
        Theme.prototype.extends = function (obj) {
            return new Theme(obj, this);
        };
        return Theme;
    }());
    function hasThemeProperty(obj, names) {
        if (obj instanceof Theme) {
            return obj.hasProperty(names);
        }
        else {
            var o = obj;
            if (!o) {
                return false;
            }
            for (var index = 0; index < names.length; index++) {
                var name_1 = names[index];
                o = o[name_1];
                if (!o) {
                    return false;
                }
            }
            return !!o;
        }
    }

    var BASIC = new Theme(basicTheme);
    var MATERIAL_DESIGN = new Theme(materialDesignTheme);
    var builtin = {
        BASIC: BASIC,
        MATERIAL_DESIGN: MATERIAL_DESIGN,
    };
    var defTheme = MATERIAL_DESIGN;
    var theme = { Theme: Theme };
    function of$6(value) {
        if (!value) {
            return null;
        }
        if (typeof value === 'string') {
            var t = getIgnoreCase(getChoices(), value);
            if (t) {
                return t;
            }
            return null;
        }
        if (value instanceof Theme) {
            return value;
        }
        return new Theme(value);
    }
    function getDefault() {
        return defTheme;
    }
    function setDefault(defaultTheme) {
        defTheme = of$6(defaultTheme) || defTheme;
    }
    function getChoices() {
        return extend(builtin, themes);
    }
    var themes$1 = {
        BASIC: BASIC,
        MATERIAL_DESIGN: MATERIAL_DESIGN,
        theme: theme,
        of: of$6,
        getDefault: getDefault,
        setDefault: setDefault,
        getChoices: getChoices,
    };

    var rgbMap = {};
    function styleColorToRGB(color) {
        var dummy = document.createElement('div');
        var style = dummy.style;
        style.color = color;
        style.position = 'fixed';
        style.height = '1px';
        style.width = '1px';
        style.opacity = '0';
        document.body.appendChild(dummy);
        var styleColor = (document.defaultView || window).getComputedStyle(dummy, '').color;
        document.body.removeChild(dummy);
        return colorToRGB0(styleColor || '');
    }
    function hexToNum(hex) {
        return parseInt(hex, 16);
    }
    function createRGB(r, g, b, a) {
        if (a === void 0) { a = 1; }
        return { r: r, g: g, b: b, a: a };
    }
    function tripleHexToRGB(_a) {
        var r = _a[1], g = _a[2], b = _a[3];
        return createRGB(hexToNum(r + r), hexToNum(g + g), hexToNum(b + b));
    }
    function sextupleHexToRGB(_a) {
        var r1 = _a[1], r2 = _a[2], g1 = _a[3], g2 = _a[4], b1 = _a[5], b2 = _a[6];
        return createRGB(hexToNum(r1 + r2), hexToNum(g1 + g2), hexToNum(b1 + b2));
    }
    function testRGB(_a) {
        var r = _a.r, g = _a.g, b = _a.b, a = _a.a;
        return (0 <= r &&
            r <= 255 &&
            0 <= g &&
            g <= 255 &&
            0 <= b &&
            b <= 255 &&
            0 <= a &&
            a <= 1);
    }
    function rateToByte(r) {
        return Math.ceil((r * 255) / 100);
    }
    function colorToRGB0(color) {
        if (/^#[0-9a-f]{3}$/i.exec(color)) {
            return tripleHexToRGB(color);
        }
        if (/^#[0-9a-f]{6}$/i.exec(color)) {
            return sextupleHexToRGB(color);
        }
        var ret = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i.exec(color);
        if (ret) {
            var rgb = createRGB(Number(ret[1]), Number(ret[2]), Number(ret[3]));
            if (testRGB(rgb)) {
                return rgb;
            }
        }
        ret = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d(\.\d)?)\s*\)$/i.exec(color);
        if (ret) {
            var rgb = createRGB(Number(ret[1]), Number(ret[2]), Number(ret[3]), Number(ret[4]));
            if (testRGB(rgb)) {
                return rgb;
            }
        }
        ret = /^rgb\(\s*(\d{1,3}(\.\d)?)%\s*,\s*(\d{1,3}(\.\d)?)%\s*,\s*(\d{1,3}(\.\d)?)%\s*\)$/i.exec(color);
        if (ret) {
            var rgb = createRGB(rateToByte(Number(ret[1])), rateToByte(Number(ret[3])), rateToByte(Number(ret[5])));
            if (testRGB(rgb)) {
                return rgb;
            }
        }
        ret = /^rgba\(\s*(\d{1,3}(\.\d)?)%\s*,\s*(\d{1,3}(\.\d)?)%\s*,\s*(\d{1,3}(\.\d)?)%\s*,\s*(\d(\.\d)?)\s*\)$/i.exec(color);
        if (ret) {
            var rgb = createRGB(rateToByte(Number(ret[1])), rateToByte(Number(ret[3])), rateToByte(Number(ret[5])), Number(ret[7]));
            if (testRGB(rgb)) {
                return rgb;
            }
        }
        return null;
    }
    function colorToRGB(color) {
        if (typeof color !== 'string') {
            return createRGB(0, 0, 0, 0);
        }
        color = color.toLowerCase().trim();
        if (rgbMap[color]) {
            return rgbMap[color];
        }
        return colorToRGB0(color) || (rgbMap[color] = styleColorToRGB(color));
    }
    function calcElapsedColor(startColor, endColor, elapsedTime) {
        var startColorRGB = colorToRGB(startColor);
        var endColorRGB = colorToRGB(endColor);
        var getRGB = function (colorName) {
            var start = startColorRGB[colorName];
            var end = endColorRGB[colorName];
            if (elapsedTime >= 1) {
                return end;
            }
            if (elapsedTime <= 0) {
                return start;
            }
            var diff = start - end;
            return Math.ceil(start - diff * elapsedTime);
        };
        return "rgb(" + getRGB('r') + ", " + getRGB('g') + ", " + getRGB('b') + ")";
    }

    var ceil = Math.ceil, PI = Math.PI;
    function strokeColorsRect(ctx, borderColors, left, top, width, height) {
        function strokeRectLines(positions) {
            for (var i = 0; i < borderColors.length; i++) {
                var color = borderColors[i];
                var preColor = borderColors[i - 1];
                if (color) {
                    if (preColor !== color) {
                        if (preColor) {
                            ctx.strokeStyle = preColor;
                            ctx.stroke();
                        }
                        var pos1 = positions[i];
                        ctx.beginPath();
                        ctx.moveTo(pos1.x, pos1.y);
                    }
                    var pos2 = positions[i + 1];
                    ctx.lineTo(pos2.x, pos2.y);
                }
                else {
                    if (preColor) {
                        ctx.strokeStyle = preColor;
                        ctx.stroke();
                    }
                }
            }
            var pColor = borderColors[borderColors.length - 1];
            if (pColor) {
                ctx.strokeStyle = pColor;
                ctx.stroke();
            }
        }
        if (borderColors[0] === borderColors[1] &&
            borderColors[0] === borderColors[2] &&
            borderColors[0] === borderColors[3]) {
            if (borderColors[0]) {
                ctx.strokeStyle = borderColors[0];
                ctx.strokeRect(left, top, width, height);
            }
        }
        else {
            strokeRectLines([
                { x: left, y: top },
                { x: left + width, y: top },
                { x: left + width, y: top + height },
                { x: left, y: top + height },
                { x: left, y: top },
            ]);
        }
    }
    function roundRect(ctx, left, top, width, height, radius) {
        ctx.beginPath();
        ctx.arc(left + radius, top + radius, radius, -PI, -0.5 * PI, false);
        ctx.arc(left + width - radius, top + radius, radius, -0.5 * PI, 0, false);
        ctx.arc(left + width - radius, top + height - radius, radius, 0, 0.5 * PI, false);
        ctx.arc(left + radius, top + height - radius, radius, 0.5 * PI, PI, false);
        ctx.closePath();
    }
    function fillRoundRect(ctx, left, top, width, height, radius) {
        roundRect(ctx, left, top, width, height, radius);
        ctx.fill();
    }
    function strokeRoundRect(ctx, left, top, width, height, radius) {
        roundRect(ctx, left, top, width, height, radius);
        ctx.stroke();
    }
    function fillCircle(ctx, left, top, width, height) {
        var min = Math.min(width, height) / 2;
        ctx.beginPath();
        ctx.arc(left + min, top + min, min, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
    function strokeCircle(ctx, left, top, width, height) {
        var min = Math.min(width, height) / 2;
        ctx.beginPath();
        ctx.arc(left + min, top + min, min, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    }
    function fillTextRect(ctx, text, left, top, width, height, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 2 : _c, padding = _b.padding;
        var rect = {
            bottom: top + height,
            height: height,
            left: left,
            right: left + width,
            top: top,
            width: width,
        };
        ctx.save();
        try {
            ctx.beginPath();
            ctx.rect(rect.left, rect.top, rect.width, rect.height);
            // clip
            ctx.clip();
            // 文字
            var pos = calcBasePosition(ctx, rect, {
                offset: offset,
                padding: padding,
            });
            ctx.fillText(text, pos.x, pos.y);
        }
        finally {
            ctx.restore();
        }
    }
    function drawInlineImageRect(ctx, image, srcLeft, srcTop, srcWidth, srcHeight, destWidth, destHeight, left, top, width, height, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 2 : _c, padding = _b.padding;
        var rect = {
            bottom: top + height,
            height: height,
            left: left,
            right: left + width,
            top: top,
            width: width,
        };
        ctx.save();
        try {
            ctx.beginPath();
            ctx.rect(rect.left, rect.top, rect.width, rect.height);
            // clip
            ctx.clip();
            // 文字
            var pos = calcStartPosition(ctx, rect, destWidth, destHeight, {
                offset: offset,
                padding: padding,
            });
            ctx.drawImage(image, srcLeft, srcTop, srcWidth || destWidth, srcHeight || destHeight, pos.x, pos.y, destWidth, destHeight);
        }
        finally {
            ctx.restore();
        }
    }
    /**
     * Returns an object containing the width of the checkbox.
     * @param ctx - canvas context
     * @returns Object containing the width of the checkbox
     */
    function measureCheckbox(ctx) {
        return {
            width: getFontSize(ctx, null).width,
        };
    }
    /**
     * Returns an object containing the width of the radio button.
     * @param ctx - canvas context
     * @returns Object containing the width of the radio button
     */
    function measureRadioButton(ctx) {
        return {
            width: getFontSize(ctx, null).width,
        };
    }
    /**
     * draw Checkbox
     * @param ctx - canvas context
     * @param x - The x coordinate where to start drawing the checkbox (relative to the canvas)
     * @param y - The y coordinate where to start drawing the checkbox (relative to the canvas)
     * @param check - checkbox check status
     * @param option - option
     * @returns
     */
    function drawCheckbox(ctx, x, y, check, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.uncheckBgColor, uncheckBgColor = _c === void 0 ? '#FFF' : _c, _d = _b.checkBgColor, checkBgColor = _d === void 0 ? 'rgb(76, 73, 72)' : _d, _e = _b.borderColor, borderColor = _e === void 0 ? '#000' : _e, _f = _b.boxSize, boxSize = _f === void 0 ? measureCheckbox(ctx).width : _f;
        var checkPoint = typeof check === 'number' ? (check > 1 ? 1 : check) : 1;
        ctx.save();
        try {
            ctx.fillStyle = check ? checkBgColor : uncheckBgColor;
            var leftX = ceil(x);
            var topY = ceil(y);
            var size = ceil(boxSize);
            fillRoundRect(ctx, leftX - 1, topY - 1, size + 1, size + 1, boxSize / 5);
            ctx.lineWidth = 1;
            ctx.strokeStyle = borderColor;
            strokeRoundRect(ctx, leftX - 0.5, topY - 0.5, size, size, boxSize / 5);
            if (check) {
                ctx.lineWidth = ceil(boxSize / 10);
                ctx.strokeStyle = uncheckBgColor;
                var leftWidth = boxSize / 4;
                var rightWidth = (boxSize / 2) * 0.9;
                var leftLeftPos = x + boxSize * 0.2;
                var leftTopPos = y + boxSize / 2;
                if (checkPoint < 0.5) {
                    leftWidth *= checkPoint * 2;
                }
                ctx.beginPath();
                ctx.moveTo(leftLeftPos, leftTopPos);
                ctx.lineTo(leftLeftPos + leftWidth, leftTopPos + leftWidth);
                if (checkPoint > 0.5) {
                    if (checkPoint < 1) {
                        rightWidth *= (checkPoint - 0.5) * 2;
                    }
                    ctx.lineTo(leftLeftPos + leftWidth + rightWidth, leftTopPos + leftWidth - rightWidth);
                }
                ctx.stroke();
            }
        }
        finally {
            ctx.restore();
        }
    }
    /**
     * draw Radio button
     * @param ctx - canvas context
     * @param x - The x coordinate where to start drawing the radio button (relative to the canvas)
     * @param y - The y coordinate where to start drawing the radio button (relative to the canvas)
     * @param check - radio button check status
     * @param option - option
     * @returns
     */
    function drawRadioButton(ctx, x, y, check, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.checkColor, checkColor = _c === void 0 ? 'rgb(76, 73, 72)' : _c, _d = _b.borderColor, borderColor = _d === void 0 ? '#000' : _d, _e = _b.bgColor, bgColor = _e === void 0 ? '#FFF' : _e, _f = _b.boxSize, boxSize = _f === void 0 ? measureRadioButton(ctx).width : _f;
        var ratio = typeof check === 'number' ? (check > 1 ? 1 : check) : 1;
        ctx.save();
        try {
            ctx.fillStyle = bgColor;
            var leftX = ceil(x);
            var topY = ceil(y);
            var size = ceil(boxSize);
            fillCircle(ctx, leftX - 1, topY - 1, size + 1, size + 1);
            ctx.lineWidth = 1;
            ctx.strokeStyle = borderColor;
            strokeCircle(ctx, leftX - 0.5, topY - 0.5, size, size);
            if (check) {
                var checkSize = (size * ratio) / 2;
                var padding = (size - checkSize) / 2;
                ctx.fillStyle = checkColor;
                fillCircle(ctx, ceil((leftX - 0.5 + padding) * 100) / 100, ceil((topY - 0.5 + padding) * 100) / 100, ceil(checkSize * 100) / 100, ceil(checkSize * 100) / 100);
            }
        }
        finally {
            ctx.restore();
        }
    }
    /**
     * draw Switch Button
     * @param ctx - canvas context
     * @param x - The x coordinate where to start drawing the switch (relative to the canvas)
     * @param y - The y coordinate where to start drawing the switch (relative to the canvas)
     * @param check - switch check status
     * @param option - option
     * @returns
     */
    function drawSwitchBtn(ctx, x, y, check, animElapsedTime, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.uncheckBgColor, uncheckBgColor = _c === void 0 ? '#FFF' : _c, _d = _b.checkBgColor, checkBgColor = _d === void 0 ? '#3BCD4F' : _d, _e = _b.borderColor, borderColor = _e === void 0 ? '#D9D9D9' : _e, _f = _b.btnSize, btnSize = _f === void 0 ? { width: 52, height: 32 } : _f;
        animElapsedTime =
            animElapsedTime > 1 ? 1 : animElapsedTime < 0 ? 0 : animElapsedTime;
        var borderWidth = btnSize.height * 0.078125;
        ctx.save();
        try {
            ctx.fillStyle = check ? checkBgColor : borderColor;
            var bX = ceil(x) - 1;
            var bY = ceil(y) - 1;
            var bW = ceil(btnSize.width + 1);
            var bH = ceil(btnSize.height + 1);
            fillRoundRect(ctx, bX, bY, bW, bH, bH / 2);
            var scale = check ? 1 - animElapsedTime : animElapsedTime;
            ctx.fillStyle = uncheckBgColor;
            var cW = (bW - borderWidth * 2) * scale;
            var cH = (bH - borderWidth * 2) * scale;
            var cX = bX + bW / 2 - cW / 2;
            var cY = bY + bH / 2 - cH / 2;
            fillRoundRect(ctx, cX, cY, cW, cH, cH / 2);
            var offsetScale = check ? animElapsedTime : 1 - animElapsedTime;
            ctx.shadowColor = borderColor;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 3;
            var sW = bH - borderWidth * 2;
            var sH = sW;
            var sX = bX + borderWidth + (bW - borderWidth * 2 - sW) * offsetScale;
            var sY = bY + borderWidth;
            fillRoundRect(ctx, sX, sY, sW, sH, sH / 2);
        }
        finally {
            ctx.restore();
        }
    }
    function drawSwitchButton(ctx, x, y, check, animElapsedTime, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.uncheckBgColor, uncheckBgColor = _c === void 0 ? '#FFF' : _c, _d = _b.checkBgColor, checkBgColor = _d === void 0 ? '#008CD6' : _d, _e = _b.borderColor, borderColor = _e === void 0 ? '#BFBFBF' : _e, _f = _b.btnSize, btnSize = _f === void 0 ? { width: 44, height: 22 } : _f;
        animElapsedTime =
            animElapsedTime > 1 ? 1 : animElapsedTime < 0 ? 0 : animElapsedTime;
        var borderWidth = (btnSize.height * 2) / 22;
        var fontSize = (btnSize.height * 12) / 22;
        var textMargin = (btnSize.height * 14) / 22;
        ctx.save();
        try {
            var backgroundFillStyle = void 0;
            var trueFillStyle = void 0;
            var falseFillStyle = void 0;
            if (0 < animElapsedTime && animElapsedTime < 1) {
                backgroundFillStyle = check
                    ? calcElapsedColor(borderColor, checkBgColor, animElapsedTime)
                    : calcElapsedColor(checkBgColor, borderColor, animElapsedTime);
                trueFillStyle = check
                    ? calcElapsedColor(borderColor, uncheckBgColor, animElapsedTime)
                    : calcElapsedColor(uncheckBgColor, borderColor, animElapsedTime);
                falseFillStyle = check
                    ? calcElapsedColor(uncheckBgColor, checkBgColor, animElapsedTime)
                    : calcElapsedColor(checkBgColor, uncheckBgColor, animElapsedTime);
            }
            else {
                backgroundFillStyle = check ? checkBgColor : borderColor;
                trueFillStyle = check ? uncheckBgColor : borderColor;
                falseFillStyle = check ? checkBgColor : uncheckBgColor;
            }
            var bX = x;
            var bY = y;
            var bW = btnSize.width;
            var bH = btnSize.height;
            ctx.fillStyle = backgroundFillStyle;
            fillRoundRect(ctx, bX, bY, bW, bH, bH / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = fontSize + "px sans-serif";
            ctx.fillStyle = trueFillStyle;
            ctx.fillText('是', bX + textMargin, bY + bH / 2);
            ctx.fillStyle = falseFillStyle;
            ctx.fillText('否', bX + bW - textMargin, bY + bH / 2);
            var offsetScale = check ? animElapsedTime : 1 - animElapsedTime;
            var sW = bH - borderWidth * 2;
            var sH = sW;
            var sX = bX + borderWidth + (bW - borderWidth * 2 - sW) * offsetScale;
            var sY = bY + borderWidth;
            ctx.fillStyle = uncheckBgColor;
            fillRoundRect(ctx, sX, sY, sW, sH, sH / 2);
        }
        finally {
            ctx.restore();
        }
    }
    function drawButton(ctx, left, top, width, height, option) {
        if (option === void 0) { option = {}; }
        var _a = option.backgroundColor, backgroundColor = _a === void 0 ? '#FFF' : _a, _b = option.bgColor, bgColor = _b === void 0 ? backgroundColor : _b, _c = option.radius, radius = _c === void 0 ? 4 : _c, _d = option.shadow, shadow = _d === void 0 ? {} : _d;
        ctx.save();
        try {
            ctx.fillStyle = bgColor;
            if (shadow) {
                var _e = shadow.color, color = _e === void 0 ? 'rgba(0, 0, 0, 0.24)' : _e, _f = shadow.blur, blur_1 = _f === void 0 ? 1 : _f, _g = shadow.offsetX, offsetX = _g === void 0 ? 0 : _g, _h = shadow.offsetY, offsetY = _h === void 0 ? 2 : _h, _j = shadow.offset, _k = _j === void 0 ? {} : _j, _l = _k.x, ox = _l === void 0 ? offsetX : _l, _m = _k.y, oy = _m === void 0 ? offsetY : _m;
                ctx.shadowColor = color;
                ctx.shadowBlur = blur_1; // 模糊
                ctx.shadowOffsetX = ox;
                ctx.shadowOffsetY = oy;
            }
            fillRoundRect(ctx, ceil(left), ceil(top), ceil(width), ceil(height), radius);
        }
        finally {
            ctx.restore();
        }
    }
    /**
     * canvasHelper
     */
    var canvasHelper = {
        drawButton: drawButton,
        drawCheckbox: drawCheckbox,
        drawInlineImageRect: drawInlineImageRect,
        drawRadioButton: drawRadioButton,
        drawSwitchButton: drawSwitchButton,
        drawSwitchBtn: drawSwitchBtn,
        fillRoundRect: fillRoundRect,
        fillTextRect: fillTextRect,
        measureCheckbox: measureCheckbox,
        measureRadioButton: measureRadioButton,
        roundRect: roundRect,
        strokeColorsRect: strokeColorsRect,
        strokeRoundRect: strokeRoundRect,
        fillCircle: fillCircle,
        strokeCircle: strokeCircle,
    };

    /**
     * tools
     */
    var tools = { canvasHelper: canvasHelper };

    var seqId = -1;
    function newEmptyHeaderData() {
        return {
            id: seqId--,
            define: {},
            headerType: headers.type.of(null),
        };
    }
    function newEmptyColumnData() {
        return {
            id: seqId--,
            define: {},
            columnType: columns.type.of(null),
            style: null,
        };
    }
    var EmptyDataCache = /** @class */ (function () {
        function EmptyDataCache() {
            this.headers = [];
            this.columns = [];
        }
        EmptyDataCache.prototype.getHeader = function (col, row) {
            var rows = this.headers[row] || (this.headers[row] = []);
            return rows[col] || (rows[col] = newEmptyHeaderData());
        };
        EmptyDataCache.prototype.getBody = function (col, row) {
            var rows = this.columns[row] || (this.columns[row] = []);
            return rows[col] || (rows[col] = newEmptyColumnData());
        };
        return EmptyDataCache;
    }());

    var seqId$1 = 0;
    var SimpleHeaderLayoutMap = /** @class */ (function () {
        function SimpleHeaderLayoutMap(header) {
            this.bodyRowCount = 1;
            this._emptyDataCache = new EmptyDataCache();
            this._columns = [];
            this._headerCellIds = [];
            this._headerObjects = this._addHeaders(0, header, []);
            this._headerObjectMap = this._headerObjects.reduce(function (o, e) {
                o[e.id] = e;
                return o;
            }, {});
            this._setupHeaderSpan();
        }
        Object.defineProperty(SimpleHeaderLayoutMap.prototype, "columnWidths", {
            get: function () {
                return this._columns;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleHeaderLayoutMap.prototype, "headerRowCount", {
            get: function () {
                return this._headerCellIds.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleHeaderLayoutMap.prototype, "colCount", {
            get: function () {
                return this._columns.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleHeaderLayoutMap.prototype, "headerObjects", {
            get: function () {
                return this._headerObjects;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleHeaderLayoutMap.prototype, "columnObjects", {
            get: function () {
                return this._columns;
            },
            enumerable: false,
            configurable: true
        });
        SimpleHeaderLayoutMap.prototype.getCellId = function (col, row) {
            if (this.headerRowCount <= row) {
                return this._columns[col].id;
            }
            //in header
            return this._headerCellIds[row][col];
        };
        SimpleHeaderLayoutMap.prototype.getHeader = function (col, row) {
            var id = this.getCellId(col, row);
            return (this._headerObjectMap[id] ||
                this._emptyDataCache.getHeader(col, row));
        };
        SimpleHeaderLayoutMap.prototype.getBody = function (col, _row) {
            return this._columns[col] || this._emptyDataCache.getBody(col, 0);
        };
        SimpleHeaderLayoutMap.prototype.getBodyLayoutRangeById = function (id) {
            for (var col = 0; col < this.colCount; col++) {
                if (id === this._columns[col].id) {
                    return {
                        start: { col: col, row: 0 },
                        end: { col: col, row: 0 },
                    };
                }
            }
            throw new Error("can not found body layout @id=" + id);
        };
        SimpleHeaderLayoutMap.prototype.getCellRange = function (col, row) {
            var result = { start: { col: col, row: row }, end: { col: col, row: row } };
            if (this.headerRowCount <= row) {
                return result;
            }
            //in header
            var id = this.getCellId(col, row);
            for (var c = col - 1; c >= 0; c--) {
                if (id !== this.getCellId(c, row)) {
                    break;
                }
                result.start.col = c;
            }
            for (var c = col + 1; c < this.colCount; c++) {
                if (id !== this.getCellId(c, row)) {
                    break;
                }
                result.end.col = c;
            }
            for (var r = row - 1; r >= 0; r--) {
                if (id !== this.getCellId(col, r)) {
                    break;
                }
                result.start.row = r;
            }
            for (var r = row + 1; r < this.headerRowCount; r++) {
                if (id !== this.getCellId(col, r)) {
                    break;
                }
                result.end.row = r;
            }
            return result;
        };
        SimpleHeaderLayoutMap.prototype.getRecordIndexByRow = function (row) {
            if (row < this.headerRowCount) {
                return -1;
            }
            else {
                return row - this.headerRowCount;
            }
        };
        SimpleHeaderLayoutMap.prototype.getRecordStartRowByRecordIndex = function (index) {
            return this.headerRowCount + index;
        };
        SimpleHeaderLayoutMap.prototype._addHeaders = function (row, header, roots) {
            var _this = this;
            var results = [];
            var rowCells = this._headerCellIds[row] || this._newRow(row);
            header.forEach(function (hd) {
                var col = _this._columns.length;
                var id = seqId$1++;
                var cell = {
                    id: id,
                    caption: hd.caption,
                    field: hd.headerField || hd.field,
                    style: hd.headerStyle,
                    headerType: headers.type.ofCell(hd),
                    action: headers.action.ofCell(hd),
                    define: hd,
                    icon: hd.headerIcon,
                    tooltip: hd.headerTooltip,
                    tooltipType: hd.headerTooltipType,
                };
                results[id] = cell;
                rowCells[col] = id;
                for (var r = row - 1; r >= 0; r--) {
                    _this._headerCellIds[r][col] = roots[r];
                }
                if (hd.columns) {
                    _this._addHeaders(row + 1, hd.columns, __spreadArrays(roots, [
                        id,
                    ])).forEach(function (c) { return results.push(c); });
                }
                else {
                    var colDef = hd;
                    _this._columns.push({
                        id: seqId$1++,
                        field: colDef.field,
                        width: colDef.width,
                        minWidth: colDef.minWidth,
                        maxWidth: colDef.maxWidth,
                        icon: colDef.icon,
                        message: colDef.message,
                        columnType: columns.type.of(colDef.columnType),
                        action: columns.action.of(colDef.action),
                        style: colDef.style,
                        define: colDef,
                        contentHidden: colDef.contentHidden,
                        disableResize: colDef.disableResize,
                        tooltip: colDef.tooltip,
                        tooltipType: colDef.tooltipType,
                    });
                    for (var r = row + 1; r < _this._headerCellIds.length; r++) {
                        _this._headerCellIds[r][col] = id;
                    }
                }
            });
            return results;
        };
        SimpleHeaderLayoutMap.prototype._newRow = function (row) {
            var newRow = (this._headerCellIds[row] = []);
            if (!this._columns.length) {
                return newRow;
            }
            var prev = this._headerCellIds[row - 1];
            for (var col = 0; col < prev.length; col++) {
                newRow[col] = prev[col];
            }
            return newRow;
        };
        SimpleHeaderLayoutMap.prototype._setupHeaderSpan = function () {
            var processed = {};
            for (var row = 0; row < this._headerCellIds.length; row++) {
                var cols = this._headerCellIds[row];
                for (var col = 0; col < cols.length; col++) {
                    var cellId = cols[col];
                    if (!processed[cellId]) {
                        processed[cellId] = true;
                        var cell = this._headerObjectMap[cellId];
                        var headerRowSpan = void 0;
                        if ('headerRowSpan' in cell.define) {
                            window.console.warn("'headerRowSpan' is deprecated, please use 'rowSpan' instead");
                            headerRowSpan = cell.define['headerRowSpan'];
                        }
                        var headerColSpan = void 0;
                        if ('headerColSpan' in cell.define) {
                            window.console.warn("'headerColSpan' is deprecated, please use 'colSpan' instead");
                            headerColSpan = cell.define['headerColSpan'];
                        }
                        var rowSpan = Number(cell.define.rowSpan || headerRowSpan || 1);
                        var colSpan = Number(cell.define.colSpan || headerColSpan || 1);
                        if (rowSpan > 1 || colSpan > 1) {
                            for (var i = row; i < row + rowSpan; i++) {
                                for (var j = col; j < col + colSpan; j++) {
                                    this._headerCellIds[i][j] = cellId;
                                }
                            }
                        }
                    }
                }
            }
        };
        return SimpleHeaderLayoutMap;
    }());

    function normalizeLayout(layout) {
        if (Array.isArray(layout)) {
            return {
                header: layout,
                body: layout,
            };
        }
        return layout;
    }
    var seqId$2 = 0;
    var LayoutObjectGrid = /** @class */ (function () {
        function LayoutObjectGrid(layout, transform) {
            var _this = this;
            this.objects = [];
            this.objectGrid = [];
            this.objectMap = {};
            this.columnCount = 0;
            this.columnWidths = [];
            layout.forEach(function (rowLayout, row) {
                var col = 0;
                rowLayout.forEach(function (cell) {
                    var _a, _b;
                    var id = seqId$2++;
                    var obj = transform(cell, id);
                    _this.objects.push(obj);
                    _this.objectMap[id] = obj;
                    col = _this._findStartCell(col, row);
                    var rowSpan = Number((_a = cell.rowSpan) !== null && _a !== void 0 ? _a : 1);
                    var colSpan = Number((_b = cell.colSpan) !== null && _b !== void 0 ? _b : 1);
                    var endRow = row + rowSpan;
                    var endCol = col + colSpan;
                    for (var rowIndex = row; rowIndex < endRow; rowIndex++) {
                        var objectGridRow = _this._getObjectGridRow(rowIndex);
                        for (var colIndex = col; colIndex < endCol; colIndex++) {
                            objectGridRow[colIndex] = obj;
                        }
                    }
                    if (colSpan === 1) {
                        _this._setWidthDataIfAbsent(col, cell);
                    }
                    _this._useColumnIndex(endCol - 1);
                    col = endCol;
                });
            });
        }
        Object.defineProperty(LayoutObjectGrid.prototype, "rowCount", {
            get: function () {
                return this.objectGrid.length;
            },
            enumerable: false,
            configurable: true
        });
        LayoutObjectGrid.prototype._findStartCell = function (col, row) {
            var objectGridRow = this._getObjectGridRow(row);
            for (var index = col; index < objectGridRow.length; index++) {
                if (!objectGridRow[index]) {
                    return index;
                }
            }
            return objectGridRow.length;
        };
        LayoutObjectGrid.prototype._getObjectGridRow = function (row) {
            return this.objectGrid[row] || (this.objectGrid[row] = []);
        };
        LayoutObjectGrid.prototype._useColumnIndex = function (col) {
            if (this.columnCount > col) {
                return;
            }
            this.columnCount = col + 1;
        };
        LayoutObjectGrid.prototype._setWidthDataIfAbsent = function (col, cell) {
            if (!this.columnWidths[col]) {
                if (cell.width != null ||
                    cell.maxWidth != null ||
                    cell.minWidth != null) {
                    this.columnWidths[col] = {
                        width: cell.width,
                        maxWidth: cell.maxWidth,
                        minWidth: cell.minWidth,
                    };
                }
            }
        };
        return LayoutObjectGrid;
    }());
    var MultiLayoutMap = /** @class */ (function () {
        function MultiLayoutMap(layout) {
            this._columnWidths = [];
            this._emptyDataCache = new EmptyDataCache();
            var hbLayout = normalizeLayout(layout);
            var header = (this._header = new LayoutObjectGrid(hbLayout.header, function (hd, id) {
                return {
                    id: id,
                    caption: hd.caption,
                    field: hd.headerField || hd.field,
                    style: hd.headerStyle,
                    headerType: headers.type.ofCell(hd),
                    action: headers.action.ofCell(hd),
                    define: hd,
                    icon: hd.headerIcon,
                    tooltip: hd.headerTooltip,
                    tooltipType: hd.headerTooltipType,
                };
            }));
            var body = (this._body = new LayoutObjectGrid(hbLayout.body, function (colDef, id) {
                return {
                    id: id,
                    field: colDef.field,
                    width: colDef.width,
                    minWidth: colDef.minWidth,
                    maxWidth: colDef.maxWidth,
                    icon: colDef.icon,
                    message: colDef.message,
                    columnType: columns.type.of(colDef.columnType),
                    action: columns.action.of(colDef.action),
                    style: colDef.style,
                    define: colDef,
                    contentHidden: colDef.contentHidden,
                    disableResize: colDef.disableResize,
                    tooltip: colDef.tooltip,
                    tooltipType: colDef.tooltipType,
                };
            }));
            var columnCount = (this._columnCount = Math.max(header.columnCount, body.columnCount));
            for (var col = 0; col < columnCount; col++) {
                var widthDef = header.columnWidths[col] || body.columnWidths[col] || {};
                this._columnWidths[col] = widthDef;
            }
        }
        Object.defineProperty(MultiLayoutMap.prototype, "columnWidths", {
            get: function () {
                return this._columnWidths;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MultiLayoutMap.prototype, "headerRowCount", {
            get: function () {
                return this._header.rowCount;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MultiLayoutMap.prototype, "bodyRowCount", {
            get: function () {
                return this._body.rowCount;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MultiLayoutMap.prototype, "colCount", {
            get: function () {
                return this._columnCount;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MultiLayoutMap.prototype, "headerObjects", {
            get: function () {
                return this._header.objects;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MultiLayoutMap.prototype, "columnObjects", {
            get: function () {
                return this._body.objects;
            },
            enumerable: false,
            configurable: true
        });
        MultiLayoutMap.prototype.getCellId = function (col, row) {
            var _a, _b, _c, _d;
            if (this.headerRowCount <= row) {
                var bodyRow = row - this.headerRowCount;
                var bodyLayoutRow = bodyRow % this.bodyRowCount;
                return (_b = (_a = this._body.objectGrid[bodyLayoutRow]) === null || _a === void 0 ? void 0 : _a[col]) === null || _b === void 0 ? void 0 : _b.id;
            }
            //in header
            return (_d = (_c = this._header.objectGrid[row]) === null || _c === void 0 ? void 0 : _c[col]) === null || _d === void 0 ? void 0 : _d.id;
        };
        MultiLayoutMap.prototype.getHeader = function (col, row) {
            var id = this.getCellId(col, row);
            return (this._header.objectMap[id] ||
                this._emptyDataCache.getHeader(col, row));
        };
        MultiLayoutMap.prototype.getBody = function (col, row) {
            var id = this.getCellId(col, row);
            return (this._body.objectMap[id] ||
                this._emptyDataCache.getBody(col, row));
        };
        MultiLayoutMap.prototype.getBodyLayoutRangeById = function (id) {
            var _a;
            for (var row = 0; row < this.bodyRowCount; row++) {
                var objectGridRow = this._body.objectGrid[row];
                if (!objectGridRow) {
                    continue;
                }
                for (var col = 0; col < this.colCount; col++) {
                    if (id === ((_a = objectGridRow[col]) === null || _a === void 0 ? void 0 : _a.id)) {
                        return this._getCellRange(this._body, col, row, 0);
                    }
                }
            }
            throw new Error("can not found body layout @id=" + id);
        };
        MultiLayoutMap.prototype.getCellRange = function (col, row) {
            if (this.headerRowCount <= row) {
                var recordIndex = this.getRecordIndexByRow(row);
                var startRow = this.getRecordStartRowByRecordIndex(recordIndex);
                var bodyRow = row - this.headerRowCount;
                var bodyLayoutRow = bodyRow % this.bodyRowCount;
                return this._getCellRange(this._body, col, bodyLayoutRow, startRow);
            }
            //in header
            return this._getCellRange(this._header, col, row, 0);
        };
        MultiLayoutMap.prototype.getRecordIndexByRow = function (row) {
            if (row < this.headerRowCount) {
                return -1;
            }
            else {
                var bodyRow = row - this.headerRowCount;
                return Math.floor(bodyRow / this.bodyRowCount);
            }
        };
        MultiLayoutMap.prototype.getRecordStartRowByRecordIndex = function (index) {
            return this.headerRowCount + index * this.bodyRowCount;
        };
        MultiLayoutMap.prototype._getCellRange = function (layout, col, layoutRow, offsetRow) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            var result = {
                start: { col: col, row: layoutRow + offsetRow },
                end: { col: col, row: layoutRow + offsetRow },
            };
            var objectGrid = layout.objectGrid;
            var id = (_b = (_a = objectGrid[layoutRow]) === null || _a === void 0 ? void 0 : _a[col]) === null || _b === void 0 ? void 0 : _b.id;
            if (id == null) {
                return result;
            }
            for (var c = col - 1; c >= 0; c--) {
                if (id !== ((_d = (_c = objectGrid[layoutRow]) === null || _c === void 0 ? void 0 : _c[c]) === null || _d === void 0 ? void 0 : _d.id)) {
                    break;
                }
                result.start.col = c;
            }
            for (var c = col + 1; c < layout.columnCount; c++) {
                if (id !== ((_f = (_e = objectGrid[layoutRow]) === null || _e === void 0 ? void 0 : _e[c]) === null || _f === void 0 ? void 0 : _f.id)) {
                    break;
                }
                result.end.col = c;
            }
            for (var r = layoutRow - 1; r >= 0; r--) {
                if (id !== ((_h = (_g = objectGrid[r]) === null || _g === void 0 ? void 0 : _g[col]) === null || _h === void 0 ? void 0 : _h.id)) {
                    break;
                }
                result.start.row = r + offsetRow;
            }
            for (var r = layoutRow + 1; r < layout.rowCount; r++) {
                if (id !== ((_k = (_j = objectGrid[r]) === null || _j === void 0 ? void 0 : _j[col]) === null || _k === void 0 ? void 0 : _k.id)) {
                    break;
                }
                result.end.row = r + offsetRow;
            }
            return result;
        };
        return MultiLayoutMap;
    }());

    var LayoutMap = /** @class */ (function () {
        function LayoutMap(layoutMap) {
            this._layoutMap = layoutMap;
        }
        Object.defineProperty(LayoutMap.prototype, "headerRowCount", {
            get: function () {
                return this.hiddenHeader ? 0 : this._layoutMap.headerRowCount;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LayoutMap.prototype, "bodyRowCount", {
            get: function () {
                return this._layoutMap.bodyRowCount;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LayoutMap.prototype, "colCount", {
            get: function () {
                return this._layoutMap.colCount;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LayoutMap.prototype, "columnWidths", {
            get: function () {
                return this._layoutMap.columnWidths;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LayoutMap.prototype, "headerObjects", {
            get: function () {
                return this._layoutMap.headerObjects;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LayoutMap.prototype, "columnObjects", {
            get: function () {
                return this._layoutMap.columnObjects;
            },
            enumerable: false,
            configurable: true
        });
        LayoutMap.prototype.getHeader = function (col, row) {
            if (this.hiddenHeader) {
                row += this._layoutMap.headerRowCount;
            }
            return this._layoutMap.getHeader(col, row);
        };
        LayoutMap.prototype.getBody = function (col, row) {
            if (this.hiddenHeader) {
                row += this._layoutMap.headerRowCount;
            }
            return this._layoutMap.getBody(col, row);
        };
        LayoutMap.prototype.getCellId = function (col, row) {
            if (this.hiddenHeader) {
                row += this._layoutMap.headerRowCount;
            }
            return this._layoutMap.getCellId(col, row);
        };
        LayoutMap.prototype.getCellRange = function (col, row) {
            if (this.hiddenHeader) {
                row += this._layoutMap.headerRowCount;
            }
            var range = this._layoutMap.getCellRange(col, row);
            if (this.hiddenHeader) {
                range.start.row -= this._layoutMap.headerRowCount;
                range.end.row -= this._layoutMap.headerRowCount;
            }
            return range;
        };
        LayoutMap.prototype.getBodyLayoutRangeById = function (id) {
            var range = this._layoutMap.getBodyLayoutRangeById(id);
            return range;
        };
        LayoutMap.prototype.getRecordIndexByRow = function (row) {
            if (this.hiddenHeader) {
                row += this._layoutMap.headerRowCount;
            }
            return this._layoutMap.getRecordIndexByRow(row);
        };
        LayoutMap.prototype.getRecordStartRowByRecordIndex = function (index) {
            var row = this._layoutMap.getRecordStartRowByRecordIndex(index);
            if (this.hiddenHeader) {
                row -= this._layoutMap.headerRowCount;
            }
            return row;
        };
        return LayoutMap;
    }());

    var LG_EVENT_TYPE = __assign(__assign({}, DG_EVENT_TYPE), { CHANGED_HEADER_VALUE: 'changed_header_value', CHANGED_VALUE: 'changed_value', CELL_RANGE: 'cell_range', CELL_VALUE: 'cell_value' });

    var BaseMessage = /** @class */ (function () {
        function BaseMessage(grid) {
            this._grid = grid;
        }
        BaseMessage.prototype.dispose = function () {
            this.detachMessageElement();
            if (this._messageElement) {
                this._messageElement.dispose();
            }
            delete this._messageElement;
        };
        BaseMessage.prototype.drawCellMessageInternal = function (message, context, style, helper, grid, info) {
            // nothing
        };
        BaseMessage.prototype.attachMessageElement = function (col, row, message) {
            var messageElement = this._getMessageElement();
            messageElement.attach(this._grid, col, row, message);
        };
        BaseMessage.prototype.moveMessageElement = function (col, row) {
            var messageElement = this._getMessageElement();
            messageElement.move(this._grid, col, row);
        };
        BaseMessage.prototype.detachMessageElement = function () {
            var messageElement = this._getMessageElement();
            messageElement.detach();
        };
        BaseMessage.prototype.drawCellMessage = function (message, context, style, helper, grid, info) {
            this.drawCellMessageInternal(message, context, style, helper, grid, info);
        };
        BaseMessage.prototype._getMessageElement = function () {
            return (this._messageElement ||
                (this._messageElement = this.createMessageElementInternal()));
        };
        return BaseMessage;
    }());

    var messageElementCss = ".kaka-grid__message-element {\n  position: absolute;\n  margin-top: -2px;\n  box-sizing: border-box;\n  border-radius: 0 0 3px 3px;\n  background-color: rgba(250, 250, 250, 0.85);\n  padding: 8px 2px;\n  pointer-events: none;\n  user-select: none;\n  border-top: solid 1px rgba(0, 0, 0, 0.87);\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.kaka-grid__message-element--hidden {\n  display: none;\n}\n\n.kaka-grid__message-element--shown {\n  display: block;\n}\n\n.kaka-grid__message-element__message {\n  font-family: Roboto;\n  font-size: 12px;\n  font-size: 0.75rem;\n  min-height: 1em;\n  line-height: 1;\n  display: block;\n  width: 100%;\n}\n";

    var CLASSNAME_ME = 'kaka-grid__message-element';
    var MESSAGE_CLASSNAME_ME = CLASSNAME_ME + "__message";
    var HIDDEN_CLASSNAME_ME = CLASSNAME_ME + "--hidden";
    var SHOWN_CLASSNAME_ME = CLASSNAME_ME + "--shown";
    function createMessageDomElement() {
        style$1.inject('messageElement', messageElementCss);
        var rootElement = createElement('div', {
            classList: [CLASSNAME_ME, HIDDEN_CLASSNAME_ME],
        });
        var messageElement = createElement('span', {
            classList: [MESSAGE_CLASSNAME_ME],
        });
        rootElement.appendChild(messageElement);
        return rootElement;
    }
    var MessageElement = /** @class */ (function () {
        function MessageElement() {
            this._handler = new EventHandler();
            var rootElement = (this._rootElement = createMessageDomElement());
            this._messageElement = rootElement.querySelector("." + MESSAGE_CLASSNAME_ME);
        }
        MessageElement.prototype.dispose = function () {
            this.detach();
            this._handler.dispose();
        };
        MessageElement.prototype.attach = function (grid, col, row, message) {
            var rootElement = this._rootElement;
            var messageElement = this._messageElement;
            rootElement.classList.remove(SHOWN_CLASSNAME_ME);
            rootElement.classList.add(HIDDEN_CLASSNAME_ME);
            if (this._attachCell(grid, col, row)) {
                rootElement.classList.add(SHOWN_CLASSNAME_ME);
                rootElement.classList.remove(HIDDEN_CLASSNAME_ME);
                messageElement.textContent = message.message;
            }
            else {
                this._detach();
            }
        };
        MessageElement.prototype.move = function (grid, col, row) {
            var rootElement = this._rootElement;
            if (rootElement && this._attachCell(grid, col, row)) {
                rootElement.classList.add(SHOWN_CLASSNAME_ME);
                rootElement.classList.remove(HIDDEN_CLASSNAME_ME);
            }
            else {
                this._detach();
            }
        };
        MessageElement.prototype.detach = function () {
            this._detach();
        };
        MessageElement.prototype._detach = function () {
            var rootElement = this._rootElement;
            if (rootElement && rootElement.parentElement) {
                rootElement.parentElement.removeChild(rootElement);
                rootElement.classList.remove(SHOWN_CLASSNAME_ME);
                rootElement.classList.add(HIDDEN_CLASSNAME_ME);
            }
        };
        MessageElement.prototype._attachCell = function (grid, col, row) {
            var rootElement = this._rootElement;
            var _a = grid.getAttachCellsArea(grid.getCellRange(col, row)), element = _a.element, rect = _a.rect;
            var top = rect.bottom;
            var left = rect.left;
            var width = rect.width;
            var frozenRowCount = grid.frozenRowCount;
            var frozenColCount = grid.frozenColCount;
            if (row >= frozenRowCount && frozenRowCount > 0) {
                var frozenRect = grid.getAttachCellsArea(grid.getCellRange(col, frozenRowCount - 1)).rect;
                if (top < frozenRect.bottom) {
                    return false; // 超出范围
                }
            }
            else {
                if (top < 0) {
                    return false; // 超出范围
                }
            }
            if (col >= frozenColCount && frozenColCount > 0) {
                var frozenRect = grid.getAttachCellsArea(grid.getCellRange(frozenColCount - 1, row)).rect;
                if (left < frozenRect.right) {
                    return false; // 超出范围
                }
            }
            else {
                if (left < 0) {
                    return false; // 超出范围
                }
            }
            var offsetHeight = element.offsetHeight;
            var offsetWidth = element.offsetWidth;
            if (offsetHeight < top) {
                return false; // 超出范围
            }
            if (offsetWidth < left) {
                return false; // 超出范围
            }
            rootElement.style.top = top.toFixed() + "px";
            rootElement.style.left = left.toFixed() + "px";
            rootElement.style.width = width.toFixed() + "px";
            if (rootElement.parentElement !== element) {
                element.appendChild(rootElement);
            }
            return true;
        };
        return MessageElement;
    }());

    var errorMessageElementCss = ".kaka-grid__error-message-element {\n  border-top: solid 1px #ff1744;\n  color: #ff1744;\n}\n";

    var CLASSNAME_EME = 'kaka-grid__error-message-element';
    var MESSAGE_CLASSNAME_EME = CLASSNAME_EME + "__message";
    var ErrorMessageElement = /** @class */ (function (_super) {
        __extends(ErrorMessageElement, _super);
        function ErrorMessageElement() {
            var _this = _super.call(this) || this;
            style$1.inject('errorMessageElement', errorMessageElementCss);
            _this._rootElement.classList.add(CLASSNAME_EME);
            _this._messageElement.classList.add(MESSAGE_CLASSNAME_EME);
            return _this;
        }
        return ErrorMessageElement;
    }(MessageElement));

    function drawExclamationMarkBox(context, style, helper) {
        var bgColor = style.bgColor;
        var color = style.color;
        var ctx = context.getContext();
        var rect = context.getRect();
        // draw box
        ctx.fillStyle = bgColor;
        var boxRect = rect.copy();
        boxRect.left = boxRect.right - 24;
        ctx.fillRect(boxRect.left, boxRect.top, boxRect.width, boxRect.height - 1);
        // draw exclamation mark
        var fillColor = color;
        var height = 20;
        var width = height / 5;
        var left = boxRect.left + (boxRect.width - width) / 2;
        var top = boxRect.top + (boxRect.height - height) / 2;
        helper.fillRectWithState(new Rect(left, top, width, (height / 5) * 3), context, { fillColor: fillColor });
        helper.fillRectWithState(new Rect(left, top + (height / 5) * 4, width, height / 5), context, { fillColor: fillColor });
    }
    function drawInformationMarkBox(context, style, helper) {
        var bgColor = style.bgColor;
        var color = style.color;
        var ctx = context.getContext();
        var rect = context.getRect();
        // draw box
        ctx.fillStyle = bgColor;
        var boxRect = rect.copy();
        boxRect.left = boxRect.right - 24;
        ctx.fillRect(boxRect.left, boxRect.top, boxRect.width, boxRect.height - 1);
        // draw i mark
        var fillColor = color;
        var height = 20;
        var width = height / 5;
        var left = boxRect.left + (boxRect.width - width) / 2;
        var top = boxRect.top + (boxRect.height - height) / 2;
        helper.fillRectWithState(new Rect(left, top, width, height / 5), context, {
            fillColor: fillColor,
        });
        helper.fillRectWithState(new Rect(left, top + (height / 5) * 2, width, (height / 5) * 3), context, { fillColor: fillColor });
    }

    var RED_A100 = '#ff8a80';
    var ErrorMessage = /** @class */ (function (_super) {
        __extends(ErrorMessage, _super);
        function ErrorMessage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ErrorMessage.prototype.createMessageElementInternal = function () {
            return new ErrorMessageElement();
        };
        ErrorMessage.prototype.drawCellMessageInternal = function (message, context, style, helper, grid, info) {
            var bgColor = style.bgColor;
            var select = context.getSelection().select;
            if (!cellInRange(grid.getCellRange(context.col, context.row), select.col, select.row) ||
                !grid.hasFocusGrid()) {
                helper.drawBorderWithClip(context, function (ctx) {
                    drawExclamationMarkBox(context, {
                        bgColor: RED_A100,
                        color: bgColor,
                    }, helper);
                });
            }
        };
        return ErrorMessage;
    }(BaseMessage));

    var GREY_L2 = '#e0e0e0';
    var InfoMessage = /** @class */ (function (_super) {
        __extends(InfoMessage, _super);
        function InfoMessage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InfoMessage.prototype.createMessageElementInternal = function () {
            return new MessageElement();
        };
        InfoMessage.prototype.drawCellMessageInternal = function (_message, context, style, helper, grid, _info) {
            var bgColor = style.bgColor;
            var select = context.getSelection().select;
            if (!cellInRange(grid.getCellRange(context.col, context.row), select.col, select.row) ||
                !grid.hasFocusGrid()) {
                helper.drawBorderWithClip(context, function (_ctx) {
                    drawInformationMarkBox(context, {
                        bgColor: GREY_L2,
                        color: bgColor,
                    }, helper);
                });
            }
        };
        return InfoMessage;
    }(BaseMessage));

    var warningMessageElementCss = ".kaka-grid__warning-message-element {\n  border-top: solid 1px #dd2c00;\n  color: #dd2c00;\n}\n";

    var CLASSNAME_WME = 'kaka-grid__warning-message-element';
    var MESSAGE_CLASSNAME_WME = CLASSNAME_WME + "__message";
    var WarningMessageElement = /** @class */ (function (_super) {
        __extends(WarningMessageElement, _super);
        function WarningMessageElement() {
            var _this = _super.call(this) || this;
            style$1.inject('warningMessageElement', warningMessageElementCss);
            _this._rootElement.classList.add(CLASSNAME_WME);
            _this._messageElement.classList.add(MESSAGE_CLASSNAME_WME);
            return _this;
        }
        return WarningMessageElement;
    }(MessageElement));

    var DEEP_ORANGE_A100 = '#ff9e80';
    var WarningMessage = /** @class */ (function (_super) {
        __extends(WarningMessage, _super);
        function WarningMessage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WarningMessage.prototype.createMessageElementInternal = function () {
            return new WarningMessageElement();
        };
        WarningMessage.prototype.drawCellMessageInternal = function (_message, context, style, helper, grid, _info) {
            var bgColor = style.bgColor;
            var select = context.getSelection().select;
            if (!cellInRange(grid.getCellRange(context.col, context.row), select.col, select.row) ||
                !grid.hasFocusGrid()) {
                helper.drawBorderWithClip(context, function (ctx) {
                    drawExclamationMarkBox(context, {
                        bgColor: DEEP_ORANGE_A100,
                        color: bgColor,
                    }, helper);
                });
            }
        };
        return WarningMessage;
    }(BaseMessage));

    var EMPTY_MESSAGE = {
        type: 'error',
        message: null,
    };
    var MESSAGE_INSTANCE_FACTORY = {
        error: function (grid) {
            return new ErrorMessage(grid);
        },
        info: function (grid) {
            return new InfoMessage(grid);
        },
        warning: function (grid) {
            return new WarningMessage(grid);
        },
    };
    function normalizeMessage(message) {
        if (!message || isPromise(message)) {
            return EMPTY_MESSAGE;
        }
        if (typeof message === 'string') {
            return {
                message: message,
                original: message,
                type: 'error',
            };
        }
        var type = message.type || 'error';
        if (type && type in MESSAGE_INSTANCE_FACTORY) {
            return {
                type: type.toLowerCase(),
                message: "" + message.message,
                original: message,
            };
        }
        return {
            type: 'error',
            message: "" + message,
            original: message,
        };
    }
    function hasMessage(message) {
        return !!normalizeMessage(message).message;
    }
    var MessageHandler = /** @class */ (function () {
        function MessageHandler(grid, getMessage) {
            this._attachInfo = null;
            this._grid = grid;
            this._messageInstances = {};
            this._bindGridEvent(grid, getMessage);
        }
        MessageHandler.prototype.dispose = function () {
            var _a;
            var messageInstances = this._messageInstances;
            for (var k in messageInstances) {
                (_a = messageInstances[k]) === null || _a === void 0 ? void 0 : _a.dispose();
            }
        };
        MessageHandler.prototype.drawCellMessage = function (message, context, style, helper, grid, info) {
            if (!hasMessage(message)) {
                return;
            }
            var instance = this._getMessageInstanceOfMessage(message);
            instance.drawCellMessage(normalizeMessage(message), context, style, helper, grid, info);
        };
        MessageHandler.prototype._attach = function (col, row, message) {
            var info = this._attachInfo;
            var instance = this._getMessageInstanceOfMessage(message);
            if (info && info.instance !== instance) {
                info.instance.detachMessageElement();
            }
            instance.attachMessageElement(col, row, normalizeMessage(message));
            this._attachInfo = { col: col, row: row, instance: instance };
        };
        MessageHandler.prototype._move = function (col, row) {
            var info = this._attachInfo;
            if (!info || info.col !== col || info.row !== row) {
                return;
            }
            var instance = info.instance;
            instance.moveMessageElement(col, row);
        };
        MessageHandler.prototype._detach = function () {
            var info = this._attachInfo;
            if (!info) {
                return;
            }
            var instance = info.instance;
            instance.detachMessageElement();
            this._attachInfo = null;
        };
        MessageHandler.prototype._bindGridEvent = function (grid, getMessage) {
            var _this = this;
            var onSelectMessage = function (sel) {
                var message = getMessage(sel.col, sel.row);
                if (!hasMessage(message)) {
                    _this._detach();
                }
                else {
                    _this._attach(sel.col, sel.row, message);
                }
            };
            grid.listen(LG_EVENT_TYPE.SELECTED_CELL, function (e) {
                if (!e.selected) {
                    return;
                }
                if (e.before.col === e.col && e.before.row === e.row) {
                    return;
                }
                onSelectMessage(e);
            });
            grid.listen(LG_EVENT_TYPE.SCROLL, function () {
                var sel = grid.selection.select;
                _this._move(sel.col, sel.row);
            });
            grid.listen(LG_EVENT_TYPE.CHANGED_VALUE, function (e) {
                var sel = grid.selection.select;
                if (sel.col !== e.col || sel.row !== e.row) {
                    return;
                }
                onSelectMessage(e);
            });
            grid.listen(LG_EVENT_TYPE.FOCUS_GRID, function (_e) {
                var sel = grid.selection.select;
                onSelectMessage(sel);
            });
            grid.listen(LG_EVENT_TYPE.BLUR_GRID, function (_e) {
                _this._detach();
            });
        };
        MessageHandler.prototype._getMessageInstanceOfMessage = function (message) {
            var messageInstances = this._messageInstances;
            var type = normalizeMessage(message).type;
            return (messageInstances[type] ||
                (messageInstances[type] = MESSAGE_INSTANCE_FACTORY[type](this._grid)));
        };
        return MessageHandler;
    }());

    var icons$1 = {};

    var parser = new DOMParser();
    var ELEMENT_NODE = 1;
    function findElement(el, test) {
        for (var i = 0; i < el.childNodes.length; i++) {
            var child = el.childNodes[i];
            if (child.nodeType !== ELEMENT_NODE) {
                continue;
            }
            if (test(child)) {
                return child;
            }
            var r = findElement(child, test);
            if (r) {
                return r;
            }
        }
        return null;
    }
    var Svg = /** @class */ (function () {
        function Svg(svgCode) {
            var document = parser.parseFromString(svgCode, 'image/svg+xml');
            this._svg = document.documentElement;
            this._glyphs = {};
            this._glyphUnis = {};
        }
        Object.defineProperty(Svg.prototype, "svg", {
            get: function () {
                return this._svg;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Svg.prototype, "fontFaceElement", {
            get: function () {
                if (!this._fontFace) {
                    this._fontFace = this.findElement(function (child) { return child.tagName.toLowerCase() === 'font-face'; });
                }
                return this._fontFace;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Svg.prototype, "fontElement", {
            get: function () {
                if (!this._font) {
                    this._font = this.findElement(function (child) { return child.tagName.toLowerCase() === 'font'; });
                }
                return this._font;
            },
            enumerable: false,
            configurable: true
        });
        Svg.prototype.findElement = function (test) {
            return findElement(this.svg, test);
        };
        Svg.prototype.findGlyph = function (glyphName) {
            return (this._glyphs[glyphName] ||
                (this._glyphs[glyphName] = this.findElement(function (child) { return child.getAttribute('glyph-name') === glyphName; })));
        };
        Svg.prototype.findGlyphByUnicode = function (unicode) {
            return (this._glyphUnis[unicode] ||
                (this._glyphUnis[unicode] = this.findElement(function (child) { return child.getAttribute('unicode') === unicode; })));
        };
        Svg.prototype.walkAllGlyph = function (callback) {
            var _this = this;
            var walkGlyph = function (el, fn) {
                for (var i = 0; i < el.childNodes.length; i++) {
                    var child = el.childNodes[i];
                    if (child.nodeType !== ELEMENT_NODE) {
                        continue;
                    }
                    var unicode = child.getAttribute('unicode');
                    if (unicode && child.getAttribute('d')) {
                        if (!_this._glyphUnis[unicode]) {
                            _this._glyphUnis[unicode] = child;
                        }
                        var glyphName = child.getAttribute('glyph-name');
                        if (glyphName && !_this._glyphs[glyphName]) {
                            _this._glyphs[glyphName] = child;
                        }
                        fn(child);
                    }
                    else {
                        walkGlyph(child, fn);
                    }
                }
            };
            walkGlyph(this.svg, callback);
        };
        return Svg;
    }());

    var ELEMENT_NODE$1 = 1;
    function polygonToPath(polygon) {
        var points = polygon.getAttribute('points');
        return "M" + points + "z";
    }
    function polylineToPath(polyline) {
        var points = polyline.getAttribute('points');
        return "M" + points;
    }
    function circleToPath(circle) {
        var cx = Number(circle.getAttribute('cx'));
        var cy = Number(circle.getAttribute('cy'));
        var r = Number(circle.getAttribute('r'));
        // https://tyru.github.io/svg-circle-misc-algorithm/
        var SEGMENTS = 8;
        var ANGLE = (2 * Math.PI) / SEGMENTS;
        var anchorX = function (theta) { return r * Math.cos(theta); };
        var anchorY = function (theta) { return r * Math.sin(theta); };
        var controlX = function (theta) {
            return anchorX(theta) + r * Math.tan(ANGLE / 2) * Math.cos(theta - Math.PI / 2);
        };
        var controlY = function (theta) {
            return anchorY(theta) + r * Math.tan(ANGLE / 2) * Math.sin(theta - Math.PI / 2);
        };
        var paths = "M" + (cx + r) + " " + cy;
        for (var index = 1; index <= SEGMENTS; index++) {
            var theta = index * ANGLE;
            paths += "Q" + (controlX(theta) + cx) + " " + (controlY(theta) + cy) + " " + (anchorX(theta) + cx) + " " + (anchorY(theta) + cy);
        }
        return paths;
    }
    function getD(path) {
        var fill = path.getAttribute('fill');
        if (fill === 'none') {
            return '';
        }
        return path.getAttribute('d').replace(/[\n\r]/g, '');
    }
    function elementToPaths(el) {
        var path = '';
        switch (el.tagName.toLowerCase()) {
            case 'path':
            case 'glyph':
                path = getD(el);
                break;
            case 'circle':
                path = circleToPath(el);
                break;
            case 'polygon':
                path = polygonToPath(el);
                break;
            case 'polyline':
                path = polylineToPath(el);
                break;
            case 'g':
                for (var i = 0; i < el.childNodes.length; i++) {
                    var child = el.childNodes[i];
                    if (child.nodeType !== ELEMENT_NODE$1) {
                        continue;
                    }
                    if (!child.getAttribute('fill')) {
                        child.setAttribute('fill', el.getAttribute('fill'));
                    }
                    path += elementToPaths(child);
                }
                break;
            default:
                window.console.warn("unsupported:" + el.tagName, "@ " + el.innerHTML);
        }
        return path;
    }
    function buildObject(obj) {
        if (obj === void 0) { obj = {}; }
        var icon = {
            d: obj.d || '',
            html: obj.html || '',
            height: obj.height || 0,
            width: obj.width || 0,
        };
        if (obj.isGlyph) {
            icon.ud = true;
        }
        if (obj.offsetX !== undefined) {
            icon.offsetX = obj.offsetX;
        }
        if (obj.offsetY !== undefined) {
            icon.offsetY = obj.offsetY;
        }
        return icon;
    }
    function glyphToJSON(svgCode, opt) {
        var svg = new Svg(svgCode);
        function findGlyph() {
            if (opt.glyphName) {
                return svg.findGlyph(opt.glyphName);
            }
            else if (opt.unicode) {
                return svg.findGlyphByUnicode(opt.unicode);
            }
        }
        var fontFace = svg.fontFaceElement || {
            getAttribute: function (qualifiedName) {
                return null;
            },
        };
        var font = svg.fontElement || {
            getAttribute: function (qualifiedName) {
                return null;
            },
        };
        var glyph = findGlyph();
        // 左下角的x坐标值，同y坐标值，右上角的x坐标值，同y坐标值
        // const bbox = (fontFace.getAttribute("bbox") || "").split(" ");
        // bbox.st = {
        // 	x: bbox[0] - 0,
        // 	y: bbox[1] - 0,
        // };
        // bbox.ed = {
        // 	x: bbox[2] - 0,
        // 	y: bbox[3] - 0,
        // };
        var fontHorizAdvX = Number(font.getAttribute('horiz-adv-x')) || 0;
        var fontVertAdvX = Number(font.getAttribute('vert-adv-x')) || 0;
        var horizAdvX = Number(glyph.getAttribute('horiz-adv-x')) || fontHorizAdvX || 0;
        var vertAdvX = Number(glyph.getAttribute('vert-adv-x')) || fontVertAdvX || 0;
        var unitsPerEm = Number(fontFace.getAttribute('units-per-em')) || 1000;
        // const ascent = Number(fontFace.getAttribute("ascent")) || (unitsPerEm - vertAdvX);
        var descent = Number(fontFace.getAttribute('descent')) || vertAdvX;
        var size = unitsPerEm;
        var contentSize = {
            height: vertAdvX || unitsPerEm,
            width: horizAdvX || unitsPerEm,
        };
        if (horizAdvX > size) {
            size = horizAdvX;
        }
        if (vertAdvX > size) {
            size = vertAdvX;
        }
        var offsetX = 0; // -bbox.st.x || 0;
        var offsetY = -descent;
        offsetX += Math.round((size - contentSize.width) / 2);
        offsetY += Math.round((size - contentSize.height) / 2);
        var d = elementToPaths(glyph);
        return buildObject({
            d: d,
            height: size,
            html: glyph.outerHTML,
            isGlyph: true,
            offsetX: offsetX,
            offsetY: offsetY,
            width: size,
        });
    }
    function svgToJSON(svgCode) {
        var svg = new Svg(svgCode).svg;
        var viewBox = (svg.getAttribute('viewBox') || '').split(' ');
        var width = Number(svg.getAttribute('width') || viewBox[2]) || 0;
        var height = Number(svg.getAttribute('height') || viewBox[3]) || 0;
        var offsetX = 0 - Number(viewBox[0]) || 0;
        var offsetY = 0 - Number(viewBox[1]) || 0;
        var d = '';
        for (var i = 0; i < svg.childNodes.length; i++) {
            var el = svg.childNodes[i];
            if (el.nodeType !== ELEMENT_NODE$1) {
                continue;
            }
            d += elementToPaths(el);
        }
        return buildObject({
            d: d,
            height: height,
            html: svgCode,
            offsetX: offsetX,
            offsetY: offsetY,
            width: width,
        });
    }
    var svgToIcon = function (svgCode, opt) {
        if (opt === void 0) { opt = {}; }
        if (opt.glyphName || opt.unicode) {
            return glyphToJSON(svgCode, opt);
        }
        else {
            return svgToJSON(svgCode);
        }
    };

    var add = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><path d=\"M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z\"/></svg>";

    var edit = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><path d=\"M6 34.5V42h7.5l22.13-22.13-7.5-7.5L6 34.5zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z\"/></svg>";

    var arrowDownward = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><path fill=\"#010101\" d=\"M40 24l-2.82-2.82L26 32.34V8h-4v24.34L10.84 21.16 8 24l16 16 16-16z\"/></svg>";

    var arrowUpward = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><path d=\"M8 24l2.83 2.83L22 15.66V40h4V15.66l11.17 11.17L40 24 24 8 8 24z\"/></svg>";

    var star = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>";

    var starBorder = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z\"/></svg>";

    var starHalf = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z\"/></svg>";

    var builtins = {
        add: svgToIcon(add),
        arrowDownward: svgToIcon(arrowDownward),
        arrowUpward: svgToIcon(arrowUpward),
        edit: svgToIcon(edit),
        star: svgToIcon(star),
        starBorder: svgToIcon(starBorder),
        starHalf: svgToIcon(starHalf),
    };
    var svgIcons = {
        get: function () {
            return extend(builtins, icons$1);
        },
    };

    function mag(v) {
        return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
    }
    function dot(u, v) {
        return u[0] * v[0] + u[1] * v[1];
    }
    function ratio$1(u, v) {
        return dot(u, v) / (mag(u) * mag(v));
    }
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    function angle(u, v) {
        var sign = 1.0;
        if (u[0] * v[1] - u[1] * v[0] < 0) {
            sign = -1.0;
        }
        return sign * Math.acos(clamp(ratio$1(u, v), -1, 1));
    }
    function rotClockwise(v, angle) {
        var cost = Math.cos(angle);
        var sint = Math.sin(angle);
        return [cost * v[0] + sint * v[1], -1 * sint * v[0] + cost * v[1]];
    }
    function rotCounterClockwise(v, angle) {
        var cost = Math.cos(angle);
        var sint = Math.sin(angle);
        return [cost * v[0] - sint * v[1], sint * v[0] + cost * v[1]];
    }
    function midPoint(u, v) {
        return [(u[0] - v[0]) / 2.0, (u[1] - v[1]) / 2.0];
    }
    function meanVec(u, v) {
        return [(u[0] + v[0]) / 2.0, (u[1] + v[1]) / 2.0];
    }
    function pointMul(u, v) {
        return [u[0] * v[0], u[1] * v[1]];
    }
    function scale(c, v) {
        return [c * v[0], c * v[1]];
    }
    function sum(u, v) {
        return [u[0] + v[0], u[1] + v[1]];
    }
    // Convert an SVG elliptical arc to a series of canvas commands.
    //
    // x1, y1, x2, y2: start and stop coordinates of the ellipse.
    // rx, ry: radii of the ellipse.
    // phi: rotation of the ellipse.
    // fA: large arc flag.
    // fS: sweep flag.
    function ellipseFromEllipticalArc(ctx, x1, y1, rx, ry, phi, fA, fS, x2, y2) {
        // Convert from endpoint to center parametrization, as detailed in:
        //   http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
        if (rx === 0 || ry === 0) {
            ctx.lineTo(x2, y2);
            return;
        }
        phi *= Math.PI / 180.0;
        rx = Math.abs(rx);
        ry = Math.abs(ry);
        var xPrime = rotClockwise(midPoint([x1, y1], [x2, y2]), phi); // F.6.5.1
        var xPrime2 = pointMul(xPrime, xPrime);
        var rx2 = Math.pow(rx, 2);
        var ry2 = Math.pow(ry, 2);
        var lambda = Math.sqrt(xPrime2[0] / rx2 + xPrime2[1] / ry2);
        if (lambda > 1) {
            rx *= lambda;
            ry *= lambda;
            rx2 = Math.pow(rx, 2);
            ry2 = Math.pow(ry, 2);
        }
        var factor = Math.sqrt(Math.abs(rx2 * ry2 - rx2 * xPrime2[1] - ry2 * xPrime2[0]) /
            (rx2 * xPrime2[1] + ry2 * xPrime2[0]));
        if (fA === fS) {
            factor *= -1.0;
        }
        var cPrime = scale(factor, [(rx * xPrime[1]) / ry, (-ry * xPrime[0]) / rx]); // F.6.5.2
        var c = sum(rotCounterClockwise(cPrime, phi), meanVec([x1, y1], [x2, y2])); // F.6.5.3
        var x1UnitVector = [
            (xPrime[0] - cPrime[0]) / rx,
            (xPrime[1] - cPrime[1]) / ry,
        ];
        var x2UnitVector = [
            (-1.0 * xPrime[0] - cPrime[0]) / rx,
            (-1.0 * xPrime[1] - cPrime[1]) / ry,
        ];
        var theta = angle([1, 0], x1UnitVector); // F.6.5.5
        var deltaTheta = angle(x1UnitVector, x2UnitVector); // F.6.5.6
        var start = theta;
        var end = theta + deltaTheta;
        ctx.save();
        ctx.translate(c[0], c[1]);
        ctx.rotate(phi);
        ctx.scale(rx, ry);
        ctx.arc(0, 0, 1, start, end, !fS);
        ctx.restore();
    }
    var PathCommands = /** @class */ (function () {
        function PathCommands(ctx) {
            var _this = this;
            var lMx;
            var lMy;
            var lx = 0;
            var ly = 0;
            var reflected;
            var lastCommand = '';
            function makeReflected() {
                if ('CcSsQqTt'.indexOf(lastCommand) < 0) {
                    return { x: lx, y: ly };
                }
                return reflected;
            }
            this.M = function (px, py) {
                ctx.moveTo(px, py);
                lMx = px;
                lMy = py;
                lx = px;
                ly = py;
                lastCommand = 'M';
                return _this;
            };
            this.m = function (px, py) { return _this.M(px + lx, py + ly); };
            this.L = function (px, py) {
                ctx.lineTo(px, py);
                lx = px;
                ly = py;
                lastCommand = 'L';
                return _this;
            };
            this.l = function (px, py) { return _this.L(px + lx, py + ly); };
            this.H = function (px) { return _this.L(px, ly); };
            this.h = function (px) { return _this.H(px + lx); };
            this.V = function (py) { return _this.L(lx, py); };
            this.v = function (py) { return _this.V(py + ly); };
            this.Z = function () {
                ctx.closePath();
                lx = lMx;
                ly = lMy;
                lastCommand = 'Z';
                return _this;
            };
            this.z = function () { return _this.Z(); };
            //C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)
            this.C = function (cp1x, cp1y, cp2x, cp2y, px, py) {
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, px, py);
                lx = px;
                ly = py;
                reflected = {
                    x: 2 * px - cp2x,
                    y: 2 * py - cp2y,
                };
                lastCommand = 'C';
                return _this;
            };
            this.c = function (cp1x, cp1y, cp2x, cp2y, px, py) {
                return _this.C(cp1x + lx, cp1y + ly, cp2x + lx, cp2y + ly, px + lx, py + ly);
            };
            //S x2 y2, x y (or s dx2 dy2, dx dy)
            this.S = function (cpx, cpy, px, py) {
                var _a = makeReflected( /*lastCommand*/), cp1x = _a.x, cp1y = _a.y;
                return _this.C(cp1x, cp1y, cpx, cpy, px, py);
            };
            this.s = function (cpx, cpy, px, py) {
                return _this.S(cpx + lx, cpy + ly, px + lx, py + ly);
            };
            //Q x1 y1, x y (or q dx1 dy1, dx dy)
            this.Q = function (cpx, cpy, px, py) {
                ctx.quadraticCurveTo(cpx, cpy, px, py);
                lx = px;
                ly = py;
                reflected = {
                    x: 2 * px - cpx,
                    y: 2 * py - cpy,
                };
                lastCommand = 'Q';
                return _this;
            };
            this.q = function (cpx, cpy, px, py) {
                return _this.Q(cpx + lx, cpy + ly, px + lx, py + ly);
            };
            //T x y (or t dx dy)
            this.T = function (px, py) {
                var _a = makeReflected(), cpx = _a.x, cpy = _a.y;
                return _this.Q(cpx, cpy, px, py);
            };
            this.t = function (px, py) { return _this.T(px + lx, py + ly); };
            //A rx ry x-axis-rotation large-arc-flag sweep-flag x y
            this.A = function (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, px, py) {
                var x1 = lx;
                var y1 = ly;
                ellipseFromEllipticalArc(ctx, x1, y1, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, px, py);
                lx = px;
                ly = py;
                lastCommand = 'A';
                return _this;
            };
            //a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
            this.a = function (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, px, py) {
                return _this.A(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, px + lx, py + ly);
            };
        }
        return PathCommands;
    }());

    function pathTokens(d) {
        var idx = 0;
        return {
            next: function () {
                var s = '';
                while (d.length > idx) {
                    var c = d[idx];
                    idx++;
                    if (' ,\n\r\t'.indexOf(c) > -1) {
                        if (s) {
                            return s;
                        }
                    }
                    else {
                        var type = '.+-1234567890'.indexOf(c) > -1 ? 'num' : 'str';
                        if (type === 'str') {
                            if (s) {
                                idx--;
                                return s;
                            }
                            return c;
                        }
                        if ('-+'.indexOf(c) > -1) {
                            if (s) {
                                idx--;
                                return s;
                            }
                        }
                        if (c === '.') {
                            if (s.indexOf('.') > -1) {
                                idx--;
                                return s;
                            }
                        }
                        s += c;
                    }
                }
                return s || null;
            },
        };
    }
    function command(builder, cmd, argsProvider) {
        if (cmd.toUpperCase() === 'M' ||
            cmd.toUpperCase() === 'L' ||
            cmd.toUpperCase() === 'T') {
            builder.command(cmd, argsProvider.next(), argsProvider.next());
            return cmd === 'M' ? 'L' : cmd === 'm' ? 'l' : cmd;
        }
        else if (cmd.toUpperCase() === 'H' || cmd.toUpperCase() === 'V') {
            builder.command(cmd, argsProvider.next());
            return cmd;
        }
        else if (cmd.toUpperCase() === 'Z') {
            builder.command(cmd);
            return cmd;
        }
        else if (cmd.toUpperCase() === 'C') {
            builder.command(cmd, argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next());
            return cmd;
        }
        else if (cmd.toUpperCase() === 'S' || cmd.toUpperCase() === 'Q') {
            builder.command(cmd, argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next());
            return cmd;
        }
        else if (cmd.toUpperCase() === 'A') {
            builder.command(cmd, argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next(), argsProvider.next());
            return cmd;
        }
        else {
            // https://developer.mozilla.org/ja/docs/Web/SVG/Tutorial/Paths
            console.warn("unsupported:" + cmd);
        }
        return null;
    }
    var PathCommandsParser = /** @class */ (function () {
        function PathCommandsParser() {
            var _this = this;
            this._ops = [];
            this._commands = new PathCommands(this);
            var buildPush = function (op) { return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this._ops.push({
                    op: op,
                    args: args,
                });
            }; };
            this.moveTo = buildPush('moveTo');
            this.lineTo = buildPush('lineTo');
            this.closePath = buildPush('closePath');
            this.bezierCurveTo = buildPush('bezierCurveTo');
            this.quadraticCurveTo = buildPush('quadraticCurveTo');
            this.save = buildPush('save');
            this.translate = buildPush('translate');
            this.rotate = buildPush('rotate');
            this.scale = buildPush('scale');
            this.arc = buildPush('arc');
            this.restore = buildPush('restore');
            this.arcTo = buildPush('arcTo');
            this.ellipse = buildPush('ellipse');
            this.rect = buildPush('rect');
        }
        PathCommandsParser.prototype.command = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var numArgs = args || [];
            for (var i = 0; i < args.length; i++) {
                numArgs[i] -= 0;
            }
            var command = this._commands[name];
            command.apply(this, numArgs);
        };
        PathCommandsParser.prototype.parse = function (d) {
            var ops = (this._ops = []);
            var tokens = pathTokens(d);
            try {
                var cmd_1;
                var subsequentCommand = 'Z';
                var _loop_1 = function () {
                    if (!isNaN(Number(cmd_1))) {
                        var fst_1 = true;
                        var argsProvider = {
                            next: function () {
                                if (fst_1) {
                                    fst_1 = false;
                                    return cmd_1;
                                }
                                return tokens.next();
                            },
                        };
                        subsequentCommand =
                            command(this_1, subsequentCommand, argsProvider) || 'Z';
                    }
                    else {
                        subsequentCommand =
                            command(this_1, cmd_1, tokens) || 'Z';
                    }
                };
                var this_1 = this;
                while ((cmd_1 = tokens.next())) {
                    _loop_1();
                }
            }
            catch (e) {
                console.log("Error: " + d);
                throw e;
            }
            return ops;
        };
        return PathCommandsParser;
    }());

    var parser$1 = new PathCommandsParser();
    var Path2DShim = /** @class */ (function () {
        function Path2DShim(arg) {
            this._ops = [];
            if (arg === undefined) {
                return;
            }
            if (typeof arg === 'string') {
                // try {
                this._ops = parser$1.parse(arg);
                // } catch (e) {
                // 	throw e;
                // }
            }
            else if (arg.hasOwnProperty('_ops')) {
                this._ops = __spreadArrays(arg._ops);
            }
            else {
                throw new Error("Error: " + typeof arg + " is not a valid argument to Path");
            }
        }
        Path2DShim.prototype.arc = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._ops.push({ op: 'arc', args: args });
        };
        Path2DShim.prototype.arcTo = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._ops.push({ op: 'arcTo', args: args });
        };
        Path2DShim.prototype.bezierCurveTo = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._ops.push({ op: 'bezierCurveTo', args: args });
        };
        Path2DShim.prototype.closePath = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._ops.push({ op: 'closePath', args: args });
        };
        Path2DShim.prototype.ellipse = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._ops.push({ op: 'ellipse', args: args });
        };
        Path2DShim.prototype.lineTo = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._ops.push({ op: 'lineTo', args: args });
        };
        Path2DShim.prototype.moveTo = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._ops.push({ op: 'moveTo', args: args });
        };
        Path2DShim.prototype.quadraticCurveTo = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._ops.push({ op: 'quadraticCurveTo', args: args });
        };
        Path2DShim.prototype.rect = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._ops.push({ op: 'rect', args: args });
        };
        return Path2DShim;
    }());
    var CanvasRenderingContext2D = window.CanvasRenderingContext2D;
    var originalFill = CanvasRenderingContext2D.prototype.fill;
    CanvasRenderingContext2D.prototype.fill = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] instanceof Path2DShim) {
            var path = args[0];
            this.beginPath();
            path._ops.forEach(function (op) {
                var fn = _this[op.op];
                fn.apply(_this, op.args);
            });
            originalFill.apply(this, Array.prototype.slice.call(args, 1));
        }
        else {
            originalFill.apply(this, args);
        }
    };

    function getPath2D() {
        if (typeof Path2D !== 'undefined' && !browser.Edge) {
            return Path2D;
        }
        else {
            return Path2DShim;
        }
    }
    var path2DManager = {
        fill: function (module, ctx, x, y, w, h) {
            ctx.save();
            try {
                var width = module.width;
                var height = module.height;
                var upsideDown = module.ud;
                var offsetX = module.x || 0;
                var offsetY = module.y || 0;
                w = w || width;
                h = h || height;
                var xRate = w / width;
                var yRate = h / (upsideDown ? -height : height);
                x = x || 0;
                y = upsideDown ? (y || 0) + -height * yRate : y || 0;
                ctx.translate(x, y);
                ctx.scale(xRate, yRate);
                if (offsetX !== 0 || offsetY !== 0) {
                    ctx.translate(offsetX, offsetY);
                }
                var _Path2D = getPath2D();
                module.path2d = module.path2d || new _Path2D(module.d);
                ctx.fill(module.path2d);
            }
            finally {
                ctx.restore();
            }
        },
        getPath2D: getPath2D,
    };

    function getWidth(ctx, content) {
        return ctx.measureText(content).width;
    }
    function breakWidth(ctx, content, itr, candidateIndex, width) {
        var chars = [];
        var ret = itr.next();
        for (var i = 0; i < candidateIndex && ret !== null; i++, ret = itr.next()) {
            chars.push(ret);
        }
        var beforeWidth = getWidth(ctx, chars.join(''));
        if (beforeWidth > width) {
            while (chars.length) {
                var c = chars.pop();
                beforeWidth -= getWidth(ctx, c);
                if (beforeWidth <= width) {
                    break;
                }
            }
        }
        else if (beforeWidth < width) {
            while (ret !== null) {
                var charWidth = getWidth(ctx, ret);
                if (beforeWidth + charWidth > width) {
                    break;
                }
                chars.push(ret);
                beforeWidth += charWidth;
                ret = itr.next();
            }
        }
        var beforeContent = chars.join('').replace(/\s+$/, '');
        var afterContent = content.slice(beforeContent.length).replace(/^\s+/, '');
        return {
            after: afterContent ? new Inline(afterContent) : null,
            before: beforeContent ? new Inline(beforeContent) : null,
        };
    }
    var Inline = /** @class */ (function () {
        function Inline(content) {
            this._content = isDef(content) ? String(content) : '';
        }
        Inline.prototype.width = function (obj) {
            return getWidth(obj.ctx, this._content);
        };
        Inline.prototype.font = function () {
            return null;
        };
        Inline.prototype.color = function () {
            return null;
        };
        Inline.prototype.canDraw = function () {
            return true;
        };
        Inline.prototype.onReady = function (_callback) { };
        Inline.prototype.draw = function (_a) {
            var ctx = _a.ctx, canvasHelper = _a.canvasHelper, rect = _a.rect, offset = _a.offset, offsetLeft = _a.offsetLeft, offsetRight = _a.offsetRight, offsetTop = _a.offsetTop, offsetBottom = _a.offsetBottom;
            canvasHelper.fillTextRect(ctx, this._content, rect.left, rect.top, rect.width, rect.height, {
                offset: offset + 1,
                padding: {
                    bottom: offsetBottom,
                    left: offsetLeft,
                    right: offsetRight,
                    top: offsetTop,
                },
            });
        };
        Inline.prototype.canBreak = function () {
            return !!this._content;
        };
        Inline.prototype.splitIndex = function (index) {
            var content = this._content;
            var itr = str.genChars(content);
            var chars = [];
            var ret = itr.next();
            for (var i = 0; i < index && ret !== null; i++, ret = itr.next()) {
                chars.push(ret);
            }
            var beforeContent = chars.join('');
            var afterContent = content.slice(beforeContent.length);
            return {
                after: afterContent ? new Inline(afterContent) : null,
                before: beforeContent ? new Inline(beforeContent) : null,
            };
        };
        Inline.prototype.breakWord = function (ctx, width) {
            var content = this._content;
            var allWidth = this.width({ ctx: ctx });
            var candidate = Math.floor((this._content.length * width) / allWidth);
            var itr = str.genWords(content);
            return breakWidth(ctx, content, itr, candidate, width);
        };
        Inline.prototype.breakAll = function (ctx, width) {
            var content = this._content;
            var allWidth = this.width({ ctx: ctx });
            var candidate = Math.floor((this._content.length * width) / allWidth);
            var itr = str.genChars(content);
            return breakWidth(ctx, content, itr, candidate, width);
        };
        Inline.prototype.toString = function () {
            return this._content;
        };
        return Inline;
    }());

    var InlineDrawer = /** @class */ (function (_super) {
        __extends(InlineDrawer, _super);
        function InlineDrawer(_a) {
            var draw = _a.draw, width = _a.width, 
            // height,
            color = _a.color;
            var _this = _super.call(this) || this;
            _this._draw = draw;
            _this._width = width;
            // this._height = height
            _this._color = color;
            return _this;
        }
        InlineDrawer.prototype.width = function (_arg) {
            return this._width;
        };
        InlineDrawer.prototype.font = function () {
            return null;
        };
        InlineDrawer.prototype.color = function () {
            var _a;
            return (_a = this._color) !== null && _a !== void 0 ? _a : null;
        };
        InlineDrawer.prototype.canDraw = function () {
            return true;
        };
        InlineDrawer.prototype.onReady = function (_callback) { };
        InlineDrawer.prototype.draw = function (_a) {
            var ctx = _a.ctx, canvasHelper = _a.canvasHelper, rect = _a.rect, offset = _a.offset, offsetLeft = _a.offsetLeft, offsetRight = _a.offsetRight, offsetTop = _a.offsetTop, offsetBottom = _a.offsetBottom;
            this._draw({
                ctx: ctx,
                canvasHelper: canvasHelper,
                rect: rect,
                offset: offset,
                offsetLeft: offsetLeft,
                offsetRight: offsetRight,
                offsetTop: offsetTop,
                offsetBottom: offsetBottom,
            });
        };
        InlineDrawer.prototype.canBreak = function () {
            return false;
        };
        InlineDrawer.prototype.toString = function () {
            return '';
        };
        return InlineDrawer;
    }(Inline));

    //see https://github.com/typekit/webfontloader
    function computeStyle(font) {
        return [
            {
                display: 'block',
                position: 'absolute',
                top: '-9999px',
                left: '-9999px',
                width: 'auto',
                height: 'auto',
                margin: '0',
                padding: '0',
                'white-space': 'nowrap',
                font: font,
            },
            {
                'font-variant': 'normal',
                'font-size': '300px',
                'font-style': 'normal',
                'font-weight': '400',
                'line-height': 'normal',
            },
        ];
    }
    var FontRuler = /** @class */ (function () {
        function FontRuler(font, testStr) {
            var e = document.createElement('span');
            e.setAttribute('aria-hidden', 'true');
            e.textContent = testStr || 'BESbswy';
            computeStyle(font).forEach(function (style) {
                for (var k in style) {
                    var key = k;
                    e.style[key] = style[key];
                }
            });
            document.body.appendChild(e);
            this._el = e;
        }
        FontRuler.prototype.getWidth = function () {
            return this._el.offsetWidth;
        };
        FontRuler.prototype.remove = function () {
            document.body.removeChild(this._el);
        };
        return FontRuler;
    }());

    //see https://github.com/typekit/webfontloader
    var LastResortFonts = {
        SERIF: 'serif',
        SANS_SERIF: 'sans-serif',
    };
    var watchRunners = {};
    var FontWatchRunner = /** @class */ (function () {
        function FontWatchRunner(font, testStr) {
            this.activeCallbacks = [];
            this.inactiveCallbacks = [];
            this.status = null;
            this.lastResortWidths_ = {};
            this.fontRulerA_ = new FontRuler(font + "," + LastResortFonts.SERIF, testStr);
            this.fontRulerB_ = new FontRuler(font + "," + LastResortFonts.SANS_SERIF, testStr);
            var lastResortRulerA = new FontRuler("4px " + LastResortFonts.SERIF, testStr);
            var lastResortRulerB = new FontRuler("4px " + LastResortFonts.SANS_SERIF, testStr);
            //start
            this.lastResortWidths_[LastResortFonts.SERIF] = lastResortRulerA.getWidth();
            this.lastResortWidths_[LastResortFonts.SANS_SERIF] = lastResortRulerB.getWidth();
            lastResortRulerA.remove();
            lastResortRulerB.remove();
            this.started_ = Date.now();
            this.check_();
        }
        FontWatchRunner.load = function (font, testStr, activeCallback, inactiveCallback) {
            var c = watchRunners[font] || (watchRunners[font] = {});
            testStr += '';
            var runner;
            if (c[testStr]) {
                runner = c[testStr];
            }
            else {
                runner = c[testStr] = new FontWatchRunner(font, testStr);
            }
            runner.then(activeCallback, inactiveCallback);
        };
        FontWatchRunner.prototype.then = function (activeCallback, inactiveCallback) {
            if (this.status) {
                if (this.status !== 'ng') {
                    activeCallback();
                }
                else {
                    inactiveCallback();
                }
            }
            else {
                this.activeCallbacks.push(activeCallback);
                this.inactiveCallbacks.push(inactiveCallback);
            }
        };
        FontWatchRunner.prototype.check_ = function () {
            var _this = this;
            var widthA = this.fontRulerA_.getWidth();
            var widthB = this.fontRulerB_.getWidth();
            if (this.isFallbackFont_(widthA, widthB) ||
                this.isLastResortFont_(widthA, widthB)) {
                if (Date.now() - this.started_ >= 3000) {
                    // timeout
                    if (this.isLastResortFont_(widthA, widthB)) {
                        this.finish_(this.activeCallbacks);
                        this.status = 'ok';
                    }
                    else {
                        this.finish_(this.inactiveCallbacks);
                        this.status = 'ng';
                    }
                }
                else {
                    setTimeout(function () {
                        _this.check_();
                    }, 50);
                }
            }
            else {
                this.finish_(this.activeCallbacks);
                this.status = 'ok';
            }
        };
        FontWatchRunner.prototype.isFallbackFont_ = function (a, b) {
            return (this.widthMatches_(a, LastResortFonts.SERIF) &&
                this.widthMatches_(b, LastResortFonts.SANS_SERIF));
        };
        FontWatchRunner.prototype.widthsMatchLastResortWidths_ = function (a, b) {
            for (var font in LastResortFonts) {
                if (LastResortFonts.hasOwnProperty(font)) {
                    if (this.widthMatches_(a, LastResortFonts[font]) &&
                        this.widthMatches_(b, LastResortFonts[font])) {
                        return true;
                    }
                }
            }
            return false;
        };
        FontWatchRunner.prototype.widthMatches_ = function (width, lastResortFont) {
            return width === this.lastResortWidths_[lastResortFont];
        };
        FontWatchRunner.prototype.isLastResortFont_ = function (a, b) {
            return hasWebKitFallbackBug() && this.widthsMatchLastResortWidths_(a, b);
        };
        FontWatchRunner.prototype.finish_ = function (callbacks) {
            var _this = this;
            setTimeout(function () {
                _this.fontRulerA_.remove();
                _this.fontRulerB_.remove();
                callbacks.forEach(function (cb) { return cb(); });
            }, 0);
        };
        return FontWatchRunner;
    }());
    var HAS_WEBKIT_FALLBACK_BUG = null;
    function hasWebKitFallbackBug() {
        if (HAS_WEBKIT_FALLBACK_BUG === null) {
            var match = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
            HAS_WEBKIT_FALLBACK_BUG =
                !!match &&
                    (parseInt(match[1], 10) < 536 ||
                        (parseInt(match[1], 10) === 536 && parseInt(match[2], 10) <= 11));
        }
        return HAS_WEBKIT_FALLBACK_BUG;
    }

    var loads = {
        all: false,
    };
    var load;
    var check;
    if (isNode) {
        load = function (font, testStr, callback) {
            callback();
        };
        check = function () {
            return false;
        };
    }
    else {
        var legacy = !document.fonts;
        load = legacy
            ? function (font, testStr, callback) {
                // for legacy(IE)
                if (loads[font + " @ " + testStr]) {
                    callback();
                    return;
                }
                FontWatchRunner.load(font, testStr, function () {
                    loads[font + " @ " + testStr] = true;
                    callback();
                }, function () {
                    loads[font + " @ " + testStr] = true;
                    callback();
                });
            }
            : function (font, testStr, callback) {
                if (loads.all || loads[font]) {
                    callback();
                    return;
                }
                document.fonts.ready.then(function () {
                    loads.all = true;
                });
                document.fonts.load(font).then(function () {
                    loads[font] = true;
                    callback();
                });
            };
        check = legacy
            ? function (font, testStr) {
                // for legacy(IE)
                if (loads[font + " @ " + testStr]) {
                    return true;
                }
                load(font, testStr, function () {
                    // nothing
                });
                return false;
            }
            : function (font, testStr) {
                if (loads.all || loads[font]) {
                    return true;
                }
                if (!document.fonts.check(font)) {
                    load(font, testStr, function () {
                        // nothing
                    });
                    return false;
                }
                return true;
            };
    }
    var fonts = {
        check: check,
        load: load,
    };

    var InlineIcon = /** @class */ (function (_super) {
        __extends(InlineIcon, _super);
        function InlineIcon(icon) {
            var _this = _super.call(this) || this;
            _this._icon = icon || {};
            return _this;
        }
        InlineIcon.prototype.width = function (_a) {
            var ctx = _a.ctx;
            var icon = this._icon;
            if (icon.width) {
                return icon.width;
            }
            if (icon.font && fonts.check(icon.font, icon.content || '')) {
                ctx.save();
                ctx.canvas.style.letterSpacing = 'normal';
                try {
                    ctx.font = icon.font || ctx.font;
                    return ctx.measureText(icon.content || '').width;
                }
                finally {
                    ctx.canvas.style.letterSpacing = '';
                    ctx.restore();
                }
            }
            return 0; // unknown
        };
        InlineIcon.prototype.font = function () {
            var _a;
            return (_a = this._icon.font) !== null && _a !== void 0 ? _a : null;
        };
        InlineIcon.prototype.color = function () {
            var _a;
            return (_a = this._icon.color) !== null && _a !== void 0 ? _a : null;
        };
        InlineIcon.prototype.canDraw = function () {
            var icon = this._icon;
            return icon.font ? fonts.check(icon.font, icon.content || '') : true;
        };
        InlineIcon.prototype.onReady = function (callback) {
            var icon = this._icon;
            if (icon.font && !fonts.check(icon.font, icon.content || '')) {
                fonts.load(icon.font, icon.content || '', callback);
            }
        };
        InlineIcon.prototype.draw = function (_a) {
            var ctx = _a.ctx, canvasHelper = _a.canvasHelper, rect = _a.rect, offset = _a.offset, offsetLeft = _a.offsetLeft, offsetRight = _a.offsetRight, offsetTop = _a.offsetTop, offsetBottom = _a.offsetBottom;
            var icon = this._icon;
            if (icon.content) {
                ctx.canvas.style.letterSpacing = 'normal';
                try {
                    ctx.font = ctx.font; // To apply letterSpacing, we need to reset it.
                    canvasHelper.fillTextRect(ctx, icon.content, rect.left, rect.top, rect.width, rect.height, {
                        offset: offset + 1,
                        padding: {
                            bottom: offsetBottom,
                            left: offsetLeft,
                            right: offsetRight,
                            top: offsetTop,
                        },
                    });
                }
                finally {
                    ctx.canvas.style.letterSpacing = '';
                }
            }
        };
        InlineIcon.prototype.canBreak = function () {
            return false;
        };
        InlineIcon.prototype.toString = function () {
            return '';
        };
        return InlineIcon;
    }(Inline));

    var InlineImage = /** @class */ (function (_super) {
        __extends(InlineImage, _super);
        function InlineImage(_a) {
            var src = _a.src, width = _a.width, height = _a.height, imageLeft = _a.imageLeft, imageTop = _a.imageTop, imageWidth = _a.imageWidth, imageHeight = _a.imageHeight;
            var _this = _super.call(this) || this;
            _this._inlineImgPromise = null;
            _this._inlineImg = null;
            _this._src = src;
            _this._width = width;
            _this._height = height;
            _this._imageLeft = imageLeft;
            _this._imageTop = imageTop;
            _this._imageWidth = imageWidth;
            _this._imageHeight = imageHeight;
            _this._onloaded = [];
            if (isPromise(src)) {
                src.then(function (s) {
                    _this._src = s;
                    _this._loadImage(s);
                });
            }
            else {
                _this._loadImage(src);
            }
            return _this;
        }
        InlineImage.prototype.width = function (_arg) {
            var _a, _b;
            return this._width || ((_b = (_a = this._inlineImg) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 0);
        };
        InlineImage.prototype.font = function () {
            return null;
        };
        InlineImage.prototype.color = function () {
            return null;
        };
        InlineImage.prototype.canDraw = function () {
            return !!this._inlineImg;
        };
        InlineImage.prototype.onReady = function (callback) {
            if (isPromise(this._src) || isPromise(this._inlineImgPromise)) {
                this._onloaded.push(function () { return callback(); });
            }
        };
        InlineImage.prototype.draw = function (_a) {
            var ctx = _a.ctx, canvasHelper = _a.canvasHelper, rect = _a.rect, offset = _a.offset, offsetLeft = _a.offsetLeft, offsetRight = _a.offsetRight, offsetTop = _a.offsetTop, offsetBottom = _a.offsetBottom;
            var img = this._inlineImg;
            canvasHelper.drawInlineImageRect(ctx, img, this._imageLeft || 0, this._imageTop || 0, this._imageWidth || img.width, this._imageHeight || img.height, this._width || img.width, this._height || img.height, rect.left, rect.top, rect.width, rect.height, {
                offset: offset + 1,
                padding: {
                    bottom: offsetBottom,
                    left: offsetLeft,
                    right: offsetRight,
                    top: offsetTop,
                },
            });
        };
        InlineImage.prototype.canBreak = function () {
            return false;
        };
        InlineImage.prototype.toString = function () {
            return '';
        };
        InlineImage.prototype._loadImage = function (src) {
            var _this = this;
            var img = (this._inlineImgPromise = getCacheOrLoad('InlineImage', 50, src));
            if (isPromise(img)) {
                img.then(function (i) {
                    _this._inlineImg = i;
                    _this._onloaded.forEach(function (fn) { return fn(); });
                });
            }
            else {
                this._inlineImg = img;
            }
        };
        return InlineImage;
    }(Inline));

    var InlinePath2D = /** @class */ (function (_super) {
        __extends(InlinePath2D, _super);
        function InlinePath2D(_a) {
            var path = _a.path, width = _a.width, height = _a.height, color = _a.color;
            var _this = _super.call(this) || this;
            // Path2D的Polyfill不会反映在IE中，除非是这个时间
            var Path2D = path2DManager.getPath2D();
            _this._path = new Path2D(path);
            _this._width = width;
            _this._height = height;
            _this._color = color;
            return _this;
        }
        InlinePath2D.prototype.width = function (_arg) {
            return this._width;
        };
        InlinePath2D.prototype.font = function () {
            return null;
        };
        InlinePath2D.prototype.color = function () {
            var _a;
            return (_a = this._color) !== null && _a !== void 0 ? _a : null;
        };
        InlinePath2D.prototype.canDraw = function () {
            return true;
        };
        InlinePath2D.prototype.onReady = function (_callback) { };
        InlinePath2D.prototype.draw = function (_a) {
            var ctx = _a.ctx, canvasHelper = _a.canvasHelper, rect = _a.rect, offset = _a.offset, offsetLeft = _a.offsetLeft, offsetRight = _a.offsetRight, offsetTop = _a.offsetTop, offsetBottom = _a.offsetBottom;
            offset++;
            var padding = {
                bottom: offsetBottom,
                left: offsetLeft,
                right: offsetRight,
                top: offsetTop,
            };
            ctx.save();
            try {
                ctx.beginPath();
                ctx.rect(rect.left, rect.top, rect.width, rect.height);
                // clip
                ctx.clip();
                var pos = calcStartPosition(ctx, rect, this._width, this._height, {
                    offset: offset,
                    padding: padding,
                });
                ctx.translate(pos.x, pos.y);
                ctx.fill(this._path);
            }
            finally {
                ctx.restore();
            }
        };
        InlinePath2D.prototype.canBreak = function () {
            return false;
        };
        InlinePath2D.prototype.toString = function () {
            return '';
        };
        return InlinePath2D;
    }(Inline));

    function buildSvgDataUrl(svg) {
        var data = typeof svg === 'string' ? svg : new XMLSerializer().serializeToString(svg);
        var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(data); // svg -> base64
        return url;
    }
    function getSvgElement(svg) {
        var el;
        if (typeof svg === 'string') {
            var parser = new DOMParser();
            var doc = parser.parseFromString(svg, 'image/svg+xml');
            var nodes = doc.children || doc.childNodes;
            el = nodes[0];
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i] instanceof SVGElement) {
                    el = nodes[i];
                    break;
                }
            }
        }
        else {
            el = svg;
        }
        return el;
    }
    var InlineSvg = /** @class */ (function (_super) {
        __extends(InlineSvg, _super);
        function InlineSvg(_a) {
            var svg = _a.svg, width = _a.width, height = _a.height;
            var _b, _c;
            var _this = this;
            var svgElem = then(svg, getSvgElement);
            var elmWidth = !isPromise(svgElem)
                ? (_b = svgElem.getAttribute('width')) !== null && _b !== void 0 ? _b : undefined : undefined;
            var elmHeight = !isPromise(svgElem)
                ? (_c = svgElem.getAttribute('height')) !== null && _c !== void 0 ? _c : undefined : undefined;
            var context = {
                full: 0,
                em: 0
            };
            var numElmWidth = elmWidth != null ? toPx(elmWidth, context) : undefined;
            var numElmHeight = elmHeight != null ? toPx(elmHeight, context) : undefined;
            _this = _super.call(this, {
                src: then(svg, buildSvgDataUrl),
                width: width || numElmWidth,
                height: height || numElmHeight,
                imageWidth: numElmWidth,
                imageHeight: numElmHeight,
            }) || this;
            return _this;
        }
        InlineSvg.prototype.canBreak = function () {
            return false;
        };
        InlineSvg.prototype.toString = function () {
            return '';
        };
        return InlineSvg;
    }(InlineImage));

    function drawRegisteredIcon(ctx, icon, drawWidth, drawHeight, left, top, width, height, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 2 : _c, padding = _b.padding;
        var rect = {
            bottom: top + height,
            height: height,
            left: left,
            right: left + width,
            top: top,
            width: width,
        };
        ctx.save();
        try {
            ctx.beginPath();
            ctx.rect(rect.left, rect.top, rect.width, rect.height);
            // clip
            ctx.clip();
            var pos = calcStartPosition(ctx, rect, drawWidth, drawHeight, {
                offset: offset,
                padding: padding,
            });
            path2DManager.fill(icon, ctx, pos.x, pos.y, drawWidth, drawHeight);
        }
        finally {
            ctx.restore();
        }
    }
    function isIconConstructorOption(icon) {
        if (icon.font && icon.content) {
            return true;
        }
        return false;
    }
    function isInlineImageConstructorOption(icon) {
        if (icon.src) {
            return true;
        }
        return false;
    }
    function isInlineSvgConstructorOption(icon) {
        if (icon.path) {
            return true;
        }
        return false;
    }
    function iconOf(icon) {
        if (icon instanceof Inline) {
            return icon;
        }
        if (!icon) {
            return null;
        }
        if (isIconConstructorOption(icon)) {
            return new InlineIcon(icon);
        }
        if (isInlineImageConstructorOption(icon)) {
            return new InlineImage({
                height: icon.width,
                src: icon.src,
                width: icon.width,
            });
        }
        if (icon.svg) {
            return new InlineSvg({
                height: icon.width,
                svg: icon.svg,
                width: icon.width,
            });
        }
        if (isInlineSvgConstructorOption(icon)) {
            return new InlinePath2D({
                color: icon.color,
                height: icon.width,
                path: icon.path,
                width: icon.width,
            });
        }
        var regedIcons = svgIcons.get();
        if (icon.name && regedIcons[icon.name]) {
            var regedIcon_1 = regedIcons[icon.name];
            var width_1 = icon.width || Math.max(regedIcon_1.width, regedIcon_1.height);
            return new InlineDrawer({
                draw: function (_a) {
                    var ctx = _a.ctx, rect = _a.rect, offset = _a.offset, offsetLeft = _a.offsetLeft, offsetRight = _a.offsetRight, offsetTop = _a.offsetTop, offsetBottom = _a.offsetBottom;
                    drawRegisteredIcon(ctx, regedIcon_1, width_1, width_1, rect.left, rect.top, rect.width, rect.height, {
                        offset: offset + 1,
                        padding: {
                            bottom: offsetBottom,
                            left: offsetLeft,
                            right: offsetRight,
                            top: offsetTop,
                        },
                    });
                },
                color: icon.color,
                height: width_1,
                width: width_1,
            });
        }
        return new InlineIcon(icon);
    }
    function of$7(content) {
        if (!isDef(content)) {
            return null;
        }
        if (content instanceof Inline) {
            return content;
        }
        return new Inline(content);
    }
    function buildInlines(icons, inline) {
        var result = [];
        if (icons) {
            result.push.apply(result, icons.map(function (icon) { return iconOf(icon); }).filter(isDef));
        }
        if (Array.isArray(inline)
        // && inline.filter(il => il instanceof Inline).length <- ?
        ) {
            result.push.apply(result, inline.map(function (il) { return of$7(il); }).filter(isDef));
        }
        else {
            var il = of$7(inline);
            if (il) {
                result.push(il);
            }
        }
        return result;
    }
    function string(inline) {
        return buildInlines(undefined, inline).join('');
    }

    function getThemeColor(grid) {
        var names = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            names[_i - 1] = arguments[_i];
        }
        var gridThemeColor = getChainSafe.apply(void 0, __spreadArrays([grid.theme], names));
        if (!isDef(gridThemeColor)) {
            // use default theme
            return getChainSafe.apply(void 0, __spreadArrays([themes$1.getDefault()], names));
        }
        if (typeof gridThemeColor !== 'function') {
            return gridThemeColor;
        }
        var defaultThemeColor;
        return (function (args) {
            var color = gridThemeColor(args);
            if (isDef(color)) {
                // use grid theme
                return color;
            }
            // use default theme
            defaultThemeColor =
                defaultThemeColor || getChainSafe.apply(void 0, __spreadArrays([themes$1.getDefault()], names));
            return getOrApply(defaultThemeColor, args);
        });
    }
    var ThemeResolver = /** @class */ (function () {
        function ThemeResolver(grid) {
            this._checkbox = null;
            this._radioButton = null;
            this._button = null;
            this._header = null;
            this._switch = null;
            this._tree = null;
            this._grid = grid;
        }
        ThemeResolver.prototype.getThemeColor = function () {
            var name = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                name[_i] = arguments[_i];
            }
            return getThemeColor.apply(void 0, __spreadArrays([this._grid], name));
        };
        Object.defineProperty(ThemeResolver.prototype, "underlayBackgroundColor", {
            get: function () {
                return getThemeColor(this._grid, 'underlayBackgroundColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "font", {
            // font
            get: function () {
                return getThemeColor(this._grid, 'font');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "frozenRowsFont", {
            get: function () {
                return getThemeColor(this._grid, 'frozenRowsFont');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "color", {
            // color
            get: function () {
                return getThemeColor(this._grid, 'color');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "frozenRowsColor", {
            get: function () {
                return getThemeColor(this._grid, 'frozenRowsColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "defaultBgColor", {
            // background
            get: function () {
                return getThemeColor(this._grid, 'defaultBgColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "frozenRowsBgColor", {
            get: function () {
                return getThemeColor(this._grid, 'frozenRowsBgColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "focusBgColor", {
            get: function () {
                return getThemeColor(this._grid, 'focusBgColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "selectionBgColor", {
            get: function () {
                return getThemeColor(this._grid, 'selectionBgColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "highlightBgColor", {
            get: function () {
                return getThemeColor(this._grid, 'highlightBgColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "selectionDragBgColor", {
            get: function () {
                return getThemeColor(this._grid, 'selectionDragBgColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "borderColor", {
            // border
            get: function () {
                return getThemeColor(this._grid, 'borderColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "frozenRowsBorderColor", {
            get: function () {
                return getThemeColor(this._grid, 'frozenRowsBorderColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "highlightBorderColor", {
            get: function () {
                return getThemeColor(this._grid, 'highlightBorderColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "gridBorderColor", {
            // grid border
            get: function () {
                return getThemeColor(this._grid, 'gridBorderColor');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "gridBorderWidth", {
            get: function () {
                return getThemeColor(this._grid, 'gridBorderWidth');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "defaultRowHeight", {
            // size
            get: function () {
                return getThemeColor(this._grid, 'defaultRowHeight');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "defaultColWidth", {
            get: function () {
                return getThemeColor(this._grid, 'defaultColWidth');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "highlightBorderWidth", {
            get: function () {
                return getThemeColor(this._grid, 'highlightBorderWidth');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "checkbox", {
            // other
            get: function () {
                var grid = this._grid;
                return (this._checkbox ||
                    (this._checkbox = {
                        get uncheckBgColor() {
                            return getThemeColor(grid, 'checkbox', 'uncheckBgColor');
                        },
                        get checkBgColor() {
                            return getThemeColor(grid, 'checkbox', 'checkBgColor');
                        },
                        get borderColor() {
                            return getThemeColor(grid, 'checkbox', 'borderColor');
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "radioButton", {
            get: function () {
                var grid = this._grid;
                return (this._radioButton ||
                    (this._radioButton = {
                        get checkColor() {
                            return getThemeColor(grid, 'radioButton', 'checkColor');
                        },
                        get uncheckBorderColor() {
                            return getThemeColor(grid, 'radioButton', 'uncheckBorderColor');
                        },
                        get checkBorderColor() {
                            return getThemeColor(grid, 'radioButton', 'checkBorderColor');
                        },
                        get uncheckBgColor() {
                            return getThemeColor(grid, 'radioButton', 'uncheckBgColor');
                        },
                        get checkBgColor() {
                            return getThemeColor(grid, 'radioButton', 'checkBgColor');
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "button", {
            get: function () {
                var grid = this._grid;
                return (this._button ||
                    (this._button = {
                        get color() {
                            return getThemeColor(grid, 'button', 'color');
                        },
                        get bgColor() {
                            return getThemeColor(grid, 'button', 'bgColor');
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "header", {
            get: function () {
                var grid = this._grid;
                return (this._header ||
                    (this._header = {
                        get sortArrowColor() {
                            return getThemeColor(grid, 'header', 'sortArrowColor');
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "switch", {
            get: function () {
                var grid = this._grid;
                return (this._switch ||
                    (this._switch = {
                        get uncheckBgColor() {
                            return getThemeColor(grid, 'switch', 'uncheckBgColor');
                        },
                        get checkBgColor() {
                            return getThemeColor(grid, 'switch', 'checkBgColor');
                        },
                        get borderColor() {
                            return getThemeColor(grid, 'switch', 'borderColor');
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeResolver.prototype, "tree", {
            get: function () {
                var grid = this._grid;
                return (this._tree ||
                    (this._tree = {
                        get lineColor() {
                            return getThemeColor(grid, 'tree', 'lineColor');
                        },
                        get buttonColor() {
                            return getThemeColor(grid, 'tree', 'buttonColor');
                        },
                        get buttonBgColor() {
                            return getThemeColor(grid, 'tree', 'buttonBgColor');
                        },
                        get buttonBorderColor() {
                            return getThemeColor(grid, 'tree', 'buttonBorderColor');
                        },
                        get linkColor() {
                            return getThemeColor(grid, 'tree', 'linkColor');
                        },
                    }));
            },
            enumerable: false,
            configurable: true
        });
        return ThemeResolver;
    }());

    var SwitchStyle$1;
    (function (SwitchStyle) {
        SwitchStyle[SwitchStyle["default"] = 0] = "default";
        SwitchStyle[SwitchStyle["iPhone"] = 1] = "iPhone";
    })(SwitchStyle$1 || (SwitchStyle$1 = {}));
    var SWITCH_STYLE = SwitchStyle$1.default;
    var INLINE_ELLIPSIS = of$7('\u2026');
    function invalidateCell(context, grid) {
        grid.invalidateCell(context.col, context.row);
    }
    function getColor(color, col, row, grid, context) {
        return getOrApply(color, {
            col: col,
            context: context,
            grid: grid,
            row: row,
        });
    }
    function getFont(font, col, row, grid, context) {
        if (font == null) {
            return undefined;
        }
        return getOrApply(font, {
            col: col,
            row: row,
            grid: grid,
            context: context,
        });
    }
    function testFontLoad(font, value, context, grid) {
        if (font) {
            if (!fonts.check(font, value)) {
                fonts.load(font, value, function () { return invalidateCell(context, grid); });
                return false;
            }
        }
        return true;
    }
    function getGridThemeColor(grid, theme, col, row, color) {
        if (!color) {
            (color = theme.color);
            // header color
            var isFrozenCell = grid.isFrozenCell(col, row);
            if (isFrozenCell && isFrozenCell.row) {
                color = theme.frozenRowsColor;
            }
        }
        return color;
    }
    function getGridThemeFont(grid, theme, col, row, font) {
        if (!font) {
            (font = theme.font);
            // header color
            var isFrozenCell = grid.isFrozenCell(col, row);
            if (isFrozenCell && isFrozenCell.row) {
                font = theme.frozenRowsFont;
            }
        }
        return font;
    }
    function drawInlines(ctx, inlines, rect, offset, offsetTop, offsetBottom, col, row, grid) {
        function drawInline(inline, offsetLeft, offsetRight) {
            if (inline.canDraw()) {
                ctx.save();
                try {
                    ctx.fillStyle = getColor(inline.color() || ctx.fillStyle, col, row, grid, ctx);
                    ctx.font = inline.font() || ctx.font;
                    inline.draw({
                        canvasHelper: canvasHelper,
                        ctx: ctx,
                        offset: offset,
                        offsetBottom: offsetBottom,
                        offsetLeft: offsetLeft,
                        offsetRight: offsetRight,
                        offsetTop: offsetTop,
                        rect: rect,
                    });
                }
                finally {
                    ctx.restore();
                }
            }
            else {
                inline.onReady(function () { return grid.invalidateCell(col, row); });
                // noop
            }
        }
        if (inlines.length === 1) {
            // 长度为1时，不需要计算宽度
            var inline = inlines[0];
            drawInline(inline, 0, 0);
        }
        else if (inlines.length > 1) {
            var inlineWidths_1 = inlines.map(function (inline) { return (inline.width({ ctx: ctx }) || 0) - 0; });
            var offsetRight_1 = inlineWidths_1.reduce(function (a, b) { return a + b; });
            var offsetLeft_1 = 0;
            inlines.forEach(function (inline, index) {
                var inlineWidth = inlineWidths_1[index];
                offsetRight_1 -= inlineWidth;
                drawInline(inline, offsetLeft_1, offsetRight_1);
                offsetLeft_1 += inlineWidth;
            });
        }
    }
    function buildInlines$1(icons, inline) {
        return buildInlines(icons, isDef(inline) ? inline : '');
    }
    function inlineToString(inline) {
        return string(inline);
    }
    function getOverflowInline(textOverflow) {
        if (!isAllowOverflow(textOverflow) || textOverflow === 'ellipsis') {
            return INLINE_ELLIPSIS;
        }
        textOverflow = textOverflow.trim();
        if (textOverflow.length === 1) {
            return of$7(textOverflow[0]);
        }
        return INLINE_ELLIPSIS;
    }
    function isAllowOverflow(textOverflow) {
        return !!(textOverflow &&
            textOverflow !== 'clip' &&
            typeof textOverflow === 'string');
    }
    function getOverflowInlinesIndex(ctx, inlines, width) {
        var maxWidth = width - 3; /*buffer*/
        var lineWidth = 0;
        for (var i = 0; i < inlines.length; i++) {
            var inline = inlines[i];
            var inlineWidth = (inline.width({ ctx: ctx }) || 0) - 0;
            if (lineWidth + inlineWidth > maxWidth) {
                return {
                    index: i,
                    lineWidth: lineWidth,
                    remWidth: maxWidth - lineWidth,
                };
            }
            lineWidth += inlineWidth;
        }
        return null;
    }
    function isOverflowInlines(ctx, inlines, width) {
        return !!getOverflowInlinesIndex(ctx, inlines, width);
    }
    function breakWidthInlines(ctx, inlines, width) {
        var _a, _b;
        var indexData = getOverflowInlinesIndex(ctx, inlines, width);
        if (!indexData) {
            return {
                afterInlines: [],
                beforeInlines: inlines,
                overflow: false,
            };
        }
        var index = indexData.index;
        var remWidth = indexData.remWidth;
        var inline = inlines[index];
        var beforeInlines = inlines.slice(0, index);
        var afterInlines = [];
        if (inline.canBreak()) {
            var breakWord = inline.breakWord(ctx, remWidth);
            var before = breakWord.before;
            var after = breakWord.after;
            if (!before && !beforeInlines.length) {
                (_a = inline.breakAll(ctx, remWidth), before = _a.before, after = _a.after);
            }
            if (!before && !beforeInlines.length) {
                (_b = inline.splitIndex(1), before = _b.before, after = _b.after);
            }
            if (before) {
                beforeInlines.push(before);
            }
            if (after) {
                afterInlines.push(after);
            }
            afterInlines.push.apply(afterInlines, inlines.slice(index + 1));
        }
        else {
            if (!beforeInlines.length) {
                // Always return one char
                beforeInlines.push(inline);
            }
            afterInlines.push.apply(afterInlines, inlines.slice(beforeInlines.length));
        }
        return {
            afterInlines: afterInlines,
            beforeInlines: beforeInlines,
            overflow: true,
        };
    }
    function truncateInlines(ctx, inlines, width, offset, option) {
        var indexData = getOverflowInlinesIndex(ctx, inlines, width);
        if (!indexData) {
            return {
                inlines: inlines,
                overflow: false,
            };
        }
        var index = indexData.index, lineWidth = indexData.lineWidth;
        var inline = inlines[index];
        var overflowInline = getOverflowInline(option);
        var ellipsisWidth = overflowInline.width({ ctx: ctx });
        var remWidth = width - lineWidth - ellipsisWidth - offset - 1;
        var result = inlines.slice(0, index);
        if (inline.canBreak()) {
            var before = inline.breakAll(ctx, remWidth).before;
            if (before) {
                result.push(before);
            }
        }
        result.push(overflowInline);
        return {
            inlines: result,
            overflow: true,
        };
    }
    function _inlineRect(grid, ctx, inline, rect, col, row, _a) {
        var offset = _a.offset, color = _a.color, textAlign = _a.textAlign, textBaseline = _a.textBaseline, font = _a.font, textOverflow = _a.textOverflow, icons = _a.icons;
        // 文字style
        ctx.fillStyle = getColor(color || ctx.fillStyle, col, row, grid, ctx);
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font || ctx.font;
        var inlines = buildInlines$1(icons, inline);
        if (isAllowOverflow(textOverflow) &&
            isOverflowInlines(ctx, inlines, rect.width)) {
            var _b = truncateInlines(ctx, inlines, rect.width, offset, textOverflow), truncInlines = _b.inlines, overflow = _b.overflow;
            inlines = truncInlines;
            grid.setCellOverflowText(col, row, overflow && inlineToString(inline));
        }
        else {
            grid.setCellOverflowText(col, row, false);
        }
        drawInlines(ctx, inlines, rect, offset, 0, 0, col, row, grid);
    }
    function _multiInlineRect(grid, ctx, multiInlines, rect, col, row, _a) {
        var offset = _a.offset, color = _a.color, textAlign = _a.textAlign, textBaseline = _a.textBaseline, font = _a.font, lineHeight = _a.lineHeight, autoWrapText = _a.autoWrapText, lineClamp = _a.lineClamp, textOverflow = _a.textOverflow, icons = _a.icons;
        // 文字style
        ctx.fillStyle = getColor(color || ctx.fillStyle, col, row, grid, ctx);
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font || ctx.font;
        if (lineClamp === 'auto') {
            var rectHeight = rect.height - offset * 2 - 2; /*offset added by Inline#draw*/
            lineClamp = Math.max(Math.floor(rectHeight / lineHeight), 1);
        }
        var buildedMultiInlines;
        if (autoWrapText || lineClamp > 0 || isAllowOverflow(textOverflow)) {
            var width_1 = rect.width;
            buildedMultiInlines = [];
            var procLineClamp_1 = lineClamp > 0
                ? function (inlines, hasNext) {
                    if (buildedMultiInlines.length + 1 >= lineClamp) {
                        if (inlines.length === 0 && hasNext) {
                            buildedMultiInlines.push([getOverflowInline(textOverflow)]);
                            grid.setCellOverflowText(col, row, multiInlines.map(inlineToString).join('\n'));
                        }
                        else {
                            var tis = truncateInlines(ctx, inlines, width_1, offset, textOverflow);
                            var truncInlines = tis.inlines;
                            var overflow = tis.overflow;
                            buildedMultiInlines.push(hasNext && !overflow
                                ? truncInlines.concat([getOverflowInline(textOverflow)])
                                : truncInlines);
                            if (overflow || hasNext) {
                                grid.setCellOverflowText(col, row, multiInlines.map(inlineToString).join('\n'));
                            }
                        }
                        return false;
                    }
                    return true;
                }
                : function () { return true; };
            var procLine = autoWrapText
                ? function (inlines, hasNext) {
                    if (!procLineClamp_1(inlines, hasNext)) {
                        return false;
                    }
                    while (inlines.length) {
                        if (!procLineClamp_1(inlines, hasNext)) {
                            return false;
                        }
                        var _a = breakWidthInlines(ctx, inlines, width_1), beforeInlines = _a.beforeInlines, afterInlines = _a.afterInlines;
                        buildedMultiInlines.push(beforeInlines);
                        inlines = afterInlines;
                    }
                    return true;
                }
                : isAllowOverflow(textOverflow)
                    ? function (inlines, hasNext) {
                        if (!procLineClamp_1(inlines, hasNext)) {
                            return false;
                        }
                        var _a = truncateInlines(ctx, inlines, width_1, offset, textOverflow), truncInlines = _a.inlines, overflow = _a.overflow;
                        buildedMultiInlines.push(truncInlines);
                        if (overflow) {
                            grid.setCellOverflowText(col, row, multiInlines.map(inlineToString).join('\n'));
                        }
                        return true;
                    }
                    : function (inlines, hasNext) {
                        if (!procLineClamp_1(inlines, hasNext)) {
                            return false;
                        }
                        buildedMultiInlines.push(inlines);
                        return true;
                    };
            grid.setCellOverflowText(col, row, false);
            for (var lineRow = 0; lineRow < multiInlines.length; lineRow++) {
                var inline = multiInlines[lineRow];
                var buildedInline = buildInlines$1(lineRow === 0 ? icons : undefined, inline);
                if (!procLine(buildedInline, lineRow + 1 < multiInlines.length)) {
                    break;
                }
            }
        }
        else {
            grid.setCellOverflowText(col, row, false);
            buildedMultiInlines = multiInlines.map(function (inline, lineRow) {
                return buildInlines$1(lineRow === 0 ? icons : undefined, inline);
            });
        }
        var paddingTop = 0;
        var paddingBottom = lineHeight * (buildedMultiInlines.length - 1);
        if (ctx.textBaseline === 'top' || ctx.textBaseline === 'hanging') {
            var em = getFontSize(ctx, ctx.font).height;
            var pad = (lineHeight - em) / 2;
            paddingTop += pad;
            paddingBottom -= pad;
        }
        else if (ctx.textBaseline === 'bottom' ||
            ctx.textBaseline === 'alphabetic' ||
            ctx.textBaseline === 'ideographic') {
            var em = getFontSize(ctx, ctx.font).height;
            var pad = (lineHeight - em) / 2;
            paddingTop -= pad;
            paddingBottom += pad;
        }
        buildedMultiInlines.forEach(function (buildedInline) {
            drawInlines(ctx, buildedInline, rect, offset, paddingTop, paddingBottom, col, row, grid);
            paddingTop += lineHeight;
            paddingBottom -= lineHeight;
        });
    }
    function gridDrawCheckbox(ctx, rect, col, row, check, helper, _a, positionOpt) {
        var _b = _a === void 0 ? {} : _a, _c = _b.animElapsedTime, animElapsedTime = _c === void 0 ? 1 : _c, _d = _b.uncheckBgColor, uncheckBgColor = _d === void 0 ? helper.theme.checkbox.uncheckBgColor : _d, _e = _b.checkBgColor, checkBgColor = _e === void 0 ? helper.theme.checkbox.checkBgColor : _e, _f = _b.borderColor, borderColor = _f === void 0 ? helper.theme.checkbox.borderColor : _f, _g = _b.textAlign, textAlign = _g === void 0 ? 'center' : _g, _h = _b.textBaseline, textBaseline = _h === void 0 ? 'middle' : _h;
        if (positionOpt === void 0) { positionOpt = {}; }
        var boxWidth = canvasHelper.measureCheckbox(ctx).width;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        var pos = calcStartPosition(ctx, rect, boxWidth + 1 /*分割线+1*/, boxWidth + 1 /*分割线+1*/, positionOpt);
        uncheckBgColor = helper.getColor(uncheckBgColor, col, row, ctx);
        checkBgColor = helper.getColor(checkBgColor, col, row, ctx);
        borderColor = helper.getColor(borderColor, col, row, ctx);
        if (0 < animElapsedTime && animElapsedTime < 1) {
            uncheckBgColor = check
                ? uncheckBgColor
                : calcElapsedColor(checkBgColor, uncheckBgColor, animElapsedTime);
            checkBgColor = check
                ? calcElapsedColor(uncheckBgColor, checkBgColor, animElapsedTime)
                : checkBgColor;
        }
        canvasHelper.drawCheckbox(ctx, pos.x, pos.y, check ? animElapsedTime : false, {
            borderColor: borderColor,
            checkBgColor: checkBgColor,
            uncheckBgColor: uncheckBgColor,
        });
    }
    function gridDrawRadioButton(ctx, rect, col, row, check, helper, _a, positionOpt) {
        var _b = _a.animElapsedTime, animElapsedTime = _b === void 0 ? 1 : _b, _c = _a.checkColor, checkColor = _c === void 0 ? helper.theme.radioButton.checkColor : _c, _d = _a.uncheckBorderColor, uncheckBorderColor = _d === void 0 ? helper.theme.radioButton.uncheckBorderColor : _d, _e = _a.checkBorderColor, checkBorderColor = _e === void 0 ? helper.theme.radioButton.checkBorderColor : _e, _f = _a.uncheckBgColor, uncheckBgColor = _f === void 0 ? helper.theme.radioButton.uncheckBgColor : _f, _g = _a.checkBgColor, checkBgColor = _g === void 0 ? helper.theme.radioButton.checkBgColor : _g, _h = _a.textAlign, textAlign = _h === void 0 ? 'center' : _h, _j = _a.textBaseline, textBaseline = _j === void 0 ? 'middle' : _j;
        if (positionOpt === void 0) { positionOpt = {}; }
        var boxWidth = canvasHelper.measureRadioButton(ctx).width;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        var pos = calcStartPosition(ctx, rect, boxWidth + 1 /*罫線分+1*/, boxWidth + 1 /*罫線分+1*/, positionOpt);
        checkColor = helper.getColor(checkColor, col, row, ctx);
        uncheckBorderColor = helper.getColor(uncheckBorderColor, col, row, ctx);
        checkBorderColor = helper.getColor(checkBorderColor, col, row, ctx);
        uncheckBgColor = helper.getColor(uncheckBgColor, col, row, ctx);
        checkBgColor = helper.getColor(checkBgColor, col, row, ctx);
        var borderColor = check ? checkBorderColor : uncheckBorderColor;
        var bgColor = check ? checkBgColor : uncheckBgColor;
        if (0 < animElapsedTime && animElapsedTime < 1) {
            borderColor = check
                ? calcElapsedColor(uncheckBorderColor, checkBorderColor, animElapsedTime)
                : calcElapsedColor(checkBorderColor, uncheckBorderColor, animElapsedTime);
            bgColor = check
                ? calcElapsedColor(uncheckBgColor, checkBgColor, animElapsedTime)
                : calcElapsedColor(checkBgColor, uncheckBgColor, animElapsedTime);
        }
        canvasHelper.drawRadioButton(ctx, pos.x, pos.y, check ? animElapsedTime : 1 - animElapsedTime, {
            checkColor: checkColor,
            borderColor: borderColor,
            bgColor: bgColor,
        });
    }
    function getSwitchBtnSize(rect) {
        if (SWITCH_STYLE === SwitchStyle$1.default) {
            return {
                height: 22,
                width: 44,
            };
        }
        else {
            var height = rect.height - rect.height / 4;
            var width = height * 1.625;
            return {
                height: height,
                width: width,
            };
        }
    }
    function gridDrawSwitchBtn(ctx, rect, col, row, check, helper, info, positionOpt) {
        if (info === void 0) { info = {}; }
        if (positionOpt === void 0) { positionOpt = {}; }
        var animElapsedTime = info.animElapsedTime === undefined ? 1 : info.animElapsedTime;
        var uncheckBgColor = info.uncheckBgColor || helper.theme.switch.uncheckBgColor;
        var checkBgColor = info.checkBgColor || helper.theme.switch.checkBgColor;
        var borderColor = info.borderColor || helper.theme.switch.borderColor;
        var textAlign = info.textAlign || 'center';
        var textBaseline = info.textBaseline || 'middle';
        var btnSize = getSwitchBtnSize(rect);
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        var pos = calcStartPosition(ctx, rect, btnSize.width + 1 /*分割线+1*/, btnSize.height + 1 /*分割线+1*/, positionOpt);
        uncheckBgColor = helper.getColor(uncheckBgColor, col, row, ctx);
        checkBgColor = helper.getColor(checkBgColor, col, row, ctx);
        borderColor = helper.getColor(borderColor, col, row, ctx);
        borderColor = style.toBoxArray(borderColor).find(function (v) { return v; });
        var draw = SWITCH_STYLE === SwitchStyle$1.default
            ? canvasHelper.drawSwitchButton
            : canvasHelper.drawSwitchBtn;
        draw(ctx, pos.x, pos.y, check, animElapsedTime, {
            borderColor: borderColor,
            checkBgColor: checkBgColor,
            uncheckBgColor: uncheckBgColor,
            btnSize: btnSize,
        });
    }
    function strokeRect(ctx, color, left, top, width, height) {
        if (!Array.isArray(color)) {
            if (color) {
                ctx.strokeStyle = color;
                ctx.strokeRect(left, top, width, height);
            }
        }
        else {
            var borderColors = style.toBoxArray(color);
            canvasHelper.strokeColorsRect(ctx, borderColors, left, top, width, height);
        }
    }
    var GridCanvasHelper = /** @class */ (function () {
        function GridCanvasHelper(grid) {
            this._grid = grid;
            this._theme = new ThemeResolver(grid);
        }
        GridCanvasHelper.prototype.createCalculator = function (context, font) {
            return {
                calcWidth: function (width) {
                    return toPx(width, {
                        get full() {
                            var rect = context.getRect();
                            return rect.width;
                        },
                        get em() {
                            return getFontSize(context.getContext(), font).width;
                        },
                    });
                },
                calcHeight: function (height) {
                    return toPx(height, {
                        get full() {
                            var rect = context.getRect();
                            return rect.height;
                        },
                        get em() {
                            return getFontSize(context.getContext(), font).height;
                        },
                    });
                },
            };
        };
        GridCanvasHelper.prototype.getColor = function (color, col, row, ctx) {
            return getColor(color, col, row, this._grid, ctx);
        };
        GridCanvasHelper.prototype.toBoxArray = function (obj) {
            return style.toBoxArray(obj);
        };
        GridCanvasHelper.prototype.toBoxPixelArray = function (value, context, font) {
            if (typeof value === 'string' || Array.isArray(value)) {
                var calculator = this.createCalculator(context, font);
                var box = style.toBoxArray(value);
                return [
                    calculator.calcHeight(box[0]),
                    calculator.calcWidth(box[1]),
                    calculator.calcHeight(box[2]),
                    calculator.calcWidth(box[3]),
                ];
            }
            return style.toBoxArray(value);
        };
        Object.defineProperty(GridCanvasHelper.prototype, "theme", {
            get: function () {
                return this._theme;
            },
            enumerable: false,
            configurable: true
        });
        GridCanvasHelper.prototype.drawWithClip = function (context, draw) {
            var drawRect = context.getDrawRect();
            if (!drawRect) {
                return;
            }
            var ctx = context.getContext();
            if (ctx) {
                ctx.save();
                try {
                    ctx.beginPath();
                    ctx.rect(drawRect.left, drawRect.top, drawRect.width, drawRect.height);
                    // clip
                    ctx.clip();
                    draw(ctx);
                }
                finally {
                    ctx.restore();
                }
            }
        };
        GridCanvasHelper.prototype.drawBorderWithClip = function (context, draw) {
            var drawRect = context.getDrawRect();
            if (!drawRect) {
                return;
            }
            var rect = context.getRect();
            var ctx = context.getContext();
            if (ctx) {
                ctx.save();
                try {
                    ctx.lineCap = 'square';
                    // 对于划线clip
                    ctx.beginPath();
                    var clipLeft = drawRect.left;
                    var clipWidth = drawRect.width;
                    if (drawRect.left === rect.left) {
                        clipLeft += -1;
                        clipWidth += 1;
                    }
                    var clipTop = drawRect.top;
                    var clipHeight = drawRect.height;
                    if (drawRect.top === rect.top) {
                        clipTop += -1;
                        clipHeight += 1;
                    }
                    ctx.rect(clipLeft, clipTop, clipWidth, clipHeight);
                    ctx.clip();
                    draw(ctx);
                }
                finally {
                    ctx.restore();
                }
            }
        };
        GridCanvasHelper.prototype.getTextRect = function (text, context, _a) {
            var _b = _a === void 0 ? {} : _a, padding = _b.padding, _c = _b.offset, offset = _c === void 0 ? 2 : _c, _d = _b.textAlign, textAlign = _d === void 0 ? 'left' : _d, _e = _b.textBaseline, textBaseline = _e === void 0 ? 'middle' : _e, font = _b.font, _f = _b.textOverflow, textOverflow = _f === void 0 ? 'clip' : _f, icons = _b.icons;
            var rect = context.getRect();
            var drawRect = context.getDrawRect();
            var ctx = context.getContext();
            var col = context.col, row = context.row;
            font = getGridThemeFont(this._grid, this.theme, col, row, font);
            if (drawRect && ctx) {
                ctx.save();
                try {
                    font = getFont(font, context.col, context.row, this._grid, ctx);
                    if (padding) {
                        var paddingNums = this.toBoxPixelArray(padding, context, font);
                        var left = rect.left + paddingNums[3];
                        var top_1 = rect.top + paddingNums[0];
                        var width = rect.width - paddingNums[1] - paddingNums[3];
                        var height = rect.height - paddingNums[0] - paddingNums[2];
                        rect = new Rect(left, top_1, width, height);
                    }
                    // 文字style
                    ctx.textAlign = textAlign;
                    ctx.textBaseline = textBaseline;
                    ctx.font = font || ctx.font;
                    var inlines = buildInlines$1(icons, text);
                    if (isAllowOverflow(textOverflow) &&
                        isOverflowInlines(ctx, inlines, rect.width)) {
                        var truncInlines = truncateInlines(ctx, inlines, rect.width, offset, textOverflow).inlines;
                        inlines = truncInlines;
                    }
                    var inlineWidths_2 = inlines.map(function (inline) { return (inline.width({ ctx: ctx }) || 0) - 0; });
                    var offsetBottom_1 = 0;
                    var offsetTop_1 = 0;
                    var offsetRight_2 = inlineWidths_2.length > 0 ? inlineWidths_2.reduce(function (a, b) { return a + b; }) : 0;
                    var offsetLeft_2 = 0;
                    var rectLeft_1 = rect.right;
                    var rectTop_1 = rect.bottom;
                    var rectRight_1 = 0;
                    var rectBottom_1 = 0;
                    inlines.forEach(function (inline, index) {
                        var inlineWidth = inlineWidths_2[index];
                        offsetRight_2 -= inlineWidth;
                        ctx.font = inline.font() || ctx.font;
                        var inlineHeight = getFontSize(ctx, ctx.font).height;
                        var pos = calcStartPosition(ctx, {
                            bottom: rect.top + rect.height,
                            height: rect.height,
                            left: rect.left,
                            right: rect.left + rect.width,
                            top: rect.top,
                            width: rect.width,
                        }, inlineWidth, inlineHeight, {
                            offset: offset + 1,
                            padding: {
                                bottom: offsetBottom_1,
                                left: offsetLeft_2,
                                right: offsetRight_2,
                                top: offsetTop_1,
                            },
                        });
                        rectLeft_1 = Math.floor(Math.min(rectLeft_1, pos.x));
                        rectTop_1 = Math.floor(Math.min(rectTop_1, pos.y));
                        rectRight_1 = Math.ceil(Math.max(rectRight_1, pos.x + inlineWidth));
                        rectBottom_1 = Math.ceil(Math.max(rectBottom_1, pos.y + inlineHeight));
                        offsetLeft_2 += inlineWidth;
                    });
                    rect = new Rect(Math.min(rectLeft_1, rectRight_1), Math.min(rectTop_1, rectBottom_1), Math.abs(rectRight_1 - rectLeft_1), Math.abs(rectBottom_1 - rectTop_1));
                }
                finally {
                    ctx.restore();
                }
            }
            return rect;
        };
        GridCanvasHelper.prototype.text = function (text, context, _a) {
            var _this = this;
            var _b = _a === void 0 ? {} : _a, padding = _b.padding, _c = _b.offset, offset = _c === void 0 ? 2 : _c, color = _b.color, _d = _b.textAlign, textAlign = _d === void 0 ? 'left' : _d, _e = _b.textBaseline, textBaseline = _e === void 0 ? 'middle' : _e, font = _b.font, _f = _b.textOverflow, textOverflow = _f === void 0 ? 'clip' : _f, icons = _b.icons;
            var rect = context.getRect();
            var col = context.col, row = context.row;
            color = getGridThemeColor(this._grid, this.theme, col, row, color);
            font = getGridThemeFont(this._grid, this.theme, col, row, font);
            this.drawWithClip(context, function (ctx) {
                font = getFont(font, context.col, context.row, _this._grid, ctx);
                if (padding) {
                    var paddingNums = _this.toBoxPixelArray(padding, context, font);
                    var left = rect.left + paddingNums[3];
                    var top_2 = rect.top + paddingNums[0];
                    var width = rect.width - paddingNums[1] - paddingNums[3];
                    var height = rect.height - paddingNums[0] - paddingNums[2];
                    rect = new Rect(left, top_2, width, height);
                }
                _inlineRect(_this._grid, ctx, text, rect, col, row, {
                    color: color,
                    font: font,
                    icons: icons,
                    offset: offset,
                    textAlign: textAlign,
                    textBaseline: textBaseline,
                    textOverflow: textOverflow,
                });
            });
        };
        GridCanvasHelper.prototype.multilineText = function (multilines, context, _a) {
            var _this = this;
            var _b = _a === void 0 ? {} : _a, padding = _b.padding, _c = _b.offset, offset = _c === void 0 ? 2 : _c, color = _b.color, _d = _b.textAlign, textAlign = _d === void 0 ? 'left' : _d, _e = _b.textBaseline, textBaseline = _e === void 0 ? 'middle' : _e, font = _b.font, _f = _b.lineHeight, lineHeight = _f === void 0 ? '1em' : _f, _g = _b.autoWrapText, autoWrapText = _g === void 0 ? false : _g, _h = _b.lineClamp, lineClamp = _h === void 0 ? 0 : _h, _j = _b.textOverflow, textOverflow = _j === void 0 ? 'clip' : _j, icons = _b.icons;
            var rect = context.getRect();
            var col = context.col, row = context.row;
            color = getGridThemeColor(this._grid, this.theme, col, row, color);
            font = getGridThemeFont(this._grid, this.theme, col, row, font);
            this.drawWithClip(context, function (ctx) {
                font = getFont(font, context.col, context.row, _this._grid, ctx);
                if (padding) {
                    var paddingNums = _this.toBoxPixelArray(padding, context, font);
                    var left = rect.left + paddingNums[3];
                    var top_3 = rect.top + paddingNums[0];
                    var width = rect.width - paddingNums[1] - paddingNums[3];
                    var height = rect.height - paddingNums[0] - paddingNums[2];
                    rect = new Rect(left, top_3, width, height);
                }
                var calculator = _this.createCalculator(context, font);
                lineHeight = calculator.calcHeight(lineHeight);
                _multiInlineRect(_this._grid, ctx, multilines, rect, col, row, {
                    autoWrapText: autoWrapText,
                    color: color,
                    font: font,
                    icons: icons,
                    lineClamp: lineClamp,
                    lineHeight: lineHeight,
                    offset: offset,
                    textAlign: textAlign,
                    textBaseline: textBaseline,
                    textOverflow: textOverflow,
                });
            });
        };
        GridCanvasHelper.prototype.fillText = function (text, x, y, context, _a) {
            var _b = _a === void 0 ? {} : _a, color = _b.color, _c = _b.textAlign, textAlign = _c === void 0 ? 'left' : _c, _d = _b.textBaseline, textBaseline = _d === void 0 ? 'top' : _d, font = _b.font;
            var col = context.col, row = context.row;
            color = getGridThemeColor(this._grid, this.theme, col, row, color);
            font = getGridThemeFont(this._grid, this.theme, col, row, font);
            var ctx = context.getContext();
            ctx.save();
            try {
                font = getFont(font, context.col, context.row, this._grid, ctx);
                ctx.fillStyle = getColor(color, col, row, this._grid, ctx);
                ctx.textAlign = textAlign;
                ctx.textBaseline = textBaseline;
                ctx.font = font || ctx.font;
                ctx.fillText(text, x, y);
            }
            finally {
                ctx.restore();
            }
        };
        GridCanvasHelper.prototype.clearCell = function (context) {
            var rect = context.getRect();
            this.drawWithClip(context, function (ctx) {
                ctx.clearRect(rect.left, rect.top, rect.width, rect.height);
            });
        };
        GridCanvasHelper.prototype.fillCell = function (context, _a) {
            var _this = this;
            var _b = _a === void 0 ? {} : _a, _c = _b.fillColor, fillColor = _c === void 0 ? this.theme.defaultBgColor : _c, selectionColor = _b.selectionColor;
            var rect = context.getRect();
            this.drawWithClip(context, function (ctx) {
                var col = context.col;
                var row = context.row;
                ctx.fillStyle = getColor(fillColor, col, row, _this._grid, ctx);
                ctx.beginPath();
                ctx.clearRect(rect.left, rect.top, rect.width, rect.height);
                ctx.rect(rect.left, rect.top, rect.width, rect.height);
                ctx.fill();
                if (selectionColor) {
                    ctx.fillStyle = getColor(selectionColor, col, row, _this._grid, ctx);
                    ctx.fill();
                }
            });
        };
        GridCanvasHelper.prototype.fillCellWithState = function (context, option) {
            if (option === void 0) { option = {}; }
            option.fillColor = this.getFillColorState(context, option);
            if (option.isEditing) {
                delete option.selectionColor;
                delete option.isEditing;
            }
            else {
                option.selectionColor = this.getSelectionColorState(context, option);
            }
            this.fillCell(context, option);
        };
        GridCanvasHelper.prototype.fillRect = function (rect, context, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.fillColor, fillColor = _c === void 0 ? this.theme.defaultBgColor : _c, selectionColor = _b.selectionColor;
            var ctx = context.getContext();
            ctx.save();
            try {
                var col = context.col;
                var row = context.row;
                ctx.fillStyle = getColor(fillColor, col, row, this._grid, ctx);
                ctx.beginPath();
                ctx.rect(rect.left, rect.top, rect.width, rect.height);
                ctx.fill();
                if (selectionColor) {
                    ctx.fillStyle = getColor(selectionColor, col, row, this._grid, ctx);
                    ctx.fill();
                }
            }
            finally {
                ctx.restore();
            }
        };
        GridCanvasHelper.prototype.fillRectWithState = function (rect, context, option) {
            if (option === void 0) { option = {}; }
            option.fillColor = this.getFillColorState(context, option);
            option.selectionColor = this.getSelectionColorState(context, option);
            this.fillRect(rect, context, option);
        };
        GridCanvasHelper.prototype.getSelectionColorState = function (context, option) {
            if (option === void 0) { option = {}; }
            var sel = context.getSelection();
            var col = context.col, row = context.row;
            if (option.selectionColor) {
                return option.selectionColor;
            }
            else if (sel.dragged) {
                return this.theme.selectionDragBgColor;
            }
            else if (!cellInRange(context.range, sel.select.col, sel.select.row) &&
                cellInRange(sel.range, col, row)) {
                return this.theme.selectionBgColor;
            }
            else if (cellInRange(context.range, sel.select.col, sel.select.row) &&
                cellInRange(sel.range, col, row)) {
                return this.theme.focusBgColor;
            }
            else {
                return undefined;
            }
        };
        GridCanvasHelper.prototype.getFillColorState = function (context, option) {
            if (option === void 0) { option = {}; }
            var sel = context.getSelection();
            var col = context.col, row = context.row;
            if (!cellInRange(context.range, sel.select.col, sel.select.row) &&
                cellInRange(sel.range, col, row)) {
                return this.theme.selectionBgColor;
            }
            if (option.fillColor) {
                return option.fillColor;
            }
            if (cellInRange(context.range, sel.select.col, sel.select.row)) {
                return this.theme.highlightBgColor;
            }
            var isFrozenCell = this._grid.isFrozenCell(col, row);
            if (isFrozenCell && isFrozenCell.row) {
                return this.theme.frozenRowsBgColor;
            }
            return this.theme.defaultBgColor;
        };
        GridCanvasHelper.prototype.border = function (context, _a) {
            var _this = this;
            var _b = _a === void 0 ? {} : _a, _c = _b.borderColor, borderColor = _c === void 0 ? this.theme.borderColor : _c, _d = _b.lineWidth, lineWidth = _d === void 0 ? 1 : _d;
            var rect = context.getRect();
            this.drawBorderWithClip(context, function (ctx) {
                var col = context.col;
                var row = context.row;
                var left = rect.left;
                var top = rect.top;
                var width = rect.width;
                var height = rect.height;
                if (col === 0) {
                    left += lineWidth;
                    width -= lineWidth;
                }
                if (row === 0) {
                    top += lineWidth;
                    height -= lineWidth;
                }
                var borderColors = getColor(borderColor, col, row, _this._grid, ctx);
                if (lineWidth === 1) {
                    ctx.lineWidth = 1;
                    strokeRect(ctx, borderColors, left - 0.5, top - 0.5, width, height);
                }
                else if (lineWidth === 2) {
                    ctx.lineWidth = 2;
                    strokeRect(ctx, borderColors, left, top, width - 1, height - 1);
                }
                else {
                    ctx.lineWidth = lineWidth;
                    var startOffset = lineWidth / 2 - 1;
                    strokeRect(ctx, borderColors, left + startOffset, top + startOffset, width - lineWidth + 1, height - lineWidth + 1);
                }
            });
        };
        GridCanvasHelper.prototype.borderSelection = function (context, option) {
            var _this = this;
            if (option === void 0) { option = {}; }
            var col = context.col;
            var row = context.row;
            var border = context.getSelection().border;
            var rect = context.getRect();
            var drawRect = context.getDrawRect() || rect;
            // header color
            var isFrozenCell = this._grid.isFrozenCell(col, row);
            if (isFrozenCell && isFrozenCell.row) {
                option.borderColor = this.theme.frozenRowsBorderColor;
            }
            option.lineWidth = 1;
            this.border(context, option);
            // 编辑中不绘制选择边框
            if (option.isEditing) {
                return;
            }
            var highlightBorderWidth = 1;
            if (option.highlightBorderWidth !== undefined) {
                highlightBorderWidth = option.highlightBorderWidth;
            }
            // 画边框
            if (border.top || border.right || border.bottom || border.left) {
                this.drawBorderWithClip(context, function (ctx) {
                    var borderColor = getColor(_this.theme.highlightBorderColor, col, row, _this._grid, ctx);
                    var borderColors = style.toBoxArray(borderColor);
                    ctx.lineWidth = highlightBorderWidth;
                    if (ctx.lineWidth > 0) {
                        var offset = ctx.lineWidth / 2;
                        if (row === 0) {
                            rect.top += offset;
                        }
                        if (col === 0) {
                            rect.left += offset;
                        }
                        if (border.top) {
                            ctx.strokeStyle = borderColors[0] || ctx.strokeStyle;
                            ctx.beginPath();
                            ctx.moveTo(rect.left, rect.top);
                            ctx.lineTo(rect.right - offset, rect.top);
                            ctx.stroke();
                        }
                        if (border.right) {
                            ctx.strokeStyle = borderColors[1] || ctx.strokeStyle;
                            ctx.beginPath();
                            ctx.moveTo(rect.right - offset, rect.top);
                            ctx.lineTo(rect.right - offset, rect.bottom - offset);
                            ctx.stroke();
                        }
                        if (border.bottom) {
                            ctx.strokeStyle = borderColors[2] || ctx.strokeStyle;
                            ctx.beginPath();
                            ctx.moveTo(rect.right - offset, rect.bottom - offset);
                            ctx.lineTo(rect.left, rect.bottom - offset);
                            ctx.stroke();
                        }
                        if (border.left) {
                            ctx.strokeStyle = borderColors[3] || ctx.strokeStyle;
                            ctx.beginPath();
                            ctx.moveTo(rect.left, rect.bottom - offset);
                            ctx.lineTo(rect.left, rect.top);
                            ctx.stroke();
                        }
                    }
                    if (border.right && border.bottom && _this._grid.canDragSelection) {
                        // 右下角拖动点
                        var x = drawRect.right;
                        var y = drawRect.bottom;
                        ctx.lineWidth = 1;
                        ctx.strokeStyle =
                            borderColors[1] || borderColors[2] || ctx.strokeStyle;
                        ctx.beginPath();
                        ctx.moveTo(x - 8, y - 3);
                        ctx.lineTo(x - 3, y - 8);
                        ctx.moveTo(x - 5, y - 3);
                        ctx.lineTo(x - 3, y - 5);
                        ctx.stroke();
                    }
                });
            }
            // 额外处理
            var range = this._grid.selection.range;
            if (range.start.row <= row &&
                range.end.row >= row &&
                range.end.col === col - 1) {
                // 左边被选中
                this.drawBorderWithClip(context, function (ctx) {
                    var borderColor = getColor(_this.theme.highlightBorderColor, col - 1, row, _this._grid, ctx);
                    var borderColors = style.toBoxArray(borderColor);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = borderColors[1] || ctx.strokeStyle;
                    ctx.beginPath();
                    ctx.moveTo(rect.left - 0.5, rect.top);
                    ctx.lineTo(rect.left - 0.5, rect.bottom);
                    ctx.stroke();
                });
            }
            else if (range.start.col <= col &&
                range.end.col >= col &&
                range.end.row === row - 1) {
                // 顶部被选中
                this.drawBorderWithClip(context, function (ctx) {
                    var borderColor = getColor(_this.theme.highlightBorderColor, col, row - 1, _this._grid, ctx);
                    var borderColors = style.toBoxArray(borderColor);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = borderColors[0] || ctx.strokeStyle;
                    ctx.beginPath();
                    ctx.moveTo(rect.left, rect.top - 0.5);
                    ctx.lineTo(rect.right, rect.top - 0.5);
                    ctx.stroke();
                });
            }
        };
        // public borderWithState(
        //   context: CellContext,
        //   option: { borderColor?: ColorsPropertyDefine; lineWidth?: number } = {}
        // ): void {
        //   const rect = context.getRect()
        //   const state = context.getSelectState()
        //   const { col, row } = context
        //   // 划线
        //   if (state.selected) {
        //     option.borderColor = this.theme.highlightBorderColor
        //     option.lineWidth = 2
        //     this.border(context, option)
        //   } else {
        //     // header color
        //     const isFrozenCell = this._grid.isFrozenCell(col, row)
        //     if (isFrozenCell && isFrozenCell.row) {
        //       option.borderColor = this.theme.frozenRowsBorderColor
        //     }
        //     option.lineWidth = 1
        //     this.border(context, option)
        //     // 额外处理
        //     const sel = this._grid.selection.select
        //     if (sel.col + 1 === col && sel.row === row) {
        //       // 左边被选中
        //       this.drawBorderWithClip(context, ctx => {
        //         const borderColors = style.toBoxArray(
        //           getColor(
        //             this.theme.highlightBorderColor,
        //             sel.col,
        //             sel.row,
        //             this._grid,
        //             ctx
        //           )
        //         )
        //         ctx.lineWidth = 1
        //         ctx.strokeStyle = borderColors[1] || ctx.strokeStyle
        //         ctx.beginPath()
        //         ctx.moveTo(rect.left - 0.5, rect.top)
        //         ctx.lineTo(rect.left - 0.5, rect.bottom)
        //         ctx.stroke()
        //       })
        //     } else if (sel.col === col && sel.row + 1 === row) {
        //       // 顶部被选中
        //       this.drawBorderWithClip(context, ctx => {
        //         const borderColors = style.toBoxArray(
        //           getColor(
        //             this.theme.highlightBorderColor,
        //             sel.col,
        //             sel.row,
        //             this._grid,
        //             ctx
        //           )
        //         )
        //         ctx.lineWidth = 1
        //         ctx.strokeStyle = borderColors[0] || ctx.strokeStyle
        //         ctx.beginPath()
        //         ctx.moveTo(rect.left, rect.top - 0.5)
        //         ctx.lineTo(rect.right, rect.top - 0.5)
        //         ctx.stroke()
        //       })
        //     }
        //   }
        // }
        GridCanvasHelper.prototype.buildCheckBoxInline = function (check, context, option) {
            if (option === void 0) { option = {}; }
            var self = this;
            var boxWidth = canvasHelper.measureCheckbox(context.getContext()).width;
            function draw(info) {
                var col = context.col;
                var row = context.row;
                gridDrawCheckbox(info.ctx, info.rect, col, row, check, self, option, {
                    offset: info.offset + 1,
                    padding: {
                        bottom: info.offsetBottom,
                        left: info.offsetLeft + 1,
                        right: info.offsetRight,
                        top: info.offsetTop,
                    },
                });
            }
            return new InlineDrawer({
                color: undefined,
                draw: draw,
                height: boxWidth + 1,
                width: boxWidth + 3,
            });
        };
        GridCanvasHelper.prototype.buildSwitchBtnInline = function (check, context, option) {
            if (option === void 0) { option = {}; }
            var self = this;
            var btnSize = getSwitchBtnSize(context.getRect());
            function draw(info) {
                var col = context.col;
                var row = context.row;
                gridDrawSwitchBtn(info.ctx, info.rect, col, row, check, self, option, {
                    offset: info.offset + 1,
                    padding: {
                        bottom: info.offsetBottom,
                        left: info.offsetLeft + 1,
                        right: info.offsetRight,
                        top: info.offsetTop,
                    },
                });
            }
            return new InlineDrawer({
                color: undefined,
                draw: draw,
                height: btnSize.height + 1,
                width: btnSize.width + 3,
            });
        };
        GridCanvasHelper.prototype.checkbox = function (check, context, option) {
            var _this = this;
            if (option === void 0) { option = {}; }
            this.drawWithClip(context, function (ctx) {
                var col = context.col, row = context.row;
                gridDrawCheckbox(ctx, context.getRect(), col, row, check, _this, option);
            });
        };
        GridCanvasHelper.prototype.radioButton = function (check, context, option) {
            var _this = this;
            if (option === void 0) { option = {}; }
            this.drawWithClip(context, function (ctx) {
                var col = context.col, row = context.row;
                gridDrawRadioButton(ctx, context.getRect(), col, row, check, _this, option);
            });
        };
        GridCanvasHelper.prototype.switch = function (check, context, option) {
            var _this = this;
            if (option === void 0) { option = {}; }
            this.drawWithClip(context, function (ctx) {
                var col = context.col;
                var row = context.row;
                gridDrawSwitchBtn(ctx, context.getRect(), col, row, check, _this, option);
            });
        };
        GridCanvasHelper.prototype.button = function (caption, context, _a) {
            var _this = this;
            var _b = _a === void 0 ? {} : _a, _c = _b.bgColor, bgColor = _c === void 0 ? this.theme.button.bgColor : _c, padding = _b.padding, _d = _b.offset, offset = _d === void 0 ? 2 : _d, _e = _b.color, color = _e === void 0 ? this.theme.button.color : _e, _f = _b.textAlign, textAlign = _f === void 0 ? 'center' : _f, _g = _b.textBaseline, textBaseline = _g === void 0 ? 'middle' : _g, shadow = _b.shadow, font = _b.font, _h = _b.textOverflow, textOverflow = _h === void 0 ? 'clip' : _h, icons = _b.icons;
            var rect = context.getRect();
            this.drawWithClip(context, function (ctx) {
                font = getFont(font, context.col, context.row, _this._grid, ctx);
                var col = context.col;
                var row = context.row;
                var paddingNums = _this.toBoxPixelArray(padding || rect.height / 8, context, font);
                var left = rect.left + paddingNums[3];
                var top = rect.top + paddingNums[0];
                var width = rect.width - paddingNums[1] - paddingNums[3];
                var height = rect.height - paddingNums[0] - paddingNums[2];
                bgColor = getColor(bgColor, context.col, context.row, _this._grid, ctx);
                canvasHelper.drawButton(ctx, left, top, width, height, {
                    bgColor: bgColor,
                    // offset,
                    radius: rect.height / 8,
                    shadow: shadow,
                });
                _inlineRect(_this._grid, ctx, caption, new Rect(left, top, width, height), col, row, {
                    color: color,
                    font: font,
                    icons: icons,
                    offset: offset,
                    textAlign: textAlign,
                    textBaseline: textBaseline,
                    textOverflow: textOverflow,
                });
            });
        };
        GridCanvasHelper.prototype.testFontLoad = function (font, value, context) {
            return testFontLoad(font, value, context, this._grid);
        };
        GridCanvasHelper.prototype.tree = function (text, context, _a) {
            var _this = this;
            var _b = _a === void 0 ? {} : _a, font = _b.font, _c = _b.offset, offset = _c === void 0 ? 2 : _c, color = _b.color, _d = _b.lineColor, lineColor = _d === void 0 ? this.theme.tree.lineColor : _d, _e = _b.buttonColor, buttonColor = _e === void 0 ? this.theme.tree.buttonColor : _e, _f = _b.buttonBgColor, buttonBgColor = _f === void 0 ? this.theme.tree.buttonBgColor : _f, _g = _b.buttonBorderColor, buttonBorderColor = _g === void 0 ? this.theme.tree.buttonBorderColor : _g, icons = _b.icons, padding = _b.padding, _h = _b.textAlign, textAlign = _h === void 0 ? 'left' : _h, _j = _b.textBaseline, textBaseline = _j === void 0 ? 'middle' : _j, _k = _b.textOverflow, textOverflow = _k === void 0 ? 'clip' : _k, treeInfo = _b.treeInfo, _l = _b.treeNodeSpace, treeNodeSpace = _l === void 0 ? 0 : _l, _m = _b.isMultilineText, isMultilineText = _m === void 0 ? false : _m, _o = _b.autoWrapText, autoWrapText = _o === void 0 ? false : _o, _p = _b.lineHeight, lineHeight = _p === void 0 ? '1em' : _p, _q = _b.lineClamp, lineClamp = _q === void 0 ? 0 : _q;
            var rect = context.getRect();
            var col = context.col;
            var row = context.row;
            color = getGridThemeColor(this._grid, this.theme, col, row, color);
            font = getGridThemeFont(this._grid, this.theme, col, row, font);
            this.drawWithClip(context, function (ctx) {
                var xOffset = rect.left;
                var lineNodeSpace = 0;
                if (treeInfo) {
                    var info = treeInfo;
                    var nodeRadius = 5;
                    var rectTop = rect.top;
                    var rectMiddle = rectTop + rect.height / 2;
                    var rectBottom = rectTop + rect.height;
                    lineNodeSpace = treeNodeSpace;
                    ctx.strokeStyle = _this.getColor(lineColor, col, row, ctx);
                    ctx.beginPath();
                    for (var i = 0; i < info.level; i++) {
                        xOffset += lineNodeSpace;
                        var isLastLevel = i === info.level - 1;
                        var isLastRecord = info.levelLast[i];
                        if (isLastLevel || !isLastRecord) {
                            ctx.moveTo(xOffset, rectTop);
                            if (isLastRecord) {
                                ctx.lineTo(xOffset, rectMiddle);
                            }
                            else {
                                ctx.lineTo(xOffset, rectBottom);
                            }
                            if (isLastLevel) {
                                ctx.moveTo(xOffset, rectMiddle);
                                ctx.lineTo(xOffset + lineNodeSpace - nodeRadius, rectMiddle);
                            }
                        }
                    }
                    ctx.stroke();
                    if (!info.isLeaf) {
                        ctx.beginPath();
                        ctx.strokeStyle = _this.getColor(buttonBorderColor, col, row, ctx);
                        ctx.moveTo(xOffset + lineNodeSpace + nodeRadius, rectMiddle);
                        ctx.arc(xOffset + lineNodeSpace, rectMiddle, nodeRadius, 0, 2 * Math.PI);
                        ctx.fillStyle = _this.getColor(buttonBgColor, col, row, ctx);
                        ctx.fill();
                        ctx.stroke();
                        if (info.expanded) {
                            ctx.beginPath();
                            ctx.strokeStyle = _this.getColor(lineColor, col, row, ctx);
                            ctx.moveTo(xOffset + lineNodeSpace, rectMiddle + nodeRadius);
                            ctx.lineTo(xOffset + lineNodeSpace, rectBottom);
                            ctx.stroke();
                        }
                        // 减号
                        var symbolRadius = nodeRadius - 2;
                        ctx.beginPath();
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = _this.getColor(buttonColor, col, row, ctx);
                        ctx.moveTo(xOffset + lineNodeSpace - symbolRadius, rectMiddle);
                        ctx.lineTo(xOffset + lineNodeSpace + symbolRadius, rectMiddle);
                        if (!info.expanded) {
                            // 加号
                            ctx.moveTo(xOffset + lineNodeSpace, rectMiddle - symbolRadius);
                            ctx.lineTo(xOffset + lineNodeSpace, rectMiddle + symbolRadius);
                        }
                        ctx.stroke();
                    }
                }
                rect.left = xOffset + lineNodeSpace * 2;
                font = getFont(font, context.col, context.row, _this._grid, ctx);
                if (padding) {
                    var paddingNums = _this.toBoxPixelArray(padding, context, font);
                    var left = rect.left + paddingNums[3];
                    var top_4 = rect.top + paddingNums[0];
                    var width = rect.width - paddingNums[1] - paddingNums[3];
                    var height = rect.height - paddingNums[0] - paddingNums[2];
                    rect = new Rect(left, top_4, width, height);
                }
                if (!isMultilineText) {
                    _inlineRect(_this._grid, ctx, text, rect, col, row, {
                        color: color,
                        font: font,
                        icons: icons,
                        offset: offset,
                        textAlign: textAlign,
                        textBaseline: textBaseline,
                        textOverflow: textOverflow,
                    });
                }
                else {
                    text = isDef(text) ? text + '' : '';
                    var multiInlines = text
                        .replace(/\r?\n/g, '\n')
                        .replace(/\r/g, '\n')
                        .split('\n');
                    var calculator = _this.createCalculator(context, font);
                    lineHeight = calculator.calcHeight(lineHeight);
                    _multiInlineRect(_this._grid, ctx, multiInlines, rect, col, row, {
                        autoWrapText: autoWrapText,
                        color: color,
                        font: font,
                        icons: icons,
                        lineClamp: lineClamp,
                        lineHeight: lineHeight,
                        offset: offset,
                        textAlign: textAlign,
                        textBaseline: textBaseline,
                        textOverflow: textOverflow,
                    });
                }
            });
        };
        GridCanvasHelper.prototype.attachArea = function (rect, context) {
            this.drawWithClip(context, function (ctx) {
                var sel = context.getSelection();
                var col = context.col, row = context.row;
                if (!cellInRange(sel.range, col, row)) {
                    ctx.setLineDash([4, 4]);
                }
                ctx.strokeStyle = '#D9D9D9';
                ctx.lineWidth = 1;
                var r = 2;
                var x = rect.left;
                var y = rect.top;
                var width = rect.width;
                var height = rect.height;
                ctx.beginPath();
                ctx.moveTo(x + r, y);
                ctx.arcTo(x + width, y, x + width, y + r, r);
                ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
                ctx.arcTo(x, y + height, x, y + height - r, r);
                ctx.arcTo(x, y, x + r, y, r);
                ctx.stroke();
            });
        };
        return GridCanvasHelper;
    }());

    var BaseTooltip = /** @class */ (function () {
        function BaseTooltip(grid) {
            this._grid = grid;
        }
        BaseTooltip.prototype.dispose = function () {
            this.detachTooltipElement();
            if (this._tooltipElement) {
                this._tooltipElement.dispose();
            }
            delete this._tooltipElement;
        };
        BaseTooltip.prototype.attachTooltipElement = function (col, row, content) {
            var tooltipElement = this._getTooltipElement();
            tooltipElement.attach(this._grid, col, row, content);
        };
        BaseTooltip.prototype.moveTooltipElement = function (col, row) {
            var tooltipElement = this._getTooltipElement();
            tooltipElement.move(this._grid, col, row);
        };
        BaseTooltip.prototype.detachTooltipElement = function () {
            var tooltipElement = this._getTooltipElement();
            tooltipElement.detach();
        };
        BaseTooltip.prototype._getTooltipElement = function () {
            return (this._tooltipElement ||
                (this._tooltipElement = this.createTooltipElementInternal()));
        };
        return BaseTooltip;
    }());

    var tooltipElementCss = "@keyframes kaka-grid__tooltip-element--shown-animation {\n  0% {\n    opacity: 0;\n    transform: scale(0.8) translateX(-60%);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1) translateX(-50%);\n  }\n}\n\n.kaka-grid__tooltip-element {\n  position: absolute;\n  box-sizing: border-box;\n  border-radius: 3px;\n  /* background-color: #232f34; */\n  background-color: #fff;\n  border: 1px solid #ccc;\n  box-shadow: 1px 1px 3px #ccc;\n  padding: 8px;\n  pointer-events: none;\n  user-select: none;\n  color: #333;\n}\n\n.kaka-grid__tooltip-element--hidden {\n  opacity: 0;\n  transform: translateX(-50%);\n  /* transition: opacity 75ms linear; */\n}\n\n.kaka-grid__tooltip-element--shown {\n  opacity: 1;\n  transform: translateX(-50%);\n  animation: kaka-grid__tooltip-element--shown-animation 150ms ease-out;\n}\n\n.kaka-grid__tooltip-element__content {\n  font-family: Roboto;\n  font-size: 12px;\n  font-size: 0.75rem;\n  min-height: 1em;\n  line-height: 1;\n  width: 100%;\n  display: block;\n  /* white-space: pre-wrap; */\n  margin: 0;\n  box-sizing: border-box;\n}\n";

    var CLASS_NAME = 'kaka-grid__tooltip-element';
    var CONTENT_CLASS_NAME = CLASS_NAME + "__content";
    var HIDDEN_CLASS_NAME = CLASS_NAME + "--hidden";
    var SHOWN_CLASS_NAME = CLASS_NAME + "--shown";
    var TooltipElement = /** @class */ (function () {
        function TooltipElement() {
            this._handler = new EventHandler();
            this._rootElement = this.createTooltipDomElement();
            this._messageElement = this.createTooltipMessageElement(this._rootElement, CONTENT_CLASS_NAME);
        }
        TooltipElement.prototype.dispose = function () {
            this.detach();
            var rootElement = this._rootElement;
            if (rootElement.parentElement) {
                rootElement.parentElement.removeChild(rootElement);
            }
            this._handler.dispose();
            this._messageElement = null;
        };
        TooltipElement.prototype.attach = function (grid, col, row, content) {
            var rootElement = this._rootElement;
            var messageElement = this._messageElement;
            rootElement.classList.remove(SHOWN_CLASS_NAME);
            rootElement.classList.add(HIDDEN_CLASS_NAME);
            if (messageElement) {
                this.doSetContent(messageElement, content);
            }
            if (this._attachCell(grid, col, row)) {
                rootElement.classList.add(SHOWN_CLASS_NAME);
                rootElement.classList.remove(HIDDEN_CLASS_NAME);
            }
            else {
                this._detach();
            }
        };
        TooltipElement.prototype.move = function (grid, col, row) {
            var rootElement = this._rootElement;
            if (this._attachCell(grid, col, row)) {
                rootElement.classList.add(SHOWN_CLASS_NAME);
                rootElement.classList.remove(HIDDEN_CLASS_NAME);
            }
            else {
                this._detach();
            }
        };
        TooltipElement.prototype.detach = function () {
            this._detach();
        };
        TooltipElement.prototype.createTooltipDomElement = function () {
            style$1.inject('tooltipElement', tooltipElementCss);
            var rootElement = createElement('div', {
                classList: [CLASS_NAME, HIDDEN_CLASS_NAME],
            });
            return rootElement;
        };
        TooltipElement.prototype.createTooltipMessageElement = function (rootElement, cls) {
            var messageElement = createElement('pre', { classList: [cls] });
            rootElement.appendChild(messageElement);
            return messageElement;
        };
        TooltipElement.prototype.doSetContent = function (element, content) {
            element.textContent = content;
        };
        TooltipElement.prototype._detach = function () {
            var rootElement = this._rootElement;
            if (rootElement.parentElement) {
                // rootElement.parentElement.removeChild(rootElement);
                rootElement.classList.remove(SHOWN_CLASS_NAME);
                rootElement.classList.add(HIDDEN_CLASS_NAME);
            }
        };
        TooltipElement.prototype._attachCell = function (grid, col, row) {
            var rootElement = this._rootElement;
            var _a = grid.getAttachCellsArea(grid.getCellRange(col, row)), element = _a.element, rect = _a.rect;
            var top = rect.top;
            var right = rect.right;
            var bottom = rect.bottom;
            var left = rect.left;
            var width = rect.width;
            var frozenRowCount = grid.frozenRowCount;
            var frozenColCount = grid.frozenColCount;
            if (row >= frozenRowCount && frozenRowCount > 0) {
                var frozenRect = grid.getAttachCellsArea(grid.getCellRange(col, frozenRowCount - 1)).rect;
                if (bottom < frozenRect.bottom) {
                    return false; // 超出范围
                }
            }
            else {
                if (bottom < 0) {
                    return false; // 超出范围
                }
            }
            if (col >= frozenColCount && frozenColCount > 0) {
                var frozenRect = grid.getAttachCellsArea(grid.getCellRange(frozenColCount - 1, row)).rect;
                if (right < frozenRect.right) {
                    return false; // 超出范围
                }
            }
            else {
                if (right < 0) {
                    return false; // 超出范围
                }
            }
            var offsetHeight = element.offsetHeight;
            var offsetWidth = element.offsetWidth;
            if (offsetHeight < top) {
                return false; // 超出范围
            }
            if (offsetWidth < left) {
                return false; // 超出范围
            }
            var rootTop = bottom;
            var rootLeft = left + width / 2;
            rootElement.style.top = rootTop.toFixed() + "px";
            rootElement.style.left = rootLeft.toFixed() + "px";
            rootElement.style.minWidth = width.toFixed() + "px";
            if (rootElement.parentElement !== element) {
                element.appendChild(rootElement);
            }
            var rootHeight = rootElement.offsetHeight;
            var rootWidth = rootElement.offsetWidth;
            // 底部越界
            if (rootTop + rootHeight > offsetHeight) {
                var bTop = top - rootHeight;
                rootElement.style.top = bTop.toFixed() + "px";
            }
            // 左右越界
            if (rootLeft - rootWidth / 2 < 0) {
                // 左
                var lLeft = rootWidth / 2;
                rootElement.style.left = lLeft.toFixed() + "px";
            }
            else if (rootLeft + rootWidth / 2 > offsetWidth) {
                // 右
                var rLeft = offsetWidth - rootWidth / 2;
                rootElement.style.left = rLeft.toFixed() + "px";
            }
            return true;
        };
        return TooltipElement;
    }());

    var Tooltip = /** @class */ (function (_super) {
        __extends(Tooltip, _super);
        function Tooltip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Tooltip.prototype.createTooltipElementInternal = function () {
            return new TooltipElement();
        };
        return Tooltip;
    }(BaseTooltip));

    var HtmlTooltipElement = /** @class */ (function (_super) {
        __extends(HtmlTooltipElement, _super);
        function HtmlTooltipElement() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HtmlTooltipElement.prototype.createTooltipMessageElement = function (rootElement, cls) {
            var messageElement = createElement('div', { classList: [cls] });
            rootElement.appendChild(messageElement);
            return messageElement;
        };
        HtmlTooltipElement.prototype.doSetContent = function (element, content) {
            element.innerHTML = content;
        };
        return HtmlTooltipElement;
    }(TooltipElement));

    var HtmlTooltip = /** @class */ (function (_super) {
        __extends(HtmlTooltip, _super);
        function HtmlTooltip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HtmlTooltip.prototype.createTooltipElementInternal = function () {
            return new HtmlTooltipElement();
        };
        return HtmlTooltip;
    }(BaseTooltip));

    var TOOLTIP_INSTANCE_FACTORY = {
        'overflow-html': function (grid) {
            return new HtmlTooltip(grid);
        },
        'overflow-text': function (grid) {
            return new Tooltip(grid);
        },
    };
    function getTooltipInstanceInfo(grid, col, row) {
        // overflow text tooltip
        var overflowText = grid.getCellOverflowText(col, row);
        if (overflowText) {
            var overflowType = grid.getCellOverflowType(col, row);
            return {
                content: overflowText,
                type: overflowType || 'overflow-text',
            };
        }
        return null;
    }
    var TooltipHandler = /** @class */ (function () {
        function TooltipHandler(grid) {
            this._grid = grid;
            this._tooltipInstances = {};
            this._bindGridEvent(grid);
        }
        TooltipHandler.prototype.dispose = function () {
            var tooltipInstances = this._tooltipInstances;
            for (var k in tooltipInstances) {
                tooltipInstances[k].dispose();
            }
            this._attachInfo = null;
        };
        TooltipHandler.prototype._attach = function (col, row) {
            var info = this._attachInfo;
            var instanceInfo = this._getTooltipInstanceInfo(col, row);
            if (info && (!instanceInfo || info.instance !== instanceInfo.instance)) {
                info.instance.detachTooltipElement();
                this._attachInfo = null;
            }
            if (!instanceInfo) {
                return;
            }
            var instance = instanceInfo.instance;
            instance.attachTooltipElement(col, row, instanceInfo.content);
            var range = this._grid.getCellRange(col, row);
            this._attachInfo = { range: range, instance: instance };
        };
        TooltipHandler.prototype._move = function (col, row) {
            var info = this._attachInfo;
            if (!info || !cellInRange(info.range, col, row)) {
                return;
            }
            var instance = info.instance;
            instance.moveTooltipElement(col, row);
        };
        TooltipHandler.prototype._detach = function () {
            var info = this._attachInfo;
            if (!info) {
                return;
            }
            var instance = info.instance;
            instance.detachTooltipElement();
            this._attachInfo = null;
        };
        TooltipHandler.prototype._isAttachCell = function (col, row) {
            var info = this._attachInfo;
            if (!info) {
                return false;
            }
            return cellInRange(info.range, col, row);
        };
        TooltipHandler.prototype._bindGridEvent = function (grid) {
            var _this = this;
            grid.listen(LG_EVENT_TYPE.MOUSEOVER_CELL, function (e) {
                if (e.related) {
                    if (_this._isAttachCell(e.col, e.row)) {
                        return;
                    }
                }
                _this._attach(e.col, e.row);
            });
            grid.listen(LG_EVENT_TYPE.MOUSEOUT_CELL, function (e) {
                if (e.related) {
                    if (_this._isAttachCell(e.related.col, e.related.row)) {
                        return;
                    }
                }
                _this._detach();
            });
            grid.listen(LG_EVENT_TYPE.SELECTED_CELL, function (e) {
                if (_this._isAttachCell(e.col, e.row)) {
                    _this._detach();
                }
            });
            grid.listen(LG_EVENT_TYPE.SCROLL, function () {
                var info = _this._attachInfo;
                if (!info) {
                    return;
                }
                _this._move(info.range.start.col, info.range.start.row);
            });
            grid.listen(LG_EVENT_TYPE.CHANGED_VALUE, function (e) {
                if (_this._isAttachCell(e.col, e.row)) {
                    _this._detach();
                    _this._attach(e.col, e.row);
                }
            });
        };
        TooltipHandler.prototype._getTooltipInstanceInfo = function (col, row) {
            var grid = this._grid;
            var tooltipInstances = this._tooltipInstances;
            var info = getTooltipInstanceInfo(grid, col, row);
            if (!info) {
                return null;
            }
            var type = info.type;
            var instance = tooltipInstances[type] ||
                (tooltipInstances[type] = TOOLTIP_INSTANCE_FACTORY[type](grid));
            return {
                instance: instance,
                type: type,
                content: info.content,
            };
        };
        return TooltipHandler;
    }());

    var _$3 = getListGridSymbol();
    // private methods
    function _arrayEqual(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        else {
            for (var i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }
    }
    function _getCellValues(grid, startCol, endCol, row) {
        var values = [];
        if (startCol <= endCol) {
            for (var col = startCol; col <= endCol; col++) {
                values.push(_getCellValue(grid, col, row));
            }
        }
        else {
            for (var col = startCol; col >= endCol; col--) {
                values.push(_getCellValue(grid, col, row));
            }
        }
        return values;
    }
    function _getBodyCellRange(grid, col, row) {
        var cellRange = null;
        var _a = grid[_$3], spanBodyOptions = _a.spanBodyOptions, layoutMap = _a.layoutMap;
        if (spanBodyOptions && row >= layoutMap.headerRowCount) {
            var startRow = row;
            var endRow = row;
            var startCol = spanBodyOptions.startCol, endCol = spanBodyOptions.endCol;
            if ((startCol <= col && col <= endCol) ||
                (endCol <= col && col <= startCol)) {
                var values = _getCellValues(grid, startCol, col, row);
                while (startRow > layoutMap.headerRowCount) {
                    var pValues = _getCellValues(grid, startCol, col, startRow - 1);
                    if (_arrayEqual(values, pValues)) {
                        startRow--;
                    }
                    else {
                        break;
                    }
                }
                while (endRow < grid.rowCount) {
                    var nValues = _getCellValues(grid, startCol, col, endRow + 1);
                    if (_arrayEqual(values, nValues)) {
                        endRow++;
                    }
                    else {
                        break;
                    }
                }
            }
            cellRange = {
                start: {
                    col: col,
                    row: Math.min(startRow, endRow),
                },
                end: {
                    col: col,
                    row: Math.max(startRow, endRow),
                },
            };
        }
        return cellRange;
    }
    function _getCellRange(grid, col, row) {
        var layoutMap = grid[_$3].layoutMap;
        var cellRange = layoutMap.getCellRange(col, row);
        var bodyCellRange = _getBodyCellRange(grid, col, row);
        if (bodyCellRange) {
            cellRange = cellMerge(cellRange, bodyCellRange);
        }
        var p = {
            get col() {
                return col;
            },
            get row() {
                return row;
            },
            cellRange: cellRange,
        };
        grid.fireListeners(LG_EVENT_TYPE.CELL_RANGE, p);
        return p.cellRange;
    }
    function _updateRect(grid, col, row, context) {
        context.setRectFilter(function (rect) {
            var left = rect.left, right = rect.right, top = rect.top, bottom = rect.bottom;
            var _a = _getCellRange(grid, col, row), _b = _a.start, startCol = _b.col, startRow = _b.row, _c = _a.end, endCol = _c.col, endRow = _c.row;
            for (var c = col - 1; c >= startCol; c--) {
                left -= grid.getColWidth(c);
            }
            for (var c = col + 1; c <= endCol; c++) {
                right += grid.getColWidth(c);
            }
            for (var r = row - 1; r >= startRow; r--) {
                top -= grid.getRowHeight(r);
            }
            for (var r = row + 1; r <= endRow; r++) {
                bottom += grid.getRowHeight(r);
            }
            return Rect.bounds(left, top, right, bottom);
        });
        context.range = _getCellRange(grid, col, row); // !!! TODO
    }
    function _getCellValue(grid, col, row) {
        var cellValue;
        if (row < grid[_$3].layoutMap.headerRowCount) {
            var caption = grid[_$3].layoutMap.getHeader(col, row).caption;
            cellValue = typeof caption === 'function' ? caption() : caption;
        }
        else {
            var field = grid[_$3].layoutMap.getBody(col, row).field;
            cellValue = _getField(grid, field, row);
        }
        var p = {
            get col() {
                return col;
            },
            get row() {
                return row;
            },
            cellValue: cellValue,
        };
        grid.fireListeners(LG_EVENT_TYPE.CELL_VALUE, p);
        return p.cellValue;
    }
    function _setCellValue(grid, col, row, value) {
        if (row < grid[_$3].layoutMap.headerRowCount) {
            // nop
            return false;
        }
        else {
            var field = grid[_$3].layoutMap.getBody(col, row).field;
            if (field == null) {
                return false;
            }
            var index = _getRecordIndexByRow(grid, row);
            return grid[_$3].dataSource.setField(index, field, value);
        }
    }
    function _getContentHidden(grid, col, row) {
        var contentHidden = false;
        if (row >= grid[_$3].layoutMap.headerRowCount) {
            var column = grid[_$3].layoutMap.getBody(col, row);
            if (column && column.contentHidden) {
                contentHidden = getOrApply(column.contentHidden, grid.getRowRecord(row));
            }
        }
        return contentHidden;
    }
    function _getCellMessage(grid, col, row) {
        if (row < grid[_$3].layoutMap.headerRowCount) {
            return null;
        }
        else {
            var column = grid[_$3].layoutMap.getBody(col, row);
            if (!column || !column.message) {
                return null;
            }
            return _getField(grid, column.message, row);
        }
    }
    function _getHeaderField(grid, field) {
        if (typeof field === 'function') {
            return field(grid.headerValues);
        }
        else {
            return grid.headerValues.get(field);
        }
    }
    function _hasHeaderField(grid, field) {
        var has = false;
        grid[_$3].layoutMap.headerObjects.forEach(function (cell) {
            if (cell.field === field) {
                has = true;
            }
        });
        return has;
    }
    function _getCellIcon1(grid, icon) {
        if (Array.isArray(icon)) {
            return icon.map(function (i) { return _getCellIcon1(grid, i); });
        }
        if (!obj.isObject(icon) || typeof icon === 'function') {
            return _getHeaderField(grid, icon);
        }
        var retIcon = {};
        var iconOpt = icon;
        icons.iconPropKeys.forEach(function (k) {
            if (iconOpt[k]) {
                var f = _getHeaderField(grid, iconOpt[k]);
                if (isDef(f)) {
                    retIcon[k] = f;
                }
                else {
                    if (!_hasHeaderField(grid, iconOpt[k])) {
                        retIcon[k] = iconOpt[k];
                    }
                }
            }
        });
        return retIcon;
    }
    function _getHeaderIcon(grid, col, row) {
        var icon = grid[_$3].layoutMap.getHeader(col, row).icon;
        if (icon == null) {
            return null;
        }
        return _getCellIcon1(grid, icon);
    }
    function _getCellIcon0(grid, icon, row) {
        if (Array.isArray(icon)) {
            return icon.map(function (i) { return _getCellIcon0(grid, i, row); });
        }
        if (!obj.isObject(icon) || typeof icon === 'function') {
            return _getField(grid, icon, row);
        }
        var retIcon = {};
        var iconOpt = icon;
        icons.iconPropKeys.forEach(function (k) {
            if (iconOpt[k]) {
                var f = _getField(grid, iconOpt[k], row);
                if (isDef(f)) {
                    retIcon[k] = f;
                }
                else {
                    if (!_hasField(grid, iconOpt[k], row)) {
                        retIcon[k] = iconOpt[k];
                    }
                }
            }
        });
        return retIcon;
    }
    function _getCellIcon(grid, col, row) {
        var icon = grid[_$3].layoutMap.getBody(col, row).icon;
        if (icon == null) {
            return null;
        }
        return _getCellIcon0(grid, icon, row);
    }
    function _getField(grid, field, row) {
        if (!isDef(field)) {
            return null;
        }
        if (row < grid[_$3].layoutMap.headerRowCount) {
            return null;
        }
        else {
            var index = _getRecordIndexByRow(grid, row);
            return grid[_$3].dataSource.getField(index, field);
        }
    }
    function _hasField(grid, field, row) {
        if (!isDef(field)) {
            return false;
        }
        if (row < grid[_$3].layoutMap.headerRowCount) {
            return false;
        }
        else {
            var index = _getRecordIndexByRow(grid, row);
            return grid[_$3].dataSource.hasField(index, field);
        }
    }
    function _onDrawValue(grid, cellValue, context, _a, style, draw) {
        var col = _a.col, row = _a.row;
        var helper = grid[_$3].gridCanvasHelper;
        var isEditing = !!getInlineEditingState(grid).cellRange;
        var drawCellBg = function (_a) {
            var _b = _a === void 0 ? {} : _a, bgColor = _b.bgColor;
            var fillOpt = {
                fillColor: bgColor,
                isEditing: isEditing,
            };
            // 绘制整个cell
            helper.fillCellWithState(context, fillOpt);
        };
        var drawCellBorder = function () {
            if (context.col === grid.frozenColCount - 1) {
                // 固定列规则
                var rect_1 = context.getRect();
                helper.drawWithClip(context, function (ctx) {
                    var borderColor = context.row >= grid.frozenRowCount
                        ? helper.theme.borderColor
                        : helper.theme.frozenRowsBorderColor;
                    var borderColors = helper.toBoxArray(helper.getColor(borderColor, context.col, context.row, ctx));
                    if (borderColors[1]) {
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = borderColors[1];
                        ctx.beginPath();
                        ctx.moveTo(rect_1.right - 2.5, rect_1.top);
                        ctx.lineTo(rect_1.right - 2.5, rect_1.bottom);
                        ctx.stroke();
                    }
                });
            }
            helper.borderSelection(context, {
                isEditing: isEditing,
                highlightBorderWidth: toPx(grid.highlightBorderWidth, grid[_$3].calcWidthContext),
            }); // !!! TODO
            // _borderWithState(grid, helper, context)
        };
        var clearCellBase = function () {
            helper.clearCell(context);
        };
        var drawCellBase = function (_a) {
            var _b = _a === void 0 ? {} : _a, bgColor = _b.bgColor;
            drawCellBg({ bgColor: bgColor });
            drawCellBorder();
        };
        var info = {
            getRecord: function () { return grid.getRowRecord(row); },
            getIcon: function () { return _getCellIcon(grid, col, row); },
            getMessage: function () { return _getCellMessage(grid, col, row); },
            messageHandler: grid[_$3].messageHandler,
            style: style,
            clearCellBase: clearCellBase,
            drawCellBase: drawCellBase,
            drawCellBg: drawCellBg,
            drawCellBorder: drawCellBorder,
            getCell: function () { return ({ col: col, row: row }); },
            getHeaderIcon: function () { return _getHeaderIcon(grid, col, row); },
            getContentHidden: function () { return _getContentHidden(grid, col, row); },
        };
        return draw(cellValue, info, context, grid);
    }
    // function _borderWithState<T>(
    //   grid: ListGrid<T>,
    //   helper: GridCanvasHelper<T>,
    //   context: CellContext
    // ): void {
    //   const { col, row } = context;
    //   const sel = grid.selection.select;
    //   const { layoutMap } = grid[_];
    //   const rect = context.getRect();
    //   const option: { borderColor?: ColorsPropertyDefine; lineWidth?: number } = {};
    //   const selRecordIndex = layoutMap.getRecordIndexByRow(sel.row);
    //   const selId = layoutMap.getCellId(sel.col, sel.row);
    //   function isSelectCell(col: number, row: number): boolean {
    //     if (col === sel.col && row === sel.row) {
    //       return true;
    //     }
    //     return (
    //       selId != null &&
    //       layoutMap.getCellId(col, row) === selId &&
    //       layoutMap.getRecordIndexByRow(row) === selRecordIndex
    //     );
    //   }
    //   // 边线
    //   if (isSelectCell(col, row)) {
    //     option.borderColor = helper.theme.highlightBorderColor;
    //     option.lineWidth = 2;
    //     helper.border(context, option);
    //   } else {
    //     option.lineWidth = 1;
    //     // header color
    //     const isFrozenCell = grid.isFrozenCell(col, row);
    //     if (isFrozenCell?.row) {
    //       option.borderColor = helper.theme.frozenRowsBorderColor;
    //     }
    //     helper.border(context, option);
    //     // 额外处理
    //     if (col > 0 && isSelectCell(col - 1, row)) {
    //       // 右边被选中
    //       helper.drawBorderWithClip(context, ctx => {
    //         const borderColors = helper.toBoxArray(
    //           helper.getColor(
    //             helper.theme.highlightBorderColor,
    //             sel.col,
    //             sel.row,
    //             ctx
    //           )
    //         );
    //         if (borderColors[1]) {
    //           ctx.lineWidth = 1;
    //           ctx.strokeStyle = borderColors[1];
    //           ctx.beginPath();
    //           ctx.moveTo(rect.left - 0.5, rect.top);
    //           ctx.lineTo(rect.left - 0.5, rect.bottom);
    //           ctx.stroke();
    //         }
    //       });
    //     } else if (row > 0 && isSelectCell(col, row - 1)) {
    //       // 顶部被选中
    //       helper.drawBorderWithClip(context, ctx => {
    //         const borderColors = helper.toBoxArray(
    //           helper.getColor(
    //             helper.theme.highlightBorderColor,
    //             sel.col,
    //             sel.row,
    //             ctx
    //           )
    //         );
    //         if (borderColors[0]) {
    //           ctx.lineWidth = 1;
    //           ctx.strokeStyle = borderColors[0];
    //           ctx.beginPath();
    //           ctx.moveTo(rect.left, rect.top - 0.5);
    //           ctx.lineTo(rect.right, rect.top - 0.5);
    //           ctx.stroke();
    //         }
    //       });
    //     }
    //   }
    // }
    function _refreshHeader(grid) {
        var _a;
        var protectedSpace = grid[_$3];
        if (protectedSpace.headerEvents) {
            protectedSpace.headerEvents.forEach(function (id) { return grid.unlisten(id); });
        }
        var headerEvents = (protectedSpace.headerEvents = []);
        headerEvents.forEach(function (id) { return grid.unlisten(id); });
        var layoutMap;
        if (protectedSpace.layout &&
            (!Array.isArray(protectedSpace.layout) || protectedSpace.layout.length > 0)) {
            layoutMap = protectedSpace.layoutMap = new LayoutMap(new MultiLayoutMap(protectedSpace.layout));
        }
        else {
            layoutMap = protectedSpace.layoutMap = new LayoutMap(new SimpleHeaderLayoutMap((_a = protectedSpace.header) !== null && _a !== void 0 ? _a : []));
        }
        layoutMap.hiddenHeader = protectedSpace.hiddenHeader;
        if (!grid.hiddenHeader) {
            layoutMap.headerObjects.forEach(function (cell) {
                var ids = cell.headerType.bindGridEvent(grid, cell.id);
                headerEvents.push.apply(headerEvents, ids);
                if (cell.style) {
                    if (cell.style instanceof BaseStyle$1) {
                        var id = cell.style.listen(BaseStyle$1.EVENT_TYPE.CHANGE_STYLE, function () {
                            grid.invalidate();
                        });
                        headerEvents.push(id);
                    }
                }
                if (cell.action) {
                    if (cell.action instanceof BaseAction$1) {
                        var ids_1 = cell.action.bindGridEvent(grid, cell.id);
                        headerEvents.push.apply(headerEvents, ids_1);
                    }
                }
            });
        }
        layoutMap.columnObjects.forEach(function (col) {
            if (col.action) {
                var ids = col.action.bindGridEvent(grid, col.id);
                headerEvents.push.apply(headerEvents, ids);
            }
            if (col.columnType) {
                var ids = col.columnType.bindGridEvent(grid, col.id);
                headerEvents.push.apply(headerEvents, ids);
            }
            if (col.style) {
                if (col.style instanceof columns.style.BaseStyle) {
                    var id = col.style.listen(columns.style.EVENT_TYPE.CHANGE_STYLE, function () {
                        grid.invalidate();
                    });
                    headerEvents.push(id);
                }
            }
        });
        for (var col = 0; col < layoutMap.columnWidths.length; col++) {
            var column = layoutMap.columnWidths[col];
            var width = column.width, minWidth = column.minWidth, maxWidth = column.maxWidth, disableResize = column.disableResize;
            if (width && (width > 0 || typeof width === 'string')) {
                grid.setColWidth(col, width);
            }
            if (minWidth && (minWidth > 0 || typeof minWidth === 'string')) {
                grid.setMinColWidth(col, minWidth);
            }
            if (maxWidth && (maxWidth > 0 || typeof maxWidth === 'string')) {
                grid.setMaxColWidth(col, maxWidth);
            }
            if (typeof disableResize === 'boolean') {
                grid.setColDisableResize(col, disableResize);
            }
        }
        if (!grid.hiddenHeader) {
            var headerRowHeight = grid[_$3].headerRowHeight;
            for (var row = 0; row < layoutMap.headerRowCount; row++) {
                var height = Array.isArray(headerRowHeight)
                    ? headerRowHeight[row]
                    : headerRowHeight;
                if (height && height > 0) {
                    grid.setRowHeight(row, height);
                }
            }
        }
        grid.colCount = layoutMap.colCount;
        _refreshRowCount(grid);
        grid.frozenRowCount = layoutMap.headerRowCount;
    }
    function _refreshRowCount(grid) {
        var layoutMap = grid[_$3].layoutMap;
        grid.rowCount =
            grid[_$3].dataSource.length * layoutMap.bodyRowCount +
                layoutMap.headerRowCount;
    }
    function _tryWithUpdateDataSource(grid, fn) {
        if (grid[_$3].dataSourceEventIds) {
            grid[_$3].dataSourceEventIds.forEach(function (id) { return grid[_$3].handler.off(id); });
        }
        fn(grid);
        grid[_$3].dataSourceEventIds = [
            grid[_$3].handler.on(grid[_$3].dataSource, DataSource.EVENT_TYPE.UPDATED_LENGTH, function () {
                _refreshRowCount(grid);
                grid.selection.fireSelectedEvent();
                grid.invalidate();
            }),
            grid[_$3].handler.on(grid[_$3].dataSource, DataSource.EVENT_TYPE.UPDATED_ORDER, function () {
                grid.selection.fireSelectedEvent();
                grid.invalidate();
            }),
            grid[_$3].handler.on(grid[_$3].dataSource, DataSource.EVENT_TYPE.REFRESH_DATA, function () {
                grid.selection.fireSelectedEvent();
                grid.invalidate();
            }),
        ];
    }
    function _setRecords(grid, records) {
        if (records === void 0) { records = []; }
        _tryWithUpdateDataSource(grid, function () {
            grid[_$3].records = records;
            var newDataSource = (grid[_$3].dataSource = CachedDataSource.ofArray(records));
            grid.addDisposable(newDataSource);
        });
    }
    function _setDataSource(grid, dataSource) {
        _tryWithUpdateDataSource(grid, function () {
            if (dataSource) {
                if (dataSource instanceof DataSource) {
                    grid[_$3].dataSource = dataSource;
                }
                else {
                    var newDataSource = (grid[_$3].dataSource = new CachedDataSource(dataSource));
                    grid.addDisposable(newDataSource);
                }
            }
            else {
                grid[_$3].dataSource = DataSource.EMPTY;
            }
            grid[_$3].records = null;
        });
    }
    function _getRecordIndexByRow(grid, row) {
        var layoutMap = grid[_$3].layoutMap;
        return layoutMap.getRecordIndexByRow(row);
    }
    function _onRangePaste(text, test) {
        var _this = this;
        var _a;
        if (test === void 0) { test = function () { return true; }; }
        var layoutMap = this[_$3].layoutMap;
        var selectionRange = this.selection.range;
        var start = this.getCellRange(selectionRange.start.col, selectionRange.start.row).start;
        var end = this.getCellRange(selectionRange.end.col, selectionRange.end.row).end;
        var values = parsePasteRangeBoxValues(text);
        var pasteRowCount = Math.min(Math.max(end.row - start.row + 1, values.rowCount), this.rowCount - start.row);
        var pasteColCount = Math.min(Math.max(end.col - start.col + 1, values.colCount), this.colCount - start.col);
        var hasEditable = false;
        var actionColumnsBox = [];
        for (var bodyRow = 0; bodyRow < layoutMap.bodyRowCount; bodyRow++) {
            var actionColumnsRow = [];
            actionColumnsBox.push(actionColumnsRow);
            for (var offsetCol = 0; offsetCol < pasteColCount; offsetCol++) {
                var body = layoutMap.getBody(start.col + offsetCol, bodyRow + layoutMap.headerRowCount);
                actionColumnsRow[offsetCol] = body;
                if (!hasEditable && ((_a = body.action) === null || _a === void 0 ? void 0 : _a.editable)) {
                    hasEditable = true;
                }
            }
        }
        if (!hasEditable) {
            return;
        }
        var startRow = layoutMap.getRecordStartRowByRecordIndex(layoutMap.getRecordIndexByRow(start.row));
        var startRowOffset = start.row - startRow;
        var duplicate = {};
        var actionRow = startRowOffset;
        var valuesRow = 0;
        for (var offsetRow = 0; offsetRow < pasteRowCount; offsetRow++) {
            var valuesCol = 0;
            var _loop_1 = function (offsetCol) {
                var _a = actionColumnsBox[actionRow][offsetCol], action = _a.action, id = _a.id;
                if (!duplicate[id] && (action === null || action === void 0 ? void 0 : action.editable)) {
                    duplicate[id] = true;
                    var col_1 = start.col + offsetCol;
                    var row_1 = start.row + offsetRow;
                    var cellValue_1 = values.getCellValue(valuesCol, valuesRow);
                    then(this_1.getRowRecord(row_1), function (record) {
                        then(_getCellValue(_this, col_1, row_1), function (oldValue) {
                            if (test({
                                grid: _this,
                                record: record,
                                col: col_1,
                                row: row_1,
                                value: cellValue_1,
                                oldValue: oldValue,
                            })) {
                                action.onPasteCellRangeBox(_this, { col: col_1, row: row_1 }, cellValue_1);
                            }
                        });
                    });
                }
                valuesCol++;
                if (valuesCol >= values.colCount) {
                    valuesCol = 0;
                }
            };
            var this_1 = this;
            for (var offsetCol = 0; offsetCol < pasteColCount; offsetCol++) {
                _loop_1(offsetCol);
            }
            actionRow++;
            if (actionRow >= layoutMap.bodyRowCount) {
                actionRow = 0;
                duplicate = {};
            }
            valuesRow++;
            if (valuesRow >= values.rowCount) {
                valuesRow = 0;
            }
        }
        var newEnd = {
            col: start.col + pasteColCount - 1,
            row: start.row + pasteRowCount - 1,
        };
        this.selection.range = {
            start: start,
            end: newEnd,
        };
        this.invalidateCellRange(this.selection.range);
    }
    function _onRangeDelete() {
        var _this = this;
        var _a;
        var layoutMap = this[_$3].layoutMap;
        var selectionRange = this.selection.range;
        var start = this.getCellRange(selectionRange.start.col, selectionRange.start.row).start;
        var end = this.getCellRange(selectionRange.end.col, selectionRange.end.row).end;
        var deleteRowCount = Math.min(end.row - start.row + 1, this.rowCount - start.row);
        var deleteColCount = Math.min(end.col - start.col + 1, this.colCount - start.col);
        var hasEditable = false;
        var actionColumnsBox = [];
        for (var bodyRow = 0; bodyRow < layoutMap.bodyRowCount; bodyRow++) {
            var actionColumnsRow = [];
            actionColumnsBox.push(actionColumnsRow);
            for (var offsetCol = 0; offsetCol < deleteColCount; offsetCol++) {
                var body = layoutMap.getBody(start.col + offsetCol, bodyRow + layoutMap.headerRowCount);
                actionColumnsRow[offsetCol] = body;
                if (!hasEditable && ((_a = body.action) === null || _a === void 0 ? void 0 : _a.editable)) {
                    hasEditable = true;
                }
            }
        }
        if (!hasEditable) {
            return;
        }
        var startRow = layoutMap.getRecordStartRowByRecordIndex(layoutMap.getRecordIndexByRow(start.row));
        var startRowOffset = start.row - startRow;
        var duplicate = {};
        var actionRow = startRowOffset;
        for (var offsetRow = 0; offsetRow < deleteRowCount; offsetRow++) {
            var _loop_2 = function (offsetCol) {
                var _a = actionColumnsBox[actionRow][offsetCol], action = _a.action, id = _a.id;
                if (!duplicate[id] && (action === null || action === void 0 ? void 0 : action.editable)) {
                    duplicate[id] = true;
                    var col_2 = start.col + offsetCol;
                    var row_2 = start.row + offsetRow;
                    then(this_2.getRowRecord(row_2), function (_record) {
                        then(_getCellValue(_this, col_2, row_2), function (_oldValue) {
                            action.onDeleteCellRangeBox(_this, { col: col_2, row: row_2 });
                        });
                    });
                }
            };
            var this_2 = this;
            for (var offsetCol = 0; offsetCol < deleteColCount; offsetCol++) {
                _loop_2(offsetCol);
            }
            actionRow++;
            if (actionRow >= layoutMap.bodyRowCount) {
                actionRow = 0;
                duplicate = {};
            }
        }
        this.invalidateCellRange(selectionRange);
    }
    /**
     * ListGrid
     */
    var ListGrid = /** @class */ (function (_super) {
        __extends(ListGrid, _super);
        /**
         * constructor
         * @param options - Constructor options
         */
        function ListGrid(options) {
            if (options === void 0) { options = {}; }
            var _a;
            var _this = _super.call(this, omit(options, ['colCount', 'rowCount', 'frozenRowCount'])) || this;
            _this[_$3] = {};
            var protectedSpace = _this[_$3];
            protectedSpace.disabled = options.disabled || false;
            protectedSpace.readOnly = options.readonly || false;
            protectedSpace.header = options.header || [];
            protectedSpace.layout = options.layout || [];
            protectedSpace.headerRowHeight = options.headerRowHeight || [];
            protectedSpace.hiddenHeader = !!options.hiddenHeader;
            protectedSpace.spanBodyOptions = options.spanBodyOptions || undefined;
            protectedSpace.handler = new EventHandler();
            protectedSpace.sortState = {
                col: -1,
                order: undefined,
                row: -1,
            };
            protectedSpace.gridCanvasHelper = new GridCanvasHelper(_this);
            protectedSpace.theme = themes$1.of(options.theme);
            protectedSpace.messageHandler = new MessageHandler(_this, function (col, row) { return _getCellMessage(_this, col, row); });
            protectedSpace.tooltipHandler = new TooltipHandler(_this);
            if (options.dataSource) {
                _setDataSource(_this, options.dataSource);
            }
            else {
                _setRecords(_this, options.records);
            }
            protectedSpace.allowRangePaste = (_a = options.allowRangePaste) !== null && _a !== void 0 ? _a : false;
            _refreshHeader(_this);
            _this.selection.fireSelectedEvent();
            _this.invalidate();
            if (!isDef(options.monitorResize) || options.monitorResize === true) {
                protectedSpace.handler.on(window, 'resize', function () { return _this.resize(); });
            }
            return _this;
        }
        Object.defineProperty(ListGrid, "EVENT_TYPE", {
            get: function () {
                return LG_EVENT_TYPE;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Dispose the grid instance.
         * @returns
         */
        ListGrid.prototype.dispose = function () {
            var protectedSpace = this[_$3];
            protectedSpace.handler.dispose();
            protectedSpace.messageHandler.dispose();
            protectedSpace.tooltipHandler.dispose();
            _super.prototype.dispose.call(this);
        };
        Object.defineProperty(ListGrid.prototype, "header", {
            /**
             * Define of the header with the given data.
             * <pre>
             * column options
             * -----
             * caption: header caption
             * field: field name
             * width: column width
             * minWidth: column min width
             * maxWidth: column max width
             * disableResize: column disable resize
             * icon: icon name
             * message: message key name
             * columnType: column type
             * action: column action
             * style: column style
             * headerType: header type
             * headerStyle: header style
             * headerAction: header action
             * headerField: header field name
             * sort: define sort setting
             * -----
             *
             * multiline header
             * -----
             * caption: header caption
             * columns: columns define
             * -----
             * </pre>
             */
            get: function () {
                return this[_$3].header;
            },
            set: function (header) {
                this[_$3].header = header;
                _refreshHeader(this);
                var oldRange = this.selection.range;
                var newRange = this.updateSelectionRange(this.selection.range);
                if (oldRange.start.col !== newRange.start.col ||
                    oldRange.end.col !== newRange.end.col ||
                    oldRange.start.row !== newRange.start.row ||
                    oldRange.end.row !== newRange.end.row) {
                    this.selection._forceUpdateRange();
                    this.selection.fireSelectedEvent();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "layout", {
            /**
             * The define of the layout.
             */
            get: function () {
                return this[_$3].layout;
            },
            set: function (layout) {
                this[_$3].layout = layout;
                _refreshHeader(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "recordRowCount", {
            /**
             * Get the row count per record
             */
            get: function () {
                return this[_$3].layoutMap.bodyRowCount;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "records", {
            /**
             * Records.
             */
            get: function () {
                return this[_$3].records || null;
            },
            set: function (records) {
                if (records == null) {
                    return;
                }
                _setRecords(this, records);
                _refreshRowCount(this);
                this.invalidate();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "dataSource", {
            /**
             * Data source.
             */
            get: function () {
                return this[_$3].dataSource;
            },
            set: function (dataSource) {
                _setDataSource(this, dataSource);
                _refreshRowCount(this);
                this.invalidate();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "theme", {
            /**
             * Theme.
             */
            get: function () {
                return this[_$3].theme;
            },
            set: function (theme) {
                this[_$3].theme = themes$1.of(theme);
                this.invalidate();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "allowRangePaste", {
            /**
             * If set to true to allow pasting of ranges.
             */
            get: function () {
                return this[_$3].allowRangePaste;
            },
            set: function (allowRangePaste) {
                this[_$3].allowRangePaste = allowRangePaste;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "sortState", {
            /**
             * Sort state.
             */
            get: function () {
                return this[_$3].sortState;
            },
            set: function (sortState) {
                var oldState = this.sortState;
                var oldField;
                if (oldState.col >= 0 && oldState.row >= 0) {
                    oldField = this.getHeaderField(oldState.col, oldState.row);
                }
                var newState = (this[_$3].sortState = isDef(sortState)
                    ? sortState
                    : {
                        col: -1,
                        row: -1,
                        order: undefined,
                    });
                var newField;
                if (newState.col >= 0 && newState.row >= 0) {
                    newField = this.getHeaderField(newState.col, newState.row);
                }
                // bind header value
                if (isDef(oldField) && oldField !== newField) {
                    this.setHeaderValue(oldState.col, oldState.row, undefined);
                }
                if (isDef(newField)) {
                    this.setHeaderValue(newState.col, newState.row, newState.order);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "headerValues", {
            /**
             * Header values.
             */
            get: function () {
                return this[_$3].headerValues || (this[_$3].headerValues = new Map());
            },
            set: function (headerValues) {
                this[_$3].headerValues = headerValues || new Map();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "hiddenHeader", {
            /**
             * Whether to hide the column header.
             */
            get: function () {
                return this[_$3].hiddenHeader;
            },
            set: function (hidden) {
                this[_$3].hiddenHeader = hidden;
                _refreshHeader(this);
                this.invalidate();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "disabled", {
            /**
             * Disabled.
             */
            get: function () {
                return this[_$3].disabled;
            },
            set: function (disabled) {
                this[_$3].disabled = disabled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "readOnly", {
            /**
             * Read Only.
             */
            get: function () {
                return this[_$3].readOnly;
            },
            set: function (readOnly) {
                this[_$3].readOnly = readOnly;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "readonly", {
            get: function () {
                window.console.warn("'readonly' is deprecated, please use 'readOnly' instead");
                return this.readOnly;
            },
            set: function (readOnly) {
                window.console.warn("'readonly' is deprecated, please use 'readOnly' instead");
                this.readOnly = readOnly;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListGrid.prototype, "spanBodyOptions", {
            /**
             * Span Body
             */
            get: function () {
                var _a;
                return (_a = this[_$3].spanBodyOptions) !== null && _a !== void 0 ? _a : null;
            },
            set: function (spanBodyOptions) {
                this[_$3].spanBodyOptions = spanBodyOptions !== null && spanBodyOptions !== void 0 ? spanBodyOptions : undefined;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Get the field of the given column index.
         * @param col - The column index.
         * @param row - The row index.
         * @returns The field object.
         */
        ListGrid.prototype.getField = function (col, row) {
            return this[_$3].layoutMap.getBody(col, row !== null && row !== void 0 ? row : this[_$3].layoutMap.headerRowCount).field;
        };
        /**
         * Get the column define of the given column index.
         * @param col - The column index.
         * @param row - The row index.
         * @returns The column define object.
         */
        ListGrid.prototype.getColumnDefine = function (col, row) {
            return this[_$3].layoutMap.getBody(col, row !== null && row !== void 0 ? row : this[_$3].layoutMap.headerRowCount).define;
        };
        ListGrid.prototype.getColumnType = function (col, row) {
            return this[_$3].layoutMap.getBody(col, row).columnType;
        };
        /**
         * Get the header field of the given header cell.
         * @param col - The column index.
         * @param row - The header row index.
         * @returns The field object.
         */
        ListGrid.prototype.getHeaderField = function (col, row) {
            var hd = this[_$3].layoutMap.getHeader(col, row);
            return hd.field;
        };
        /**
         * Get the header define of the given header cell.
         * @param col - The column index.
         * @param row - The header row index.
         * @returns The header define object.
         */
        ListGrid.prototype.getHeaderDefine = function (col, row) {
            var hd = this[_$3].layoutMap.getHeader(col, row);
            return hd.define;
        };
        /**
         * Get the column of the given column index.
         * @param col - The column index.
         * @returns The field object.
         */
        ListGrid.prototype.getColumn = function (col, row) {
            return this[_$3].layoutMap.getBody(col, row || 0);
        };
        /**
         * Get the record of the given row index.
         * @param row - The row index.
         * @returns The record.
         */
        ListGrid.prototype.getRowRecord = function (row) {
            if (row < this[_$3].layoutMap.headerRowCount) {
                return undefined;
            }
            else {
                return this[_$3].dataSource.get(_getRecordIndexByRow(this, row));
            }
        };
        /**
         * Get the record index of the given row index.
         * @param row -  The row index.
         * @returns The record index.
         */
        ListGrid.prototype.getRecordIndexByRow = function (row) {
            return _getRecordIndexByRow(this, row);
        };
        /**
         * Get the record index of the given row index.
         * @param row - The row index.
         * @returns The record index.
         */
        ListGrid.prototype.getRowRecordIndex = function (row) {
            window.console.warn("'getRowRecordIndex' is deprecated, please use 'getRecordIndexByRow' instead");
            return this.getRecordIndexByRow(row);
        };
        /**
         * Gets the row index starting at the given record index.
         * @param index - The record index.
         */
        ListGrid.prototype.getRecordStartRowByRecordIndex = function (index) {
            return this[_$3].layoutMap.getRecordStartRowByRecordIndex(index);
        };
        /**
         * Get the column index of the given field.
         * @param field - The field.
         * @returns The column index.
         */
        ListGrid.prototype.getColumnIndexByField = function (field) {
            var _a;
            var range = this.getCellRangeByField(field, 0);
            return (_a = range === null || range === void 0 ? void 0 : range.start.col) !== null && _a !== void 0 ? _a : null;
        };
        /**
         * Get the column index of the given field.
         * @param field - The field.
         * @param index - The record index
         * @returns The column index.
         */
        ListGrid.prototype.getCellRangeByField = function (field, index) {
            var layoutMap = this[_$3].layoutMap;
            var colObj = layoutMap.columnObjects.find(function (col) { return col.field === field; });
            if (colObj) {
                var layoutRange = layoutMap.getBodyLayoutRangeById(colObj.id);
                var startRow = layoutMap.getRecordStartRowByRecordIndex(index);
                return {
                    start: {
                        col: layoutRange.start.col,
                        row: startRow + layoutRange.start.row,
                    },
                    end: {
                        col: layoutRange.end.col,
                        row: startRow + layoutRange.end.row,
                    },
                };
            }
            return null;
        };
        /**
         * Focus the cell.
         * @param field - The field.
         * @param index - The record index
         * @returns
         */
        ListGrid.prototype.focusGridCell = function (field, index) {
            var _a;
            var _b = this.selection.range, _c = _b.start, startCol = _c.col, startRow = _c.row, _d = _b.end, endCol = _d.col, endRow = _d.row;
            var newFocus = (_a = this.getCellRangeByField(field, index)) === null || _a === void 0 ? void 0 : _a.start;
            if (newFocus == null) {
                return;
            }
            this.focusCell(newFocus.col, newFocus.row);
            this.selection.select = newFocus;
            this.invalidateGridRect(startCol, startRow, endCol, endRow);
            this.invalidateCell(newFocus.col, newFocus.row);
        };
        /**
         * Scroll to where cell is visible.
         * @param field - The field.
         * @param index - The record index
         * @returns
         */
        ListGrid.prototype.makeVisibleGridCell = function (field, index) {
            var _a, _b, _c;
            var cell = (_a = this.getCellRangeByField(field, index)) === null || _a === void 0 ? void 0 : _a.start;
            this.makeVisibleCell((_b = cell === null || cell === void 0 ? void 0 : cell.col) !== null && _b !== void 0 ? _b : 0, (_c = cell === null || cell === void 0 ? void 0 : cell.row) !== null && _c !== void 0 ? _c : this[_$3].layoutMap.headerRowCount);
        };
        /**
         * Select cell range
         */
        ListGrid.prototype.selectCellRange = function (startCol, startRow, endCol, endRow) {
            this.focusCell(startCol, startRow);
            this.selection.range = createCellRange(startCol, startRow, endCol, endRow);
            var _a = this.selection.range, _b = _a.start, newStartCol = _b.col, newStartRow = _b.row, _c = _a.end, newEndCol = _c.col, newEndRow = _c.row;
            this.invalidateGridRect(newStartCol, newStartRow, newEndCol, newEndRow);
        };
        ListGrid.prototype.getGridCanvasHelper = function () {
            return this[_$3].gridCanvasHelper;
        };
        /**
         * Get cell range information for a given cell.
         * @param col - column index of the cell
         * @param row - row index of the cell
         * @returns cell range info
         */
        ListGrid.prototype.getCellRange = function (col, row) {
            return _getCellRange(this, col, row);
        };
        /**
         * Get header range information for a given cell.
         * @param col - column index of the cell
         * @param row - row index of the cell
         * @returns cell range info
         */
        ListGrid.prototype.getHeaderCellRange = function (col, row) {
            window.console.warn("'getHeaderCellRange' is deprecated, please use 'getCellRange' instead");
            return this.getCellRange(col, row);
        };
        ListGrid.prototype.getCopyCellValue = function (col, row, range) {
            var _a;
            var cellRange = _getCellRange(this, col, row);
            var startCol = range
                ? Math.max(range.start.col, cellRange.start.col)
                : cellRange.start.col;
            var startRow = range
                ? Math.max(range.start.row, cellRange.start.row)
                : cellRange.start.row;
            if (startCol !== col || startRow !== row) {
                return '';
            }
            var layoutMap = this[_$3].layoutMap;
            var value = _getCellValue(this, col, row);
            if (row >= layoutMap.headerRowCount) {
                var columnType = layoutMap.getBody(col, row).columnType;
                value = (_a = columnType.getCopyCellValue(value, this, { col: col, row: row })) !== null && _a !== void 0 ? _a : value;
                value = columnType.convertCopyValue(value, { col: col, row: row }, this);
            }
            return value;
        };
        ListGrid.prototype.onDrawCell = function (col, row, context) {
            var layoutMap = this[_$3].layoutMap;
            var draw;
            var style;
            if (row < layoutMap.headerRowCount) {
                var hd = layoutMap.getHeader(col, row);
                draw = hd.headerType.onDrawCell;
                (style = hd.style);
            }
            else {
                var column = layoutMap.getBody(col, row);
                draw = column.columnType.onDrawCell;
                (style = column.style);
            }
            _updateRect(this, col, row, context);
            var cellValue = _getCellValue(this, col, row);
            return _onDrawValue(this, cellValue, context, {
                col: col,
                row: row,
            }, style, draw);
        };
        ListGrid.prototype.doGetCellValue = function (col, row, valueCallback) {
            if (row < this[_$3].layoutMap.headerRowCount) {
                // nop
                return false;
            }
            else {
                var value = _getCellValue(this, col, row);
                if (isPromise(value)) {
                    // 在延迟期间被忽略
                    return false;
                }
                valueCallback(value);
            }
            return true;
        };
        ListGrid.prototype.doChangeValue = function (col, row, changeValueCallback) {
            var _this = this;
            if (row < this[_$3].layoutMap.headerRowCount) {
                // nop
                return false;
            }
            else {
                var record_1 = this.getRowRecord(row);
                if (isPromise(record_1)) {
                    // 在延迟期间被忽略
                    return false;
                }
                var before_1 = _getCellValue(this, col, row);
                if (isPromise(before_1)) {
                    // 在延迟期间被忽略
                    return false;
                }
                var after_1 = changeValueCallback(before_1);
                if (after_1 === undefined) {
                    return false;
                }
                return then(_setCellValue(this, col, row, after_1), function (ret) {
                    if (ret) {
                        var field = _this[_$3].layoutMap.getBody(col, row).field;
                        _this.fireListeners(LG_EVENT_TYPE.CHANGED_VALUE, {
                            col: col,
                            row: row,
                            field: field,
                            record: record_1,
                            value: after_1,
                            oldValue: before_1,
                        });
                    }
                    return ret;
                });
            }
        };
        ListGrid.prototype.doSetPasteValue = function (text, test) {
            _onRangePaste.call(this, text, test);
        };
        ListGrid.prototype.getHeaderValue = function (col, row) {
            var field = this.getHeaderField(col, row);
            return this.headerValues.get(field);
        };
        ListGrid.prototype.setHeaderValue = function (col, row, newValue) {
            var field = this.getHeaderField(col, row);
            var oldValue = this.headerValues.get(field);
            this.headerValues.set(field, newValue);
            this.fireListeners(LG_EVENT_TYPE.CHANGED_HEADER_VALUE, {
                col: col,
                field: field,
                oldValue: oldValue,
                row: row,
                value: newValue,
            });
        };
        ListGrid.prototype.getLayoutCellId = function (col, row) {
            return this[_$3].layoutMap.getCellId(col, row);
        };
        ListGrid.prototype.completeEdit = function () {
            this.focus();
        };
        ListGrid.prototype.bindEventsInternal = function () {
            var _this = this;
            this.listen(LG_EVENT_TYPE.SELECTED_CELL, function (e) {
                if (e.selected) {
                    var beforeRange = _getCellRange(_this, e.before.col, e.before.row);
                    var _a = beforeRange.start, beforeStartCol = _a.col, beforeStartRow = _a.row, _b = beforeRange.end, beforeEndCol = _b.col, beforeEndRow = _b.row;
                    if (beforeStartCol !== beforeEndCol ||
                        beforeStartRow !== beforeEndRow) {
                        _this.invalidateGridRect(beforeStartCol, beforeStartRow, beforeEndCol, beforeEndRow);
                    }
                    var range = _getCellRange(_this, e.col, e.row);
                    var _c = range.start, startCol = _c.col, startRow = _c.row, _d = range.end, endCol = _d.col, endRow = _d.row;
                    if (startCol !== endCol || startRow !== endRow) {
                        _this.invalidateGridRect(startCol, startRow, endCol, endRow);
                    }
                }
            });
            this.listen(LG_EVENT_TYPE.PASTE_CELL, function (e) {
                if (!_this[_$3].allowRangePaste) {
                    return;
                }
                var _a = _this.selection.range, start = _a.start, end = _a.end;
                if (!e.multi && cellEquals(start, end)) {
                    return;
                }
                var layoutMap = _this[_$3].layoutMap;
                if (start.row < layoutMap.headerRowCount) {
                    return;
                }
                event.cancel(e.event);
                _onRangePaste.call(_this, e.normalizeValue);
            });
            this.listen(LG_EVENT_TYPE.DELETE_CELL, function (e) {
                var start = _this.selection.range.start;
                var layoutMap = _this[_$3].layoutMap;
                if (start.row < layoutMap.headerRowCount) {
                    return;
                }
                event.cancel(e.event);
                _onRangeDelete.call(_this);
            });
        };
        ListGrid.prototype.getMoveLeftColByKeyDownInternal = function (_a) {
            var col = _a.col, row = _a.row;
            var startCol = _getCellRange(this, col, row).start.col;
            col = startCol;
            return _super.prototype.getMoveLeftColByKeyDownInternal.call(this, { col: col, row: row });
        };
        ListGrid.prototype.getMoveRightColByKeyDownInternal = function (_a) {
            var col = _a.col, row = _a.row;
            var endCol = _getCellRange(this, col, row).end.col;
            col = endCol;
            return _super.prototype.getMoveRightColByKeyDownInternal.call(this, { col: col, row: row });
        };
        ListGrid.prototype.getMoveUpRowByKeyDownInternal = function (_a) {
            var col = _a.col, row = _a.row;
            var startRow = _getCellRange(this, col, row).start.row;
            row = startRow;
            return _super.prototype.getMoveUpRowByKeyDownInternal.call(this, { col: col, row: row });
        };
        ListGrid.prototype.getMoveDownRowByKeyDownInternal = function (_a) {
            var col = _a.col, row = _a.row;
            var endRow = _getCellRange(this, col, row).end.row;
            row = endRow;
            return _super.prototype.getMoveDownRowByKeyDownInternal.call(this, { col: col, row: row });
        };
        ListGrid.prototype.getOffsetInvalidateCells = function () {
            return 1;
        };
        ListGrid.prototype.getCopyRangeInternal = function (range) {
            var start = this.getCellRange(range.start.col, range.start.row).start;
            var end = this.getCellRange(range.end.col, range.end.row).end;
            return { start: start, end: end };
        };
        ListGrid.prototype.getAttachCellsAreaInternal = function (range) {
            var rect = _super.prototype.getAttachCellsAreaInternal.call(this, range);
            var _a = this.getCellRange(range.start.col, range.start.row).start, col = _a.col, row = _a.row;
            if (row >= this[_$3].layoutMap.headerRowCount) {
                var column = this[_$3].layoutMap.getBody(col, row);
                column.columnType.reviseAttachCellsArea(rect, row, this);
            }
            return rect;
        };
        ListGrid.prototype.getAttachCellsPaddingInternal = function (range) {
            var padding = _super.prototype.getAttachCellsPaddingInternal.call(this, range);
            var _a = this.getCellRange(range.start.col, range.start.row).start, col = _a.col, row = _a.row;
            if (row >= this[_$3].layoutMap.headerRowCount) {
                var column = this[_$3].layoutMap.getBody(col, row);
                column.columnType.reviseAttachCellsPadding(padding, row, this);
            }
            return padding;
        };
        ListGrid.prototype.getFocusRectInternal = function (col, row) {
            var rect = _super.prototype.getFocusRectInternal.call(this, col, row);
            if (this[_$3] && row >= this[_$3].layoutMap.headerRowCount) {
                var column = this[_$3].layoutMap.getBody(col, row);
                column.columnType.reviseFocusRect(rect, row, this);
            }
            return rect;
        };
        ListGrid.prototype.getCellOverflowTextInternal = function (cell) {
            var col = cell.col;
            var row = cell.row;
            var text = '';
            if (row >= this[_$3].layoutMap.headerRowCount) {
                var column = this[_$3].layoutMap.getBody(col, row);
                var tooltip = column.tooltip;
                var record = this.getRowRecord(row);
                if (record) {
                    if (typeof tooltip === 'function') {
                        text = tooltip.call(this, record);
                    }
                    else if (typeof tooltip === 'string') {
                        text = record[tooltip];
                    }
                }
            }
            else {
                var hd = this[_$3].layoutMap.getHeader(col, row);
                if (hd) {
                    var tooltip = hd.tooltip;
                    if (typeof tooltip === 'function') {
                        text = tooltip.call(this, {
                            cell: { col: col, row: row },
                            field: this.getHeaderField(col, row),
                        });
                    }
                    else if (typeof tooltip === 'string') {
                        text = tooltip;
                    }
                }
            }
            return text || '';
        };
        ListGrid.prototype.getCellOverflowTypeInternal = function (cell) {
            var col = cell.col;
            var row = cell.row;
            var type = '';
            if (row >= this[_$3].layoutMap.headerRowCount) {
                var column = this[_$3].layoutMap.getBody(col, row);
                var tooltipType = column.tooltipType;
                var record = this.getRowRecord(row);
                if (record) {
                    if (typeof tooltipType === 'function') {
                        type = tooltipType.call(this, record);
                    }
                    else if (typeof tooltipType === 'string') {
                        type = tooltipType;
                    }
                }
            }
            else {
                var hd = this[_$3].layoutMap.getHeader(col, row);
                if (hd) {
                    var tooltipType = hd.tooltipType;
                    if (typeof tooltipType === 'function') {
                        type = tooltipType.call(this, {
                            cell: { col: col, row: row },
                            field: this.getHeaderField(col, row),
                        });
                    }
                    else if (typeof tooltipType === 'string') {
                        type = tooltipType;
                    }
                }
            }
            return type || '';
        };
        ListGrid.prototype.getDefaultRowHeight = function () {
            return ((this[_$3] && this[_$3].gridCanvasHelper.theme.defaultRowHeight) ||
                _super.prototype.getDefaultRowHeight.call(this));
        };
        ListGrid.prototype.getDefaultColWidth = function () {
            return ((this[_$3] && this[_$3].gridCanvasHelper.theme.defaultColWidth) ||
                _super.prototype.getDefaultColWidth.call(this));
        };
        ListGrid.prototype.getHighlightBorderWidth = function () {
            return ((this[_$3] && this[_$3].gridCanvasHelper.theme.highlightBorderWidth) ||
                _super.prototype.getHighlightBorderWidth.call(this));
        };
        ListGrid.prototype.updateSelectionRange = function (range) {
            var oldStartCol = range.start.col;
            var oldStartRow = range.start.row;
            var oldEndCol = range.end.col;
            var oldEndRow = range.end.row;
            var startCol = Math.min(range.start.col, range.end.col);
            var startRow = Math.min(range.start.row, range.end.row);
            var endCol = Math.max(range.start.col, range.end.col);
            var endRow = Math.max(range.start.row, range.end.row);
            var newStartCol = startCol;
            var newStartRow = startRow;
            var newEndCol = endCol;
            var newEndRow = endRow;
            for (var row = startRow; row <= endRow; row++) {
                for (var col = startCol; col <= endCol; col++) {
                    var r = this.getCellRange(col, row);
                    newStartCol = Math.min(r.start.col, newStartCol);
                    newStartRow = Math.min(r.start.row, newStartRow);
                    newEndCol = Math.max(r.end.col, newEndCol);
                    newEndRow = Math.max(r.end.row, newEndRow);
                }
            }
            if (newStartCol < startCol) {
                if (range.start.col > range.end.col) {
                    range.end.col = newStartCol;
                }
                else {
                    range.start.col = newStartCol;
                }
            }
            if (newStartRow < startRow) {
                if (range.start.row > range.end.row) {
                    range.end.row = newStartRow;
                }
                else {
                    range.start.row = newStartRow;
                }
            }
            if (newEndCol > endCol) {
                if (range.start.col > range.end.col) {
                    range.start.col = newEndCol;
                }
                else {
                    range.end.col = newEndCol;
                }
            }
            if (newEndRow > endRow) {
                if (range.start.row > range.end.row) {
                    range.start.row = newEndRow;
                }
                else {
                    range.end.row = newEndRow;
                }
            }
            if (oldStartCol !== range.start.col ||
                oldStartRow !== range.start.row ||
                oldEndCol !== range.end.col ||
                oldEndRow !== range.end.row) {
                range = this.updateSelectionRange(range);
            }
            return range;
        };
        ListGrid.prototype.getDefaultFont = function () {
            return this[_$3].gridCanvasHelper.theme.font;
        };
        ListGrid.prototype.getDefaultUnderlayBackgroundColor = function () {
            return this[_$3].gridCanvasHelper.theme.underlayBackgroundColor;
        };
        ListGrid.prototype.getDefaultBorderColor = function () {
            return this[_$3].gridCanvasHelper.theme.gridBorderColor;
        };
        ListGrid.prototype.getDefaultBorderWidth = function () {
            return this[_$3].gridCanvasHelper.theme.gridBorderWidth;
        };
        ListGrid.prototype.fireListeners = function (type) {
            var event = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                event[_i - 1] = arguments[_i];
            }
            return _super.prototype.fireListeners.apply(this, __spreadArrays([type], event));
        };
        return ListGrid;
    }(DrawGrid));

    function registerPlugin(obj, name, value) {
        var old = obj[name];
        obj[name] = value;
        return old;
    }
    function registerPlugins(obj, values) {
        for (var k in values) {
            obj[k] = values[k];
        }
    }
    function theme$1(name, theme) {
        if (theme != null) {
            return registerPlugin(themes, name, theme);
        }
        else {
            return themes[name];
        }
    }
    function icon(name, icon) {
        if (icon != null) {
            return registerPlugin(icons$1, name, icon);
        }
        else {
            return icons$1[name];
        }
    }
    function icons$2(icons) {
        return registerPlugins(icons$1, icons);
    }
    var register = {
        theme: theme$1,
        icon: icon,
        icons: icons$2,
    };

    /**
     * Kaka Grid
     */
    var _kakaGrid = {
        version: '2.3.1',
        core: core,
        tools: tools,
        // impl Grids
        ListGrid: ListGrid,
        // objects
        columns: columns,
        data: data,
        headers: headers,
        themes: themes$1,
        // helper
        GridCanvasHelper: GridCanvasHelper,
        get icons() {
            return svgIcons.get();
        },
        template: str.template,
        // plugin registers
        register: register,
    };
    var kakaGrid;
    (function (kakaGrid) {
        kakaGrid.version = _kakaGrid.version;
        var ListGrid = /** @class */ (function (_super) {
            __extends(ListGrid, _super);
            function ListGrid() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ListGrid;
        }(_kakaGrid.ListGrid));
        kakaGrid.ListGrid = ListGrid;
        kakaGrid.core = _kakaGrid.core;
        kakaGrid.tools = _kakaGrid.tools;
        kakaGrid.columns = _kakaGrid.columns;
        kakaGrid.data = _kakaGrid.data;
        kakaGrid.headers = _kakaGrid.headers;
        kakaGrid.themes = _kakaGrid.themes;
        kakaGrid.GridCanvasHelper = _kakaGrid.GridCanvasHelper;
        kakaGrid.icons = _kakaGrid.icons;
        kakaGrid.template = _kakaGrid.template;
        kakaGrid.register = _kakaGrid.register;
    })(kakaGrid || (kakaGrid = {}));
    var kakaGrid$1 = kakaGrid;

    return kakaGrid$1;

})));
//# sourceMappingURL=kakaGrid.es5.js.map
