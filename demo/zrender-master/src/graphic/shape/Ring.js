"use strict";
exports.__esModule = true;
exports.RingShape = void 0;
var tslib_1 = require("tslib");
var Path_1 = require("../Path");
var RingShape = (function () {
    function RingShape() {
        this.cx = 0;
        this.cy = 0;
        this.r = 0;
        this.r0 = 0;
    }
    return RingShape;
}());
exports.RingShape = RingShape;
var Ring = (function (_super) {
    tslib_1.__extends(Ring, _super);
    function Ring(opts) {
        return _super.call(this, opts) || this;
    }
    Ring.prototype.getDefaultShape = function () {
        return new RingShape();
    };
    Ring.prototype.buildPath = function (ctx, shape) {
        var x = shape.cx;
        var y = shape.cy;
        var PI2 = Math.PI * 2;
        ctx.moveTo(x + shape.r, y);
        ctx.arc(x, y, shape.r, 0, PI2, false);
        ctx.moveTo(x + shape.r0, y);
        ctx.arc(x, y, shape.r0, 0, PI2, true);
    };
    return Ring;
}(Path_1["default"]));
Ring.prototype.type = 'ring';
exports["default"] = Ring;