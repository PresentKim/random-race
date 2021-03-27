import Vector2 from "@/utils/Vector2";
import Component from "@/utils/Component";

/**
 * @property {App|null} app
 * @property {Activity|null} activity
 * @property {Vector2} pos
 * @property {ClickHandler|null} onClick
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
        this.pos = pos || new Vector2(0, 0);
        this.onClick = null;
    }

    handleClick(absoluteVec, relativeVec) {
        if (this.onClick === null)
            return false;

        const bb = this.getBoundingBox();
        if (bb === null)
            return false;

        if (bb.isVectorInside(this.isAbsolute() ? absoluteVec : relativeVec)) {
            return this.onClick(absoluteVec, relativeVec, this);
        }
        return false;
    }

    /** @return {BoundingBox|null} */
    getBoundingBox() {
        return null;
    }

    /**
     * @param {ClickHandler|null} handler
     * @return {Widget}
     */
    setOnClick(handler){
        this.onClick = handler;
        return this;
    }
}

export default Widget;