import Vector2 from "@/utils/Vector2";
import Component from "@/utils/Component";

/**
 * @property {App|null} app
 * @property {Activity|null} activity
 * @property {Vector2} pos
 */
class Widget extends Component {
    /**
     * @param {Vector2|null} pos
     * @param {RenderOption|null} renderOption
     */
    constructor(pos = null, renderOption = null) {
        super(renderOption);

        this.app = null;
        this.activity = null;
        this.setPos(pos);
    }

    /**
     * @param {Vector2|null} pos
     * @return {Component}
     */
    setPos(pos) {
        this.pos = pos || new Vector2(0, 0);
        return this;
    }
}

export default Widget;