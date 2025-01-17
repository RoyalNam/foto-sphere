import { fetchEditorialFeed } from "@/store/actions";
import { selectEditorialFeed } from "@/store/selectors";
import usePaginatedData from "@/hooks/usePaginatedData";
import { Photo } from "@/types";
import { resetEditorialFeed } from "@/store/slices/photoSlice";
import PaginatedPhotoGallery from "@/components/Photo/PaginatedPhotoGallery";

const PhotosPage = () => {
  const {
    data: photos,
    isLoading,
    error,
  } = usePaginatedData<Photo[]>({
    fetchAction: fetchEditorialFeed,
    selector: selectEditorialFeed,
    resetAction: resetEditorialFeed,
  });

  return (
    <PaginatedPhotoGallery photos={photos} loading={isLoading} error={error} />
  );
};

export default PhotosPage;
