import Widget from "./Widget";
import BoundingBox from "@/utils/BoundingBox";
import Vector2 from "@/utils/Vector2";

/**
 * @property {Sprite} sprite
 */
class SpriteWidget extends Widget {
    /**
     * @param {Vector2|null} pos
     * @param {Sprite} sprite
     * @param {RenderOption|null} renderOption
     */
    constructor(pos, sprite, renderOption = null) {
        super(pos, renderOption);
        this.sprite = sprite;
    }

    init() {
        this.onRender = ctx => {
            if (!this.sprite || !this.sprite.image || !this.sprite.image.complete)
                return;

            const deltaVec = Vector2.from(this.sprite).multiply(this.getScale() / 2);
            this.sprite.draw(ctx, this.pos.subtract(deltaVec), this.getScale());
        };
        this.onUpdate = (diffSecs) => {
            this.sprite.update(diffSecs);
        };
    }

    /** @return {BoundingBox|null} */
    getBoundingBox() {
        if (!this.sprite)
            return null;

        const deltaVec = Vector2.from(this.sprite).multiply(this.getScale() / 2);
        return BoundingBox.from(this.pos.subtract(new Vector2(this.sprite.ox, this.sprite.oy).multiply(this.getScale() / 2))).expand(deltaVec);
    }

    /**
     * @param {Sprite} sprite
     * @return {SpriteWidget}
     */
    setSprite(sprite) {
        this.sprite = sprite;
        return this;
    }
}

export default SpriteWidget;