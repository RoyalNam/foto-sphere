import MainLayout from "@/layouts/MainLayout";
import { selectCollections } from "@/store/selectors";
import { fetchCollections } from "@/store/actions";
import { Collection } from "@/types";
import CollectionCard from "@/components/Collection/CollectionCard";
import { resetCollections } from "@/store/slices/collectionsSlice";
import usePaginatedData from "@/hooks/usePaginatedData";
import SkeletonCollectionCard from "@/components/Loading/SkeletonCollectionCard";
import Error from "@/components/Error";

const Collections = () => {
  const {
    data: collections,
    isLoading,
    hasMore,
    error,
  } = usePaginatedData<Collection[]>({
    fetchAction: fetchCollections,
    selector: selectCollections,
    resetAction: resetCollections,
  });

  return (
    <MainLayout>
      <div className="mt-1 mb-2">
        <h2 className="font-bold text-2xl">Collections</h2>
        <p>
          Our collections are more than just items—they're stories waiting to be
          told.
        </p>
      </div>
      {error && <Error errorMessage="Something went wrong!" />}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {collections.map((collection: Collection) => (
          <CollectionCard collection={collection} key={collection.id} />
        ))}
        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCollectionCard key={index} />
          ))}
      </div>
      {!hasMore && (
        <div className="text-center mt-4 text-gray-500">
          No more collections to load.
        </div>
      )}
    </MainLayout>
  );
};

export default Collections;
