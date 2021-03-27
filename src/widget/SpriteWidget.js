import Widget from "./Widget";
import BoundingBox from "@/utils/BoundingBox";

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
        this.sprite.draw(
                ctx,
                this.pos.x - (this.sprite.w * delta),
                this.pos.y - (this.sprite.h * delta),
                this.renderOption
        );

        super.render(ctx);
    }

    getBoundingBox() {
        const delta = this.renderOption._scale / 2;
        const widthDelta = this.sprite.w * delta;
        const heightDelta = this.sprite.h * delta;

        return new BoundingBox(
                this.pos.x - widthDelta, this.pos.y - heightDelta,
                this.pos.x + widthDelta, this.pos.y + heightDelta
        );
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