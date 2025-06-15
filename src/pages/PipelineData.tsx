
import React, { useState, useCallback } from 'react';
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
import { VisibilityControl, type SelectedTable, SECTIONS } from '@/components/pipeline/VisibilityControl';
import { usePipelineData } from '@/hooks/usePipelineData';
import { type PipelineRow } from '@/services/mockDataService';

const PipelineDataPage = () => {
  const [selectedTable, setSelectedTable] = useState<SelectedTable[]>(SECTIONS.map(s => s.id));

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pipeline Data Management</h1>
        
        <FilterForm onSubmit={handleFormSubmit} />
        
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <aside className="w-full lg:w-1/4">
            <VisibilityControl
              selected={selectedTable}
              onSelect={setSelectedTable}
              disabled={pipelineRows.length === 0 && transactionRows.length === 0}
            />
          </aside>
          <main className="w-full lg:w-3/4 flex flex-col gap-6">
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

            {selectedTable.includes('pipeline_aggregates') && pipelineAggregates.length > 0 && (
              <AggregateTable title="Pipeline Data Aggregates" data={pipelineAggregates} />
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

            {selectedTable.includes('transaction_aggregates') && transactionAggregates.length > 0 && (
              <AggregateTable title="Transactional Data Aggregates" data={transactionAggregates} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PipelineDataPage;
