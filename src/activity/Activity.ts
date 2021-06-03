import Component from "@/utils/Component";
import Vector2 from "@/utils/Vector2";
import BoundingBox from "@/utils/BoundingBox";
import App from "@/App";
import Widget from "@/widget/Widget";

export default class Activity extends Component {
    public readonly app: any;
    public readonly camera: Vector2;

    constructor(app: App) {
        super();

        this.app = app;
        this.camera = new Vector2();
    }

    relocation(ratio: number) {
    }

    addWidget(widget: Widget): void {
        this.children.push(widget);
        widget.onAttach(this);
    }

    render(ctx: CanvasRenderingContext2D): void {
        if (this.isDestroyed || this.isHidden())
            return;

        this.children.forEach((component) => {
            if (!component.isAbsolute()) {
                ctx.save();
                ctx.translate(-this.camera.x, -this.camera.y);
            }
            component.render(ctx);
            if (!component.isAbsolute()) {
                ctx.restore();
            }
        });
    }

    getBoundingBox(): BoundingBox {
        return BoundingBox.from(0, this.app.canvas);
    }

    isAbsolute(): boolean {
        return true;
    }

    viewport(vw: number = 0, vh: number = 0): Vector2 {
        return new Vector2(this.vw(vw), this.vh(vh));
    }

    vw(ratio: number): number {
        return this.app.canvas.width / 100 * ratio;
    }

    vh(ratio: number): number {
        return this.app.canvas.height / 100 * ratio;
    }
}
