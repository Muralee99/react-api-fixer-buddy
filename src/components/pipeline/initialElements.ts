
import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'deal-1',
    type: 'dealBookingNode',
    position: { x: 100, y: 200 },
    data: { label: 'Payment Processing Job' },
  },
  {
    id: 'debit-leg-1',
    type: 'paymentLegNode',
    position: { x: 400, y: 100 },
    data: { label: 'USD-EUR Exchange', type: 'debit' },
  },
  {
    id: 'credit-leg-1',
    type: 'paymentLegNode',
    position: { x: 400, y: 300 },
    data: { label: 'USD-EUR Exchange', type: 'credit' },
  },
  {
    id: 'fund-record-1',
    type: 'fundRecordNode',
    position: { x: 700, y: 100 },
    data: { label: 'Settlement Fund - Debit', type: 'initial' },
  },
  {
    id: 'fund-record-2',
    type: 'fundRecordNode',
    position: { x: 700, y: 300 },
    data: { label: 'Settlement Fund - Credit', type: 'initial' },
  },
  {
    id: 'funding-records-1',
    type: 'fundRecordNode',
    position: { x: 1000, y: 100 },
    data: { label: 'Wire Transfer Records - Debit', type: 'funding' },
  },
  {
    id: 'funding-records-2',
    type: 'fundRecordNode',
    position: { x: 1000, y: 300 },
    data: { label: 'Wire Transfer Records - Credit', type: 'funding' },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'deal-1',
    target: 'debit-leg-1',
    animated: true,
  },
  {
    id: 'e1-3',
    source: 'deal-1',
    target: 'credit-leg-1',
    animated: true,
  },
  {
    id: 'e2-4',
    source: 'debit-leg-1',
    target: 'fund-record-1',
    animated: true,
  },
  {
    id: 'e3-5',
    source: 'credit-leg-1',
    target: 'fund-record-2',
    animated: true,
  },
  {
    id: 'e4-6',
    source: 'fund-record-1',
    target: 'funding-records-1',
    animated: true,
  },
  {
    id: 'e5-7',
    source: 'fund-record-2',
    target: 'funding-records-2',
    animated: true,
  },
];
