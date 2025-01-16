import { Link } from "react-router-dom";
import { Topic } from "@/types";
import PreviewPhotos from "../ui/PreviewPhotos";

const TopicCard = ({ topic }: { topic: Topic }) => {
  return (
    <Link to={`/topics/${topic.slug}`} className="group">
      <div className="p-4 bg-background-alt hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-colors duration-300 ease-in-out">
        <h4 className="text-xl text-center font-bold py-2">{topic.title}</h4>
        <PreviewPhotos photos={topic.preview_photos} isPrivate={false} />
      </div>
    </Link>
  );
};

export default TopicCard;
