import { selectCollections } from "@/store/selectors";
import { fetchCollections } from "@/store/actions";
import { Collection } from "@/types";
import { resetCollections } from "@/store/slices/collectionsSlice";
import usePaginatedData from "@/hooks/usePaginatedData";
import HeaderSection from "@/components/ui/HeaderSection";
import CollectionGallery from "@/components/Collection/CollectionGallery";

const CollectionsPage = () => {
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
    <>
      <HeaderSection
        title="Collections"
        description="Our collections are more than just items—they're stories waiting to be
          told."
      />
      <CollectionGallery
        collections={collections}
        loading={isLoading}
        error={error}
        hasMore={hasMore}
      />
    </>
  );
};

export default CollectionsPage;
