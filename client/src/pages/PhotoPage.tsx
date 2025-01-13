import {
  ArrowDownTrayIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { testImage, testImage1, testImage2, testImage3 } from "@/assets";

const PhotoPage = () => {
  const images = [testImage, testImage1, testImage2, testImage3];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const PhotoCard = () => {
    const randomImage = getRandomImage();
    return (
      <div className="p-1">
        <div className="relative group text-white rounded-xl overflow-hidden">
          <img
            src={randomImage}
            alt="test"
            className="w-full transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-1 mr-1 hover:bg-btn-hover rounded"
              title="Save"
            >
              <BookmarkIcon className="size-6" />
            </button>
            <button className="p-1 hover:bg-btn-hover rounded" title="Like">
              <HeartIcon className="size-6" />
            </button>
          </div>
          <button
            className="absolute bottom-2 right-2 z-10 p-1 hover:bg-btn-hover rounded opacity-0 group-hover:opacity-100 transition-opacity"
            title="Download"
          >
            <ArrowDownTrayIcon className="size-6" />
          </button>
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-0 -mx-2">
      {new Array(44).fill(0).map((_, idx) => (
        <PhotoCard key={idx} />
      ))}
    </div>
  );
};

export default PhotoPage;
