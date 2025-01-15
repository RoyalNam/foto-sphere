import React from "react";
import { fetchEditorialFeed } from "@/store/actions";
import { selectEditorialFeed } from "@/store/selectors";
import PhotoGallery from "@/components/Photo/PhotoGallery";
import MainLayout from "@/layouts/MainLayout";
import usePaginatedData from "@/hooks/usePaginatedData";
import { Photo } from "@/types";
import { resetEditorialFeed } from "@/store/slices/photoSlice";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

const PhotoPage = () => {
  const {
    data: photos,
    isLoading,
    hasMore,
  } = usePaginatedData<Photo[]>({
    fetchAction: fetchEditorialFeed,
    selector: selectEditorialFeed,
    resetAction: resetEditorialFeed,
  });

  return (
    <MainLayout>
      <PhotoGallery photos={photos} />
      {isLoading && <LoadingSpinner />}
      {hasMore && <div>No photos available.</div>}
    </MainLayout>
  );
};

export default PhotoPage;
