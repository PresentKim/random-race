import Sprite, {ImageLike, SpriteData} from "@/sprite/Sprite";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import SpriteSheet from "@/sprite/SpriteSheet";
import RandomMap from "@/utils/RandomMap";

export declare interface GroupDataset {
    [sheetName: string]: {
        [spriteName: string]: SpriteData
    }
}

export declare interface CustomData {
    pivot?: Array<number>,
    animation_fps?: {
        [animation_name: string]: number;
    }
}

export declare interface CustomDataset {
    [regex: string]: CustomData
}

const DEFAULT_CUSTOM_DATA: CustomData = {
    pivot: [0.5, 1],
    animation_fps: {}
}

class SpriteManager {
    public readonly sheets: RandomMap<string, SpriteSheet>;
    public readonly sheetGroups: RandomMap<string, RandomMap<string, SpriteSheet>>;

    constructor() {
        this.sheets = new RandomMap<string, SpriteSheet>();
        this.sheetGroups = new RandomMap<string, RandomMap<string, SpriteSheet>>();
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

    async loadSheetGroup(groupName: string, image: ImageLike, groupDataset: GroupDataset, customDataset: CustomDataset): Promise<SpriteSheet[]> {
        const sheetGroup = new RandomMap<string, SpriteSheet>();
        let i = 0;
        let promises: Promise<SpriteSheet>[] = [];
        for (const [sheetName, sheetDataset] of Object.entries(groupDataset)) {
            const fullSheetName = `${groupName}/${sheetName}`;
            promises.push(new Promise(async resolve => {
                //Prepare custom data (pivot value, animation fps, ETC...)
                let customData: CustomData = DEFAULT_CUSTOM_DATA;
                for (const [regex, data] of Object.entries(customDataset)) {
                    if (fullSheetName.search(regex) !== -1) {
                        customData = {...customData, ...data};
                    }
                }

                //Create sprite sheet instance via sheet dataset and custom data
                const sheet = new SpriteSheet();
                for (const [spriteName, spriteData] of Object.entries(sheetDataset)) {
                    spriteData.px = spriteData.ow * customData.pivot[0];
                    spriteData.py = spriteData.oh * customData.pivot[1];
                    const sprite = new Sprite(spriteData, image);

                    const match = spriteName.match(/[_\-][\d]+$/i);
                    if (match) { //if is this animation sprites, register to animation map
                        const animationName = spriteName.slice(0, spriteName.length - match[0].length);
                        if (!sheet.animations.has(animationName)) {
                            sheet.animations.set(animationName, new SpriteAnimation());

                            if (customData?.animation_fps?.hasOwnProperty(animationName)) {
                                sheet.animations.get(animationName).setFps(customData?.animation_fps[animationName]);
                            }
                        }
                        sheet.animations.get(animationName).frames.push(sprite);
                    } else {
                        sheet.sprites.set(spriteName, sprite);
                    }
                }

                resolve(sheet);
            }).then((sheet: SpriteSheet) => {
                sheetGroup.set(sheetName, sheet);
                this.setSheet(fullSheetName, sheet);
                console.debug(`%c  └─[${++i}/${Object.keys(groupDataset).length}] : ${groupName}/%c${sheetName}`, "color: gray", "color: lightgray");

                return sheet;
            }));
        }
        return Promise.all(promises).then((sheets) => {
            this.setGroup(groupName, sheetGroup)
            return sheets;
        });
    }
}

export default new SpriteManager();