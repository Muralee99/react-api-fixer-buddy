import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { JobHistory } from '@/services/mockDataService';

interface JobStepsTableProps {
  jobHistory: JobHistory;
}

export const JobStepsTable: React.FC<JobStepsTableProps> = ({ jobHistory }) => {
  const formatTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleTimeString();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">Step Name</TableHead>
          <TableHead className="text-xs">Start Time</TableHead>
          <TableHead className="text-xs">End Time</TableHead>
          <TableHead className="text-xs">Duration</TableHead>
          <TableHead className="text-xs">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-xs font-medium">Job Start</TableCell>
          <TableCell className="text-xs">{formatTime(jobHistory.startTime)}</TableCell>
          <TableCell className="text-xs">-</TableCell>
          <TableCell className="text-xs">-</TableCell>
          <TableCell className="text-xs">
            <Badge variant="secondary" className="text-xs">Started</Badge>
          </TableCell>
        </TableRow>
        {jobHistory.steps.map((step) => (
          <TableRow key={step.id}>
            <TableCell className="text-xs font-medium">{step.name}</TableCell>
            <TableCell className="text-xs">{formatTime(step.startTime)}</TableCell>
            <TableCell className="text-xs">{formatTime(step.endTime)}</TableCell>
            <TableCell className="text-xs">{step.duration}</TableCell>
            <TableCell className="text-xs">
              <Badge 
                variant={step.status === 'success' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {step.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell className="text-xs font-medium">Job End</TableCell>
          <TableCell className="text-xs">{formatTime(jobHistory.endTime)}</TableCell>
          <TableCell className="text-xs">-</TableCell>
          <TableCell className="text-xs">{jobHistory.duration}</TableCell>
          <TableCell className="text-xs">
            <Badge 
              variant={jobHistory.status === 'success' ? 'default' : 'destructive'}
              className="text-xs"
            >
              {jobHistory.status}
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};