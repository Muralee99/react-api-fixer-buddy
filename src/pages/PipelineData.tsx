import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FilterForm } from '@/components/pipeline/FilterForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import PipelineTableRow from "@/components/pipeline/PipelineTableRow";
import TransactionTableRow from "@/components/pipeline/TransactionTableRow";
import AggregateTable from "@/components/pipeline/AggregateTable";
import SmartAggregateChart from "@/components/pipeline/SmartAggregateChart";
import { type SelectedTable, SECTIONS } from '@/components/pipeline/VisibilityControl';
import { usePipelineData } from '@/hooks/usePipelineData';
import { type PipelineRow } from '@/services/mockDataService';
import { type ChartConfig } from '@/components/ui/chart';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PipelineSidebar } from '@/components/pipeline/PipelineSidebar';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const PipelineDataPage = () => {
  const [selectedTable, setSelectedTable] = useState<SelectedTable[]>(SECTIONS.map(s => s.id));
  const location = useLocation();
  const hasRestoredData = useRef(false);

  const {
    pipelineRows,
    transactionRows,
    isLoading,
    handleFormSubmit,
    handleViewFlow,
    handleTransactionViewFlow,
    pipelineAggregates,
    transactionAggregates
  } = usePipelineData();

  // Handle incoming state from navigation to preserve data
  useEffect(() => {
    if (location.state?.preserveData && location.state?.filters && !hasRestoredData.current) {
      console.log('Restoring data with filters:', location.state.filters);
      
      // If coming from dashboard with chart context, show relevant message
      if (location.state?.dashboardFilters) {
        console.log('Dashboard context:', location.state.chartContext);
      }
      
      handleFormSubmit(location.state.filters);
      hasRestoredData.current = true;
    }
  }, [location.state?.preserveData, location.state?.filters, handleFormSubmit]);

  const chartConfig: ChartConfig = {
    amount1: {
      label: "Amount 1",
      color: "hsl(var(--chart-1))",
    },
    amount2: {
      label: "Amount 2", 
      color: "hsl(var(--chart-2))",
    },
  };

  const pipelineAggregatesForChart = pipelineAggregates.map(item => ({
      ...item,
      amount1: item['Amount 1'],
      amount2: item['Amount 2'],
  }));

  const transactionAggregatesForChart = transactionAggregates.map(item => ({
      ...item,
      amount1: item['Amount 1'],
      amount2: item['Amount 2'],
  }));

  // Estimate row height, or measure empirically if styled otherwise
  const rowHeight = 80; // Increased to accommodate wrapped dates
  const transactionRowHeight = 56;

  // Memo row rendering for react-window
  const Row = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const row = pipelineRows[index];
      // Pass rowIndex (1-based)
      return (
        <PipelineTableRow
          row={row}
          rowIndex={index + 1}
          onViewFlow={handleViewFlow}
          style={style}
          key={row.id}
        />
      );
    },
    [pipelineRows, handleViewFlow]
  );

  const TransactionRow = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const row = transactionRows[index];
      return (
        <TransactionTableRow
          row={row}
          rowIndex={index + 1}
          onViewFlow={handleTransactionViewFlow}
          style={style}
          key={row.id}
        />
      );
    },
    [transactionRows, handleTransactionViewFlow]
  );

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <PipelineSidebar
          selected={selectedTable}
          onSelect={setSelectedTable}
          disabled={pipelineRows.length === 0 && transactionRows.length === 0}
        />
        <main className="flex-1 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/old-index" aria-label="Go to Home">
                <Button variant="ghost" size="icon">
                    <Home className="h-5 w-5" />
                </Button>
            </Link>
            <h1 className="text-3xl font-bold">Pipeline Data Management</h1>
            {location.state?.dashboardFilters && (
              <div className="ml-auto text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                Filtered from Dashboard: {location.state.chartContext?.type}
              </div>
            )}
          </div>
          
          <FilterForm onSubmit={handleFormSubmit} />
          
          <div className="flex flex-col gap-6 mt-6">
            {isLoading && (
              <div className="text-center text-blue-600 p-10">
                Loading data...
              </div>
            )}

            {!isLoading && pipelineRows.length === 0 && transactionRows.length === 0 && (
                 <div className="text-center text-gray-500 p-10 bg-card border rounded-lg">
                    Please submit the form to view data.
                 </div>
            )}
            
            {selectedTable.includes('pipeline') && pipelineRows.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Pipeline Data Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[4%]">No.</TableHead>
                          <TableHead className="w-[12%]">Node Type</TableHead>
                          <TableHead className="w-[7%]">Amount 1</TableHead>
                          <TableHead className="w-[7%]">Amount 2</TableHead>
                          <TableHead className="w-[7%]">Currency 1</TableHead>
                          <TableHead className="w-[7%]">Currency 2</TableHead>
                          <TableHead className="w-[12%]">Last Execution</TableHead>
                          <TableHead className="w-[8%]">Status</TableHead>
                          <TableHead className="w-[12%]">Next Scheduled</TableHead>
                          <TableHead className="w-[7%]">Docs Processed</TableHead>
                          <TableHead className="w-[7%]">Docs Failed</TableHead>
                          <TableHead className="w-[10%]">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                    </Table>
                    <List
                        height={600}
                        itemCount={pipelineRows.length}
                        itemSize={rowHeight}
                        width="100%"
                    >
                        {Row}
                    </List>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedTable.includes('transactions') && transactionRows.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Transactional Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[5%]">No.</TableHead>
                          <TableHead className="w-[15%]">MID</TableHead>
                          <TableHead className="w-[10%]">Amount 1</TableHead>
                          <TableHead className="w-[10%]">Amount 2</TableHead>
                          <TableHead className="w-[10%]">Currency</TableHead>
                          <TableHead className="w-[15%]">Date</TableHead>
                          <TableHead className="w-[20%]">Account</TableHead>
                          <TableHead className="w-[15%]">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                    </Table>
                    <List
                        height={600}
                        itemCount={transactionRows.length}
                        itemSize={transactionRowHeight}
                        width="100%"
                    >
                        {TransactionRow}
                    </List>
                  </div>
                </CardContent>
              </Card>
            )}

            {(selectedTable.includes('pipeline_infographics') || selectedTable.includes('pipeline_aggregates_table')) && pipelineAggregates.length > 0 && (
              <div className="flex flex-col gap-6">
                {selectedTable.includes('pipeline_aggregates_table') && (
                  <AggregateTable title="Pipeline Data Aggregates" data={pipelineAggregates} />
                )}
                {selectedTable.includes('pipeline_infographics') && (
                  <SmartAggregateChart
                    title="Pipeline Data Analytics"
                    description="Interactive visualization of aggregated pipeline data with smart insights and trend analysis."
                    data={pipelineAggregatesForChart}
                    chartConfig={chartConfig}
                    dataKeys={[{ name: 'Amount 1', key: 'amount1' }, { name: 'Amount 2', key: 'amount2' }]}
                    xAxisKey="Date"
                  />
                )}
              </div>
            )}

            {(selectedTable.includes('transaction_infographics') || selectedTable.includes('transaction_aggregates_table')) && transactionAggregates.length > 0 && (
              <div className="flex flex-col gap-6">
                {selectedTable.includes('transaction_aggregates_table') && (
                  <AggregateTable title="Transactional Data Aggregates" data={transactionAggregates} />
                )}
                {selectedTable.includes('transaction_infographics') && (
                  <SmartAggregateChart
                    title="Transaction Data Analytics"
                    description="Advanced analytics for transactional data with multiple visualization modes and performance metrics."
                    data={transactionAggregatesForChart}
                    chartConfig={chartConfig}
                    dataKeys={[{ name: 'Amount 1', key: 'amount1' }, { name: 'Amount 2', key: 'amount2' }]}
                    xAxisKey="Date"
                  />
                )}
              </div>
            )}
          </div>
        </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PipelineDataPage;
