/**
 * @property {number} x
 * @property {number} y
 */
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /** @returns {Vector2} */
    add(x = 0, y = 0) {
        return new Vector2(this.x + x, this.y + y);
    }

    /**
     * @param {Vector2} vec
     * @returns {Vector2}
     */
    addVector(vec) {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    /** @returns {Vector2} */
    subtract(x = 0, y = 0) {
        return new Vector2(this.x - x, this.y - y);
    }

    /**
     * @param {Vector2} vec
     * @returns {Vector2}
     */
    subtractVector(vec) {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    /** @returns {Vector2} */
    multiply(number = 1) {
        return new Vector2(this.x * number, this.y * number);
    }

    /** @returns {Vector2} */
    divide(number = 1) {
        return new Vector2(this.x / number, this.y / number);
    }

    /** @returns {Vector2} */
    ceil() {
        return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
    }

    /** @returns {Vector2} */
    floor() {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }

    /** @returns {Vector2} */
    round() {
        return new Vector2(Math.fround(this.x), Math.fround(this.y));
    }
}

export default Vector2;
