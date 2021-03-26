import Widget from "./Widget";
import {TextSpriteSheet} from "../consts/SpriteSheetDefs";
import BoundingBox from "../utils/BoundingBox";

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
                const sprite = TextSpriteSheet.get(text.charAt(x));
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

    getBoundingBox() {
        const scale = this.renderOption._scale;
        const lines = this.text.split("\n");
        let width = 0;
        let height = lines.length * 10 * scale;
        for (const line of lines) {
            const newWidth = line.length * 8 * scale;
            if (width < newWidth) {
                width = newWidth;
            }
        }
        return new BoundingBox(this.pos.x - width / 2, this.pos.y - height / 2, this.pos.x + width / 2, this.pos.y + height / 2);
    }
}

export default TextWidget;