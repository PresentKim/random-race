import SpriteElement from "./SpriteElement";
import Vector2 from "@/utils/Vector2";
import BoundingBox from "@/utils/BoundingBox";
import Sprite from "@/sprite/Sprite";
import RenderOption from "@/utils/RenderOption";

export default class BackgroundElement extends SpriteElement {
    private cachedIimage: HTMLImageElement | null = null;
    private cachedSprite: Sprite | null = null;
    private cachedScale: number | null = null;
    private cachedWidth: number | null = null;
    private cachedHeight: number | null = null;

    constructor(pos: Vector2 | null, sprite: Sprite | null = null, renderOption: RenderOption = new RenderOption()) {
        super(pos, sprite, renderOption);

        this.onRender = ctx => {
            if (!this.parent || !this.sprite?.image?.complete)
                return;

            const scale = this.getScale();
            const spriteBox = Vector2.from(this.sprite).multiply(scale).floor();
            const drawBox = (this.getDrawBox() ?? this.parent.getBoundingBox()).max.floor();

            if (window.location.href.startsWith("file://")) {
                ctx.save();
                ctx.translate(this.pos.x % spriteBox.x, this.pos.y % spriteBox.y);
                this.draw(ctx, spriteBox, drawBox);
                ctx.restore();
                return;
            }
            if (
                !this.cachedImage ||
                this.cachedSprite !== this.sprite ||
                this.cachedScale !== scale ||
                this.cachedWidth !== drawBox.x ||
                this.cachedHeight !== drawBox.y
            ) {
                const bufferCanvas = document.createElement('canvas');
                bufferCanvas.width = drawBox.x + spriteBox.x * 2;
                bufferCanvas.height = drawBox.y + spriteBox.y * 2;
                this.draw(bufferCanvas.getContext('2d'), spriteBox, drawBox);

                this.cachedImage = document.createElement('img');
                this.cachedImage.src = bufferCanvas.toDataURL('image/png');

                this.cachedSprite = this.sprite;
                this.cachedScale = scale;
                this.cachedWidth = drawBox.x;
                this.cachedHeight = drawBox.y;
            }

            ctx.drawImage(this.cachedImage, this.pos.x % spriteBox.x, this.pos.y % spriteBox.y);
        };
    }

    getBoundingBox(): BoundingBox | null {
        return this.getDrawBox();
    }

    isAbsolute(): boolean {
        return true;
    }

    private draw(ctx: CanvasRenderingContext2D, spriteBox: Vector2, drawBox: Vector2) {
        const width = drawBox.x + spriteBox.x * 2;
        const height = drawBox.y + spriteBox.y * 2;

        for (let x = 0; x < width; x += spriteBox.x - 1) {
            for (let y = 0; y < height; y += spriteBox.y - 1) {
                this.sprite.draw(ctx, new Vector2(x, y), this.getScale());
            }
        }
    }
}
