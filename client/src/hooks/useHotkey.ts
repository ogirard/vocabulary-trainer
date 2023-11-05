import { useEffect } from 'react';

export const useHotkey = (
  keys: string[],
  onTrigger: () => boolean,
  element?: HTMLElement
) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const normalizedKeys = keys.map((key) => key.toLowerCase());

    const handleTriggerKey = (event: KeyboardEvent) => {
      if (normalizedKeys.includes(event.code.toLowerCase())) {
        if (onTrigger()) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    };

    if (element) {
      element.addEventListener('keydown', handleTriggerKey);
    } else {
      document.addEventListener('keydown', handleTriggerKey);
    }

    return () => {
      if (element) {
        element.removeEventListener('keydown', handleTriggerKey);
      } else {
        document.removeEventListener('keydown', handleTriggerKey);
      }
    };
  }, [keys, onTrigger]);
};
