import { AppDispatch } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectUserCollections,
  selectUserInfo,
  selectUserLikes,
  selectUserPhotos,
} from "@/store/selectors/userSelectors";
import {
  fetchUserCollections,
  fetchUserInfo,
  fetchUserLikes,
  fetchUserPhotos,
} from "@/store/actions/userAction";
import TabButton from "@/components/ui/TabButton";
import { Collection, Photo } from "@/types";
import {
  resetUserCollections,
  resetUserLikes,
  resetUserPhotos,
} from "@/store/slices/userSlice";
import usePaginatedData from "@/hooks/usePaginatedData";
import PaginatedPhotoGallery from "@/components/Photo/PaginatedPhotoGallery";
import CollectionGallery from "@/components/Collection/CollectionGallery";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import Error from "@/components/Error";
import UserProfileHeader from "@/components/User/UserProfileHeader";

const UserDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState<
    "photos" | "likes" | "collections"
  >("photos");

  const handleTabClick = useCallback(
    (tab: "photos" | "collections" | "likes") => {
      setActiveTab(tab);
    },
    []
  );

  useEffect(() => {
    setActiveTab("photos");
  }, [username]);

  useEffect(() => {
    if (username && !userLoading) {
      dispatch(fetchUserInfo({ username }));
    }
  }, [dispatch, username]);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useSelector(selectUserInfo);

  const {
    data: photos,
    isLoading: photosLoading,
    error: photosError,
    hasMore: photosHasMore,
  } = usePaginatedData<Photo[]>({
    fetchAction: fetchUserPhotos,
    selector: selectUserPhotos,
    resetAction: resetUserPhotos,
    additionalParams: { username },
    perPage: 20,
    dependencies: [username],
  });

  const {
    data: collections,
    isLoading: collectionsLoading,
    error: collectionsError,
    hasMore: collectionsHasMore,
  } = usePaginatedData<Collection[]>({
    fetchAction: fetchUserCollections,
    selector: selectUserCollections,
    resetAction: resetUserCollections,
    additionalParams: { username },
    perPage: 10,
    dependencies: [username],
  });

  const {
    data: likes,
    isLoading: likesLoading,
    error: likesError,
    hasMore: likesHasMore,
  } = usePaginatedData<Photo[]>({
    fetchAction: fetchUserLikes,
    selector: selectUserLikes,
    resetAction: resetUserLikes,
    additionalParams: { username },
    perPage: 10,
    dependencies: [username],
  });

  if (userError)
    return (
      <Error errorMessage="Error loading user information. Please try again later." />
    );

  return userLoading ? (
    <LoadingSpinner />
  ) : (
    user && (
      <>
        <UserProfileHeader
          profileImage={user.profile_image.large}
          username={user.username}
          name={user.name}
          tags={user.tags.custom}
        />
        <div>
          <div className="flex space-x-4 border-b">
            <TabButton
              isActive={activeTab === "photos"}
              onClick={() => handleTabClick("photos")}
              label="Photos"
              count={user.total_photos}
            />
            <TabButton
              isActive={activeTab === "likes"}
              onClick={() => handleTabClick("likes")}
              label="Likes"
              count={user.total_likes}
            />
            <TabButton
              isActive={activeTab === "collections"}
              onClick={() => handleTabClick("collections")}
              label="Collections"
              count={user.total_collections}
            />
          </div>
          <div className="mt-4">
            {activeTab === "photos" && (
              <PaginatedPhotoGallery
                photos={photos}
                loading={photosLoading}
                error={photosError}
                hasMore={photosHasMore}
              />
            )}

            {activeTab === "collections" && (
              <CollectionGallery
                collections={collections}
                loading={collectionsLoading}
                error={collectionsError}
                hasMore={collectionsHasMore}
              />
            )}

            {activeTab === "likes" && (
              <PaginatedPhotoGallery
                photos={likes}
                loading={likesLoading}
                error={likesError}
                hasMore={likesHasMore}
              />
            )}
          </div>
        </div>
      </>
    )
  );
};

export default UserDetailPage;
