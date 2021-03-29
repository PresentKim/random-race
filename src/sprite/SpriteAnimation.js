import Drawable from "@/sprite/Drawable";
import Sprite from "@/sprite/Sprite";

/**
 * @property {HTMLImageElement} image
 * @property {Sprite[]} frames
 * @property {number} count
 * @property {number} fps
 * @property {number} loop if is -1, infinite loop
 * @property {number} elapsedSecs
 *
 * @property {Function|null} onAnimationEnd (SpriteAnimation) : void
 */
class SpriteAnimation extends Sprite {
    /**
     * @param {string|HTMLImageElement} image
     *
     * @param {number} fps
     * @param {number} w
     * @param {number} h
     * @param {number} ox
     * @param {number} oy
     * @param {number} sx
     * @param {number} sy
     * @param {number} count
     */
    constructor(image, {fps, w, h, ox, oy, sx, sy, count}) {
        super(w, h, sx, sy, ox, oy);
        super.image = image;
        this.frames = [];
        this.count = 0;
        this.fps = fps;
        this.loop = -1;
        this.elapsedSecs = 0;
        this.onAnimationEnd = null;

        for (let i = 0; i < count; ++i) {
            this.frames[i] = new Sprite(w, h, sx + i * w, sy, ox, oy).setImage(image);
            ++this.count;
        }
    }

    setImage(image) {
        super.setImage(image);
        this.frames.forEach(frame => frame.image = this.image);
        return this;
    }

    /** @return {Sprite|null} */
    get frame() {
        let frame = this.frames[Math.floor(this.elapsedSecs / this.fps)];
        if (!frame) {
            if (this.loop !== 0) {
                if (this.loop !== -1) {
                    --this.loop;
                }
                this.elapsedSecs = 0;
                frame = this.frames[0];
            } else {
                frame = this.frames[this.frames.length - 1];
                if (this.onAnimationEnd) {
                    this.onAnimationEnd(this);
                }
            }
        }
        return frame || null;
    }

    /**
     * @param {number} value
     * @return {SpriteAnimation}
     */
    setFps(value = 60) {
        this.fps = value;
        return this;
    }

    /**
     * @param {number} value
     * @return {SpriteAnimation}
     */
    setLoop(value = -1) {
        this.loop = value;
        return this;
    }

    /**
     * @param {Function} handler(SpriteAnimation) : void
     * @return {SpriteAnimation}
     */
    setOnAnimationEnd(handler) {
        this.onAnimationEnd = handler;
        return this;
    }

    /** @param {number} diffSecs */
    update(diffSecs) {
        this.elapsedSecs += diffSecs;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Vector2|object} vecObj
     * @param {number} scale
     */
    draw(ctx, vecObj, scale = 1) {
        const frame = this.frame;
        if (frame !== null) {
            frame.draw(ctx, vecObj, scale);
        }
    }

    reset() {
        this.elapsedSecs = 0;
    }

    /** @return {SpriteAnimation} */
    clone() {
        return new SpriteAnimation(this.image, this);
    }
}

export default SpriteAnimation;