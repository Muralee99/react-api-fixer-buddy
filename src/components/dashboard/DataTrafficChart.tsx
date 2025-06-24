
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface DataTrafficChartProps {
  data: Array<{
    time: string;
    requests: number;
    dataVolume: number;
    errors: number;
  }>;
  onChartClick?: (data: any) => void;
}

export const DataTrafficChart: React.FC<DataTrafficChartProps> = ({ data, onChartClick }) => {
  const chartConfig = {
    requests: {
      label: "Requests",
      color: "hsl(var(--chart-1))",
    },
    dataVolume: {
      label: "Data Volume (MB)",
      color: "hsl(var(--chart-2))",
    },
    errors: {
      label: "Errors",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
          onClick={() => onChartClick && onChartClick(data)}>
      <CardHeader>
        <CardTitle>Data Traffic Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  });
                }}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="requests"
                stackId="1"
                stroke="var(--color-requests)"
                fill="var(--color-requests)"
                fillOpacity={0.6}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="dataVolume"
                stackId="2"
                stroke="var(--color-dataVolume)"
                fill="var(--color-dataVolume)"
                fillOpacity={0.4}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="errors"
                stroke="var(--color-errors)"
                strokeWidth={2}
                dot={{ fill: "var(--color-errors)", strokeWidth: 2, r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
