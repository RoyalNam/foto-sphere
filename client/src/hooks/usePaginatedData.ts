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
}

const usePaginatedData = <T>({
  fetchAction,
  selector,
  resetAction,
  perPage = 20,
}: UsePaginatedDataProps<T>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, hasMore } = useSelector(selector);
  const [page, setPage] = useState(1);

  const loadData = () => {
    if (hasMore && !isLoading) {
      dispatch(fetchAction({ page, per_page: perPage }));
    }
  };

  useDebounce(loadData, 300, [page, hasMore]);

  useInfiniteScroll(() => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, isLoading, page]);

  useEffect(() => {
    return () => {
      dispatch(resetAction());
    };
  }, [dispatch, resetAction]);

  return { data, isLoading, hasMore };
};

export default usePaginatedData;
