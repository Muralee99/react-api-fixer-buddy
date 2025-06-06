
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CreditCard, Clock, FileText, CheckCircle, XCircle } from 'lucide-react';

export const DealBookingNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-3 shadow-md rounded-md bg-orange-500 text-white border-2 border-orange-600 min-w-[240px]">
      <div className="flex items-center mb-3">
        <CreditCard className="mr-2" size={16} />
        <div className="text-sm font-bold">Deal Booking Card</div>
      </div>
      
      {/* Section 1: Amounts and Currencies */}
      <div className="bg-orange-600 rounded p-2 mb-2">
        <div className="text-xs font-semibold mb-1">Amounts & Currencies</div>
        <div className="text-xs space-y-1">
          <div>Amount 1: $1,000</div>
          <div>Amount 2: $2,500</div>
          <div>Currency 1: USD</div>
          <div>Currency 2: EUR</div>
        </div>
      </div>

      {/* Section 2: Job Execution Data */}
      <div className="bg-orange-600 rounded p-2 mb-2">
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
      <div className="bg-orange-600 rounded p-2">
        <div className="text-xs font-semibold mb-1 flex items-center">
          <FileText className="mr-1" size={10} />
          Document Processing
        </div>
        <div className="text-xs space-y-1">
          <div>Processed: 1,245</div>
          <div className="flex items-center">
            <XCircle className="mr-1" size={10} />
            <span>Failed: 3</span>
          </div>
        </div>
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
