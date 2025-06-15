
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus, CreditCard, Undo2 } from 'lucide-react';

export interface TransactionNodeData {
  [key: string]: any;
  name: 'Create' | 'Payment' | 'Refund';
}

const iconMapping = {
    Create: FilePlus,
    Payment: CreditCard,
    Refund: Undo2
}

export const TransactionNode = memo(({ data }: { data: TransactionNodeData }) => {
  const { name } = data;
  const Icon = iconMapping[name];

  return (
    <Card className="w-48 shadow-lg border-2 bg-white">
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-gray-400" />
      <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <Icon size={16} className="text-gray-500" />
      </CardHeader>
      <CardContent className="p-3 pt-0 text-xs text-gray-600">
        <p>This is the {name.toLowerCase()} stage.</p>
      </CardContent>
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-gray-400" />
    </Card>
  );
});

TransactionNode.displayName = 'TransactionNode';
