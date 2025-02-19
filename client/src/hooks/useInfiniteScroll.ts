import { useEffect } from "react";

const useInfiniteScroll = (callback: () => void, dependencies: any[]) => {
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300;
      if (bottom) callback();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, dependencies);
};

export default useInfiniteScroll;
