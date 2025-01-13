import { useCallback, useEffect, useRef } from "react";

const useTimeout = (
  callback: () => void,
  delay: number | null
): { reset: () => void; clear: () => void } => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    if (delay !== null) {
      timeoutRef.current = window.setTimeout(
        () => callbackRef.current(),
        delay
      );
    }
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (delay !== null) {
      set();
      return clear;
    }
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
};

export default useTimeout;
