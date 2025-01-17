import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import usePaginatedData from "@/hooks/usePaginatedData";
import { fetchCollectionById, fetchCollectionPhotos } from "@/store/actions";
import {
  selectCollectionDetails,
  selectCollectionPhotos,
} from "@/store/selectors";
import {
  resetCollectionDetails,
  resetCollectionPhotos,
} from "@/store/slices/collectionsSlice";
import { Photo } from "@/types";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { AppDispatch } from "@/store/store";
import Error from "@/components/Error";
import HeaderSection from "@/components/ui/HeaderSection";
import PaginatedPhotoGallery from "@/components/Photo/PaginatedPhotoGallery";

const CollectionDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(fetchCollectionById({ id }));
    }
    return () => {
      dispatch(resetCollectionDetails());
    };
  }, [dispatch, id]);

  const {
    data: collection,
    isLoading: collectionLoading,
    error: collectionError,
  } = useSelector(selectCollectionDetails);

  const {
    data: photos,
    isLoading: photosLoading,
    error: photosError,
  } = usePaginatedData<Photo[]>({
    fetchAction: fetchCollectionPhotos,
    selector: selectCollectionPhotos,
    resetAction: resetCollectionPhotos,
    additionalParams: { id },
    perPage: 20,
  });

  if (collectionLoading) return <LoadingSpinner />;
  if (collectionError)
    return (
      <Error errorMessage="Error loading collection details. Please try again later." />
    );

  return (
    <>
      {collection ? (
        <HeaderSection
          title={collection.title || "Untitled Collection"}
          description={collection.description}
          user={{
            name: collection.user.name,
            profileImage: collection.user.profile_image.medium,
            username: collection.user.username,
          }}
          totalPhotos={collection.total_photos}
        />
      ) : (
        <p>No collection details found.</p>
      )}

      <PaginatedPhotoGallery
        photos={photos}
        loading={photosLoading}
        error={photosError}
      />
    </>
  );
};

export default CollectionDetailPage;
