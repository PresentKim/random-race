import Component from "../utils/Component";
import Vector2 from "../utils/Vector2";

/**
 * @property {App|null} app
 * @property {Widget[]} children
 * @property (boolean} hidden
 * @property {Vector2} camera
 */
class Activity extends Component {
    constructor() {
        super();

        this.app = null;
        this.hidden = false;
        this.camera = new Vector2(0, 0);
    }

    /** @param {Widget} widget */
    addWidget(widget) {
        this.children.push(widget);
        widget.app = this.app;
        widget.activity = this;
    }

    render(ctx) {
        if (this.hidden)
            return;

        ctx.save();
        ctx.translate(-this.camera.x, -this.camera.y);
        this.children.forEach((widget) => {
            if (!widget.isAbsolute()) {
                widget.render(ctx);
            }
        });

        ctx.restore();
        this.children.forEach((widget) => {
            if (widget.isAbsolute()) {
                widget.render(ctx);
            }
        });
    }
}

export default Activity;
