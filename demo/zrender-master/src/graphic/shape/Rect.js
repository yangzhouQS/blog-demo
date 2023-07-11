"use strict";
exports.__esModule = true;
exports.RectShape = void 0;
var tslib_1 = require("tslib");
var Path_1 = require("../Path");
var roundRectHelper = require("../helper/roundRect");
var subPixelOptimize_1 = require("../helper/subPixelOptimize");
var RectShape = (function () {
    function RectShape() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }
    return RectShape;
}());
exports.RectShape = RectShape;
var subPixelOptimizeOutputShape = {};
var Rect = (function (_super) {
    tslib_1.__extends(Rect, _super);
    function Rect(opts) {
        return _super.call(this, opts) || this;
    }
    Rect.prototype.getDefaultShape = function () {
        return new RectShape();
    };
    Rect.prototype.buildPath = function (ctx, shape) {
        var x;
        var y;
        var width;
        var height;
        if (this.subPixelOptimize) {
            var optimizedShape = subPixelOptimize_1.subPixelOptimizeRect(subPixelOptimizeOutputShape, shape, this.style);
            x = optimizedShape.x;
            y = optimizedShape.y;
            width = optimizedShape.width;
            height = optimizedShape.height;
            optimizedShape.r = shape.r;
            shape = optimizedShape;
        }
        else {
            x = shape.x;
            y = shape.y;
            width = shape.width;
            height = shape.height;
        }
        if (!shape.r) {
            ctx.rect(x, y, width, height);
        }
        else {
            roundRectHelper.buildPath(ctx, shape);
        }
    };
    Rect.prototype.isZeroArea = function () {
        return !this.shape.width || !this.shape.height;
    };
    return Rect;
}(Path_1["default"]));
Rect.prototype.type = 'rect';
exports["default"] = Rect;