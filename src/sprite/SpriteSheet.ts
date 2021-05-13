import Sprite from "@/sprite/Sprite";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import RandomMap from "@/utils/RandomMap";

export default class SpriteSheet {
    public readonly sprites: RandomMap<string, Sprite>;
    public readonly animations: RandomMap<string, SpriteAnimation>;

    constructor() {
        this.sprites = new RandomMap<string, Sprite>();
        this.animations = new RandomMap<string, SpriteAnimation>();
    }

    getSprite(spriteName: string): Sprite | null {
        return this.sprites.get(spriteName) ?? null;
    }

    getAnimation(animationName: string): SpriteAnimation | null {
        return this.animations.get(animationName) ?? null;
    }
}