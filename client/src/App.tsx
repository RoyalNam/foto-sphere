import { Route, Routes } from "react-router-dom";
import PhotosPage from "./pages/Photo/PhotosPage";
import CollectionsPage from "./pages/Collections/CollectionsPage";
import CollectionDetailPage from "./pages/Collections/CollectionDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import TopicsPage from "./pages/Topic/TopicsPage";
import TopicDetailPage from "./pages/Topic/TopicDetailPage";
import MainLayout from "./layouts/MainLayout";
import { ScrollLockProvider } from "./context/ScrollLockContext";
import { ModalProvider } from "./context/ModalContext";
import GlobalModal from "./pages/GlobalModal";
import SearchResultsPage from "./pages/SearchResultsPage";

const App = () => {
  return (
    <ScrollLockProvider>
      <ModalProvider>
        <GlobalModal />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<PhotosPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:id" element={<CollectionDetailPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topics/:slug" element={<TopicDetailPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ModalProvider>
    </ScrollLockProvider>
  );
};

export default App;
