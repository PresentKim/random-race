export default class FullScreen {
    static get valid(): boolean {
        const _document = (document as any) ?? {};
        return Boolean(_document.fullscreenEnabled || _document.webkitFullscreenEnabled || _document.webkitCancelFullScreen || _document.msFullscreenEnabled || _document.mozFullScreenEnabled || false);
    }

    static get enable(): boolean {
        if (!this.valid)
            return false;

        const _document = (document as any) ?? {};
        return Boolean(_document.fullscreenElement || _document.webkitFullscreenElement || _document.webkitCurrentFullScreenElement || _document.msFullscreenElement || _document.mozFullScreenElement);
    }

    static request(element: Element = document.documentElement): void {
        const _element = (element as any) ?? {};
        _element.requestFullscreen() || _element.webkitRequestFullscreen() || _element.webkitRequestFullScreen() || _element.msRequestFullscreen() || _element.mozRequestFullScreen();
    }

    static exit() {
        const _document = (document as any) ?? {};
        return _document.exitFullscreen() || _document.webkitExitFullscreen() || _document.webkitCancelFullScreen() || _document.msExitFullscreen() || _document.mozCancelFullScreen();
    };

    static toggle(element: Element = document.documentElement) {
        this.enable ? this.exit() : this.request(element);
    }

    static onChange(callback: (this: Document, ev: Event) => any) {
        document.addEventListener("fullscreenchange", callback, false);
        document.addEventListener("webkitfullscreenchange", callback, false);
        document.addEventListener("mozfullscreenchange", callback, false);
        document.addEventListener("MSFullscreenChange", callback, false);
    }
};