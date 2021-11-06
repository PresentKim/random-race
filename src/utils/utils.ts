export const intervalPerAnimationFrame = (callback: FrameRequestCallback): AnimationFrameProvider => (
        (window as any).requestAnimationFrame(callback) || (window as any).webkitRequestAnimationFrame(callback) ||
        (window as any).msRequestAnimationFrame(callback) || (window as any).mozRequestAnimationFrame(callback) ||
        window.setTimeout(callback, 1000 / 60)
);