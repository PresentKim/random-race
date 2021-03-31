import Activity from "./Activity";
import App from "@/App";
import {DefaultCharacterImages} from "@/defs/image";
import {BackgroundSpriteSheet, IconSpriteSheet} from "@/defs/spritesheet";
import {DefaultCharacterAnimation, CharacterAppearingAnimation, CollectedItemAnimation} from "@/defs/animation";
import RenderOption from "@/utils/RenderOption";
import Vector2 from "@/utils/Vector2";
import TextWidget from "@/widget/TextWidget";
import BackgroundWidget from "@/widget/BackgroundWidget";
import SpriteWidget from "@/widget/SpriteWidget";
import {UpdateHandler} from "@/utils/Component";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import * as ScreenFull from "screenfull";

const upscaleWhenHover: UpdateHandler = (_, component) => {
    component.renderOption.scale(component.isHover() ? 3.3 : 3);
    return true
};

export default class MainActivity extends Activity {
    constructor(app: App) {
        super(app);

        const background = new BackgroundWidget(null, BackgroundSpriteSheet.random());
        const idleAnimation = DefaultCharacterAnimation.idle(DefaultCharacterImages.get("PinkMan"));
        const runAnimation = DefaultCharacterAnimation.run(DefaultCharacterImages.get("PinkMan"));
        idleAnimation.setLoop(4).setOnAnimationEnd(() => titleCharacter.sprite = runAnimation.setLoop(6));
        runAnimation.setLoop(6).setOnAnimationEnd(() => titleCharacter.sprite = idleAnimation.setLoop(4));
        const titleCharacter = new SpriteWidget(Vector2.from(this.app.canvas).multiply(0.25, 0.175), runAnimation, new RenderOption().absolute().scale(3));
        const titleText = new TextWidget(Vector2.from(this.app.canvas).multiply(0.5, 0.1), "random race", new RenderOption().absolute().scale(5));
        const reloadButton = new SpriteWidget(Vector2.from(this.app.canvas).multiply(0.95, 0.1), IconSpriteSheet.get("reset"), new RenderOption().absolute().scale(3));

        this.addWidget(background.setOnUpdate(diffSecs => {
            background.pos.x -= diffSecs / 10;
        }));
        this.addWidget(titleCharacter.setOnMouseClick(vec => {
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
        }));
        this.addWidget(titleText);
        this.addWidget(reloadButton.setOnMouseClick(() => {
            background.setSprite(BackgroundSpriteSheet.random());

            titleCharacter.setSprite(DefaultCharacterAnimation.hit(titleCharacter.sprite?.getImage() ?? null)
                    .setLoop(1)
                    .setOnAnimationEnd(() => {
                        titleCharacter.setSprite(CharacterAppearingAnimation.in()
                                .setLoop(0)
                                .setOnAnimationEnd(() => {
                                    const randomPng = DefaultCharacterImages.random();
                                    idleAnimation.setImage(randomPng);
                                    runAnimation.setImage(randomPng);
                                    titleCharacter.sprite = idleAnimation.setLoop(1);
                                }))
                    })
            );

            return true;
        }).setOnUpdate(upscaleWhenHover));
        if (ScreenFull.isEnabled) {
            //@ts-ignore
            const screenfull = ScreenFull.default;
            const fullscreenButton = new SpriteWidget(reloadButton.pos.subtract(72, 0), IconSpriteSheet.get("fullscreen_enter"), new RenderOption().absolute().scale(3));
            this.addWidget(fullscreenButton.setOnMouseClick(() => screenfull.toggle(document.body) || true).setOnUpdate(upscaleWhenHover));

            screenfull.on("change", () => {
                fullscreenButton.sprite = IconSpriteSheet.get(screenfull.isFullscreen ? "fullscreen_exit" : "fullscreen_enter") ?? null;
            });
        }

        for (let i = 0; i < 30; ++i) {
            const runner = new SpriteWidget(new Vector2(Math.random() * this.app.canvas.width, this.app.canvas.height));
            this.addWidget(runner.setOnUpdate(diffSecs => {
                const maxX = this.getBoundingBox().add(this.camera).maxX;
                if ((runner.getBoundingBox()?.minX ?? 0) > maxX) {
                    runner.pos.x = this.camera.x;
                    runner.sprite = null;
                }
                if (!runner.sprite) {
                    runner.renderOption.scale(Math.random() * 5 + 2.5)
                    runner.sprite = DefaultCharacterAnimation.run(DefaultCharacterImages.random()).setFps(Math.random() * 60 + 30);
                }
                if (runner.sprite instanceof SpriteAnimation) {
                    if (runner.sprite.loop === -1) {
                        runner.pos.x += diffSecs / 5 * (60 / runner.sprite.fps);
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
            }));
        }

        if (new URLSearchParams(window.location.search).get("renderMouseClick")) {
            this.setOnMouseClick(vec => {
                const clickAnimation = CollectedItemAnimation.clone().setLoop(0);
                const clickParticle = new SpriteWidget(vec, clickAnimation, new RenderOption().absolute());
                clickAnimation.setOnAnimationEnd(() => clickParticle.destroy());
                this.addWidget(clickParticle);
            })
        }

        this.setOnUpdate(diffSecs => {
            this.camera.x += diffSecs / 10;
        })
    }
}
