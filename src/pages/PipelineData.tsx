import React, { useState } from 'react';
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
import { toast } from "sonner";

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
        
        {isLoading && (
          <div className="text-center text-blue-600 mt-4 mb-4">
            Loading data...
          </div>
        )}

        {pipelineRows.length > 0 && (
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
        
        {transactionRows.length > 0 && (
          <Card className="mt-6">
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
      </div>
    </div>
  );
};

export default PipelineDataPage;
