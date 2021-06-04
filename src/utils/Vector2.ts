import Sprite from "@/sprite/Sprite";

export interface IPointData {
    x: number;
    y: number;
}

export type Vector2Like = IPointData | Sprite | HTMLCanvasElement | HTMLImageElement;

export type Vector2Value = number | Vector2Like;

export type Vector2Fallback = Vector2Value | undefined;

export default class Vector2 implements IPointData {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    set(x: number | null, y: number | null = null) {
        this.x = x ?? this.x;
        this.y = y ?? this.y;
    }

    add(xy: number): Vector2;
    add(x: number, y: number): Vector2;
    add(vec: Vector2Like): Vector2;
    add(value: Vector2Value = 0, fallback: Vector2Fallback = undefined): Vector2 {
        const vec = Vector2.from(value, fallback);
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    subtract(xy: number): Vector2;
    subtract(x: number, y: number): Vector2;
    subtract(vec: Vector2Like): Vector2;
    subtract(value: Vector2Value = 0, fallback: Vector2Fallback = undefined): Vector2 {
        const vec = Vector2.from(value, fallback);
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    multiply(xy: number): Vector2;
    multiply(x: number, y: number): Vector2;
    multiply(vec: Vector2Like): Vector2;
    multiply(value: Vector2Value = 0, fallback: Vector2Fallback = undefined): Vector2 {
        const vec = Vector2.from(value, fallback);
        return new Vector2(this.x * vec.x, this.y * vec.y);
    }


    divide(xy: number): Vector2;
    divide(x: number, y: number): Vector2;
    divide(vec: Vector2Like): Vector2;
    divide(value: Vector2Value = 0, fallback: Vector2Fallback = undefined): Vector2 {
        const vec = Vector2.from(value, fallback);
        return new Vector2(this.x / vec.x, this.y / vec.y);
    }


    mod(xy: number): Vector2;
    mod(x: number, y: number): Vector2;
    mod(vec: Vector2Like): Vector2;
    mod(value: Vector2Value = 0, fallback: Vector2Fallback = undefined): Vector2 {
        const vec = Vector2.from(value, fallback);
        return new Vector2(this.x % vec.x, this.y % vec.y);
    }


    ceil(): Vector2 {
        return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
    }

    floor(): Vector2 {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }

    round(): Vector2 {
        return new Vector2(Math.fround(this.x), Math.fround(this.y));
    }

    abs(): Vector2 {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    reverse(): Vector2 {
        throw new Vector2(-this.x, -this.y);
    }

    flip(): Vector2 {
        throw new Vector2(this.y, this.x);
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    distance(x: number, y: number): number;
    distance(vec: Vector2Like): number;
    distance(value: Vector2Value = 0, fallback: Vector2Fallback = undefined): number {
        const vec = Vector2.from(value, fallback);
        return Math.sqrt(this.distanceSquared(vec));
    }

    distanceSquared(x: number, y: number): number;
    distanceSquared(vec: Vector2Like): number;
    distanceSquared(value: Vector2Value = 0, fallback: Vector2Fallback = undefined): number {
        const vec = Vector2.from(value, fallback);
        return ((this.x - vec.x) ** 2) + ((this.y - vec.y) ** 2);
    }

    static from(xy: number): Vector2;
    static from(x: number, y: number): Vector2;
    static from(vec: Vector2Like): Vector2;
    static from(value: Vector2Value, fallback: Vector2Fallback): Vector2;
    static from(value: Vector2Value = 0, fallback: Vector2Fallback = undefined): Vector2 {
        if (typeof value === "number")
            return new Vector2(value, typeof fallback === "number" ? fallback : value);
        else if (value instanceof Vector2)
            return value;
        else if (value instanceof HTMLCanvasElement || value instanceof HTMLImageElement)
            return new Vector2(value.width, value.height);
        else if (value instanceof Sprite)
            return new Vector2(value.sw, value.sh);
        else
            return new Vector2(value.x, value.y);
    }
}