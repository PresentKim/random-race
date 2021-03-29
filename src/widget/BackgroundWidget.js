import DrawWidget from "@/widget/DrawWidget";
import Vector2 from "@/utils/Vector2";

class BackgroundWidget extends DrawWidget {
    init() {
        this.onRender = ctx => {
            const bb = (this.getDrawBox() || this.activity.getBoundingBox())
                    .add(this.pos.mod(this.drawable))
                    .expand(Vector2.from(this.drawable).multiply(2))
                    .floor();
            for (let x = bb.min.x; x < bb.max.x; x += this.drawable.w) {
                for (let y = bb.min.y; y < bb.max.y; y += this.drawable.h) {
                    this.drawable.draw(ctx, new Vector2(x, y), this.getScale());
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