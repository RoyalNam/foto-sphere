import React, { CSSProperties } from "react";
import {
  ArrowDownTrayIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Photo } from "@/types";

interface PhotoCardProps {
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
  photo,
  left,
  top,
  direction = "row",
  expandPhoto,
}) => {
  const containerStyle: CSSProperties = { ...baseContainerStyle };

  if (direction === "column") {
    containerStyle.position = "absolute";
    containerStyle.left = left;
    containerStyle.top = top;
  }

  return (
    <div style={containerStyle}>
      <div className="relative group text-white rounded-xl overflow-hidden">
        <img
          alt={expandPhoto.description}
          className="hover:scale-105 transition-transform duration-300 ease-in-out group-hover:scale-105"
          width={photo.width}
          height={photo.height}
          src={photo.src}
        />
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 mr-1 hover:bg-btn-hover rounded" title="Save">
            <BookmarkIcon className="size-6" />
          </button>
          <button className="p-1 hover:bg-btn-hover rounded" title="Like">
            <HeartIcon className="size-6" />
          </button>
        </div>
        <div className="absolute bottom-2 inset-x-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-between px-2 items-start">
            <div className="flex-1 flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
              <img
                src={expandPhoto.user.profile_image.small}
                alt={expandPhoto.user.id}
                className="rounded-full"
              />
              <h5 className="line-clamp-1 font-semibold text-sm">
                {expandPhoto.user.name}
              </h5>
            </div>
            <button
              className="ml-4 p-1 hover:bg-btn-hover rounded "
              title="Download"
            >
              <ArrowDownTrayIcon className="size-6" />
            </button>
          </div>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  );
};

export default PhotoCard;
