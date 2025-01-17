import React, { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownTrayIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Photo } from "@/types";
import AvatarWithName from "../ui/AvatarWithName";
import IconButton from "../ui/IconButton";

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
    <div style={containerStyle}>
      <div className="relative group text-white rounded-xl overflow-hidden">
        {!isLoaded && <div className="absolute inset-0 bg-btn animate-pulse" />}
        <img
          src={photo.src}
          alt={expandPhoto.description}
          width={photo.width}
          height={photo.height}
          className={`transition-transform duration-300 ease-in-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          } hover:scale-105 group-hover:scale-105`}
          loading="lazy"
          onLoad={handleImageLoad}
        />
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconButton title="Save" icon={BookmarkIcon} onClick={() => {}} />
          <IconButton title="Like" icon={HeartIcon} onClick={() => {}} />
        </div>
        <div className="absolute bottom-2 inset-x-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-between px-2 items-start">
            <div className="opacity-85 hover:opacity-100 transition-opacity">
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
        <Link to={`/photos/${id}`}>
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>
      </div>
    </div>
  );
};

export default PhotoCard;
