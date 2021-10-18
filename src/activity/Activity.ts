import Component from "@/utils/Component";
import Vector2 from "@/utils/Vector2";
import BoundingBox from "@/utils/BoundingBox";
import App from "@/App";
import Widget from "@/widget/Widget";

export enum ActivityIdentifier {
    BACKGROUND = 0,
    MAIN = 1,
    HEADER = 2,
    FOOTER = 3,
    OVERLAY = 9,
}

export default abstract class Activity extends Component {
    public readonly camera: Vector2;

    public readonly canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

    protected constructor(
            public readonly app: App,
    ) {
        super();

        const identifier = this.getIdentifier();
        const elementId = Object.keys(ActivityIdentifier).find((name) => ActivityIdentifier[name] == identifier).toLowerCase();

        this.camera = new Vector2();
        const canvas = document.getElementById(elementId);
        if (canvas instanceof HTMLCanvasElement) {
            this.canvas = canvas;
        } else {
            this.canvas = document.createElement("canvas");
            this.canvas.id = elementId;
            this.canvas.style.zIndex = identifier.toString();
        }
        this.ctx = this.createContext2D();
    }

    abstract getIdentifier(): ActivityIdentifier;

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

        this.ctx = this.createContext2D();
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
