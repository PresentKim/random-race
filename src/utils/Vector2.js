/**
 * @property {number} x
 * @property {number} y
 */
class Vector2 {
    /**
     * @param {number|object} x
     * @param {number} y
     */
    constructor(x = 0, y = 0) {
        if (typeof x === "object") {
            const vec = Vector2.fromObject(x);
            this.x = vec.x;
            this.y = vec.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * @param {number|object} x
     * @param {number} y
     * @return {Vector2}
     */
    add(x = 0, y = 0) {
        const vec = Vector2.from(x, y);
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    /**
     * @param {number|Vector2} x
     * @param {number} y
     * @return {Vector2}
     */
    subtract(x = 0, y = 0) {
        const vec = Vector2.from(x, y);
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    /**
     * @param {number|object} x
     * @param {number} y
     * @return {Vector2}
     */
    multiply(x = 1, y = 1) {
        const vec = Vector2.from(x, y);
        return new Vector2(this.x * vec.x, this.y * vec.y);
    }

    /**
     * @param {number|object} x
     * @param {number} y
     * @return {Vector2}
     */
    divide(x = 1, y = 1) {
        const vec = Vector2.from(x, y);
        return new Vector2(this.x / vec.x, this.y / vec.y);
    }

    /**
     * @param {number|object} x
     * @param {number} y
     * @return {Vector2}
     */
    mod(x = 1, y = 1) {
        const vec = Vector2.from(x, y);
        return new Vector2(this.x % vec.x, this.y % vec.y);
    }

    /** @return {Vector2} */
    ceil() {
        return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
    }

    /** @return {Vector2} */
    floor() {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }

    /** @return {Vector2} */
    round() {
        return new Vector2(Math.fround(this.x), Math.fround(this.y));
    }

    /** @return {Vector2} */
    abs() {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    /**
     * @param {number|object} x
     * @param {number} y
     * @return {Vector2}
     */
    distance(x = 0, y = 0) {
        return Math.sqrt(this.distanceSquared(x, y));
    }

    /**
     * @param {number|object} x
     * @param {number} y
     * @return {Vector2}
     */
    distanceSquared(x = 0, y = 0) {
        const vec = Vector2.from(x, y);
        return ((this.x - vec.x) ** 2) + ((this.y - vec.y) ** 2) + ((this.z - vec.z) ** 2);
    }

    /** @return {Vector2} */
    clone() {
        return new Vector2(this.x, this.y);
    }

    /**
     * @param {number|object} value
     * @param {number} fallback
     * @return {Vector2}
     */
    static from(value, fallback) {
        if (typeof value === "object")
            return this.fromObject(value);
        else if (typeof value === "number") {
            return new Vector2(value, typeof fallback === "number" ? fallback : value);
        } else {
            console.error("Invalid value given : ");
            console.error(value);

            return new Vector2();
        }
    }

    /**
     * @param {object} obj
     * @return {Vector2}
     */
    static fromObject(obj) {
        if (obj instanceof Vector2)
            return obj;
        else if (obj.w !== undefined && obj.h !== undefined)
            return new Vector2(obj.w, obj.h);
        else if (obj.width !== undefined && obj.height !== undefined)
            return new Vector2(obj.width, obj.height);
        else {
            console.error("Invalid obj given : ");
            console.error(obj);

            return new Vector2();
        }
    }
}

export default Vector2;
