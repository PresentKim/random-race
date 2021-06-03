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
    px?: number;
    /** pivot y (center) */
    py?: number;
}

export default class Sprite {
    public readonly data: SpriteData;
    public image: HTMLImageElement | null;

    constructor(data: SpriteData, image: ImageLike | null) {
        this.data = data;
        this.setImage(image);
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
        ctx.translate(vec.x | 0, vec.y | 0);
        ctx.drawImage(
                this.image,
                this.sx | 0, this.sy | 0,
                this.sw | 0, this.sh | 0,
                this.mx * scale | 0, this.my * scale | 0,
                this.sw * scale | 0, this.sh * scale | 0
        );
        ctx.restore();
    }

    /** source width */
    get sw(): number {
        return this.data.sw;
    }

    /** source height */
    get sh(): number {
        return this.data.sh;
    }

    /** source x */
    get sx(): number {
        return this.data.sx;
    }

    /** source y */
    get sy(): number {
        return this.data.sy;
    }

    /** trimmed x */
    get tx(): number {
        return this.data.tx;
    }

    /** trimmed y */
    get ty(): number {
        return this.data.ty;
    }

    /** origin width */
    get ow(): number {
        return this.data.ow;
    }

    /** origin height */
    get oh(): number {
        return this.data.oh;
    }

    /** pivot x (center) */
    get px(): number {
        return this.data.px;
    }

    /** pivot y (center) */
    get py(): number {
        return this.data.py;
    }

    /** Margin x */
    get mx(): number {
        return this.data.tx - this.data.px;
    }

    /** Margin y */
    get my(): number {
        return this.data.ty - this.data.py;
    }
}