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
          <p className="text-center text-foreground-muted italic mt-4">
            The collection is private.
          </p>
        )
      )}
      {loading && <LoadingSpinner />}
    </>
  );
};

export default PaginatedPhotoGallery;
