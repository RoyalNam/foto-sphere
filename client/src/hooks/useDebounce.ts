import { useEffect } from "react";
import useTimeout from "./useTimeout";

const useDebounce = (
  callback: () => void,
  delay: number | null,
  dependencies: any[]
): void => {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(() => {
    reset();
  }, [...dependencies, reset]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);
};

export default useDebounce;
