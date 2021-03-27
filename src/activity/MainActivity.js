import Activity from "./Activity";
import {BackgroundSpriteSheet} from "@/sprite/SpriteSheetDefs";
import RenderOption from "@/utils/RenderOption";
import Vector2 from "@/utils/Vector2";
import TextWidget from "@/widget/TextWidget";
import BackgroundWidget from "@/widget/BackgroundWidget";

class MainActivity extends Activity {
    constructor() {
        super();

        this.addWidget(new BackgroundWidget(BackgroundSpriteSheet.random()));
        this.addWidget(new TextWidget(new Vector2(270, 40), "random race", RenderOption.scale(3).absolute(true)));
    }

    update(diffSecs) {
        this.camera.x += diffSecs / 10;
        super.update(diffSecs);
    }
}

export default MainActivity;
