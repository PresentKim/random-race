import Activity from "./Activity";
import App from "@/App";
import SpriteManager from "@/sprite/SpriteManager";
import RenderOption from "@/utils/RenderOption";
import BackgroundWidget from "@/widget/BackgroundWidget";

export default class BackgroundActivity extends Activity {
    constructor(app: App) {
        super(app);

        this.addWidget(new BackgroundWidget(null, SpriteManager.getSheet("ui/background").sprites.random())
                .setRenderOption(new RenderOption().scale(2))
                .setOnUpdate((elapsedTime, self) => (self as BackgroundWidget).pos.x -= elapsedTime / 10)
        );
    }
}
