import { useEffect, useRef } from "react";

const useInfiniteScroll = (
  callback: () => void,
  dependencies: any[],
  scrollContainer?: React.RefObject<HTMLElement>
) => {
  const isFetching = useRef(false);

  useEffect(() => {
    const container = scrollContainer?.current || window;

    const handleScroll = () => {
      if (!container || isFetching.current) return;

      let bottom = false;
      if (container instanceof HTMLElement) {
        bottom =
          container.scrollHeight - container.scrollTop <=
          container.clientHeight + 300;
      } else {
        bottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 300;
      }

      if (bottom) {
        isFetching.current = true;
        callback();
        setTimeout(() => (isFetching.current = false), 500);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, dependencies);
};

export default useInfiniteScroll;
