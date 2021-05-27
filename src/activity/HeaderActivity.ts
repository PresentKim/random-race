import Activity from "./Activity";
import App from "@/App";
import RenderOption from "@/utils/RenderOption";
import TextWidget from "@/widget/TextWidget";
import SpriteWidget from "@/widget/SpriteWidget";
import SpriteManager from "@/sprite/SpriteManager";
import SpriteAnimationWidget from "@/widget/SpriteAnimationWidget";
import fullscreen from "fullscreen-wrapper";

export default class HeaderActivity extends Activity {
    private readonly titleText: TextWidget;
    private readonly titleCharacter: SpriteAnimationWidget;
    private readonly fullscreenButton: SpriteWidget | null;

    constructor(app: App) {
        super(app);

        const characterGroup = SpriteManager.getGroup("character");
        const iconSheet = SpriteManager.getSheet("ui/icon");

        this.titleText = new TextWidget(null, "random race", new RenderOption().absolute().scale(12));
        this.titleCharacter = new SpriteAnimationWidget(null, characterGroup.random(), "run", new RenderOption().absolute().scale(5));
        this.titleCharacter.setOnAnimationEnd(() => {
            if (this.titleCharacter.animationName === "hit") {
                const textBox = this.titleText.getBoundingBox();
                this.titleCharacter.setSheet(characterGroup.random());
                this.titleCharacter.setAnimationName("idle").reset().setRepeatCount(4);

                const currentFrame = this.titleCharacter.getCurrentFrame();
                if (currentFrame) {
                    this.titleCharacter.pos = textBox.min.add(-(currentFrame.data.ow * this.titleCharacter.getScale() / 2), textBox.max.y / 2);
                    console.log(this.titleCharacter.sheet, this.titleCharacter.sheet.animations.keys())
                }
            } else if (this.titleCharacter.animationName === "run") {
                this.titleCharacter.setAnimationName("idle").reset().setRepeatCount(4);
            } else {
                this.titleCharacter.setAnimationName("run").reset().setRepeatCount(6);
            }
        });
        this.titleCharacter.setOnMouseClick(vec => {
            if (!this.titleCharacter.animation) {
                console.log(this.titleCharacter)
            }
            this.titleCharacter.playRate += 0.1;
            if (this.titleCharacter.playRate > 3) {
                this.titleCharacter.playRate = 1;
            }
            this.addWidget(new TextWidget(vec.add(Math.random() * 80 - 40, 0), this.titleCharacter.playRate === 1 ? "-200" : "+10", new RenderOption().absolute())
                    .setRenderOption(new RenderOption().scale(2).absolute().hue(Math.random() * 360).brightness(6).contrast(2))
                    .setOnUpdate((elapsedTime, component) => {
                        if (!(component instanceof TextWidget)) {
                            component.destroy();
                            return;
                        }
                        component.pos.y -= elapsedTime / 20;
                        if (component.pos.y < 0) {
                            component.destroy();
                        }
                    })
            );
        });

        this.fullscreenButton = null;
        if (fullscreen.isEnabled) {
            this.fullscreenButton = new SpriteWidget(null, iconSheet.getSprite("fullscreen_enter"), new RenderOption().absolute());
            this.fullscreenButton.setOnMouseClick(() => fullscreen.toggle(document.body)).setOnUpdate(() => {
                this.fullscreenButton.renderOption.scale(this.fullscreenButton.isHover() ? 6.5 : 6);
                return true
            });

            fullscreen.onChange(() => {
                this.fullscreenButton.sprite = iconSheet.getSprite(fullscreen.isFullscreen ? "fullscreen_exit" : "fullscreen_enter") ?? null;
            })
        }

        this.addWidget(this.titleText);
        this.addWidget(this.titleCharacter);
        if (this.fullscreenButton) {
            this.addWidget(this.fullscreenButton);
        }

        this.relocation(1);
    }

    relocation(ratio: number) {
        this.titleText.pos = this.viewport(50, 10);
        const textBox = this.titleText.getBoundingBox();
        this.titleCharacter.pos = textBox.min.add(this.titleCharacter?.getCurrentFrame()?.mx * this.titleCharacter.getScale(), textBox.max.y - textBox.min.y);

        if (this.fullscreenButton) {
            this.fullscreenButton.pos = this.viewport(95, 10);
        }
    }
}
