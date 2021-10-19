import Vector2 from "@/utils/Vector2";
import {getCanvasMousePos, intervalPerAnimationFrame} from "@/utils/utils";
import Activity from "@/activity/Activity";
import fullscreen from "fullscreen-wrapper";
import OverlayActivity from "@/activity/OverlayActivity";
import BackgroundActivity from "@/activity/BackgroundActivity";
import HeaderActivity from "@/activity/HeaderActivity";
import FooterActivity from "@/activity/FooterActivity";
import MainActivity from "@/activity/MainActivity";

export default class App {
    public readonly canvas: HTMLCanvasElement;
    private activities: Activity[];
    private mouseVec: Vector2;

    private lastUpdate: number;

    constructor() {
        const overlayActivity = new OverlayActivity(this);
        this.canvas = overlayActivity.canvas

        this.activities = [];
        this.mouseVec = new Vector2();
        this.lastUpdate = -1;
        this.resizingCanvas();

        this.setActivity(new BackgroundActivity(this));
        this.setActivity(new HeaderActivity(this));
        this.setActivity(new MainActivity(this));
        this.setActivity(new FooterActivity(this));
        this.setActivity(overlayActivity)

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

        //Resize canvas when screen size and orientation changed
        window.addEventListener("resize", this.resizingCanvas.bind(this));
        window.addEventListener("orientationchange", this.resizingCanvas.bind(this));

        //Force orientation to "landscape" when full-screen enabled
        if (fullscreen.isEnabled && window.screen && screen.orientation && screen.orientation.lock) {
            fullscreen.onChange(async () => {
                if (!fullscreen.isFullscreen || window.innerWidth > window.innerHeight)
                    return;

                const orientation = screen.orientation.type;
                if (orientation !== "portrait-primary" && orientation !== "portrait-secondary")
                    return;

                await screen.orientation.lock("landscape");
            });
        }
    }

    /** Update all activities and rendering on requestAnimationFrame (defaults, update per 1/60 sec) */
    update(): void {
        try {
            const now = performance.now();
            if (this.lastUpdate !== -1) {
                const elapsedTime = this.lastUpdate === -1 ? 0 : now - this.lastUpdate;
                if (elapsedTime > 1000) {
                    this.lastUpdate = now;
                    intervalPerAnimationFrame(this.update.bind(this));
                    return;
                }

                for (const activity of this.activities) {
                    activity.update(elapsedTime);
                    activity.render();
                }
            }
            this.lastUpdate = now;

            this.activities.slice().reverse().some(activity => {
                return activity.mouseHover(this.mouseVec, this.mouseVec.add(activity.camera));
            });
        } catch (e) {
            console.error(e);
        } finally {
            intervalPerAnimationFrame(this.update.bind(this));
        }
    }

    setActivity(activity: Activity): void {
        activity.resize(this.canvas);
        if (this.activities[activity.identifier.index] == undefined) {
            document.body.append(activity.canvas);
        }
        this.activities[activity.identifier.index] = activity;
    }

    resizingCanvas() {
        const widthMin = 1080 * 16 / 9; //ratio 9:16 (Galaxy 4~)
        const widthMax = 1080 * 21 / 9; //ratio 9:21 (~Galaxy Fold)

        const beforeWidth = this.canvas.width;
        this.canvas.width = Math.min(widthMax, Math.max(widthMin, window.innerWidth / window.innerHeight * 1080));
        this.canvas.height = 1080;
        if (beforeWidth !== this.canvas.width) {
            this.mouseVec.multiply(beforeWidth / this.canvas.width, 1);

            for (const activity of this.activities) {
                activity.resize(this.canvas)
            }
        }
    }
}
