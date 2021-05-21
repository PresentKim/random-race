import Activity from "./Activity";
import App from "@/App";
import SpriteManager from "@/sprite/SpriteManager";
import RenderOption from "@/utils/RenderOption";
import SpriteAnimationWidget from "@/widget/SpriteAnimationWidget";

export default class OverlayActivity extends Activity {
    constructor(app: App) {
        super(app);

        this.setOnMouseClick(vec => {
            this.addWidget(new SpriteAnimationWidget(vec, SpriteManager.getSheet("particle/collect_particle"))
                    .setRenderOption(new RenderOption().absolute().scale(4))
                    .setAnimationName("item")
                    .setRepeatCount(0)
                    .setOnAnimationEnd((self) => self.destroy()));
            return false;
        })
    }
}
