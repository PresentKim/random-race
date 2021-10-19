import Vector2 from "@/utils/Vector2";
import RenderOption from "@/utils/RenderOption";
import SpriteSheet from "@/sprite/SpriteSheet";
import SpriteAnimationElement from "@/canvas/element/SpriteAnimationElement";
import SpriteElement from "@/canvas/element/SpriteElement";
import SpriteManager from "@/sprite/SpriteManager";
import BoundingBox from "@/utils/BoundingBox";

export default class SelectCharacterElement extends SpriteAnimationElement {
    private background: SpriteElement;

    constructor(pos: Vector2 | null, sheet: SpriteSheet, renderOption: RenderOption = new RenderOption()) {
        super(pos, sheet, "idle", renderOption);
        this.background = new SpriteElement(null, SpriteManager.getSheet("ui/button").getSprite("select_block"), renderOption)

        this.onRender = ctx => {
            if (!this.animation)
                return;

            const currentFrame = this.getCurrentFrame();
            if (!currentFrame)
                return;

            const scale = this.getScale();
            this.background.sprite.draw(ctx, this.pos, scale);
            currentFrame.draw(ctx, this.pos.add(3 * scale, 15 * scale), scale * 0.75);
        };
    }

    getBoundingBox(): BoundingBox | null {
        if (!this.background.sprite)
            return null;

        return BoundingBox
                .from(new Vector2, Vector2.from(this.background.sprite.sw, this.background.sprite.sh).multiply(this.getScale()))
                .add(this.pos.add(Vector2.from(this.background.sprite.mx, this.background.sprite.my).multiply(this.getScale())));
    }
}
