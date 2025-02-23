import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "@/hooks/useDebounce";
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

  const loadData = () => {
    if (hasMore && !isLoading) {
      dispatch(fetchAction({ page, per_page: perPage, ...additionalParams }));
    }
  };

  useDebounce(loadData, 300, [page, hasMore]);

  useInfiniteScroll(
    () => {
      if (hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMore, isLoading, page],
    scrollContainer
  );

  useEffect(() => {
    return () => {
      dispatch(resetAction());
    };
  }, [dispatch, resetAction]);

  useEffect(() => {
    if (dependencies.length > 0) {
      setPage(1);
      dispatch(resetAction());
      dispatch(
        fetchAction({ page: 1, per_page: perPage, ...additionalParams })
      );
    }
  }, [...dependencies]);

  return { data, isLoading, hasMore, error };
};

export default usePaginatedData;
