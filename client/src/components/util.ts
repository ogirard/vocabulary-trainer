export function addGlobalEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
    if (typeof window !== "undefined") {
        document.addEventListener(type, listener, options);
    }
}

export function dispatchGlobalEvent(event: Event): boolean {
    if (typeof window !== "undefined") {
        return document.dispatchEvent(event);
    }

    return false;
}