import { Link } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Collection } from "@/types";
import { EyeSlashIcon } from "@heroicons/react/24/solid";

export const SkeletonCollectionCard = () => (
  <div>
    <div className="grid grid-rows-2 grid-flow-col gap-1 aspect-[4/3] animate-pulse">
      <div className="col-span-5 row-span-2 bg-btn-hover rounded"></div>
      <div className="col-span-2 row-span-1 bg-btn-hover rounded"></div>
      <div className="col-span-2 row-span-1 bg-btn-hover rounded"></div>
    </div>
    <div className="py-2">
      <div className="h-5 bg-btn-hover rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-btn-hover rounded w-1/3"></div>
    </div>
  </div>
);

const CollectionCard = ({ collection }: { collection: Collection }) => {
  return (
    <Link to={`/collections/${collection.id}`} className="group">
      <div className="relative grid grid-rows-2 grid-flow-col gap-1 aspect-[4/3] rounded overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
        {collection.preview_photos.slice(0, 3).map((photo, index) => (
          <div
            key={index}
            className={`${
              index === 0 ? "col-span-5 row-span-2" : "col-span-2 row-span-1"
            }`}
          >
            <img
              src={photo.urls.small}
              className="w-full h-full object-cover"
              alt={photo.description}
            />
          </div>
        ))}
        {collection.user?.accepted_tos && (
          <span className="absolute top-2 left-2 z-10 bg-black/10 rounded-full">
            <EyeSlashIcon className="size-6" />
          </span>
        )}
      </div>
      <div className="py-2 font-bold group-hover:text-foreground text-foreground-muted transition-colors duration-300">
        <div className="flex justify-between items-center">
          <h4 className="line-clamp-1">{collection.title}</h4>
          <div className="ml-4 flex gap-0.5 items-center text-sm">
            <PhotoIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="pt-0.5">{collection.total_photos}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
