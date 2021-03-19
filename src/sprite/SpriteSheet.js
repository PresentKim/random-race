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
     * @param {number} index
     *
     * @return {Sprite|null}
     */
    get(index) {
        return this.sprites[index] || null;
    }

    /**
     * @param {string} name
     * @return {Sprite|null}
     */
    getByName(name) {
        return this.get(this.names.indexOf(name.toLowerCase()));
    }

    /** @return {Sprite|null} */
    random() {
        return this.get(Math.floor(Math.random() * this.sprites.length));
    }
}

export default SpriteSheet;