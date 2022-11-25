"use strict";
exports.__esModule = true;
exports.LineShape = void 0;
var tslib_1 = require("tslib");
var Path_1 = require("../Path");
var subPixelOptimize_1 = require("../helper/subPixelOptimize");
var subPixelOptimizeOutputShape = {};
var LineShape = (function () {
    function LineShape() {
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.percent = 1;
    }
    return LineShape;
}());
exports.LineShape = LineShape;
var Line = (function (_super) {
    tslib_1.__extends(Line, _super);
    function Line(opts) {
        return _super.call(this, opts) || this;
    }
    Line.prototype.getDefaultStyle = function () {
        return {
            stroke: '#000',
            fill: null
        };
    };
    Line.prototype.getDefaultShape = function () {
        return new LineShape();
    };
    Line.prototype.buildPath = function (ctx, shape) {
        var x1;
        var y1;
        var x2;
        var y2;
        if (this.subPixelOptimize) {
            var optimizedShape = subPixelOptimize_1.subPixelOptimizeLine(subPixelOptimizeOutputShape, shape, this.style);
            x1 = optimizedShape.x1;
            y1 = optimizedShape.y1;
            x2 = optimizedShape.x2;
            y2 = optimizedShape.y2;
        }
        else {
            x1 = shape.x1;
            y1 = shape.y1;
            x2 = shape.x2;
            y2 = shape.y2;
        }
        var percent = shape.percent;
        if (percent === 0) {
            return;
        }
        ctx.moveTo(x1, y1);
        if (percent < 1) {
            x2 = x1 * (1 - percent) + x2 * percent;
            y2 = y1 * (1 - percent) + y2 * percent;
        }
        ctx.lineTo(x2, y2);
    };
    Line.prototype.pointAt = function (p) {
        var shape = this.shape;
        return [
            shape.x1 * (1 - p) + shape.x2 * p,
            shape.y1 * (1 - p) + shape.y2 * p
        ];
    };
    return Line;
}(Path_1["default"]));
Line.prototype.type = 'line';
exports["default"] = Line;
