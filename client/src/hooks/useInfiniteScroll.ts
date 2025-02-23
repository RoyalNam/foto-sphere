import { useEffect } from "react";

const useInfiniteScroll = (
  callback: () => void,
  dependencies: any[],
  scrollContainer?: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const container = scrollContainer?.current || window;

    const handleScroll = () => {
      if (!container) return;

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

      if (bottom) callback();
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, dependencies);
};

export default useInfiniteScroll;
