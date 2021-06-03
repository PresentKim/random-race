import App from "@/App";
import Activity from "@/activity/Activity";
import Vector2 from "@/utils/Vector2";
import Component from "@/utils/Component";
import RenderOption from "@/utils/RenderOption";

export default class Widget extends Component {
    public app: App | null;
    public activity: Activity | null;
    public pos: Vector2;

    constructor(pos: Vector2 | null = null, renderOption: RenderOption = new RenderOption()) {
        super(renderOption);

        this.app = null;
        this.activity = null;
        this.pos = pos ?? new Vector2();
    }

    setPos(pos: Vector2): this {
        this.pos = pos;
        return this;
    }

    onAttach(activity: Activity) {
        this.app = activity.app;
        this.activity = activity;
    }
}
