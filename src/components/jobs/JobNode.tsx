import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw, CheckCircle, XCircle, Loader, Hourglass, Database, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/job-details/${data.id || name}`);
  };

  return (
    <Card className="w-64 shadow-lg border-2 bg-white">
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-gray-400" />
      <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 ${config.color}`}>
            <StatusIcon size={16} className={config.animate} />
            <span className="text-xs font-semibold">{config.label}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewDetails}
            className="h-6 w-6 p-0 hover:bg-accent"
          >
            <Eye size={14} />
          </Button>
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
