import { PhotoIcon } from "@heroicons/react/24/outline";
import AvatarWithName from "./AvatarWithName";

interface HeaderProps {
  title: string;
  description?: string;
  user?: {
    name: string;
    username: string;
    profileImage: string;
  };
  totalPhotos?: number;
}

export const HeaderSection: React.FC<HeaderProps> = ({
  title,
  description,
  user,
  totalPhotos,
}) => (
  <div className={`my-4 ${user && "text-center"}`}>
    <h4 className="text-3xl font-medium">{title}</h4>
    {description && <p className="text-foreground-muted">{description}</p>}

    {user && (
      <div className="flex items-end justify-between mt-4">
        <AvatarWithName
          name={user.name}
          alt={user.username}
          src={user.profileImage}
          username={user.username}
          className={"hover:underline"}
        />
        <div className="mx-2 flex gap-0.5 items-center">
          <PhotoIcon className="h-5 w-5" />
          <span className="pt-0.5">{totalPhotos || 0}</span>
        </div>
      </div>
    )}
  </div>
);

export default HeaderSection;
