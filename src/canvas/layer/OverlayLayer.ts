import CanvasLayer from "./CanvasLayer";
import App from "@/App";
import SpriteManager from "@/sprite/SpriteManager";
import RenderOption from "@/utils/RenderOption";
import SpriteAnimationElement from "@/canvas/element/SpriteAnimationElement";
import Vector2 from "@/utils/Vector2";
import CanvasIndex from "@/canvas/CanvasIndex";

export default class OverlayLayer extends CanvasLayer {
    constructor(app: App) {
        super(app, CanvasIndex.OVERLAY);

    }

    mouseClick(absoluteVec: Vector2, relativeVec: Vector2): boolean {
        this.appendChild(new SpriteAnimationElement(absoluteVec, SpriteManager.getSheet("particle/collect_particle"))
                .setRenderOption(new RenderOption().absolute().scale(4))
                .setAnimationName("item")
                .setRepeatCount(0)
                .setOnAnimationEnd((self) => self.destroy()));
        return false;
    }
}
