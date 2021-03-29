import Activity from "./Activity";
import {BackgroundSpriteSheet, IconSpriteSheet, PngFiles, Animations} from "@/sprite/SpriteSheetDefs";
import RenderOption from "@/utils/RenderOption";
import Vector2 from "@/utils/Vector2";
import TextWidget from "@/widget/TextWidget";
import BackgroundWidget from "@/widget/BackgroundWidget";
import DrawWidget from "@/widget/DrawWidget";
import screenFull from "screenfull";

const upscaleWhenHover = (_, component) => component.renderOption.scale(component.isHover() ? 3.3 : 3);

class MainActivity extends Activity {
    /** @param {App} app */
    constructor(app) {
        super(app);

        const background = new BackgroundWidget(null, BackgroundSpriteSheet.random());
        /** @var {SpriteAnimation} */
        const idleAnimation = Animations.main_character.idle.clone().setImage(PngFiles.pink_man);
        /** @var {SpriteAnimation} */
        const runAnimation = Animations.main_character.run.clone().setImage(PngFiles.pink_man);
        idleAnimation.setLoop(4).setOnAnimationEnd(() => titleCharacter.drawable = runAnimation.setLoop(6));
        runAnimation.setLoop(6).setOnAnimationEnd(() => titleCharacter.drawable = idleAnimation.setLoop(4));
        const titleCharacter = new DrawWidget(Vector2.from(app).multiply(0.25, 0.175), runAnimation, RenderOption.scale(3));
        const titleText = new TextWidget(Vector2.from(app).multiply(0.5, 0.1), "random race", RenderOption.scale(5));
        const reloadButton = new DrawWidget(Vector2.from(app).multiply(0.95, 0.1), IconSpriteSheet.get("reset"), RenderOption.scale(3));

        this.addWidget(background.setOnUpdate((diffSecs) => background.pos.x -= diffSecs / 10));
        this.addWidget(titleCharacter.setOnMouseClick((vec) => {
            idleAnimation.fps -= 3;
            runAnimation.fps -= 3;
            if (idleAnimation.fps < 0) {
                idleAnimation.fps = 100;
                runAnimation.fps = 100;
            }
            this.addWidget(new TextWidget(vec.add(Math.random() * 80 - 40, 0))
                    .setText(idleAnimation.fps === 100 ? "-100" : "+3")
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
            background.setDrawable(BackgroundSpriteSheet.random());

            titleCharacter.setDrawable(Animations.main_character.hit.clone()
                    .setLoop(1)
                    .setImage(titleCharacter.drawable.image)
                    .setOnAnimationEnd(() => {
                        const randomPng = PngFiles.randomProperty();
                        idleAnimation.setImage(randomPng);
                        runAnimation.setImage(randomPng);
                        titleCharacter.drawable = idleAnimation.setLoop(1);
                    })
            );

            return true;
        }).setOnUpdate(upscaleWhenHover));
        if (screenFull.isEnabled) {
            const fullscreenButton = new DrawWidget(reloadButton.pos.subtract(72, 0), IconSpriteSheet.get("fullscreen_enter"), RenderOption.scale(3));
            this.addWidget(fullscreenButton.setOnMouseClick(() => screenFull.toggle(document.body) || true).setOnUpdate(upscaleWhenHover));

            screenFull.on("change", () => {
                fullscreenButton.drawable = IconSpriteSheet.get(screenFull.isFullscreen ? "fullscreen_exit" : "fullscreen_enter");
            });
        }
    }
}

export default MainActivity;