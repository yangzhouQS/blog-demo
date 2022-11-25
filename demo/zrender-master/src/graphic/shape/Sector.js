"use strict";
exports.__esModule = true;
exports.SectorShape = void 0;
var tslib_1 = require("tslib");
var Path_1 = require("../Path");
var roundSectorHelper = require("../helper/roundSector");
var SectorShape = (function () {
    function SectorShape() {
        this.cx = 0;
        this.cy = 0;
        this.r0 = 0;
        this.r = 0;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.clockwise = true;
        this.cornerRadius = 0;
        this.innerCornerRadius = 0;
    }
    return SectorShape;
}());
exports.SectorShape = SectorShape;
var Sector = (function (_super) {
    tslib_1.__extends(Sector, _super);
    function Sector(opts) {
        return _super.call(this, opts) || this;
    }
    Sector.prototype.getDefaultShape = function () {
        return new SectorShape();
    };
    Sector.prototype.buildPath = function (ctx, shape) {
        roundSectorHelper.buildPath(ctx, shape);
    };
    Sector.prototype.isZeroArea = function () {
        return this.shape.startAngle === this.shape.endAngle
            || this.shape.r === this.shape.r0;
    };
    return Sector;
}(Path_1["default"]));
Sector.prototype.type = 'sector';
exports["default"] = Sector;
