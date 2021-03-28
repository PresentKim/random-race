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

        const background = new BackgroundWidget(null, BackgroundSpriteSheet.random(), RenderOption.absolute());
        background.update = (diffSecs) => {
            this.background.pos.x -= diffSecs / 10;
        };
        const titleText = new TextWidget(new Vector2(270, 40), "random race", RenderOption.absolute().scale(3));
        this.addWidget(background);
        this.addWidget(titleText);
    }
}

export default MainActivity;
