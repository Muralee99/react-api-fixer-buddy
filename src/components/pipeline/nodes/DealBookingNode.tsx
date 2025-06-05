
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CreditCard, Clock } from 'lucide-react';

export const DealBookingNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-3 shadow-md rounded-md bg-orange-500 text-white border-2 border-orange-600 min-w-[200px]">
      <div className="flex items-center mb-2">
        <CreditCard className="mr-2" size={16} />
        <div className="text-sm font-bold">Deal Booking Card</div>
      </div>
      <div className="text-xs space-y-1">
        <div>Amount 1: $1,000</div>
        <div>Amount 2: $2,500</div>
        <div className="flex items-center">
          <Clock className="mr-1" size={10} />
          <span>Job: {data.label}</span>
        </div>
        <div>Created: 2024-01-15</div>
        <div>Last Executed: 2024-01-20</div>
        <div>Next: 2024-01-25</div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-orange-300"
      />
    </div>
  );
});

DealBookingNode.displayName = 'DealBookingNode';
