import { Link } from "react-router-dom";
import { User } from "@/types";
import AvatarWithName from "../ui/AvatarWithName";

const UserCard = ({ user }: { user: User }) => {
  return (
    <Link
      to={`/@${user.username}`}
      className="p-4 border rounded-md border-btn-disabled hover:border-btn"
    >
      <div className="flex flex-col gap-4">
        <AvatarWithName
          src={user.profile_image.medium}
          name={user.name}
          username={user.username}
          alt={user.username}
          size="size-14"
        />
        {user.photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {user.photos.map((item, index) => (
              <img key={index} src={item.urls.small} className="aspect-[3/2]" />
            ))}
          </div>
        )}
        <button className="border border-btn-disabled rounded-full py-0.5 px-4 transition-all duration-200 hover:border-btn">
          View profile
        </button>
      </div>
    </Link>
  );
};

export default UserCard;
