import Sprite from "./Sprite";

/**
 * @property {Sprite[]} sprites
 * @property {string[]} names
 */
class SpriteSheet extends Map {
    /**
     * @param {string|HTMLImageElement} image
     * @param {object[]} spriteJsons
     */
    constructor(image, spriteJsons) {
        super();

        spriteJsons.forEach(json => {
            this.set(json.hasOwnProperty("name") ? json.name : this.size, Sprite.fromJson(json).setImage(image));
        });
    }

    /** @return {Sprite|null} */
    random() {
        return Array.from(this.values())[Math.floor(Math.random() * this.size)];
    }
}

export default SpriteSheet;