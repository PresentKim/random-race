import Vector2 from "@/utils/Vector2";
import {getCanvasMousePos, intervalPerAnimationFrame} from "@/utils/utils";
import Activity from "@/activity/Activity";

export default class App {
    public activities: Activity[];
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    public mouseVec: Vector2;

    public elapsedSecs: number;
    public lastUpdate: number;

    constructor(canvasElement: HTMLCanvasElement) {
        this.activities = [];
        this.canvas = canvasElement;
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (!ctx)
            throw "Can't get context from canvas";

        this.ctx = ctx;
        this.mouseVec = new Vector2();
        this.elapsedSecs = 0;
        this.lastUpdate = -1;

        /**
         * Disable smoothing feature of canvas context for use a clear dot image
         * @url https://stackoverflow.com/a/18556117
         */
        //@ts-ignore
        this.ctx.webkitImageSmoothingEnabled = false;
        //@ts-ignore
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;

        this.canvas.onclick = ev => {
            if (ev.button !== 0)
                return;

            const clickVec = getCanvasMousePos(this.canvas, ev.pageX, ev.pageY, this.canvas.width, this.canvas.height);
            this.activities.slice().reverse().some(activity => {
                return activity.mouseClick(clickVec, clickVec.add(activity.camera));
            });
        };
        this.canvas.onmousemove = ev => {
            this.mouseVec = getCanvasMousePos(this.canvas, ev.pageX, ev.pageY, this.canvas.width, this.canvas.height);
        };
    }

    /** Update all activities and rendering on requestAnimationFrame (defaults, update per 1/60 sec) */
    update(): void {
        const now = Date.now();
        if (this.lastUpdate !== -1) {
            const diffSecs = this.lastUpdate === -1 ? 0 : now - this.lastUpdate;

            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.activities = this.activities.filter(activity => {
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
        intervalPerAnimationFrame(this.update.bind(this));
    }

    addActivity(activity: Activity): void {
        this.activities.push(activity);
    }
}
