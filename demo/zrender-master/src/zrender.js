"use strict";
/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
exports.__esModule = true;
exports.version = exports.registerPainter = exports.getInstance = exports.disposeAll = exports.dispose = exports.init = void 0;
var env_1 = require("./core/env");
var zrUtil = require("./core/util");
var Handler_1 = require("./Handler");
var Storage_1 = require("./Storage");
var Animation_1 = require("./animation/Animation");
var HandlerProxy_1 = require("./dom/HandlerProxy");
var color_1 = require("./tool/color");
var config_1 = require("./config");
var Group_1 = require("./graphic/Group");
var useVML = !env_1["default"].canvasSupported;
var painterCtors = {};
var instances = {};
function delInstance(id) {
    delete instances[id];
}
function isDarkMode(backgroundColor) {
    if (!backgroundColor) {
        return false;
    }
    if (typeof backgroundColor === 'string') {
        return color_1.lum(backgroundColor, 1) < config_1.DARK_MODE_THRESHOLD;
    }
    else if (backgroundColor.colorStops) {
        var colorStops = backgroundColor.colorStops;
        var totalLum = 0;
        var len = colorStops.length;
        for (var i = 0; i < len; i++) {
            totalLum += color_1.lum(colorStops[i].color, 1);
        }
        totalLum /= len;
        return totalLum < config_1.DARK_MODE_THRESHOLD;
    }
    return false;
}
var ZRender = (function () {
    function ZRender(id, dom, opts) {
        var _this = this;
        this._sleepAfterStill = 10;
        this._stillFrameAccum = 0;
        this._needsRefresh = true;
        this._needsRefreshHover = true;
        this._darkMode = false;
        opts = opts || {};
        this.dom = dom;
        this.id = id;
        var storage = new Storage_1["default"]();
        debugger;
        var rendererType = opts.renderer || 'canvas';
        if (useVML) {
            throw new Error('IE8 support has been dropped since 5.0');
        }
        if (!painterCtors[rendererType]) {
            var d = zrUtil.keys(painterCtors);
            console.log(d);
            debugger;
            rendererType = zrUtil.keys(painterCtors)[0];
        }
        if (!painterCtors[rendererType]) {
            throw new Error("Renderer '" + rendererType + "' is not imported. Please import it first.");
        }
        opts.useDirtyRect = opts.useDirtyRect == null
            ? false
            : opts.useDirtyRect;
        var painter = new painterCtors[rendererType](dom, storage, opts, id);
        this.storage = storage;
        this.painter = painter;
        var handerProxy = (!env_1["default"].node && !env_1["default"].worker)
            ? new HandlerProxy_1["default"](painter.getViewportRoot(), painter.root)
            : null;
        this.handler = new Handler_1["default"](storage, painter, handerProxy, painter.root);
        this.animation = new Animation_1["default"]({
            stage: {
                update: function () { return _this._flush(true); }
            }
        });
        this.animation.start();
    }
    ZRender.prototype.add = function (el) {
        if (!el) {
            return;
        }
        this.storage.addRoot(el);
        el.addSelfToZr(this);
        this.refresh();
    };
    ZRender.prototype.remove = function (el) {
        if (!el) {
            return;
        }
        this.storage.delRoot(el);
        el.removeSelfFromZr(this);
        this.refresh();
    };
    ZRender.prototype.configLayer = function (zLevel, config) {
        if (this.painter.configLayer) {
            this.painter.configLayer(zLevel, config);
        }
        this.refresh();
    };
    ZRender.prototype.setBackgroundColor = function (backgroundColor) {
        if (this.painter.setBackgroundColor) {
            this.painter.setBackgroundColor(backgroundColor);
        }
        this.refresh();
        this._backgroundColor = backgroundColor;
        this._darkMode = isDarkMode(backgroundColor);
    };
    ZRender.prototype.getBackgroundColor = function () {
        return this._backgroundColor;
    };
    ZRender.prototype.setDarkMode = function (darkMode) {
        this._darkMode = darkMode;
    };
    ZRender.prototype.isDarkMode = function () {
        return this._darkMode;
    };
    ZRender.prototype.refreshImmediately = function (fromInside) {
        if (!fromInside) {
            this.animation.update(true);
        }
        this._needsRefresh = false;
        this.painter.refresh();
        this._needsRefresh = false;
    };
    ZRender.prototype.refresh = function () {
        this._needsRefresh = true;
        this.animation.start();
    };
    ZRender.prototype.flush = function () {
        this._flush(false);
    };
    ZRender.prototype._flush = function (fromInside) {
        var triggerRendered;
        var start = new Date().getTime();
        if (this._needsRefresh) {
            triggerRendered = true;
            this.refreshImmediately(fromInside);
        }
        if (this._needsRefreshHover) {
            triggerRendered = true;
            this.refreshHoverImmediately();
        }
        var end = new Date().getTime();
        if (triggerRendered) {
            this._stillFrameAccum = 0;
            this.trigger('rendered', {
                elapsedTime: end - start
            });
        }
        else if (this._sleepAfterStill > 0) {
            this._stillFrameAccum++;
            if (this._stillFrameAccum > this._sleepAfterStill) {
                this.animation.stop();
            }
        }
    };
    ZRender.prototype.setSleepAfterStill = function (stillFramesCount) {
        this._sleepAfterStill = stillFramesCount;
    };
    ZRender.prototype.wakeUp = function () {
        this.animation.start();
        this._stillFrameAccum = 0;
    };
    ZRender.prototype.addHover = function (el) {
    };
    ZRender.prototype.removeHover = function (el) {
    };
    ZRender.prototype.clearHover = function () {
    };
    ZRender.prototype.refreshHover = function () {
        this._needsRefreshHover = true;
    };
    ZRender.prototype.refreshHoverImmediately = function () {
        this._needsRefreshHover = false;
        if (this.painter.refreshHover && this.painter.getType() === 'canvas') {
            this.painter.refreshHover();
        }
    };
    ZRender.prototype.resize = function (opts) {
        opts = opts || {};
        this.painter.resize(opts.width, opts.height);
        this.handler.resize();
    };
    ZRender.prototype.clearAnimation = function () {
        this.animation.clear();
    };
    ZRender.prototype.getWidth = function () {
        return this.painter.getWidth();
    };
    ZRender.prototype.getHeight = function () {
        return this.painter.getHeight();
    };
    ZRender.prototype.pathToImage = function (e, dpr) {
        if (this.painter.pathToImage) {
            return this.painter.pathToImage(e, dpr);
        }
    };
    ZRender.prototype.setCursorStyle = function (cursorStyle) {
        this.handler.setCursorStyle(cursorStyle);
    };
    ZRender.prototype.findHover = function (x, y) {
        return this.handler.findHover(x, y);
    };
    ZRender.prototype.on = function (eventName, eventHandler, context) {
        this.handler.on(eventName, eventHandler, context);
        return this;
    };
    ZRender.prototype.off = function (eventName, eventHandler) {
        this.handler.off(eventName, eventHandler);
    };
    ZRender.prototype.trigger = function (eventName, event) {
        this.handler.trigger(eventName, event);
    };
    ZRender.prototype.clear = function () {
        var roots = this.storage.getRoots();
        for (var i = 0; i < roots.length; i++) {
            if (roots[i] instanceof Group_1["default"]) {
                roots[i].removeSelfFromZr(this);
            }
        }
        this.storage.delAllRoots();
        this.painter.clear();
    };
    ZRender.prototype.dispose = function () {
        this.animation.stop();
        this.clear();
        this.storage.dispose();
        this.painter.dispose();
        this.handler.dispose();
        this.animation =
            this.storage =
                this.painter =
                    this.handler = null;
        delInstance(this.id);
    };
    return ZRender;
}());
function init(dom, opts) {
    var zr = new ZRender(zrUtil.guid(), dom, opts);
    instances[zr.id] = zr;
    return zr;
}
exports.init = init;
function dispose(zr) {
    zr.dispose();
}
exports.dispose = dispose;
function disposeAll() {
    for (var key in instances) {
        if (instances.hasOwnProperty(key)) {
            instances[key].dispose();
        }
    }
    instances = {};
}
exports.disposeAll = disposeAll;
function getInstance(id) {
    return instances[id];
}
exports.getInstance = getInstance;
function registerPainter(name, Ctor) {
    painterCtors[name] = Ctor;
}
exports.registerPainter = registerPainter;
exports.version = '5.1.1';
;
