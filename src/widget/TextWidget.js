import Widget from "./Widget";
import {TextSpriteSheet} from "../consts/SpriteSheetDefs";

/**
 * @property {string} text
 */
class TextWidget extends Widget {
    /**
     * @param {Vector2|null} pos
     * @param {string} text
     * @param {RenderOption|null} renderOption
     */
    constructor(pos, text, renderOption = null) {
        super(pos, renderOption);
        this.text = text;
    }

    render(ctx) {
        const scale = this.renderOption._scale;

        const lines = this.text.split("\n");
        const lineCount = lines.length;
        for (let y = 0; y < lineCount; ++y) {
            const text = lines[y];
            const length = text.length;
            for (let x = 0; x < length; ++x) {
                /** @var {Sprite|null} sprite */
                const sprite = TextSpriteSheet.getByName(text.charAt(x));
                if (sprite !== null) {
                    sprite.draw(
                            ctx,
                            this.pos.x - (scale * 8 * length / 2) + x * scale * 8,
                            this.pos.y - (scale * 10 * lineCount / 2) + y * scale * 10,
                            this.renderOption
                    );
                }
            }
        }

        super.render(ctx)
    }
}

export default TextWidget;