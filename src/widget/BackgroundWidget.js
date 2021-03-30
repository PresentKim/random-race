import SpriteWidget from "@/widget/SpriteWidget";
import Vector2 from "@/utils/Vector2";

class BackgroundWidget extends SpriteWidget {
    init() {
        this.onRender = ctx => {
            const bb = (this.getDrawBox() || this.activity.getBoundingBox())
                    .add(this.pos.mod(this.sprite))
                    .expand(Vector2.from(this.sprite).multiply(2))
                    .floor();
            for (let x = bb.min.x; x < bb.max.x; x += this.sprite.w) {
                for (let y = bb.min.y; y < bb.max.y; y += this.sprite.h) {
                    this.sprite.draw(ctx, new Vector2(x, y), this.getScale());
                }
            }
        };
    }

    /** @return {BoundingBox|null} */
    getBoundingBox() {
        return this.getDrawBox();
    }
}

export default BackgroundWidget;