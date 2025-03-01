import React from "react";
import { Link } from "react-router-dom";

interface AvatarWithNameProps {
  username: string;
  src: string;
  name: string;
  alt: string;
  size?: string;
  color?: string;
  className?: string;
}

const AvatarWithName: React.FC<AvatarWithNameProps> = ({
  username,
  src,
  name,
  alt,
  size = "w-10 h-10",
  className = "",
}) => {
  return (
    <div className="inline-flex flex-1">
      <Link
        to={`/@${username}`}
        className={`flex items-center gap-1.5 ${className}`}
      >
        <img src={src} alt={alt} className={`rounded-full ${size}`} />
        <div>
          <h5 className="text-lg font-semibold line-clamp-1">{name}</h5>
          <h4 className="-mt-2 italic font-thin line-clamp-1">@{username}</h4>
        </div>
      </Link>
    </div>
  );
};

export default AvatarWithName;
