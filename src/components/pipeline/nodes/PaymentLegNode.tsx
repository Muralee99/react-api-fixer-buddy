
import React, { memo } from 'react';
import { ConfigurableNode } from './ConfigurableNode';
import { nodeConfigurations } from '@/config/nodeConfig';

interface PaymentLegNodeData {
  label: string;
  type: 'debit' | 'credit';
  pipelineData?: Record<string, any>;
}

export const PaymentLegNode = memo(({ data }: { data: PaymentLegNodeData }) => {
  const nodeConfig = data.type === 'debit' 
    ? nodeConfigurations.paymentDebit 
    : nodeConfigurations.paymentCredit;
  
  return (
    <ConfigurableNode 
      data={{
        ...data,
        nodeConfig,
      }} 
    />
  );
});

PaymentLegNode.displayName = 'PaymentLegNode';
