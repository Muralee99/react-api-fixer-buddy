
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { TrendingDown, TrendingUp } from 'lucide-react';

export const PaymentLegNode = memo(({ data }: { data: { label: string; type: 'debit' | 'credit' } }) => {
  const isDebit = data.type === 'debit';
  const bgColor = isDebit ? 'bg-red-500' : 'bg-green-500';
  const borderColor = isDebit ? 'border-red-600' : 'border-green-600';
  const Icon = isDebit ? TrendingDown : TrendingUp;

  return (
    <div className={`px-4 py-3 shadow-md rounded-md ${bgColor} text-white border-2 ${borderColor} min-w-[180px]`}>
      <div className="flex items-center mb-2">
        <Icon className="mr-2" size={16} />
        <div className="text-sm font-bold">{isDebit ? 'Debit' : 'Credit'} Leg</div>
      </div>
      <div className="text-xs space-y-1">
        <div>{isDebit ? 'Debit' : 'Credit'} Amount: ${isDebit ? '1,000' : '2,500'}</div>
        <div>Currency 1: USD</div>
        <div>Currency 2: EUR</div>
        <div>Job: {data.label}</div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className={`w-2 h-2 ${isDebit ? 'bg-red-300' : 'bg-green-300'}`}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={`w-2 h-2 ${isDebit ? 'bg-red-300' : 'bg-green-300'}`}
      />
    </div>
  );
});

PaymentLegNode.displayName = 'PaymentLegNode';
