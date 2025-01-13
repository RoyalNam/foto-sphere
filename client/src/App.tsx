import MainLayout from "./layouts/MainLayout";
import PhotoPage from "./pages/PhotoPage";
import TestPage from "./pages/TestPage";

const App = () => {
  return (
    <MainLayout>
      <TestPage />
      {/* <PhotoPage /> */}
    </MainLayout>
  );
};

export default App;
