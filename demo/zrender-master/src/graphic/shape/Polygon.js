"use strict";
exports.__esModule = true;
exports.PolygonShape = void 0;
var tslib_1 = require("tslib");
var Path_1 = require("../Path");
var polyHelper = require("../helper/poly");
var PolygonShape = (function () {
    function PolygonShape() {
        this.points = null;
        this.smooth = 0;
        this.smoothConstraint = null;
    }
    return PolygonShape;
}());
exports.PolygonShape = PolygonShape;
var Polygon = (function (_super) {
    tslib_1.__extends(Polygon, _super);
    function Polygon(opts) {
        return _super.call(this, opts) || this;
    }
    Polygon.prototype.getDefaultShape = function () {
        return new PolygonShape();
    };
    Polygon.prototype.buildPath = function (ctx, shape) {
        polyHelper.buildPath(ctx, shape, true);
    };
    return Polygon;
}(Path_1["default"]));
;
Polygon.prototype.type = 'polygon';
exports["default"] = Polygon;
