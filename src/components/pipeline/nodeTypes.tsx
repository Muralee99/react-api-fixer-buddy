import { SourceNode } from './nodes/SourceNode';
import { TransformNode } from './nodes/TransformNode';
import { DestinationNode } from './nodes/DestinationNode';
import { UniversalNode } from './nodes/UniversalNode';

export const nodeTypes = {
  sourceNode: SourceNode,
  transformNode: TransformNode,
  destinationNode: DestinationNode,
  universalNode: UniversalNode,
  // Keep the original node types for backward compatibility
  dealBookingNode: UniversalNode,
  paymentLegNode: UniversalNode,
  fundRecordNode: UniversalNode,
};
