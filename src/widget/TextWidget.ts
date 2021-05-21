import Widget from "./Widget";
import BoundingBox from "@/utils/BoundingBox";
import Vector2 from "@/utils/Vector2";
import RenderOption from "@/utils/RenderOption";
import SpriteManager from "@/sprite/SpriteManager";

const TEXT_WIDTH = 8;
const TEXT_HEIGHT = 10;

export default class TextWidget extends Widget {
    public text: string;

    constructor(pos: Vector2 | null, text: string, renderOption: RenderOption = new RenderOption()) {
        super(pos, renderOption);
        this.text = text;
    }

    init(): void {
        this.onRender = ctx => {
            const textSheet = SpriteManager.getSheet("ui/text");
            if (textSheet === null)
                return;

            const delta = this.getScale() / 2;
            const widthDelta = TEXT_WIDTH * delta;
            const heightDelta = TEXT_HEIGHT * delta;

            const lines = this.text.toUpperCase().split("\n");
            const lineCount = lines.length;
            for (let y = 0; y < lineCount; ++y) {
                const text = lines[y];
                const length = text.length;
                for (let x = 0; x < length; ++x) {
                    const sprite = textSheet.getSprite(text.charCodeAt(x) + '');
                    if (sprite) {
                        sprite.draw(ctx, this.pos.subtract((length - x * 2) * widthDelta, (lineCount - y * 2) * heightDelta).subtract(sprite.mx * this.getScale(), sprite.my * this.getScale()), this.getScale());
                    }
                }
            }
        };
    }

    getBoundingBox(): BoundingBox {
        const lines = this.text.split("\n");
        const maxWidth = lines.reduce((prev, current) => Math.max(prev, current.length), 0);

        const deltaVec = Vector2.from(maxWidth, lines.length).multiply(TEXT_WIDTH, TEXT_HEIGHT).multiply(this.getScale() / 2);
        return BoundingBox.from(this.pos).expand(deltaVec);
    }

    setText(text: string): this {
        this.text = text;
        return this;
    }
}
