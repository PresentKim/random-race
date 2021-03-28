import Activity from "./Activity";
import {BackgroundSpriteSheet} from "@/sprite/SpriteSheetDefs";
import RenderOption from "@/utils/RenderOption";
import Vector2 from "@/utils/Vector2";
import TextWidget from "@/widget/TextWidget";
import BackgroundWidget from "@/widget/BackgroundWidget";
import SpriteWidget from "@/widget/SpriteWidget";
import Sprite from "@/sprite/Sprite";
import ReloadPng from "~/ui/button/restart.png";

class MainActivity extends Activity {
    /** @param {App} app */
    constructor(app) {
        super(app);

        const background = new BackgroundWidget(null, BackgroundSpriteSheet.random(), RenderOption.absolute());
        background.update = (diffSecs) => {
            background.pos.x -= diffSecs / 10;
        };
        const titleText = new TextWidget(new Vector2(270, 40), "random race", RenderOption.absolute().scale(3));
        const reloadButton = new SpriteWidget(new Vector2(430, 40), new Sprite(21, 22).setImage(ReloadPng), RenderOption.absolute().scale(2));
        reloadButton.onClick = () => {
            background.sprite = BackgroundSpriteSheet.random();
            return true;
        };
        this.addWidget(background);
        this.addWidget(titleText);
        this.addWidget(reloadButton);
    }
}

export default MainActivity;
