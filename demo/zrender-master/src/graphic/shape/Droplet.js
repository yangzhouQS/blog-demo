"use strict";
exports.__esModule = true;
exports.DropletShape = void 0;
var tslib_1 = require("tslib");
var Path_1 = require("../Path");
var DropletShape = (function () {
    function DropletShape() {
        this.cx = 0;
        this.cy = 0;
        this.width = 0;
        this.height = 0;
    }
    return DropletShape;
}());
exports.DropletShape = DropletShape;
var Droplet = (function (_super) {
    tslib_1.__extends(Droplet, _super);
    function Droplet(opts) {
        return _super.call(this, opts) || this;
    }
    Droplet.prototype.getDefaultShape = function () {
        return new DropletShape();
    };
    Droplet.prototype.buildPath = function (ctx, shape) {
        var x = shape.cx;
        var y = shape.cy;
        var a = shape.width;
        var b = shape.height;
        ctx.moveTo(x, y + a);
        ctx.bezierCurveTo(x + a, y + a, x + a * 3 / 2, y - a / 3, x, y - b);
        ctx.bezierCurveTo(x - a * 3 / 2, y - a / 3, x - a, y + a, x, y + a);
        ctx.closePath();
    };
    return Droplet;
}(Path_1["default"]));
Droplet.prototype.type = 'droplet';
exports["default"] = Droplet;
