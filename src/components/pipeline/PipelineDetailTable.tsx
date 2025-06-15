
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PipelineDetail {
  amount1: string;
  amount2: string;
  currency1: string;
  currency2: string;
  lastExecution: string;
  status: 'success' | 'failure';
  nextScheduled: string;
  documentsProcessed: number;
  documentsFailed: number;
}

interface PipelineDetailTableProps {
  title: string;
  data: PipelineDetail | null | undefined;
}

const PipelineDetailTable: React.FC<PipelineDetailTableProps> = ({ title, data }) => {
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount 1</TableHead>
              <TableHead>Amount 2</TableHead>
              <TableHead>Currency 1</TableHead>
              <TableHead>Currency 2</TableHead>
              <TableHead>Last Execution</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Scheduled</TableHead>
              <TableHead>Docs Processed</TableHead>
              <TableHead>Docs Failed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{data.amount1}</TableCell>
              <TableCell>{data.amount2}</TableCell>
              <TableCell>{data.currency1}</TableCell>
              <TableCell>{data.currency2}</TableCell>
              <TableCell>{data.lastExecution}</TableCell>
              <TableCell className={data.status === 'success' ? 'text-green-600' : 'text-red-600'}>
                {data.status}
              </TableCell>
              <TableCell>{data.nextScheduled}</TableCell>
              <TableCell>{data.documentsProcessed}</TableCell>
              <TableCell>{data.documentsFailed}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PipelineDetailTable;
