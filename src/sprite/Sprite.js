import RenderOption from "../utils/RenderOption";

/**
 * @property {number} w
 * @property {number} h
 * @property {number} sx
 * @property {number} sy
 * @property {number} ox
 * @property {number} oy
 * @property {HTMLImageElement|null} image
 */
class Sprite {
    /**
     * @param {number} w
     * @param {number} h
     * @param {number} sx
     * @param {number} sy
     * @param {number} ox
     * @param {number} oy
     */
    constructor(w, h, sx, sy, ox = 0, oy = 0) {
        this.image = null;
        this.w = w;
        this.h = h;
        this.sx = sx;
        this.sy = sy;
        this.ox = ox;
        this.oy = oy;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x
     * @param {number} y
     *
     * @param {RenderOption} option
     */
    draw(ctx, x, y, option = null) {
        if (this.image === null)
            return;

        if (option === null) {
            option = new RenderOption();
        } else if (option._hidden)
            return;

        ctx.save();
        option.applyFilter(ctx);
        ctx.translate(x, y);
        ctx.drawImage(
                this.image,
                this.sx, this.sy,
                this.w, this.h,
                -this.ox * option._scale, -this.oy * option._scale,
                this.w * option._scale, this.h * option._scale
        );
        ctx.restore();
    }

    /**
     * @param {number} w
     * @param {number} h
     * @param {number} sx
     * @param {number} sy
     * @param {number} ox
     * @param {number} oy
     *
     * @return Sprite
     */
    static fromJson({w, h, sx, sy, ox, oy}) {
        return new Sprite(w || 0, h || 0, sx || 0, sy || 0, ox || 0, oy || 0);
    }
}

export default Sprite;