/**
 * @property {boolean} _hidden = false
 * @property {boolean} _absolute = false
 * @property {number} _scale = 1
 * @property {number} _rotate = 0
 * @property {number} _hue = 0
 * @property {number} _brightness = 1
 * @property {number} _contrast = 1
 * @property {boolean} _grayscale = false
 */
class RenderOption {
    constructor() {
        this._hidden = false;
        this._absolute = false;
        this._scale = 1;
        this._rotate = 0;
        this._hue = 0;
        this._brightness = 1;
        this._contrast = 1;
        this._grayscale = false;
    }

    /**
     * @param {boolean} value = true
     * @return {RenderOption}
     */
    hidden(value = true) {
        this._hidden = value;
        return this;
    }

    /**
     * @param {boolean} value = true
     * @return {RenderOption}
     */
    static hidden(value = true) {
        return new RenderOption().hidden(value);
    }

    /**
     * @param {boolean} value = true
     * @return {RenderOption}
     */
    absolute(value = true) {
        this._absolute = value;
        return this;
    }

    /**
     * @param {boolean} value = true
     * @return {RenderOption}
     */
    static absolute(value = true) {
        return new RenderOption().absolute(value);
    }

    /**
     * @param {number} value = 1
     * @return {RenderOption}
     */
    scale(value = 1) {
        this._scale = value;
        return this;
    }

    /**
     * @param {number} value = 1
     * @return {RenderOption}
     */
    static scale(value = 1) {
        return new RenderOption().scale(value);
    }

    /**
     * @param {number} value = 0
     * @return {RenderOption}
     */
    rotate(value = 0) {
        this._rotate = value;
        return this;
    }

    /**
     * @param {number} value = 0
     * @return {RenderOption}
     */
    static rotate(value = 0) {
        return new RenderOption().rotate(value);
    }

    /**
     * @param {number} value = 0
     * @return {RenderOption}
     */
    hue(value = 0) {
        this._hue = value;
        return this;
    }

    /**
     * @param {number} value = 0
     * @return {RenderOption}
     */
    static hue(value = 0) {
        return new RenderOption().hue(value);
    }

    /**
     * @param {number} value = 1
     * @return {RenderOption}
     */
    brightness(value = 1) {
        this._brightness = value;
        return this;
    }

    /**
     * @param {number} value = 1
     * @return {RenderOption}
     */
    static brightness(value = 1) {
        return new RenderOption().brightness(value);
    }

    /**
     * @param {number} value = 1
     * @return {RenderOption}
     */
    contrast(value = 1) {
        this._contrast = value;
        return this;
    }

    /**
     * @param {number} value = 1
     * @return {RenderOption}
     */
    static contrast(value = 1) {
        return new RenderOption().contrast(value);
    }

    /**
     * @param {boolean} value = true
     * @return {RenderOption}
     */
    grayscale(value = true) {
        this._grayscale = value;
        return this;
    }

    /**
     * @param {boolean} value = true
     * @return {RenderOption}
     */
    static grayscale(value = true) {
        return new RenderOption().grayscale(value);
    }

    /** @param {CanvasRenderingContext2D} ctx */
    applyFilter(ctx) {
        if (this._rotate !== 0) ctx.rotate(-this._rotate);
        if (this._hue !== 0) ctx.filter += ` hue-rotate(${this._hue}deg) `;
        if (this._brightness !== 1) ctx.filter += ` brightness(${this._brightness}) `;
        if (this._contrast !== 1) ctx.filter += ` brightness(${this._contrast}) `;
        if (this._grayscale) ctx.filter += ` grayscale(1) `;
    }
}

export default RenderOption;
