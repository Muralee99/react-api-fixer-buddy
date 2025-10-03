
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { DashboardForm } from '@/components/dashboard/DashboardForm';
import { PaymentAnalytics } from '@/components/dashboard/PaymentAnalytics';
import { PaymentDetailsTable } from '@/components/dashboard/PaymentDetailsTable';
import { PaymentFilterSidebar } from '@/components/dashboard/PaymentFilterSidebar';
import { useDashboardData } from '@/hooks/useDashboardData';
import { TrendingUp, Home, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import MerchantInfoTable from '@/components/dashboard/MerchantInfoTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface DashboardFilters {
  countries: string[];
  paymentMethods: string[];
  currencies: string[];
  transactionStatuses: string[];
}

export interface DashboardFormData {
  fromDate: string;
  toDate: string;
  merchantId: string;
}

interface PaymentFilters {
  category: string;
  subcategory: string;
  viewType: 'charts' | 'table' | 'both';
  statuses: string[];
  dateRange: string;
}

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<DashboardFilters>({
    countries: [],
    paymentMethods: [],
    currencies: [],
    transactionStatuses: []
  });
  
  const [formData, setFormData] = useState<DashboardFormData>({
    fromDate: '',
    toDate: '',
    merchantId: ''
  });
  
  const [paymentFilters, setPaymentFilters] = useState<PaymentFilters>({
    category: 'Payments',
    subcategory: '',
    viewType: 'both',
    statuses: [],
    dateRange: '30days'
  });
  
  const [showCharts, setShowCharts] = useState(false);
  const [isOverviewSidebarCollapsed, setIsOverviewSidebarCollapsed] = useState(false);
  const [isPaymentSidebarCollapsed, setIsPaymentSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  
  // Check if we're coming from merchant analytics
  const merchantId = searchParams.get('merchant');
  
  const { dashboardData, isLoading, availableFilters } = useDashboardData(filters, showCharts, formData);

  // Auto-populate form when coming from merchant page
  useEffect(() => {
    if (merchantId) {
      const newFormData = {
        fromDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        toDate: new Date().toISOString().split('T')[0],
        merchantId: merchantId
      };
      setFormData(newFormData);
      setShowCharts(true);
    }
  }, [merchantId]);

  const handleFormSubmit = (newFormData: DashboardFormData) => {
    setFormData(newFormData);
    setShowCharts(true);
  };

  const handleFilterSubmit = (newFilters: DashboardFilters) => {
    setFilters(newFilters);
  };

  const handlePaymentFiltersChange = (newPaymentFilters: PaymentFilters) => {
    setPaymentFilters(newPaymentFilters);
  };

  const handleChartClick = (chartType: string, data: any) => {
    // Navigate to Pipeline Data Management with filters
    const pipelineFilters = {
      fromDate: formData.fromDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      toDate: formData.toDate || new Date().toISOString().split('T')[0],
      merchantId: formData.merchantId || 'MERCHANT_001'
    };
    
    navigate('/pipeline-data', {
      state: {
        preserveData: true,
        filters: pipelineFilters,
        dashboardFilters: filters,
        chartContext: { type: chartType, data }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-2">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            {merchantId && (
              <p className="text-lg text-gray-600 mt-2">Analytics for Merchant: {merchantId}</p>
            )}
          </div>
          <div className="flex gap-4">
            <Link to="/old-index">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/pipeline-data">
              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Pipeline Data Management
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Form */}
        <DashboardForm onSubmit={handleFormSubmit} />

        {/* Merchant Information Table */}
        {formData.merchantId && (
          <div className="mt-8">
            <MerchantInfoTable merchantId={formData.merchantId} />
          </div>
        )}

        {/* Dashboard Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Overview Analytics
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Analytics
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="flex gap-6 relative">
                {/* Sidebar Toggle Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOverviewSidebarCollapsed(!isOverviewSidebarCollapsed)}
                  className="absolute top-4 left-4 z-10 flex items-center gap-2"
                >
                  {isOverviewSidebarCollapsed ? (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      Show Filters
                    </>
                  ) : (
                    <>
                      <ChevronLeft className="h-4 w-4" />
                      Hide Filters
                    </>
                  )}
                </Button>

                {/* Left Sidebar with Dynamic Filters */}
                <div className={`transition-all duration-300 ease-in-out ${
                  isOverviewSidebarCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-80 opacity-100'
                }`}>
                  {!isOverviewSidebarCollapsed && (
                    <div className="pt-12">
                      <DashboardSidebar 
                        onSubmit={handleFilterSubmit} 
                        availableFilters={availableFilters}
                        disabled={!showCharts}
                      />
                    </div>
                  )}
                </div>

                {/* Main Content */}
                <div className={`flex-1 transition-all duration-300 ease-in-out ${
                  isOverviewSidebarCollapsed ? 'ml-0' : 'ml-0'
                }`}>
                  {showCharts ? (
                    <div>
                      {isLoading ? (
                        <div className="text-center text-blue-600 p-10">
                          Loading charts...
                        </div>
                      ) : (
                        <DashboardCharts 
                          data={dashboardData} 
                          onChartClick={handleChartClick}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-96 bg-white rounded-lg border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">
                          Select date range and merchant to view dashboard
                        </h2>
                        <p className="text-gray-500">
                          Use the form above to configure your dashboard view
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Payment Analytics Tab */}
            <TabsContent value="payments" className="space-y-6">
              <div className="flex gap-6 relative">
                {/* Sidebar Toggle Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPaymentSidebarCollapsed(!isPaymentSidebarCollapsed)}
                  className="absolute top-4 left-4 z-10 flex items-center gap-2"
                >
                  {isPaymentSidebarCollapsed ? (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      Show Filters
                    </>
                  ) : (
                    <>
                      <ChevronLeft className="h-4 w-4" />
                      Hide Filters
                    </>
                  )}
                </Button>

                {/* Payment Filter Sidebar */}
                <div className={`transition-all duration-300 ease-in-out ${
                  isPaymentSidebarCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-80 opacity-100'
                }`}>
                  {!isPaymentSidebarCollapsed && (
                    <div className="pt-12">
                      <PaymentFilterSidebar onFiltersChange={handlePaymentFiltersChange} />
                    </div>
                  )}
                </div>

                {/* Payment Analytics Content */}
                <div className={`flex-1 space-y-8 transition-all duration-300 ease-in-out ${
                  isPaymentSidebarCollapsed ? 'ml-0' : 'ml-0'
                }`}>
                  {/* Charts Section */}
                  {(paymentFilters.viewType === 'charts' || paymentFilters.viewType === 'both') && (
                    <PaymentAnalytics onChartClick={handleChartClick} />
                  )}

                  {/* Table Section */}
                  {(paymentFilters.viewType === 'table' || paymentFilters.viewType === 'both') && (
                    <PaymentDetailsTable 
                      selectedFilters={{
                        category: paymentFilters.category,
                        subcategory: paymentFilters.subcategory
                      }}
                    />
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
