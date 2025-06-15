import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterForm } from '@/components/pipeline/FilterForm';
import { fetchPipelineData, type PipelineData } from '@/services/mockDataService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import PipelineTableRow from "@/components/pipeline/PipelineTableRow";

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
  { key: 'dealBooking', label: 'Deal Booking' },
  { key: 'paymentDebit', label: 'Payment Debit' },
  { key: 'paymentCredit', label: 'Payment Credit' },
  { key: 'fundInitial', label: 'Fund Initial' },
  { key: 'fundFunding', label: 'Fund Funding' }
];

const PipelineDataPage = () => {
  const [pipelineRows, setPipelineRows] = useState<PipelineRow[]>([]);
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
      const data = await fetchPipelineData(filters);

      // Generate 350 rows by cycling through the node types
      const rows: PipelineRow[] = [];
      for (let i = 0; i < 350; i++) {
        const nodeTypeIndex = i % NODE_TYPES.length;
        const nodeTypeConfig = NODE_TYPES[nodeTypeIndex];
        const dataKey = nodeTypeConfig.key as keyof typeof data;
        rows.push({
          id: `${nodeTypeConfig.key}-${i + 1}`,
          nodeType: nodeTypeConfig.label,
          ...(data[dataKey] as Omit<PipelineRow, "id" | "nodeType" | "filters">),
          filters
        });
      }
      setPipelineRows(rows);
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

  // Estimate row height, or measure empirically if styled otherwise
  const rowHeight = 56;

  // Memo row rendering for react-window
  const Row = React.useCallback(
    ({ index, style }) => {
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

  // Custom outer/inner elements for react-window to match table semantics
  const OuterElement = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    (props, ref) => <tbody ref={ref} {...props} />
  );
  const InnerElement = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
    (props, ref) => <React.Fragment>{props.children}</React.Fragment>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pipeline Data Management</h1>
        
        <FilterForm onSubmit={handleFormSubmit} />
        
        {isLoading && (
          <div className="text-center text-blue-600 mt-4 mb-4">
            Loading pipeline data...
          </div>
        )}

        {pipelineRows.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Data Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Node Type</TableHead>
                      <TableHead>Amount 1</TableHead>
                      <TableHead>Amount 2</TableHead>
                      <TableHead>Currency 1</TableHead>
                      <TableHead>Currency 2</TableHead>
                      <TableHead>Last Execution</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Scheduled</TableHead>
                      <TableHead>Docs Processed</TableHead>
                      <TableHead>Docs Failed</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  {/* VIRTUALIZED BODY */}
                  <List
                    height={Math.min(600, rowHeight * Math.min(50, pipelineRows.length))}
                    itemCount={pipelineRows.length}
                    itemSize={rowHeight}
                    width={"100%"}
                    outerElementType={OuterElement}
                    innerElementType={InnerElement}
                    style={{overflowX: "hidden"}}
                  >
                    {Row}
                  </List>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PipelineDataPage;
