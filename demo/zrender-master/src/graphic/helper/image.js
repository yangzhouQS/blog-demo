"use strict";
exports.__esModule = true;
exports.isImageReady = exports.createOrUpdateImage = exports.findExistImage = void 0;
var LRU_1 = require("../../core/LRU");
var globalImageCache = new LRU_1["default"](50);
function findExistImage(newImageOrSrc) {
    if (typeof newImageOrSrc === 'string') {
        var cachedImgObj = globalImageCache.get(newImageOrSrc);
        return cachedImgObj && cachedImgObj.image;
    }
    else {
        return newImageOrSrc;
    }
}
exports.findExistImage = findExistImage;
function createOrUpdateImage(newImageOrSrc, image, hostEl, onload, cbPayload) {
    if (!newImageOrSrc) {
        return image;
    }
    else if (typeof newImageOrSrc === 'string') {
        if ((image && image.__zrImageSrc === newImageOrSrc) || !hostEl) {
            return image;
        }
        var cachedImgObj = globalImageCache.get(newImageOrSrc);
        var pendingWrap = { hostEl: hostEl, cb: onload, cbPayload: cbPayload };
        if (cachedImgObj) {
            image = cachedImgObj.image;
            !isImageReady(image) && cachedImgObj.pending.push(pendingWrap);
        }
        else {
            image = new Image();
            image.onload = image.onerror = imageOnLoad;
            globalImageCache.put(newImageOrSrc, image.__cachedImgObj = {
                image: image,
                pending: [pendingWrap]
            });
            image.src = image.__zrImageSrc = newImageOrSrc;
        }
        return image;
    }
    else {
        return newImageOrSrc;
    }
}
exports.createOrUpdateImage = createOrUpdateImage;
function imageOnLoad() {
    var cachedImgObj = this.__cachedImgObj;
    this.onload = this.onerror = this.__cachedImgObj = null;
    for (var i = 0; i < cachedImgObj.pending.length; i++) {
        var pendingWrap = cachedImgObj.pending[i];
        var cb = pendingWrap.cb;
        cb && cb(this, pendingWrap.cbPayload);
        pendingWrap.hostEl.dirty();
    }
    cachedImgObj.pending.length = 0;
}
function isImageReady(image) {
    return image && image.width && image.height;
}
exports.isImageReady = isImageReady;
