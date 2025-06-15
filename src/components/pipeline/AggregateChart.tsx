
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { parseAmount } from "@/lib/data-aggregation";

interface AggregateChartProps {
  title: string;
  description: string;
  data: Record<string, any>[];
  chartConfig: ChartConfig;
  dataKeys: { name: string; key: string }[];
  xAxisKey: string;
}

const AggregateChart: React.FC<AggregateChartProps> = ({
  title,
  description,
  data,
  chartConfig,
  dataKeys,
  xAxisKey,
}) => {
  if (!data || data.length === 0) {
    return null;
  }

  const chartData = React.useMemo(() => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => (typeof value === 'string' ? value.slice(5) : value)}
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
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {dataKeys.map((dk) => (
              <Bar
                key={dk.key}
                dataKey={dk.key}
                name={dk.name}
                fill={`var(--color-${dk.key})`}
                radius={4}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AggregateChart;
