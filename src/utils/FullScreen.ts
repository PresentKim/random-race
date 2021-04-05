const document = (window.document as any) ?? {};

export default class FullScreen {
    static get isSupport(): boolean {
        return Boolean(
                document.fullscreenEnabled ||
                document.webkitFullscreenEnabled ||
                document.msFullscreenEnabled ||
                document.mozFullScreenEnabled
        );
    }

    static get isEnabled(): boolean {
        return this.isSupport && Boolean(
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.webkitCurrentFullScreenElement ||
                document.msFullscreenElement ||
                document.mozFullScreenElement
        );
    }

    static request(element: Element = document.documentElement): boolean {
        const _element = (element as any) ?? {};
        const requestMethod: Function | undefined =
                _element.requestFullscreen ||
                _element.webkitRequestFullscreen ||
                _element.msRequestFullscreen ||
                _element.mozRequestFullScreen;

        if (requestMethod) {
            requestMethod.call(_element);
            return true;
        }
        return false;
    }

    static exit(): boolean {
        const exitMethod: Function | undefined =
                document.exitFullscreen ||
                document.webkitExitFullscreen ||
                document.webkitCancelFullScreen ||
                document.msExitFullscreen ||
                document.mozCancelFullScreen;

        if (exitMethod) {
            exitMethod.call(document);
            return true;
        }
        return false;
    };

    static toggle(element: Element = document.documentElement): boolean {
        return this.isEnabled ? this.exit() : this.request(element);
    }

    static onChange(callback: (this: Document, ev: Event) => any): void {
        ["", "webkit", "moz", "ms"].forEach(
                prefix => document.addEventListener(prefix + "fullscreenchange", callback, false)
        );
    }
};