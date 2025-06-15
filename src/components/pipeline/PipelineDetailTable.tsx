
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PipelineDetail {
  type?: string;
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
  data: PipelineDetail[] | null | undefined;
}

const PipelineDetailTable: React.FC<PipelineDetailTableProps> = ({ title, data }) => {
  if (!data || data.length === 0) {
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

  const showTypeColumn = data.length > 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {showTypeColumn && <TableHead>Type</TableHead>}
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
            {data.map((item, index) => (
              <TableRow key={index}>
                {showTypeColumn && <TableCell>{item.type}</TableCell>}
                <TableCell>{item.amount1}</TableCell>
                <TableCell>{item.amount2}</TableCell>
                <TableCell>{item.currency1}</TableCell>
                <TableCell>{item.currency2}</TableCell>
                <TableCell>{item.lastExecution}</TableCell>
                <TableCell className={item.status === 'success' ? 'text-green-600' : 'text-red-600'}>
                  {item.status}
                </TableCell>
                <TableCell>{item.nextScheduled}</TableCell>
                <TableCell>{item.documentsProcessed}</TableCell>
                <TableCell>{item.documentsFailed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PipelineDetailTable;
