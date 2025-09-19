
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
import JobDetailsPage from "./pages/JobDetailsPage";
import { AppLayout } from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/old-index" element={<AppLayout><Index /></AppLayout>} />
          <Route path="/pipeline-designer" element={<AppLayout><DataPipelineDesigner /></AppLayout>} />
          <Route path="/pipeline-data" element={<AppLayout><PipelineDataPage /></AppLayout>} />
          <Route path="/jobs" element={<AppLayout><JobsPage /></AppLayout>} />
          <Route path="/jobs/:jobId" element={<AppLayout><JobRelations /></AppLayout>} />
          <Route path="/job-details/:jobId" element={<AppLayout><JobDetailsPage /></AppLayout>} />
          <Route path="/transaction-flow" element={<AppLayout><TransactionFlowPage /></AppLayout>} />
          <Route path="/transaction-flow/detail" element={<AppLayout><TransactionFlowDetailPage /></AppLayout>} />
          <Route path="/merchants" element={<AppLayout><MerchantsList /></AppLayout>} />
          <Route path="/login" element={<AppLayout><Login /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
