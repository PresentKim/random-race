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
            if (!this.sprite || !this.sprite.getImage())
                return;

            const deltaVec = Vector2.from(this.sprite).multiply(this.getScale() / 2);
            this.sprite.draw(ctx, this.pos.subtract(deltaVec), this.getScale());
        };
        this.onUpdate = (diffSecs: number) => {
            this.sprite?.update(diffSecs);
        };
    }

    getBoundingBox(): BoundingBox | null {
        if (!this.sprite)
            return null;

        const deltaVec = Vector2.from(this.sprite).multiply(this.getScale() / 2);
        return BoundingBox.from(this.pos.subtract(new Vector2(this.sprite.ox, this.sprite.oy).multiply(this.getScale() / 2))).expand(deltaVec);
    }

    setSprite(sprite: Sprite | null): this {
        this.sprite = sprite;
        return this;
    }
}
