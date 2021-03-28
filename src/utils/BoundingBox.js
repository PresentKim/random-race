import Vector2 from "@/utils/Vector2";

/**
 * @property {Vector2} min
 * @property {Vector2} max
 *
 * @property {number} minX @readonly
 * @property {number} minY @readonly
 * @property {number} maxX @readonly
 * @property {number} maxY @readonly
 * @property {number} xLength @readonly
 * @property {number} yLength @readonly
 */
class BoundingBox {
    /**
     * @param {Vector2} vec1
     * @param {Vector2} vec2
     */
    constructor(vec1, vec2) {
        this.min = new Vector2(Math.min(vec1.x, vec2.x), Math.min(vec1.y, vec2.y));
        this.max = new Vector2(Math.max(vec1.x, vec2.x), Math.max(vec1.y, vec2.y));
    }

    /**
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    isInside(x, y) {
        return this.min.x < x && this.max.x > x && this.min.y < y && this.max.y > y;
    }

    /**
     * @param {Vector2} vec
     * @return {boolean}
     */
    isVectorInside(vec) {
        return this.min.x < vec.x && this.max.x > vec.x && this.min.y < vec.y && this.max.y > vec.y;
    }

    /**
     * @param {number|object} value
     * @param {number} fallback
     * @return {BoundingBox}
     */
    add(value, fallback) {
        const vec = Vector2.from(value, fallback);
        return new BoundingBox(this.min.add(vec), this.max.add(vec));
    }

    /**
     * Un shifts this bounding box. by the given x, y
     *
     * @param {number|object} value
     * @param {number} fallback
     * @return {BoundingBox}
     */
    subtract(value, fallback) {
        const vec = Vector2.from(value, fallback);
        return new BoundingBox(this.min.subtract(vec), this.max.subtract(vec));
    }

    /**
     * Outsets the bounds of this bounding box.
     *
     * @param {number|object} value
     * @param {number} fallback
     * @return {BoundingBox}
     */
    expand(value, fallback) {
        const vec = Vector2.from(value, fallback);
        return new BoundingBox(this.min.subtract(vec), this.max.add(vec));
    }

    /**
     * Insets the bounds of this bounding box.
     *
     * @param {number|object} value
     * @param {number} fallback
     * @return {BoundingBox}
     */
    contract(value, fallback) {
        const vec = Vector2.from(value, fallback);
        return new BoundingBox(this.min.add(vec), this.max.subtract(vec));
    }

    /** @return {BoundingBox} */
    floor() {
        return BoundingBox.from(this.min.floor(), this.max.floor());
    }

    /** @return {BoundingBox} */
    clone() {
        return BoundingBox.from(this.min, this.max);
    }

    /**
     * @readonly
     * @return {number}
     */
    get minX() {
        return this.min.x;
    }

    /**
     * @readonly
     * @return {number}
     */
    get minY() {
        return this.min.y;
    }

    /**
     * @readonly
     * @return {number}
     */
    get maxX() {
        return this.max.x;
    }


    /**
     * @readonly
     * @return {number}
     */
    get maxY() {
        return this.max.y;
    }

    /**
     * @readonly
     * @return {number}
     */
    get xLength() {
        return this.max.x - this.min.x;
    }

    /**
     * @readonly
     * @return {number}
     */
    get yLength() {
        return this.max.y - this.min.y;
    }

    /**
     * @param {number|object} x1
     * @param {number} y1
     * @param {number|object} x2
     * @param {number} y2
     * @return {BoundingBox}
     */
    static from(x1, x2, y1, y2) {
        return new BoundingBox(
                Vector2.from(x1, y1),
                Vector2.from(x2 === undefined ? x1 : x2, y2 === undefined ? y1 : y2)
        );
    }
}

export default BoundingBox;
