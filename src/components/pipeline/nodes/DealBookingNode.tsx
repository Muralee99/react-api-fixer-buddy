
import React, { memo } from 'react';
import { ConfigurableNode } from './ConfigurableNode';
import { nodeConfigurations } from '@/config/nodeConfig';

interface DealBookingNodeData {
  label: string;
  pipelineData?: Record<string, any>;
}

export const DealBookingNode = memo(({ data }: { data: DealBookingNodeData }) => {
  const nodeConfig = nodeConfigurations.dealBooking;
  
  return (
    <ConfigurableNode 
      data={{
        ...data,
        nodeConfig,
      }} 
    />
  );
});

DealBookingNode.displayName = 'DealBookingNode';
