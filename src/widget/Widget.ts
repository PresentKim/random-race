import Activity from "@/activity/Activity";
import Vector2 from "@/utils/Vector2";
import Component from "@/utils/Component";
import RenderOption from "@/utils/RenderOption";

export default class Widget extends Component {
    public activity: Activity | null;
    public pos: Vector2;

    constructor(pos: Vector2 | null, renderOption: RenderOption = new RenderOption()) {
        super(renderOption);

        this.pos = pos ?? new Vector2();
        this.activity = null;
    }

    setPos(pos: Vector2): this {
        this.pos = pos;
        return this;
    }

    onAttach(activity: Activity) {
        this.activity = activity;
    }
}
