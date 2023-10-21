import { useEffect } from "react";

export const useHotkey = (
    keys: string[],
    onTrigger: () => void
) => {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const normalizedKeys = keys.map(key => key.toLowerCase());

        const handleTriggerKey = (event: KeyboardEvent) => {
            if (normalizedKeys.includes(event.code.toLowerCase())) {
                onTrigger();
            }
        };

        document.addEventListener("keydown", handleTriggerKey);

        return () => {
            document.removeEventListener("keydown", handleTriggerKey);
        };
    }, [keys, onTrigger]);
}; 