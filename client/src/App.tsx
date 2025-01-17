import { Route, Routes } from "react-router-dom";
import PhotosPage from "./pages/Photo/PhotosPage";
import CollectionsPage from "./pages/Collections/CollectionsPage";
import CollectionDetailPage from "./pages/Collections/CollectionDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import TopicsPage from "./pages/Topic/TopicsPage";
import TopicDetailPage from "./pages/Topic/TopicDetailPage";
import MainLayout from "./layouts/MainLayout";
import PhotoDetailPage from "./pages/Photo/PhotoDetailPage";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<PhotosPage />} />
        <Route path="/photos/:id" element={<PhotoDetailPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:id" element={<CollectionDetailPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topics/:slug" element={<TopicDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
