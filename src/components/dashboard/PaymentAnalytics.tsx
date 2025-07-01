
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentAnalyticsProps {
  onChartClick?: (chartType: string, data: any) => void;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

export const PaymentAnalytics: React.FC<PaymentAnalyticsProps> = ({ onChartClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Main categories data
  const mainData: ChartData[] = [
    { name: 'Payments', value: 15420, color: '#10B981' },
    { name: 'Refunds', value: 3250, color: '#F59E0B' },
    { name: 'Fees', value: 1850, color: '#EF4444' }
  ];

  // Drill-down data for each category
  const drillDownData: Record<string, ChartData[]> = {
    'Payments': [
      { name: 'Captures', value: 8900, color: '#059669' },
      { name: 'Funded', value: 4320, color: '#10B981' },
      { name: 'Authorized', value: 2200, color: '#34D399' }
    ],
    'Refunds': [
      { name: 'Full Refunds', value: 2100, color: '#D97706' },
      { name: 'Partial Refunds', value: 1150, color: '#F59E0B' }
    ],
    'Fees': [
      { name: 'Transaction Fees', value: 1200, color: '#DC2626' },
      { name: 'Scheme Fees', value: 650, color: '#EF4444' }
    ]
  };

  const chartConfig = {
    value: {
      label: "Amount",
      color: "hsl(var(--chart-1))",
    },
  };

  const handleMainChartClick = (data: any) => {
    if (data && data.name) {
      setSelectedCategory(data.name);
    }
    onChartClick && onChartClick('payment-main', data);
  };

  const handleDrillDownClick = (data: any) => {
    onChartClick && onChartClick(`payment-${selectedCategory?.toLowerCase()}`, data);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const currentData = selectedCategory ? drillDownData[selectedCategory] : mainData;
  const chartTitle = selectedCategory ? `${selectedCategory} Breakdown` : 'Payment Overview';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {chartTitle}
              </CardTitle>
              {selectedCategory && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBackClick}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart 
                data={currentData}
                onClick={selectedCategory ? handleDrillDownClick : handleMainChartClick}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="value" 
                  fill="#8884d8"
                  onClick={selectedCategory ? handleDrillDownClick : handleMainChartClick}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{selectedCategory ? `${selectedCategory} Distribution` : 'Payment Distribution'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <PieChart>
                <Pie
                  data={currentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {currentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.name}</p>
                  <p className="text-2xl font-bold">${item.value.toLocaleString()}</p>
                </div>
                <div 
                  className="w-4 h-4 rounded" 
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
