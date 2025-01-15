import { fetchEditorialFeed } from "@/store/actions";
import { selectEditorialFeed } from "@/store/selectors";
import PhotoGallery from "@/components/Photo/PhotoGallery";
import MainLayout from "@/layouts/MainLayout";
import usePaginatedData from "@/hooks/usePaginatedData";
import { Photo } from "@/types";
import { resetEditorialFeed } from "@/store/slices/photoSlice";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import Error from "@/components/Error";

const PhotoPage = () => {
  const {
    data: photos,
    isLoading,
    hasMore,
    error,
  } = usePaginatedData<Photo[]>({
    fetchAction: fetchEditorialFeed,
    selector: selectEditorialFeed,
    resetAction: resetEditorialFeed,
  });

  return (
    <MainLayout>
      {error && (
        <Error errorMessage="Failed to load photos, please try again later!" />
      )}
      <PhotoGallery photos={photos} />
      {isLoading && <LoadingSpinner />}
      {hasMore && <div>No photos available.</div>}
    </MainLayout>
  );
};

export default PhotoPage;
