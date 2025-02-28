import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { AppDispatch } from "@/store/store";
import { AsyncState } from "@/types/stateTypes";

interface UsePaginatedDataProps<T> {
  fetchAction: any;
  selector: (state: any) => AsyncState<T>;
  resetAction: () => any;
  perPage?: number;
  additionalParams?: Record<string, any>;
  scrollContainer?: React.RefObject<HTMLElement>;
  dependencies?: any[];
}

const usePaginatedData = <T>({
  fetchAction,
  selector,
  resetAction,
  perPage = 20,
  additionalParams = {},
  scrollContainer,
  dependencies = [],
}: UsePaginatedDataProps<T>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, hasMore, error } = useSelector(selector);
  const [page, setPage] = useState(1);
  const isFetching = useRef(false);
  const loadedIds = useRef(new Set<string>());

  useEffect(() => {
    if (!hasMore || isLoading || isFetching.current) return;

    isFetching.current = true;
    dispatch(
      fetchAction({ page, per_page: perPage, ...additionalParams })
    ).finally(() => {
      isFetching.current = false;
    });
  }, [page]);

  useInfiniteScroll(
    () => {
      if (!hasMore || isLoading || isFetching.current) return;
      setPage((prevPage) => prevPage + 1);
    },
    [hasMore, isLoading],
    scrollContainer
  );

  useEffect(() => {
    return () => {
      dispatch(resetAction());
      loadedIds.current.clear();
    };
  }, [dispatch, resetAction]);

  useEffect(() => {
    if (dependencies.length > 0) {
      setPage(1);
      dispatch(resetAction());
      loadedIds.current.clear();
      setTimeout(() => {
        dispatch(
          fetchAction({ page: 1, per_page: perPage, ...additionalParams })
        );
      }, 200);
    }
  }, dependencies);

  return { data, isLoading, hasMore, error };
};

export default usePaginatedData;
