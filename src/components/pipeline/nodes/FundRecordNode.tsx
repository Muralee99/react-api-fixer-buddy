
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Wallet, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

export const FundRecordNode = memo(({ data }: { data: { label: string; type?: 'initial' | 'funding' } }) => {
  const isFunding = data.type === 'funding';
  const bgColor = isFunding ? 'bg-indigo-500' : 'bg-teal-500';
  const borderColor = isFunding ? 'border-indigo-600' : 'border-teal-600';
  const sectionBgColor = isFunding ? 'bg-indigo-600' : 'bg-teal-600';
  const iconBg = isFunding ? 'bg-indigo-300' : 'bg-teal-300';

  return (
    <div className={`px-4 py-3 shadow-md rounded-md ${bgColor} text-white border-2 ${borderColor} min-w-[240px]`}>
      <div className="flex items-center mb-3">
        {isFunding ? <Wallet className="mr-2" size={16} /> : <FileText className="mr-2" size={16} />}
        <div className="text-sm font-bold">
          {isFunding ? 'Funding Records' : 'Fund Record'}
        </div>
      </div>
      
      {/* Section 1: Amounts and Currencies */}
      <div className={`${sectionBgColor} rounded p-2 mb-2`}>
        <div className="text-xs font-semibold mb-1">Amounts & Currencies</div>
        <div className="text-xs space-y-1">
          <div>Amount 1: $3,500</div>
          <div>Amount 2: $1,200</div>
          <div>Currency 1: USD</div>
          <div>Currency 2: EUR</div>
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
            <CheckCircle className="mr-1" size={10} />
            <span>Last: Success (2024-01-20)</span>
          </div>
          <div>Next: 2024-01-25 09:00</div>
        </div>
      </div>

      {/* Section 3: Document Processing */}
      <div className={`${sectionBgColor} rounded p-2`}>
        <div className="text-xs font-semibold mb-1 flex items-center">
          <FileText className="mr-1" size={10} />
          Document Processing
        </div>
        <div className="text-xs space-y-1">
          <div>Processed: {isFunding ? '2,156' : '1,890'}</div>
          <div className="flex items-center">
            <XCircle className="mr-1" size={10} />
            <span>Failed: {isFunding ? '5' : '2'}</span>
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className={`w-2 h-2 ${iconBg}`}
      />
      {!isFunding && (
        <Handle
          type="source"
          position={Position.Right}
          className={`w-2 h-2 ${iconBg}`}
        />
      )}
    </div>
  );
});

FundRecordNode.displayName = 'FundRecordNode';
