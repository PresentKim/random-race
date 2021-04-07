import Activity from "./Activity";
import App from "@/App";
import {DefaultCharacterImages} from "@/defs/image";
import {BackgroundSpriteSheet, ButtonSpriteSheet, IconSpriteSheet} from "@/defs/spritesheet";
import {DefaultCharacterAnimation, CharacterAppearingAnimation, CollectedItemAnimation} from "@/defs/animation";
import RenderOption from "@/utils/RenderOption";
import TextWidget from "@/widget/TextWidget";
import BackgroundWidget from "@/widget/BackgroundWidget";
import SpriteWidget from "@/widget/SpriteWidget";
import {UpdateHandler} from "@/utils/Component";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import fullscreen from "fullscreen-wrapper";

const upscaleWhenHover: UpdateHandler = (_, component) => {
    component.renderOption.scale(component.isHover() ? 6.5 : 6);
    return true
};

export default class MainActivity extends Activity {
    private readonly background: BackgroundWidget;
    private readonly titleText: TextWidget;
    private readonly titleCharacter: SpriteWidget;
    private readonly startGameButton: SpriteWidget;
    private readonly descriptionButton: SpriteWidget;
    private readonly reloadButton: SpriteWidget;
    private readonly fullscreenButton: SpriteWidget | null;
    private readonly runners: SpriteWidget[];

    constructor(app: App) {
        super(app);

        const idleAnimation = DefaultCharacterAnimation.idle(DefaultCharacterImages.get("PinkMan"));
        const runAnimation = DefaultCharacterAnimation.run(DefaultCharacterImages.get("PinkMan"));
        idleAnimation.setLoop(4).setOnAnimationEnd(() => this.titleCharacter.sprite = runAnimation.setLoop(6));
        runAnimation.setLoop(6).setOnAnimationEnd(() => this.titleCharacter.sprite = idleAnimation.setLoop(4));

        this.background = new BackgroundWidget(null, BackgroundSpriteSheet.random());
        this.titleText = new TextWidget(null, "random race", new RenderOption().absolute().scale(12));
        this.titleCharacter = new SpriteWidget(null, runAnimation, new RenderOption().absolute().scale(5));

        this.startGameButton = new SpriteWidget(null, ButtonSpriteSheet.get("start_game"), new RenderOption().absolute());
        this.descriptionButton = new SpriteWidget(null, ButtonSpriteSheet.get("description"), new RenderOption().absolute());

        this.reloadButton = new SpriteWidget(null, IconSpriteSheet.get("reset"), new RenderOption().absolute());
        this.fullscreenButton = null;
        if (fullscreen.isEnabled) {
            this.fullscreenButton = new SpriteWidget(this.reloadButton.pos.subtract(this.vw(7), 0), IconSpriteSheet.get("fullscreen_enter"), new RenderOption().absolute());
            this.fullscreenButton.setOnMouseClick(() => fullscreen.toggle(document.body)).setOnUpdate(upscaleWhenHover);

            fullscreen.onChange(() => {
                this.fullscreenButton.sprite = IconSpriteSheet.get(fullscreen.isFullscreen ? "fullscreen_exit" : "fullscreen_enter") ?? null;
            })
        }
        this.background.setOnUpdate(diffSecs => this.background.pos.x -= diffSecs / 10);
        this.titleCharacter.setOnMouseClick(vec => {
            idleAnimation.fps -= 3;
            runAnimation.fps -= 3;
            if (idleAnimation.fps < 0) {
                idleAnimation.fps = 100;
                runAnimation.fps = 100;
            }
            this.addWidget(new TextWidget(vec.add(Math.random() * 80 - 40, 0), idleAnimation.fps === 100 ? "-100" : "+3", new RenderOption().absolute())
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
            this.background.setSprite(BackgroundSpriteSheet.random());

            this.titleCharacter.setSprite(DefaultCharacterAnimation.hit(this.titleCharacter.sprite?.getImage() ?? null)
                    .setLoop(1)
                    .setOnAnimationEnd(() => {
                        this.titleCharacter.setSprite(CharacterAppearingAnimation.in()
                                .setLoop(0)
                                .setOnAnimationEnd(() => {
                                    const randomPng = DefaultCharacterImages.random();
                                    idleAnimation.setImage(randomPng);
                                    runAnimation.setImage(randomPng);
                                    this.titleCharacter.sprite = idleAnimation.setLoop(1);
                                }))
                    })
            );

            return true;
        }).setOnUpdate(upscaleWhenHover);

        this.runners = [];
        for (let i = 0; i < 30; ++i) {
            const runner = new SpriteWidget(this.viewport(Math.random() * 100, 100));
            runner.setOnUpdate(diffSecs => {
                const maxX = this.getBoundingBox().add(this.camera).maxX;
                if ((runner.getBoundingBox()?.minX ?? 0) > maxX) {
                    runner.pos.x = this.camera.x;
                    runner.sprite = null;
                }
                if (!runner.sprite) {
                    runner.renderOption.scale(Math.random() * 5 + 5)
                    runner.sprite = DefaultCharacterAnimation.run(DefaultCharacterImages.random()).setFps(Math.random() * 60 + 30);
                }
                if (runner.sprite instanceof SpriteAnimation) {
                    if (runner.sprite.loop === -1) {
                        runner.pos.x += diffSecs / 3 * (60 / runner.sprite.fps);
                    }
                }
                runner.sprite.update(diffSecs);
            }).setOnMouseClick(() => {
                if (runner.sprite instanceof SpriteAnimation && runner.sprite.loop === -1) {
                    runner.setSprite(DefaultCharacterAnimation.hit(runner.sprite.getImage())
                            .setLoop(0)
                            .setOnAnimationEnd(() => {
                                runner.setSprite(CharacterAppearingAnimation.out()
                                        .setLoop(0)
                                        .setOnAnimationEnd(() => {
                                            runner.pos.x = this.camera.x;
                                            runner.sprite = null;
                                        }))
                            })
                    );
                    return true;
                }
            });
            this.runners[i] = runner;
        }

        if (new URLSearchParams(window.location.search).get("renderMouseClick")) {
            this.setOnMouseClick(vec => {
                const clickAnimation = CollectedItemAnimation.clone().setLoop(0);
                const clickParticle = new SpriteWidget(vec, clickAnimation, new RenderOption().absolute().scale(4));
                clickAnimation.setOnAnimationEnd(() => clickParticle.destroy());
                this.addWidget(clickParticle);
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
        this.titleCharacter.pos = this.titleText.getBoundingBox().min.add(-this.vw(2), this.titleText.getBoundingBox().max.y / 1.5);

        this.startGameButton.pos = this.viewport(50, 30);
        this.descriptionButton.pos = this.viewport(50, 50);

        this.reloadButton.pos = this.viewport(95, 10);
        if (this.fullscreenButton) {
            this.fullscreenButton.pos = this.reloadButton.pos.subtract(this.vw(7), 0);
        }

        this.runners.forEach(runner => runner.pos.set(runner.pos.x * ratio, this.vh(100)));
    }
}
