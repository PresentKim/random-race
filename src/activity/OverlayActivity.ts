import Activity, {ActivityIdentifier} from "./Activity";
import App from "@/App";
import SpriteManager from "@/sprite/SpriteManager";
import RenderOption from "@/utils/RenderOption";
import SpriteAnimationWidget from "@/widget/SpriteAnimationWidget";
import Vector2 from "@/utils/Vector2";

export default class OverlayActivity extends Activity {
    constructor(app: App) {
        super(app, ActivityIdentifier.OVERLAY);

    }

    mouseClick(absoluteVec: Vector2, relativeVec: Vector2): boolean {
        this.addWidget(new SpriteAnimationWidget(absoluteVec, SpriteManager.getSheet("particle/collect_particle"))
                .setRenderOption(new RenderOption().absolute().scale(4))
                .setAnimationName("item")
                .setRepeatCount(0)
                .setOnAnimationEnd((self) => self.destroy()));
        return false;
    }
}
