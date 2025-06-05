
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Server } from 'lucide-react';

export const DestinationNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-purple-500 text-white border-2 border-purple-600 min-w-[150px]">
      <div className="flex items-center">
        <Server className="mr-2" size={16} />
        <div>
          <div className="text-sm font-bold">Destination</div>
          <div className="text-xs">{data.label}</div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-purple-300"
      />
    </div>
  );
});

DestinationNode.displayName = 'DestinationNode';
