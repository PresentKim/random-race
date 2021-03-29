import Activity from "./Activity";
import {BackgroundSpriteSheet, IconSpriteSheet, PngFiles, Animations} from "@/sprite/SpriteSheetDefs";
import RenderOption from "@/utils/RenderOption";
import Vector2 from "@/utils/Vector2";
import TextWidget from "@/widget/TextWidget";
import BackgroundWidget from "@/widget/BackgroundWidget";
import DrawWidget from "@/widget/DrawWidget";
import screenFull from "screenfull";

class MainActivity extends Activity {
    /** @param {App} app */
    constructor(app) {
        super(app);

        const background = new BackgroundWidget(null, BackgroundSpriteSheet.random());
        const idleAnimation = Animations.main_character.idle.clone().setImage(PngFiles.pink_man);
        const runAnimation = Animations.main_character.run.clone().setImage(PngFiles.pink_man);
        idleAnimation.setLoop(4).setOnAnimationEnd(() => titleCharacter.drawable = runAnimation.setLoop(6));
        runAnimation.setLoop(6).setOnAnimationEnd(() => titleCharacter.drawable = idleAnimation.setLoop(4));
        const titleCharacter = new DrawWidget(Vector2.from(app).multiply(0.275, 0.25), runAnimation, RenderOption.scale(3));
        const titleText = new TextWidget(Vector2.from(app).multiply(0.5, 0.1), "random race", RenderOption.scale(5));
        const reloadButton = new DrawWidget(Vector2.from(app).multiply(0.95, 0.1), IconSpriteSheet.get("reset"), RenderOption.scale(3));

        this.addWidget(background.setOnUpdate((diffSecs) => background.pos.x -= diffSecs / 10));
        this.addWidget(titleCharacter.setOnClick(() =>
                titleCharacter.drawable = Animations.main_character.hit.clone()
                        .setLoop(1)
                        .setImage(titleCharacter.drawable.image)
                        .setOnAnimationEnd(() => titleCharacter.drawable = idleAnimation.setLoop(1).setImage(PngFiles.randomProperty()))
        ));
        this.addWidget(titleText);
        this.addWidget(reloadButton.setOnClick(() => background.setDrawable(BackgroundSpriteSheet.random()) || true));
        if (screenFull.isEnabled) {
            const fullscreenButton = new DrawWidget(reloadButton.pos.subtract(72, 0), IconSpriteSheet.get("fullscreen_enter"), RenderOption.scale(3));
            this.addWidget(fullscreenButton.setOnClick(() => screenFull.toggle(document.body) || true));

            screenFull.on("change", () => {
                fullscreenButton.drawable = IconSpriteSheet.get(screenFull.isFullscreen ? "fullscreen_exit" : "fullscreen_enter");
            });
        }
    }
}

export default MainActivity;
