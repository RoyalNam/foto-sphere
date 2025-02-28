import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookmarkIcon,
  HeartIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import IconButton from "@/components/ui/IconButton";
import AvatarWithName from "@/components/ui/AvatarWithName";
import { AppDispatch } from "@/store/store";
import { fetchPhotoById, fetchSearchPhotos } from "@/store/actions";
import {
  resetPhotoDetails,
  resetRelatedPhotos,
} from "@/store/slices/photoSlice";
import { selectPhotoDetails, selectRelatedPhotos } from "@/store/selectors";
import PaginatedPhotoGallery from "@/components/Photo/PaginatedPhotoGallery";
import usePaginatedData from "@/hooks/usePaginatedData";
import { Photo } from "@/types";
import { downloadImage, formatNumber, sanitizeFilename } from "@/utils";

const StatItem = ({ label, value }: { label: string; value: any }) => (
  <div className="flex flex-col">
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
}

const PhotoDetailPage: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (photo.id) {
      dispatch(fetchPhotoById({ photoId: photo.id }));
    }
    return () => {
      dispatch(resetPhotoDetails());
    };
  }, [dispatch, photo.id]);

  const { data: photoDetail } = useSelector(selectPhotoDetails);

  const {
    data: relatedPhotos,
    isLoading: relatedPhotosLoading,
    error: relatedPhotosError,
  } = usePaginatedData<Photo[]>({
    fetchAction: fetchSearchPhotos,
    selector: selectRelatedPhotos,
    resetAction: resetRelatedPhotos,
    additionalParams: { query: photo.alt_description },
    perPage: 10,
    scrollContainer: scrollContainerRef,
    dependencies: [photo.id],
  });

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const renderHeader = () => (
    <div className="sticky top-0 flex flex-col justify-center gap-2 px-4 py-2 shadow bg-background-alt md:flex-row">
      <AvatarWithName
        src={photo.user.profile_image.medium}
        alt={photo.user.username}
        name={photo.user.name}
        username={photo.user.username}
        className="hover:underline"
      />
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <IconButton
            title="Save"
            icon={BookmarkIcon}
            onClick={() => {}}
            className="border border-border text-border"
          />
          <IconButton
            title="Like"
            icon={HeartIcon}
            onClick={() => {}}
            className="border border-border text-border"
          />
          <IconButton
            title="Info"
            icon={InformationCircleIcon}
            onClick={openModal}
            className="border border-border text-border"
          />
        </div>
        <button
          className="px-4 py-1 text-white rounded-full bg-btn hover:bg-btn-hover"
          onClick={() =>
            downloadImage(
              photo.urls.full || photo.urls.regular,
              `${sanitizeFilename(photo.alt_description)}.jpg`
            )
          }
        >
          Download
        </button>
      </div>
    </div>
  );

  const renderImage = () => (
    <div className="relative flex justify-center p-4">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg dark:bg-white/10 bg-black/10 animate-pulse"></div>
      )}
      <img
        src={photo.urls.full}
        alt={`Photo ${photo.id}`}
        className={`w-auto max-h-[726px] object-cover transition-all duration-700 ${
          isLoaded
            ? "opacity-100 blur-0 scale-100"
            : "opacity-0 blur-lg scale-105"
        }`}
        onLoad={handleImageLoad}
      />
    </div>
  );

  const renderDetailsModal = () =>
    isOpen &&
    photoDetail && (
      <div className="fixed inset-0 bg-white/50 z-[100] flex items-center justify-center">
        <div className="relative gap-2 w-full max-w-[600px] mx-4 overflow-hidden bg-black rounded-lg z-[150]">
          <div className="p-8 text-white">
            <div className="flex items-center gap-4">
              <img
                src={photo.urls.small}
                alt=""
                className="object-contain w-auto h-24"
              />
              <div>
                <h5 className="text-3xl font-medium">Photo details</h5>
                <p>
                  Published on{" "}
                  {new Date(photo.updated_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex gap-8 mt-8 text-xl">
              <StatItem label="Likes" value={formatNumber(photoDetail.likes)} />
              <StatItem label="Views" value={formatNumber(photoDetail.views)} />
              <StatItem
                label="Downloads"
                value={formatNumber(photoDetail.downloads)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-8 text-black bg-white md:grid-cols-3 rounded-ss-xl">
            <StatItem
              label="Dimensions"
              value={`${photo.width} x ${photo.height}`}
            />
            <StatItem
              label="Camera"
              value={photoDetail.exif.name || "Unknown Camera"}
            />
            <StatItem
              label="Focal"
              value={
                photoDetail.exif.focal_length
                  ? `${photoDetail.exif.focal_length}mm`
                  : "N/A"
              }
            />
            <StatItem
              label="Aperture"
              value={
                photoDetail.exif.aperture
                  ? `f/${photoDetail.exif.aperture}`
                  : "N/A"
              }
            />
            <StatItem label="ISO" value={photoDetail.exif.iso || "N/A"} />
            <StatItem
              label="Shutter Speed"
              value={
                photoDetail.exif.exposure_time
                  ? `${photoDetail.exif.exposure_time}s`
                  : "N/A"
              }
            />
          </div>

          <div>
            <IconButton
              title="Close"
              icon={XMarkIcon}
              onClick={closeModal}
              className="absolute z-50 p-2 rounded-full top-4 right-4"
            />
          </div>
        </div>
        <div
          onClick={closeModal}
          className="absolute inset-0 bg-black bg-opacity-75 z-[110]"
        ></div>
      </div>
    );

  return (
    photo && (
      <>
        <div className="fixed inset-0 z-[99]">
          <div
            ref={scrollContainerRef}
            onClick={onClose}
            className="relative z-50 w-full h-screen overflow-y-auto md:px-8"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-background rounded-lg shadow-lg mt-8 flex justify-center flex-col z-[99] overflow-hidden"
            >
              {renderHeader()}
              {renderImage()}
              <div className="px-4">
                <h5 className="mt-4 mb-2 text-3xl">More like this</h5>
                <PaginatedPhotoGallery
                  photos={relatedPhotos}
                  loading={relatedPhotosLoading}
                  error={relatedPhotosError}
                />
              </div>
            </div>
          </div>
          <IconButton
            title="Close"
            icon={XMarkIcon}
            onClick={onClose}
            className="absolute z-50 p-2 text-white rounded-full shadow-md top-4 right-4 bg-btn"
          />
          <div className="absolute inset-0 z-40 bg-black bg-opacity-75"></div>
        </div>
        {renderDetailsModal()}
      </>
    )
  );
};

export default PhotoDetailPage;
