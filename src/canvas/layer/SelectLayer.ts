import CanvasLayer, {LayerIndex} from "./CanvasLayer";
import App from "@/App";
import SpriteManager from "@/sprite/SpriteManager";
import SelectCharacterElement from "@/canvas/element/SelectCharacterElement";
import RenderOption from "@/utils/RenderOption";
import RandomArray from "@/utils/RandomArray";
import SpriteElement from "@/canvas/element/SpriteElement";
import TextElement from "@/canvas/element/TextElement";
import SpriteSheet from "@/sprite/SpriteSheet";

export default class SelectLayer extends CanvasLayer {
    private readonly selectors: Array<SelectCharacterElement>;

    private readonly countText: TextElement;
    private readonly reduceButton: SpriteElement;
    private readonly increaseButton: SpriteElement;

    constructor(app: App) {
        super(app, LayerIndex.MAIN);

        const iconSheet = SpriteManager.getSheet("ui/icon");
        const characterGroup = new RandomArray(...SpriteManager.getGroup("character").values());
        this.selectors = [];
        for (let i = 0; i < 5; ++i) {
            const selector = this.createSelector(characterGroup);
            this.appendChild(selector);
            this.selectors.push(selector)
        }
        this.countText = new TextElement(null, this.selectors.length + "", new RenderOption().scale(18));
        this.reduceButton = new SpriteElement(null, iconSheet.getSprite("prev"), new RenderOption().scale(10))
                .setOnMouseClick(() => {
                    if (this.selectors.length > 2) {
                        const selector = this.selectors.pop();
                        selector.destroy();
                        characterGroup.push(selector.sheet);

                        this.countText.text = this.selectors.length + "";
                        this.relocation(1);

                        return true;
                    }
                });
        this.increaseButton = new SpriteElement(null, iconSheet.getSprite("next"), new RenderOption().scale(10))
                .setOnMouseClick(() => {
                    if (this.selectors.length < 5) {
                        const selector = this.createSelector(characterGroup);
                        this.appendChild(selector);
                        this.selectors.push(selector)

                        this.countText.text = this.selectors.length + "";
                        this.relocation(1);

                        return true;
                    }
                });

        this.appendChild(this.countText);
        this.appendChild(this.reduceButton);
        this.appendChild(this.increaseButton);
        this.relocation(1);
    }

    relocation(ratio: number) {
        const PADDING = 17.5;

        const count = this.selectors.length;
        const startX = (PADDING / 2) + (50 - PADDING * count / 2);
        for (let i = 0; i < count; ++i) {
            const selector = this.selectors[i];
            selector.pos = this.viewport(startX + i * PADDING, 55);
        }

        this.countText.pos = this.viewport(50, 27.5);
        this.reduceButton.pos = this.viewport(30, 27.5);
        this.increaseButton.pos = this.viewport(70, 27.5);
    }

    private createSelector(characterGroup: RandomArray<SpriteSheet>) {
        const selector = new SelectCharacterElement(null, characterGroup.randomPop(), new RenderOption().scale(7))
                .setOnMouseClick((vec => {
                    const bb = selector.getBoundingBox();
                    const relativeVec = vec.subtract(bb.min);
                    if (relativeVec.x > bb.xLength * 0.67 && relativeVec.y < bb.yLength * 0.33) { //It is reload button position
                        const beforeCharacter = selector.sheet;
                        selector.setSheet(characterGroup.randomPop());
                        characterGroup.push(beforeCharacter);
                    }

                    return true;
                }));
        return selector;
    }
}
