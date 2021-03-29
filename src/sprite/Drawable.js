class Drawable {
    /** @return {HTMLImageElement|null} */
    get image() {
        return null;
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

    /** @param {number} diffSecs */
    update(diffSecs) {
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Vector2|object} vecObj
     * @param {number} scale
     */
    draw(ctx, vecObj, scale = 1) {
    }
}

export default Drawable;