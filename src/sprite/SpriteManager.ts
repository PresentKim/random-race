import Sprite, {ImageLike, SpriteData} from "@/sprite/Sprite";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import SpriteSheet from "@/sprite/SpriteSheet";
import {IPointData} from "@/utils/Vector2";
import RandomMap from "@/utils/RandomMap";

class SpriteManager {
    public readonly sprites: RandomMap<string, Sprite>;
    public readonly sheets: RandomMap<string, SpriteSheet>;
    public readonly sheetGroups: RandomMap<string, RandomMap<string, SpriteSheet>>;
    public readonly customPivots: RandomMap<string, Map<string, IPointData>>;

    constructor() {
        this.sprites = new RandomMap<string, Sprite>();
        this.sheets = new RandomMap<string, SpriteSheet>();
        this.sheetGroups = new RandomMap<string, RandomMap<string, SpriteSheet>>();
        this.customPivots = new RandomMap<string, Map<string, IPointData>>();
    }

    getSprite(spriteName: string): Sprite | null {
        return this.sprites.get(spriteName) ?? null;
    }

    setSprite(spriteName: string, sprite: Sprite): this {
        this.sprites.set(spriteName, sprite);
        return this;
    }

    getSheet(sheetName: string): SpriteSheet | null {
        return this.sheets.get(sheetName) ?? null;
    }

    setSheet(sheetName: string, sheet: SpriteSheet): this {
        this.sheets.set(sheetName, sheet);
        return this;
    }

    getGroup(groupName: string): RandomMap<string, SpriteSheet> | null {
        return this.sheetGroups.get(groupName) ?? null;
    }

    setGroup(groupName: string, group: RandomMap<string, SpriteSheet>): this {
        this.sheetGroups.set(groupName, group);
        return this;
    }

    loadSheet(sheetName: string, image: ImageLike, dataset: Map<string, SpriteData>): this {
        const sheet = new SpriteSheet();
        dataset.forEach((spriteData, spriteName) => {
            const sprite = new Sprite(spriteData, image);

            this.setSprite(`${sheetName}/${spriteName}`, sprite);
            sheet.sprites.set(spriteName, sprite);

            const match = spriteName.match(/[_\-][\d]+$/i);
            if (match) {
                const animationName = spriteName.slice(0, spriteName.length - match[0].length);
                if (!sheet.animations.has(animationName)) {
                    sheet.animations.set(animationName, new SpriteAnimation());
                }
                sheet.animations.get(animationName).frames.push(sprite);
            }
        });

        this.setSheet(sheetName, sheet);

        const match = sheetName.match(/([a-z]+)\/(.+)/i);
        if (match) {
            if (!this.sheetGroups.has(match[1])) {
                this.sheetGroups.set(match[1], new RandomMap<string, SpriteSheet>());
            }
            this.sheetGroups.get(match[1]).set(match[2], sheet)
        }
        return this;
    }
}

export default new SpriteManager();