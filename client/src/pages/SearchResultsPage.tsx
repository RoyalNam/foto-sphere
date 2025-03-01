import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  selectSearchPhotos,
  selectSearchCollections,
  selectSearchUsers,
} from "@/store/selectors";
import {
  resetSearchCollections,
  resetSearchPhotos,
  resetSearchUsers,
} from "@/store/slices/searchSlice";
import {
  fetchSearchCollections,
  fetchSearchPhotos,
  fetchSearchUsers,
} from "@/store/actions";
import { useSearchBar } from "@/hooks/useSearch";
import usePaginatedData from "@/hooks/usePaginatedData";
import { Collection, Photo, User } from "@/types";
import PaginatedPhotoGallery from "@/components/Photo/PaginatedPhotoGallery";
import CollectionCard from "@/components/Collection/CollectionCard";
import SkeletonCollectionCard from "@/components/Loading/SkeletonCollectionCard";
import { formatNumber } from "@/utils";
import AvatarWithName from "@/components/ui/AvatarWithName";
import { Link } from "react-router-dom";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  count: number;
}

const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  label,
  count,
}) => (
  <button
    className={`relative px-4 py-2 flex items-center space-x-1 ${
      isActive ? "border-b-2 border-blue-500" : ""
    }`}
    onClick={onClick}
  >
    <span>{label}</span>
    <span className="">{formatNumber(count)}</span>
  </button>
);

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [activeTab, setActiveTab] = useState<
    "photos" | "collections" | "users"
  >("photos");

  const { handleSearch, searchResults } = useSearchBar();

  useEffect(() => {
    if (query) {
      setActiveTab("photos");
      handleSearch(query);
    }
  }, [query, handleSearch]);

  const {
    data: photos,
    isLoading: photosLoading,
    error: photosError,
  } = usePaginatedData<Photo[]>({
    fetchAction: fetchSearchPhotos,
    selector: selectSearchPhotos,
    resetAction: resetSearchPhotos,
    additionalParams: { query },
    perPage: 20,
    dependencies: [query],
  });

  const {
    data: collections,
    isLoading: collectionsLoading,
    error: collectionsError,
  } = usePaginatedData<Collection[]>({
    fetchAction: fetchSearchCollections,
    selector: selectSearchCollections,
    resetAction: resetSearchCollections,
    additionalParams: { query },
    perPage: 10,
    dependencies: [query],
  });

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = usePaginatedData<User[]>({
    fetchAction: fetchSearchUsers,
    selector: selectSearchUsers,
    resetAction: resetSearchUsers,
    additionalParams: { query },
    perPage: 20,
    dependencies: [query],
  });

  const handleTabClick = useCallback(
    (tab: "photos" | "collections" | "users") => {
      setActiveTab(tab);
    },
    []
  );

  return (
    <div>
      <div className="flex space-x-4 border-b">
        <TabButton
          isActive={activeTab === "photos"}
          onClick={() => handleTabClick("photos")}
          label="Photos"
          count={searchResults.photos}
        />
        <TabButton
          isActive={activeTab === "collections"}
          onClick={() => handleTabClick("collections")}
          label="Collections"
          count={searchResults.collections}
        />
        <TabButton
          isActive={activeTab === "users"}
          onClick={() => handleTabClick("users")}
          label="Users"
          count={searchResults.users}
        />
      </div>
      <div className="mt-4">
        {activeTab === "photos" && (
          <PaginatedPhotoGallery
            photos={photos}
            loading={photosLoading}
            error={photosError}
          />
        )}

        {activeTab === "collections" && (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {collections.map((collection) => (
              <CollectionCard collection={collection} key={collection.id} />
            ))}
            {collectionsLoading &&
              Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCollectionCard key={index} />
              ))}
            {collectionsError && <p>Error: {collectionsError}</p>}
          </div>
        )}

        {activeTab === "users" && (
          <div>
            {usersLoading && <p>Loading...</p>}
            {usersError && <p>Error: {usersError}</p>}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <Link
                  to={`/@${user.username}`}
                  key={user.id}
                  className="p-4 border rounded-md border-btn-disabled hover:border-btn"
                >
                  <div className="flex flex-col gap-4">
                    <AvatarWithName
                      src={user.profile_image.medium}
                      name={user.name}
                      username={user.username}
                      alt={user.username}
                      size="size-14"
                    />
                    {user.photos.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {user.photos.map((item, index) => (
                          <img
                            key={index}
                            src={item.urls.small}
                            className="aspect-[3/2]"
                          />
                        ))}
                      </div>
                    )}
                    <button
                      className="border border-btn-disabled rounded-full py-0.5 px-4 
                         transition-all duration-200 hover:border-btn"
                    >
                      View profile
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
