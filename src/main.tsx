import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-activity-calendar/tooltips.css";
import App from "./App.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Blog from "./pages/Blog.tsx";
import Projects from "./pages/Projects.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import Contact from "./pages/Contact.tsx";
import Navbar from "./components/Navbar.tsx";
import ScrollToTop from "./components/helpers/ScrollToTop.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import SmoothScroll from "./components/helpers/SmoothScroll.tsx";
import Footer from "./components/Footer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={200}>
        <SmoothScroll>
          <BrowserRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/blogs" element={<Blog />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/blogs/:slug" element={<BlogDetail />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </SmoothScroll>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
