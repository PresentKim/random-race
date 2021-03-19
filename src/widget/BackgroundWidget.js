import Widget from "./Widget";
import Vector2 from "../utils/Vector2";

/**
 * @property {Sprite} sprite
 */
class BackgroundWidget extends Widget {
    /**
     * @param {Sprite} sprite
     * @param {Vector2|null} pos
     * @param {RenderOption|null} renderOption
     */
    constructor(sprite, pos, renderOption = null) {
        super(pos, renderOption);
        this.sprite = sprite;
    }

    render(ctx) {
        const min = new Vector2(
                -this.sprite.w - ((this.pos.x + this.activity.camera.x) % this.sprite.w)
                - this.sprite.h - ((this.pos.y + this.activity.camera.y) % this.sprite.h)
        );
        const max = new Vector2(
                540 + this.sprite.w,
                540 + this.sprite.h
        );
        if (!this.renderOption._absolute) {
            min.x += this.activity.camera.x;
            min.y += this.activity.camera.y;
            max.x += this.activity.camera.x;
            max.y += this.activity.camera.y;
        }
        for (let x = min.x; x < max.x; x += this.sprite.w) {
            for (let y = min.y; y < max.y; y += this.sprite.h) {
                this.sprite.draw(ctx, x, y, this.renderOption);
            }
        }
        super.render(ctx)
    }
}

export default BackgroundWidget;