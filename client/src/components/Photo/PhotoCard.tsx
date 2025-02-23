import React, { CSSProperties, useState } from "react";
import {
  ArrowDownTrayIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Photo } from "@/types";
import AvatarWithName from "../ui/AvatarWithName";
import IconButton from "../ui/IconButton";
import { useScrollLock } from "@/context/ScrollLockContext";
import { useModal } from "@/context/ModalContext";

interface PhotoCardProps {
  id: string;
  left: number | string;
  top: number | string;
  photo: any;
  expandPhoto: Photo;
  direction: "row" | "column";
}

const baseContainerStyle: CSSProperties = {
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
};

const PhotoCard: React.FC<PhotoCardProps> = ({
  id,
  photo,
  left,
  top,
  direction = "row",
  expandPhoto,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { lockScroll } = useScrollLock();
  const { openModal } = useModal();

  const containerStyle: CSSProperties = { ...baseContainerStyle };

  if (direction === "column") {
    containerStyle.position = "absolute";
    containerStyle.left = left;
    containerStyle.top = top;
  }

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      style={{
        ...containerStyle,
        width: `${photo.width}px`,
        height: `${photo.height}px`,
      }}
      className="p-1"
    >
      <div className="relative overflow-hidden text-white  group rounded-xl">
        {!isLoaded && <div className="absolute inset-0 bg-btn animate-pulse" />}
        <img
          src={photo.src}
          alt={expandPhoto.description}
          className={`transition-transform duration-300 ease-in-out w-full h-full object-cover ${
            isLoaded ? "opacity-100" : "opacity-0"
          } hover:scale-105 group-hover:scale-105`}
          loading="lazy"
          onLoad={handleImageLoad}
        />
        <div className="absolute z-10 transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100">
          <IconButton title="Save" icon={BookmarkIcon} onClick={() => {}} />
          <IconButton title="Like" icon={HeartIcon} onClick={() => {}} />
        </div>
        <div className="absolute inset-x-0 z-10 transition-opacity opacity-0 bottom-2 group-hover:opacity-100">
          <div className="flex items-start justify-between px-2">
            <div className="transition-opacity opacity-85 hover:opacity-100">
              <AvatarWithName
                username={expandPhoto.user.username}
                src={expandPhoto.user.profile_image.small}
                alt={expandPhoto.user.id}
                name={expandPhoto.user.name}
                size="size-8"
                className="text-sm"
              />
            </div>
            <IconButton
              title="Download"
              icon={ArrowDownTrayIcon}
              onClick={() => {}}
            />
          </div>
        </div>
        <div
          onClick={() => {
            openModal(expandPhoto);
            lockScroll();
          }}
          className="absolute inset-0 transition-opacity bg-black bg-opacity-50 opacity-0 cursor-pointer group-hover:opacity-100"
        ></div>
      </div>
    </div>
  );
};

export default PhotoCard;
