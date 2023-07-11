"use strict";
exports.__esModule = true;
exports.CircleShape = void 0;
var tslib_1 = require("tslib");
var Path_1 = require("../Path");
var CircleShape = (function () {
    function CircleShape() {
        this.cx = 0;
        this.cy = 0;
        this.r = 0;
    }
    return CircleShape;
}());
exports.CircleShape = CircleShape;
var Circle = (function (_super) {
    tslib_1.__extends(Circle, _super);
    function Circle(opts) {
        return _super.call(this, opts) || this;
    }
    Circle.prototype.getDefaultShape = function () {
        return new CircleShape();
    };
    Circle.prototype.buildPath = function (ctx, shape, inBundle) {
        if (inBundle) {
            ctx.moveTo(shape.cx + shape.r, shape.cy);
        }
        ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2);
    };
    return Circle;
}(Path_1["default"]));
;
Circle.prototype.type = 'circle';
exports["default"] = Circle;