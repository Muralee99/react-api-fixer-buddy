import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DataTrafficChart } from './DataTrafficChart';
import DashboardAggregateTable from './DashboardAggregateTable';
import type { DashboardData } from '@/hooks/useDashboardData';

interface DashboardChartsProps {
  data: DashboardData;
  onChartClick?: (chartType: string, data: any) => void;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ data, onChartClick }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const overviewChartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  };

  const currencyStatusChartConfig = {
    successful: {
      label: "Successful",
      color: "hsl(var(--chart-1))",
    },
    pending: {
      label: "Pending", 
      color: "hsl(var(--chart-2))",
    },
    failed: {
      label: "Failed",
      color: "hsl(var(--chart-3))",
    },
  };

  // Generate aggregate data for tables
  const transactionSummary = React.useMemo(() => {
    const summary = data.currencyStatusData.map(item => ({
      'Currency': item.name,
      'Total Transactions': (item.successful + item.pending + item.failed).toLocaleString(),
      'Success Rate': `${((item.successful / (item.successful + item.pending + item.failed)) * 100).toFixed(1)}%`,
      'Successful': item.successful.toLocaleString(),
      'Pending': item.pending.toLocaleString(),
      'Failed': item.failed.toLocaleString()
    }));
    return summary;
  }, [data.currencyStatusData]);

  const paymentMethodSummary = React.useMemo(() => {
    const methodTotals = data.paymentCurrencyData.reduce((acc, item) => {
      const method = item.name.split('-')[0];
      if (!acc[method]) {
        acc[method] = 0;
      }
      acc[method] += item.value;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(methodTotals).map(([method, total]) => ({
      'Payment Method': method,
      'Total Volume': total.toLocaleString(),
      'Market Share': `${((total / Object.values(methodTotals).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%`
    }));
  }, [data.paymentCurrencyData]);

  const trafficSummary = React.useMemo(() => {
    if (data.trafficData.length === 0) return [];
    
    const totalRequests = data.trafficData.reduce((sum, item) => sum + item.requests, 0);
    const totalErrors = data.trafficData.reduce((sum, item) => sum + item.errors, 0);
    const totalDataVolume = data.trafficData.reduce((sum, item) => sum + item.dataVolume, 0);
    const avgRequests = Math.round(totalRequests / data.trafficData.length);
    
    return [
      {
        'Metric': 'Total Requests',
        'Value': totalRequests.toLocaleString(),
        'Average/Hour': avgRequests.toLocaleString()
      },
      {
        'Metric': 'Total Data Volume',
        'Value': `${totalDataVolume.toLocaleString()} MB`,
        'Average/Hour': `${Math.round(totalDataVolume / data.trafficData.length)} MB`
      },
      {
        'Metric': 'Total Errors',
        'Value': totalErrors.toLocaleString(),
        'Error Rate': `${((totalErrors / totalRequests) * 100).toFixed(2)}%`
      }
    ];
  }, [data.trafficData]);

  return (
    <div className="space-y-6">
      {/* Existing Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
              onClick={() => onChartClick && onChartClick('overview', data.overviewData)}>
          <CardHeader>
            <CardTitle>Transaction Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={overviewChartConfig} className="h-80">
              <BarChart data={data.overviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
              onClick={() => onChartClick && onChartClick('payment-currency', data.paymentCurrencyData)}>
          <CardHeader>
            <CardTitle>Payment Methods & Currencies</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={overviewChartConfig} className="h-80">
              <PieChart>
                <Pie
                  data={data.paymentCurrencyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.paymentCurrencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
              onClick={() => onChartClick && onChartClick('currency-status', data.currencyStatusData)}>
          <CardHeader>
            <CardTitle>Transaction Status by Currency</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={currencyStatusChartConfig} className="h-80">
              <BarChart data={data.currencyStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="successful" stackId="a" fill="var(--color-successful)" />
                <Bar dataKey="pending" stackId="a" fill="var(--color-pending)" />
                <Bar dataKey="failed" stackId="a" fill="var(--color-failed)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <DataTrafficChart 
          data={data.trafficData} 
          onChartClick={(data) => onChartClick && onChartClick('traffic', data)} 
        />
      </div>

      {/* New Aggregate Tables Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Analytics & Insights</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardAggregateTable
            title="Transaction Summary by Currency"
            data={transactionSummary}
            onTableClick={(data) => onChartClick && onChartClick('transaction-summary', data)}
          />
          
          <DashboardAggregateTable
            title="Payment Method Performance"
            data={paymentMethodSummary}
            onTableClick={(data) => onChartClick && onChartClick('payment-summary', data)}
          />
        </div>

        <div className="mt-6">
          <DashboardAggregateTable
            title="Traffic Analytics Summary"
            data={trafficSummary}
            onTableClick={(data) => onChartClick && onChartClick('traffic-summary', data)}
          />
        </div>
      </div>
    </div>
  );
};
