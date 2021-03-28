import Widget from "./Widget";
import BoundingBox from "@/utils/BoundingBox";
import Vector2 from "@/utils/Vector2";
import {TextSpriteSheet} from "@/sprite/SpriteSheetDefs";

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
            if (!this.sprite || !this.sprite.image.complete)
                return;

            const deltaVec = Vector2.from(this.sprite).multiply(this.getScale() / 2);
            this.sprite.draw(ctx, this.pos.subtract(deltaVec), this.getScale());
        };
    }

    /** @return {BoundingBox|null} */
    getBoundingBox() {
        if (!this.sprite)
            return null;

        const deltaVec = Vector2.from(this.sprite).multiply(this.getScale() / 2);
        return BoundingBox.from(this.pos).expand(deltaVec);
    }
}

export default SpriteWidget;