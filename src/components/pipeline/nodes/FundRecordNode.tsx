
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Wallet, FileText } from 'lucide-react';

export const FundRecordNode = memo(({ data }: { data: { label: string; type?: 'initial' | 'funding' } }) => {
  const isFunding = data.type === 'funding';
  const bgColor = isFunding ? 'bg-indigo-500' : 'bg-teal-500';
  const borderColor = isFunding ? 'border-indigo-600' : 'border-teal-600';
  const iconBg = isFunding ? 'bg-indigo-300' : 'bg-teal-300';

  return (
    <div className={`px-4 py-3 shadow-md rounded-md ${bgColor} text-white border-2 ${borderColor} min-w-[180px]`}>
      <div className="flex items-center mb-2">
        {isFunding ? <Wallet className="mr-2" size={16} /> : <FileText className="mr-2" size={16} />}
        <div className="text-sm font-bold">
          {isFunding ? 'Funding Records' : 'Fund Record'}
        </div>
      </div>
      <div className="text-xs space-y-1">
        <div>Amount: $3,500</div>
        <div>Job Details: {data.label}</div>
        {isFunding && (
          <>
            <div>Funding Type: Wire Transfer</div>
            <div>Status: Pending</div>
          </>
        )}
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
