
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { TrendingDown, TrendingUp, Clock, FileText, CheckCircle, XCircle } from 'lucide-react';

interface PaymentLegNodeData {
  label: string;
  type: 'debit' | 'credit';
  pipelineData?: {
    amount1: string;
    amount2: string;
    currency1: string;
    currency2: string;
    lastExecution: string;
    status: 'success' | 'failure';
    nextScheduled: string;
    documentsProcessed: number;
    documentsFailed: number;
  };
}

export const PaymentLegNode = memo(({ data }: { data: PaymentLegNodeData }) => {
  const isDebit = data.type === 'debit';
  const bgColor = isDebit ? 'bg-red-500' : 'bg-green-500';
  const borderColor = isDebit ? 'border-red-600' : 'border-green-600';
  const sectionBgColor = isDebit ? 'bg-red-600' : 'bg-green-600';
  const handleColor = isDebit ? 'bg-red-300' : 'bg-green-300';
  const Icon = isDebit ? TrendingDown : TrendingUp;
  const pipelineData = data.pipelineData;

  return (
    <div className={`px-4 py-3 shadow-md rounded-md ${bgColor} text-white border-2 ${borderColor} min-w-[240px]`}>
      <div className="flex items-center mb-3">
        <Icon className="mr-2" size={16} />
        <div className="text-sm font-bold">{isDebit ? 'Debit' : 'Credit'} Leg</div>
      </div>
      
      {/* Section 1: Amounts and Currencies */}
      <div className={`${sectionBgColor} rounded p-2 mb-2`}>
        <div className="text-xs font-semibold mb-1">Amounts & Currencies</div>
        <div className="text-xs space-y-1">
          <div>Amount 1: {pipelineData?.amount1 || (isDebit ? '$1,000' : '$2,500')}</div>
          <div>Amount 2: {pipelineData?.amount2 || (isDebit ? '$2,500' : '$1,000')}</div>
          <div>Currency 1: {pipelineData?.currency1 || 'USD'}</div>
          <div>Currency 2: {pipelineData?.currency2 || 'EUR'}</div>
        </div>
      </div>

      {/* Section 2: Job Execution Data */}
      <div className={`${sectionBgColor} rounded p-2 mb-2`}>
        <div className="text-xs font-semibold mb-1 flex items-center">
          <Clock className="mr-1" size={10} />
          Job Execution
        </div>
        <div className="text-xs space-y-1">
          <div>Job: {data.label}</div>
          <div className="flex items-center">
            {pipelineData?.status === 'success' ? (
              <CheckCircle className="mr-1" size={10} />
            ) : (
              <XCircle className="mr-1" size={10} />
            )}
            <span>Last: {pipelineData?.status === 'success' ? 'Success' : 'Failed'} ({pipelineData?.lastExecution || '2024-01-20'})</span>
          </div>
          <div>Next: {pipelineData?.nextScheduled || '2024-01-25 09:00'}</div>
        </div>
      </div>

      {/* Section 3: Document Processing */}
      <div className={`${sectionBgColor} rounded p-2`}>
        <div className="text-xs font-semibold mb-1 flex items-center">
          <FileText className="mr-1" size={10} />
          Document Processing
        </div>
        <div className="text-xs space-y-1">
          <div>Processed: {pipelineData?.documentsProcessed || (isDebit ? 1245 : 987)}</div>
          <div className="flex items-center">
            <XCircle className="mr-1" size={10} />
            <span>Failed: {pipelineData?.documentsFailed || (isDebit ? 3 : 1)}</span>
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className={`w-2 h-2 ${handleColor}`}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={`w-2 h-2 ${handleColor}`}
      />
    </div>
  );
});

PaymentLegNode.displayName = 'PaymentLegNode';
