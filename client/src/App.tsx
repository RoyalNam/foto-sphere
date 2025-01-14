import { Route, Routes } from "react-router-dom";
import PhotoPage from "./pages/PhotoPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PhotoPage />} />
    </Routes>
  );
};

export default App;
