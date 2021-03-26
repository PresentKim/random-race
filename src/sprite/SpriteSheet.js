import Sprite from "./Sprite";

/**
 * @property {HTMLImageElement} image
 * @property {Sprite[]} sprites
 * @property {string[]} names
 */
class SpriteSheet {
    /**
     * @param {string} imageSrc
     * @param {object[]} spriteJsons
     */
    constructor(imageSrc, spriteJsons) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.sprites = [];
        this.names = [];

        spriteJsons.forEach(json => {
            /** @var {Sprite} sprite */
            const sprite = Sprite.fromJson(json);
            sprite.image = this.image

            const index = this.sprites.length;
            this.sprites[index] = sprite;
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