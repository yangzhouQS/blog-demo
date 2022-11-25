"use strict";
exports.__esModule = true;
exports.PolylineShape = void 0;
var tslib_1 = require("tslib");
var Path_1 = require("../Path");
var polyHelper = require("../helper/poly");
var PolylineShape = (function () {
    function PolylineShape() {
        this.points = null;
        this.percent = 1;
        this.smooth = 0;
        this.smoothConstraint = null;
    }
    return PolylineShape;
}());
exports.PolylineShape = PolylineShape;
var Polyline = (function (_super) {
    tslib_1.__extends(Polyline, _super);
    function Polyline(opts) {
        return _super.call(this, opts) || this;
    }
    Polyline.prototype.getDefaultStyle = function () {
        return {
            stroke: '#000',
            fill: null
        };
    };
    Polyline.prototype.getDefaultShape = function () {
        return new PolylineShape();
    };
    Polyline.prototype.buildPath = function (ctx, shape) {
        polyHelper.buildPath(ctx, shape, false);
    };
    return Polyline;
}(Path_1["default"]));
Polyline.prototype.type = 'polyline';
exports["default"] = Polyline;
