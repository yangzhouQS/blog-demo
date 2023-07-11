"use strict";
exports.__esModule = true;
exports.initVML = exports.createNode = exports.doc = void 0;
var env_1 = require("../core/env");
var urn = 'urn:schemas-microsoft-com:vml';
var win = typeof window === 'undefined' ? null : window;
var vmlInited = false;
exports.doc = win && win.document;
function createNode(tagName) {
    return doCreateNode(tagName);
}
exports.createNode = createNode;
var doCreateNode;
if (exports.doc && !env_1["default"].canvasSupported) {
    try {
        !exports.doc.namespaces.zrvml && exports.doc.namespaces.add('zrvml', urn);
        doCreateNode = function (tagName) {
            return exports.doc.createElement('<zrvml:' + tagName + ' class="zrvml">');
        };
    }
    catch (e) {
        doCreateNode = function (tagName) {
            return exports.doc.createElement('<' + tagName + ' xmlns="' + urn + '" class="zrvml">');
        };
    }
}
function initVML() {
    if (vmlInited || !exports.doc) {
        return;
    }
    vmlInited = true;
    var styleSheets = exports.doc.styleSheets;
    if (styleSheets.length < 31) {
        exports.doc.createStyleSheet().addRule('.zrvml', 'behavior:url(#default#VML)');
    }
    else {
        styleSheets[0].addRule('.zrvml', 'behavior:url(#default#VML)');
    }
}
exports.initVML = initVML;