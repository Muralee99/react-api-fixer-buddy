
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DataTrafficChart } from './DataTrafficChart';
import type { DashboardData } from '@/hooks/useDashboardData';

interface DashboardChartsProps {
  data: DashboardData;
  onChartClick: (chartType: string, data: any) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ data, onChartClick }) => {
  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
    amount: {
      label: "Amount",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="space-y-6">
      {/* Data Traffic Chart */}
      <DataTrafficChart 
        data={data.trafficData} 
        onChartClick={(chartData) => onChartClick('traffic', chartData)}
      />

      {/* Chart 1: All Data Overview */}
      <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
            onClick={() => onChartClick('overview', data.overviewData)}>
        <CardHeader>
          <CardTitle>Complete Overview - Countries, Payment Methods & Currencies</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.overviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 2: Payment Methods and Currencies */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onChartClick('payment-currency', data.paymentCurrencyData)}>
          <CardHeader>
            <CardTitle>Payment Methods & Currencies</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
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
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Chart 3: Currencies and Transaction Statuses */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onChartClick('currency-status', data.currencyStatusData)}>
          <CardHeader>
            <CardTitle>Currencies & Transaction Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.currencyStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="successful" fill="#00C49F" />
                  <Bar dataKey="pending" fill="#FFBB28" />
                  <Bar dataKey="failed" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
