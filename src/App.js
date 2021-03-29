import Vector2 from "@/utils/Vector2";

/**
 * @property {Activity[]} activities
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} ctx
 * @property {Vector2} mouseVec
 * @property {number} elapsedSecs
 * @property {number} lastUpdate
 *
 * @property {number} width @readonly
 * @property {number} height @readonly
 */
class App {
    constructor(canvasElement) {
        this.activities = [];
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.mouseVec = new Vector2();
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
            if (ev.button !== 0)
                return;

            const clickVec = new Vector2(...this.canvas.calcMousePoint(ev, 1024));
            this.activities.slice().reverse().some(activity => {
                return activity.mouseClick(clickVec, clickVec.add(activity.camera));
            });
        };
        this.canvas.onmousemove = ev => {
            this.mouseVec = new Vector2(...this.canvas.calcMousePoint(ev, 1024));
        };
    }

    /** Update all activities and rendering on requestAnimationFrame (defaults, update per 1/60 sec) */
    update() {
        const now = Date.now();
        if (this.lastUpdate !== -1) {
            const diffSecs = this.lastUpdate === -1 ? 0 : now - this.lastUpdate;

            this.ctx.fillRect(0, 0, this.width, this.height);
            this.activities = this.activities.filter((activity, index) => {
                if (activity.isDestroyed)
                    return false;

                activity.update(diffSecs);
                activity.render(this.ctx);
                return true;
            });
        }
        this.lastUpdate = now;

        this.activities.slice().reverse().some(activity => {
            return activity.mouseHover(this.mouseVec, this.mouseVec.add(activity.camera));
        });
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
