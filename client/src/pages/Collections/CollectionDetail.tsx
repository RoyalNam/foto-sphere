import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/outline";
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
import MainLayout from "@/layouts/MainLayout";
import PhotoGallery from "@/components/Photo/PhotoGallery";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { AppDispatch } from "@/store/store";
import Error from "@/components/Error";
import AvatarWithName from "@/components/ui/AvatarWithName";

const CollectionDetail = () => {
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

  return (
    <MainLayout>
      {collectionError && (
        <Error errorMessage="Error loading collection details. Please try again later." />
      )}
      {photosError && (
        <Error errorMessage="Error loading photos. Please try again later." />
      )}
      {collection ? (
        <div className="my-4">
          <h4 className="text-3xl font-medium text-center">
            {collection.title || "Untitled Collection"}
          </h4>
          <div className="flex items-end justify-between">
            {collection.user ? (
              <AvatarWithName
                name={collection.user.name}
                alt={collection.user.username}
                src={collection.user.profile_image.medium}
                username={collection.user.username}
                className={"hover:underline"}
              />
            ) : (
              <p>User details unavailable</p>
            )}
            <div className="mx-2 flex gap-0.5 items-center">
              <PhotoIcon className="h-5 w-5" />
              <span className="pt-0.5">{collection.total_photos || 0}</span>
            </div>
          </div>
        </div>
      ) : (
        <p>No collection details found.</p>
      )}
      {photos.length > 0 ? (
        <PhotoGallery photos={photos} />
      ) : (
        !photosLoading && (
          <p className="text-center text-foreground-muted italic mt-4">
            The collection is private.
          </p>
        )
      )}
      {photosLoading && <LoadingSpinner />}
    </MainLayout>
  );
};

export default CollectionDetail;
