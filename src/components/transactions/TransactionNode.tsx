
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus, CreditCard, Undo2, Clock, MapPin, CircleDollarSign, Activity } from 'lucide-react';

export interface TransactionNodeData {
  [key: string]: any;
  name: 'Create' | 'Payment' | 'Refund' | 'Partial Refund';
  time: string;
  state: string;
  amount: string;
  currency: string;
  country: string;
}

const iconMapping = {
    Create: FilePlus,
    Payment: CreditCard,
    Refund: Undo2,
    'Partial Refund': Undo2,
}

export const TransactionNode = memo(({ data }: { data: TransactionNodeData }) => {
  const { name, time, state, amount, currency, country } = data;
  const Icon = name ? iconMapping[name] : FilePlus;

  return (
    <Card className="w-64 shadow-lg border-2 bg-white">
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-gray-400" />
      <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <Icon size={16} className="text-gray-500" />
      </CardHeader>
      <CardContent className="p-3 pt-0 text-xs text-gray-600 space-y-1">
        <div className="flex items-center gap-2">
            <Activity size={12} />
            <span>State: {state}</span>
        </div>
        <div className="flex items-center gap-2">
            <CircleDollarSign size={12} />
            <span>{amount} {currency}</span>
        </div>
        <div className="flex items-center gap-2">
            <Clock size={12} />
            <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
            <MapPin size={12} />
            <span>{country}</span>
        </div>
      </CardContent>
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-gray-400" />
    </Card>
  );
});

TransactionNode.displayName = 'TransactionNode';
