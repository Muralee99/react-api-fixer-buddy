
import { SourceNode } from './nodes/SourceNode';
import { TransformNode } from './nodes/TransformNode';
import { DestinationNode } from './nodes/DestinationNode';
import { DealBookingNode } from './nodes/DealBookingNode';
import { PaymentLegNode } from './nodes/PaymentLegNode';
import { FundRecordNode } from './nodes/FundRecordNode';

export const nodeTypes = {
  sourceNode: SourceNode,
  transformNode: TransformNode,
  destinationNode: DestinationNode,
  dealBookingNode: DealBookingNode,
  paymentLegNode: PaymentLegNode,
  fundRecordNode: FundRecordNode,
};
