import Widget from "./Widget";
import {TextSpriteSheet} from "@/sprite/SpriteSheetDefs";
import BoundingBox from "@/utils/BoundingBox";

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
        const delta = this.renderOption._scale / 2;
        const widthDelta = TEXT_WIDTH * delta;
        const heightDelta = TEXT_HEIGHT * delta;

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
                            this.pos.x - (length - x * 2) * widthDelta,
                            this.pos.y - (lineCount - y * 2) * heightDelta,
                            this.renderOption
                    );
                }
            }
        }

        super.render(ctx)
    }

    getBoundingBox() {
        const lines = this.text.split("\n");
        let maxWidth = 0;
        for (const line of lines) {
            if (maxWidth < line.length) {
                maxWidth = line.length;
            }
        }

        const delta = this.renderOption._scale / 2;
        const widthDelta = maxWidth * TEXT_WIDTH * delta;
        const heightDelta = lines.length * TEXT_HEIGHT * delta;
        return new BoundingBox(
                this.pos.x - widthDelta, this.pos.y - heightDelta,
                this.pos.x + widthDelta, this.pos.y + heightDelta
        );
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