import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditorialFeed } from "@/store/actions";
import { selectEditorialFeed } from "@/store/selectors";
import { resetEditorialFeed } from "@/store/slices/photoSlice";
import { Photo } from "@/types/types";
import { AppDispatch } from "@/store/store";

const TestPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const editorialFeed = useSelector(selectEditorialFeed);

  useEffect(() => {
    dispatch(fetchEditorialFeed({}));

    return () => {
      dispatch(resetEditorialFeed());
    };
  }, [dispatch]);

  if (editorialFeed.isLoading) {
    return <p>Loading photos...</p>;
  }

  if (editorialFeed.error) {
    return <p>Error: {editorialFeed.error}</p>;
  }

  return (
    <div>
      <h1>Editorial Photos</h1>
      <ul>
        {editorialFeed.data.map((photo: Photo) => (
          <li key={photo.id}>
            <img src={photo.urls.full} alt={photo.description} />
            <p>{photo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;
