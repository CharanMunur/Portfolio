import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-background text-foreground md:grid md:grid-cols-[13rem_1fr]">
      <Navbar />
      <MainPage />
    </div>
  );
};

export default App;
