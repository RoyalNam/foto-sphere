import React from "react";
import { Collection } from "@/types";
import Error from "../Error";
import CollectionCard from "./CollectionCard";
import SkeletonCollectionCard from "../Loading/SkeletonCollectionCard";

interface CollectionGalleryProps {
  collections: Collection[];
  loading: boolean;
  error?: any;
  hasMore?: boolean;
}

const CollectionGallery: React.FC<CollectionGalleryProps> = ({
  collections = [],
  loading,
  error,
  hasMore,
}) => {
  if (error) {
    return (
      <Error errorMessage="Error loading collections. Please try again later." />
    );
  }

  return (
    <>
      {collections.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collections.map((collection) => (
            <CollectionCard collection={collection} key={collection.id} />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="mt-4 italic text-center text-gray-500">
            No collections found.
          </p>
        )
      )}

      {loading && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCollectionCard key={index} />
          ))}
        </div>
      )}

      {!hasMore && collections.length > 0 && !loading && (
        <div className="mt-4 text-center text-gray-500">
          No more collections to load.
        </div>
      )}
    </>
  );
};

export default CollectionGallery;
