import Activity from "./Activity";
import {DefaultCharacterImages} from "@/defs/image";
import {BackgroundSpriteSheet, IconSpriteSheet} from "@/defs/spritesheet";
import {DefaultCharacterAnimation, CharacterAppearingAnimation, CollectedItemAnimation} from "@/defs/animation";
import RenderOption from "@/utils/RenderOption";
import Vector2 from "@/utils/Vector2";
import TextWidget from "@/widget/TextWidget";
import BackgroundWidget from "@/widget/BackgroundWidget";
import SpriteWidget from "@/widget/SpriteWidget";
import screenFull from "screenfull";

const upscaleWhenHover = (_, component) => component.renderOption.scale(component.isHover() ? 3.3 : 3);

class MainActivity extends Activity {
    /** @param {App} app */
    constructor(app) {
        super(app);

        const background = new BackgroundWidget(null, BackgroundSpriteSheet.random());
        /** @var {SpriteAnimation} */
        const idleAnimation = DefaultCharacterAnimation.idle(DefaultCharacterImages.PinkMan)
        /** @var {SpriteAnimation} */
        const runAnimation = DefaultCharacterAnimation.run(DefaultCharacterImages.PinkMan)
        idleAnimation.setLoop(4).setOnAnimationEnd(() => titleCharacter.sprite = runAnimation.setLoop(6));
        runAnimation.setLoop(6).setOnAnimationEnd(() => titleCharacter.sprite = idleAnimation.setLoop(4));
        const titleCharacter = new SpriteWidget(Vector2.from(app).multiply(0.25, 0.175), runAnimation, RenderOption.absolute().scale(3));
        const titleText = new TextWidget(Vector2.from(app).multiply(0.5, 0.1), "random race", RenderOption.absolute().scale(5));
        const reloadButton = new SpriteWidget(Vector2.from(app).multiply(0.95, 0.1), IconSpriteSheet.get("reset"), RenderOption.absolute().scale(3));

        this.addWidget(background.setOnUpdate((diffSecs) => background.pos.x -= diffSecs / 10));
        this.addWidget(titleCharacter.setOnMouseClick((vec) => {
            idleAnimation.fps -= 3;
            runAnimation.fps -= 3;
            if (idleAnimation.fps < 0) {
                idleAnimation.fps = 100;
                runAnimation.fps = 100;
            }
            this.addWidget(new TextWidget(vec.add(Math.random() * 80 - 40, 0), idleAnimation.fps === 100 ? "-100" : "+3", RenderOption.absolute())
                    .setRenderOption(RenderOption.scale(2).absolute().hue(Math.random() * 360).brightness(6).contrast(2))
                    .setOnUpdate((diffSecs, self) => {
                        self.pos.y -= diffSecs / 20;
                        if (self.pos.y < 0) {
                            self.destroy();
                        }
                    })
            );
        }));
        this.addWidget(titleText);
        this.addWidget(reloadButton.setOnMouseClick(() => {
            background.setSprite(BackgroundSpriteSheet.random());

            titleCharacter.setSprite(DefaultCharacterAnimation.hit(titleCharacter.sprite.image)
                    .setLoop(1)
                    .setOnAnimationEnd(() => {
                        titleCharacter.setSprite(CharacterAppearingAnimation.in()
                                .setLoop(0)
                                .setOnAnimationEnd(() => {
                                    const randomPng = DefaultCharacterImages.randomProperty();
                                    idleAnimation.setImage(randomPng);
                                    runAnimation.setImage(randomPng);
                                    titleCharacter.sprite = idleAnimation.setLoop(1);
                                }))
                    })
            );

            return true;
        }).setOnUpdate(upscaleWhenHover));
        if (screenFull.isEnabled) {
            const fullscreenButton = new SpriteWidget(reloadButton.pos.subtract(72, 0), IconSpriteSheet.get("fullscreen_enter"), RenderOption.absolute().scale(3));
            this.addWidget(fullscreenButton.setOnMouseClick(() => screenFull.toggle(document.body) || true).setOnUpdate(upscaleWhenHover));

            screenFull.on("change", () => {
                fullscreenButton.sprite = IconSpriteSheet.get(screenFull.isFullscreen ? "fullscreen_exit" : "fullscreen_enter");
            });
        }

        for (let i = 0; i < 30; ++i) {
            const runner = new SpriteWidget(new Vector2(Math.random() * this.app.canvas.width, this.app.canvas.height));
            this.addWidget(runner.setOnUpdate(diffSecs => {
                if (runner.getBoundingBox()?.minX > this.getBoundingBox().add(this.camera).maxX) {
                    runner.pos.x = this.camera.x;
                    runner.sprite = null;
                }
                if (!runner.sprite) {
                    runner.renderOption.scale(Math.random() * 5 + 2.5)
                    runner.sprite = DefaultCharacterAnimation.run(DefaultCharacterImages.randomProperty()).setFps(Math.random() * 60 + 30)
                }
                /** @var {SpriteAnimation} */
                let animation = runner.sprite;
                animation.update(diffSecs);
                if (animation.loop === -1) {
                    runner.pos.x += diffSecs / 5 * (60 / animation.fps);
                }
            }).setOnMouseClick(() => {
                if (runner.sprite.loop === -1) {
                    runner.setSprite(DefaultCharacterAnimation.hit(runner.sprite.image)
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
                const clickParticle = new SpriteWidget(vec, clickAnimation, RenderOption.absolute());
                clickAnimation.setOnAnimationEnd(() => clickParticle.destroy());
                this.addWidget(clickParticle);
            })
        }

        this.setOnUpdate(diffSecs => {
            this.camera.x += diffSecs / 10;
        })
    }
}

export default MainActivity;
