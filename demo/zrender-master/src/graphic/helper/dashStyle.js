"use strict";
exports.__esModule = true;
exports.normalizeLineDash = void 0;
var util_1 = require("../../core/util");
function normalizeLineDash(lineType, lineWidth) {
    if (!lineType || lineType === 'solid' || !(lineWidth > 0)) {
        return null;
    }
    lineWidth = lineWidth || 1;
    return lineType === 'dashed'
        ? [4 * lineWidth, 2 * lineWidth]
        : lineType === 'dotted'
            ? [lineWidth]
            : util_1.isNumber(lineType)
                ? [lineType] : util_1.isArray(lineType) ? lineType : null;
}
exports.normalizeLineDash = normalizeLineDash;