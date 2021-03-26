/**
 * @property {number} minX
 * @property {number} maxX
 * @property {number} minY
 * @property {number} maxY
 */
class BoundingBox {
    constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
        this.minX = Math.min(x1, x2);
        this.minY = Math.min(y1, y2);
        this.maxX = Math.max(x1, x2);
        this.maxY = Math.max(y1, y2);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    isInside(x, y) {
        return this.minX < x && this.maxX > x && this.minY < y && this.maxY > y;
    }

    /**
     * @param {Vector2} vec
     * @returns {boolean}
     */
    isVectorInside(vec) {
        return this.minX < vec.x && this.maxX > vec.x && this.minY < vec.y && this.maxY > vec.y;
    }

    getXLength() {
        return this.maxX - this.minX;
    }

    getYLength() {
        return this.maxY - this.minY;
    }

    /**
     * @param {Vector2} vec1
     * @param {Vector2} vec2
     * @returns {BoundingBox}
     */
    static fromVector2(vec1, vec2) {
        return new BoundingBox(vec1.x, vec1.y, vec2.x, vec2.y);
    }
}

export default BoundingBox;
