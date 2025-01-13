import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import PhotoPage from "./pages/PhotoPage";
import { getEditorialFeed } from "./services/api";

const App = () => {
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const result = await getEditorialFeed({});
        console.log("result", result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPhotos();
  }, []);
  return (
    <MainLayout>
      <PhotoPage />
    </MainLayout>
  );
};

export default App;
