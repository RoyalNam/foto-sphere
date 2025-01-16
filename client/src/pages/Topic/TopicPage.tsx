import Error from "@/components/Error";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import TopicCard from "@/components/Topic/TopicCard";
import usePaginatedData from "@/hooks/usePaginatedData";
import MainLayout from "@/layouts/MainLayout";
import { fetchTopics } from "@/store/actions/topicActions";
import { selectTopics } from "@/store/selectors";
import { resetTopics } from "@/store/slices/topicSlice";
import { Topic } from "@/types";

const TopicPage = () => {
  const { data, isLoading, error } = usePaginatedData<Topic[]>({
    fetchAction: fetchTopics,
    selector: selectTopics,
    resetAction: resetTopics,
  });

  return (
    <MainLayout>
      <div className="mt-2 mb-4">
        <h2 className="font-bold text-2xl">Topics</h2>
        <p>
          Browse through various topics to explore content that interests you.
          Stay updated and dive deep into discussions across different
          categories.
        </p>
      </div>
      {error && <Error />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((item) => <TopicCard topic={item} />) || "No topics found."}
      </div>
      {isLoading && <LoadingSpinner />}
    </MainLayout>
  );
};

export default TopicPage;
