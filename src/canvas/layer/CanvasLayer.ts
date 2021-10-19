import Vector2 from "@/utils/Vector2";
import BoundingBox from "@/utils/BoundingBox";
import App from "@/App";
import CanvasElement from "@/canvas/element/CanvasElement";
import CanvasIndex from "@/canvas/CanvasIndex";

export default abstract class CanvasLayer {
    private children: Array<CanvasElement> = [];

    public readonly camera: Vector2 = new Vector2();

    protected constructor(
            public readonly app: App,
            public readonly index: CanvasIndex
    ) {
    }

    get canvas(): HTMLCanvasElement {
        return this.index.canvas;
    }

    createContext2D(): CanvasRenderingContext2D {
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (!ctx)
            throw "Can't get context from canvas";
        /**
         * Disable smoothing feature of canvas context for use a clear dot image
         * @url https://github.com/niklasvh/html2canvas/issues/576#issuecomment-316739410
         */
        (ctx as any).imageSmoothingEnabled = false; //standard
        (ctx as any).mozImageSmoothingEnabled = false; //Firefox
        (ctx as any).oImageSmoothingEnabled = false; //Opera
        (ctx as any).webkitImageSmoothingEnabled = false; //Safari
        (ctx as any).msImageSmoothingEnabled = false; //IE
        return ctx;
    }

    resize(canvas: HTMLCanvasElement) {
        if (this.canvas.width !== canvas.width) {
            let ratio: number = canvas.width / this.canvas.width;

            this.canvas.width = canvas.width;
            this.canvas.height = canvas.height;

            this.relocation(ratio);
        }
    }

    relocation(ratio: number) {
    }

    appendChild(element: CanvasElement): void {
        if (!this.children.some(child => child == element)) {
            this.children.push(element)
            element.onAttached(this);
        }
    }

    removeChild(widget: CanvasElement): void {
        const index = this.children.findIndex(e => e == widget);
        if (index > -1) {
            this.children.splice(index, 1);
            widget.onUnattached();
        }
    }

    update(elapsedTime: number): void {
        for (const child of this.children) {
            child.update(elapsedTime);
        }
    }

    render(): void {
        const ctx = this.createContext2D();
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const child of this.children) {
            ctx.save();
            if (!child.isAbsolute()) {
                ctx.translate(-this.camera.x, -this.camera.y);
            }
            child.render(ctx);
            ctx.restore();
        }
    }

    /** @return {boolean} if returns true, stop click event handling */
    mouseClick(absoluteVec: Vector2, relativeVec: Vector2): boolean {
        for (const child of this.children.slice().reverse()) {
            if (child.mouseClick(absoluteVec, relativeVec)) {
                return true;
            }
        }
        return false;
    }

    /** @return {boolean} if returns true, stop click event handling */
    mouseHover(absoluteVec: Vector2, relativeVec: Vector2): boolean {
        for (const child of this.children.slice().reverse()) {
            if (child.mouseHover(absoluteVec, relativeVec)) {
                return true;
            }
        }
        return false;
    }

    getBoundingBox(): BoundingBox {
        return BoundingBox.from(0, this.canvas);
    }

    isAbsolute(): boolean {
        return true;
    }

    viewport(vw: number = 0, vh: number = 0): Vector2 {
        return new Vector2(this.vw(vw), this.vh(vh));
    }

    vw(ratio: number): number {
        return this.canvas.width / 100 * ratio;
    }

    vh(ratio: number): number {
        return this.canvas.height / 100 * ratio;
    }
}
