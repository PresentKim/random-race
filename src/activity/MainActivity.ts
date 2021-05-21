import Activity from "./Activity";
import App from "@/App";
import RenderOption from "@/utils/RenderOption";
import {UpdateHandler} from "@/utils/Component";
import TextWidget from "@/widget/TextWidget";
import BackgroundWidget from "@/widget/BackgroundWidget";
import SpriteWidget from "@/widget/SpriteWidget";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import SpriteManager from "@/sprite/SpriteManager";
import SpriteAnimationWidget from "@/widget/SpriteAnimationWidget";
import fullscreen from "fullscreen-wrapper";

const upscaleWhenHover: UpdateHandler = (_, component) => {
    component.renderOption.scale(component.isHover() ? 6.5 : 6);
    return true
};

export default class MainActivity extends Activity {
    private readonly background: BackgroundWidget;
    private readonly titleText: TextWidget;
    private readonly titleCharacter: SpriteAnimationWidget;
    private readonly startGameButton: SpriteWidget;
    private readonly descriptionButton: SpriteWidget;
    private readonly reloadButton: SpriteWidget;
    private readonly fullscreenButton: SpriteWidget | null;
    private readonly runners: SpriteAnimationWidget[];

    constructor(app: App) {
        super(app);

        const characterGroup = SpriteManager.getGroup("character");
        const backgroundSheet = SpriteManager.getSheet("ui/background");
        const buttonSheet = SpriteManager.getSheet("ui/button");
        const iconSheet = SpriteManager.getSheet("ui/icon");

        this.background = new BackgroundWidget(null, backgroundSheet.sprites.random());
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

        this.startGameButton = new SpriteWidget(null, buttonSheet.getSprite("start_game"), new RenderOption().absolute());
        this.descriptionButton = new SpriteWidget(null, buttonSheet.getSprite("description"), new RenderOption().absolute());

        this.reloadButton = new SpriteWidget(null, iconSheet.getSprite("reset"), new RenderOption().absolute());
        this.fullscreenButton = null;
        if (fullscreen.isEnabled) {
            this.fullscreenButton = new SpriteWidget(this.reloadButton.pos.subtract(this.vw(7), 0), iconSheet.getSprite("fullscreen_enter"), new RenderOption().absolute());
            this.fullscreenButton.setOnMouseClick(() => fullscreen.toggle(document.body)).setOnUpdate(upscaleWhenHover);

            fullscreen.onChange(() => {
                this.fullscreenButton.sprite = iconSheet.getSprite(fullscreen.isFullscreen ? "fullscreen_exit" : "fullscreen_enter") ?? null;
            })
        }
        this.background.setOnUpdate(diffSecs => this.background.pos.x -= diffSecs / 10);
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
                    .setOnUpdate((diffSecs, component) => {
                        if (!(component instanceof TextWidget)) {
                            component.destroy();
                            return;
                        }
                        component.pos.y -= diffSecs / 20;
                        if (component.pos.y < 0) {
                            component.destroy();
                        }
                    })
            );
        });
        this.startGameButton.setOnUpdate((_, component) => component.renderOption.scale(component.isHover() ? 10.5 : 10) || true);
        this.descriptionButton.setOnUpdate((_, component) => component.renderOption.scale(component.isHover() ? 8.5 : 8) || true);
        this.reloadButton.setOnMouseClick(() => {
            this.background.setSprite(backgroundSheet.sprites.random());
            this.titleCharacter.setAnimationName("hit").reset().setRepeatCount(1);
            return true;
        }).setOnUpdate(upscaleWhenHover);

        this.runners = [];
        for (let i = 0; i < 30; ++i) {
            const runner = new SpriteAnimationWidget(this.viewport(Math.random() * 100, 100));
            runner.setOnUpdate(diffSecs => {
                const maxX = this.getBoundingBox().add(this.camera).maxX;
                if ((runner.getBoundingBox()?.minX ?? 0) > maxX) {
                    runner.pos.x = this.camera.x;
                    runner.sheet = null;
                }
                if (!runner.sheet) {
                    runner.renderOption.scale(Math.random() * 5 + 5);
                    runner.setSheet(characterGroup.random()).setAnimationName("run").reset().setRepeatCount(-1).setPlayRate(1 + Math.random() * 0.3);
                }
                if (runner.animation instanceof SpriteAnimation && runner.repeatCount === -1) {
                    runner.pos.x += diffSecs / 3 * runner.playRate * runner.getScale() / 5;
                }
            }).setOnMouseClick(() => {
                        if (runner.animation instanceof SpriteAnimation && runner.repeatCount === -1) {
                            runner.setAnimationName("hit")
                                    .reset()
                                    .setRepeatCount(0)
                                    .setOnAnimationEnd(() => {
                                        runner.setSheet(SpriteManager.getSheet("particle/character_particle"))
                                                .setAnimationName("disappearing")
                                                .setRepeatCount(0)
                                                .setOnAnimationEnd(() => {
                                                    runner.pos.x = this.camera.x;
                                                    runner.sheet = null;
                                                });
                                    });
                        }
                        return true;
                    }
            );
            this.runners[i] = runner;
        }

        if (!new URLSearchParams(window.location.search).get("renderMouseClick")) {
            this.setOnMouseClick(vec => {
                const clickParticle = new SpriteAnimationWidget(vec, SpriteManager.getSheet("particle/collect_particle"), "item", new RenderOption().absolute().scale(4));
                clickParticle.setRepeatCount(0).setOnAnimationEnd(() => clickParticle.destroy());
                this.addWidget(clickParticle);
                return false;
            })
        }
        this.setOnUpdate(diffSecs => {
            this.camera.x += diffSecs / 10;
        })

        this.addWidget(this.background);
        this.addWidget(this.titleText);
        this.addWidget(this.titleCharacter);
        this.addWidget(this.startGameButton);
        this.addWidget(this.descriptionButton);
        this.addWidget(this.reloadButton);
        if (this.fullscreenButton) {
            this.addWidget(this.fullscreenButton);
        }
        this.runners.forEach(runner => this.addWidget(runner));

        this.relocation(1);
    }

    relocation(ratio: number) {
        this.titleText.pos = this.viewport(50, 10);
        const textBox = this.titleText.getBoundingBox();
        this.titleCharacter.pos = textBox.min.add(this.titleCharacter?.getCurrentFrame()?.mx * this.titleCharacter.getScale() , textBox.max.y - textBox.min.y);

        this.startGameButton.pos = this.viewport(50, 30);
        this.descriptionButton.pos = this.viewport(50, 50);

        this.reloadButton.pos = this.viewport(95, 10);
        if (this.fullscreenButton) {
            this.fullscreenButton.pos = this.reloadButton.pos.subtract(this.vw(7), 0);
        }

        this.runners.forEach(runner => runner.pos.set(runner.pos.x * ratio, this.vh(100)));
    }
}
