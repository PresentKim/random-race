/**
 * @property {Activity[]} activities
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} ctx
 * @property {number} elapsedSecs
 * @property {number} lastUpdate
 */
class App {
    constructor(canvasElement) {
        this.activities = [];
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.elapsedSecs = 0;
        this.lastUpdate = -1;

        /**
         * Disable smoothing feature of canvas context for use a clear dot image
         * @url https://stackoverflow.com/a/18556117
         * */
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
    }

    /** Update all activities and rendering on requestAnimationFrame (defaults, update per 1/60 sec) */
    update() {
        const now = Date.now();
        if (this.lastUpdate !== -1) {
            const diffSecs = this.lastUpdate === -1 ? 0 : now - this.lastUpdate;

            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.activities.forEach((activity) => {
                activity.update(diffSecs);
                activity.render(this.ctx);
            });
        }
        this.lastUpdate = now;

        requestAnimationFrame(this.update.bind(this));
    }

    /** @param {Activity} activity */
    addActivity(activity) {
        this.activities.push(activity);
        activity.app = this;
    }
}

export default App;
