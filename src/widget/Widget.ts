import Activity from "@/activity/Activity";
import Vector2 from "@/utils/Vector2";
import RenderOption from "@/utils/RenderOption";
import BoundingBox from "@/utils/BoundingBox";

export type DefaultHandler = (self: Widget) => void;
export type UpdateHandler = (elapsedTime: number, self: Widget) => void;
export type RequestRenderHandler = (ctx: CanvasRenderingContext2D, self: Widget) => void;
export type MouseEventHandler = (absoluteVec: Vector2, relativeVec: Vector2, self: Widget) => boolean;

export default class Widget {
    public activity: Activity | null;
    public pos: Vector2;
    public renderOption: RenderOption;
    private hoverOutDelay: number = 0;
    public onUpdate: UpdateHandler = () => {
    };
    public onRender: RequestRenderHandler = () => {
    };
    public onDestroy: DefaultHandler = () => {
    };
    public onMouseClick: MouseEventHandler = () => {
        return false;
    };
    public onMouseHover: MouseEventHandler = () => {
        return false;
    };
    public onMouseHoverOut: DefaultHandler = () => {
    };

    constructor(pos: Vector2 | null, renderOption: RenderOption = new RenderOption()) {
        this.renderOption = renderOption ?? new RenderOption();

        this.pos = pos ?? new Vector2();
        this.activity = null;
    }

    setPos(pos: Vector2): this {
        this.pos = pos;
        return this;
    }

    onAttached(activity: Activity) {
        this.activity = activity;
    }

    onUnattached() {
        this.activity = null;
    }

    update(elapsedTime: number): void {
        if (this.hoverOutDelay > 0) {
            this.hoverOutDelay -= elapsedTime;
            if (this.hoverOutDelay <= 0) {
                this.hoverOutDelay = 0;
                this.onMouseHoverOut(this);
            }
        }
        this.onUpdate(elapsedTime, this);
    }

    render(ctx: CanvasRenderingContext2D): void {
        if (this.isHidden())
            return;

        ctx.save();
        this.renderOption.applyFilter(ctx);
        this.onRender(ctx, this);
        ctx.restore();

        if (new URLSearchParams(window.location.search).get("renderBoundingBox")) {
            const bb = this.getBoundingBox();
            if (bb) {
                ctx.beginPath();
                ctx.moveTo(bb.minX, bb.minY);
                ctx.lineTo(bb.minX, bb.maxY);
                ctx.lineTo(bb.maxX, bb.maxY);
                ctx.lineTo(bb.maxX, bb.minY);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }

    /** @return {boolean} if returns true, stop click event handling */
    mouseClick(absoluteVec: Vector2, relativeVec: Vector2): boolean {
        const bb = this.getBoundingBox();
        if (bb && !bb.isInside(this.isAbsolute() ? absoluteVec : relativeVec))
            return false;

        return this.onMouseClick(absoluteVec, relativeVec, this);
    }

    /** @return {boolean} if returns true, stop click event handling */
    mouseHover(absoluteVec: Vector2, relativeVec: Vector2): boolean {
        const bb = this.getBoundingBox();
        if (!bb || !bb.isInside(this.isAbsolute() ? absoluteVec : relativeVec))
            return false;

        this.hoverOutDelay = 20;
        return this.onMouseHover(absoluteVec, relativeVec, this);
    }

    destroy(): void {
        this.activity?.removeWidget(this);
        this.onDestroy(this);
    }

    setOnUpdate(handler: UpdateHandler): this {
        this.onUpdate = handler;
        return this;
    }

    setOnRender(handler: RequestRenderHandler): this {
        this.onRender = handler;
        return this;
    }

    setOnMouseClick(handler: MouseEventHandler): this {
        this.onMouseClick = handler;
        return this;
    }

    setOnMouseHover(handler: MouseEventHandler): this {
        this.onMouseHover = handler;
        return this;
    }

    setOnMouseHoverOut(handler: DefaultHandler): this {
        this.onMouseHoverOut = handler;
        return this;
    }

    setRenderOption(option: RenderOption): this {
        this.renderOption = option;
        return this;
    }

    isAbsolute(): boolean {
        return this.renderOption._absolute;
    }

    isHidden(): boolean {
        return this.renderOption._hidden;
    }

    isHover(): boolean {
        return this.hoverOutDelay > 0;
    }

    getScale(): number {
        return this.renderOption._scale;
    }

    getDrawBox(): BoundingBox | null {
        return this.renderOption._drawBox;
    }

    getBoundingBox(): BoundingBox | null {
        return null;
    }
}
