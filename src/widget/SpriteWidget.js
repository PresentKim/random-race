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

    render(ctx) {
        const delta = this.renderOption._scale / 2;
        this.sprite.draw(ctx, this.pos.subtract(Vector2.from(this.sprite).multiply(delta)), this.renderOption);
        super.render(ctx);
    }

    getBoundingBox() {
        const deltaDec = Vector2.from(this.sprite).multiply(this.renderOption._scale / 2);
        return BoundingBox.from(this.pos).expand(deltaDec);
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