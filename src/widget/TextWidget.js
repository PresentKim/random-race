import Widget from "./Widget";
import {TextSpriteSheet} from "@/sprite/SpriteSheetDefs";
import BoundingBox from "@/utils/BoundingBox";
import Vector2 from "@/utils/Vector2";

const TEXT_WIDTH = 8;
const TEXT_HEIGHT = 10;

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
        const delta = this.getScale() / 2;
        const widthDelta = TEXT_WIDTH * delta;
        const heightDelta = TEXT_HEIGHT * delta;

        const lines = this.text.split("\n");
        const lineCount = lines.length;
        for (let y = 0; y < lineCount; ++y) {
            const text = lines[y];
            const length = text.length;
            for (let x = 0; x < length; ++x) {
                const sprite = TextSpriteSheet.get(text.charAt(x));
                if (sprite !== null) {
                    sprite.draw(ctx, this.pos.subtract((length - x * 2) * widthDelta, (lineCount - y * 2) * heightDelta), this.getScale());
                }
            }
        }
    }

    getBoundingBox() {
        const lines = this.text.split("\n");
        let maxWidth = 0;
        for (const line of lines) {
            if (maxWidth < line.length) {
                maxWidth = line.length;
            }
        }

        const deltaVec = new Vector2(maxWidth * TEXT_WIDTH, lines.length * TEXT_HEIGHT).multiply(this.getScale() / 2);
        return BoundingBox.from(this.pos).expand(deltaVec);
    }

    /**
     * @param {string} text
     * @return {TextWidget}
     */
    setText(text) {
        this.text = text;
        return this;
    }
}

export default TextWidget;