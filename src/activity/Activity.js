import Component from "@/utils/Component";
import Vector2 from "@/utils/Vector2";
import BoundingBox from "@/utils/BoundingBox";

/**
 * @property {App|null} app
 * @property {Widget[]} children
 * @property {Vector2} camera
 */
class Activity extends Component {
    /** @param {App} app */
    constructor(app) {
        super();

        this.app = app;
        this.camera = new Vector2(0, 0);
    }

    /** @param {Widget} widget */
    addWidget(widget) {
        this.children.push(widget);
        widget.app = this.app;
        widget.activity = this;
    }

    render(ctx) {
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

    /**
     * @param {Vector2} absoluteVec
     * @param {Vector2} relativeVec
     * @return {boolean} if returns true, stop click event handling
     */
    click(absoluteVec, relativeVec) {
        if (this.isDestroyed)
            return false;

        for (const widget of this.children.slice().reverse()) {
            if (widget.click(absoluteVec, relativeVec)) {
                return true;
            }
        }
        return false;
    }

    getBoundingBox() {
        return BoundingBox.from(0, this.app.canvas);
    }
}

export default Activity;
