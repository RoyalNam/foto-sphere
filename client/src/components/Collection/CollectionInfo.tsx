import { PhotoIcon } from "@heroicons/react/24/outline";

const CollectionInfo = ({
  title,
  totalPhotos,
}: {
  title: string;
  totalPhotos: number;
}) => {
  return (
    <div className="py-2 font-bold">
      <div className="flex justify-between items-center">
        <h4 className="line-clamp-1">{title}</h4>
        <div className="ml-4 flex gap-0.5 items-center text-sm">
          <PhotoIcon className="w-5 h-5" />
          <span className="pt-0.5">{totalPhotos}</span>
        </div>
      </div>
    </div>
  );
};
export default CollectionInfo;
