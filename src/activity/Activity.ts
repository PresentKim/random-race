import Component from "@/utils/Component";
import Vector2 from "@/utils/Vector2";
import BoundingBox from "@/utils/BoundingBox";
import App from "@/App";
import Widget from "@/widget/Widget";

export class ActivityIdentifier {
    private constructor(
            public readonly name: string,
            public readonly zIndex: number
    ) {
    }

    public static BACKGROUND = new ActivityIdentifier("background", 0);
    public static MAIN = new ActivityIdentifier("main", 1);
    public static HEADER = new ActivityIdentifier("header", 2);
    public static FOOTER = new ActivityIdentifier("footer", 3);
    public static OVERLAY = new ActivityIdentifier("overlay", 9);
}

export default abstract class Activity extends Component {
    public readonly camera: Vector2;

    public readonly canvas: HTMLCanvasElement
    public readonly ctx: CanvasRenderingContext2D

    protected constructor(
            public readonly app: App,
            public readonly identifier: ActivityIdentifier
    ) {
        super();

        this.camera = new Vector2();
        const canvas = document.getElementById(this.identifier.name);
        if (canvas instanceof HTMLCanvasElement) {
            this.canvas = canvas;
        } else {
            this.canvas = document.createElement("canvas");
            this.canvas.id = this.identifier.name;
            this.canvas.style.zIndex += identifier.zIndex;
        }
        this.ctx = this.createContext2D();
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

    addWidget(widget: Widget): void {
        this.children.push(widget);
        widget.onAttach(this);
    }

    render(): void {
        if (this.isDestroyed || this.isHidden())
            return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.children.forEach((component) => {
            if (!component.isAbsolute()) {
                this.ctx.save();
                this.ctx.translate(-this.camera.x, -this.camera.y);
            }
            component.render(this.ctx);
            if (!component.isAbsolute()) {
                this.ctx.restore();
            }
        });
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
