import CanvasLayer from "./CanvasLayer";
import App from "@/App";
import RenderOption from "@/utils/RenderOption";
import TextElement from "@/canvas/element/TextElement";
import SpriteElement from "@/canvas/element/SpriteElement";
import SpriteManager from "@/sprite/SpriteManager";
import SpriteAnimationElement from "@/canvas/element/SpriteAnimationElement";
import fullscreen from "fullscreen-wrapper";
import CanvasIndex from "@/canvas/CanvasIndex";

export default class HeaderLayer extends CanvasLayer {
    private readonly titleText: TextElement;
    private readonly titleCharacter: SpriteAnimationElement;
    private readonly fullscreenButton: SpriteElement | null;

    constructor(app: App) {
        super(app, CanvasIndex.HEADER);

        const characterGroup = SpriteManager.getGroup("character");
        const iconSheet = SpriteManager.getSheet("ui/icon");

        this.titleText = new TextElement(null, "random race", new RenderOption().absolute().scale(12));
        this.titleCharacter = new SpriteAnimationElement(null, characterGroup.random(), "run", new RenderOption().absolute().scale(5));
        this.titleCharacter.setOnAnimationEnd(() => {
            if (this.titleCharacter.animationName === "hit") {
                const textBox = this.titleText.getBoundingBox();
                this.titleCharacter.setSheet(characterGroup.random());
                this.titleCharacter.setAnimationName("idle").reset().setRepeatCount(4);

                const currentFrame = this.titleCharacter.getCurrentFrame();
                if (currentFrame) {
                    this.titleCharacter.pos = textBox.min.add(-(currentFrame.data.ow * this.titleCharacter.getScale() / 2), textBox.max.y / 2);
                }
            } else if (this.titleCharacter.animationName === "run") {
                this.titleCharacter.setAnimationName("idle").reset().setRepeatCount(4);
            } else {
                this.titleCharacter.setAnimationName("run").reset().setRepeatCount(6);
            }
        });
        this.titleCharacter.setOnMouseClick(vec => {
            this.titleCharacter.playRate += 0.1;
            if (this.titleCharacter.playRate > 3) {
                this.titleCharacter.playRate = 1;
            }
            this.appendChild(new TextElement(vec.add(Math.random() * 80 - 40, 0), this.titleCharacter.playRate === 1 ? "-200" : "+10", new RenderOption().absolute())
                    .setRenderOption(new RenderOption().scale(2).absolute().hue(Math.random() * 360).brightness(6).contrast(2))
                    .setOnUpdate((elapsedTime, child) => {
                        if (!(child instanceof TextElement)) {
                            child.destroy();
                            return;
                        }
                        child.pos.y -= elapsedTime / 20;
                        if (child.pos.y < 0) {
                            child.destroy();
                        }
                    })
            );
            return true;
        });

        this.fullscreenButton = null;
        if (fullscreen.isEnabled) {
            this.fullscreenButton = new SpriteElement(null, iconSheet.getSprite("fullscreen_enter"), new RenderOption().absolute());
            this.fullscreenButton.setOnMouseClick(() => fullscreen.toggle(document.body)).setOnUpdate(() => {
                this.fullscreenButton.renderOption.scale(this.fullscreenButton.isHover() ? 6.5 : 6);
                return true
            });

            fullscreen.onChange(() => {
                this.fullscreenButton.sprite = iconSheet.getSprite(fullscreen.isFullscreen ? "fullscreen_exit" : "fullscreen_enter") ?? null;
            })
        }

        this.appendChild(this.titleText);
        this.appendChild(this.titleCharacter);
        if (this.fullscreenButton) {
            this.appendChild(this.fullscreenButton);
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
