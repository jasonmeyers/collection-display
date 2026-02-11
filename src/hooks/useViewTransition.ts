import { useCallback } from "react";

export function useViewTransition() {
  return useCallback((callback: () => void) => {
    if (!document.startViewTransition) {
      callback();
      return;
    }
    document.startViewTransition(callback);
  }, []);
}
