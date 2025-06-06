
import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'deal-1',
    type: 'dealBookingNode',
    position: { x: 50, y: 100 },
    data: { label: 'Deal Booking Process' },
  },
  {
    id: 'payment-debit-1',
    type: 'paymentLegNode',
    position: { x: 450, y: 50 },
    data: { label: 'Payment Processing Debit', type: 'debit' },
  },
  {
    id: 'payment-credit-1',
    type: 'paymentLegNode',
    position: { x: 450, y: 280 },
    data: { label: 'Payment Processing Credit', type: 'credit' },
  },
  {
    id: 'fund-initial-1',
    type: 'fundRecordNode',
    position: { x: 850, y: 50 },
    data: { label: 'Initial Fund Record', type: 'initial' },
  },
  {
    id: 'fund-funding-1',
    type: 'fundRecordNode',
    position: { x: 850, y: 280 },
    data: { label: 'Funding Record', type: 'funding' },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'deal-1',
    target: 'payment-debit-1',
    type: 'smoothstep',
  },
  {
    id: 'e1-3',
    source: 'deal-1',
    target: 'payment-credit-1',
    type: 'smoothstep',
  },
  {
    id: 'e2-4',
    source: 'payment-debit-1',
    target: 'fund-initial-1',
    type: 'smoothstep',
  },
  {
    id: 'e3-5',
    source: 'payment-credit-1',
    target: 'fund-funding-1',
    type: 'smoothstep',
  },
];
