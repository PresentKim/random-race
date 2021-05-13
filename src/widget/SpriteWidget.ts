import Widget from "./Widget";
import Sprite from "@/sprite/Sprite";
import BoundingBox from "@/utils/BoundingBox";
import Vector2 from "@/utils/Vector2";
import RenderOption from "@/utils/RenderOption";
import SpriteAnimation from "@/sprite/SpriteAnimation";

export default class SpriteWidget extends Widget {
    public sprite: Sprite | null;

    constructor(pos: Vector2 | null, sprite: Sprite | null = null, renderOption: RenderOption = new RenderOption()) {
        super(pos, renderOption);
        this.sprite = sprite;
    }

    init(): void {
        this.onRender = ctx => {
            if (!this.sprite)
                return;

            const deltaVec = Vector2.from(this.sprite).multiply(this.getScale() / 2);
            this.sprite.draw(ctx, this.pos.subtract(deltaVec.divide(2)), this.getScale());
        };
    }

    getBoundingBox(): BoundingBox | null {
        if (!this.sprite)
            return null;

        const deltaVec = Vector2.from(this.sprite).multiply(this.getScale() / 2);
        return BoundingBox.from(this.pos).expand(deltaVec);
    }

    setSprite(sprite: Sprite | null): this {
        this.sprite = sprite;
        return this;
    }
}
