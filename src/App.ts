import Vector2 from "@/utils/Vector2";
import {getCanvasMousePos, intervalPerAnimationFrame} from "@/utils/utils";
import CanvasLayer from "@/canvas/layer/CanvasLayer";
import fullscreen from "fullscreen-wrapper";
import OverlayLayer from "@/canvas/layer/OverlayLayer";
import BackgroundLayer from "@/canvas/layer/BackgroundLayer";
import HeaderLayer from "@/canvas/layer/HeaderLayer";
import FooterLayer from "@/canvas/layer/FooterLayer";
import MainLayer from "@/canvas/layer/MainLayer";
import CanvasIndex from "@/canvas/CanvasIndex";

export default class App {
    public readonly canvas: HTMLCanvasElement = CanvasIndex.OVERLAY.canvas;
    private readonly layers: CanvasLayer[] = [];
    private mouseVec: Vector2 = new Vector2();

    private lastUpdate: number = -1;

    constructor() {
        this.setLayer(new BackgroundLayer(this));
        this.setLayer(new HeaderLayer(this));
        this.setLayer(new MainLayer(this));
        this.setLayer(new FooterLayer(this));
        this.setLayer(new OverlayLayer(this));

        this.canvas.onclick = ev => {
            if (ev.button !== 0)
                return;

            const clickVec = getCanvasMousePos(this.canvas, ev.pageX, ev.pageY, this.canvas.width, this.canvas.height);
            this.layers.slice().reverse().some(layer => {
                return layer.mouseClick(clickVec, clickVec.add(layer.camera));
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

        this.resizingCanvas();
        this.update();
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

                for (const layer of this.layers) {
                    layer.update(elapsedTime);
                    layer.render();
                }
            }
            this.lastUpdate = now;

            this.layers.slice().reverse().some(layer => {
                return layer.mouseHover(this.mouseVec, this.mouseVec.add(layer.camera));
            });
        } catch (e) {
            console.error(e);
        } finally {
            intervalPerAnimationFrame(this.update.bind(this));
        }
    }

    setLayer(layer: CanvasLayer): void {
        layer.resize(this.canvas);
        if (this.layers[layer.index.index] == undefined) {
            document.body.append(layer.canvas);
        }
        this.layers[layer.index.index] = layer;
    }

    resizingCanvas() {
        const widthMin = 1080 * 16 / 9; //ratio 9:16 (Galaxy 4~)
        const widthMax = 1080 * 21 / 9; //ratio 9:21 (~Galaxy Fold)

        const beforeWidth = this.canvas.width;
        this.canvas.width = Math.min(widthMax, Math.max(widthMin, window.innerWidth / window.innerHeight * 1080));
        this.canvas.height = 1080;
        if (beforeWidth !== this.canvas.width) {
            this.mouseVec.multiply(beforeWidth / this.canvas.width, 1);

            for (const layer of this.layers) {
                layer.resize(this.canvas)
            }
        }
    }
}
