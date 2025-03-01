import { Link } from "react-router-dom";

interface UserProfileHeaderProps {
  profileImage: string;
  username: string;
  name: string;
  tags: { title: string }[];
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  profileImage,
  username,
  name,
  tags,
}) => {
  return (
    <div className="flex justify-center gap-6 my-8">
      <img src={profileImage} alt={username} className="rounded-full size-40" />
      <div className="space-y-3">
        <h5 className="text-3xl">{name}</h5>
        <h4 className="italic">@{username}</h4>
        {tags.length > 0 && (
          <div className="space-y-3">
            <h6>Interest</h6>
            <div className="flex gap-0.5 flex-wrap">
              {tags.map((item, idx) => (
                <Link
                  key={idx}
                  to={`/search/${item.title}`}
                  className="px-3 py-0.5 rounded-full bg-background-alt"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileHeader;
