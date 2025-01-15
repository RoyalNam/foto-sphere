import { Link } from "react-router-dom";
import { Collection } from "@/types";
import PreviewPhotos from "./PreviewPhotos";
import CollectionInfo from "./CollectionInfo";

const CollectionCard = ({ collection }: { collection: Collection }) => {
  return (
    <Link to={`/collections/${collection.id}`} className="group">
      <div className="transform transition-transform duration-300 group-hover:scale-105">
        <PreviewPhotos
          photos={collection.preview_photos}
          isPrivate={collection.user.accepted_tos}
        />
      </div>
      <div className="group-hover:text-foreground text-foreground-muted transition-colors duration-300">
        <CollectionInfo
          title={collection.title}
          totalPhotos={collection.total_photos}
        />
      </div>
    </Link>
  );
};

export default CollectionCard;
