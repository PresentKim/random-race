import Activity from "./Activity";
import App, {ACTIVITY_PRIORITY} from "@/App";
import RenderOption from "@/utils/RenderOption";
import SpriteWidget from "@/widget/SpriteWidget";
import SpriteManager from "@/sprite/SpriteManager";
import SelectActivity from "@/activity/SelectActivity";

export default class MainActivity extends Activity {
    private readonly startGameButton: SpriteWidget;
    private readonly descriptionButton: SpriteWidget;

    constructor(app: App) {
        super(app);

        const buttonSheet = SpriteManager.getSheet("ui/button");
        this.startGameButton = new SpriteWidget(null, buttonSheet.getSprite("start_game"), new RenderOption().absolute());
        this.descriptionButton = new SpriteWidget(null, buttonSheet.getSprite("description"), new RenderOption().absolute());

        this.startGameButton.setOnUpdate((_, component) => component.renderOption.scale(component.isHover() ? 10.5 : 10) || true);
        this.descriptionButton.setOnUpdate((_, component) => component.renderOption.scale(component.isHover() ? 8.5 : 8) || true);
        this.startGameButton.setOnMouseClick(() => app.setActivity(ACTIVITY_PRIORITY.MAIN, new SelectActivity(app)));

        this.addWidget(this.startGameButton);
        this.addWidget(this.descriptionButton);

        this.relocation(1);
    }

    relocation(ratio: number) {
        this.startGameButton.pos = this.viewport(50, 30);
        this.descriptionButton.pos = this.viewport(50, 50);
    }
}
