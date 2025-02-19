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
    <div className="flex-1 inline-flex">
      <Link
        to={`/@${username}`}
        className={`flex items-center gap-1.5 ${className}`}
      >
        <img src={src} alt={alt} className={`rounded-full ${size}`} />
        <h5 className="line-clamp-1 font-semibold">{name}</h5>
      </Link>
    </div>
  );
};

export default AvatarWithName;
