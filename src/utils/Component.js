import RenderOption from "./RenderOption";
import ClickHandler from "./ClickHandler";

/**
 * @property {Component[]} children
 * @property {object} renderOption
 */
class Component extends ClickHandler {
    /** @param {RenderOption|null} renderOption */
    constructor(renderOption = null) {
        super();
        this.children = [];

        this.renderOption = renderOption || new RenderOption();
    }

    /** @param {number} diffSecs */
    update(diffSecs) {
        this.children.forEach((component) => {
            component.update(diffSecs);
        });
    }

    /** @param {CanvasRenderingContext2D} ctx */
    handleRenderRequest(ctx) {
        ctx.save();
        this.renderOption.applyFilter(ctx);
        this.children.forEach((component) => {
            component.handleRenderRequest(ctx);
        });
        this.render(ctx);
        ctx.restore();
    }

    /** @param {CanvasRenderingContext2D} ctx */
    render(ctx) {
    }

    destroy() {
    }

    handleClick(absoluteVec, relativeVec) {
        return false;
    }

    isAbsolute() {
        return this.renderOption._absolute;
    }

    isHidden() {
        return this.renderOption._hidden;
    }

    /** @return {number} */
    getScale() {
        return this.renderOption._scale;
    }

    /** @return {BoundingBox|null} */
    getBoundingBox() {
        return null;
    }

    /** @return {BoundingBox|null} */
    getDrawBox() {
        return this.renderOption._drawBox;
    }
}

export default Component;