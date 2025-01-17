import Error from "@/components/Error";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import TopicCard from "@/components/Topic/TopicCard";
import HeaderSection from "@/components/ui/HeaderSection";
import usePaginatedData from "@/hooks/usePaginatedData";
import { fetchTopics } from "@/store/actions/topicActions";
import { selectTopics } from "@/store/selectors";
import { resetTopics } from "@/store/slices/topicSlice";
import { Topic } from "@/types";

const TopicsPage = () => {
  const {
    data: topics,
    isLoading,
    error,
  } = usePaginatedData<Topic[]>({
    fetchAction: fetchTopics,
    selector: selectTopics,
    resetAction: resetTopics,
  });

  return (
    <>
      <HeaderSection
        title="Topics"
        description="Browse through various topics to explore content that interests you.
          Stay updated and dive deep into discussions across different
          categories."
      />

      {error && <Error />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {topics?.map((topic) => <TopicCard key={topic.id} topic={topic} />) ||
          "No topics found."}
      </div>
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default TopicsPage;
