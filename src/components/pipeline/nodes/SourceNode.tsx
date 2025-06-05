
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Database } from 'lucide-react';

export const SourceNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-blue-500 text-white border-2 border-blue-600 min-w-[150px]">
      <div className="flex items-center">
        <Database className="mr-2" size={16} />
        <div>
          <div className="text-sm font-bold">Data Source</div>
          <div className="text-xs">{data.label}</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-blue-300"
      />
    </div>
  );
});

SourceNode.displayName = 'SourceNode';
