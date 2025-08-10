
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DataPipelineDesigner from "./components/DataPipelineDesigner";
import PipelineDataPage from "./pages/PipelineData";
import JobsPage from "./pages/Jobs";
import JobRelations from "./pages/JobRelations";
import TransactionFlowPage from "./pages/TransactionFlowPage";
import TransactionFlowDetailPage from "./pages/TransactionFlowDetailPage";
import Dashboard from "./pages/Dashboard";
import MerchantsList from "./pages/MerchantsList";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/old-index" element={<Index />} />
          <Route path="/pipeline-designer" element={<DataPipelineDesigner />} />
          <Route path="/pipeline-data" element={<PipelineDataPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:jobId" element={<JobRelations />} />
          <Route path="/transaction-flow" element={<TransactionFlowPage />} />
          <Route path="/merchants" element={<MerchantsList />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
