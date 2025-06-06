
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterForm } from '@/components/pipeline/FilterForm';
import { fetchPipelineData, PipelineData } from '@/services/mockDataService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye } from 'lucide-react';

interface PipelineRow {
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

const PipelineData = () => {
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
      
      // Convert pipeline data to table rows
      const rows: PipelineRow[] = [
        {
          id: 'deal-1',
          nodeType: 'Deal Booking',
          ...data.dealBooking,
          filters,
        },
        {
          id: 'payment-debit-1',
          nodeType: 'Payment Debit',
          ...data.paymentDebit,
          filters,
        },
        {
          id: 'payment-credit-1',
          nodeType: 'Payment Credit',
          ...data.paymentCredit,
          filters,
        },
        {
          id: 'fund-initial-1',
          nodeType: 'Fund Initial',
          ...data.fundInitial,
          filters,
        },
        {
          id: 'fund-funding-1',
          nodeType: 'Fund Funding',
          ...data.fundFunding,
          filters,
        },
      ];

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
              <Table>
                <TableHeader>
                  <TableRow>
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
                <TableBody>
                  {pipelineRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.nodeType}</TableCell>
                      <TableCell>{row.amount1}</TableCell>
                      <TableCell>{row.amount2}</TableCell>
                      <TableCell>{row.currency1}</TableCell>
                      <TableCell>{row.currency2}</TableCell>
                      <TableCell>{row.lastExecution}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            row.status === 'success'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {row.status}
                        </span>
                      </TableCell>
                      <TableCell>{row.nextScheduled}</TableCell>
                      <TableCell>{row.documentsProcessed}</TableCell>
                      <TableCell>{row.documentsFailed}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewFlow(row)}
                          className="flex items-center gap-2"
                        >
                          <Eye size={16} />
                          View Flow
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PipelineData;
