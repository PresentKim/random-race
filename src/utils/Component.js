import RenderOption from "./RenderOption";

/**
 * @property {Component[]} children
 * @property {object} renderOption
 *
 * @property {Function} onUpdate (number) : void
 * @property {Function} onRender (CanvasRenderingContext2D) : void
 * @property {Function} onClick (Vector2, Vector2) : boolean
 */
class Component {
    /** @param {RenderOption|null} renderOption */
    constructor(renderOption = null) {
        this.children = [];
        this.setRenderOption(renderOption);

        this.onUpdate = (diffSecs) => {
        };
        this.onRender = (ctx) => {
        };
        this.onClick = (absoluteVec, relativeVec) => {
            return false;
        };

        this.init();
    }

    init() {
    }

    /** @param {number} diffSecs */
    update(diffSecs) {
        this.children.forEach((component) => {
            component.update(diffSecs);
        });
        if (this.onUpdate) {
            this.onUpdate(diffSecs);
        }
    }

    /** @param {CanvasRenderingContext2D} ctx */
    render(ctx) {
        if (this.isHidden())
            return;

        ctx.save();
        this.renderOption.applyFilter(ctx);
        this.children.forEach((component) => {
            ctx.save();
            component.render(ctx);
            ctx.restore();
        });
        if (this.onRender) {
            this.onRender(ctx);
        }
        ctx.restore();
    }

    /**
     * @param {Vector2} absoluteVec
     * @param {Vector2} relativeVec
     * @return {boolean} if returns true, stop click event handling
     */
    click(absoluteVec, relativeVec) {
        if (!this.onClick)
            return false;

        const bb = this.getBoundingBox();
        if (!bb)
            return false;

        if (bb.isVectorInside(this.isAbsolute() ? absoluteVec : relativeVec)) {
            return this.onClick(absoluteVec, relativeVec, this);
        }
        return false;
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