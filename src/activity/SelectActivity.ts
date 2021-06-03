import Activity from "./Activity";
import App from "@/App";
import SpriteManager from "@/sprite/SpriteManager";
import SelectCharacterWidget from "@/widget/SelectCharacterWidget";
import RenderOption from "@/utils/RenderOption";
import RandomArray from "@/utils/RandomArray";
import SpriteWidget from "@/widget/SpriteWidget";
import TextWidget from "@/widget/TextWidget";
import SpriteSheet from "@/sprite/SpriteSheet";

export default class SelectActivity extends Activity {
    private readonly selectors: Array<SelectCharacterWidget>;

    private readonly countText: TextWidget;
    private readonly reduceButton: SpriteWidget;
    private readonly increaseButton: SpriteWidget;

    constructor(app: App) {
        super(app);

        const iconSheet = SpriteManager.getSheet("ui/icon");
        const characterGroup = new RandomArray(...SpriteManager.getGroup("character").values());
        this.selectors = [];
        for (let i = 0; i < 5; ++i) {
            const selector = this.createSelector(characterGroup);
            this.addWidget(selector);
            this.selectors.push(selector)
        }
        this.countText = new TextWidget(null, this.selectors.length + "", new RenderOption().scale(18));
        this.reduceButton = new SpriteWidget(null, iconSheet.getSprite("prev"), new RenderOption().scale(10))
                .setOnMouseClick(() => {
                    if (this.selectors.length > 2) {
                        const selector = this.selectors.pop();
                        selector.destroy();
                        characterGroup.push(selector.sheet);

                        this.countText.text = this.selectors.length + "";
                        this.relocation(1);
                    }
                });
        this.increaseButton = new SpriteWidget(null, iconSheet.getSprite("next"), new RenderOption().scale(10))
                .setOnMouseClick(() => {
                    if (this.selectors.length < 5) {
                        const selector = this.createSelector(characterGroup);
                        this.addWidget(selector);
                        this.selectors.push(selector)

                        this.countText.text = this.selectors.length + "";
                        this.relocation(1);
                    }
                });

        this.addWidget(this.countText);
        this.addWidget(this.reduceButton);
        this.addWidget(this.increaseButton);
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
        const selector = new SelectCharacterWidget(null, characterGroup.randomPop(), new RenderOption().scale(7))
                .setOnMouseClick((vec => {
                    const bb = selector.getBoundingBox();
                    const relativeVec = vec.subtract(bb.min);
                    if (relativeVec.x > bb.xLength * 0.67 && relativeVec.y < bb.yLength * 0.33) { //It is reload button position
                        const beforeCharacter = selector.sheet;
                        selector.setSheet(characterGroup.randomPop());
                        characterGroup.push(beforeCharacter);
                    }
                }));
        return selector;
    }
}
