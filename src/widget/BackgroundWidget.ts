import SpriteWidget from "./SpriteWidget";
import Vector2 from "@/utils/Vector2";
import BoundingBox from "@/utils/BoundingBox";
import Sprite from "@/sprite/Sprite";

export default class BackgroundWidget extends SpriteWidget {
    private cache: HTMLImageElement | null;
    private cachedScale: number | null;
    private cachedSprite: Sprite | null;

    init(): void {
        this.onRender = ctx => {
            if (!this.activity || !this.sprite?.image?.complete)
                return;

            const scale = this.getScale();
            const spriteBox = Vector2.from(this.sprite).multiply(scale).floor();
            const drawBox = (this.getDrawBox() ?? this.activity.getBoundingBox()).max.floor();

            if (!this.cache || this.cachedSprite !== this.sprite || this.cachedScale !== scale) {
                const bufferCanvas = document.createElement('canvas');
                const bufferContext = bufferCanvas.getContext('2d');
                bufferCanvas.width = drawBox.x + spriteBox.x * 2;
                bufferCanvas.height = drawBox.y + spriteBox.y * 2;

                for (let x = 0; x < bufferCanvas.width; x += spriteBox.x - 1) {
                    for (let y = 0; y < bufferCanvas.height; y += spriteBox.y - 1) {
                        this.sprite.draw(bufferContext, new Vector2(x, y), this.getScale());
                    }
                }
                this.cache = document.createElement('img');
                this.cache.src = bufferCanvas.toDataURL('image/png');
                this.cachedSprite = this.sprite;
                this.cachedScale = scale;
            }

            ctx.drawImage(this.cache, this.pos.x % spriteBox.x, this.pos.y % spriteBox.y);
        };
    }

    getBoundingBox(): BoundingBox | null {
        return this.getDrawBox();
    }

    isAbsolute(): boolean {
        return true;
    }
}
