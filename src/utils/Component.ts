import RenderOption from "./RenderOption";
import Vector2 from "./Vector2";
import BoundingBox from "./BoundingBox";

export type DefaultHandler = (self: Component) => void;
export type UpdateHandler = (elapsedTime: number, self: Component) => void;
export type RequestRenderHandler = (ctx: CanvasRenderingContext2D, self: Component) => void;
export type MouseEventHandler = (absoluteVec: Vector2, relativeVec: Vector2, self: Component) => boolean | void;

export default class Component {
    public children: Array<Component>;
    public renderOption: RenderOption;
    public isDestroyed: boolean;
    private hoverOutDelay: number;
    public onUpdate: UpdateHandler;
    public onRender: RequestRenderHandler;
    public onDestroy: DefaultHandler;
    public onMouseClick: MouseEventHandler;
    public onMouseHover: MouseEventHandler;
    public onMouseHoverOut: DefaultHandler;

    constructor(renderOption: RenderOption = new RenderOption()) {
        this.children = [];
        this.renderOption = renderOption ?? new RenderOption();
        this.isDestroyed = false;
        this.hoverOutDelay = 0;

        this.onUpdate = () => {
        };
        this.onRender = () => {
        };
        this.onDestroy = () => {
        };
        this.onMouseClick = () => {
            return false;
        };
        this.onMouseHover = () => {
            return false;
        };
        this.onMouseHoverOut = () => {
        };

        this.init();
    }

    init(): void {
    }

    update(elapsedTime: number): void {
        this.children = this.children.filter(component => {
            if (component.isDestroyed)
                return false;

            component.update(elapsedTime);
            return true;
        });

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
        if (this.isDestroyed || this.isHidden())
            return;

        ctx.save();
        this.renderOption.applyFilter(ctx);
        this.children.forEach((component) => {
            ctx.save();
            component.render(ctx);
            ctx.restore();
        });
        this.onRender(ctx, this);

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
        ctx.restore();
    }

    /** @return {boolean} if returns true, stop click event handling */
    mouseClick(absoluteVec: Vector2, relativeVec: Vector2): boolean {
        if (this.isDestroyed)
            return false;

        const bb = this.getBoundingBox();
        if (bb && !bb.isInside(this.isAbsolute() ? absoluteVec : relativeVec))
            return false;

        return this.onMouseClick(absoluteVec, relativeVec, this) || this.children.slice().reverse().findIndex(component => component.mouseClick(absoluteVec, relativeVec)) !== -1;
    }

    /** @return {boolean} if returns true, stop click event handling */
    mouseHover(absoluteVec: Vector2, relativeVec: Vector2): boolean {
        if (this.isDestroyed)
            return false;

        const bb = this.getBoundingBox();
        if (!bb || !bb.isInside(this.isAbsolute() ? absoluteVec : relativeVec))
            return false;

        this.hoverOutDelay = 20;
        return this.onMouseHover(absoluteVec, relativeVec, this) || this.children.slice().reverse().findIndex(component => component.mouseHover(absoluteVec, relativeVec)) !== -1;
    }

    destroy(): void {
        this.isDestroyed = true;
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
