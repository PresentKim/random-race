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

    addWidget(widget: Widget): void {
        this.children.push(widget);
        widget.app = this.app;
        widget.activity = this;
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
}
