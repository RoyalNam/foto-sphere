import { Photo } from "@/types";
import { EyeSlashIcon } from "@heroicons/react/24/outline";

const PreviewPhotos = ({
  photos,
  isPrivate = false,
}: {
  photos: Photo[];
  isPrivate: boolean;
}) => {
  return (
    <div className="relative">
      <div className="grid grid-rows-2 grid-flow-col gap-1 aspect-[4/3] rounded overflow-hidden">
        {photos.slice(0, 3).map((photo, index) => (
          <div
            key={index}
            className={`${
              index === 0 ? "col-span-5 row-span-2" : "col-span-2 row-span-1"
            }`}
          >
            <img
              src={photo.urls.small}
              className="w-full h-full object-cover"
              alt={photo.description || "Preview"}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {isPrivate && (
        <span className="absolute top-2 left-2 z-10 bg-black/10 rounded-full">
          <EyeSlashIcon className="size-6" />
        </span>
      )}
    </div>
  );
};
export default PreviewPhotos;
