import React from "react";

interface IconButtonProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  className?: string;
  size?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  title,
  onClick,
  icon: Icon,
  className = "",
  size = "size-6",
}) => (
  <button
    className={`p-1 hover:bg-btn-hover rounded ${className}`}
    title={title}
    onClick={onClick}
  >
    <Icon className={size} />
  </button>
);

export default IconButton;
