import RenderOption from "./RenderOption";

/**
 * @property {Component[]} children
 * @property {object} renderOption
 * @property {boolean} isDestroyed
 *
 * @property {Function} onUpdate (number, Component) : void
 * @property {Function} onRender (CanvasRenderingContext2D, Component) : void
 * @property {Function} onDestroy (Component) : void
 * @property {Function} onClick (Vector2, Vector2, Component) : boolean
 */
class Component {
    /** @param {RenderOption|null} renderOption */
    constructor(renderOption = null) {
        this.children = [];
        this.isDestroyed = false;
        this.onUpdate = (diffSecs, self) => {
        };
        this.onRender = (ctx, self) => {
        };
        this.onDestroy = (self) => {
        };
        this.onClick = (absoluteVec, relativeVec, self) => {
            return false;
        };
        this.setRenderOption(renderOption);
        this.init();
    }

    init() {
    }

    /** @param {number} diffSecs */
    update(diffSecs) {
        this.children.forEach((component, index) => {
            if (component.isDestroyed) {
                this.children.splice(index, 1)
                return;
            }
            component.update(diffSecs);
        });
        this.onUpdate(diffSecs, this);
    }

    /** @param {CanvasRenderingContext2D} ctx */
    render(ctx) {
        if (this.isDestroyed || this.isHidden())
            return;

        ctx.save();
        this.renderOption.applyFilter(ctx);
        this.children.forEach((component) => {
            ctx.save();
            component.render(ctx);
            ctx.restore();
        });
        this.onRender(ctx, this);
        ctx.restore();
    }

    /**
     * @param {Vector2} absoluteVec
     * @param {Vector2} relativeVec
     * @return {boolean} if returns true, stop click event handling
     */
    click(absoluteVec, relativeVec) {
        if (this.isDestroyed)
            return false;

        const bb = this.getBoundingBox();
        if (!bb)
            return false;

        if (bb.isVectorInside(this.isAbsolute() ? absoluteVec : relativeVec)) {
            return this.onClick(absoluteVec, relativeVec, this);
        }
        return false;
    }

    destroy() {
        this.isDestroyed = true;
        this.onDestroy(this);
    }

    /**
     * @param {Function} handler(number) : void
     * @return {Component}
     */
    setOnUpdate(handler) {
        this.onUpdate = handler;
        return this;
    }

    /**
     * @param {Function} handler(CanvasRenderingContext2D) : void
     * @return {Component}
     */
    setOnRender(handler) {
        this.onRender = handler;
        return this;
    }

    /**
     * @param {Function} handler(Vector2,Vector2) : boolean
     * @return {Component}
     */
    setOnClick(handler) {
        this.onClick = handler;
        return this;
    }

    /**
     * @param {RenderOption|null} option
     * @return {Component}
     */
    setRenderOption(option) {
        this.renderOption = option || new RenderOption();
        return this;
    }

    /** @return {boolean} */
    isAbsolute() {
        return this.renderOption._absolute;
    }

    /** @return {boolean} */
    isHidden() {
        return this.renderOption._hidden;
    }

    /** @return {number} */
    getScale() {
        return this.renderOption._scale;
    }

    /** @return {BoundingBox|null} */
    getDrawBox() {
        return this.renderOption._drawBox;
    }

    /** @return {BoundingBox|null} */
    getBoundingBox() {
        return null;
    }
}

export default Component;