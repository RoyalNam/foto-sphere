import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  HeartIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import IconButton from "@/components/ui/IconButton";
import AvatarWithName from "@/components/ui/AvatarWithName";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchPhotoById } from "@/store/actions";
import { resetPhotoDetails } from "@/store/slices/photoSlice";
import { useSelector } from "react-redux";
import { selectPhotoDetails } from "@/store/selectors";
import { searchPhotos } from "@/services/api";
import PaginatedPhotoGallery from "@/components/Photo/PaginatedPhotoGallery";

interface PhotoModalProps {
  photoId: string;
  onClose: () => void;
}

const PhotoDetailPage: React.FC<PhotoModalProps> = ({ photoId, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (photoId) {
      dispatch(fetchPhotoById({ photoId }));
    }
    return () => {
      dispatch(resetPhotoDetails());
    };
  }, [dispatch, photoId]);

  const {
    data: photo,
    isLoading: photoLoading,
    error: photoError,
  } = useSelector(selectPhotoDetails);

  const [relatedPhotos, setRelatedPhotos] = useState([]);

  useEffect(() => {
    if (!photo?.alt_description) return;

    const fetchRelatedPhotos = async () => {
      try {
        const data = await searchPhotos({ query: photo.alt_description });
        setRelatedPhotos(data.results);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching related photos:", error);
      }
    };

    fetchRelatedPhotos();
  }, [photo]);

  const StatItem = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col">
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
  console.log("photo", photo);

  return (
    photo && (
      <div className="fixed inset-0 z-50">
        <div
          onClick={onClose}
          className="w-full md:px-8 max-h-screen overflow-y-auto relative z-50"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-background rounded-lg shadow-lg mt-8 flex justify-center flex-col z-[99] overflow-hidden"
          >
            <div className="sticky top-0 px-4 py-2 bg-background-alt flex flex-col md:flex-row gap-2 justify-center shadow">
              <AvatarWithName
                src={photo.user.profile_image.medium}
                alt={photo.user.username}
                name={photo.user.name}
                username={photo.user.username}
                className="hover:underline"
              />
              <div className="flex gap-4 items-center justify-between">
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
                </div>
                <button className="bg-btn hover:bg-btn-hover text-white px-4 py-1 rounded-full">
                  Download
                </button>
              </div>
            </div>
            <div className="flex justify-center p-4">
              <img
                src={photo.urls.full}
                alt={`Photo ${photo.id}`}
                className="w-auto max-h-[726px] object-cover"
              />
            </div>
            <div className="flex justify-between items-center mx-4 gap-2">
              <div className="flex gap-4">
                <StatItem label="Likes" value={photo.likes} />
                <StatItem label="Views" value={photo.views} />
                <StatItem label="Downloads" value={photo.downloads} />
              </div>
              <div>
                <button className="border px-2 py-1 rounded-xl flex items-center text-sm">
                  <InformationCircleIcon className="size-6" />
                  <span className="">More info</span>
                </button>
              </div>
            </div>
            <div className="px-4">
              <h5 className="text-3xl mt-4 mb-2">More like this</h5>
              <PaginatedPhotoGallery
                photos={relatedPhotos}
                loading={false}
                error={null}
              />
            </div>
          </div>
        </div>
        <IconButton
          title="Close"
          icon={XMarkIcon}
          onClick={onClose}
          className="absolute top-4 right-4 bg-btn p-2 rounded-full z-50 text-white shadow-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-75 z-40"></div>
      </div>
    )
  );
};

export default PhotoDetailPage;
