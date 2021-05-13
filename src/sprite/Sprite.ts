import Vector2, {Vector2Like} from "@/utils/Vector2";

export type ImageLike = string | HTMLImageElement;

export interface SpriteData {
    /** source width */
    sw: number;
    /** source height */
    sh: number;
    /** source x */
    sx: number;
    /** source y */
    sy: number;

    /** trimmed x */
    tx: number;
    /** trimmed y */
    ty: number;

    /** origin width */
    ow: number;
    /** origin height */
    oh: number;

    /** pivot x (center) */
    px: number;
    /** pivot y (center) */
    py: number;
}

export default class Sprite {
    public readonly data: SpriteData;
    public image: HTMLImageElement | null;

    constructor(data: SpriteData, image: ImageLike | null) {
        this.data = data;
        this.setImage(image);
    }

    /** Margin x */
    get mx(): number {
        return this.data.tx * 2 - this.data.px;
    }

    /** Margin y */
    get my(): number {
        return this.data.ty * 2 - this.data.py;
    }

    setImage(image: ImageLike | null): this {
        if (image instanceof HTMLImageElement) {
            this.image = image;
        } else if (typeof image === "string") {
            this.image = new Image();
            this.image.src = image;
        } else {
            this.image = null;
        }
        return this;
    }

    draw(ctx: CanvasRenderingContext2D, vecObj: Vector2Like, scale: number = 1): void {
        if (!this.image || !this.image.complete || this.image.naturalHeight === 0)
            return;

        const vec = Vector2.from(vecObj);
        ctx.save();
        ctx.translate(vec.x, vec.y);
        ctx.drawImage(
                this.image,
                this.data.sx, this.data.sy,
                this.data.sw, this.data.sh,
                this.mx * scale / 2, this.my * scale / 2,
                this.data.sw * scale, this.data.sh * scale
        );
        ctx.restore();
    }
}