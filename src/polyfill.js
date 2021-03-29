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

Array.prototype.random = function () {
    const values = this.slice();
    return values[Math.floor(values.length * Math.random() << 0)];
};
Map.prototype.random = function () {
    return Array.from(this.values()).random();
};
Object.prototype.randomProperty = function () {
    return this[Object.keys(this).random()];
};

/**
 * @param {MouseEvent} ev
 * @param {number} verticalPixels
 * @param {number} horizontalPixels
 * @return {number[]}
 */
HTMLCanvasElement.prototype.calcMousePoint = function (ev, verticalPixels, horizontalPixels) {
    return [
        (ev.pageX - this.offsetLeft) * verticalPixels / this.offsetWidth,
        (ev.pageY - this.offsetTop) * (horizontalPixels ? horizontalPixels / this.offsetHeight : 1)
    ];
}