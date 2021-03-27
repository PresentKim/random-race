import Sprite from "./Sprite";

/**
 * @property {Sprite[]} sprites
 * @property {string[]} names
 */
class SpriteSheet {
    /**
     * @param {string|HTMLImageElement} image
     * @param {object[]} spriteJsons
     */
    constructor(image, spriteJsons) {
        this.sprites = [];
        this.names = [];

        spriteJsons.forEach(json => {
            const index = this.sprites.length;
            this.sprites[index] = Sprite.fromJson(json).setImage(image);
            if (json.hasOwnProperty("name")) {
                this.names[index] = json.name.toLowerCase();
            }
        });
    }

    /**
     * @param {string} name
     * @return {Sprite|null}
     */
    get(name) {
        return this.sprites[this.names.indexOf(name.toLowerCase())] || null;
    }

    /** @return {Sprite|null} */
    random() {
        return this.sprites[Math.floor(Math.random() * this.sprites.length)] || null;
    }
}

export default SpriteSheet;