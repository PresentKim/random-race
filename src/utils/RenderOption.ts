import BoundingBox from "./BoundingBox";

export default class RenderOption {
    public _hidden: boolean;
    public _absolute: boolean;
    public _scale: number;
    public _rotate: number;
    public _hue: number;
    public _brightness: number;
    public _contrast: number;
    public _grayscale: boolean;
    public _drawBox: BoundingBox | null;

    constructor() {
        this._hidden = false;
        this._absolute = false;
        this._scale = 1;
        this._rotate = 0;
        this._hue = 0;
        this._brightness = 1;
        this._contrast = 1;
        this._grayscale = false;
        this._drawBox = null;
    }

    hidden(value: boolean = true): this {
        this._hidden = value;
        return this;
    }

    absolute(value: boolean = true): this {
        this._absolute = value;
        return this;
    }

    scale(value: number = 1): this {
        this._scale = value;
        return this;
    }

    rotate(value: number = 0): this {
        this._rotate = value;
        return this;
    }

    hue(value: number = 0): this {
        this._hue = value;
        return this;
    }

    brightness(value: number = 1): this {
        this._brightness = value;
        return this;
    }

    contrast(value: number = 1): this {
        this._contrast = value;
        return this;
    }

    grayscale(value: boolean = true): this {
        this._grayscale = value;
        return this;
    }

    drawBox(value: BoundingBox | null = null): this {
        this._drawBox = value;
        return this;
    }

    applyFilter(ctx: CanvasRenderingContext2D): void {
        let filter = ctx.filter === "none" ? "" : ctx.filter;
        if (this._rotate !== 0) ctx.rotate(-this._rotate);
        if (this._hue !== 0) filter += ` hue-rotate(${this._hue}deg) `;
        if (this._brightness !== 1) filter += ` brightness(${this._brightness}) `;
        if (this._contrast !== 1) filter += ` contrast(${this._contrast}) `;
        if (this._grayscale) filter += ` grayscale(1) `;
        if (this._drawBox) {
            ctx.rect(this._drawBox.minX, this._drawBox.minY, this._drawBox.maxX, this._drawBox.maxY);
            ctx.clip();
            ctx.clearRect(this._drawBox.minX, this._drawBox.minY, this._drawBox.maxX, this._drawBox.maxY);
        }
        ctx.filter = filter;
    }
}
