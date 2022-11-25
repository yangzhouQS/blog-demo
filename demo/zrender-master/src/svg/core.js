"use strict";
exports.__esModule = true;
exports.normalizeColor = exports.createElement = void 0;
var color_1 = require("../tool/color");
function createElement(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
exports.createElement = createElement;
function normalizeColor(color) {
    var opacity;
    if (!color || color === 'transparent') {
        color = 'none';
    }
    else if (typeof color === 'string' && color.indexOf('rgba') > -1) {
        var arr = color_1.parse(color);
        if (arr) {
            color = 'rgb(' + arr[0] + ',' + arr[1] + ',' + arr[2] + ')';
            opacity = arr[3];
        }
    }
    return {
        color: color,
        opacity: opacity == null ? 1 : opacity
    };
}
exports.normalizeColor = normalizeColor;
