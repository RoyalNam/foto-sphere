import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditorialFeed } from "@/store/actions";
import { selectEditorialFeed } from "@/store/selectors";
import useDebounce from "@/hooks/useDebounce";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import PhotoGallery from "@/components/Photo/PhotoGallery";
import { AppDispatch } from "@/store/store";
import MainLayout from "@/layouts/MainLayout";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

const PhotoPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const editorialFeed = useSelector(selectEditorialFeed);

  const [page, setPage] = useState(1);

  const loadPhotos = () => {
    if (!editorialFeed.isLoading && editorialFeed.hasMore) {
      dispatch(fetchEditorialFeed({ page, per_page: 20 }));
    }
  };

  useDebounce(loadPhotos, 300, [page, editorialFeed.hasMore]);

  useInfiniteScroll(() => {
    if (editorialFeed.hasMore && !editorialFeed.isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [editorialFeed.hasMore, editorialFeed.isLoading, page]);

  return (
    <MainLayout>
      <PhotoGallery photos={editorialFeed.data} />
      {editorialFeed.isLoading && <LoadingSpinner />}
      {!editorialFeed.hasMore && <div>No photos available.</div>}
    </MainLayout>
  );
};

export default PhotoPage;
