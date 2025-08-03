import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ReviewDetail from "./pages/ReviewDetail";
import Admin from "./pages/Admin";
import ArticleEditor from "./pages/ArticleEditor";
import CategoryManager from "./pages/CategoryManager";
import SearchResults from "./pages/SearchResults";
import Phones from "./pages/Phones";
import Laptops from "./pages/Laptops";
import SmartHome from "./pages/SmartHome";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/article-editor" element={<ArticleEditor />} />
          <Route path="/admin/article-editor/:id" element={<ArticleEditor />} />
            <Route path="/admin/categories" element={<CategoryManager />} />
            <Route path="/phones" element={<Phones />} />
            <Route path="/laptops" element={<Laptops />} />
            <Route path="/smart-home" element={<SmartHome />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
