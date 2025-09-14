import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import type { JobHistory } from '@/services/mockDataService';

interface JobRecordsTableProps {
  jobHistory: JobHistory;
}

export const JobRecordsTable: React.FC<JobRecordsTableProps> = ({ jobHistory }) => {
  const calculatePercentage = (processed: number, total: number) => {
    return total > 0 ? Math.round((processed / total) * 100) : 0;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">Step/Process</TableHead>
          <TableHead className="text-xs">Total</TableHead>
          <TableHead className="text-xs">Success</TableHead>
          <TableHead className="text-xs">Failed</TableHead>
          <TableHead className="text-xs">Progress</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobHistory.steps.map((step) => (
          <TableRow key={step.id}>
            <TableCell className="text-xs font-medium">{step.name}</TableCell>
            <TableCell className="text-xs">{step.recordsProcessed + step.recordsFailed}</TableCell>
            <TableCell className="text-xs text-green-600">{step.recordsProcessed}</TableCell>
            <TableCell className="text-xs text-red-600">{step.recordsFailed}</TableCell>
            <TableCell className="text-xs w-24">
              <Progress 
                value={calculatePercentage(step.recordsProcessed, step.recordsProcessed + step.recordsFailed)}
                className="h-2"
              />
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="border-t-2">
          <TableCell className="text-xs font-bold">Total Job</TableCell>
          <TableCell className="text-xs font-bold">{jobHistory.totalRecords}</TableCell>
          <TableCell className="text-xs font-bold text-green-600">{jobHistory.successRecords}</TableCell>
          <TableCell className="text-xs font-bold text-red-600">{jobHistory.failedRecords}</TableCell>
          <TableCell className="text-xs w-24">
            <Progress 
              value={calculatePercentage(jobHistory.successRecords, jobHistory.totalRecords)}
              className="h-2"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};