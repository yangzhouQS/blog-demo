"use strict";
exports.__esModule = true;
exports.parseXML = void 0;
var util_1 = require("../core/util");
function parseXML(svg) {
    if (util_1.isString(svg)) {
        var parser = new DOMParser();
        svg = parser.parseFromString(svg, 'text/xml');
    }
    var svgNode = svg;
    if (svgNode.nodeType === 9) {
        svgNode = svgNode.firstChild;
    }
    while (svgNode.nodeName.toLowerCase() !== 'svg' || svgNode.nodeType !== 1) {
        svgNode = svgNode.nextSibling;
    }
    return svgNode;
}
exports.parseXML = parseXML;
