import RenderOption from "./RenderOption";

/**
 * @property {Component[]} children
 * @property {object} renderOption
 * @property {boolean} isDestroyed
 *
 * @property {number} hoverOutDelay
 *
 * @property {Function} onUpdate (number, Component) : void
 * @property {Function} onRender (CanvasRenderingContext2D, Component) : void
 * @property {Function} onDestroy (Component) : void
 * @property {Function} onMouseClick (Vector2, Vector2, Component) : boolean
 * @property {Function} onMouseHover (Vector2, Vector2, Component) : boolean
 * @property {Function} onMouseHoverOut (Component) : void
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
        this.onMouseClick = (absoluteVec, relativeVec, self) => {
            return false;
        };
        this.onMouseHover = (absoluteVec, relativeVec, self) => {
            return false;
        };
        this.onMouseHoverOut = (self) => {
        };
        this.setRenderOption(renderOption);
        this.init();
    }

    init() {
    }

    /** @param {number} diffSecs */
    update(diffSecs) {
        this.children = this.children.filter((component, index) => {
            if (component.isDestroyed)
                return false;

            component.update(diffSecs);
            return true;
        });

        if (this.hoverOutDelay > 0) {
            this.hoverOutDelay -= diffSecs;
            if (this.hoverOutDelay <= 0) {
                this.hoverOutDelay = 0;
                this.onMouseHoverOut(this);
            }
        }
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
    mouseClick(absoluteVec, relativeVec) {
        if (this.isDestroyed)
            return false;

        const bb = this.getBoundingBox();
        if (!bb || !bb.isVectorInside(this.isAbsolute() ? absoluteVec : relativeVec))
            return false;

        return this.onMouseClick(absoluteVec, relativeVec, this) || this.children.slice().reverse().findIndex(component => component.mouseClick(absoluteVec, relativeVec)) !== -1;
    }

    /**
     * @param {Vector2} absoluteVec
     * @param {Vector2} relativeVec
     * @return {boolean} if returns true, stop click event handling
     */
    mouseHover(absoluteVec, relativeVec) {
        if (this.isDestroyed)
            return false;

        const bb = this.getBoundingBox();
        if (!bb || !bb.isVectorInside(this.isAbsolute() ? absoluteVec : relativeVec))
            return false;

        this.hoverOutDelay = 100;
        return this.onMouseHover(absoluteVec, relativeVec, this) || this.children.slice().reverse().findIndex(component => component.mouseHover(absoluteVec, relativeVec)) !== -1;
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
    setOnMouseClick(handler) {
        this.onMouseClick = handler;
        return this;
    }

    /**
     * @param {Function} handler(Vector2,Vector2) : boolean
     * @return {Component}
     */
    setOnMouseHover(handler) {
        this.onMouseHover = handler;
        return this;
    }

    /**
     * @param {Function} handler() : void
     * @return {Component}
     */
    setOnMouseHoverOut(handler) {
        this.onMouseHoverOut = handler;
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

    /** @return {boolean} */
    isHover() {
        return this.hoverOutDelay > 0;
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