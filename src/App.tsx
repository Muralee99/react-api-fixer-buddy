
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
import Reports from "./pages/Reports";
import PaymentsOverview from "./pages/PaymentsOverview";
import { AppLayout } from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout title="Dashboard"><Dashboard /></AppLayout>} />
          <Route path="/old-index" element={<AppLayout title="Home"><Index /></AppLayout>} />
          <Route path="/pipeline-designer" element={<AppLayout title="Pipeline Designer"><DataPipelineDesigner /></AppLayout>} />
          <Route path="/pipeline-data" element={<AppLayout title="Pipeline Data"><PipelineDataPage /></AppLayout>} />
          <Route path="/jobs" element={<AppLayout title="Jobs"><JobsPage /></AppLayout>} />
          <Route path="/jobs/:jobId" element={<AppLayout title="Job Relations"><JobRelations /></AppLayout>} />
          <Route path="/job-details/:jobId" element={<AppLayout title="Job Details"><JobDetailsPage /></AppLayout>} />
          <Route path="/transaction-flow" element={<AppLayout title="Transaction Flow"><TransactionFlowPage /></AppLayout>} />
          <Route path="/transaction-flow/detail" element={<AppLayout title="Transaction Details"><TransactionFlowDetailPage /></AppLayout>} />
          <Route path="/reports" element={<AppLayout title="Reports"><Reports /></AppLayout>} />
          <Route path="/payments-overview" element={<AppLayout title="Payments Overview"><PaymentsOverview /></AppLayout>} />
          <Route path="/merchants" element={<AppLayout title="Merchants"><MerchantsList /></AppLayout>} />
          <Route path="/login" element={<AppLayout title="Login" showSidebar={false}><Login /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<AppLayout title="Page Not Found"><NotFound /></AppLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
