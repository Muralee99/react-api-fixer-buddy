
import React, { useState, useMemo } from "react";
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  Area, 
  AreaChart, 
  PieChart, 
  Pie, 
  Cell,
  CartesianGrid, 
  XAxis, 
  YAxis, 
  ResponsiveContainer 
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { parseAmount } from "@/lib/data-aggregation";
import { BarChart3, LineChart as LineChartIcon, Activity, PieChart as PieChartIcon, Download, ZoomIn, RotateCcw, TrendingUp, TrendingDown } from "lucide-react";

interface SmartAggregateChartProps {
  title: string;
  description: string;
  data: Record<string, any>[];
  chartConfig: ChartConfig;
  dataKeys: { name: string; key: string }[];
  xAxisKey: string;
}

type ChartType = 'bar' | 'line' | 'area' | 'pie';

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const SmartAggregateChart: React.FC<SmartAggregateChartProps> = ({
  title,
  description,
  data,
  chartConfig,
  dataKeys,
  xAxisKey,
}) => {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [isZoomed, setIsZoomed] = useState(false);

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[400px] text-gray-500">
          <div className="text-center">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = useMemo(() => {
    return data.map((item) => {
      const newItem: Record<string, any> = { ...item };
      dataKeys.forEach((dk) => {
        if (typeof newItem[dk.key] === 'string') {
          newItem[dk.key] = parseAmount(newItem[dk.key]);
        }
      });
      return newItem;
    });
  }, [data, dataKeys]);

  // Calculate analytics
  const analytics = useMemo(() => {
    if (chartData.length === 0) return null;
    
    const totals = dataKeys.map(dk => {
      const values = chartData.map(item => item[dk.key] || 0);
      const total = values.reduce((sum, val) => sum + val, 0);
      const avg = total / values.length;
      const max = Math.max(...values);
      const min = Math.min(...values);
      
      // Calculate trend (simple growth rate between first and last)
      const firstValue = values[0] || 0;
      const lastValue = values[values.length - 1] || 0;
      const trend = firstValue !== 0 ? ((lastValue - firstValue) / firstValue * 100) : 0;
      
      return {
        key: dk.key,
        name: dk.name,
        total,
        avg,
        max,
        min,
        trend
      };
    });
    
    return totals;
  }, [chartData, dataKeys]);

  const handleExport = () => {
    // Simple export functionality - in real app would generate image/PDF
    const csvData = chartData.map(row => 
      Object.keys(row).map(key => row[key]).join(',')
    ).join('\n');
    
    const headers = Object.keys(chartData[0]).join(',');
    const csv = headers + '\n' + csvData;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <defs>
              {dataKeys.map((dk, index) => (
                <linearGradient key={dk.key} id={`gradient-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS[index % CHART_COLORS.length]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={CHART_COLORS[index % CHART_COLORS.length]} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => typeof value === 'string' ? value.slice(5) : value}
            />
            <YAxis
              tickFormatter={(value) =>
                `$${new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(value as number)}`
              }
            />
            <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            {dataKeys.map((dk, index) => (
              <Line
                key={dk.key}
                type="monotone"
                dataKey={dk.key}
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                strokeWidth={3}
                dot={{ fill: CHART_COLORS[index % CHART_COLORS.length], strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: CHART_COLORS[index % CHART_COLORS.length], strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              {dataKeys.map((dk, index) => (
                <linearGradient key={dk.key} id={`areaGradient-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS[index % CHART_COLORS.length]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={CHART_COLORS[index % CHART_COLORS.length]} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => typeof value === 'string' ? value.slice(5) : value}
            />
            <YAxis
              tickFormatter={(value) =>
                `$${new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(value as number)}`
              }
            />
            <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            {dataKeys.map((dk, index) => (
              <Area
                key={dk.key}
                type="monotone"
                dataKey={dk.key}
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                fillOpacity={0.6}
                fill={`url(#areaGradient-${dk.key})`}
              />
            ))}
          </AreaChart>
        );

      case 'pie':
        const pieData = dataKeys.map((dk, index) => ({
          name: dk.name,
          value: chartData.reduce((sum, item) => sum + (item[dk.key] || 0), 0),
          fill: CHART_COLORS[index % CHART_COLORS.length]
        }));
        
        return (
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx={200}
              cy={150}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0];
                  return (
                    <div className="bg-background border rounded-lg p-2 shadow-lg">
                      <p className="font-medium">{data.name}</p>
                      <p className="text-sm">${(data.value as number).toLocaleString()}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        );

      default:
        return (
          <BarChart {...commonProps}>
            <defs>
              {dataKeys.map((dk, index) => (
                <linearGradient key={dk.key} id={`barGradient-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS[index % CHART_COLORS.length]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={CHART_COLORS[index % CHART_COLORS.length]} stopOpacity={0.6}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} className="opacity-30" />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => typeof value === 'string' ? value.slice(5) : value}
            />
            <YAxis
              tickFormatter={(value) =>
                `$${new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(value as number)}`
              }
            />
            <ChartTooltip
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {dataKeys.map((dk, index) => (
              <Bar
                key={dk.key}
                dataKey={dk.key}
                name={dk.name}
                fill={`url(#barGradient-${dk.key})`}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bar')}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('line')}
            >
              <LineChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'area' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('area')}
            >
              <Activity className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'pie' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('pie')}
            >
              <PieChartIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Analytics Summary */}
        {analytics && (
          <div className="flex flex-wrap gap-2 mt-4">
            {analytics.map((stat) => (
              <div key={stat.key} className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {stat.name}: ${stat.total.toLocaleString('en-US', { notation: 'compact' })}
                </Badge>
                <div className="flex items-center gap-1">
                  {stat.trend > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-xs ${stat.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(stat.trend).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={`${isZoomed ? 'min-h-[500px]' : 'min-h-[300px]'} w-full transition-all duration-300`}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SmartAggregateChart;
