import Activity from "./Activity";
import {BackgroundSpriteSheet, IconSpriteSheet} from "@/sprite/SpriteSheetDefs";
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

        const background = new BackgroundWidget(null, BackgroundSpriteSheet.random(), RenderOption.absolute());
        const titleText = new TextWidget(Vector2.from(app).multiply(0.5, 0.1), "random race", RenderOption.absolute().scale(5));
        const reloadButton = new DrawWidget(Vector2.from(app).multiply(0.95, 0.1), IconSpriteSheet.get("reset"), RenderOption.absolute().scale(3));

        this.addWidget(background.setOnUpdate((diffSecs) => background.pos.x -= diffSecs / 10));
        this.addWidget(titleText);
        this.addWidget(reloadButton.setOnClick(() => background.setDrawable(BackgroundSpriteSheet.random()) || true));
        if (screenFull.isEnabled) {
            const fullscreenButton = new DrawWidget(reloadButton.pos.subtract(72, 0), IconSpriteSheet.get("fullscreen_enter"), RenderOption.absolute().scale(3));
            this.addWidget(fullscreenButton.setOnClick(() => screenFull.toggle(document.body) || true));

            screenFull.on("change", () => {
                fullscreenButton.drawable = IconSpriteSheet.get(screenFull.isFullscreen ? "fullscreen_exit" : "fullscreen_enter");
            });
        }
    }
}

export default MainActivity;
