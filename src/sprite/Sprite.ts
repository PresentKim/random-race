import Vector2, {Vector2Like} from "@/utils/Vector2";

export interface SpriteJson {
    w: number;
    h: number;
    sx?: number;
    sy?: number;
    ox?: number;
    oy?: number;
    name?: string;
}

export type ImageLike = string | HTMLImageElement;

export default class Sprite {
    public w: number;
    public h: number;
    public ox: number;
    public oy: number;
    public sx: number;
    public sy: number;
    private _image: HTMLImageElement | null;

    constructor(json: SpriteJson) {
        const {w, h, sx, sy, ox, oy} = json;
        this.w = w ?? 0;
        this.h = h ?? 0;
        this.sx = sx ?? 0;
        this.sy = sy ?? 0;
        this.ox = ox ?? 0;
        this.oy = oy ?? 0;
        this._image = null;
    }

    getImage(): HTMLImageElement | null {
        return this._image;
    }

    setImage(image: ImageLike | null | undefined): this {
        if (image instanceof HTMLImageElement) {
            this._image = image;
        } else if (typeof image === "string") {
            this._image = new Image();
            this._image.src = image;
        } else {
            this._image = null;
        }
        return this;
    }

    update(diffSecs: number): void {
    }

    draw(ctx: CanvasRenderingContext2D, vecObj: Vector2Like, scale: number = 1): void {
        const image = this.getImage();
        if (!image || !image.complete || image.naturalHeight === 0)
            return;

        const vec = Vector2.from(vecObj);
        ctx.save();
        ctx.translate(vec.x, vec.y);
        ctx.drawImage(
                image,
                this.sx, this.sy,
                this.w, this.h,
                -this.ox * scale / 2, -this.oy * scale / 2,
                this.w * scale, this.h * scale
        );
        ctx.restore();
    }

    static from(w: number, h: number, sx: number, sy: number, ox: number, oy: number): Sprite {
        return new Sprite({w, h, sx, sy, ox, oy});
    }
}