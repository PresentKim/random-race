import Vector2, {Vector2Value, Vector2Fallback, Vector2Like} from "./Vector2";

export default class BoundingBox {
    public readonly min: Vector2;
    public readonly max: Vector2;

    constructor(min: Vector2 = new Vector2(), max: Vector2 = new Vector2()) {
        this.min = Vector2.from(min);
        this.max = Vector2.from(max);

        if (this.min.x > this.max.x) {
            [this.min.x, this.max.x] = [this.max.x, this.min.x];
        }
        if (this.min.y > this.max.y) {
            [this.min.y, this.max.y] = [this.max.y, this.min.y];
        }
    }

    get center(): Vector2 {
        return this.min.add(this.max).divide(2);
    }

    get minX(): number {
        return this.min.x;
    }

    get minY(): number {
        return this.min.y;
    }

    get maxX(): number {
        return this.max.x;
    }

    get maxY(): number {
        return this.max.y;
    }

    get xLength(): number {
        return this.max.x - this.min.x;
    }

    get yLength(): number {
        return this.max.y - this.min.y;
    }

    isInside(x: number, y: number): boolean;
    isInside(vec: Vector2Like): boolean;
    isInside(value: Vector2Value, fallback: Vector2Fallback = undefined): boolean {
        const vec = Vector2.from(value, fallback);
        return this.min.x < vec.x && this.max.x > vec.x && this.min.y < vec.y && this.max.y > vec.y;
    }

    add(xy: number): BoundingBox;
    add(x: number, y: number): BoundingBox;
    add(vec: Vector2Like): BoundingBox;
    add(value: Vector2Value, fallback: Vector2Fallback = undefined): BoundingBox {
        const vec = Vector2.from(value, fallback);
        return new BoundingBox(this.min.add(vec), this.max.add(vec));
    }

    subtract(xy: number): BoundingBox;
    subtract(x: number, y: number): BoundingBox;
    subtract(vec: Vector2Like): BoundingBox;
    subtract(value: Vector2Value, fallback: Vector2Fallback = undefined): BoundingBox {
        const vec = Vector2.from(value, fallback);
        return new BoundingBox(this.min.subtract(vec), this.max.subtract(vec));
    }

    expand(xy: number): BoundingBox;
    expand(x: number, y: number): BoundingBox;
    expand(vec: Vector2Like): BoundingBox;
    expand(value: Vector2Value, fallback: Vector2Fallback = undefined): BoundingBox {
        const vec = Vector2.from(value, fallback);
        return new BoundingBox(this.min.subtract(vec), this.max.add(vec));
    }

    contract(xy: number): BoundingBox;
    contract(x: number, y: number): BoundingBox;
    contract(vec: Vector2Like): BoundingBox;
    contract(value: Vector2Value, fallback: Vector2Fallback = undefined): BoundingBox {
        const vec = Vector2.from(value, fallback);
        return new BoundingBox(this.min.add(vec), this.max.subtract(vec));
    }

    ceil(): BoundingBox {
        return BoundingBox.from(this.min.ceil(), this.max.ceil());
    }

    floor(): BoundingBox {
        return BoundingBox.from(this.min.floor(), this.max.floor());
    }

    round(): BoundingBox {
        return BoundingBox.from(this.min.round(), this.max.round());
    }

    clone(): BoundingBox {
        return BoundingBox.from(this.min, this.max);
    }

    static from(vec: Vector2Value): BoundingBox;
    static from(min: Vector2Value, max: Vector2Value): BoundingBox;
    static from(x1: Vector2Value, x2: Vector2Fallback = undefined, y1: number | undefined = undefined, y2: number | undefined = undefined): BoundingBox {
        return new BoundingBox(Vector2.from(x1, y1),
                Vector2.from(x2 === undefined ? x1 : x2, y2 === undefined ? y1 : y2)
        );
    }
}
