import { useEffect } from "react";
import { useParams } from "react-router-dom";
import usePaginatedData from "@/hooks/usePaginatedData";
import { selectTopicDetails, selectTopicPhotos } from "@/store/selectors";
import { Photo } from "@/types";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import Error from "@/components/Error";
import {
  fetchTopicByIdOrSlug,
  fetchTopicPhotos,
} from "@/store/actions/topicActions";
import { resetTopicDetails, resetTopicPhotos } from "@/store/slices/topicSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import HeaderSection from "@/components/ui/HeaderSection";
import PaginatedPhotoGallery from "@/components/Photo/PaginatedPhotoGallery";

const TopicDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (slug) {
      dispatch(fetchTopicByIdOrSlug(slug));
    }
    return () => {
      dispatch(resetTopicDetails());
    };
  }, [dispatch, slug]);

  const {
    data: topic,
    isLoading: topicLoading,
    error: topicError,
  } = useSelector(selectTopicDetails);

  const {
    data: photos,
    isLoading: photosLoading,
    error: photosError,
  } = usePaginatedData<Photo[]>({
    fetchAction: fetchTopicPhotos,
    selector: selectTopicPhotos,
    resetAction: resetTopicPhotos,
    additionalParams: { id_or_slug: slug },
    perPage: 20,
  });

  if (topicLoading) return <LoadingSpinner />;
  if (topicError)
    return (
      <Error errorMessage="Error loading topic details. Please try again later." />
    );

  return (
    <>
      {topic ? (
        <HeaderSection
          title={topic.title || "Untitled Topic"}
          description={topic.description}
        />
      ) : (
        <p>No topic details found.</p>
      )}

      <PaginatedPhotoGallery
        photos={photos}
        loading={photosLoading}
        error={photosError}
      />
    </>
  );
};

export default TopicDetailPage;
