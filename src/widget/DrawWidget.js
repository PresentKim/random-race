import Widget from "./Widget";
import BoundingBox from "@/utils/BoundingBox";
import Vector2 from "@/utils/Vector2";

/**
 * @property {Drawable} drawable
 */
class DrawWidget extends Widget {
    /**
     * @param {Vector2|null} pos
     * @param {Drawable} drawable
     * @param {RenderOption|null} renderOption
     */
    constructor(pos, drawable, renderOption = null) {
        super(pos, renderOption);
        this.drawable = drawable;
    }

    init() {
        this.onRender = ctx => {
            if (!this.drawable || !this.drawable.image || !this.drawable.image.complete)
                return;

            const deltaVec = Vector2.from(this.drawable).multiply(this.getScale() / 2);
            this.drawable.draw(ctx, this.pos.subtract(deltaVec), this.getScale());
        };
        this.onUpdate = (diffSecs) => {
            this.drawable.update(diffSecs);
        };
    }

    /** @return {BoundingBox|null} */
    getBoundingBox() {
        if (!this.drawable)
            return null;

        const deltaVec = Vector2.from(this.drawable).multiply(this.getScale() / 2);
        return BoundingBox.from(this.pos).expand(deltaVec).subtract(this.drawable.ox * this.getScale(), this.drawable.oy * this.getScale());
    }

    /**
     * @param {Drawable} drawable
     * @return {DrawWidget}
     */
    setDrawable(drawable) {
        this.drawable = drawable;
        return this;
    }
}

export default DrawWidget;