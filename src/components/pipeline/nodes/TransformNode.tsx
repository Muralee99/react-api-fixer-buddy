
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings } from 'lucide-react';

export const TransformNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-green-500 text-white border-2 border-green-600 min-w-[150px]">
      <div className="flex items-center">
        <Settings className="mr-2" size={16} />
        <div>
          <div className="text-sm font-bold">Transform</div>
          <div className="text-xs">{data.label}</div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-green-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-green-300"
      />
    </div>
  );
});

TransformNode.displayName = 'TransformNode';
