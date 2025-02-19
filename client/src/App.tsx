import { Route, Routes } from "react-router-dom";
import PhotosPage from "./pages/Photo/PhotosPage";
import CollectionsPage from "./pages/Collections/CollectionsPage";
import CollectionDetailPage from "./pages/Collections/CollectionDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import TopicsPage from "./pages/Topic/TopicsPage";
import TopicDetailPage from "./pages/Topic/TopicDetailPage";
import MainLayout from "./layouts/MainLayout";
import { ScrollLockProvider } from "./context/ScrollLockContext";

const App = () => {
  return (
    <ScrollLockProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PhotosPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:id" element={<CollectionDetailPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:slug" element={<TopicDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ScrollLockProvider>
  );
};

export default App;
