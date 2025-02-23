import Gallery from "react-photo-gallery";
import { Photo } from "@/types";
import PhotoCard from "@/components/Photo/PhotoCard";

const columns = (containerWidth: number) => {
  let columns = 2;
  if (containerWidth >= 640) columns = 2; // sm
  if (containerWidth >= 768) columns = 3; // md
  if (containerWidth >= 1024) columns = 4; // lg
  if (containerWidth >= 1280) columns = 5; // xl

  return columns;
};

const PhotoGallery = ({ photos }: { photos: Photo[] }) => {
  const filteredPhotos = photos
    .filter((item) => item.urls?.small && item.width && item.height)
    .map((item) => ({
      src: item.urls.small,
      width: item.width,
      height: item.height,
      fullData: item,
    }));

  if (!filteredPhotos.length) return;
  return (
    <Gallery
      photos={filteredPhotos}
      direction="column"
      columns={columns}
      renderImage={(props: any) => (
        <PhotoCard
          {...props}
          expandPhoto={props.photo.fullData}
          key={props.index}
          id={props.photo.fullData.id}
        />
      )}
    />
  );
};

export default PhotoGallery;
