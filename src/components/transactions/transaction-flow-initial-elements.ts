
import { Node, Edge } from '@xyflow/react';
import { TransactionNodeData } from './TransactionNode';

export const initialNodes: Node<TransactionNodeData>[] = [
  {
    id: '1',
    type: 'transactionNode',
    position: { x: 50, y: 150 },
    data: { 
      name: 'Create',
      time: '2025-06-15 10:00:00 UTC',
      state: 'Initiated',
      amount: '1000.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '2',
    type: 'transactionNode',
    position: { x: 350, y: 150 },
    data: { 
      name: 'Payment',
      time: '2025-06-15 10:01:30 UTC',
      state: 'Completed',
      amount: '1000.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '3',
    type: 'transactionNode',
    position: { x: 650, y: 50 },
    data: { 
      name: 'Partial Refund',
      time: '2025-06-15 11:05:00 UTC',
      state: 'Completed',
      amount: '200.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '4',
    type: 'transactionNode',
    position: { x: 650, y: 250 },
    data: { 
      name: 'Partial Refund',
      time: '2025-06-15 12:30:15 UTC',
      state: 'Completed',
      amount: '300.00',
      currency: 'USD',
      country: 'USA'
    },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
];
