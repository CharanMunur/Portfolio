import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <MainPage />
    </div>
  );
};

export default App;
