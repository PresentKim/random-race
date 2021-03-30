import Vector2 from "@/utils/Vector2"

/**
 * @property {number} w
 * @property {number} h
 * @property {number} sx
 * @property {number} sy
 * @property {number} ox
 * @property {number} oy
 * @property {HTMLImageElement} image
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
    constructor(w, h, sx, sy, ox, oy) {
        this.w = w || 0;
        this.h = h || 0;
        this.sx = sx || 0;
        this.sy = sy || 0;
        this.ox = ox || 0;
        this.oy = oy || 0;
    }

    /** @return {HTMLImageElement} */
    get image() {
        if (!this._image) {
            this._image = new Image();
        }
        return this._image;
    }

    /** @param {string|HTMLImageElement} image */
    set image(image) {
        if (image instanceof HTMLImageElement) {
            this._image = image;
        } else if (typeof image === 'string' || image instanceof String) {
            this._image = new Image();
            this._image.src = image;
        }
    }

    /**
     * @param {string|HTMLImageElement} image
     * @return {Sprite}
     */
    setImage(image) {
        this.image = image;
        return this;
    }

    /** @param {number} diffSecs */
    update(diffSecs) {
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Vector2|object} vecObj
     * @param {number} scale
     */
    draw(ctx, vecObj, scale = 1) {
        if (!this.image.complete || this.image.naturalHeight === 0)
            return;

        const vec = Vector2.from(vecObj);
        ctx.save();
        ctx.translate(vec.x, vec.y);
        ctx.drawImage(
                this.image,
                this.sx, this.sy,
                this.w, this.h,
                -this.ox * scale / 2, -this.oy * scale / 2,
                this.w * scale, this.h * scale
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
        return new Sprite(w, h, sx, sy, ox, oy);
    }
}

export default Sprite;