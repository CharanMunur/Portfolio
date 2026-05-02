import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <MainPage />
      </div>
    </div>
  );
};

export default App;