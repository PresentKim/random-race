import Widget from "./Widget";
import Sprite from "@/sprite/Sprite";
import BoundingBox from "@/utils/BoundingBox";
import Vector2 from "@/utils/Vector2";
import RenderOption from "@/utils/RenderOption";

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

            this.sprite.draw(ctx, this.pos, this.getScale());
        };
    }

    getBoundingBox(): BoundingBox | null {
        if (!this.sprite)
            return null;

        return BoundingBox
                .from(new Vector2, Vector2.from(this.sprite.sw, this.sprite.sh).multiply(this.getScale()))
                .add(this.pos.add(Vector2.from(this.sprite.mx, this.sprite.my).multiply(this.getScale())));
    }

    setSprite(sprite: Sprite | null): this {
        this.sprite = sprite;
        return this;
    }
}
