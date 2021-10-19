export default class CanvasIndex {
    public readonly canvas: HTMLCanvasElement;

    private constructor(
            public readonly name: string,
            public readonly index: number
    ) {
        this.canvas = document.createElement("canvas");
        this.canvas.id = name;
        this.canvas.style.zIndex += index;
    }

    public static BACKGROUND = new CanvasIndex("background", 0);
    public static MAIN = new CanvasIndex("main", 1);
    public static HEADER = new CanvasIndex("header", 2);
    public static FOOTER = new CanvasIndex("footer", 3);
    public static OVERLAY = new CanvasIndex("overlay", 4);
}