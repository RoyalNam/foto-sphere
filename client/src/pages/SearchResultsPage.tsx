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
import { formatNumber } from "@/utils";
import CollectionGallery from "@/components/Collection/CollectionGallery";
import UserGallery from "@/components/User/UserGallery";

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
    hasMore: photosHasMore,
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
    hasMore: collectionsHasMore,
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
    hasMore: usersHasMore,
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

        {activeTab === "users" && (
          <UserGallery
            users={users}
            loading={usersLoading}
            error={usersError}
            hasMore={usersHasMore}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
