import Activity from "./Activity";
import {BackgroundSpriteSheet} from "@/sprite/SpriteSheetDefs";
import RenderOption from "@/utils/RenderOption";
import Vector2 from "@/utils/Vector2";
import TextWidget from "@/widget/TextWidget";
import BackgroundWidget from "@/widget/BackgroundWidget";

class MainActivity extends Activity {
    /** @param {App} app */
    constructor(app) {
        super(app);

        this.background = new BackgroundWidget(BackgroundSpriteSheet.random(), RenderOption.absolute());
        this.titleText = new TextWidget(new Vector2(270, 40), "random race", RenderOption.absolute().scale(3));
        this.addWidget(this.background);
        this.addWidget(this.titleText);
    }

    update(diffSecs) {
        this.camera.x += diffSecs / 10;
        super.update(diffSecs);
    }
}

export default MainActivity;
