import Drawable from "@/sprite/Drawable";

/**
 * @property {Sprite[]} frames
 * @property {number} fps
 * @property {number} loop if is -1, infinite loop
 * @property {number} elapsedSecs
 *
 * @property {Function|null} onAnimationEnd (SpriteAnimation) : void
 */
class SpriteAnimation extends Drawable {
    /**
     * @param {Sprite[]} frames
     * @param {number} fps
     * @param {boolean} loop
     */
    constructor(frames, fps = 60, loop = -1) {
        super();
        this.frames = frames;
        this.fps = fps;
        this.loop = loop;
        this.elapsedSecs = 0;
        this.onAnimationEnd = null;
    }

    /** @return {number} */
    get w() {
        const frame = this.frame;
        if (!frame) {
            return 0;
        } else {
            return frame.w;
        }
    }

    /** @return {number} */
    get h() {
        const frame = this.frame;
        if (!frame) {
            return 0;
        } else {
            return frame.h;
        }
    }

    /** @return {number} */
    get sx() {
        const frame = this.frame;
        if (!frame) {
            return 0;
        } else {
            return frame.sx;
        }
    }

    /** @return {number} */
    get sy() {
        const frame = this.frame;
        if (!frame) {
            return 0;
        } else {
            return frame.sy;
        }
    }

    /** @return {number} */
    get ox() {
        const frame = this.frame;
        if (!frame) {
            return 0;
        } else {
            return frame.ox;
        }
    }

    /** @return {number} */
    get oy() {
        const frame = this.frame;
        if (!frame) {
            return 0;
        } else {
            return frame.oy;
        }
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

    /** @return {HTMLImageElement|null} */
    get image() {
        const frame = this.frame;
        if (!frame) {
            return null;
        } else {
            return frame.image;
        }
    }

    /** @param {string|HTMLImageElement} image */
    set image(image) {
    }

    /**
     * @param {string|HTMLImageElement} image
     * @return {Sprite}
     */
    setImage(image) {
        return this;
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
        return new SpriteAnimation(this.frames, this.fps, this.loop);
    }
}

export default SpriteAnimation;