import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
import LoadingSpinner from "@/components/LoadingSpinner";
import { AppDispatch } from "@/store/store";

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
    error,
  } = useSelector(selectCollectionDetails);

  const { data: photos, isLoading: photosLoading } = usePaginatedData<Photo[]>({
    fetchAction: fetchCollectionPhotos,
    selector: selectCollectionPhotos,
    resetAction: resetCollectionPhotos,
    additionalParams: { id },
    perPage: 20,
  });

  return (
    <MainLayout>
      {collectionLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {collection ? (
            <div className="my-4">
              <h4 className="text-3xl font-medium text-center">
                {collection.title || "Untitled Collection"}
              </h4>
              <div className="flex items-end justify-between">
                {collection.user ? (
                  <Link
                    to={`/@${collection.user.username}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <img
                      src={collection.user.profile_image?.medium || ""}
                      alt={collection.user.name || "User"}
                      className="rounded-full h-12 w-12"
                    />
                    <h4>{collection.user.name || "Unknown User"}</h4>
                  </Link>
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
          {error && (
            <p className="text-red-500 text-center">
              Error loading collection details. Please try again later.
            </p>
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
        </div>
      )}
    </MainLayout>
  );
};

export default CollectionDetail;
