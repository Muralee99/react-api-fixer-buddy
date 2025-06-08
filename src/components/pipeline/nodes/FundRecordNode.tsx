
import React, { memo } from 'react';
import { ConfigurableNode } from './ConfigurableNode';
import { nodeConfigurations } from '@/config/nodeConfig';

interface FundRecordNodeData {
  label: string;
  type?: 'initial' | 'funding';
  pipelineData?: Record<string, any>;
}

export const FundRecordNode = memo(({ data }: { data: FundRecordNodeData }) => {
  const nodeConfig = data.type === 'funding' 
    ? nodeConfigurations.fundFunding 
    : nodeConfigurations.fundInitial;
  
  return (
    <ConfigurableNode 
      data={{
        ...data,
        nodeConfig,
      }} 
    />
  );
});

FundRecordNode.displayName = 'FundRecordNode';
