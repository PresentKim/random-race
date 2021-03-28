import SpriteWidget from "@/widget/SpriteWidget";
import Vector2 from "@/utils/Vector2";

class BackgroundWidget extends SpriteWidget {
    /**
     * @param {Sprite} sprite
     * @param {RenderOption|null} renderOption
     */
    constructor(sprite, renderOption = null) {
        super(null, sprite, renderOption);
    }

    render(ctx) {
        const origin = this.activity.camera.mod(this.sprite);
        const min = this.activity.getBoundingBox().min.subtract(this.sprite).add(origin).floor();
        const max = this.activity.getBoundingBox().max.add(this.sprite).add(origin).floor();
        for (let x = min.x; x < max.x; x += this.sprite.w) {
            for (let y = min.y; y < max.y; y += this.sprite.h) {
                this.sprite.draw(ctx, new Vector2(x, y), this.renderOption);
            }
        }
    }
}

export default BackgroundWidget;