import CanvasLayer from "./CanvasLayer";
import App from "@/App";
import SpriteManager from "@/sprite/SpriteManager";
import RenderOption from "@/utils/RenderOption";
import BackgroundElement from "@/canvas/element/BackgroundElement";
import CanvasIndex from "@/canvas/CanvasIndex";

export default class BackgroundLayer extends CanvasLayer {
    constructor(app: App) {
        super(app, CanvasIndex.BACKGROUND);

        this.appendChild(new BackgroundElement(null, SpriteManager.getSheet("ui/background").sprites.random())
                .setRenderOption(new RenderOption().scale(2))
                .setOnUpdate((elapsedTime, self) => (self as BackgroundElement).pos.x -= elapsedTime / 10)
        );
    }
}
