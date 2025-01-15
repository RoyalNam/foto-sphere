import MainLayout from "@/layouts/MainLayout";
import { selectCollections } from "@/store/selectors";
import { fetchCollections } from "@/store/actions";
import { Collection } from "@/types";
import CollectionCard, {
  SkeletonCollectionCard,
} from "@/components/CollectionCard";
import { resetCollections } from "@/store/slices/collectionsSlice";
import usePaginatedData from "@/hooks/usePaginatedData";

const Collections = () => {
  const {
    data: collections,
    isLoading,
    hasMore,
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
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {collections.map((collection: Collection) => (
          <CollectionCard collection={collection} key={collection.id} />
        ))}
        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCollectionCard key={index} />
          ))}
      </div>
      {!hasMore && !isLoading && (
        <div className="text-center mt-4 text-gray-500">
          No more collections to load.
        </div>
      )}
    </MainLayout>
  );
};

export default Collections;
