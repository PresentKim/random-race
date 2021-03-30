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
Object.prototype.clone = function () {
    const obj = {};
    Object.keys(this).forEach(key => obj[key] = this[key]);
    return obj;
};

/**
 * @param {MouseEvent} ev
 * @param {number} verticalPixels
 * @return {number[]}
 */
HTMLCanvasElement.prototype.calcMousePoint = function (ev, verticalPixels) {
    const ratio = verticalPixels / this.offsetWidth;
    return [
        (ev.pageX - this.offsetLeft) * ratio,
        (ev.pageY - this.offsetTop) * ratio
    ];
}