import App from './App';
import MainActivity from "./activity/MainActivity";

//Polly-fill
Array.prototype.last = function () {
    return (this.length > 0) ? this[this.length - 1] : null;
}
window.requestAnimationFrame = (function () {
    // noinspection JSUnresolvedVariable
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            ((callback) => window.setTimeout(callback, 1000 / 60));
})();
Date.now = (Date.now || (() => new Date().getTime()));

//Init-game
document.addEventListener('DOMContentLoaded', () => {
    const app = new App(document.getElementById('game'));
    app.addActivity(new MainActivity());
    app.update();
});
