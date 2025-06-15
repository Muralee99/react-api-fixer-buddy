import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterForm } from '@/components/pipeline/FilterForm';
import { fetchPipelineData, fetchTransactionData, type TransactionData } from '@/services/mockDataService';
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
import { toast } from "sonner";
import { VisibilityControl, type SelectedTable } from '@/components/pipeline/VisibilityControl';

// Export this interface for usage in other files
export interface PipelineRow {
  id: string;
  nodeType: string;
  amount1: string;
  amount2: string;
  currency1: string;
  currency2: string;
  lastExecution: string;
  status: 'success' | 'failure';
  nextScheduled: string;
  documentsProcessed: number;
  documentsFailed: number;
  filters: {
    fromDate: string;
    toDate: string;
    merchantId: string;
  };
}

const NODE_TYPES = [
  { key: 'dealBooking', label: 'Deal Booking' }
];

const PipelineDataPage = () => {
  const [pipelineRows, setPipelineRows] = useState<PipelineRow[]>([]);
  const [transactionRows, setTransactionRows] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState<SelectedTable>('all');
  const navigate = useNavigate();

  const handleFormSubmit = async (filters: {
    fromDate: string;
    toDate: string;
    merchantId: string;
  }) => {
    setIsLoading(true);
    console.log('Form submitted with filters:', filters);

    try {
      const pipelineDataPromise = fetchPipelineData(filters);
      const transactionDataPromise = fetchTransactionData(filters);
      const [data, transactions] = await Promise.all([pipelineDataPromise, transactionDataPromise]);


      // Only generate Deal Booking rows
      const rows: PipelineRow[] = [];
      // Adjust the count as desired; here, still 350
      for (let i = 0; i < 350; i++) {
        const nodeTypeConfig = NODE_TYPES[0]; // Only Deal Booking
        const dataKey = nodeTypeConfig.key as keyof typeof data;
        rows.push({
          id: `${nodeTypeConfig.key}-${i + 1}`,
          nodeType: nodeTypeConfig.label,
          ...(data[dataKey] as Omit<PipelineRow, "id" | "nodeType" | "filters">),
          filters
        });
      }
      setPipelineRows(rows);
      setTransactionRows(transactions);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewFlow = (row: PipelineRow) => {
    // Navigate to React Flow with the data
    navigate('/pipeline-designer', { 
      state: { 
        pipelineData: {
          dealBooking: pipelineRows.find(r => r.nodeType === 'Deal Booking'),
          paymentDebit: pipelineRows.find(r => r.nodeType === 'Payment Debit'),
          paymentCredit: pipelineRows.find(r => r.nodeType === 'Payment Credit'),
          fundInitial: pipelineRows.find(r => r.nodeType === 'Fund Initial'),
          fundFunding: pipelineRows.find(r => r.nodeType === 'Fund Funding'),
        },
        filters: row.filters
      }
    });
  };

  const handleTransactionViewFlow = (row: TransactionData) => {
    toast.info("View Flow Clicked", {
      description: `Transaction ID: ${row.id} for MID ${row.mid}`,
    });
    console.log('View flow for transaction:', row);
  };

  const parseAmount = (amount: string): number => {
    return parseFloat(amount.replace(/[^0-9.-]+/g, '')) || 0;
  };

  const pipelineAggregates = useMemo(() => {
    if (pipelineRows.length === 0) return [];

    const totalAmount1 = pipelineRows.reduce((sum, row) => sum + parseAmount(row.amount1), 0);
    const totalAmount2 = pipelineRows.reduce((sum, row) => sum + parseAmount(row.amount2), 0);

    const currency1 = pipelineRows[0]?.currency1 || 'USD';
    const currency2 = pipelineRows[0]?.currency2 || 'USD';

    const formatOptions = (currency: string): Intl.NumberFormatOptions => ({
      style: 'currency',
      currency: currency,
    });

    return [
      { label: `Total Amount 1 (${currency1})`, value: totalAmount1.toLocaleString('en-US', formatOptions(currency1)) },
      { label: `Total Amount 2 (${currency2})`, value: totalAmount2.toLocaleString('en-US', formatOptions(currency2)) },
    ];
  }, [pipelineRows]);

  const transactionAggregates = useMemo(() => {
    if (transactionRows.length === 0) return [];

    const totalAmount1 = transactionRows.reduce((sum, row) => sum + parseAmount(row.amount1), 0);
    const totalAmount2 = transactionRows.reduce((sum, row) => sum + parseAmount(row.amount2), 0);

    const currency = transactionRows[0]?.currency || 'USD';

    const formatOptions = (currency: string): Intl.NumberFormatOptions => ({
      style: 'currency',
      currency: currency,
    });

    return [
      { label: `Total Amount 1 (${currency})`, value: totalAmount1.toLocaleString('en-US', formatOptions(currency)) },
      { label: `Total Amount 2 (${currency})`, value: totalAmount2.toLocaleString('en-US', formatOptions(currency)) },
    ];
  }, [transactionRows]);

  // Estimate row height, or measure empirically if styled otherwise
  const rowHeight = 80; // Increased to accommodate wrapped dates
  const transactionRowHeight = 56;

  // Memo row rendering for react-window
  const Row = React.useCallback(
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

  const TransactionRow = React.useCallback(
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
            
            {(selectedTable === 'all' || selectedTable === 'pipeline') && pipelineRows.length > 0 && (
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

            {(selectedTable === 'all' || selectedTable === 'pipeline_aggregates') && pipelineAggregates.length > 0 && (
              <AggregateTable title="Pipeline Data Aggregates" data={pipelineAggregates} />
            )}
            
            {(selectedTable === 'all' || selectedTable === 'transactions') && transactionRows.length > 0 && (
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

            {(selectedTable === 'all' || selectedTable === 'transaction_aggregates') && transactionAggregates.length > 0 && (
              <AggregateTable title="Transactional Data Aggregates" data={transactionAggregates} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PipelineDataPage;
