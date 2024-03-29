"use strict";
exports.__esModule = true;
exports.EllipseShape = void 0;
var tslib_1 = require("tslib");
var Path_1 = require("../Path");
var EllipseShape = (function () {
    function EllipseShape() {
        this.cx = 0;
        this.cy = 0;
        this.rx = 0;
        this.ry = 0;
    }
    return EllipseShape;
}());
exports.EllipseShape = EllipseShape;
var Ellipse = (function (_super) {
    tslib_1.__extends(Ellipse, _super);
    function Ellipse(opts) {
        return _super.call(this, opts) || this;
    }
    Ellipse.prototype.getDefaultShape = function () {
        return new EllipseShape();
    };
    Ellipse.prototype.buildPath = function (ctx, shape) {
        var k = 0.5522848;
        var x = shape.cx;
        var y = shape.cy;
        var a = shape.rx;
        var b = shape.ry;
        var ox = a * k;
        var oy = b * k;
        ctx.moveTo(x - a, y);
        ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
        ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
        ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
        ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
        ctx.closePath();
    };
    return Ellipse;
}(Path_1["default"]));
Ellipse.prototype.type = 'ellipse';
exports["default"] = Ellipse;
