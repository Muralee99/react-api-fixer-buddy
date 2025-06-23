
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardFilterForm } from '@/components/dashboard/DashboardFilterForm';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Briefcase, TrendingUp } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
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

        <DashboardFilterForm onSubmit={handleFormSubmit} />

        {showCharts && (
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
        )}

        {!showCharts && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">Pipeline Data</CardTitle>
                <TrendingUp className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visualize and manage your pipeline and transactional data.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">Jobs Execution</CardTitle>
                <Briefcase className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitor and manage job executions and their statuses.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
