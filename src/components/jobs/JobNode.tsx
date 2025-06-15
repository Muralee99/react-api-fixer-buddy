import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, RefreshCw, CheckCircle, XCircle, Loader, Hourglass, Database } from 'lucide-react';

export interface JobNodeData {
  [key: string]: any;
  name: string;
  status: 'success' | 'failure' | 'running' | 'pending';
  lastExecutionTime: string;
  nextExecutionTime: string;
  recordsProcessed: number;
  pendingRecords: number;
}

const statusConfig = {
  success: { icon: CheckCircle, color: 'text-green-500', label: 'Success', animate: '' },
  failure: { icon: XCircle, color: 'text-red-500', label: 'Failure', animate: '' },
  running: { icon: Loader, color: 'text-blue-500', label: 'Running', animate: 'animate-spin' },
  pending: { icon: Hourglass, color: 'text-yellow-500', label: 'Pending', animate: '' },
};

export const JobNode = memo(({ data }: { data: JobNodeData }) => {
  const { name, status, lastExecutionTime, nextExecutionTime, recordsProcessed, pendingRecords } = data;
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card className="w-64 shadow-lg border-2 bg-white">
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-gray-400" />
      <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <div className={`flex items-center gap-1 ${config.color}`}>
          <StatusIcon size={16} className={config.animate} />
          <span className="text-xs font-semibold">{config.label}</span>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0 text-xs text-gray-600 space-y-2">
        <div className="flex items-center">
          <Clock size={14} className="mr-2" />
          <span>Last run: {lastExecutionTime}</span>
        </div>
        <div className="flex items-center">
          <RefreshCw size={14} className="mr-2" />
          <span>Next run: {nextExecutionTime}</span>
        </div>
        <div className="flex items-center">
          <Database size={14} className="mr-2" />
          <span>Processed: {recordsProcessed.toLocaleString()} | Pending: {pendingRecords.toLocaleString()}</span>
        </div>
      </CardContent>
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-gray-400" />
    </Card>
  );
});

JobNode.displayName = 'JobNode';
