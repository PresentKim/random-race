import Component from "@/utils/Component";
import Vector2 from "@/utils/Vector2";
import BoundingBox from "@/utils/BoundingBox";

/**
 * @property {App|null} app
 * @property {Widget[]} children
 * @property (boolean} hidden
 * @property {Vector2} camera
 */
class Activity extends Component {
    /** @param {App} app */
    constructor(app) {
        super();

        this.app = app;
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

    /**
     * @param {Vector2} absoluteVec
     * @param {Vector2} relativeVec
     * @return {boolean} if returns true, stop click event handling
     */
    handleClick(absoluteVec, relativeVec) {
        for (const widget of this.children) {
            if (widget.handleClick(absoluteVec, relativeVec)) {
                return true;
            }
        }
        return false;
    }

    getBoundingBox() {
        return new BoundingBox(0, 0, this.app.width, this.app.height);
    }
}

export default Activity;
