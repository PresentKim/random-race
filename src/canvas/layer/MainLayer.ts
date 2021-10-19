import CanvasLayer from "./CanvasLayer";
import App from "@/App";
import RenderOption from "@/utils/RenderOption";
import SpriteElement from "@/canvas/element/SpriteElement";
import SpriteManager from "@/sprite/SpriteManager";
import SelectLayer from "@/canvas/layer/SelectLayer";
import CanvasIndex from "@/canvas/CanvasIndex";

export default class MainLayer extends CanvasLayer {
    private readonly startGameButton: SpriteElement;
    private readonly descriptionButton: SpriteElement;

    constructor(app: App) {
        super(app, CanvasIndex.MAIN);

        const buttonSheet = SpriteManager.getSheet("ui/button");
        this.startGameButton = new SpriteElement(null, buttonSheet.getSprite("start_game"), new RenderOption().absolute());
        this.descriptionButton = new SpriteElement(null, buttonSheet.getSprite("description"), new RenderOption().absolute());

        this.startGameButton.setOnUpdate((_, element) => element.renderOption.scale(element.isHover() ? 10.5 : 10) || true);
        this.descriptionButton.setOnUpdate((_, element) => element.renderOption.scale(element.isHover() ? 8.5 : 8) || true);
        this.startGameButton.setOnMouseClick(() => {
            app.setLayer(new SelectLayer(app));
            return true;
        });

        this.appendChild(this.startGameButton);
        this.appendChild(this.descriptionButton);

        this.relocation(1);
    }

    relocation(ratio: number) {
        this.startGameButton.pos = this.viewport(50, 30);
        this.descriptionButton.pos = this.viewport(50, 50);
    }
}
