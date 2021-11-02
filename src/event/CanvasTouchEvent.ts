export interface CanvasTouchEventMap {
    "touchstart": CanvasTouchEvent;
    "touchmove": CanvasTouchEvent;
    "touchend": CanvasTouchEvent;
}

export class CanvasTouchEvent extends Event {
    private static readonly EventTypeMap = {
        "touchcancel": "touchend",
        "mousedown": "touchstart",
        "mousemove": "touchmove",
        "mouseup": "touchend"
    };

    constructor(type: string,
                public readonly identifier: number,
                public readonly x: number,
                public readonly y: number
    ) {
        super(CanvasTouchEvent.EventTypeMap[type] ?? type);
    }
}

export class CanvasTouchEventHandler extends EventTarget {
    constructor(public readonly canvas: HTMLCanvasElement) {
        super();

        for (const touchEvent of ["touchstart", "touchmove", "touchend", "touchcancel"]) {
            document.body.addEventListener(touchEvent, this.onTouchEvent.bind(this));
        }

        for (const onMouseEvent of ["mousedown", "mousemove", "mouseup"]) {
            document.body.addEventListener(onMouseEvent, this.onMouseEvent.bind(this));
        }
    }

    private onTouchEvent(event: TouchEvent) {
        for (const touch of event.changedTouches) {
            this.dispatchPointEvent(event.type, touch.identifier, touch.pageX, touch.pageY);
        }
    }

    private onMouseEvent(event: MouseEvent) {
        if (event.button === 0) {
            this.dispatchPointEvent(event.type, 0, event.pageX, event.pageY);
        }
    }

    private dispatchPointEvent(type: string, identifier: number, x: number, y: number) {
        const canvasBounds = this.canvas.getBoundingClientRect();
        this.dispatchEvent(new CanvasTouchEvent(
                type,
                identifier,
                (x - canvasBounds.left - window.scrollX) / (this.canvas.clientWidth / (this.canvas.width || this.canvas.clientWidth)),
                (y - canvasBounds.top - window.scrollY) / (this.canvas.clientHeight / (this.canvas.height || this.canvas.clientHeight))
        ));
    }

    public addEventListener<K extends keyof CanvasTouchEventMap>(
            type: K,
            listener: (this: HTMLElement, ev: CanvasTouchEventMap[K]) => any,
            options?: boolean | AddEventListenerOptions
    ): void;
    public addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        super.addEventListener(type, listener, options);
    }
}
