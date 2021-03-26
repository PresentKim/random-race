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
    render(ctx) {
        this.children.forEach((component) => {
            component.render(ctx);
        });
    }

    destroy() {
    }

    handleClick(absoluteVec, relativeVec) {
        return false;
    }

    isAbsolute() {
        return this.renderOption._absolute;
    }
}

export default Component;