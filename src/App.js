/**
 * @property {Activity[]} activities
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} ctx
 * @property {number} elapsedSecs
 * @property {number} lastUpdate
 */
import Vector2 from "@/utils/Vector2";

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

        this.canvas.onclick = ev => {
            for (const activity of this.activities.slice().reverse()) {
                if (ev.button !== 0)
                    break;

                const absoluteVec = new Vector2(ev.pageX, ev.pageY)
                        .subtract(this.canvas.offsetLeft, this.canvas.offsetTop)
                        .multiply(540 / this.canvas.offsetWidth);
                const relativeVec = absoluteVec.add(activity.camera);
                if (activity.handleClick(absoluteVec, relativeVec)) {
                    break;
                }
            }
        };
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
    }

    /**
     * @readonly
     * @return {number}
     */
    get width() {
        return this.canvas ? this.canvas.width : 0;
    }

    /**
     * @readonly
     * @return {number}
     */
    get height() {
        return this.canvas ? this.canvas.height : 0;
    }
}

export default App;
