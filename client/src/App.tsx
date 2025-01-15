import { Route, Routes } from "react-router-dom";
import PhotoPage from "./pages/PhotoPage";
import Collections from "./pages/Collections/Collections";
import CollectionDetail from "./pages/Collections/CollectionDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PhotoPage />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/collections/:id" element={<CollectionDetail />} />
    </Routes>
  );
};

export default App;
