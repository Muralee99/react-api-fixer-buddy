
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { useDashboardData } from '@/hooks/useDashboardData';
import { TrendingUp } from 'lucide-react';

export interface DashboardFilters {
  countries: string[];
  paymentMethods: string[];
  currencies: string[];
  transactionStatuses: string[];
}

const Dashboard = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    countries: [],
    paymentMethods: [],
    currencies: [],
    transactionStatuses: []
  });
  
  const [showCharts, setShowCharts] = useState(false);
  const navigate = useNavigate();
  
  const { dashboardData, isLoading } = useDashboardData(filters, showCharts);

  const handleFormSubmit = (newFilters: DashboardFilters) => {
    setFilters(newFilters);
    setShowCharts(true);
  };

  const handleChartClick = (chartType: string, data: any) => {
    // Navigate to Pipeline Data Management with filters
    const pipelineFilters = {
      fromDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
      toDate: new Date().toISOString().split('T')[0], // today
      merchantId: 'MERCHANT_001'
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-80 p-4 bg-white border-r">
        <DashboardSidebar onSubmit={handleFormSubmit} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex gap-4">
            <Link to="/pipeline-data">
              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Pipeline Data Management
              </Button>
            </Link>
          </div>
        </div>

        {showCharts ? (
          <div className="mt-8">
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
                Select filters and click Submit to view charts
              </h2>
              <p className="text-gray-500">
                Use the filter panel on the left to configure your dashboard view
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
