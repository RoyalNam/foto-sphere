import { Photo } from "@/types";
import Error from "../Error";
import LoadingSpinner from "../Loading/LoadingSpinner";
import PhotoGallery from "./PhotoGallery";

interface PaginatedPhotoGalleryProps {
  photos: Photo[];
  loading: boolean;
  error?: any;
}

const PaginatedPhotoGallery: React.FC<PaginatedPhotoGalleryProps> = ({
  photos,
  loading,
  error,
}) => {
  if (error) {
    return (
      <Error errorMessage="Error loading photos. Please try again later." />
    );
  }

  return (
    <>
      {photos.length > 0 ? (
        <PhotoGallery photos={photos} />
      ) : (
        !loading && (
          <p className="mt-4 italic text-center text-foreground-muted">
            No photos found.
          </p>
        )
      )}
      {loading && <LoadingSpinner />}
    </>
  );
};

export default PaginatedPhotoGallery;
