import "@babel/polyfill";

window.requestAnimationFrame = (function () {
    // noinspection JSUnresolvedVariable
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            ((callback) => window.setTimeout(callback, 1000 / 60));
})();
Date.now = (Date.now || (() => new Date().getTime()));