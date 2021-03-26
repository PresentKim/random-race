import RenderOption from "./RenderOption";

/**
 * @property {Component[]} children
 * @property {object} renderOption
 */
class Component {
    /** @param {RenderOption|null} renderOption */
    constructor(renderOption = null) {
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

    isAbsolute() {
        return this.renderOption._absolute;
    }
}

export default Component;